import { site } from '../config';
import { PinIcon } from './icons';

export default function Local() {
  const embed =
    'https://www.google.com/maps?q=' + encodeURIComponent(site.mapsQuery) + '&output=embed';

  return (
    <section className="local" id="local">
      <div className="local__info">
        <span className="kicker">Venta en el local</span>
        <h2>Visítanos en Ensanche Espaillat</h2>
        <div className="rows">
          <div className="row">
            <span className="row__k">Dirección</span>
            <span className="row__v">
              {site.addressLines[0]}
              <br />
              {site.addressLines[1]}
            </span>
          </div>
          <div className="row">
            <span className="row__k">Horario</span>
            <span className="row__v">
              {site.hours[0]}
              <br />
              {site.hours[1]}
            </span>
          </div>
          <div className="row">
            <span className="row__k">WhatsApp</span>
            <span className="row__v">(829) 898-7798 · (809) 776-2370</span>
          </div>
          <div className="row">
            <span className="row__k">Instagram</span>
            <span className="row__v">
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                {site.instagram}
              </a>
            </span>
          </div>
        </div>
        <a
          className="btn btn--ghost"
          style={{ marginTop: 28 }}
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PinIcon />
          Abrir en Google Maps
        </a>
      </div>
      <div className="map">
        <iframe
          title="Ubicación de Roberto Music"
          src={embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
