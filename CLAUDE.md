# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Ronaldo Scotti's personal portfolio website built with Astro 5.0 and Tailwind CSS 4.0. The site is a single-page application in Portuguese (pt-BR) showcasing professional services, projects, and client work.

**Site URL:** https://ronaldoscotti.com

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### Tech Stack
- **Framework:** Astro 5.0 (SSG - Static Site Generation)
- **Styling:** Tailwind CSS 4.0 (via @tailwindcss/vite)
- **TypeScript:** Strict mode enabled (extends astro/tsconfigs/strict)
- **Language:** Portuguese (pt-BR)

### Project Structure

```
src/
├── components/     # Astro components for each page section
│   ├── Navbar.astro      # Navigation header
│   ├── Hero.astro        # Hero section
│   ├── Problems.astro    # Problem statement section
│   ├── Journey.astro     # Professional journey timeline
│   ├── Clients.astro     # Client logos
│   ├── Projects.astro    # Project showcase
│   ├── Services.astro    # Service offerings
│   └── Contact.astro     # Contact section
├── layouts/
│   └── Layout.astro      # Base layout with SEO, meta tags, and schema markup
├── pages/
│   └── index.astro       # Main landing page (assembles all components)
├── styles/
│   └── global.css        # Global styles, Tailwind imports, theme variables, animations
└── env.d.ts              # Astro type definitions

public/
├── clients/              # Client logo images
├── products/             # Product screenshots
├── og-image.png          # Open Graph preview image
├── ronaldo-scotti.jpeg   # Profile photo (also used as favicon)
├── robots.txt
└── sitemap.xml
```

### Key Architecture Patterns

**Component Organization:**
- Each major section of the single-page site is a separate Astro component
- Components are imported and assembled in `src/pages/index.astro`
- All components are self-contained with their markup and styles

**Styling Architecture:**
- Tailwind CSS 4.0 configured via Vite plugin (not PostCSS)
- Custom theme variables defined in `src/styles/global.css` using `@theme` directive
- Primary color: `--color-primary: #135bec`
- Font family: Inter (loaded from Google Fonts)
- Material Symbols Outlined icons used throughout

**SEO & Schema Markup:**
- Comprehensive SEO meta tags in `Layout.astro`
- Three schema.org JSON-LD scripts:
  - Person schema (professional profile)
  - WebSite schema (site metadata)
  - ProfessionalService schema (service catalog)
- Open Graph and Twitter Card meta tags configured
- Canonical URL set to https://ronaldoscotti.com

**Scroll Animations:**
- Client-side intersection observer implemented in `Layout.astro`
- Elements with `.animate-on-scroll` class fade up when scrolled into view
- CSS keyframes defined in `global.css`

### Content Language

All content is in **Portuguese (pt-BR)**. When adding or modifying content:
- Use Portuguese for all user-facing text
- Follow existing tone: professional but conversational
- Schema markup uses both Portuguese descriptions and English property names

### Build Output

- Production build outputs to `dist/` directory
- Astro cache stored in `.astro/` directory
- Both are gitignored

### Image Assets

Images are stored in `public/` and referenced with root-relative paths:
- `/ronaldo-scotti.jpeg` - Profile photo
- `/og-image.png` - Social media preview
- `/clients/*` - Client logos
- `/products/*` - Product screenshots

## Important Notes

- This is a **static site** (SSG) - no server-side rendering or API routes
- The site is designed as a single scrollable page with section anchors
- Scroll margin is applied to sections to account for fixed navbar: `scroll-margin-top: 5rem`
- Google Fonts (Inter) and Material Symbols are loaded from CDN
- The site preloads critical images for performance
