import { useState, useEffect, useRef } from 'react'

const FADE_DELAY_MS = 1000

export default function SectionNine() {
  const sectionRef = useRef(null)
  const timeoutRef = useRef(null)
  const hasTriggeredRef = useRef(false)
  const [showNina, setShowNina] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry.isIntersecting || hasTriggeredRef.current) return
        hasTriggeredRef.current = true
        timeoutRef.current = setTimeout(() => setShowNina(true), FADE_DELAY_MS)
      },
      { threshold: 0.01, rootMargin: '0px' }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section section--nine"
      aria-label="Section 9"
    >
      <div className="section--nine__bg" aria-hidden />
      <div
        className={`section--nine__nina ${showNina ? 'section--nine__nina--visible' : ''}`}
      >
        <img
          src="/nina_no_grass.PNG"
          alt="Nina Simone"
          className="section--nine__nina-img"
        />
      </div>
    </section>
  )
}
