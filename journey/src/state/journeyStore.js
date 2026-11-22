/**
 * Journey store — a tiny external store so scroll updates never re-render React at 60fps.
 *
 *   position     continuous journey position, 0 … (milestone stops − 1)
 *   progress     0 … 1 across the whole journey
 *   activeIndex  nearest milestone stop (the only value React components subscribe to)
 *
 * The 3D camera rig reads `getState()` inside useFrame; the progress rail fill
 * subscribes and writes its style directly.
 */
const state = { position: 0, progress: 0, activeIndex: 0 };
const listeners = new Set();

export const journeyStore = {
  getState: () => state,
  setState(partial) {
    let changed = false;
    for (const key in partial) {
      if (state[key] !== partial[key]) {
        state[key] = partial[key];
        changed = true;
      }
    }
    if (changed) listeners.forEach((fn) => fn(state));
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

/** Snapshot getter for useSyncExternalStore — primitive, so React only re-renders on stop change. */
export const getActiveIndex = () => state.activeIndex;
