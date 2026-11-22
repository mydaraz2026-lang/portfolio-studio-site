import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GEO, MAT } from '../sharedResources';

const STEPS = 12;
const RISE = 0.44;
const TURN = 0.5;

const stepTransform = (i) => {
  const a = i * TURN;
  return { a, x: Math.cos(a) * 1.3, z: -Math.sin(a) * 1.3, y: 0.2 + i * RISE };
};

/** Turnaround: a spiral stair of slabs with a marker climbing to the top. */
export default function Ascent({ accent, focus }) {
  const runner = useRef();

  useFrame(({ clock }) => {
    if (!focus.current.near || !runner.current) return;
    const p = (clock.elapsedTime * 0.9) % STEPS;
    const i = Math.floor(p);
    const s = stepTransform(Math.min(i + (p - i), STEPS - 1));
    runner.current.position.set(s.x * 1.25, s.y + 0.32, s.z * 1.25);
  });

  return (
    <group>
      <mesh geometry={GEO.cylinder} material={MAT.concreteDark} position={[0, (STEPS * RISE) / 2 + 0.3, 0]} scale={[0.35, STEPS * RISE + 0.6, 0.35]} />
      {Array.from({ length: STEPS }, (_, i) => {
        const s = stepTransform(i);
        return (
          <mesh
            key={i}
            geometry={GEO.box}
            material={i === STEPS - 1 ? accent : MAT.concrete}
            position={[s.x, s.y, s.z]}
            rotation-y={s.a}
            scale={[2.4, 0.22, 0.85]}
          />
        );
      })}
      <mesh ref={runner} geometry={GEO.box} material={accent} scale={0.24} />
    </group>
  );
}
