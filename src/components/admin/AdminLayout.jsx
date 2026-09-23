import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, Inbox, LogOut, Menu, X, ExternalLink, AlertTriangle } from 'lucide-react';
import { signOut, getCurrentUser } from '@/services/auth.service';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/utils/cn';

const NAV = [
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
  { label: 'Leads', to: '/admin/leads', icon: Inbox },
];

/**
 * Admin shell.
 *
 * Desktop → persistent sidebar
 * Tablet  → compact icon-first sidebar
 * Mobile  → drawer
 *
 * `data-surface="admin"` flips the design tokens to the darker working
 * palette, so the admin looks like a tool rather than a page of the website.
 */
export const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useFocusTrap(drawerOpen);
  const user = getCurrentUser();

  useLockBodyScroll(drawerOpen);
  useEscapeKey(drawerOpen, () => setDrawerOpen(false));

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const handleSignOut = () => {
    signOut();
    navigate('/admin/login', { replace: true });
  };

  const navList = (compact = false) => (
    <ul className="flex flex-col gap-1">
      {NAV.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex min-h-[46px] items-center gap-3 px-3 text-[0.74rem] font-semibold uppercase tracking-widest transition-colors',
                isActive
                  ? 'bg-ivory-100/10 text-ivory-50'
                  : 'text-ink-300 hover:bg-ivory-100/5 hover:text-ivory-100'
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
            <span className={cn('min-w-0 truncate', compact && 'xl:inline lg:hidden')}>
              {item.label}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );

  const sidebarBody = (
    <>
      <div className="flex flex-col gap-1 px-3 pb-6">
        <span className="font-display text-fluid-base uppercase tracking-[0.2em] text-ivory-100">
          Studioz<span className="text-champagne-500"> D</span>
        </span>
        <span className="text-[0.6rem] uppercase tracking-widest text-ink-400">Studio console</span>
      </div>

      <nav aria-label="Admin sections" className="flex-1">
        {navList()}
      </nav>

      <div className="flex flex-col gap-1 border-t border-ivory-100/10 pt-4">
        <NavLink
          to="/"
          className="flex min-h-[44px] items-center gap-3 px-3 text-[0.7rem] uppercase tracking-widest text-ink-300 transition-colors hover:text-ivory-100"
        >
          <ExternalLink className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
          View site
        </NavLink>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex min-h-[44px] w-full items-center gap-3 px-3 text-left text-[0.7rem] uppercase tracking-widest text-ink-300 transition-colors hover:text-ivory-100"
        >
          <LogOut className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div
      data-surface="admin"
      className="flex min-h-svh flex-col bg-[color:var(--sd-surface)] text-[color:var(--sd-text)] lg:flex-row"
    >
      {/* ------------------------------------------------- Desktop sidebar */}
      <aside className="sticky top-0 hidden h-svh w-60 shrink-0 flex-col border-r border-ivory-100/10 bg-[color:var(--sd-surface-sunken)] py-6 lg:flex">
        {sidebarBody}
      </aside>

      {/* ---------------------------------------------------- Mobile top bar */}
      <div
        className="sticky top-0 z-header flex items-center justify-between gap-4 border-b border-ivory-100/10 bg-[color:var(--sd-surface-sunken)] px-gutter lg:hidden"
        style={{ minHeight: '60px', paddingTop: 'var(--sd-safe-t)' }}
      >
        <span className="font-display text-fluid-base uppercase tracking-[0.2em] text-ivory-100">
          Studioz<span className="text-champagne-500"> D</span>
        </span>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open admin navigation"
          aria-expanded={drawerOpen}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-ivory-200"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-drawer lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <div
              className="absolute inset-0 bg-ink-950/70"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              ref={containerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Admin navigation"
              className="absolute inset-y-0 left-0 flex w-[min(17rem,85%)] flex-col border-r border-ivory-100/10 bg-[color:var(--sd-surface-sunken)] py-6"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: reducedMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close admin navigation"
                className="absolute right-3 top-4 flex h-10 w-10 items-center justify-center text-ivory-200"
              >
                <X className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
              </button>
              {sidebarBody}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------ Main */}
      <main className="min-w-0 flex-1">
        {/* Demo-data banner. Non-dismissible on purpose — nothing in here is
            a real measurement or a real person. */}
        <div className="flex items-start gap-3 border-b border-champagne-600/30 bg-champagne-600/10 px-gutter py-3">
          <AlertTriangle
            className="mt-0.5 h-4 w-4 shrink-0 text-champagne-500"
            strokeWidth={1.7}
            aria-hidden="true"
          />
          <p className="min-w-0 text-[0.72rem] leading-relaxed text-ivory-200/80">
            <strong className="font-semibold text-ivory-100">Demo data.</strong> This console is a
            frontend prototype. Every figure and record shown is generated sample data — not a
            real measurement, and not a real person. {user?.isDemo && 'Signed in with the demo passcode.'}
          </p>
        </div>

        {/* Local boundary so loading a section does not unmount the shell. */}
        <Suspense
          fallback={
            <div className="px-gutter py-12" role="status" aria-live="polite">
              <span className="text-[0.72rem] uppercase tracking-widest text-ink-400">
                Loading…
              </span>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default AdminLayout;
