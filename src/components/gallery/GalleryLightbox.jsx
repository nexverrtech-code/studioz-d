import { useCallback, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useSwipe } from '@/hooks/useSwipe';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { setLenisStopped } from '@/hooks/useLenis';
import { pad2 } from '@/utils/format';

/**
 * Full-screen lightbox.
 *
 * Interaction:
 *   Escape → close    ← / → → previous / next
 *   swipe left → next     swipe right → previous
 *   click the backdrop → close (clicks on the image itself do not)
 *
 * Performance: only the current image plus its immediate neighbours are
 * preloaded. A hundred-image gallery never fetches a hundred full-resolution
 * files.
 *
 * Overflow: the image is capped with `max-height` in `svh` units and
 * `object-contain`, so it always fits inside the viewport — including mobile
 * Safari, where `vh` lies about the visible area.
 *
 * Rendered through a portal so no ancestor's `overflow` or `transform` can
 * clip it.
 */
export const GalleryLightbox = ({ photos = [], index, onClose, onNavigate }) => {
  const open = index !== null && index >= 0 && index < photos.length;
  const closeRef = useRef(null);
  const containerRef = useFocusTrap(open, { initialFocusRef: closeRef });
  const reducedMotion = usePrefersReducedMotion();

  useLockBodyScroll(open);

  const photo = open ? photos[index] : null;

  const goNext = useCallback(() => {
    if (!open) return;
    onNavigate((index + 1) % photos.length);
  }, [open, index, photos.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (!open) return;
    onNavigate((index - 1 + photos.length) % photos.length);
  }, [open, index, photos.length, onNavigate]);

  const swipeHandlers = useSwipe({ onSwipeLeft: goNext, onSwipeRight: goPrev });

  // Smooth scrolling must pause, or the page drifts behind the overlay.
  useEffect(() => {
    setLenisStopped(open);
    return () => setLenisStopped(false);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, goNext, goPrev]);

  // Preload only the neighbours — enough for instant paging, nothing more.
  const neighbours = useMemo(() => {
    if (!open || photos.length < 2) return [];
    const next = photos[(index + 1) % photos.length];
    const prev = photos[(index - 1 + photos.length) % photos.length];
    return [next?.src, prev?.src].filter(Boolean);
  }, [open, index, photos]);

  useEffect(() => {
    if (neighbours.length === 0) return;
    const images = neighbours.map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });
    return () => images.forEach((image) => {
      image.src = '';
    });
  }, [neighbours]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && photo && (
        <motion.div
          className="fixed inset-0 z-lightbox flex flex-col bg-ink-950/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.24 }}
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index + 1} of ${photos.length}: ${photo.alt}`}
          {...swipeHandlers}
        >
          {/* Top bar */}
          <div
            className="flex shrink-0 items-start justify-between gap-4 px-gutter py-4"
            style={{ paddingTop: 'calc(1rem + var(--sd-safe-t))' }}
          >
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-[0.6rem] font-semibold uppercase tracking-widest-xl text-champagne-500">
                {photo.category}
              </span>
              <span className="clamp-1 font-display text-fluid-lg text-ivory-100">
                {photo.workTitle}
              </span>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-ivory-200 transition-colors hover:text-ivory-50"
            >
              <X className="h-6 w-6" strokeWidth={1.3} aria-hidden="true" />
            </button>
          </div>

          {/* Stage. min-h-0 lets this flex child actually shrink, which is
              what keeps the image inside the viewport. */}
          <div
            className="flex min-h-0 flex-1 items-center justify-center px-2 sm:px-gutter"
            onClick={onClose}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                onClick={(event) => event.stopPropagation()}
                draggable={false}
                className="max-h-full max-w-full object-contain"
                style={{ maxHeight: 'min(100%, 78svh)' }}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, scale: 0.985 }}
                transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>

          {/* Bottom bar: caption, counter, controls */}
          <div
            className="flex shrink-0 flex-col gap-3 px-gutter py-4"
            style={{ paddingBottom: 'calc(1rem + var(--sd-safe-b))' }}
          >
            {photo.caption && (
              <p className="text-center text-[0.68rem] uppercase tracking-widest-xl text-ivory-300/70">
                {photo.caption}
              </p>
            )}

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                disabled={photos.length < 2}
                className="flex h-12 w-12 items-center justify-center border border-ivory-100/20 text-ivory-200 transition-colors hover:border-ivory-100/50 hover:text-ivory-50 disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </button>

              <p
                className="text-[0.72rem] tabular-nums tracking-widest-xl text-ivory-300"
                aria-live="polite"
              >
                <span className="text-ivory-50">{pad2(index + 1)}</span>
                <span className="mx-2 text-ivory-300/40">/</span>
                {pad2(photos.length)}
              </p>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                disabled={photos.length < 2}
                className="flex h-12 w-12 items-center justify-center border border-ivory-100/20 text-ivory-200 transition-colors hover:border-ivory-100/50 hover:text-ivory-50 disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default GalleryLightbox;
