import { CatmullRomCurve3, Vector3, MathUtils } from 'three';

/**
 * CAMERA SPLINE — settings and helpers.
 *
 * The camera spline is built from the milestone stops: one control point per stop
 * (`position + cameraOffset`). A second spline — the target spline — gives the point
 * the camera looks at, nudged sideways so the milestone cluster is framed clear of
 * its overlay panel.
 */
export const CAMERA_SPLINE_SETTINGS = {
  /** 'centripetal' avoids loops and overshoot between distant milestone stops. */
  curveType: 'centripetal',
  /**
   * Share of each segment (on both ends) where the camera holds still at a milestone stop.
   * 0 = constant glide, 0.25 = long rests. Keep between 0.1 and 0.25 for a legible journey.
   */
  dwell: 0.18,
  /** Follow speed. Higher = snappier, lower = floatier. 4–7 feels refined at 60fps. */
  damping: 5.5,
  /** How far (world units) the look-at target moves to clear the overlay panel. */
  framingShift: { wide: 2.6, narrow: 1.7 },
  /** Narrow (portrait) screens pull the camera back by this factor so sculptures fit above the panel. */
  narrowDistance: 1.25,
  /** Field of view per layout; narrow (portrait) screens need a wider lens. */
  fov: { wide: 42, narrow: 58 },
  /** Gentle pointer parallax on wide screens, in world units. Set to 0 to disable. */
  parallax: 0.35,
};

const UP = new Vector3(0, 1, 0);

/**
 * @param {Array} stops     milestone stops (see milestoneStops.js)
 * @param {'wide'|'narrow'} layout
 * @returns {{ camera: CatmullRomCurve3, target: CatmullRomCurve3, count: number }}
 */
export function buildCameraSpline(stops, layout = 'wide') {
  const cameraPoints = [];
  const targetPoints = [];

  for (const stop of stops) {
    const clusterPos = new Vector3(...stop.position);
    const offset = new Vector3(...stop.cameraOffset);
    const shift = stop.framingShift?.[layout] ?? CAMERA_SPLINE_SETTINGS.framingShift[layout];
    if (layout === 'narrow') {
      const k = stop.narrowDistance ?? CAMERA_SPLINE_SETTINGS.narrowDistance;
      offset.x *= k;
      offset.z *= k;
      if (!stop.dive && !stop.pan) offset.y *= k; // screen stops keep the camera level with the screen
    }
    const cameraPos = clusterPos.clone().add(offset);
    const target = clusterPos.clone().add(new Vector3(0, stop.focusHeight ?? 2, 0));
    const forward = target.clone().sub(cameraPos).normalize();
    const right = new Vector3().crossVectors(forward, UP).normalize();

    if (layout === 'wide') {
      // Overlay panel on the left → look left of the cluster → cluster sits right of centre.
      const side = stop.panelSide === 'right' ? 1 : -1;
      target.addScaledVector(right, side * shift);
      // Dive stops pan the camera with the target, so the screen stays face-on (no keystone).
      if (stop.dive || stop.pan) cameraPos.addScaledVector(right, side * shift);
    } else {
      // Narrow screens dock the overlay panel at the bottom → cluster sits in the upper half.
      target.addScaledVector(UP, -shift);
    }

    cameraPoints.push(cameraPos);
    targetPoints.push(target);
  }

  const type = CAMERA_SPLINE_SETTINGS.curveType;
  return {
    camera: new CatmullRomCurve3(cameraPoints, false, type),
    target: new CatmullRomCurve3(targetPoints, false, type),
    count: stops.length,
  };
}

/**
 * Converts the continuous journey position (0 … count-1, derived from scroll)
 * into a camera spline parameter t (0 … 1), adding a rest ("dwell") at each milestone stop.
 *
 * CatmullRomCurve3.getPoint(t) passes exactly through control point i at t = i / (count-1),
 * so the camera lands precisely on each milestone stop.
 */
export function journeyPositionToSplineT(position, count, dwell = CAMERA_SPLINE_SETTINGS.dwell) {
  const max = count - 1;
  if (max <= 0) return 0;
  const p = MathUtils.clamp(position, 0, max);
  const i = Math.min(Math.floor(p), max - 1);
  const f = p - i;
  const local = MathUtils.clamp((f - dwell) / (1 - 2 * dwell), 0, 1);
  const eased = local * local * (3 - 2 * local); // smoothstep
  return (i + eased) / max;
}
