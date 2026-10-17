# The Companion Files

An evidence-based interactive documentary about the Companion works by 3121534312. This is a standalone Vite + React + TypeScript project. It deliberately serves a small selected exhibit, not the full forensic archive.

## Run

```sh
npm install
npm run dev
npm run build
npm run preview
```

The project was built and checked with Node 26 and npm 11. The app uses no runtime path into its parent investigation directory. Serve the production `dist/` with a rewrite of `/credits` to `index.html` for direct credit-page visits.

## Content and provenance

- `src/data/content.ts` contains curated transmission, chapter, and model text. Source references point to paths relative to the parent investigation directory.
- `src/data/abyss-measurements.json` contains the original 40 ms measurement rows from `evidence/post-com2603/audio-forensics/abyss_40ms_178_218.csv`.
- `src/data/above-peaks.json` contains the measured two-second frequency peaks from `evidence/post-com2603/audio-forensics/above_band_peaks_2s.csv`.
- `src/data/evidence-manifest.json` records every copied still and audio excerpt, its original investigation path, work, time, purpose, and derivation.
- `public/evidence/` contains resized selected frames and short prepared listening-test MP3s. No full source video or soundtrack is copied.
- `scripts/prepare_evidence.py` regenerates the selected assets and chart data from the sibling investigation archive. It requires Python 3 and macOS `sips`.

Canonical content sources, in reading priority: `reports/companion-system-model.md`, `reports/final-companion-synthesis.md`, `reports/companion-transmissions.md`, `reports/london-scenario-simulation.md`, `reports/com2602-breakthrough.md`, `reports/post-com-audio-visual-forensics.md`, `reports/post-com-audiovisual-master-timeline.md`, and `reports/post-com2603-sources.md`. Older partial London and BENEATH readings are superseded by these reports.

## Editorial limits

The site separates source observations from interpretation. `REALIGN` and `HEALIN…` are confirmed prefixes, not completed words. `WHITE LIGHT` is one reconstructed BENEATH message; the earlier `VOID LIGHT` reading is rejected. ABYSS's sound transitions are measured but do not identify sound sources. The candidate models are presented as explanations, not recovered creator intent.

## Site credit

The footer links to an unlisted `/credits` page for FeynmanXie. The page carries a locally authored SVG logo and dynamic `noindex, nofollow, noarchive` metadata. Source works and excerpts remain credited to 3121534312 and their rights holders.

## License and rights

The original application code and build scripts are available under the [MIT License](LICENSE). This includes the React components, styles, Vite configuration, and evidence-preparation script. Preserve the copyright and license notice when reusing that code.

The MIT grant does **not** cover the audiovisual excerpts in `public/evidence/`, the source-derived measurements and provenance in `src/data/`, the site's editorial text, or the FeynmanXie name, logos, and favicon in `public/brand/` and `public/favicon.svg`. Those materials are included for this investigation only; their appearance in this repository does not grant permission to reuse them. Rights in the original Companion works remain with 3121534312 and any other applicable rights holders. Contact the relevant rights holder before reusing excluded material.
