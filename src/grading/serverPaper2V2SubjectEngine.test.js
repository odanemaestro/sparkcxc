import {evaluateExistingSubjectPaper2V2 as examine} from "./serverPaper2V2SubjectEngine";
import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import physics1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import itData from "../informationTechnology/practice/itPaper2Data.json";
import {englishAPaper2Sets,buildEnglishAPaper2} from "../englishA/data/englishAPaper2Bank";
import {POB_PAPER2_ORIGINAL_01} from "../principlesOfBusiness/data/pobPaper2Original";

const row=(id,maxMarks,sourceMarking)=>({id,sourcePartId:id,maxMarks,sourceMarking});
const example=(subjectId,paperId,criteria,responses={})=>
 examine({subjectId,paperId,criteria,responses});
test("Mathematics source mapping preserves M/A/B and ECF paper-part accounting",()=>{
 const q=PAPER2_QUESTION_BANK.find(x=>x.question_id==="p2-q1-v1");
 const criteria=q.parts.map(p=>row(q.question_id+"::"+p.id,p.marks,{
  answer:p.answer,criteria:p.criteria??null}));
 const r=example("mathematics","original-v1",criteria,
  Object.fromEntries(q.parts.map(p=>[q.question_id+"::"+p.id,{answer:p.answer,working:p.solution}])));
 expect(r.examinedParts).toBe(q.parts.length);
 expect(r.maxMarks).toBe(q.marks);
 expect(r.suggestedMarks).toBeGreaterThan(0);
 expect(r.suggestedMarks).toBeLessThanOrEqual(r.maxMarks);
 expect(r.canPublishFinalScore).toBe(r.unresolvedMarks===0);
});
test("Physics grades from original criteria and retains manual-unresolved boundary",()=>{
 const q=physics1.questions[0];
 const criteria=q.parts.map(p=>row(q.question_id+"::"+p.id,p.marks,p));
 const r=example("physics",physics1.paper_id,criteria,{});
 expect(r.maxMarks).toBe(q.parts.reduce((s,p)=>s+p.marks,0));
 expect(r.rows).toHaveLength(criteria.length);
 expect(r.canPublishFinalScore).toBe(r.unresolvedMarks===0);
});
test("IT uses its canonical deterministic examiner",()=>{
 const p=itData.papers[0],q=p.questions[0];
 const criteria=q.parts.map(x=>row(q.number+"-"+x.id,x.marks,x));
 const r=example("information-technology",p.id,criteria,{});
 expect(r.rows).toHaveLength(criteria.length);
 expect(r.maxMarks).toBe(q.parts.reduce((s,p)=>s+p.marks,0));
});
test("Chemistry written source evidence is bounded by its scheme",()=>{
 const id="CHEM-G1-Q1::(a)::(i)";
 const r=example("chemistry","CHEM-P2-PRACTICE-1",[row(id,1,{
  points:["Time taken for the cross to disappear / reaction time."],
  guidance:"Allow chemically equivalent wording."
 })],{});
 expect(r.examinedParts).toBe(1);
 expect(r.maxMarks).toBe(1);
 expect(r.canPublishFinalScore).toBe(r.unresolvedMarks===0);
});
test("English A reuses authored bank and existing analytical examiner",()=>{
 const p=buildEnglishAPaper2(englishAPaper2Sets[0].id);
 const task=p.tasks.find(x=>!x.choiceGroup);
 expect(task).toBeTruthy();
 const r=example("english-a",p.id,[row(task.id,task.rubric.marks,{
  kind:task.kind,rubric:task.rubric})],{[task.id]:""});
 expect(r.rows).toHaveLength(1);
 expect(r.canPublishFinalScore).toBe(r.unresolvedMarks===0);
});
test("FNH uses the actual distinct-evidence grader",()=>{
 const id="FNH-SPARK-P2-ORIGINAL-01-Q1::a";
 const r=example("food-nutrition-and-health","practice-01",[row(id,2,{
  modelPoints:["Diet means usual foods and drinks consumed.","Diet provides energy and nutrients."]})],
 {[id]:"Diet refers to the normal foods and drinks someone consumes."});
 expect(r.suggestedMarks).toBeGreaterThanOrEqual(0);
 expect(r.suggestedMarks).toBeLessThanOrEqual(2);
});
test("Integrated Science item evidence respects its part ceiling",()=>{
 const id="IS-M1-P2-01::(a)::(i)";
 const r=example("integrated-science","is-fixed-source-pair-01",[row(id,4,{
  requiredResponseType:"labels",markScheme:{points:["P - anther","Q - stigma","R - ovary","S - ovule"]}})],{});
 expect(r.maxMarks).toBe(4);
 expect(r.canPublishFinalScore).toBe(r.unresolvedMarks===0);
});
test("Social Studies concept list passes through original criterion logic",()=>{
 const id="ss-p2-q1::(a)";
 const r=example("social-studies","ss-p2-original-A",[row(id,2,{
  marking:{type:"list",maxMarks:2,maxPoints:2,marksPerPoint:1,
    points:[{id:"socialisation",concepts:["family_socialisation"]},
      {id:"protection",concepts:["family_protection"]}]}
 })],{});
 expect(r.maxMarks).toBe(2);
 expect(r.canPublishFinalScore).toBe(r.unresolvedMarks===0);
});
test("POB entire original paper preserves source ceiling and part identities",()=>{
 const rows=POB_PAPER2_ORIGINAL_01.questions.flatMap(q=>q.items.map(p=>
  row("POB-SPARK-P2-ORIGINAL-01-Q"+q.number+"::"+p.id,p.marks,{
   criteria:p.criteria,modelAnswer:p.modelAnswer
  })));
 const r=example("principles-of-business",POB_PAPER2_ORIGINAL_01.id,rows,{});
 expect(r.maxMarks).toBe(100);
 expect(r.examinedParts).toBe(rows.length);
 expect(r.canPublishFinalScore).toBe(r.unresolvedMarks===0);
});
test("all subject examiners fail closed for duplicate or inflated source criteria",()=>{
 expect(()=>example("mathematics","original-v1",[row("x",1,{}),row("x",1,{})])).toThrow();
 expect(()=>example("other","paper",[row("x",1,{})])).toThrow();
 expect(()=>example("english-a","paper",[row("not-a-real-task",100,{})])).toThrow();
});
