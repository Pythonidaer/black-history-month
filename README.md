# Black History Month — 30 Days

One site per day for Black History Month. Built with **Vite** and **React**.

## Live websites

- **Day 1 — Fred Hampton:** [black-history-month-phi.vercel.app](https://black-history-month-phi.vercel.app/)
- Day 2 — *coming soon*
- Day 3 — *coming soon*
- …

## Structure

- **`template/`** — Copy this folder to create each new day (e.g. `day-03-figure-name/`). Replace `src/data.js` with the figure’s content.
- **`site-main/`** — Hub site: timeline and cards linking to each day. Add new entries to `src/data/figures.json` when you add a day.
- **`day-01-fred-hampton/`**, **`day-02-martin-luther-king/`**, … — One Vite + React app per day; each is self-contained.

## Run a site

Each app has its own dependencies. From the repo root:

```bash
# Hub (list of all days)
cd site-main && npm install && npm run dev

# Day 1 — Fred Hampton
cd day-01-fred-hampton && npm install && npm run dev

# Day 2 — Martin Luther King Jr.
cd day-02-martin-luther-king && npm install && npm run dev
```

Or from inside any of those folders: `npm install` then `npm run dev`.

## Add a new day

1. Copy `template/` to `day-NN-figure-name/` (e.g. `day-03-angela-davis/`).
2. Update `src/data.js` with the figure’s name, bio, quotes, timeline, and links.
3. Update `index.html` title if you like.
4. Add an entry to `site-main/src/data/figures.json` so the hub links to the new day.

## Build for production

From inside any app folder:

```bash
npm run build
```

Output goes to that app’s `dist/` folder.

## Useful links

- **Image resizer:** [imresizer.com](https://imresizer.com/download)
- **React vertical timeline:** [react-vertical-timeline demo](https://stephane-monnot.github.io/react-vertical-timeline/#/demo)
- **Favicon converter:** [favicon.io](https://favicon.io/favicon-converter/)
- **Resize image (Pinetools):** [pinetools.com](https://pinetools.com/resize-image)
- **React Icons:** [react-icons search](https://react-icons.github.io/react-icons/search/#q=left%20arrow)
