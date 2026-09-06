import { useCallback, useEffect, useRef, useState, type TouchEvent as ReactTouchEvent } from 'react';
import type { Product } from '../data/products';
import { DEFAULT_STOCK, STOCK_LABEL } from '../data/products';
import { waLink } from '../config';
import { ChevronIcon, CloseIcon, WhatsAppIcon } from './icons';
import Media from './Media';

interface Props {
  product: Product;
  list: Product[];
  onClose: () => void;
  onStep: (delta: number) => void;
}

const EXIT_MS = 200;
const SWIPE_PX = 45;

export default function FlyerLightbox({ product, list, onClose, onStep }: Props) {
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number>();
  const closingRef = useRef(false);
  const touchX = useRef<number | null>(null);

  const index = list.findIndex((p) => p.id === product.id);
  const canNavigate = list.length > 1 && index >= 0;

  /* Salida animada: marcamos `closing`, dejamos correr la transición y luego
     desmontamos. El guardia va en un ref y no dentro del updater de estado:
     StrictMode invoca los updaters dos veces y crearía un temporizador de más. */
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    timer.current = window.setTimeout(onClose, EXIT_MS);
  }, [onClose]);

  /* Bloquea el scroll del fondo compensando el ancho de la barra para que la
     página no salte, y marca <html> para que los botones flotantes se aparten:
     el fondo del lightbox es traslúcido y se transparentaban a través de él. */
  useEffect(() => {
    const { body } = document;
    const root = document.documentElement;
    const gap = window.innerWidth - root.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = gap + 'px';
    root.dataset.modal = 'true';
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      delete root.dataset.modal;
    };
  }, []);

  /* Escape cierra, las flechas navegan, Tab queda atrapado y el foco vuelve al abridor. */
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        requestClose();
        return;
      }
      if (canNavigate && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        onStep(e.key === 'ArrowLeft' ? -1 : 1);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(timer.current);
      opener?.focus?.();
    };
  }, [requestClose, onStep, canNavigate]);

  const onTouchStart = (e: ReactTouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: ReactTouchEvent) => {
    const start = touchX.current;
    touchX.current = null;
    if (start == null || !canNavigate) return;
    const delta = (e.changedTouches[0]?.clientX ?? start) - start;
    if (Math.abs(delta) < SWIPE_PX) return;
    onStep(delta < 0 ? 1 : -1);
  };

  const stock = product.stock ?? DEFAULT_STOCK;

  return (
    <div
      className={'lightbox' + (closing ? ' lightbox--closing' : '')}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      data-track-context="lightbox"
      onClick={requestClose}
    >
      <div
        className="lightbox__panel"
        ref={panelRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {canNavigate && (
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Ficha anterior"
            onClick={(e) => {
              e.stopPropagation();
              onStep(-1);
            }}
          >
            <ChevronIcon size={22} />
          </button>
        )}

        <Media
          key={product.id}
          className="lightbox__img"
          src={product.img}
          alt={product.name}
          full
        />

        {canNavigate && (
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            aria-label="Ficha siguiente"
            onClick={(e) => {
              e.stopPropagation();
              onStep(1);
            }}
          >
            <ChevronIcon size={22} />
          </button>
        )}

        <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
          <span className="lightbox__meta">
            <span className="lightbox__name">{product.name}</span>
            <span className="lightbox__sub">
              <span className={'stock stock--' + stock}>{STOCK_LABEL[stock]}</span>
              {product.price && <span className="lightbox__price">{product.price}</span>}
              {canNavigate && (
                <span className="lightbox__count">
                  {index + 1} / {list.length}
                </span>
              )}
            </span>
          </span>
          <a
            className="btn btn--primary btn--sm"
            href={waLink(undefined, 'Hola Roberto Music, me interesa el ' + product.name + '.')}
            target="_blank"
            rel="noopener noreferrer"
            data-track-item={product.name}
          >
            <WhatsAppIcon size={15} />
            Contáctanos
          </a>
          <button
            type="button"
            className="btn btn--ghost btn--sm lightbox__close"
            onClick={requestClose}
            ref={closeRef}
          >
            <CloseIcon />
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
