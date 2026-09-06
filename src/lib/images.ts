import { imageManifest } from '../data/imageManifest';

/**
 * Los JPEG originales de /public/assets pesan ~9 MB en conjunto y se muestran
 * en fichas de ~320 px. scripts/optimize-images.py genera variantes WebP en
 * /public/assets/opt: dos anchos para la rejilla y una copia a resolución
 * completa para el lightbox, donde los flyers llevan especificaciones impresas
 * que deben quedar legibles.
 */
const OPT_DIR = '/assets/opt/';

function stemOf(src: string): string {
  return src.replace(/^.*\//, '').replace(/\.[^.]+$/, '');
}

/** Ruta de la copia a resolución completa (lightbox). */
export function fullSrc(src: string): string {
  return `${OPT_DIR}${stemOf(src)}-full.webp`;
}

/**
 * srcset de la rejilla. Los descriptores "w" salen del manifiesto, no del
 * tamaño objetivo: si la foto original medía 720 px no se amplió a 840, y
 * declarar 840w haría que el navegador la eligiera creyéndola más nítida.
 */
export function gridSrcSet(src: string): string {
  const stem = stemOf(src);
  const small = `${OPT_DIR}${stem}-420.webp`;
  const large = `${OPT_DIR}${stem}-840.webp`;
  const entry = imageManifest[stem];

  if (!entry) return `${large}`;
  if (entry.small >= entry.large) return `${small} ${entry.small}w`;
  return `${small} ${entry.small}w, ${large} ${entry.large}w`;
}

/** Anchos de presentación reales, para que el navegador elija bien la variante. */
export const SIZES = {
  card: '(max-width: 700px) 100vw, 320px',
  featured: '(max-width: 700px) 100vw, 240px',
  brand: '132px',
  banner: '100vw',
} as const;
