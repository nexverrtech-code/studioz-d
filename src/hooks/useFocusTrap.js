import { useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Traps Tab focus inside a container while it is active, and restores focus
 * to whatever was focused before it opened.
 *
 * Required for the mobile drawer and the lightbox: without it, tabbing walks
 * straight out of the overlay and into the page behind it.
 */
export const useFocusTrap = (active, { initialFocusRef } = {}) => {
  const containerRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!active || typeof document === 'undefined') return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    previouslyFocused.current = document.activeElement;

    // Move focus in, preferring an explicit target (usually the close button).
    const focusFirst = () => {
      const target =
        initialFocusRef?.current ?? container.querySelector(FOCUSABLE) ?? container;
      target?.focus?.({ preventScroll: true });
    };
    const raf = window.requestAnimationFrame(focusFirst);

    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return;

      const focusables = Array.from(container.querySelectorAll(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null || node === document.activeElement
      );
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus?.({ preventScroll: true });
    };
  }, [active, initialFocusRef]);

  return containerRef;
};

export default useFocusTrap;
