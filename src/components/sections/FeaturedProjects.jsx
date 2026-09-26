import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { Reveal } from '@/components/motion/Reveal';
import { useCanHover } from '@/hooks/useMediaQuery';
import { pad2 } from '@/utils/format';
import { cn } from '@/utils/cn';

/**
 * Featured work — a small number of real projects presented large.
 *
 * Deliberately not a grid of equal cards: one big photograph with quiet
 * metadata beside it reads as an editorial feature, which is what a
 * photographer's strongest work deserves. Projects alternate sides so two in a
 * row do not look like a repeating template.
 *
 * Titles and categories come from the project data — nothing is invented here.
 */
export const FeaturedProjects = ({ projects = [], className }) => {
  const canHover = useCanHover();

  if (projects.length === 0) return null;

  return (
    <div className={cn('flex flex-col gap-10 lg:gap-14', className)}>
      {projects.map((project, index) => {
        const flipped = index % 2 === 1;

        return (
          <Reveal key={project.slug} direction="up" className="shell">
            <Link
              to={`/works/${project.slug}`}
              aria-label={`Open ${project.title} — ${project.category}`}
              className={cn(
                'group grid items-center gap-5 lg:grid-cols-12 lg:gap-10',
                flipped && 'lg:[&>*:first-child]:order-2'
              )}
            >
              <div className="min-w-0 lg:col-span-8">
                <OptimizedImage
                  src={project.coverImage}
                  alt={`${project.title} — ${project.category} photography by Studioz D`}
                  aspect="3/2"
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  priority={index === 0}
                  className="w-full"
                  imgClassName={cn(
                    'transition-transform duration-[1000ms] ease-editorial',
                    canHover && 'group-hover:scale-[1.03]'
                  )}
                />
              </div>

              <div className="flex min-w-0 flex-col gap-3 lg:col-span-4">
                <span className="flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
                  <span className="tabular-nums">{pad2(index + 1)}</span>
                  <span className="h-px w-6 bg-ink-200" aria-hidden="true" />
                  {project.category}
                </span>

                <h3 className="font-display text-[clamp(1.6rem,1.25rem+1.5vw,2.5rem)] leading-[1.05] text-ink-900">
                  {project.title}
                </h3>

                <p className="clamp-3 max-w-prose text-fluid-sm leading-relaxed text-ink-400">
                  {project.description}
                </p>

                <span className="mt-1 inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-widest-xl text-ink-900">
                  View Story
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
};

export default FeaturedProjects;
