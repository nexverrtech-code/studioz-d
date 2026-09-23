import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/components/navigation/Header';
import { Footer } from './Footer';
import { ContactDock } from './ContactDock';
import { CustomCursor } from '@/components/common/CustomCursor';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { RouteLoader } from '@/components/common/States';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useAnalyticsPageView } from '@/hooks/useAnalyticsPageView';

/** Routes whose hero sits under a transparent header. */
const TRANSPARENT_HEADER_ROUTES = ['/'];

/**
 * The customer-facing shell.
 *
 * Layout contract every page relies on:
 *  - the header is fixed; pages that are not hero-led add `pt-header`
 *  - `main` grows to fill the viewport so short pages still pin the footer
 *  - `pb-dock` reserves the mobile contact bar's height before the footer
 */
export const SiteLayout = () => {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();
  const transparentHeader = TRANSPARENT_HEADER_ROUTES.includes(location.pathname);

  // Fires page_view and restarts scroll-depth tracking on every route change.
  useAnalyticsPageView();

  return (
    <div className="flex min-h-svh flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <ScrollToTop />
      <CustomCursor />
      <Header transparent={transparentHeader} />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.26, ease: 'easeOut' }}
          >
            <Suspense fallback={<RouteLoader />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Reserves the mobile dock's height so it never overlaps the footer. */}
      <div className="pb-dock">
        <Footer />
      </div>

      <ContactDock />
    </div>
  );
};

export default SiteLayout;
