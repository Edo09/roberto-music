import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** Las páginas que se indexan. El 404 queda fuera a propósito. */
const INDEXED = [
  { path: '/', priority: '1.0' },
  { path: '/revista/', priority: '0.9' },
];

/**
 * Emite robots.txt y sitemap.xml en el build. Van generados y no en `public/`
 * porque necesitan el dominio real, y el dominio vive en una sola parte:
 * VITE_SITE_URL del `.env`. Si se copiaran a mano quedarían desfasados el día
 * que cambie.
 */
function seoFiles(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '');

  return {
    name: 'roberto-music:seo-files',
    apply: 'build',
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10);

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: ['User-agent: *', 'Allow: /', '', `Sitemap: ${base}/sitemap.xml`, ''].join('\n'),
      });

      const urls = INDEXED.map(
        ({ path, priority }) =>
          `  <url>\n` +
          `    <loc>${base}${path}</loc>\n` +
          `    <lastmod>${lastmod}</lastmod>\n` +
          `    <changefreq>monthly</changefreq>\n` +
          `    <priority>${priority}</priority>\n` +
          `  </url>`,
      ).join('\n');

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          `${urls}\n` +
          '</urlset>\n',
      });
    },
  };
}

/**
 * Dos páginas del mismo código: la landing (`index.html`) y la revista a
 * pantalla completa (`revista/index.html`), que es el enlace que se comparte
 * por WhatsApp. Las rutas van relativas a la raíz del proyecto; el `dist`
 * queda con `revista/index.html`, o sea la URL `/revista/`.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');

  return {
    plugins: [react(), seoFiles(env.VITE_SITE_URL ?? 'https://robertomusic.do')],
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
          revista: 'revista/index.html',
        },
      },
    },
  };
});
