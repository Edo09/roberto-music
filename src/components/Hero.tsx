import { waLink } from '../config';
import { ArrowDownIcon, WhatsAppIcon } from './icons';

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
    </div>
  );
}
