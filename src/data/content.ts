export type Confidence = 'CONFIRMED' | 'PROBABLE' | 'POSSIBLE' | 'UNRESOLVED'

export type Transmission = {
  id: string
  work: string
  time: string
  cipher: string
  plain: string
  status: Confidence
  note: string
  limit: string
  source: string
}

export const transmissions: Transmission[] = [
  { id: 'region-beta', work: 'COM2601', time: '73.40–76.96 s', cipher: 'Visible English panel', plain: 'REGION BETA / SNOW STORM', status: 'CONFIRMED', note: 'Weather and traffic fields are visible beside a separate Matrix strip.', limit: 'Does not establish a literal regional monitoring system.', source: 'reports/companion-transmissions.md; evidence/companion/keyframes/COM2601_beta_fields_f1866.png' },
  { id: 'beta-matrix', work: 'COM2601', time: '73.40–76.96 s', cipher: '29 × 3 visible Matrix cells; fourth row outside frame', plain: 'BETA SNOW STORM', status: 'PROBABLE', note: 'A bounded reconstruction, supported by the adjacent English panel.', limit: 'The complete matrix plaintext is not directly visible.', source: 'reports/matrix-companion-analysis.md' },
  { id: 'normal', work: 'COM2601', time: '77.60–81.00 s', cipher: '4121321303461343121551340552326544213', plain: 'ALL SYSTEMS NORMAL', status: 'CONFIRMED', note: 'Source digits round-trip through the verified Trinary decoder.', limit: 'Does not tell us which system is normal or why the panel also shows a storm.', source: 'reports/companion-transmissions.md; evidence/companion/transmissions.csv' },
  { id: 'london', work: 'COM2602', time: '7.96–51.80 s', cipher: '2135352121535203443155241261653034165131321341312165352', plain: 'LONDON SCENARIO SIMULATION', status: 'CONFIRMED', note: 'The numeric header follows an equivalent Japanese header in the same slot.', limit: 'A simulation label does not prove a live operational simulation.', source: 'reports/london-scenario-simulation.md; evidence/london-simulation/crops/top_glyphs_indexed.png' },
  { id: 'safe-house', work: 'COM2602', time: '8.00–10.00 s', cipher: '412161203444231 / 501352616415042', plain: 'ALT SAFE HOUSE B', status: 'CONFIRMED', note: 'Two native-frame rows sit beside an outlined square.', limit: 'The label does not prove a real safe house or travel to one.', source: 'reports/london-scenario-simulation.md; evidence/london-simulation/crops/alt_safe_house_indexed.png' },
  { id: 'hotel', work: 'COM2602', time: '38.60–46.28 s', cipher: '135261215 / 213034161 / 5262641', plain: 'HOTEL SIERRA', status: 'CONFIRMED', note: 'Recovered from three original-frame rows and exact decoder round trip.', limit: 'Neither a physical hotel nor a node-to-node route is established.', source: 'reports/com2602-breakthrough.md; evidence/london-simulation/composites/new_label_f1070_8x.png' },
  { id: 'realign', work: 'COM2602', time: '112.76–113.80 s', cipher: '2615412131613152???', plain: 'REALIGN…', status: 'CONFIRMED', note: 'The readable prefix begins immediately after a blue Moon shot.', limit: 'The suffix is obscured; no Moon displacement or changed London map is observed.', source: 'reports/companion-transmissions.md' },
  { id: 'end', work: 'COM2603', time: '380.72–383.48 s', cipher: '15521210531230213165215', plain: 'END OF LINE', status: 'CONFIRMED', note: 'Blue numeric screen, verified source transcription.', limit: 'It does not end the work or establish a persistent terminal state.', source: 'reports/companion-transmissions.md; evidence/frames/transmission/full_381.png' },
  { id: 'healin', work: 'COM2603', time: '384.60–394.44 s', cipher: '13215412131652???', plain: 'HEALIN…', status: 'CONFIRMED', note: 'Only this prefix survives the damaged red message.', limit: 'HEALING is not a verified completion; no healing operation is shown.', source: 'reports/companion-transmissions.md' },
  { id: 'com', work: 'COM2601/02/03', time: 'Final ~10 s', cipher: '435351', plain: 'COM', status: 'CONFIRMED', note: 'The works share an audiovisual closing template.', limit: 'A shared sign-off does not prove a single continuous story.', source: 'reports/final-companion-synthesis.md; evidence/companion/closing_video_COM2601_COM2602.txt' },
  { id: 'abyss-link', work: 'ABYSS', time: 'Official description', cipher: '4353512344521653520234615431501858348183', plain: 'COMPANION PIECE 2603', status: 'CONFIRMED', note: 'Creator-provided metadata explicitly links ABYSS to COM2603.', limit: 'Does not by itself define a shared story or observer identity.', source: 'reports/post-com2603-sources.md; sources/post-com2603/jQfXMOSdWEM/official_identity.json' },
  { id: 'gamma', work: 'BENEATH', time: 'Official description', cipher: '135 232 616 652 352 023 153 165 231 201 344 515 440', plain: 'HORIZON POINT GAMMA', status: 'CONFIRMED', note: 'Grouped digits decode with a trailing encoded space.', limit: 'No unique ALPHA→BETA→GAMMA state chain is demonstrated.', source: 'reports/post-com2603-sources.md' },
  { id: 'white', work: 'BENEATH', time: '9.16–10.00 s', cipher: '35132163121502131613432312', plain: 'WHITE LIGHT', status: 'CONFIRMED', note: 'Two overlapping vertical rows reconstruct one round-trippable message.', limit: 'Earlier VOID LIGHT reading was superseded; this is one message, not two.', source: 'evidence/post-com2603/beneath_white_light_overlap.json; reports/post-com2603-analysis.md' },
  { id: 'void', work: 'SWIM', time: 'Official description', cipher: '3215316121', plain: 'VOID', status: 'CONFIRMED', note: 'Direct decode of the creator description.', limit: 'No validated VOID LIGHT connection to BENEATH follows.', source: 'reports/post-com2603-sources.md' },
]

export const chapters = [
  { n: '01', name: 'COM2601', subtitle: 'The first status screen', duration: '146 s', image: 'beta', finding: 'A weather-like REGION BETA panel and ALL SYSTEMS NORMAL transmission lead into a red Moon and a narrated zebra reflection.', unknown: 'The panel’s operator, the relationship between “normal” and the storm, and the source media remain unresolved.', source: 'reports/companion-master-timeline.md' },
  { n: '02', name: 'COM2602', subtitle: 'A city represented', duration: '242 s', image: 'city', finding: 'An aerial city interface names LONDON SCENARIO SIMULATION, ALT SAFE HOUSE B, and HOTEL SIERRA. A blue Moon precedes REALIGN.', unknown: 'The map’s function, named routes, and any literal realignment are unproven.', source: 'reports/london-scenario-simulation.md; reports/com2602-breakthrough.md' },
  { n: '03', name: 'COM2603', subtitle: 'The line and the return', duration: '497 s', image: 'code-03', finding: 'A long transformed montage reaches END OF LINE and a damaged HEALIN… prefix, then a recolored Moon and later zebra imagery.', unknown: 'The message ending, original imagery, and a single continuous narrative remain unresolved.', source: 'reports/companion-master-timeline.md; reports/companion-transmissions.md' },
]

export const models = [
  { letter: 'A', name: 'Organized audiovisual montage', support: 'Repeated imagery, coded displays, shared closer, and carefully placed edits.', problem: 'Describes construction well but says little about intended meaning.', status: 'Strong conservative account' },
  { letter: 'B', name: 'Media / representation / transformation', support: 'Same source imagery changes color, orientation, context, and presentation. London explicitly says simulation.', problem: 'Intent cannot be isolated from an equally planned montage.', status: 'Strong structural reading' },
  { letter: 'C', name: 'Literal fictional system', support: 'Status fields, nodes, named regions, and operational-sounding messages.', problem: 'No verified operator, causal message→state rule, or stable backend.', status: 'Possible, unproved' },
  { letter: 'D', name: 'Observer / threshold hybrid', support: 'Eye, zebra reflection, waterlines, Moon, and ABYSS title recur around boundaries.', problem: 'Motifs do not identify a literal observer, portal, or mechanism.', status: 'Interpretive model' },
]
