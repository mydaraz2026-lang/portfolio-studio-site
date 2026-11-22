import { useEffect } from 'react';
import { journeyStore } from '../state/journeyStore';

/**
 * Scroll-progress interpolation.
 *
 * Each milestone stop owns one full-height <section data-milestone-stop>. When section i's
 * top reaches the top of the viewport, the journey position is exactly i; between sections
 * it interpolates linearly. Measuring real section offsets (instead of assuming 100vh each)
 * keeps the camera spline in sync even when a section grows taller on small screens.
 */
/**
 * @param containerRef  ref to the element holding the milestone stop sections
 * @param mode          'journey' | 'static' — re-measures when the layout switches
 */
export function useScrollProgress(containerRef, mode) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let tops = [];
    let frame = 0;

    const update = () => {
      frame = 0;
      if (tops.length === 0) return;
      // In the static timeline a stop becomes active when it is a third of the way up the screen.
      const y = window.scrollY + (mode === 'static' ? window.innerHeight * 0.35 : 0);
      const last = tops.length - 1;
      let position;

      if (y <= tops[0]) position = 0;
      else if (y >= tops[last]) position = last;
      else {
        let i = 0;
        while (i < last - 1 && y >= tops[i + 1]) i += 1;
        const span = tops[i + 1] - tops[i] || 1;
        position = i + (y - tops[i]) / span;
      }

      journeyStore.setState({
        position,
        progress: last > 0 ? position / last : 0,
        activeIndex: Math.round(position),
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const measure = () => {
      const sections = container.querySelectorAll('[data-milestone-stop]');
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      tops = Array.from(sections, (s) => Math.min(s.getBoundingClientRect().top + window.scrollY, maxScroll));
      requestUpdate();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', measure);
    measure();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', measure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [containerRef, mode]);
}
