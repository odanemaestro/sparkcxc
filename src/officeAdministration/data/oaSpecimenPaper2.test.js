import fs from 'fs';
import path from 'path';
import paper from './oaSpecimenPaper2.json';
import scheme from './oaSpecimenPaper2Scheme.json';

const allParts=paper.questions.flatMap(q=>q.parts);
const sum=values=>values.reduce((total,value)=>total+value,0);
const part=id=>allParts.find(p=>p.id===id);
const official=id=>scheme.parts[id];

test('the official specimen has all six compulsory native questions and its printed 90-mark allocation',()=>{
 expect(paper).toMatchObject({
  id:'OA-P2-SPECIMEN-2024',paper:2,subjectId:'office-administration',
  sourceType:'official-specimen',durationMinutes:120,totalMarks:90,
  requiredQuestionCount:6,compulsory:true,transcriptionVerified:true,
  gradingMode:'official-guidance',serverMarking:false
 });
 expect(paper.questions.map(q=>q.number)).toEqual([1,2,3,4,5,6]);
 expect(paper.questions.map(q=>q.section)).toEqual(['I','I','I','II','II','II']);
 expect(paper.questions.map(q=>q.parts.map(p=>p.marks))).toEqual([
  [2,6,7],[3,4,8],[3,4,8],[2,4,9],[2,4,9],[3,3,3,6]
 ]);
 expect(sum(paper.questions.map(q=>q.marks))).toBe(90);
 expect(allParts).toHaveLength(19);
 for(const question of paper.questions){
  expect(sum(question.parts.map(p=>p.marks))).toBe(15);
  expect(question.partAllocationVerified).toBe(true);
  for(const p of question.parts){
   expect(p.prompt.length).toBeGreaterThan(20);
   expect(p.sourcePages.every(page=>question.sourcePages.includes(page))).toBe(true);
   expect(p.sourceVisual).toBeUndefined();
   expect(p.provenance).toMatchObject({
    sourceId:paper.id,originalQuestionNumber:question.number,originalPartLabel:p.label,
    kind:'official-specimen-question',attributionScope:'question-pages'
   });
  }
 }
});

test('question page bounds match the source and exclude the official answer scheme',()=>{
 expect(paper.questions.map(q=>q.sourcePages)).toEqual([
  [105,106,107],[108,109,110],[111,112,113],[114,115],[116,117],[118,119,120]
 ]);
 expect(paper.examSourcePages).toEqual(Array.from({length:24},(_,i)=>102+i));
 expect(paper.questionSourcePages).toEqual(Array.from({length:16},(_,i)=>105+i));
 const manifest=JSON.parse(fs.readFileSync(path.join(process.cwd(),'public',paper.sourceAsset),'utf8').replace(/^\uFEFF/,''));
 expect(manifest.source.id).toBe(paper.id);
 expect(manifest.source.sha256).toBe(paper.sha256);
 expect(manifest.pages.map(page=>page.number)).toEqual(paper.examSourcePages);
 expect(manifest.pages.every(page=>page.number<126)).toBe(true);
 for(const p of allParts){
  expect(p.sourcePages.every(page=>paper.questionSourcePages.includes(page))).toBe(true);
  expect(p.modelAnswer).toBeUndefined();
  expect(p.guidance).toBeUndefined();
  expect(p.allocation).toBeUndefined();
  for(const field of p.fields||[]){
   expect(field.label).toBeTruthy();
   expect(field.expected).toBeUndefined();
   expect(field.model).toBeUndefined();
  }
 }
});

test('native templates retain the supplied email, letterhead, job specification and task fields',()=>{
 expect(part('q1-c').prompt).toContain('Tomas Field');
 expect(part('q1-c').prompt).toContain('Mrs Adya Brown');
 expect(part('q1-c').table.rows).toEqual([
  ['TO','principal@browns.edu'],['SUBJECT','Purchase of additional devices']
 ]);
 expect(part('q2-c').prompt).toContain('19 Palmer’s Crescent');
 expect(part('q2-c').prompt).toContain('10 Highway Drive');
 expect(part('q2-c').prompt).toContain('Miss Amber Black');
 expect(part('q3-c').prompt).toContain('15 November 2024');
 expect(part('q3-c').prompt).toContain('Telephone: 1(758) 400-0390/91');
 expect(part('q3-c').prompt).toContain('xyzcu758@gmail.com');
 expect(part('q4-c').table.rows).toEqual([
  ['POSITION','Human Resource Clerk'],['DEPARTMENT','Human Resource'],['REPORTING TO','Human Resource Manager']
 ]);
 expect(part('q4-c').fields.map(f=>f.label)).toEqual([
  'Job Summary','Duties and Responsibilities 1','Duties and Responsibilities 2',
  'Skills 1','Skills 2','Qualifications','Attributes 1','Attributes 2'
 ]);
 expect(part('q6-d').fields.map(f=>f.label)).toEqual([
  'Task 1','Justification 1','Task 2','Justification 2','Task 3','Justification 3'
 ]);
 expect(part('q6-d').subparts).toEqual([{label:'i',marks:3},{label:'ii',marks:3}]);
});

test('the AVCO table preserves the original column order and its printed inconsistent June rate',()=>{
 const table=part('q5-c').table;
 expect(table.columns).toEqual([
  'Received','Issued','Average Cost Per Unit of Stock ($)',
  'Total Number of Units in Stock ($)','Total Value of Stock ($)'
 ]);
 expect(table.rows).toEqual([
  ['January: … @ $35','','35.00','(i) __________','875.00'],
  ['March: … @ $36','','(iii) __________','35','(ii) __________'],
  ['','June: 8 @ $35.40','35.40','(iv) __________','(v) __________']
 ]);
 expect(official('q5-c').expectedEntries).toEqual({i:25,ii:1235,iii:35.29,iv:27,v:955.8});
 // Independently verify the calculations printed by the official scheme.
 expect(875/35).toBe(25);
 expect(35-25).toBe(10);
 expect(875+(35-25)*36).toBe(1235);
 expect(Number((1235/35).toFixed(2))).toBe(35.29);
 expect(35-8).toBe(27);
 expect(Number(((35-8)*35.40).toFixed(2))).toBe(955.8);
 expect(official('q5-c').sourceErrata).toEqual([
  expect.objectContaining({kind:'inconsistent-source-values',questionPdfPage:117,schemePdfPage:139})
 ]);
});

test('the separate review scheme supplies every official answer bank and its original allocation',()=>{
 expect(scheme).toMatchObject({paperId:paper.id,sourceType:'official-mark-scheme',reviewOnly:true,officialMarkSchemeVerified:true});
 expect(Object.keys(scheme.parts)).toEqual(allParts.map(p=>p.id));
 expect(scheme.sourcePages).toEqual(Array.from({length:17},(_,i)=>126+i));
 expect(scheme.questionPages).toEqual(paper.questionSourcePages);
 for(const p of allParts){
  const guidance=official(p.id);
  expect(guidance.marks).toBe(p.marks);
  expect(sum(guidance.allocation.map(a=>a.marks))).toBe(p.marks);
  expect(guidance.modelAnswerSource).toBe('official');
  expect(guidance.modelAnswer.length).toBeGreaterThan(30);
  expect(guidance.guidance.length).toBeGreaterThan(20);
  expect(guidance.sourcePages.every(page=>page>=127&&page<=142)).toBe(true);
  expect(guidance.provenance).toMatchObject({
   sourceId:paper.id,kind:'official-specimen-mark-scheme',attributionScope:'mark-scheme-pages',reviewOnly:true
  });
  expect(guidance.provenance.pdfPages).toEqual(guidance.sourcePages);
 }
 expect(official('q1-c').allocation.map(a=>a.marks)).toEqual([1,2,2,2]);
 expect(official('q2-c').allocation.map(a=>a.marks)).toEqual([1,1,1,1,1,1,1,1]);
 expect(official('q3-c').allocation.map(a=>a.marks)).toEqual([1,1,1,1,1,2,1]);
 expect(official('q4-c').allocation.map(a=>a.marks)).toEqual([1,2,2,2,2]);
 expect(official('q6-d').allocation.map(a=>a.marks)).toEqual([3,3]);
 expect(official('q1-a').modelAnswer).toContain('Confidentiality');
 expect(official('q2-b').modelAnswer).toContain('booking of appointments online');
 expect(official('q4-c').modelAnswer).toContain('English A, EDPM, Office Administration');
 expect(official('q4-c').guidance).toContain('business cognate');
 expect(official('q6-c').modelAnswer).toContain('signed note');
});
