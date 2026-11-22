import { useMemo, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshBasicMaterial } from 'three';
import { GEO, MAT, getScreenTexture } from '../sharedResources';

const base = import.meta.env.BASE_URL;
const POST = { w: 2.7, h: 2.7 * (473 / 429), y: 2.45 }; // real LinkedIn post screenshot, 429 × 473

/**
 * Who builds it: the client's real LinkedIn post about Portfolio Studio, floating on a
 * stand with two pages of client work fanned behind it.
 */
export default function Endorsement({ accent, focus }) {
  const card = useRef();
  const post = useMemo(
    () => new MeshBasicMaterial({ map: getScreenTexture(`${base}stages/linkedin-post.webp`), toneMapped: false }),
    [],
  );
  useEffect(() => () => post.dispose(), [post]);

  useFrame(({ clock }) => {
    if (!focus.current.near || !card.current) return;
    const t = clock.elapsedTime;
    card.current.position.y = POST.y + Math.sin(t * 0.7) * 0.05;
    card.current.rotation.y = Math.sin(t * 0.35) * 0.05;
  });

  return (
    <group>
      <mesh geometry={GEO.box} material={MAT.concreteDark} position={[0, 0.1, -0.1]} scale={[3.4, 0.2, 1.4]} />
      <mesh geometry={GEO.box} material={MAT.screenFrame} position={[-0.55, POST.y + 0.12, -0.45]} rotation-z={0.07} scale={[POST.w, POST.h, 0.04]} />
      <mesh geometry={GEO.box} material={MAT.concreteDark} position={[0.45, POST.y + 0.06, -0.25]} rotation-z={-0.05} scale={[POST.w, POST.h, 0.04]} />
      <group ref={card} position={[0, POST.y, 0]}>
        <mesh geometry={GEO.box} material={MAT.concrete} position={[0, 0, -0.03]} scale={[POST.w + 0.08, POST.h + 0.08, 0.04]} />
        <mesh geometry={GEO.plane} material={post} scale={[POST.w, POST.h, 1]} />
        <mesh geometry={GEO.box} material={accent} position={[0, -POST.h / 2 - 0.1, 0.02]} scale={[POST.w * 0.4, 0.05, 0.05]} />
      </group>
    </group>
  );
}
