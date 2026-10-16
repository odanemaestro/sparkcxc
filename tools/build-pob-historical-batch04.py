#!/usr/bin/env python3
"""Review the NEXT TEN historical POB Paper 1-labelled PDFs in POB.zip.

Preserves exact raw text, source pages, two-column candidates and hashes.
The 2019-labelled P1 source is visibly PAPER 02 and MUST NOT enter P1.
No question, distractor or answer key is ever marked as verified by this tool.

Usage: python tools/build-pob-historical-batch04.py POB.zip --out-dir output --render-pages
Requires PyMuPDF; no OCR is performed.
"""
import argparse
import hashlib
import json
import re
import zipfile
from pathlib import Path

YEARS=(2007,2008,2011,2012,2014,2015,2016,2017,2018,2019)
HEADING=re.compile(r"(?m)^\s*(60|[1-5]\d|[1-9])\s*[.)]\s+")
CHOICE=re.compile(r"(?m)^\s*\(([ABCD])\)\s+")

def build(archive_path,out_dir,render_pages=False):
    import fitz
    out_dir=Path(out_dir)
    out_dir.mkdir(parents=True,exist_ok=True)
    manifest=[]
    with zipfile.ZipFile(archive_path) as archive:
        for year in YEARS:
            filename=f"CSEC_Principles_of_Business_P1_{year}_MJ.pdf"
            members=[n for n in archive.namelist() if Path(n).name==filename]
            if len(members)!=1:
                raise ValueError("Expected exactly one source: "+filename)
            raw=archive.read(members[0])
            if not raw.startswith(b"%PDF-"):
                raise ValueError("Invalid source PDF signature: "+filename)
            pdf=fitz.open(stream=raw,filetype="pdf")
            pages,candidates=[],[]
            try:
                for index,page in enumerate(pdf):
                    number=index+1
                    rect=page.rect
                    midpoint=rect.x0+rect.width*.5
                    columns=[]
                    for side,clip in (("left",fitz.Rect(rect.x0,rect.y0,midpoint,rect.y1)),
                                      ("right",fitz.Rect(midpoint,rect.y0,rect.x1,rect.y1))):
                        text=page.get_text(sort=True,clip=clip)
                        hints=[]
                        for match in HEADING.finditer(text):
                            hint={"number":int(match.group(1)),"page":number,
                                  "column":side,"offset":match.start(),
                                  "context":text[match.end():match.end()+150].replace("\n"," ").strip(),
                                  "verified":False}
                            hints.append(hint)
                            candidates.append(hint)
                        columns.append({"side":side,"text":text,"textChars":len(text.strip()),
                                        "headingCandidates":len(hints),
                                        "choiceLabelOccurrences":len(CHOICE.findall(text))})
                    full=page.get_text(sort=True)
                    pages.append({"page":number,"rotationDegrees":page.rotation,
                                  "rawText":full,"textChars":len(full.strip()),
                                  "embeddedImageCount":len(page.get_images(full=True)),
                                  "columns":columns,"visualComparisonComplete":False})
                    if render_pages:
                        target=out_dir/"source-pages"/f"P1-{year}-MJ"
                        target.mkdir(parents=True,exist_ok=True)
                        pix=page.get_pixmap(matrix=fitz.Matrix(1.0,1.0),alpha=False)
                        (target/f"page-{number:02}.jpg").write_bytes(
                            pix.tobytes("jpeg",jpg_quality=63))
            finally:
                pdf.close()
            distinct=sorted({c["number"] for c in candidates})
            text_chars=sum(p["textChars"] for p in pages)
            has_text=text_chars>=1000
            rotations=sorted({p["rotationDegrees"] for p in pages})
            # Source cover was visually inspected: this filename is erroneous.
            # Paper reads 'Paper 02', test code 01240020, May/June 2019.
            mismatch=year==2019
            issues=[]
            if mismatch:
                issues.append("MISLABELLED PDF: cover identifies Paper 02, test code 01240020; NEVER import to Paper 1.")
            if not has_text:
                issues.append("No substantial text layer; manual visual transcription required.")
            if any(angle in (90,180,270) for angle in rotations):
                issues.append("Rotated page coordinates; text reading order must be visually reconciled.")
            if has_text and len(distinct)!=60:
                issues.append("Question-number cues are incomplete/noisy, NOT 60 verified MCQs.")
            if any("watermark" in p["rawText"].lower() for p in pages):
                issues.append("Third-party watermark present; recheck provenance.")
            issues.append("Wording, options, diagrams, answer keys and assessment are unverified.")
            key=f"POB-P1-{year}-MJ"
            status=("wrong-paper-in-labelled-file" if mismatch else
                    "text-layer-page-column-draft" if has_text else "visual-transcription-required")
            record={
                "id":key,"paper":1,"year":year,"sitting":"MJ",
                "sourceFilename":filename,"sourceSha256":hashlib.sha256(raw).hexdigest(),
                "sourcePageCount":len(pages),"totalTextChars":text_chars,
                "substantialTextLayer":has_text,"sourceRotations":rotations,
                "declaredPaper":1,"observedPaperOnCover":2 if mismatch else 1,
                "coverPaperIdentityVisuallyChecked":True,"paperTypeMismatch":mismatch,
                "sourceStatus":status,"headingCandidateCount":len(candidates),
                "distinctHeadingCandidates":len(distinct),
                "missingHeadingNumbers":sorted(set(range(1,61))-set(distinct)),
                "headingCandidates":candidates,"pages":pages,"warnings":issues,
                "sourceAuthenticityVerified":False,"questionWordingVerified":False,
                "answerChoicesVerified":False,"diagramsVerified":False,
                "answerKeyVerified":False,"markingSchemeVerified":False,
                "simulatorReady":False
            }
            (out_dir/f"{key}.json").write_text(
                json.dumps(record,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
            manifest.append({k:record[k] for k in (
                "id","sourceFilename","sourceSha256","sourcePageCount",
                "totalTextChars","substantialTextLayer","sourceRotations",
                "observedPaperOnCover","paperTypeMismatch","sourceStatus",
                "headingCandidateCount","distinctHeadingCandidates","simulatorReady"
            )})
    if len(manifest)!=10:
        raise ValueError("Batch 04 must include exactly ten sources")
    (out_dir/"manifest.json").write_text(
        json.dumps(manifest,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    return manifest

if __name__=="__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("archive",type=Path)
    parser.add_argument("--out-dir",type=Path,required=True)
    parser.add_argument("--render-pages",action="store_true")
    args=parser.parse_args()
    result=build(args.archive,args.out_dir,args.render_pages)
    print(f"{len(result)} source drafts, {sum(x['sourcePageCount'] for x in result)} source pages; all ungraded.")
