import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DIRECTIONS_URL, NAV_LINKS, RESTAURANT } from '../data/restaurant';
import { scrollToId, usePrefersReducedMotion } from '../hooks';
import { Reveal, SmartImage, LinkButton, Button } from './ui/Primitives';
import { IconArrowRight, IconPhone, IconPin } from './ui/Icons';

/* ================================================================== */
/* Final CTA                                                           */
/* ================================================================== */

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section ref={ref} className="u-grain relative isolate overflow-hidden">
      {/* cinematic backdrop */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y, scale }}
        className="absolute inset-0 -z-20 h-[124%] -translate-y-[8%]"
      >
        <SmartImage
          name="hero-platter"
          sizes="100vw"
          className="h-full w-full"
          alt=""
        />
      </motion.div>

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/86" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(90% 70% at 50% 50%, transparent 10%, rgba(10,8,6,0.85) 70%, #0a0806 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="a-drift absolute left-1/2 top-1/2 -z-10 h-[45vmax] w-[45vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, #e0b368 0%, #c6452c 45%, transparent 72%)',
        }}
      />

      <div className="u-container relative py-28 text-center sm:py-36 lg:py-44">
        <Reveal>
          <p className="u-kicker">Buffet City · Chicago</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.5rem,8vw,5.25rem)] leading-[0.98] tracking-[-0.03em] text-cream">
            Your table is <span className="text-gold">waiting.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-cream-dim">
            Discover Buffet City&rsquo;s wide selection of flavours in Chicago —
            Chinese, seafood, sushi, Mexican and American, all on one line.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button magnetic onClick={() => scrollToId('menu')} className="w-full sm:w-auto">
              Explore Menu
              <IconArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
            <LinkButton
              variant="outline"
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <IconPin size={18} />
              Get Directions
            </LinkButton>
            <LinkButton
              variant="outline"
              href={RESTAURANT.phone.href}
              className="w-full sm:w-auto"
            >
              <IconPhone size={18} />
              Call Us
            </LinkButton>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="mt-10 text-[0.8125rem] text-muted">
            {RESTAURANT.addressOneLine} · {RESTAURANT.phone.display}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Footer                                                             */
/* ================================================================== */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cream/[0.08] bg-ink-2">
      <div className="u-container py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand + contact */}
          <div>
            <p className="font-display text-[1.75rem] leading-none">
              <span className="text-cream">Buffet</span>{' '}
              <span className="text-gold">City</span>
            </p>

            <address className="mt-6 not-italic text-[0.9375rem] leading-relaxed text-cream-dim">
              {RESTAURANT.address.street}
              <br />
              {RESTAURANT.address.city}, {RESTAURANT.address.state}{' '}
              {RESTAURANT.address.postalCode}
              <br />
              <a
                href={RESTAURANT.phone.href}
                className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-cream transition-colors hover:text-gold"
              >
                <IconPhone size={16} />
                {RESTAURANT.phone.display}
              </a>
            </address>

            <p className="mt-4 max-w-sm text-[0.8125rem] leading-relaxed text-muted">
              Self-service buffet · {RESTAURANT.priceRange.display} per person.
              Call for today&rsquo;s opening hours.
            </p>
          </div>

          {/* nav */}
          <nav aria-label="Footer">
            <h2 className="text-[0.7rem] uppercase tracking-[0.22em] text-gold">
              Explore
            </h2>
            <ul className="mt-5 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={'#' + link.id}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(link.id);
                    }}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center pr-3 text-[0.9375rem] text-cream-dim transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* services */}
          <div>
            <h2 className="text-[0.7rem] uppercase tracking-[0.22em] text-gold">
              Services
            </h2>
            <ul className="mt-5 space-y-1">
              {RESTAURANT.services.map((service) => (
                <li
                  key={service}
                  className="flex min-h-[40px] items-center text-[0.9375rem] text-cream-dim"
                >
                  {service}
                </li>
              ))}
            </ul>

            <LinkButton
              variant="outline"
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full !px-5 text-[0.8125rem] sm:w-auto"
            >
              <IconPin size={16} />
              Get Directions
            </LinkButton>
          </div>
        </div>

        <div className="u-rule mt-14" />

        <div className="mt-7 flex flex-col gap-3 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Buffet City. All rights reserved.</p>
          <p>
            {RESTAURANT.rating.value}/{RESTAURANT.rating.scale} from{' '}
            {RESTAURANT.rating.count.toLocaleString('en-US')} Google reviews
          </p>
        </div>
      </div>
    </footer>
  );
}
