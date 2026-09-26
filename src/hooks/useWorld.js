import { useLocation } from 'react-router-dom';
import { WORLDS } from '@/data/navigation';

/**
 * Which of the studio's two creative worlds the visitor is currently in.
 *
 * Studioz D is one brand with two businesses — photography and personalized
 * gifts. The landing page asks you to choose; from that point the navigation
 * should reflect where you are rather than showing both catalogues at once.
 *
 * Derived from the route rather than stored in state, so it survives a
 * refresh, a deep link and the back button without any synchronisation.
 */
export { WORLDS } from '@/data/navigation';

/** Route prefixes that belong to each world. Order matters: first match wins. */
const WORLD_ROUTES = [
  [WORLDS.GIFTS, ['/gifts']],
  [WORLDS.PHOTOGRAPHY, ['/services', '/works', '/journal', '/about']],
];

export const worldForPath = (pathname) => {
  for (const [world, prefixes] of WORLD_ROUTES) {
    if (prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
      return world;
    }
  }
  // Home, contact, faq and the legal pages are shared ground.
  return WORLDS.LANDING;
};

export const useWorld = () => worldForPath(useLocation().pathname);

export default useWorld;
