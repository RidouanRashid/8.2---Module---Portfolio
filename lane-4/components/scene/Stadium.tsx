"use client";

import { useCallback, useMemo } from "react";
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
  const people = ["#e8c9a0", "#d98a6a", "#e8e3d8", "#c25b4a", "#9fb3d8", "#e6b85c"];
  const rowH = 11;
  const seatW = 7;
  const gap = 3;
  for (let ry = 4; ry < h - rowH; ry += rowH) {
    ctx.fillStyle = "rgba(0,0,0,0.25)"; // step shadow
    ctx.fillRect(0, ry + rowH - 2, w, 2);
    for (let x = 3; x < w - seatW; x += seatW + gap) {
      ctx.fillStyle = seats[(Math.random() * seats.length) | 0];
      ctx.fillRect(x, ry, seatW, rowH - 3);
      if (Math.random() < 0.45) {
        ctx.fillStyle = people[(Math.random() * people.length) | 0];
        ctx.fillRect(x + 1, ry - 1, seatW - 2, rowH - 4);
      }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.repeat.set(60, 6); // many seat columns around, several tiers up
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

export function Stadium() {
  const crowd = useMemo(crowdTexture, []);
  const windows = useMemo(windowsTexture, []);
  const stands = useMemo(buildStands, []);

  // City skyline — a ring of instanced buildings out beyond the stands.
  const { count, matrices } = useMemo(() => {
    const n = 160;
    const m = new THREE.Matrix4();
    const out: THREE.Matrix4[] = [];
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const r = 150 + Math.random() * 240;
      const h = 14 + Math.random() * 80;
      const w = 8 + Math.random() * 18;
      const dpt = 8 + Math.random() * 18;
      m.compose(
        new THREE.Vector3(Math.cos(ang) * r, h / 2, Math.sin(ang) * r),
        new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 1, 0),
          Math.random() * Math.PI,
        ),
        new THREE.Vector3(w, h, dpt),
      );
      out.push(m.clone());
    }
    return { count: n, matrices: out };
  }, []);

  const cityRef = useCallback(
    (mesh: THREE.InstancedMesh | null) => {
      if (!mesh) return;
      matrices.forEach((mm, i) => mesh.setMatrixAt(i, mm));
      mesh.instanceMatrix.needsUpdate = true;
    },
    [matrices],
  );

  // Four floodlight towers at the corners.
  const HX = 84.39 / 2;
  const R = 36.8;
  const towers: [number, number][] = [
    [HX + 28, R + 34],
    [HX + 28, -(R + 34)],
    [-(HX + 28), R + 34],
    [-(HX + 28), -(R + 34)],
  ];

  return (
    <group>
      {/* seating bowl — tiered seats, lit by daylight */}
      <mesh geometry={stands}>
        <meshStandardMaterial map={crowd} side={THREE.DoubleSide} roughness={1} />
      </mesh>

      {/* city skyline ring — glass/concrete towers in daylight */}
      <instancedMesh ref={cityRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#5b647a"
          emissiveMap={windows}
          emissive="#9fb6d6"
          emissiveIntensity={0.25}
          roughness={0.7}
          metalness={0.1}
        />
      </instancedMesh>

      {/* floodlight towers (off in daylight) */}
      {towers.map(([x, z], i) => (
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
