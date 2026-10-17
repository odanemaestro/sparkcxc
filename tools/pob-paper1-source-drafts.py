#!/usr/bin/env python3
"""Export auditable, page- and column-linked drafts from owner-provided POB.zip.

Install: python -m pip install pymupdf
Run: python tools/pob-paper1-source-drafts.py POB.zip --out-dir .local/pob-paper1-drafts
Output is intentionally NOT wired into the live Paper 1 question bank.
Manual checking of every stem, A-D options and figure is required.
"""
import argparse
import hashlib
import json
from pathlib import Path
import zipfile

SITTINGS = ("2015_MJ", "2017_MJ", "2020_JAN")


def export(archive, out_dir):
    try:
        import fitz
    except ImportError as exc:
        raise SystemExit("Install PyMuPDF first: python -m pip install pymupdf") from exc
    out_dir.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(archive) as source:
        for sitting in SITTINGS:
            suffix = "P1_" + sitting + ".pdf"
            matching = [name for name in source.namelist() if name.endswith(suffix)]
            if len(matching) != 1:
                raise ValueError("Expected one source PDF for " + sitting)
            name = matching[0]
            raw = source.read(name)
            doc = fitz.open(stream=raw, filetype="pdf")
            pages = []
            for index, page in enumerate(doc):
                blocks = []
                for block in page.get_text("blocks"):
                    x0, y0, x1, y1, text, *_ = block
                    if not text.strip():
                        continue
                    blocks.append({
                        "column": "left" if (x0 + x1) / 2 < page.rect.width / 2 else "right",
                        "x": round(x0, 1),
                        "y": round(y0, 1),
                        "text": text.strip(),
                    })
                blocks.sort(key=lambda b: (b["column"] != "left", b["y"]))
                pages.append({
                    "page": index + 1,
                    "blocks": blocks,
                    "has_raster_images": bool(page.get_images()),
                    "image_count": len(page.get_images()),
                    "text_characters": len(page.get_text()),
                })
            payload = {
                "source_file": name,
                "source_sha256": hashlib.sha256(raw).hexdigest(),
                "status": "UNVERIFIED TRANSCRIPTION STAGING ONLY",
                "instructions": (
                    "Raw source blocks are NOT verified MCQs. Review each item, each "
                    "choice, the original page order, figures and the complete answer key."
                ),
                "pages": pages,
            }
            target = out_dir / ("POB_P1_" + sitting + "_source_blocks_UNVERIFIED.json")
            target.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
            print(sitting, len(doc), "pages ->", target)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("archive", type=Path)
    parser.add_argument("--out-dir", type=Path, default=Path(".local/pob-paper1-drafts"))
    args = parser.parse_args()
    export(args.archive, args.out_dir)
