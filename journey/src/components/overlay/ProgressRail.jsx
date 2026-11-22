import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { journeyStore, getActiveIndex } from '../../state/journeyStore';
import { CONTACT } from '../../config/milestoneStops';

/**
 * ProgressRail — progress indicator + quick-jump navigation to every milestone stop.
 *
 * Wide screens: a vertical rail of dots on the right edge (labels on hover / for the active stop).
 * Phones: one large "Stop 3 of 14" button over a thin progress bar. It opens a full-width list
 * of stops with 48px rows (big enough to tap), plus the 3D / simple view switch.
 * Links are plain anchors (#id), so jumping works with keyboard, screen readers and no-JS.
 */
export default function ProgressRail({ stops, show3D, canToggle, onToggle }) {
  const activeIndex = useSyncExternalStore(journeyStore.subscribe, getActiveIndex, () => 0);
  const railRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const write = (s) => railRef.current?.style.setProperty('--journey-progress', s.progress.toFixed(4));
    write(journeyStore.getState());
    return journeyStore.subscribe(write);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const active = stops[activeIndex];

  return (
    <div ref={railRef}>
      {/* Wide screens: dot rail */}
      <nav aria-label="Journey milestones" className="fixed top-1/2 right-8 z-30 hidden -translate-y-1/2 md:block">
        <div className="relative">
          <span aria-hidden="true" className="absolute inset-y-[18px] right-[7px] w-px overflow-hidden bg-on-dark/20">
            <span className="journey-rail-fill absolute inset-0 bg-accent" />
          </span>
          <ol className="relative flex flex-col items-end gap-3">
            {stops.map((stop, i) => (
              <li key={stop.id}>
                <a
                  href={`#${stop.id}`}
                  aria-current={i === activeIndex ? 'step' : undefined}
                  className="group flex min-h-9 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <span className="rounded-full bg-bg/75 px-2.5 py-0.5 text-sm whitespace-nowrap text-on-dark opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 group-aria-[current=step]:opacity-100">
                    {stop.navLabel}
                  </span>
                  <span aria-hidden="true" className="grid size-[15px] place-items-center">
                    <span className="size-2 rounded-full bg-on-dark/45 ring-4 ring-bg transition-all duration-300 group-hover:bg-on-dark group-aria-[current=step]:size-3 group-aria-[current=step]:bg-accent" />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Phones: one big button + progress bar, opening a tappable list */}
      <div className="fixed inset-x-4 top-[60px] z-30 sm:inset-x-6 md:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="stop-list"
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-11 w-full items-center justify-between gap-3 rounded-full border border-on-dark/15 bg-bg/80 px-4 text-left text-sm text-on-dark backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="min-w-0 truncate">
            <span className="font-semibold">{active.navLabel}</span>
            <span className="text-on-dark-muted"> · stop {activeIndex + 1} of {stops.length}</span>
          </span>
          <span className="shrink-0 text-on-dark-muted">{open ? 'Close ✕' : 'All stops ▾'}</span>
        </button>
        <span aria-hidden="true" className="mx-4 mt-1.5 block h-[3px] overflow-hidden rounded-full bg-on-dark/15">
          <span className="journey-rail-fill block h-full rounded-full bg-accent" />
        </span>

        {open && (
          <>
            <button type="button" aria-label="Close the list of stops" className="fixed inset-0 -z-10 cursor-default bg-bg/60" onClick={() => setOpen(false)} />
            <nav id="stop-list" aria-label="Journey milestones" className="mt-2 max-h-[65svh] overflow-y-auto rounded-2xl bg-panel p-2 text-ink shadow-2xl">
              <ol>
                {stops.map((stop, i) => (
                  <li key={stop.id}>
                    <a
                      href={`#${stop.id}`}
                      aria-current={i === activeIndex ? 'step' : undefined}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-[15px] font-medium aria-[current=step]:bg-accent/30 focus-visible:outline-2 focus-visible:outline-ink"
                    >
                      <span className="w-6 text-right text-[13px] text-ink-muted tabular-nums">{i + 1}</span>
                      {stop.navLabel}
                    </a>
                  </li>
                ))}
              </ol>
              <a
                href={CONTACT.classicUrl}
                className="mt-1 flex min-h-12 items-center justify-between rounded-xl border-t border-line px-3 text-[15px] font-medium focus-visible:outline-2 focus-visible:outline-ink"
              >
                ← Back to the classic site
                <span className="text-[13px] text-ink-muted">Click through sections</span>
              </a>
              {canToggle && (
                <button
                  type="button"
                  onClick={() => { onToggle(); setOpen(false); }}
                  className="mt-1 flex min-h-12 w-full items-center justify-between rounded-xl border-t border-line px-3 text-[15px] font-medium focus-visible:outline-2 focus-visible:outline-ink"
                >
                  {show3D ? 'Switch to simple view' : 'Switch to 3D view'}
                  <span className="text-[13px] text-ink-muted">{show3D ? 'No animation' : 'Camera journey'}</span>
                </button>
              )}
            </nav>
          </>
        )}
      </div>
    </div>
  );
}
