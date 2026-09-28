import { useLayoutEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * A single line of type sized to fill its container exactly.
 *
 * Used for the footer's oversized wordmark, where a `vw` guess either leaves a
 * gap on wide screens or overflows at 320px depending on how the webfont's
 * glyphs happen to measure. This measures instead: render at 100px, read the
 * real width, scale to the space available.
 *
 * Letter-spacing set in `em` scales with the size, so one measurement is
 * exact. It re-fits when the container resizes and once more when webfonts
 * finish loading, because the fallback serif and Cormorant are not the same
 * width. The size is written straight to the element's style, so fitting
 * never triggers a React render.
 */
export const FitText = ({ children, className, textClassName, max = 320, as: Tag = 'span' }) => {
  const boxRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return undefined;

    let lastWidth = -1;

    const fit = () => {
      const available = box.clientWidth;
      if (!available || available === lastWidth) return;
      lastWidth = available;

      text.style.fontSize = '100px';
      const natural = text.scrollWidth;
      if (!natural) return;

      // A hair under 100% so sub-pixel rounding can never tip it into overflow.
      const size = Math.min(max, (available / natural) * 100 * 0.995);
      text.style.fontSize = `${size.toFixed(2)}px`;
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(box);

    let cancelled = false;
    document.fonts?.ready?.then(() => {
      if (cancelled) return;
      lastWidth = -1;
      fit();
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [max]);

  return (
    <div ref={boxRef} className={cn('w-full', className)}>
      <Tag ref={textRef} className={cn('inline-block whitespace-nowrap', textClassName)}>
        {children}
      </Tag>
    </div>
  );
};

export default FitText;
