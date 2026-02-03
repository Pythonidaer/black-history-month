import { useRef, useEffect } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { HoverCard } from './HoverCard'
import { BoxerBioContent } from './BoxerBioContent'

export function CardDetailModal({ selectedCard, modalVisible, isTabletViewport, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!selectedCard) return
    closeButtonRef.current?.focus()
  }, [selectedCard])

  useEffect(() => {
    if (!selectedCard) return
    document.body.classList.add('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [selectedCard])

  useEffect(() => {
    if (!selectedCard) return
    function onKeyDown(e) {
      if (e.key !== 'Escape') return
      e.preventDefault()
      handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedCard])

  function handleClose() {
    onClose()
  }

  if (!selectedCard) return null

  return (
    <div
      className={`card-detail-overlay ${modalVisible ? 'card-detail-overlay--visible' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-detail-title"
      onClick={handleClose}
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
          onClick={handleClose}
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
          <BoxerBioContent
            boxer={selectedCard}
            titleId="card-detail-title"
            className="card-detail-overlay__content"
            compactFacts={!isTabletViewport}
          />
        </div>
      </div>
    </div>
  )
}
