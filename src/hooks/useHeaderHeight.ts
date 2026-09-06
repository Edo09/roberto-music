import { useEffect, type RefObject } from 'react';

/**
 * Publica la altura real del header en --header-h. La usa `scroll-padding-top`
 * para que los enlaces de ancla no queden escondidos bajo el header pegajoso,
 * que cambia de alto al compactarse y al envolverse en móvil.
 */
export default function useHeaderHeight(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      document.documentElement.style.setProperty('--header-h', el.offsetHeight + 'px');
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
}
