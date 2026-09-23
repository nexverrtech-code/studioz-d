import { useRef } from 'react';

/**
 * Touch swipe detection for the lightbox and mobile carousels.
 *
 * Returns handlers to spread onto an element. A gesture only counts when it
 * is mostly horizontal and clears the distance threshold — so a vertical
 * scroll never fires a "next image", which is the usual bug in hand-rolled
 * swipe code.
 */
export const useSwipe = ({ onSwipeLeft, onSwipeRight, threshold = 52 } = {}) => {
  const start = useRef(null);

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    start.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  };

  const onTouchEnd = (event) => {
    if (!start.current) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.current.x;
    const dy = touch.clientY - start.current.y;
    const elapsed = Date.now() - start.current.time;
    start.current = null;

    // Ignore long presses and gestures that are more vertical than horizontal.
    if (elapsed > 900) return;
    if (Math.abs(dx) < threshold) return;
    if (Math.abs(dx) < Math.abs(dy) * 1.2) return;

    if (dx < 0) onSwipeLeft?.();
    else onSwipeRight?.();
  };

  const onTouchCancel = () => {
    start.current = null;
  };

  return { onTouchStart, onTouchEnd, onTouchCancel };
};

export default useSwipe;
