import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { RouteLoader } from '@/components/common/States';
import { useLenis } from '@/hooks/useLenis';
import { initAnalytics } from '@/services/analytics.service';

/**
 * Application root.
 *
 * Responsibilities kept here and nowhere else:
 *  - one error boundary above the router
 *  - one Suspense boundary for the lazily-loaded admin shell
 *  - Lenis smooth scrolling (auto-disabled on touch and reduced-motion)
 *  - analytics bootstrap, only if a provider is configured
 *
 * Per-route metadata needs no provider: `components/seo/Seo` drives a small
 * head manager directly. See `components/seo/head-manager.js` for why.
 */
export const App = () => {
  useLenis();

  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteLoader />}>
        {/* v7_startTransition is a RouterProvider-level flag; the rest live
            on the router itself. Opting in now keeps lazy route loads
            non-blocking and avoids a behaviour change on upgrade. */}
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
