import { useEffect } from 'react';

/**
 * Escribe el estado del scroll en <html> sin provocar renders de React:
 *   --scroll-progress  0 → 1 para la barra de progreso del header
 *   data-scrolled      el header se compacta
 *   data-scrolled-far  aparece el botón "volver arriba"
 * y marca con data-active el enlace del nav cuya sección se está mirando.
 * El listener es pasivo y se agrupa en un requestAnimationFrame.
 */
export default function usePageScroll() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    /* El nav no está en el orden del documento (Marcas va antes que Revista),
       así que las secciones se ordenan por su posición real, no por el enlace. */
    const sections = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav a[href^="#"]'))
      .map((link) => ({ link, el: document.getElementById(link.hash.slice(1)) }))
      .filter((pair): pair is { link: HTMLAnchorElement; el: HTMLElement } => pair.el !== null);

    let active: HTMLAnchorElement | null = null;

    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      root.style.setProperty('--scroll-progress', max > 0 ? String(Math.min(1, y / max)) : '0');
      root.dataset.scrolled = y > 24 ? 'true' : 'false';
      root.dataset.scrolledFar = y > window.innerHeight * 0.85 ? 'true' : 'false';

      /* La sección activa es la última que ya cruzó el primer tercio de la
         pantalla: es donde está mirando quien lee, no donde empieza el viewport. */
      const line = y + window.innerHeight * 0.32;
      const current = sections
        .map((pair) => ({ ...pair, top: pair.el.getBoundingClientRect().top + y }))
        .sort((a, b) => a.top - b.top)
        .reduce<HTMLAnchorElement | null>((found, pair) => (pair.top <= line ? pair.link : found), null);

      if (current !== active) {
        active?.removeAttribute('data-active');
        current?.setAttribute('data-active', 'true');
        active = current;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      active?.removeAttribute('data-active');
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
}
