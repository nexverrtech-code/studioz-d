import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useSearch, SEARCH_TYPES } from '@/hooks/useSearch';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { SearchEmptyState } from '@/components/common/States';
import { SIZES } from '@/utils/images';
import { trackSearch } from '@/services/analytics.service';

/**
 * Site-wide search across works, gifts and journal entries.
 *
 * Opens as a top sheet rather than a full-screen takeover, so the page stays
 * visible behind it and the interaction feels lighter.
 */
export const SearchOverlay = ({ open, onClose }) => {
  const inputRef = useRef(null);
  const containerRef = useFocusTrap(open, { initialFocusRef: inputRef });
  const reducedMotion = usePrefersReducedMotion();
  const { query, setQuery, type, setType, results, hasSearched, isEmpty, reset } = useSearch();

  useLockBodyScroll(open);
  useEscapeKey(open, onClose);

  // Report the search once it settles, not on every keystroke.
  useEffect(() => {
    if (!hasSearched) return undefined;
    const timer = setTimeout(() => trackSearch(query, results.length), 700);
    return () => clearTimeout(timer);
  }, [query, results.length, hasSearched]);

  // Clear the field when the overlay closes so it reopens fresh.
  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-drawer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          <div
            className="absolute inset-0 bg-ink-950/55 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search Studioz D"
            className="absolute inset-x-0 top-0 max-h-[92svh] overflow-hidden bg-ivory-50 shadow-lift-lg"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: reducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shell flex max-h-[92svh] flex-col py-5">
              {/* Input row */}
              <div className="flex shrink-0 items-center gap-3 border-b border-ink-200 pb-4">
                <Search
                  className="h-5 w-5 shrink-0 text-ink-400"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <label htmlFor="site-search" className="sr-only">
                  Search works, gifts and journal
                </label>
                <input
                  id="site-search"
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search works, gifts, journal…"
                  autoComplete="off"
                  className="min-w-0 flex-1 border-0 bg-transparent py-2 font-display text-fluid-xl text-ink-900 outline-none placeholder:text-ink-300"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close search"
                  className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-ink-500 transition-colors hover:text-ink-900"
                >
                  <X className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
                </button>
              </div>

              {/* Type filter — scrolls inside itself, never widens the page */}
              <div className="rail shrink-0 gap-2 py-4">
                {SEARCH_TYPES.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setType(entry.id)}
                    aria-pressed={type === entry.id}
                    className="chip"
                  >
                    {entry.label}
                  </button>
                ))}
              </div>

              {/* Results */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-6">
                {!hasSearched && (
                  <p className="py-10 text-center text-fluid-sm text-ink-400">
                    Type at least two characters to search.
                  </p>
                )}

                {isEmpty && <SearchEmptyState query={query} className="my-6" />}

                {results.length > 0 && (
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {results.map((entry) => (
                      <li key={`${entry.type}-${entry.slug}`}>
                        <Link
                          to={entry.to}
                          onClick={onClose}
                          className="group flex items-center gap-4 border border-transparent p-2 transition-colors hover:border-ink-100 hover:bg-ivory-100"
                        >
                          <OptimizedImage
                            src={entry.image}
                            alt=""
                            aspect="1/1"
                            sizes={SIZES.thumb}
                            className="w-16 shrink-0 sm:w-20"
                          />
                          <div className="flex min-w-0 flex-col gap-1">
                            <span className="text-[0.62rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
                              {entry.category}
                            </span>
                            <span className="clamp-1 font-display text-fluid-lg text-ink-900">
                              {entry.title}
                            </span>
                            <span className="clamp-2 text-fluid-xs text-ink-400">
                              {entry.description}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
