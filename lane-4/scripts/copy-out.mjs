// Copies the static export (out/) into XAMPP's htdocs so Apache serves it at
// http://localhost/lane-4/ . Run via `npm run build:xampp`.
import { cp, rm, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");

// htdocs is two levels up:  htdocs/<this-project>/lane-4  →  htdocs
const target = path.resolve(root, "..", "..", "lane-4");

if (!existsSync(out)) {
  console.error("✗ No out/ folder — run `next build` first.");
  process.exit(1);
}

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(out, target, { recursive: true });

console.log("✓ Copied export → " + target);
console.log("  Open: http://localhost/lane-4/");
