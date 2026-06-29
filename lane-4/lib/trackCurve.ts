import * as THREE from "three";

/* ════════════════════════════════════════════════════════════════════════
   The 400m oval, parameterised by DISTANCE (metres), not by an abstract t.
   Two straights + two semicircular bends, laid flat in the X/Z plane (y up).

   Lengths are tuned so the total path is exactly 400.00 m:
     2 × straight + 2 × (π × radius) = 2×84.39 + 2×(π×36.8) ≈ 400
   Treat as stylization-friendly guides, not survey-grade.
   ════════════════════════════════════════════════════════════════════════ */

export const STRAIGHT = 84.39;
export const RADIUS = 36.8;
export const BEND = Math.PI * RADIUS; // ≈ 115.61
export const TOTAL = 2 * STRAIGHT + 2 * BEND; // ≈ 400.00

const HX = STRAIGHT / 2; // half a straight
const SEG = [STRAIGHT, BEND, STRAIGHT, BEND];
const CUM = [SEG[0], SEG[0] + SEG[1], SEG[0] + SEG[1] + SEG[2], TOTAL];

// Where 0m (the start) sits on the oval. = one straight in, so the race begins
// entering the first bend and finishes coming off the home straight — like a
// real 400m. The 10th hurdle (360m) then lands on the home straight run-in.
const START_OFFSET = STRAIGHT;

export type Pose2D = { x: number; z: number; tx: number; tz: number };

// Pose on the *centre line* of the lane at a given distance (clamped to 0..TOTAL).
// Returns position (x,z) and a unit tangent/heading (tx,tz).
export function pose2D(d: number): Pose2D {
  const clamped = Math.max(0, Math.min(d, TOTAL));
  const s = (clamped + START_OFFSET) % TOTAL; // race distance → oval distance
  let x: number, z: number, tx: number, tz: number;

  // 1) bottom straight: (-HX,-R) → (+HX,-R), heading +x
  if (s <= CUM[0]) {
    x = -HX + s; z = -RADIUS; tx = 1; tz = 0;
  }
  // 2) right bend: centre (+HX,0), θ from -π/2 → +π/2
  else if (s <= CUM[1]) {
    const theta = -Math.PI / 2 + (s - CUM[0]) / RADIUS;
    x = HX + RADIUS * Math.cos(theta);
    z = RADIUS * Math.sin(theta);
    tx = -Math.sin(theta);
    tz = Math.cos(theta);
  }
  // 3) top straight: (+HX,+R) → (-HX,+R), heading -x
  else if (s <= CUM[2]) {
    x = HX - (s - CUM[1]); z = RADIUS; tx = -1; tz = 0;
  }
  // 4) left bend: centre (-HX,0), θ from +π/2 → +3π/2
  else {
    const theta = Math.PI / 2 + (s - CUM[2]) / RADIUS;
    x = -HX + RADIUS * Math.cos(theta);
    z = RADIUS * Math.sin(theta);
    tx = -Math.sin(theta);
    tz = Math.cos(theta);
  }

  // Reflect across the x-axis so the runner travels counter-clockwise — the
  // correct racing direction — without moving where the hurdles/boards sit.
  return { x, z: -z, tx, tz: -tz };
}

// Convenience: fill a THREE.Vector3 with the ground position at distance d.
export function positionAt(d: number, out = new THREE.Vector3()): THREE.Vector3 {
  const p = pose2D(d);
  return out.set(p.x, 0, p.z);
}

// Heading angle (radians) of the runner at distance d — useful for orienting
// trackside objects (hurdles, boards) across the lane.
export function headingAt(d: number): number {
  const p = pose2D(d);
  return Math.atan2(p.tx, p.tz);
}

// A position offset sideways from the centre line. `lateral` > 0 = toward the
// infield (inside rail); < 0 = toward the outside. Used to place boards/lines.
export function offsetPositionAt(
  d: number,
  lateral: number,
  out = new THREE.Vector3(),
): THREE.Vector3 {
  const p = pose2D(d);
  // Left-hand perpendicular to the heading (rotate tangent +90° about y).
  let px = -p.tz;
  let pz = p.tx;
  // Make +lateral point toward the track centre (origin) = the infield side.
  const toCentre = px * -p.x + pz * -p.z; // dot(perp, origin - pos)
  if (toCentre < 0) {
    px = -px;
    pz = -pz;
  }
  return out.set(p.x + px * lateral, 0, p.z + pz * lateral);
}

// Signed curvature direction at d: -1 on a left-turning bend, +1 on a
// right-turning bend, ~0 on the straights. Drives the inward camera lean.
export function curvatureSign(d: number): number {
  const s = (Math.max(0, Math.min(d, TOTAL)) + START_OFFSET) % TOTAL;
  // Signs match the reflected (counter-clockwise) path so the lean stays inward.
  if (s > CUM[0] && s <= CUM[1]) return -1;
  if (s > CUM[2]) return 1;
  return 0; // straights
}

// Standard track lane width (m). 8 lanes ≈ 9.76 m total.
export const LANE_WIDTH = 1.22;
export const N_LANES = 8;
export const TRACK_HALF_WIDTH = (LANE_WIDTH * N_LANES) / 2;

// Lateral offset of any lane's centre from the track centre line. The centre
// line lies between the two middle lanes, so the offset is half a lane plus a
// whole lane per step; lower lane numbers are toward the infield (more positive),
// higher lanes toward the outside.
export function laneOffset(lane: number): number {
  return LANE_WIDTH / 2 + (4 - lane) * LANE_WIDTH;
}

// You run lane 2 — your real lane in the PR heat (Hilversum 2025). The camera
// and your hurdles use this; competitors use laneOffset() for their own lanes.
export const PLAYER_LANE = 2;
export const LANE_OFFSET = laneOffset(PLAYER_LANE);

// 400m stagger that UNWINDS. Each outer lane starts ahead by the extra length
// its bigger bends carry (≈ 2π·laneWidth per lane), and that lead shrinks as the
// bends are run — reaching ~0 on the home straight, where every lane meets the
// common finish. So the lanes' hurdles fan out at the start and converge by the
// finish, like a real race. You (lane 2) are the reference: always 0.
const FULL_STAGGER = 2 * Math.PI * LANE_WIDTH; // ≈ 7.7 m per lane at the start

// Metres of bend run by race-distance d (the rest of the lap is straights).
function bendCovered(d: number): number {
  const s = Math.max(0, Math.min(d, TOTAL));
  if (s <= BEND) return s; // bend 1
  if (s <= BEND + STRAIGHT) return BEND; // back straight
  if (s <= 2 * BEND + STRAIGHT) return BEND + (s - (BEND + STRAIGHT)); // bend 2
  return 2 * BEND; // home straight
}

// How far ahead (centre-line metres) lane `lane` sits at race-distance d.
export function laneStaggerAt(d: number, lane: number): number {
  const remainingBendFraction = (2 * BEND - bendCovered(d)) / (2 * BEND);
  return (lane - PLAYER_LANE) * FULL_STAGGER * remainingBendFraction;
}
