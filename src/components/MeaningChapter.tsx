import { useState } from 'react'
import { transmissions } from '../data/content'
import { catalogAudit, meaningEvidence, meaningHypotheses, messageFunctions, messageReadings, motifs, relationshipNodes, relationships, unresolvedMeaning } from '../data/meaning'
import type { EvidenceId } from '../data/meaning'
import { ConfidenceBadge, SourceImage, SourceNote } from './Evidence'
import './meaning.css'

const researchUrl = (name: string) => `${import.meta.env.BASE_URL}research/${name}`

function EvidenceTrail({ ids }: { ids: EvidenceId[] }) {
  return <details className="meaning-evidence">
    <summary>Inspect supporting evidence <span>{ids.join(' · ')}</span></summary>
    <div className="meaning-evidence__body">{ids.map(id => {
      const item = meaningEvidence[id]
      return <article key={id}>
        <div className="meaning-evidence__title"><h5>{id} / {item.title}</h5><ConfidenceBadge level={item.status} /></div>
        <p><b>Recorded observation</b>{item.observation}</p>
        <p className="meaning-evidence__limit"><b>Limit</b>{item.limit}</p>
        {item.images && <div className="meaning-evidence__images">{item.images.slice(0, 2).map(image => <SourceImage id={image} key={image} caption="" />)}</div>}
        {item.official && <a className="meaning-source-link" href={`https://www.youtube.com/watch?v=${item.official}`} target="_blank" rel="noreferrer">Official publication ↗</a>}
        <SourceNote source={item.source} />
      </article>
    })}<a className="meaning-source-link" href={researchUrl('meaning-evidence-matrix.md')} download>Download the full evidence-to-interpretation matrix ↓</a></div>
  </details>
}

function LayeredReading({ observation, structure, meaning, alternative, evidence }: { observation: string; structure: string; meaning: string; alternative: string; evidence: EvidenceId[] }) {
  return <>
    <div className="meaning-layers">
      <div><span className="meaning-layer-label">01 / Observation</span><h4>What the source shows</h4><p>{observation}</p></div>
      <div><span className="meaning-layer-label">02 / Structural interpretation</span><h4>What pattern it supports</h4><p>{structure}</p></div>
      <div><span className="meaning-layer-label">03 / Possible meaning</span><h4>What it might communicate</h4><p>{meaning}</p></div>
    </div>
    <p className="meaning-alternative"><b>Alternative / limit</b>{alternative}</p>
    <EvidenceTrail ids={evidence} />
  </>
}

function ChapterPart({ id, number, title, intro }: { id: string; number: string; title: string; intro: string }) {
  return <div className="meaning-part-heading" id={id}><span className="eyebrow">READING {number} / 07</span><h3>{title}</h3><p>{intro}</p></div>
}

function MotifExplorer() {
  const [selected, setSelected] = useState(motifs[0].id)
  const motif = motifs.find(item => item.id === selected) || motifs[0]
  return <>
    <div className="meaning-selector" role="group" aria-label="Recurring imagery">{motifs.map(item => <button type="button" key={item.id} aria-pressed={item.id === selected} onClick={() => setSelected(item.id)}>{item.label}</button>)}</div>
    <article className="meaning-motif" aria-label={`Reading: ${motif.label}`}>
      <div className={`meaning-image-pair ${motif.images.length === 1 ? 'meaning-image-pair--single' : ''}`}>{motif.images.map(image => <SourceImage key={image} id={image} caption="" />)}</div>
      <h4 className="meaning-reading-title">{motif.title}</h4>
      <LayeredReading observation={meaningEvidence[motif.evidence[0]].observation} {...motif} />
    </article>
  </>
}

function MessageMeaningExplorer() {
  const [selected, setSelected] = useState(messageReadings[0].id)
  const reading = messageReadings.find(item => item.id === selected) || messageReadings[0]
  const transmission = transmissions.find(item => item.id === selected)!
  return <>
    <div className="meaning-selector" role="group" aria-label="Interpret a transmission">{messageReadings.map(item => <button type="button" key={item.id} onClick={() => setSelected(item.id)} aria-pressed={item.id === selected}>{transmissions.find(record => record.id === item.id)!.plain}</button>)}</div>
    <article className="meaning-message" aria-label={`Interpretation of ${transmission.plain}`}>
      <div className="meaning-message__header"><div><p className="eyebrow">{transmission.work} / {transmission.time}</p><h4>{transmission.plain}</h4></div><ConfidenceBadge level={transmission.status} /></div>
      <p className="meaning-cipher"><b>Recorded source</b><code>{transmission.cipher}</code></p>
      <p className="meaning-roles"><b>Possible functions</b>{reading.roles.join(' / ')}</p>
      <LayeredReading observation={`${transmission.note} ${transmission.limit}`} {...reading} />
    </article>
    <details className="meaning-functions"><summary>How to read the five possible functions</summary><dl>{messageFunctions.map(role => <div key={role.name}><dt>{role.name}</dt><dd>{role.example}</dd></div>)}</dl></details>
  </>
}

function RelationshipGraph() {
  const [selected, setSelected] = useState(relationships[0].id)
  const relation = relationships.find(item => item.id === selected) || relationships[0]
  return <>
    <div className="meaning-graph-legend">{['CONFIRMED', 'PROBABLE', 'POSSIBLE', 'UNRESOLVED'].map(level => <ConfidenceBadge key={level} level={level} />)}</div>
    <p className="meaning-graph-explainer">Each line names a particular relationship: official wording, shared material, or a proposed thematic link. A confirmed production link does not automatically mean a shared story.</p>
    <div className="meaning-graph" aria-label="Relationships among the seven works and an older weather-template source">
      <svg viewBox="0 0 1000 340" preserveAspectRatio="none" aria-hidden="true">{relationships.map((edge, index) => {
        const from = relationshipNodes.find(node => node.id === edge.from)!
        const to = relationshipNodes.find(node => node.id === edge.to)!
        return <g key={edge.id} className={`meaning-edge meaning-edge--${edge.status.toLowerCase()} ${edge.id === selected ? 'meaning-edge--selected' : ''}`}>
          <line x1={from.x * 10} y1={from.y * 3.4} x2={to.x * 10} y2={to.y * 3.4} vectorEffect="non-scaling-stroke" />
          {edge.id === selected && <><circle cx={(from.x + to.x) * 5} cy={(from.y + to.y) * 1.7} r="15" /><text x={(from.x + to.x) * 5} y={(from.y + to.y) * 1.7 + 4} textAnchor="middle">{index + 1}</text></>}
        </g>
      })}</svg>
      {relationshipNodes.map(node => <div key={node.id} style={{ left: `${node.x}%`, top: `${node.y}%` }} className={`meaning-node ${relation.from === node.id || relation.to === node.id ? 'meaning-node--selected' : ''}`}><strong>{node.name}</strong><span>{node.note}</span></div>)}
    </div>
    <div className="meaning-relationships" role="group" aria-label="Inspect a relationship">{relationships.map((item, index) => <button type="button" key={item.id} aria-pressed={item.id === selected} onClick={() => setSelected(item.id)}><span>{String(index + 1).padStart(2, '0')}</span><b>{relationshipNodes.find(node => node.id === item.from)!.name} ↔ {relationshipNodes.find(node => node.id === item.to)!.name}</b><small>{item.kind}</small></button>)}</div>
    <article className="meaning-relationship-detail" aria-label="Selected relationship"><div><p className="eyebrow">{relation.kind}</p><ConfidenceBadge level={relation.status} /></div><h4>{relation.observation}</h4><p>{relation.limit}</p><EvidenceTrail ids={relation.evidence} /></article>
    <div className="meaning-catalog"><h4>Companion to what?</h4><p>“Piece” gives us reason to start with an artwork relationship. A counterpart, another perspective, a narrative supplement and a recurring experiment are possible meanings of that relationship. The label does not choose between them.</p><p>The exact accessible descriptions name one external link: ABYSS → COM2603. COM2601 and COM2602 name themselves as Companion Pieces; no comparable external reference was recovered in this subset. No missing works are inferred.</p>
      <details><summary>Inspect the official-description audit</summary><p>Preserved snapshot: {catalogAudit.snapshotDate}. {catalogAudit.accessibleRecords}/{catalogAudit.watchRecords} watch records accessible; {catalogAudit.nonemptyDescriptions} nonempty descriptions; {catalogAudit.exactSegments}/{catalogAudit.attemptedSegments} decoded segments passed the warning-free exact-round-trip gate.</p><ul>{catalogAudit.references.map(record => <li key={record.id}><a target="_blank" rel="noreferrer" href={`https://www.youtube.com/watch?v=${record.id}`}>{record.selfLabel ? 'Self-label' : 'External reference'} ↗</a><strong>{record.decoded}</strong><code>{record.ciphertext}</code></li>)}</ul><p>{catalogAudit.scope} Fresh official-page retrieval supplied no additional evidence during this extension.</p></details>
      <EvidenceTrail ids={['E01', 'E05', 'E12', 'E13']} />
    </div>
  </>
}

const observerFrames = [
  { id: 'eye-01', label: 'The Eye', observation: 'A large processed Eye is visible. A performer follows in the sequence.', structure: 'A representation of seeing recurs in two COM works, followed by altered cards and different displays.', meaning: 'One possible reading is that your own effort to recognize and connect images echoes an observer’s activity. The Eye is not identified as you.' },
  { id: 'swim', label: 'A face / waterline', observation: 'A pale face and waterline are visible under processing.', structure: 'Water and human imagery recur elsewhere, but this is not an established same-shot or same-person match.', meaning: 'Recognition may feel unstable: you can identify a subject without knowing its identity or role. A literal passage into another world remains unproved.' },
]
const observerLayers = [
  { id: 'observation', name: '01 / Observation' },
  { id: 'structure', name: '02 / Structural interpretation' },
  { id: 'meaning', name: '03 / Possible meaning' },
] as const

function ObserverReading() {
  const [frameId, setFrameId] = useState(observerFrames[0].id)
  const [layer, setLayer] = useState<(typeof observerLayers)[number]['id']>('observation')
  const frame = observerFrames.find(item => item.id === frameId) || observerFrames[0]
  return <>
    <div className="meaning-observer"><div><div className="meaning-selector" role="group" aria-label="Observer example frame">{observerFrames.map(item => <button type="button" key={item.id} aria-pressed={frameId === item.id} onClick={() => setFrameId(item.id)}>{item.label}</button>)}</div><SourceImage id={frame.id} caption="The source frame stays the same as you change the reading" /></div><div className="meaning-observer__reading"><p className="eyebrow">TRY THE THREE LAYERS</p><h4>Change the reading.<br />Keep the image.</h4><div className="meaning-selector meaning-selector--layers" role="group" aria-label="Reading layer">{observerLayers.map(item => <button type="button" key={item.id} aria-pressed={layer === item.id} onClick={() => setLayer(item.id)}>{item.name}</button>)}</div><p className="meaning-observer__copy" aria-live="polite">{frame[layer]}</p></div></div>
    <p className="meaning-viewer-note">Decoding, comparing and recognizing are activities a viewer can perform. Whether the creator intended the audience to become “the observer” remains a hypothesis. Older official TESTERS / CONTROL wording shows participatory fiction on the channel; it does not assign that role to the COM viewer.</p>
    <EvidenceTrail ids={['E02', 'E03', 'E11', 'E14', 'E18']} />
  </>
}

function HypothesisExplorer() {
  const [selected, setSelected] = useState(meaningHypotheses[0].id)
  const model = meaningHypotheses.find(item => item.id === selected) || meaningHypotheses[0]
  return <>
    <div className="meaning-hypothesis-index" role="group" aria-label="Compare explanatory models">{meaningHypotheses.map(item => <button type="button" key={item.id} onClick={() => setSelected(item.id)} aria-pressed={selected === item.id}><span>{item.id}</span><strong>{item.name}</strong></button>)}</div>
    <article className="meaning-model" aria-label={`Model ${model.id}: ${model.name}`}><div className="meaning-model__heading"><span>{model.id}</span><div><p className="eyebrow">EXPLANATORY MODEL / NOT A CREATOR STATEMENT</p><h4>{model.name}</h4><p>{model.confidence}</p></div></div><dl className="meaning-model__criteria"><div><dt>Supporting evidence</dt><dd>{model.support}</dd></div><div><dt>Contradiction / pressure</dt><dd>{model.friction}</dd></div><div><dt>Still unexplained</dt><dd>{model.unexplained}</dd></div><div><dt>Additional assumptions</dt><dd>{model.assumptions}</dd></div><div className="meaning-model__prediction"><dt>What could distinguish it?</dt><dd>{model.prediction}</dd></div></dl><EvidenceTrail ids={model.evidence} /></article>
    <details className="meaning-model-summary"><summary>Compare confidence and assumptions side by side</summary><div className="meaning-table-scroll"><table><caption>Qualitative judgments; these are not probabilities of artistic intent.</caption><thead><tr><th scope="col">Model</th><th scope="col">Confidence</th><th scope="col">Extra assumptions</th></tr></thead><tbody>{meaningHypotheses.map(item => <tr key={item.id}><th scope="row">{item.id} / {item.name}</th><td>{item.confidence}</td><td>{item.assumptions}</td></tr>)}</tbody></table></div></details>
    <p className="meaning-model-note">H1 and H2 can coexist: deliberate art is a construction account; transformation is a supported way to describe its method. Neither uniquely identifies the creator’s intention. These H1–H4 labels follow this chapter, not the older nine-model ledger.</p>
  </>
}

const chapterLinks = [
  ['meaning-return', 'Why everything returns'], ['meaning-messages', 'Commands or metaphors?'], ['meaning-companion', 'Companion to what?'], ['meaning-observer', 'Who is the observer?'], ['meaning-models', 'Compare four readings'], ['meaning-unknowns', 'What remains open'], ['meaning-synthesis', 'A defensible reading'],
]

export function MeaningChapter() {
  return <section className="section meaning-section meaning-chapter" id="meaning" aria-labelledby="meaning-title">
    <div className="section-heading"><div className="section-heading__number">06<span> / 08</span></div><div><p className="eyebrow">FROM CONSTRUCTION TO INTERPRETATION</p><h2 id="meaning-title">The meaning behind<br />The Companion Files</h2><p className="meaning-subtitle">What are these works trying to tell us?</p><p className="section-intro">The record tells us how images and sounds were arranged. The next step is to ask why those choices may matter—and how far each reading can go.</p></div></div>
    <nav className="meaning-chapter-nav" aria-label="Meaning chapter navigation">{chapterLinks.map(([id, label], index) => <a key={id} href={`#${id}`}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a>)}</nav>
    <div className="meaning-method"><p><strong>Observation</strong>What can be seen, decoded or measured.</p><span aria-hidden="true">→</span><p><strong>Structural interpretation</strong>What pattern those facts support.</p><span aria-hidden="true">→</span><p><strong>Possible meaning</strong>What that pattern might communicate.</p></div>

    <ChapterPart id="meaning-return" number="01" title="Why does everything return?" intro="Choose a motif. Notice what stays recognizable, what changes, and what a story would have to add." />
    <MotifExplorer />
    <ChapterPart id="meaning-messages" number="02" title="Are these messages commands—or metaphors?" intro="A verified word is a discovery. Its role in the work still needs interpretation. Several functions can coexist." />
    <MessageMeaningExplorer />
    <ChapterPart id="meaning-companion" number="03" title="Companion to what?" intro="An explicit relationship and an unexplained relationship can be the same thing. Select a line to see exactly what it establishes." />
    <RelationshipGraph />
    <ChapterPart id="meaning-observer" number="04" title="Who is the observer?" intro="The Eye represents seeing. You are also looking, recognizing and comparing. Connecting those facts is a reading we can examine." />
    <ObserverReading />
    <ChapterPart id="meaning-models" number="05" title="Four ways to understand the files" intro="Compare support, counterexamples, missing explanations and assumptions. A compelling story earns no extra evidence by sounding complete." />
    <HypothesisExplorer />
    <ChapterPart id="meaning-unknowns" number="06" title="What we still cannot explain" intro="A useful open question names the evidence that could change the interpretation." />
    <div className="meaning-open-questions">{unresolvedMeaning.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p><EvidenceTrail ids={item.evidence} /></details>)}</div>
    <ChapterPart id="meaning-synthesis" number="07" title="The most defensible interpretation" intro="The fewest assumptions give us a starting point, not privileged access to the artist’s mind." />
    <div className="meaning-conclusion"><p className="eyebrow">A SUPPORTED METHOD / AN OPEN INTENTION</p><p className="meaning-conclusion__lead">Familiar things return through unfamiliar representations. The work gives us enough to recognize them, while repeatedly changing how we see them.</p><p>Organized audiovisual art, with representation and transformation as its observable method, fits the record with the fewest added entities. System language offers an appearance of order; older official fiction keeps a wider narrative possible. A literal machine, one continuous journey and a viewer assigned as observer require evidence we do not yet have.</p><strong>Understanding the construction<br />of an artwork is not the same<br /><em>as knowing the artist’s intention.</em></strong><EvidenceTrail ids={['E02', 'E03', 'E04', 'E07', 'E09', 'E11', 'E12']} /></div>
    <div className="meaning-downloads"><div><p className="eyebrow">READ THE RESEARCH</p><p>Source observations, interpretations, alternatives and the bounded catalog audit.</p></div><a href={researchUrl('companion-meaning-analysis.md')} download>Research document ↓</a><a href={researchUrl('meaning-evidence-matrix.md')} download>Evidence matrix ↓</a><a href={researchUrl('companion-meaning-summary.md')} download>Executive summary ↓</a></div>
  </section>
}
