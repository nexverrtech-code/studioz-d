import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { Button } from '@/components/buttons/Button';
import { getFeaturedWorks } from '@/data/works';
import { SIZES } from '@/utils/images';

const QUICK_LINKS = [
  { label: 'Our Work', to: '/works' },
  { label: 'Services', to: '/services' },
  { label: 'Gifts', to: '/gifts' },
  { label: 'Journal', to: '/journal' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const NotFound = () => {
  const suggestions = getFeaturedWorks(3);

  return (
    <>
      <Seo
        title="Page not found"
        description="That page does not exist. Find your way back to the Studioz D portfolio, services or personalized gifts."
        path="/404"
        noindex
      />

      <section className="pt-header">
        <div className="shell flex flex-col items-center gap-8 py-section text-center">
          <p className="eyebrow">404</p>

          <h1 className="max-w-[18ch] font-display text-[clamp(2.2rem,1.5rem+3.4vw,4.6rem)] uppercase leading-[0.98] text-ink-900">
            This frame is empty.
          </h1>

          <p className="max-w-prose-sm text-fluid-lg text-ink-500">
            The page you were looking for has moved, been renamed, or never existed. Everything
            else is still exactly where it was.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button to="/" variant="solid" icon={ArrowRight}>
              Back to Home
            </Button>
            <Button to="/works" variant="outline">
              Browse the Portfolio
            </Button>
          </div>

          <nav aria-label="Quick links" className="mt-2 flex flex-wrap justify-center gap-2">
            {QUICK_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="chip">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Something to look at rather than a dead end */}
      <section className="bleed bg-ivory-100 section-sm" aria-labelledby="not-found-suggestions">
        <div className="shell">
          <h2
            id="not-found-suggestions"
            className="mb-10 text-center font-display text-fluid-2xl text-ink-900"
          >
            While you are here
          </h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            {suggestions.map((work) => (
              <Link key={work.slug} to={`/works/${work.slug}`} className="group min-w-0">
                <OptimizedImage
                  src={work.coverImage}
                  alt={`${work.title} — ${work.category} photography by Studioz D`}
                  /* Project covers are 3:2 files; a 4:5 box cut 47% of them. */
                  aspect="3/2"
                  sizes={SIZES.third}
                  className="w-full"
                  imgClassName="transition-transform duration-[900ms] ease-editorial hoverable:group-hover:scale-[1.04]"
                />
                <div className="flex flex-col gap-1 pt-4">
                  <span className="text-[0.58rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
                    {work.category}
                  </span>
                  <span className="font-display text-fluid-lg text-ink-900">{work.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
