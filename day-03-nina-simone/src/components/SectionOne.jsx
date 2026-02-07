import { forwardRef } from 'react'

/** Section 1: hero video with letterbox reveal and title/actions. */
const SectionOne = forwardRef(function SectionOne(_, ref) {
  return (
    <section
      ref={ref}
      id="section-1"
      className="section section--one"
      aria-label="Section 1"
    >
      <div className="hero-video">
        <div className="hero-video__letterbox">
          <video
            className="hero-video__video"
            src="/nina_hero_video.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
          <div className="hero-video__overlay" aria-hidden />
        </div>
        <div className="hero-video__content">
          <h1 className="hero-video__title">
            <span className="hero-video__title-line">Nina</span>
            <span className="hero-video__title-line">Simone</span>
          </h1>
          <p className="hero-video__subtitle">
          An interactive exploration of Nina Simone’s work, influence, and cultural impact.
          </p>
          <div className="hero-video__actions">
            <a href="#section-2" className="hero-video__btn hero-video__btn--primary">
              START EXPLORING
            </a>
          </div>
        </div>
      </div>
    </section>
  )
})

export default SectionOne
