import { useState, useRef, useCallback, useEffect } from 'react'
import { Vibrant } from 'node-vibrant/browser'

const IMAGE_SRC = '/nina_sixties_dress.JPG'
const FALLBACK_GRADIENT = 'linear-gradient(160deg, #1a2f2f 0%, #2d1b2e 50%, #1a1a24 100%)'

function buildGradientFromPalette(palette) {
  if (!palette) return FALLBACK_GRADIENT
  const c1 = palette.DarkVibrant?.hex ?? palette.DarkMuted?.hex ?? '#1a2f2f'
  const c2 = palette.Muted?.hex ?? palette.Vibrant?.hex ?? '#2d1b2e'
  const c3 = palette.DarkMuted?.hex ?? palette.DarkVibrant?.hex ?? '#1a1a24'
  return `linear-gradient(160deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`
}

export default function SectionEight() {
  const sectionRef = useRef(null)
  const textBoxRef = useRef(null)
  const hasTriggeredRef = useRef(false)
  const [gradient, setGradient] = useState(FALLBACK_GRADIENT)
  const [gradientReady, setGradientReady] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const imgRef = useRef(null)

  const handleImageLoad = useCallback(() => {
    const source = imgRef.current ?? IMAGE_SRC
    Vibrant.from(source)
      .getPalette()
      .then((palette) => {
        setGradient(buildGradientFromPalette(palette))
        setGradientReady(true)
      })
      .catch(() => {
        setGradient(FALLBACK_GRADIENT)
        setGradientReady(true)
      })
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry.isIntersecting || hasTriggeredRef.current) return
        hasTriggeredRef.current = true
        setTextVisible(true)
      },
      { threshold: 0.15, rootMargin: '0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section section--six"
      aria-label="Section 6"
      style={{ background: FALLBACK_GRADIENT }}
    >
      <div
        className="section--six__gradient-overlay"
        style={{
          background: gradient,
          opacity: gradientReady ? 1 : 0,
        }}
        aria-hidden
      />
      <div className="section--six__content">
        <div className="section--six__img-wrap">
          <img
            ref={imgRef}
            src={IMAGE_SRC}
            alt="Nina Simone performing"
            className="section--six__img"
            onLoad={handleImageLoad}
          />
        </div>
        <div
          ref={textBoxRef}
          className={`section--six__text-box ${textVisible ? 'section--six__text-box--visible' : ''}`}
        >
          <h2 className="section--six__text-box-title">Nina Simone</h2>
          <p className="section--six__text-box-body">
            Placeholder text. Your writeup about Nina Simone will go here. You can replace this paragraph with biographical details, her impact on music and civil rights, or any narrative you choose.
          </p>
        </div>
      </div>
    </section>
  )
}
