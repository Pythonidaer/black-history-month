import { useState, useEffect } from 'react'
import { MOBILE_MEDIA } from '../constants'

export function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(MOBILE_MEDIA).matches
  )
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_MEDIA)
    const handler = () => setIsMobile(mql.matches)
    mql.addEventListener('change', handler)
    handler()
    return () => mql.removeEventListener('change', handler)
  }, [])
  return isMobile
}
