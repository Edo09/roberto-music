import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import { fullSrc, gridSrcSet } from '../lib/images';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> {
  src: string;
  /** Usa la copia a resolución completa (lightbox), no las variantes de rejilla. */
  full?: boolean;
}

/**
 * Imagen responsiva que sirve WebP con el JPEG original como respaldo, y que
 * aparece con un fundido al terminar de cargar en vez de aparecer de golpe.
 * Comprueba `complete` al montar para que las imágenes ya cacheadas no se
 * queden invisibles.
 */
export default function Media({ className, src, sizes, full = false, ...rest }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={full ? fullSrc(src) : gridSrcSet(src)}
        sizes={full ? undefined : sizes}
      />
      <img
        ref={ref}
        src={src}
        sizes={sizes}
        className={['media', loaded && 'is-loaded', className].filter(Boolean).join(' ')}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        {...rest}
      />
    </picture>
  );
}
