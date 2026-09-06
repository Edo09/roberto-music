import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import {
  categories,
  normalize,
  products,
  searchIndex,
  type Category,
  type Product,
} from '../data/products';
import ProductCard from './ProductCard';
import { useFlyer } from './FlyerProvider';
import { CloseIcon, SearchIcon } from './icons';
import { track } from '../lib/analytics';
import { SIZES } from '../lib/images';

type Filter = Category | 'todos';

export default function Catalog() {
  const [filter, setFilter] = useState<Filter>('todos');
  const [query, setQuery] = useState('');
  const { open } = useFlyer();

  const q = normalize(query.trim());

  /* El buscador acota primero; los contadores de los chips reflejan la búsqueda. */
  const matches = useMemo(
    () => (q ? products.filter((p) => searchIndex.get(p.id)?.includes(q)) : products),
    [q],
  );

  const chips = useMemo(() => {
    const list: { key: Filter; label: string; count: number }[] = [
      { key: 'todos', label: 'Todos', count: matches.length },
    ];
    for (const c of categories) {
      list.push({ key: c.key, label: c.label, count: matches.filter((p) => p.cat === c.key).length });
    }
    return list;
  }, [matches]);

  const shown: Product[] = useMemo(
    () => (filter === 'todos' ? matches : matches.filter((p) => p.cat === filter)),
    [matches, filter],
  );

  /* Solo registramos la búsqueda cuando el usuario deja de escribir. */
  useEffect(() => {
    if (!q) return;
    const id = window.setTimeout(() => track('search', { query: q, results: matches.length }), 600);
    return () => window.clearTimeout(id);
  }, [q, matches.length]);

  const selectFilter = (key: Filter, label: string) => {
    setFilter(key);
    track('filter_change', { filter: label });
  };

  return (
    <section className="catalog" id="catalogo" data-track-context="catalogo">
      <div className="catalog__head" data-reveal>
        <div style={{ marginRight: 'auto' }}>
          <span className="kicker">Equipos disponibles</span>
          <h2>Catálogo</h2>
        </div>
        <p className="catalog__note">
          Cada ficha muestra las especificaciones completas. Haz clic para verla en grande.
          Precios y disponibilidad por WhatsApp.
        </p>
      </div>

      <div className="catalog__tools">
        <div className="search">
          <SearchIcon />
          <input
            type="search"
            className="search__input"
            placeholder="Buscar por nombre, marca o especificación…"
            aria-label="Buscar en el catálogo"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="search__clear"
              aria-label="Borrar búsqueda"
              onClick={() => setQuery('')}
            >
              <CloseIcon size={14} />
            </button>
          )}
        </div>

        <div className="filters" data-reveal-grid="plain">
          {chips.map((c, i) => (
            <button
              type="button"
              key={c.key}
              className={'chip' + (filter === c.key ? ' chip--on' : '')}
              style={{ '--i': i } as CSSProperties}
              onClick={() => selectFilter(c.key, c.label)}
              aria-pressed={filter === c.key}
              disabled={c.count === 0}
            >
              {c.label} <span className="chip__count">{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="catalog__status" role="status" aria-live="polite">
        {shown.length === 0
          ? 'Ningún equipo coincide con la búsqueda.'
          : `${shown.length} ${shown.length === 1 ? 'equipo' : 'equipos'}`}
      </p>

      {shown.length === 0 ? (
        <div className="empty">
          <p className="empty__title">No encontramos nada con “{query}”.</p>
          <p className="empty__hint">
            Prueba con la marca (RMLight, Blastking) o el tipo de equipo (beam, láser, bocina).
          </p>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => {
              setQuery('');
              setFilter('todos');
            }}
          >
            Ver todo el catálogo
          </button>
        </div>
      ) : (
        /* La `key` remonta la grilla al cambiar de categoría, así las fichas
           vuelven a entrar escalonadas. Al escribir no se remonta: reanimar
           en cada tecla sería molesto. */
        <div className="grid" key={filter} data-reveal-grid="hairline">
          {shown.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              sizes={SIZES.card}
              onOpen={() => open(p, shown)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
