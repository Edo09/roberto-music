# Roberto Music — Lighting & Sound

Landing page y catálogo de Roberto Music (Santo Domingo, D.N.) en **React 18 + TypeScript + Vite**.

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # compila TS y genera dist/
npm run preview  # sirve dist/
```

## Las dos páginas

| Página | Archivo | Para qué |
|---|---|---|
| Landing | `index.html` | La web completa: hero, destacados, revista, catálogo con buscador, local |
| Revista | `revista/index.html` → **`/revista/`** | Solo el catálogo virtual, a pantalla completa. **Es el enlace que se comparte por WhatsApp** |

Las dos salen del mismo código (`build.rollupOptions.input` en `vite.config.ts`) y comparten fichas, lightbox y estilos. Al publicar, `dist/revista/index.html` queda en la URL `https://tu-dominio/revista/` — con la barra final, porque es un directorio.

## Estructura

```
public/assets/            Flyers de producto, logo y marcas (46 imágenes)
src/config.ts             Datos del negocio: WhatsApp, dirección, horario, Instagram
src/data/products.ts      Catálogo tipado: Product, Category, 43 productos
src/data/catalogBook.ts   Guion de la revista: orden de las hojas y el índice
src/styles.css            Tokens (variables CSS) y clases de componentes
src/book.css              El libro y el papel de las hojas
src/reader.css            La página de la revista a pantalla completa
src/App.tsx               Composición de la landing
src/revista.tsx           Entrada de la revista
src/components/           Header, Hero, Featured, Stats, Catalog, ProductCard,
                          FlyerLightbox, Brands, Local, ContactBanner, Footer, icons,
                          FlipBook, BookLeaf, CatalogBook, CatalogReader
```

## Cómo editar el contenido

- **Teléfonos, dirección, horario, Instagram** → `src/config.ts`. `waLink()` arma el enlace de WhatsApp con el mensaje ya escrito.
- **Productos** → `src/data/products.ts`. Cada entrada lleva `id`, `name`, `brand`, `cat`, `featured`, `img` y exactamente 3 `specs`. Para agregar uno: copia la imagen a `public/assets/` y agrega el objeto al arreglo.
- **Categorías** → arreglo `categories` y unión `Category` en el mismo archivo. Los filtros y el contador de la barra de datos se calculan solos.
- **Destacados** → `featured: true`; aparecen en "Lo más vendido" (etiqueta corta en `META` de `Featured.tsx`).
- **Colores y tipografía** → variables en `:root` de `src/styles.css`. Las fuentes (Saira Condensed, Saira, IBM Plex Mono) se cargan en `index.html`.

## El catálogo virtual

- **La revista** (`FlipBook`) usa [StPageFlip](https://github.com/Nodlik/StPageFlip) (`page-flip`) para el giro de hoja: se arrastra la esquina, se desliza con el dedo y en pantallas angostas cae a una sola página. Se monta dos veces con el mismo componente — dentro de la landing y a pantalla completa en `/revista/`.
- **Las hojas** (`BookLeaf`) salen de `products.ts`: no hay nada que mantener aparte. Un producto nuevo entra solo en su sección, y el índice y los folios se recalculan.
- **El papel es claro a propósito**: las sombras del pliegue solo se leen sobre una hoja clara, y son ellas las que hacen que el giro parezca de verdad.
- **El tamaño del texto de las hojas va en `cqw`** (container queries), porque el widget redimensiona la página en píxeles según la pantalla.

## Notas de diseño

- Rejilla visible, reglas de 2px, sin esquinas redondeadas; azul `#2f6bd8` del logo sobre fondo `#0a0c12`.
- Los resplandores magenta/violeta/azul del fondo y los haces diagonales de la portada están en `.page` y `.hero`.
- Las fichas usan una caja de imagen fija 3:4 con `object-fit: cover` desde arriba, así todas miden igual; el flyer completo se ve en el lightbox (clic en la imagen, `Esc` para cerrar).
- El logo y las marcas RMLight/RMAudio son JPEG con fondo; si consigues PNG transparentes, reemplaza los archivos en `public/assets/` con el mismo nombre.
