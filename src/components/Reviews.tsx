import { MAPS_PLACE_URL, RESTAURANT } from '../data/restaurant';
import { Reveal, SectionHeading, LinkButton, stagger } from './ui/Primitives';
import { IconArrowUpRight, IconGoogle, IconStar } from './ui/Icons';

const { rating } = RESTAURANT;

/**
 * Points drawn from a single verified guest review on the Google listing.
 *
 * These are paraphrases of what that reviewer actually said — no name, no
 * portrait, no invented quote, and no claim stronger than the original.
 * No further testimonial is shown because no further one has been supplied.
 */
const REVIEW_POINTS: readonly string[] = [
  'Good food for a Chinese buffet',
  'A large selection to choose from',
  'A clean and neat environment',
  'Sushi on the line',
  'Chinese dishes',
  'Mexican and American options',
];

export function Reviews() {
  const pct = (rating.value / rating.scale) * 100;

  return (
    <section id="reviews" className="relative scroll-mt-24 py-24 sm:py-28 lg:py-36">
      <div className="u-container">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* ---- rating card ---- */}
          <div>
            <SectionHeading
              kicker="Reviews"
              title={
                <>
                  What guests
                  <br />
                  are <span className="text-gold">saying</span>
                </>
              }
            />

            <Reveal delay={0.14}>
              <div className="u-glass mt-10 rounded-[1.5rem] p-7 sm:p-9">
                <div className="flex items-end gap-4">
                  <p className="font-display text-[4.5rem] leading-[0.85] text-cream">
                    {rating.value}
                  </p>
                  <p className="pb-2 text-[1.1rem] text-muted">/ {rating.scale}</p>
                </div>

                <div
                  className="mt-5 flex items-center gap-1 text-gold"
                  role="img"
                  aria-label={
                    'Rated ' + rating.value + ' out of ' + rating.scale + ' stars'
                  }
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <IconStar
                      key={i}
                      size={22}
                      fillLevel={Math.max(0, Math.min(1, rating.value - i))}
                    />
                  ))}
                </div>

                {/* the bar repeats the rating without relying on colour alone */}
                <div
                  className="mt-6 h-1.5 overflow-hidden rounded-full bg-cream/10"
                  aria-hidden="true"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold-bright"
                    style={{ width: pct + '%' }}
                  />
                </div>

                <p className="mt-6 text-[0.9375rem] leading-relaxed text-cream-dim">
                  Rated {rating.value}/{rating.scale} from{' '}
                  <strong className="font-semibold text-cream">
                    {rating.count.toLocaleString('en-US')}
                  </strong>{' '}
                  {rating.source} reviews.
                </p>

                <LinkButton
                  variant="outline"
                  href={MAPS_PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 w-full"
                >
                  <IconGoogle size={17} />
                  View Google Reviews
                  <IconArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </LinkButton>
              </div>
            </Reveal>
          </div>

          {/* ---- verified review points ---- */}
          <div className="lg:pt-16">
            <Reveal>
              <p className="text-[0.8125rem] uppercase tracking-[0.2em] text-muted">
                From a guest review
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <blockquote className="relative mt-6 border-l border-gold/30 pl-6 sm:pl-8">
                <p className="font-display text-[clamp(1.5rem,3.6vw,2.25rem)] leading-[1.25] text-cream">
                  &ldquo;Good food for a Chinese buffet&rdquo; — with a large
                  selection, and a clean, neat environment.
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-7 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
                That reviewer singled out the range on the line. These are the
                points they mentioned:
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {REVIEW_POINTS.map((point, i) => (
                <Reveal as="li" key={point} delay={stagger(i, 0.06)}>
                  <div className="flex h-full items-center gap-3 rounded-xl border border-cream/[0.08] bg-surface/50 px-4 py-3.5 transition-colors duration-300 hover:border-gold/30">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-gold"
                    />
                    <span className="text-[0.875rem] leading-snug text-cream-dim">
                      {point}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2}>
              <p className="mt-8 text-[0.8125rem] leading-relaxed text-muted">
                Summarised from a guest review on Google. Read the full set of{' '}
                {rating.count.toLocaleString('en-US')} reviews on the listing above.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
