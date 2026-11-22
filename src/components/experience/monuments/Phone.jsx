import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { GEO, MAT } from '../sharedResources';

const PHONE = { w: 1.8, h: 3.6, y: 2.3 };

// Site modules that fly in and dock onto the phone screen: [x, y, w, h, kind, scatter]
const MODULES = [
  [0, 1.35, 1.3, 0.22, 'paper', [-1.8, 0.9, 1.4]], // name + role
  [0, 1.05, 0.9, 0.08, 'paper', [1.9, 1.3, 1.1]], // headline
  [-0.48, 0.55, 0.42, 0.42, 'gold', [-2.2, -0.2, 1.6]], // metric
  [0, 0.55, 0.42, 0.42, 'gold', [0.4, 1.9, 1.8]], // metric
  [0.48, 0.55, 0.42, 0.42, 'gold', [2.3, 0.1, 1.5]], // metric
  [0, -0.1, 1.3, 0.06, 'paper', [-2.0, -1.0, 1.2]], // timeline
  [0, -0.35, 1.3, 0.06, 'paper', [2.1, -0.9, 1.3]],
  [0, -0.6, 1.3, 0.06, 'paper', [-1.6, -1.6, 1.0]],
  [0, -1.3, 1.3, 0.24, 'gold', [1.4, -1.9, 1.7]], // one-tap contact bar
];
const CYCLE = 7;

/** Days 3–5: a phone-first site assembling itself, module by module. */
export default function Phone({ accent, focus }) {
  const refs = useRef([]);

  useFrame(({ clock }) => {
    if (!focus.current.near) return;
    const phase = (clock.elapsedTime % CYCLE) / CYCLE;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const [x, y, , , , [sx, sy, sz]] = MODULES[i];
      const start = 0.04 + i * 0.035;
      const assemble = MathUtils.smoothstep(phase, start, start + 0.25);
      const release = MathUtils.smoothstep(phase, 0.86, 0.99);
      const out = 1 - assemble + release; // 1 = scattered, 0 = docked
      m.position.set(x + sx * out, y + sy * out, 0.12 + sz * out);
      m.rotation.set(sy * 0.15 * out, sx * 0.2 * out, 0);
    });
  });

  return (
    <group>
      <mesh geometry={GEO.box} material={MAT.concreteDark} position={[0, 0.1, 0]} scale={[2.6, 0.2, 1.4]} />
      <group position={[0, PHONE.y, 0]} rotation-x={-0.05}>
        <mesh geometry={GEO.box} material={MAT.screenFrame} scale={[PHONE.w, PHONE.h, 0.18]} />
        <mesh geometry={GEO.box} material={MAT.inkLine} position={[0, 0, 0.085]} scale={[PHONE.w - 0.16, PHONE.h - 0.22, 0.02]} />
        <mesh geometry={GEO.box} material={MAT.concreteDark} position={[0, PHONE.h / 2 - 0.1, 0.1]} scale={[0.4, 0.04, 0.02]} />
        {MODULES.map(([x, y, w, h, kind], i) => (
          <mesh
            key={i}
            ref={(el) => (refs.current[i] = el)}
            geometry={GEO.box}
            material={kind === 'gold' ? accent : MAT.concrete}
            position={[x, y, 0.12]}
            scale={[w, h, 0.04]}
          />
        ))}
      </group>
    </group>
  );
}
