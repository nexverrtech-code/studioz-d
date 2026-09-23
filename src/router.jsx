import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Home } from '@/pages/Home';
import { routableWorkCategories } from '@/data/works';

/**
 * Routing.
 *
 * Home ships in the main bundle because it is the most-requested entry point
 * and its LCP matters most. Everything else is lazy — including the whole
 * admin console and the charting library it pulls in, which no customer
 * should ever download.
 */

const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetails = lazy(() => import('@/pages/ServiceDetails'));
const Works = lazy(() => import('@/pages/Works'));
const WorkDetails = lazy(() => import('@/pages/WorkDetails'));
const Gifts = lazy(() => import('@/pages/Gifts'));
const GiftCategory = lazy(() => import('@/pages/GiftCategory'));
const GiftDetails = lazy(() => import('@/pages/GiftDetails'));
const Journal = lazy(() => import('@/pages/Journal'));
const JournalDetails = lazy(() => import('@/pages/JournalDetails'));
const Contact = lazy(() => import('@/pages/Contact'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const SitemapPage = lazy(() => import('@/pages/SitemapPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const PrivacyPolicy = lazy(() =>
  import('@/pages/Legal').then((module) => ({ default: module.PrivacyPolicy }))
);
const Terms = lazy(() =>
  import('@/pages/Legal').then((module) => ({ default: module.Terms }))
);

const AdminLayout = lazy(() => import('@/components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminAnalytics = lazy(() => import('@/pages/admin/AdminAnalytics'));
const AdminLeads = lazy(() => import('@/pages/admin/AdminLeads'));

/** Lazily loaded so the guard does not pull auth code into the main bundle. */
const RequireAuth = lazy(() => import('@/components/admin/RequireAuth'));

export const router = createBrowserRouter(
  [
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },

      /* ------------------------------------------------------- Services */
      { path: 'services', element: <Services /> },
      { path: 'services/:slug', element: <ServiceDetails /> },

      /* ---------------------------------------------------------- Works */
      { path: 'works', element: <Works /> },
      /**
       * Category routes are generated from the taxonomy, so the router, the
       * sitemap and the filter chips can never disagree about which
       * categories own a URL.
       *
       * They are declared as STATIC paths (not `works/:category`) because
       * `works/:slug` occupies the same position — React Router ranks a
       * static segment above a dynamic one, so /works/weddings resolves to
       * the category and /works/the-beginning to the project. The segment is
       * passed as a prop since a static path populates no params.
       */
      ...routableWorkCategories.map((category) => ({
        path: `works/${category.segment}`,
        element: <Works categorySegment={category.segment} />,
      })),
      { path: 'works/:slug', element: <WorkDetails /> },

      /* ---------------------------------------------------------- Gifts */
      { path: 'gifts', element: <Gifts /> },
      // The product route is declared first so `product` is never mistaken
      // for a category slug.
      { path: 'gifts/product/:slug', element: <GiftDetails /> },
      { path: 'gifts/:category', element: <GiftCategory /> },

      /* -------------------------------------------------------- Journal */
      { path: 'journal', element: <Journal /> },
      { path: 'journal/:slug', element: <JournalDetails /> },

      /* --------------------------------------------------------- Static */
      { path: 'contact', element: <Contact /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms', element: <Terms /> },
      { path: 'sitemap', element: <SitemapPage /> },

      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },

  /* ----------------------------------------------------------- Admin */
  // Outside SiteLayout: the console has its own shell, and should never
  // render the customer header, footer or contact dock.
  { path: '/admin/login', element: <AdminLogin /> },
  {
    path: '/admin',
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/analytics" replace /> },
      { path: 'analytics', element: <AdminAnalytics /> },
      { path: 'leads', element: <AdminLeads /> },
    ],
  },
  ],
  {
    /**
     * Opt in to the v7 behaviours now rather than inheriting them on upgrade.
     * (`v7_startTransition` is not a router-level flag — it belongs on
     * RouterProvider, and is set in App.jsx.)
     */
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
