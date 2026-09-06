import { useRef } from 'react';
import { site, waLink } from '../config';
import { InstagramIcon, WhatsAppIcon } from './icons';
import useHeaderHeight from '../hooks/useHeaderHeight';

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  useHeaderHeight(ref);

  return (
    <header className="header" ref={ref} data-track-context="header">
      <div className="brandmark">
        <span className="brandmark__name">Roberto Music</span>
        <span className="brandmark__sub">{site.tagline}</span>
      </div>
      <nav className="nav">
        <a href="#catalogo">Catálogo</a>
        <a href="#marcas">Marcas</a>
        <a href="#local">Local</a>
      </nav>
      <div className="header__actions" aria-label="Canales de contacto">
        <a
          className="social-icon social-icon--whatsapp"
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir WhatsApp de Roberto Music"
          title="WhatsApp"
        >
          <WhatsAppIcon size={18} />
        </a>
        <a
          className="social-icon social-icon--instagram"
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={'Abrir Instagram ' + site.instagram}
          title="Instagram"
        >
          <InstagramIcon size={18} />
        </a>
        <a className="btn btn--primary btn--sm" href={waLink()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={16} />
          Contáctanos
        </a>
      </div>
      <span className="header__progress" aria-hidden="true" />
    </header>
  );
}
