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

`/` (EN, default) · `/pt` · `/404` · `/en` and `/es` redirect to `/`.

Both language pages render `src/components/Page.astro`, which composes the sections. Section ids
differ per language and must match the `nav.links` hrefs in `translations.ts`.

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

Light and dark are two calibrated palettes, not an inversion. Both are declared twice in
`global.css`: once under `prefers-color-scheme` for the system preference and no-JS, once under
`[data-theme]` so an explicit choice wins. An inline script in `<head>` always resolves
`data-theme` to a concrete value before first paint, which is what keeps the first toggle click
from being a no-op.

### Conventions

- **No new dependencies.** Static Astro with Tailwind covers everything here.
- **No external resource requests.** Fonts are self-hosted, images are local. Only `<a href>` may
  point off-site.
- Every `<img>` declares `width` and `height`. CLS must stay at 0.
- Colors come from the `@theme` tokens in `src/styles/global.css`. The accent appears at most once
  per viewport height.
- The heatmap uses GitHub's green, not the site accent: amber reads as a warning.
- `Person` schema carries no `worksFor`, and no copy states a current employer. The site must stay
  true after a job change.
- Comments are sparse and in English, even though the content is Portuguese.

### Content language

The English page is the default because the audience is US hiring managers. The Portuguese page is
written in Portuguese, not translated from English, and vice versa. Audience-specific lines belong
to one side only: the US time-zone overlap is English-only, and explaining what TDC or Eduzz is
would be over-explaining in Portuguese. When editing one page, check whether the other needs the
same fact, not the same sentence.
