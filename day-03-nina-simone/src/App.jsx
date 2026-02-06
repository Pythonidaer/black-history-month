import { useState, useCallback, useEffect, useRef } from 'react'
import CinemaCountdown from './components/CinemaCountdown'
import MusicPlayer from './components/MusicPlayer'
import SectionOne from './components/SectionOne'
import SectionTwo from './components/SectionTwo'
import SectionThree from './components/SectionThree'
import SectionFour from './components/SectionFour'
import SectionFive from './components/SectionFive'
import SectionImage from './components/SectionImage'
import SectionSix from './components/SectionSix'
import SectionSeven from './components/SectionSeven'
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
        <SectionOne ref={section1Ref} />
        <SectionTwo ref={section2Ref} inView={introImagesVisible} />
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <SectionSix />
        <SectionSeven />
        <SectionEight />
        <SectionNine />
        <SiteFooter />
      </div>
    </main>
  )
}
