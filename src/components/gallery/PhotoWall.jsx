import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SIZES } from '@/utils/images';
import { pad2 } from '@/utils/format';
import { cn } from '@/utils/cn';

/**
 * "The Studioz D Wall" — a small number of full-width cinematic frames.
 *
 * Deliberately limited to a handful of photographs: making every image
 * full-bleed would turn the page into an endless scroll, which is exactly
 * what the brief warns against.
 *
 * The parallax is subtle (image scaled slightly and drifted within a clipped
 * frame) so the photograph never detaches from its caption.
 */
const WallFrame = ({ photo, index }) => {
  const frameRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <article ref={frameRef} className="relative">
      <Link
        to={`/works/${photo.workSlug}`}
        data-cursor="story"
        className="group relative block"
        aria-label={`Open ${photo.workTitle} — ${photo.category}`}
      >
        {/* Fixed viewport height, so the caption position is predictable and
            the section length is known in advance. */}
        <div className="relative h-[68svh] min-h-[380px] w-full overflow-hidden bg-ink-900 sm:h-[76svh]">
          <motion.div
            className="absolute inset-x-0 -top-[6%] h-[112%]"
            style={reducedMotion ? undefined : { y }}
          >
            <OptimizedImage
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes={SIZES.full}
              className="h-full w-full"
              imgClassName="h-full w-full"
              style={{ aspectRatio: 'auto' }}
            />
          </motion.div>

          {/* Scrim — only as strong as the caption needs, so the photograph
              is never buried under it. */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/15 to-ink-950/25"
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 bottom-0">
            <div className="shell pb-8 sm:pb-12">
              <div className="flex items-end justify-between gap-6">
                <div className="flex min-w-0 flex-col gap-2">
                  <span className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-widest-xl text-champagne-400">
                    <span className="tabular-nums">{pad2(index + 1)}</span>
                    <span className="h-px w-8 bg-champagne-400/50" aria-hidden="true" />
                    {photo.category}
                  </span>
                  <h3 className="font-display text-fluid-4xl uppercase leading-none tracking-[0.02em] text-ivory-100">
                    {photo.workTitle}
                  </h3>
                </div>

                <span className="mb-2 hidden shrink-0 items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-widest-xl text-ivory-100 sm:flex">
                  View Story
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export const PhotoWall = ({ photos = [], className }) => {
  if (photos.length === 0) return null;

  return (
    /**
     * Note: Framer Motion logs a dev-only "container has a non-static
     * position" warning for any window-scrolled `useScroll({ target })`. It
     * walks `offsetParent` upward looking for the scroll container, but that
     * chain always terminates at <body>, whose offsetParent is null by spec —
     * so the check can never succeed and the warning is a false positive. It
     * is stripped from production builds. `relative` here is kept because it
     * is correct for the frames regardless.
     */
    <section className={cn('relative', className)} aria-label="The Studioz D Wall">
      <div className="relative flex flex-col">
        {photos.map((photo, index) => (
          <WallFrame key={`${photo.workSlug}-${index}`} photo={photo} index={index} />
        ))}
      </div>
    </section>
  );
};

export default PhotoWall;
