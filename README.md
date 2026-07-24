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
| `npm test` | validate the activity pipeline and the committed data |

## What's inside

Static Astro 5 with Tailwind 4. Four inline blocks of JavaScript (reveal on scroll, active section in
the nav, counting figures, show-more button) plus one 9 KB module that draws the sky. No request to
any external domain, self-hosted fonts.

The portrait sits in a window onto the real sky over Florianópolis: sun and moon positions are
computed from the clock, so the hero changes through the day and the moon carries its actual phase.
Nothing is fetched — it is arithmetic. See `CLAUDE.md` for how it works and what it deliberately
leaves out.

Editorial Noir: Playfair Display, warm near-black paper, gold accent, a drifting dot grain over the
whole page. Light and dark are two separately calibrated palettes rather than an inversion. The
default follows the visitor's own clock — light through the day, dark at night — never the operating
system; a manual choice is one click away and remembered. No flash on load either way.

Two things on the page refresh themselves and land through an auto-merging pull request (tests must
pass first — never a direct push to `main`):

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
