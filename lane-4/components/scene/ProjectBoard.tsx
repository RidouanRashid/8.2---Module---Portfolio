"use client";

import { useMemo, useRef, useState } from "react";
import { Billboard } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { offsetPositionAt, TRACK_HALF_WIDTH } from "@/lib/trackCurve";
import { useRaceStore } from "@/lib/store";
import type { Project } from "@/data/types";

const CYAN = "#36e0ff";

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Bake the whole board onto a 2D canvas → texture. No DOM overlap, perfect
// alignment, and the entire plane becomes one clickable target.
function makeBoardTexture(project: Project): THREE.CanvasTexture {
  const W = 640;
  const H = 360;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#0b1020";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = CYAN;
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, W - 12, H - 12);

  ctx.textBaseline = "top";

  // distance tag
  ctx.fillStyle = CYAN;
  ctx.font = "600 22px monospace";
  ctx.fillText(`${project.distanceMeters} M`, 30, 26);

  // title (wrapped, up to 3 lines)
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 42px Arial, sans-serif";
  const maxW = W - 60;
  const lines: string[] = [];
  let line = "";
  for (const word of project.title.split(" ")) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  let y = 66;
  for (const ln of lines.slice(0, 3)) {
    ctx.fillText(ln, 30, y);
    y += 48;
  }

  // stack badges
  y += 10;
  ctx.font = "500 20px Arial, sans-serif";
  let x = 30;
  for (const s of project.stack.slice(0, 4)) {
    const bw = ctx.measureText(s).width + 28;
    if (x + bw > W - 30) break;
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, bw, 32, 16);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText(s, x + 14, y + 7);
    x += bw + 10;
  }

  // call to action
  ctx.fillStyle = CYAN;
  ctx.font = "700 22px Arial, sans-serif";
  ctx.fillText("TAP TO OPEN ▸", 30, H - 48);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function ProjectBoard({ project }: { project: Project }) {
  const openProject = useRaceStore((s) => s.openProject);
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);

  const texture = useMemo(() => makeBoardTexture(project), [project]);
  const pos = useMemo(
    () => offsetPositionAt(project.distanceMeters, TRACK_HALF_WIDTH + 2.4),
    [project.distanceMeters],
  );

  // Gentle hover pop.
  useFrame(() => {
    if (!group.current) return;
    const s = THREE.MathUtils.lerp(group.current.scale.x, hovered ? 1.06 : 1, 0.2);
    group.current.scale.setScalar(s);
  });

  const BW = 4.0;
  const BH = 2.25;

  return (
    <group position={[pos.x, 2.6, pos.z]}>
      <Billboard ref={group}>
        {/* hover glow behind */}
        <mesh position={[0, 0, -0.02]} visible={hovered}>
          <planeGeometry args={[BW + 0.2, BH + 0.2]} />
          <meshBasicMaterial color={CYAN} toneMapped={false} />
        </mesh>

        {/* the board — whole plane is the click target */}
        <mesh
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            openProject(project.id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
        >
          <planeGeometry args={[BW, BH]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </Billboard>

      {/* post down to the infield */}
      <mesh position={[0, -1.9, 0]}>
        <boxGeometry args={[0.08, 3.8, 0.08]} />
        <meshStandardMaterial color="#243047" />
      </mesh>
    </group>
  );
}
