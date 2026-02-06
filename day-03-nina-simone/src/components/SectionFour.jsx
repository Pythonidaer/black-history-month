import { useState, useRef, useCallback, forwardRef, Fragment } from 'react'
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

/** Section 4: image left (bordered), The Door That Closed + Becoming "Nina Simone" right; Vibrant background. */
const SectionFour = forwardRef(function SectionFour(_, ref) {
  const section4 = figure.section4
  const [gradient, setGradient] = useState(FALLBACK_GRADIENT)
  const [gradientReady, setGradientReady] = useState(false)
  const imgRef = useRef(null)

  const handleImageLoad = useCallback(() => {
    const source = imgRef.current ?? section4?.image
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
  }, [section4?.image])

  if (!section4?.blocks?.length) return null

  const imageSrc = section4.image || '/nina_piano_2_b-w.JPG'

  return (
    <section
      ref={ref}
      id="section-4"
      className="section section--four-bio"
      aria-label="Section 4"
      style={{ background: FALLBACK_GRADIENT }}
    >
      <div
        className="section--four-bio__gradient-overlay"
        style={{
          background: gradient,
          opacity: gradientReady ? 1 : 0,
        }}
        aria-hidden
      />
      <div className="section--four-bio__media">
        <div className="section--four-bio__img-wrap">
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Nina Simone at the piano"
            className="section--four-bio__img"
            onLoad={handleImageLoad}
          />
        </div>
      </div>
      <div className="section--four-bio__right">
        {section4.blocks.map((block, i) => (
          <Fragment key={i}>
            {i > 0 && <div className="cinematic-gold-divide" aria-hidden="true" />}
            <div className="section--four-bio__block">
              <h2 className="section--four-bio__block-title">{block.title}</h2>
              <div className="section--four-bio__block-body">
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
    </section>
  )
})

export default SectionFour
