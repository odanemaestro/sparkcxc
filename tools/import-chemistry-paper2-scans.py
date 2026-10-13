#!/usr/bin/env python3
"""Install supplied original CSEC Chemistry Paper 02 PDF archive for local browsing.

From SPARK repository root:
  python tools/import-chemistry-paper2-scans.py "C:/Downloads/CSEC CHEMISTRY(2).zip"
The PDFs are locally served as source references; no question is auto-published.
"""
from pathlib import Path
from zipfile import ZipFile
import sys

ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/"public"/"chemistry-paper2-scans"

def main():
    if len(sys.argv)!=2:
        raise SystemExit("Usage: python tools/import-chemistry-paper2-scans.py ARCHIVE.zip")
    filename=Path(sys.argv[1]).expanduser()
    if not filename.is_file():
        raise SystemExit(f"ZIP file not found: {filename}")
    DEST.mkdir(parents=True,exist_ok=True)
    count=0
    with ZipFile(filename) as archive:
        for item in archive.infolist():
            name=Path(item.filename).name
            if item.is_dir() or not name.startswith("CSEC_Chemistry_P2_") or not name.lower().endswith(".pdf"):
                continue
            content=archive.read(item)
            if not content.startswith(b"%PDF"):
                raise ValueError(f"Invalid PDF in archive: {name}")
            (DEST/name).write_bytes(content)
            count+=1
    print(f"Installed {count} chemistry source PDFs in {DEST}.")
    if count!=28:
        print("Warning: expected 28 historical PDFs. Verify your original ZIP archive.")
    print("Restart Vite if necessary, then choose Past Paper 2 archive > View paper details.")

if __name__=="__main__":
    main()
