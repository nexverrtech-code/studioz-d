import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { CtaSection } from '@/components/sections/CtaSection';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Button } from '@/components/buttons/Button';
import { WhatsAppButton } from '@/components/buttons/ContactButtons';
import { getServiceBySlug, getRelatedServices } from '@/data/services';
import { getAllPhotos } from '@/data/works';
import { getGiftCategory } from '@/data/gifts';
import { breadcrumbSchema, serviceSchema, faqSchema } from '@/utils/seo';
import { trackServiceView } from '@/services/analytics.service';

export const ServiceDetails = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  // Every photograph in the service's portfolio category, twelve at a time.
  const photos = useMemo(
    () => (service?.relatedWorkCategory ? getAllPhotos(service.relatedWorkCategory) : []),
    [service?.relatedWorkCategory]
  );
  const [visible, setVisible] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (service) trackServiceView(service);
    setVisible(12);
  }, [service]);

  // An unknown slug is a 404, not an empty page.
  if (!service) return <Navigate to="/404" replace />;

  const relatedServices = getRelatedServices(service.slug);
  const giftCategory = service.relatedGiftCategory
    ? getGiftCategory(service.relatedGiftCategory)
    : null;

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.shortTitle, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <Seo
        title={`${service.title}`}
        description={service.summary}
        path={`/services/${service.slug}`}
        image={service.heroImage}
        schemas={[breadcrumbSchema(trail), serviceSchema(service), faqSchema(service.faq)]}
      />

      <PageHero
        eyebrow={service.group}
        title={service.title}
        lede={service.tagline}
        media={[
          { src: service.heroImage, alt: `${service.title} by Studioz D`, position: service.heroPosition },
        ]}
        imageTall={
          service.heroImageTall
            ? { src: service.heroImageTall, alt: `${service.title} by Studioz D` }
            : undefined
        }
        layout="immersive"
        railLabel={service.group}
        breadcrumbs={trail}
        minHeight="50svh"
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" variant="light">
            {service.ctaLabel}
          </Button>
          <WhatsAppButton
            variant="ghostLight"
            context={`service:${service.slug}`}
            message={`Hello Studioz D, I would like to discuss ${service.title.toLowerCase()}.`}
          >
            Discuss Your Shoot
          </WhatsAppButton>
        </div>
      </PageHero>

      {/* The film itself — nothing downloads until play */}
      {service.video && (
        <section className="section-sm" aria-labelledby="service-film-title">
          <div className="shell">
            <SectionHeading
              eyebrow={`${service.video.label} · ${service.video.duration}`}
              title={`${service.shortTitle}, in motion`}
              id="service-film-title"
              className="mb-6"
              titleClassName="text-fluid-2xl"
            />
            <video
              src={service.video.src}
              poster={service.cardImage}
              aria-label={`${service.video.label} by Studioz D`}
              controls
              playsInline
              preload="none"
              className="aspect-video w-full bg-ink-950"
            />
          </div>
        </section>
      )}

      {/* Every photograph from this kind of shoot */}
      {photos.length > 0 && (
        <section className="section-sm" aria-labelledby="service-gallery-title">
          <div className="shell">
            <SectionHeading
              eyebrow={`${photos.length} photographs`}
              title={`${service.shortTitle}, in pictures`}
              id="service-gallery-title"
              action={{ label: 'All works', to: '/works' }}
              className="mb-6"
              titleClassName="text-fluid-2xl"
            />
            <MasonryGallery photos={photos.slice(0, visible)} onOpen={setLightboxIndex} />
            {visible < photos.length && (
              <div className="mt-8 flex justify-center">
                <button type="button" onClick={() => setVisible((v) => v + 12)} className="btn btn-outline">
                  <Plus className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                  Show more ({photos.length - visible})
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* What we capture */}
      <section className="bleed bg-ivory-100 section" aria-labelledby="capture-title">
        <div className="shell">
          <SectionHeading
            eyebrow="What We Capture"
            title="Every time"
            id="capture-title"
            className="mb-6"
            titleClassName="text-fluid-2xl"
          />

          <RevealGroup className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
            {service.whatWeCapture.map((item) => (
              <RevealItem
                key={item}
                className="flex min-w-0 items-start gap-3 border-b border-ink-200/70 pb-4"
              >
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-champagne-700"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="min-w-0 text-fluid-base text-ink-600">{item}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section className="bleed bg-ink-900 section" aria-labelledby="service-process-title">
        <div className="shell">
          <SectionHeading
            eyebrow="The Process"
            title="Start to finish"
            id="service-process-title"
            tone="light"
            className="mb-6"
            titleClassName="text-fluid-2xl"
          />
          <ProcessSteps steps={service.process} tone="dark" columns={5} />
        </div>
      </section>

      {/* Cross-link to gifting */}
      {giftCategory && (
        <section className="bleed bg-ivory-100 section-sm">
          <div className="shell">
            <div className="flex flex-col items-start justify-between gap-6 border border-ink-200 bg-ivory-50 p-8 sm:p-10 lg:flex-row lg:items-center">
              <div className="flex min-w-0 flex-col gap-2">
                <p className="eyebrow">Afterwards</p>
                <h2 className="font-display text-fluid-2xl text-ink-900">
                  {giftCategory.headline}
                </h2>
                <p className="max-w-prose text-fluid-sm text-ink-400">{giftCategory.blurb}</p>
              </div>
              <Link to={`/gifts/${giftCategory.slug}`} className="btn btn-solid shrink-0">
                {giftCategory.title}
                <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faq.length > 0 && (
        <section className="section" aria-labelledby="service-faq-title">
          <div className="shell-narrow">
            <SectionHeading
              eyebrow="Questions"
              title={`${service.shortTitle} — the things people ask`}
              id="service-faq-title"
              className="mb-5"
              titleClassName="text-fluid-2xl"
            />
            <FaqAccordion items={service.faq} idPrefix={`svc-${service.slug}`} />
          </div>
        </section>
      )}

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="bleed bg-ivory-100 section" aria-labelledby="related-services-title">
          <div className="shell">
            <SectionHeading
              eyebrow="Also Consider"
              title="Related services"
              id="related-services-title"
              className="mb-5"
              titleClassName="text-fluid-2xl"
            />
            <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
              {relatedServices.map((related) => (
                <RevealItem key={related.slug} className="min-w-0">
                  <ServiceCard service={related} compact />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <GalleryLightbox
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      <CtaSection
        eyebrow={service.shortTitle}
        headingLines={[service.ctaLabel]}
        copy={service.tagline}
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'See Our Work', to: '/works' }}
        whatsappMessage={`Hello Studioz D, I would like to discuss ${service.title.toLowerCase()}.`}
      />
    </>
  );
};

export default ServiceDetails;
