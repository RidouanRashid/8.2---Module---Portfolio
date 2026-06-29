"use client";

import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useRaceStore } from "@/lib/store";
import { work, type WorkItem } from "@/data/work";

const CYAN = "#36e0ff";
const COLS = 5; // spread along the track's length (the X axis)
const CW = 7.5; // card width  (x) — portrait, so taller than wide
const CH = 11; // card depth  (z)
const GAP = 3;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const out: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      out.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) out.push(line);
  return out;
}

// Bake a "document" onto a canvas → texture (built once per item at module load).
function makeDocTexture(w: WorkItem): THREE.CanvasTexture {
  const W = 600; // portrait document
  const H = 880;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  const PAD = 44;

  ctx.fillStyle = "#0b1020";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = CYAN;
  ctx.lineWidth = 9;
  ctx.strokeRect(9, 9, W - 18, H - 18);
  ctx.textBaseline = "top";

  // year · language
  ctx.fillStyle = CYAN;
  ctx.font = "600 30px monospace";
  ctx.fillText(`${w.year} · ${w.language}`, PAD, 48);

  // title
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 56px Arial, sans-serif";
  let y = 104;
  for (const ln of wrap(ctx, w.title, W - 2 * PAD).slice(0, 3)) {
    ctx.fillText(ln, PAD, y);
    y += 64;
  }

  // blurb
  ctx.fillStyle = "rgba(255,255,255,0.74)";
  ctx.font = "400 31px Arial, sans-serif";
  y += 16;
  for (const ln of wrap(ctx, w.blurb, W - 2 * PAD).slice(0, 9)) {
    ctx.fillText(ln, PAD, y);
    y += 42;
  }

  // stack badges — wrap onto rows, sitting above the footer
  ctx.font = "500 28px Arial, sans-serif";
  let bx = PAD;
  let byy = H - 168;
  for (const s of w.stack.slice(0, 6)) {
    const bw = ctx.measureText(s).width + 32;
    if (bx + bw > W - PAD) {
      bx = PAD;
      byy += 50;
    }
    if (byy > H - 96) break;
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, bx, byy, bw, 42, 21);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText(s, bx + 16, byy + 8);
    bx += bw + 12;
  }

  // footer
  ctx.fillStyle = CYAN;
  ctx.font = "700 28px Arial, sans-serif";
  ctx.fillText("Source ↗  github.com/RidouanRashid", PAD, H - 60);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// All textures + grid positions, computed once. Rows run along X (the length of
// the track); each row is centred so a short last row doesn't sit lopsided.
const ROWS = Math.ceil(work.length / COLS);
const TOTAL_D = ROWS * CH + (ROWS - 1) * GAP;
const DOCS = work.map((w, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const inRow = Math.min(COLS, work.length - row * COLS);
  const rowW = inRow * CW + (inRow - 1) * GAP;
  return {
    item: w,
    texture: makeDocTexture(w),
    x: -rowW / 2 + CW / 2 + col * (CW + GAP),
    z: -TOTAL_D / 2 + CH / 2 + row * (CH + GAP),
  };
});

// The projects laid flat on the infield grass, shown only in the overhead
// "all projects" view. Click a document to open its GitHub repo.
export function WorkField() {
  const viewWork = useRaceStore((s) => s.viewWork);
  if (!viewWork) return null;

  return (
    <group position={[0, 0.15, 0]}>
      {DOCS.map(({ item, texture, x, z }) => (
        <mesh
          key={item.title}
          position={[x, 0, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            if (item.repo) window.open(item.repo, "_blank", "noopener");
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          <planeGeometry args={[CW, CH]} />
          <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}
