# ronaldoscotti.com

A CV rendered as a site. One page, English at `/` and Portuguese at `/pt`, static, with no bundled
JavaScript.

**Live:** [ronaldoscotti.com](https://ronaldoscotti.com)

## Running it

```bash
npm install
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | development server |
| `npm run build` | build (`prebuild` refreshes the heatmap first) |
| `npm run preview` | serve the build locally |
| `npm run activity` | refresh the GitHub heatmap |
| `npm run languages` | recalculate the language bar from local repositories |
| `npm run shots` | recapture the project screenshots |

## What's inside

Static Astro 5 with Tailwind 4. Four inline blocks of JavaScript (reveal on scroll, active section
in the nav, counting figures, show-more button) and nothing else: no bundle, no request to any
external domain, self-hosted fonts.

Editorial Noir: Playfair Display, warm near-black paper, gold accent, a drifting dot grain over the
whole page. Dark is the default and does not ask the operating system what it thinks; light is a
separately calibrated palette rather than an inversion, one click away and remembered. No flash on
load either way.

Two things on the page refresh themselves and turn into automatic commits:

- **Contribution heatmap**, from GitHub's public endpoint, no token. Runs on `prebuild` and on a
  daily GitHub Actions cron.
- **Language bar**, computed from `git log` across local repositories. It replaces WakaTime, which
  is paid, and it reaches code that never lands on the personal GitHub account. Since it reads the
  disk, it runs from launchd on the machine, not in CI.

Articles come from `src/data/posts.json` and point at Substack. There is no blog in this
repository.

## Documentation

| File | For what |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Conventions and architecture, for agents and for humans |
| [`docs/operations.md`](docs/operations.md) | How the automation runs, where, and what to do when it stops |

Published copy lives in `src/i18n/translations.ts`. The English page is not a translation of the
Portuguese one: both are written from the CV, and audience-specific lines belong to one side only.
