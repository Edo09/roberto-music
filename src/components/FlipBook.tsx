import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MutableRefObject,
} from 'react';
import { PageFlip } from 'page-flip';
import { bookPages, bookProducts } from '../data/catalogBook';
import { products } from '../data/products';
import { useFlyer } from './FlyerProvider';
import { ChevronIcon } from './icons';
import { track } from '../lib/analytics';
import BookLeaf from './BookLeaf';

/* En modo 'stretch' width/height solo fijan la proporción de la hoja; min/max
   son el margen de maniobra. En la landing el libro se mide por el ancho de la
   sección; en el lector a pantalla completa manda la caja, y por eso ahí los
   topes son amplios: quien recorta es el alto disponible. */
const SHAPE = {
  band: { width: 430, height: 600, minWidth: 255, maxWidth: 520, minHeight: 356, maxHeight: 726 },
  /* La hoja del lector es un poco más alta: la pantalla de un teléfono lo es, y
     con la proporción de la landing sobraba un dedo de fondo arriba y abajo.
     El diseño de la hoja aguanta el cambio porque se mide en % y cqw. */
  fill: { width: 430, height: 660, minWidth: 200, maxWidth: 900, minHeight: 200, maxHeight: 1600 },
};

const productById = new Map(products.map((p) => [p.id, p]));

export interface FlipBookApi {
  /** Salta a una página concreta, con animación. */
  flip: (page: number) => void;
  /** +1 pasa la hoja, -1 la devuelve. */
  step: (delta: number) => void;
}

interface Props {
  /** El libro llena la caja que le den (lector a pantalla completa) en vez de
      medirse por el ancho disponible. */
  fill?: boolean;
  /** Para que quien lo monta pueda saltar de página: chips, índice, teclado. */
  apiRef?: MutableRefObject<FlipBookApi | null>;
}

/**
 * El libro: las fichas del catálogo encuadernadas como una revista que se
 * hojea con el gesto de un libro real (StPageFlip dibuja el doblez y la sombra
 * mientras la hoja gira).
 *
 * El reparto con React es deliberado: React renderiza y mantiene las hojas
 * dentro de `.book__source`, y la librería —que es de manipulación directa del
 * DOM— las toma prestadas para moverlas. Al desmontar se las devolvemos antes
 * de destruirla, porque su `destroy()` borra del documento todo lo que tenga
 * dentro y React se quedaría con nodos fantasma.
 */
export default function FlipBook({ fill = false, apiRef }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);

  const [page, setPage] = useState(0);
  const [portrait, setPortrait] = useState(false);
  const [ready, setReady] = useState(false);
  const { open } = useFlyer();

  const total = bookPages.length;

  useEffect(() => {
    const host = hostRef.current;
    const source = sourceRef.current;
    if (!host || !source) return;

    const leaves = Array.from(source.children) as HTMLElement[];
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* El contenedor del widget lo creamos a mano y no en el JSX: `destroy()`
       hace `block.remove()`, y si ese nodo fuera de React, React fallaría al
       desmontarlo después. */
    const block = document.createElement('div');
    block.className = 'book__block';
    host.appendChild(block);

    const flip = new PageFlip(block, {
      ...(fill ? SHAPE.fill : SHAPE.band),
      size: 'stretch',
      showCover: true,
      usePortrait: true,
      /* Con `autoSize` el widget se fija él mismo el alto a partir del ancho.
         En el lector eso sobra: la hoja tiene que caber en la pantalla, así que
         el alto lo pone el CSS y él se acomoda. */
      autoSize: !fill,
      /* A pantalla completa no hay nada que desplazar hacia abajo, y sin esa
         concesión el dedo arrastra la hoja desde el primer píxel. */
      mobileScrollSupport: !fill,
      maxShadowOpacity: 0.5,
      flippingTime: still ? 1 : 700,
      swipeDistance: 30,
    });

    /* Las fotos de las hojas se cargan en diferido: son 43 flyers y casi nadie
       llega al final. Pero una hoja escondida nunca dispara su carga, así que
       al pasar página se adelantan las siguientes — cuando el lector llega,
       la foto ya está. */
    const warm = (from: number) => {
      for (let i = Math.max(0, from); i < Math.min(from + 4, leaves.length); i++) {
        leaves[i]
          .querySelectorAll<HTMLImageElement>('img[loading="lazy"]')
          .forEach((img) => {
            img.loading = 'eager';
          });
      }
    };

    flip.on('flip', (e) => {
      setPage(e.data);
      /* Desde la hoja actual, no desde la siguiente: al saltar de sección se
         cae en una hoja que nunca estuvo a la vista y sus fotos no han pedido
         nada todavía. */
      warm(e.data);
      track('book_flip', { page: e.data });
    });
    flip.on('changeOrientation', (e) => setPortrait(e.data === 'portrait'));
    flip.on('init', (e) => {
      setPortrait(e.data.mode === 'portrait');
      setReady(true);
    });

    flip.loadFromHTML(leaves);
    warm(0);
    flipRef.current = flip;

    return () => {
      flipRef.current = null;
      for (const leaf of leaves) source.appendChild(leaf);
      flip.destroy();
    };
  }, [fill]);

  /* Saltar de sección. StPageFlip anima el salto colocándose una hoja antes y
     pasando página; en una sola página (móvil) esa animación a veces no arranca
     —la hoja destino todavía no está dibujada— y el libro se queda justo antes.
     Ahí el salto va seco, que siempre cae donde debe. */
  const jump = useCallback((to: number) => {
    const flip = flipRef.current;
    if (!flip) return;
    if (flip.getOrientation() === 'portrait') flip.turnToPage(to);
    else flip.flip(to);
  }, []);

  /* Un solo listener delegado en el contenedor: las hojas cambian de sitio y
     la librería llega a clonarlas a mitad de giro, así que atarse a cada nodo
     concreto sería frágil. */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      const zoom = target?.closest<HTMLElement>('[data-book-zoom]');
      if (zoom) {
        const product = productById.get(zoom.dataset.bookZoom ?? '');
        if (product) open(product, bookProducts);
        return;
      }

      const goto = target?.closest<HTMLElement>('[data-book-goto]');
      if (goto) jump(Number(goto.dataset.bookGoto));
    };

    host.addEventListener('click', onClick);
    return () => host.removeEventListener('click', onClick);
  }, [open, jump]);

  const step = useCallback((delta: number) => {
    const flip = flipRef.current;
    if (!flip) return;
    if (delta > 0) flip.flipNext();
    else flip.flipPrev();
  }, []);

  useEffect(() => {
    if (!apiRef) return;
    apiRef.current = { flip: jump, step };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef, jump, step]);

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    step(e.key === 'ArrowRight' ? 1 : -1);
  };

  const first = page === 0;
  const last = page >= total - 1;

  return (
    <>
      <div
        className={'book' + (fill ? ' book--fill' : '') + (ready ? ' book--ready' : '')}
        role="group"
        aria-label="Catálogo virtual de Roberto Music"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="book__host" ref={hostRef} />

        {/* React monta aquí las hojas y sigue siendo su dueño; StPageFlip solo
            se las lleva prestadas al inicializarse. */}
        <div className="book__source" ref={sourceRef} hidden>
          {bookPages.map((leaf, i) => (
            <BookLeaf key={i} page={leaf} index={i} />
          ))}
        </div>
      </div>

      <div className="book__bar">
        <span className="book__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(page + 1) / total})` }} />
        </span>

        <button
          type="button"
          className="book__nav book__nav--prev"
          onClick={() => step(-1)}
          disabled={first}
          aria-label="Página anterior"
        >
          <ChevronIcon size={22} />
        </button>

        <span className="book__count" role="status" aria-live="polite">
          {first
            ? 'Portada'
            : last
              ? 'Contraportada'
              : portrait
                ? `Hoja ${page} de ${total - 2}`
                : `Hojas ${page}–${Math.min(page + 1, total - 2)} de ${total - 2}`}
        </span>

        <button
          type="button"
          className="book__nav book__nav--next"
          onClick={() => step(1)}
          disabled={last}
          aria-label="Página siguiente"
        >
          <ChevronIcon size={22} />
        </button>
      </div>
    </>
  );
}
