import React from 'react';
import { createRoot } from 'react-dom/client';
import CatalogReader from './components/CatalogReader';
import './styles.css';
import './book.css';
import './reader.css';
import './motion.css';

/**
 * Entrada de `revista/index.html`: la revista sola, sin la landing. Vite compila
 * las dos páginas del mismo código (ver `build.rollupOptions.input`), así que
 * las fichas, el lightbox y los estilos son exactamente los mismos.
 */
const container = document.getElementById('root');
if (!container) throw new Error('No se encontró #root');

createRoot(container).render(
  <React.StrictMode>
    <CatalogReader />
  </React.StrictMode>,
);
