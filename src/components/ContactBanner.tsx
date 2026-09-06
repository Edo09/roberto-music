import type { CSSProperties } from 'react';
import { site, waLink } from '../config';
import { ArrowUpRightIcon, InstagramIcon, WhatsAppIcon } from './icons';

const ROWS = [
  { label: 'WhatsApp · Ventas', value: '(829) 898-7798', href: waLink(site.whatsappPrimary), kind: 'whatsapp' },
  { label: 'WhatsApp · Segunda línea', value: '(809) 776-2370', href: waLink(site.whatsappSecondary), kind: 'whatsapp' },
  { label: 'Instagram', value: site.instagram, href: site.instagramUrl, kind: 'instagram' },
];

export default function ContactBanner() {
  return (
    <section className="cta" data-track-context="cta">
      <div className="cta__left" data-reveal>
        <span className="kicker">Asesoría y venta por WhatsApp</span>
        <h2>¿Buscas un equipo? Escríbenos.</h2>
        <p>
          Te decimos qué hay en stock y te ayudamos a escoger el equipo correcto para tu tarima,
          discoteca o evento.
        </p>
        <a
          className="btn btn--white"
          style={{ marginTop: 32, padding: '16px 24px', fontSize: 15.5 }}
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          Contáctanos ahora
        </a>
      </div>
      <div className="cta__right" data-reveal-grid="plain">
        <span className="kicker">Escríbenos directo</span>
        {ROWS.map((r, i) => (
          <a
            className="contact-row"
            key={r.label}
            style={{ '--i': i + 1 } as CSSProperties}
            href={r.href} target="_blank" rel="noopener noreferrer">
            <span className="contact-row__lead">
              <span className={'contact-row__icon contact-row__icon--' + r.kind}>
                {r.kind === 'whatsapp' ? <WhatsAppIcon size={19} /> : <InstagramIcon size={19} />}
              </span>
              <span className="contact-row__text">
                <span className="contact-row__label">{r.label}</span>
                <span className="contact-row__value">{r.value}</span>
              </span>
            </span>
            <ArrowUpRightIcon />
          </a>
        ))}
        <p className="cta__hours">
          {site.hours[0]} · {site.hours[1]}
        </p>
      </div>
    </section>
  );
}
