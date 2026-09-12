/**
 * BUFFET CITY — verified fact sheet.
 *
 * Every factual claim rendered anywhere on this site resolves from this file.
 * Source: the restaurant's Google Maps / Google Business listing.
 *
 * ─────────────────────────────────────────────────────────────────────
 * RULE: Do not add a field here unless it is verified.
 *
 * DELIBERATELY ABSENT because it was never verified — do NOT invent:
 *   • opening hours / days of operation
 *   • individual menu item prices
 *   • individual dish names beyond `popularItems` below
 *   • awards, accolades, "since 19XX" history, chef names
 *   • customer testimonials with attributed names
 *   • delivery partner brands (DoorDash / Uber Eats / Grubhub / …)
 *   • online reservation or online ordering endpoints
 *   • social media profiles
 *   • email address
 * ─────────────────────────────────────────────────────────────────────
 */

export const RESTAURANT = {
  name: 'Buffet City',
  /** Self-service buffet. Verified restaurant type. */
  type: 'Self-service buffet restaurant',
  city: 'Chicago',

  address: {
    street: '7010 S Pulaski Rd',
    city: 'Chicago',
    state: 'IL',
    postalCode: '60629',
    country: 'United States',
    countryCode: 'US',
  },

  /** Human-readable, used for display + clipboard copy. */
  get addressOneLine(): string {
    const a = RESTAURANT.address;
    return `${a.street}, ${a.city}, ${a.state} ${a.postalCode}`;
  },

  phone: {
    display: '+1 773-838-1368',
    /** E.164 for tel: links */
    href: 'tel:+17738381368',
  },

  /** Verified from the Google listing at time of build. */
  rating: {
    value: 3.8,
    scale: 5,
    count: 2251,
    source: 'Google',
  },

  /** Verified price band. Per person. */
  priceRange: {
    display: '$20–30',
    perPerson: true,
    /** Schema.org priceRange notation */
    schema: '$$',
  },

  /** Verified available services. No delivery partner brands — none verified. */
  services: ['Dine-in', 'Takeout', 'Delivery'] as const,

  /** Cuisine categories verified on the listing. */
  cuisines: ['Chinese', 'Seafood', 'Sushi', 'Mexican', 'American'] as const,

  /** The only three dishes that are verified. No prices — none are published. */
  popularItems: [
    'Alaska Combo Platter',
    'Orange Chicken with Rice',
    'Chicken with Broccoli',
  ] as const,

  /** Menu section labels visible on the listing. Contents are NOT published. */
  menuCategories: ['Overview', 'Seafood Combo Platter', 'Meat Combo'] as const,
} as const;

/** Google Maps directions deep link, built from the verified address. */
export const DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent(
    `${RESTAURANT.address.street}, ${RESTAURANT.address.city}, ${RESTAURANT.address.state} ${RESTAURANT.address.postalCode}`,
  );

/** Google Maps place search for the listing (reviews live here). */
export const MAPS_PLACE_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(
    `${RESTAURANT.name}, ${RESTAURANT.address.street}, ${RESTAURANT.address.city}, ${RESTAURANT.address.state} ${RESTAURANT.address.postalCode}`,
  );

/**
 * Embedded map — keyless Maps embed, built from the verified address.
 * `hl=en` pins the map labels to English so they don't follow the visitor's
 * browser locale on a US restaurant's site.
 */
export const MAP_EMBED_URL =
  'https://www.google.com/maps?output=embed&z=16&hl=en&q=' +
  encodeURIComponent(
    `${RESTAURANT.name}, ${RESTAURANT.address.street}, ${RESTAURANT.address.city}, ${RESTAURANT.address.state} ${RESTAURANT.address.postalCode}`,
  );

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'location', label: 'Location' },
] as const;

export type NavId = (typeof NAV_LINKS)[number]['id'];
