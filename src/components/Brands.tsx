import type { CSSProperties } from 'react';
import Media from './Media';
import { SIZES } from '../lib/images';

const HOUSE = [
  {
    img: '/assets/marca-rmlight.jpeg',
    name: 'RMLight',
    sub: 'Professional Lighting Systems',
    note: 'Cabezas móviles, beams, PAR LED, barras y strobos.',
  },
  {
    img: '/assets/marca-rmaudio.jpeg',
    name: 'RMAudio',
    sub: 'Professional AV Systems',
    note: 'Bocinas activas, subs, monitores y consolas.',
  },
];

const ALSO = ['Blastking', 'Promax', 'Elite Audio', 'Teyun', 'V-Star'];

export default function Brands() {
  return (
    <section className="brands" id="marcas" data-track-context="marcas">
      <div className="brands__head" data-reveal>
        <span className="kicker">Nuestras marcas</span>
        <p>Las dos líneas propias de la casa: iluminación y audio profesional.</p>
      </div>
      <div className="brandcards" data-reveal-grid="hairline">
        {HOUSE.map((b, i) => (
          <div className="brandcard" key={b.name} style={{ '--i': i } as CSSProperties}>
            <Media src={b.img} alt={b.name + ' — ' + b.sub} sizes={SIZES.brand} loading="lazy" />
            <div className="brandcard__text">
              <span className="brandcard__name">{b.name}</span>
              <span className="brandcard__sub">{b.sub}</span>
              <span className="brandcard__note">{b.note}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="brands__also" data-reveal>
        <span className="kicker">También manejamos</span>
      </div>
      <div className="brands__row" data-reveal-grid="hairline">
        {ALSO.map((name, i) => (
          <div className="brands__cell" key={name} style={{ '--i': i } as CSSProperties}>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
