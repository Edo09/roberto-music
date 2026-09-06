import type { CSSProperties } from 'react';
import { featured } from '../data/products';
import Media from './Media';
import { useFlyer } from './FlyerProvider';
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
      <Media
        className="logoband__logo"
        src="/assets/logo-roberto-music.jpeg"
        alt="Roberto Music — Lighting &amp; Sound"
        sizes={SIZES.banner}
        full
      />
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
