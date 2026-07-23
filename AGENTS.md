# AGENTS.md

Guidance for Codex when working in this repository.

## What this is

Ronaldo Scotti's personal site: a CV rendered as a one-page site, in English at `/` and Portuguese
at `/pt`. Astro 5 static output, Tailwind 4 via the Vite plugin, no runtime JavaScript beyond three
small inline blocks.

**Site:** https://ronaldoscotti.com

## Companion documents

| File | What it holds |
|---|---|
| `COPY-SITE.md` | Portuguese copy, section by section |
| `COPY-SITE-EN.md` | English copy. Not a translation: both derive from the CV |
| `DIRECAO-VISUAL-SITE.md` | Art direction: type scale, palette, layout rules |
| `SPEC.md` | Implementation spec: routes, data contracts, components |
| `OPERACAO.md` | How the automation works, where each job runs, recovery steps |
| `DIRECAO-SITE.md` | The original brief and the diagnosis of the old site |

Copy lives in `src/i18n/translations.ts`, mirrored in the two copy documents. Edit both together.

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
  fetched at runtime. See `OPERACAO.md`.
- `src/data/site.ts` — `CAREER_START`, from which years of experience is computed. No calendar
  number is ever hardcoded in copy.

`scripts/fetch-activity.mjs` runs on `prebuild` and rewrites the whole file, so it deliberately
preserves the `languages` key written by `scripts/fetch-languages.mjs`.

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

### Content language

The English page is the default because the audience is US hiring managers. The Portuguese page is
written in Portuguese, not translated from English, and vice versa. When editing one, check whether
the other needs the same fact, not the same sentence.
