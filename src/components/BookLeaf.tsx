import { DEFAULT_STOCK, STOCK_LABEL } from '../data/products';
import { bookSections, folio, type BookPage } from '../data/catalogBook';
import { categories } from '../data/products';
import { site, waLink } from '../config';
import { SIZES } from '../lib/images';
import { ExpandIcon, InstagramIcon, PinIcon, WhatsAppIcon } from './icons';
import Media from './Media';

interface Props {
  page: BookPage;
  index: number;
}

/** Las primeras hojas se cargan de una; el resto espera a que el libro las abra. */
const EAGER_UNTIL = 4;

const CATEGORY_LABEL = new Map(categories.map((c) => [c.key, c.label]));

/**
 * Una hoja del catálogo virtual. El elemento raíz es el que StPageFlip toma
 * como página (le añade `.stf__item` y le fija tamaño y transform), así que
 * todo el diseño vive en el `.page` de dentro: así el widget mueve la hoja y
 * nosotros mandamos en el contenido.
 *
 * `data-density="hard"` marca las tapas: se pasan rígidas, como cartón.
 */
export default function BookLeaf({ page, index }: Props) {
  if (page.kind === 'cover') {
    return (
      <div className="bookpage" data-density="hard">
        <div className="leaf leaf--cover">
          <span className="leaf__eyebrow">{site.tagline}</span>
          <h3 className="leaf__brand">Roberto Music</h3>
          <span className="leaf__cover-art">
            <Media
              src="/assets/logo-roberto-music.jpeg"
              alt=""
              sizes={SIZES.card}
              aria-hidden="true"
            />
          </span>
          <span className="leaf__title">Catálogo</span>
          <p className="leaf__lead">Iluminación · Sonido · Efectos para tarima y discoteca.</p>
          <span className="leaf__hint">Arrastra la esquina para abrir →</span>
        </div>
      </div>
    );
  }

  if (page.kind === 'index') {
    return (
      <div className="bookpage" data-density="soft">
        <div className="leaf leaf--index">
          <span className="leaf__eyebrow">Contenido</span>
          <h3 className="leaf__heading">Índice</h3>
          <ul className="toc">
            {bookSections.map((section) => (
              <li key={section.key}>
                {/* StPageFlip no pasa la hoja cuando el clic cae en un <button>,
                    así que estos saltos conviven con el gesto de arrastre. */}
                <button type="button" className="toc__row" data-book-goto={section.page}>
                  <span className="toc__label">{section.label}</span>
                  <span className="toc__count">{section.count}</span>
                  <span className="toc__page">{folio(section.page)}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="leaf__note">
            Toca cualquier foto para ver la ficha en grande, o cotiza el equipo por WhatsApp
            desde su propia página.
          </p>
          <span className="leaf__folio">{folio(index)}</span>
        </div>
      </div>
    );
  }

  if (page.kind === 'product') {
    const { product } = page;
    const stock = product.stock ?? DEFAULT_STOCK;

    return (
      <div className="bookpage" data-density="soft">
        <article className="leaf leaf--product">
          <header className="leaf__head">
            <span className="leaf__cat">{CATEGORY_LABEL.get(page.cat)}</span>
            <span className="leaf__folio">{folio(index)}</span>
          </header>

          <button
            type="button"
            className="leaf__figure"
            data-book-zoom={product.id}
            aria-label={'Ver ficha de ' + product.name}
          >
            <Media
              src={product.img}
              alt={product.name}
              sizes={SIZES.card}
              loading={index <= EAGER_UNTIL ? 'eager' : 'lazy'}
            />
            {product.featured && <span className="leaf__badge">Destacado</span>}
            <span className="leaf__zoom">
              <ExpandIcon />
              Ver ficha
            </span>
          </button>

          <span className="leaf__brand-tag">{product.brand}</span>
          <h3 className="leaf__name">{product.name}</h3>
          <ul className="leaf__specs">
            {product.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>

          <div className="leaf__foot">
            <span className={'stock stock--' + stock}>{STOCK_LABEL[stock]}</span>
            <span className="leaf__price">{product.price ?? 'Precio por WhatsApp'}</span>
          </div>

          <a
            className="leaf__quote"
            href={waLink(undefined, 'Hola Roberto Music, me interesa el ' + product.name + '.')}
            target="_blank"
            rel="noopener noreferrer"
            data-track-item={product.name}
          >
            <WhatsAppIcon size={14} />
            Cotizar por WhatsApp
          </a>
        </article>
      </div>
    );
  }

  if (page.kind === 'blank') {
    return (
      <div className="bookpage" data-density="soft">
        <div className="leaf leaf--blank">
          <span className="leaf__folio">{folio(index)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bookpage" data-density="hard">
      <div className="leaf leaf--back">
        <span className="leaf__eyebrow">Contacto</span>
        <h3 className="leaf__heading">Visítanos</h3>
        <ul className="backlist">
          <li>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={16} />
              <span>
                <strong>{site.whatsappPrimary.replace(/^1(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3')}</strong>
                <small>WhatsApp · ventas</small>
              </span>
            </a>
          </li>
          <li>
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={16} />
              <span>
                <strong>{site.instagram}</strong>
                <small>Instagram</small>
              </span>
            </a>
          </li>
          <li>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
              <PinIcon size={16} />
              <span>
                <strong>{site.addressLines[0]}</strong>
                <small>{site.addressLines[1]}</small>
              </span>
            </a>
          </li>
        </ul>
        <p className="leaf__hours">
          {site.hours[0]}
          <br />
          {site.hours[1]}
        </p>
        <span className="leaf__hint">Roberto Music · {site.tagline}</span>
      </div>
    </div>
  );
}
