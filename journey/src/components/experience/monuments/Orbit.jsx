import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Object3D } from 'three';
import { GEO, MAT } from '../sharedResources';

const SATELLITES = 24;

/** Scale: a central pillar with orbiting units — one leader, a growing team in motion. */
export default function Orbit({ accent, focus, groundY }) {
  const instances = useRef();
  const rings = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const pillarHeight = 3.6;

  useFrame(({ clock }) => {
    if (!focus.current.near || !instances.current) return;
    const time = clock.elapsedTime * 0.35;
    for (let i = 0; i < SATELLITES; i += 1) {
      const lane = i % 2; // two orbit lanes
      const a = (i / SATELLITES) * Math.PI * 2 + time * (lane ? 0.8 : 1);
      const r = lane ? 3.1 : 2.4;
      dummy.position.set(Math.cos(a) * r, 1.8 + Math.sin(a * 2) * 0.15 + (lane ? 0.5 : 0), Math.sin(a) * r);
      dummy.rotation.set(a, a * 0.5, 0);
      dummy.scale.setScalar(lane ? 0.22 : 0.3);
      dummy.updateMatrix();
      instances.current.setMatrixAt(i, dummy.matrix);
    }
    instances.current.instanceMatrix.needsUpdate = true;
    if (rings.current) rings.current.rotation.y = time * 0.4;
  });

  return (
    <group>
      <mesh geometry={GEO.cylinder} material={MAT.concrete} position={[0, groundY + pillarHeight / 2, 0]} scale={[1.1, pillarHeight, 1.1]} />
      <mesh geometry={GEO.cylinder} material={accent} position={[0, groundY + pillarHeight + 0.08, 0]} scale={[1.14, 0.16, 1.14]} />
      <group ref={rings} position={[0, 1.8, 0]}>
        <mesh geometry={GEO.torus} material={MAT.concreteDark} rotation-x={Math.PI / 2} scale={2.4} />
        <mesh geometry={GEO.torus} material={MAT.concreteDark} rotation={[Math.PI / 2 - 0.15, 0.1, 0]} position-y={0.5} scale={3.1} />
      </group>
      <instancedMesh ref={instances} args={[GEO.box, MAT.concrete, SATELLITES]} frustumCulled={false} />
    </group>
  );
}
