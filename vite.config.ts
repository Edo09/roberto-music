import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Dos páginas del mismo código: la landing (`index.html`) y la revista a
 * pantalla completa (`revista/index.html`), que es el enlace que se comparte
 * por WhatsApp. Las rutas van relativas a la raíz del proyecto; el `dist`
 * queda con `revista/index.html`, o sea la URL `/revista/`.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        revista: 'revista/index.html',
      },
    },
  },
});
