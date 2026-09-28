import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, Search, ArrowUpRight } from 'lucide-react';
import { navForWorld, navFlyouts } from '@/data/navigation';
import { useWorld } from '@/hooks/useWorld';
import { Logo } from './Logo';
import { MobileDrawer } from './MobileDrawer';
import { NavFlyout } from './NavFlyout';
import { SearchOverlay } from './SearchOverlay';
import { WorldSwitch } from './WorldSwitch';
import { cn } from '@/utils/cn';
import { useScrollState } from '@/hooks/useScrollState';
import { useCanHover } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { trackCta } from '@/services/analytics.service';

/**
 * Site header.
 *
 * Built around the two-world switch. Studioz D is two businesses, and the one
 * thing the header must always say is which half you are in and how to get to
 * the other — so that sits beside the logo, with the links for the current
 * world after it. Hovering either side of the switch opens that world's menu.
 *
 * Behaviour:
 *  - transparent over a dark hero, solid and blurred once scrolled
 *  - slides away on downward scroll, returns immediately on upward scroll
 *  - a hairline along the bottom edge fills as the page is read
 *  - below `lg` the links move into the drawer; below `sm` the switch does too
 *
 * It is `fixed`, so every page reserves its height via `--sd-header-h` rather
 * than the header ever sitting on top of content. The progress line is drawn
 * inside that height, so it never adds to it.
 */
export const Header = ({ transparent = false }) => {
  const { scrolled, direction, atTop } = useScrollState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [flyout, setFlyout] = useState(null);
  const canHover = useCanHover();
  const reducedMotion = usePrefersReducedMotion();
  const location = useLocation();

  const world = useWorld();
  const contextNav = navForWorld(world);

  /* Reading progress. Sprung so it glides rather than ticks with the wheel. */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: 0.4 });

  // Any navigation closes every overlay — otherwise the drawer survives a
  // route change and traps the user.
  useEffect(() => {
    setDrawerOpen(false);
    setSearchOpen(false);
    setFlyout(null);
  }, [location.pathname]);

  // Transparent styling only applies while the hero is still behind the bar.
  const overHero = transparent && atTop && !flyout;
  const tone = overHero ? 'light' : 'dark';
  const hidden = direction === 'down' && !drawerOpen && !flyout && !searchOpen;

  /** Only the two world segments carry a menu; anything else closes it. */
  const openFlyoutFor = (to) => {
    if (!canHover) return;
    setFlyout(navFlyouts[to] ? to : null);
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-header transition-[transform,background-color,border-color,backdrop-filter] duration-500 ease-editorial',
          hidden ? '-translate-y-full' : 'translate-y-0',
          overHero
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-ink-100 bg-ivory-50/95 backdrop-blur-md',
          scrolled && !overHero && 'shadow-hairline'
        )}
        style={{ paddingTop: 'var(--sd-safe-t)' }}
        onMouseLeave={() => setFlyout(null)}
      >
        <div
          className="shell relative flex items-center justify-between gap-4"
          style={{ minHeight: 'var(--sd-header-h)' }}
        >
          {/* ---------------------------------------------- Identity -- */}
          <div className="flex min-w-0 items-center gap-4 xl:gap-6">
            <Logo tone={tone} />

            <nav aria-label="Studio worlds" className="hidden sm:block">
              <WorldSwitch world={world} tone={tone} onSegmentHover={openFlyoutFor} />
            </nav>
          </div>

          {/* --------------------------------------- World-specific -- */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {contextNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onMouseEnter={() => setFlyout(null)}
                    className={({ isActive }) =>
                      cn(
                        'relative flex items-center px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-widest-xl transition-colors duration-300',
                        overHero
                          ? isActive
                            ? 'text-ivory-100'
                            : 'text-ivory-100/70 hover:text-ivory-100'
                          : isActive
                            ? 'text-ink-900'
                            : 'text-ink-400 hover:text-ink-900'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute inset-x-3 bottom-0.5 h-px origin-left transition-transform duration-300 ease-editorial',
                            overHero ? 'bg-ivory-100' : 'bg-ink-900',
                            isActive ? 'scale-x-100' : 'scale-x-0'
                          )}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------------------------------------------- Actions -- */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              onMouseEnter={() => setFlyout(null)}
              aria-label="Search the site"
              className={cn(
                'flex h-11 w-11 items-center justify-center transition-colors',
                overHero ? 'text-ivory-100/80 hover:text-ivory-100' : 'text-ink-500 hover:text-ink-900'
              )}
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            </button>

            <NavLink
              to="/contact"
              onMouseEnter={() => setFlyout(null)}
              onClick={() => trackCta("Let's Talk", 'header')}
              className={cn(
                'btn hidden md:inline-flex',
                'min-h-[40px] px-5 py-2.5 text-[0.66rem]',
                overHero ? 'btn-ghost-light' : 'btn-solid'
              )}
            >
              Let&rsquo;s Talk
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden="true" />
            </NavLink>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
              aria-expanded={drawerOpen}
              className={cn(
                '-mr-2 flex h-11 w-11 items-center justify-center transition-colors lg:hidden',
                overHero ? 'text-ivory-100' : 'text-ink-900'
              )}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Reading progress — champagne hairline on the header's bottom edge.
            Hidden over the hero, where there is nothing read yet. */}
        {!reducedMotion && (
          <motion.span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-champagne-500 transition-opacity duration-300',
              overHero ? 'opacity-0' : 'opacity-100'
            )}
            style={{ scaleX: progress }}
          />
        )}

        {/* Desktop flyout, anchored to the header so it can never escape it */}
        <NavFlyout config={flyout ? navFlyouts[flyout] : null} onClose={() => setFlyout(null)} />
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
