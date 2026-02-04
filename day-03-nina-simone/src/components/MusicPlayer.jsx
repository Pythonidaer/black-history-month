import { useState, useRef, useEffect } from 'react'
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa'

/**
 * Parses the song name from an audio filename, e.g.:
 * "Nina Simone - Lilac Wine (Audio).mp3" → "Lilac Wine"
 */
function getSongNameFromSrc(src) {
  if (!src) return ''
  const filename = src.split('/').pop() || ''
  const withoutExt = filename.replace(/\s*\(Audio\)\.mp3$/i, '').replace(/\.mp3$/i, '')
  const parts = withoutExt.split(' - ')
  return parts.length > 1 ? parts.slice(1).join(' - ') : withoutExt
}

const defaultTracks = []

export default function MusicPlayer({ tracks = defaultTracks }) {
  const audioRef = useRef(null)
  const autoPlayNextRef = useRef(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const track = tracks[currentIndex] ?? null
  const { artist, src, albumArtUrl } = track ?? {}
  const songName = getSongNameFromSrc(src)
  const trackCount = Math.max(tracks.length, 1)
  const hasPrev = true
  const hasNext = true

  // When track index or src changes, load new source and reset progress
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !src) return
    audio.src = src
    setProgress(0)
    setDuration(0)
    const shouldPlay = autoPlayNextRef.current
    if (autoPlayNextRef.current) autoPlayNextRef.current = false
    if (shouldPlay) {
      const onCanPlay = () => {
        const p = audio.play()
        if (p && typeof p.then === 'function') {
          p.then(() => setIsPlaying(true)).catch(() => {})
        } else {
          setIsPlaying(true)
        }
      }
      audio.addEventListener('canplay', onCanPlay, { once: true })
    }
  }, [currentIndex, src])

  // Sync progress with audio currentTime
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setProgress(audio.currentTime)
    const onDurationChange = () => setDuration(audio.duration)
    const onEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      autoPlayNextRef.current = true
      setCurrentIndex((i) => (i + 1) % Math.max(trackCount, 1))
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('ended', onEnded)
    }
  }, [src, trackCount])

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handlePrev = () => {
    if (trackCount <= 0) return
    const wasPlaying = isPlaying
    const audio = audioRef.current
    if (audio) audio.pause()
    setCurrentIndex((i) => (i - 1 + trackCount) % trackCount)
    setIsPlaying(false)
    if (wasPlaying) {
      setTimeout(() => {
        audioRef.current?.play()
        setIsPlaying(true)
      }, 0)
    }
  }

  const handleNext = () => {
    if (trackCount <= 0) return
    const wasPlaying = isPlaying
    const audio = audioRef.current
    if (audio) audio.pause()
    setCurrentIndex((i) => (i + 1) % trackCount)
    setIsPlaying(false)
    if (wasPlaying) {
      setTimeout(() => {
        audioRef.current?.play()
        setIsPlaying(true)
      }, 0)
    }
  }

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0

  const handleProgressClick = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = x / rect.width
    audio.currentTime = percent * duration
    setProgress(audio.currentTime)
  }

  if (!track) return null

  return (
    <div className="music-player">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="music-player__art-wrap">
        {albumArtUrl ? (
          <img
            src={albumArtUrl}
            alt=""
            className="music-player__art"
          />
        ) : (
          <div className="music-player__art music-player__art--placeholder" />
        )}
      </div>
      <h2 className="music-player__title">{artist}</h2>
      <p className="music-player__playlist">{songName}</p>

      <div
        className="music-player__progress-wrap"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-label="Playback progress"
        onClick={handleProgressClick}
      >
        <div
          className="music-player__progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="music-player__controls">
        <button
          type="button"
          className="music-player__btn music-player__btn--prev"
          aria-label="Previous track"
          onClick={handlePrev}
        >
          <FaStepBackward size={20} />
        </button>
        <button
          type="button"
          className="music-player__btn music-player__btn--play"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          onClick={handlePlayPause}
        >
          {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
        </button>
        <button
          type="button"
          className="music-player__btn music-player__btn--next"
          aria-label="Next track"
          onClick={handleNext}
        >
          <FaStepForward size={20} />
        </button>
      </div>
    </div>
  )
}
