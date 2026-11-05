"""Prepare source-attributed, selectable paper layouts from the user's OA archive.
OCR outputs remain unverified until each paper is checked; no answer keys are inferred.
"""
from pathlib import Path
from PIL import Image,ImageDraw
import pdfplumber,json,re,hashlib,subprocess,sys
from pypdf import PdfReader
sys.stdout.reconfigure(encoding='utf8')
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'.audit-output/office-admin-source';CACHE=ROOT/'.audit-output/office-admin-layout'
OUT=ROOT/'public/office-administration';PAGES=OUT/'source-pages';FIGURES=OUT/'figures'
for p in [CACHE,PAGES,FIGURES]:p.mkdir(parents=True,exist_ok=True)
POPPLER=Path(r'C:\Users\odane\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe')
LAYOUT_VERSION='oa-native-layout-rgb-v2'
def font(name):
 name=name.lower()
 if 'courier' in name:return 'Courier New'
 if any(x in name for x in ['arial','helvetica','calibri']):return 'Arial'
 return 'Times New Roman'
def image_for(pdf,page,cache,ocr):
 candidates=list(ocr.glob('page-*.png')) if ocr.exists() else []
 match=next((p for p in candidates if int(re.search(r'(\d+)\.png$',p.name).group(1))==page),None)
 if match:return match
 expected=cache/f'page-{page}.png'
 if expected.exists():return expected
 cache.mkdir(parents=True,exist_ok=True)
 subprocess.run([str(POPPLER),'-f',str(page),'-l',str(page),'-scale-to','1800','-singlefile','-png',str(pdf),str(expected.with_suffix(''))],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 return expected
manifest=[]
jobs=[{'path':p} for p in sorted(SOURCE.glob('CSEC_Office_Administration_P*.pdf'))]
syllabus=SOURCE/'CSEC-Office-Administration-Syllabus-Revised-2024.pdf'
jobs.extend([{'path':syllabus,'id':'OA-SPECIMEN-P1-2024','paper':1,'range':range(84,100)},{'path':syllabus,'id':'OA-P2-SPECIMEN-2024','paper':2,'range':range(102,126)}])
for job in jobs:
 path=job['path'];specimen='id' in job
 if specimen:id=job['id'];paper=job['paper'];year=2024;sitting='SPECIMEN';selection=job['range']
 else:
  m=re.search(r'_P([12])_(\d{4})_(MJ|JAN)\.pdf$',path.name);paper=int(m[1]);year=int(m[2]);sitting=m[3];id=f'OA-P{paper}-{year}-{sitting}';selection=None
 destination=PAGES/(id+'.json')
 doc=pdfplumber.open(path);selection=selection or range(1,len(PdfReader(path).pages)+1)
 ocrdir=ROOT/'.audit-output/office-admin-ocr'/path.stem
 input_hash=hashlib.sha256(path.read_bytes()+LAYOUT_VERSION.encode())
 for directory in [ocrdir,CACHE/id]:
  for ocrpath in sorted(directory.glob('page-*.json')):
   input_hash.update(ocrpath.name.encode());input_hash.update(ocrpath.read_bytes())
 fingerprint=input_hash.hexdigest()
 if destination.exists():
  old=json.loads(destination.read_text(encoding='utf8'))
  if old.get('layoutInputSha256')==fingerprint and len(old.get('pages',[]))==len(selection) and sum(len(p.get('words',[])) for p in old['pages'])>500:
   manifest.append(old['source']);doc.close();print('cached '+id,flush=True);continue
 ocrdir=ROOT/'.audit-output/office-admin-ocr'/path.stem
 pages=[]
 for number in selection:
  p=doc.pages[number-1] if number<=len(doc.pages) else None;imagepath=image_for(path,number,CACHE/id,ocrdir)
  image=Image.open(imagepath).convert('RGB');iw,ih=image.size
  ocrfile=imagepath.with_suffix('.json');words=[]
  if ocrfile.exists():
   raw=json.loads(ocrfile.read_text(encoding='utf-8-sig'));width=raw['width'];height=raw['height']
   for line in raw['lines']:
    for w in line['words']:
     words.append({'t':w['text'],'x':round(w['x'],2),'y':round(w['y'],2),'w':round(w['width'],2),'h':round(w['height'],2),'f':'Times New Roman','s':round(w['height']*1.08,2)})
   method='windows-ocr'
  else:
   if p is None:raise ValueError("Source page needs OCR: "+id+" page "+str(number))
   width=p.width;height=p.height
   for w in p.extract_words(extra_attrs=['fontname','size'],keep_blank_chars=False,use_text_flow=False):
    words.append({'t':w['text'],'x':round(w['x0'],2),'y':round(w['top'],2),'w':round(w['x1']-w['x0'],2),'h':round(w['bottom']-w['top'],2),'f':font(w['fontname']),'s':round(w['size'],2),'b':'bold' in w['fontname'].lower()})
   method='pdf-text'
  draw=ImageDraw.Draw(image);sx=iw/width;sy=ih/height
  for w in words:
   draw.rectangle((max(0,w['x']*sx-1),max(0,w['y']*sy-1),min(iw,(w['x']+w['w'])*sx+1),min(ih,(w['y']+w['h'])*sy+1)),fill='white')
  figure=FIGURES/f'{id}-{number:03d}.png';image.save(figure,optimize=True)
  pages.append({'number':number,'width':width,'height':height,'words':words,'figure':f'office-administration/figures/{figure.name}','method':method,'transcriptionVerified':False})
  print(id+' page '+str(number)+' words '+str(len(words)),flush=True)
 source={'id':id,'paper':paper,'year':year,'sitting':sitting,'title':('CXC specimen 2024' if specimen else str(year)+' '+('January' if sitting=='JAN' else 'May–June'))+' · Paper '+str(paper),'filename':path.name,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':len(pages),'sourceAsset':f'office-administration/source-pages/{id}.json','transcriptionVerified':False,'answerKeyVerified':False}
 destination.write_text(json.dumps({'layoutInputSha256':fingerprint,'source':source,'pages':pages},ensure_ascii=False,separators=(',',':')),encoding='utf8')
 manifest.append(source);doc.close()
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Prepared '+str(len(manifest))+' source layouts; review and answer-key checks remain separate.',flush=True)
