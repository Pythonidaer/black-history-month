export function ArticleSection({ isMobileViewport }) {
  return (
    <section className="article-section">
      <p className="article-section__eyebrow">February 03, 2026</p>
      <h2 className="article-section__headline">The Boxers Champions Ducked</h2>
      <p className="article-section__body">
        During the 1930s–1950s, a group of eight elite Black boxers became known as Boxing's Black Murderers' Row—fighters so skilled and dangerous that champions routinely avoided them, denying them opportunities to compete for world titles.
      </p>
      <p className="article-section__body">
        {isMobileViewport
          ? 'Scroll below to learn more about each boxer\'s career and history.'
          : 'Click the cards below to learn more about each boxer\'s career and history.'}
      </p>
    </section>
  )
}
