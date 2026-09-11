import type { CSSProperties } from 'react';
import { featured } from '../data/products';
import Media from './Media';
import { useFlyer } from './FlyerProvider';
import { site } from '../config';
import { SIZES } from '../lib/images';

const META: Record<string, string> = {
  beam295: 'Cabeza móvil · 295W 14R',
  beam230: 'Cabeza móvil · 230W 7R',
  beeeye: 'RGBW + láser central',
  washzoom: 'Wash zoom 5–60°',
};

export default function Featured() {
  const { open } = useFlyer();

  return (
    <div className="logoband">
      {/* Antes aquí iba la foto del banner del local: un JPEG con los teléfonos
          incrustados, borroso en pantallas grandes y mudo para buscadores y
          lectores. La marca ahora se compone con la tipografía del sitio sobre
          los mismos haces de luz del hero. */}
      <div className="brandplate" data-reveal>
        {/* El mismo bloque del banner del local: el escudo RM y el nombre en
            script, azul con filo dorado. Todo tipografía y CSS — el monograma
            va marcado como decorativo porque el nombre ya está escrito al lado. */}
        <p className="brandplate__lockup">
          {/* `data-text` lo repite la capa dorada de detrás (ver styles.css). */}
          <span className="brandplate__mark metal" data-text="RM" aria-hidden="true">
            RM
          </span>
          <span className="brandplate__script metal" data-text="Roberto Music">
            Roberto Music
          </span>
        </p>
        <span className="brandplate__kicker">{site.tagline}</span>
      </div>
      <span className="kicker featured__label" data-reveal>
        Lo más vendido
      </span>
      <div className="featured__grid" data-reveal-grid="hairline">
        {featured.map((p, i) => (
          /* Antes esto solo bajaba a #catalogo. Ahora abre la ficha del equipo
             que el usuario tocó, y las flechas recorren los destacados. */
          <button
            type="button"
            className="fcard"
            key={p.id}
            style={{ '--i': i } as CSSProperties}
            onClick={() => open(p, featured)}
            aria-label={'Ver ficha de ' + p.name}
          >
            <span className="frame">
              <Media src={p.img} alt={p.name} sizes={SIZES.featured} loading="lazy" />
            </span>
            <span className="fcard__body">
              <span className="fcard__name">{p.name}</span>
              <span className="fcard__meta">{META[p.id] ?? p.brand}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
