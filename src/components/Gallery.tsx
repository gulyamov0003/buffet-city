import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IMG, srcFor, srcSet, type ImageKey } from '../data/media';
import { useLockBodyScroll, usePrefersReducedMotion } from '../hooks';
import { Reveal, SectionHeading, SmartImage, stagger } from './ui/Primitives';
import { IconChevronLeft, IconChevronRight, IconClose } from './ui/Icons';

type Category = 'All' | 'Food' | 'Seafood' | 'Sushi' | 'Buffet' | 'Interior' | 'Atmosphere';

const CATEGORIES: readonly Category[] = [
  'All',
  'Food',
  'Seafood',
  'Sushi',
  'Buffet',
  'Interior',
  'Atmosphere',
];

interface Shot {
  key: ImageKey;
  cats: readonly Category[];
  /** tall tiles create the masonry rhythm */
  tall?: boolean;
}

const SHOTS: readonly Shot[] = [
  { key: 'hero-platter', cats: ['Sushi', 'Food'], tall: true },
  { key: 'buffet-station', cats: ['Buffet'] },
  { key: 'dimsum', cats: ['Food'] },
  { key: 'fish-ice', cats: ['Seafood', 'Buffet'], tall: true },
  { key: 'sushi-slate', cats: ['Sushi'] },
  { key: 'lomein', cats: ['Food'] },
  { key: 'interior-warm', cats: ['Interior', 'Atmosphere'], tall: true },
  { key: 'shrimp-plate', cats: ['Seafood'] },
  { key: 'friedrice', cats: ['Food'] },
  { key: 'sushi-rolls', cats: ['Sushi'] },
  { key: 'guests-bar', cats: ['Atmosphere'] },
  { key: 'salmon-plate', cats: ['Seafood'], tall: true },
  { key: 'spread', cats: ['Buffet', 'Food'] },
  { key: 'interior-bar', cats: ['Interior'] },
  { key: 'fried-shrimp', cats: ['Seafood', 'Food'] },
  { key: 'dining-table', cats: ['Atmosphere', 'Interior'] },
];

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */

interface LightboxProps {
  shots: readonly Shot[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}

function Lightbox({ shots, index, onClose, onNavigate }: LightboxProps) {
  const reduced = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useLockBodyScroll(true);

  const shot = shots[index];
  const img = IMG[shot.key];
  const total = shots.length;

  const prev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate],
  );
  const next = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);

  // Keyboard: Esc closes, arrows navigate, Tab is trapped inside the dialog.
  useEffect(() => {
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'Tab') {
        const root = dialogRef.current;
        if (!root) return;
        const items = Array.from(
          root.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'),
        ).filter((el) => el.offsetParent !== null);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  // Swipe on touch. Ignores mostly-vertical drags so it can't hijack a scroll.
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    touchStart.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) prev();
    else next();
  };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={'Gallery image ' + (index + 1) + ' of ' + total}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.12 : 0.3 }}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/96 backdrop-blur-xl"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* top bar */}
      <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p className="text-[0.8125rem] tabular-nums tracking-wide text-muted">
          {String(index + 1).padStart(2, '0')}
          <span className="mx-1.5 text-cream/25">/</span>
          {String(total).padStart(2, '0')}
        </p>
        <button
          ref={closeRef}
          onClick={onClose}
          className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full border border-cream/12 px-5 text-[0.875rem] text-cream-dim transition-colors hover:border-gold/50 hover:text-cream"
        >
          <IconClose size={17} />
          Close
        </button>
      </div>

      {/* stage */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-16"
        onClick={(e) => {
          // click the backdrop, not the photo, to dismiss
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-1 z-10 inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-cream/12 bg-ink/70 text-cream backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold sm:left-3 sm:size-14"
        >
          <IconChevronLeft size={22} />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={shot.key}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: reduced ? 0.12 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex max-h-full min-h-0 flex-col items-center gap-4"
          >
            <img
              src={srcFor(img.src, 1600)}
              srcSet={srcSet(img.src)}
              sizes="(min-width: 640px) 80vw, 96vw"
              width={img.width}
              height={img.height}
              alt={img.alt}
              className="max-h-[68vh] w-auto max-w-full rounded-xl object-contain"
            />
            {img.caption ? (
              <figcaption className="max-w-xl px-4 text-center text-[0.875rem] text-cream-dim">
                {img.caption}
              </figcaption>
            ) : null}
          </motion.figure>
        </AnimatePresence>

        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-1 z-10 inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-cream/12 bg-ink/70 text-cream backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold sm:right-3 sm:size-14"
        >
          <IconChevronRight size={22} />
        </button>
      </div>

      {/* thumbnail rail */}
      <div className="shrink-0 overflow-x-auto px-4 py-4 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-max gap-2">
          {shots.map((s, i) => (
            <button
              key={s.key}
              onClick={() => onNavigate(i)}
              aria-label={'Show image ' + (i + 1)}
              aria-current={i === index ? 'true' : undefined}
              className={
                'size-14 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 cursor-pointer ' +
                (i === index
                  ? 'border-gold opacity-100'
                  : 'border-transparent opacity-45 hover:opacity-80')
              }
            >
              <img
                src={srcFor(IMG[s.key].src, 400)}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export function Gallery() {
  const [filter, setFilter] = useState<Category>('All');
  const [open, setOpen] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const shots = useMemo(
    () => (filter === 'All' ? SHOTS : SHOTS.filter((s) => s.cats.includes(filter))),
    [filter],
  );

  const close = useCallback(() => {
    setOpen(null);
    // return focus to the tile that opened the lightbox
    lastTrigger.current?.focus();
  }, []);

  return (
    <section id="gallery" className="relative scroll-mt-24 py-24 sm:py-28 lg:py-36">
      <div className="u-container">
        <SectionHeading
          kicker="Gallery"
          title={
            <>
              The room, and <span className="text-gold">what&rsquo;s on it</span>
            </>
          }
          align="center"
        />

        {/* filters */}
        <Reveal delay={0.08}>
          <div
            role="group"
            aria-label="Filter gallery by category"
            className="mt-10 -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORIES.map((cat) => {
              const on = cat === filter;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  aria-pressed={on}
                  className={
                    'relative min-h-[44px] shrink-0 snap-start cursor-pointer whitespace-nowrap rounded-full px-5 text-[0.8125rem] font-medium transition-colors duration-300 ' +
                    (on ? 'text-ink' : 'text-cream-dim hover:text-cream')
                  }
                >
                  {on ? (
                    <motion.span
                      layoutId="gallery-filter-pill"
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full bg-gold"
                      transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full border border-cream/12"
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* masonry-ish grid */}
        <motion.ul
          layout={!reduced}
          className="mt-10 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {shots.map((shot, i) => (
              <motion.li
                key={shot.key}
                layout={!reduced}
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                transition={{
                  duration: reduced ? 0.15 : 0.45,
                  delay: reduced ? 0 : stagger(i, 0.035, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={shot.tall ? 'row-span-2' : ''}
              >
                <button
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setOpen(i);
                  }}
                  className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-xl border border-cream/[0.08] transition-colors duration-500 hover:border-gold/40"
                >
                  <SmartImage
                    name={shot.key}
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                    className="absolute inset-0 h-full w-full [&>img]:transition-transform [&>img]:duration-[900ms] [&>img]:ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:[&>img]:scale-110"
                    alt=""
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
                  />
                  <span className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left text-[0.75rem] leading-snug text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {IMG[shot.key].caption || 'View image'}
                  </span>
                  {/* accessible name for the tile */}
                  <span className="sr-only">Open image: {IMG[shot.key].alt}</span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {open !== null && shots[open] ? (
          <Lightbox
            shots={shots}
            index={open}
            onClose={close}
            onNavigate={setOpen}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
