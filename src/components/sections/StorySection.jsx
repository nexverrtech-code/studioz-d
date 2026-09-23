import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { Reveal, RevealText } from '@/components/motion/Reveal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

/**
 * Editorial text + image block, used for the Photography Story and the
 * mirrored Gifts story on the home page.
 *
 * `reverse` swaps the column order on desktop only. On mobile the image
 * always comes first, because a wall of text above the fold reads as heavy.
 */
export const StorySection = ({
  eyebrow,
  headingLines = [],
  paragraphs = [],
  cta,
  image,
  imageAlt,
  secondaryImage,
  secondaryImageAlt,
  reverse = false,
  tone = 'light',
  className,
}) => {
  const isDark = tone === 'dark';

  /**
   * The image slides in horizontally only where the two-column layout makes
   * that read as motion across the grid. On a stacked mobile layout the same
   * offset would start the image outside the viewport and get clipped, so it
   * rises instead.
   */
  const isTwoColumn = useMediaQuery('(min-width: 1024px)');
  const imageDirection = isTwoColumn ? (reverse ? 'left' : 'right') : 'up';

  return (
    <section className={cn('section', isDark && 'bleed bg-ink-900', className)}>
      <div className="shell">
        <div
          className={cn(
            'grid items-center gap-10 lg:grid-cols-2 lg:gap-16',
            reverse && 'lg:[&>*:first-child]:order-2'
          )}
        >
          {/* --------------------------------------------------- Imagery */}
          <Reveal direction={imageDirection} className="relative min-w-0">
            <OptimizedImage
              src={image}
              alt={imageAlt}
              aspect="4/5"
              sizes={SIZES.half}
              className="w-full"
            />

            {/* Secondary frame overlaps the primary — but only from `sm` up,
                where there is genuinely room for it. Below that it would
                cover the main image. */}
            {secondaryImage && (
              <div
                className={cn(
                  'absolute hidden w-[38%] shadow-lift-lg sm:block',
                  reverse ? '-left-6 bottom-[-8%]' : '-right-6 bottom-[-8%]'
                )}
              >
                <OptimizedImage
                  src={secondaryImage}
                  alt={secondaryImageAlt ?? ''}
                  aspect="1/1"
                  sizes={SIZES.thumb}
                  className="w-full border-4 border-ivory-50"
                />
              </div>
            )}
          </Reveal>

          {/* ------------------------------------------------------- Copy */}
          <div className="flex min-w-0 flex-col gap-6">
            {eyebrow && (
              <Reveal direction="fade">
                <p
                  className={cn(
                    'eyebrow flex items-center gap-3',
                    isDark && 'text-champagne-400'
                  )}
                >
                  <span
                    className={cn(
                      'h-px w-8 shrink-0',
                      isDark ? 'bg-champagne-400/50' : 'bg-ink-300'
                    )}
                    aria-hidden="true"
                  />
                  {eyebrow}
                </p>
              </Reveal>
            )}

            <h2
              className={cn(
                'font-display uppercase leading-[1.02] tracking-[0.005em]',
                'text-[clamp(1.75rem,1.3rem+2.1vw,3.1rem)]',
                isDark ? 'text-ivory-50' : 'text-ink-900'
              )}
            >
              {headingLines.map((line) => (
                <span key={line} className="block">
                  <RevealText text={line} />
                </span>
              ))}
            </h2>

            <div className="flex flex-col gap-4">
              {paragraphs.map((paragraph, index) => (
                <Reveal key={index} direction="up" delay={0.06 * index}>
                  <p
                    className={cn(
                      'max-w-prose text-fluid-base leading-relaxed',
                      isDark ? 'text-ivory-200/80' : 'text-ink-500'
                    )}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {cta && (
              <Reveal direction="up" delay={0.2}>
                <Link
                  to={cta.to}
                  className={cn('btn self-start', isDark ? 'btn-light' : 'btn-solid')}
                >
                  {cta.label}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
