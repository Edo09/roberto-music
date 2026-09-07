import { categories, products, type Category, type Product } from './products';

/**
 * Guion del catálogo virtual: la lista ordenada de hojas que <FlipBook>
 * entrega a StPageFlip. El orden es el de una revista impresa —tapa, índice,
 * secciones por categoría, contratapa— y el índice del array es el número de
 * página que entiende el widget, así que sirve tal cual para `flip(page)`.
 */
export type BookPage =
  | { kind: 'cover' }
  | { kind: 'index' }
  /** Una hoja con hasta cuatro equipos de la misma sección. */
  | { kind: 'products'; items: Product[]; cat: Category }
  /** Hoja en blanco de ajuste: ver la nota sobre la paridad, más abajo. */
  | { kind: 'blank' }
  | { kind: 'back' };

export interface BookSection {
  key: Category;
  label: string;
  /** Página en la que arranca la sección. */
  page: number;
  count: number;
}

export const PER_PAGE = 4;

/**
 * Reparte los equipos de una sección en hojas. No los mete de cuatro en cuatro:
 * eso deja hojas huérfanas (5 equipos → 4 + 1). Reparte parejo, así 5 salen
 * 3 + 2 y 9 salen 3 + 3 + 3. La hoja que queda con un solo equipo se dibuja a
 * página completa, con sus especificaciones (ver <BookLeaf>).
 */
function spread(list: Product[]): Product[][] {
  const sheets = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const base = Math.floor(list.length / sheets);
  const extra = list.length % sheets;
  const out: Product[][] = [];

  let from = 0;
  for (let sheet = 0; sheet < sheets; sheet++) {
    const take = base + (sheet < extra ? 1 : 0);
    out.push(list.slice(from, from + take));
    from += take;
  }
  return out;
}

function build(): { pages: BookPage[]; sections: BookSection[] } {
  const pages: BookPage[] = [{ kind: 'cover' }, { kind: 'index' }];
  const sections: BookSection[] = [];

  for (const category of categories) {
    const list = products.filter((p) => p.cat === category.key);
    if (list.length === 0) continue;

    sections.push({
      key: category.key,
      label: category.label,
      page: pages.length,
      count: list.length,
    });
    for (const items of spread(list)) pages.push({ kind: 'products', items, cat: category.key });
  }

  /* Con `showCover`, StPageFlip enseña la primera y la última hoja solas. Para
     que la contratapa caiga sola —y no emparejada con la última sección— el
     total tiene que ser par; si no lo es, va una hoja de cortesía en medio. */
  if ((pages.length + 1) % 2 !== 0) pages.push({ kind: 'blank' });
  pages.push({ kind: 'back' });

  return { pages, sections };
}

const book = build();

export const bookPages: BookPage[] = book.pages;
export const bookSections: BookSection[] = book.sections;

/** Los equipos en el orden del libro: es la lista por la que navega el lightbox. */
export const bookProducts: Product[] = bookPages.flatMap((page) =>
  page.kind === 'products' ? page.items : [],
);

/** Folio impreso en la esquina de cada hoja: '04', '12'… */
export function folio(index: number): string {
  return String(index).padStart(2, '0');
}
