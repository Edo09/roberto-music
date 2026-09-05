import { site, waLink } from '../config';
import { InstagramIcon, WhatsAppIcon } from './icons';

export default function Header() {
  return (
    <header className="header">
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
    </header>
  );
}
