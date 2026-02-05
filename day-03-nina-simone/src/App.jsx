import { useState, useCallback, useEffect, useRef } from 'react'
import CinemaCountdown from './components/CinemaCountdown'
import MusicPlayer from './components/MusicPlayer'
import SectionFive from './components/SectionFive'
import SectionEight from './components/SectionEight'
import SectionNine from './components/SectionNine'
import { SiteFooter } from './components/SiteFooter'
import { figure } from './data'

const SCROLL_LOCK_CLASS = 'cinema-countdown-active'

export default function App() {
  const section1Ref = useRef(null)
  const [countdownDone, setCountdownDone] = useState(false)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)
  const handleCountdownComplete = useCallback(() => setCountdownDone(true), [])

  // Start at top on load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Lock scroll while countdown is running
  useEffect(() => {
    if (!countdownDone) {
      document.documentElement.classList.add(SCROLL_LOCK_CLASS)
      document.body.classList.add(SCROLL_LOCK_CLASS)
      return () => {
        document.documentElement.classList.remove(SCROLL_LOCK_CLASS)
        document.body.classList.remove(SCROLL_LOCK_CLASS)
      }
    }
    document.documentElement.classList.remove(SCROLL_LOCK_CLASS)
    document.body.classList.remove(SCROLL_LOCK_CLASS)
  }, [countdownDone])

  // Show music player only when scrolled past section 1 (section 2 and down)
  useEffect(() => {
    if (!countdownDone || !figure.tracks?.length) return
    const el = section1Ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setShowMusicPlayer(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [countdownDone])

  return (
    <main className="app">
      <CinemaCountdown onComplete={handleCountdownComplete} />
      <div className={`main-content ${countdownDone ? 'main-content--visible' : ''}`}>
        {countdownDone && figure.tracks?.length > 0 && (
          <div
            className={`music-player-fixed ${showMusicPlayer ? 'music-player-fixed--visible' : ''}`}
          >
            <MusicPlayer tracks={figure.tracks} />
          </div>
        )}
        <section
          ref={section1Ref}
          className="section section--white section--one"
          aria-label="Section 1"
        />
        <section className="section section--gradient" aria-label="Section 2" />
        <section className="section section--white section--intro" aria-label="Section 3">
          <header className="section--intro__header">
            <h1 className="section--intro__title">{figure.name}</h1>
          </header>
          <img
            src="/nina_no_mic.webp"
            alt=""
            className="section--intro__hero-img"
          />
          <img
            src="/mic_no_nina.webp"
            alt=""
            className="section--intro__mic-img"
          />
        </section>
        <section className="section section--gradient" aria-label="Section 4" />
        <SectionFive />
        <SectionFive
          imageSrc="/nina_nice_dress.JPG"
          alt="Nina Simone performing"
          sectionLabel="Section 6"
          blockClass="section--six"
        />
        <SectionFive
          imageSrc="/nina_piano_2_b-w.JPG"
          alt="Nina Simone at the piano"
          sectionLabel="Section 7"
          blockClass="section--seven"
        />
        <SectionEight />
        <SectionNine />
        <SiteFooter />
      </div>
    </main>
  )
}
