import { Navigate, useParams, Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { JournalCard } from '@/components/cards/JournalCard';
import { WorkCard } from '@/components/cards/WorkCard';
import { CtaSection } from '@/components/sections/CtaSection';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { useScrollProgress } from '@/hooks/useScrollState';
import { getArticleBySlug, getRelatedArticles, formatArticleDate } from '@/data/journal';
import { getServiceBySlug } from '@/data/services';
import { getWorkBySlug } from '@/data/works';
import { breadcrumbSchema, articleSchema } from '@/utils/seo';

/** Renders one content block. Keeps typography decisions in a single place. */
const Block = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return (
        <Reveal direction="up" delay={0.02}>
          <h2 className="mt-10 font-display text-fluid-2xl leading-tight text-ink-900 first:mt-0">
            {block.text}
          </h2>
        </Reveal>
      );

    case 'list':
      return (
        <Reveal direction="up" delay={0.02}>
          <ul className="my-2 flex flex-col gap-3">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-fluid-base text-ink-600">
                <span
                  className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-champagne-600"
                  aria-hidden="true"
                />
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      );

    case 'quote':
      return (
        <Reveal direction="up" delay={0.02}>
          <blockquote className="my-6 border-l-2 border-champagne-600 pl-6">
            <p className="font-display text-fluid-2xl leading-snug text-ink-900">{block.text}</p>
          </blockquote>
        </Reveal>
      );

    case 'callout':
      return (
        <Reveal direction="up" delay={0.02}>
          <aside className="my-8 flex flex-col gap-3 border border-ink-200 bg-ivory-100 p-6">
            <p className="text-fluid-base text-ink-600">{block.text}</p>
            {block.linkTo && (
              <Link
                to={block.linkTo}
                className="link-underline self-start text-[0.7rem] font-semibold uppercase tracking-widest-xl text-ink-900"
              >
                {block.linkLabel}
                <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </Link>
            )}
          </aside>
        </Reveal>
      );

    case 'paragraph':
    default:
      return (
        <Reveal direction="up" delay={0.02}>
          <p className="text-fluid-base leading-relaxed text-ink-600">{block.text}</p>
        </Reveal>
      );
  }
};

export const JournalDetails = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const progress = useScrollProgress();

  if (!article) return <Navigate to="/404" replace />;

  const related = getRelatedArticles(article.slug, 2);
  const linkedServices = (article.relatedServices ?? []).map(getServiceBySlug).filter(Boolean);
  const linkedWorks = (article.relatedWorks ?? []).map(getWorkBySlug).filter(Boolean);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Journal', path: '/journal' },
    { name: article.title, path: `/journal/${article.slug}` },
  ];

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/journal/${article.slug}`}
        image={article.coverImage}
        type="article"
        publishedTime={article.date}
        modifiedTime={article.date}
        schemas={[breadcrumbSchema(trail), articleSchema(article)]}
      />

      {/* Reading progress. Fixed under the header, purely decorative. */}
      <div
        className="fixed inset-x-0 z-sticky h-[2px] bg-transparent"
        style={{ top: 'var(--sd-header-h)' }}
        aria-hidden="true"
      >
        <div
          className="h-full origin-left bg-champagne-600"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <PageHero
        eyebrow={article.categoryLabel}
        title={article.title}
        lede={article.excerpt}
        image={article.coverImage}
        imageAlt={article.coverAlt}
        layout="immersive"
        railLabel="Journal"
        railIndex={`${article.readingMinutes} min`}
        breadcrumbs={trail}
        minHeight="46svh"
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.68rem] uppercase tracking-widest text-ivory-200/70">
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
            {article.readingMinutes} min read
          </span>
        </div>
      </PageHero>

      {/* Article body */}
      <article className="section">
        <div className="shell-narrow flex flex-col gap-5">
          {article.body.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
      </article>

      {/* Internal links out of the article */}
      {(linkedServices.length > 0 || linkedWorks.length > 0) && (
        <section className="bleed bg-ivory-100 section-sm" aria-labelledby="article-links">
          <div className="shell">
            <SectionHeading
              eyebrow="Related"
              title="Where to go from here"
              id="article-links"
              className="mb-7"
              titleClassName="text-fluid-2xl"
            />

            {linkedServices.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {linkedServices.map((service) => (
                  <Link key={service.slug} to={`/services/${service.slug}`} className="chip">
                    {service.title}
                    <ArrowRight className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            )}

            {linkedWorks.length > 0 && (
              <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                {linkedWorks.map((work) => (
                  <RevealItem key={work.slug} className="min-w-0">
                    <WorkCard work={work} aspect="3/2" />
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>
        </section>
      )}

      {/* More reading */}
      {related.length > 0 && (
        <section className="section" aria-labelledby="article-related">
          <div className="shell">
            <SectionHeading
              eyebrow="Keep Reading"
              title="More from the journal"
              id="article-related"
              action={{ label: 'All articles', to: '/journal' }}
              className="mb-8"
              titleClassName="text-fluid-2xl"
            />
            <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              {related.map((item) => (
                <RevealItem key={item.slug} className="min-w-0">
                  <JournalCard article={item} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CtaSection
        eyebrow="Ready When You Are"
        headingLines={['Enough reading.', 'Let us plan yours.']}
        copy="Tell us the date, the place and the people. We will come back with an honest view of how we would approach it."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'Explore Services', to: '/services' }}
      />
    </>
  );
};

export default JournalDetails;
