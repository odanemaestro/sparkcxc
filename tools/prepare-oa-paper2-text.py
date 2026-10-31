"""Prepare page-attributed Office Administration Paper2 question text.

The supplied PDF remains the visual authority. This extraction preserves source
question identities and allocations, and never generates historical questions
or marking schemes. Native page assets carry the forms and positioned text.
"""
import argparse,json,re,hashlib
from pathlib import Path
import pdfplumber

PAPER=re.compile(r'CSEC_Office_Administration_P2_(\d{4})_(MJ|JAN)\.pdf$')
DROP=re.compile(r'^(?:AERA|SIHT|NI|ETIRW|TON|OD|T|O|N|E|G|D|A|I|P|R|W|S|H|CamScanner|[.\s_]{3,}|-?\s*\d+\s*-?|GO\s+ON\s+TO\s+THE\s+NEXT\s+PAGE|.*Barcode Area.*|.*Sequential Bar Code.*|DO NOT WRITE.*|01237020.*|Office Admin(?:istration)? .*\.qxd.*)$',re.I)

def ocr_lines(obj):
 words=[w for line in obj['lines'] for w in line['words']]
 rows=[]
 for w in sorted(words,key=lambda w:(w['y']+w['height']/2,w['x'])):
  cy=w['y']+w['height']/2
  tolerance=max(5,min(13,w['height']*.45))
  row=next((r for r in rows[-5:] if abs(cy-r['cy'])<=tolerance),None)
  if row is None:row={'cy':cy,'words':[]};rows.append(row)
  row['words'].append(w)
 return [' '.join(w['text'] for w in sorted(r['words'],key=lambda w:w['x'])) for r in sorted(rows,key=lambda r:r['cy'])]

def clean_line(line):
 line=line.replace('\u00ad','').replace('\t',' ')
 line=re.sub(r'\s+',' ',line).strip()
 if DROP.fullmatch(line):return ''
 return line

def pages_for(path,ocrdir):
 with pdfplumber.open(path) as doc:
  pages=[p.extract_text(x_tolerance=2,y_tolerance=3) or '' for p in doc.pages]
 if sum(map(len,pages))<1500:
  folder=ocrdir/path.stem
  files=sorted(folder.glob('page-*.json'),key=lambda f:int(re.search(r'page-(\d+)',f.name)[1]))
  if len(files)!=len(pages):raise ValueError('Incomplete OCR pages for '+path.name)
  pages=['\n'.join(ocr_lines(json.loads(f.read_text(encoding='utf-8-sig')))) for f in files]
 return pages

def parse_questions(pages,count,offset=0):
 questions=[];current=None;ended=False
 for pi,page in enumerate(pages):
  pno=pi+1+offset
  for raw in page.splitlines():
   line=clean_line(raw)
   if not line:continue
   if re.search(r'\bEND OF TEST\b|\bSTOP\s+IF YOU FINISH',line,re.I):ended=True
   if ended:continue
   if re.search(r'^EXTRA SPACE\b|^CANDIDATE.S RECEIPT',line,re.I):continue
   # A later digit is not accepted until every preceding source question exists.
   # This excludes numbered answer lines and forms from starting new questions.
   head=re.match(r'^([1-8lIsS])[.,:]\s*(.*)$',line)
   n=None
   if head:
    token=head[1];n=int(token) if token.isdigit() else 1 if token in 'lI' else 5
    rest=head[2]
    if not (re.match(r'^\([aA]\)',rest) or re.match(r'^(?:The |You |After |Guyana |[A-Z][a-z]+ )',rest)):n=None
   expected=len(questions)+1
   if n==expected and expected<=count and (expected!=1 or pi>0 or offset):
    current={'number':n,'sourcePage':pno,'sourcePages':[pno],'lines':[]};questions.append(current)
    # Keep everything after the printed question number verbatim.
    current['lines'].append(head[2]);continue
   if current:
    if pno not in current['sourcePages']:current['sourcePages'].append(pno)
    if re.match(r'^SECTION\s+[I1]+\b|^Answer ALL.*this section|^Answer any .*this section',line,re.I):continue
    current['lines'].append(line)
 if len(questions)!=count:raise ValueError(f'Expected {count} questions, obtained {len(questions)}: '+str([(q['number'],q['sourcePage']) for q in questions]))
 result=[]
 for q in questions:
  q['lines']=[l for l in q['lines'] if not re.match(r'^Total\s*1[5S]\s*marks?\b|^Total15\s*marks?\b',l,re.I)]
  full='\n'.join(q.pop('lines')).strip()
  # Answer lines disappear from the readable prompt. The native page keeps them.
  full=re.sub(r'(?m)^\s*(?:\d\.?\s*)?[. _]{4,}\s*$','',full)
  starts=list(re.finditer(r'(?m)^\(([a-h])\)\s*',full))
  parts=[]
  for i,m in enumerate(starts):
   prompt=full[m.end():starts[i+1].start() if i+1<len(starts) else len(full)].strip()
   marks=[int(x) for x in re.findall(r'\(\s*(\d+)\s*marks?\s*\)',prompt,re.I)]
   parts.append({'id':f'q{q["number"]}-{m[1]}','label':m[1],'prompt':prompt,'marks':sum(marks),'answerType':'written','sourcePages':q['sourcePages']})
  # Only use separate answer boxes when the printed allocations reconcile.
  # The whole source question is otherwise kept intact as one 15-mark response.
  separate=bool(parts and len(set(p['label'] for p in parts))==len(parts) and sum(p['marks'] for p in parts)==15 and all(p['marks']>0 for p in parts))
  stem=full[:starts[0].start()].strip() if separate else ''
  if not separate:parts=[{'id':f'q{q["number"]}-response','label':'Answer','prompt':full,'marks':15,'answerType':'written','sourcePages':q['sourcePages']}]
  result.append({**q,'id':f'q{q["number"]}','title':f'Question {q["number"]}','stem':stem,'fullText':full,'marks':15,'parts':parts,'partAllocationVerified':separate})
 return result

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--source-dir',type=Path,default=Path('.audit-output/office-admin-source'));ap.add_argument('--ocr-dir',type=Path,default=Path('.audit-output/office-admin-ocr'));ap.add_argument('--output',type=Path,default=Path('src/officeAdministration/data/oaHistoricalPaper2Text.json'));a=ap.parse_args()
 records=[];errors=[]
 for path in sorted(a.source_dir.glob('*P2*.pdf')):
  match=PAPER.fullmatch(path.name)
  if not match:continue
  year=int(match[1]);sitting=match[2];count=8 if year<=2013 else 7 if year<=2016 else 6
  pages=pages_for(path,a.ocr_dir)
  try:questions=parse_questions(pages,count)
  except Exception as e:errors.append({'id':path.stem,'error':str(e)});continue
  for q in questions:q['section']='I' if q['number']<=(4 if count==8 else 3) else 'II'
  records.append({'id':f'OA-P2-{year}-{sitting}','questions':questions})
  print(json.dumps({'id':records[-1]['id'],'questions':len(questions),'separateParts':sum(q['partAllocationVerified'] for q in questions),'heads':[[q['number'],q['sourcePage']] for q in questions]}))
 a.output.parent.mkdir(parents=True,exist_ok=True);a.output.write_text(json.dumps(records,ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf8')
 Path('.audit-output/oa-p2-extraction-errors.json').write_text(json.dumps(errors,indent=2),encoding='utf8')
 print(json.dumps({'prepared':len(records),'errors':errors}))
if __name__=='__main__':main()
