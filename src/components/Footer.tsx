import type { CSSProperties } from 'react';
import { site, waLink } from '../config';
import { InstagramIcon, WhatsAppIcon } from './icons';

export default function Footer() {
  return (
    <footer className="footer" data-reveal-grid="plain" data-track-context="footer">
      <div style={{ '--i': 0 } as CSSProperties}>
        <div className="footer__name">Roberto Music</div>
        <div className="brandmark__sub">{site.tagline}</div>
      </div>
      <div className="footer__col" style={{ '--i': 1 } as CSSProperties}>
        {site.addressLines[0]}
        <br />
        {site.addressLines[1]}
      </div>
      <div className="footer__col" style={{ '--i': 2 } as CSSProperties}>
        (829) 898-7798 · (809) 776-2370
        <br />
        <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
          {site.instagram}
        </a>
        <div className="footer__socials" aria-label="Redes sociales">
          <a href={waLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={15} />
            WhatsApp
          </a>
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={15} />
            Instagram
          </a>
        </div>
      </div>
      <div className="footer__col" style={{ '--i': 3 } as CSSProperties}>
        Distribuidor autorizado
        <br />
        {site.distributor}
      </div>
    </footer>
  );
}
