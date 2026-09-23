import { useEffect, useRef, useState } from 'react';

/**
 * Scroll position state for the header.
 *
 * Reports whether the page has scrolled past a threshold, and which direction
 * the user is moving. Reads are batched into rAF so a fast scroll cannot
 * trigger a render per frame.
 */
export const useScrollState = ({ threshold = 24, hideThreshold = 160 } = {}) => {
  const [state, setState] = useState({ scrolled: false, direction: 'up', atTop: true });
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const read = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY.current;

      setState((previous) => {
        const scrolled = y > threshold;
        const atTop = y <= 2;
        // Ignore sub-pixel jitter, and never hide the header near the top.
        const direction =
          Math.abs(delta) < 4 || y < hideThreshold
            ? 'up'
            : delta > 0
              ? 'down'
              : 'up';

        if (
          previous.scrolled === scrolled &&
          previous.direction === direction &&
          previous.atTop === atTop
        ) {
          return previous;
        }
        return { scrolled, direction, atTop };
      });

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, hideThreshold]);

  return state;
};

/** Document scroll progress, 0 → 1. Used by the thin reading-progress bar. */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const read = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return progress;
};

export default useScrollState;
