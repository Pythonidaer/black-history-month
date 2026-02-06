import { useState, useRef, useCallback } from 'react'
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

/** Section 6: image left, What She Built Through Music right; Vibrant background, full color. */
export default function SectionSix() {
  const section6 = figure.section6
  const [gradient, setGradient] = useState(FALLBACK_GRADIENT)
  const [gradientReady, setGradientReady] = useState(false)
  const imgRef = useRef(null)

  const handleImageLoad = useCallback(() => {
    const source = imgRef.current ?? section6?.image
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
  }, [section6?.image])

  if (!section6?.blocks?.length) return null

  const imageSrc = section6.image || '/nina_sixties_dress.JPG'

  return (
    <section
      id="section-6"
      className="section section--six-bio"
      aria-label="Section 6"
      style={{ background: FALLBACK_GRADIENT }}
    >
      <div
        className="section--six-bio__gradient-overlay"
        style={{
          background: gradient,
          opacity: gradientReady ? 1 : 0,
        }}
        aria-hidden
      />
      <div className="section--six-bio__media">
        <div className="section--six-bio__img-wrap">
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Nina Simone performing"
            className="section--six-bio__img"
            onLoad={handleImageLoad}
          />
        </div>
      </div>
      <div className="section--six-bio__right">
        {section6.blocks.map((block, i) => (
          <div key={i} className="section--six-bio__block">
            <h2 className="section--six-bio__block-title">{block.title}</h2>
            <div className="section--six-bio__block-body">
              {Array.isArray(block.body)
                ? block.body.map((paragraph, j) => (
                    <p key={j}>{paragraph}</p>
                  ))
                : <p>{block.body}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
