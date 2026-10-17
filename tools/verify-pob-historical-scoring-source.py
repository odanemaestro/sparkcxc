#!/usr/bin/env python3
"""Check the 46 approved POB PDF fingerprints against the supplied POB.zip.

Usage: python tools/verify-pob-historical-scoring-source.py /path/to/POB.zip
No OCR, guessed answer keys, or external downloads are performed.
"""
from __future__ import annotations

import argparse
import hashlib
import re
import sys
from pathlib import Path
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "src/principlesOfBusiness/data/pobHistoricalScoringApproval.js"
PDF_NAME = re.compile(r"^CSEC_Principles_of_Business_(P[12]_\d{4}_(?:MJ|JAN))\.pdf$")
HASH_ROW = re.compile(r'^\s*"(P[12]_\d{4}_(?:MJ|JAN))":"([a-f0-9]{64})",?$', re.M)


def verify(source_zip: Path) -> int:
    expected = dict(HASH_ROW.findall(MANIFEST.read_text(encoding="utf-8")))
    if len(expected) != 46:
        print(f"FAIL: expected 46 unique manifest digests, found {len(expected)}")
        return 1
    if len(set(expected.values())) != 46:
        print("FAIL: duplicate source PDF SHA-256 fingerprints")
        return 1

    found = {}
    with ZipFile(source_zip) as archive:
        for member in archive.namelist():
            match = PDF_NAME.fullmatch(Path(member).name)
            if not match:
                continue
            key = match.group(1)
            if key in found:
                print(f"FAIL: duplicated PDF entry {key}")
                return 1
            found[key] = hashlib.sha256(archive.read(member)).hexdigest()

    missing = sorted(set(expected) - set(found))
    extra = sorted(set(found) - set(expected))
    mismatched = sorted(key for key in expected.keys() & found.keys()
                        if expected[key] != found[key])
    if missing or extra or mismatched:
        print(f"FAIL: missing={missing}, unexpected={extra}, SHA-256 mismatches={mismatched}")
        return 1
    if len(found) != 46:
        print(f"FAIL: expected 46 files, got {len(found)}")
        return 1
    print("PASS: all 46 owner-approved historical POB PDFs match the source manifest.")
    print("Status: source identity verified, answer keys and marking QA not certified.")
    return 0


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("source_zip", type=Path)
    args = p.parse_args()
    try:
        sys.exit(verify(args.source_zip))
    except (OSError, ValueError) as e:
        print(f"FAIL: {e}")
        sys.exit(1)
