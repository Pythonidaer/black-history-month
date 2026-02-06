import { useState, useRef, useCallback, Fragment } from 'react'
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

/** Section 8: image left (nina_older.JPG), text right (Death and Posthumous Recognition + Legacy); Vibrant background. */
export default function SectionEight() {
  const section8 = figure.section8
  const [gradient, setGradient] = useState(FALLBACK_GRADIENT)
  const [gradientReady, setGradientReady] = useState(false)
  const imgRef = useRef(null)

  const handleImageLoad = useCallback(() => {
    const source = imgRef.current ?? section8?.image
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
  }, [section8?.image])

  if (!section8?.blocks?.length) return null

  const imageSrc = section8.image || '/nina_older.JPG'

  return (
    <section
      id="section-8"
      className="section section--eight-bio"
      aria-label="Section 8"
      style={{ background: FALLBACK_GRADIENT }}
    >
      <div
        className="section--eight-bio__gradient-overlay"
        style={{
          background: gradient,
          opacity: gradientReady ? 1 : 0,
        }}
        aria-hidden
      />
      <div className="section--eight-bio__media">
        <div className="section--eight-bio__img-wrap">
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Nina Simone"
            className="section--eight-bio__img"
            onLoad={handleImageLoad}
          />
        </div>
      </div>
      <div className="section--eight-bio__right">
        {section8.blocks.map((block, i) => (
          <Fragment key={i}>
            {i > 0 && <div className="cinematic-gold-divide" aria-hidden="true" />}
            <div className="section--eight-bio__block">
              <h2 className="section--eight-bio__block-title">{block.title}</h2>
              <div className="section--eight-bio__block-body">
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
}
