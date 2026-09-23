import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/utils/cn';

/**
 * FAQ accordion.
 *
 * A real `<button>` per row carrying `aria-expanded` and `aria-controls`, so
 * screen readers announce the state — the common failing of div-based
 * accordions.
 *
 * The panel animates `height: auto`, which Framer measures, so opening one
 * never causes a jump or leaves whitespace behind.
 */
export const FaqAccordion = ({ items = [], idPrefix = 'faq', allowMultiple = false }) => {
  const uid = useId();
  const [open, setOpen] = useState(() => new Set());
  const reducedMotion = usePrefersReducedMotion();

  const toggle = (index) => {
    setOpen((current) => {
      const next = new Set(allowMultiple ? current : []);
      if (current.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col">
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const buttonId = `${idPrefix}-${uid}-q${index}`;
        const panelId = `${idPrefix}-${uid}-a${index}`;

        return (
          <div key={item.q} className="border-b border-ink-200 first:border-t">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-ink-900"
              >
                <span
                  className={cn(
                    'min-w-0 font-display text-fluid-lg leading-snug transition-colors',
                    isOpen ? 'text-ink-900' : 'text-ink-700'
                  )}
                >
                  {item.q}
                </span>
                <Plus
                  className={cn(
                    'mt-1 h-4 w-4 shrink-0 text-ink-400 transition-transform duration-400 ease-editorial',
                    isOpen && 'rotate-45 text-ink-900'
                  )}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-6 pr-10 text-fluid-base leading-relaxed text-ink-500">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
