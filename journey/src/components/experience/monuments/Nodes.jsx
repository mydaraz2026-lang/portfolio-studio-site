import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import { GEO, MAT } from '../sharedResources';

// Hub first, then regional nodes — a distribution network in space.
const NODES = [
  [0, 2.6, 0],
  [-2.6, 1.4, 1.2],
  [2.4, 1.2, 1.4],
  [-1.8, 3.9, -1.4],
  [2.1, 4.1, -1.1],
  [0.4, 0.8, -2.6],
  [-3.2, 2.9, -0.6],
  [3.3, 2.6, -0.2],
  [0.2, 4.8, 1.2],
];
const LINKS = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 8],
  [1, 6], [3, 6], [2, 7], [4, 7], [3, 8], [4, 8], [1, 5], [2, 5],
];

/** Network: spatial nodes linked to a central hub. */
export default function Nodes({ accent, focus }) {
  const group = useRef();
  const lines = useMemo(() => {
    const g = new BufferGeometry();
    const pts = LINKS.flatMap(([a, b]) => [...NODES[a], ...NODES[b]]);
    g.setAttribute('position', new Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!focus.current.near || !group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.35;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lines} material={MAT.line} />
      {NODES.map((p, i) => (
        <mesh
          key={p.join()}
          geometry={GEO.icosahedron}
          material={i === 0 ? accent : MAT.faceted}
          position={p}
          scale={i === 0 ? 0.6 : 0.32}
        />
      ))}
      {/* thin mast grounding the hub */}
      <mesh geometry={GEO.cylinder} material={MAT.concreteDark} position={[0, 1.1, 0]} scale={[0.08, 2.2, 0.08]} />
    </group>
  );
}
