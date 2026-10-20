import {evaluateExistingSubjectPaper2V2 as examine} from "./serverPaper2V2SubjectEngine";
import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {check,checkMatrix} from "../practice/cxcMarking/checkers";
import physics1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import physics2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import physics3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import physics4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";
import {modelResponsesForPhysicsPaper2} from "../physics/paper2/physicsPaper2Marking";
import itData from "../informationTechnology/practice/itPaper2Data.json";
import {modelResponsesForInformationTechnologyPaper2} from "../informationTechnology/practice/itPaper2Marking";
import {englishAPaper2Sets,buildEnglishAPaper2} from "../englishA/data/englishAPaper2Bank";
import {POB_PAPER2_ORIGINAL_01} from "../principlesOfBusiness/data/pobPaper2Original";
import {CHEMISTRY_PAPER2_PRACTICE_SETS} from "../chemistry/data/chemistryPaper2Bank";
import IS_SPECS from "../integratedScience/data/integratedSciencePaper2Specs.json";

const row=(id,maxMarks,sourceMarking)=>({id,sourcePartId:id,maxMarks,sourceMarking});
// The registered Integrated Science scheme is the source bank item's.
const isSource=id=>{
 const [qid,pl,il]=id.split("::");
 const item=IS_SPECS[qid].parts.find(p=>p.label===pl).items.find(i=>i.label===il);
 return {requiredResponseType:item.response?.type||"lines",markScheme:item.markScheme};
};
// The registered Chemistry scheme is the source bank item's markScheme; the
// examiner refuses any other (source drift).
const chemistryScheme=(paperId,id)=>{
 const paper=CHEMISTRY_PAPER2_PRACTICE_SETS.find(p=>p.id===paperId);
 for(const q of paper.questions)for(const part of q.parts)for(const item of part.items)
  if(q.id+"::"+part.label+"::"+item.label===id)return item.markScheme;
 throw new Error("No chemistry source item "+id);
};
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
 const r=example("chemistry","CHEM-P2-PRACTICE-1",[row(id,1,chemistryScheme("CHEM-P2-PRACTICE-1",id))],{});
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
 const r=example("integrated-science","is-fixed-source-pair-01",[row(id,4,isSource(id))],{});
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
  chemistryScheme("CHEM-P2-PRACTICE-1","CHEM-G1-Q1::(a)::(i)"),
  "Time taken for the cross to disappear / reaction time."],
 ["integrated-science","is-fixed-source-pair-01","IS-M1-P2-01::(a)::(ii)",1,
  isSource("IS-M1-P2-01::(a)::(ii)"),
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
 const contradiction=example(subject,paper,criteria,{
  [id]:point+"\\nIt is false that "+point
 });
 const contradictionAlt=example(subject,paper,criteria,{
  [id]:point+". It is incorrect to say "+point
 });
 expect(positive.suggestedMarks).toBeGreaterThanOrEqual(0);
 for(const outcome of [denied,contrary,contradiction,contradictionAlt]){
  expect(outcome.suggestedMarks).toBe(0);
  expect(outcome.unresolvedMarks).toBe(marks);
  expect(outcome.canPublishFinalScore).toBe(false);
  // The publication RPC accepts only the subject examiner method.
  expect(outcome.rows[0].method).toBe({chemistry:"existing-chemistry-evidence",
   "integrated-science":"existing-integrated-science-evidence",
   "food-nutrition-and-health":"existing-FNH-criterion-evidence"}[subject]);
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
  // The rehydrated source gives the model answer full, certain credit.
  expect(model.suggestedMarks).toBe(part.marks);
  expect(model.canPublishFinalScore).toBe(true);
  const unrelated=example("information-technology",paper.id,[source],{
   [key]:"ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY"
  });
  expect(unrelated.suggestedMarks).toBe(0);
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

test("four Physics Paper 2 sources replay all 135 parts with actual structured model answers",()=>{
 const papers=[physics1,physics2,physics3,physics4];
 expect(papers.reduce((sum,p)=>sum+p.questions.reduce((n,q)=>n+q.parts.length,0),0)).toBe(135);
 let creditedParts=0,manualGraphs=0;
 for(const paper of papers){
  const criteria=paper.questions.flatMap(q=>q.parts.map(p=>
   row(q.question_id+"::"+p.id,p.marks,p)));
  const models=modelResponsesForPhysicsPaper2(paper);
  const examined=example("physics",paper.paper_id,criteria,models);
  expect(examined.examinedParts).toBe(criteria.length);
  expect(examined.suggestedMarks).toBeGreaterThanOrEqual(0);
  expect(examined.suggestedMarks).toBeLessThanOrEqual(examined.maxMarks);
  expect(examined.canPublishFinalScore).toBe(false);
  creditedParts+=examined.rows.filter(r=>r.suggestedMarks>0).length;
  const negative=example("physics",paper.paper_id,criteria,Object.fromEntries(
   criteria.map(c=>[c.id,{answer:"ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY"}])));
  expect(negative.suggestedMarks).toBe(0);
  for(const row of examined.rows){
   const source=paper.questions.flatMap(q=>q.parts.map(p=>({
    id:q.question_id+"::"+p.id,part:p
   }))).find(x=>x.id===row.criterionId)?.part;
   if(source?.responseType==="graph"&&source.criteria?.some(c=>c.manual===true)){
    manualGraphs++;
    // Authored typed graph evidence now yields bounded provisional marks.
    expect(row.suggestedMarks).toBeGreaterThanOrEqual(0);
    expect(row.suggestedMarks).toBeLessThanOrEqual(source.marks);
    expect(row.resolved).toBe(false);
   }
  }
 }
 expect(manualGraphs).toBe(4);
 expect(creditedParts).toBeGreaterThan(0);
 console.log("Physics private V2 structured source replay",{sourceParts:135,creditedParts,manualGraphs});
});

test("POB affirmative model-answer denials never gain provisional or authoritative V2 credit",()=>{
 const paper=POB_PAPER2_ORIGINAL_01;
 const rows=paper.questions.flatMap(q=>q.items.map(p=>
  row("POB-SPARK-P2-ORIGINAL-01-Q"+q.number+"::"+p.id,
   p.marks,{criteria:p.criteria,modelAnswer:p.modelAnswer})));
 expect(rows).toHaveLength(25);
 const first=rows.find(x=>x.id==="POB-SPARK-P2-ORIGINAL-01-Q1::a");
 expect(first).toBeTruthy();
 const positive=example("principles-of-business",paper.id,rows,{
  [first.id]:first.sourceMarking.modelAnswer
 });
 expect(positive.rows.find(x=>x.criterionId===first.id)?.suggestedMarks).toBe(first.maxMarks);
 for(const text of [
  "It is false that "+first.sourceMarking.modelAnswer,
  "It is incorrect to say "+first.sourceMarking.modelAnswer
 ]){
  const checked=example("principles-of-business",paper.id,rows,{[first.id]:text});
  const grade=checked.rows.find(x=>x.criterionId===first.id);
  expect(grade.suggestedMarks).toBe(0);
  expect(grade.resolved).toBe(false);
  expect(grade.method).toBe("existing-POB-subcriterion-evidence");
  expect(checked.canPublishFinalScore).toBe(false);
 }
});

test("every source-reviewed IT spreadsheet formula resolves correct and incorrect evidence; unanswered parts are certain zeros",()=>{
 const formulaAnswers={
  "2-f":["=B2*C2","=B2+C2"],
  "2-g":["=SUM(D2:D3)","=SUM(D2:D4)"],
  "3-a":["=B2*C2","=B2+C2"],
  "3-b":["=D2*$F$2","=D2*F2"],
  "3-c":["=SUM(D2:D3)","=SUM(D3:D4)"]
 };
 let reviewed=0;
 for(const paper of itData.papers){
  const criteria=paper.questions.flatMap(question=>question.parts.map(part=>
   row(question.number+"-"+part.id,part.marks,{
    prompt:part.prompt,markScheme:part.markScheme,
    profile:part.profile,responseType:part.responseType
   })));
  for(const question of paper.questions)for(const part of question.parts){
   const key=question.number+"-"+part.id;
   if(part.responseType!=="formula"||!formulaAnswers[key])continue;
   reviewed++;
   const [right,wrong]=formulaAnswers[key];
   for(const [answer,expected] of [[right,part.marks],[wrong,0]]){
    const output=example("information-technology",paper.id,criteria,{
     [key]:{answer}
    });
    const graded=output.rows.find(x=>x.criterionId===key);
    expect(graded.method).toBe("existing-IT-specific-rules");
    expect(graded.suggestedMarks).toBe(expected);
    expect(graded.resolved).toBe(true);
    // Every other part is blank: an objectively verified zero, so the
    // paper total is final and equals this one formula's marks.
    expect(output.unresolvedMarks).toBe(0);
    expect(output.canPublishFinalScore).toBe(true);
    expect(output.confirmedMarks).toBe(expected);
   }
  }
 }
 expect(reviewed).toBe(27);
});


test("production IT P2-F accepts valid website reliability and developed algorithm and error explanations",()=>{
 const p=itData.papers.find(p=>p.id==="P2-F");
 expect(p).toBeTruthy();
 const parts=["2-b","4-b","4-c","4-e"].map(key=>{
  const [q,partId]=key.split("-");
  const part=p.questions.find(x=>x.number===Number(q)).parts.find(x=>x.id===partId);
  return row(key,part.marks,{
   prompt:part.prompt,markScheme:part.markScheme,
   profile:part.profile,responseType:part.responseType
  });
 });
 const answers={
  "2-b":"Accuracy: Check whether the information is correct and supported by reliable sources. Currency: Check when the information was published or updated to ensure it is up to date.",
  "4-b":"Finite: An algorithm must have a limited number of steps and eventually stop. Unambiguous: Every instruction must be clear and precise so that it can be followed without confusion. An algorithm must be finite because a program that never stops may continue running indefinitely, wasting computer resources and failing to produce its intended result.",
  "4-c":{pseudocode:"START\nINPUT average\nINPUT attendance\nINPUT service\nSCORE ← (average + attendance + service) / 3\nIF SCORE >= 85 THEN\nDISPLAY ACCEPT\nELSE\nDISPLAY REVIEW\nENDIF\nSTOP"},
  "4-e":"A syntax error occurs when a programmer breaks the rules of a programming language, such as forgetting a required bracket. It may prevent the program from running. A logic error causes incorrect results even though the program runs. A syntax error breaks language rules; a logic error runs but gives an incorrect result."
 };
 const result=example("information-technology",p.id,parts,answers);
 for(const [id,marks] of [["2-b",2],["4-b",4],["4-c",8],["4-e",3]]){
  const grade=result.rows.find(x=>x.criterionId===id);
  expect(grade.suggestedMarks).toBe(marks);
  expect(grade.resolved).toBe(true);
 }
 expect(result.confirmedMarks).toBe(17);
 expect(result.canPublishFinalScore).toBe(true);
 for(const [id,answer] of [
  ["2-b","Accuracy is not important; the website can be current."],
  ["4-b","An algorithm is finite and precise. Finite means an algorithm should never end because it should run forever."],
  ["4-e","Syntax errors break language rules. Logic errors run, but cannot give incorrect results."],
  ["4-c",{pseudocode:"INPUT average, attendance, service\nSCORE = (average + attendance + service) / 2\nIF SCORE >= 85 THEN\nDISPLAY ACCEPT\nELSE\nDISPLAY REVIEW\nENDIF"}]
 ]){
  const checked=example("information-technology",p.id,parts,{[id]:answer});
  const grade=checked.rows.find(x=>x.criterionId===id);
  expect(grade.suggestedMarks<grade.maxMarks||grade.resolved===false).toBe(true);
 }
});
