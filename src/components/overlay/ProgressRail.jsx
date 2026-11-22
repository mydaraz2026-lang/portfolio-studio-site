import { useEffect, useRef, useSyncExternalStore } from 'react';
import { journeyStore, getActiveIndex } from '../../state/journeyStore';

/**
 * ProgressRail — subtle progress indicator + quick-jump navigation to every milestone stop.
 * Vertical on the right edge for wide screens, horizontal under the header on phones.
 * Links are plain anchors (#id), so jumping works with keyboard, screen readers and no-JS.
 */
export default function ProgressRail({ stops }) {
  const activeIndex = useSyncExternalStore(journeyStore.subscribe, getActiveIndex, () => 0);
  const railRef = useRef(null);

  useEffect(() => {
    const write = (s) => railRef.current?.style.setProperty('--journey-progress', s.progress.toFixed(4));
    write(journeyStore.getState());
    return journeyStore.subscribe(write);
  }, []);

  const active = stops[activeIndex];

  return (
    <nav
      ref={railRef}
      aria-label="Journey milestones"
      className="fixed inset-x-4 top-16 z-30 sm:inset-x-6 md:inset-x-auto md:top-1/2 md:right-8 md:-translate-y-1/2"
    >
      <div className="relative">
        {/* track + fill (horizontal on phones, vertical from md) */}
        <span
          aria-hidden="true"
          className="absolute inset-x-[7px] top-1/2 h-px -translate-y-1/2 overflow-hidden bg-on-dark/20 md:inset-x-auto md:inset-y-[18px] md:right-[7px] md:top-auto md:h-auto md:w-px md:translate-y-0"
        >
          <span className="journey-rail-fill absolute inset-0 bg-accent" />
        </span>

        <ol className="relative flex justify-between md:flex-col md:items-end md:gap-3">
          {stops.map((stop, i) => (
            <li key={stop.id}>
              <a
                href={`#${stop.id}`}
                aria-current={i === activeIndex ? 'step' : undefined}
                className="group flex min-h-9 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span className="sr-only rounded-full bg-bg/75 text-sm whitespace-nowrap text-on-dark backdrop-blur-sm md:not-sr-only md:px-2.5 md:py-0.5 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 md:group-aria-[current=step]:opacity-100">
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

      <p aria-hidden="true" className="mt-1 text-xs text-on-dark-muted md:sr-only">
        {active.navLabel} — stop {activeIndex + 1} of {stops.length}
      </p>
    </nav>
  );
}
