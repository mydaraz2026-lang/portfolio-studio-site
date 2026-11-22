import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { journeyStore } from '../../../state/journeyStore';
import { GEO, MAT } from '../sharedResources';
import { createStageVideo } from '../stageVideo';

const base = import.meta.env.BASE_URL;
const MONITOR = { w: 4.0, h: 4.0 / 1.6, x: -0.8, y: 2.6 }; // recording is 1280 × 800
const PHONE = { w: 1.0, h: 1.0 * (1170 / 540), x: 2.45, y: 1.55, z: 0.9, rot: -0.32 };

/**
 * Days 3–5: the build on a desktop screen and a phone, side by side.
 * Day 3 the hero is designed, Day 4 impact and timeline fill in, Day 5 the contact
 * links land and the phone view lights up. Both recordings share one 15-second timeline.
 */
export default function Studio({ accent, index }) {
  const screens = useMemo(
    () => ({
      monitor: createStageVideo(`${base}stages/monitor.mp4`, `${base}stages/monitor.jpg`),
      phone: createStageVideo(`${base}stages/phone.mp4`, `${base}stages/phone.jpg`),
    }),
    [],
  );
  useEffect(
    () => () => {
      screens.monitor.dispose();
      screens.phone.dispose();
    },
    [screens],
  );
  useFrame(() => {
    const { position } = journeyStore.getState();
    screens.monitor.update(position, index);
    screens.phone.update(position, index);
  });

  return (
    <group>
      <mesh geometry={GEO.box} material={MAT.concreteDark} position={[0.5, 0.1, 0.1]} scale={[6.6, 0.2, 2.2]} />

      {/* desktop screen on a stand */}
      <group position={[MONITOR.x, 0, 0]}>
        <mesh geometry={GEO.box} material={MAT.screenFrame} position={[0, 0.24, -0.2]} scale={[1.2, 0.08, 0.7]} />
        <mesh geometry={GEO.box} material={MAT.screenFrame} position={[0, (MONITOR.y - MONITOR.h / 2) / 2 + 0.14, -0.22]} scale={[0.18, MONITOR.y - MONITOR.h / 2, 0.08]} />
        <group position={[0, MONITOR.y, 0]}>
          <mesh geometry={GEO.box} material={MAT.screenFrame} position={[0, 0, -0.07]} scale={[MONITOR.w + 0.16, MONITOR.h + 0.16, 0.12]} />
          <mesh geometry={GEO.plane} material={screens.monitor.material} scale={[MONITOR.w, MONITOR.h, 1]} />
          <mesh geometry={GEO.box} material={accent} position={[0, -MONITOR.h / 2 - 0.05, 0.01]} scale={[0.3, 0.025, 0.02]} />
        </group>
      </group>

      {/* phone on a small dock */}
      <group position={[PHONE.x, 0, PHONE.z]} rotation-y={PHONE.rot}>
        <mesh geometry={GEO.box} material={MAT.screenFrame} position={[0, 0.28, 0]} scale={[0.9, 0.16, 0.5]} />
        <group position={[0, PHONE.y, 0]} rotation-x={-0.06}>
          <mesh geometry={GEO.box} material={MAT.screenFrame} position={[0, 0, -0.05]} scale={[PHONE.w + 0.1, PHONE.h + 0.12, 0.09]} />
          <mesh geometry={GEO.plane} material={screens.phone.material} scale={[PHONE.w, PHONE.h, 1]} />
        </group>
      </group>
    </group>
  );
}
