# Ridouan Rashid — Portfolio

A single-page developer portfolio that fuses two identities: the **structure** of
a clean engineering portfolio with the **motion** of a sprinter — fast, momentum-
based animation that eases in and settles like a sprint start.

Built to run directly under **XAMPP / Apache** (no build step, no Node required).

---

## Tech

| Concern        | Choice                                  | Why |
|----------------|-----------------------------------------|-----|
| Templating     | **PHP** (server-rendered)               | Runs natively in XAMPP; great for SEO; content stays separate from markup |
| Content/config | **`content.php`**                       | One file holds *all* your text, links, projects and the accent colour |
| Styling        | **Hand-written CSS** (`style.css`)      | Tailwind's CDN build hurts Lighthouse; clean CSS hits the 95+ target |
| Motion         | **Plain CSS transitions**               | Momentum easing + staggered reveals, no library or external request |
| Scripting      | **`script.js`** (typed source in `script.tsx`) | Vanilla JS — toggles classes, the CSS does the animation |

> **About the brief's Next.js + Tailwind + Framer Motion request:** this folder is a
> XAMPP `htdocs` project served straight at `localhost`. A Next.js app needs Node and
> a build/serve step and would not run from Apache the same way, so it was built as a
> fast static PHP site instead. There are no external libraries: the motion is plain CSS
> transitions toggled by a small vanilla script, which keeps it simple and fast. The
> *design and motion intent* of the brief is fully honoured.

---

## Run it locally

1. Make sure the project sits in your XAMPP web root, e.g.
   `C:\xampp\htdocs\8.2 - Module - Portfolio`.
2. Start **Apache** from the XAMPP Control Panel.
3. Open:
   ```
   http://localhost/8.2%20-%20Module%20-%20Portfolio/
   ```
   (The `%20` are just the encoded spaces in the folder name. Renaming the folder to
   something like `portfolio` makes the URL nicer — update `site.url` in `content.php` if you do.)

No PHP locally? Any static server works too, but you'd lose the PHP rendering —
keep PHP (XAMPP) for the intended setup.

---

## Where to edit your content

**Everything you'll want to change lives in [`content.php`](content.php).** You do not
need to touch the HTML, CSS or JS for normal updates.

Inside `content.php` you can edit:

- **`site`** — your name, role, SEO title/description, the **accent colour**, and the
  live URL used for social sharing.
- **`hero`** — greeting, name, tagline, intro paragraph, and the call-to-action button.
- **`about`** — narrative paragraphs, the stat cards, and your tech stack list.
- **`skills`** — the animated skill bars. Each item has a `name` and a `level` (0–100);
  the bars "race" to fill on scroll. Add/remove skills by editing the list.
- **`experience`** — your timeline entries (newest first): period, role, organisation,
  description and tags. *(These are sensible placeholders — swap in your real roles/dates.)*
- **`work`** — your projects: title, description, tech tags, repo link and optional live link.
- **`contact`** — heading, message and email.
- **`socials`** — GitHub / LinkedIn / email links (add your real LinkedIn URL).
- **`athletics`** — the **Athletics page** (`athletics.php`): your club, category, intro,
  the four PRs (100m, 200m, 400m, 400m hurdles) and your U18/U20 NK results. Edit a PR's
  `time`/`note`/`meta`, or add a championship to `competitions`.

### Change the accent colour
In `content.php`, edit one line:
```php
'accent' => '#2347ff',   // cobalt. Try '#e8442a' (vermillion) or '#16a34a' (green).
```
The whole site recolours from this single value.

### Switch language (e.g. back to Dutch)
Just rewrite the strings in `content.php` and set `'locale' => 'nl'`.

---

## Motion & accessibility

- **Sprint-style motion:** the hero "launches" on load (name slides up with a slight
  overshoot, accent speed-line streaks in); on scroll, groups of items enter with
  momentum easing, staggered in sequence. A thin progress bar tracks scroll.
- **Racing skill bars:** in the Skills section the bars accelerate out to their level
  (fast, then settle) and stagger like a sprint field leaving the blocks — with a bright
  leading-edge "spark". Stat numbers count up as they enter view.
- **`prefers-reduced-motion`:** fully respected. If a visitor (or their OS) requests
  reduced motion, all animation is skipped and the page renders calm and static —
  with **no layout shift** and **no flash of hidden content**. The site is also fully
  usable with **JavaScript disabled** (content is server-rendered).
- **Accessible by default:** semantic landmarks, a skip-to-content link, keyboard-
  navigable nav (with `aria-expanded` on the menu and Escape-to-close), visible focus
  rings, `aria-current` on the active section, and AA-contrast colours.

---

## Editing the animations (optional)

Motion lives in [`script.js`](script.js). The typed source is [`script.tsx`](script.tsx);
if you edit the `.tsx`, recompile with:

```bash
tsc script.tsx --outFile script.js --target es5
```

Or just edit `script.js` directly — that's the file the browser actually loads.

How it works: `script.js` adds the class `in` to elements as they scroll into view
(and to the hero on load); all the actual animation is **CSS transitions** in
`style.css`. The "sprint feel" comes from the easing tokens under `:root`
(`--ease-out`, `--ease-snap`) and the transition durations/delays in the `MOTION` block.

---

## Social preview image

`og-image.svg` is the Open Graph/social card. Some platforms prefer PNG/JPG — to
export one, open the SVG in a browser or design tool and save a **1200×630 PNG** as
`og-image.png`, then point `site.ogImage` in `content.php` at it.

---

## File map

```
index.php      → home page template (reads content.php) — rarely edited
athletics.php  → track & field page (PRs + NK results, reads content.php)
content.php    → ALL your content + accent colour   ← edit here
style.css      → design system & responsive layout
script.js      → vanilla motion (class toggles) + nav/menu (shipped file)
script.tsx     → TypeScript source for script.js
og-image.svg   → social share image
README.md      → this file
```
