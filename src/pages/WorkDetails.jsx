import { useEffect } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, Film, MapPin, Tag } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProjectGallery } from '@/components/gallery/ProjectGallery';
import { WorkCard } from '@/components/cards/WorkCard';
import { CtaSection } from '@/components/sections/CtaSection';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { getWorkBySlug, getRelatedWorks, getCategoryById } from '@/data/works';
import { getServiceBySlug } from '@/data/services';
import { breadcrumbSchema, imageGallerySchema } from '@/utils/seo';
import { trackWorkView } from '@/services/analytics.service';

export const WorkDetails = () => {
  const { slug } = useParams();
  const work = getWorkBySlug(slug);

  useEffect(() => {
    if (work) trackWorkView(work);
  }, [work]);

  if (!work) return <Navigate to="/404" replace />;

  const related = getRelatedWorks(work.slug, 3);
  const service = work.service ? getServiceBySlug(work.service) : null;
  const primaryCategory = getCategoryById(work.primaryCategory);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Works', path: '/works' },
    ...(primaryCategory?.segment
      ? [{ name: primaryCategory.label, path: `/works/${primaryCategory.segment}` }]
      : []),
    { name: work.title, path: `/works/${work.slug}` },
  ];

  const meta = [
    { icon: Tag, label: 'Category', value: work.category },
    work.location && { icon: MapPin, label: 'Location', value: work.location },
    work.year && { icon: Calendar, label: 'Year', value: work.year },
  ].filter(Boolean);

  return (
    <>
      <Seo
        title={`${work.title} — ${work.category} Photography`}
        description={`${work.description} Explore ${work.title}, a ${work.category.toLowerCase()} story captured by Studioz D.`}
        path={`/works/${work.slug}`}
        image={work.coverImage}
        type="article"
        schemas={[breadcrumbSchema(trail), imageGallerySchema(work)]}
      />

      <PageHero
        eyebrow={work.category}
        title={work.title}
        lede={work.description}
        image={work.coverImage}
        imageAlt={`${work.title} — ${work.category} photography by Studioz D`}
        layout="immersive"
        railLabel={work.category}
        railIndex={work.year}
        breadcrumbs={trail}
        minHeight="46svh"
      />

      {/* Project meta */}
      <section className="section-sm">
        <div className="shell">
          <div className="grid gap-8 border-b border-ink-200 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
            <dl className="flex flex-wrap gap-x-10 gap-y-5 lg:flex-col lg:gap-5">
              {meta.map((entry) => (
                <div key={entry.label} className="flex min-w-0 flex-col gap-1">
                  <dt className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-widest-xl text-ink-300">
                    <entry.icon className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
                    {entry.label}
                  </dt>
                  <dd className="font-display text-fluid-lg text-ink-900">{entry.value}</dd>
                </div>
              ))}

              {service && (
                <div className="flex min-w-0 flex-col gap-1">
                  <dt className="text-[0.6rem] font-semibold uppercase tracking-widest-xl text-ink-300">
                    Service
                  </dt>
                  <dd>
                    <Link
                      to={`/services/${service.slug}`}
                      className="link-underline font-display text-fluid-lg text-ink-900"
                    >
                      {service.title}
                    </Link>
                  </dd>
                </div>
              )}
            </dl>

            <div className="flex min-w-0 flex-col gap-5">
              <p className="eyebrow">The Story</p>
              {work.story.map((paragraph, index) => (
                <Reveal key={index} direction="up" delay={index * 0.06}>
                  <p className="max-w-prose text-fluid-lg leading-relaxed text-ink-600">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-section" aria-label={`${work.title} gallery`}>
        <ProjectGallery
          images={work.images}
          title={work.title}
          category={work.category}
        />
      </section>

      {/* Behind the frame */}
      {work.behindTheFrame && (
        <section className="bleed bg-ink-900 section-sm" aria-labelledby="behind-title">
          <div className="shell-narrow flex flex-col items-center gap-5 text-center">
            <p className="eyebrow text-champagne-400">Behind the Frame</p>
            <h2 id="behind-title" className="sr-only">
              Behind the frame
            </h2>
            <p className="max-w-prose font-display text-fluid-2xl leading-snug text-ivory-100">
              {work.behindTheFrame}
            </p>
          </div>
        </section>
      )}

      {/* Film placeholder — honest about what is not here yet */}
      {work.hasFilm && (
        <section className="section-sm" aria-labelledby="film-title">
          <div className="shell">
            <div className="flex flex-col items-start gap-5 border border-ink-200 bg-ivory-100 p-8 sm:flex-row sm:items-center sm:gap-8 sm:p-10">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink-900 text-ivory-100">
                <Film className="h-6 w-6" strokeWidth={1.3} aria-hidden="true" />
              </span>
              <div className="flex min-w-0 flex-col gap-2">
                <h2 id="film-title" className="font-display text-fluid-xl text-ink-900">
                  This project has a film
                </h2>
                <p className="max-w-prose text-fluid-sm text-ink-500">{work.filmNote}</p>
              </div>
              <Link to="/services/cinematic-films" className="btn btn-outline shrink-0 sm:ml-auto">
                About our films
                <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related work */}
      {related.length > 0 && (
        <section className="bleed bg-ivory-100 section" aria-labelledby="related-work-title">
          <div className="shell">
            <SectionHeading
              eyebrow="More Stories"
              title="Related work"
              id="related-work-title"
              action={{ label: 'All works', to: '/works' }}
              className="mb-5"
              titleClassName="text-fluid-2xl"
            />
            <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <RevealItem key={item.slug} className="min-w-0">
                  <WorkCard work={item} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CtaSection
        eyebrow="Your Story"
        headingLines={['Something like this,', 'but entirely yours.']}
        copy="Tell us the date, the place and the people. We will tell you how we would photograph it."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'View Services', to: '/services' }}
        whatsappMessage={`Hello Studioz D, I saw "${work.title}" on your site and would like something similar.`}
      />
    </>
  );
};

export default WorkDetails;
