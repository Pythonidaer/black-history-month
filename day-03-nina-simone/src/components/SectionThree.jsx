import { useState, useRef, useCallback, forwardRef, Fragment } from 'react'
import { Vibrant } from 'node-vibrant/browser'
import { figure } from '../data'

const IMAGE_SRC = '/nina_younger_b-w.JPG'
const FALLBACK_GRADIENT = 'linear-gradient(160deg, #1a2f2f 0%, #2d1b2e 50%, #1a1a24 100%)'

function buildGradientFromPalette(palette) {
  if (!palette) return FALLBACK_GRADIENT
  const c1 = palette.DarkVibrant?.hex ?? palette.DarkMuted?.hex ?? '#1a2f2f'
  const c2 = palette.Muted?.hex ?? palette.Vibrant?.hex ?? '#2d1b2e'
  const c3 = palette.DarkMuted?.hex ?? palette.DarkVibrant?.hex ?? '#1a1a24'
  return `linear-gradient(160deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`
}

/** Section 3: portrait left (bordered), Who She Was + Early Life right; background from Vibrant. */
const SectionThree = forwardRef(function SectionThree(_, ref) {
  const section3 = figure.section3
  const [gradient, setGradient] = useState(FALLBACK_GRADIENT)
  const [gradientReady, setGradientReady] = useState(false)
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

  if (!section3?.blocks?.length) return null

  const imageSrc = section3.image || IMAGE_SRC

  return (
    <section
      ref={ref}
      id="section-3"
      className="section section--three-bio"
      aria-label="Section 3"
      style={{ background: FALLBACK_GRADIENT }}
    >
      <div
        className="section--three-bio__gradient-overlay"
        style={{
          background: gradient,
          opacity: gradientReady ? 1 : 0,
        }}
        aria-hidden
      />
      <div className="section--three-bio__right">
        {section3.blocks.map((block, i) => (
          <Fragment key={i}>
            {i > 0 && <div className="cinematic-gold-divide" aria-hidden="true" />}
            <div className="section--three-bio__block">
              <h2 className="section--three-bio__block-title">{block.title}</h2>
              <div className="section--three-bio__block-body">
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
      <div className="section--three-bio__media">
        <div className="section--three-bio__img-wrap">
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Nina Simone, younger"
            className="section--three-bio__img"
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </section>
  )
})

export default SectionThree
