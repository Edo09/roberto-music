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
    <section className="brands" id="marcas">
      <div className="brands__head">
        <span className="kicker">Nuestras marcas</span>
        <p>Las dos líneas propias de la casa: iluminación y audio profesional.</p>
      </div>
      <div className="brandcards">
        {HOUSE.map((b) => (
          <div className="brandcard" key={b.name}>
            <img src={b.img} alt={b.name + ' — ' + b.sub} />
            <div className="brandcard__text">
              <span className="brandcard__name">{b.name}</span>
              <span className="brandcard__sub">{b.sub}</span>
              <span className="brandcard__note">{b.note}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="brands__also">
        <span className="kicker">También manejamos</span>
      </div>
      <div className="brands__row">
        {ALSO.map((name) => (
          <div className="brands__cell" key={name}>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
