import { forwardRef } from 'react'
import { figure } from '../data'

/** Section 2: intro — media left, text + gold divide right. */
const SectionTwo = forwardRef(function SectionTwo({ inView = false }, ref) {
  return (
    <section
      ref={ref}
      id="section-2"
      className={`section section--two ${inView ? 'section--two--in-view' : ''}`}
      aria-label="Section 2"
    >
      <div className="section--two__media">
        <div className="section--two__hero-wrap">
          <img
            src="/nina_no_mic.webp"
            alt=""
            className="section--two__hero-img"
          />
        </div>
        <div className="section--two__mic-wrap">
          <img
            src="/mic_no_nina.webp"
            alt=""
            className="section--two__mic-img"
          />
        </div>
      </div>
      <div className="section--two__right">
        <h2 className="section--two__title">Overview</h2>
        <div className="section--two__body-wrap">
          {Array.isArray(figure.intro?.body)
            ? figure.intro.body.map((paragraph, i) => (
                <p key={i} className="section--two__body">
                  {paragraph}
                </p>
              ))
            : (
              <p className="section--two__body">{figure.intro?.body}</p>
            )}
        </div>
        <div className="cinematic-gold-divide" aria-hidden="true" />
        <blockquote className="section--two__quote">
          <cite>"{figure.intro?.quote}"</cite>
        </blockquote>
        <div className="cinematic-gold-divide" aria-hidden="true" />
      </div>
    </section>
  )
})

export default SectionTwo
