import { HoverCard } from './HoverCard'
import { BoxerBioContent } from './BoxerBioContent'

export function MobileBoxerStack({ boxers }) {
  return (
    <section className="mobile-boxer-stack" aria-label="Boxer profiles">
      {boxers.map((boxer) => (
        <article key={boxer.id} className="boxer-block">
          <div className="boxer-block__card-wrap">
            <HoverCard
              image={boxer.image}
              name={boxer.name}
              imagePosition={boxer.imagePosition}
              noHover
            />
          </div>
          <BoxerBioContent boxer={boxer} className="boxer-block__content" compactFacts={false} showDecorator />
        </article>
      ))}
    </section>
  )
}
