import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshBasicMaterial } from 'three';
import { THEME } from '../../../config/theme';
import { GEO, MAT } from '../sharedResources';

const PULSES = 3;

/** Contact: an obelisk beacon sending out slow pulses — the open invitation to talk. */
export default function Beacon({ accent, focus }) {
  const pulses = useRef([]);
  const top = useRef();
  const pulseMats = useMemo(
    () =>
      Array.from(
        { length: PULSES },
        () => new MeshBasicMaterial({ color: THEME.scene.accent, transparent: true, depthWrite: false }),
      ),
    [],
  );

  useEffect(() => () => pulseMats.forEach((m) => m.dispose()), [pulseMats]);

  useFrame(({ clock }) => {
    if (!focus.current.near) return;
    const time = clock.elapsedTime;
    pulses.current.forEach((mesh, i) => {
      if (!mesh) return;
      const p = (time * 0.35 + i / PULSES) % 1;
      mesh.scale.setScalar(1 + p * 6);
      pulseMats[i].opacity = (1 - p) * 0.6;
    });
    if (top.current) top.current.rotation.y = time * 0.8;
  });

  return (
    <group>
      <mesh geometry={GEO.box} material={MAT.concreteDark} position={[0, 0.15, 0]} scale={[2.4, 0.3, 2.4]} />
      <mesh geometry={GEO.obelisk} material={MAT.concrete} position={[0, 3.8, 0]} scale={[1, 7, 1]} rotation-y={Math.PI / 4} />
      <mesh ref={top} geometry={GEO.octahedron} material={accent} position={[0, 7.9, 0]} scale={[0.32, 0.45, 0.32]} />
      {pulseMats.map((mat, i) => (
        <mesh
          key={i}
          ref={(el) => (pulses.current[i] = el)}
          geometry={GEO.ring}
          material={mat}
          rotation-x={-Math.PI / 2}
          position={[0, 0.32, 0]}
        />
      ))}
    </group>
  );
}
