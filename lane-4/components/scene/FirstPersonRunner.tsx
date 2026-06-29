"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRaceStore } from "@/lib/store";
import { offsetPositionAt, curvatureSign, TOTAL, LANE_OFFSET } from "@/lib/trackCurve";
import { hurdles } from "@/data/hurdles";

const EYE = 1.55; // running eye height (m)
const target = new THREE.Vector3();
const base = new THREE.Vector3();
const ahead = new THREE.Vector3();
const fwd = new THREE.Vector3();
const racePos = new THREE.Vector3();
const raceTarget = new THREE.Vector3();

// Overhead "all projects" camera — high and near-top-down over the infield, so
// the documents (laid out along the track's length) are read mostly from above.
const OVERHEAD_POS = new THREE.Vector3(0, 22, 4);
const OVERHEAD_TARGET = new THREE.Vector3(0, 0, 0);

// The heart of Lane 2: scroll distance → a point + heading on the 400m oval,
// plus a running gait, hurdle jumps, bend lean and finish dip — and a smooth
// blend UP to an overhead view of the infield when "all projects" is open.
export default function FirstPersonRunner() {
  const { camera } = useThree();
  const workT = useRef(0); // 0 = running view, 1 = overhead docs view

  useFrame((state, delta) => {
    const s = useRaceStore.getState();
    const reduced = s.reduced;
    const t = state.clock.elapsedTime;
    const distance = s.distance;
    const run = Math.min(distance, TOTAL);
    const speed = reduced ? 0 : s.speed;

    offsetPositionAt(run, LANE_OFFSET, base);
    offsetPositionAt(run + 9, LANE_OFFSET, ahead);

    // ── compute the "race" camera pose (1st- or 3rd-person) ──
    let roll = 0;
    if (s.thirdPerson) {
      fwd.set(ahead.x - base.x, 0, ahead.z - base.z).normalize();
      racePos.set(base.x - fwd.x * 7, 3.4, base.z - fwd.z * 7);
      raceTarget.set(base.x + fwd.x * 5, 1.2, base.z + fwd.z * 5);
    } else {
      const rise = THREE.MathUtils.smoothstep(run, 0, 10);
      let y = THREE.MathUtils.lerp(0.85, EYE, rise);

      const bob = reduced ? 0 : Math.sin(t * 11) * 0.05 * speed;
      const rollGait = reduced ? 0 : Math.sin(t * 5.5) * 0.02 * speed;
      y += bob;

      let jump = 0;
      if (!reduced) {
        for (const h of hurdles) {
          const start = h.distanceMeters - 4;
          const end = h.distanceMeters + 2.5;
          if (run > start && run < end) {
            jump = Math.sin(((run - start) / (end - start)) * Math.PI) * 0.55;
            break;
          }
        }
      }
      y += jump;

      let pitch = jump * 0.25;
      if (distance > 395) {
        const lean = THREE.MathUtils.smoothstep(distance, 395, 400);
        pitch -= lean * 0.35;
        y -= lean * 0.22;
      }

      racePos.set(base.x, y, base.z);
      raceTarget.set(ahead.x, y + pitch, ahead.z);
      roll = rollGait + (reduced ? 0 : curvatureSign(run) * 0.06 * (0.4 + speed));
    }

    // ── blend toward the overhead docs view ──
    workT.current = THREE.MathUtils.damp(workT.current, s.viewWork ? 1 : 0, 4, delta);
    const wt = workT.current;
    camera.up.set(0, 1, 0);

    if (wt < 0.001) {
      camera.position.copy(racePos);
      target.copy(raceTarget);
      camera.lookAt(target);
      if (roll) camera.rotateZ(roll);
      return;
    }

    const e = wt * wt * (3 - 2 * wt); // smoothstep ease
    camera.position.lerpVectors(racePos, OVERHEAD_POS, e);
    target.lerpVectors(raceTarget, OVERHEAD_TARGET, e);
    camera.lookAt(target);
    if (roll) camera.rotateZ(roll * (1 - e));
  });

  return null;
}
