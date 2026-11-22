import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { THEME } from '../../config/theme';
import { buildCameraSpline, CAMERA_SPLINE_SETTINGS } from '../../config/cameraSpline';
import CameraRig from './CameraRig';
import MilestoneCluster from './MilestoneCluster';
import SceneEnvironment from './SceneEnvironment';
import SplineTrail from './SplineTrail';
import AdaptiveResolution from './AdaptiveResolution';

/**
 * JourneyCanvas — the fixed, full-screen 3D layer behind the overlay panels.
 * Decorative only (aria-hidden): every word lives in the HTML overlay panels.
 */
export default function JourneyCanvas({ stops, layout, onContextLost }) {
  const spline = useMemo(() => buildCameraSpline(stops, layout), [stops, layout]);

  const extent = useMemo(() => {
    const zs = stops.map((s) => s.position[2] + s.cameraOffset[2]).concat(stops.map((s) => s.position[2]));
    const minZ = Math.min(...zs);
    const maxZ = Math.max(...zs);
    return { centerZ: (minZ + maxZ) / 2, length: maxZ - minZ };
  }, [stops]);

  const start = spline.camera.points[0];

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false, stencil: false }}
        camera={{ fov: CAMERA_SPLINE_SETTINGS.fov[layout], near: 0.1, far: 120, position: [start.x, start.y, start.z] }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            onContextLost?.();
          });
        }}
      >
        <color attach="background" args={[THEME.scene.background]} />
        <fog attach="fog" args={[THEME.scene.fog, 16, 52]} />
        <SceneEnvironment extent={extent} />
        <SplineTrail stops={stops} />
        {stops.map((stop, index) => (
          <MilestoneCluster key={stop.id} stop={stop} index={index} />
        ))}
        <CameraRig spline={spline} layout={layout} />
        <AdaptiveResolution />
      </Canvas>
    </div>
  );
}
