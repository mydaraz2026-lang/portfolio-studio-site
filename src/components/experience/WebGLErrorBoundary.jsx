import { Component } from 'react';

/** Catches render/WebGL errors from the 3D layer and hands over to the static fallback. */
export default class WebGLErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn('[camera-journey] 3D view failed, switching to static fallback.', error);
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
