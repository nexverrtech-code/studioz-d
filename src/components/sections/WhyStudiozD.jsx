import { SectionHeading } from '@/components/common/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { whyStudiozD } from '@/data/about';

/**
 * Reasons to work with the studio.
 *
 * Every claim here is about method, not metrics — no invented project counts,
 * years in business or award lists.
 */
export const WhyStudiozD = () => (
  <section className="bleed bg-ivory-100 section" aria-labelledby="why-title">
    <div className="shell">
      <SectionHeading
        eyebrow="Why Studioz D"
        title="How we work, and why it shows"
        id="why-title"
        lede="No metrics, no badges. Just the decisions that change what the photographs look like."
        className="mb-9"
      />

      <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {whyStudiozD.map((reason) => (
          <RevealItem
            key={reason.number}
            className="flex min-w-0 flex-col gap-3 border-t border-ink-200 pt-6"
          >
            <span className="text-[0.66rem] font-semibold tabular-nums tracking-widest-xl text-champagne-700">
              {reason.number}
            </span>
            <h3 className="font-display text-fluid-xl leading-tight text-ink-900">
              {reason.title}
            </h3>
            <p className="text-fluid-sm leading-relaxed text-ink-400">{reason.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </section>
);

export default WhyStudiozD;
