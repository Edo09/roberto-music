# Roberto Music — Lighting & Sound

Landing page y catálogo de Roberto Music (Santo Domingo, D.N.) en **React 18 + TypeScript + Vite**.

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # compila TS y genera dist/
npm run preview  # sirve dist/
```

## Estructura

```
public/assets/            Flyers de producto, logo y marcas (46 imágenes)
src/config.ts             Datos del negocio: WhatsApp, dirección, horario, Instagram
src/data/products.ts      Catálogo tipado: Product, Category, 43 productos
src/styles.css            Tokens (variables CSS) y clases de componentes
src/App.tsx               Composición de la página
src/components/           Header, Hero, Featured, Stats, Catalog, ProductCard,
                          FlyerLightbox, Brands, Local, ContactBanner, Footer, icons
```

## Cómo editar el contenido

- **Teléfonos, dirección, horario, Instagram** → `src/config.ts`. `waLink()` arma el enlace de WhatsApp con el mensaje ya escrito.
- **Productos** → `src/data/products.ts`. Cada entrada lleva `id`, `name`, `brand`, `cat`, `featured`, `img` y exactamente 3 `specs`. Para agregar uno: copia la imagen a `public/assets/` y agrega el objeto al arreglo.
- **Categorías** → arreglo `categories` y unión `Category` en el mismo archivo. Los filtros y el contador de la barra de datos se calculan solos.
- **Destacados** → `featured: true`; aparecen en "Lo más vendido" (etiqueta corta en `META` de `Featured.tsx`).
- **Colores y tipografía** → variables en `:root` de `src/styles.css`. Las fuentes (Saira Condensed, Saira, IBM Plex Mono) se cargan en `index.html`.

## Notas de diseño

- Rejilla visible, reglas de 2px, sin esquinas redondeadas; azul `#2f6bd8` del logo sobre fondo `#0a0c12`.
- Los resplandores magenta/violeta/azul del fondo y los haces diagonales de la portada están en `.page` y `.hero`.
- Las fichas usan una caja de imagen fija 3:4 con `object-fit: cover` desde arriba, así todas miden igual; el flyer completo se ve en el lightbox (clic en la imagen, `Esc` para cerrar).
- El logo y las marcas RMLight/RMAudio son JPEG con fondo; si consigues PNG transparentes, reemplaza los archivos en `public/assets/` con el mismo nombre.
