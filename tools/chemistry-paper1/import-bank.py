#!/usr/bin/env python3
"""Install the validated Chemistry Paper 1 JSON package into SPARK.
Usage: python tools/chemistry-paper1/import-bank.py /path/to/Chemistry_Paper1_Question_Bank
"""
import json, shutil, sys
from pathlib import Path
if len(sys.argv)!=2:raise SystemExit("Provide extracted Chemistry_Paper1_Question_Bank directory")
source=Path(sys.argv[1]).resolve()
repo=Path(__file__).resolve().parents[2]
papers=sorted((source/"papers").glob("*.json"))
if len(papers)!=10:raise SystemExit("Expected ten supplied unique Paper 1 files")
total=0
for path in papers:
    obj=json.loads(path.read_text(encoding="utf-8"))
    qs=obj["questions"];total+=len(qs)
    if len(set(q["n"] for q in qs))!=len(qs):
        raise SystemExit("Duplicate numbered items in "+path.name)
    if any(q["answer"] not in ["A","B","C","D"] or len(q["options"])!=4 for q in qs):
        raise SystemExit("Invalid answer choices in "+path.name)
if total!=595:raise SystemExit("Expected 595 available historical questions, got "+str(total))
if [q["n"] for q in json.loads((source/"papers/2010-MJ.json").read_text())["questions"]][-1]!=55:
    raise SystemExit("2010 paper has unexpected item coverage")
dest=repo/"public/chemistry-paper1"
dest.mkdir(parents=True,exist_ok=True)
for folder in ["papers","diagrams","practice-sets"]:
    shutil.copytree(source/folder,dest/folder,dirs_exist_ok=True)
for name in ["chemistry-paper1-master.json","IMPORT_REPORT.json","QA_REPORT.json"]:
    shutil.copy2(source/name,dest/name)
print("Imported",total,"Chemistry Paper 1 records. 2010 Q56–60 still missing.")
print("Data location:",dest)
