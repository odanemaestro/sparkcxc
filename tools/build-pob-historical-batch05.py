#!/usr/bin/env python3
"""Rebuild the final six POB Paper 1 archive SOURCE REVIEW drafts (Batch 05).

Reads the user-supplied POB.zip, preserves per-page/column text and provenance,
and makes 60 review slots per paper. Slots are NOT transcribed, keyed or graded
exam questions. No OCR or guessed answers. Requires PyMuPDF.

Usage:
  python tools/build-pob-historical-batch05.py POB.zip --out-dir /tmp/pob-batch05 --render-pages
"""
import argparse
import hashlib
import json
import re
import zipfile
from pathlib import Path

BATCH=((2020,"JAN"),(2020,"MJ"),(2021,"MJ"),
       (2022,"JAN"),(2023,"JAN"),(2024,"MJ"))
HEAD=re.compile(r"(?m)^[ \t]*(60|[1-5][0-9]|[1-9])[ \t]*[.)][ \t]+")
LABEL=re.compile(r"(?m)^[ \t]*\(([ABCD])\)[ \t]*")
RECOVERED={(2020,"JAN"):{22:4,41:6}}
SPECIAL={
 (2021,"MJ"):["Redistributed copy has Agape Learning Hub watermarks."],
 (2022,"JAN"):["CamScanner label appears on scanned pages."],
 (2024,"MJ"):["Some rendered pages show handwritten markings; exclude these from verified exam text."]
}

def build(archive,out_dir,render_pages=False):
 import fitz
 out_dir=Path(out_dir);out_dir.mkdir(parents=True,exist_ok=True)
 manifest=[]
 with zipfile.ZipFile(archive) as source:
  for year,sitting in BATCH:
   filename=f"CSEC_Principles_of_Business_P1_{year}_{sitting}.pdf"
   members=[n for n in source.namelist() if Path(n).name==filename]
   if len(members)!=1:raise ValueError("Expected one source: "+filename)
   raw=source.read(members[0])
   if not raw.startswith(b"%PDF-"):raise ValueError("Invalid PDF: "+filename)
   pdf=fitz.open(stream=raw,filetype="pdf")
   pages,hints=[],[]
   try:
    for i,page in enumerate(pdf):
     number=i+1;rect=page.rect;mid=rect.x0+rect.width/2
     row={"page":number,"rawText":page.get_text(sort=True),
          "rotation":page.rotation,"embeddedImages":len(page.get_images(full=True)),
          "visuallyCompared":False,"columns":[]}
     for side,clip in (("left",fitz.Rect(rect.x0,rect.y0,mid,rect.y1)),
                       ("right",fitz.Rect(mid,rect.y0,rect.x1,rect.y1))):
      text=page.get_text(sort=True,clip=clip)
      matches=list(HEAD.finditer(text)) if number>1 else []
      row["columns"].append({"side":side,"rawText":text,
                             "textChars":len(text.strip()),"headingCues":len(matches)})
      for j,match in enumerate(matches):
       n=int(match.group(1))
       end=matches[j+1].start() if j+1<len(matches) else len(text)
       excerpt=text[match.start():end].strip()
       hints.append({"number":n,"sourcePage":number,"sourceColumn":side,
                     "draftTextFragment":excerpt,
                     "optionLabelCues":sorted(set(LABEL.findall(excerpt))),
                     "verified":False})
     pages.append(row)
     if render_pages:
      target=out_dir/"source-pages"/f"P1-{year}-{sitting}"
      target.mkdir(parents=True,exist_ok=True)
      pix=page.get_pixmap(matrix=fitz.Matrix(1.10,1.10),alpha=False)
      (target/f"page-{number:02}.jpg").write_bytes(pix.tobytes("jpeg",jpg_quality=70))
   finally:pdf.close()
   unique=sorted(set(h["number"] for h in hints))
   hits={}
   for h in hints:
    hits.setdefault(h["number"],h)
   recovered=RECOVERED.get((year,sitting),{})
   slots=[]
   for q in range(1,61):
    hit=hits.get(q)
    slots.append({
     "number":q,"candidateSourcePage":hit["sourcePage"] if hit else recovered.get(q),
     "sourceColumn":hit["sourceColumn"] if hit else None,
     "textLayerHeadingFound":bool(hit),
     "visuallyLocatedHeading":q in recovered,
     "textLayerDraftFragment":hit["draftTextFragment"] if hit else None,
     "optionLabelCues":hit["optionLabelCues"] if hit else [],
     "questionWordingVerified":False,"fourChoicesVerified":False,
     "diagramVerified":False,"correctOption":None,
     "answerSourceVerified":False,"simulatorReady":False
    })
   key=f"POB-P1-{year}-{sitting}"
   text_chars=sum(len(p["rawText"].strip()) for p in pages)
   row={
    "id":key,"paper":1,"year":year,"sitting":sitting,
    "sourceFilename":filename,"sourceSha256":hashlib.sha256(raw).hexdigest(),
    "sourcePageCount":len(pages),"sourceTextChars":text_chars,
    "textLayerQuestionCues":len(unique),"textLayerHeadingNumbers":unique,
    "unlocatedQuestionNumbers":sorted(set(range(1,61))-set(unique)-set(recovered)),
    "visuallyRecoveredHeadingPages":recovered,
    "sourceCoverPaper01VisuallyChecked":True,
    "sourceAuthenticityVerified":False,
    "questionTranscriptionVerified":False,"answerKeyVerified":False,
    "markingSchemeVerified":False,"endToEndAssessmentVerified":False,
    "simulatorReady":False,"sourceStatus":
       "column-question-candidates-unverified" if unique else "visual-transcription-required",
    "pages":pages,"questionReviewSlots":slots,
    "extraHeadingCues":len(hints)-len(unique),
    "warnings":[
      "Question review slots are NOT verified complete MCQs.",
      "Four option letters and all diagrams must be checked against original pages.",
      "No authenticated answer keys were supplied; no marks may be published.",
      *SPECIAL.get((year,sitting),[])
    ]
   }
   (out_dir/f"{key}.json").write_text(json.dumps(row,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
   manifest.append({k:row[k] for k in (
      "id","sourceFilename","sourceSha256","sourcePageCount","sourceTextChars",
      "textLayerQuestionCues","extraHeadingCues","visuallyRecoveredHeadingPages",
      "unlocatedQuestionNumbers","sourceStatus","simulatorReady"
   )})
 if len(manifest)!=6 or sum(m["sourcePageCount"] for m in manifest)!=57:
  raise ValueError("Expected exactly six PDFs and 57 pages")
 (out_dir/"manifest.json").write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
 return manifest

if __name__=="__main__":
 parser=argparse.ArgumentParser()
 parser.add_argument("archive",type=Path)
 parser.add_argument("--out-dir",type=Path,required=True)
 parser.add_argument("--render-pages",action="store_true")
 args=parser.parse_args()
 rows=build(args.archive,args.out_dir,args.render_pages)
 print(f"Prepared {len(rows)} unverified source drafts and {sum(p['sourcePageCount'] for p in rows)} pages.")
