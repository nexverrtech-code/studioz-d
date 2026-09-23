import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll on navigation.
 *
 * Two behaviours a SPA needs and does not get for free:
 *  - POP (back/forward) keeps the browser's restored position
 *  - a `#hash` scrolls to its target, offset by the sticky header
 *
 * Lenis is told to jump too, otherwise its internal position desyncs from the
 * real scroll and the next wheel event snaps the page back.
 */
export const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const navigationType = window.history.state?.idx !== undefined ? 'PUSH' : 'POP';

    if (hash) {
      // Let the incoming route paint before measuring the anchor.
      const timer = setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          const headerHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--sd-header-h'),
            10
          );
          const top =
            target.getBoundingClientRect().top +
            window.scrollY -
            (Number.isNaN(headerHeight) ? 80 : headerHeight) -
            16;
          window.__lenis?.scrollTo(top, { immediate: true });
          window.scrollTo({ top, behavior: 'auto' });
        }
      }, 60);
      return () => clearTimeout(timer);
    }

    if (navigationType === 'POP' && window.history.scrollRestoration === 'auto') return;

    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return undefined;
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToTop;
