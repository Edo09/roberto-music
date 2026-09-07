/**
 * Analítica sin proveedor. Empuja los eventos a `dataLayer` y llama a `gtag`,
 * `plausible` o `fathom` si están presentes; si no hay ninguno, no hace nada.
 * Así puedes conectar Google Analytics, GTM o Plausible después sin tocar
 * ningún componente: solo pegas el script del proveedor en index.html.
 *
 * Para verlos en consola mientras pruebas: localStorage.rmDebug = '1'
 */
export type TrackEvent =
  | 'whatsapp_click'
  | 'instagram_click'
  | 'maps_click'
  | 'flyer_open'
  | 'filter_change'
  | 'search'
  | 'book_flip'
  | 'book_share';

type Params = Record<string, string | number | boolean | undefined>;

interface AnalyticsWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  plausible?: (event: string, opts?: { props: Params }) => void;
  fathom?: { trackEvent: (event: string) => void };
}

export function track(event: TrackEvent, params: Params = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as AnalyticsWindow;
  const payload = { event, ...params };

  try {
    (w.dataLayer ||= []).push(payload);
    w.gtag?.('event', event, params);
    w.plausible?.(event, { props: params });
    w.fathom?.trackEvent(event);
    if (localStorage.getItem('rmDebug') === '1') {
      console.info('[track]', event, params);
    }
  } catch {
    /* La analítica nunca debe romper la página. */
  }
}

/** Clasifica un enlace saliente por su destino. */
export function classifyLink(href: string): TrackEvent | null {
  if (href.includes('wa.me') || href.includes('api.whatsapp.com')) return 'whatsapp_click';
  if (href.includes('instagram.com')) return 'instagram_click';
  if (href.includes('maps.app.goo.gl') || href.includes('google.com/maps')) return 'maps_click';
  return null;
}
