/**
 * Starfield for the hero — static/twinkling stars.
 */
export const starsOptions = {
  fullScreen: false,
  background: { color: 'transparent' },
  backgroundMask: { enable: false },
  fpsLimit: 60,
  particles: {
    number: {
      value: 120,
      density: { enable: true, width: 1920, height: 1080, area: 800000 },
    },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: {
      value: { min: 0.5, max: 1 },
      animation: {
        enable: true,
        speed: 1.5,
        minimumValue: 0.3,
        sync: false,
      },
    },
    size: { value: { min: 1.5, max: 3 } },
    move: { enable: false },
  },
  detectRetina: true,
}
