# Portfolio Studio — landing page

The live site at **portfoliostudiocv.netlify.app** has two parts:

- **Classic site** (`/`): a normal, clickable page. Visitors use the menu to jump to Samples, the 7-day build, What you get, About, Pricing or FAQ. Built with Astro.
- **3D journey** (`/journey/`): an optional scroll-driven camera journey through the same story. Built with React 19, React Three Fiber / Three.js, Tailwind CSS v4 and Vite.

The classic site links to the journey from the menu, the hero, a preview card and the footer. The journey links back with "← Classic site" in its header, phone stop list and footer.

Netlify builds both automatically from `main`: `npm run build` → `dist/`, Node 22 (see `netlify.toml`).

## Run it locally

```bash
npm install
npm run dev       # classic site at http://localhost:4321
npm run build     # builds the classic site, then the journey into dist/journey/
npm run preview   # serve the production build
```

To work on the journey on its own:

```bash
cd journey
npm install
npm run dev       # http://localhost:5173
```

## Folder layout

```
src/                 classic site (Astro)
  pages/index.astro  section order
  components/        Nav, Hero, ParallaxStack (Profiles already live), Journey3D teaser,
                     BuildTimeline, WhatYouGet, Founder, MediaProfile, Pricing, Faq, FinalCta, Footer
  data/site.ts       copy, prices, FAQ, contact links, client sites, founder
  styles/global.css  colours, type and all section styles
  scripts/           parallax, build-stage and timeline animations
public/              logo, icons and sample screenshots for the classic site
journey/             the 3D journey (its own Vite project)
  src/config/milestoneStops.js   journey copy, prices, FAQ, stop order, camera positions
  src/config/cameraSpline.js     camera feel (dwell, follow speed, framing)
  src/components/experience/     3D scenes
  src/components/overlay/        cards, progress rail, header, footer
  public/                        sample and stage videos
```

## Where to change things

- **Prices, FAQ, contact details:** update both `src/data/site.ts` and `journey/src/config/milestoneStops.js` so the two pages agree.
- **WhatsApp messages:** the classic site pre-fills "I saw your website…" and the journey pre-fills "I took the 3D journey…", so you can tell which page a lead came from.
- **Section order on the classic site:** `src/pages/index.astro`.

Visitors with reduced motion turned on see the classic site without the parallax movement. In the journey, visitors with reduced motion or without WebGL get a static timeline with the same content.
