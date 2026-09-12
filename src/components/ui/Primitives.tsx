import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, useScroll, useSpring, type Variants } from 'framer-motion';
import { IMG, srcSet, srcFor, type ImageKey } from '../../data/media';
import { usePrefersReducedMotion, useCanHover } from '../../hooks';

/* ================================================================== */
/* SmartImage — responsive, lazy, blur-up, zero layout shift           */
/* ================================================================== */

interface SmartImageProps {
  name: ImageKey;
  /** `sizes` attribute. Be honest here — it drives which file is fetched. */
  sizes?: string;
  className?: string;
  /** Above-the-fold images skip lazy loading and get fetchpriority=high. */
  priority?: boolean;
  /** Override the manifest alt. Use '' for images a caption already describes. */
  alt?: string;
}

/**
 * Renders the 400/800/1600 variants as a srcset and holds the exact aspect
 * ratio from the manifest, so nothing reflows while the image decodes.
 * The inlined 24px LQIP shows underneath and cross-fades out on load.
 */
export function SmartImage({
  name,
  sizes = '100vw',
  className = '',
  priority = false,
  alt,
}: SmartImageProps) {
  const img = IMG[name];
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // an image restored from cache can finish before React attaches onLoad
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    // No position utility here on purpose: callers pass their own (`absolute
    // inset-0`, or none). Tailwind resolves class conflicts by stylesheet
    // order, not attribute order, so a `relative` baked in here would fight
    // a caller's `absolute` non-deterministically.
    <span
      className={'block overflow-hidden bg-surface ' + className}
      style={{
        backgroundImage: 'url(' + img.lqip + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img
        ref={ref}
        src={srcFor(img.src, 800)}
        srcSet={srcSet(img.src)}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt={alt ?? img.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        // React 18 only passes through the all-lowercase spelling; the
        // camelCase `fetchPriority` is React 19+ and gets dropped with a
        // warning here, taking the LCP hint with it.
        {...{ fetchpriority: priority ? 'high' : 'auto' }}
        onLoad={() => setLoaded(true)}
        className={
          'h-full w-full object-cover transition-opacity duration-700 ease-out ' +
          (loaded ? 'opacity-100' : 'opacity-0')
        }
      />
    </span>
  );
}

/* ================================================================== */
/* Reveal — scroll-triggered entrance                                  */
/* ================================================================== */

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  shown: { opacity: 1, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** seconds */
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'span';
}

/**
 * Fades and lifts content in once, when it enters the viewport.
 * Under reduced motion the travel is dropped and only a short fade remains,
 * so the page still reads as progressive without any movement.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={reduced ? { hidden: { opacity: 0 }, shown: { opacity: 1 } } : revealVariants}
      transition={{
        duration: reduced ? 0.2 : 0.7,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  );
}

/** Staggers a list of Reveals. `index` drives the delay. */
export const stagger = (index: number, step = 0.08, cap = 0.4) =>
  Math.min(index * step, cap);

/* ================================================================== */
/* Buttons                                                             */
/* ================================================================== */

type Variant = 'gold' | 'outline' | 'ghost';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full ' +
  'font-medium tracking-wide transition-[background-color,color,border-color,box-shadow,transform] ' +
  'duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] cursor-pointer ' +
  'min-h-[48px] px-7 text-[0.9375rem] select-none active:scale-[0.98] ' +
  'disabled:pointer-events-none disabled:opacity-45';

const variants: Record<Variant, string> = {
  // dark ink on gold — 10.3:1. Never white on gold, that is 1.9:1.
  gold:
    'bg-gold text-ink hover:bg-gold-bright ' +
    'shadow-[0_10px_30px_-12px_rgba(224,179,104,0.75)] hover:shadow-[0_16px_40px_-12px_rgba(224,179,104,0.9)]',
  outline:
    'border border-gold/35 text-cream hover:border-gold/80 hover:bg-gold/10 ' +
    'backdrop-blur-sm',
  ghost: 'text-cream-dim hover:text-cream hover:bg-cream/5',
};

/**
 * Magnetic pull toward the cursor. Pointer-only and motion-safe; on touch or
 * with reduced motion it is an ordinary button with no transform at all.
 */
function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);
  const raf = useRef(0);
  const reduced = usePrefersReducedMotion();
  const canHover = useCanHover();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !canHover) return;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform =
          'translate3d(' + dx * strength + 'px,' + dy * strength + 'px,0)';
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf.current);
      el.style.transform = '';
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    // a focused button must sit where the focus ring says it does
    el.addEventListener('blur', onLeave);
    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('blur', onLeave);
    };
  }, [reduced, canHover, strength]);

  return ref;
}

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  magnetic?: boolean;
}

export function Button({
  variant = 'gold',
  magnetic = false,
  className = '',
  children,
  ...rest
}: BtnProps) {
  const magRef = useMagnetic<HTMLButtonElement>();
  return (
    <button
      ref={magnetic ? magRef : undefined}
      className={base + ' ' + variants[variant] + ' ' + className}
      {...rest}
    >
      {children}
    </button>
  );
}

interface LinkBtnProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  magnetic?: boolean;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkBtnProps>(function LinkButton(
  { variant = 'gold', magnetic = false, className = '', children, ...rest },
  _ref,
) {
  const magRef = useMagnetic<HTMLAnchorElement>();
  return (
    <a
      ref={magnetic ? magRef : undefined}
      className={base + ' ' + variants[variant] + ' ' + className}
      {...rest}
    >
      {children}
    </a>
  );
});

/* ================================================================== */
/* ScrollProgress                                                      */
/* ================================================================== */

/** Hairline gold progress bar pinned under the nav. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = usePrefersReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-bright"
    />
  );
}

/* ================================================================== */
/* SectionHeading                                                      */
/* ================================================================== */

interface HeadingProps {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  /** heading level — keeps the document outline correct */
  as?: 'h2' | 'h3';
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  lead,
  align = 'left',
  as: Tag = 'h2',
  className = '',
}: HeadingProps) {
  const centered = align === 'center';
  return (
    <header
      className={
        (centered ? 'mx-auto max-w-2xl text-center ' : 'max-w-2xl ') + className
      }
    >
      <Reveal>
        <p className="u-kicker">{kicker}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <Tag className="mt-4 text-[clamp(2rem,5.2vw,3.5rem)] leading-[1.08] text-cream">
          {title}
        </Tag>
      </Reveal>
      {lead ? (
        <Reveal delay={0.12}>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-cream-dim">{lead}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
