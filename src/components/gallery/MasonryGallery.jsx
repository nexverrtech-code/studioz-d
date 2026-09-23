import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GalleryCard } from './GalleryCard';
import { distributeIntoColumns, SIZES } from '@/utils/images';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/utils/cn';

/**
 * Editorial masonry.
 *
 * Built from explicit flex columns rather than CSS `columns`, because CSS
 * columns reorder content top-to-bottom-then-across — which reads wrong and
 * breaks keyboard tab order.
 *
 * Images are assigned to whichever column is currently shortest (measured by
 * aspect ratio, not pixels), so columns finish roughly level while the mix of
 * portrait, landscape and square frames stays varied.
 *
 * Column count is a real layout decision per band:
 *   ≥1440px → 4   ≥1024px → 3   ≥640px → 2   <640px → 2 (1 below 400px)
 */
export const MasonryGallery = ({ photos = [], onOpen, className, startIndex = 0 }) => {
  const isXl = useMediaQuery('(min-width: 1440px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isSm = useMediaQuery('(min-width: 640px)');
  // Below 400px a two-up grid makes each frame too small to read.
  const isTiny = useMediaQuery('(max-width: 399px)');
  const reducedMotion = usePrefersReducedMotion();

  const columnCount = isXl ? 4 : isLg ? 3 : isSm ? 2 : isTiny ? 1 : 2;

  // Keep the original index so the lightbox opens the photograph that was
  // actually clicked, not its position within a column.
  const indexed = useMemo(
    () => photos.map((photo, index) => ({ ...photo, __index: startIndex + index })),
    [photos, startIndex]
  );

  const columns = useMemo(
    () => distributeIntoColumns(indexed, columnCount),
    [indexed, columnCount]
  );

  if (photos.length === 0) return null;

  return (
    <div
      className={cn('grid w-full max-w-full items-start gap-4 sm:gap-5 lg:gap-6', className)}
      style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
    >
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex min-w-0 flex-col gap-4 sm:gap-5 lg:gap-6">
          {column.map((photo, rowIndex) => (
            <motion.div
              key={photo.id ?? `${photo.src}-${rowIndex}`}
              className="min-w-0"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                // Stagger down each column rather than across, so the reveal
                // follows the reading direction of the grid.
                delay: reducedMotion ? 0 : Math.min(rowIndex * 0.06, 0.3),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GalleryCard
                photo={photo}
                index={photo.__index}
                onOpen={onOpen}
                sizes={SIZES.masonry}
                // Only the genuinely-above-the-fold row loads eagerly.
                priority={photo.__index < columnCount}
              />
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGallery;
