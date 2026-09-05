import { site, waLink } from '../config';
import { WhatsAppIcon } from './icons';

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
      <a className="btn btn--primary btn--sm" href={waLink()} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon size={16} />
        Contáctanos
      </a>
    </header>
  );
}
