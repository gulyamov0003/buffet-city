import { useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RESTAURANT } from '../data/restaurant';
import { usePrefersReducedMotion, useTilt } from '../hooks';
import { Reveal, SectionHeading, SmartImage, LinkButton, stagger } from './ui/Primitives';
import { IconPhone, IconStar, IconArrowRight } from './ui/Icons';
import type { ImageKey } from '../data/media';

/* ------------------------------------------------------------------ */
/* Verified favourites                                                 */
/* ------------------------------------------------------------------ */

/**
 * The only three dishes named anywhere on this site. All three are listed as
 * popular items on the restaurant's Google listing.
 *
 * No price is shown for any of them: Buffet City publishes no per-dish prices,
 * and inventing one would misrepresent a real business.
 */
const FAVOURITES: readonly { name: string; image: ImageKey }[] = [
  { name: RESTAURANT.popularItems[0], image: 'sushi-rolls' },
  { name: RESTAURANT.popularItems[1], image: 'orange-chicken' },
  { name: RESTAURANT.popularItems[2], image: 'chicken-broccoli' },
];

function FavouriteCard({
  item,
  index,
}: {
  item: { name: string; image: ImageKey };
  index: number;
}) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 7, lift: 20, scale: 1.03 });

  return (
    <Reveal className="u-stage" delay={stagger(index, 0.1)}>
      <article
        ref={tiltRef}
        className="u-3d group relative overflow-hidden rounded-[1.25rem] border border-cream/[0.09] bg-surface transition-[border-color,box-shadow] duration-500 hover:border-gold/45 hover:shadow-[0_30px_70px_-32px_rgba(0,0,0,0.95)]"
      >
        <div className="relative overflow-hidden">
          <SmartImage
            name={item.image}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
            className="aspect-[5/4] w-full [&>img]:transition-transform [&>img]:duration-[1000ms] [&>img]:ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:[&>img]:scale-[1.09]"
            alt=""
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"
          />

          {/* "Popular" badge — factual: these are the items Google lists as popular */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-ink/75 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold backdrop-blur-md">
            <IconStar size={11} fillLevel={1} />
            Popular
          </span>
        </div>

        <div className="relative p-6">
          <h3 className="font-display text-[1.375rem] leading-tight text-cream">
            {item.name}
          </h3>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
            Listed among Buffet City&rsquo;s most popular items on Google.
          </p>
        </div>

        {/* gold underline that draws in on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-deep via-gold to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-x-100"
        />
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Menu sections                                                       */
/* ------------------------------------------------------------------ */

/**
 * The three section names that appear on Buffet City's Google listing.
 *
 * Their contents are NOT published anywhere, so this UI deliberately shows no
 * dish list and no prices for them. Each panel says plainly what is known and
 * what isn't, and routes the visitor to the phone — which is the only way to
 * get the current menu. That is the honest version of a menu section for a
 * restaurant that has not published one.
 */
const PANELS: readonly {
  id: string;
  label: string;
  image: ImageKey;
  headline: string;
  body: string;
}[] = [
  {
    id: 'overview',
    label: 'Overview',
    image: 'spread',
    headline: 'Everything, laid out at once',
    body:
      'Buffet City runs as a self-service buffet: one price, and the full line is open to you. The listing covers Chinese cooking, seafood, sushi, and Mexican and American options. Buffet City publishes no daily listing, so the surest way to hear what is out today is to call ahead.',
  },
  {
    id: 'seafood-combo-platter',
    label: 'Seafood Combo Platter',
    image: 'fish-ice',
    headline: 'A named section on the menu',
    body:
      'Seafood Combo Platter appears as a section of Buffet City’s menu. The individual dishes and prices within it are not published online — call the restaurant and they will tell you what the platter includes today.',
  },
  {
    id: 'meat-combo',
    label: 'Meat Combo',
    image: 'ribs',
    headline: 'A named section on the menu',
    body:
      'Meat Combo appears as a section of Buffet City’s menu. As with the rest of the menu, the dishes and prices inside it are not published online — a quick call is the reliable way to get the current line-up.',
  },
];

export function Menu() {
  const [activeTab, setActiveTab] = useState(0);
  const reduced = usePrefersReducedMotion();
  const tabsId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Roving-tabindex keyboard support, per the WAI tabs pattern.
  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    const last = PANELS.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActiveTab(next);
    tabRefs.current[next]?.focus();
  };

  const panel = PANELS[activeTab];

  return (
    <section id="menu" className="relative scroll-mt-24 py-24 sm:py-28 lg:py-36">
      {/* warm floor glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-[40rem] opacity-50"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 50%, rgba(168,127,60,0.16), transparent 70%)',
        }}
      />

      <div className="u-container">
        <SectionHeading
          kicker="The Menu"
          title={
            <>
              Guest <span className="text-gold">favourites</span>
            </>
          }
          lead="These three are the dishes guests single out most often on Buffet City's Google listing."
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FAVOURITES.map((item, i) => (
            <FavouriteCard key={item.name} item={item} index={i} />
          ))}
        </div>

        {/* ---------------- tabbed menu sections ---------------- */}
        <div className="mt-24 lg:mt-32">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="u-kicker">Menu sections</p>
              <h3 className="mt-4 font-display text-[clamp(1.75rem,4.2vw,2.75rem)] leading-tight text-cream">
                What&rsquo;s on the line
              </h3>
            </div>
          </Reveal>

          {/* tab strip — horizontally scrollable on small screens */}
          <Reveal delay={0.08}>
            <div
              role="tablist"
              aria-label="Menu sections"
              className="mt-10 -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:justify-center sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {PANELS.map((p, i) => {
                const selected = i === activeTab;
                return (
                  <button
                    key={p.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={tabsId + '-tab-' + p.id}
                    aria-selected={selected}
                    aria-controls={tabsId + '-panel-' + p.id}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveTab(i)}
                    onKeyDown={(e) => onTabKey(e, i)}
                    className={
                      'relative shrink-0 snap-start cursor-pointer whitespace-nowrap rounded-full px-6 text-[0.875rem] font-medium transition-colors duration-300 ' +
                      'min-h-[48px] ' +
                      (selected ? 'text-ink' : 'text-cream-dim hover:text-cream')
                    }
                  >
                    {selected ? (
                      <motion.span
                        layoutId="menu-tab-pill"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-gold"
                        transition={{ duration: reduced ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full border border-cream/12"
                      />
                    )}
                    {p.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* panel */}
          <Reveal delay={0.14}>
            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-cream/[0.09] bg-surface/60">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={panel.id}
                  role="tabpanel"
                  id={tabsId + '-panel-' + panel.id}
                  aria-labelledby={tabsId + '-tab-' + panel.id}
                  tabIndex={0}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: reduced ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="grid gap-0 md:grid-cols-2"
                >
                  <div className="relative min-h-[15rem] md:min-h-[22rem]">
                    <SmartImage
                      name={panel.image}
                      sizes="(min-width: 768px) 46vw, 92vw"
                      className="absolute inset-0 h-full w-full"
                      alt=""
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/25 to-transparent md:bg-gradient-to-r md:from-transparent md:via-surface/20 md:to-surface"
                    />
                  </div>

                  <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
                    <div>
                      <p className="u-kicker">{panel.label}</p>
                      <h4 className="mt-3 font-display text-[clamp(1.4rem,3vw,1.9rem)] leading-tight text-cream">
                        {panel.headline}
                      </h4>
                    </div>
                    <p className="text-[0.9375rem] leading-relaxed text-cream-dim">
                      {panel.body}
                    </p>

                    <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                      <LinkButton href={RESTAURANT.phone.href} className="w-full sm:w-auto">
                        <IconPhone size={17} />
                        Call for today&rsquo;s menu
                      </LinkButton>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* honest "full menu" note, in place of a fake menu link */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-gold/20 bg-gold/[0.05] px-6 py-7 text-center">
              <p className="max-w-xl text-[0.9375rem] leading-relaxed text-cream-dim">
                Buffet City does not publish a full menu or per-dish prices online,
                so there is nothing to link to here that would be accurate. The
                kitchen will happily talk you through what is on the line today.
              </p>
              <LinkButton
                variant="outline"
                href={RESTAURANT.phone.href}
                magnetic
                className="w-full sm:w-auto"
              >
                <IconPhone size={17} />
                {RESTAURANT.phone.display}
                <IconArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
