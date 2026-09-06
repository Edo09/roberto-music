import { useEffect } from 'react';

/**
 * Escribe el estado del scroll en <html> sin provocar renders de React:
 *   --scroll-progress  0 → 1 para la barra de progreso del header
 *   data-scrolled      el header se compacta
 *   data-scrolled-far  aparece el botón "volver arriba"
 * El listener es pasivo y se agrupa en un requestAnimationFrame.
 */
export default function usePageScroll() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      root.style.setProperty('--scroll-progress', max > 0 ? String(Math.min(1, y / max)) : '0');
      root.dataset.scrolled = y > 24 ? 'true' : 'false';
      root.dataset.scrolledFar = y > window.innerHeight * 0.85 ? 'true' : 'false';
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
}
