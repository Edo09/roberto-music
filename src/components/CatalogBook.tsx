import { useRef, type CSSProperties } from 'react';
import { bookProducts, bookSections } from '../data/catalogBook';
import { READER_PATH } from '../config';
import { ExpandIcon } from './icons';
import FlipBook, { type FlipBookApi } from './FlipBook';

/**
 * La revista dentro de la landing. El libro en sí vive en <FlipBook>, que se
 * comparte con la página del lector: aquí solo van el encabezado, los saltos
 * por sección y el enlace a la versión para compartir.
 */
export default function CatalogBook() {
  const book = useRef<FlipBookApi | null>(null);

  return (
    <section className="bookband" id="revista" data-track-context="revista">
      <div className="bookband__head" data-reveal>
        <div style={{ marginRight: 'auto' }}>
          <span className="kicker">Catálogo virtual</span>
          <h2>Hojea la revista</h2>
        </div>
        <p className="bookband__note">
          {bookProducts.length} equipos encuadernados como una revista. Arrastra la esquina,
          desliza con el dedo o usa las flechas.
        </p>
        {/* El enlace para compartir: abre solo la revista, sin el resto de la
            página, que es como la va a ver quien la reciba por WhatsApp. */}
        <a className="btn btn--ghost btn--sm bookband__open" href={READER_PATH}>
          <ExpandIcon />
          Abrir a pantalla completa
        </a>
      </div>

      <div className="book__jump" data-reveal-grid="plain">
        {bookSections.map((section, i) => (
          <button
            type="button"
            key={section.key}
            className="chip"
            style={{ '--i': i } as CSSProperties}
            onClick={() => book.current?.flip(section.page)}
          >
            {section.label} <span className="chip__count">{section.count}</span>
          </button>
        ))}
      </div>

      <FlipBook apiRef={book} />
    </section>
  );
}
