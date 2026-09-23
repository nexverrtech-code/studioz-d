import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, X, Check } from 'lucide-react';
import { giftGroups, getCategoriesByGroup, priceTiers } from '@/data/gifts';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'tier-asc', label: 'Keepsake first' },
  { id: 'tier-desc', label: 'Signature first' },
  { id: 'name', label: 'A–Z' },
];

/** One reusable block of controls, rendered in both the sidebar and drawer. */
const FilterControls = ({ filters, setFilter, toggleTier }) => (
  <div className="flex flex-col gap-8">
    {giftGroups.map((group) => {
      const categories = getCategoriesByGroup(group.id);
      if (categories.length === 0) return null;
      const key = group.id;

      return (
        <fieldset key={group.id} className="min-w-0 border-0 p-0">
          <legend className="eyebrow mb-3">{group.label}</legend>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter(key, null)}
              aria-pressed={!filters[key]}
              className="chip"
            >
              Any
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(key, filters[key] === category.id ? null : category.id)}
                aria-pressed={filters[key] === category.id}
                className="chip"
              >
                {category.label}
              </button>
            ))}
          </div>
        </fieldset>
      );
    })}

    <fieldset className="min-w-0 border-0 p-0">
      <legend className="eyebrow mb-1">Range</legend>
      <p className="mb-3 text-[0.68rem] leading-relaxed text-ink-300">
        Indicative planning bands. Every piece is quoted on enquiry.
      </p>
      <div className="flex flex-wrap gap-2">
        {priceTiers.map((tier) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => toggleTier(tier.id)}
            aria-pressed={filters.tiers.includes(tier.id)}
            className="chip"
            title={tier.note}
          >
            {filters.tiers.includes(tier.id) && (
              <Check className="h-3 w-3" strokeWidth={2.4} aria-hidden="true" />
            )}
            {tier.label}
          </button>
        ))}
      </div>
    </fieldset>

    <fieldset className="min-w-0 border-0 p-0">
      <legend className="eyebrow mb-3">Show</legend>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter('personalizedOnly', !filters.personalizedOnly)}
          aria-pressed={filters.personalizedOnly}
          className="chip"
        >
          Personalized only
        </button>
        <button
          type="button"
          onClick={() => setFilter('featuredOnly', !filters.featuredOnly)}
          aria-pressed={filters.featuredOnly}
          className="chip"
        >
          Featured
        </button>
      </div>
    </fieldset>

    <fieldset className="min-w-0 border-0 p-0">
      <legend className="eyebrow mb-3">Sort</legend>
      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setFilter('sort', option.id)}
            aria-pressed={filters.sort === option.id}
            className="chip"
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  </div>
);

/**
 * Gift filtering.
 *
 * Desktop → a sticky sidebar that scrolls independently of the results.
 * Mobile  → a bottom-sheet drawer opened from a sticky toolbar.
 *
 * Both render the same `FilterControls`, so the two surfaces cannot drift
 * apart. Every chip row wraps rather than scrolls, which keeps the page free
 * of horizontal overflow at any width.
 */
export const GiftFilters = ({ filters, setFilter, toggleTier, resetFilters, resultCount }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeRef = useRef(null);
  const containerRef = useFocusTrap(drawerOpen, { initialFocusRef: closeRef });
  const reducedMotion = usePrefersReducedMotion();

  useLockBodyScroll(drawerOpen);
  useEscapeKey(drawerOpen, () => setDrawerOpen(false));

  const activeCount =
    ['occasion', 'relationship', 'creation', 'feeling'].filter((key) => filters[key]).length +
    filters.tiers.length +
    (filters.personalizedOnly ? 1 : 0) +
    (filters.featuredOnly ? 1 : 0);

  return (
    <>
      {/* ------------------------------------------------ Desktop sidebar */}
      <aside
        className="hidden lg:block"
        aria-label="Gift filters"
      >
        <div
          className="sticky max-h-[calc(100svh-var(--sd-header-h)-3rem)] overflow-y-auto overscroll-contain pr-2"
          style={{ top: 'calc(var(--sd-header-h) + 1.5rem)' }}
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-widest-xl text-ink-900">
              Filter
            </p>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="link-underline text-[0.64rem] uppercase tracking-widest text-ink-400"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>

          <FilterControls filters={filters} setFilter={setFilter} toggleTier={toggleTier} />
        </div>
      </aside>

      {/* -------------------------------------------- Mobile/tablet bar */}
      <div
        className="sticky z-sticky -mx-[var(--sd-gutter)] mb-6 border-y border-ink-100 bg-ivory-50/95 px-[var(--sd-gutter)] py-3 backdrop-blur-md lg:hidden"
        style={{ top: 'var(--sd-header-h)' }}
      >
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex min-h-[44px] items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-widest-xl text-ink-900"
            aria-expanded={drawerOpen}
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            Filter
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink-900 px-1.5 text-[0.6rem] text-ivory-100">
                {activeCount}
              </span>
            )}
          </button>

          <span className="text-[0.68rem] tabular-nums text-ink-400">
            {resultCount} {resultCount === 1 ? 'creation' : 'creations'}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-drawer lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <div
              className="absolute inset-0 bg-ink-950/50"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              ref={containerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Filter gifts"
              className="absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col bg-ivory-50"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-ink-100 px-gutter py-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-widest-xl text-ink-900">
                  Filter
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filters"
                  className="-mr-2 flex h-11 w-11 items-center justify-center text-ink-500"
                >
                  <X className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-gutter py-6">
                <FilterControls
                  filters={filters}
                  setFilter={setFilter}
                  toggleTier={toggleTier}
                />
              </div>

              <div
                className="flex shrink-0 gap-3 border-t border-ink-100 px-gutter pt-4"
                style={{ paddingBottom: 'calc(1rem + var(--sd-safe-b))' }}
              >
                <button type="button" onClick={resetFilters} className="btn btn-outline flex-1">
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="btn btn-solid flex-1"
                >
                  Show {resultCount}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GiftFilters;
