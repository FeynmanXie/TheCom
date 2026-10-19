# The Archive of 312 — archive content specification

An Independent Investigation into 3121534312

## Routes and existing publication

- `/archive`: featured Companion preview dialog, seven reviewed records, computed counts and filters.
- `/collections/companion-files`: COM2601 → COM2602 → COM2603, exactly three primary entries. ABYSS is a separate related follow-on work.
- `/works/:slug`: reusable structured investigation article.
- `/`: the complete existing investigative publication, including original charts, audio players, selected-still browser and meaning chapter.
- `/credits`: existing credits and indexing protections.

The Companion Files is an archive-defined collection, not a claim of an official season. Cards navigate to local articles. Separate Watch on YouTube links use verified IDs and `target="_blank" rel="noopener noreferrer"`. No video files or automatic YouTube embeds were added. Absent articles/official links have explicit unavailable states. All production hosts must rewrite these application routes to `index.html`; the Vite preview supports this fallback. This change does not configure or deploy a hosting service.

## Model and validation

`src/archive/schema.ts` defines `ArchiveRecord`, provenance classes, controlled categories and statuses, and runtime validation. `records.json` is the metadata registry; `registry.ts` composes its records with existing curated transmissions, chapters, meaning evidence and the selected-media manifest. It reuses existing research rather than creating another interpretation ledger. Validation runs at module initialization and in `npm run test:archive`. TypeScript checks the final data model during the production build.

Validation rejects duplicate IDs/slugs, malformed or inconsistent YouTube IDs/URLs, unsupported taxonomy, unproven season labels, missing field-source mappings, invalid dates/durations, article-path mismatch, invalid evidence confidence, malformed hashes and dangling relationships. Translations require language and provenance. Optional metadata uses JSON null; the UI renders Unknown/Unavailable. Complete translated titles are currently unavailable. COM2601/02/03 are archive aliases; no decoded official title is asserted for them. Their official descriptions, which are separate from their titles, name Companion Pieces.

Statuses:

- `partially_solved`: at least one accepted finding, with substantial unresolved questions. All seven records currently qualify; no full solution is claimed.
- `solved`: requires an explicit `resolutionCriteria`, a supported resolution of the central puzzle, confirmed findings and no remaining central open question. No current record qualifies. A decoded title alone is insufficient.
- `unresolved`: substantively reviewed, without an accepted finding.
- `not_reviewed`: no substantive review yet. Do not invent a record merely to populate this filter.

Relationships use creator-explicit, reused-asset, reused-interface or thematic-resemblance kinds with confidence, citation and an explicit limit. Only the creator-explicit ABYSS↔COM2603 relationship is currently asserted on work records; broader comparisons remain in the original evidence-led chapter.

## Source-to-record mapping

All source paths in the registry are relative to the separate parent investigation. They identify preserved snapshots, not served raw files. Snapshot SHA-256 values are stored per record. Full original metadata, source films, lossless audio and raw evidence remain outside Website Git. Publication dates and runtimes are official metadata values; lastReviewedAt/lastUpdatedAt are research/editorial dates.

| Record | Official metadata snapshot | Official video ID | Findings / neutral synopsis |
| --- | --- | --- | --- |
| COM2601 | `evidence/decoded/companion_2601.info.json` | `2eSrFAMJY2s` | `companion-master-timeline.md`, `companion-transmissions.md`, `companion-eye-card-analysis.md`, `companion-narration.md` |
| COM2602 | `evidence/decoded/companion_2602.info.json` | `4HIj-9mU4Tw` | `london-scenario-simulation.md`, `com2602-breakthrough.md`, `companion-transmissions.md`, `companion-eye-card-analysis.md` |
| COM2603 | `sources/435354858348183 [Qa5pby9LZhM].info.json` | `Qa5pby9LZhM` | `companion-master-timeline.md`, `companion-transmissions.md`, `companion-narration.md`, `final-companion-synthesis.md` |
| ABYSS THRESHOLD OBSERVER | `sources/post-com2603/jQfXMOSdWEM/*.info.json` | `jQfXMOSdWEM` | `post-com2603-sources.md`, `post-com-audio-visual-forensics.md`, `post-com2603-analysis.md` |
| BENEATH | `sources/post-com2603/PpSA-AGIqCc/*.info.json` | `PpSA-AGIqCc` | same post-COM reports; corrected WHITE LIGHT reconstruction |
| ABOVE | `sources/post-com2603/gJTeoniCg4w/*.info.json` | `gJTeoniCg4w` | same post-COM reports; measured tonal trajectories |
| SWIM | `sources/post-com2603/Bs8mrgXF6R0/*.info.json` | `Bs8mrgXF6R0` | same post-COM reports; VOID description and bounded AV comparisons |

The exact paths, titles, descriptions, upload dates, channel IDs, IDs and runtimes came from the indicated local official metadata snapshots. COM publication metadata is cross-checked by `reports/companion-investigation.md`; later metadata and title decodings by `reports/post-com2603-sources.md`. No new live-watch verification is claimed. These citations describe the preserved 2026-10-17 evidence state.

Field provenance:

| Fields | Authority |
| --- | --- |
| originalTitle, creator, officialVideoUrl, youtubeVideoId, publishedAt, durationSeconds, original description | Official metadata snapshot; `metadata` source ID |
| decodedTitle | Verified post-COM source register or null; `source-register` and `metadata` IDs |
| translatedTitle | Null; no unsupported translation asserted |
| thumbnail, alt text, frame time, processing, media rights | Existing `src/data/evidence-manifest.json`; `selected-media` source ID |
| displayTitle, collectionIds, categories, articlePath, season null, status and resolution criteria | Archive editorial choices documented here; `archive-editorial` source ID |
| chronology | Official dates establish publication order **within these seven reviewed works**; viewing order is archive-defined, not a chronology of fictional events |
| verifiedFindings and openQuestions | Existing `content.ts`, `meaning.ts`, cited reports and source/time references, with original confidence and uncertainty retained |
| relatedWorks | Creator-authored ABYSS description, verified by post-COM source register |
| lastReviewedAt / lastUpdatedAt | Preserved research review date / date of this archive record composition; not upload timestamps |

Selected portable report copies are served from `public/research`. Their text is unchanged. Internal report links to raw evidence identify the parent archive and are not promised as public downloads. Use the article's selected images, player and provenance disclosure for the media actually served by this website. Original Phase I–V reports and evidence were read, not modified. Earlier verified works are deliberately not published as incomplete placeholder records; the registry and template support their later addition.

## Author a record

1. Start with an exact official metadata snapshot and verify channel ID `UCZuo5SNTcSRxTg_1xnqkUKQ`. Preserve numeric title and description spelling. Calculate the snapshot hash; do not copy private or unnecessary raw metadata into Website.
2. Add a unique lower-case ID/slug and metadata in `records.json`. Use null for unknown values, with provenance mappings. Separate display aliases, decoded titles and translations.
3. Assign controlled categories and archive collections explicitly. Do not invent seasons. Collection membership does not imply an official series declaration.
4. In `registry.ts`, compose the synopsis, findings with confidence/citation, open questions, report references, media IDs and typed relationships from reviewed sources. Add any new collection definition and authoring source mapping. Current collection order remains fixed to COM2601–03.
5. Reuse only approved selected derivative media. New previews require alt text, attribution and complete manifest provenance. No full-video downloads or third-party embeds are needed for a card.
6. Add bounded public report copies if appropriate and verify each article citation/download. Unavailable articles must use `articlePath: null`; unavailable official links require both official URL and video ID null.
7. Run `npm run test:archive`, `npm run build`, and browser checks for the preview dialog, article/YouTube link separation, filters, back/forward, direct routes, evidence disclosure and existing media. Verify desktop layout and narrow-screen CSS/keyboard controls. Inspect the Website Git diff before committing.

## Verification for this implementation

Automated tests exercise all current records, collection membership/order, search by numeric title and clue, combined category/collection filters, status and unknown-season filters, asset/report existence and rejection of invalid provenance, URLs, relationships, seasons and full-solution claims. Production typecheck/build is required separately. The existing application emits Vite's non-blocking >500 kB chunk warning; no code splitting claim is made.
