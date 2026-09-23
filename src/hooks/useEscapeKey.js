import { useEffect, useRef } from 'react';

/**
 * Calls `handler` when Escape is pressed while `active` is true.
 *
 * Listens on `document` rather than via React's onKeyDown on the overlay
 * panel, because bubbling is not reliable for this key. In particular,
 * `<input type="search">` has native Escape behaviour (clear the field) that
 * consumes the event before it reaches an ancestor handler — which left the
 * search overlay impossible to dismiss with the keyboard.
 *
 * The handler is held in a ref so passing an inline arrow function does not
 * tear the listener down and rebuild it on every render.
 */
export const useEscapeKey = (active, handler) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!active || typeof document === 'undefined') return undefined;

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      handlerRef.current?.(event);
    };

    // Capture phase, so the overlay wins even if an inner control would
    // otherwise handle (or swallow) the key first.
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [active]);
};

export default useEscapeKey;
