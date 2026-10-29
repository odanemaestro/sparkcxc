import {OA_PAPER2S,oaPaper2Criteria,getOaPaper2} from './data/oaPaper2';
import {gradeOaPaper2Part,evaluateOaSourceV2,oaSourceFixtures} from './oaMarkingV2';
import {evaluateExistingSubjectPaper2V2} from '../grading/serverPaper2V2SubjectEngine';
import {verifyCriterion} from '../grading/v2CriterionVerifier';
const numericPart=(paper,number)=>getOaPaper2(paper).questions.find(q=>q.number===number).parts.find(p=>p.criteria.some(c=>c.kind==='numeric'));
const sourceAnswer=fields=>Object.entries(fields).map(([label,value])=>label+': '+value).join('\n');

test.each(OA_PAPER2S.map(p=>[p.id]))('%s reconciles a whole completed paper and a blank script',id=>{
 const paper=getOaPaper2(id),criteria=oaPaper2Criteria(id),responses=Object.fromEntries(paper.questions.flatMap(q=>q.parts.map(p=>[p.id,{answer:p.modelAnswer}])));
 const full=evaluateExistingSubjectPaper2V2({subjectId:'office-administration',paperId:id,criteria,responses});expect(full.maxMarks).toBe(90);expect(full.suggestedMarks).toBe(90);expect(full.rows.every(r=>r.resolved)).toBe(true);
 const blank=evaluateExistingSubjectPaper2V2({subjectId:'office-administration',paperId:id,criteria,responses:{}});expect(blank.suggestedMarks).toBe(0);expect(blank.rows.every(r=>r.resolved)).toBe(true);
 for(const c of criteria){const source=oaSourceFixtures({paperId:id,criterion:c});const verified=verifyCriterion({subjectId:'office-administration',paperId:id,criteria,criterionId:c.id,kind:source.kind,fixtures:source.fixtures});expect({id:c.id,failures:verified.failures,missing:verified.missingClasses,verified:verified.verified}).toEqual({id:c.id,failures:[],missing:[],verified:true});}
});
test('independent payroll arithmetic agrees with the source fields, including working',()=>{
 const ordinary=40*120,overtimeRate=120*1.5,overtime=5*overtimeRate,gross=ordinary+overtime,deductions=420+250+230;
 const fields={'Ordinary pay':`40 × 120 = ${ordinary}`,'Overtime hourly rate':overtimeRate,'Overtime pay':overtime,'Gross pay':gross,'Income tax':420,'Pension':250,'Other deductions':230,'Total deductions':deductions,'Net pay':gross-deductions};
 expect(gradeOaPaper2Part(numericPart('OA-ORIGINAL-02-01',5),sourceAnswer(fields))).toMatchObject({marks:9,resolved:true});
 expect(gradeOaPaper2Part(numericPart('OA-ORIGINAL-02-01',5),sourceAnswer({...fields,'Net pay':gross}))).toMatchObject({marks:8,resolved:true});
});
test('independent quotation and budget calculations reconcile every amount',()=>{
 const goods=150*180,discount=goods*.10,invoice=goods-discount+1800;
 expect(gradeOaPaper2Part(numericPart('OA-ORIGINAL-02-02',5),sourceAnswer({'Quantity':150,'Unit price':180,'Goods value':goods,'Trade discount':discount,'Goods after discount':goods-discount,'Delivery':1800,'Invoice total':invoice,'Deposit':20000,'Balance due':invoice-20000}))).toMatchObject({marks:9,resolved:true});
 const income=40*2500,refreshments=40*700,fixed=25000+8000+20000,cost=fixed+refreshments,budgetSurplus=income-cost,actualSurplus=95000-84000;
 expect(gradeOaPaper2Part(numericPart('OA-ORIGINAL-02-03',5),sourceAnswer({'Budgeted income':income,'Refreshments':refreshments,'Fixed costs':fixed,'Total budgeted costs':cost,'Budgeted surplus':budgetSurplus,'Actual income':95000,'Actual expenditure':84000,'Actual surplus':actualSurplus,'Surplus variance':`${budgetSurplus-actualSurplus} adverse`}))).toMatchObject({marks:9,resolved:true});
});
test('independent stock movements start above the reorder level and fall below it on 8 August',()=>{
 const opening=140,b3=opening+80,b5=b3-60,b8=b5-40,b10=b8+40;
 const p=numericPart('OA-ORIGINAL-02-02',6);
 expect(p.criteria.filter(c=>c.kind==='numeric').map(c=>c.expected)).toEqual([opening,b3,b5,b8,b10,130,4]);
 expect(opening).toBeGreaterThan(130);expect(b5).toBeGreaterThan(130);expect(b8).toBeLessThan(130);
});
test('category limits give two advantages and two disadvantages their correct marks',()=>{
 const p=getOaPaper2().questions[0].parts[1];
 expect(gradeOaPaper2Part(p,p.modelAnswer)).toMatchObject({marks:4,resolved:true});
 const extraAdvantages=[p.choiceBank[0],p.choiceBank[1],p.choiceBank[4],p.choiceBank[2]].map(x=>x.model).join('\n');
 expect(gradeOaPaper2Part(p,extraAdvantages)).toMatchObject({marks:3,resolved:true});
});
test('unknown rubrics, altered sources, aliases and uncertain prose cannot become final marks',()=>{
 const id=OA_PAPER2S[0].id,criteria=oaPaper2Criteria(id);
 expect(()=>evaluateOaSourceV2({paperId:id,criteria:criteria.slice(1),responses:{}})).toThrow(/Incomplete/);
 expect(()=>evaluateOaSourceV2({paperId:id,criteria:[{...criteria[0],maxMarks:999},...criteria.slice(1)],responses:{}})).toThrow(/identity/);
 expect(()=>evaluateOaSourceV2({paperId:id,criteria,responses:{'not-a-part':'answer'}})).toThrow(/Unknown/);
 expect(()=>evaluateOaSourceV2({paperId:id,criteria,responses:{[criteria[0].id]:'one',[criteria[0].sourcePartId]:'two'}})).toThrow(/Conflicting/);
 const p=getOaPaper2(id).questions[0].parts[0];expect(gradeOaPaper2Part(p,'There is rain in the mountains today.').resolved).toBe(false);expect(gradeOaPaper2Part(p,p.modelAnswer+'\nOr the opposite is true.').resolved).toBe(false);
});
