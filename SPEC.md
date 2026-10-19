# The Archive of 312 — implementation brief

SPEC: ACCEPTED (the supplied build specification, confirmed by the user)
BRANDING: YES (explicit user reply)

## Outcome

A portable, responsive React/TypeScript documentary that gives new visitors a 5–10 minute guided understanding of the Companion corpus and lets them inspect source-backed evidence. The canonical source remains the sibling `reports/`, `evidence/`, and `sources/` directories; selected files and measured datasets are copied into this site with provenance.

## Audience and journey

New visitors enter through a short archive reveal, follow the three COM works, inspect recurring motifs and decoded transmissions, then examine ABYSS and BENEATH/ABOVE/SWIM before comparing explanatory models. A deeper archive is optional. Every interpretation is visually distinguished from observations and unresolved questions.

## Visual direction

An editorial investigation: warm off-white type on near-black, thin rules, modest signal green and amber, source frames used as large visual anchors. Condensed display typography, readable body text, restrained motion, no decorative fake computation. Desktop uses a cinematic reading column and side metadata; mobile collapses to a single column with real controls.

## Architecture and data

Vite, React, TypeScript, CSS. Structured content in `src/data`; reusable evidence, citation, chart, comparison, and player components. Source CSVs are converted to compact JSON at build preparation time. `public/evidence` contains only selected optimized stills and short prepared listening excerpts. `src/data/evidence-manifest.json` records each copied asset's original path, work, time, derivation, confidence, and purpose.

## Evidence constraints

The current `companion-system-model.md`, `final-companion-synthesis.md`, `companion-transmissions.md`, `london-scenario-simulation.md`, `post-com-audio-visual-forensics.md`, and `post-com-audiovisual-master-timeline.md` supersede older uncertain reads. `WHITE LIGHT` is one reconstructed message; `VOID LIGHT` is rejected. `HOTEL SIERRA` is confirmed. `HEALIN…` and `REALIGN` are prefixes only. Sound-source labels remain unverified. No literal system or universal audiovisual cue is claimed.

## Verification

Build and typecheck; inspect desktop and phone; check primary controls, reduced motion, media paths, provenance coverage, and repository boundary. The site is committed only inside this directory, with no remote push.

## Branding decision

The site title is **The Archive of 312**, with the subtitle **An Independent Investigation into 3121534312**. **The Companion Files** remains the name of the Companion-specific investigation chapter; its research titles and content are preserved.

The user approved attribution to **FeynmanXie** and approved a locally created typographic logo. The shared footer phrase is “Site design and development by FeynmanXie.” The unlisted `/credits` route uses `noindex, nofollow, noarchive`, is omitted from navigation and sitemap, and is linked from the shared footer. Copyright year: 2026. Rights wording distinguishes the site design from source audiovisual material, credited to its original creator, 3121534312.

## Meaning chapter extension — 2026-10-17

SPEC: ACCEPTED (the user's supplied “Investigating Meaning and Intent” task)
BRANDING: YES (existing explicit approval and shared footer retained)

Extend `#meaning` into “THE MEANING BEHIND THE COMPANION FILES”, with the subtitle “What are these works trying to tell us?” Reuse the existing evidence components, source frames, confidence badges, theme and shared shell. Add motif comparisons, a message-role explorer, a relationship graph, a viewer/observer exercise, four comparable hypotheses, unresolved questions, and a concise synthesis. Keep observation, structural interpretation and possible meaning visibly distinct. Every major reading must expose its evidence and its limits.

Research deliverables live in the parent investigation's `reports/`: `companion-meaning-analysis.md`, `meaning-evidence-matrix.md`, and `companion-meaning-summary.md`. Portable copies are served from `public/research/`; a preparation script copies only these new reports and audits existing official-description ledgers. Original forensic evidence is read only. The chapter's H1–H4 names follow the new task, with an explicit mapping to the older nine-model ledger.

Navigation links directly to the chapter and its seven subsections. On phones, selectors wrap, the graph becomes stacked relationship entries, and all evidence remains accessible by touch and keyboard. Validate the production build, primary existing and new controls, desktop/phone layouts, media, deep links, and credit route. Review and commit locally. **Do not push or deploy this extension.**
