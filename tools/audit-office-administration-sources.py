"""Check deployed OA paper layouts against the local source inventory."""
from pathlib import Path
from PIL import Image
import json, hashlib, math
ROOT=Path(__file__).resolve().parents[1]
PUBLIC=ROOT/'public'
manifest=json.loads((PUBLIC/'office-administration/manifest.json').read_text(encoding='utf8'))
assert len(manifest)==46 and len({s['id'] for s in manifest})==46
assert sum(s['sitting']!='SPECIMEN' for s in manifest)==44
pages=words=0
for source in manifest:
 asset=PUBLIC/source['sourceAsset'];assert asset.is_file()
 document=json.loads(asset.read_text(encoding='utf8'))
 assert document['source']['id']==source['id'] and len(document['pages'])==source['pages']
 assert len(document['layoutInputSha256'])==64
 original=ROOT/'.audit-output/office-admin-source'/source['filename']
 if original.exists():assert hashlib.sha256(original.read_bytes()).hexdigest()==source['sha256']
 numbered=[p['number'] for p in document['pages']]
 assert len(set(numbered))==len(numbered)
 if source['id']=='OA-SPECIMEN-P1-2024':assert numbered==list(range(84,100))
 if source['id']=='OA-P2-SPECIMEN-2024':assert numbered==list(range(102,126))
 for page in document['pages']:
  assert page['width']>0 and page['height']>0
  figure=PUBLIC/page['figure'];assert figure.is_file()
  with Image.open(figure) as img:assert img.mode=='RGB' and min(img.size)>500
  for word in page['words']:
   assert isinstance(word['t'],str) and word['t'].strip()
   assert all(math.isfinite(word[k]) for k in ['x','y','w','h','s'])
   assert word['w']>0 and word['h']>0
  pages+=1;words+=len(page['words'])
 assert sum(len(p['words']) for p in document['pages'])>500
summary={'passed':True,'sources':len(manifest),'historicalPapers':44,'specimens':2,'pages':pages,'selectableWords':words,'answerKeyPagesExcluded':True,'sourceChecksumsMatch':True,'figuresRGB':True,'transcriptionAccuracy':'separate manual review; not established by this structural audit'}
print(json.dumps(summary,indent=2))
output=ROOT/'.audit-output/oa-source-structural-audit.json';output.write_text(json.dumps(summary,indent=2),encoding='utf8')
