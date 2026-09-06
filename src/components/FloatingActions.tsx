import { site, waLink } from '../config';
import { ArrowDownIcon, WhatsAppIcon } from './icons';

/**
 * Todo el negocio termina en wa.me, pero una vez que el usuario baja del hero
 * no tenía ningún CTA a mano hasta el pie de página. El botón de WhatsApp es
 * permanente; el de volver arriba aparece pasada la primera pantalla.
 */
export default function FloatingActions() {
  return (
    <div className="fabs" data-track-context="flotante">
      <button
        type="button"
        className="fab fab--top"
        aria-label="Volver arriba"
        title="Volver arriba"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowDownIcon size={20} />
      </button>
      <a
        className="fab fab--wa"
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={'Escribir por WhatsApp a ' + site.brand}
      >
        <WhatsAppIcon size={26} />
        <span className="fab__label">WhatsApp</span>
      </a>
    </div>
  );
}
