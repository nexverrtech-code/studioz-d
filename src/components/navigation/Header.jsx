import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Search, ArrowUpRight } from 'lucide-react';
import { primaryNav, navFlyouts } from '@/data/navigation';
import { Logo } from './Logo';
import { MobileDrawer } from './MobileDrawer';
import { NavFlyout } from './NavFlyout';
import { SearchOverlay } from './SearchOverlay';
import { cn } from '@/utils/cn';
import { useScrollState } from '@/hooks/useScrollState';
import { useCanHover } from '@/hooks/useMediaQuery';
import { trackCta } from '@/services/analytics.service';

/**
 * Site header.
 *
 * Behaviour:
 *  - transparent over a dark hero, solid + blurred once scrolled
 *  - slides away on downward scroll, returns immediately on upward scroll
 *  - desktop shows the full bar, tablet a compact bar, mobile the drawer
 *
 * It is `fixed`, so every page reserves its height via `--sd-header-h` rather
 * than the header ever sitting on top of content.
 */
export const Header = ({ transparent = false }) => {
  const { scrolled, direction, atTop } = useScrollState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [flyout, setFlyout] = useState(null);
  const canHover = useCanHover();
  const location = useLocation();

  // Any navigation closes every overlay — otherwise the drawer survives a
  // route change and traps the user.
  useEffect(() => {
    setDrawerOpen(false);
    setSearchOpen(false);
    setFlyout(null);
  }, [location.pathname]);

  // Transparent styling only applies while the hero is still behind the bar.
  const overHero = transparent && atTop && !flyout;
  const hidden = direction === 'down' && !drawerOpen && !flyout && !searchOpen;

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
          className="shell flex items-center justify-between gap-4"
          style={{ minHeight: 'var(--sd-header-h)' }}
        >
          <Logo tone={overHero ? 'light' : 'dark'} />

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const hasFlyout = Boolean(navFlyouts[item.to]);
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onMouseEnter={() => canHover && setFlyout(hasFlyout ? item.to : null)}
                      onFocus={() => setFlyout(hasFlyout ? item.to : null)}
                      aria-expanded={hasFlyout ? flyout === item.to : undefined}
                      className={({ isActive }) =>
                        cn(
                          'relative flex items-center px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-widest-xl transition-colors duration-300',
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
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
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
              onClick={() => trackCta("Let's Talk", 'header')}
              className={cn(
                'btn hidden md:inline-flex',
                'min-h-[42px] px-5 py-2.5 text-[0.68rem]',
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

        {/* Desktop flyout, anchored to the header so it can never escape it */}
        <NavFlyout
          config={flyout ? navFlyouts[flyout] : null}
          onClose={() => setFlyout(null)}
        />
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
