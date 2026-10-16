#!/usr/bin/env python3
"""Prepare source-linked review drafts for 5 P2 and 5 P1 historical POB PDFs.

P1 question-heading cues are advisory, NOT verified 60-question transcriptions.
P2 scans remain visual-transcription-required; no OCR guesses or answer keys.
Usage: python tools/build-pob-historical-batch03.py POB.zip --out-dir DIRECTORY [--render-pages]
"""
import argparse
import hashlib
import json
import re
import zipfile
from pathlib import Path

BATCH=((2,2023,"MJ"),(2,2024,"JAN"),(2,2024,"MJ"),(2,2025,"JAN"),
       (2,2026,"JAN"),(1,2002,"MJ"),(1,2003,"MJ"),(1,2004,"MJ"),
       (1,2005,"MJ"),(1,2006,"MJ"))
QUESTION_LINE=re.compile(r"(?m)^[ \t]*([1-9]|[1-5][0-9]|60)\.[ \t]+")
P2_HEADING=re.compile(r"(?im)(?:^|(?<=\n)|(?<=\]))[ \t]*Question[ \t]+([1-5])\b")

def build(archive,out_dir,render_pages=False):
    import fitz
    out_dir=Path(out_dir)
    out_dir.mkdir(parents=True,exist_ok=True)
    manifest=[]
    with zipfile.ZipFile(archive) as sources:
        for paper,year,sitting in BATCH:
            filename=f"CSEC_Principles_of_Business_P{paper}_{year}_{sitting}.pdf"
            members=[name for name in sources.namelist() if Path(name).name==filename]
            if len(members)!=1:
                raise ValueError("Expected exactly one source: "+filename)
            raw=sources.read(members[0])
            if not raw.startswith(b"%PDF-"):
                raise ValueError("Invalid PDF: "+filename)
            digest=hashlib.sha256(raw).hexdigest()
            doc=fitz.open(stream=raw,filetype="pdf")
            pages=[]
            headings=[]
            try:
                for index,page in enumerate(doc):
                    number=index+1
                    text=page.get_text(sort=True)
                    row={"page":number,"text":text,"textChars":len(text.strip()),
                         "hasImages":bool(page.get_images(full=True)),
                         "visualComparisonComplete":False}
                    if paper==1:
                        rect=page.rect
                        middle=rect.x0+rect.width*.5
                        columns=[
                          ("left",page.get_text(sort=True,clip=fitz.Rect(rect.x0,rect.y0,middle,rect.y1))),
                          ("right",page.get_text(sort=True,clip=fitz.Rect(middle,rect.y0,rect.x1,rect.y1)))
                        ]
                        row["columns"]=[{"side":side,"text":col} for side,col in columns]
                        for side,col in columns:
                            for match in QUESTION_LINE.finditer(col):
                                headings.append({
                                   "candidateNumber":int(match.group(1)),
                                   "page":number,"side":side,
                                   "preview":col[match.end():match.end()+120].replace("\n"," ").strip(),
                                   "verified":False})
                    pages.append(row)
                    if render_pages:
                        folder=out_dir/"source-pages"/f"P{paper}-{year}-{sitting}"
                        folder.mkdir(parents=True,exist_ok=True)
                        pix=page.get_pixmap(matrix=fitz.Matrix(1.1,1.1),alpha=False)
                        (folder/f"page-{number:02}.jpg").write_bytes(
                            pix.tobytes("jpeg",jpg_quality=65))
            finally:
                doc.close()
            identity=f"POB-P{paper}-{year}-{sitting}"
            chars=sum(p["textChars"] for p in pages)
            unique=sorted(set(h["candidateNumber"] for h in headings))
            compiled=[]
            if (paper,year,sitting)==(2,2024,"JAN"):
                compiled=[int(n) for n in P2_HEADING.findall("\n".join(p["text"] for p in pages))]
                if compiled!=[1,2,3,4,5]:
                    raise ValueError("Jan 2024 question headings do not match the checked draft")
            status=("page-column-draft-unverified" if paper==1 else
                    "compiled-source-with-previous-draft" if compiled else
                    "visual-transcription-required")
            data={
              "id":identity,"filename":filename,"paper":paper,"year":year,"sitting":sitting,
              "origin":"user-supplied-copy","sourceSha256":digest,
              "sourcePageCount":len(pages),"sourceTextChars":chars,
              "substantialTextLayer":chars>=1000,
              "paperFormat":"hybrid-supplied-copy" if (paper,year,sitting)==(2,2026,"JAN")
                            else "historical-era-unconfirmed",
              "sourceAuthenticationVerified":False,
              "questionTranscriptionVerified":False,
              "visualPageReviewComplete":False,
              "answerKeyVerified":False,"markingSchemeVerified":False,
              "simulatorReady":False,"extractionStatus":status,
              "pages":pages,"numberedQuestionCandidates":headings if paper==1 else [],
              "candidateNumbersFound":unique if paper==1 else [],
              "candidateNumbersMissing":sorted(set(range(1,61))-set(unique)) if paper==1 else [],
              "p2SequentialHeadings":compiled,
              "existingDraftRef":"pobHistoricalP22024JanDraft.js" if compiled else None,
              "warnings":[
                "Unverified extraction: question layout and reading order may be wrong.",
                "No historical answers, options, question boundaries or marks were invented.",
                "Source is a supplied copy, not an authenticated official CXC original."
              ]
            }
            (out_dir/(identity+".json")).write_text(
                json.dumps(data,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
            manifest.append({
              "id":identity,"sourceFilename":filename,"sourceSha256":digest,
              "paper":paper,"year":year,"sitting":sitting,
              "sourcePages":len(pages),"sourceTextChars":chars,
              "substantialTextLayer":chars>=1000,
              "questionHeadingCandidates":len(headings) if paper==1 else len(compiled),
              "distinctNumberCandidates":len(unique) if paper==1 else len(compiled),
              "unrecognisedQuestionNumbers":len(data["candidateNumbersMissing"]) if paper==1 else None,
              "sourceStatus":status,"simulatorReady":False
            })
    if len(manifest)!=10 or sum(x["paper"]==1 for x in manifest)!=5:
        raise ValueError("Incorrect batch membership")
    (out_dir/"manifest.json").write_text(
        json.dumps(manifest,indent=2)+"\n",encoding="utf-8")
    return manifest

if __name__=="__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("archive",type=Path)
    parser.add_argument("--out-dir",type=Path,required=True)
    parser.add_argument("--render-pages",action="store_true")
    args=parser.parse_args()
    rows=build(args.archive,args.out_dir,args.render_pages)
    print(f"Prepared {len(rows)} gated source records, {sum(x['sourcePages'] for x in rows)} pages.")
