import OverlayPanel from '../overlay/OverlayPanel';
import MonumentGlyph from './MonumentGlyph';

const REASONS = {
  'reduced-motion': 'Showing the static view because your device asks for reduced motion.',
  'no-webgl': 'Showing the static view because 3D graphics aren’t available in this browser.',
  'gl-error': 'The 3D view stopped unexpectedly, so the static view is shown instead.',
  user: null,
};

/**
 * StaticJourney — clean fallback when WebGL is unavailable or prefers-reduced-motion is on.
 * Same milestone stops, same overlay panels, laid out as a vertical timeline with
 * flat monument glyphs. Sections keep `data-milestone-stop` so the progress rail still works.
 */
export default function StaticJourney({ stops, reason, onEnable3D }) {
  const message = REASONS[reason];
  return (
    <div className="mx-auto max-w-5xl px-4 pt-32 pb-24 sm:px-6 md:pt-28 md:pr-44 md:pl-8">
      {message && (
        <p role="note" className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-on-dark-muted">
          {message}
          {onEnable3D && (
            <button
              type="button"
              onClick={onEnable3D}
              className="min-h-10 rounded-full border border-on-dark/25 px-4 font-medium text-on-dark hover:border-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Show the 3D journey
            </button>
          )}
        </p>
      )}

      <ol className="relative border-l border-on-dark/15">
        {stops.map((stop) => (
          <li
            key={stop.id}
            id={stop.id}
            data-milestone-stop
            className="relative scroll-mt-28 pb-14 pl-6 last:pb-0 md:pl-10"
          >
            <span aria-hidden="true" className="absolute top-8 -left-[5px] size-[9px] rounded-full bg-accent" />
            <div className="grid items-start gap-4 md:grid-cols-[150px_minmax(0,1fr)] md:gap-8">
              {stop.site ? (
                <img
                  src={stop.site.poster}
                  alt={`${stop.site.name}'s live portfolio site`}
                  loading="lazy"
                  className="w-40 rounded-md ring-1 ring-on-dark/15 md:w-full"
                />
              ) : stop.poster ? (
                <img src={stop.poster} alt={stop.posterAlt ?? ''} loading="lazy" className="w-40 rounded-md ring-1 ring-on-dark/15 md:w-full" />
              ) : (
                <MonumentGlyph type={stop.monument} />
              )}
              <OverlayPanel stop={stop} mode="static" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
