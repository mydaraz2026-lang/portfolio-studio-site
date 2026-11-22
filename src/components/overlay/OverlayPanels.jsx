import { useSyncExternalStore } from 'react';
import { journeyStore, getActiveIndex } from '../../state/journeyStore';
import { useLayout } from '../../hooks/useMediaQuery';
import OverlayPanel from './OverlayPanel';

/**
 * OverlayPanels — one full-height <section> per milestone stop.
 * The sections create the scroll distance that drives the camera spline; the overlay
 * panel inside each sits on the side opposite its milestone cluster.
 */
export default function OverlayPanels({ stops }) {
  const activeIndex = useSyncExternalStore(journeyStore.subscribe, getActiveIndex, () => 0);
  const compact = useLayout() === 'narrow';

  return stops.map((stop, index) => (
    <section
      key={stop.id}
      id={stop.id}
      data-milestone-stop
      aria-labelledby={`${stop.id}-title`}
      className={[
        'relative flex min-h-svh items-end px-4 pt-32 pb-5 sm:px-6',
        'md:items-center md:py-24 md:pl-[max(4vw,32px)]',
        stop.panelSide === 'right' ? 'md:justify-end md:pr-44' : 'md:justify-start md:pr-44',
      ].join(' ')}
    >
      <OverlayPanel stop={stop} active={index === activeIndex} compact={compact} />

      {stop.kind === 'intro' && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-on-dark-muted md:flex"
        >
          Scroll to travel
          <span className="relative h-10 w-px overflow-hidden bg-on-dark/15">
            <span className="scroll-hint-line absolute inset-0 bg-accent" />
          </span>
        </div>
      )}
    </section>
  ));
}
