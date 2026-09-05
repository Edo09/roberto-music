import { site, waLink } from '../config';
import { ArrowDownIcon, InstagramIcon, WhatsAppIcon } from './icons';

export default function Hero() {
  return (
    <div className="hero">
      <span className="kicker">Santo Domingo · Ensanche Espaillat</span>
      <h1>Iluminación, sonido y efectos para tarima, discoteca y evento.</h1>
      <p>
        Cabezas móviles, beams, PAR LED, barras, strobos, láseres, máquinas de humo, fuego y confeti,
        bocinas activas y consolas. Equipo profesional, calidad comprobada y venta directa en el local.
      </p>
      <div className="hero__actions">
        <a className="btn btn--primary" href={waLink()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          Contáctanos por WhatsApp
        </a>
        <a className="btn btn--ghost" href="#catalogo">
          Ver catálogo
          <ArrowDownIcon />
        </a>
      </div>
      <div className="hero__socials" aria-label="Canales sociales de Roberto Music">
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
