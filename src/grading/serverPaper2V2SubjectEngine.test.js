import {evaluateExistingSubjectPaper2V2 as examine} from "./serverPaper2V2SubjectEngine";
import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {check,checkMatrix} from "../practice/cxcMarking/checkers";
import physics1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import physics2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import physics3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import physics4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";
import itData from "../informationTechnology/practice/itPaper2Data.json";
import {modelResponsesForInformationTechnologyPaper2} from "../informationTechnology/practice/itPaper2Marking";
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


test("English A irrelevant short responses receive no speculative V2 credit",()=>{
 const paper=buildEnglishAPaper2(englishAPaper2Sets[0].id);
 const task=paper.tasks.find(x=>!x.choiceGroup&&x.kind!=="summary");
 expect(task).toBeTruthy();
 const id=task.id;
 const result=example("english-a",paper.id,[row(id,task.rubric.marks,{
  kind:task.kind,rubric:task.rubric})],{
  [id]:"ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY"
 });
 expect(result.suggestedMarks).toBe(0);
 expect(result.unresolvedMarks).toBe(task.rubric.marks);
 expect(result.canPublishFinalScore).toBe(false);
});
test("Physics manual graph marks require verified graph artefacts",()=>{
 const found=physics1.questions.flatMap(q=>(q.parts||[]).map(p=>({q,p})))
  .find(({p})=>p.responseType==="graph"&&p.criteria?.some(c=>c.manual===true));
 expect(found).toBeTruthy();
 const id=found.q.question_id+"::"+found.p.id;
 const result=example("physics",physics1.paper_id,[
  row(id,found.p.marks,found.p)
 ],{[id]:"ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY"});
 expect(result.suggestedMarks).toBe(0);
 expect(result.unresolvedMarks).toBe(found.p.marks);
 expect(result.canPublishFinalScore).toBe(false);
});
test("Social Studies B/C essays route their registered content and organisation",()=>{
 for(const letter of ["b","c"]){
  const id="ss-p2-"+letter+"-q5";
  const criteria=[
   row(id+"::content",18,{component:"content"}),
   row(id+"::organisation",4,{component:"organisation"})
  ];
  const result=example("social-studies","ss-p2-original-"+letter.toUpperCase(),
   criteria,{[id]:"ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY"});
  expect(result.maxMarks).toBe(22);
  expect(result.examinedParts).toBe(2);
  expect(result.canPublishFinalScore).toBe(false);
 }
});


test("Mathematics V2 grades the registered criteria, never a different bank fallback",()=>{
 const q=PAPER2_QUESTION_BANK.find(q=>q.question_id==="p2-q1-v1");
 const selected=q.parts.map(p=>row(q.question_id+"::"+p.id,p.marks,{
  answer:p.answer,criteria:p.id==="b1"?[
   {code:"B1",kind:"B",marks:1,field:"answer",depends:[],
    check:{type:"numeric",value:1234,tolerance:0.001}},
   {code:"B2",kind:"B",marks:1,field:"answer",depends:[],
    check:{type:"numeric",value:1234,tolerance:0.001}}
  ]:null
 }));
 const genuineBankAnswer=example("mathematics","original-v1",selected,{
  "p2-q1-v1::b1":{answer:"3600"}
 });
 const b1=genuineBankAnswer.rows.find(r=>r.criterionId==="p2-q1-v1::b1");
 expect(b1.suggestedMarks).toBe(0);
 expect(b1.resolved).toBe(true);
 const registeredAnswer=example("mathematics","original-v1",selected,{
  "p2-q1-v1::b1":{answer:"1234"}
 });
 const override=registeredAnswer.rows.find(r=>r.criterionId==="p2-q1-v1::b1");
 expect(override.suggestedMarks).toBe(2);
 expect(override.resolved).toBe(true);
});
test("Mathematics draft fallback marks never become final on a nonblank response",()=>{
 const q=PAPER2_QUESTION_BANK.find(q=>q.question_id==="p2-q1-v1");
 const criteria=q.parts.map(p=>row(q.question_id+"::"+p.id,p.marks,{
  answer:p.answer,criteria:null
 }));
 const evaluation=example("mathematics","original-v1",criteria,{
  "p2-q1-v1::a":{answer:"7",working:q.parts[0].solution}
 });
 const part=evaluation.rows.find(r=>r.criterionId==="p2-q1-v1::a");
 expect(part.resolved).toBe(false);
 expect(evaluation.canPublishFinalScore).toBe(false);
 expect(evaluation.unresolvedMarks).toBeGreaterThanOrEqual(3);
});
test("Mathematics registered manual criteria require further evidence review",()=>{
 const q=PAPER2_QUESTION_BANK.find(q=>q.question_id==="p2-q1-v1");
 const criteria=q.parts.map(p=>row(q.question_id+"::"+p.id,p.marks,{
  answer:p.answer,criteria:p.id==="b1"?[
   {code:"M1",kind:"M",marks:1,field:"working",depends:[],
    check:{type:"manual-verification",evidence:"Confirm correct method"}},
   {code:"A1",kind:"A",marks:1,field:"answer",depends:["M1"],
    check:{type:"numeric",value:3600,tolerance:0.01}}
  ]:null
 }));
 const evaluation=example("mathematics","original-v1",criteria,{
  "p2-q1-v1::b1":{answer:"3600",working:"4500 / 1.25"}
 });
 const part=evaluation.rows.find(r=>r.criterionId==="p2-q1-v1::b1");
 expect(part.resolved).toBe(false);
 expect(part.suggestedMarks).toBe(1);
 expect(evaluation.canPublishFinalScore).toBe(false);
});
test("Mathematics rejects mismatched source mark sums rather than using the bank",()=>{
 const q=PAPER2_QUESTION_BANK.find(q=>q.question_id==="p2-q1-v1");
 const criteria=q.parts.map(p=>row(q.question_id+"::"+p.id,p.marks,{
  answer:p.answer,criteria:p.id==="b1"?[
   {code:"B1",kind:"B",marks:1,field:"answer",
    check:{type:"numeric",value:3600}}
  ]:null
 }));
 expect(()=>example("mathematics","original-v1",criteria,{
  "p2-q1-v1::b1":{answer:"3600"}
 })).toThrow(/source|allocation/i);
});


test("Mathematics nested manual and unknown source checks never authorise final scores",()=>{
 const q=PAPER2_QUESTION_BANK.find(q=>q.question_id==="p2-q1-v1");
 for(const invalid of [
  {type:"anyOf",options:[
   {type:"numeric",value:3600},
   {type:"manual-verification",evidence:"Check working manually"}
  ]},
  {type:"completely-unrecognised-marking-rule",value:3600},
  {type:"allOf",options:[]}
 ]){
  const rows=q.parts.map(p=>row(q.question_id+"::"+p.id,p.marks,{
   answer:p.answer,criteria:p.id==="b1"?[
    {code:"B1",kind:"B",marks:1,field:"answer",check:invalid},
    {code:"B2",kind:"B",marks:1,field:"answer",
     check:{type:"numeric",value:3600}}
   ]:null
  }));
  const result=example("mathematics","original-v1",rows,{
   "p2-q1-v1::b1":{answer:"3600"}
  });
  const part=result.rows.find(x=>x.criterionId==="p2-q1-v1::b1");
  expect(part.resolved).toBe(false);
  expect(result.canPublishFinalScore).toBe(false);
 }
});


test("matrix scalar-times-inverse accepts equivalent rational entries, not unrelated numbers",()=>{
 const inverse={value:[[5/7,-3/7],[-1/7,2/7]],tolerance:1e-8};
 for(const answer of [
  "(1/7)[[5,-3],[-1,2]]",
  "M^-1 = (1/7)[[5,-3],[-1,2]]",
  "[[5/7,-3/7],[-1/7,2/7]]",
  "5/7,-3/7,-1/7,2/7"
 ]) expect(checkMatrix(answer,inverse).ok).toBe(true);
 for(const wrong of [
  "(1/8)[[5,-3],[-1,2]]",
  "(1/7)[[5,-3],[-2,1]]",
  "(1/7)[[5,-3],[-1,2]] OR [[1,0],[0,1]]",
  "The correct answer has entries 5, -3, -1 and 2.",
  "[[5,-3],[-1,2]]"
 ]) expect(checkMatrix(wrong,inverse).ok).toBe(false);
 const product={value:[[8,4],[4,9]]};
 expect(checkMatrix("[[8,4],[4,9]]",product).ok).toBe(true);
 expect(checkMatrix("8,4,4,9",product).ok).toBe(true);
 expect(checkMatrix("8,4,9,4",product).ok).toBe(false);
});
test("exact lowest-terms fraction cannot be replaced by a decimal or unreduced value",()=>{
 const exact={type:"fraction",value:9/5,requireFraction:true,simplified:true};
 expect(check("9/5",exact).ok).toBe(true);
 expect(check("1 4/5",exact).ok).toBe(true);
 expect(check("1.8",exact).ok).toBe(false);
 expect(check("18/10",exact).ok).toBe(false);
 expect(check("9/6",exact).ok).toBe(false);
});

test("unreviewed nonblank evidence cannot authorize final grading across subjects",()=>{
 const physicsPart=physics1.questions[0].parts[0];
 const physicsId=physics1.questions[0].question_id+"::"+physicsPart.id;
 const physicsResult=example("physics",physics1.paper_id,
  [row(physicsId,physicsPart.marks,physicsPart)],{[physicsId]:"answer"});
 expect(physicsResult.canPublishFinalScore).toBe(false);
 expect(physicsResult.unresolvedMarks).toBe(physicsPart.marks);
 const id="FNH-SPARK-P2-ORIGINAL-01-Q1::a";
 const fnhResult=example("food-nutrition-and-health","practice-01",
  [row(id,2,{modelPoints:["Diet means usual foods and drinks consumed.","Diet provides energy and nutrients."]})],
  {[id]:"Diet refers to usual foods and drinks consumed."});
 expect(fnhResult.canPublishFinalScore).toBe(false);
 expect(fnhResult.unresolvedMarks).toBe(2);
});

test("Math provisional logic rejects prose-only proofs and preserves blank-part zeros",()=>{
 const q=PAPER2_QUESTION_BANK.find(x=>x.question_id==="p2-q4-v1");
 expect(q).toBeTruthy();
 const criteria=q.parts.map(p=>row(q.question_id+"::"+p.id,p.marks,{
  answer:p.answer,
  criteria:p.id==="a1"?[{
   code:"B1",kind:"B",marks:p.marks,field:"answer",
   check:{type:"prose",tokens:["correct"],quorum:0.1}
  }]:p.criteria??null
 }));
 const nonblank=q.question_id+"::a1";
 const r=example("mathematics","original-v1",criteria,{
  [nonblank]:{answer:"correct"}
 });
 expect(r.rows.find(x=>x.criterionId===nonblank)?.resolved).toBe(false);
 expect(r.canPublishFinalScore).toBe(false);
 for(const part of q.parts.filter(x=>x.id!=="a1")){
  const outcome=r.rows.find(x=>x.criterionId===q.question_id+"::"+part.id);
  expect(outcome.suggestedMarks).toBe(0);
  expect(outcome.resolved).toBe(true);
 }
});

test("stale Mathematics server answer is rejected before grading",()=>{
 const q=PAPER2_QUESTION_BANK.find(x=>x.question_id==="p2-q1-v9");
 expect(q).toBeTruthy();
 const criteria=q.parts.map(p=>row(q.question_id+"::"+p.id,p.marks,{
  answer:p.id==="b1"?"2240.00":p.answer,
  criteria:p.criteria??null
 }));
 expect(()=>example("mathematics","original-v9",criteria,{}))
  .toThrow(/registered answer differs from assembled source/);
});

test.each([
 ["chemistry","CHEM-P2-PRACTICE-1","CHEM-G1-Q1::(a)::(i)",1,
  {points:["Time taken for the cross to disappear / reaction time."]},
  "Time taken for the cross to disappear / reaction time."],
 ["integrated-science","is-fixed-source-pair-01","IS-M1-P2-01::(a)::(ii)",1,
  {requiredResponseType:"lines",
   markScheme:{points:["Produces pollen grains (male gametes)."]}},
  "Produces pollen grains (male gametes)."],
 ["food-nutrition-and-health","practice-01","FNH-SPARK-P2-ORIGINAL-01-Q1::a",1,
  {modelPoints:["Diet means the usual foods and drinks consumed by a person."]},
  "Diet means the usual foods and drinks consumed by a person."]
])("source-canonical denial never receives a mark or verified approval (%s)",(
 subject,paper,id,marks,marking,point)=>{
 const criteria=[row(id,marks,marking)];
 const positive=example(subject,paper,criteria,{[id]:point});
 const denied=example(subject,paper,criteria,{
  [id]:"It is false that "+point
 });
 const contrary=example(subject,paper,criteria,{
  [id]:"It is incorrect to say "+point
 });
 expect(positive.suggestedMarks).toBeGreaterThanOrEqual(0);
 for(const outcome of [denied,contrary]){
  expect(outcome.suggestedMarks).toBe(0);
  expect(outcome.unresolvedMarks).toBe(marks);
  expect(outcome.canPublishFinalScore).toBe(false);
  expect(outcome.rows[0].method).toBe("source-answer-explicit-denial");
 }
});

test("private V2 IT source verifier retains IPO input variables and visual database key evidence",()=>{
 const paper=itData.papers[0];
 const models=modelResponsesForInformationTechnologyPaper2(paper);
 const actual=[
  {q:paper.questions.find(x=>x.number===3),id:"a"},
  {q:paper.questions.find(x=>x.number===3),id:"b"},
  {q:paper.questions.find(x=>x.number===4),id:"a"},
  {q:paper.questions.find(x=>x.number===4),id:"c"}
 ];
 for(const {q,id} of actual){
  const part=q.parts.find(p=>p.id===id);
  const key=q.number+"-"+id;
  // Production schema intentionally has no responseSpec or question.visual.
  const source=row(key,part.marks,{
   prompt:part.prompt,markScheme:part.markScheme,
   profile:part.profile,responseType:part.responseType
  });
  const model=example("information-technology",paper.id,[source],{
   [key]:models[key]
  });
  expect(model.suggestedMarks).toBeGreaterThan(0);
  expect(model.suggestedMarks).toBeLessThanOrEqual(part.marks);
  expect(model.canPublishFinalScore).toBe(false);
  const unrelated=example("information-technology",paper.id,[source],{
   [key]:"ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY"
  });
  expect(unrelated.suggestedMarks).toBe(0);
  expect(unrelated.canPublishFinalScore).toBe(false);
 }
});
test("private V2 rejects changed IT source prompts, schemes or ceiling",()=>{
 const paper=itData.papers[0];
 const part=paper.questions[0].parts[0];
 const key="1-"+part.id;
 const source={prompt:part.prompt,markScheme:part.markScheme,
  profile:part.profile,responseType:part.responseType};
 for(const invalid of [
  {...source,prompt:"Unrelated replacement question"},
  {...source,markScheme:["One unrelated scheme"]},
  {...source,responseType:"graph"}
 ]){
  expect(()=>example("information-technology",paper.id,
   [row(key,part.marks,invalid)],{[key]:"Some response"}))
   .toThrow(/source drift/i);
 }
 expect(()=>example("information-technology",paper.id,
  [row(key,part.marks+1,source)],{})).toThrow(/source drift/i);
});

test.each([physics1,physics2,physics3,physics4])("private V2 does not convert %s manual graph inputs into final marks",paper=>{
 const q=paper.questions.find(q=>q.parts.some(p=>p.responseType==="graph"));
 expect(q).toBeTruthy();
 const source=q.parts.find(p=>p.responseType==="graph");
 expect(source.criteria.some(c=>c.manual===true)).toBe(true);
 const id=q.question_id+"::"+source.id;
 const criteria=[row(id,source.marks,source)];
 for(const supplied of [
  "Both axes correctly labelled, six points plotted, correct scales, line of best fit.",
  {answer:"graph completed",working:"six correct points",points:[[0,0],[1,1]],axisLabels:["x","y"]},
  {answer:"A correctly plotted graph",graph:{xAxis:"time",yAxis:"distance",points:[{x:0,y:0}]}},
 ]){
  const result=example("physics",paper.paper_id,criteria,{[id]:supplied});
  expect(result.suggestedMarks).toBe(0);
  expect(result.unresolvedMarks).toBe(source.marks);
  expect(result.canPublishFinalScore).toBe(false);
  expect(result.rows[0].method).toBe("physics-graph-requires-artifact-verification");
 }
});
