import { useState, useEffect, useRef } from 'react'

const COUNTDOWN_START = 3
const SECONDS_PER_NUMBER = 1
const FADE_OUT_DURATION_MS = 500

/**
 * Full-viewport cinema countdown (3, 2, 1) with quadrant background,
 * concentric circles, shrinking clock-hand arc, and black numeral. Calls onComplete when done.
 */
export default function CinemaCountdown({ onComplete }) {
  const [number, setNumber] = useState(COUNTDOWN_START)
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [arcAngle, setArcAngle] = useState(360)
  const rafRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    if (number > 1) {
      const t = setTimeout(() => setNumber((n) => n - 1), SECONDS_PER_NUMBER * 1000)
      return () => clearTimeout(t)
    }
    // Hold on 1, then fade out; notify immediately so main content (black hero) is visible underneath
    const hold = setTimeout(() => {
      setFadeOut(true)
      onComplete?.()
      const done = setTimeout(() => setVisible(false), FADE_OUT_DURATION_MS)
      return () => clearTimeout(done)
    }, SECONDS_PER_NUMBER * 1000)
    return () => clearTimeout(hold)
  }, [number, onComplete])

  // Clock-hand arc: shrinks from 360° to 0° over each second, in sync with the current number
  useEffect(() => {
    setArcAngle(360)
    startTimeRef.current = performance.now()

    const tick = () => {
      const elapsed = performance.now() - startTimeRef.current
      const progress = Math.min(1, elapsed / (SECONDS_PER_NUMBER * 1000))
      const angle = 360 * (1 - progress)
      setArcAngle(angle)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [number])

  if (!visible) return null

  return (
    <div
      className={`cinema-countdown ${fadeOut ? 'cinema-countdown--fade-out' : ''}`}
      aria-live="polite"
      aria-label={`Countdown ${number}`}
    >
      <div className="cinema-countdown__content" aria-hidden="true">
        <div
          className="cinema-countdown__quadrants"
          style={{
            background: `conic-gradient(from 0deg, #E5E5E5 0deg, #E5E5E5 ${360 - arcAngle}deg, #818181 ${360 - arcAngle}deg, #818181 360deg)`,
          }}
        />
        <div
          className="cinema-countdown__hand"
          style={{ transform: `rotate(${270 - arcAngle}deg)` }}
        />
        <div className="cinema-countdown__cross" />
      </div>
      <video
        className="cinema-countdown__grain"
        src="/grainy_film.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      <div className="cinema-countdown__content cinema-countdown__content--overlay" aria-hidden="true">
        <div className="cinema-countdown__center">
          <div className="cinema-countdown__circles">
            <span className="cinema-countdown__number">{number}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
