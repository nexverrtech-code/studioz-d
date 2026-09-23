import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight IntersectionObserver hook for reveal animations and lazy work.
 *
 * `once: true` (the default) disconnects after the first intersection, so a
 * long page does not keep hundreds of observers alive while scrolling.
 *
 * Degrades to "always visible" where IntersectionObserver is unavailable —
 * content must never be permanently hidden by a missing browser API.
 */
export const useInView = ({
  threshold = 0.18,
  rootMargin = '0px 0px -10% 0px',
  once = true,
} = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
};

export default useInView;
