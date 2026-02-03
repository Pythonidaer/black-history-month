import { useRef, useEffect } from 'react'

export function HoverCard({ image, name, rowLabel = "Murderers' Row", imagePosition = 'center', noHover = false, onClick, id }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const boundsRef = useRef(null)

  useEffect(() => {
    if (noHover) return
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    function rotateToMouse(e) {
      const bounds = boundsRef.current
      if (!bounds) return
      const mouseX = e.clientX
      const mouseY = e.clientY
      const leftX = mouseX - bounds.x
      const topY = mouseY - bounds.y
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      }
      const distance = Math.sqrt(center.x ** 2 + center.y ** 2)

      card.style.transform = `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
          ${center.y / 70},
          ${-center.x / 70},
          0,
          ${Math.log(distance) * 3.5}deg
        )
      `

      glow.style.backgroundImage = `
        radial-gradient(
          circle at
          ${center.x * 2 + bounds.width / 2}px
          ${center.y * 2 + bounds.height / 2}px,
          #ffffff55,
          #0000000f
        )
      `
    }

    function handleMouseEnter() {
      boundsRef.current = card.getBoundingClientRect()
      window.addEventListener('mousemove', rotateToMouse)
    }

    function handleMouseLeave() {
      window.removeEventListener('mousemove', rotateToMouse)
      card.style.transform = ''
      glow.style.backgroundImage = 'radial-gradient(circle at 50% -20%, #ffffff22, #0000000f)'
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousemove', rotateToMouse)
    }
  }, [noHover])

  return (
    <div
      className={`card ${noHover ? 'card--detail' : ''}`}
      ref={cardRef}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e) } } : undefined}
      {...(id != null && { 'data-card-id': id })}
    >
      <div
        className="card__image"
        aria-hidden
        style={{
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundPosition: imagePosition
        }}
      />
      <div className="card__name-banner">{name}</div>
      <div className="card__row-banner">{rowLabel}</div>
      <div className="card__glow" ref={glowRef} />
    </div>
  )
}
