import { useTilt } from '../hooks';
import { Reveal, SectionHeading, SmartImage, stagger } from './ui/Primitives';
import {
  IconBowl,
  IconBurger,
  IconChilli,
  IconFish,
  IconSushi,
  type IconProps,
} from './ui/Icons';
import type { ImageKey } from '../data/media';

/**
 * The five cuisine categories listed on the restaurant's own Google listing.
 * The supporting line describes the *category*, never a specific dish —
 * no dish beyond the three verified favourites is named anywhere on this site.
 */
interface Cuisine {
  name: string;
  blurb: string;
  image: ImageKey;
  Icon: (p: IconProps) => JSX.Element;
  span: string;
}

const CUISINES: readonly Cuisine[] = [
  {
    name: 'Chinese',
    blurb: 'Chinese cooking — the cuisine Buffet City is listed under first.',
    image: 'dimsum',
    Icon: IconBowl,
    span: 'sm:col-span-2 lg:col-span-2 lg:row-span-2',
  },
  {
    name: 'Seafood',
    blurb: 'Seafood, served as part of the same buffet price.',
    image: 'shrimp-plate',
    Icon: IconFish,
    span: 'lg:col-span-2',
  },
  {
    name: 'Sushi',
    blurb: 'A sushi selection served as part of the buffet.',
    image: 'sushi-slate',
    Icon: IconSushi,
    span: 'lg:col-span-2',
  },
  {
    name: 'Mexican',
    blurb: 'Mexican options for the table that wants something else.',
    image: 'tacos',
    Icon: IconChilli,
    span: 'lg:col-span-2',
  },
  {
    name: 'American',
    blurb: 'Familiar American plates, for the pickier eaters in the group.',
    image: 'burger',
    Icon: IconBurger,
    span: 'sm:col-span-2 lg:col-span-2',
  },
];

function CuisineCard({ cuisine, index }: { cuisine: Cuisine; index: number }) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 5, lift: 14, scale: 1.015 });
  const { Icon } = cuisine;

  return (
    <Reveal
      className={'u-stage ' + cuisine.span}
      delay={stagger(index, 0.09)}
    >
      <article
        ref={tiltRef}
        className="u-3d group relative h-full min-h-[15rem] overflow-hidden rounded-[1.25rem] border border-cream/[0.09] transition-[border-color,box-shadow] duration-500 hover:border-gold/40 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.9)]"
      >
        <SmartImage
          name={cuisine.image}
          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 48vw, 92vw"
          className="absolute inset-0 h-full w-full [&>img]:transition-transform [&>img]:duration-[900ms] [&>img]:ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:[&>img]:scale-[1.07]"
          alt=""
        />

        {/* legibility scrim — measured against the photo, not assumed */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10 transition-opacity duration-500 group-hover:from-ink group-hover:via-ink/45"
        />

        {/* cursor-following specular sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
          style={{
            background:
              'radial-gradient(22rem circle at var(--mx,50%) var(--my,50%), rgba(224,179,104,0.16), transparent 65%)',
          }}
        />

        <div className="relative flex h-full flex-col justify-end p-6">
          <Icon
            size={26}
            className="mb-4 text-gold transition-transform duration-500 group-hover:-translate-y-1"
          />
          <h3 className="font-display text-[1.75rem] leading-none text-cream">
            {cuisine.name}
          </h3>
          <p className="mt-2.5 max-w-[22rem] text-[0.875rem] leading-relaxed text-cream-dim">
            {cuisine.blurb}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

export function Cuisines() {
  return (
    <section className="relative py-24 sm:py-28 lg:py-32">
      <div className="u-container">
        <SectionHeading
          kicker="The Spread"
          title={
            <>
              Five kitchens,
              <br />
              <span className="text-gold">one buffet line.</span>
            </>
          }
          lead="What the buffet covers, according to Buffet City's own listing. Walk it once and you'll pass all five."
        />

        <div className="mt-14 grid auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {CUISINES.map((c, i) => (
            <CuisineCard key={c.name} cuisine={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
