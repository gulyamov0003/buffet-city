import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DIRECTIONS_URL, RESTAURANT } from '../data/restaurant';
import { scrollToId, useCanHover, usePrefersReducedMotion } from '../hooks';
import { SmartImage, LinkButton, Button } from './ui/Primitives';
import { IconArrowRight, IconPhone, IconPin, IconStar } from './ui/Icons';

/** Word-by-word mask reveal for the headline. */
function RevealWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(' ');

  if (reduced) return <>{text}</>;

  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.95,
              delay: delay + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const canHover = useCanHover();
  const stageRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  // Cursor-reactive depth on the hero stack. Desktop + motion-safe only.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduced || !canHover) return;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        stage.style.setProperty('--px', String(px));
        stage.style.setProperty('--py', String(py));
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduced, canHover]);

  const rating = RESTAURANT.rating;

  return (
    <section
      id="home"
      className="u-grain relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-12 sm:pb-16 sm:pt-32 lg:pt-24"
    >
      {/* ---- cinematic background wash ---- */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-ink" />
      <div
        aria-hidden="true"
        className="a-drift absolute -left-[18%] -top-[14%] -z-10 h-[62vmax] w-[62vmax] rounded-full opacity-[0.30] blur-[110px]"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, #c6452c 0%, #8a2d1c 38%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="a-drift absolute -bottom-[26%] -right-[14%] -z-10 h-[56vmax] w-[56vmax] rounded-full opacity-[0.26] blur-[120px]"
        style={{
          animationDelay: '-9s',
          background:
            'radial-gradient(circle at 55% 45%, #e0b368 0%, #a87f3c 42%, transparent 72%)',
        }}
      />
      {/* vignette keeps the type legible over the glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 15%, transparent 25%, rgba(10,8,6,0.55) 68%, #0a0806 100%)',
        }}
      />

      <div className="u-container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 xl:gap-16">
          {/* ---------------- copy ---------------- */}
          <div className="max-w-[38rem]">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 inline-flex items-center gap-3 sm:mb-7 rounded-full border border-gold/25 bg-cream/[0.04] px-4 py-2 backdrop-blur-sm"
            >
              <span className="flex items-center gap-0.5 text-gold" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <IconStar
                    key={i}
                    size={13}
                    fillLevel={Math.max(0, Math.min(1, rating.value - i))}
                  />
                ))}
              </span>
              <span className="text-[0.78rem] tracking-wide text-cream-dim">
                {rating.value} on {rating.source} · {rating.count.toLocaleString('en-US')}{' '}
                reviews
              </span>
            </motion.div>

            {/* The two lines are separate block spans, so the computed
                accessible name would otherwise run together as "BuffetCity". */}
            <h1
              aria-label="Buffet City"
              className="font-display text-[clamp(2.9rem,10.5vw,6.25rem)] leading-[0.95] tracking-[-0.035em] text-cream"
            >
              <span className="block">
                <RevealWords text="Buffet" delay={0.25} />
              </span>
              <span className="block text-gold">
                <RevealWords text="City" delay={0.34} />
              </span>
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-display sm:mt-7 text-[clamp(1.35rem,3.4vw,1.95rem)] leading-[1.25] text-cream-dim"
            >
              An endless table of flavour on Chicago&rsquo;s South Side.
            </motion.p>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-[34rem] text-[1.0625rem] sm:mt-5 leading-relaxed text-muted"
            >
              A self-service buffet on South Pulaski Road, laying out Chinese
              cooking, seafood, a sushi selection, and Mexican and American
              favourites — all on one table, all at one price.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.84, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap"
            >
              <Button magnetic onClick={() => scrollToId('menu')} className="w-full sm:w-auto">
                Explore Menu
                <IconArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>

              {/* Secondary actions share a row on phones so the food imagery
                  isn't pushed a full screen below the fold. `sm:contents`
                  dissolves this wrapper again on wider screens. */}
              <div className="grid grid-cols-2 gap-3 sm:contents">
                <LinkButton
                  variant="outline"
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full !px-4 sm:w-auto sm:!px-7"
                >
                  <IconPin size={18} />
                  Directions
                </LinkButton>
                <LinkButton
                  variant="outline"
                  href={RESTAURANT.phone.href}
                  className="w-full !px-4 sm:w-auto sm:!px-7 sm:!border-transparent sm:hover:!border-gold/40"
                >
                  <IconPhone size={18} />
                  <span className="sm:hidden">Call Us</span>
                  <span className="hidden sm:inline">Call Buffet City</span>
                </LinkButton>
              </div>
            </motion.div>

            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-6 text-[0.8125rem] leading-relaxed text-muted sm:mt-8"
            >
              {RESTAURANT.priceRange.display} per person · Dine-in · Takeout · Delivery
            </motion.p>
          </div>

          {/* ---------------- 3D image stack ---------------- */}
          <div
            ref={stageRef}
            className="u-stage relative mx-auto w-full max-w-[30rem] lg:max-w-none"
            style={{ ['--px' as string]: 0, ['--py' as string]: 0 }}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.93, rotateY: -14 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.25, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="u-3d relative aspect-[4/5] w-full"
              style={{
                transform:
                  'rotateY(calc(var(--px) * 9deg)) rotateX(calc(var(--py) * -7deg))',
                transition: 'transform 480ms cubic-bezier(0.22,0.61,0.36,1)',
              }}
            >
              {/* main plate */}
              <div className="u-shadow-deep absolute inset-0 overflow-hidden rounded-[1.75rem] border border-gold/15">
                <SmartImage
                  name="hero-platter"
                  priority
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="h-full w-full"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"
                />
              </div>

              {/* floating card — orange chicken */}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="a-float absolute -left-4 bottom-10 w-[42%] max-w-[11.5rem] sm:-left-8"
                style={{ transform: 'translateZ(70px)' }}
              >
                <div className="u-shadow-deep overflow-hidden rounded-2xl border border-gold/20 bg-surface">
                  <SmartImage
                    name="orange-chicken"
                    sizes="(min-width: 640px) 12rem, 40vw"
                    className="aspect-[4/3] w-full"
                    alt=""
                  />
                  <p className="px-3 py-2.5 text-[0.7rem] leading-tight text-cream-dim">
                    Orange Chicken
                    <br />
                    <span className="text-muted">with Rice</span>
                  </p>
                </div>
              </motion.div>

              {/* floating card — seafood */}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: -22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="a-float absolute -right-3 top-8 w-[34%] max-w-[9rem] sm:-right-6"
                style={{ transform: 'translateZ(95px)', animationDelay: '-3.5s' }}
              >
                <div className="u-shadow-deep overflow-hidden rounded-2xl border border-gold/20">
                  <SmartImage
                    name="shrimp-plate"
                    sizes="(min-width: 640px) 9rem, 34vw"
                    className="aspect-square w-full"
                    alt=""
                  />
                </div>
              </motion.div>

              {/* price chip */}
              <motion.div
                initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                className="u-glass absolute -bottom-5 right-4 rounded-2xl px-4 py-3 sm:right-8"
                style={{ transform: 'translateZ(115px)' }}
              >
                <p className="font-display text-[1.6rem] leading-none text-gold">
                  {RESTAURANT.priceRange.display}
                </p>
                <p className="mt-1 text-[0.68rem] tracking-wide text-cream-dim">
                  per person
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ---------------- scroll cue ---------------- */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-16 hidden justify-center lg:flex"
        >
          <button
            onClick={() => scrollToId('about')}
            className="group flex cursor-pointer flex-col items-center gap-3 rounded-full p-2"
            aria-label="Scroll to About"
          >
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted transition-colors group-hover:text-gold">
              Scroll
            </span>
            <span
              aria-hidden="true"
              className="relative block h-10 w-px overflow-hidden bg-cream/15"
            >
              <span className="a-cue absolute inset-x-0 top-0 block h-1/2 bg-gradient-to-b from-transparent to-gold" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
