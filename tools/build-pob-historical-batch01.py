#!/usr/bin/env python3
"""Build one exactly-ten-paper POB Paper 2 transcription-review batch.

Inputs are the ORIGINAL source PDFs inside the user-provided POB.zip.
Outputs preserve complete extracted question text, source page references,
PDF SHA-256 and each printed mark token. Nothing here is a verified answer
key, model solution or simulator-ready paper.

Requires PyMuPDF (fitz). Usage:
  python tools/build-pob-historical-batch01.py POB.zip --out-dir review/batch01
"""
import argparse
import bisect
import hashlib
import json
import re
import zipfile
from pathlib import Path

BATCH=((2012,"MJ"),(2013,"MJ"),(2014,"MJ"),(2015,"MJ"),(2016,"MJ"),
       (2017,"MJ"),(2018,"MJ"),(2022,"JAN"),(2022,"MJ"),(2023,"JAN"))
HEADING=re.compile(r"(?m)^[ \t]*([1-7])\.[ \t]+(?=\(|[A-Z])")
END=re.compile(r"\bEND[ \t\r\n]+OF[ \t\r\n]+TEST",re.I)
MARK=re.compile(r"\(\s*(\d+)\s+marks?\s*\)",re.I)

def build(archive,out_dir):
    try:
        import fitz
    except ImportError as error:
        raise RuntimeError("Install PyMuPDF before extracting PDF text.") from error

    out_dir.mkdir(parents=True,exist_ok=True)
    manifest=[]
    with zipfile.ZipFile(archive) as sources:
        for year,sitting in BATCH:
            filename=f"CSEC_Principles_of_Business_P2_{year}_{sitting}.pdf"
            names=[n for n in sources.namelist() if Path(n).name==filename]
            if len(names)!=1:
                raise ValueError(f"Expected exactly one source: {filename}")
            source=sources.read(names[0])
            if not source.startswith(b"%PDF-"):
                raise ValueError("Source is not a PDF: "+filename)
            pdf=fitz.open(stream=source,filetype="pdf")
            try:
                pages=[page.get_text(sort=True) for page in pdf]
                image_counts=[len(page.get_images(full=True)) for page in pdf]
            finally:
                pdf.close()

            # These January 2022/2023 papers start their questions on PDF page 4.
            first=3 if sitting=="JAN" and year in (2022,2023) else 1
            chunks=pages[first:]
            text="\n".join(chunks)
            last=END.search(text)
            if last is None:
                raise ValueError("END OF TEST marker absent: "+filename)
            text=text[:last.start()]

            starts=[0]
            for chunk in chunks[:-1]:
                starts.append(starts[-1]+len(chunk)+1)
            page_number=lambda offset: first+bisect.bisect_right(starts,offset)

            expected=7 if year<=2016 else 5
            question_starts=[]
            next_number=1
            for match in HEADING.finditer(text):
                if int(match.group(1))==next_number:
                    question_starts.append(match)
                    next_number+=1
                    if next_number>expected:
                        break
            if len(question_starts)!=expected:
                raise ValueError(f"{filename}: found {len(question_starts)} of {expected} expected questions")
            questions=[]
            for index,match in enumerate(question_starts):
                end=question_starts[index+1].start() if index+1<len(question_starts) else len(text)
                draft=text[match.start():end].strip()
                tokens=[int(value) for value in MARK.findall(draft)]
                questions.append({
                    "id":f"POB-P2-{year}-{sitting}-Q{index+1}",
                    "number":index+1,
                    "sourcePages":list(range(page_number(match.start()),page_number(end-1)+1)),
                    "questionTextDraft":draft,
                    "markTokensExtracted":tokens,
                    "markTokensTotal":sum(tokens),
                    "printedMarksExpected":20,
                    "textVisuallyVerified":False,
                    "diagramVisuallyVerified":False,
                    "markSchemeVerified":False,
                    "answerKeyVerified":False
                })
            identity=f"POB-P2-{year}-{sitting}"
            document={
                "id":identity,"paper":2,"year":year,"sitting":sitting,
                "sourceFilename":filename,
                "sourceSha256":hashlib.sha256(source).hexdigest(),
                "sourcePageCount":len(pages),"pageImageCounts":image_counts,
                "examStructure":{
                    "compulsoryQuestions":[1,2,3] if year<=2016 else [1,2,3,4,5],
                    "eitherOrPairs":[[4,5],[6,7]] if year<=2016 else [],
                    "questionsToAnswer":5,"marksPerQuestion":20,"marksToAnswer":100
                },
                "origin":"user-supplied",
                "status":"page-linked-text-draft-not-verified",
                "transcriptionStatus":"unverified",
                "answerKeyStatus":"not-verified","simulatorReady":False,
                "questions":questions,
                "warnings":[
                    "Text order, diagrams and mark allocations require visual verification.",
                    "No authenticated CXC answer key or marking scheme is inferred.",
                    "No extracted draft may be published for scored practice."
                ]
            }
            (out_dir/(identity+".json")).write_text(
                json.dumps(document,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
            manifest.append({
                "id":identity,"sourceFilename":filename,
                "sourceSha256":document["sourceSha256"],
                "sourcePageCount":len(pages),"questionCount":expected,
                "markTokensSum":[q["markTokensTotal"] for q in questions],
                "sourcePages":[q["sourcePages"] for q in questions],
                "simulatorReady":False
            })
    if len(manifest)!=10 or sum(m["questionCount"] for m in manifest)!=60:
        raise ValueError("Batch size or question segmentation failed")
    (out_dir/"manifest.json").write_text(json.dumps(manifest,indent=2)+"\n",encoding="utf-8")
    return manifest

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("archive",type=Path)
    parser.add_argument("--out-dir",required=True,type=Path)
    args=parser.parse_args()
    result=build(args.archive,args.out_dir)
    print(f"Produced {len(result)} source-linked drafts with "
          f"{sum(m['questionCount'] for m in result)} question bodies; all unverified.")

if __name__=="__main__":
    main()
