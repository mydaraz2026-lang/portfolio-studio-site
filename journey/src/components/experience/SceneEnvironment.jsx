import { useEffect, useMemo } from 'react';
import { BufferGeometry, Float32BufferAttribute, GridHelper, PointsMaterial } from 'three';
import { THEME } from '../../config/theme';

/** Lights, floor, grid and a static dust field (gives depth cues as the camera moves). */
export default function SceneEnvironment({ extent }) {
  const { centerZ, length } = extent;
  const size = Math.ceil((length + 80) / 10) * 10;

  const grid = useMemo(() => {
    const g = new GridHelper(size, size / 2, THEME.scene.grid, THEME.scene.grid);
    g.material.transparent = true;
    g.material.opacity = 0.55;
    return g;
  }, [size]);

  const dust = useMemo(() => {
    const count = 700;
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      pts[i * 3] = (Math.random() - 0.5) * 80;
      pts[i * 3 + 1] = Math.random() * 18 + 0.5;
      pts[i * 3 + 2] = centerZ + (Math.random() - 0.5) * size;
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(pts, 3));
    const material = new PointsMaterial({
      color: THEME.scene.particles,
      size: 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    return { geometry, material };
  }, [centerZ, size]);

  useEffect(
    () => () => {
      grid.geometry.dispose();
      grid.material.dispose();
      dust.geometry.dispose();
      dust.material.dispose();
    },
    [grid, dust],
  );

  return (
    <>
      <hemisphereLight args={['#f4f4ee', THEME.scene.background, 0.9]} />
      <directionalLight position={[10, 16, 8]} intensity={1.8} color="#fffdf4" />
      <directionalLight position={[-12, 6, -10]} intensity={0.35} color="#cfd6e6" />

      <mesh rotation-x={-Math.PI / 2} position={[0, 0, centerZ]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color={THEME.scene.floor} roughness={1} metalness={0} />
      </mesh>
      <primitive object={grid} position={[0, 0.005, centerZ]} />
      <points geometry={dust.geometry} material={dust.material} frustumCulled={false} />
    </>
  );
}
