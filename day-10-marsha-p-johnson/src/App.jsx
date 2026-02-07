import { figure } from './data'

export default function App() {
  return (
    <main className="app">
      <header className="hero">
        <h1>{figure.name}</h1>
        <p className="tagline">{figure.tagline}</p>
        {figure.dates && <p className="dates">{figure.dates}</p>}
      </header>

      <section className="bio">
        <p>{figure.bio}</p>
      </section>

      {figure.quotes?.length > 0 && (
        <section className="quotes">
          <h2>In their words</h2>
          <ul>
            {figure.quotes.map((q, i) => (
              <li key={i}>
                <blockquote>"{q.text}"</blockquote>
                {q.source && <cite>— {q.source}</cite>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {figure.timeline?.length > 0 && (
        <section className="timeline">
          <h2>Timeline</h2>
          <ul>
            {figure.timeline.map((item, i) => (
              <li key={i}>
                <strong>{item.year}</strong> — {item.event}
              </li>
            ))}
          </ul>
        </section>
      )}

      {figure.links?.length > 0 && (
        <section className="links">
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
    </main>
  )
}
