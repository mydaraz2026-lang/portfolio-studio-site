import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GEO, MAT } from '../sharedResources';

// A floating conversation: questions (pale, left) and answers (gold, right), rising.
const BUBBLES = [
  { x: -0.9, y: 0.9, w: 2.0, answer: false },
  { x: 0.8, y: 1.65, w: 1.6, answer: true },
  { x: -0.7, y: 2.4, w: 2.3, answer: false },
  { x: 0.9, y: 3.15, w: 1.4, answer: true },
  { x: -0.5, y: 3.9, w: 1.8, answer: false },
];

/** FAQ: questions and answers as stacked speech bubbles. */
export default function Bubbles({ accent, focus }) {
  const refs = useRef([]);

  useFrame(({ clock }) => {
    if (!focus.current.near) return;
    const t = clock.elapsedTime;
    refs.current.forEach((g, i) => {
      if (g) g.position.y = BUBBLES[i].y + Math.sin(t * 0.9 + i * 0.8) * 0.06;
    });
  });

  return (
    <group>
      <mesh geometry={GEO.cylinder} material={MAT.concreteDark} position={[0, 0.06, 0]} scale={[2.6, 0.12, 2.6]} />
      {BUBBLES.map((b, i) => {
        const mat = b.answer ? accent : MAT.concrete;
        const tailX = b.answer ? b.w / 2 - 0.25 : -b.w / 2 + 0.25;
        return (
          <group key={i} ref={(el) => (refs.current[i] = el)} position={[b.x, b.y, (i % 2) * 0.3]}>
            <mesh geometry={GEO.box} material={mat} scale={[b.w, 0.5, 0.16]} />
            <mesh geometry={GEO.box} material={mat} position={[tailX, -0.3, 0]} rotation-z={Math.PI / 4} scale={[0.2, 0.2, 0.16]} />
            {/* text lines */}
            <mesh geometry={GEO.box} material={MAT.inkLine} position={[-b.w * 0.12, 0.07, 0.09]} scale={[b.w * 0.6, 0.06, 0.01]} />
            <mesh geometry={GEO.box} material={MAT.inkLine} position={[-b.w * 0.2, -0.08, 0.09]} scale={[b.w * 0.44, 0.06, 0.01]} />
          </group>
        );
      })}
    </group>
  );
}
