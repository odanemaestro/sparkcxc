#!/usr/bin/env python3
"""Audit a user-supplied POB.zip without claiming that exam answers are verified.

Usage: python tools/audit-pob-archive.py /path/to/POB.zip
Optional: --out /path/to/pob-source-manifest.json
Requires PyMuPDF only for page-count/text-layer inspection; hash and archive
identity still work without it.
"""
import argparse
import hashlib
import io
import json
import re
import zipfile
from pathlib import Path

PAPER = re.compile(r"^CSEC_Principles_of_Business_P([12])_(\d{4})_(JAN|MJ)\.pdf$")
SYLLABUS = "CSEC-Principles-of-Business-Syllabus-.pdf"


def audit(archive):
    try:
        import fitz
    except ImportError:
        fitz = None
    items, issues = [], []
    with zipfile.ZipFile(archive) as source:
        names = [name for name in source.namelist() if name.lower().endswith(".pdf")]
        for name in names:
            filename = Path(name).name
            is_syllabus = filename == SYLLABUS
            matched = PAPER.fullmatch(filename)
            if not matched and not is_syllabus:
                issues.append("Unexpected PDF: " + filename)
            raw = source.read(name)
            size = len(raw)
            if not raw.startswith(b"%PDF-"):
                issues.append("Invalid PDF signature: " + filename)
            row = {
                "filename": filename,
                "paper": int(matched.group(1)) if matched else None,
                "year": int(matched.group(2)) if matched else None,
                "sitting": matched.group(3) if matched else None,
                "syllabus": is_syllabus,
                "sha256": hashlib.sha256(raw).hexdigest(),
                "bytes": size,
                "pages": None,
                "text_chars": None,
                "has_substantial_text_layer": None,
                "question_transcription_verified": False,
                "answer_key_verified": False,
                "simulator_ready": False
            }
            if fitz is not None:
                doc = fitz.open(stream=raw, filetype="pdf")
                row["pages"] = len(doc)
                row["text_chars"] = sum(len(page.get_text().strip()) for page in doc)
                row["has_substantial_text_layer"] = row["text_chars"] >= 1000
                doc.close()
            items.append(row)
    items.sort(key=lambda item: (item["paper"] or 0,item["year"] or 0,item["sitting"] or "",item["filename"]))
    paper1 = [item for item in items if item["paper"] == 1]
    paper2 = [item for item in items if item["paper"] == 2]
    if len(paper1) != 21 or len(paper2) != 25:
        issues.append(f"Expected 21 P1 and 25 P2 PDFs; got {len(paper1)} and {len(paper2)}")
    if sum(item["syllabus"] for item in items) != 1:
        issues.append("Expected exactly one syllabus PDF")
    if len({item["filename"] for item in items}) != len(items):
        issues.append("Duplicate PDF filename")
    return {
        "status": "source-inventory-verified" if not issues else "source-inventory-has-errors",
        "origin": "user-supplied-archive",
        "files": items,
        "counts": {"paper1": len(paper1), "paper2": len(paper2), "syllabus": len(items)-len(paper1)-len(paper2)},
        "questions_verified": 0, "answer_keys_verified": 0,
        "issues": issues
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("archive", type=Path)
    parser.add_argument("--out", type=Path)
    args = parser.parse_args()
    manifest = audit(args.archive)
    payload = json.dumps(manifest, indent=2, ensure_ascii=False) + "\n"
    if args.out:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        args.out.write_text(payload, encoding="utf-8")
    else:
        print(payload)
    return 1 if manifest["issues"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
