import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Smooth scrolling.
 *
 * Deliberately conservative:
 * - Disabled entirely under `prefers-reduced-motion`.
 * - Disabled on touch devices, where native momentum scrolling is better than
 *   anything we would simulate, and where hijacking scroll causes real
 *   usability problems.
 * - Exposed on `window.__lenis` so GSAP ScrollTrigger and the lightbox can
 *   stop/start it without prop-drilling an instance through the tree.
 */
export const useLenis = () => {
  const lenisRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const isTouch = window.matchMedia('(hover: none)').matches;
    if (reducedMotion || isTouch) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      // Never smooth touch input — see note above.
      syncTouch: false,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, [reducedMotion]);

  return lenisRef;
};

/** Pauses Lenis while an overlay owns the scroll. Safe when Lenis is absent. */
export const setLenisStopped = (stopped) => {
  const lenis = typeof window !== 'undefined' ? window.__lenis : null;
  if (!lenis) return;
  if (stopped) lenis.stop();
  else lenis.start();
};

export default useLenis;
