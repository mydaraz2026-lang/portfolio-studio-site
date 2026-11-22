import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, Float32BufferAttribute, LineBasicMaterial, MathUtils, MeshBasicMaterial, Vector3 } from 'three';
import { THEME } from '../../../config/theme';
import { journeyStore } from '../../../state/journeyStore';
import { GEO, MAT, getScreenTexture } from '../sharedResources';
import { cameraRigState } from '../CameraRig';
import { MILESTONE_STOPS } from '../../../config/milestoneStops';

const LAST = MILESTONE_STOPS.length - 1;

const base = import.meta.env.BASE_URL;
const HUB = new Vector3(0, 2.6, 0);
const NODES = [
  [-2.6, 1.4, 1.2], [2.4, 1.2, 1.4], [-1.8, 3.9, -1.4], [2.1, 4.1, -1.1],
  [0.4, 0.8, -2.6], [-3.2, 2.9, -0.6], [3.3, 2.6, -0.2], [0.2, 4.8, 1.2],
].map((p) => new Vector3(...p));
// links: -1 is the hub
const LINKS = [[-1, 0], [-1, 1], [-1, 2], [-1, 3], [-1, 4], [-1, 7], [0, 5], [2, 5], [1, 6], [3, 6], [2, 7], [3, 7], [0, 4], [1, 4]];
const LOGO = { w: 2.7, h: 2.7 / (882 / 656) }; // transparent PS logo, 882 × 656
const SEAL = 1.85;

/**
 * Get started: the node network from earlier stops draws in to its gold hub, and the
 * Portfolio Studio logo emerges from it, with the nodes opening out into a halo.
 * Starts once the camera has actually arrived (not merely when the visitor scrolls there),
 * plays over about two seconds, and reverses when the camera leaves.
 */
export default function Emergence({ accent, index }) {
  const group = useRef();
  const nodeRefs = useRef([]);
  const hub = useRef();
  const logo = useRef();
  const seal = useRef();
  const progress = useRef(0);
  const current = useMemo(() => NODES.map((p) => p.clone()), []);

  const { lines, lineMat, logoMat, sealMat, rimMat } = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(new Float32Array(LINKS.length * 6), 3));
    return {
      lines: g,
      lineMat: new LineBasicMaterial({ color: THEME.scene.monumentDark, transparent: true, opacity: 0.55 }),
      logoMat: new MeshBasicMaterial({ map: getScreenTexture(`${base}logo/ps-logo-emblem.png`), transparent: true, depthWrite: false, toneMapped: false, opacity: 0 }),
      sealMat: new MeshBasicMaterial({ color: THEME.scene.background, transparent: true, opacity: 0, depthWrite: false }),
      rimMat: new MeshBasicMaterial({ color: THEME.scene.accent, transparent: true, opacity: 0 }),
    };
  }, []);

  useEffect(() => () => [lines, lineMat, logoMat, sealMat, rimMat].forEach((o) => o.dispose()), [lines, lineMat, logoMat, sealMat, rimMat]);

  useFrame(({ clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1);
    const distance = Math.abs(journeyStore.getState().position - index);
    if (distance > 1.6) return;
    const cameraAt = Math.abs(cameraRigState.t * LAST - index); // where the camera really is
    progress.current = MathUtils.damp(progress.current, cameraAt < 0.12 && distance < 0.4 ? 1 : 0, 1.5, delta);
    const p = progress.current;
    const contract = MathUtils.smoothstep(p, 0, 0.4);
    const burst = MathUtils.smoothstep(p, 0.35, 1);
    const spread = 1 - 0.7 * contract + 1.1 * burst; // draw in, then open into a halo

    NODES.forEach((b, i) => {
      current[i].copy(b).sub(HUB).multiplyScalar(spread).add(HUB);
      const m = nodeRefs.current[i];
      if (m) {
        m.position.copy(current[i]);
        m.scale.setScalar(0.32 * (1 - 0.35 * burst));
      }
    });
    const arr = lines.attributes.position.array;
    LINKS.forEach(([a, b], k) => {
      const A = a < 0 ? HUB : current[a];
      const B = current[b];
      arr.set([A.x, A.y, A.z, B.x, B.y, B.z], k * 6);
    });
    lines.attributes.position.needsUpdate = true;
    lineMat.opacity = 0.55 * (1 - 0.65 * burst);

    if (hub.current) hub.current.scale.setScalar(0.6 * (1 + 0.5 * contract) * (1 - burst) + 0.0001);
    const pop = burst < 1 ? 1 + 0.12 * Math.sin(burst * Math.PI) : 1; // slight overshoot as it lands
    if (logo.current) {
      logo.current.scale.set(LOGO.w * burst * pop + 0.0001, LOGO.h * burst * pop + 0.0001, 1);
      logo.current.rotation.y = (1 - burst) * 0.8;
    }
    logoMat.opacity = burst;
    if (seal.current) seal.current.scale.setScalar(SEAL * burst + 0.0001);
    sealMat.opacity = 0.9 * burst;
    rimMat.opacity = burst;

    if (group.current) group.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.35 * (1 - burst);
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lines} material={lineMat} />
      {NODES.map((pos, i) => (
        <mesh key={i} ref={(el) => (nodeRefs.current[i] = el)} geometry={GEO.icosahedron} material={MAT.faceted} position={pos} scale={0.32} />
      ))}
      <mesh ref={hub} geometry={GEO.icosahedron} material={accent} position={HUB} scale={0.6} />
      <mesh geometry={GEO.cylinder} material={MAT.concreteDark} position={[0, 1.1, 0]} scale={[0.08, 2.2, 0.08]} />

      {/* the emblem: a navy seal with a gold rim, carrying the logo */}
      <group position={[HUB.x, HUB.y, HUB.z + 0.5]}>
        <group ref={seal} scale={0.0001}>
          <mesh geometry={GEO.disc} material={sealMat} position-z={-0.02} />
          <mesh geometry={GEO.ring} material={rimMat} />
        </group>
        <mesh ref={logo} geometry={GEO.plane} material={logoMat} scale={0.0001} />
      </group>
    </group>
  );
}
