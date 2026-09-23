import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, observeScrollDepth } from '@/services/analytics.service';

/**
 * Fires a `page_view` on every route change and restarts scroll-depth
 * tracking for the new page.
 *
 * The small delay lets the incoming route set `document.title` first, so the
 * event carries the right page title rather than the previous one.
 */
export const useAnalyticsPageView = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const path = `${pathname}${search}`;

    const timer = setTimeout(() => {
      trackPageView({ path, title: document.title });
    }, 120);

    const stopScrollDepth = observeScrollDepth(path);

    return () => {
      clearTimeout(timer);
      stopScrollDepth();
    };
  }, [pathname, search]);
};

export default useAnalyticsPageView;
