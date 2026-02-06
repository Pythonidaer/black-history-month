import { useState, useRef, useCallback, useEffect, forwardRef, Fragment } from 'react'
import { Vibrant } from 'node-vibrant/browser'
import { figure } from '../data'

const FALLBACK_GRADIENT = 'linear-gradient(160deg, #1a2f2f 0%, #2d1b2e 50%, #1a1a24 100%)'

function buildGradientFromPalette(palette) {
  if (!palette) return FALLBACK_GRADIENT
  const c1 = palette.DarkVibrant?.hex ?? palette.DarkMuted?.hex ?? '#1a2f2f'
  const c2 = palette.Muted?.hex ?? palette.Vibrant?.hex ?? '#2d1b2e'
  const c3 = palette.DarkMuted?.hex ?? palette.DarkVibrant?.hex ?? '#1a1a24'
  return `linear-gradient(160deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`
}

/** Section 5: text left (Civil Rights Era), image right; Vibrant background. Starts grayscale, transitions to color when in view. */
const SectionFive = forwardRef(function SectionFive(_, ref) {
  const section5 = figure.section5
  const [gradient, setGradient] = useState(FALLBACK_GRADIENT)
  const [gradientReady, setGradientReady] = useState(false)
  const [colorRevealed, setColorRevealed] = useState(false)
  const imgRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let timeoutId = null
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry.isIntersecting) return
        timeoutId = setTimeout(() => setColorRevealed(true), 500)
      },
      { threshold: 0.2, rootMargin: '0px' }
    )
    observer.observe(el)
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [])

  const handleImageLoad = useCallback(() => {
    const source = imgRef.current ?? section5?.image
    if (!source) return
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
  }, [section5?.image])

  if (!section5?.blocks?.length) return null

  const imageSrc = section5.image || '/nina_nice_dress.JPG'

  const setRef = useCallback(
    (el) => {
      sectionRef.current = el
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    },
    [ref]
  )

  return (
    <section
      ref={setRef}
      id="section-5"
      className={`section section--five-bio${colorRevealed ? ' section--five-bio--color-revealed' : ''}`}
      aria-label="Section 5"
      style={{ background: FALLBACK_GRADIENT }}
    >
      <div
        className="section--five-bio__gradient-overlay"
        style={{
          background: gradient,
          opacity: gradientReady ? 1 : 0,
        }}
        aria-hidden
      />
      <div className="section--five-bio__right">
        {section5.blocks.map((block, i) => (
          <Fragment key={i}>
            {i > 0 && <div className="cinematic-gold-divide" aria-hidden="true" />}
            <div className="section--five-bio__block">
              <h2 className="section--five-bio__block-title">{block.title}</h2>
              <div className="section--five-bio__block-body">
                {Array.isArray(block.body)
                  ? block.body.map((paragraph, j) => (
                      <p key={j}>{paragraph}</p>
                    ))
                  : <p>{block.body}</p>}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="section--five-bio__media">
        <div className="section--five-bio__img-wrap">
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Nina Simone performing"
            className="section--five-bio__img"
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </section>
  )
})

export default SectionFive
