import { useState, useCallback, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight, FaCircle, FaChevronUp, FaLinkedin } from 'react-icons/fa'
import { Blockquote } from 'flowbite-react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { figure } from './data'

function useCarousel(total, interval = 6000) {
  const [index, setIndex] = useState(0)
  const goNext = useCallback(() => setIndex((i) => (i + 1) % total), [total])
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total])
  const goTo = useCallback((i) => setIndex(i), [])

  useEffect(() => {
    const id = setInterval(goNext, interval)
    return () => clearInterval(id)
  }, [goNext, interval])

  return [index, goNext, goPrev, goTo]
}

function scrollToId(id) {
  const el = document.getElementById(id || 'content')
  el?.scrollIntoView({ behavior: 'smooth' })
}

function contentWithArchivesLink(text, archivesUrl) {
  if (!text || !archivesUrl) return text
  const parts = text.split("William O'Neal")
  if (parts.length <= 1) return text
  const result = []
  parts.forEach((part, i) => {
    if (i > 0) result.push(<a key={`link-${i}`} href={archivesUrl} target="_blank" rel="noopener noreferrer" className="content-link">William O'Neal</a>)
    result.push(part)
  })
  return result
}

function contentWithLegacyLinks(text, links) {
  if (!text || !links?.length) return text
  let segments = [text]
  links.forEach(({ phrase, url }, linkIndex) => {
    segments = segments.flatMap((seg, segIndex) => {
      if (typeof seg !== 'string') return [seg]
      const parts = seg.split(phrase)
      if (parts.length <= 1) return [seg]
      const newSegs = []
      parts.forEach((part, j) => {
        if (j > 0) newSegs.push(<a key={`legacy-${linkIndex}-${segIndex}-${j}`} href={url} target="_blank" rel="noopener noreferrer" className="content-link">{phrase}</a>)
        newSegs.push(part)
      })
      return newSegs
    })
  })
  return segments
}

export default function App() {
  const slides = figure.heroSlides ?? []
  const total = slides.length
  const [current, goNext, goPrev, goTo] = useCarousel(total, 7000)

  const handleCtaClick = (slide) => {
    scrollToId(slide.ctaTarget || 'content')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!total) {
    return (
      <main className="app">
        <header className="hero">
          <h1>{figure.name}</h1>
          <p className="tagline">{figure.tagline}</p>
          <p className="dates">{figure.dates}</p>
        </header>
        <footer className="footer-simple" />
      </main>
    )
  }

  const who = figure.whoHeWas
  const built = figure.whatHeBuilt
  const rainbow = figure.rainbowCoalition
  const targeted = figure.whyTargeted
  const raid = figure.theRaid
  const aftermath = figure.aftermath
  const legacy = figure.legacy
  const footerData = figure.footer

  return (
    <>
      <header className="top-bar">
        <a href="https://chicago.suntimes.com/2021/1/24/22244731/new-fbi-records-black-panthers-police-reform-fred-hampton-mark-clark-editorial" target="_blank" rel="noopener noreferrer" className="top-bar__logo">Fred Hampton</a>
      </header>

      <section className="hero-carousel">
        <div className="hero-carousel__track">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`hero-carousel__slide ${i === current ? 'hero-carousel__slide--active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden={i !== current}
            >
              <div className="hero-carousel__overlay" />
              <div className="hero-carousel__content">
                <h1 className="hero-carousel__title">{slide.title}</h1>
                <p className="hero-carousel__description">{slide.description}</p>
                <button
                  type="button"
                  className="hero-carousel__cta"
                  onClick={() => handleCtaClick(slide)}
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="hero-carousel__arrow hero-carousel__arrow--prev"
          onClick={goPrev}
          aria-label="Previous slide"
        >
          <FaChevronLeft size={28} />
        </button>
        <button
          type="button"
          className="hero-carousel__arrow hero-carousel__arrow--next"
          onClick={goNext}
          aria-label="Next slide"
        >
          <FaChevronRight size={28} />
        </button>

        <div className="hero-carousel__dots" role="tablist" aria-label="Slides">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              className={`hero-carousel__dot ${i === current ? 'hero-carousel__dot--active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </section>

      <main id="content" className="app">
        {who && (
          <section id={who.id} className="bio-section">
            <h2>{who.title}</h2>
            {Array.isArray(who.content)
              ? who.content.map((para, i) => <p key={i}>{para}</p>)
              : <p>{who.content}</p>}
            {who.statCards?.length > 0 && (
              <div className="stat-cards">
                {who.statCards.map((card, i) => (
                  <div key={i} className="stat-card">
                    <span className="stat-card__value">{card.value}</span>
                    <span className="stat-card__label">{card.label}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {built && (
          <section id={built.id} className="bio-section">
            <h2>{built.title}</h2>
            <p>{built.content}</p>
            {built.bullets?.length > 0 && (
              <ul className="bullet-list">
                {built.bullets.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {built.quoteIndex != null && figure.quotes?.[built.quoteIndex] && (
              <Blockquote className="bio-section__quote border-l-4 border-[var(--accent-yellow)] bg-[var(--vtl-content-bg)] text-[var(--text)] dark:border-[var(--accent-yellow)] dark:bg-[var(--vtl-content-bg)] dark:text-[var(--text)] mt-6">
                <p className="text-lg italic">"{figure.quotes[built.quoteIndex].text}"</p>
                {figure.quotes[built.quoteIndex].source && <cite className="mt-2 block text-sm text-[var(--muted)]">— {figure.quotes[built.quoteIndex].source}</cite>}
              </Blockquote>
            )}
          </section>
        )}

        {rainbow && (
          <section id={rainbow.id} className="bio-section rainbow-section">
            <h2>{rainbow.title}</h2>
            {Array.isArray(rainbow.content)
              ? rainbow.content.map((para, i) => <p key={i}>{para}</p>)
              : <p>{rainbow.content}</p>}
            {rainbow.cards?.length > 0 && (
              <div className="rainbow-cards">
                {rainbow.cards.map((card, i) => (
                  <div key={i} className="rainbow-card">
                    <h3 className="rainbow-card__title">{card.title}</h3>
                    <p className="rainbow-card__body">{card.body}</p>
                  </div>
                ))}
              </div>
            )}
                      </section>
        )}

        {targeted && (
          <section id={targeted.id} className="bio-section">
            <h2>{targeted.title}</h2>
            <p>{contentWithArchivesLink(targeted.content, figure.archivesUrl)}</p>
            {targeted.quoteIndex != null && figure.quotes?.[targeted.quoteIndex] && (
              <Blockquote className="bio-section__quote border-l-4 border-[var(--accent-yellow)] bg-[var(--vtl-content-bg)] text-[var(--text)] dark:border-[var(--accent-yellow)] dark:bg-[var(--vtl-content-bg)] dark:text-[var(--text)] mt-6">
                <p className="text-lg italic">"{figure.quotes[targeted.quoteIndex].text}"</p>
                {figure.quotes[targeted.quoteIndex].source && <cite className="mt-2 block text-sm text-[var(--muted)]">— {figure.quotes[targeted.quoteIndex].source}</cite>}
              </Blockquote>
            )}
          </section>
        )}

        {raid && (
          <section id={raid.id} className="bio-section">
            <h2>{raid.title}</h2>
            <p>{raid.content}</p>
          </section>
        )}

        {aftermath && (
          <section id={aftermath.id} className="bio-section">
            <h2>{aftermath.title}</h2>
            <p>{aftermath.content}</p>
            {aftermath.quoteIndex != null && figure.quotes?.[aftermath.quoteIndex] && (
              <Blockquote className="bio-section__quote border-l-4 border-[var(--accent-yellow)] bg-[var(--vtl-content-bg)] text-[var(--text)] dark:border-[var(--accent-yellow)] dark:bg-[var(--vtl-content-bg)] dark:text-[var(--text)] mt-6">
                <p className="text-lg italic">"{figure.quotes[aftermath.quoteIndex].text}"</p>
                {figure.quotes[aftermath.quoteIndex].source && <cite className="mt-2 block text-sm text-[var(--muted)]">— {figure.quotes[aftermath.quoteIndex].source}</cite>}
              </Blockquote>
            )}
          </section>
        )}

        {legacy && (
          <section id={legacy.id} className="bio-section">
            <h2>{legacy.title}</h2>
            {Array.isArray(legacy.content)
              ? legacy.content.map((para, i) => (
                  <p key={i}>{legacy.links?.length ? contentWithLegacyLinks(para, legacy.links) : para}</p>
                ))
              : <p>{legacy.links?.length ? contentWithLegacyLinks(legacy.content, legacy.links) : legacy.content}</p>}
          </section>
        )}

        {figure.timeline?.length > 0 && (
          <section className="timeline-section-vertical" id="timeline">
            <h2>Timeline</h2>
            <VerticalTimeline lineColor="var(--vtl-line)">
              {figure.timeline.map((item, i) => (
                <VerticalTimelineElement
                  key={i}
                  className="vertical-timeline-element--fred"
                  contentStyle={{
                    background: 'var(--vtl-content-bg)',
                    color: 'var(--vtl-content-text)',
                    border: '1px solid var(--vtl-content-border)',
                  }}
                  contentArrowStyle={{ borderRight: '7px solid var(--vtl-content-bg)' }}
                  date={item.year}
                  dateClassName="vertical-timeline-date"
                  iconStyle={{
                    background: 'var(--vtl-icon-bg)',
                    color: 'var(--vtl-icon-color)',
                  }}
                  icon={<FaCircle size={12} />}
                >
                  <p className="vertical-timeline-element-event">{item.event}</p>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </section>
        )}

        {figure.video?.youtubeId && (
          <section id={figure.video.id} className="video-section">
            <h2>{figure.video.title}</h2>
            <div className="video-section__wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${figure.video.youtubeId}?rel=0`}
                title={figure.video.caption || 'Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="video-section__iframe"
              />
            </div>
            {figure.video.caption && (
              <p className="video-section__caption">{figure.video.caption}</p>
            )}
          </section>
        )}

        {figure.links?.length > 0 && (
          <section className="links" id="learn-more">
            <h2>Learn more</h2>
            <ul>
              {figure.links.map((link, i) => (
                <li key={i}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {footerData && (
          <footer className="site-footer">
            <div className="site-footer__bar">
              <span className="site-footer__bar-text">NAVIGATE</span>
            </div>
            <nav className="site-footer__nav" aria-label="Footer navigation">
              {footerData.navLinks?.map((link, i) => (
                <a key={i} href={link.href} className="site-footer__link">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="site-footer__social">
              <a
                href={footerData.linkedInUrl}
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
              <a href={footerData.designCreditUrl} target="_blank" rel="noopener noreferrer" className="site-footer__credit-link">
                BlackPast.org
              </a>
            </p>
            <p className="site-footer__credit">
              Project by{' '}
              <a href={footerData.projectByUrl} target="_blank" rel="noopener noreferrer" className="site-footer__credit-link">
                {footerData.projectByLabel}
              </a>
              {' '}— in honor of historical and influential figures for Black History Month.
            </p>
          </footer>
        )}

        <button
          type="button"
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FaChevronUp size={20} />
        </button>
      </main>
    </>
  )
}
