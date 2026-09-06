import type { CSSProperties } from 'react';
import { site } from '../config';
import { categories, products } from '../data/products';

const step = (i: number) => ({ '--i': i }) as CSSProperties;

export default function Stats() {
  return (
    <section className="stats" data-reveal-grid="plain">
      <div className="stat" style={step(0)}>
        <div className="stat__num">{products.length}</div>
        <div className="stat__label">Modelos en catálogo</div>
      </div>
      <div className="stat" style={step(1)}>
        <div className="stat__num">{categories.length}</div>
        <div className="stat__label">Categorías de equipo</div>
      </div>
      <div className="stat" style={step(2)}>
        <div className="stat__lines">
          Lun–Vie 8:00–6:00
          <br />
          Sáb 8:00–3:00
        </div>
        <div className="stat__label">Horario del local</div>
      </div>
      <div className="stat" style={step(3)}>
        <div className="stat__lines">
          (829) 898-7798
          <br />
          (809) 776-2370
        </div>
        <div className="stat__label">Ventas por WhatsApp · {site.instagram}</div>
      </div>
    </section>
  );
}
