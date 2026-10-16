#!/usr/bin/env python3
"""Draft text-only POB Paper 2 transcription for review, never simulator-ready.

Reads a verified filename in POB.zip and extracts explicit question blocks.
Do not infer marking schemes, answers, diagrams or missing content from this
text layer. The output is unverified and intentionally not consumed by SPARK.
"""
import argparse
import io
import json
import re
import zipfile
from pathlib import Path

def draft_paper(archive, filename):
    import fitz
    with zipfile.ZipFile(archive) as z:
        names=[name for name in z.namelist() if Path(name).name==filename]
        if len(names)!=1:
            raise ValueError("Expected one exact source PDF in the archive")
        document=fitz.open(stream=z.read(names[0]),filetype="pdf")
        try:
            pages=[page.get_text(sort=True).strip() for page in document]
        finally:
            document.close()
    if sum(map(len,pages))<1000:
        raise ValueError("Insufficient PDF text. Visual transcription required; no OCR guess.")
    text="\n".join(pages)
    matches=list(re.finditer(r"(?im)^\s*Question\s+(\d+)\s*$",text))
    questions=[]
    for idx,match in enumerate(matches):
        end=matches[idx+1].start() if idx+1<len(matches) else len(text)
        questions.append({"number":int(match.group(1)),"rawText":text[match.end():end].strip(),
         "sourcePageRecheckRequired":True,"markSchemeVerified":False,"diagramVerified":False})
    if not questions or [q["number"] for q in questions]!=list(range(1,len(questions)+1)):
        raise ValueError("Cannot safely segment sequential questions; verify PDF visually")
    return {"filename":filename,"status":"draft-unverified","simulationEnabled":False,
      "answerKeyVerified":False,"questions":questions,
      "warning":"Source text is a transcription draft, not a validated exam or answer key. Check each page and diagram."}

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("archive",type=Path)
    parser.add_argument("filename")
    parser.add_argument("--out",type=Path,required=True)
    args=parser.parse_args()
    if not re.fullmatch(r"CSEC_Principles_of_Business_P2_\d{4}_(?:JAN|MJ)\.pdf",args.filename):
        parser.error("Only named historical POB Paper 2 files are supported")
    draft=draft_paper(args.archive,args.filename)
    args.out.parent.mkdir(parents=True,exist_ok=True)
    args.out.write_text(json.dumps(draft,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")

if __name__=="__main__":
    main()
