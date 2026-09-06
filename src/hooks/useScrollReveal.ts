import { useEffect } from 'react';

/**
 * Observa todo elemento marcado con [data-reveal] o [data-reveal-grid] y le añade
 * la clase `is-in` cuando entra en pantalla. Un MutationObserver recoge los nodos
 * que React monta después (por ejemplo, la grilla del catálogo al cambiar filtro),
 * así que el efecto también aplica a contenido dinámico.
 *
 * El IntersectionObserver es el mecanismo principal, pero sus entregas van atadas
 * al pipeline de render. Como aquí lo que está en juego es que el catálogo se vea,
 * hay dos respaldos que no dependen de él: un temporizador para lo que ya está en
 * pantalla al observarlo, y un barrido en el evento de scroll.
 */
const SELECTOR = '[data-reveal], [data-reveal-grid]';
const SWEEP_MS = 150;

export default function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => el.classList.add('is-in'));
      return;
    }

    const pending = new Set<HTMLElement>();
    const timers = new Set<number>();

    const inView = (el: HTMLElement) => {
      const box = el.getBoundingClientRect();
      return box.top < window.innerHeight && box.bottom > 0;
    };

    const reveal = (el: HTMLElement) => {
      el.classList.add('is-in');
      pending.delete(el);
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    const track = (el: HTMLElement) => {
      if (el.classList.contains('is-in') || pending.has(el)) return;
      pending.add(el);
      io.observe(el);
      // Ya visible al montarse (la grilla que React acaba de remontar al
      // cambiar de filtro): lo revelamos sin esperar al observer. El retraso
      // deja que el navegador pinte primero el estado oculto, para que la
      // transición tenga de dónde partir.
      if (inView(el)) {
        const id = window.setTimeout(() => {
          timers.delete(id);
          reveal(el);
        }, 120);
        timers.add(id);
      }
    };

    const watch = (node: Node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches(SELECTOR)) track(node);
      node.querySelectorAll<HTMLElement>(SELECTOR).forEach(track);
    };

    watch(document.body);

    const mo = new MutationObserver((records) => {
      for (const record of records) record.addedNodes.forEach(watch);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Barrido de respaldo: el evento de scroll sí llega aunque el observer se
    // retrase, por ejemplo cuando el navegador restaura la posición tras un
    // refresco a media página.
    let last = 0;
    const sweep = () => {
      const now = Date.now();
      if (now - last < SWEEP_MS || pending.size === 0) return;
      last = now;
      for (const el of [...pending]) if (inView(el)) reveal(el);
    };

    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener('scroll', sweep);
      window.removeEventListener('resize', sweep);
    };
  }, []);
}
