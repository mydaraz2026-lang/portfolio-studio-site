# Portfolio Studio — landing page

The live site at **portfoliostudiocv.netlify.app**: a scroll-driven 3D camera journey. Scrolling moves the camera along a curved path (the *camera spline*) through 13 *milestone stops*. Each stop pairs a 3D scene with a readable HTML card (the *overlay panel*).

Built with React 19, React Three Fiber / Three.js, Tailwind CSS v4 and Vite. Netlify builds it automatically from `main`: `npm run build` → `dist/`, Node 22 (see `netlify.toml`).

## Run it locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## The journey

| Stop | Scene |
|---|---|
| Start | Gateway the camera flies through |
| Samples | Three client sites on floating screens |
| MH Chowdhury · SM Atiqur Rahman · Tausif Karim | Camera dives into each screen; the site recording scrolls |
| Day 0 | Sample CV: six results highlighted, then a before → after rewrite |
| Days 1–2 | Rising metric bars |
| Days 3–5 | Desktop + phone build (Day 3 hero, Day 4 impact, Day 5 contact + phone view) |
| Days 6–7 | Launch beacon |
| Pricing | Crystal — BDT 25,000 / $400 USD |
| Media & Guest Profile | Mehdi's 7-page guest profile scrolling on a display |
| FAQ | Speech bubbles |
| Get started | Node network that resolves into the Portfolio Studio logo |

Visitors with reduced motion turned on, or without WebGL, get a static timeline with the same content. The header has a 3D/static toggle.

## Where to change things

- **Copy, prices, FAQ, contact, stop order, camera positions:** `src/config/milestoneStops.js`
- **Colours:** `src/config/theme.js` (drives both the 3D scene and the Tailwind classes)
- **Camera feel** (dwell at stops, follow speed, framing, lens): `src/config/cameraSpline.js`
- **3D scenes:** `src/components/experience/monuments/`
- **Cards, progress rail, header:** `src/components/overlay/`
- **Static fallback:** `src/components/fallback/`

### Media files (`public/`)

- `samples/*.mp4|jpg` — client site recordings (cropped, 2× speed) and posters
- `stages/audit.*`, `stages/monitor.*`, `stages/phone.*` — Day 0 and Days 3–5 animations
- `stages/guest-profile.*` — guest profile reading-view scroll and cover
- `logo/ps-logo-emblem.png` — transparent logo used at Get started

Videos load only when a visitor approaches their stop, start from the beginning on arrival, and pause when the visitor moves on. To swap a client recording, replace the matching `samples/*.mp4` (946 × 350 crop of the page area works with the current screens) and its poster `.jpg`.
