import { useState } from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { GalleryLightbox } from './GalleryLightbox';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';
import { trackLightboxOpen } from '@/services/analytics.service';

/**
 * Project story gallery.
 *
 * Deliberately NOT a uniform grid. Images are grouped into a repeating
 * sequence of layouts — full-bleed, pair, triplet, offset — so the page reads
 * as a story with pacing rather than a contact sheet.
 *
 * The pattern cycles, so a project with five images and one with twelve both
 * get a considered composition without any per-project configuration.
 */

/** Layout blocks, in the order they repeat. `take` = images consumed. */
const PATTERN = [
  { id: 'full', take: 1 },
  { id: 'pair', take: 2 },
  { id: 'offset', take: 2 },
  { id: 'triplet', take: 3 },
  { id: 'wide', take: 1 },
  { id: 'pair', take: 2 },
];

/** Chunks the image list into layout blocks. */
const buildBlocks = (images) => {
  const blocks = [];
  let cursor = 0;
  let patternIndex = 0;

  while (cursor < images.length) {
    const template = PATTERN[patternIndex % PATTERN.length];
    const slice = images.slice(cursor, cursor + template.take);

    // A partial block at the end falls back to a layout that fits it,
    // rather than rendering a two-up grid with one image in it.
    const id =
      slice.length === template.take
        ? template.id
        : slice.length === 1
          ? 'full'
          : 'pair';

    blocks.push({ id, images: slice, startIndex: cursor });
    cursor += slice.length;
    patternIndex += 1;
  }

  return blocks;
};

const Frame = ({ image, index, onOpen, sizes, className, imgClassName }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`View image ${index + 1}: ${image.alt}`}
      className={cn('group block w-full max-w-full text-left', className)}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <OptimizedImage
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        aspect={image.aspect}
        sizes={sizes}
        className="w-full"
        imgClassName={cn(
          'transition-transform duration-[900ms] ease-editorial hoverable:group-hover:scale-[1.03]',
          imgClassName
        )}
      />
      {image.caption && (
        <span className="mt-3 block text-[0.62rem] uppercase tracking-widest-xl text-ink-400">
          {image.caption}
        </span>
      )}
    </motion.button>
  );
};

export const ProjectGallery = ({ images = [], title = '', category = '', className }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (images.length === 0) return null;

  const open = (index) => {
    trackLightboxOpen('project-gallery');
    setLightboxIndex(index);
  };

  const blocks = buildBlocks(images);
  // The lightbox shows project context in its header, which raw image
  // records do not carry — attach it here rather than duplicating it in data.
  const lightboxPhotos = images.map((image) => ({
    ...image,
    workTitle: image.workTitle ?? title,
    category: image.category ?? category,
  }));

  return (
    <>
      <div className={cn('flex flex-col gap-10 sm:gap-14 lg:gap-20', className)}>
        {blocks.map((block, blockIndex) => {
          const key = `${block.id}-${blockIndex}`;

          if (block.id === 'full' || block.id === 'wide') {
            return (
              <div key={key} className={block.id === 'wide' ? 'shell-wide' : 'shell'}>
                <Frame
                  image={block.images[0]}
                  index={block.startIndex}
                  onOpen={open}
                  sizes={SIZES.full}
                />
              </div>
            );
          }

          if (block.id === 'pair') {
            return (
              <div key={key} className="shell">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-8">
                  {block.images.map((image, i) => (
                    <Frame
                      key={image.src}
                      image={image}
                      index={block.startIndex + i}
                      onOpen={open}
                      sizes={SIZES.half}
                    />
                  ))}
                </div>
              </div>
            );
          }

          if (block.id === 'offset') {
            return (
              <div key={key} className="shell">
                <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12 lg:gap-10">
                  <Frame
                    image={block.images[0]}
                    index={block.startIndex}
                    onOpen={open}
                    sizes={SIZES.half}
                    className="sm:col-span-7"
                  />
                  {/* Offset only on wide screens — on mobile it would push
                      the second image out of its container. */}
                  <Frame
                    image={block.images[1]}
                    index={block.startIndex + 1}
                    onOpen={open}
                    sizes={SIZES.third}
                    className="sm:col-span-5 lg:translate-y-12"
                  />
                </div>
              </div>
            );
          }

          return (
            <div key={key} className="shell">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
                {block.images.map((image, i) => (
                  <Frame
                    key={image.src}
                    image={image}
                    index={block.startIndex + i}
                    onOpen={open}
                    sizes={SIZES.third}
                    // The third image in a triplet spans both mobile columns
                    // rather than leaving an orphan half-width frame.
                    className={i === 2 ? 'col-span-2 sm:col-span-1' : ''}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <GalleryLightbox
        photos={lightboxPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
};

export default ProjectGallery;
