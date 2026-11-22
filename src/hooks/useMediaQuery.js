import { useSyncExternalStore } from 'react';

/** Subscribes to a CSS media query. */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** 'wide' gives side overlay panels; 'narrow' docks overlay panels at the bottom. */
export const useLayout = () => (useMediaQuery('(min-width: 768px)') ? 'wide' : 'narrow');
