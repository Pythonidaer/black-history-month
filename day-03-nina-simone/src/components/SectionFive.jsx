import { useState, useRef, useCallback } from 'react'
import { Vibrant } from 'node-vibrant/browser'

// Fallback gradient (deep teal / dark) if palette extraction fails
const FALLBACK_GRADIENT = 'linear-gradient(160deg, #1a2f2f 0%, #2d1b2e 50%, #1a1a24 100%)'

function buildGradientFromPalette(palette) {
  if (!palette) return FALLBACK_GRADIENT
  const c1 = palette.DarkVibrant?.hex ?? palette.DarkMuted?.hex ?? '#1a2f2f'
  const c2 = palette.Muted?.hex ?? palette.Vibrant?.hex ?? '#2d1b2e'
  const c3 = palette.DarkMuted?.hex ?? palette.DarkVibrant?.hex ?? '#1a1a24'
  return `linear-gradient(160deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`
}

export default function SectionFive({
  imageSrc = '/nina_facing_blue_full.JPG',
  alt = 'Nina Simone',
  sectionLabel = 'Section 3',
  blockClass = 'section--three',
  id,
}) {
  const [gradient, setGradient] = useState(FALLBACK_GRADIENT)
  const [gradientReady, setGradientReady] = useState(false)
  const imgRef = useRef(null)

  const handleImageLoad = useCallback(() => {
    const source = imgRef.current ?? imageSrc
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
  }, [imageSrc])

  return (
    <section
      id={id}
      className={`section ${blockClass}`}
      aria-label={sectionLabel}
      style={{ background: FALLBACK_GRADIENT }}
    >
      <div
        className={`${blockClass}__gradient-overlay`}
        style={{
          background: gradient,
          opacity: gradientReady ? 1 : 0,
        }}
        aria-hidden
      />
      <div className={`${blockClass}__content`}>
        <div className={`${blockClass}__img-wrap`}>
          <img
            ref={imgRef}
            src={imageSrc}
            alt={alt}
            className={`${blockClass}__img`}
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </section>
  )
}
