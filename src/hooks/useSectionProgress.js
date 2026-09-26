import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

/**
 * How far a section has travelled through the viewport, as a motion value
 * between 0 and 1.
 *
 * Two modes:
 *   `pin`   0 when the section's top reaches the top of the viewport, 1 when
 *           its bottom does. This is the one to use with a `sticky` child —
 *           the progress runs for exactly as long as the child stays pinned.
 *   `exit`  0 when the section's top reaches the top of the viewport, 1 once
 *           the section has scrolled fully past it.
 *
 * WHY A FRAME LOOP AND NOT A SCROLL LISTENER
 * ------------------------------------------
 * Two things rule out the obvious implementations:
 *
 *  - Framer's `useScroll({ target, offset })` resolves its own scroll
 *    container by walking the DOM. It reports correctly for a short target
 *    with `['start start', 'end start']`, but stays pinned at 0 for a tall
 *    target with `['start start', 'end end']` — exactly the case a pinned
 *    scroll scene needs.
 *  - A plain `scroll` listener is not reliable either. Lenis drives smooth
 *    scrolling on pointer devices and emits its own event, but it is disabled
 *    on touch and under reduced motion, and the environments where it is off
 *    are precisely the ones where the native event proved unreliable.
 *
 * So this reads the rect on `requestAnimationFrame`, which is what every
 * scroll-scene library does in the end. The loop only runs while the section
 * is actually near the viewport — an IntersectionObserver starts and stops it
 * — so an off-screen section costs nothing, and one `getBoundingClientRect`
 * per frame on a single element is cheap enough to be invisible in a profile.
 */
export const useSectionProgress = (ref, { mode = 'pin' } = {}) => {
  const progress = useMotionValue(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let frame = 0;

    const read = () => {
      const rect = node.getBoundingClientRect();
      const travel = mode === 'pin' ? rect.height - window.innerHeight : rect.height;

      if (travel <= 0) {
        progress.set(rect.top <= 0 ? 1 : 0);
        return;
      }

      const value = -rect.top / travel;
      progress.set(value < 0 ? 0 : value > 1 ? 1 : value);
    };

    const loop = () => {
      read();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      // Settle on whichever end of the range the section left through.
      read();
    };

    // A margin either side, so the first frame after the section appears is
    // already correct rather than snapping from a stale value.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: '20% 0px' }
    );

    observer.observe(node);
    read();

    /*
     * Belt and braces. `requestAnimationFrame` is suspended outright while the
     * document is hidden, and some embedded browser views throttle it hard, so
     * a plain scroll listener runs alongside it. Whichever fires, the read is
     * idempotent — it derives the value from the rect rather than accumulating.
     */
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    const lenis = typeof window !== 'undefined' ? window.__lenis : null;
    lenis?.on?.('scroll', read);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
      lenis?.off?.('scroll', read);
    };
  }, [ref, progress, mode]);

  return progress;
};

export default useSectionProgress;
