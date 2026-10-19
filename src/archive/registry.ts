import raw from './records.json'
import { chapters, transmissions } from '../data/content'
import media from '../data/evidence-manifest.json'
import { meaningEvidence, type EvidenceId } from '../data/meaning'
import { validateRegistry, type ArchiveRecord } from './schema'
export const collection = { id: 'companion-files', title: 'The Companion Files', path: '/collections/companion-files', workIds: ['com2601','com2602','com2603'], note: 'An archive-defined investigation collection. No official season is claimed.' }
const later = [
  { synopsis: 'Abstract optical forms give way to built environments, woodland, sea imagery, a woman and a lighthouse. The official description explicitly names COMPANION PIECE 2603.', question: 'The woman’s identity, source footage and relationship to COM2603’s narrative remain unresolved.', findings: ['ABYSS’s official numeric description decodes to COMPANION PIECE 2603.', 'A 40 ms near-silent frame at 212.48 s precedes the lighthouse cut at 212.52 s.'], images: ['abyss-186','abyss-woman','abyss-lighthouse'] },
  { synopsis: 'Processed figures and optical imagery lead to a human eye and a Moon. The eye and Moon are adjacent source frames at 127.68 and 127.72 s.', question: 'The source footage, meaning of HORIZON POINT GAMMA and any connection to ABOVE remain unresolved.', findings: ['Overlapping vertical rows reconstruct WHITE LIGHT, superseding the earlier VOID LIGHT reading.', 'The eye→Moon edit has a +32.85 dB mid-RMS flank change; this is one measured join, not a universal rule.'], images: ['beneath-white','beneath-eye-cut','beneath-moon'] },
  { synopsis: 'Sparse, transformed cloud and city-like imagery accompanies layered pitched material. A low frequency family persists while higher lines move.', question: 'The instrument, source music and original playback speed remain unresolved.', findings: ['Measurements support a ~63–65 Hz family and a ~126–130 Hz harmonic.', 'A moving ~225–310 Hz line and roughly doubled upper line support layered pitched material; a violin is not established.'], images: ['above'] },
  { synopsis: 'A face and waterline give way to aquatic flow and dark contours. Measured sound transitions generally do not align with the strongest picture cuts.', question: 'A literal tunnel, one continuous traveler and a common inversion mechanism remain unverified.', findings: ['The official description decodes to VOID.', 'The earlier VOID LIGHT connection to BENEATH is not validated after the WHITE LIGHT correction.'], images: ['swim','swim-late'] },
]
export const registry = validateRegistry(raw.map(row => {
  const i = ['com2601','com2602','com2603','abyss-threshold-observer','beneath','above','swim'].indexOf(row.id)
  if (i < 0) throw new Error(`Archive curation missing for ${row.id}; add reviewed content before publishing.`)
  const chapter = chapters[i]
  const evidenceIds: EvidenceId[] = i===0 ? ['E02','E03','E05'] : i===1 ? ['E02','E04','E06'] : i===2 ? ['E04','E09','E16'] : []
  const matches = transmissions.filter(t => t.work === row.displayTitle || (i === 3 && t.work === 'ABYSS') || (i < 3 && t.id === 'com'))
  const reportPaths = i < 3 ? ['reports/companion-investigation.md', ...chapter.source.split('; '), 'reports/final-companion-synthesis.md','reports/companion-eye-card-analysis.md','reports/companion-narration.md'] : ['reports/post-com2603-sources.md','reports/post-com-audio-visual-forensics.md','reports/post-com2603-analysis.md']
  const record = { ...row, synopsis: i < 3 ? chapter.finding : later[i-3].synopsis,
    verifiedFindings: [...evidenceIds.map(id => { const e=meaningEvidence[id]; return {text: `${e.observation} ${e.limit}`,confidence:e.status,citation:e.source} }), ...matches.map(t => ({ text: `${t.plain}: ${t.note} ${t.limit}`, confidence: t.status, citation: t.source })), ...(i < 3 ? [] : later[i-3].findings.map(text => ({text, confidence:'CONFIRMED', citation:reportPaths.join('; ')})))],
    openQuestions: [i < 3 ? chapter.unknown : later[i-3].question],
    imageIds: i < 3 ? [['eye-01','card-01','beta','zebra-01'],['eye-02','card-02','city','moon-02'],['code-03','moon-03','zebra-03']][i] : later[i-3].images.filter(id => media.some(m => m.id === id)),
    audioIds: media.filter(m => m.type === 'audio' && m.work === (i===3 ? 'ABYSS' : row.displayTitle)).map(m => m.id),
    reportPaths: [...new Set(reportPaths)]
  } as ArchiveRecord
  return record
}))
export const labelStatus = (status: string) => status.replaceAll('_',' ')
export type Filters = { search: string; status: string; category: string; collection: string; season: string }
export function filterRecords(records: ArchiveRecord[], filters: Filters) {
  const query = filters.search.trim().toLowerCase()
  return records.filter(r => (!query || [r.displayTitle,r.originalTitle,r.decodedTitle,r.synopsis,...r.categories].join(' ').toLowerCase().includes(query)) && (!filters.status || r.investigationStatus === filters.status) && (!filters.category || r.categories.includes(filters.category)) && (!filters.collection || r.collectionIds.includes(filters.collection)) && (!filters.season || (filters.season==='unknown' ? r.season===null : r.season?.label===filters.season)))
}
