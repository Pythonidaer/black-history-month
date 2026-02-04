/**
 * Shooting-star particle effect using tsParticles (emitters).
 * Can run full-screen behind content (fullScreen) or inside a section (contained).
 */
import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { loadEmittersPlugin } from '@tsparticles/plugin-emitters'

const getOptions = (fullScreen) => ({
  fullScreen: fullScreen ? { enable: true, zIndex: -1 } : { enable: false },
  fpsLimit: 60,
  background: { color: 'transparent' },
  particles: {
    number: { value: 0 },
  },
  emitters: [
    {
      position: { x: 0, y: 15 },
      size: { width: 100, height: 0, mode: 'percent' },
      rate: { quantity: 1, delay: 0.8 },
      life: { count: 0, duration: 0.1, delay: 0 },
      direction: 'bottom-right',
      spawnColor: { value: '#ffffff' },
      particles: {
            move: {
              enable: true,
              speed: { min: 8, max: 14 },
          direction: 'bottom-right',
          straight: true,
          outModes: { default: 'out' },
        },
        number: { value: 0 },
        opacity: { value: { min: 0.7, max: 1 } },
        size: { value: { min: 1, max: 2 } },
        shape: { type: 'circle' },
      },
    },
  ],
  detectRetina: true,
})

export default function ParticlesBackground({ contained = false }) {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
      await loadEmittersPlugin(engine)
    }).then(() => setInit(true))
  }, [])

  const options = useMemo(() => getOptions(!contained), [contained])

  if (!init) return null

  if (contained) {
    return (
      <div
        className="particles-background__wrap"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <Particles
          id="particles-background"
          options={options}
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    )
  }

  return (
    <Particles
      id="particles-background"
      options={options}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
