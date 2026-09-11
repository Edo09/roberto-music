import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
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
import { ArrowDownIcon, CloseIcon, SearchIcon } from './icons';
import { track } from '../lib/analytics';
import { SIZES } from '../lib/images';

type Filter = Category | 'todos';
/** 'todos' deja la rejilla completa, como estaba antes de paginar. */
type PageSize = 20 | 25 | 'todos';

const PAGE_SIZES: PageSize[] = [20, 25, 'todos'];
const DEFAULT_SIZE: PageSize = 20;

export default function Catalog() {
  const [filter, setFilter] = useState<Filter>('todos');
  const [query, setQuery] = useState('');
  const [perPage, setPerPage] = useState<PageSize>(DEFAULT_SIZE);
  const [blocks, setBlocks] = useState(1);
  const statusRef = useRef<HTMLParagraphElement>(null);
  /* Cuántas fichas había antes del último "cargar más": las de más allá entran
     con un fundido para que se vea qué llegó. */
  const grown = useRef(0);
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

  /* El contador de bloques se reinicia en los propios manejadores (ver
     `selectFilter` y compañía); aquí solo se recorta contra lo que hay, por si
     la lista encogió por otro camino. */
  const size = perPage === 'todos' ? shown.length : perPage;
  const visible = shown.slice(0, Math.min(shown.length, size * blocks));
  const left = shown.length - visible.length;
  const nextBatch = Math.min(size, left);

  /* Solo registramos la búsqueda cuando el usuario deja de escribir. */
  useEffect(() => {
    if (!q) return;
    const id = window.setTimeout(() => track('search', { query: q, results: matches.length }), 600);
    return () => window.clearTimeout(id);
  }, [q, matches.length]);

  const reset = () => {
    setBlocks(1);
    grown.current = 0;
  };

  const selectFilter = (key: Filter, label: string) => {
    setFilter(key);
    reset();
    track('filter_change', { filter: label });
  };

  const search = (value: string) => {
    setQuery(value);
    reset();
  };

  const loadMore = () => {
    grown.current = visible.length;
    setBlocks((n) => n + 1);
    /* Si esta tanda es la última, el botón desaparece y el foco se caería al
       cuerpo de la página: lo mandamos al contador, que sí dice qué pasó. */
    if (left <= size) statusRef.current?.focus();
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
            onChange={(e) => search(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="search__clear"
              aria-label="Borrar búsqueda"
              onClick={() => search('')}
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

      <div className="catalog__count">
        <p className="catalog__status" role="status" aria-live="polite" tabIndex={-1} ref={statusRef}>
          {shown.length === 0
            ? 'Ningún equipo coincide con la búsqueda.'
            : left === 0
              ? `${shown.length} ${shown.length === 1 ? 'equipo' : 'equipos'}`
              : `${shown.length} equipos · viendo ${visible.length}`}
        </p>

        {shown.length > 0 && (
          <label className="perpage">
            <span className="perpage__label">Ver</span>
            <select
              className="perpage__select"
              value={String(perPage)}
              onChange={(e) => {
                const value = e.target.value;
                setPerPage(value === 'todos' ? 'todos' : (Number(value) as PageSize));
                reset();
              }}
            >
              {PAGE_SIZES.map((option) => (
                <option key={option} value={String(option)}>
                  {option === 'todos' ? 'Todos' : `${option} a la vez`}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

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
              search('');
              setFilter('todos');
            }}
          >
            Ver todo el catálogo
          </button>
        </div>
      ) : (
        /* La `key` remonta la grilla al cambiar de categoría, así las fichas
           vuelven a entrar escalonadas. Al escribir o al cargar más no se
           remonta: reanimar lo que ya estaba leído sería molesto. */
        <div className="grid" key={filter} data-reveal-grid="hairline">
          {visible.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              sizes={SIZES.card}
              isNew={i >= grown.current && grown.current > 0}
              onOpen={() => open(p, shown)}
            />
          ))}
        </div>
      )}

      {left > 0 && (
        <div className="loadmore">
          <button type="button" className="btn btn--ghost" onClick={loadMore}>
            <ArrowDownIcon size={16} />
            Cargar {nextBatch} más
          </button>
          <span className="loadmore__left">Quedan {left}</span>
        </div>
      )}

    </section>
  );
}
