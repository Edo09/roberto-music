import { useRef, useState } from 'react';
import { READER_SHARE, site, waLink } from '../config';
import { FlyerProvider } from './FlyerProvider';
import { ReaderFlipBook, type FlipBookApi } from './FlipBook';
import useOutboundTracking from '../hooks/useOutboundTracking';
import { ShareIcon, WhatsAppIcon } from './icons';
import { track } from '../lib/analytics';

const TOAST_MS = 2600;

/**
 * La revista sola, a pantalla completa: es la página que se comparte por
 * WhatsApp y la que casi todo el mundo va a abrir desde el celular. Nada de
 * scroll — barra arriba, libro en medio ocupando lo que quede, controles
 * abajo, al alcance del pulgar.
 */
export default function CatalogReader() {
  const book = useRef<FlipBookApi | null>(null);
  const [toast, setToast] = useState('');
  useOutboundTracking();

  const say = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), TOAST_MS);
  };

  /* En el celular abre la hoja para compartir del sistema —ahí está WhatsApp,
     que es por donde se va a mandar—; en escritorio no existe `share`, así que
     copia el enlace. Y si el navegador tampoco deja copiar, al menos se lo
     decimos en vez de quedarnos callados. */
  const share = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ ...READER_SHARE, url });
        track('book_share', { via: 'sistema' });
      } catch {
        /* El usuario cerró la hoja de compartir. */
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      track('book_share', { via: 'copiar' });
      say('Enlace copiado');
    } catch {
      say('Copia el enlace desde la barra del navegador');
    }
  };

  return (
    <FlyerProvider>
      <div className="reader" data-track-context="revista">
        <header className="reader__top">
          {/* El título de la página: la maqueta no tiene sitio para un titular,
              pero buscadores y lectores de pantalla necesitan uno. */}
          <h1 className="sr-only">
            Catálogo de Roberto Music · iluminación, sonido y efectos para tarima,
            discoteca y evento en Santo Domingo
          </h1>
          <a className="reader__brand" href="/">
            <span className="reader__name">Roberto Music</span>
            <span className="reader__sub">Catálogo · {site.tagline}</span>
          </a>

          <button
            type="button"
            className="reader__act"
            onClick={() => book.current?.flip(1)}
            aria-label="Ir al índice"
          >
            Índice
          </button>

          <button type="button" className="reader__act reader__act--icon" onClick={share}>
            <ShareIcon />
            <span className="sr-only">Compartir el catálogo</span>
          </button>

          <a
            className="reader__act reader__act--icon reader__act--wa"
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={17} />
            <span className="sr-only">Escribir por WhatsApp</span>
          </a>
        </header>

        <main className="reader__stage">
          <ReaderFlipBook apiRef={book} />
        </main>

        <p className={'reader__toast' + (toast ? ' reader__toast--on' : '')} role="status">
          {toast}
        </p>
      </div>
    </FlyerProvider>
  );
}
