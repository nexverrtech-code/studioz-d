import { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight, Instagram, Mail, MessageCircle } from 'lucide-react';
import { mobileNavForWorld, worldSwitch } from '@/data/navigation';
import { useWorld } from '@/hooks/useWorld';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { Logo } from './Logo';
import { cn } from '@/utils/cn';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  siteConfig,
  buildWhatsAppLink,
  buildMailtoLink,
  hasWhatsApp,
  hasEmail,
} from '@/config/site';
import { trackWhatsApp, trackEmail, trackCta } from '@/services/analytics.service';

/**
 * Full-screen mobile / tablet navigation.
 *
 * Purpose-built rather than a shrunken desktop bar. It opens on the studio's
 * two worlds as a pair of image tiles — the same choice the landing page and
 * the header switch offer — with the current one marked. Below that come the
 * numbered rows for everything else, direct contact channels, and a CTA
 * pinned above the safe area.
 *
 * Accessibility: scroll locked, focus trapped, Escape closes, and the panel is
 * a labelled dialog.
 */
export const MobileDrawer = ({ open, onClose }) => {
  const closeRef = useRef(null);
  const containerRef = useFocusTrap(open, { initialFocusRef: closeRef });
  const reducedMotion = usePrefersReducedMotion();

  // Same world-aware list as the desktop bar, plus Home and Contact.
  const world = useWorld();
  const mobileNav = mobileNavForWorld(world);

  useLockBodyScroll(open);
  useEscapeKey(open, onClose);

  const whatsappHref = buildWhatsAppLink(
    `Hello ${siteConfig.name}, I would like to talk about a shoot or a personalized gift.`
  );
  const mailHref = buildMailtoLink({ subject: 'Enquiry — Studioz D' });

  const panelTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.46, ease: [0.22, 1, 0.36, 1] };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-drawer lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          {/* Scrim — clicking it closes, but it is not the accessible close. */}
          <div
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-y-0 right-0 flex w-full max-w-[min(26rem,100%)] flex-col bg-ivory-50 shadow-lift-lg"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={panelTransition}
          >
            {/* Header row — fixed height, never scrolls away */}
            <div
              className="flex shrink-0 items-center justify-between border-b border-ink-100 px-gutter"
              style={{ minHeight: 'var(--sd-header-h)', paddingTop: 'var(--sd-safe-t)' }}
            >
              <Logo onClick={onClose} />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="-mr-2 flex h-11 w-11 items-center justify-center text-ink-700 transition-colors hover:text-ink-900"
              >
                <X className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable body */}
            <nav
              aria-label="Site"
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-gutter py-6"
            >
              {/* The two worlds, as tiles. Each image is 3:2 in a 3:2 box. */}
              <ul className="mb-7 grid grid-cols-2 gap-3">
                {worldSwitch.map((item) => {
                  const current = world === item.id;
                  return (
                    <li key={item.id} className="min-w-0">
                      <Link
                        to={item.to}
                        onClick={onClose}
                        aria-current={current ? 'true' : undefined}
                        className={cn(
                          'group flex h-full flex-col gap-2.5 border p-2 transition-colors',
                          current ? 'border-ink-900' : 'border-ink-100 hover:border-ink-300'
                        )}
                      >
                        <OptimizedImage
                          src={item.image}
                          alt=""
                          aspect="3/2"
                          sizes="(min-width: 480px) 12rem, 45vw"
                          className="w-full"
                        />
                        <span className="flex min-w-0 flex-col gap-1 px-1 pb-0.5">
                          <span className="font-display text-fluid-lg leading-none text-ink-900">
                            {item.label}
                          </span>
                          <span className="text-[0.54rem] font-semibold uppercase tracking-widest text-champagne-700">
                            {current ? 'You are here' : item.lead}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <ul className="flex flex-col">
                {mobileNav.map((item, index) => (
                  <li key={item.to} className="border-b border-ink-100/70 last:border-b-0">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'flex items-baseline gap-4 py-4 transition-colors',
                          isActive ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className="w-6 shrink-0 text-[0.62rem] font-semibold tabular-nums tracking-widest text-ink-300">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="min-w-0 flex-1 font-display text-[clamp(1.55rem,1.2rem+1.6vw,2.1rem)] leading-tight">
                            {item.label}
                          </span>
                          {isActive && (
                            <span
                              className="mb-1 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-600"
                              aria-hidden="true"
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <p className="eyebrow">Direct</p>
                {!hasWhatsApp() && !hasEmail() && !siteConfig.social.instagram && (
                  <p className="text-fluid-sm text-ink-500">
                    <NavLink to="/contact" onClick={onClose} className="link-underline text-ink-900">
                      Send an enquiry
                    </NavLink>{' '}
                    — tell us what you are planning.
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {hasWhatsApp() && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackWhatsApp('mobile-drawer');
                        onClose();
                      }}
                      className="chip"
                    >
                      <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                      WhatsApp
                    </a>
                  )}
                  {hasEmail() && (
                    <a
                      href={mailHref}
                      onClick={() => {
                        trackEmail('mobile-drawer');
                        onClose();
                      }}
                      className="chip"
                    >
                      <Mail className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                      Email
                    </a>
                  )}
                  {siteConfig.social.instagram && (
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="chip"
                    >
                      <Instagram className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                      Instagram
                    </a>
                  )}
                </div>

                <p className="mt-4 max-w-prose-sm text-fluid-sm text-ink-400">
                  {siteConfig.promise.capture} {siteConfig.promise.create}{' '}
                  {siteConfig.promise.keep}
                </p>
              </div>
            </nav>

            {/* CTA — pinned, clear of the home indicator */}
            <div
              className="shrink-0 border-t border-ink-100 px-gutter pt-4"
              style={{ paddingBottom: 'calc(1rem + var(--sd-safe-b))' }}
            >
              <NavLink
                to="/contact"
                onClick={() => {
                  trackCta("Let's Talk", 'mobile-drawer');
                  onClose();
                }}
                className="btn btn-solid w-full"
              >
                Let&rsquo;s Talk
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </NavLink>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
