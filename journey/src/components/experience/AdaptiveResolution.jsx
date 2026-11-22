import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

/**
 * Keeps the frame rate near 60fps: measures frame time over 1.5s windows and lowers
 * the device-pixel ratio in steps when frames run slow, raising it again when there's headroom.
 */
export default function AdaptiveResolution({ min = 1, max = 1.75 }) {
  const setDpr = useThree((s) => s.setDpr);
  const initial = useThree((s) => s.viewport.dpr);
  const sample = useRef({ time: 0, frames: 0, dpr: Math.min(initial, max) });

  useFrame((_, delta) => {
    const s = sample.current;
    if (delta > 0.25) return; // ignore stalls (tab switches)
    s.time += delta;
    s.frames += 1;
    if (s.time < 1.5) return;
    const fps = s.frames / s.time;
    s.time = 0;
    s.frames = 0;
    if (fps < 50 && s.dpr > min) {
      s.dpr = Math.max(min, s.dpr - 0.25);
      setDpr(s.dpr);
    } else if (fps > 58 && s.dpr < Math.min(max, window.devicePixelRatio)) {
      s.dpr = Math.min(max, s.dpr + 0.25);
      setDpr(s.dpr);
    }
  });

  return null;
}
