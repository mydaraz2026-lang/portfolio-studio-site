/**
 * Theme — Portfolio Studio brand (taken from portfoliostudiocv.netlify.app).
 * `scene` drives Three.js; `ui` is written to CSS variables for Tailwind.
 */
export const THEME = {
  scene: {
    background: '#060d1f', // ink navy
    fog: '#060d1f',
    floor: '#0a1430',
    grid: '#1b2b57',
    monument: '#d5ddee', // paper tile
    monumentDark: '#6f80aa',
    accent: '#e8c273', // gold
    secondary: '#5eead4', // teal (scan lines, live signals)
    screenFrame: '#0e1a38',
    trailBase: '#1f3163',
    particles: '#6f80aa',
  },
  ui: {
    bg: '#060d1f',
    panel: '#f4f6fb',
    ink: '#0b1731',
    inkMuted: '#4a5878',
    line: '#d5ddee',
    onDark: '#f3f1ea',
    onDarkMuted: '#a9b7d6',
    accent: '#e8c273',
  },
};

export function applyThemeToCSS(theme = THEME) {
  const root = document.documentElement;
  const map = {
    '--bg': theme.ui.bg,
    '--panel': theme.ui.panel,
    '--ink': theme.ui.ink,
    '--ink-muted': theme.ui.inkMuted,
    '--line': theme.ui.line,
    '--on-dark': theme.ui.onDark,
    '--on-dark-muted': theme.ui.onDarkMuted,
    '--accent': theme.ui.accent,
  };
  Object.entries(map).forEach(([k, v]) => root.style.setProperty(k, v));
}
