# Portfolio Studio website

Static Astro site for Portfolio Studio: executive portfolio websites, live in 7 days.
It lives in the `astro/` folder, so the existing landing page at the repository root is untouched.

## Run it

```bash
cd astro
npm install
npm run dev      # http://localhost:4321
npm run build    # writes the site to dist/
npm run preview  # serves dist/ locally
```

## Where things are

| Path | What it holds |
|---|---|
| `src/data/site.ts` | All copy that changes: contact details, the three live sites, "What you get" items, pricing, FAQ and the 7-day build case study |
| `src/components/` | One component per section: Nav, Hero, ParallaxStack, BuildScrubber, WhatYouGet, Pricing, Faq, FinalCta, Footer |
| `src/scripts/parallax.js` | Scroll-driven parallax stack (no library) |
| `src/scripts/scrubber.js` | 7-day build scrubber: slider, Play button and checklist |
| `src/styles/global.css` | Design tokens and all styles (dark navy and gold) |

## Deploying

`npm run build` produces plain static files in `dist/`. Publish that folder on Netlify (build command
`npm run build`, publish directory `dist`) like the client sites, or on any static host.

## Before going public

- The 7-day build section uses a real client's CV facts (MH Chowdhury). Confirm he has agreed to be shown.
- The parallax laptop and phone use sample content ("Your Name"); the three client cards are sketches, not screenshots.
- Both effects switch off for visitors who ask their device for reduced motion.
