import { useState, useEffect, useRef } from 'react'
import { figure } from '../data'

const FADE_DELAY_MS = 1000

/** Section 9: grass background, Nina cutout centered; left side: Thank You + article resources (black text on background). */
export default function SectionNine() {
  const sectionRef = useRef(null)
  const timeoutRef = useRef(null)
  const hasTriggeredRef = useRef(false)
  const [showNina, setShowNina] = useState(false)
  const resources = figure.articleResources ?? []

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
      id="section-9"
      className="section section--nine"
      aria-label="Section 9"
    >
      <div className="section--nine__bg" aria-hidden />
      <div className="section--nine__left">
        <h2 className="section--nine__left-title">Thank You For Reading</h2>
        <p className="section--nine__left-lead">
          To learn more and explore stronger sources, see the articles and resources below.
        </p>
        {resources.length > 0 && (
          <ul className="section--nine__left-resources">
            {resources.map((item, i) => (
              <li key={i}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="section--nine__left-link"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
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
