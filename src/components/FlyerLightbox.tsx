import { useEffect } from 'react';
import type { Product } from '../data/products';
import { waLink } from '../config';

interface Props {
  product: Product;
  onClose: () => void;
}

export default function FlyerLightbox({ product, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={product.name} onClick={onClose}>
      <img src={product.img} alt={product.name} />
      <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox__name">{product.name}</span>
        <a
          className="btn btn--primary btn--sm"
          href={waLink(undefined, 'Hola Roberto Music, me interesa el ' + product.name + '.')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contáctanos
        </a>
        <button type="button" className="btn btn--ghost btn--sm" onClick={onClose}>
          Cerrar ✕
        </button>
      </div>
    </div>
  );
}
