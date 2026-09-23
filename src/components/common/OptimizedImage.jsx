import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { aspectValue, buildSources, SIZES } from '@/utils/images';

/**
 * The single image component for the whole site.
 *
 * Responsibilities it owns so no gallery ever re-implements them:
 *  - reserves its box via `aspect-ratio` + width/height → zero layout shift
 *  - lazy loads by default, eagerly for above-the-fold imagery
 *  - emits AVIF/WebP `<source>` entries and a width srcset for raster files
 *    (skipped automatically for the shipped SVG placeholders)
 *  - blur-up transition from a tinted placeholder to the sharp image
 *  - an on-brand fallback panel when a file is missing, instead of the
 *    browser's broken-image glyph
 *
 * `alt=""` is respected: decorative images are correctly hidden from
 * assistive technology rather than given filler text.
 */
export const OptimizedImage = ({
  src,
  alt = '',
  width,
  height,
  aspect,
  sizes = SIZES.half,
  priority = false,
  className,
  imgClassName,
  objectFit = 'cover',
  objectPosition = 'center',
  /** Rendered above the image inside the same frame (captions, overlays). */
  children,
  onLoad,
  ...rest
}) => {
  const [status, setStatus] = useState('loading');
  const imgRef = useRef(null);

  const ratio = aspectValue({ aspect, width, height });
  const { sources, srcSet } = buildSources(src);

  // A cached image can finish before React attaches onLoad, which would leave
  // the blur-up stuck. Check `complete` once mounted to cover that race.
  useEffect(() => {
    const node = imgRef.current;
    if (node?.complete && node.naturalWidth > 0) setStatus('loaded');
  }, [src]);

  const handleLoad = (event) => {
    setStatus('loaded');
    onLoad?.(event);
  };

  return (
    <div
      className={cn('relative overflow-hidden bg-ivory-200', className)}
      style={{ aspectRatio: ratio }}
      data-status={status}
    >
      {/* Skeleton sits behind the image and is revealed only while loading. */}
      {status === 'loading' && (
        <div className="sd-skeleton absolute inset-0" aria-hidden="true" />
      )}

      {status === 'error' ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ivory-200 px-4 text-center"
          role="img"
          aria-label={alt || 'Image unavailable'}
        >
          <span className="font-display text-fluid-lg tracking-widest-xl text-ink-400">
            STUDIOZ D
          </span>
          <span className="text-[0.66rem] uppercase tracking-widest-xl text-ink-300">
            Image unavailable
          </span>
        </div>
      ) : (
        <picture>
          {sources.map((source) => (
            <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
          ))}
          <img
            ref={imgRef}
            src={src}
            srcSet={srcSet || undefined}
            sizes={srcSet ? sizes : undefined}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchpriority={priority ? 'high' : 'auto'}
            draggable={false}
            onLoad={handleLoad}
            onError={() => setStatus('error')}
            className={cn(
              'sd-blur-up absolute inset-0 h-full w-full',
              imgClassName
            )}
            style={{ objectFit, objectPosition }}
            data-loaded={status === 'loaded'}
            {...rest}
          />
        </picture>
      )}

      {children}
    </div>
  );
};

export default OptimizedImage;
