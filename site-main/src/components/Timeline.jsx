export default function Timeline({ figures }) {
  return (
    <ol className="timeline">
      {figures.map((figure) => (
        <li key={figure.id} className="timeline__item">
          <a href={figure.path} target="_blank" rel="noopener noreferrer">
            <span className="timeline__day">Day {String(figure.day).padStart(2, '0')}</span>
            <span className="timeline__name">{figure.name}</span>
          </a>
        </li>
      ))}
    </ol>
  )
}
