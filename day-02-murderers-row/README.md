# Day 02 — Murderers Row

**Live site:** [murderers-row.vercel.app](https://murderers-row.vercel.app/)

Placeholder site. Add your content in `src/data.js` and design in `src/styles.css` tomorrow.

---

## Review needed: overlay centering

**Full `src/styles.css` and `src/App.jsx` should be reviewed.** The card detail overlay is not centering correctly and remains at the bottom of the viewport instead of middle-middle.

- **Possible cause:** Parent or global CSS overriding the overlay layout (e.g. flex, height, or positioning on an ancestor).
- **Action:** Audit all overlay-related rules and any parent/global styles that might affect the overlay container or its flex centering. Remove redundant or counteracting CSS so the overlay (`.card-detail-overlay`) reliably centers its content in the viewport.

## Deploy to Vercel

1. In Vercel: **Add New Project** → Import your `black-history-month` GitHub repo (same repo as day-01).
2. **Root Directory:** Click Edit and set to `day-02-murderers-row`.
3. **Framework Preset:** Vite (auto-detected).
4. Deploy.

Your day-01 project uses the repo root and a root `vercel.json`. This day-02 project uses its own folder as the root—each Vercel project points at a different directory.

## Inspiration & Resources

- **CodePen (card layout):** [codepen.io/GabHrC/pen/KJKzmY](https://codepen.io/GabHrC/pen/KJKzmY)
- **Picsart:** [picsart.com/create](https://picsart.com/create)
- **JS Paint:** [jspaint.app](https://jspaint.app/#local:d93973fda51f4)
- **PineTools (crop image):** [pinetools.com/crop-image](https://pinetools.com/crop-image)
- **Topps 80s Sports Cards** — visual reference for the card design
- **Murderers' Row (boxing):** [Wikipedia](https://en.wikipedia.org/wiki/Murderers%27_Row_(boxing))
- **3D Hover Card:** [codepen.io/sumit_evince/pen/BaXyWgw](https://codepen.io/sumit_evince/pen/BaXyWgw)
- **Google Font — Courier Prime:** [fonts.google.com](https://fonts.google.com/?query=Courier+Prime)
