#!/usr/bin/env python3
"""Reproducible POB Paper 2 batch 02: ten PDF source-backed QA drafts.

Never marks a PDF as verified or simulator-ready. Scans without a complete
question text layer are preserved as page-indexed drafts, not guessed text.

Usage: python tools/build-pob-historical-batch02.py POB.zip --out-dir /tmp/pob-batch02
Requires PyMuPDF.
"""
import argparse,bisect,hashlib,json,re,zipfile
from pathlib import Path

BATCH=((2005,"MJ"),(2006,"MJ"),(2007,"MJ"),(2008,"MJ"),
       (2009,"MJ"),(2010,"MJ"),(2011,"MJ"),
       (2019,"JAN"),(2019,"MJ"),(2021,"MJ"))
HEAD=re.compile(r"(?m)^[ \t]*([1-7])[.][ \t]+(?=\(|[A-Z])")
END=re.compile(r"\bEND[ \t\r\n]+OF[ \t\r\n]+TEST",re.I)
MARK=re.compile(r"\(\s*(\d+)\s+marks?\s*\)",re.I)
COVER={
 (2005,"MJ"):"ALL questions in Section I and THREE in Section II",
 (2006,"MJ"):"ALL questions in Section I and THREE in Section II",
 (2007,"MJ"):"ALL questions in Section I and THREE in Section II",
 (2008,"MJ"):"THREE questions in Section I and TWO in Section II",
 (2009,"MJ"):"THREE questions in Section I and TWO in Section II",
 (2010,"MJ"):"THREE questions in Section I, ONE in Section II, ONE in Section III",
 (2011,"MJ"):"THREE questions in Section I, ONE in Section II, ONE in Section III",
 (2019,"JAN"):"FIVE questions; answer ALL",
 (2019,"MJ"):"FIVE questions; answer ALL",
 (2021,"MJ"):"FIVE questions; answer ALL"
}
def build(archive,out_dir):
 import fitz
 out_dir=Path(out_dir);out_dir.mkdir(parents=True,exist_ok=True)
 manifest=[]
 with zipfile.ZipFile(archive) as z:
  for year,sitting in BATCH:
   name=f"CSEC_Principles_of_Business_P2_{year}_{sitting}.pdf"
   members=[n for n in z.namelist() if Path(n).name==name]
   if len(members)!=1:raise ValueError("Expected exactly one PDF: "+name)
   raw=z.read(members[0])
   if not raw.startswith(b"%PDF-"):raise ValueError("Bad PDF: "+name)
   pdf=fitz.open(stream=raw,filetype="pdf")
   try:
    pages=[page.get_text(sort=True) for page in pdf]
    image_counts=[len(page.get_images(full=True)) for page in pdf]
   finally:pdf.close()
   questions=[]
   # The 2009-11 source copies permit sequential question segmentation.
   # Other seven PDFs are image-based or have partial, unusable question text.
   if year in (2009,2010,2011):
    text="\n".join(pages);ending=END.search(text)
    if ending is None:raise ValueError("Missing END OF TEST: "+name)
    text=text[:ending.start()]
    boundaries=[0]
    for page in pages[:-1]:boundaries.append(boundaries[-1]+len(page)+1)
    page_for=lambda pos:bisect.bisect_right(boundaries,pos)
    starts=[];expected=1
    for match in HEAD.finditer(text):
     if int(match.group(1))==expected:
      starts.append(match);expected+=1
      if expected>7:break
    if len(starts)!=7:raise ValueError("Expected seven questions: "+name)
    for i,match in enumerate(starts):
     end=starts[i+1].start() if i+1<len(starts) else len(text)
     body=text[match.start():end].strip()
     tokens=[int(n) for n in MARK.findall(re.sub(r"(?i)\bmar\s+ks\b","marks",body))]
     questions.append({
      "id":f"POB-P2-{year}-{sitting}-Q{i+1}","number":i+1,
      "sourcePages":list(range(page_for(match.start()),page_for(end-1)+1)),
      "questionTextDraft":body,"markTokensExtracted":tokens,
      "markTokenSum":sum(tokens),"printedMarksExpected":20,
      "markTokenDiscrepancy":sum(tokens)!=20,
      "requiresDiagramReview":bool(re.search(r"\b(figure|table|graph|chart|diagram)\b",body,re.I)),
      "questionTextVerified":False,"markSchemeVerified":False,"answerKeyVerified":False
     })
   ident=f"POB-P2-{year}-{sitting}"
   record={
    "id":ident,"year":year,"sitting":sitting,"paper":2,
    "sourceFilename":name,"sourceSha256":hashlib.sha256(raw).hexdigest(),
    "sourcePages":len(pages),"pageImageCounts":image_counts,
    "textChars":sum(len(page.strip()) for page in pages),
    "pageTextChars":[len(page.strip()) for page in pages],
    "coverInstructions":COVER[(year,sitting)],
    "coverInstructionsVisuallyChecked":True,
    "extractionStatus":"structured-question-draft-unverified" if questions else "visual-transcription-required",
    "questionCountExtracted":len(questions),"questions":questions,
    "pageTextDrafts":[{"page":i+1,"text":text} for i,text in enumerate(pages)],
    "questionTranscriptionVerified":False,"visualPageReviewComplete":False,
    "answerKeyVerified":False,"markingSchemeVerified":False,
    "sourceAuthenticated":False,"simulatorReady":False,
    "warnings":[
     "Scanned pages without a usable question text layer require visual transcription.",
     "Extracted mark tokens are not verified official grading criteria.",
     "Do not enable scored practice until transcription, visual, answer and scheme QA."
    ]}
   (out_dir/(ident+".json")).write_text(json.dumps(record,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
   manifest.append({key:record[key] for key in (
    "id","sourceFilename","sourceSha256","sourcePages","textChars",
    "extractionStatus","questionCountExtracted","coverInstructions","simulatorReady"
   )}|{"markTokenSums":[q["markTokenSum"] for q in questions]})
 if len(manifest)!=10 or sum(x["questionCountExtracted"] for x in manifest)!=21:
  raise ValueError("Expected ten files and 21 extractable question bodies")
 (out_dir/"manifest.json").write_text(json.dumps(manifest,indent=2)+"\n",encoding="utf-8")
 return manifest
if __name__=="__main__":
 p=argparse.ArgumentParser();p.add_argument("archive",type=Path)
 p.add_argument("--out-dir",type=Path,required=True);args=p.parse_args()
 result=build(args.archive,args.out_dir)
 print("Produced",len(result),"historical paper drafts and",
       sum(x["questionCountExtracted"] for x in result),"text-readable question blocks")
