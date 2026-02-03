import { useRef, useEffect, useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { FaLinkedin } from 'react-icons/fa'
import { BOXERS } from './data'

function HoverCard({ image, name, rowLabel = "Murderer's Row", imagePosition = 'center', noHover = false, onClick, id }) {
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

function BoxerBioContent({ boxer, titleId, className = '' }) {
  if (!boxer) return null
  return (
    <div className={className}>
      <h2 id={titleId} className="card-detail-overlay__name">{boxer.name}</h2>
      {(boxer.born || boxer.from || boxer.died || boxer.divisions || boxer.record) && (
        <dl className="card-detail-overlay__facts">
          {(boxer.born || boxer.died) && (
            <>
              <dt>Lived</dt>
              <dd>{[boxer.born, boxer.died].filter(Boolean).join(' – ')}</dd>
            </>
          )}
          {boxer.from && (<><dt>From</dt><dd>{boxer.from}</dd></>)}
          {boxer.divisions && (<><dt>Divisions</dt><dd>{boxer.divisions}</dd></>)}
          {boxer.record && (<><dt>Record</dt><dd>{boxer.record}</dd></>)}
        </dl>
      )}
      {(boxer.bio ?? '').trim() && (
        <div className="card-detail-overlay__bio">
          {(boxer.bio ?? '').split(/\n\n+/).filter(Boolean).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}
    </div>
  )
}

const MODAL_TRANSITION_MS = 250

export default function App() {
  const [selectedCard, setSelectedCard] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const isOpen = selectedCard !== null
  const triggerRef = useRef(null)
  const closeButtonRef = useRef(null)
  const closeTimeoutRef = useRef(null)

  useEffect(() => {
    if (selectedCard) {
      const id = requestAnimationFrame(() => setModalVisible(true))
      return () => cancelAnimationFrame(id)
    } else {
      setModalVisible(false)
    }
  }, [selectedCard])

  useEffect(() => {
    if (!isOpen) return
    document.body.classList.add('no-scroll')
    closeButtonRef.current?.focus()
    return () => {
      document.body.classList.remove('no-scroll')
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(e) {
      if (e.key !== 'Escape') return
      e.preventDefault()
      closeOverlay()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  function openOverlay(card, e) {
    setSelectedCard(card)
    triggerRef.current = e?.currentTarget ?? null
  }

  function closeOverlay() {
    setModalVisible(false)
    closeTimeoutRef.current = setTimeout(() => {
      const toFocus = triggerRef.current
      setSelectedCard(null)
      closeTimeoutRef.current = null
      setTimeout(() => toFocus?.focus(), 0)
    }, MODAL_TRANSITION_MS)
  }

  return (
    <>
      <main className="app">
        <section className="hero-banner" aria-label="Murderers Row collage">
          <div className="hero-banner__overlay" />
          <div className="hero-banner__content">
            <h1 className="hero-banner__title">
              BLACK<br />MURDERERS<br />ROW
            </h1>
          </div>
        </section>

        <section className="article-section">
          <p className="article-section__eyebrow">February 03, 2026</p>
          <h2 className="article-section__headline">The Boxers Champions Ducked</h2>
          <p className="article-section__body">
            During the 1930s–1950s, a group of eight elite Black boxers became known as Boxing's Black Murderers' Row—fighters so skilled and dangerous that champions routinely avoided them, denying them opportunities to compete for world titles.
          </p>
          <p className="article-section__body">
          Click the cards below to learn more about each boxer's career and history.
          </p>
        </section>

        {/* Desktop: grid of cards, click opens modal */}
        <section className="demo-section demo-section--desktop">
          <div className="demo-section__card-grid">
            {BOXERS.map((boxer) => (
              <HoverCard
                key={boxer.id}
                id={boxer.id}
                image={boxer.image}
                name={boxer.name}
                imagePosition={boxer.imagePosition}
                onClick={(e) => openOverlay(boxer, e)}
              />
            ))}
          </div>
        </section>

        {/* Mobile: one card + bio per boxer, scroll to read */}
        <section className="mobile-boxer-stack" aria-label="Boxer profiles">
          {BOXERS.map((boxer) => (
            <article key={boxer.id} className="boxer-block">
              <div className="boxer-block__card-wrap">
                <HoverCard
                  image={boxer.image}
                  name={boxer.name}
                  imagePosition={boxer.imagePosition}
                  noHover
                />
              </div>
              <BoxerBioContent boxer={boxer} className="boxer-block__content" />
            </article>
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__social">
          <a
            href="https://www.linkedin.com/in/jonamichahammo"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__social-link"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className="site-footer__design-credit">
          Design influenced by{' '}
          <a
            href="https://boxraw.com/blogs/blog/boxings-black-murderers-row-fighters"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__credit-link"
          >
            BOXRAW
          </a>
        </p>
        <p className="site-footer__credit">
          Project by{' '}
          <a
            href="https://github.com/pythonidaer"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__credit-link"
          >
            Pythonidaer
          </a>
          {' '}— in honor of historical and influential figures for Black History Month.
        </p>
      </footer>

      {isOpen && selectedCard && (
        <div
          className={`card-detail-overlay ${modalVisible ? 'card-detail-overlay--visible' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="card-detail-title"
          onClick={closeOverlay}
        >
          <div
            className="card-detail-overlay__box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="card-detail-overlay__close"
              aria-label="Close"
              onClick={closeOverlay}
            >
              <FaXmark />
            </button>
            <div className="card-detail-overlay__inner">
              <div className="card-detail-overlay__card">
                <HoverCard
                  image={selectedCard.image}
                  name={selectedCard.name}
                  imagePosition={selectedCard.imagePosition}
                  noHover
                />
              </div>
              <BoxerBioContent boxer={selectedCard} titleId="card-detail-title" className="card-detail-overlay__content" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
