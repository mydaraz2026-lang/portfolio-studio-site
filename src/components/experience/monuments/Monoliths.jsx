import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GEO, MAT } from '../sharedResources';

const HEIGHTS = [1.1, 1.6, 2.2, 2.9, 3.7, 4.6, 5.6];
const SPACING = 1.15;

/** Foundations: a gently curved row of floating monoliths rising left to right. */
export default function Monoliths({ accent, focus }) {
  const refs = useRef([]);

  useFrame(({ clock }) => {
    if (!focus.current.near) return;
    const time = clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (m) m.position.y = HEIGHTS[i] / 2 + 0.3 + Math.sin(time * 0.9 + i * 0.7) * 0.1;
    });
  });

  return (
    <group>
      {HEIGHTS.map((h, i) => {
        const x = (i - (HEIGHTS.length - 1) / 2) * SPACING;
        const z = -(x * x) * 0.12 + 0.6; // shallow arc, ends curve away from the camera
        const isPeak = i === HEIGHTS.length - 1;
        return (
          <group key={h} position={[x, 0, z]}>
            <mesh
              ref={(el) => (refs.current[i] = el)}
              geometry={GEO.box}
              material={isPeak ? accent : MAT.concrete}
              position={[0, h / 2 + 0.3, 0]}
              scale={[0.62, h, 0.62]}
            />
            <mesh geometry={GEO.box} material={MAT.concreteDark} position={[0, 0.05, 0]} scale={[0.9, 0.1, 0.9]} />
          </group>
        );
      })}
    </group>
  );
}
