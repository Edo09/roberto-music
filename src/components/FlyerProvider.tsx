import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '../data/products';
import FlyerLightbox from './FlyerLightbox';
import { track } from '../lib/analytics';

interface FlyerState {
  product: Product;
  list: Product[];
}

interface FlyerApi {
  /** `list` define por dónde navegan las flechas: los destacados o el catálogo filtrado. */
  open: (product: Product, list: Product[]) => void;
}

const FlyerContext = createContext<FlyerApi | null>(null);

/**
 * El lightbox vive aquí, por encima de Destacados y Catálogo, para que ambos
 * puedan abrirlo. Antes las fichas de "Lo más vendido" solo bajaban a #catalogo.
 */
export function FlyerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FlyerState | null>(null);

  const open = useCallback((product: Product, list: Product[]) => {
    setState({ product, list });
    track('flyer_open', { item: product.name, via: 'card' });
  }, []);

  const close = useCallback(() => setState(null), []);

  const step = useCallback((delta: number) => {
    setState((current) => {
      if (!current) return current;
      const { list } = current;
      const i = list.findIndex((p) => p.id === current.product.id);
      if (i < 0 || list.length < 2) return current;
      const product = list[(i + delta + list.length) % list.length];
      track('flyer_open', { item: product.name, via: 'nav' });
      return { ...current, product };
    });
  }, []);

  const api = useMemo<FlyerApi>(() => ({ open }), [open]);

  return (
    <FlyerContext.Provider value={api}>
      {children}
      {state && (
        <FlyerLightbox
          product={state.product}
          list={state.list}
          onClose={close}
          onStep={step}
        />
      )}
    </FlyerContext.Provider>
  );
}

export function useFlyer(): FlyerApi {
  const api = useContext(FlyerContext);
  if (!api) throw new Error('useFlyer debe usarse dentro de <FlyerProvider>');
  return api;
}
