import { useDeferredValue, useMemo, useState } from 'react';
import { workSearchIndex } from '@/data/works';
import { giftSearchIndex } from '@/data/gifts';
import { journalSearchIndex } from '@/data/journal';

/** One flat index across works, gifts and journal. Built once at module load. */
const SEARCH_INDEX = [...workSearchIndex, ...giftSearchIndex, ...journalSearchIndex];

export const SEARCH_TYPES = [
  { id: 'all', label: 'Everything' },
  { id: 'work', label: 'Works' },
  { id: 'gift', label: 'Gifts' },
  { id: 'journal', label: 'Journal' },
];

/**
 * Scores a single entry against the query terms.
 *
 * Title matches outrank category matches, which outrank body matches — so
 * searching "wedding" surfaces the wedding project before an article that
 * happens to mention the word. Returns 0 when any term is missing, which
 * makes multi-word queries behave like AND rather than OR.
 */
const scoreEntry = (entry, terms) => {
  let score = 0;
  for (const term of terms) {
    if (!entry.haystack.includes(term)) return 0;
    if (entry.title.toLowerCase().includes(term)) score += 6;
    if (entry.category.toLowerCase().includes(term)) score += 3;
    score += 1;
  }
  return score;
};

/**
 * Site-wide search.
 *
 * `useDeferredValue` keeps typing responsive: the input updates immediately
 * while the (heavier) result list re-renders at a lower priority.
 */
export const useSearch = ({ initialQuery = '', initialType = 'all', limit = 24 } = {}) => {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(initialType);
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const trimmed = deferredQuery.trim().toLowerCase();
    const pool = type === 'all' ? SEARCH_INDEX : SEARCH_INDEX.filter((e) => e.type === type);

    if (trimmed.length < 2) return { entries: [], searched: false, pool: pool.length };

    const terms = trimmed.split(/\s+/).filter(Boolean);
    const scored = pool
      .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
      .filter((row) => row.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((row) => row.entry);

    return { entries: scored, searched: true, pool: pool.length };
  }, [deferredQuery, type, limit]);

  return {
    query,
    setQuery,
    type,
    setType,
    results: results.entries,
    /** True once the query is long enough to have actually run. */
    hasSearched: results.searched,
    isEmpty: results.searched && results.entries.length === 0,
    /** True while the deferred value is catching up with the input. */
    isPending: query !== deferredQuery,
    reset: () => setQuery(''),
  };
};

export default useSearch;
