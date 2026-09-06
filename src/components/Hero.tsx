import type { CSSProperties } from 'react';
import { site, waLink } from '../config';
import { ArrowDownIcon, InstagramIcon, WhatsAppIcon } from './icons';

/* El hero está siempre visible al cargar, así que entra con una animación CSS
   escalonada en lugar de esperar al IntersectionObserver. */
const step = (i: number) => ({ '--i': i }) as CSSProperties;

export default function Hero() {
  return (
    <div className="hero" data-track-context="hero">
      <span className="kicker" data-enter style={step(0)}>
        Santo Domingo · Ensanche Espaillat
      </span>
      <h1 data-enter style={step(1)}>
        Iluminación, sonido y efectos para tarima, discoteca y evento.
      </h1>
      <p data-enter style={step(2)}>
        Cabezas móviles, beams, PAR LED, barras, strobos, láseres, máquinas de humo, fuego y confeti,
        bocinas activas y consolas. Equipo profesional, calidad comprobada y venta directa en el local.
      </p>
      <div className="hero__actions" data-enter style={step(3)}>
        <a className="btn btn--primary" href={waLink()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          Contáctanos por WhatsApp
        </a>
        <a className="btn btn--ghost" href="#catalogo">
          Ver catálogo
          <ArrowDownIcon />
        </a>
      </div>
      <div className="hero__socials" data-enter style={step(4)} aria-label="Canales sociales de Roberto Music">
        <a
          className="social-card social-card--whatsapp"
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="social-card__icon">
            <WhatsAppIcon size={20} />
          </span>
          <span className="social-card__text">
            <strong>WhatsApp ventas</strong>
            <small>(829) 898-7798 · (809) 776-2370</small>
          </span>
        </a>
        <a
          className="social-card social-card--instagram"
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="social-card__icon">
            <InstagramIcon size={20} />
          </span>
          <span className="social-card__text">
            <strong>Síguenos en Instagram</strong>
            <small>{site.instagram}</small>
          </span>
        </a>
      </div>
    </div>
  );
}
