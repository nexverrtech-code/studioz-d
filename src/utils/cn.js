/**
 * Minimal className joiner.
 *
 * Accepts strings, arrays and condition objects, drops anything falsy, and
 * collapses whitespace. Deliberately dependency-free — this is the only
 * class utility the project needs.
 *
 *   cn('btn', isActive && 'btn-solid', { 'w-full': fullWidth })
 */
export const cn = (...inputs) => {
  const out = [];

  const walk = (value) => {
    if (!value) return;
    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value === 'object') {
      for (const [key, enabled] of Object.entries(value)) {
        if (enabled) out.push(key);
      }
    }
  };

  inputs.forEach(walk);
  return out.join(' ').replace(/\s+/g, ' ').trim();
};

export default cn;
