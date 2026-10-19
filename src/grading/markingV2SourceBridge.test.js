import fs from "node:fs";
import path from "node:path";
import physics1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import physics2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import physics3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import physics4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";
import it from "../informationTechnology/practice/itPaper2Data.json";
import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateV2ShadowDiagnostics} from "../../supabase/functions/mark-paper2-v2-shadow/evaluator.js";

const migration=name=>fs.readFileSync(path.join(process.cwd(),"supabase/migrations",name),"utf8");
const technical=migration("20261019150000_marking_v2_physics_it_source_detail_bridge.sql");
const math=migration("20261019153000_marking_v2_math_eight_missing_criteria.sql");
const shadow=fs.readFileSync("supabase/functions/mark-paper2-v2-shadow/index.ts","utf8");
const reviewed=[
"p2-q3-v1::b","p2-q3-v1::c","p2-q4-v1::a2","p2-q4-v1::b",
"p2-q10-v1::b","p2-q1-v3::b3","p2-q6-v4::a","p2-q6-v4::c"
];

test("source-owned Physics and IT criteria are retained for every real part",()=>{
 const papers=[physics1,physics2,physics3,physics4];
 expect(papers).toHaveLength(4);
 for(const paper of papers){
  expect(paper.questions.flatMap(q=>q.parts).reduce((n,p)=>n+p.marks,0)).toBe(100);
  expect(technical).toContain(paper.paper_id);
  for(const question of paper.questions)for(const part of question.parts){
   expect(technical).toContain(question.question_id+"::"+part.id);
   expect(Array.isArray(part.criteria)).toBe(true);
  }
 }
 expect(it.papers).toHaveLength(9);
 for(const paper of it.papers){
  expect(technical).toContain(paper.id);
  expect(paper.questions.flatMap(q=>q.parts).reduce((n,p)=>n+p.marks,0)).toBe(90);
  for(const q of paper.questions)for(const part of q.parts)
   expect(technical).toContain(q.number+"-"+part.id);
 }
 expect(technical).toContain("verification_status='draft'");
 expect(technical).not.toMatch(/set\s+active\s*=\s*true/i);
});

test("eight Mathematics repaired criteria preserve real assembled part ceilings",()=>{
 expect(reviewed).toHaveLength(8);
 for(const id of reviewed){
  const [questionId,partId]=id.split("::");
  const question=PAPER2_QUESTION_BANK.find(x=>x.question_id===questionId);
  expect(question).toBeTruthy();
  const part=question.parts.find(x=>x.id===partId);
  expect(part).toBeTruthy();
  expect(math).toContain(id);
  expect(part.marks).toBeGreaterThan(0);
 }
 expect(math).toContain("Math V2 curated source ID, current draft, or mark-total mismatch");
 expect(math).toContain("verification_status='draft'");
 expect(math).not.toMatch(/set\s+active\s*=\s*true/i);
});

test("isolated full-paper shadow replay does not publish scores",()=>{
 const rawQuestions=Array.from({length:10},(_,n)=>PAPER2_QUESTION_BANK.find(
  x=>x.question_id==="p2-q"+(n+1)+"-v1"));
 expect(rawQuestions.every(Boolean)).toBe(true);
 const criteria=rawQuestions.flatMap(q=>q.parts.map(p=>({
  id:q.question_id+"::"+p.id,maxMarks:p.marks,
  sourceMarking:{answer:p.answer,criteria:p.criteria??null}
 })));
 const responses=Object.fromEntries(rawQuestions.flatMap(q=>q.parts.map(p=>[
  q.question_id+"::"+p.id,{answer:String(p.answer??""),working:""}
 ])));
 const report=evaluateV2ShadowDiagnostics({criteria,responses});
 expect(report.maxMarks).toBe(100);
 expect(report.reviewedItems).toBe(criteria.length);
 expect(report.candidateMarks).toBeLessThanOrEqual(100);
 expect(report.confirmedMarks).toBe(0);
 expect(report.unresolvedMarks).toBe(100);
 expect(report.canPublishFinalScore).toBe(false);
 expect(shadow).toContain("spark_v2_finish_shadow_subject_job");
 expect(shadow).not.toContain("spark_finish_marking");
});
