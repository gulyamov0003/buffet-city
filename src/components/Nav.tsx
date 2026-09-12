import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS, RESTAURANT } from '../data/restaurant';
import {
  scrollToId,
  useLockBodyScroll,
  usePrefersReducedMotion,
  useScrolled,
  useScrollSpy,
} from '../hooks';
import { IconPhone } from './ui/Icons';

const IDS = NAV_LINKS.map((l) => l.id);

export function Nav() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(40);
  const active = useScrollSpy(IDS);
  const reduced = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(open);

  // Esc closes; focus returns to the control that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Focus trap for the mobile panel.
  //
  // The visible close control is the header's X, which sits *outside* the
  // panel element (the sticky header paints above the drawer). So the trap
  // spans the panel's focusables plus that toggle — otherwise a keyboard user
  // could tab to a control they can't see, and never reach the one they can.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const sel = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const cycle = () => {
      const inPanel = Array.from(panel.querySelectorAll<HTMLElement>(sel)).filter(
        (el) => el.offsetParent !== null,
      );
      const toggle = toggleRef.current;
      return toggle ? [toggle, ...inPanel] : inPanel;
    };

    // land on the first item inside the drawer, not the header toggle
    const items = cycle();
    (items[1] ?? items[0])?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = cycle();
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // let the panel close before scrolling, or the lock fights the scroll
    window.setTimeout(() => scrollToId(id), reduced ? 0 : 180);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <motion.header
        initial={reduced ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={
          'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ' +
          (scrolled || open
            ? 'border-b border-gold/12 bg-ink/85 py-2.5 backdrop-blur-xl'
            : 'border-b border-transparent py-5')
        }
      >
        <nav
          aria-label="Primary"
          className="u-container flex items-center justify-between gap-4"
        >
          {/* Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go('home');
            }}
            className="group flex min-h-[44px] shrink-0 items-center gap-[0.4rem] rounded-md"
          >
            <span
              className={
                'font-display leading-none tracking-[-0.02em] text-cream transition-all duration-500 ' +
                (scrolled ? 'text-[1.25rem]' : 'text-[1.45rem]')
              }
            >
              Buffet
            </span>
            <span
              className={
                'font-display leading-none tracking-[-0.02em] text-gold transition-all duration-500 ' +
                (scrolled ? 'text-[1.25rem]' : 'text-[1.45rem]')
              }
            >
              City
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={'#' + link.id}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.id);
                    }}
                    className={
                      'relative block rounded-full px-4 py-2.5 text-[0.875rem] transition-colors duration-300 ' +
                      (isActive ? 'text-cream' : 'text-cream-dim hover:text-cream')
                    }
                  >
                    {link.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-cream/[0.07] ring-1 ring-gold/20"
                        transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <a
              href={RESTAURANT.phone.href}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-[0.875rem] text-cream-dim transition-colors duration-300 hover:text-gold"
            >
              <IconPhone size={17} />
              <span>{RESTAURANT.phone.display}</span>
            </a>
            <button
              onClick={() => go('menu')}
              className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full bg-gold px-6 text-[0.875rem] font-semibold text-ink transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_12px_32px_-12px_rgba(224,179,104,0.85)] active:scale-[0.98]"
            >
              View Menu
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={RESTAURANT.phone.href}
              aria-label={'Call Buffet City on ' + RESTAURANT.phone.display}
              className="inline-flex size-11 items-center justify-center rounded-full text-cream-dim transition-colors hover:text-gold"
            >
              <IconPhone size={20} />
            </a>
            <button
              ref={toggleRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-cream"
            >
              {/* animated hamburger: three bars morph into a cross */}
              <span className="relative block h-[14px] w-[22px]" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute left-0 block h-[1.6px] w-full rounded-full bg-current"
                    initial={false}
                    animate={
                      open
                        ? [
                            { top: 6, rotate: 45, opacity: 1 },
                            { top: 6, rotate: 0, opacity: 0 },
                            { top: 6, rotate: -45, opacity: 1 },
                          ][i]
                        : [
                            { top: 0, rotate: 0, opacity: 1 },
                            { top: 6, rotate: 0, opacity: 1 },
                            { top: 12, rotate: 0, opacity: 1 },
                          ][i]
                    }
                    transition={{ duration: reduced ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-ink/80 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            id="mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduced ? { opacity: 0 } : { x: '100%' }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: reduced ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-45 flex w-[min(22rem,86vw)] flex-col border-l border-gold/15 bg-ink-2 lg:hidden"
            style={{ zIndex: 45 }}
          >
            {/* Clears the sticky header, whose X is the visible close control. */}
            <div className="h-[4.5rem] shrink-0" aria-hidden="true" />

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pb-6">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={reduced ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduced ? 0 : 0.08 + i * 0.05,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-cream/[0.07]"
                  >
                    <a
                      href={'#' + link.id}
                      onClick={(e) => {
                        e.preventDefault();
                        go(link.id);
                      }}
                      aria-current={active === link.id ? 'true' : undefined}
                      className={
                        'flex min-h-[60px] items-center justify-between py-4 font-display text-[1.6rem] transition-colors ' +
                        (active === link.id ? 'text-gold' : 'text-cream hover:text-gold')
                      }
                    >
                      {link.label}
                      <span className="font-sans text-xs tracking-widest text-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={() => go('menu')}
                  className="inline-flex min-h-[52px] cursor-pointer items-center justify-center rounded-full bg-gold px-6 font-semibold text-ink transition-colors hover:bg-gold-bright"
                >
                  View Menu
                </button>
                <a
                  href={RESTAURANT.phone.href}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border border-gold/35 px-6 text-cream transition-colors hover:border-gold/80 hover:bg-gold/10"
                >
                  <IconPhone size={18} />
                  Call {RESTAURANT.phone.display}
                </a>
              </div>

              <p className="mt-7 text-sm leading-relaxed text-muted">
                {RESTAURANT.address.street}
                <br />
                {RESTAURANT.address.city}, {RESTAURANT.address.state}{' '}
                {RESTAURANT.address.postalCode}
              </p>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
