/**
 * Image manifest for Buffet City.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  PLACEHOLDER PHOTOGRAPHY — READ BEFORE LAUNCH                        │
 * │                                                                      │
 * │  These are licensed stock food photographs (Unsplash License),       │
 * │  NOT photographs of Buffet City's own food or dining room.           │
 * │  They stand in so the layout can be reviewed at full quality.        │
 * │                                                                      │
 * │  Before this site goes live, replace every file in /public/images    │
 * │  with real photography of the restaurant. Keep the same filenames    │
 * │  and the -400 / -800 / -1600 width suffixes and nothing else needs   │
 * │  to change. See README.md → "Replacing the photography".             │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export interface ImageAsset {
  /** base filename in /public/images, without width suffix */
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly width: number;
  readonly height: number;
  /** 24px blur-up placeholder, inlined to kill layout shift */
  readonly lqip: string;
}

const asset = (
  src: string,
  width: number,
  height: number,
  lqip: string,
): ImageAsset => ({
  src,
  width,
  height,
  lqip,
  alt: ALT[src] ?? '',
  caption: CAPTION[src] ?? '',
});

const ALT: Record<string, string> = {
  'buffet-station': "A buffet service line with covered chafing dishes and stacked plates",
  'burger': "A stacked cheeseburger with lettuce and tomato photographed against a dark background",
  'chicken-broccoli': "A stir-fry of chicken with broccoli, snow peas and peppers in a dark pan",
  'dimsum': "Steamed dumplings in bamboo baskets under warm low light",
  'dining-table': "A laid dining table with glassware as a plated dish is served",
  'fish-ice': "A spread of whole fish, shellfish and lobster tails displayed on crushed ice",
  'fried-shrimp': "Golden fried shrimp being dipped into a creamy sauce",
  'friedrice': "Fried rice with vegetables and lemon in a dark cast-iron pan",
  'guests-bar': "Guests sitting together at a warmly lit restaurant counter",
  'hero-platter': "A large wooden boat platter filled with assorted sushi rolls and nigiri",
  'interior-bar': "A dark restaurant interior with a long counter and warm overhead lighting",
  'interior-warm': "The warmly lit dining room of a restaurant with hanging pendant lights",
  'lomein': "A bowl of stir-fried lo mein noodles with scallions",
  'orange-chicken': "Glazed orange chicken with broccoli and steamed white rice on a white plate",
  'ribs': "Barbecue ribs with sliced tomato and pickles on a wooden serving board",
  'salmon-plate': "A seared salmon fillet with sauteed greens on a dark plate",
  'shrimp-plate': "Two grilled shrimp plated with lime wedges and mint on a black plate",
  'spread': "An overhead view of a large spread of varied dishes, fruit and sides",
  'sushi-rolls': "Assorted salmon and avocado sushi rolls arranged on a dark serving board",
  'sushi-slate': "A row of nigiri and maki sushi presented on dark slate with chopsticks",
  'tacos': "Soft tacos filled with seasoned meat, avocado and fresh salsa on a wooden board",
};

const CAPTION: Record<string, string> = {
  'hero-platter': "A platter from the sushi selection",
  'buffet-station': "The buffet line",
  'burger': "American favourites",
  'chicken-broccoli': "Chicken with Broccoli",
  'dimsum': "Steamed dumplings",
  'dining-table': "Service in the dining room",
  'fish-ice': "From the seafood selection",
  'fried-shrimp': "Fried shrimp",
  'friedrice': "Fried rice",
  'guests-bar': "Guests at the table",
  'interior-bar': "The dining room",
  'interior-warm': "Inside the dining room",
  'lomein': "Lo mein",
  'orange-chicken': "Orange Chicken with Rice",
  'ribs': "American favourites",
  'salmon-plate': "Seafood, plated",
  'shrimp-plate': "From the seafood selection",
  'spread': "One table, many flavours",
  'sushi-rolls': "Sushi rolls",
  'sushi-slate': "From the sushi selection",
  'tacos': "From the Mexican selection",
};

export const IMG = {
  'buffet-station': asset('buffet-station', 1600, 1067, 'data:image/webp;base64,UklGRtYAAABXRUJQVlA4IMoAAAAQBQCdASoYABAAPuleqE0pJSOiMAgBIB0JagCdMoR3AkgPbYeXHlfC+7wBxJ4c6rqoAP70MvmueFpp9ee0fT5fyzka1GP252hreMx4I06fnXSulV0t3aRSwYoq6fme7IxYX2PaeWZDAgGP168aVrUUqNgpd6+EmDru94CMNvtJTqpPtrcHDPc47rRk/u4JhAR4Jk/tvepqTT2r6jQgdYqqshXfXPDKWdMKsNPrGxRhXXNABucuEYMh88Cl++z0nsajnwA9Q45XcAAA'),
  'burger': asset('burger', 1600, 1065, 'data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAABQBACdASoYABAAPulgp00pJaOiMAgBIB0JbACsAYxi3EfM78qpjCSNCTi4AP70I738GSlklsV4pn0fVnyRKdBygDO5X291g802dla6GyXuaBLNmkbanyBh81FnJfnbrbDO7Rtj8iYg9HpRKeg/PFAS+6DcBy1sKIDa7NC8Bl3F8UdongFNDP2CK57wFBKWINa6h2KxMvUjB5KRFJaHUa2DAAA='),
  'chicken-broccoli': asset('chicken-broccoli', 1600, 1067, 'data:image/webp;base64,UklGRtYAAABXRUJQVlA4IMoAAAAwBACdASoYABAAPulgqE0pJaOiMAgBIB0JYgCsAYtU3sE8cVNHv6SUo8AA/eOfZTrcC2yylv/ntbOFg9WyKsLhAALZCmXswwK9Y2dxMCVFj9/n5WPb3/g+fEvuWQRTB1z1nvSStG/p61gyaBfReELnxHSFeK2dtP0EMBB3QTjIKxx2+Jd03pBUfeDk1zjqmJI6Ko5PdaGuoYfZIxBwqx4SzR81pC7PsmTiOM5Ph4N9RKtZ2uTOR/vmlBR3DdtgiQRUuzZ70zMqG9gA'),
  'dimsum': asset('dimsum', 1600, 966, 'data:image/webp;base64,UklGRrgAAABXRUJQVlA4IKwAAADwBACdASoYAA4APulgqE0pJaOiMAgBIB0JZACxC8Agvhf79lRyk7NPy+OhvAy/lQAA/u6peLMRGzHiH029MOQ0QY66+l1zXDI83p7IAf8rLoBr35kaMpnCZ1l4YxYbGSVSYQs0B1uZXI0xWT+4G9iLH8FPfik2yaRRHZ7GmbDciDRaG25+Frv+x6FKZ98J+crTKiYkzL9Uq6ZYBkjDlFzVB3xwsyJ6BTyismwA'),
  'dining-table': asset('dining-table', 1600, 1067, 'data:image/webp;base64,UklGRugAAABXRUJQVlA4INwAAAAwBACdASoYABAAPulgqE0pJaOiMAgBIB0JQBOgO4Fu5lwGC6y2WwQQAOAA/glcZoIRS9R34e3l57x9tWf8VDVLud/7KLEiaGj6cTHWZmYFL8xSiEqRlq4X2JY00TNOnuqq7bqlwqUAUCEqvvUitZYnCy97B/bp+2pHZfOEO3lMqeyXzEvXIna+Oi0Lfx/5k2tBaTVybah9/G/dGIn4x+O2DpCfJndf93ymsuBr9xvWh6Up+cUb276l6K4WeX5xJeb8+7zeSKUPXCXhcQ+wY9uPFLiIrKSMAb0pgAAA'),
  'fish-ice': asset('fish-ice', 1600, 1200, 'data:image/webp;base64,UklGRvoAAABXRUJQVlA4IO4AAADQBQCdASoYABIAPuloqlCpJaOiqAqpIB0JaACdMy/lvQyxrtX6B0JqsqsT3L7+FsJNa/OcukZIAP3b1YIUe8W/I7P+Ge7g00+4BwVqF99/luqkFzhAnFyBTB6i9PzOLJw0RVb/Banvgt2uqerh+ovn7Shr4Rwxl5FiSycGBOQlFnmClrYjdIWFL2JaTPlZI0ldAKzzt+ZCU99O1vJBwzrMRVvQnPzNULBIVt1NYoMaryNo2gjlBz8t7+sNXNZgAAiChhxQfm4u01gc8FehVXO16n5N95geSkKM9J1tzdk1/ld0DmqWUscxLxB2CAAA'),
  'fried-shrimp': asset('fried-shrimp', 1600, 2406, 'data:image/webp;base64,UklGRkoBAABXRUJQVlA4ID4BAABQCACdASoYACQAPulmqlEpJSOiqrgKASAdCWwAuzNaPP3/54AygeBdU0OXJ5fg0Z3/rldHge3PvrHrsw6BLUgUbUS9Y0FV45UpAoAA/uv9A/8wH6p4TJUO3rkCqFPALN0jCApzKHdY3GZ+Dwt7JJk5WFyBLTQ/ngvKp1xchlEsAgt3RXl45N0xJa3BOsKirdooO2xefkvkxy0fhIAKT7UNCdCeVXZZ4Uf3gNX7S3dr0mZfINgwJ+/NwB/k6KYNOcL8Ko9wELrF3g6zntKkQkdgZiHmxAsqvWPoIbAFsmArH1ANWSf2WwZHyijZRK2QmqJTtBbQdH/oRYSu/YJMDKBaDmNuMrrz1PBlATdzimn8sp1cCo6idoBORuGwYjCl1KkUY7IwFBXpr2tDxFDvIbv8KJe7XPMN5gpqAR+tgAA='),
  'friedrice': asset('friedrice', 1600, 1065, 'data:image/webp;base64,UklGRsAAAABXRUJQVlA4ILQAAACQBACdASoYABAAPulgqE0pJaOiMAgBIB0JbACo9Yrw5qwJFpvt8BX7R9FdUwAA/tZ1RpJW+c/x8JBWbp7FPs4vurVMga0LnRUG+HFEUb+62eo4mOpJYoOdf3m31OTsOKim+q6R1ovFcj7169hYeZsHpzXBdET2eYcJhzZNVXeAz6cu1V5UIm1UL1W3IEYTaxIkzFb0j6OH0Lw2Sb+WF7FhOY3g9BQ2mItDwzQFle0oe3/AAAA='),
  'guests-bar': asset('guests-bar', 1600, 1067, 'data:image/webp;base64,UklGRqwAAABXRUJQVlA4IKAAAACwBACdASoYABAAPuleqE0pJSOiMAgBIB0JagCdMoBOACbcllr1y4Yfwg9gJDIAAP70KnHlRkn2127CJiu46NXTria93Bc9CGkpr5kh1JRF5JroGAgUouEWgPCWXzio9OeLYszOXA+rYVUCgH+wG9vX14mDmEjryzsv6m9UaBfzsNJsS6InuC5sicUeQRAq4crzlmNKcRTYeEw7BEKh2AAA'),
  'hero-platter': asset('hero-platter', 1600, 1280, 'data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAADQBACdASoYABMAPuloqVCpJaOiqAqpIB0JQBYhpAAwSn+WfDhKLcESmQV8VZl0AAD+5NKJgPgn+37Pz2mDLz/ih50tprKoV67jbP5DUHd+cQCp+5e9un0I9XL6T66Q8+VQNO9TrvN5CZtfvTn6P9UEW4ERpMC2XxyDfg5WaVVNmjj8J24ETIknx1IxYlX32lXS0hFv4hl/0OXY5a10C7oAAAA='),
  'interior-bar': asset('interior-bar', 1600, 1200, 'data:image/webp;base64,UklGRsQAAABXRUJQVlA4ILgAAADQBACdASoYABIAPuloqlCpJaOiqAqpIB0JQBdiP/wD6KZVAq5fhqJIGmbsVCngAAD+6+Ue+SJhFcQFojBg1sHYnpsdAeZjePnNI+1Bv0T5wrHLH7CToLKttbgb0WBf8eHvw0kkDEhuI93Fxo4okq5OEkwJYf2yMEEOBpYTTxn5CaAAbYTNvHLy3mPI+7MncMR4YvkG5I2cwa/x5fxH35wm4W/i6kD87QEdLZ5rBLXZVbZl9WzRC4gA'),
  'interior-warm': asset('interior-warm', 1600, 2416, 'data:image/webp;base64,UklGRjQBAABXRUJQVlA4ICgBAACQBgCdASoYACQAPulsr1IpJaQipWmZIB0JQBe+KNh2BwDrq2ofzVGWQ/1tGq8SE1A4YKEm3V/X7k9DR8wAAP78Rsb7dVQ0boDZm+kvnFHLeB/TFAFjlDbL1Q1ipz8/P7iS0eJmTvG7y/RHXjVrfnD+XSS8fCvSOyBMt4eoTxnVtF9Gvv50gs+OviuTlww07A2BydQid+qi7VR/lGkjDlkNMmm3OcTTD2Wn9H7jrMkTI4b07DZfb3lSvAsUUPjHEPfZx/3Y9tXLIT0aUOVt9R+Mw2uO2lAEsbDwi080PCl0n1vLTEMkvKOHEHdOtcRwGXItow2AOqpszVzQtF0qgPT7h4z9w+F3Wd7YWlzbmEB7fWHU6m6Rot2Jce2haVAy68fvSo6AAAAAAA=='),
  'lomein': asset('lomein', 1600, 1342, 'data:image/webp;base64,UklGRqoAAABXRUJQVlA4IJ4AAADwBACdASoYABQAPuliqk4pJaQiKA1RIB0JagCw7YvCcLTemZYlrVNNy/KqMmlGqAAA/vDFc45E8oKKQD+UF8uHEN4oxHYVCwzELmHDXhny0EF4pPIVJCHESZaz/dzKlbK0Wuhg+ue4xeSlRP7EVna90nTzVJ0AKQ1cygkkxvT50LpTvAzH5krNOl5kKQUL8gcHB+nxwwEeoWC1+K2AAA=='),
  'orange-chicken': asset('orange-chicken', 1600, 1200, 'data:image/webp;base64,UklGRuwAAABXRUJQVlA4IOAAAAAwBgCdASoYABIAPulorVApJaQiqAqpIB0JaACBKi26qx+WhNz4k29f6IXEsah+DCkut0uRTRDa5/CAAP7Eq/8uCB7TxDJentQLEStRBBwT1bkmslFC+i0Hth61fydVuCMrQxVRhSTj86X0QPxyWLirkEJfP+74PoRfRABdWO7hObEbVzuD6gUojI6/tNsgfVzpMhGrjnX2ARbQirdZUaYvsflDbT2Ac6BRgZAXhkwEsHzU0tBoo2D2sIs5bcr8woXYd88096ob9Nv3AqPKG2FBEmmVCPQJeY1ZMXV3v84AAA=='),
  'ribs': asset('ribs', 1600, 1068, 'data:image/webp;base64,UklGRswAAABXRUJQVlA4IMAAAACQBACdASoYABAAPulgqE0pJaOiMAgBIB0JbAC06Yss2q4GB1ezs6ao+cJVsgAA/vDLZeQsdc/0VUZJ44ipq/7iU+W8sjnK4hVjLE1xz/C1VZ5u5BX6mLfJc8vHsNyxO56Atd2TQCiPhD3K1TXKaYSrBCiP31SGMx8McLa8xNSaPYwopflEmOd1Kg1DnaF1JOnvekobkwWYSGimAldGOaSRZDx7vfsoWKbqJNuB6yRM91nG1aAbbrQjIAhkc/lEAAA='),
  'salmon-plate': asset('salmon-plate', 1600, 1067, 'data:image/webp;base64,UklGRpAAAABXRUJQVlA4IIQAAABQBACdASoYABAAPulgqE0pJaOiMAgBIB0JaAAD5GoN9oG+kBuJBUmjzKYAAP7r0JsgHh33pHaVYDPR9T4Hcd9e0IKjrUXuqr91N4DGbSmLlwLi998rWnaXdt2uMhFipT4pd3DKaHbj21Y4uA7pWaqSu4f8RrrmPRi4DWP9C5LIcQEYsAA='),
  'shrimp-plate': asset('shrimp-plate', 1600, 2400, 'data:image/webp;base64,UklGRiQBAABXRUJQVlA4IBgBAACQBgCdASoYACQAPuliqk+pJSOiKrgMASAdCUAaCwECPBDM/HfD7WpvBPRHpKEj5O0oVKiONoft9uYqjwMAAP74tFrt9jnawCz+7JQWvyPgTW7+PGUdy+O0winno+GDuiXohJjXYUpoMBryB1s8cqqeIntwuUtUEItgIKyMGPRLdfOUMlfJ8eYSmsHRdlxG9U9oHYJI5wJBlxrLM+d0rMO843tZYVD3tFJTMwMWXcbJYCDe3i+g3sBGV4Myl3/TtCoFUo0YNYDMgUaiebGVge8m0Gvgo2Le2BCIi9JDfSDWYH/UqgN8tnRl9yPXwAXMJPmT/WJk0pFoutIEHK0NGUB1bNe4OgR9UpqDW+Pk+mHZtF0G0pe7N4AA'),
  'spread': asset('spread', 1600, 1067, 'data:image/webp;base64,UklGRtgAAABXRUJQVlA4IMwAAAAQBQCdASoYABAAPulgqE0pJaOiMAgBIB0JbACdMoR3AkgPb2UDuAnT6hAwXYJpG/bAAO/TgROPX4MG4biSf/aeIlJ7tHgBYldkHgS2GICkeU2kS1Zq+UvH85HyhpX4C1HtZFYH6UtaXHNxFkOTce23fk3vrYzie0kJno/1kcqsrqkzik9WBxhyS540EeNDI+ltA8/uUu+de2NYAv4q4VjB99f01x3PpfFniKokwywu+/VEvW0i1eBMGya5+X/Nm8hPlIAThepkbawFQAA='),
  'sushi-rolls': asset('sushi-rolls', 1600, 1067, 'data:image/webp;base64,UklGRtAAAABXRUJQVlA4IMQAAADwBACdASoYABAAPulep00pJSOiMAgBIB0JaACdMoMjkn/FsWOUgeGZwSoLQgpre0AA/vDH3tDZOLOTXx5Ex7ZCjiZaEx0tiwmw5hmiGOjtIogpkv6qa6v9HvhJfC2HjlE1PcFR+z+o5JI4wB/298YzF4Z0gxhSE71coAMJ3EN74MbkzokMt7feICzVmNzis0E1q1HOo6bKrb5CZVZOnnfcj13D7hQP2UySQuLp3tHmSIqXTje4T02lf6822DkcBEYLqAAA'),
  'sushi-slate': asset('sushi-slate', 1600, 1067, 'data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQAwCdASoYABAAPulep00pJSOiMAgBIB0JYwC/OB56T8uK+x3gAP7s3qKAOQzuchdrYNqa6apG846FkXybcz1GxUGS5OM0JzcgwoO7k7a8aqAn2aNzBf93yozxUOxc7GxEBjwPUNgAAA=='),
  'tacos': asset('tacos', 1600, 1933, 'data:image/webp;base64,UklGRmIBAABXRUJQVlA4IFYBAADwBgCdASoYAB0APulepk0pJSOiMAgBIB0JbACdMoR5mP31qjjqWKUBuAaX1nwNKTVK6KllHogFPTc6xLmYKbwAAP4jCgxr9PLZcR4x1aSS90wPcDFhzq32JRaHjhCeW4k+xb5pNnvPB8auBqrvJasm+b85xOS8t53T829jPVeXv/eLOCfh0IvXo6qgVSt/v48t8jXjZZp49S96TWYF92S7B//wz4nFOeYZrna1/WhoW/kb+fOtSnkzvGqGRhM55fMfKYMTNhlfrsWS0xfFTrzFw0vEcxMq8PbiL9mvkRW/WrI3Lybjkzput2R+qLatGdW1ivh0KaXFUgBDESxBBw2gBa9QqcT3yFs/aMnBhSf06fH/VwBpz2L8D8H5OtI494xhYyXj8f5RfBTbMWftfG/eYMxjjGCIsA53aXFiIkbs9rSPnI4DzjK579l5b2Y5Tr5pYj3AAAA='),
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof IMG;

/** Responsive srcset across the three generated widths. */
export const srcSet = (src: string): string =>
  [400, 800, 1600].map((w) => `/images/${src}-${w}.webp ${w}w`).join(', ');

export const srcFor = (src: string, w: 400 | 800 | 1600 = 800): string =>
  `/images/${src}-${w}.webp`;
