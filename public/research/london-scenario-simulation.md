# COM2602 London scenario simulation: source-frame reconstruction

## Source and interval

The preserved official COM2602 file is [`4HIj-9mU4Tw.mkv`](../evidence/external/4HIj-9mU4Tw.mkv), SHA-256 `9378f75e82a2bf5a362274eceabc2239c1f485467fc4081cbeee2f4adacd073f`. The video is 1280×720 at a constant 25 fps. The city/interface and attached ticker run from **source frame 178, PTS 7.12 s, through frame 1387, PTS 55.48 s**, inclusive: 1,210 frames / 48.40 s of frame time. Frame 177 is the top-hatted performer; frame **1388** is the first blue abstract montage image. An earlier navigation ledger placed the blue transition five frames late; native f1387/f1388 inspection corrects it. The two-row ticker specifically occupies **frames 1324–1387 / 52.96–55.48 s**. See [ticker reconstruction](com2602-breakthrough.md). The hard city-to-ticker boundary is an edit/obscuration, not a separate semantic transmission. See [boundary sheet](../evidence/london-simulation/crops/boundary_exact_sheet.jpg).

All **1,373 original frames 103–1475** were extracted to [`fullrate/`](../evidence/london-simulation/fullrate/), providing 75 frames (3.00 s) before the first interval frame and 82 frames (3.28 s) after the last. The [manifest](../evidence/london-simulation/fullrate/manifest.json) records source identity and extraction settings; a sequential filename check found no gaps. These PNGs preserve native frame resolution; contact/zoom images are derivatives. This is the original 720p available local stream, not a 4K reconstruction.

## Header: independent cipher and Japanese readings

The clean upper-left numeric banner has **55 separately segmented glyphs**. The [temporal median](../evidence/london-simulation/composites/top_median_190_800_8x.png) and [indexed source glyph sheet](../evidence/london-simulation/crops/top_glyphs_indexed.png) resolve the two formerly uncertain cells as `4` and `0` by their shapes and repeated in-line glyph forms. Exact source ciphertext:

`2135352121535203443155241261653034165131321341312165352`

The pinned historical Java decoder returns **`LONDON SCENARIO SIMULATION`** and round-trip encoding reproduces the source digits exactly. This is **CONFIRMED**, independently of the community plaintext lead. It first appears at frame **199 / 7.96 s**. Frame 1295 / 51.80 s is the last strong source-template match; glitches interrupt visibility before that, so this is a last *readable* frame rather than a claim of continuous display.

Before it, frames **190–198 / 7.60–7.92 s** display `ロンドンシナリオシミュレーション` in the **same upper-left header position**; [source crop](../evidence/london-simulation/crops/japanese_f194_10x.png). Romanization: *Rondon shinario shimyurēshon*; literal sense: “London scenario simulation.” This is a Japanese katakana rendering of the same label, followed in the very next frame by its Trinary representation. The source shows no independently recoverable separator character. The adjacent timing, identical position and matching meaning support a **CONFIRMED two-form header**, not a general rule that every label switches languages. No other Japanese string was validated in the sequence.

## Node-label audit

The highest-confidence node-specific source text is next to a white outlined square around frame 235 / 9.40 s. Two source rows contain 15 glyphs each. [Indexed crop](../evidence/london-simulation/crops/alt_safe_house_indexed.png):

`412161203444231` / `501352616415042`

Joining the displayed lines without inserting characters gives `412161203444231501352616415042` → **`ALT SAFE HOUSE B`**, exact pinned-decoder round trip. The `3` in the upper row and both `0` glyphs in the lower row are supported by the native pixels across adjacent frames, though generic OCR varies. This is **CONFIRMED as an interface label**, not evidence that the depicted building is an actual safe house or that anyone travels there. Its observable marker is an outlined square; a stable line to another named node was not demonstrated.

Two other node-adjacent two-row numeric labels are present. One near x≈900,y≈420 in frames 625–665 appears over bright building outlines and intermittent glitch ([temporal sheet](../evidence/london-simulation/crops/label_26_temporal.jpg)); another near x≈480,y≈143 tracks through frames 1241–1261 ([registered median](../evidence/london-simulation/composites/label50_registered_median_10x.png)). Their **complete ciphertexts are not recoverable with confidence**. The tracking result supports that the latter is one moving graphic/object label, not 21 different nodes. OCR guesses changed with preprocessing; no candidate plaintext was promoted on that basis.

A later [breakthrough pass](com2602-breakthrough.md) independently recovered another boxed label: `135261215` / `213034161` / `5262641` → **HOTEL SIERRA**, exact pinned-decoder round trip, source frames 965–1157. The currently fully recoverable unique node-label count is **two**. This is a lower bound, because many yellow/green boxes and X marks have no readable adjacent text at 720p. The community candidate `HOTEL SIERRA` is now **CONFIRMED** from independent source pixels. `TRANSPORT ENTRANCE 1`, `ACCOMODATIONS`, `TOSHOKAN`, and `TRANSPONDER` remain **UNRESOLVED as source claims**. None of the remaining candidates is rejected as impossible; no exact source ciphertext has been established for them. In particular, the Japanese word 図書館 (*toshokan*, “library”) cannot be assigned to any source node merely because it is a plausible reading. `HOTEL` and `SIERRA` are phonetic-alphabet words, but the label does not establish a phonetic naming system, a physical hotel, or a tracking/transponder function. [Updated node ledger](../evidence/london-simulation/nodes-v2.csv) records two confirmed and two unresolved label regions; [transmission ledger](../evidence/london-simulation/transmissions.csv) retains the headers and ticker.

## City and source provenance

The city sequence is not just an arbitrary skyline: frame [800 / 32.00 s](../evidence/london-simulation/crops/gherkin_f0800.png) contains a rounded, tapering tower with a diamond/diagrid facade consistent with **30 St Mary Axe (the Gherkin)**. The building's form and City of London location are documented by [the building's site](https://thegherkin.com/) and the [City of London](https://www.cityoflondon.gov.uk/assets/Things-to-do/designs-of-the-times.pdf). The river bend in [frame 200](../evidence/london-simulation/fullrate/f_00200.png) also looks compatible with the Thames. This yields **PROBABLE City of London depiction** from the visual evidence, alongside the independently confirmed London header; no pixel-level map registration or exact source-camera position was achieved. The represented area is plausibly the City financial district around 30 St Mary Axe; this is an inference, not a georeferenced polygon.

External searches occurred **after** extracting clean frames. Queries: `30 St Mary Axe Gherkin City of London diagonal diamond lattice official building`; `London aerial city skyline gherkin visualization dashed network routes video`; `London aerial river bends Canary Wharf City of London aerial stock footage network overlay`; image query `aerial view 30 St Mary Axe Gherkin City of London skyscraper`. They supported the landmark morphology but returned **no exact matching master frame or UI/route graphic**. Topical stock results, including an aerial Getty listing and Canary Wharf clips, were not attributed as the source. Original city footage and overlay author remain **UNRESOLVED**.

## Scenario, earlier corpus and REALIGN

The interface visibly places outlined boxes and X marks over aerial imagery. Dense dashed curves fan from one or more convergence points; [network analysis](london-scenario-network.md) explains what can and cannot be traced. `SCENARIO SIMULATION` is source text, and the graphics are a representation of a city, so **simulation/representation is confirmed as a presentation mode**. Surveillance, evacuation, transport, security, disaster response, and communications are all possible uses of such a display; the recovered labels do not identify an operator, real-time data, vehicle, casualty, alarm, schedule or completed mission. “Safe house” alone is insufficient to select one.

COM2601 `REGION BETA` is a white weather/status panel with black English labels and block icons; this London interface is a black edge-outlined aerial with yellow/green boxes, X marks, dashed curves, numeric microtext and one katakana header. Both use the project's Trinary code, but a shared **UI template or fictional backend is not demonstrated**. No same-marker template match or shared status field was recovered. [COM2601 panel](../evidence/companion/keyframes/COM2601_beta_fields_f1866.png).

The London/interface-and-ticker sequence ends with frame 1387 at **55.48 s**; the blue montage begins at **55.52 s**. The blue Moon starts at **112.00 s**, 56.48 s after that cut; the `REALIGN` numeric prefix starts at **112.76 s**, 57.24 s after it. Abstract and transformed scenes separate them. The Moon is visually stable before the code, and the London map does not return afterward in a way that demonstrates a changed node/route state. **Nothing in the London interface is shown to realign.** The new source text strengthens the broader **representation/simulation** reading, but not a literal surveillance system or causal observer model.

## Hypotheses after the label and route audit

| Model | Supporting source evidence | Contradicting/limiting source evidence | Missing discriminator |
|---|---|---|---|
| H1 surveillance/tracking | Boxed X marks and apparent connection rays | No identified tracked object or live monitor | Target IDs, motion trace, time/status |
| H2 evacuation/emergency response | `ALT SAFE HOUSE B` can fit a refuge node | No evacuees, hazard, instructions or directional route | Departure/arrival and emergency status |
| H3 transport/logistics | Network-style paths and city geography | No validated transport label, vehicle or flow direction | Transport nodes and direction |
| H4 security/mission | Confirmed safe-house label | No operation, threat, actors or objective | Mission actions and roles |
| H5 disaster response | COM2601 has a separate snowstorm panel | No disaster field in this London display; system link unproved | Local hazard and shared UI |
| H6 communications/network | Fan-in/fan-out geometry | No validated link type or endpoint connectivity | Data-flow labels/direction |
| H7 fictional/abstract interface | Stylized, heavily transformed city and dense decorative-looking overlay | Some code and a named node are real, not random texture | Original unprocessed UI/master |
| H8 hybrid | Simulation title, city layer, named node and network graphics coexist | No precise operational schema | Legible node/route set |

**Most consistent bounded description:** a stylized **city scenario-simulation/network overlay** with two confirmed named nodes. Whether its lines are journeys, surveillance connections, communication links, or decorative compositing remains **UNRESOLVED**.

## Direct answers and changed conclusions

1. `LONDON SCENARIO SIMULATION`: **CONFIRMED** from exact source digits.
2. Japanese rendering: **CONFIRMED**, frames 190–198, same header slot before Trinary.
3. Source-confirmed node labels: **`ALT SAFE HOUSE B`** and the later recovered **`HOTEL SIERRA`**.
4. `TOSHOKAN`: **UNRESOLVED**; no source-confirmed node string.
5. `HOTEL SIERRA`: **CONFIRMED** from exact 25-digit source string in the later pass.
6. `TRANSPONDER`: **UNRESOLVED**; no source-confirmed node string.
7. Fully recoverable unique node labels: **two** (lower bound).
8. Node-to-node routes: **UNRESOLVED**; convergence and dashed lines confirmed, named endpoints/direction not.
9. Underlying city: **PROBABLE City of London**, supported by Gherkin-like tower and header; exact shot/georegistration unresolved.
10. Scenario type: **stylized city simulation/network overlay**; specific function unresolved.
11. “Surveillance” versus “simulation” versus “routing”: **simulation is explicit text**; routing-like drawing is visible; surveillance remains a possible interpretation.
12. Same UI/system as REGION BETA: **UNRESOLVED / not demonstrated** beyond shared cipher family.
13. Demonstrable `REALIGN` of the map: **REJECTED as an observed event**; the code occurs 57.04 s after the sequence ends.
14. Unreadable: remaining small node strings, ticker sections, endpoint connectivity, UI provenance and operational semantics.
15. Changed from prior synthesis: the header, Japanese language switch and `ALT SAFE HOUSE B` are now source-confirmed; a probable London landmark raises the geographic assessment; the previous “all city microtext unresolved” wording is superseded. The broader observer/system hypothesis remains structural, not a fact claim.
