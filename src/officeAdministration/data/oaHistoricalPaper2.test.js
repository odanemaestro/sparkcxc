import fs from 'fs';
import path from 'path';
import {OA_HISTORICAL_PAPER2S,OA_HISTORICAL_PAPER2_BANK_VERSION} from './oaHistoricalPaper2';

const inventory=[
 ['OA-P2-2005-MJ',8],['OA-P2-2006-MJ',8],['OA-P2-2007-MJ',8],['OA-P2-2008-MJ',8],
 ['OA-P2-2009-MJ',8],['OA-P2-2010-MJ',8],['OA-P2-2011-MJ',8],['OA-P2-2012-MJ',8],['OA-P2-2013-MJ',8],
 ['OA-P2-2014-MJ',7],['OA-P2-2015-MJ',7],['OA-P2-2016-JAN',7],['OA-P2-2016-MJ',7],
 ['OA-P2-2017-MJ',6],['OA-P2-2018-MJ',6],['OA-P2-2019-MJ',6],['OA-P2-2021-MJ',6],
 ['OA-P2-2022-MJ',6],['OA-P2-2024-JAN',6],['OA-P2-2024-MJ',6],['OA-P2-2025-MJ',6]
];
const sum=values=>values.reduce((total,value)=>total+value,0);
const byId=id=>OA_HISTORICAL_PAPER2S.find(paper=>paper.id===id);

it('contains every supplied historical P2 with its original question inventory',()=>{
 expect(OA_HISTORICAL_PAPER2S.map(p=>[p.id,p.questions.length])).toEqual(inventory);
 expect(sum(OA_HISTORICAL_PAPER2S.map(p=>p.questions.length))).toBe(148);
 expect(sum(OA_HISTORICAL_PAPER2S.flatMap(p=>p.questions.map(q=>q.parts.length)))).toBe(454);
 for(const paper of OA_HISTORICAL_PAPER2S){
  expect(paper).toMatchObject({paper:2,subjectId:'office-administration',source:'historical',sourceType:'historical',bankVersion:OA_HISTORICAL_PAPER2_BANK_VERSION,durationMinutes:120,timeLimitMinutes:120,requiredQuestionCount:6,totalMarks:90,marks:90,questionDataAvailable:true,partAllocationsVerified:true});
  expect(paper.questions.map(q=>q.number)).toEqual(Array.from({length:paper.questions.length},(_,i)=>i+1));
  expect(paper.availableQuestionMarks).toBe(sum(paper.questions.map(q=>q.marks)));
  for(const q of paper.questions){
   expect(q.marks).toBe(15);expect(q.partAllocationVerified).toBe(true);
   expect(sum(q.parts.map(part=>part.marks))).toBe(15);
   expect(q.parts.map(part=>part.label)).toEqual('abcdefgh'.slice(0,q.parts.length).split(''));
   for(const part of q.parts){
    expect(part.id).toBe(`q${q.number}-${part.label}`);
    expect(part.prompt.trim().length).toBeGreaterThan(15);
    expect(Number.isInteger(part.marks)&&part.marks>0).toBe(true);
   }
  }
 }
});

it('preserves each historical selection format and makes every allowed attempt 90 marks',()=>{
 for(const paper of OA_HISTORICAL_PAPER2S){
  const rules=paper.selectionRules;
  const expected=paper.year<=2013?{compulsory:[1,2,3,4],optional:[5,6,7,8],choose:2}:paper.year<=2016?{compulsory:[1,2,3],optional:[4,5,6,7],choose:3}:{compulsory:[1,2,3,4,5,6],optional:[],choose:0};
  expect(rules).toEqual(expected);
  expect(new Set([...rules.compulsory,...rules.optional]).size).toBe(paper.questions.length);
  expect(rules.compulsory.length+rules.choose).toBe(paper.requiredQuestionCount);
  const choices=(items,n)=>n===0?[[]]:items.flatMap((item,i)=>choices(items.slice(i+1),n-1).map(rest=>[item,...rest]));
  for(const optional of choices(rules.optional,rules.choose)){
   const numbers=[...rules.compulsory,...optional];
   expect(sum(paper.questions.filter(q=>numbers.includes(q.number)).map(q=>q.marks))).toBe(90);
  }
 }
});

it('links every historical question, response part and guidance item to the supplied source',()=>{
 for(const paper of OA_HISTORICAL_PAPER2S){
  const sourceFile=path.join(process.cwd(),'public',paper.sourceAsset);
  expect(fs.existsSync(sourceFile)).toBe(true);
  const source=JSON.parse(fs.readFileSync(sourceFile,'utf8'));
  expect(source.source).toMatchObject({id:paper.id,filename:paper.filename,sha256:paper.sha256,pages:paper.pages});
  for(const q of paper.questions){
   expect(q.sourcePages.length).toBeGreaterThan(0);
   expect(q.sourcePages.every(page=>Number.isInteger(page)&&page>0&&page<=paper.pages)).toBe(true);
   expect(q.provenance).toMatchObject({sourceId:paper.id,filename:paper.filename,sha256:paper.sha256,pdfPages:q.sourcePages,originalQuestionNumber:q.number});
   for(const part of q.parts){
    expect(part.sourceAsset).toBe(paper.sourceAsset);
    expect(part.sourcePages.every(page=>q.sourcePages.includes(page))).toBe(true);
    expect(part.provenance).toMatchObject({sourceId:paper.id,filename:paper.filename,sha256:paper.sha256,pdfPages:part.sourcePages,originalQuestionNumber:q.number,originalPartLabel:part.label,attributionScope:'question-pages',kind:'supplied-examination-question'});
    expect(part.markingGuidance.provenance).toMatchObject({sourceId:paper.id,filename:paper.filename,sha256:paper.sha256,sourceAsset:paper.sourceAsset,pdfPages:part.sourcePages,originalQuestionNumber:q.number,originalPartLabel:part.label,kind:'spark-authored-source-based-guidance'});
    if(part.sourceVisual){
     expect(part.sourcePages).toContain(part.sourceVisual.page);
     const page=source.pages.find(page=>page.number===part.sourceVisual.page);
     const [x,y,w,h]=part.sourceVisual.region;
     expect(x>=0&&y>=0&&w>0&&h>0&&x+w<=page.width&&y+h<=page.height).toBe(true);
    }
   }
  }
 }
});

it('distinguishes SPARK guidance from an unavailable official historical scheme',()=>{
 let worked=0,approaches=0;
 for(const paper of OA_HISTORICAL_PAPER2S){
  expect(paper).toMatchObject({officialKeyAvailable:false,answerKeyVerified:false,officialMarkSchemeAvailable:false,markingStatus:'spark-guidance',transcriptionVerified:['OA-P2-2016-MJ','OA-P2-2017-MJ','OA-P2-2018-MJ','OA-P2-2019-MJ','OA-P2-2024-JAN','OA-P2-2021-MJ','OA-P2-2022-MJ','OA-P2-2024-MJ','OA-P2-2025-MJ'].includes(paper.id)});
  for(const part of paper.questions.flatMap(q=>q.parts)){
   expect(part.guidance.length).toBeGreaterThan(30);
   expect(part.markingGuidance).toMatchObject({author:'SPARK',official:false,sourceId:paper.id,maxMarks:part.marks});
   expect(part.modelAnswerSource).toMatch(/SPARK/);
   expect(part.modelAnswerSource).toMatch(/no official historical marking scheme supplied/);
   expect(part.rubric).toBeUndefined();expect(part.criteria).toBeUndefined();
   if(part.modelAnswer){worked++;expect(part.markingGuidance.kind).toBe('spark-worked-example');}
   else {approaches++;expect(part.markingGuidance.kind).toBe('source-task-guidance');}
  }
 }
 expect(worked).toBe(54);expect(approaches).toBe(400);
});

it('keeps the repaired source boundaries, duplicated scan and image-only final task',()=>{
 const paper=byId('OA-P2-2006-MJ');
 expect(paper.questions[2].parts.map(p=>p.label)).toEqual(['a','b']);
 expect(paper.questions[3].parts.map(p=>[p.label,p.marks])).toEqual([['a',3],['b',4],['c',8]]);
 expect(paper.questions[6].parts.map(p=>p.label)).toEqual(['a','b']);
 expect(byId('OA-P2-2016-JAN').questions[1].sourcePages).toEqual([4,6,7]);
 const finalPart=byId('OA-P2-2018-MJ').questions[5].parts[2];
 expect(finalPart).toMatchObject({id:'q6-c',marks:3});
 expect(finalPart.sourcePages).toContain(18);expect(finalPart.prompt).toContain('destination sheet');
 expect(byId('OA-P2-2024-MJ').questions[5].parts[1].sourceVisual.page).toBe(15);
 expect(byId('OA-P2-2025-MJ').questions[3].parts[2].sourceVisual.page).toBe(14);
});

it('attributes detached answer sheets to their questions rather than appending them to question 8',()=>{
 const expected=[['OA-P2-2005-MJ',5,9],['OA-P2-2006-MJ',2,8],['OA-P2-2006-MJ',5,9],['OA-P2-2007-MJ',6,9],['OA-P2-2007-MJ',7,10],['OA-P2-2008-MJ',5,9],['OA-P2-2009-MJ',7,9],['OA-P2-2009-MJ',6,10],['OA-P2-2010-MJ',5,9],['OA-P2-2010-MJ',6,10],['OA-P2-2010-MJ',7,11]];
 for(const [id,number,page] of expected){
  const q=byId(id).questions[number-1];
  expect(q.sourcePages).toContain(page);expect(q.sourceForms.some(form=>form.pdfPage===page)).toBe(true);
  expect(q.parts.some(part=>part.prompt.includes(`PDF page ${page}`))).toBe(true);
 }
 for(const paper of OA_HISTORICAL_PAPER2S.filter(p=>p.year<=2010)){
  expect(paper.questions[7].fullText).not.toMatch(/END\s*OF\s*TEST/i);
  expect(paper.questions[7].fullText).not.toMatch(/Candidate No/);
 }
 expect(byId('OA-P2-2010-MJ').questions[7].sourcePages).toEqual([8]);
});

it('preserves the printed address on the 2007 accident-report form',()=>{
 const report=byId('OA-P2-2007-MJ').questions[6].sourceForms.find(form=>form.pdfPage===10);
 expect(JSON.stringify(report)).toContain('62 Harper Valley');
 expect(JSON.stringify(report)).not.toMatch(/(?:52|82) Harper Valley/);
});

it('preserves the reviewed 2024 source figures and editable documents',()=>{
 const p=byId('OA-P2-2024-MJ');expect(p.transcriptionVerified).toBe(true);
 expect(p.questions.flatMap(q=>q.parts)).toHaveLength(17);
 expect(p.questions.every(q=>q.parts.every(part=>part.promptVerified&&part.layoutVerified))).toBe(true);
 expect(p.questions[0].parts[1].responseTables[0].rows[0]).toEqual(['5','Manuscripts','0.25','1.25']);
 expect(p.questions[1].parts[2].prompt).toContain('juniorclerk1@cpkinternational.net');
 expect(p.questions[3].parts[2].responseTables[0].rows[0]).toEqual(['600101','600101','D. Granston; J. Dillon']);
 expect(p.questions[4].parts[1].table.details).toContain('Trade Discount 10%');
 expect(p.questions[4].parts[1].table.details).toContain('Quantity Discount 5%');
 expect(p.questions[5].parts[2].fields.map(f=>f.label)).toEqual(['TO','FROM','CC','DATE','SUBJECT','Message']);
});

it('retains the 2022 source notes, itineraries, printed dates and blank calculations',()=>{
 const p=byId('OA-P2-2022-MJ');expect(p.transcriptionVerified).toBe(true);expect(p.questions.flatMap(q=>q.parts)).toHaveLength(19);
 expect(p.questions.every(q=>q.parts.every(part=>part.promptVerified&&part.layoutVerified))).toBe(true);
 const indexing=p.questions[0].parts[2].responseTables[0];expect(indexing.rows[0]).toEqual(['Allay','Marie','Rose']);expect(indexing.editable.every(([r])=>r>0)).toBe(true);
 const notes=p.questions[1].parts[3].table;expect(notes.rows).toContainEqual(['Tomas Browne','Mable Gray - called to say she could not attend']);expect(JSON.stringify(notes)).toContain('Winston Lowe offered to print the tickets');
 const travel=p.questions[2].parts[2];expect(travel.tables[0].rows[0]).toEqual(['JV235\nDepart','Barbados\nat 5:11 p.m.','','Dinner\nincluded','US$860']);expect(travel.tables[1].rows[2]).toEqual(['VJ198\nDepart','','Miami\nat 6:18 a.m.','Breakfast\nincluded','US$480']);
 const statement=p.questions[3].parts[2];expect(statement.table.details).toContain('Terms: 10% within 30 days');expect(statement.prompt).toContain('before 30 June 2022');expect(statement.responseTables[0].rows.flat().every(v=>v==='')).toBe(true);
 const invoice=p.questions[4].parts[2].responseTables[0];expect(invoice.rows[0]).toEqual(['5','Ergonomic\noffice chair','EC1','$670','']);expect(invoice.editable).toEqual([[0,4],[1,4],[2,4]]);
 const delivery=p.questions[5].parts[2];expect(delivery.sourcePages).toEqual([20,21,22]);expect(p.questions[5].provenance.pdfPages).toEqual([19,20,21,22]);
 const header=delivery.responseTables[0];expect(header.rows[1]).toEqual(['Date','5 May 2022']);expect(header.rows[3]).toEqual(['Delivery date','6 May 2022']);expect(header.editable.every(([r])=>r!==1&&r!==3)).toBe(true);
 expect(delivery.responseTables[1].rows).toHaveLength(3);expect(delivery.responseTables[1].rows.flat().every(v=>v==='')).toBe(true);
 expect(JSON.stringify(p.questions.flatMap(q=>q.parts))).not.toMatch(/TNUOCCA|NOTHING HAS BEEN OMITTED/);
});

it('preserves the 2021 printed interview selections, cheque discrepancies and delivery blanks',()=>{
 const p=byId('OA-P2-2021-MJ');expect(p.transcriptionVerified).toBe(true);expect(p.questions.flatMap(q=>q.parts)).toHaveLength(17);
 expect(p.questions.every(q=>q.parts.every(part=>part.promptVerified&&part.layoutVerified))).toBe(true);
 const mail=p.questions[0].parts[1].responseTables[0];expect(mail.rows.map(r=>r[0])).toEqual(['Franking machine','Parcel scale','Collating machine','Sealing machine']);expect(mail.editable).toEqual([[0,1],[1,1],[2,1],[3,1]]);
 const message=p.questions[0].parts[2];expect(message.tables[2].rows).toEqual([['Mr Mark James','X','Ms Michelle Isidore','X'],['Miss Elisa Williams','X','Miss Diandra Brown',''],['Mrs Chandra Paul','','Mr Chad Henry','X']]);expect(JSON.stringify(message.tables)).toContain('PB@Accounts.com');expect(message.fields.map(f=>f.label)).toEqual(['FROM','DATE','TO','SUBJECT','Message']);
 const cheque=p.questions[3].parts[0];expect(cheque.prompt).toContain('Susanne Tomlinson');expect(cheque.table.rows).toContainEqual(['Pay to the order of','Susanna Tomlinson']);expect(cheque.table.rows).toContainEqual(['Date','28 December 2000']);expect(cheque.table.rows).toContainEqual(['Amount in figures','$500.00']);expect(cheque.table.rows).toContainEqual(['the sum of','five thousand and fifty Dollars']);expect(cheque.table.rows).toContainEqual(['Signature','']);
 const skills=p.questions[4].parts[2].responseTables[0];expect(skills.rows[3]).toEqual(['Literacy','']);
 const delivery=p.questions[5].parts[2];expect(delivery.sourcePages).toEqual([18,19]);expect(delivery.table.rows).toContainEqual(['Order No','R 1256.']);expect(delivery.table.rows).toContainEqual(['Terms','5% trade discount\n10% VAT']);expect(delivery.responseTables[0].rows).toEqual([['','Bag of balloons','B12','150.00',''],['','Box of party hats','H24','392.00',''],['','Whistle','W32','1.10','']]);
 expect(delivery.responseTables[0].editable).toEqual([[0,0],[0,4],[1,0],[1,4],[2,0],[2,4]]);
});

it('keeps the January 2024 source chart, given example and reconciliation balances',()=>{
 const p=byId('OA-P2-2024-JAN');expect(p.transcriptionVerified).toBe(true);expect(p.questions.flatMap(q=>q.parts)).toHaveLength(18);
 const jobs=p.questions[0].parts[2];expect(jobs.responseTables[0].rows[0]).toEqual(['Liaises between the customers and the company','Customer service clerk']);expect(jobs.responseTables[0].editable.every(([r])=>r>0)).toBe(true);
 expect(jobs.responseDiagram.nodes).toHaveLength(9);expect(jobs.responseDiagram.nodes.filter(n=>n.fixed===undefined)).toHaveLength(8);expect(jobs.responseDiagram.lines).toHaveLength(6);expect(jobs.responseDiagram.sourceGeometry.page).toBe(7);
 const message=p.questions[1].parts[2];expect(message.fields.filter(f=>f.kind==='checkbox').map(f=>f.label)).toEqual(['Called','Please Call','Will Call Back','Urgent']);
 const travel=p.questions[2].parts[2];expect(travel.table.rows).toContainEqual(['Accommodation Package for FOUR Nights','Ocean view','$900','in total']);expect(travel.responseTables[0].rows.every(r=>r[1]===''&&r[2]==='')).toBe(true);
 const bank=p.questions[4].parts[2].responseTables[0];expect(bank.rows[0]).toEqual(['Balance as per Cash Book','','300.00']);expect(bank.rows).toContainEqual(['Balance as per Bank Statement','','330.00']);expect(bank.editable.every(([r])=>bank.rows[r][0]==='')).toBe(true);expect(new Set(bank.columnLabels).size).toBe(3);
 const advice=p.questions[5].parts[2];expect(advice.responseTables[0].rows).toHaveLength(4);expect(advice.responseTables[0].rows.flat().every(v=>v==='')).toBe(true);expect(advice.table.rows).toContainEqual(['Telephone','(246) 271-4100']);expect(advice.sourcePages).toEqual([22,23]);
});
it('retains the checked 2018 and 2019 forms without filling source blanks or resolving printed discrepancies',()=>{
 const old=byId('OA-P2-2018-MJ'),later=byId('OA-P2-2019-MJ');
 for(const p of [old,later]){expect(p.transcriptionVerified).toBe(true);expect(p.questions.every(q=>q.parts.every(p=>p.promptVerified&&p.layoutVerified))).toBe(true);}
 const register=old.questions[2].parts[2];expect(register.responseTables[0].rows).toEqual([['','','','','']]);expect(register.fields[0].position).toBe('after');
 const reconciliation=old.questions[4].parts[2];expect(reconciliation.tables[0].rows[4]).toContain('April 31');expect(reconciliation.tables[1].rows.every(row=>row[4]==='')).toBe(true);
 expect(reconciliation.responseTables[0].columnLabels).toHaveLength(6);expect(new Set(reconciliation.responseTables[0].columnLabels).size).toBe(6);
 expect(reconciliation.responseTables[0].rows[0][1]).toBe('Balance b/d');expect(reconciliation.responseTables[0].editable).not.toContainEqual([0,1]);
 const memo=later.questions[0].parts[2];expect(memo.table.rows[0]).toEqual(['All Clerical Staff','Mr Roger Byles, Director of Administration']);
 const job=later.questions[3].parts[1];expect(job.table.rows[0]).toEqual(['Human Resource Clerk','Human Resource']);expect(job.fields.map(f=>f.label)).toContain('Vacation Leave');
 const cash=later.questions[4].parts[2];expect(cash.prompt).toContain('$120.00');expect(cash.responseTables[0].rows[0][0]).toBe('150 00');expect(cash.responseTables[0].rows).toHaveLength(16);expect(cash.responseTables[0].editable).not.toContainEqual([0,0]);expect(cash.table.rows[2].slice(1)).toEqual(['$35.00','$13.00','$12.25','$15.00']);
 expect(old.questions[3].parts.map(p=>p.marks)).toEqual([3,3,9]);
});
it('keeps the 2017 payroll, credit note, cheque and delivery sheet as unfilled source forms',()=>{
 const paper=byId('OA-P2-2017-MJ');expect(paper.transcriptionVerified).toBe(true);expect(paper.questions.flatMap(q=>q.parts)).toHaveLength(24);
 const d=paper.questions[3].parts[3];expect(d.responseTables[0].rows.slice(0,2).map(r=>r.slice(0,2))).toEqual([['Tom Brown','780'],['Joan Gray','900']]);expect(d.responseTables[0].editable).not.toContainEqual([0,1]);expect(d.responseTables[1].title).toContain('CN 05');expect(d.responseTables[2].rows).toHaveLength(4);
 const cash=paper.questions[4].parts[2].responseTables[0];expect(cash.rows[0][0]).toBe('500.00');expect(cash.rows[2][7]).toBe('130.00');expect(cash.merges).toEqual([{row:0,col:0,rowSpan:9}]);
 const cheque=paper.questions[4].parts[3];expect(cheque.table.rows[0]).toEqual(['Main Street\nKingstown','20 November 2016']);expect(cheque.fields.map(f=>f.label)).toContain('Signature');
 const delivery=paper.questions[5].parts[3];expect(delivery.fields.map(f=>f.label)).toContain('Distance from Twickenham Gardens to Kingston — miles plus return');expect(delivery.responseTables[0].rows).toEqual([['','','',''],['','','','']]);
 expect(paper.questions[2].parts[3].prompt).toContain('Sunday 10 July');
});
it('retains the 2016 cash/stock discrepancies and source cells while leaving computations to students',()=>{
 const paper=byId('OA-P2-2016-MJ');expect(paper.transcriptionVerified).toBe(true);expect(paper.questions.flatMap(q=>q.parts)).toHaveLength(27);
 const message=paper.questions[0].parts[3];expect(message.prompt).toContain('Mesha-Gay');expect(message.prompt).toContain('Mesha-Gray');expect(message.fields.map(f=>f.label)).toEqual(['TO','FROM','ORGANIZATION','ADDRESS','PHONE','EXT','MESSAGE','Message Taken By']);
 const records=paper.questions[4].parts[2].tables;expect(records[0].rows[0]).toEqual(['2015','','','','2016','','','']);expect(records[1].rows[3]).toEqual(['22 July','Cheque deposit','','$600','$800']);
 const cash=paper.questions[4].parts[3].responseTables[0];expect(cash.rows).toHaveLength(5);expect(new Set(cash.columnLabels).size).toBe(8);
 const stock=paper.questions[5].parts[2];expect(stock.tables[0].rows[2]).toEqual(['24','Notepads 8” × 4” (White)']);expect(stock.responseTables[0].rows[1].slice(6)).toEqual(['36','5 Apr.','','A663','13 Apr.']);expect(stock.responseTables[0].editable).not.toContainEqual([1,6]);expect(stock.fields[0].label).toBe('Unit');
 const fifo=paper.questions[6].parts[3].responseTables[0];expect(fifo.rows[5]).toEqual(['October','','15 @ $20 each','','']);expect(fifo.rows[7][4]).toBe('');
 const average=paper.questions[6].parts[4].responseTables[0];expect(average.rows[1][1]).toBe('20 @ $22.25 each');expect(average.rows[3].slice(3)).toEqual(['','','']);
});
