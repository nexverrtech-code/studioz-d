import { useEffect } from 'react';

/**
 * Locks page scroll while a drawer, lightbox or filter sheet is open.
 *
 * IMPORTANT — why this does NOT use `position: fixed` on <body>:
 * that classic trick makes <body> a containing block for every
 * `position: fixed` descendant. The overlay doing the locking then resolves
 * `inset: 0` against the full document box instead of the viewport, and ends
 * up rendered at the top of the page rather than over it. `overflow: hidden`
 * on <html> and <body> stops scrolling just as effectively, preserves the
 * scroll position for free, and leaves fixed positioning alone.
 *
 * Layout shift: `scrollbar-gutter: stable` (set on <html> in globals.css)
 * reserves the scrollbar's width permanently, so hiding overflow changes
 * nothing. The measured fallback below covers browsers without that property
 * — it resolves to 0 where the gutter is already stable.
 */
export const useLockBodyScroll = (locked) => {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') return undefined;

    const { body, documentElement: html } = document;

    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };

    const widthBefore = html.clientWidth;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    // Only compensate if removing the scrollbar actually widened the page.
    const delta = html.clientWidth - widthBefore;
    if (delta > 0) {
      const existing = parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${existing + delta}px`;
    }

    return () => {
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPaddingRight;
    };
  }, [locked]);
};

export default useLockBodyScroll;
