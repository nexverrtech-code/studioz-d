import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Mail, MapPin, MessageCircle, Youtube } from 'lucide-react';
import { footerNav, legalNav } from '@/data/navigation';
import {
  siteConfig,
  buildWhatsAppLink,
  buildMailtoLink,
  hasWhatsApp,
  hasEmail,
} from '@/config/site';
import { trackWhatsApp, trackEmail } from '@/services/analytics.service';

/**
 * Site footer.
 *
 * Link groups collapse from four columns to two to one. Contact rows render
 * only for channels that are configured, so an unfinished deployment shows a
 * shorter footer rather than a list of dead links.
 */
export const Footer = () => {
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

  return (
    <footer className="bleed bg-ink-900 text-ivory-200">
      <div className="shell py-section-sm">
        {/* Brand block */}
        <div className="grid gap-8 border-b border-ivory-100/10 pb-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <picture className="shrink-0">
                <source
                  type="image/webp"
                  srcSet="/assets/brand/studioz-d-logo-128.webp 1x, /assets/brand/studioz-d-logo-256.webp 2x"
                />
                <img
                  src="/assets/brand/studioz-d-logo-128.png"
                  alt=""
                  width={128}
                  height={128}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                />
              </picture>
              <p className="font-display text-[clamp(1.4rem,1.15rem+1.1vw,2rem)] uppercase leading-none tracking-[0.18em] text-ivory-100">
                Studioz<span className="text-brand-teal-light"> D</span>
              </p>
            </div>
            <p className="text-fluid-sm text-ivory-300/70">
              Photography. Films. Personalized creations.
            </p>
            <p className="font-display text-fluid-2xl leading-tight text-ivory-100">
              {siteConfig.promise.capture}
              <br />
              {siteConfig.promise.create}
              <br />
              <span className="text-champagne-400">{siteConfig.promise.keep}</span>
            </p>
          </div>

          <div className="flex flex-col justify-end gap-5">
            <p className="max-w-prose-sm text-fluid-base text-ivory-300/80">
              Planning something? Tell us what you are imagining — a shoot, a film, or a gift that
              has to mean something.
            </p>
            <Link to="/contact" className="btn btn-light self-start">
              Start a Conversation
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-8 py-9 md:grid-cols-4"
        >
          {Object.entries(footerNav).map(([key, group]) => (
            <div key={key} className="flex min-w-0 flex-col gap-4">
              <h2 className="text-[0.64rem] font-semibold uppercase tracking-widest-xl text-champagne-500">
                {group.heading}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-fluid-sm text-ivory-300/70 transition-colors hover:text-ivory-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex min-w-0 flex-col gap-4">
            <h2 className="text-[0.64rem] font-semibold uppercase tracking-widest-xl text-champagne-500">
              Connect
            </h2>
            {connectLinks.length > 0 ? (
              <ul className="flex flex-col gap-2.5">
                {connectLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={link.onClick}
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="group inline-flex items-center gap-2 text-fluid-sm text-ivory-300/70 transition-colors hover:text-ivory-100"
                    >
                      <link.icon
                        className="h-3.5 w-3.5 shrink-0"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <span className="break-anywhere">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-fluid-xs leading-relaxed text-ivory-300/50">
                Contact channels appear here once they are configured.
                <br />
                <Link to="/contact" className="link-underline mt-2 inline-block text-ivory-100">
                  Use the enquiry form
                </Link>
              </p>
            )}
          </div>
        </nav>

        {/* Legal bar */}
        <div className="flex flex-col gap-4 border-t border-ivory-100/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-fluid-xs text-ivory-300/50">
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
