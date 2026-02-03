import { useState, useEffect } from 'react'
import { TABLET_MEDIA } from '../constants'

export function useTabletViewport() {
  const [isTablet, setIsTablet] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(TABLET_MEDIA).matches
  )
  useEffect(() => {
    const mql = window.matchMedia(TABLET_MEDIA)
    const handler = () => setIsTablet(mql.matches)
    mql.addEventListener('change', handler)
    handler()
    return () => mql.removeEventListener('change', handler)
  }, [])
  return isTablet
}
