import { site } from '../config';

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer__name">Roberto Music</div>
        <div className="brandmark__sub">{site.tagline}</div>
      </div>
      <div className="footer__col">
        {site.addressLines[0]}
        <br />
        {site.addressLines[1]}
      </div>
      <div className="footer__col">
        (829) 898-7798 · (809) 776-2370
        <br />
        <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
          {site.instagram}
        </a>
      </div>
      <div className="footer__col">
        Distribuidor autorizado
        <br />
        {site.distributor}
      </div>
    </footer>
  );
}
