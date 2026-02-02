export default function FigureCard({ figure }) {
  const { day, name, tagline, dates, path } = figure
  return (
    <a href={path} className="figure-card" target="_blank" rel="noopener noreferrer">
      <span className="figure-card__day">Day {String(day).padStart(2, '0')}</span>
      <h2 className="figure-card__name">{name}</h2>
      <p className="figure-card__tagline">{tagline}</p>
      {dates && <p className="figure-card__dates">{dates}</p>}
    </a>
  )
}
