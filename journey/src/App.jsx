import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { MILESTONE_STOPS } from './config/milestoneStops';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useLayout, usePrefersReducedMotion } from './hooks/useMediaQuery';
import { useWebGLSupport } from './hooks/useWebGLSupport';
import SiteHeader from './components/overlay/SiteHeader';
import ProgressRail from './components/overlay/ProgressRail';
import OverlayPanels from './components/overlay/OverlayPanels';
import StaticJourney from './components/fallback/StaticJourney';
import SiteFooter from './components/overlay/SiteFooter';
import WebGLErrorBoundary from './components/experience/WebGLErrorBoundary';

// Three.js loads only when the 3D journey is actually shown — the fallback stays lightweight.
const JourneyCanvas = lazy(() => import('./components/experience/JourneyCanvas'));

export default function App() {
  const stops = MILESTONE_STOPS;
  const webgl = useWebGLSupport();
  const reducedMotion = usePrefersReducedMotion();
  const layout = useLayout();
  const [userChoice, setUserChoice] = useState(null); // null = follow system, true/false = explicit
  const [glFailed, setGlFailed] = useState(false);
  const containerRef = useRef(null);

  const canRender3D = webgl && !glFailed;
  const show3D = canRender3D && (userChoice ?? !reducedMotion);
  const mode = show3D ? 'journey' : 'static';

  useScrollProgress(containerRef, mode);

  // Gentle snapping so the page always settles on a stop with its card fully readable.
  useEffect(() => {
    document.documentElement.classList.toggle('journey-snap', show3D);
    return () => document.documentElement.classList.remove('journey-snap');
  }, [show3D]);

  let reason = 'user';
  if (glFailed) reason = 'gl-error';
  else if (!webgl) reason = 'no-webgl';
  else if (userChoice === null && reducedMotion) reason = 'reduced-motion';

  return (
    <>
      <a
        href="#journey"
        className="sr-only z-50 rounded bg-accent px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <SiteHeader
        intro={stops[0]}
        show3D={show3D}
        canToggle={canRender3D}
        onToggle={() => setUserChoice(!show3D)}
      />

      {show3D && (
        <WebGLErrorBoundary onError={() => setGlFailed(true)}>
          <Suspense fallback={null}>
            <JourneyCanvas stops={stops} layout={layout} onContextLost={() => setGlFailed(true)} />
          </Suspense>
        </WebGLErrorBoundary>
      )}

      <ProgressRail stops={stops} show3D={show3D} canToggle={canRender3D} onToggle={() => setUserChoice(!show3D)} />

      <main id="journey" ref={containerRef} className="relative z-10" key={mode}>
        {show3D ? (
          <OverlayPanels stops={stops} />
        ) : (
          <StaticJourney
            stops={stops}
            reason={reason}
            onEnable3D={canRender3D ? () => setUserChoice(true) : undefined}
          />
        )}
      </main>
      <SiteFooter />
    </>
  );
}
