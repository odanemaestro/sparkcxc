
#!/usr/bin/env python3
"""Extract the supplied CXC specimen without changing question wording or option order."""
from pathlib import Path
import json,re,hashlib
import pdfplumber
BASE=Path(__file__).resolve().parents[1]
SOURCE=BASE/'.audit-output/office-admin-source/CSEC-Office-Administration-Syllabus-Revised-2024.pdf'
OUT=BASE/'src/officeAdministration/data/oaHistoricalPaper1Specimen.json'
ROMAN={'I':1,'II':2,'III':3,'IV':4,'V':5,'VI':6,'VII':7,'VIII':8,'IX':9,'X':10,'XI':11}
def clean(t):
    t=t.replace('\ufffd',"'").replace('\u00ad','')
    t=re.sub(r'(?<=[A-Za-z])-\n(?=[a-z])','',t)
    return re.sub(r'\s+',' ',t).strip()
with pdfplumber.open(SOURCE) as d:
    pieces=[]
    for n in range(84,95):
        pg=d.pages[n]
        if n==93:
            text=pg.crop((0,35,pg.width,pg.height-38)).extract_text(x_tolerance=2,y_tolerance=3) or ''
            pieces.append({'page':n+1,'column':0,'text':text})
        else:
            for c in range(2):
                text=pg.crop((c*pg.width/2,35,(c+1)*pg.width/2,pg.height-38)).extract_text(x_tolerance=2,y_tolerance=3) or ''
                text=text.replace('\ufffd',"'")
                lines=[l for l in text.splitlines() if not re.match(r'^(?:-\s*\d+\s*-?|\d+\s*-|01237010|GO ON TO|END OF|F TEST|IF YOU FINISH|ED, CHECK)',l.strip())]
                pieces.append({'page':n+1,'column':c+1,'text':'\n'.join(lines)})
    keytext=d.pages[99].extract_text(x_tolerance=2,y_tolerance=3)
    key={}
    for m in re.finditer(r'(?<!\d)(\d{1,2})\s+([IVX]+)\.(\d+(?:/\d+)?)(?:\([a-z]\))?\s+([ABCD])\s+([12])',keytext):
        n,roman,num,letter,profile=m.groups()
        key[int(n)]={'letter':letter,'index':'ABCD'.index(letter),'officialObjective':roman+'.'+num,'objectiveCode':f'OA{ROMAN[roman]}.{num.split("/")[0]}','profile':'knowledge-comprehension' if profile=='1' else 'application'}
    assert len(key)==60,len(key)
    bynum={}
    common={}
    for p in pieces:
        text=p['text']
        # Material introduced between questions belongs to the following item(s).
        if 'Item 45 refers' in text:
            common[45]=clean(text[text.index('Item 45 refers'):text.index('45.')])
            text=text[:text.index('Item 45 refers')]+text[text.index('45.'):]
        if 'Items 48 and 49 refer' in text:
            common[48]=common[49]=clean(text[:text.index('48.')])
            text=text[text.index('48.'):]
        if p['page']==94:
            common[54]='Item 54 refers to the stock card shown below.'
            text=text[text.index('54.'):]
        starts=list(re.finditer(r'(?m)^(\d{1,2})\.\s+',text))
        for i,m in enumerate(starts):
            number=int(m.group(1))
            body=text[m.end():starts[i+1].start() if i+1<len(starts) else len(text)].strip()
            opts=list(re.finditer(r'\(([ABCD])\)\s*',body))
            if [x.group(1) for x in opts]!=list('ABCD'):
                raise ValueError((number,'options',body))
            stem=clean(body[:opts[0].start()])
            options=[clean(body[o.end():opts[j+1].start() if j<3 else len(body)]) for j,o in enumerate(opts)]
            record={'id':f'OA-SPECIMEN-P1-2024-q{number:02d}','number':number,'stem':stem,'question':stem,'options':options,'answerIndex':key[number]['index'],'officialAnswerIndex':key[number]['index'],'officialAnswer':key[number]['letter'],'officialObjective':key[number]['officialObjective'],'objectiveCode':key[number]['objectiveCode'],'section':int(re.match(r'OA(\d+)',key[number]['objectiveCode'])[1]),'profile':key[number]['profile'],'sourcePage':p['page'],'sourceColumn':p['column'],'marks':1,'answerProvenance':'CXC printed specimen key, supplied syllabus PDF page100','transcriptionMethod':'digital-text-by-column','transcriptionVerified':False,'keyStatus':'official-printed'}
            if number in common:record['contextText']=common[number]
            bynum[number]=record
    assert sorted(bynum)==list(range(1,61)),sorted(bynum)
    bynum[54]['table']={'title':'Stock Record','details':['Description: Tabloid Paper','Supplier: Getfers Ltd','Stock Ref: 8/12','Max: 100 reams','Min: 10 reams','Reorder level: 15 reams'],'columns':['Date','Order No.','In','Out','Balance'],'rows':[['2024','','','',''],['Jan01','','','','22'],['Jan02','40/21','78','','100'],['Jan03','5c/8','','14','86'],['Jan04','BE/10','','20','66'],['Jan05','Tec/4','','35','31'],['Jan07','A/20','','24','7'],['Jan08','So/4','','2','5'],['Jan10','Ag/2','','4','1']]}
    # Source table visually checked against the raster of original PDF page94.
    bynum[54]['transcriptionVerified']=True
    bynum[60].update({'answerIndex':None,'workedAnswerIndex':0,'keyStatus':'disputed','scoringReady':False,'answerProvenance':'Printed CXC key:C; source wording and primary export guidance support review of A. This item is excluded from scored marks.','keyReviewSources':['https://www.fedex.com/en-ca/contact-us/faq/send-packages/international-customs/international-documents.html','https://www.trade.gov/common-export-documents']})
    paper={'id':'OA-SPECIMEN-P1-2024','paper':1,'year':2024,'sitting':'SPECIMEN','kind':'specimen','source':'specimen','title':'CXC specimen2024 · Paper1','filename':SOURCE.name,'sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'sourceAsset':'office-administration/source-pages/OA-SPECIMEN-P1-2024.json','sourceId':'OA-SPECIMEN-P1-2024','sourceUrl':'https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Office-Administration-Syllabus-Revised-2024.pdf','pages':17,'durationMinutes':75,'questionCount':60,'totalMarks':60,'maxMarks':60,'scoredMaxMarks':59,'instructions':['Answer all60 questions.','Choose one of the four options for each question.','Time allowed:1 hour15 minutes.'],'questions':[bynum[n] for n in range(1,61)],'answerKeyVerified':True,'answerKeySourcePage':100,'transcriptionVerified':False}
    OUT.parent.mkdir(parents=True,exist_ok=True)
    OUT.write_text(json.dumps(paper,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print(json.dumps({'questions':len(paper['questions']),'officialKeyEntries':len(key),'unscoredDisputed':[60],'output':str(OUT)}))
