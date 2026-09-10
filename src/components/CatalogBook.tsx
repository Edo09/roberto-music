import { Suspense, lazy, useRef, useState, type CSSProperties } from 'react';
import { bookPages, bookProducts, bookSections } from '../data/catalogBook';
import type { Category } from '../data/products';
import { READER_PATH } from '../config';
import { ExpandIcon } from './icons';
import type { FlipBookApi } from './FlipBook';

/* StPageFlip y las 18 hojas pesan ~45 kB y la revista vive muy por debajo del
   pliegue: se cargan en su propio chunk para que no entren en el primer bundle
   de la landing. En `/revista/` no se difiere — allí el libro es la página. */
const BandFlipBook = lazy(() =>
  import('./FlipBook').then((module) => ({ default: module.BandFlipBook })),
);

/** Reserva el alto del libro y su barra mientras llega el chunk. */
function BookPlaceholder() {
  return (
    <>
      <div className="book" aria-hidden="true">
        <div className="book__host" />
      </div>
      <div className="book__bar book__bar--waiting" aria-hidden="true" />
    </>
  );
}

/**
 * La revista dentro de la landing. El libro en sí vive en <FlipBook>, que se
 * comparte con la página del lector: aquí solo van el encabezado, los saltos
 * por sección y el enlace a la versión para compartir.
 */
export default function CatalogBook() {
  const book = useRef<FlipBookApi | null>(null);
  const [spread, setSpread] = useState<number[]>([0]);

  /* El chip de la sección abierta se enciende: los saltos dejan de ser botones
     sueltos y pasan a decir también por dónde va la lectura. Cuando el pliego
     cruza dos secciones manda la hoja derecha, que es hacia donde se avanza —y
     es la que se abre al saltar desde el chip. En la portada, el índice y la
     contratapa no hay sección y no se enciende ninguno. */
  const reading = spread.reduce<Category | null>((found, i) => {
    const leaf = bookPages[i];
    return leaf?.kind === 'products' ? leaf.cat : found;
  }, null);

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
            className={'chip' + (reading === section.key ? ' chip--on' : '')}
            style={{ '--i': i } as CSSProperties}
            aria-current={reading === section.key ? 'true' : undefined}
            onClick={() => book.current?.flip(section.page)}
          >
            {section.label} <span className="chip__count">{section.count}</span>
          </button>
        ))}
      </div>

      <Suspense fallback={<BookPlaceholder />}>
        <BandFlipBook apiRef={book} onPage={setSpread} />
      </Suspense>
    </section>
  );
}
