import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { useCanHover, useMediaQuery } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

/**
 * Horizontal photo story.
 *
 * Desktop: the section pins while vertical scroll is translated into
 * horizontal movement, driven by GSAP ScrollTrigger (imported dynamically so
 * GSAP never lands in the initial bundle).
 *
 * Mobile / tablet / reduced-motion: NO scroll hijacking. It becomes a native
 * swipe rail with snap points — which is both faster and the interaction
 * people actually expect on a phone.
 */
export const HorizontalPhotoStory = ({ photos = [], className }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const canHover = useCanHover();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reducedMotion = usePrefersReducedMotion();

  const pinned = isDesktop && canHover && !reducedMotion;

  useEffect(() => {
    if (!pinned || photos.length === 0) return undefined;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const ctx = gsap.context(() => {
        // Distance the track must travel for its last card to reach the
        // right edge. Recomputed on refresh so resizing stays correct.
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });

        return () => tween.scrollTrigger?.kill();
      }, section);

      // Lenis drives scroll position, so ScrollTrigger must be told to
      // re-measure from it rather than the native scroll event.
      const lenis = window.__lenis;
      const onLenisScroll = () => ScrollTrigger.update();
      lenis?.on('scroll', onLenisScroll);

      ScrollTrigger.refresh();

      cleanup = () => {
        lenis?.off('scroll', onLenisScroll);
        ctx.revert();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pinned, photos.length]);

  if (photos.length === 0) return null;

  const cards = photos.map((photo, index) => (
    <article
      key={photo.workSlug + index}
      className={cn(
        'relative flex shrink-0 flex-col gap-4',
        // Deliberately narrower than the viewport so the next card always
        // peeks in — that is the cue that the rail is scrollable.
        'w-[78vw] max-w-[420px] sm:w-[62vw] lg:w-[34vw] lg:max-w-[460px]'
      )}
    >
      <Link
        to={`/works/${photo.workSlug}`}
        data-cursor="story"
        className="group block"
        aria-label={`Open ${photo.workTitle} — ${photo.category}`}
      >
        <OptimizedImage
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          aspect={photo.aspect}
          sizes={SIZES.half}
          className="w-full"
          imgClassName={cn(
            'transition-transform duration-[900ms] ease-editorial',
            canHover && 'group-hover:scale-[1.04]'
          )}
        />
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-[0.6rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
              {photo.number} — {photo.category}
            </span>
            <span className="clamp-2 font-display text-fluid-xl leading-tight text-ink-900">
              {photo.workTitle}
            </span>
          </div>
          <ArrowRight
            className="mt-1 h-4 w-4 shrink-0 text-ink-400 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      </Link>
    </article>
  ));

  /* ------------------------------------------------- Pinned (desktop) -- */
  if (pinned) {
    return (
      <section
        ref={sectionRef}
        className={cn('bleed relative overflow-hidden', className)}
        aria-label="Photo story"
      >
        <div className="flex h-svh flex-col justify-center">
          <div
            ref={trackRef}
            className="flex items-start gap-8 pl-[max(var(--sd-gutter),calc((100vw-1400px)/2))] pr-16 will-change-transform"
          >
            {cards}
          </div>

          {/* Progress rail */}
          <div className="shell mt-10">
            <div className="h-px w-full bg-ink-200" aria-hidden="true">
              <div
                className="h-px origin-left bg-ink-900 transition-transform duration-150"
                style={{ transform: `scaleX(${Math.max(0.02, progress)})` }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------ Native swipe rail (touch / reduced) -- */
  return (
    <section className={cn('bleed', className)} aria-label="Photo story">
      <div
        className={cn(
          'rail items-start gap-6 pb-2',
          // Padding, not negative margin — the rail can never exceed the page.
          'pl-[var(--sd-gutter)] pr-[var(--sd-gutter)]'
        )}
      >
        {cards}
      </div>
      <p className="shell mt-4 text-[0.64rem] uppercase tracking-widest-xl text-ink-300">
        Swipe to explore
      </p>
    </section>
  );
};

export default HorizontalPhotoStory;
