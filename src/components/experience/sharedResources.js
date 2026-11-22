import * as THREE from 'three';
import { THEME } from '../../config/theme';

/**
 * Geometries and materials shared by every milestone cluster.
 * Re-using a handful of unit geometries (scaled per mesh) keeps GPU memory and
 * draw-call setup low — the main lever for a steady 60fps without model files.
 */
export const GEO = {
  box: new THREE.BoxGeometry(1, 1, 1),
  cylinder: new THREE.CylinderGeometry(0.5, 0.5, 1, 24),
  obelisk: new THREE.CylinderGeometry(0.12, 0.55, 1, 4, 1),
  octahedron: new THREE.OctahedronGeometry(1, 0),
  icosahedron: new THREE.IcosahedronGeometry(1, 0),
  icosaShell: new THREE.IcosahedronGeometry(1, 1),
  torus: new THREE.TorusGeometry(1, 0.02, 8, 96),
  ring: new THREE.RingGeometry(0.975, 1, 96),
  disc: new THREE.CircleGeometry(1, 48),
  plane: new THREE.PlaneGeometry(1, 1),
};

export const MAT = {
  concrete: new THREE.MeshStandardMaterial({
    color: THEME.scene.monument,
    roughness: 0.82,
    metalness: 0.04,
  }),
  concreteDark: new THREE.MeshStandardMaterial({
    color: THEME.scene.monumentDark,
    roughness: 0.9,
    metalness: 0.02,
  }),
  faceted: new THREE.MeshStandardMaterial({
    color: THEME.scene.monument,
    roughness: 0.35,
    metalness: 0.15,
    flatShading: true,
  }),
  wire: new THREE.MeshBasicMaterial({
    color: THEME.scene.monumentDark,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  }),
  screenFrame: new THREE.MeshStandardMaterial({
    color: THEME.scene.screenFrame,
    roughness: 0.45,
    metalness: 0.3,
  }),
  inkLine: new THREE.MeshStandardMaterial({ color: '#1b2b57', roughness: 0.8 }),
  teal: new THREE.MeshBasicMaterial({ color: THEME.scene.secondary }),
  tealGlow: new THREE.MeshBasicMaterial({
    color: THEME.scene.secondary,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
    side: THREE.DoubleSide,
  }),
  line: new THREE.LineBasicMaterial({
    color: THEME.scene.monumentDark,
    transparent: true,
    opacity: 0.55,
  }),
};

/** Per-cluster accent material, so each milestone cluster can glow independently when in focus. */
export function createAccentMaterial() {
  return new THREE.MeshStandardMaterial({
    color: THEME.scene.accent,
    emissive: THEME.scene.accent,
    emissiveIntensity: 0.15,
    roughness: 0.4,
    metalness: 0.1,
  });
}

let shadowTexture = null;
/** Soft radial "contact shadow" texture, generated once on a 2D canvas. */
export function getShadowTexture() {
  if (shadowTexture) return shadowTexture;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(0,0,0,0.55)');
  g.addColorStop(0.6, 'rgba(0,0,0,0.22)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  shadowTexture = new THREE.CanvasTexture(canvas);
  shadowTexture.colorSpace = THREE.SRGBColorSpace;
  return shadowTexture;
}

const textureCache = new Map();
/** Loads a screenshot as an sRGB texture (non-blocking; the mesh updates once the image arrives). */
export function getScreenTexture(url) {
  if (textureCache.has(url)) return textureCache.get(url);
  const texture = new THREE.TextureLoader().load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  textureCache.set(url, texture);
  return texture;
}
