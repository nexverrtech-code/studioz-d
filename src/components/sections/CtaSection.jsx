import { ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '@/components/buttons/MagneticButton';
import { WhatsAppButton } from '@/components/buttons/ContactButtons';
import { Reveal, RevealText } from '@/components/motion/Reveal';
import { cn } from '@/utils/cn';
import { trackCta } from '@/services/analytics.service';

/**
 * Closing call to action.
 *
 * Reused at the bottom of Home, Works, Services, Gifts and every detail page,
 * with the copy varied per surface so it never reads as boilerplate.
 */
export const CtaSection = ({
  eyebrow = 'What Happens Next',
  headingLines = ['Your story', 'deserves to be remembered.'],
  copy = 'Whether you are planning a celebration, building a brand or looking for a gift that means something — let us create it together.',
  primary = { label: 'Start a Conversation', to: '/contact' },
  secondary = { label: 'Explore Our Work', to: '/works' },
  showWhatsApp = true,
  whatsappMessage,
  className,
}) => (
  <section className={cn('bleed bg-ink-900', className)} aria-labelledby="cta-title">
    <div className="shell py-section">
      <div className="flex flex-col items-center gap-8 text-center">
        <Reveal direction="fade">
          <p className="eyebrow flex items-center gap-3 text-champagne-400">
            <span className="h-px w-8 bg-champagne-400/50" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>

        <h2
          id="cta-title"
          className="max-w-[20ch] font-display text-[clamp(2rem,1.4rem+2.8vw,4rem)] uppercase leading-[1.02] text-ivory-50"
        >
          {headingLines.map((line) => (
            <span key={line} className="block">
              <RevealText text={line} />
            </span>
          ))}
        </h2>

        <Reveal direction="up" delay={0.12}>
          <p className="max-w-[52ch] text-fluid-lg text-ivory-200/80">{copy}</p>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {primary && (
              <MagneticButton
                to={primary.to}
                variant="light"
                icon={ArrowUpRight}
                onClick={() => trackCta(primary.label, 'cta-section')}
              >
                {primary.label}
              </MagneticButton>
            )}
            {secondary && (
              <MagneticButton
                to={secondary.to}
                variant="ghostLight"
                onClick={() => trackCta(secondary.label, 'cta-section')}
              >
                {secondary.label}
              </MagneticButton>
            )}
            {showWhatsApp && (
              <WhatsAppButton
                variant="ghostLight"
                context="cta-section"
                message={whatsappMessage}
              />
            )}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default CtaSection;
