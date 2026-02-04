import { ParallaxBanner } from 'react-scroll-parallax'
import MusicPlayer from './components/MusicPlayer'
import ParticlesBackground from './components/ParticlesBackground'
import { figure } from './data'

export default function App() {
  return (
    <main className="app">
      <section className="hero">
        <ParallaxBanner
          layers={[
            {
              image: '/night_sky.jpg',
              speed: -25,
              style: {
                backgroundPosition: 'center bottom',
                inset: 0,
              },
            },
          ]}
          className="hero__parallax"
        />
        <div className="hero__particles">
          <ParticlesBackground contained />
        </div>
        <div className="hero__figure-wrap">
          <img
            src="/nina_simone_crouched.webp"
            alt=""
            className="hero__figure"
          />
        </div>
      </section>

      {figure.tracks?.length > 0 && (
        <section className="music-section">
          <MusicPlayer tracks={figure.tracks} />
        </section>
      )}
    </main>
  )
}
