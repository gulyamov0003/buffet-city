import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RESTAURANT } from '../data/restaurant';
import { usePrefersReducedMotion } from '../hooks';
import { Reveal, SmartImage, SectionHeading } from './ui/Primitives';
import { IconDome, IconWallet, IconDineIn } from './ui/Icons';

/** Three factual "at a glance" points. Every value traces to RESTAURANT. */
const FACTS = [
  {
    Icon: IconDome,
    label: 'Service style',
    value: 'Self-service buffet',
  },
  {
    Icon: IconWallet,
    label: 'Price range',
    value: RESTAURANT.priceRange.display + ' per person',
  },
  {
    Icon: IconDineIn,
    label: 'Ways to eat',
    value: RESTAURANT.services.join(' · '),
  },
] as const;

export function About() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // gentle counter-drift between the two stacked images
  const yFar = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const yNear = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
      />

      <div className="u-container">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ---- images ---- */}
          <div className="u-stage relative order-2 lg:order-1">
            <motion.div
              style={reduced ? undefined : { y: yFar }}
              className="relative ml-auto w-[78%] overflow-hidden rounded-[1.5rem] border border-gold/12"
            >
              <SmartImage
                name="buffet-station"
                sizes="(min-width: 1024px) 30vw, 70vw"
                className="aspect-[4/5] w-full"
              />
            </motion.div>

            <motion.div
              style={reduced ? undefined : { y: yNear }}
              className="u-shadow-deep absolute -bottom-8 left-0 w-[58%] overflow-hidden rounded-[1.25rem] border border-gold/20"
            >
              <SmartImage
                name="interior-warm"
                sizes="(min-width: 1024px) 22vw, 52vw"
                className="aspect-[5/4] w-full"
              />
            </motion.div>

            {/* decorative gold hairline frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-5 -top-5 h-24 w-24 rounded-tr-[1.5rem] border-r border-t border-gold/30"
            />
          </div>

          {/* ---- copy ---- */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              kicker="About"
              title={
                <>
                  One table.
                  <br />
                  <span className="text-gold">Many flavours.</span>
                </>
              }
              lead={
                <>
                  Buffet City is a self-service buffet restaurant on South Pulaski
                  Road in Chicago. Instead of choosing one cuisine for the evening,
                  you walk the line and take what you want — Chinese dishes, seafood,
                  a sushi selection, and Mexican and American options side by side.
                </>
              }
            />

            <Reveal delay={0.18}>
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-muted">
                It is the kind of room you bring a table of people to when everyone
                wants something different. One price, one trip, and everyone at the
                table eats exactly what they came for.
              </p>
            </Reveal>

            <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-cream/[0.08] bg-cream/[0.08] sm:grid-cols-3">
              {FACTS.map((fact, i) => (
                <Reveal as="li" key={fact.label} delay={0.1 + i * 0.08}>
                  <div className="flex h-full flex-col gap-3 bg-ink px-5 py-6">
                    <fact.Icon size={22} className="text-gold" />
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                        {fact.label}
                      </p>
                      <p className="mt-1.5 text-[0.9375rem] leading-snug text-cream">
                        {fact.value}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
