#!/usr/bin/env python3
"""Extract page-attributed, unverified historical POB source text in one batch.

This is an intermediate transcription workspace: never use this output as a
simulator question bank, source of answer keys or official marking scheme.
Visual comparisons remain necessary, especially for scanned PDFs and diagrams.
"""
import argparse
import hashlib
import io
import json
import re
import zipfile
from pathlib import Path

EXAM_NAME=re.compile(r"CSEC_Principles_of_Business_P([12])_(\d{4})_(JAN|MJ)\.pdf$")
def extract(archive):
    import fitz
    results=[]
    with zipfile.ZipFile(archive) as source:
        for member in sorted(source.namelist()):
            name=Path(member).name
            match=EXAM_NAME.fullmatch(name)
            if not match:
                continue
            raw=source.read(member)
            doc=fitz.open(stream=raw,filetype="pdf")
            try:
                pages=[{"page":index+1,"text":page.get_text(sort=True),
                        "hasImages":len(page.get_images())>0}
                       for index,page in enumerate(doc)]
            finally:
                doc.close()
            substantial=sum(len(page["text"].strip()) for page in pages)>=1000
            results.append({"id":f"POB-P{match.group(1)}-{match.group(2)}-{match.group(3)}",
              "filename":name,"paper":int(match.group(1)),
              "year":int(match.group(2)),"sitting":match.group(3),
              "sha256":hashlib.sha256(raw).hexdigest(),
              "pages":pages,"textLayerReady":substantial,
              "requiresVisualReview":True,"questionTranscriptionVerified":False,
              "answerKeyVerified":False,"markingSchemeVerified":False,
              "simulatorReady":False,
              "warnings":["Unverified extracted text: line order and diagrams may be incorrect.",
                "No answers or mark schemes are inferred from this file."]})
    if len(results)!=46:
        raise ValueError(f"Expected 46 historical PDFs, got {len(results)}")
    return results

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("archive",type=Path)
    parser.add_argument("--output-dir",type=Path,required=True)
    args=parser.parse_args()
    args.output_dir.mkdir(parents=True,exist_ok=True)
    for item in extract(args.archive):
        path=args.output_dir/(item["id"]+".json")
        path.write_text(json.dumps(item,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print("Prepared 46 gated, page-attributed historical text extraction drafts.")

if __name__=="__main__":
    main()
