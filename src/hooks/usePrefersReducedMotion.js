import { useMediaQuery } from './useMediaQuery';

/**
 * True when the visitor has asked their OS to reduce motion.
 *
 * Used to skip JS-driven animation entirely rather than just shortening it.
 * The CSS side is handled globally in `styles/animations.css`; this hook
 * covers GSAP timelines, Lenis and Framer Motion, which CSS cannot reach.
 */
export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)');

export default usePrefersReducedMotion;
