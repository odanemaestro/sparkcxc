"""Extract original chart regions referenced by visually reviewed OA questions."""
import hashlib,json,subprocess
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
PUBLIC=ROOT/'public'
manifest={r['id']:r for r in json.loads((PUBLIC/'office-administration/manifest.json').read_text(encoding='utf8'))}
POPPLER=Path('C:/Users/odane/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/Library/bin/pdftoppm.exe')
for reviewed in sorted((ROOT/'src/officeAdministration/data').glob('oaHistoricalPaper1Reviewed*.json')):
 for item in json.loads(reviewed.read_text(encoding='utf8'))['items']:
  region=item.get('figureSourceRegion')
  if not region:continue
  source=manifest[item['paperId']]
  pdf=ROOT/'.audit-output/office-admin-source'/source['filename']
  assert hashlib.sha256(pdf.read_bytes()).hexdigest()==source['sha256'],source['id']
  page=region['page']
  png=ROOT/'.audit-output/office-admin-ocr'/Path(source['filename']).stem/f'page-{page:02}.png'
  if not png.exists():
   png=ROOT/'.audit-output/office-admin-layout'/source['id']/f'page-{page}.png'
   png.parent.mkdir(parents=True,exist_ok=True)
   subprocess.run([str(POPPLER),'-f',str(page),'-l',str(page),'-scale-to','2000','-singlefile','-png',str(pdf),str(png.with_suffix(''))],check=True)
  target=PUBLIC/item['figure']
  assert target.resolve().is_relative_to((PUBLIC/'office-administration/figures').resolve())
  with Image.open(png) as image:
   x,y,w,h=region['region']
   assert x>=0 and y>=0 and x+w<=image.width and y+h<=image.height
   image.convert('RGB').crop((x,y,x+w,y+h)).save(target,optimize=True)
  print(item['paperId'],item['number'],item['figure'])
