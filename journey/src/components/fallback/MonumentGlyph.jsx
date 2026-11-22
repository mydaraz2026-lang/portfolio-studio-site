import { THEME } from '../../config/theme';

const C = THEME.scene.monument;
const D = THEME.scene.monumentDark;
const A = THEME.scene.accent;

/** Flat SVG stand-ins for each 3D monument, used by the static / reduced-motion fallback. */
const GLYPHS = {
  bubbles: (
    <>
      <rect x="18" y="22" width="80" height="22" rx="4" fill={C} />
      <rect x="62" y="54" width="70" height="22" rx="4" fill={A} />
      <rect x="22" y="86" width="96" height="22" rx="4" fill={C} />
      <rect x="74" y="118" width="62" height="20" rx="4" fill={A} />
    </>
  ),
  showcase: (
    <>
      <rect x="44" y="30" width="72" height="40" rx="2" fill="#0e1a38" stroke={C} strokeWidth="2" />
      <rect x="10" y="62" width="50" height="30" rx="2" fill="#0e1a38" stroke={D} strokeWidth="2" />
      <rect x="100" y="62" width="50" height="30" rx="2" fill="#0e1a38" stroke={D} strokeWidth="2" />
      <rect x="66" y="76" width="28" height="3" fill={A} />
      <rect x="79" y="70" width="2" height="62" fill={D} />
      <rect x="62" y="132" width="36" height="5" fill={D} />
    </>
  ),
  audit: (
    <>
      <rect x="52" y="20" width="62" height="88" fill={D} transform="rotate(-5 83 64)" />
      <rect x="44" y="24" width="66" height="94" fill={C} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <rect key={i} x="52" y={40 + i * 8.5} width={[40, 48, 36, 44, 50, 34, 46, 40, 44][i]} height={i % 2 ? 4 : 2.5} fill={i % 2 ? A : '#1b2b57'} />
      ))}
      <rect x="38" y="70" width="78" height="2" fill={THEME.scene.secondary} />
      <rect x="34" y="130" width="86" height="6" fill={D} />
    </>
  ),
  phone: (
    <>
      <rect x="56" y="14" width="48" height="96" rx="6" fill="#0e1a38" stroke={D} strokeWidth="2" />
      <rect x="63" y="26" width="34" height="6" fill={C} />
      {[0, 1, 2].map((i) => <rect key={i} x={63 + i * 12} y="40" width="10" height="10" fill={A} />)}
      <rect x="63" y="58" width="34" height="2" fill={C} />
      <rect x="63" y="65" width="34" height="2" fill={C} />
      <rect x="63" y="92" width="34" height="7" fill={A} />
      <rect x="116" y="44" width="14" height="10" fill={A} opacity="0.6" />
      <rect x="28" y="72" width="16" height="4" fill={C} opacity="0.6" />
      <rect x="40" y="128" width="80" height="6" fill={D} />
    </>
  ),
  gateway: (
    <>
      <rect x="22" y="128" width="116" height="10" fill={D} />
      <rect x="38" y="44" width="18" height="84" fill={C} />
      <rect x="104" y="44" width="18" height="84" fill={C} />
      <rect x="32" y="32" width="96" height="12" fill={C} />
      <rect x="55" y="50" width="2" height="74" fill={A} />
      <rect x="103" y="50" width="2" height="74" fill={A} />
    </>
  ),
  monoliths: (
    <>
      {[20, 30, 42, 54, 68, 84, 100].map((h, i) => (
        <rect key={h} x={20 + i * 18} y={132 - h} width="12" height={h} fill={i === 6 ? A : C} />
      ))}
      <rect x="14" y="134" width="132" height="4" fill={D} />
    </>
  ),
  orbit: (
    <>
      <ellipse cx="80" cy="76" rx="62" ry="18" fill="none" stroke={D} strokeWidth="2" />
      <ellipse cx="80" cy="66" rx="48" ry="13" fill="none" stroke={D} strokeWidth="2" />
      <rect x="68" y="44" width="24" height="94" fill={C} />
      <rect x="66" y="40" width="28" height="5" fill={A} />
      {[[22, 78], [132, 72], [40, 60], [118, 88], [58, 92]].map(([x, y]) => (
        <rect key={x} x={x} y={y} width="8" height="8" fill={C} />
      ))}
    </>
  ),
  nodes: (
    <>
      {[[80, 70, 34, 104], [80, 70, 128, 102], [80, 70, 46, 34], [80, 70, 120, 32], [80, 70, 82, 128], [34, 104, 22, 64], [128, 102, 140, 66]].map(
        ([x1, y1, x2, y2]) => <line key={`${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={D} strokeWidth="1.5" />,
      )}
      {[[34, 104], [128, 102], [46, 34], [120, 32], [82, 128], [22, 64], [140, 66]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill={C} />
      ))}
      <circle cx="80" cy="70" r="13" fill={A} />
    </>
  ),
  crystal: (
    <>
      <circle cx="80" cy="64" r="50" fill="none" stroke={D} strokeWidth="1.2" strokeDasharray="3 5" />
      <polygon points="80,18 108,64 80,110 52,64" fill={C} stroke={A} strokeWidth="2" />
      <polygon points="80,18 80,110 52,64" fill={D} opacity="0.5" />
      <rect x="56" y="122" width="48" height="16" fill={C} />
      <rect x="56" y="120" width="48" height="3" fill={A} />
    </>
  ),
  ascent: (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={22 + i * 14} y={124 - i * 13} width="30" height="7" fill={i === 7 ? A : C} />
      ))}
      <rect x="18" y="134" width="124" height="4" fill={D} />
    </>
  ),
  beacon: (
    <>
      <ellipse cx="80" cy="132" rx="64" ry="8" fill="none" stroke={A} strokeWidth="1.5" opacity="0.45" />
      <ellipse cx="80" cy="132" rx="40" ry="5" fill="none" stroke={A} strokeWidth="1.5" opacity="0.7" />
      <polygon points="74,28 86,28 94,132 66,132" fill={C} />
      <polygon points="80,10 86,22 80,30 74,22" fill={A} />
    </>
  ),
};

export default function MonumentGlyph({ type }) {
  return (
    <svg viewBox="0 0 160 150" className="h-auto w-24 md:w-full" aria-hidden="true" focusable="false">
      {GLYPHS[type] ?? GLYPHS.monoliths}
    </svg>
  );
}
