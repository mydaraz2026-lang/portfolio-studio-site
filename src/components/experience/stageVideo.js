import { MeshBasicMaterial, SRGBColorSpace, VideoTexture } from 'three';
import { getScreenTexture } from './sharedResources';

/**
 * A screen that shows a poster image until the camera reaches its milestone stop,
 * then plays its video from the start (muted, looping). Leaving the stop pauses it.
 * The video is fetched as a blob only when the visitor gets close, keeping the first load light.
 *
 *   const screen = createStageVideo(src, poster);
 *   <mesh material={screen.material} />
 *   useFrame(() => screen.update(position, stopIndex));
 */
export function createStageVideo(src, poster) {
  const video = document.createElement('video');
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');

  const videoTexture = new VideoTexture(video);
  videoTexture.colorSpace = SRGBColorSpace;
  const material = new MeshBasicMaterial({ map: getScreenTexture(poster), toneMapped: false });
  const state = { requested: false, active: false, playing: false, objectUrl: null };

  const start = () => {
    video.play().then(
      () => {
        state.playing = true;
        material.map = videoTexture;
      },
      () => {},
    );
  };

  return {
    material,
    /** @param position journey position · @param stopIndex the stop where this screen plays */
    update(position, stopIndex, { loadWithin = 1.2, playWithin = 0.45 } = {}) {
      const distance = Math.abs(position - stopIndex);
      if (!state.requested && distance < loadWithin) {
        state.requested = true;
        fetch(src)
          .then((r) => r.blob())
          .then((blob) => {
            state.objectUrl = URL.createObjectURL(blob);
            video.src = state.objectUrl;
            video.load();
          })
          .catch(() => {}); // the poster stays if the video can't load
      }
      const active = distance < playWithin;
      if (active && !state.active) {
        state.active = true;
        if (video.readyState >= 1) video.currentTime = 0;
        start();
      } else if (!active && state.active) {
        state.active = false;
        video.pause();
      }
      if (state.active && !state.playing && video.paused && video.readyState >= 2) start();
    },
    dispose() {
      video.pause();
      video.removeAttribute('src');
      if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
      videoTexture.dispose();
      material.dispose();
    },
  };
}
