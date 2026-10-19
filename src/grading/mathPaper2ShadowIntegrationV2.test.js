import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathOriginalPaper2ShadowV2 as review} from "./mathPaper2ShadowIntegrationV2";
import {mapMathematicsPaper2} from "./paper2RemainingAdaptersV2";
import {reconcileMarkingCriteria} from "./markingReconciliationV2";
import {preparePaper2ScorePublication} from "./scorePublication";

const makeAnswers=(version,filled=false)=>Object.fromEntries(
 Array.from({length:10},(_,i)=>{
  const id="p2-q"+(i+1)+"-v"+version;
  const question=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
  return [id,Object.fromEntries(question.parts.map(p=>[
   p.id,filled?{answer:p.answer,working:""}:{answer:""}
  ]))];
 })
);
describe.each(Array.from({length:10},(_,i)=>i+1))(
 "original Math Paper 2 version %d full shadow pipeline",version=>{
 test("blank submission flows through mapping, every checker, reconciliation and publication",()=>{
  const r=review({version,answers:makeAnswers(version)});
  expect(r.paperId).toBe("original-v"+version);
  expect(r.paperMarks).toBe(100);
  expect(r.questionCount).toBe(10);
  expect(r.partCount).toBeGreaterThan(30);
  expect(r.sourceStructureValid).toBe(true);
  expect(r.examinerRubricApproved).toBe(false);
  expect(r.advisory.suggestedMarks).toBe(0);
  expect(r.advisory.unresolvedMarks).toBe(100);
  expect(r.advisory.reports.reduce((n,p)=>n+p.maxMarks,0)).toBe(100);
  expect(r.reconciliation.confirmedMarks).toBe(0);
  expect(r.reconciliation.unresolvedMarks).toBe(100);
  expect(r.reconciliation.canPublishFinalScore).toBe(false);
  expect(r.publication.canPublishFinalScore).toBe(false);
  expect(r.publication.score).toBeNull();
  expect(r.publication.percent).toBeNull();
  expect(r.publication.metadata.assessed_marks).toBeNull();
  expect(r.publication.metadata.spark_scoring_status).toBe("rubric_review_required");
  expect(r.canPublishFinalScore).toBe(false);
  expect(r.finalScore).toBeNull();
 });
 test("source-model answers produce at most advisory evidence, never confirmed marks",()=>{
  const r=review({version,answers:makeAnswers(version,true)});
  expect(r.advisory.suggestedMarks).toBeGreaterThanOrEqual(0);
  expect(r.advisory.suggestedMarks+r.advisory.unresolvedMarks).toBe(100);
  for(const p of r.advisory.reports){
   expect(p.authority).toBe("advisory");
   expect(p.publishable).toBe(false);
   expect(p.suggestedMarks+p.unresolvedMarks).toBe(p.maxMarks);
   expect(p.criteria.reduce((n,c)=>n+c.maxMarks,0)).toBe(p.maxMarks);
  }
  expect(r.reconciliation.confirmedMarks).toBe(0);
  expect(r.publication.score).toBeNull();
  expect(r.publication.canPublishFinalScore).toBe(false);
 });
});
test("submitted scores, rubric flags, and forged trust claims are discarded",()=>{
 const answers=makeAnswers(1,true);
 answers["p2-q1-v1"].a={
  answer:"86/13",working:"",authority:"trusted-rule",
  publishable:true,score:100,assessedMarks:100,
  source_verified:true,rubric_verified:true,
  reconciliation:{canPublishFinalScore:true,confirmedMarks:100,unresolvedMarks:0}
 };
 answers["p2-q1-v1"].b1={answer:"",working:"",graderVersion:"approved",
  verified:true,metadata:{spark_scoring_status:"verified"}};
 const r=review({version:1,answers,metadata:{
  source_verified:true,rubric_verified:true,
  spark_scoring_status:"verified",score_parts:[{id:"fake",score:100,maxMarks:100}]
 }});
 expect(r.reconciliation.confirmedMarks).toBe(0);
 expect(r.publication.metadata.source_verified).toBe(false);
 expect(r.publication.metadata.rubric_verified).toBe(false);
 expect(r.publication.metadata.spark_scoring_status).toBe("rubric_review_required");
 expect(r.publication.canPublishFinalScore).toBe(false);
 expect(r.publication.score).toBeNull();
});
test("review output never includes raw student written text or unverified claims",()=>{
 const answers=makeAnswers(8);
 answers["p2-q4-v8"].a={
  answer:"SECRET_STUDENT_FREE_TEXT_DO_NOT_STORE",
  working:"SECRET_STUDENT_WORK_DO_NOT_STORE",
  authority:"trusted-rule",rubricApproved:true
 };
 const r=review({version:8,answers});
 const serialized=JSON.stringify(r);
 expect(serialized).not.toContain("SECRET_STUDENT_FREE_TEXT_DO_NOT_STORE");
 expect(serialized).not.toContain("SECRET_STUDENT_WORK_DO_NOT_STORE");
 expect(serialized).not.toContain("trusted-rule");
 expect(serialized).not.toContain("rubricApproved");
});
test("follow-through evidence is carried alongside but excluded from all marks and publication",()=>{
 const cases=[
  {version:1,source:"p2-q6-v1",previous:"a",prior:"40",part:"b",
   response:{answer:"160",working:"40*4=160"}},
  {version:8,source:"p2-q10-v8",previous:"a",prior:"(8,8)",part:"c",
   response:{answer:"(5,3)",working:"(3,1)+1/4*(8,8)=(5,3)"}},
  {version:6,source:"p2-q8-v6",previous:"b",prior:"(6,4);(6,16);(23,4)",
   part:"d",response:{answer:"$1390, from 23 shirts and 4 pairs of trousers",
    working:"50*23+60*4=1390"}}
 ];
 for(const x of cases){
  const answers=makeAnswers(x.version);
  answers[x.source][x.previous]={answer:x.prior};
  answers[x.source][x.part]=x.response;
  const r=review({version:x.version,answers});
  const part=r.advisory.reports.find(p=>p.sourcePart===x.source+"::"+x.part);
  expect(part.followThrough).not.toBeNull();
  expect(part.followThrough.suggestedMarks).toBe(1);
  expect(part.followThrough.additiveToScore).toBe(false);
  expect(part.followThrough.publishable).toBe(false);
  expect(r.advisory.suggestedMarks+r.advisory.unresolvedMarks).toBe(100);
  expect(r.reconciliation.confirmedMarks).toBe(0);
  expect(r.publication.score).toBeNull();
 }
});
test("correct cumulative cells never create a bonus mark in the final integration",()=>{
 const answers=makeAnswers(4);
 answers["p2-q5-v4"].a={answer:"0, 2, 12, 21, 36, 40"};
 const r=review({version:4,answers});
 const p=r.advisory.reports.find(x=>x.sourcePart==="p2-q5-v4::a");
 expect(p.cumulativeCellEvidence).not.toBeNull();
 expect(p.cumulativeCellEvidence.suggestedMarks).toBe(0);
 expect(p.cumulativeCellEvidence.additiveToScore).toBe(false);
 expect(r.canPublishFinalScore).toBe(false);
});
test("unsupported original paper versions and malformed responses fail closed",()=>{
 for(const options of [
  {},{version:0},{version:11},{version:1.5},{version:"1"},
  {version:1,answers:[]},{version:1,answers:null}
 ])expect(()=>review(options)).toThrow();
});
test("all mapped source parts remain unverified without trusted server evidence",()=>{
 const v=9;
 const questions=PAPER2_QUESTION_BANK.filter(q=>q.question_id.endsWith("-v"+v)&&
  /^p2-q(?:10|[1-9])-v(?:10|[1-9])$/.test(q.question_id));
 const m=mapMathematicsPaper2({questions,answers:makeAnswers(v,true)});
 const r=reconcileMarkingCriteria({criteria:m.criteria.map(c=>({
  id:c.id,maxMarks:c.maxMarks
 })),evidence:[]});
 expect(r.maxMarks).toBe(100);
 expect(r.confirmedMarks).toBe(0);
 expect(r.unresolvedMarks).toBe(100);
 expect(r.canPublishFinalScore).toBe(false);
 const publication=preparePaper2ScorePublication({
  subjectId:"mathematics",paperId:"original-v9",
  score:0,maxScore:100,provisional:true,unresolvedMarks:100,
  assessedMarks:null,metadata:{
   spark_scoring_status:"rubric_review_required",
   source_verified:false,rubric_verified:false
  }
 });
 expect(publication.canPublishFinalScore).toBe(false);
 expect(publication.score).toBeNull();
});
