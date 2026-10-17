"""Copy a deliberately small, provenance-recorded exhibit from the sibling archive."""
from __future__ import annotations

import csv
import json
import subprocess
from pathlib import Path

SITE = Path(__file__).resolve().parents[1]
ROOT = SITE.parent
PUBLIC = SITE / "public/evidence"
DATA = SITE / "src/data"

# ID, investigation-relative source, work, timestamp, purpose, confidence, alt.
IMAGES = [
    ("hero-city", "evidence/companion/keyframes/COM2602_f00200_8.00.jpg", "COM2602", "8.00 s", "Opening source frame and London interface", "CONFIRMED", "Dark edge outlined aerial city with boxed markers and dashed paths"),
    ("eye-01", "evidence/companion/keyframes/COM2601_f01700_68.00.jpg", "COM2601", "68.00 s", "Eye composition comparison", "CONFIRMED", "Large transformed eye in the first Companion work"),
    ("eye-02", "evidence/companion/keyframes/COM2602_f00089_3.56.jpg", "COM2602", "3.56 s", "Eye composition comparison", "CONFIRMED", "Large transformed eye in the second Companion work"),
    ("card-01", "evidence/system-model/eye-card/COM2601/f_01772.png", "COM2601", "70.88 s", "One-heart card source frame", "CONFIRMED", "Top hatted performer showing a card with one heart pip"),
    ("card-02", "evidence/system-model/eye-card/COM2602/f_00155.png", "COM2602", "6.20 s", "Ten-pip card source frame", "PROBABLE", "Top hatted performer showing a degraded diamond-pip card"),
    ("beta", "evidence/companion/keyframes/COM2601_beta_fields_f1866.png", "COM2601", "74.64 s", "REGION BETA status panel", "CONFIRMED", "Weather-like status panel headed REGION BETA"),
    ("city", "evidence/companion/keyframes/COM2602_f00200_8.00.jpg", "COM2602", "8.00 s", "London scenario display", "CONFIRMED", "Outlined city aerial with simulation header and boxed nodes"),
    ("zebra-01", "evidence/companion/keyframes/COM2601_f03125_125.00.jpg", "COM2601", "125.00 s", "Reflection passage", "CONFIRMED", "Processed zebra and its water reflection"),
    ("zebra-02", "evidence/companion/keyframes/COM2602_f04125_165.00.jpg", "COM2602", "165.00 s", "Inverted zebra passage", "CONFIRMED", "Upside down transformed zebra image"),
    ("zebra-03", "evidence/companion/keyframes/COM2603_f11630_465.20.jpg", "COM2603", "465.20 s", "Late zebra return", "CONFIRMED", "Degraded zebra close-up late in COM2603"),
    ("moon-01", "evidence/companion/keyframes/COM2601_f02056_82.24.jpg", "COM2601", "82.24 s", "Red Moon after code", "CONFIRMED", "Red recolored Moon following the first work's numeric code"),
    ("moon-02", "evidence/companion/keyframes/COM2602_f02810_112.40.jpg", "COM2602", "112.40 s", "Blue Moon before REALIGN", "CONFIRMED", "Blue Moon immediately before the REALIGN code"),
    ("moon-03", "evidence/companion/keyframes/COM2603_moon_395.jpg", "COM2603", "~395 s", "Transformed shared lunar base", "CONFIRMED", "Yellow-green rotated and cropped Moon in COM2603"),
    ("code-01", "evidence/companion/keyframes/COM2601_f01940_77.60.jpg", "COM2601", "77.60 s", "ALL SYSTEMS NORMAL code", "CONFIRMED", "Numeric transmission screen in COM2601"),
    ("code-03", "evidence/companion/keyframes/COM2603_f09725_389.00.jpg", "COM2603", "389.00 s", "HEALIN prefix code", "CONFIRMED", "Red damaged numeric transmission in COM2603"),
    ("abyss-early", "evidence/post-com2603/one-fps/ABYSS/s_0035.jpg", "ABYSS", "~35 s", "High aerial built environment", "POSSIBLE", "Processed moving view over rows of building-like forms"),
    ("abyss-forest", "evidence/post-com2603/one-fps/ABYSS/s_0080.jpg", "ABYSS", "~80 s", "Forest and walking figure sequence", "POSSIBLE", "Dark processed woodland image"),
    ("abyss-186", "evidence/post-com2603/audio-forensics/abyss_boundary_frames/186.00.jpg", "ABYSS", "186.00 s", "Strong sound transition visual flank", "CONFIRMED", "Abstract water-like form at the first strong ABYSS audio transition"),
    ("abyss-woman", "evidence/post-com2603/audio-forensics/abyss_boundary_frames/192.96.jpg", "ABYSS", "192.96 s", "First clear woman image", "CONFIRMED", "Frontal on-screen woman in the sea sequence"),
    ("abyss-sea-212", "evidence/post-com2603/one-fps/ABYSS/s_0212.jpg", "ABYSS", "~212 s", "Sea and rock before lighthouse cut", "CONFIRMED", "Processed sea and rock image just before the lighthouse sequence"),
    ("abyss-sea", "evidence/post-com2603/audio-forensics/abyss_boundary_frames/212.48.jpg", "ABYSS", "212.48 s", "Near-black reset frame before lighthouse cut", "CONFIRMED", "Near-black last sea frame at the 40 millisecond near-silent reset"),
    ("abyss-lighthouse", "evidence/post-com2603/audio-forensics/abyss_boundary_frames/212.52.jpg", "ABYSS", "212.52 s", "First lighthouse composition", "CONFIRMED", "First lighthouse image after the sea cut"),
    ("beneath-card", "evidence/post-com2603/beneath_numeric_8_11/f_0235.png", "BENEATH", "9.40 s", "WHITE LIGHT numeric message", "CONFIRMED", "Vertical numeric message reconstructed as WHITE LIGHT"),
    ("beneath-eye", "evidence/system-model/eye-card/BENEATH_native_sequence/f_02748.png", "BENEATH", "109.92 s", "Human eye source frame", "CONFIRMED", "Blue processed human eye with visible eyelids and lashes"),
    ("beneath-eye-cut", "evidence/system-model/eye-card/BENEATH_native_sequence/f_03192.png", "BENEATH", "127.68 s", "Eye immediately before Moon cut", "CONFIRMED", "Processed eye in the frame immediately before the Moon"),
    ("beneath-moon", "evidence/system-model/eye-card/BENEATH_native_sequence/f_03193.png", "BENEATH", "127.72 s", "Moon after eye cut", "CONFIRMED", "Moon at the exact eye to Moon edit"),
    ("above", "evidence/post-com2603/one-fps/ABOVE/s_0065.jpg", "ABOVE", "~65 s", "Sparse abstract visual sample", "CONFIRMED", "Abstract cloud and city-like image in ABOVE"),
    ("swim", "evidence/post-com2603/one-fps/SWIM/s_0005.jpg", "SWIM", "~5 s", "Face at waterline", "CONFIRMED", "Face and waterline image in SWIM"),
    ("swim-late", "evidence/post-com2603/one-fps/SWIM/s_0135.jpg", "SWIM", "~135 s", "Later contour sequence", "POSSIBLE", "Dark contour-like processed forms in SWIM"),
]

AUDIO = [
    ("abyss-original", "ABYSS_183_199_original_1x.mp3", "ABYSS", "183–199 s", "Original excerpt around 186 s sound transition", "original", 1, True),
    ("abyss-tempo2", "ABYSS_183_199_tempo_2x.mp3", "ABYSS", "183–199 s", "2× tempo comparison", "tempo", 2, True),
    ("abyss-lighthouse-original", "ABYSS_211_223_original_1x.mp3", "ABYSS", "211–223 s", "Original excerpt around lighthouse cut", "original", 1, True),
    ("beneath-original", "BENEATH_109_131_original_1x.mp3", "BENEATH", "109–131 s", "Original excerpt around eye to Moon cut", "original", 1, True),
    ("above-original", "ABOVE_059_083_original_1x.mp3", "ABOVE", "59–83 s", "Original excerpt around measured tonal change", "original", 1, True),
    ("above-tempo3", "ABOVE_059_083_tempo_3x.mp3", "ABOVE", "59–83 s", "3× pitch-preserving tempo comparison", "tempo", 3, True),
    ("above-speed3", "ABOVE_059_083_speed_pitch_3x.mp3", "ABOVE", "59–83 s", "3× speed with pitch shift", "speed_pitch", 3, False),
    ("above-reverse", "ABOVE_059_083_reverse_1x.mp3", "ABOVE", "59–83 s", "Reversed listening comparison", "reverse", 1, True),
    ("swim-original", "SWIM_015_033_original_1x.mp3", "SWIM", "15–33 s", "Original excerpt near audio novelty", "original", 1, True),
]

def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    DATA.mkdir(parents=True, exist_ok=True)
    manifest = []
    for ident, source, work, timestamp, purpose, confidence, alt in IMAGES:
        src = ROOT / source
        if not src.is_file():
            raise FileNotFoundError(src)
        target = PUBLIC / f"{ident}.jpg"
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "75", "-Z", "1400", str(src), "--out", str(target)], check=True, stdout=subprocess.DEVNULL)
        manifest.append(dict(id=ident, type="image", path=f"/evidence/{target.name}", originalPath=source, work=work, timestamp=timestamp, purpose=purpose, confidence=confidence, alt=alt, derivation="JPEG resized from investigation source frame; no content edits"))
    origin = ROOT / "evidence/post-com2603/audio-forensics/listening-tests"
    index = {r["relative_path"].split("/")[-1]: r for r in csv.DictReader((origin / "index.csv").open())}
    for ident, filename, work, timestamp, purpose, transformation, factor, pitch in AUDIO:
        src = origin / filename
        if not src.is_file():
            raise FileNotFoundError(src)
        target = PUBLIC / filename
        target.write_bytes(src.read_bytes())
        row = index[filename]
        manifest.append(dict(id=ident, type="audio", path=f"/evidence/{filename}", originalPath=row["relative_path"], work=work, timestamp=timestamp, purpose=purpose, confidence="CONFIRMED", alt="", derivation=f"Prepared listening test: {row['filter']}", transformation=transformation, playbackFactor=factor, pitchPreserved=pitch))
    (DATA / "evidence-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")

    # Keep source measurements, not smoothed or fabricated chart points.
    with (ROOT / "evidence/post-com2603/audio-forensics/abyss_40ms_178_218.csv").open() as f:
        abyss = [{k: float(r[k]) for k in ["start_s", "mid_dbfs", "side_dbfs", "lr_corr", "power_above_500_fraction"]} for r in csv.DictReader(f)]
    (DATA / "abyss-measurements.json").write_text(json.dumps(abyss, separators=(",", ":")))
    with (ROOT / "evidence/post-com2603/audio-forensics/above_band_peaks_2s.csv").open() as f:
        peaks = [{"time": float(r["start_s"]), "band": r["band_hz"], "hz": float(r["strongest_peak_hz"]), "power": float(r["peak_power_db_relative"])} for r in csv.DictReader(f)]
    (DATA / "above-peaks.json").write_text(json.dumps(peaks, separators=(",", ":")))

if __name__ == "__main__":
    main()
