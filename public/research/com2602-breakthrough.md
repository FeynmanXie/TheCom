# COM2602 breakthrough pass: new source-supported results

## New ticker reconstruction

The official local source is `evidence/external/4HIj-9mU4Tw.mkv` (SHA-256 `9378f75e82a2bf5a362274eceabc2239c1f485467fc4081cbeee2f4adacd073f`). Every source frame in the ticker interval is preserved as `evidence/london-simulation/fullrate/f_01324.png` through `f_01387.png`: **64 frames, PTS 52.96–55.48 s inclusive** at 25 fps. Frame 1323 has no ticker; frame 1387 still contains distorted remnants; frame 1388 has changed to the next blue scene. Earlier `1325–1393` and `816` readings in the broad survey are superseded by this source-frame audit. The right-row group is visibly **`016`**, beginning with a zero.

Registration of the two rows independently gives approximately **3 source pixels leftward per frame** in clean stretches. Four five-frame pairs each move 15 pixels in both rows; their [measured pixel correlations](../evidence/london-simulation/composites/ticker_motion_measurements.csv) are 0.966–0.989. The [source-frame strip](../evidence/london-simulation/composites/ticker_frame_strip_1324_1387.png), [registered median](../evidence/london-simulation/composites/ticker_registered_median_2x.png), [75th-percentile image](../evidence/london-simulation/composites/ticker_registered_q75_2x.png), and [frame-selected composite](../evidence/london-simulation/composites/ticker_registered_best24_2x.png) show the temporal evidence. Registration code is [`reconstruct_london_ticker.py`](../scripts/reconstruct_london_ticker.py); selected 24-pixel source intervals are in [`ticker_best24_provenance.csv`](../evidence/london-simulation/composites/ticker_best24_provenance.csv).

The longest conservative **display-group** reconstructions are:

| Row | Visible source groups, left to right |
|---|---|
| 1 | `7 | 261 320 123 213 443 ??? 016 523 121 526 546 727` |
| 2 | `1 | 312 131 512 103 121 ?56 561 313 435 261 612 521` |

The isolated initial `7` and `1` are **left-clipped**; any preceding digits are outside the visible field. Spaces between three-digit groups are **display spacing**, not proven encoded spaces. The central black smear moves with the graphic and persists in the temporal stack. Row 1's central display slot is `???`; row 2's first glyph in the corresponding `?56` slot is unresolved. The row-2 `56` is supported by the median and upper-quantile registered views but is lower confidence than clean groups. All asserted and unresolved glyph positions, confidence, approximate registered coordinates and source-frame samples or composite provenance are in [`ticker-reconstruction.csv`](../evidence/london-simulation/ticker-reconstruction.csv). The group slots represent layout; they are not claims about decoder token boundaries.

The pinned historical Java decoder was run only on intact ciphertext spans, with display spaces removed. It returned:

| Exact input | Decoder output | Limit |
|---|---|---|
| `261320123213` | `RH FL` | Left row-1 fragment; may start within a larger token |
| `016523121526546` | ` INTERMI` | Right row-1 fragment; leading blank comes from source `0` |
| `561313435261612` | `OUGHOUT` | Right row-2 fragment |

Other intact spans produce incomplete or error-marked output; they are retained in the [transmission ledger](../evidence/london-simulation/new-transmissions.csv). There is **no defensible full combined ciphertext or plaintext**. Row 1 and row 2 move together and retain the same visible groups through the interval, with no observed loop or replacement. Their relationship as independent messages, a wrapped stream, or consecutive lines is unresolved. Apparent English fragments do not authorize filling `?` cells.

## Newly decoded node: HOTEL SIERRA

A targeted full-frame anomaly check revealed a three-row label beside a white outlined square that the earlier node inventory had missed. In native [frame 1070 / 42.80 s](../evidence/london-simulation/fullrate/f_01070.png), the [8× pixel crop](../evidence/london-simulation/composites/new_label_f1070_8x.png) reads:

`135261215` / `213034161` / `5262641`

Joining the rows in display order without inserting digits gives **`1352612152130341615262641`**. The pinned historical Java decoder returns **`HOTEL SIERRA`**; its encoder returns the exact same 25-digit string ([round-trip log](../evidence/london-simulation/composites/hotel_sierra_decoder_roundtrip.txt)). This was read from source pixels before comparison with the community candidate. The label is **CONFIRMED** as text in the fictional interface. The white square lies near **x=1112, y=183** at frame 1070. The same label is visible from **frame 965 / 38.60 s through frame 1157 / 46.28 s**, with intermittent glitch interruption; frame 964 lacks it and frame 1158 cuts to a different view. The [lifetime sheet](../evidence/london-simulation/composites/hotel_boundary_fullwidth.jpg) preserves representative boundary frames.

`HOTEL` and `SIERRA` are the standard phonetic-alphabet words for H and S according to [NATO's alphabet](https://www.nato.int/content/dam/nato/webready/news/2010-2019/2017/12/21/20180111_nato-alphabet-sign-signal.pdf). That lexical match does **not** establish that the label names a physical hotel, an H/S pair, a call sign, or a destination. No route endpoint or real-world site has been verified for its square.

## Other labels and geography

The two previously detected node-label regions were reviewed in registered multi-frame images: [frame-650 region](../evidence/london-simulation/composites/label26_registered_median_10x.png) and [frame-1250 region](../evidence/london-simulation/composites/label50_registered_median_10x.png). Building-edge overprint and source-resolution loss leave both numeric strings unreadable. [`nodes-v2.csv`](../evidence/london-simulation/nodes-v2.csv) now contains **two independently confirmed labels** and two unresolved regions. `HOTEL SIERRA` is the one community lead newly supported by source ciphertext; the other candidates remain unverified.

A map transformation cannot be estimated from the available observations. A usable projective registration needs several uniquely matched ground-control points in a common camera view. The prior Gherkin identification lies in a later reframed shot; the river curve in frame 235 does not uniquely specify bridge or bank points. The earlier confirmed label's white square is around **x=580, y=353 in frame 235**. Assigning either confirmed square a real address or uncertainty radius would be fabricated precision. [`georegistration.csv`](../evidence/london-simulation/georegistration.csv) leaves geographic coordinates and radii blank for this reason. No transport/library/hotel coincidence can yet be tested.

## Network and anomaly check

At frame [235](../evidence/london-simulation/fullrate/f_00235.png), dashed curves leave a bright upper-left fan and a separate dashed line visually approaches a lower yellow X box ([enlarged crop](../evidence/london-simulation/composites/route_arrow_candidate_f235_3x.png)). Overlap and source resolution prevent validating a precise line-to-marker endpoint or arrowhead. Frames 650 and 800 show further fans, but camera changes prevent proving that these are new hubs. [`network-v2.csv`](../evidence/london-simulation/network-v2.csv) therefore contains **observations rather than asserted node-to-node edges**. Static connectivity versus motion trails remains open.

The full-rate frame-change ranking selected intervals around frames **444–461, 670–682, 912–928, 1058–1070, and 1298–1316**. Every original frame in those windows is retained in five numbered [contact sheets](../evidence/london-simulation/composites/anomaly_all_frames_1058_1070.jpg), alongside an [overview](../evidence/london-simulation/composites/anomaly_frames_contact.jpg). Frame 1070 exposed `HOTEL SIERRA`; the other selected bursts show bright/black glitch washes and transitions, with no further legible text verified. [`new-transmissions.csv`](../evidence/london-simulation/new-transmissions.csv) distinguishes that bounded result from a claim that all short flashes in COM2602 have been excluded.

## Remaining high-value questions

1. Can a less degraded official master expose the central ticker groups and establish row ordering? At 720p they remain hidden even after 64-frame registration.
2. Is there a source frame or original graphic in which the two still-unresolved node labels are unobscured?
3. Can several precise ground-control points be matched in one London camera view, allowing the verified marker to be mapped?
4. Do any dashed curves have independently traceable endpoints or direction in a cleaner source?
5. Are there short text flashes outside the high-change intervals screened here?
