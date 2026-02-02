import figuresData from './data/figures.json'
import FigureCard from './components/FigureCard.jsx'
import Timeline from './components/Timeline.jsx'

export default function App() {
  return (
    <main className="app">
      <header className="hero">
        <h1>Black History Month</h1>
        <p className="tagline">30 days. 30 figures.</p>
      </header>

      <section className="timeline-section">
        <h2>This month</h2>
        <Timeline figures={figuresData} />
      </section>

      <section className="cards-section">
        <h2>Explore</h2>
        <div className="cards-grid">
          {figuresData.map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>One site per day. Copy <code>template/</code> to create the next day.</p>
      </footer>
    </main>
  )
}
