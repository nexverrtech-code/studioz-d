import { useEffect, useState } from 'react';

/**
 * Subscribes to a media query.
 *
 * Returns `false` during SSR/first paint rather than guessing, so layout
 * decisions never flash the wrong variant. Components that need a true
 * server-safe default should render the mobile layout first — it is the
 * safer fallback.
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const list = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);

    // Sync immediately — the query may have changed since the initial state.
    setMatches(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

/* Named breakpoints, matching `tailwind.config.js` exactly. */
export const useIsMobile = () => !useMediaQuery('(min-width: 768px)');
export const useIsTablet = () =>
  useMediaQuery('(min-width: 768px) and (max-width: 1023.98px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

/**
 * True only for devices with a precise pointer that can hover.
 * Every hover-dependent behaviour is gated on this, never on screen width —
 * a touch laptop has a wide screen and no hover.
 */
export const useCanHover = () => useMediaQuery('(hover: hover) and (pointer: fine)');

export default useMediaQuery;
