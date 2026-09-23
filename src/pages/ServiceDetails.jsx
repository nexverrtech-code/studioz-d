import { useEffect } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { CtaSection } from '@/components/sections/CtaSection';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { WorkCard } from '@/components/cards/WorkCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Button } from '@/components/buttons/Button';
import { WhatsAppButton } from '@/components/buttons/ContactButtons';
import { getServiceBySlug, getRelatedServices } from '@/data/services';
import { getWorksByService, getRelatedWorks } from '@/data/works';
import { getGiftCategory } from '@/data/gifts';
import { breadcrumbSchema, serviceSchema, faqSchema } from '@/utils/seo';
import { trackServiceView } from '@/services/analytics.service';

export const ServiceDetails = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  useEffect(() => {
    if (service) trackServiceView(service);
  }, [service]);

  // An unknown slug is a 404, not an empty page.
  if (!service) return <Navigate to="/404" replace />;

  const relatedWorks = getWorksByService(service.slug, 3);
  const fallbackWorks = relatedWorks.length > 0 ? relatedWorks : getRelatedWorks('', 3);
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
        image={service.heroImage}
        imageAlt={`${service.title} by Studioz D`}
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

      {/* Introduction */}
      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal direction="up">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-ink-300" aria-hidden="true" />
              The Approach
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <p className="max-w-prose text-fluid-lg leading-relaxed text-ink-600">
              {service.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* What we capture */}
      <section className="bleed bg-ivory-100 section" aria-labelledby="capture-title">
        <div className="shell">
          <SectionHeading
            eyebrow="What We Capture"
            title="Everything on this list, every time"
            id="capture-title"
            className="mb-8"
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

      {/* Experience */}
      <section className="section" aria-labelledby="experience-title">
        <div className="shell">
          <SectionHeading
            eyebrow="The Experience"
            title="What it is actually like to work with us"
            id="experience-title"
            className="mb-8"
            titleClassName="text-fluid-2xl"
          />

          <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            {service.experience.map((item, index) => (
              <RevealItem
                key={item.title}
                className="flex min-w-0 flex-col gap-3 border-t border-ink-200 pt-6"
              >
                <span className="text-[0.66rem] font-semibold tabular-nums tracking-widest-xl text-champagne-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-fluid-xl leading-tight text-ink-900">
                  {item.title}
                </h3>
                <p className="text-fluid-sm leading-relaxed text-ink-400">{item.body}</p>
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
            title="From first conversation to finished work"
            id="service-process-title"
            tone="light"
            className="mb-9"
            titleClassName="text-fluid-2xl"
          />
          <ProcessSteps steps={service.process} tone="dark" columns={5} />
        </div>
      </section>

      {/* Featured work */}
      {fallbackWorks.length > 0 && (
        <section className="section" aria-labelledby="service-work-title">
          <div className="shell">
            <SectionHeading
              eyebrow="Featured Work"
              title="Recent stories"
              id="service-work-title"
              action={{ label: 'All works', to: '/works' }}
              className="mb-8"
              titleClassName="text-fluid-2xl"
            />

            <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {fallbackWorks.map((work) => (
                <RevealItem key={work.slug} className="min-w-0">
                  <WorkCard work={work} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

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
              className="mb-7"
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
              className="mb-8"
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
