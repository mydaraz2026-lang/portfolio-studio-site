import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { MILESTONE_STOPS, SCREEN_ASPECT, SHOWCASE_LAYOUT, SITES } from '../../../config/milestoneStops';
import { journeyStore } from '../../../state/journeyStore';
import { GEO, MAT } from '../sharedResources';
import { createStageVideo } from '../stageVideo';

// Which milestone stop dives into each screen (index in MILESTONE_STOPS).
const DIVE_INDEX = SHOWCASE_LAYOUT.map((_, i) => MILESTONE_STOPS.findIndex((s) => s.screen === i));
const SAMPLES_INDEX = MILESTONE_STOPS.findIndex((s) => s.monument === 'showcase');

/**
 * Live samples: the three client sites as floating screens. When the camera dives into a
 * screen, that site's recording plays from the top and scrolls through the whole page.
 */
export default function Showcase({ accent, focus }) {
  const groups = useRef([]);
  const screens = useMemo(
    () => SHOWCASE_LAYOUT.map((l) => createStageVideo(SITES[l.site].video, SITES[l.site].poster)),
    [],
  );

  useEffect(() => () => screens.forEach((s) => s.dispose()), [screens]);

  useFrame(({ clock }, delta) => {
    const { position } = journeyStore.getState();
    // start loading all three recordings as the visitor approaches the Samples stop
    const loadWithin = DIVE_INDEX[2] - SAMPLES_INDEX + 0.7;
    screens.forEach((s, i) => s.update(position, DIVE_INDEX[i], { loadWithin }));
    if (!focus.current.near) return;

    const t = clock.elapsedTime;
    SHOWCASE_LAYOUT.forEach((l, i) => {
      const closeness = MathUtils.clamp(1 - Math.abs(position - DIVE_INDEX[i]), 0, 1);
      const g = groups.current[i];
      if (g) {
        const bob = Math.sin(t * 0.8 + i * 1.3) * 0.08 * (1 - closeness); // settles while diving in
        g.position.y = MathUtils.damp(g.position.y, l.y + bob, 6, delta);
      }
    });
  });

  return (
    <group>
      {SHOWCASE_LAYOUT.map((l, i) => {
        const h = l.width / SCREEN_ASPECT;
        return (
          <group key={l.site} position={[l.x, 0, l.z]} rotation-y={l.rot}>
            <mesh geometry={GEO.cylinder} material={MAT.concreteDark} position={[0, (l.y - h / 2) / 2, -0.05]} scale={[0.06, l.y - h / 2, 0.06]} />
            <mesh geometry={GEO.cylinder} material={MAT.concreteDark} position={[0, 0.04, -0.05]} scale={[0.7, 0.08, 0.7]} />
            <group ref={(el) => (groups.current[i] = el)} position={[0, l.y, 0]}>
              <mesh geometry={GEO.box} material={MAT.screenFrame} position={[0, 0, -0.06]} scale={[l.width + 0.14, h + 0.14, 0.1]} />
              <mesh geometry={GEO.plane} material={screens[i].material} scale={[l.width, h, 1]} />
              <mesh geometry={GEO.box} material={accent} position={[0, -h / 2 - 0.16, 0]} scale={[l.width * 0.35, 0.04, 0.04]} />
            </group>
          </group>
        );
      })}
    </group>
  );
}
