# Buffer_City

## Design skills

`ui-ux-pro-max` (v2.13.0) is installed as a project skill in `.claude/skills/`,
from https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

Seven skills ship in that bundle: `ui-ux-pro-max`, `ui-styling`, `design`,
`design-system`, `slides`, `brand`, `banner-design`.

Use them for any UI work: pages, components, color/typography systems, layout,
accessibility, animation, and charts.

### Running the skill scripts

Use `python` — **not** `python3`. On this machine `python3` resolves to the
Microsoft Store app-execution alias and fails without running anything. Several
bundled SKILL.md files spell the command `python3`; substitute `python`.

The `ui-ux-pro-max` search script takes a project-root-relative path:

```bash
python ".claude/skills/ui-ux-pro-max/scripts/search.py" "<query>" --domain <domain>
```

The other skills' scripts use paths relative to their own skill directory, so
`cd` into that skill directory first.

### Local modification

`.claude/skills/ui-ux-pro-max/SKILL.md` had `${CLAUDE_PLUGIN_ROOT}/` stripped
from its script paths. That variable is only set for marketplace plugin
installs, not plain project skills, so the documented commands would otherwise
expand to an invalid absolute path. Re-apply this edit after any skill update.

## The website

This project is the Buffet City restaurant site — React 18 + TypeScript +
Vite 6 + Tailwind 4 + Framer Motion 11. See [README.md](README.md) for the
architecture, design tokens and the pre-launch checklist.

Two rules that matter more than anything else here:

1. **Buffet City is a real business.** Every factual claim on the site must
   resolve from `src/data/restaurant.ts`. That file also lists what is
   deliberately unknown — opening hours, per-dish prices, full menu contents,
   reservations, delivery partners, testimonials. Do not invent any of them;
   the components are built to state the gap and route to the phone instead.
   This extends to copy that *implies* an operational detail ("cut to order",
   "the sushi counter", "open at night") — describe the photograph or the
   verified category, not a service you cannot confirm.

2. **The photography is placeholder stock.** Everything in `public/images/` is
   licensed Unsplash imagery, not Buffet City's own food or dining room. It
   must be replaced before launch. `src/data/media.ts` is the only place that
   references image files.
