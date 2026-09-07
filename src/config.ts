export interface SiteConfig {
  brand: string;
  tagline: string;
  whatsappPrimary: string;
  whatsappSecondary: string;
  whatsappMessage: string;
  instagram: string;
  instagramUrl: string;
  addressLines: [string, string];
  mapsQuery: string;
  mapsUrl: string;
  hours: [string, string];
  distributor: string;
}

export const site: SiteConfig = {
  brand: 'Roberto Music',
  tagline: 'Lighting & Sound',
  whatsappPrimary: '18298987798',
  whatsappSecondary: '18097762370',
  whatsappMessage: 'Hola Roberto Music, quiero información sobre sus equipos de iluminación y sonido.',
  instagram: '@Robertomusic02',
  instagramUrl: 'https://www.instagram.com/Robertomusic02',
  addressLines: [
    'Calle José Nicolás Casimiro #87',
    'Ensanche Espaillat, Santo Domingo, D.N.',
  ],
  mapsQuery: 'Calle Jose Nicolas Casimiro 87, Ensanche Espaillat, Santo Domingo',
  mapsUrl: 'https://maps.app.goo.gl/9yzUx5QYpnQV7LJE7',
  hours: ['Lunes a viernes · 8:00 am – 6:00 pm', 'Sábados · 8:00 am – 3:00 pm'],
  distributor: 'Ferreherramientas Ventura',
};

/**
 * La revista a pantalla completa. Es una página aparte (`revista/index.html`),
 * no un ancla: así el enlace que se manda por WhatsApp abre solo el catálogo,
 * sin el resto de la web. La barra final importa — en el `dist` es un
 * directorio, y sin ella algunos servidores redirigen antes de servirla.
 */
export const READER_PATH = '/revista/';

/** Mensaje con el que se comparte la revista. */
export const READER_SHARE = {
  title: 'Catálogo Roberto Music',
  text: 'Catálogo de iluminación, sonido y efectos de Roberto Music, Santo Domingo.',
};

export function waLink(number: string = site.whatsappPrimary, message: string = site.whatsappMessage): string {
  return 'https://wa.me/' + number.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(message);
}
