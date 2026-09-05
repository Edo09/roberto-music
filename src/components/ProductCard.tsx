import type { Product } from '../data/products';
import { ExpandIcon } from './icons';

interface Props {
  product: Product;
  onOpen: (product: Product) => void;
}

export default function ProductCard({ product, onOpen }: Props) {
  return (
    <article className="card">
      <button
        type="button"
        className="card__imgbtn"
        onClick={() => onOpen(product)}
        aria-label={'Ver ficha de ' + product.name}
      >
        <span className="frame">
          <img src={product.img} alt={product.name} loading="lazy" />
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
      </div>
    </article>
  );
}
