import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshBasicMaterial } from 'three';
import { THEME } from '../../../config/theme';
import { journeyStore } from '../../../state/journeyStore';
import { GEO, MAT } from '../sharedResources';
import { createStageVideo } from '../stageVideo';

const base = import.meta.env.BASE_URL;
// Landscape reading view: full page width, half a page tall, so the text stays readable.
const SCREEN = { w: 4.2, h: 4.2 / (1280 / 826), y: 2.3 };
const MIC = { x: 2.9, z: 0.5 };

/**
 * Media & Guest Profile: Mehdi's 7-page guest profile on a large display, beside a studio
 * microphone with slow gold "on air" rings. When the camera arrives the profile scrolls
 * down half a page at a time — cover to booking page — then returns to the top.
 */
export default function MediaKit({ accent, focus, index }) {
  const profile = useMemo(
    () => createStageVideo(`${base}stages/guest-profile.mp4`, `${base}stages/guest-profile.jpg`),
    [],
  );
  const ringMats = useMemo(
    () => [0, 1].map(() => new MeshBasicMaterial({ color: THEME.scene.accent, transparent: true, depthWrite: false })),
    [],
  );
  const rings = useRef([]);

  useEffect(
    () => () => {
      profile.dispose();
      ringMats.forEach((m) => m.dispose());
    },
    [profile, ringMats],
  );

  useFrame(({ clock }) => {
    profile.update(journeyStore.getState().position, index);
    if (!focus.current.near) return;
    const t = clock.elapsedTime;
    rings.current.forEach((r, i) => {
      if (!r) return;
      const p = (t * 0.45 + i * 0.5) % 1;
      r.scale.setScalar(0.35 + p * 0.9);
      ringMats[i].opacity = (1 - p) * 0.7;
    });
  });

  const bottom = SCREEN.y - SCREEN.h / 2;

  return (
    <group>
      <mesh geometry={GEO.box} material={MAT.concreteDark} position={[0.4, 0.1, 0]} scale={[6.4, 0.2, 2]} />

      {/* display on an easel-style stand */}
      <group>
        <mesh geometry={GEO.box} material={MAT.screenFrame} position={[-1.2, bottom / 2 + 0.1, -0.2]} rotation-z={0.06} scale={[0.08, bottom, 0.08]} />
        <mesh geometry={GEO.box} material={MAT.screenFrame} position={[1.2, bottom / 2 + 0.1, -0.2]} rotation-z={-0.06} scale={[0.08, bottom, 0.08]} />
        <mesh geometry={GEO.box} material={accent} position={[0, bottom - 0.07, 0.02]} scale={[SCREEN.w + 0.2, 0.06, 0.2]} />
        <group position={[0, SCREEN.y, 0]}>
          <mesh geometry={GEO.box} material={MAT.screenFrame} position={[0, 0, -0.06]} scale={[SCREEN.w + 0.16, SCREEN.h + 0.16, 0.1]} />
          <mesh geometry={GEO.plane} material={profile.material} scale={[SCREEN.w, SCREEN.h, 1]} />
        </group>
      </group>

      {/* studio microphone */}
      <group position={[MIC.x, 0, MIC.z]}>
        <mesh geometry={GEO.cylinder} material={MAT.screenFrame} position={[0, 0.24, 0]} scale={[0.7, 0.06, 0.7]} />
        <mesh geometry={GEO.cylinder} material={MAT.screenFrame} position={[0, 1.05, 0]} scale={[0.05, 1.6, 0.05]} />
        <group position={[0, 2.05, 0]} rotation-x={-0.25}>
          <mesh geometry={GEO.cylinder} material={MAT.concrete} scale={[0.32, 0.62, 0.32]} />
          <mesh geometry={GEO.cylinder} material={accent} position={[0, -0.18, 0]} scale={[0.34, 0.05, 0.34]} />
        </group>
        {[0, 1].map((i) => (
          <mesh key={i} ref={(el) => (rings.current[i] = el)} geometry={GEO.torus} material={ringMats[i]} position={[0, 2.05, 0]} />
        ))}
      </group>
    </group>
  );
}
