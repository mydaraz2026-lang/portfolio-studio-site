import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, MeshBasicMaterial } from 'three';
import { THEME } from '../../config/theme';
import { journeyStore } from '../../state/journeyStore';
import { GEO, createAccentMaterial, getShadowTexture } from './sharedResources';
import { MONUMENTS } from './monuments';

/**
 * MilestoneCluster — the 3D sculpture for one milestone stop.
 *
 * - Turns the sculpture to face its camera position (local +z → camera, local +x → screen right).
 * - Computes `focus` (1 when the camera rests at this milestone stop, 0 when far away), which
 *   drives the accent glow and gates per-frame animation so only nearby clusters animate.
 * - Hides clusters more than ~2.5 stops away (they're inside the fog anyway).
 */
export default function MilestoneCluster({ stop, index }) {
  const group = useRef();
  const accent = useMemo(createAccentMaterial, []);
  const ringMat = useMemo(
    () => new MeshBasicMaterial({ color: THEME.scene.accent, transparent: true, opacity: 0.2, depthWrite: false }),
    [],
  );
  const focus = useRef({ value: index === 0 ? 1 : 0, near: index < 2 });
  const shadowMap = useMemo(getShadowTexture, []);
  const Monument = MONUMENTS[stop.monument];
  const groundY = -stop.position[1];
  const yaw = Math.atan2(stop.cameraOffset[0], stop.cameraOffset[2]);

  useEffect(
    () => () => {
      accent.dispose();
      ringMat.dispose();
    },
    [accent, ringMat],
  );

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1);
    const distance = Math.abs(journeyStore.getState().position - index);
    const f = focus.current;
    f.near = distance < (stop.nearRange ?? 1.6);
    if (group.current) group.current.visible = distance < (stop.visibleRange ?? 2.6);
    const goal = MathUtils.clamp(1 - distance * 1.4, 0, 1);
    f.value = MathUtils.damp(f.value, goal, 4, delta);
    accent.emissiveIntensity = 0.1 + f.value * 0.8;
    ringMat.opacity = 0.15 + f.value * 0.5;
  });

  if (!Monument) return null; // dive stops have no sculpture of their own

  return (
    <group ref={group} position={stop.position} rotation-y={yaw}>
      {/* contact shadow on the floor */}
      <mesh geometry={GEO.disc} rotation-x={-Math.PI / 2} position={[0, groundY + 0.015, 0]} scale={4.4}>
        <meshBasicMaterial map={shadowMap} transparent depthWrite={false} />
      </mesh>
      {/* milestone stop marker ring on the floor */}
      <mesh geometry={GEO.ring} material={ringMat} rotation-x={-Math.PI / 2} position={[0, groundY + 0.02, 0]} scale={4.8} />
      <Monument accent={accent} focus={focus} groundY={groundY} index={index} />
    </group>
  );
}
