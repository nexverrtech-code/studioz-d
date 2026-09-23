import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Send } from 'lucide-react';
import {
  siteConfig,
  buildWhatsAppLink,
  hasWhatsApp,
} from '@/config/site';
import { trackWhatsApp, trackCta } from '@/services/analytics.service';
import { useScrollState } from '@/hooks/useScrollState';
import { cn } from '@/utils/cn';

/**
 * Persistent contact affordance.
 *
 * Mobile  → a sticky bottom bar (WhatsApp | Enquire).
 * Desktop → a single floating WhatsApp button, bottom-right.
 *
 * The bar publishes its own height to `--sd-dock-h`, and every page applies
 * `.pb-dock` to its last element. That is how the dock is guaranteed never to
 * cover a form field, a CTA or the footer — the page physically reserves the
 * space rather than the bar floating over it.
 *
 * `env(safe-area-inset-bottom)` keeps it clear of the iOS home indicator.
 */
export const ContactDock = () => {
  const barRef = useRef(null);
  const { direction, atTop } = useScrollState();

  const whatsappHref = buildWhatsAppLink(
    `Hello ${siteConfig.name}, I would like to talk about a shoot or a personalized gift.`
  );

  // Publish the real measured height, including the safe-area inset.
  useEffect(() => {
    const node = barRef.current;
    const root = document.documentElement;

    if (!node) {
      root.style.setProperty('--sd-dock-h', '0px');
      return undefined;
    }

    const publish = () => {
      const isVisible = window.getComputedStyle(node).display !== 'none';
      root.style.setProperty('--sd-dock-h', isVisible ? `${node.offsetHeight}px` : '0px');
    };

    publish();

    const observer = new ResizeObserver(publish);
    observer.observe(node);
    window.addEventListener('resize', publish);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', publish);
      root.style.setProperty('--sd-dock-h', '0px');
    };
  }, []);

  return (
    <>
      {/* ---------------------------------------------------------- Mobile */}
      <div
        ref={barRef}
        className="fixed inset-x-0 bottom-0 z-dock border-t border-ink-100 bg-ivory-50/95 backdrop-blur-md md:hidden"
        style={{ paddingBottom: 'var(--sd-safe-b)' }}
      >
        <div className="grid grid-cols-2 gap-px bg-ink-100">
          {hasWhatsApp() ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp('mobile-dock')}
              className="flex min-h-[54px] items-center justify-center gap-2 bg-ivory-50 text-[0.7rem] font-semibold uppercase tracking-widest-xl text-ink-900"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              WhatsApp
            </a>
          ) : (
            <Link
              to="/faq"
              className="flex min-h-[54px] items-center justify-center gap-2 bg-ivory-50 text-[0.7rem] font-semibold uppercase tracking-widest-xl text-ink-500"
            >
              Questions
            </Link>
          )}

          <Link
            to="/contact"
            onClick={() => trackCta('Enquire', 'mobile-dock')}
            className="flex min-h-[54px] items-center justify-center gap-2 bg-ink-900 text-[0.7rem] font-semibold uppercase tracking-widest-xl text-ivory-100"
          >
            <Send className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            Enquire
          </Link>
        </div>
      </div>

      {/* --------------------------------------------------------- Desktop */}
      {hasWhatsApp() && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsApp('desktop-float')}
          aria-label="Message Studioz D on WhatsApp"
          data-cursor="open"
          className={cn(
            'group fixed bottom-6 right-6 z-dock hidden h-14 w-14 items-center justify-center rounded-full bg-ink-900 text-ivory-100 shadow-lift transition-all duration-500 ease-editorial hover:bg-champagne-600 hover:text-ink-950 md:flex',
            // Slides away while scrolling down so it never covers content
            // the visitor is actively reading.
            direction === 'down' && !atTop && 'translate-y-24 opacity-0'
          )}
        >
          <MessageCircle className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-sm bg-ink-900 px-3 py-2 text-[0.64rem] font-semibold uppercase tracking-widest-xl text-ivory-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Let&rsquo;s Talk
          </span>
        </a>
      )}
    </>
  );
};

export default ContactDock;
