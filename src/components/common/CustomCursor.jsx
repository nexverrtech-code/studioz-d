import { useEffect, useRef, useState } from 'react';
import { useCanHover } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Desktop custom cursor.
 *
 * Elements opt in by declaring `data-cursor="view"` (or open / drag /
 * explore). No context or provider is needed — the cursor reads the nearest
 * annotated ancestor of whatever is under the pointer.
 *
 * Never mounts on touch or coarse-pointer devices, and never under
 * reduced-motion. The native cursor is left completely alone in those cases.
 *
 * Position is written straight to the DOM inside rAF rather than through
 * state, because a cursor that re-renders React on every mousemove is a
 * cursor that lags.
 */

const LABELS = {
  default: '',
  view: 'View',
  open: 'Open',
  drag: 'Drag',
  explore: 'Explore',
  story: 'Open Story',
};

export const CustomCursor = () => {
  const canHover = useCanHover();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = canHover && !reducedMotion;

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const [mode, setMode] = useState('default');
  const [visible, setVisible] = useState(false);
  // Mirrored in a ref so `onMove` never needs `visible` as an effect
  // dependency — otherwise every visibility flip tears down the rAF loop.
  const visibleRef = useRef(false);

  useEffect(() => {
    if (!enabled) return undefined;

    let frame = 0;

    const setVisibility = (next) => {
      if (visibleRef.current === next) return;
      visibleRef.current = next;
      setVisible(next);
    };

    const onMove = (event) => {
      target.current = { x: event.clientX, y: event.clientY };
      setVisibility(true);

      const node = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      const next = node?.getAttribute('data-cursor') ?? 'default';
      setMode((previous) => (previous === next ? previous : next));
    };

    const onLeave = () => setVisibility(false);
    const onEnter = () => setVisibility(true);

    const tick = () => {
      // Lerp toward the pointer — the ring trails slightly behind the dot,
      // which is what makes the movement read as weight rather than lag.
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  const label = LABELS[mode] ?? '';
  const expanded = Boolean(label);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-cursor hidden lg:block">
      {/* Centre dot — tracks the pointer exactly. */}
      <span
        ref={dotRef}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] block h-[6px] w-[6px] rounded-full bg-ink-900 transition-opacity duration-200"
        style={{ opacity: visible && !expanded ? 1 : 0 }}
      />
      {/* Ring — trails, and expands into a labelled disc on interactive elements. */}
      <span
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-ink-900/30 bg-ivory-50/10 backdrop-blur-[1px] transition-[width,height,margin,background-color,border-color,opacity] duration-300 ease-editorial"
        style={{
          width: expanded ? 76 : 30,
          height: expanded ? 76 : 30,
          marginLeft: expanded ? -38 : -15,
          marginTop: expanded ? -38 : -15,
          opacity: visible ? 1 : 0,
          backgroundColor: expanded ? 'rgba(20,17,15,0.88)' : 'transparent',
          borderColor: expanded ? 'transparent' : 'rgba(20,17,15,0.3)',
        }}
      >
        <span
          className="select-none text-[0.58rem] font-semibold uppercase tracking-widest-xl text-ivory-100 transition-opacity duration-200"
          style={{ opacity: expanded ? 1 : 0 }}
        >
          {label}
        </span>
      </span>
    </div>
  );
};

export default CustomCursor;
