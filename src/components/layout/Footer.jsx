import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Instagram, Mail, MapPin, MessageCircle, Youtube } from 'lucide-react';
import { footerStudio, footerWorldLinks, legalNav, worldSwitch, WORLDS } from '@/data/navigation';
import {
  siteConfig,
  buildWhatsAppLink,
  buildMailtoLink,
  hasWhatsApp,
  hasEmail,
} from '@/config/site';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { FitText } from '@/components/common/FitText';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { trackWhatsApp, trackEmail, trackCta } from '@/services/analytics.service';
import { cn } from '@/utils/cn';

/**
 * Site footer.
 *
 * It closes the page the way the landing page opens it: two worlds at equal
 * weight. A closing line, then one panel per world — its image, its promise,
 * its links and its own way to enquire — then the pages that belong to
 * neither, and finally the studio's name set as large as the page allows.
 *
 * Contact rows render only for channels that are configured. With none set,
 * the footer points at the enquiry form rather than printing a note about
 * configuration to visitors.
 */

/**
 * Auto-advancing crossfade, CSS only. Every slide runs the same `slide-fade`
 * keyframes (tailwind.config.js), phased apart by negative delays so exactly
 * one is visible at a time: no timers, no state, paused on hover, and under
 * reduced motion the animation never applies, so the first slide just stays.
 * ponytail: the keyframes assume exactly 4 slides; change both together.
 */
const SLIDE_SECONDS = 4;

const Slideshow = ({ slides, aspect }) => (
  <div
    className="group relative h-20 shrink-0 self-start overflow-hidden bg-ink-800 sm:h-32"
    style={{ aspectRatio: aspect.replace('/', ' / ') }}
  >
    {slides.map((src, index) => (
      <div
        key={src}
        className={cn(
          'absolute inset-0 motion-ok:animate-slideshow group-hover:[animation-play-state:paused]',
          index === 0 ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          animationDelay: `${-((slides.length - index) % slides.length) * SLIDE_SECONDS}s`,
        }}
      >
        <OptimizedImage src={src} alt="" aspect={aspect} sizes="12rem" className="h-full w-full" />
      </div>
    ))}
  </div>
);

const WORLD_TITLES = {
  [WORLDS.PHOTOGRAPHY]: 'Photography',
  [WORLDS.GIFTS]: 'Customized Gifts',
};

export const Footer = () => {
  const reducedMotion = usePrefersReducedMotion();

  const whatsappHref = buildWhatsAppLink(
    `Hello ${siteConfig.name}, I would like to talk about a shoot or a personalized gift.`
  );
  const mailHref = buildMailtoLink({ subject: 'Enquiry — Studioz D' });

  const connectLinks = [
    hasWhatsApp() && {
      label: 'WhatsApp',
      href: whatsappHref,
      icon: MessageCircle,
      external: true,
      onClick: () => trackWhatsApp('footer'),
    },
    hasEmail() && {
      label: 'Email',
      href: mailHref,
      icon: Mail,
      onClick: () => trackEmail('footer'),
    },
    siteConfig.social.instagram && {
      label: 'Instagram',
      href: siteConfig.social.instagram,
      icon: Instagram,
      external: true,
    },
    siteConfig.social.googleBusiness && {
      label: 'Google Business Profile',
      href: siteConfig.social.googleBusiness,
      icon: MapPin,
      external: true,
    },
    siteConfig.social.youtube && {
      label: 'YouTube',
      href: siteConfig.social.youtube,
      icon: Youtube,
      external: true,
    },
  ].filter(Boolean);

  /** Back to the top, through Lenis when it is running so the easing matches. */
  const backToTop = () => {
    const lenis = typeof window !== 'undefined' ? window.__lenis : null;
    if (lenis) lenis.scrollTo(0, { immediate: reducedMotion });
    else window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    // Move focus with the viewport, so keyboard users are not left at the bottom.
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <footer className="bleed bg-ink-900 text-ivory-200">
      <div className="shell pb-6 pt-10 sm:pt-12">
        {/* ------------------------------------------- Closing statement -- */}
        <div className="flex flex-col gap-5 border-b border-ivory-100/10 pb-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-3">
            <p className="eyebrow flex items-center gap-3 text-champagne-400">
              <span className="h-px w-8 bg-champagne-400/50" aria-hidden="true" />
              Where to next
            </p>
            <p className="font-display text-[clamp(1.6rem,1.2rem+1.7vw,2.7rem)] uppercase leading-[0.95] text-ivory-50">
              Capture it. Create it.{' '}
              <span className="italic lowercase text-champagne-300">keep it.</span>
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-3 lg:justify-end">
            {connectLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center gap-2 text-fluid-sm text-ivory-300/70 transition-colors hover:text-ivory-100"
              >
                <link.icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                {link.label}
              </a>
            ))}
            <Link
              to="/contact"
              onClick={() => trackCta('Start a Conversation', 'footer')}
              className="btn btn-light"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* ------------------------------------------------ Two worlds -- */}
        <div className="grid gap-6 py-6 lg:grid-cols-2 lg:gap-8">
          {worldSwitch.map((world) => {
            const headingId = `footer-world-${world.id}`;
            return (
              <section
                key={world.id}
                aria-labelledby={headingId}
                className="flex gap-4 sm:gap-6"
              >
                <Slideshow slides={world.slides} aspect={world.slideAspect} />

                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-widest-xl text-champagne-500">
                      {WORLD_TITLES[world.id]}
                    </p>
                    <h2 id={headingId} className="font-display text-fluid-xl leading-none text-ivory-50">
                      <Link to={world.to} className="transition-colors hover:text-champagne-300">
                        {world.lead}
                      </Link>
                    </h2>
                  </div>

                  <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {footerWorldLinks[world.id].map((link) => (
                      <li key={link.to} className="min-w-0">
                        <Link
                          to={link.to}
                          className="text-fluid-sm text-ivory-300/70 transition-colors hover:text-ivory-100"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={world.enquire}
                    onClick={() => trackCta(world.enquireLabel, 'footer')}
                    className="link-underline mt-1 inline-flex items-center gap-2 self-start text-[0.68rem] font-semibold uppercase tracking-widest-xl text-ivory-100"
                  >
                    {world.enquireLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden="true" />
                  </Link>
                </div>
              </section>
            );
          })}
        </div>

        {/* -------------------------------------------------- Wordmark -- */}
        {/* Decorative: the name is already in the logo and the legal line. */}
        <div aria-hidden="true" className="select-none border-t border-ivory-100/10 pt-5">
          <FitText
            max={150}
            textClassName="font-display uppercase leading-[0.8] tracking-[0.5em] text-ivory-100/[0.12]"
          >
            Studioz<span className="text-brand-teal-light/25"> D</span>
          </FitText>
        </div>

        {/* ------------------------------------------------- Legal bar -- */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-fluid-xs text-ivory-300/50">
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <nav aria-label="Studio">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {footerStudio.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-fluid-xs text-ivory-300/80 transition-colors hover:text-ivory-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <span className="hidden h-3 w-px bg-ivory-100/15 sm:block" aria-hidden="true" />
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalNav.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-fluid-xs text-ivory-300/50 transition-colors hover:text-ivory-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={backToTop}
              className="inline-flex min-h-[44px] items-center gap-2 border border-ivory-100/15 px-4 text-[0.6rem] font-semibold uppercase tracking-widest-xl text-ivory-200/80 transition-colors hover:border-ivory-100/40 hover:text-ivory-50"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
