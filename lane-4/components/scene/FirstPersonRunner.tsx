"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRaceStore } from "@/lib/store";
import { offsetPositionAt, curvatureSign, TOTAL, LANE_OFFSET } from "@/lib/trackCurve";
import { hurdles } from "@/data/hurdles";

const EYE = 1.55; // running eye height (m)
const target = new THREE.Vector3();
const base = new THREE.Vector3();
const ahead = new THREE.Vector3();

// The heart of Lane 4: scroll distance → a point + heading on the 400m oval,
// plus a running gait, hurdle jumps, bend lean and the finish dip — all as
// additive offsets on top of the path-following camera.
export default function FirstPersonRunner() {
  const { camera } = useThree();

  useFrame((state) => {
    const s = useRaceStore.getState();
    const reduced = s.reduced;
    const t = state.clock.elapsedTime;
    const distance = s.distance;
    const run = Math.min(distance, TOTAL);
    const speed = reduced ? 0 : s.speed;

    // Run centred in lane 4 (offset from the track centre line).
    offsetPositionAt(run, LANE_OFFSET, base);

    // Crouched in the blocks at 0m, rising to eye height by ~10m.
    const rise = THREE.MathUtils.smoothstep(run, 0, 10);
    let y = THREE.MathUtils.lerp(0.85, EYE, rise);

    // Running gait — vertical bob + micro-roll, scaled by scroll speed.
    const bob = reduced ? 0 : Math.sin(t * 11) * 0.05 * speed;
    const rollGait = reduced ? 0 : Math.sin(t * 5.5) * 0.02 * speed;
    y += bob;

    // Hurdle jump beat: arc up as we cross each mark.
    let jump = 0;
    if (!reduced) {
      for (const h of hurdles) {
        const start = h.distanceMeters - 4;
        const end = h.distanceMeters + 2.5;
        if (run > start && run < end) {
          const phase = (run - start) / (end - start);
          jump = Math.sin(phase * Math.PI) * 0.55; // up to ~0.55m
          break;
        }
      }
    }
    y += jump;

    // Finish lean/dip at the tape (~395→400m).
    let pitch = jump * 0.25; // look slightly up while airborne
    if (distance > 395) {
      const lean = THREE.MathUtils.smoothstep(distance, 395, 400);
      pitch -= lean * 0.35; // dip the head into the lean
      y -= lean * 0.22;
    }

    // Look at a point a few metres AHEAD in the same lane (not just the
    // instantaneous tangent) so the track stays centred through the bends.
    offsetPositionAt(run + 9, LANE_OFFSET, ahead);
    camera.position.set(base.x, y, base.z);
    target.set(ahead.x, y + pitch, ahead.z);
    camera.lookAt(target);

    // Inward lean through the bend + the gait roll (about the view axis).
    const bendLean = reduced ? 0 : curvatureSign(run) * 0.06 * (0.4 + speed);
    camera.rotateZ(rollGait + bendLean);
  });

  return null;
}
