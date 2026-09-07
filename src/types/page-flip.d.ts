/**
 * StPageFlip (paquete `page-flip`) se publica como bundle sin declaraciones de
 * tipos, así que aquí va la parte de su API que usa <CatalogBook>. Está copiada
 * de src/Settings.ts y src/PageFlip.ts del propio paquete; si alguna vez lo
 * actualizas, revisa que siga cuadrando.
 */
declare module 'page-flip' {
  /** Las páginas se declaran en el HTML con `data-density="hard" | "soft"`. */
  export type Orientation = 'portrait' | 'landscape';
  export type FlippingState = 'user_fold' | 'fold_corner' | 'flipping' | 'read';
  export type FlipCorner = 'top' | 'bottom';

  export interface FlipSetting {
    /** Página inicial. */
    startPage: number;
    /** 'fixed' respeta width/height; 'stretch' los usa como proporción. */
    size: 'fixed' | 'stretch';
    width: number;
    height: number;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    /** Sombras del pliegue mientras se pasa la hoja. */
    drawShadow: boolean;
    /** Duración de la animación, en ms. */
    flippingTime: number;
    /** Permite caer a una sola página cuando la pantalla es estrecha. */
    usePortrait: boolean;
    startZIndex: number;
    /** El contenedor toma el alto del libro. */
    autoSize: boolean;
    /** 0 = sin sombras, 1 = intensidad máxima. */
    maxShadowOpacity: number;
    /** Primera y última página como tapas duras, mostradas solas. */
    showCover: boolean;
    /** Deja que el dedo haga scroll vertical sobre el libro en móvil. */
    mobileScrollSupport: boolean;
    /** No pasa la página cuando el clic cae sobre un <a> o un <button>. */
    clickEventForward: boolean;
    useMouseEvents: boolean;
    swipeDistance: number;
    /** Dobla la esquina al pasar el puntero por encima. */
    showPageCorners: boolean;
    disableFlipByClick: boolean;
  }

  export interface WidgetEvent<T> {
    data: T;
    object: PageFlip;
  }

  export class PageFlip {
    constructor(element: HTMLElement, setting: Partial<FlipSetting>);

    /** Monta el libro a partir de los elementos de página ya existentes. */
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    /** Quita el contenedor y todos los listeners. */
    destroy(): void;
    /** Recalcula tamaños (el propio widget ya escucha el resize de la ventana). */
    update(): void;

    flipNext(corner?: FlipCorner): void;
    flipPrev(corner?: FlipCorner): void;
    flip(page: number, corner?: FlipCorner): void;
    turnToPage(page: number): void;

    getCurrentPageIndex(): number;
    getPageCount(): number;
    getOrientation(): Orientation;

    on(event: 'flip', callback: (e: WidgetEvent<number>) => void): PageFlip;
    on(event: 'changeOrientation', callback: (e: WidgetEvent<Orientation>) => void): PageFlip;
    on(event: 'changeState', callback: (e: WidgetEvent<FlippingState>) => void): PageFlip;
    on(
      event: 'init' | 'update',
      callback: (e: WidgetEvent<{ page: number; mode: Orientation }>) => void,
    ): PageFlip;
  }
}
