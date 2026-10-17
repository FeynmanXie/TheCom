import { useMemo, useState } from 'react'
import manifest from '../data/evidence-manifest.json'
import type { Confidence } from '../data/content'

export type MediaRecord = (typeof manifest)[number]
export const media = manifest as MediaRecord[]

export function asset(id: string) {
  const record = media.find(item => item.id === id)
  return record ? `${import.meta.env.BASE_URL}${record.path.replace(/^\//, '')}` : ''
}

export function SourceImage({ id, className = '', caption, eager = false }: { id: string; className?: string; caption?: string; eager?: boolean }) {
  const item = media.find(entry => entry.id === id)
  if (!item) return null
  return <figure className={`source-image ${className}`}>
    <img src={asset(id)} alt={item.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    {caption !== undefined && <figcaption><span>{item.work} · {item.timestamp}</span><span>{caption || item.purpose}</span></figcaption>}
  </figure>
}

export function ConfidenceBadge({ level }: { level: Confidence | string }) {
  const group = level === 'CONFIRMED' ? 'confirmed' : level === 'PROBABLE' ? 'probable' : level === 'UNRESOLVED' ? 'unresolved' : 'possible'
  return <span className={`confidence confidence--${group}`}>{level}</span>
}

export function SourceNote({ source }: { source: string }) {
  return <details className="source-note"><summary>Evidence source</summary><p>{source}</p><small>Paths are relative to the parent investigation archive. Source media is not served by this website.</small></details>
}

export function LensPanel({ known, meaning, unknown, source }: { known: string; meaning: string; unknown: string; source: string }) {
  const [lens, setLens] = useState<'evidence' | 'interpretation'>('evidence')
  const copy = useMemo(() => lens === 'evidence' ? known : meaning, [lens, known, meaning])
  return <div className="lens-panel">
    <div className="segmented" role="group" aria-label="Evidence or interpretation view">
      <button type="button" className={lens === 'evidence' ? 'selected' : ''} aria-pressed={lens === 'evidence'} onClick={() => setLens('evidence')}>What we know</button>
      <button type="button" className={lens === 'interpretation' ? 'selected' : ''} aria-pressed={lens === 'interpretation'} onClick={() => setLens('interpretation')}>What it may mean</button>
    </div>
    <p className="lens-copy">{copy}</p>
    <p className="unknown"><span>Still unknown</span>{unknown}</p>
    <SourceNote source={source} />
  </div>
}

export function AudioEvidencePlayer({ ids, title }: { ids: string[]; title: string }) {
  const options = media.filter(item => ids.includes(item.id) && item.type === 'audio')
  const [selected, setSelected] = useState(options[0]?.id || '')
  const item = options.find(option => option.id === selected)
  if (!item) return null
  return <div className="audio-player">
    <div className="audio-player__header"><span className="eyebrow">LISTENING TEST / 01</span><h3>{title}</h3></div>
    <label htmlFor={`audio-${title.replace(/\W/g, '')}`}>Version</label>
    <select id={`audio-${title.replace(/\W/g, '')}`} value={selected} onChange={e => setSelected(e.target.value)}>
      {options.map(option => <option value={option.id} key={option.id}>{option.transformation === 'original' ? 'Original' : option.transformation === 'tempo' ? `${option.playbackFactor}× tempo · pitch preserved` : option.transformation === 'reverse' ? 'Reversed' : `${option.playbackFactor}× speed · pitch shifted`}</option>)}
    </select>
    <audio key={item.id} controls preload="none" src={asset(item.id)} aria-label={`${item.work} ${item.timestamp} ${item.purpose}`} />
    <dl className="audio-meta"><div><dt>Work / source</dt><dd>{item.work} · {item.timestamp}</dd></div><div><dt>Processing</dt><dd>{item.derivation}</dd></div><div><dt>Playback factor</dt><dd>{item.playbackFactor}×</dd></div><div><dt>Pitch preserved</dt><dd>{item.pitchPreserved ? 'Yes' : 'No'}</dd></div><div><dt>Purpose</dt><dd>{item.purpose}</dd></div></dl>
    <p className="microcopy">Processed versions are listening comparisons. They do not establish hidden speech, music, or an original speed.</p>
  </div>
}
