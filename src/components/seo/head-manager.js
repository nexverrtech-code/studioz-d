/**
 * Minimal document-head manager.
 *
 * WHY THIS EXISTS
 * ---------------
 * This replaces `react-helmet-async`, which rendered nothing at all in the
 * production build while working fine in dev — so every route shipped with
 * the home page's title, no canonical and no structured data. That is the
 * worst kind of bug: invisible in development, and it silently destroys SEO.
 *
 * Our head requirements are small and completely known (title, a fixed set of
 * meta tags, a canonical link, and JSON-LD blocks), so a direct
 * implementation is both shorter than the dependency and fully deterministic.
 *
 * ORDERING
 * --------
 * During a route transition two `<Seo>` instances can briefly coexist: the
 * outgoing page has not unmounted before the incoming one mounts. A naive
 * "apply on mount, clear on unmount" would let the outgoing page's cleanup
 * wipe the incoming page's tags. So entries live on a stack, the head always
 * reflects the top entry, and removing any entry re-renders from whatever is
 * left. Order of mount/unmount therefore cannot corrupt the result.
 */

/** Marks every node this module owns, so cleanup never touches anything else. */
const MANAGED = 'data-sd-head';

/** Active entries, oldest first. The last one wins. */
const stack = [];
let nextId = 1;

/**
 * Selector identifying a tag's "slot", so a managed tag replaces the static
 * equivalent shipped in index.html rather than duplicating it.
 */
const slotSelector = (tag) => {
  if (tag.tag === 'title') return 'title';
  if (tag.tag === 'meta') {
    if (tag.attrs.name) return `meta[name="${tag.attrs.name}"]`;
    if (tag.attrs.property) return `meta[property="${tag.attrs.property}"]`;
    return null;
  }
  if (tag.tag === 'link' && tag.attrs.rel === 'canonical') return 'link[rel="canonical"]';
  return null;
};

const render = () => {
  if (typeof document === 'undefined') return;

  const head = document.head;

  // Clear everything this module previously wrote.
  head.querySelectorAll(`[${MANAGED}]`).forEach((node) => node.remove());

  const top = stack[stack.length - 1];
  if (!top) return;

  const { title, tags, lang } = top.descriptor;

  if (lang) document.documentElement.setAttribute('lang', lang);
  if (title) document.title = title;

  for (const tag of tags) {
    // Drop any unmanaged tag occupying the same slot (e.g. the static
    // description in index.html) so we never emit duplicates.
    const selector = slotSelector(tag);
    if (selector) {
      head.querySelectorAll(selector).forEach((node) => {
        if (node.tagName.toLowerCase() !== 'title') node.remove();
      });
    }

    const element = document.createElement(tag.tag);
    for (const [key, value] of Object.entries(tag.attrs ?? {})) {
      if (value !== undefined && value !== null && value !== '') {
        element.setAttribute(key, String(value));
      }
    }
    if (tag.text) element.textContent = tag.text;
    element.setAttribute(MANAGED, '');
    head.appendChild(element);
  }
};

/** Registers a head descriptor and returns a handle to update or release it. */
export const pushHead = (descriptor) => {
  const id = nextId;
  nextId += 1;
  stack.push({ id, descriptor });
  render();

  return {
    update(next) {
      const entry = stack.find((item) => item.id === id);
      if (!entry) return;
      entry.descriptor = next;
      render();
    },
    release() {
      const index = stack.findIndex((item) => item.id === id);
      if (index === -1) return;
      stack.splice(index, 1);
      render();
    },
  };
};

/** Exposed for tests and debugging. */
export const __getHeadStackSize = () => stack.length;
