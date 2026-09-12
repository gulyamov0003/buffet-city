/**
 * Icon set — single consistent family, 1.6 stroke, 24px grid, currentColor.
 * No emoji is used as an icon anywhere in this project.
 *
 * Every icon is decorative by default (`aria-hidden`), because in this site
 * each one sits beside a visible text label. Pass `title` to promote one to a
 * meaningful image with an accessible name.
 */
import type { SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Accessible name. Omit for decorative icons sitting next to visible text. */
  title?: string;
  size?: number;
}

function Svg({ title, size = 24, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.6 3.5h-2A1.6 1.6 0 0 0 3 5.2C3 13.9 10.1 21 18.8 21a1.6 1.6 0 0 0 1.7-1.6v-2a1.6 1.6 0 0 0-1.3-1.6l-2.4-.5a1.6 1.6 0 0 0-1.6.6l-.8 1a12.4 12.4 0 0 1-5-5l1-.8a1.6 1.6 0 0 0 .6-1.6l-.5-2.4a1.6 1.6 0 0 0-1.6-1.3Z" />
  </Svg>
);

export const IconPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 10.5c0 5.4-8 12-8 12s-8-6.6-8-12a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10.5" r="2.9" />
  </Svg>
);

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

export const IconArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Svg>
);

export const IconChevronLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="m15 5-7 7 7 7" />
  </Svg>
);

export const IconChevronRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="m9 5 7 7-7 7" />
  </Svg>
);

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6 18 18" />
    <path d="M18 6 6 18" />
  </Svg>
);

export const IconStar = ({ fillLevel = 1, ...p }: IconProps & { fillLevel?: number }) => {
  // stable id so two stars on one page can't collide
  const id = 'star-clip-' + Math.round(fillLevel * 100);
  return (
    <Svg {...p}>
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={24 * fillLevel} height="24" />
        </clipPath>
      </defs>
      <path
        d="m12 3.3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.5l5.9-.9L12 3.3Z"
        opacity={0.35}
      />
      <path
        d="m12 3.3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.5l5.9-.9L12 3.3Z"
        fill="currentColor"
        stroke="none"
        clipPath={'url(#' + id + ')'}
      />
    </Svg>
  );
};

export const IconCopy = (p: IconProps) => (
  <Svg {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2.2" />
    <path d="M6.5 15H5.6A1.6 1.6 0 0 1 4 13.4V5.6A1.6 1.6 0 0 1 5.6 4h7.8A1.6 1.6 0 0 1 15 5.6v.9" />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Svg>
);

/** Dine-in: a set table. */
export const IconDineIn = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 3v7a2.5 2.5 0 0 0 5 0V3" />
    <path d="M8.5 10v11" />
    <path d="M18 3c-1.7 1.4-2.5 3.3-2.5 5.6 0 1.7.8 2.8 2.5 2.9V3Z" />
    <path d="M18 11.5V21" />
  </Svg>
);

/** Takeout: a carry bag. */
export const IconTakeout = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.2 8h13.6l-1 12.2a1.6 1.6 0 0 1-1.6 1.4H7.8a1.6 1.6 0 0 1-1.6-1.4L5.2 8Z" />
    <path d="M8.8 8V6.2a3.2 3.2 0 0 1 6.4 0V8" />
  </Svg>
);

/** Delivery: a van. */
export const IconDelivery = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.8 7.5h9.4v8.7H2.8z" />
    <path d="M12.2 10.8h3.9l3.1 3v2.4h-7z" />
    <circle cx="6.6" cy="18.2" r="2" />
    <circle cx="16.4" cy="18.2" r="2" />
    <path d="M8.6 18.2h5.8" />
  </Svg>
);

/** Buffet / serving dome. */
export const IconDome = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 17.5h18" />
    <path d="M4.6 17.5a7.4 7.4 0 0 1 14.8 0" />
    <path d="M12 10.1V7.8" />
    <circle cx="12" cy="6.4" r="1.1" />
  </Svg>
);

/** Chopsticks over a bowl — used for the Chinese / noodles category. */
export const IconBowl = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.4 11.4h17.2a8.6 8.6 0 0 1-8.6 8.2 8.6 8.6 0 0 1-8.6-8.2Z" />
    <path d="m14.4 8.6 5.8-4.4" />
    <path d="m16.4 9.6 4.6-2.3" />
  </Svg>
);

/** Fish — seafood category. */
export const IconFish = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.8 12c2.6-3.6 5.7-5.4 9.3-5.4 3.6 0 6.6 1.8 9.1 5.4-2.5 3.6-5.5 5.4-9.1 5.4-3.6 0-6.7-1.8-9.3-5.4Z" />
    <circle cx="8.2" cy="11" r="0.9" fill="currentColor" stroke="none" />
    <path d="M17.6 9.3c.9.8 1.4 1.7 1.4 2.7s-.5 1.9-1.4 2.7" />
  </Svg>
);

/** Sushi roll, top-down. */
export const IconSushi = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <circle cx="12" cy="12" r="3.4" />
    <path d="M12 3.6v2.2M12 18.2v2.2M3.6 12h2.2M18.2 12h2.2" />
  </Svg>
);

/** Chilli — Mexican category. */
export const IconChilli = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15.4 7.2c2.2 1.5 3.1 4 2.4 6.6-.9 3.3-4 5.6-7.6 5.6-3 0-5.4-1.3-6.6-3.3 4 .3 6.9-1 8.8-3.3 1.4-1.7 2.1-3.6 3-5.6Z" />
    <path d="M15.4 7.2c-.3-1.3.1-2.4 1.1-3.2" />
    <path d="M16.5 4c1.2 0 2.2.4 3 1.3" />
  </Svg>
);

/** Burger — American category. */
export const IconBurger = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.6 8.9C3.6 6.3 7.4 4.2 12 4.2s8.4 2.1 8.4 4.7Z" />
    <path d="M3.6 12.4h16.8" />
    <path d="M3.9 15.9h16.2c0 2.2-1.8 3.9-4 3.9H7.9c-2.2 0-4-1.7-4-3.9Z" />
  </Svg>
);

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.2V12l3.2 1.9" />
  </Svg>
);

export const IconWallet = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.6 7.6A1.8 1.8 0 0 1 5.4 5.8h11.4a1.8 1.8 0 0 1 1.8 1.8v.9" />
    <rect x="3.6" y="7.6" width="16.8" height="11.6" rx="2" />
    <circle cx="16.4" cy="13.4" r="1.2" fill="currentColor" stroke="none" />
  </Svg>
);

export const IconGoogle = (p: IconProps) => (
  <Svg {...p} strokeWidth={0}>
    <path
      fill="currentColor"
      d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4Z"
    />
    <path
      fill="currentColor"
      d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z"
      opacity={0.75}
    />
    <path
      fill="currentColor"
      d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14Z"
      opacity={0.55}
    />
    <path
      fill="currentColor"
      d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1Z"
      opacity={0.85}
    />
  </Svg>
);
