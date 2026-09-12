import { useCallback, useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/* Reduced motion                                                      */
/* ------------------------------------------------------------------ */

/**
 * Live `prefers-reduced-motion` state. Every decorative animation gates on
 * this in addition to the CSS media query, because JS-driven transforms
 * (tilt, parallax, magnetic buttons) can't be reached by CSS alone.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/** True when the primary input can hover, i.e. a real pointer and not touch. */
export function useCanHover(): boolean {
  const [can, setCan] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onChange = (e: MediaQueryListEvent) => setCan(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return can;
}

/* ------------------------------------------------------------------ */
/* 3D cursor tilt                                                      */
/* ------------------------------------------------------------------ */

export interface TiltOptions {
  /** max rotation in degrees per axis */
  max?: number;
  /** px the card lifts toward the viewer */
  lift?: number;
  scale?: number;
}

/**
 * Rotates an element toward the cursor. Transform-only work written straight
 * to style inside rAF, so React never re-renders on pointer move.
 * Disabled for touch input and for reduced-motion users.
 */
export function useTilt<T extends HTMLElement>({
  max = 9,
  lift = 24,
  scale = 1.02,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const frame = useRef(0);
  const reduced = usePrefersReducedMotion();
  const canHover = useCanHover();
  const active = !reduced && canHover;

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = '';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) {
      reset();
      return;
    }

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          'perspective(1100px) rotateY(' +
          px * max * 2 +
          'deg) rotateX(' +
          -py * max * 2 +
          'deg) translateZ(' +
          lift +
          'px) scale(' +
          scale +
          ')';
        el.style.setProperty('--mx', (px + 0.5) * 100 + '%');
        el.style.setProperty('--my', (py + 0.5) * 100 + '%');
      });
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(frame.current);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', reset);
    };
  }, [active, max, lift, scale, reset]);

  return ref;
}

/* ------------------------------------------------------------------ */
/* Scroll state                                                        */
/* ------------------------------------------------------------------ */

/** Id of the section currently occupying the viewport. */
export function useScrollSpy(ids: readonly string[], offset = 140): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const onScroll = () => {
      // Resolve against DOM order, not the order of the nav links. The nav
      // lists Menu before About while the page renders About first, so
      // iterating `ids` directly would leave the wrong link highlighted.
      const inDocOrder = ids
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((e): e is { id: string; el: HTMLElement } => e.el !== null)
        .sort((a, b) => a.el.offsetTop - b.el.offsetTop);

      let current = inDocOrder[0]?.id ?? ids[0] ?? '';
      for (const { id, el } of inDocOrder) {
        if (el.getBoundingClientRect().top <= offset) current = id;
      }
      // pin the last section once the page bottoms out
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = inDocOrder[inDocOrder.length - 1]?.id ?? current;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return active;
}

/** True once the window has scrolled past `y` pixels. */
export function useScrolled(y = 24): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > y);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [y]);
  return past;
}

/* ------------------------------------------------------------------ */
/* Body scroll lock                                                    */
/* ------------------------------------------------------------------ */

/**
 * Freezes background scroll for overlays, compensating for the vanishing
 * scrollbar so the page behind doesn't jump sideways on open.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const { body, documentElement: html } = document;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const gap = window.innerWidth - html.clientWidth;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = gap + 'px';
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [locked]);
}

/* ------------------------------------------------------------------ */
/* Clipboard                                                           */
/* ------------------------------------------------------------------ */

/** Copy-to-clipboard with a self-clearing flag and a non-secure-origin fallback. */
export function useCopyToClipboard(resetAfter = 2200) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      // execCommand path: http:// origins, older Safari, and any case where
      // the async API exists but refuses (no user activation, denied
      // permission, unfocused document).
      const legacy = () => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:-9999px;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      };

      let ok = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          ok = true;
        } else {
          ok = legacy();
        }
      } catch {
        // don't give up on the first rejection — fall back before failing
        try {
          ok = legacy();
        } catch {
          ok = false;
        }
      }

      if (ok) {
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetAfter);
      }
      return ok;
    },
    [resetAfter],
  );

  return { copied, copy };
}

/* ------------------------------------------------------------------ */
/* Navigation helper                                                   */
/* ------------------------------------------------------------------ */

/** Scrolls to a section id, honouring reduced motion and the sticky nav offset. */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  // keep the URL shareable without a second, unanimated jump
  history.replaceState(null, '', '#' + id);
}
