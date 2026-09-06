import { useEffect } from 'react';
import { classifyLink, track } from '../lib/analytics';

/**
 * Un único listener delegado en el documento registra todos los clics salientes
 * (WhatsApp, Instagram, Maps). Se hace así en vez de poner un onClick en cada
 * enlace para no repetir la misma línea veinte veces, y para que cualquier
 * enlace que agregues después quede medido sin trabajo extra.
 *
 * El contexto sale del DOM: `data-track-context` en la sección y
 * `data-track-item` en la ficha, cuando existen.
 */
export default function useOutboundTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;

      const event = classifyLink(link.href);
      if (!event) return;

      const contextEl = link.closest<HTMLElement>('[data-track-context]');
      track(event, {
        context: contextEl?.dataset.trackContext,
        item: link.dataset.trackItem,
      });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
