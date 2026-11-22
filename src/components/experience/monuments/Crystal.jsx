import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { EdgesGeometry, LineBasicMaterial } from 'three';
import { THEME } from '../../../config/theme';
import { GEO, MAT } from '../sharedResources';

/** Flagship: a faceted crystal over a plinth, inside a slow counter-rotating lattice. */
export default function Crystal({ accent, focus, groundY }) {
  const core = useRef();
  const shell = useRef();
  const edges = useMemo(() => new EdgesGeometry(GEO.octahedron), []);
  const edgeMat = useMemo(
    () => new LineBasicMaterial({ color: THEME.scene.accent, transparent: true, opacity: 0.9 }),
    [],
  );
  const plinthHeight = -groundY - 0.9;

  useEffect(() => () => { edges.dispose(); edgeMat.dispose(); }, [edges, edgeMat]);

  useFrame(({ clock }) => {
    if (!focus.current.near) return;
    const time = clock.elapsedTime;
    if (core.current) {
      core.current.rotation.y = time * 0.3;
      core.current.position.y = 0.9 + Math.sin(time * 0.8) * 0.12;
    }
    if (shell.current) shell.current.rotation.set(time * -0.08, time * -0.12, 0);
  });

  return (
    <group>
      <mesh geometry={GEO.cylinder} material={MAT.concrete} position={[0, groundY + plinthHeight / 2, 0]} scale={[1.6, plinthHeight, 1.6]} />
      <mesh geometry={GEO.cylinder} material={accent} position={[0, groundY + plinthHeight + 0.04, 0]} scale={[1.64, 0.08, 1.64]} />
      <group ref={core} position={[0, 0.9, 0]} scale={[1.2, 1.6, 1.2]}>
        <mesh geometry={GEO.octahedron} material={MAT.faceted} />
        <lineSegments geometry={edges} material={edgeMat} scale={1.002} />
      </group>
      <mesh ref={shell} geometry={GEO.icosaShell} material={MAT.wire} position={[0, 0.9, 0]} scale={2.5} />
    </group>
  );
}
