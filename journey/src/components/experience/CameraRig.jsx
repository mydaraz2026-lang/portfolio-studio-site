import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { journeyStore } from '../../state/journeyStore';
import { CAMERA_SPLINE_SETTINGS, journeyPositionToSplineT } from '../../config/cameraSpline';

/** Shared, mutable rig state (read by SplineTrail) — not React state, so no re-renders. */
export const cameraRigState = { t: 0 };

/**
 * CameraRig — moves the camera along the camera spline.
 *
 * Every frame: scroll position → spline t (with dwell at milestone stops) → damped
 * follow → camera position on the camera spline, looking at the target spline.
 * All vectors are pre-allocated; nothing is created inside useFrame.
 */
export default function CameraRig({ spline, layout }) {
  const camera = useThree((s) => s.camera);
  const t = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const parallax = useRef({ x: 0, y: 0 });
  const pos = useMemo(() => new Vector3(), []);
  const target = useMemo(() => new Vector3(), []);

  useEffect(() => {
    camera.fov = CAMERA_SPLINE_SETTINGS.fov[layout];
    camera.updateProjectionMatrix();
  }, [camera, layout]);

  useEffect(() => {
    if (layout !== 'wide' || !CAMERA_SPLINE_SETTINGS.parallax) return undefined;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [layout]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1); // avoid jumps after a background tab
    const { position } = journeyStore.getState();
    const goal = journeyPositionToSplineT(position, spline.count);

    if (t.current === null) t.current = goal; // first frame: start exactly on the right stop
    t.current = MathUtils.damp(t.current, goal, CAMERA_SPLINE_SETTINGS.damping, delta);
    if (Math.abs(t.current - goal) < 1e-5) t.current = goal;
    cameraRigState.t = t.current;

    spline.camera.getPoint(t.current, pos);
    spline.target.getPoint(t.current, target);

    const amount = layout === 'wide' ? CAMERA_SPLINE_SETTINGS.parallax : 0;
    parallax.current.x = MathUtils.damp(parallax.current.x, pointer.current.x * amount, 3, delta);
    parallax.current.y = MathUtils.damp(parallax.current.y, -pointer.current.y * amount * 0.6, 3, delta);

    camera.position.set(pos.x + parallax.current.x, pos.y + parallax.current.y, pos.z);
    camera.lookAt(target);
  });

  return null;
}
