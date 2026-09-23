/** Small formatting helpers shared across the site and the admin surface. */

/** 12480 → "12,480". Falls back to an em dash for non-numbers. */
export const formatNumber = (value) =>
  typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString('en-GB') : '—';

/** 61.8 → "61.8%" */
export const formatPercent = (value, digits = 1) =>
  typeof value === 'number' && Number.isFinite(value) ? `${value.toFixed(digits)}%` : '—';

/** 12.4 → "+12.4%", -4.3 → "−4.3%" (true minus sign, not a hyphen). */
export const formatDelta = (value, digits = 1) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
  const sign = value > 0 ? '+' : value < 0 ? '−' : '';
  return `${sign}${Math.abs(value).toFixed(digits)}%`;
};

/** 164 → "2m 44s" */
export const formatDuration = (seconds) => {
  if (typeof seconds !== 'number' || !Number.isFinite(seconds)) return '—';
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
};

/** ISO date → "18 August 2026". Returns '' for unparseable input. */
export const formatDate = (iso, options) => {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(
    'en-GB',
    options ?? { day: 'numeric', month: 'long', year: 'numeric' }
  );
};

/** ISO date → "18 Aug 2026, 09:14" for dense admin tables. */
export const formatDateTime = (iso) => {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/** ISO date → "3 days ago". Used in the leads list. */
export const formatRelative = (iso) => {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diffDays = Math.round((Date.now() - then) / 86400000);
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  const months = Math.round(diffDays / 30);
  return months === 1 ? '1 month ago' : `${months} months ago`;
};

/** Truncates on a word boundary so cards never clip mid-word. */
export const truncate = (text, max = 140) => {
  if (typeof text !== 'string' || text.length <= max) return text ?? '';
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

/** "Wedding Photography" → "wedding-photography" */
export const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

/** "wedding-photography" → "Wedding Photography" */
export const titleFromSlug = (slug) =>
  String(slug)
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

/** "03" — used for gallery counters and process steps. */
export const pad2 = (value) => String(value).padStart(2, '0');
