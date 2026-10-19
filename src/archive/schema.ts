export const statuses = ['solved', 'partially_solved', 'unresolved', 'not_reviewed'] as const
export type Status = typeof statuses[number]
export const categories = ['Companion', 'transmission', 'visual cipher', 'audio puzzle', 'simulation'] as const
export type Provenance = 'official' | 'community-reported' | 'investigator-verified' | 'interpretation'
export type Citation = { id: string; path: string; kind: Provenance; sha256?: string }
export interface ArchiveRecord {
  id: string; slug: string; originalTitle: string; decodedTitle: string | null
  translatedTitle: { text: string; language: string; source: string } | null
  displayTitle: string; creator: { name: string; channelUrl: string }
  officialVideoUrl: string | null; youtubeVideoId: string | null
  thumbnail: { mediaId: string; attribution: string }
  publishedAt: string | null; durationSeconds: number | null
  description: { kind: Provenance; text: string; source: string }
  collectionIds: string[]; categories: string[]
  season: { label: string; kind: 'official' | 'archive-defined'; source: string } | null
  chronology: { publicationOrder: number | null; viewingOrder: number | null; scope: string }
  investigationStatus: Status; resolutionCriteria: string | null; articlePath: string | null
  sources: Citation[]; fieldSources: Record<string, string[]>
  lastReviewedAt: string; lastUpdatedAt: string
  relatedWorks: { id: string; kind: 'creator-explicit' | 'reused-asset' | 'reused-interface' | 'thematic-resemblance'; confidence: string; citation: string; note: string }[]
  synopsis: string; verifiedFindings: { text: string; confidence: string; citation: string }[]
  openQuestions: string[]; imageIds: string[]; audioIds: string[]; reportPaths: string[]
}
export function validateRegistry(records: ArchiveRecord[]) {
  const ids = new Set<string>(), slugs = new Set<string>()
  const require = (value: unknown, message: string) => { if (!value) throw new Error(`Archive validation: ${message}`) }
  for (const r of records) {
    require(r.id && !ids.has(r.id) && /^[a-z0-9-]+$/.test(r.slug) && !slugs.has(r.slug), 'unique stable ID and slug')
    ids.add(r.id); slugs.add(r.slug)
    require(r.originalTitle && r.displayTitle && r.creator.name === '3121534312', `${r.id}: titles and creator`)
    require(r.creator.channelUrl === 'https://www.youtube.com/channel/UCZuo5SNTcSRxTg_1xnqkUKQ', `${r.id}: verified channel`)
    require(r.youtubeVideoId === null ? r.officialVideoUrl === null : /^[\w-]{11}$/.test(r.youtubeVideoId) && r.officialVideoUrl === `https://www.youtube.com/watch?v=${r.youtubeVideoId}`, `${r.id}: official video URL and ID`)
    require(statuses.includes(r.investigationStatus) && r.categories.every(c => categories.includes(c as typeof categories[number])), `${r.id}: taxonomy`)
    require(r.season === null || (r.season.source && ['official','archive-defined'].includes(r.season.kind)), `${r.id}: season provenance`)
    for (const date of [r.publishedAt,r.lastReviewedAt,r.lastUpdatedAt]) require(date === null || (/^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date))), `${r.id}: date`)
    require(r.durationSeconds === null || r.durationSeconds > 0, `${r.id}: runtime`)
    require(r.articlePath === null || r.articlePath === `/works/${r.slug}`, `${r.id}: article path`)
    require(r.sources.length && r.thumbnail.mediaId && r.thumbnail.attribution && r.synopsis && r.openQuestions.length, `${r.id}: content and sources`)
    for (const field of ['originalTitle','decodedTitle','creator','officialVideoUrl','youtubeVideoId','publishedAt','durationSeconds','description','chronology','displayTitle','thumbnail','translatedTitle','collectionIds','categories','season','investigationStatus','articlePath','lastReviewedAt','lastUpdatedAt','resolutionCriteria']) require(r.fieldSources[field]?.length && r.fieldSources[field].every(id => r.sources.some(s => s.id === id)), `${r.id}: ${field} provenance`)
    require(r.verifiedFindings.every(f => f.text && f.citation && ['CONFIRMED','PROBABLE','POSSIBLE','UNRESOLVED'].includes(f.confidence)), `${r.id}: finding provenance`)
    require(r.investigationStatus !== 'solved' || (r.resolutionCriteria && !r.openQuestions.length && r.verifiedFindings.length && r.verifiedFindings.every(f => f.confidence==='CONFIRMED')), `${r.id}: solved requires documented full resolution criteria and no open questions`)
    require(r.translatedTitle===null || (r.translatedTitle.text && r.translatedTitle.language && r.translatedTitle.source), `${r.id}: translation provenance`)
    require(r.sources.every(s=>['official','community-reported','investigator-verified','interpretation'].includes(s.kind) && s.path && (!s.sha256 || /^[a-f0-9]{64}$/.test(s.sha256))), `${r.id}: provenance classes and hashes`)
  }
  for (const r of records) for (const relation of r.relatedWorks) require(ids.has(relation.id) && relation.citation && ['creator-explicit','reused-asset','reused-interface','thematic-resemblance'].includes(relation.kind), `${r.id}: related work`)
  return records
}
