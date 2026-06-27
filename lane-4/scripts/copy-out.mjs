// Deploys the static export (out/) straight INTO the module folder
// "8.2 - Module - Portfolio" so Apache serves the track portfolio at
//   http://localhost/8.2%20-%20Module%20-%20Portfolio/
// It removes the old PHP portfolio files and any previous build artifacts, but
// NEVER touches the lane-4/ source or .git/. Run via `npm run build:xampp`.
import { cp, rm, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."); // lane-4/
const out = path.join(root, "out");
const moduleDir = path.resolve(root, ".."); // 8.2 - Module - Portfolio/

if (!existsSync(out)) {
  console.error("✗ No out/ folder — run `next build` first.");
  process.exit(1);
}

// Things we must never delete, even by accident.
const PROTECT = new Set(["lane-4", ".git", "node_modules", "scripts"]);

// 1) Remove the old PHP portfolio (the "original code" being replaced).
const phpFiles = [
  "index.php", "content.php", "athletics.php",
  "style.css", "script.js", "script.tsx", "og-image.svg", "README.md",
];
for (const f of phpFiles) await rm(path.join(moduleDir, f), { force: true });

// 2) Remove previous build artifacts so stale chunks don't linger.
for (const d of ["_next", "_not-found", "404"]) {
  await rm(path.join(moduleDir, d), { recursive: true, force: true });
}

// 3) Copy every entry from out/ into the module folder root.
for (const entry of await readdir(out)) {
  if (PROTECT.has(entry)) continue; // safety net (out never contains these)
  await cp(path.join(out, entry), path.join(moduleDir, entry), { recursive: true });
}

console.log("✓ Deployed export → " + moduleDir);
console.log("  Open: http://localhost/8.2%20-%20Module%20-%20Portfolio/");
