import { featured } from '../data/products';

const META: Record<string, string> = {
  beam295: 'Cabeza móvil · 295W 14R',
  beam230: 'Cabeza móvil · 230W 7R',
  beeeye: 'RGBW + láser central',
  washzoom: 'Wash zoom 5–60°',
};

export default function Featured() {
  return (
    <div className="logoband">
      <img src="/assets/logo-roberto-music.jpeg" alt="Roberto Music — Lighting &amp; Sound" />
      <span className="kicker featured__label">Lo más vendido</span>
      <div className="featured__grid">
        {featured.map((p) => (
          <a className="fcard" key={p.id} href="#catalogo">
            <span className="frame">
              <img src={p.img} alt={p.name} loading="lazy" />
            </span>
            <span className="fcard__body">
              <span className="fcard__name">{p.name}</span>
              <span className="fcard__meta">{META[p.id] ?? p.brand}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
