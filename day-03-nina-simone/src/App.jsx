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
  const section2Ref = useRef(null)
  const [countdownDone, setCountdownDone] = useState(false)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)
  const [introImagesVisible, setIntroImagesVisible] = useState(false)
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

  // Show music player when scrolled past the hero (section 1) — visible on every section except the hero
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

  // Section 2 intro images: fade in when section 2 enters viewport
  useEffect(() => {
    const el = section2Ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) setIntroImagesVisible(true)
      },
      { threshold: 0.15, rootMargin: '0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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
          className="section section--one"
          aria-label="Section 1"
        >
          <div className="hero-video">
            <div className="hero-video__letterbox">
              <video
                className="hero-video__video"
                src="/nina_hero_video.mp4"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden
              />
              <div className="hero-video__overlay" aria-hidden />
            </div>
            <div className="hero-video__content">
              <h1 className="hero-video__title">
                <span className="hero-video__title-line">Nina</span>
                <span className="hero-video__title-line">Simone</span>
              </h1>
              <p className="hero-video__subtitle">
                Not sure what to add here yet, but here is the demo.
              </p>
              <div className="hero-video__actions">
                <a href="#section-3" className="hero-video__btn hero-video__btn--primary">
                  EXPLORE STORIES
                </a>
                <a href="#section-2" className="hero-video__btn hero-video__btn--outline">
                  LEARN MORE
                </a>
              </div>
            </div>
          </div>
        </section>
        <section
          ref={section2Ref}
          id="section-2"
          className={`section section--white section--intro ${introImagesVisible ? 'section--intro--in-view' : ''}`}
          aria-label="Section 2"
        >
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
        <SectionFive id="section-3" sectionLabel="Section 3" blockClass="section--three" />
        <SectionFive
          imageSrc="/nina_nice_dress.JPG"
          alt="Nina Simone performing"
          sectionLabel="Section 4"
          blockClass="section--four"
        />
        <SectionFive
          imageSrc="/nina_piano_2_b-w.JPG"
          alt="Nina Simone at the piano"
          sectionLabel="Section 5"
          blockClass="section--five"
        />
        <SectionEight />
        <SectionNine />
        <SiteFooter />
      </div>
    </main>
  )
}
