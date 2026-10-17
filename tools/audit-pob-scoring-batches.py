#!/usr/bin/env python3
"""Verify the owner-supplied POB ZIP and report source readiness by 15-paper batch.

Usage:
    python -m pip install pymupdf
    python tools/audit-pob-scoring-batches.py /path/to/POB.zip --out /tmp/pob-audit.json

Does not OCR or infer answer keys, mark schemes or publishability.
The first 15 are the text-rich, sitting-instructions review batch.
"""
import argparse
import hashlib
import json
import re
import sys
import zipfile
from pathlib import Path

PATTERN = re.compile(r"^POB/CSEC_Principles_of_Business_(P[12]_\d{4}_(?:JAN|MJ))\.pdf$")
SHA_PATTERN = re.compile(r'"(P[12]_\d{4}_(?:JAN|MJ))":"([a-f0-9]{64})"')
FIRST_15 = {
    "P1_2023_JAN",
    *(f"P2_{year}_MJ" for year in range(2009, 2019)),
    "P2_2022_JAN", "P2_2022_MJ", "P2_2023_JAN", "P2_2024_JAN",
}
EXPECTED_SIZES = [15, 15, 15, 1]
KNOWN_NON_QUESTION_PAGES = {
    "P2_2022_JAN": [2, 19],
    "P2_2023_JAN": [2, 23],
}
EXPECTED_SOURCE_COUNT = 46


def audit(archive_path: Path, approval_path: Path):
    try:
        import fitz  # only needed for PDF rendering/text diagnostics
    except ImportError as exc:
        raise RuntimeError("PyMuPDF required: python -m pip install pymupdf") from exc
    expected = dict(SHA_PATTERN.findall(approval_path.read_text(encoding="utf-8")))
    if len(expected) != EXPECTED_SOURCE_COUNT:
        raise RuntimeError("Expected 46 distinct SHA-256 fingerprints in the trusted manifest.")
    rows = []
    with zipfile.ZipFile(archive_path) as archive:
        for path in sorted(archive.namelist()):
            match = PATTERN.fullmatch(path)
            if not match:
                continue
            stem = match.group(1)
            content = archive.read(path)
            digest = hashlib.sha256(content).hexdigest()
            pdf = fitz.open(stream=content, filetype="pdf")
            low_pages = [
                index + 1 for index, page in enumerate(pdf)
                if len(page.get_text().strip()) < 50
            ]
            allowed = set(KNOWN_NON_QUESTION_PAGES.get(stem, []))
            resolved = sorted(allowed.intersection(low_pages))
            unresolved = sorted(set(low_pages) - allowed)
            page_count = len(pdf)
            pdf.close()
            row = {
                "sourceStem": stem,
                "filename": path.rsplit("/", 1)[-1],
                "sourceSha256": digest,
                "fingerprintMatchesApproval": digest == expected.get(stem),
                "pages": page_count,
                "lowTextPages": low_pages,
                "lowTextPagesVisuallyResolved": resolved,
                "lowTextPagesStillToReview": unresolved,
                "sourceForm": "derivative-transcription" if stem == "P2_2024_JAN" else "needs-full-page-verification",
                "ownerAuthorized": True,
                "completeVerifiedAnswerKey": False,
                "completeVerifiedRubric": False,
                "liveAutoScoringReady": False
            }
            rows.append(row)
    if len(rows) != EXPECTED_SOURCE_COUNT or any(not r["fingerprintMatchesApproval"] for r in rows):
        raise RuntimeError("ZIP contains missing, extra, or fingerprint-mismatched historical source PDFs.")
    first = [r for r in rows if r["sourceStem"] in FIRST_15]
    remaining = sorted([r for r in rows if r["sourceStem"] not in FIRST_15],
                       key=lambda r: r["sourceStem"])
    batches = [sorted(first, key=lambda r: r["sourceStem"]),
               remaining[:15], remaining[15:30], remaining[30:]]
    if [len(batch) for batch in batches] != EXPECTED_SIZES:
        raise RuntimeError("Unexpected 15/15/15/1 source partition.")
    return {
        "sourcePdfCount": len(rows),
        "pageCount": sum(r["pages"] for r in rows),
        "lowTextPagesFlagged": sum(len(r["lowTextPages"]) for r in rows),
        "verifiedAnswerKeys": 0, "liveScoringApproved": 0,
        "batchSizes": [len(batch) for batch in batches],
        "batches": [
            {"number": i + 1, "paperCount": len(batch),
             "pages": sum(row["pages"] for row in batch),
             "sources": batch}
            for i, batch in enumerate(batches)
        ]
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("archive", type=Path)
    parser.add_argument("--out", type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    approval = root / "src/principlesOfBusiness/data/pobHistoricalScoringApproval.js"
    try:
        result = audit(args.archive, approval)
    except (OSError, ValueError, RuntimeError, zipfile.BadZipFile) as exc:
        print(f"FAILED: {exc}", file=sys.stderr)
        return 1
    value = json.dumps(result, indent=2)
    if args.out:
        args.out.write_text(value + "\n", encoding="utf-8")
    for batch in result["batches"]:
        print(f"Batch {batch['number']}: {batch['paperCount']} source PDFs; {batch['pages']} pages")
    print(f"All {result['sourcePdfCount']} source fingerprints verified. "
          "No historical scoring approved without answer-key and rubric QA.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
