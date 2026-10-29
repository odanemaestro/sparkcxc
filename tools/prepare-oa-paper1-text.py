"""Build unverified OA Paper 1 OCR study text, never answer keys or wording."""
import json, re, statistics
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
COVER_YEARS={1995,1997,2007,2009,2010,2011,2016,2017,2019,2020,2021,2023,2024,2025}
FOOTER=re.compile(r'(?:01237\d{3}|000901|GO\s+ON\s+TO\s+THE\s+NEXT|END\s+OF\s+TEST|All rights reserved|Copyright)',re.I)
METADATA=[r for r in json.loads((ROOT/'public/office-administration/manifest.json').read_text(encoding='utf8')) if r['id'].startswith('OA-P1-')]
REVIEWED_SETS=[json.loads((ROOT/'src/officeAdministration/data'/name).read_text(encoding='utf8')) for name in ['oaHistoricalPaper1ReviewedItems.json','oaHistoricalPaper1Reviewed2023.json','oaHistoricalPaper1Reviewed2024.json','oaHistoricalPaper1Reviewed2021.json','oaHistoricalPaper1Reviewed2020.json','oaHistoricalPaper1Reviewed2019.json','oaHistoricalPaper1Reviewed2018.json','oaHistoricalPaper1Reviewed2017.json','oaHistoricalPaper1Reviewed2016.json','oaHistoricalPaper1Reviewed2015.json']]
def rows(words):
    out=[]
    for w in sorted(words,key=lambda w:(w.get('linecy',w['y']+w['height']/2),w['x'])):
        cy=w.get('linecy',w['y']+w['height']/2)
        row=next((r for r in reversed(out[-4:]) if abs(r['cy']-cy)<max(2,w['height']*.45)),None)
        if row is None:out.append({'cy':cy,'words':[w]})
        else:
            row['words'].append(w)
            row['cy']=statistics.median(a.get('linecy',a['y']+a['height']/2) for a in row['words'])
    for r in out:
        r['words'].sort(key=lambda w:w['x']);r['text']=' '.join(w['text'] for w in r['words'])
        r['x']=min(w['x'] for w in r['words']);r['y']=min(w['y'] for w in r['words'])
    return sorted(out,key=lambda r:r['cy'])
def get_pages(record,recovery=False):
    folder=ROOT/'.audit-output/office-admin-ocr'/Path(record['filename']).stem
    fs=sorted(folder.glob('*.json'),key=lambda p:int(p.stem.split('-')[1]))
    if fs:
        pages=[(int(p.stem.split('-')[1]),json.loads(p.read_text(encoding='utf-8-sig'))) for p in fs]
        if recovery:
            manifest_path=ROOT/'.audit-output/oa-p1-recovery-ocr/manifest.json'
            manifest=json.loads(manifest_path.read_text()) if manifest_path.exists() else []
            for pn,data in pages:
                columns=[entry for entry in manifest if entry['sourceFolder']==folder.name and entry['page']==pn]
                if len(columns)!=2:continue
                recovered=[]
                for entry in columns:
                    path=manifest_path.parent/Path(entry['image']).with_suffix('.json')
                    if not path.exists():break
                    column=json.loads(path.read_text(encoding='utf-8-sig'))
                    for line in column['lines']:
                        words=[{**w,'x':w['x']/entry['scale']+entry['x'],'y':w['y']/entry['scale']+entry['y'],'width':w['width']/entry['scale'],'height':w['height']/entry['scale'],'recoveryColumn':entry['column']-1} for w in line['words']]
                        recovered.append({'text':line['text'],'words':words})
                else:
                    data.update({'lines':recovered,'recoveryColumns':True})
        return pages
    import pdfplumber
    with pdfplumber.open(ROOT/'.audit-output/office-admin-source'/record['filename']) as pdf:
        return [(n+1,{'width':p.width,'height':p.height,'lines':[{'words':[{'x':w['x0'],'y':w['top'],'width':w['x1']-w['x0'],'height':w['bottom']-w['top'],'text':w['text']} for w in p.extract_words()]}]}) for n,p in enumerate(pdf.pages)]
def extract(record,recovery=False):
    pages=get_pages(record,recovery);streams=[];candidates=[]
    for pn,d in pages:
        if pn==1 and record['year'] in COVER_YEARS:continue
        width,height=d['width'],d['height']
        if record['year']!=2015:
            for line in d['lines']:
                linecy=statistics.median(w['y']+w['height']/2 for w in line['words'])
                for w in line['words']:w['linecy']=linecy
        words=[w for l in d['lines'] for w in l['words']]
        pagetext=' '.join(l.get('text',' '.join(w['text'] for w in l['words'])) for l in d['lines'])
        if re.search(r'(?:READ THE FOLLOWING INSTRUCTIONS|following instructions carefully|TURN THIS PAGE UNTIL)',pagetext,re.I):continue
        numeric=[w for w in words if re.fullmatch(r'\d{1,2}[.,]',w['text']) and .44*width<w['x']<.75*width]
        if numeric:
            clusters=[[b for b in numeric if abs(a['x']-b['x'])<width*.02] for a in numeric]
            strong=[cluster for cluster in clusters if len(cluster)>=2]
            cluster=min(strong or clusters,key=lambda group:statistics.median(w['x'] for w in group));split=(statistics.median(w['x'] for w in cluster)-width*.012)/width
        else:split=.49
        fullwidth=record['year']==2010 and pn==2
        for col in ([0] if fullwidth else [0,1]):
            ws=[w for w in words if (fullwidth or w.get('recoveryColumn',int(w['x']>width*split))==col) and height*.005<w['y']<height*.94]
            rs=rows(ws);idx=len(streams);streams.append({'page':pn,'col':col,'rows':rs,'width':width,'height':height,'split':split})
            for first in ws:
                m=re.fullmatch(r'(\d{1,2})[.,:]?',first['text'])
                if not m:continue
                number=int(m[1]);x=first['x']/width
                if not 1<=number<=60 or x>=.75:continue
                ri=next((i for i,r in enumerate(rs) if first in r['words']),None)
                if ri is None:continue
                r=rs[ri]
                # Scan speckles and handwritten annotations can precede the
                # printed number. Accept a narrow number-margin gap, but never
                # a number embedded in the running text.
                earlier=[w for w in r['words'] if w['x']<first['x'] and re.search(r'[A-Za-z0-9]',w['text'])]
                if earlier and any(w['x']+w['width']>first['x']-width*.035 for w in earlier):continue
                # Bare table values and dates cannot create question numbers.
                # An OCR-dropped full stop is accepted only at a printed
                # question-number margin established elsewhere in this column.
                if not re.search('[.,:]$',first['text']):
                    if not any(re.fullmatch(r'\d{1,2}[.,:]',w['text']) and abs(w['x']-first['x'])<width*.012 for w in ws):continue
                candidates.append({'n':number,'stream':idx,'ri':ri,'page':pn,'x':x,'y':r['y'],'text':r['text'],'word':first,'punct':bool(re.search('[.,:]$',first['text']))})
            candidates.sort(key=lambda c:(c['stream'],c['y']))
    for i,c in enumerate(candidates):
        own=2.2+(1 if c['punct'] else 0);column_x=c['x']-(streams[c['stream']]['split'] if streams[c['stream']]['col']==1 else 0);own-=column_x*5
        c['score']=own;c['prev']=None
        for j,p in enumerate(candidates[:i]):
            gap=c['n']-p['n']
            if 1<=gap<=14:
                score=p['score']+own-(gap-1)*.85
                if score>c['score']:c['score']=score;c['prev']=j
    if not candidates:return {**record,'questions':[]}
    end=max(range(len(candidates)),key=lambda i:candidates[i]['score']);picked=[]
    while end is not None:picked.append(candidates[end]);end=candidates[end]['prev']
    picked.reverse();qs=[]
    for k,c in enumerate(picked):
        end=picked[k+1] if k+1<len(picked) else None
        laststream=c['stream'] if end is None or end['n']>c['n']+1 else end['stream'];rs=[]
        for si in range(c['stream'],laststream+1):
            rows0=streams[si]['rows'];start=c['ri'] if si==c['stream'] else 0
            stop=end['ri'] if end and si==end['stream'] else len(rows0)
            for r in rows0[start:stop]:rs.append({**r,'page':streams[si]['page'],'col':streams[si]['col'],'width':streams[si]['width']})
        if not rs:continue
        for ri,r in enumerate(rs[:4]):
            if c['word'] in r['words']:
                rs[ri]={**r,'words':[w for w in r['words'] if w!=c['word']]};rs[ri]['text']=' '.join(w['text'] for w in rs[ri]['words'])
        rs=[r for r in rs if not FOOTER.search(r['text']) and not re.fullmatch(r'[-â€“â€”]?\s*\d{1,3}\s*[-â€“â€”]?',r['text'])]
        text='\n'.join(r['text'] for r in rs if r['text']);labels=[]
        for ri,r in enumerate(rs):
            m=re.match(r'^\(?([ABCDabcd])\)\s*',r['text'])
            if m:labels.append((ri,m[1].upper(),m.end()))
        printed_labels=[x[1] for x in labels]
        # A damaged B is commonly recognized as D. Four separately printed
        # choice markers still establish four source choices in reading order.
        if len(labels)==4:
            label_x=[rs[ri]['x'] for ri,_,_ in labels]
            if max(label_x)-min(label_x)<width*.035:
                labels=[(ri,letter,length) for (ri,_,length),letter in zip(labels,'ABCD')]
        if labels:
            contentxs=[]
            for ri,_,_ in labels:
                if len(rs[ri]['words'])>1:contentxs.append(rs[ri]['words'][1]['x'])
            if contentxs:
                contentx=statistics.median(contentxs)
                existing={ri for ri,_,_ in labels}
                inferred=[(ri,'?',0) for ri,r in enumerate(rs) if ri not in existing and abs(r['x']-contentx)<r['width']*.009 and r['cy']>=rs[labels[0][0]]['cy']-r['width']*.055]
                combined=sorted(labels+inferred)
                if len(combined)==4:
                    labels=[(ri,letter,length) for (ri,_,length),letter in zip(combined,'ABCD')]
        # Context for the next question is often printed after option D.
        # Keep it out of the current choice, including when its number was
        # missed. Wrapped option lines have normal line spacing.
        option_end=len(rs)
        if labels:
            last=labels[-1][0]
            for ri in range(last+1,len(rs)):
                previous,current=rs[ri-1],rs[ri]
                gap=current['y']-(previous['y']+max(w['height'] for w in previous['words']))
                if current['page']!=previous['page'] or current['col']!=previous['col'] or re.match(r'^Items?\s+\d',current['text'],re.I) or gap>max(10,max(w['height'] for w in previous['words'])*.8):
                    option_end=ri;break
        groups=[]
        for li,(ri,letter,length) in enumerate(labels):
            stop=labels[li+1][0] if li+1<len(labels) else option_end
            value=' '.join([rs[ri]['text'][length:]]+[r['text'] for r in rs[ri+1:stop]]).strip();groups.append((letter,value))
        if any(re.search(r'\bItems?\s+\d+(?:\s+and\s+\d+)?\s+refer',value,re.I) or FOOTER.search(value) for _,value in groups):groups=[]
        complete=[x[0] for x in groups]==list('ABCD') and all(v for _,v in groups)
        stem=' '.join(r['text'] for r in rs[:labels[0][0]]).strip() if labels else text
        if len(stem)<12:complete=False
        q={'id':f"{record['id']}-q{c['n']:02}",'number':c['n'],'stem':stem,'question':stem,'options':[v for _,v in groups] if complete else [],'answerIndex':None,'correctIndex':None,'explanation':'The supplied examination does not include a verified answer key for this item. Compare your answer with the original source page; this item is excluded from scored marks.','objectiveCode':None,'sourcePage':c['page'],'sourceColumn':2 if c['x']>.49 else 1,'sourcePages':sorted(set(r['page'] for r in rs)),'sourceText':text,'transcriptionMethod':'source-column-recovery-ocr' if recovery else 'source-word-geometry','transcriptionVerified':False,'requiresSourcePage':not complete,'keyStatus':'unverified','scoringReady':False,'marks':1,'answerProvenance':'No verified answer key supplied. No inferred official answer.'}
        dependency=bool(re.search(r'(?:\b(?:diagram|table|figure|illustration|chart|graph|stock card|invoice|statement)\b.*\b(?:below|above|following|shown)|\brefers?\s+to\b|\brefer\s+to\b|\bItems?\s+\d{1,2}\b|\bbased on\b.*\b(?:table|diagram))',text,re.I))
        boundary_gap=bool(end and end['n']>c['n']+1)
        issues=['OCR transcription has not been manually checked against the scan.']
        if not complete:issues.append('Four complete choices could not be extracted reliably.')
        if printed_labels!=list('ABCD'):issues.append('One or more printed option labels were not recovered by OCR.')
        if dependency:issues.append('The question may use source-page context, a table or a diagram.')
        if boundary_gap:issues.append('The following question boundary was not recovered; compare the source page.')
        if not stem or len(stem)<12:issues.append('The question stem could not be extracted reliably.')
        source_required=not complete or dependency or boundary_gap or len(stem)<12
        # Source context requirements do not erase recovered source choices.
        q.update({'requiresSourcePage':source_required,'transcriptionIssues':issues,'optionLabelsRecovered':printed_labels,'sourcePageVerified':False,'sourcePageAsset':record['sourceAsset'],'sourceQuestionNumberDetected':True,'sourceColumn':streams[c['stream']]['col']+1,'provenance':{'sourceId':record['id'],'filename':record['filename'],'sha256':record['sha256'],'method':'OCR word geometry; no generated wording or answer key','page':c['page']}})
        q['transcriptionStatus']='source-required' if source_required else 'ocr-review-required';qs.append(q)
    return finalize(record,pages,qs,picked)

def finalize(record,pages,qs,picked):
    detected={q['number']:q for q in qs}
    # Missing OCR boundaries are source-review slots, never invented questions.
    # Their approximate page range is derived only from recovered neighbours.
    for n in range(1,61):
        if n in detected:continue
        before=next((detected[k] for k in range(n-1,0,-1) if k in detected and detected[k].get('sourceQuestionNumberDetected')),None)
        after=next((detected[k] for k in range(n+1,61) if k in detected and detected[k].get('sourceQuestionNumberDetected')),None)
        start=before['sourcePage'] if before else (after['sourcePage'] if after else 1)
        stop=after['sourcePage'] if after else start
        page_range=list(range(start,stop+1))
        source_text='\n\n'.join(f"[Source PDF page {pn}]\n"+'\n'.join(l.get('text',' '.join(w['text'] for w in l['words'])) for l in d['lines']) for pn,d in pages if pn in page_range)
        detected[n]={'id':f"{record['id']}-q{n:02}",'number':n,'stem':'','question':'','options':[],'answerIndex':None,'correctIndex':None,'marks':1,'objectiveCode':None,'explanation':'Read this item on the supplied source page. OCR did not recover its numbered boundary reliably, and no verified answer key was supplied.','sourcePage':start,'sourcePages':page_range,'sourcePageAsset':record['sourceAsset'],'sourcePageVerified':False,'sourcePageLocationStatus':'approximate-between-neighbour-items','sourceText':source_text,'sourceTextScope':'full-source-pages','sourceQuestionNumberDetected':False,'transcriptionMethod':'source-page-review-slot','transcriptionVerified':False,'transcriptionStatus':'source-required','requiresSourcePage':True,'transcriptionIssues':['The numbered question boundary was not recovered by OCR. The linked page range is approximate; use the printed question number.'],'answerProvenance':'No verified answer key supplied. No inferred official answer.','keyStatus':'unverified','scoringReady':False,'provenance':{'sourceId':record['id'],'filename':record['filename'],'sha256':record['sha256'],'method':'Approximate source-page range between recovered neighbouring items','candidatePages':page_range}}
    reviewed=next((review for review in REVIEWED_SETS if any(item['paperId']==record['id'] for item in review['items'])),{'items':[]})
    for item in reviewed['items']:
        if item['paperId']!=record['id']:continue
        q=detected[item['number']]
        q.update({k:v for k,v in item.items() if k!='paperId'})
        q.update({'question':q['stem'],'explanation':'Review your choices alongside the printed paper. No verified answer key was supplied.','sourceTextScope':'reviewed-question-with-context','sourcePages':[q['sourcePage']],'sourceText':'\n'.join([q.get('contextText',''),q['stem']]+[f"({letter}) {value}" for letter,value in zip('ABCD',q['options'])]),'transcriptionMethod':'visual-source-review','transcriptionVerified':True,'sourcePageVerified':True,'transcriptionStatus':'source-reviewed','requiresSourcePage':False,'sourceQuestionNumberDetected':True,'sourcePageLocationStatus':'verified-on-source-image','transcriptionIssues':[],'optionLabelsRecovered':list('ABCD'),'reviewDate':reviewed['reviewDate'],'provenance':{'sourceId':record['id'],'filename':record['filename'],'sha256':record['sha256'],'page':q['sourcePage'],'method':reviewed['reviewMethod']}})
        if q.get('table'):q['sourceText']+='\n'+json.dumps(q['table'],ensure_ascii=False)
    recovered=sum(q['sourceQuestionNumberDetected'] for q in detected.values())
    verified_paper=all(q['transcriptionVerified'] for q in detected.values())
    title=f"{record['year']} {'May–June' if record['sitting']=='MJ' else 'January'} · Paper 1"
    return {**record,'title':title,'pages':len(pages),'questions':[detected[n] for n in range(1,61)],'durationMinutes':reviewed.get('durationMinutes',75 if record['year']==2025 else None),'durationVerified':reviewed.get('durationVerified',record['year']==2025),'questionCount':60,'totalMarks':60,'maxMarks':60,'scoredMaxMarks':0,'instructions':['Answer all 60 questions.','Choose one answer for each question.','You may return to an earlier question before submitting.'],'transcriptionVerified':verified_paper,'answerKeyVerified':False,'transcriptionStatus':'source-reviewed' if verified_paper else 'ocr-review-required','sourceQuestionNumbers':sorted(n for n,q in detected.items() if q['sourceQuestionNumberDetected']),'ocrQuestionNumbers':[c['n'] for c in picked],'sourceReviewRequiredCount':sum(q['requiresSourcePage'] for q in detected.values()),'extractedQuestionCount':recovered,'sourceReviewSlotCount':60-recovered,'reviewedQuestionCount':sum(q['transcriptionVerified'] for q in detected.values()),'extractedOptionSetCount':sum(len(q['options'])==4 for q in detected.values())}

if __name__=='__main__':
    output=[]
    for record in METADATA:
        baseline=extract(record)
        recovery=extract(record,recovery=True)
        def quality(q):
            if q.get('transcriptionVerified'):return (10,0)
            return (int(q['sourceQuestionNumberDetected'])*3+int(len(q['options'])==4)*2+int(q.get('optionLabelsRecovered')==list('ABCD')),len(q['stem']))
        selected=[max((old,new),key=quality) for old,new in zip(baseline['questions'],recovery['questions'])]
        baseline['questions']=selected
        baseline.update({'sourceQuestionNumbers':[q['number'] for q in selected if q['sourceQuestionNumberDetected']],'sourceReviewRequiredCount':sum(q['requiresSourcePage'] for q in selected),'extractedQuestionCount':sum(q['sourceQuestionNumberDetected'] for q in selected),'sourceReviewSlotCount':sum(not q['sourceQuestionNumberDetected'] for q in selected),'reviewedQuestionCount':sum(q['transcriptionVerified'] for q in selected),'extractedOptionSetCount':sum(len(q['options'])==4 for q in selected)})
        output.append(baseline)
    (ROOT/'src/officeAdministration/data/oaHistoricalPaper1Text.json').write_text(json.dumps(output,ensure_ascii=False,indent=2),encoding='utf8')
    for p in output:print(p['year'],'detected',p['extractedQuestionCount'],'options',p['extractedOptionSetCount'],'source review',p['sourceReviewRequiredCount'],'boundary slots',p['sourceReviewSlotCount'])
