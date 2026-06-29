# Lane 2 — a first-person 400m hurdles developer portfolio

Run a 400m hurdles race through the athlete's own eyes. Scroll = distance
(0 → 400m). Projects line the track as boards, each hurdle is a skill "cleared",
the bend genuinely turns the view, and crossing the finish line reveals the
developer **as an athlete** — the human behind the code.

Built with **Next.js (App Router) + TypeScript + Tailwind v4 + React Three Fiber**.

> This lives in `lane-4/` and is a **separate Vercel/Node app** from the PHP
> portfolio in the parent folder — it has nothing to do with XAMPP.

---

## Run it

```bash
cd lane-4
npm install      # already done if you're reading this
npm run dev      # http://localhost:3000
npm run build    # production build (passes clean)
```

## Where to edit content — `/data`

Everything is data-driven. You don't touch the scene code to update content:

- **`data/projects.ts`** — the trackside boards. Each has a `distanceMeters`
  (where on the 400m track it appears — keep them *between* hurdle marks),
  `title`, `blurb`, `stack[]`, optional `codeSnippet`/`image`, and `links`.
- **`data/hurdles.ts`** — the 10 hurdles at the official marks
  `45, 80, 115, 150, 185, 220, 255, 290, 325, 360`, each with a skill `label`.
  `HURDLE_HEIGHT` is men's 0.914m (`// TODO: confirm` — 0.762 for women's).
- **`data/athlete.ts`** — the finish reveal: name, lane, club, category, events,
  `pbs[]`, `achievements[]`, `bio`, `photos[]`, `socials[]`.

Seeded with real data: projects from **github.com/RidouanRashid**, and the
athlete profile from **atletiek.nu / AAV'36** (Men U20 — 100m 11.79, 200m 24.06,
400m 52.00, 400mH 56.12; NK Indoor U20 8th; NK U18 400mH PR).

### Still to confirm (search for `TODO`)
- The Lane 2 repo URL (`data/projects.ts`) and your LinkedIn (`data/athlete.ts`).
- Add photos to `/public` and list them in `athlete.photos`.
- Men's vs women's hurdle height.

---

## How it works

- **`lib/trackCurve.ts`** — the 400m oval as an analytic path (two 84.39m
  straights + two π·36.8m bends = 400.00m). `pose2D(distance)` returns a point +
  heading; helpers place boards/lines/hurdles by distance.
- **`lib/store.ts` (zustand)** — single source of truth shared across the
  Canvas/DOM boundary: `progress`, `velocity`, normalised `speed`, `distance`,
  reduced-motion, and the open project.
- **`components/ScrollProvider.tsx`** — a **Lenis** smooth-scroll instance feeds
  progress + velocity into the store each frame, and pauses the run while a
  modal is open.
- **`components/scene/FirstPersonRunner.tsx`** — the heart: scroll `distance` →
  camera position + `lookAt` along the curve, plus velocity-scaled gait bob/roll,
  hurdle jump arcs, inward bend lean, and the finish dip.
- **`components/scene/*`** — `Track` (generated ribbon geometry + lane lines),
  `Hurdle`, `ProjectBoard` (billboarded, click-to-open), `Effects`
  (bloom/vignette/velocity-scaled chromatic aberration).
- **`components/ui/*`** — `Hud`, `Startline`, `ProjectModal` (framer-motion),
  `FinishReveal` (the scoreboard).
- **`components/fallback/TwoDPortfolio.tsx`** — a plain vertical-scroll version
  for **no-WebGL** devices, with the same projects + athlete reveal.

### Accessibility & fallbacks
- `prefers-reduced-motion`: the gait, blur and jumps are killed — a calm linear
  traversal.
- No-WebGL: auto-routes to the 2D portfolio.
- All project + athlete copy is also rendered as screen-reader text
  (`AccessibleContent` in `AppRoot`), so the 3D run is the wrapper, not the only
  way to read it.

---

## Deploy to Vercel

```bash
# from lane-4/
npx vercel        # or push to GitHub and "Import Project" on vercel.com
```
Set the **Root Directory** to `lane-4` if the repo also contains the PHP site.
No env vars required.

---

## Known limitations / next polish (honest notes)
- **Visual feel needs local iteration.** The math, mechanics and choreography
  are wired and the build is clean, but lighting, exact lean/jump amounts and
  the art direction are tuned by eye — run `npm run dev` and adjust the
  constants in `FirstPersonRunner.tsx` / `Effects.tsx` / `Track.tsx`.
- **Motion blur is approximated** (chromatic aberration + speed cues) — true
  per-pixel motion blur needs a velocity buffer. `// TODO`.
- Bend-lean sign and pacing (`SCROLL_VH` in `AppRoot.tsx`, `speed` divisor in
  `store.ts`) are the first knobs to taste.
- Project screenshots/`image` and athlete photos aren't wired into the visuals
  yet (data fields exist).
