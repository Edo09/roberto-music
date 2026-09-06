import type { CSSProperties } from 'react';
import { DEFAULT_STOCK, STOCK_LABEL, type Product } from '../data/products';
import { waLink } from '../config';
import { ExpandIcon, WhatsAppIcon } from './icons';
import Media from './Media';

interface Props {
  product: Product;
  index: number;
  sizes: string;
  onOpen: () => void;
}

export default function ProductCard({ product, index, sizes, onOpen }: Props) {
  const stock = product.stock ?? DEFAULT_STOCK;

  return (
    <article className="card" style={{ '--i': index } as CSSProperties}>
      <button
        type="button"
        className="card__imgbtn"
        onClick={onOpen}
        aria-label={'Ver ficha de ' + product.name}
      >
        <span className="frame">
          <Media src={product.img} alt={product.name} sizes={sizes} loading="lazy" />
        </span>
        <span className="card__flag">
          <ExpandIcon />
          Ver ficha
        </span>
        {product.featured && <span className="card__badge">Destacado</span>}
      </button>
      <div className="card__body">
        <span className="card__brand">{product.brand}</span>
        <h3 className="card__name">{product.name}</h3>
        <ul className="card__specs">
          {product.specs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
        <div className="card__foot">
          <span className={'stock stock--' + stock}>{STOCK_LABEL[stock]}</span>
          <span className="card__price">{product.price ?? 'Precio por WhatsApp'}</span>
        </div>
        <a
          className="card__quote"
          href={waLink(undefined, 'Hola Roberto Music, me interesa el ' + product.name + '.')}
          target="_blank"
          rel="noopener noreferrer"
          data-track-item={product.name}
        >
          <WhatsAppIcon size={15} />
          Cotizar por WhatsApp
        </a>
      </div>
    </article>
  );
}
