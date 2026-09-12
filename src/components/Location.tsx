import { DIRECTIONS_URL, MAP_EMBED_URL, RESTAURANT } from '../data/restaurant';
import { useCopyToClipboard } from '../hooks';
import { Reveal, SectionHeading, LinkButton, Button, stagger } from './ui/Primitives';
import {
  IconArrowUpRight,
  IconCheck,
  IconCopy,
  IconDelivery,
  IconDineIn,
  IconPhone,
  IconPin,
  IconTakeout,
  IconClock,
  type IconProps,
} from './ui/Icons';

/**
 * Verified services only. No delivery partner is named anywhere, because no
 * delivery partner has been verified for this restaurant.
 */
const SERVICES: readonly {
  name: string;
  copy: string;
  Icon: (p: IconProps) => JSX.Element;
}[] = [
  {
    name: 'Dine-in',
    copy: 'Eat in the dining room and help yourself from the buffet line.',
    Icon: IconDineIn,
  },
  {
    name: 'Takeout',
    copy: 'Order and collect from the restaurant on South Pulaski Road.',
    Icon: IconTakeout,
  },
  {
    name: 'Delivery',
    copy: 'Delivery is available. Call the restaurant for details.',
    Icon: IconDelivery,
  },
];

export function Location() {
  const { copied, copy } = useCopyToClipboard();
  const address = RESTAURANT.addressOneLine;

  return (
    <section id="location" className="relative scroll-mt-24 py-24 sm:py-28 lg:py-36">
      <div className="u-container">
        {/* ---------------- services ---------------- */}
        <SectionHeading
          kicker="Services"
          title={
            <>
              Three ways to <span className="text-gold">eat with us</span>
            </>
          }
          align="center"
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal as="li" key={service.name} delay={stagger(i, 0.09)}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-cream/[0.09] bg-surface/50 p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-gold/40">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-gold/[0.07] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <service.Icon
                  size={30}
                  className="text-gold transition-transform duration-500 group-hover:scale-110"
                />
                <h3 className="mt-5 font-display text-[1.5rem] leading-none text-cream">
                  {service.name}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">
                  {service.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* ---------------- location ---------------- */}
        <div className="mt-24 grid gap-8 lg:mt-32 lg:grid-cols-[0.95fr_1.05fr]">
          {/* address card */}
          <div className="flex flex-col">
            <SectionHeading
              kicker="Find us"
              title={
                <>
                  On South
                  <br />
                  <span className="text-gold">Pulaski Road</span>
                </>
              }
            />

            <Reveal delay={0.12}>
              <div className="u-glass mt-9 flex-1 rounded-[1.5rem] p-7 sm:p-9">
                <div className="flex items-start gap-4">
                  <IconPin size={24} className="mt-0.5 shrink-0 text-gold" />
                  <address className="not-italic">
                    <p className="font-display text-[1.6rem] leading-[1.25] text-cream">
                      {RESTAURANT.address.street}
                    </p>
                    <p className="mt-1 text-[1.0625rem] text-cream-dim">
                      {RESTAURANT.address.city}, {RESTAURANT.address.state}{' '}
                      {RESTAURANT.address.postalCode}
                    </p>
                    <p className="mt-0.5 text-[0.9375rem] text-muted">
                      {RESTAURANT.address.country}
                    </p>
                  </address>
                </div>

                <div className="u-rule my-7" />

                <a
                  href={RESTAURANT.phone.href}
                  className="group flex items-center gap-4 rounded-xl py-2 transition-colors"
                >
                  <IconPhone size={22} className="shrink-0 text-gold" />
                  <span>
                    <span className="block text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                      Call the restaurant
                    </span>
                    <span className="mt-0.5 block text-[1.0625rem] text-cream transition-colors group-hover:text-gold">
                      {RESTAURANT.phone.display}
                    </span>
                  </span>
                </a>

                {/* Hours are genuinely unknown — say so rather than invent them. */}
                <div className="mt-5 flex items-start gap-4 rounded-xl border border-cream/[0.08] bg-ink/40 px-4 py-4">
                  <IconClock size={20} className="mt-0.5 shrink-0 text-muted" />
                  <p className="text-[0.8125rem] leading-relaxed text-muted">
                    Opening hours are not published online. Please call ahead to
                    confirm today&rsquo;s hours before travelling.
                  </p>
                </div>

                <div className="mt-7 flex flex-col gap-3">
                  <LinkButton
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    magnetic
                  >
                    <IconPin size={17} />
                    Get Directions
                    <IconArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </LinkButton>

                  {/* Two-up only where the card is actually wide enough: it
                      narrows again between lg and xl when the map takes the
                      other column, and the labels would wrap. */}
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <LinkButton
                      variant="outline"
                      href={RESTAURANT.phone.href}
                      className="whitespace-nowrap !px-5"
                    >
                      <IconPhone size={17} />
                      Call Us
                    </LinkButton>

                    <Button
                      variant="outline"
                      onClick={() => void copy(address)}
                      aria-live="polite"
                      className="whitespace-nowrap !px-5"
                    >
                      {copied ? (
                        <>
                          <IconCheck size={17} className="text-gold" />
                          Address copied
                        </>
                      ) : (
                        <>
                          <IconCopy size={17} />
                          Copy address
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* map */}
          <Reveal delay={0.08} className="min-h-[26rem] lg:min-h-0">
            <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-gold/15">
              <iframe
                title={'Map showing Buffet City at ' + address}
                src={MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full min-h-[26rem] w-full border-0"
                style={{
                  // tone the stock map into the dark palette without hiding detail
                  filter: 'invert(0.92) hue-rotate(180deg) saturate(0.75) contrast(0.92)',
                }}
              />
              {/* warm veil over the filtered map; must not swallow map clicks */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{
                  background:
                    'linear-gradient(140deg, rgba(224,179,104,0.18), transparent 55%)',
                }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
