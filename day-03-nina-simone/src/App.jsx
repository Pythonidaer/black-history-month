import MusicPlayer from './components/MusicPlayer'
import { SiteFooter } from './components/SiteFooter'
import { figure } from './data'

export default function App() {
  return (
    <main className="app">
      <section className="section section--white" aria-label="Section 1" />
      <section className="section section--gradient" aria-label="Section 2" />
      <section className="section section--white section--music">
        {figure.tracks?.length > 0 && (
          <div className="section--music__wrap">
            <MusicPlayer tracks={figure.tracks} />
          </div>
        )}
      </section>
      <section className="section section--gradient" aria-label="Section 4" />
      <section className="section section--white" aria-label="Section 5" />
      <SiteFooter />
    </main>
  )
}
