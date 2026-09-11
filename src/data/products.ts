export type Category =
  | 'cabezas'
  | 'par'
  | 'strobe'
  | 'laser'
  | 'humo'
  | 'bocinas'
  | 'consolas'
  | 'pantallas'
  | 'soportes';

export const categories: { key: Category; label: string }[] = [
  { key: 'cabezas', label: 'Cabezas móviles y Beam' },
  { key: 'par', label: 'PAR LED y barras' },
  { key: 'strobe', label: 'Strobe y blinder' },
  { key: 'laser', label: 'Láser' },
  { key: 'humo', label: 'Humo y efectos' },
  { key: 'bocinas', label: 'Bocinas y amplificación' },
  { key: 'consolas', label: 'Consolas y mezcladoras' },
  { key: 'pantallas', label: 'Pantallas y video' },
  /* Antes "Soportes y accesorios": con el inalámbrico dentro, el micrófono
     manda en la etiqueta. */
  { key: 'soportes', label: 'Micrófonos y soportes' },
];

/**
 * Disponibilidad mostrada en la ficha. Por defecto se asume 'disponible',
 * coherente con lo que ya afirma la página ("Equipos disponibles", "venta
 * directa en el local"). Para marcar un equipo que no está en el local,
 * agrégale `stock:'pedido'` a su entrada de abajo.
 */
export type Stock = 'disponible' | 'pedido';

export const DEFAULT_STOCK: Stock = 'disponible';

export const STOCK_LABEL: Record<Stock, string> = {
  disponible: 'En stock',
  pedido: 'Bajo pedido',
};

export interface Product {
  id: string;
  name: string;
  brand: string;
  cat: Category;
  featured: boolean;
  img: string;
  specs: [string, string, string];
  /** Omitido = DEFAULT_STOCK. */
  stock?: Stock;
  /** Opcional. Si lo pones (ej. 'RD$ 18,500'), se muestra en la ficha. */
  price?: string;
}

export const products: Product[] = [
    { id:'beam295', name:'Beam 295 14R', brand:'Roberto Music', cat:'cabezas', featured:true, img:'/assets/beam-295-14r.jpeg',
      specs:['Lámpara 295W 14R · 8000K · 10,000+ lúmenes','Beam 0–4° · 15–18 gobos · 13 colores + CMY','Zoom y focus motorizado · Pan 540° / Tilt 270°'] },
    { id:'beam230', name:'Beam 230 7R', brand:'Roberto Music', cat:'cabezas', featured:true, img:'/assets/beam-230-7r.jpeg',
      specs:['Lámpara 230W 7R · 8000 lúmenes','17 gobos + shake · 14 colores + rainbow','DMX 16CH · Prisma 8 facetas · 17–19 kg'] },
    { id:'beeeye', name:'Bee Eye 10+1 Moving Head', brand:'Roberto Music', cat:'cabezas', featured:true, img:'/assets/bee-eye-10-1.jpeg',
      specs:['10× 40W RGBW 4en1 + ojo central láser/beam','Aro LED Halo RGB con efectos · Zoom 5–60°','DMX 21/35/78CH · 500W · Display LCD'] },
    { id:'washzoom', name:'Wash Pro Zoom 19x15W', brand:'Roberto Music', cat:'cabezas', featured:true, img:'/assets/wash-pro-zoom-19x15.jpeg',
      specs:['19× 15W RGBW 4en1 OSRAM · 285W','Zoom motorizado 5–60° · 28,000 lux @1m','Wash · Beam · Pixel mapping · 9.5 kg'] },
    { id:'mini150', name:'Mini Beam 150W', brand:'Roberto Music', cat:'cabezas', featured:false, img:'/assets/mini-beam-150w.jpeg',
      specs:['LED 150W blanco 7500K · 50,000 horas','Beam 1.5–2° ultra definido · 3450 lux @5m','8 gobos rotativos · Prisma 18 facetas'] },
    { id:'mini100', name:'Mini Beam 100W + Aro Pixel', brand:'Roberto Music', cat:'cabezas', featured:false, img:'/assets/mini-beam-100w-aro-pixel.jpeg',
      specs:['100W + aro de 12 LED RGB en chase','Beam 2–12° · 37,000 lux @1m · DMX 15CH','Ficha comparativa 100W vs 150W'] },
    { id:'strobe1000', name:'Strobe Wash Blinder 1000W IP65', brand:'Roberto Music', cat:'strobe', featured:false, img:'/assets/strobe-wash-blinder-1000w.jpeg',
      specs:['480× 0.5W RGB + 144× 5W blanco 6500K','Strobe · Wash · Blinder · Chase · Tilt 185°','IP65 para exterior · Carcasa aluminio · 10 kg'] },
    { id:'barrabeam', name:'Barra Beam Moving 10x40W RGBW', brand:'Roberto Music', cat:'par', featured:false, img:'/assets/barra-beam-moving-10x40w.jpeg',
      specs:['10× 40W RGBW beam de 2° ultra estrecho','Tilt 230° motorizado · efecto rainbow','Pixel mapping individual · DMX RDM'] },
    { id:'par18', name:'PAR LED 18x18W RGBW 4en1', brand:'Roberto Music', cat:'par', featured:false, img:'/assets/par-led-18x18w.jpeg',
      specs:['200W · 18× 18W RGBW · ángulo 25°','DMX 4/8CH · Auto · Sound · Master/Slave','Carcasa de aluminio · 50,000 horas'] },
    { id:'fog3000', name:'Fog Machine 3000W', brand:'Roberto Music', cat:'humo', featured:false, img:'/assets/fog-machine-3000w.jpeg',
      specs:['3000W · salida 40,000 cu ft/min','Tanque 2.5L · alcance 8–10 metros','DMX 1CH + remoto inalámbrico + timer'] },
    { id:'hazer800', name:'Hazer 800W base aceite', brand:'Roberto Music', cat:'humo', featured:false, img:'/assets/hazer-800w.jpeg',
      specs:['Humo fino tipo neblina · no deja residuo','12,000 cu ft/min · tanque 1.2L removible','DMX 2CH + control LCD + remoto RF'] },
    { id:'fogger900', name:'900 Fogger', brand:'Roberto Music', cat:'humo', featured:false, img:'/assets/fogger-900w.jpeg',
      specs:['900W / 1000W · 10,000–15,000 cu ft/min','Disparo 6–8 m · tanque 1.5 / 2.3L','Control alámbrico e inalámbrico + DMX512'] },
    { id:'jetblaster', name:'Pistola de humo Jet Blaster', brand:'Roberto Music', cat:'humo', featured:false, img:'/assets/pistola-humo-jet-blaster.jpeg',
      specs:['Disparo de humo potente a mano','Correa para hombro incluida','Ideal para discotecas y eventos'] },
    { id:'supra16', name:'Consola Mixer Supra 16', brand:'Promax', cat:'consolas', featured:false, img:'/assets/consola-supra-16.jpeg',
      specs:['16 canales · 12 mono XLR/Jack + 2 estéreo','99 efectos DSP · EQ 3 bandas · phantom 48V','USB / Bluetooth / MP3 con display'] },
    { id:'supra8', name:'Consola Mixer Supra 8', brand:'Promax', cat:'consolas', featured:false, img:'/assets/consola-supra-8-promax.jpeg',
      specs:['8 canales MIC XLR + línea · EQ 3 bandas por canal','99 efectos DSP · Bluetooth / USB / MP3 con display','Phantom 48V · faders de 60mm · salida Master XLR'] },
    { id:'novop10a', name:'Blastking NOVO-P10A 10" Activa', brand:'Blastking', cat:'bocinas', featured:false, img:'/assets/blastking-novo-p10a.jpeg',
      specs:['800W Clase D bi-amp · SPL máximo 125 dB','DSP integrado 4 modos · Bluetooth TWS','Combo XLR / 1/4" · 11.24 kg'] },
    { id:'alebsw450', name:'ALED BSW 450 · Beam Spot Wash', brand:'Roberto Music', cat:'cabezas', featured:false, img:'/assets/aled-bsw-450.jpeg',
      specs:['LED 450W 7500K · 20,000 horas','3en1: Beam 2.5° · Spot zoom 4–50° · Wash frost 60°','CMY + CTO + rueda 14 colores · 24 gobos'] },
    { id:'beam200', name:'Beam 200W 5R', brand:'Roberto Music', cat:'cabezas', featured:false, img:'/assets/beam-200w.jpeg',
      specs:['200W 5R / LED 200W 8000K · 110,000 lm','Beam 2° · 150,000 lux @5m','17 gobos fijos + 17 rotativos · 14 colores'] },
    { id:'spot200', name:'Spot 200W Moving Head LED', brand:'Roberto Music', cat:'cabezas', featured:false, img:'/assets/spot-200w-moving-head.jpeg',
      specs:['200W LED blanco 6500K · 50,000 horas','Zoom motorizado 11–22° · 2 filtros frost','6 gobos rotativos + 7 colores con split'] },
    { id:'spider9', name:'Spider Beam 9 Ojos · Octopus', brand:'Roberto Music', cat:'cabezas', featured:false, img:'/assets/spider-beam-9-ojos.jpeg',
      specs:['9× 12W RGBW 4en1 CREE LED · 140W','Beam 4.5° · Pan 540° infinito / Tilt 120°','Se vende en pareja · chase de 3 zonas'] },
    { id:'movildoble', name:'Móvil Doble 4x60W Pixel · Giro Infinito', brand:'Roberto Music', cat:'cabezas', featured:false, img:'/assets/movil-doble-4x60w-pixel.jpeg',
      specs:['4× 60W RGBW + 64× 1.5W RGB pixel','Doble cara · Pan y Tilt infinitos 360°','Zoom 6–42° · 26,000 lux @5m · 350W'] },
    { id:'matrixmovil', name:'Matrix Móvil Pixel RGBW 5x5', brand:'Roberto Music', cat:'cabezas', featured:false, img:'/assets/matrix-movil-pixel-rgbw.jpeg',
      specs:['25× 10W CREE RGBW 4en1 · 400W','Control pixel individual 5×5 · 112CH','Pan 540° / Tilt 270° · 21 kg'] },
    { id:'robot2', name:'Robot Dos Bolas con Láser', brand:'Roberto Music', cat:'cabezas', featured:false, img:'/assets/robot-dos-bolas-laser.jpeg',
      specs:['8 LEDs × 10W RGBW · 120W','Láser rojo y verde integrado','Rotación Pan 360° infinita · modo strobo'] },
    { id:'robot3', name:'Robot Tres Bolas con Láser LED', brand:'Roberto Music', cat:'cabezas', featured:false, img:'/assets/robot-tres-bolas-laser.jpeg',
      specs:['3 cabezas independientes · Pan 540° / Tilt 270°','12× 10W RGBW 4en1 + strobo 4×15W','Láser RGB full color · 120–200W'] },
    { id:'par54', name:'PAR LED 54x3W RGB', brand:'Roberto Music', cat:'par', featured:false, img:'/assets/par-led-54x3w.jpeg',
      specs:['54 LEDs Luxeon 3W RGB · 162W','Ángulo 25° · DMX512 8 canales','Aluminio extruido · 50,000–60,000 horas'] },
    { id:'miniflat36', name:'LED Mini Flat Par 36x1W RGB', brand:'Roberto Music', cat:'par', featured:false, img:'/assets/mini-flat-par-36led.jpeg',
      specs:['36 LEDs × 1W RGB (12R/12G/12B) · 36–45W','DMX512 7/4CH · Auto · Sonido · Master-Slave','Carcasa ultra flat negra · 50,000 horas'] },
    { id:'barra18x10', name:'Barra LED RGBW 18x10W', brand:'Roberto Music', cat:'par', featured:false, img:'/assets/barra-led-18x10w.jpeg',
      specs:['18 LEDs de 10W RGBW 4en1 · 180W','Ángulo 40–45° · DMX 4/8/9/10 canales','Wash · strobo · dimmer · mezcla infinita'] },
    { id:'strobo88rgb', name:'Strobo 8+8 Atomic 1000W RGB', brand:'Roberto Music', cat:'strobe', featured:false, img:'/assets/strobo-8-8-atomic-rgb.jpeg',
      specs:['144× 5W blanco + ámbar + 480× RGB 3en1','Segmentos 8+8 + 20 RGB · Tilt 185°','PowerCON True1 · IP20 / IP65 opcional · 8.5 kg'] },
    { id:'strobo88led', name:'Strobo 8+8 Atomic LED 1000W', brand:'Roberto Music', cat:'strobe', featured:false, img:'/assets/strobo-8-8-atomic-led.jpeg',
      specs:['800× SMD 1.2W blanco 6500K · 1000W','8+8 segmentos controlables · DMX 2/6/8CH','Strobo 1–20 flashes/s · 5.7 kg'] },
    { id:'laser5w', name:'Láser 5W RGB Full Color Animación', brand:'Roberto Music', cat:'laser', featured:false, img:'/assets/laser-5w-rgb.jpeg',
      specs:['5W RGB · scanner 30KPPS · ángulo 60°','200+ patrones · 96 animaciones + 103 cartoon','DMX512 · ILDA · RJ45 · App Bluetooth'] },
    { id:'laser10w', name:'Láser 10W RGB Animación 10RGB', brand:'Roberto Music', cat:'laser', featured:false, img:'/assets/laser-10w-rgb.jpeg',
      specs:['10W RGB · diodo Mitsubishi / Nichia','Scanner 30–40KPPS · ángulo máx 60°','300+ patrones · SD Card · App LIGHT ELF'] },
    { id:'canonco2', name:'Cañón de CO2 RGB', brand:'Roberto Music', cat:'humo', featured:false, img:'/assets/canon-co2-rgb.jpeg',
      specs:['12× 3W RGB · 70W · DMX512 6 canales','Disparo 8–10 metros · presión máx 1600 PSI','Incluye manguera 3m + cables powerCON'] },
    { id:'firespray', name:'Máquina de Fuego Fire Spray', brand:'Roberto Music', cat:'humo', featured:false, img:'/assets/maquina-fuego-fire-spray.jpeg',
      specs:['80W · llama de 2 a 3.5 metros','DMX512 + manual con canal de seguridad','Aluminio premium · 5 kg · CE FCC RoHS'] },
    { id:'confetitanque', name:'Máquina de Confetis con Tanque', brand:'Roberto Music', cat:'humo', featured:false, img:'/assets/maquina-confetis-tanque.jpeg',
      specs:['Proyección 10–15m · cobertura 150 m²','Tolva 3–8 kg · 4 ángulos de salida','Flight case con ruedas · incluye tanque CO2'] },
    { id:'pistolaconfeti', name:'Pistola de Confetis 3 Cañones', brand:'Roberto Music', cat:'humo', featured:false, img:'/assets/pistola-confetis-3-canones.jpeg',
      specs:['Sistema manual de 3 cañones · alcance 8m','Batería 12V 3500mAh · 12h de autonomía','Cuerpo metálico · incluye cargador'] },
    { id:'cartuchos80', name:'Cartuchos de Confetis 80cm', brand:'Roberto Music', cat:'humo', featured:false, img:'/assets/cartuchos-confetis-80cm.jpeg',
      specs:['80 × 5 cm · pack de 3 unidades','Confeti metálico biodegradable multicolor','Alcance 6–8 m · compatible con la pistola'] },
    { id:'nx912', name:'Elite Audio NX 912 12" Activa', brand:'Elite Audio', cat:'bocinas', featured:false, img:'/assets/bocina-elite-nx912.jpeg',
      specs:['RMS 800W / Peak 1600W · ampli 600W','Woofer 12" 60 oz + driver titanio 51mm','DSP 4 modos · Bluetooth TWS · 18 kg'] },
    { id:'sub9003', name:'Elite Audio SUB 9003-AS II 18" Activo', brand:'Elite Audio', cat:'bocinas', featured:false, img:'/assets/sub-elite-9003as.jpeg',
      specs:['2200W Peak / 1100W RMS · SPL 135 dB','18" bobina 4" · respuesta 35–120 Hz','Gain · EQ · Phase · Xover · Delay · Cardioid'] },
    { id:'monitor6', name:'Elite Audio Monitor 6" Truss', brand:'Elite Audio', cat:'bocinas', featured:false, img:'/assets/monitor-elite-6-truss.jpeg',
      specs:['Pasivo 6" full range · 150W RMS / 300W peak','8 ohmios · 90 Hz–20 kHz · 88 dB','Soporte truss con bracket giratorio'] },
    { id:'teyuna6', name:'Mixer TEYUN A6 · 6 Canales', brand:'Teyun', cat:'consolas', featured:false, img:'/assets/mixer-teyun-a6.jpeg',
      specs:['4 mono XLR + estéreo 5/6 · +48V phantom','24 DSP 24bit/48kHz · Bluetooth + USB','Grabación USB / PC · 1.1 kg'] },
    { id:'teyuna8', name:'Mixer TEYUN A8 · 8 Canales', brand:'Teyun', cat:'consolas', featured:false, img:'/assets/mixer-teyun-a8.jpeg',
      specs:['6 MIC/LINE XLR/TRS + línea 7/8 + RCA','24 DSP · EQ 3 bandas ±15dB · HPF 80Hz','Bluetooth 5.0 · USB audio 2IN/2OUT'] },
    { id:'commandwing', name:'Command Wing Consola MA2', brand:'grandMA2', cat:'consolas', featured:false, img:'/assets/command-wing-ma2.jpeg',
      specs:['2048 parámetros en tiempo real','6 faders + 18 botones ejecutores','2 salidas DMX XLR 5-pin · grandMA2 onPC'] },
    { id:'minicommandwing', name:'Mini Command Wing Consola DMX', brand:'grandMA2', cat:'consolas', featured:false, img:'/assets/mini-command-wing-dmx.jpeg',
      specs:['2048 parámetros · backup 65,536','6 faders ejecutores + 4 encoder wheels','Compatible grandMA2 onPC · incluye bolso'] },
    { id:'pantallap391', name:'Pantalla LED P3.91 The Pulse', brand:'Roberto Music', cat:'pantallas', featured:false, img:'/assets/pantalla-led-p391.jpeg',
      specs:['Pitch 3.91mm · 3500–5000 nits · refresco 3840 Hz','Módulo 250×250 mm · cabinet 500×1000 mm · 110–220V','Ángulo 140° · 100,000 horas · incluye flight case'] },
    { id:'totemlcd', name:'Tótem Publicitario LCD 43" 55" 65"', brand:'Roberto Music', cat:'pantallas', featured:false, img:'/assets/totem-publicitario-lcd.jpeg',
      specs:['LCD 4K vertical · 500 nits · 43, 55 o 65 pulgadas','Android 11 · 2GB RAM · 16GB · WiFi, Ethernet, USB y HDMI','Parlantes integrados · control CMS desde celular o PC'] },
    { id:'micst161', name:'Micrófono Inalámbrico ST-161', brand:'Roberto Music', cat:'soportes', featured:false, img:'/assets/microfono-inalambrico-st161.jpeg',
      specs:['UHF 500–900 MHz · alcance de 50 metros','Batería recargable · display de frecuencia y carga','Receptor plug 6.3 mm con antena · función mute'] },
    { id:'pedestalvstar', name:'Pedestal para Micrófono V-STAR V-200', brand:'V-Star', cat:'soportes', featured:false, img:'/assets/pedestal-microfono-vstar-v200.jpeg',
      specs:['Altura 95–160 cm · brazo boom 54–84 cm','Acero al carbón + ABS · trípode 30 cm','Incluye 2 clips + adaptadores 3/8" y 5/8"'] },
];

export const featured = products.filter((p) => p.featured);

/** Quita acentos y pasa a minúsculas, para que "laser" encuentre "láser". */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/** Texto buscable por producto: nombre, marca, categoría y especificaciones. */
export const searchIndex = new Map<string, string>(
  products.map((p) => {
    const cat = categories.find((c) => c.key === p.cat)?.label ?? '';
    return [p.id, normalize([p.name, p.brand, cat, ...p.specs].join(' '))];
  }),
);
