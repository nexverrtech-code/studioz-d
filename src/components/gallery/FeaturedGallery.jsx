import { useState } from 'react';
import { GalleryCard } from './GalleryCard';
import { GalleryLightbox } from './GalleryLightbox';
import { Reveal } from '@/components/motion/Reveal';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';
import { trackLightboxOpen } from '@/services/analytics.service';

/**
 * Home-page featured gallery.
 *
 * An asymmetric editorial arrangement on desktop, built from explicit grid
 * spans rather than a masonry algorithm — a curated set of eight deserves a
 * deliberate composition, not an automatic one.
 *
 * Tablet drops to a clean two-column grid; mobile to a single column with
 * alternating widths so it still has rhythm.
 */

/** Desktop placement. Each entry is [colSpan, rowSpan] on a 12-col grid. */
const DESKTOP_LAYOUT = [
  { col: 'lg:col-span-5', row: 'lg:row-span-2', aspect: '3/4' },
  { col: 'lg:col-span-4', row: '', aspect: '4/3' },
  { col: 'lg:col-span-3', row: 'lg:row-span-2', aspect: '2/3' },
  { col: 'lg:col-span-4', row: '', aspect: '1/1' },
  { col: 'lg:col-span-3', row: '', aspect: '4/5' },
  { col: 'lg:col-span-5', row: '', aspect: '3/2' },
  { col: 'lg:col-span-4', row: '', aspect: '4/5' },
  { col: 'lg:col-span-4', row: '', aspect: '4/3' },
];

export const FeaturedGallery = ({ photos = [], className }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (photos.length === 0) return null;

  const open = (index) => {
    trackLightboxOpen('featured-gallery');
    setLightboxIndex(index);
  };

  return (
    <>
      <div
        className={cn(
          'grid w-full max-w-full gap-4 sm:gap-5 lg:auto-rows-[minmax(0,auto)] lg:grid-cols-12 lg:gap-6',
          'grid-cols-1 sm:grid-cols-2',
          className
        )}
      >
        {photos.map((photo, index) => {
          const layout = DESKTOP_LAYOUT[index % DESKTOP_LAYOUT.length];
          return (
            <Reveal
              key={photo.id ?? `${photo.src}-${index}`}
              direction="up"
              delay={Math.min(index * 0.05, 0.3)}
              className={cn('min-w-0', layout.col, layout.row)}
            >
              <GalleryCard
                photo={photo}
                index={index}
                onOpen={open}
                sizes={SIZES.third}
                priority={index < 2}
              />
            </Reveal>
          );
        })}
      </div>

      <GalleryLightbox
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
};

export default FeaturedGallery;
