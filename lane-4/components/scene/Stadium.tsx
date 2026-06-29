"use client";

import { useCallback } from "react";
import * as THREE from "three";
import { pose2D, TOTAL, TRACK_HALF_WIDTH } from "@/lib/trackCurve";

// ── procedural textures ──────────────────────────────────────────────
// Tiered stadium seating — rows of blue seats, partly filled with spectators.
function crowdTexture(): THREE.Texture {
  const w = 256;
  const h = 256;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#171c26"; // concrete steps
  ctx.fillRect(0, 0, w, h);

  const seats = ["#2c4a86", "#274080", "#33539a"];
  // bright, varied clothing so the crowd reads clearly from the track
  const people = [
    "#f1d6b0", "#e89a76", "#ffffff", "#e23b2f", "#ffd23a", "#3fa9ff",
    "#9fe36b", "#ff7fb0", "#f3ede0", "#b98cff", "#ff9d3a", "#c9d2dc",
  ];
  const rowH = 11;
  const seatW = 7;
  const gap = 2;
  for (let ry = 4; ry < h - rowH; ry += rowH) {
    ctx.fillStyle = "rgba(0,0,0,0.22)"; // step shadow
    ctx.fillRect(0, ry + rowH - 2, w, 2);
    for (let x = 2; x < w - seatW; x += seatW + gap) {
      ctx.fillStyle = seats[(Math.random() * seats.length) | 0];
      ctx.fillRect(x, ry, seatW, rowH - 3);
      // ~78% of seats occupied — head dot + body block so it reads as a person
      if (Math.random() < 0.78) {
        const col = people[(Math.random() * people.length) | 0];
        ctx.fillStyle = col;
        ctx.fillRect(x, ry, seatW, rowH - 3); // torso fills the seat
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.fillRect(x, ry + rowH - 5, seatW, 2); // lap shadow
        ctx.fillStyle = "#d9b48f"; // head
        ctx.fillRect(x + 2, ry - 1, seatW - 4, 3);
      }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.repeat.set(44, 5); // seat columns around the ring × tiers up
  return t;
}

function windowsTexture(): THREE.Texture {
  const w = 64;
  const h = 128;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#070a14";
  ctx.fillRect(0, 0, w, h);
  const cols = ["#ffd98a", "#fff1c2", "#9fd0ff", "#ffe9a8"];
  for (let yy = 6; yy < h - 6; yy += 10) {
    for (let xx = 6; xx < w - 6; xx += 10) {
      if (Math.random() < 0.4) {
        ctx.fillStyle = cols[(Math.random() * cols.length) | 0];
        ctx.globalAlpha = 0.55 + Math.random() * 0.45;
        ctx.fillRect(xx, yy, 5, 6);
      }
    }
  }
  ctx.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.repeat.set(2, 4);
  return t;
}

// A banked seating bowl that rings the oval (offset outward from the track).
function buildStands(): THREE.BufferGeometry {
  const samples = 240;
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  const offBottom = TRACK_HALF_WIDTH + 7;
  const offTop = TRACK_HALF_WIDTH + 30;
  const yBottom = 0.6;
  const yTop = 16;

  for (let i = 0; i <= samples; i++) {
    const d = (i / samples) * TOTAL;
    const p = pose2D(d);
    let ox = -p.tz; // left-hand perpendicular
    let oz = p.tx;
    // make it point OUTWARD (away from the infield/origin)
    if (ox * -p.x + oz * -p.z > 0) {
      ox = -ox;
      oz = -oz;
    }
    pos.push(p.x + ox * offBottom, yBottom, p.z + oz * offBottom);
    pos.push(p.x + ox * offTop, yTop, p.z + oz * offTop);
    const u = (i / samples) * 46;
    uv.push(u, 0, u, 1);
  }
  for (let i = 0; i < samples; i++) {
    const k = i * 2;
    idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

// The stadium is fully static, so build it ONCE at module load (this module is
// client-only) — keeps the procedural Math.random out of React's render pass.
const CROWD_TEX = crowdTexture();
const WINDOW_TEX = windowsTexture();
const STANDS_GEO = buildStands();

const CITY_MATRICES: THREE.Matrix4[] = (() => {
  const m = new THREE.Matrix4();
  const out: THREE.Matrix4[] = [];
  for (let i = 0; i < 90; i++) {
    const ang = Math.random() * Math.PI * 2;
    const r = 140 + Math.random() * 180;
    const h = 14 + Math.random() * 80;
    const w = 8 + Math.random() * 18;
    const dpt = 8 + Math.random() * 18;
    m.compose(
      new THREE.Vector3(Math.cos(ang) * r, h / 2, Math.sin(ang) * r),
      new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.random() * Math.PI),
      new THREE.Vector3(w, h, dpt),
    );
    out.push(m.clone());
  }
  return out;
})();

// Four floodlight towers at the corners.
const HX = 84.39 / 2;
const R = 36.8;
const TOWERS: [number, number][] = [
  [HX + 28, R + 34],
  [HX + 28, -(R + 34)],
  [-(HX + 28), R + 34],
  [-(HX + 28), -(R + 34)],
];

export function Stadium() {
  const cityRef = useCallback((mesh: THREE.InstancedMesh | null) => {
    if (!mesh) return;
    CITY_MATRICES.forEach((mm, i) => mesh.setMatrixAt(i, mm));
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      {/* seating bowl — tiered seats, lit by daylight */}
      <mesh geometry={STANDS_GEO}>
        <meshStandardMaterial map={CROWD_TEX} side={THREE.DoubleSide} roughness={1} />
      </mesh>

      {/* city skyline ring — glass/concrete towers in daylight */}
      <instancedMesh ref={cityRef} args={[undefined, undefined, CITY_MATRICES.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#5b647a"
          emissiveMap={WINDOW_TEX}
          emissive="#9fb6d6"
          emissiveIntensity={0.25}
          roughness={0.7}
          metalness={0.1}
        />
      </instancedMesh>

      {/* floodlight towers (off in daylight) */}
      {TOWERS.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 15, 0]}>
            <boxGeometry args={[0.9, 30, 0.9]} />
            <meshStandardMaterial color="#3a424f" metalness={0.3} roughness={0.6} />
          </mesh>
          <mesh position={[0, 30.5, 0]}>
            <boxGeometry args={[7, 3.4, 1]} />
            <meshStandardMaterial
              color="#dfe5ee"
              emissive="#fff7e0"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
