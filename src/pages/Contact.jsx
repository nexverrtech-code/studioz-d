import { useSearchParams } from 'react-router-dom';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import {
  siteConfig,
  buildWhatsAppLink,
  buildMailtoLink,
  buildTelLink,
  hasWhatsApp,
  hasEmail,
  hasPhone,
  hasAddress,
} from '@/config/site';
import { faqGroups } from '@/data/faq';
import { getAllPhotos } from '@/data/works';
import { getGiftBySlug } from '@/data/gifts';
import { breadcrumbSchema, organizationSchema, localBusinessSchema } from '@/utils/seo';

/**
 * One photograph and one gift, side by side — the two halves of the studio,
 * stated by the hero rather than described in it. Both entries carry their own
 * real dimensions, so each gets a box shaped to the image it holds.
 */
const HERO_MEDIA = [
  getAllPhotos().find((photo) => photo.orientation === 'portrait'),
  getGiftBySlug('infinity-name-lamp')?.images[0],
].filter(Boolean);
import { trackWhatsApp, trackEmail, trackPhone } from '@/services/analytics.service';

export const Contact = () => {
  const [searchParams] = useSearchParams();

  // Links from a service or gift page can pre-select the enquiry type.
  const defaultInterest = searchParams.get('interest') ?? '';
  const defaultGiftCategory = searchParams.get('gift') ?? '';

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  const channels = [
    hasWhatsApp() && {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      // Digits from config, shown the way people read a mobile: +91 98765 43210.
      value: `+${siteConfig.contact.whatsappNumber.replace(/(\d+)(\d{5})(\d{5})$/, '$1 $2 $3')}`,
      href: buildWhatsAppLink(
        `Hello ${siteConfig.name}, I would like to talk about a shoot or a personalized gift.`
      ),
      external: true,
      onClick: () => trackWhatsApp('contact-page'),
    },
    hasEmail() && {
      id: 'email',
      icon: Mail,
      label: 'Email',
      value: siteConfig.contact.email,
      href: buildMailtoLink({ subject: 'Enquiry — Studioz D' }),
      onClick: () => trackEmail('contact-page'),
    },
    hasPhone() && {
      id: 'phone',
      icon: Phone,
      label: 'Phone',
      value: siteConfig.contact.phone,
      href: buildTelLink(),
      onClick: () => trackPhone('contact-page'),
    },
  ].filter(Boolean);

  // Only the two FAQ groups most relevant to someone about to enquire.
  const contactFaqs = faqGroups
    .filter((group) => group.id === 'booking' || group.id === 'gifts')
    .flatMap((group) => group.items)
    .slice(0, 6);

  return (
    <>
      <Seo
        title="Contact"
        description="Talk to Studioz D about a photography shoot, a film or a personalized gift. Send an enquiry, or reach us directly on WhatsApp or email."
        path="/contact"
        schemas={[breadcrumbSchema(trail), organizationSchema(), localBusinessSchema()]}
      />

      <PageHero
        eyebrow="Contact"
        title="Let's make something worth remembering."
        accent="worth remembering"
        lede="Have a shoot in mind? Planning a celebration? Looking for a personalized gift? Tell us what you're imagining."
        railLabel="Contact"
        media={HERO_MEDIA}
        facets={['Weddings', 'Portraits', 'Events', 'Personalized Gifts']}
        breadcrumbs={trail}
      />

      <section className="section-sm pb-section">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* ----------------------------------------------- Direct channels */}
          <div className="flex min-w-0 flex-col gap-8">
            <Reveal direction="up">
              <div className="flex flex-col gap-3">
                <p className="eyebrow">Direct</p>
                <h2 className="font-display text-fluid-2xl text-ink-900">
                  Or just message us
                </h2>
                <p className="max-w-prose-sm text-fluid-sm text-ink-400">
                  No form required. A message with a date and a rough idea is enough to start.
                </p>
              </div>
            </Reveal>

            {channels.length > 0 ? (
              <div className="flex flex-col">
                {channels.map((channel) => (
                  <a
                    key={channel.id}
                    href={channel.href}
                    onClick={channel.onClick}
                    {...(channel.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group flex items-center gap-4 border-b border-ink-100 py-5 transition-colors first:border-t hover:bg-ivory-100"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink-200 text-ink-600 transition-colors group-hover:border-ink-900 group-hover:text-ink-900">
                      <channel.icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[0.62rem] font-semibold uppercase tracking-widest-xl text-ink-300">
                        {channel.label}
                      </span>
                      <span className="break-anywhere text-fluid-base text-ink-900">
                        {channel.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-ink-200 p-6">
                <p className="text-fluid-sm leading-relaxed text-ink-400">
                  Direct contact channels have not been configured for this deployment yet. The
                  enquiry form is the way to reach us in the meantime.
                </p>
              </div>
            )}

            {hasAddress() && (
              <Reveal direction="up" delay={0.1}>
                <div className="flex items-start gap-4 border-t border-ink-100 pt-6">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-400"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <address className="not-italic text-fluid-sm leading-relaxed text-ink-500">
                    {[
                      siteConfig.address.street,
                      siteConfig.address.locality,
                      siteConfig.address.region,
                      siteConfig.address.postalCode,
                      siteConfig.address.country,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </address>
                </div>
              </Reveal>
            )}

            <Reveal direction="up" delay={0.14}>
              <div className="flex items-start gap-4 border-t border-ink-100 pt-6">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-ink-400"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-widest-xl text-ink-300">
                    Response
                  </p>
                  <p className="text-fluid-sm leading-relaxed text-ink-500">
                    Every enquiry gets a personal reply — not an autoresponder. Studio visits are
                    by appointment.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ------------------------------------------------------- Form */}
          <div className="min-w-0">
            <Reveal direction="up">
              <div className="mb-8 flex flex-col gap-3">
                <p className="eyebrow">Enquiry</p>
                <h2 className="font-display text-fluid-2xl text-ink-900">
                  Tell us what you&rsquo;re imagining
                </h2>
              </div>
            </Reveal>

            <EnquiryForm
              defaultInterest={defaultInterest}
              defaultGiftCategory={defaultGiftCategory}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bleed bg-ivory-100 section" aria-labelledby="contact-faq">
        <div className="shell-narrow">
          <SectionHeading
            eyebrow="Before You Ask"
            title="The questions that come up most"
            id="contact-faq"
            action={{ label: 'Full FAQ', to: '/faq' }}
            className="mb-5"
            titleClassName="text-fluid-2xl"
          />
          <FaqAccordion items={contactFaqs} idPrefix="contact" />
        </div>
      </section>
    </>
  );
};

export default Contact;
