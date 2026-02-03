import { HoverCard } from './HoverCard'

export function BoxerCardGrid({ boxers, onCardClick }) {
  return (
    <section className="demo-section demo-section--desktop">
      <div className="demo-section__card-grid">
        {boxers.map((boxer) => (
          <HoverCard
            key={boxer.id}
            id={boxer.id}
            image={boxer.image}
            name={boxer.name}
            imagePosition={boxer.imagePosition}
            onClick={(e) => onCardClick(boxer, e)}
          />
        ))}
      </div>
    </section>
  )
}
