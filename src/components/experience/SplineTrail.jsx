import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial, Vector3 } from 'three';
import { THEME } from '../../config/theme';
import { CAMERA_SPLINE_SETTINGS } from '../../config/cameraSpline';
import { cameraRigState } from './CameraRig';

const SAMPLES = 400;

/**
 * SplineTrail — the route between milestone stops drawn on the floor.
 * A dim base line shows the whole journey; an accent line fills up to the
 * camera's current spline position (via setDrawRange — no geometry rebuilds).
 */
export default function SplineTrail({ stops }) {
  const { base, travelled } = useMemo(() => {
    const curve = new CatmullRomCurve3(
      stops.map((s) => new Vector3(s.position[0], 0.03, s.position[2])),
      false,
      CAMERA_SPLINE_SETTINGS.curveType,
    );
    // Sample by index (getPoint, not getPointAt) so sample k lines up with camera spline t.
    const points = Array.from({ length: SAMPLES + 1 }, (_, k) => curve.getPoint(k / SAMPLES));
    const make = (color, opacity) =>
      new Line(new BufferGeometry().setFromPoints(points), new LineBasicMaterial({ color, transparent: true, opacity }));
    return { base: make(THEME.scene.trailBase, 0.9), travelled: make(THEME.scene.accent, 0.85) };
  }, [stops]);

  useEffect(
    () => () => {
      [base, travelled].forEach((l) => {
        l.geometry.dispose();
        l.material.dispose();
      });
    },
    [base, travelled],
  );

  useFrame(() => {
    travelled.geometry.setDrawRange(0, Math.max(2, Math.round(cameraRigState.t * SAMPLES) + 1));
  });

  return (
    <>
      <primitive object={base} />
      <primitive object={travelled} position-y={0.005} />
    </>
  );
}
