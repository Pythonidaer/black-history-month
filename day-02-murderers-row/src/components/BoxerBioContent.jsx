import { DECORATOR_IMAGE } from '../constants'

export function BoxerBioContent({ boxer, titleId, className = '', compactFacts = true, showDecorator = false }) {
  if (!boxer) return null
  return (
    <div className={className}>
      <h2 id={titleId} className="card-detail-overlay__name">{boxer.name}</h2>
      {(boxer.born || boxer.from || boxer.died || boxer.divisions || boxer.record) && (
        <dl className="card-detail-overlay__facts">
          {compactFacts && (boxer.born || boxer.died) && (
            <>
              <dt>Lived</dt>
              <dd>{[boxer.born, boxer.died].filter(Boolean).join(' – ')}</dd>
            </>
          )}
          {!compactFacts && boxer.born && (<><dt>Born</dt><dd>{boxer.born}</dd></>)}
          {!compactFacts && boxer.died && (<><dt>Died</dt><dd>{boxer.died}</dd></>)}
          {boxer.from && (<><dt>From</dt><dd>{boxer.from}</dd></>)}
          {boxer.divisions && (<><dt>Divisions</dt><dd>{boxer.divisions}</dd></>)}
          {boxer.record && (<><dt>Record</dt><dd>{boxer.record}</dd></>)}
        </dl>
      )}
      {showDecorator && (
        <img src={DECORATOR_IMAGE} alt="" className="boxer-bio-decorator" aria-hidden="true" />
      )}
      {(boxer.bio ?? '').trim() && (
        <div className="card-detail-overlay__bio">
          {(boxer.bio ?? '').split(/\n\n+/).filter(Boolean).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}
    </div>
  )
}
