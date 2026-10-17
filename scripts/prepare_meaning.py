"""Prepare portable research copies and a bounded audit of preserved metadata.

Reads the investigation archive; writes only inside Website/. No network fetches,
decoder repairs, original-evidence edits, or inferred missing catalog entries.
"""
import json
from pathlib import Path
from shutil import copyfile

site = Path(__file__).resolve().parents[1]
archive = site.parent
metadata = archive / 'evidence/system-model/official-metadata-audit'
watch = [json.loads(line) for line in (metadata / 'full_channel_watch_metadata_2026-10-17.jsonl').read_text().splitlines()]
segments = [json.loads(line) for line in (metadata / 'full_channel_descriptions_decoded.jsonl').read_text().splitlines()]
exact = [row for row in segments if row['roundtrip_equal'] and not row['decoder_warnings'] and not row['encoder_warnings']]
references = [row for row in exact if 'COMPANION' in row['decoded']]
self_ids = {'2eSrFAMJY2s', '4HIj-9mU4Tw', 'Qa5pby9LZhM'}
result = {
    'snapshotDate': '2026-10-17',
    'watchRecords': len(watch),
    'accessibleRecords': sum(row['status'] == 'ok' for row in watch),
    'nonemptyDescriptions': sum(row['status'] == 'ok' and bool(row.get('description_exact')) for row in watch),
    'attemptedSegments': len(segments),
    'exactSegments': len(exact),
    'references': [dict(id=row['id'], decoded=row['decoded'], ciphertext=row['ciphertext_digits'], selfLabel=row['id'] in self_ids) for row in references],
    'scope': 'Warning-free exact-round-trip segments in the preserved official-description snapshot; excludes inaccessible records, undecodable segments, internal video text, and later changes.',
    'source': 'evidence/system-model/official-metadata-audit/full_channel_descriptions_decoded.jsonl',
}
(site / 'src/data/meaning-catalog-audit.json').write_text(json.dumps(result, indent=2) + '\n')
target = site / 'public/research'
target.mkdir(parents=True, exist_ok=True)
for name in ('companion-meaning-analysis.md', 'meaning-evidence-matrix.md', 'companion-meaning-summary.md'):
    copyfile(archive / 'reports' / name, target / name)
print(f"Audited {len(exact)} exact segments; found {len(references)} Companion references. Copied 3 new reports.")
