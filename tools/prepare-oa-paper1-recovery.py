"""Prepare coordinate-preserving column OCR inputs for damaged OA scans.

Run the existing Windows OCR extractor against the printed output directory.
Only image processing is applied: no text is synthesized or corrected.
"""
import json,re,statistics,sys
from pathlib import Path
from PIL import Image,ImageOps,ImageFilter
ROOT=Path(__file__).resolve().parents[1]
YEARS={1995,1996,1997,2000,2001,2002,2003,2012,2016}
source=ROOT/'.audit-output/office-admin-ocr'
out=ROOT/'.audit-output/oa-p1-recovery-ocr'
manifest=[]
for folder in source.iterdir():
    match=re.search(r'_P1_(\d{4})_',folder.name)
    if not match or int(match[1]) not in YEARS:continue
    for path in sorted(folder.glob('page-*.png')):
        data=json.loads(path.with_suffix('.json').read_text(encoding='utf-8-sig'))
        im=Image.open(path).convert('L')
        clean=ImageOps.autocontrast(im).filter(ImageFilter.MedianFilter(3))
        width,height=im.size
        # The quiet vertical strip between text columns varies with the scan's
        # left margin; a fixed page midpoint can cut the printed left column.
        small=clean.resize((width,max(1,height//5)))
        pixels=small.load();y1=int(small.height*.08);y2=int(small.height*.89)
        ink=[sum(pixels[x,y]<150 for y in range(y1,y2)) for x in range(width)]
        half=max(8,int(width*.008))
        choices=range(int(width*.44),int(width*.65))
        split=min(choices,key=lambda x:sum(ink[max(0,x-half):min(width,x+half)]))
        # Keep a narrow white overlap so glyphs touching the split survive.
        for column,(left,right) in enumerate([(0,split+4),(split-4,width)]):
            crop=clean.crop((left,0,right,height)).point(lambda value:255 if value>155 else 0)
            # WinRT supports up to 4000 pixels in either dimension.
            scale=min(2,3900/height)
            crop=crop.resize((round(crop.width*scale),round(crop.height*scale)))
            target=out/folder.name/(path.stem+f'-col{column+1}.png')
            target.parent.mkdir(parents=True,exist_ok=True)
            if not target.exists():crop.save(target)
            manifest.append({'sourceFolder':folder.name,'page':int(path.stem.split('-')[1]),'column':column+1,'image':str(target.relative_to(out)).replace('\\','/'),'x':left,'y':0,'scale':scale,'sourceWidth':width,'sourceHeight':height,'split':split})
(out/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf8')
print(f'{len(manifest)} column images prepared in {out}')
