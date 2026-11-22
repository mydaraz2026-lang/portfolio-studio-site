import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { journeyStore } from '../../../state/journeyStore';
import { GEO, MAT } from '../sharedResources';
import { createStageVideo } from '../stageVideo';

const base = import.meta.env.BASE_URL;
const PAGE = { w: 2.8, h: 2.8 * 1.3, y: 2.55 }; // the recording is 1000 × 1300

/**
 * Day 0: the free CV audit, played on a floating CV page.
 * A sample CV gets its six key results highlighted one by one, then a task line is
 * rewritten as a result ("Before" → "After").
 */
export default function Audit({ accent, index }) {
  const page = useMemo(() => createStageVideo(`${base}stages/audit.mp4`, `${base}stages/audit.jpg`), []);
  useEffect(() => () => page.dispose(), [page]);
  useFrame(() => page.update(journeyStore.getState().position, index));

  return (
    <group>
      {/* the rest of the 4-page CV, fanned behind */}
      <mesh geometry={GEO.box} material={MAT.concreteDark} position={[-0.35, PAGE.y + 0.06, -0.32]} rotation-z={0.05} scale={[PAGE.w, PAGE.h, 0.03]} />
      <mesh geometry={GEO.box} material={MAT.concrete} position={[0.3, PAGE.y + 0.03, -0.18]} rotation-z={-0.035} scale={[PAGE.w, PAGE.h, 0.03]} />
      <group position={[0, PAGE.y, 0]}>
        <mesh geometry={GEO.box} material={MAT.concrete} position={[0, 0, -0.03]} scale={[PAGE.w + 0.04, PAGE.h + 0.04, 0.04]} />
        <mesh geometry={GEO.plane} material={page.material} position={[0, 0, 0.0]} scale={[PAGE.w, PAGE.h, 1]} />
        {/* gold paper clip */}
        <mesh geometry={GEO.box} material={accent} position={[-PAGE.w / 2 + 0.1, PAGE.h / 2 - 0.12, 0.03]} scale={[0.08, 0.5, 0.03]} />
      </group>
      <mesh geometry={GEO.box} material={MAT.concreteDark} position={[0, 0.1, -0.1]} scale={[3.4, 0.2, 1.2]} />
    </group>
  );
}
