#!/usr/bin/env python3
"""Install the reviewed Chemistry Paper 01 ZIP into Vite's public assets.

Usage (from SPARK project root):
  python tools/import-chemistry-paper1.py "C:/Downloads/CSEC_Chemistry_Paper1_Reviewed_Bank.zip"
No external libraries needed. Will not invent the missing 2010 Q56–Q60.
"""
from __future__ import annotations
import json
from pathlib import Path, PurePosixPath
import shutil
import sys
import tempfile
from zipfile import ZipFile

REPO_ROOT = Path(__file__).resolve().parents[1]
DESTINATION = REPO_ROOT / "public" / "chemistry-paper1"
PAPER_IDS = ["2009-MJ", "2010-MJ", "2016-MJ", "2017-MJ", "2018-JAN",
             "2018-MJ", "2019-MJ", "2020-JAN", "2021-MJ", "2023-MJ"]

def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python tools/import-chemistry-paper1.py PATH_TO_REVIEWED_ZIP")
    archive = Path(sys.argv[1]).expanduser().resolve()
    if not archive.is_file():
        raise SystemExit(f"Question bank archive not found: {archive}")
    with tempfile.TemporaryDirectory(prefix="spark-chem-p1-") as temporary:
        staging = Path(temporary) / "chemistry-paper1"
        staging.mkdir()
        with ZipFile(archive) as zf:
            entries = {}
            for info in zf.infolist():
                parts = PurePosixPath(info.filename).parts
                if not parts or parts[0] != "Chemistry_Paper1_Question_Bank" or info.is_dir():
                    continue
                relative = parts[1:]
                if not relative or any(part in ("..", ".") for part in relative):
                    raise ValueError("Unsafe or unexpected archive entry")
                if relative[0] not in ("papers", "practice-sets", "diagrams", "qa"):
                    continue
                if Path(*relative).suffix.lower() not in (".json", ".svg", ".png"):
                    continue
                target = staging.joinpath(*relative)
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(zf.read(info))
                entries[str(PurePosixPath(*relative))] = target
        total = 0
        for paper_id in PAPER_IDS:
            path = staging / "papers" / f"{paper_id}.json"
            if not path.is_file():
                raise ValueError(f"Missing original paper: {paper_id}")
            paper = json.loads(path.read_text(encoding="utf-8"))
            items = paper.get("questions", [])
            wanted = 55 if paper_id == "2010-MJ" else 60
            if len(items) != wanted:
                raise ValueError(f"{paper_id} contains {len(items)} questions; expected {wanted}")
            if any(q.get("answer") not in "ABCD" for q in items):
                raise ValueError(f"Invalid answer key in {paper_id}")
            for metadata in paper.get("diagrams", {}).values():
                svg = staging / metadata.get("svg", "")
                if not svg.is_file():
                    raise ValueError(f"Missing SVG in {paper_id}: {svg}")
            total += len(items)
        for index in range(1, 5):
            path = staging / "practice-sets" / f"practice-{index:02d}.json"
            if not path.is_file():
                raise ValueError(f"Missing practice set {index}")
            data = json.loads(path.read_text(encoding="utf-8"))
            if len(data.get("questions", [])) != 60:
                raise ValueError(f"Practice set {index} is not 60 questions")
        if total != 595:
            raise ValueError(f"Expected 595 historical questions, found {total}")
        if DESTINATION.exists():
            shutil.rmtree(DESTINATION)
        shutil.copytree(staging, DESTINATION)
    print(f"Installed {total} historical questions, 4 practice sets and diagrams in {DESTINATION}")
    print("2010 May/June remains a partial 55-question historical paper.")
    print("Run npm start (or refresh Vite), then open Chemistry Paper 01.")

if __name__ == "__main__":
    main()
