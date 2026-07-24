# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Ronaldo Scotti's personal site: a CV rendered as a one-page site, in English at `/` and Portuguese
at `/pt`. Astro 5 static output, Tailwind 4 via the Vite plugin, no bundled JavaScript.

**Site:** https://ronaldoscotti.com

## Companion documents

| File | What it holds |
|---|---|
| `README.md` | Front door: commands and what the site does |
| `docs/operations.md` | How the automation runs, where, and how to recover it |

Published copy lives only in `src/i18n/translations.ts`. There is no separate copy document to keep
in sync.

## Commands

```bash
npm run dev        # dev server
npm run build      # prebuild refreshes the heatmap, then builds
npm run activity   # refresh the GitHub heatmap only
npm run languages  # refresh the language bar from local git repos
npm run shots      # recapture project screenshots via agent-browser
```

## Architecture

### Routes

`/` (EN, default) · `/pt` · `/404` · `/en` and `/es` redirect to `/?lang=en`.

Both language pages render `src/components/Page.astro`, which composes the sections. Section ids
differ per language and must match the `nav.links` hrefs in `translations.ts`.

**Language routing** is decided client-side in an inline `<head>` script, before first paint. Only
`/` is ambiguous, and only there does the browser preference get a vote: with no stored choice, a
`pt-*` browser is sent to `/pt`, everything else stays. `/pt` is an explicit page and is never
redirected away from — a URL the visitor chose always wins over their browser. The language toggle
writes the chosen language to `localStorage` (`data-lang-choice` on the link), and that stored
choice then beats browser detection on `/` forever after — otherwise a manual switch to EN on a
Portuguese browser would bounce straight back to `/pt`. The `/en` and `/es` aliases carry
`?lang=en`, which the script persists and then strips from the URL, so an explicit English link is
honoured even against a Portuguese browser.

### Data

- `src/data/posts.json` — the ten Substack articles, with per-language title and subtitle. Covers
  are local WebP in `public/posts/`. Links point at `jornadasaas.substack.com`; the custom domain
  returns 404.
- `src/data/activity.json` — GitHub heatmap plus language breakdown. Generated, committed, never
  fetched at runtime. See `docs/operations.md`.
- `src/data/site.ts` — `CAREER_START`, from which years of experience is computed. No calendar
  number is ever hardcoded in copy.

`scripts/fetch-activity.mjs` runs on `prebuild` and rewrites the whole file, so it deliberately
preserves the `languages` key written by `scripts/fetch-languages.mjs`.

### Theming

Light and dark are two calibrated palettes, not an inversion. **Dark is the default** — it is the
palette the direction was drawn in, so it ships as the base `@theme`, and light is an override
under `:root[data-theme="light"]`. Light was derived from dark by flipping luminance while keeping
the same warmth and the same role for every token.

The system preference deliberately gets no vote: `prefers-color-scheme` is not consulted anywhere.
A visitor on a light OS still lands on the dark site, and the toggle — one click, persisted in
`localStorage` — is how they opt out. An inline script in `<head>` resolves `data-theme` before
first paint, so a stored choice never flashes. That script also sets `html.js`, which gates
everything that starts hidden and is revealed by script, so the page is never invisible without JS
— and without JS the base palette is already dark, so nothing is needed for it to look right.

### The sky

The hero portrait sits in an arched window showing what the sky actually looks like in Florianópolis
right now. `src/scripts/sky.ts` computes sun and moon positions from the visitor's clock using the
low-precision Meeus/NOAA formulations — pure arithmetic, nothing fetched, so the no-external-requests
rule holds. Verified against known values: solar noon altitude 39.0° at the June solstice, 85.8° at
the December one.

There are no time-of-day presets. The palette is a continuous function of **solar altitude**, so
dawn is simply what −3° looks like. The aperture is a north-facing window with a 270° field, because
in the southern hemisphere the sun crosses the north — and 270° is the narrowest field that keeps the
sun on screen for every daylight minute of the year (at 210° it fell out of frame around the December
solstice). The moon carries its real phase, drawn as two elliptical arcs over a full dark disc so a
gibbous reads as a sphere with a shadow rather than a floating lune.

Weather is **not** wired in yet: the sky always renders clear. That is deliberately also the
degradation path for when forecast data lands and goes stale.

The portrait is the screen-print illustration, not the photograph — a photographic subject in front
of a synthetic sky always reads as a bad composite, and matching the medium is what fixes it. The
real photo stays in `public/ronaldo-scotti.webp` for `Person` schema and OG. The light falling on the
portrait is the sky's own horizon colour, masked through the PNG's alpha channel.

### Art direction

Editorial Noir: Playfair Display at 900 for the name and 800 for section headings, Inter for body
copy, JetBrains Mono for eyebrows, numerals and metadata. Gold is structural here, not a rare
highlight — section numerals, the fading hairline that opens each section, links, and the bloom
behind the portrait. A fixed dot field (`.grain`) sits over the page at ~5% and drifts, which is
what keeps the flat backgrounds from reading as flat.

### Conventions

- **No new dependencies.** Static Astro with Tailwind covers everything here.
- **No external resource requests.** Fonts are self-hosted, images are local. Only `<a href>` may
  point off-site.
- Every `<img>` declares `width` and `height`. CLS must stay at 0.
- Colors come from the `@theme` tokens in `src/styles/global.css`. Never a raw hex in a component.
- The heatmap uses GitHub's green, not the site accent: gold reads as a warning.
- `Person` schema carries no `worksFor`, and no copy states a current employer. The site must stay
  true after a job change.
- Comments are sparse and in English, even though the content is Portuguese.
- Commit messages, PR titles and PR descriptions are in English. The published copy is bilingual;
  the git history is not.

### Content language

The English page is the default because the audience is US hiring managers. The Portuguese page is
written in Portuguese, not translated from English, and vice versa. Audience-specific lines belong
to one side only: the US time-zone overlap is English-only, and explaining what TDC or Eduzz is
would be over-explaining in Portuguese. When editing one page, check whether the other needs the
same fact, not the same sentence.
