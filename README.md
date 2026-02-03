# Black History Month — 30 Days

One site per day for Black History Month. Built with **Vite** and **React**.

## Live websites

- **Day 1 — Fred Hampton:** [black-history-month-phi.vercel.app](https://black-history-month-phi.vercel.app/)
- **Day 2 — Murderers Row:** [murderers-row.vercel.app](https://murderers-row.vercel.app/)
- **Day 3 — Nina Simone:** *Add Vercel URL after deploying*
- …

## Structure

- **`template/`** — Copy this folder to create each new day (e.g. `day-03-figure-name/`). Replace `src/data.js` with the figure's content.
- **`site-main/`** — Hub site: timeline and cards linking to each day. Add new entries to `src/data/figures.json` when you add a day.
- **`day-01-fred-hampton/`**, **`day-02-murderers-row/`**, **`day-03-nina-simone/`**, … — One Vite + React app per day; each is self-contained.

## Vercel deployment (monorepo subfolders)

Each day is a **separate Vercel project** from the same repo. Here's how we got it working.

### The problem

- Vercel's Root Directory dropdown sometimes only shows the repo root and won't let you pick subfolders.
- With a root `package.json`, Vercel defaults to the repo root; build commands need to target the right folder.

### Day 01 (deploys from repo root)

Day 01 could not use a subfolder as Root Directory, so we use the repo root with a root `vercel.json`:

```json
{
  "installCommand": "cd day-01-fred-hampton && npm install",
  "buildCommand": "cd day-01-fred-hampton && npm run build",
  "outputDirectory": "day-01-fred-hampton/dist",
  "framework": "vite"
}
```

- Root Directory: `./` (repo root)
- Vercel reads this config and runs install/build in the subfolder.

### Days 02+ (deploy from subfolder)

For each new day, create a **new Vercel project** and set Root Directory to the day's folder (e.g. `day-02-murderers-row`). Each day folder has its own `vercel.json`:

```json
{
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

- Root Directory: `day-NN-folder-name` (type the path if it's not in the dropdown)
- The `installCommand` override is required — otherwise Vercel inherits the root `vercel.json` and runs `cd day-01-fred-hampton && npm install`, which fails when the project root is day-02 or day-03.

### Steps to deploy a new day (02+)

1. **Add New Project** → Import your `black-history-month` GitHub repo.
2. **Root Directory:** Edit and set to `day-NN-folder-name` (e.g. `day-03-nina-simone`).
3. **Framework:** Vite (auto-detected).
4. Deploy.

If the build fails with `day-01-fred-hampton` in the error, the project is still inheriting the root config. Ensure the day folder has its own `vercel.json` with explicit `installCommand`, `buildCommand`, and `outputDirectory`.

## Run a site

Each app has its own dependencies. From the repo root:

```bash
# Hub (list of all days)
cd site-main && npm install && npm run dev

# Day 1 — Fred Hampton
cd day-01-fred-hampton && npm install && npm run dev

# Day 2 — Murderers Row
cd day-02-murderers-row && npm install && npm run dev

# Day 3 — Nina Simone
cd day-03-nina-simone && npm install && npm run dev
```

Or from inside any of those folders: `npm install` then `npm run dev`.

## Add a new day

1. Copy `template/` to `day-NN-figure-name/` (e.g. `day-03-angela-davis/`).
2. Update `src/data.js` with the figure's name, bio, quotes, timeline, and links.
3. Update `index.html` title if you like.
4. Add an entry to `site-main/src/data/figures.json` so the hub links to the new day.

## Build for production

From inside any app folder:

```bash
npm run build
```

Output goes to that app's `dist/` folder.

## Useful links

- **Image resizer:** [imresizer.com](https://imresizer.com/download)
- **React vertical timeline:** [react-vertical-timeline demo](https://stephane-monnot.github.io/react-vertical-timeline/#/demo)
- **Favicon converter:** [favicon.io](https://favicon.io/favicon-converter/)
- **Resize image (Pinetools):** [pinetools.com](https://pinetools.com/resize-image)
- **React Icons:** [react-icons search](https://react-icons.github.io/react-icons/search/#q=left%20arrow)
