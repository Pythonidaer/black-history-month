import { useRef, useEffect, useState } from 'react'
import { BOXERS } from './data'
import { MODAL_TRANSITION_MS } from './constants'
import { useTabletViewport } from './hooks/useTabletViewport'
import { useMobileViewport } from './hooks/useMobileViewport'
import { HeroBanner } from './components/HeroBanner'
import { ArticleSection } from './components/ArticleSection'
import { BoxerCardGrid } from './components/BoxerCardGrid'
import { MobileBoxerStack } from './components/MobileBoxerStack'
import { SiteFooter } from './components/SiteFooter'
import { CardDetailModal } from './components/CardDetailModal'

export default function App() {
  const [selectedCard, setSelectedCard] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const isTabletViewport = useTabletViewport()
  const isMobileViewport = useMobileViewport()
  const isOpen = selectedCard !== null
  const triggerRef = useRef(null)
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
    return () => {
      document.body.classList.remove('no-scroll')
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
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

  return (
    <>
      <main className="app">
        <HeroBanner />
        <ArticleSection isMobileViewport={isMobileViewport} />
        <BoxerCardGrid boxers={BOXERS} onCardClick={openOverlay} />
        <MobileBoxerStack boxers={BOXERS} />
      </main>

      <SiteFooter />

      {isOpen && selectedCard && (
        <CardDetailModal
          selectedCard={selectedCard}
          modalVisible={modalVisible}
          isTabletViewport={isTabletViewport}
          onClose={closeOverlay}
        />
      )}
    </>
  )
}
