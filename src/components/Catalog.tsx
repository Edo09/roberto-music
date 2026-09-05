import { useMemo, useState } from 'react';
import { categories, products, type Category, type Product } from '../data/products';
import ProductCard from './ProductCard';
import FlyerLightbox from './FlyerLightbox';

type Filter = Category | 'todos';

export default function Catalog() {
  const [filter, setFilter] = useState<Filter>('todos');
  const [flyer, setFlyer] = useState<Product | null>(null);

  const chips = useMemo(() => {
    const list: { key: Filter; label: string; count: number }[] = [
      { key: 'todos', label: 'Todos', count: products.length },
    ];
    for (const c of categories) {
      const count = products.filter((p) => p.cat === c.key).length;
      if (count > 0) list.push({ key: c.key, label: c.label, count });
    }
    return list;
  }, []);

  const shown = useMemo(
    () => (filter === 'todos' ? products : products.filter((p) => p.cat === filter)),
    [filter],
  );

  return (
    <section className="catalog" id="catalogo">
      <div className="catalog__head">
        <div style={{ marginRight: 'auto' }}>
          <span className="kicker">Equipos disponibles</span>
          <h2>Catálogo</h2>
        </div>
        <p className="catalog__note">
          Cada ficha muestra las especificaciones completas. Haz clic para verla en grande.
        </p>
      </div>

      <div className="filters">
        {chips.map((c) => (
          <button
            type="button"
            key={c.key}
            className={'chip' + (filter === c.key ? ' chip--on' : '')}
            onClick={() => setFilter(c.key)}
            aria-pressed={filter === c.key}
          >
            {c.label} <span className="chip__count">{c.count}</span>
          </button>
        ))}
      </div>

      <div className="grid">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={setFlyer} />
        ))}
      </div>

      {flyer && <FlyerLightbox product={flyer} onClose={() => setFlyer(null)} />}
    </section>
  );
}
