import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Desktop mega-menu panel.
 *
 * Rendered inside the header element so it inherits the header's stacking
 * context — it can never appear above the drawer or the lightbox, and it can
 * never escape the top of the page.
 *
 * Hidden entirely below `lg`, where the drawer handles navigation instead.
 */
export const NavFlyout = ({ config, onClose }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {config && (
        <motion.div
          className="hidden border-t border-ink-100 bg-ivory-50/95 backdrop-blur-md lg:block"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reducedMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="shell grid grid-cols-[minmax(0,0.9fr)_minmax(0,2.4fr)] gap-12 py-10">
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-fluid-xl text-ink-900">{config.title}</h2>
              <p className="max-w-prose-sm text-fluid-sm text-ink-400">{config.blurb}</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {config.columns.map((column) => (
                <div key={column.heading} className="flex min-w-0 flex-col gap-3">
                  <p className="eyebrow">{column.heading}</p>
                  <ul className="flex flex-col gap-1">
                    {column.links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          onClick={onClose}
                          className="group flex items-center justify-between gap-2 py-1.5 text-fluid-sm text-ink-500 transition-colors hover:text-ink-900"
                        >
                          <span className="min-w-0 truncate">{link.label}</span>
                          <ArrowRight
                            className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavFlyout;
