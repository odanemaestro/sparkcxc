import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {auditMathOriginalPapersV2 as audit, auditMathAdvisoryCandidateV2 as auditVote} from "./mathPaper2Batch8AuditV2";
import {evaluateMathExactFractionsV2} from "./mathExactFractionsV2";
import {evaluateMathConsumerArithmeticV2} from "./mathConsumerArithmeticV2";
import {evaluateMathRatioInverseVariationV2} from "./mathRatioInverseVariationV2";
import {evaluateMathIndicesRectangleV2} from "./mathIndicesRectangleV2";
import {evaluateMathFactorisationV2} from "./mathFactorisationV2";
import {evaluateMathSimultaneousV2} from "./mathSimultaneousV2";
import {evaluateMathCoordinateGeometryV2} from "./mathCoordinateGeometryV2";
import {evaluateMathQ1RemainingV2} from "./mathQ1RemainingV2";
import {evaluateMathQ2RemainingV2} from "./mathQ2RemainingV2";
import {evaluateMathEnlargementV2} from "./mathEnlargementV2";
import {evaluateMathRotationV2} from "./mathRotationV2";
import {evaluateMathConstructionV2} from "./mathConstructionV2";
import {evaluateMathFunctionsV2} from "./mathFunctionsV2";
import {evaluateMathCoordinateLinesV2} from "./mathCoordinateLinesV2";
import {evaluateMathParallelPerpendicularV2} from "./mathParallelPerpendicularV2";
import {evaluateMathRelationsV2} from "./mathRelationsV2";
import {evaluateMathQ5V2} from "./mathStatisticsProbabilityV2";
import {evaluateMathQ6V2} from "./mathMensurationTrigonometryV2";
import {evaluateMathPatternsV2} from "./mathPatternsV2";
import {evaluateMathNumberStatementsV2} from "./mathNumberStatementsV2";
import {evaluateMathArithmeticSequencesV2} from "./mathArithmeticSequencesV2";
import {evaluateMathQ8V2} from "./mathQuestion8V2";
import {evaluateMathQ9V2} from "./mathCircleTrigonometryBearingsV2";
import {evaluateMathQ10V2} from "./mathMatricesVectorsV2";
import {reconcileMarkingCriteria} from "./markingReconciliationV2";
import {preparePaper2ScorePublication} from "./scorePublication";

const originals=PAPER2_QUESTION_BANK.filter(q=>/^p2-q(?:10|[1-9])-v(?:10|[1-9])$/.test(q.question_id));
const version=id=>Number(id.split("-v")[1]);
const choose=q=>{
 const n=q.question_number,v=version(q.question_id);
 if(n===1)return v===1?(q.parts[0].id==="a"?evaluateMathExactFractionsV2:evaluateMathConsumerArithmeticV2):
  v<=8?evaluateMathQ1RemainingV2:evaluateMathRatioInverseVariationV2;
 if(n===2)return v<=3?evaluateMathIndicesRectangleV2:
  v<=8?evaluateMathQ2RemainingV2:evaluateMathSimultaneousV2;
 if(n===3)return v<=3?evaluateMathCoordinateGeometryV2:
  v<=6?evaluateMathEnlargementV2:v<=8?evaluateMathRotationV2:
  evaluateMathConstructionV2;
 if(n===4)return v<=3?evaluateMathFunctionsV2:
  v<=6?evaluateMathCoordinateLinesV2:
  v<=8?evaluateMathParallelPerpendicularV2:evaluateMathRelationsV2;
 if(n===5)return evaluateMathQ5V2;
 if(n===6)return evaluateMathQ6V2;
 if(n===7)return v<=5?evaluateMathPatternsV2:
  v<=7?evaluateMathNumberStatementsV2:evaluateMathArithmeticSequencesV2;
 if(n===8)return evaluateMathQ8V2;
 if(n===9)return evaluateMathQ9V2;
 if(n===10)return evaluateMathQ10V2;
 return null;
};
test("Batch 8 protects 100 original templates as ten complete 100-mark assembled papers",()=>{
 const r=audit(PAPER2_QUESTION_BANK);
 expect(r.valid).toBe(true);
 expect(r.issues).toEqual([]);
 expect(r.templates).toBe(100);
 expect(r.papers).toHaveLength(10);
 expect(r.totalSourceMarks).toBe(1000);
 expect(r.papers.map(x=>x.marks)).toEqual(Array(10).fill(100));
 expect(r.papers.every(x=>x.questions.length===10&&x.parts>0)).toBe(true);
 expect(r.examinerRubricApproved).toBe(false);
 expect(r.canPublishFinalScore).toBe(false);
});
test("Batch 8 detects duplicated questions, incorrect part totals, and source drift",()=>{
 const source=originals.find(q=>q.question_id==="p2-q8-v3");
 const altered={...source,parts:source.parts.map(p=>({...p}))};
 altered.parts[0].marks+=1;
 const changed=originals.map(q=>q.question_id===source.question_id?altered:q);
 const auditChanged=audit(changed);
 expect(auditChanged.valid).toBe(false);
 expect(auditChanged.issues).toContain("part-total-mismatch:p2-q8-v3");
 expect(auditChanged.issues).toContain("paper-not-100-marks:v3");
 const duplicated=audit([...originals,source]);
 expect(duplicated.issues).toContain("duplicate-source:p2-q8-v3");
 const dropped=audit(originals.filter(q=>q.question_id!=="p2-q10-v9"));
 expect(dropped.issues).toContain("missing-or-duplicate-question:v9");
 expect(dropped.canPublishFinalScore).toBe(false);
});
test("Batch 8 validates original source answers and mark ceilings, not examiner equivalence",()=>{
 expect(originals).toHaveLength(100);
 for(const q of originals){
  expect(q.parts.every(p=>p.marks>0&&p.prompt&&p.answer)).toBe(true);
  expect(q.parts.reduce((n,p)=>n+p.marks,0)).toBe(q.marks);
 }
});
describe.each(originals)("Batch 8 V2 mark accounting %s",q=>{
 const selected=choose(q);
 test("blank and published worked-answer candidates cannot escape advisory status",()=>{
  for(const p of q.parts){
   const grader=q.question_number===1&&version(q.question_id)===1
    ?(p.id==="a"?evaluateMathExactFractionsV2:evaluateMathConsumerArithmeticV2)
    :q.question_number===2&&version(q.question_id)<=3
    ?(["b1","b2"].includes(p.id)?evaluateMathFactorisationV2:evaluateMathIndicesRectangleV2)
    :selected;
   for(const response of [{answer:""},{answer:p.answer}]){
    const result=grader({questionId:q.question_id,partId:p.id,response});
    const audited=auditVote(result,{
     questionId:q.question_id,partId:p.id,maxMarks:p.marks
    });
    expect(audited.valid).toBe(true);
    expect(audited.issues).toEqual([]);
    expect(audited.offeredMarks).toBe(p.marks);
    expect(audited.candidateMarks+audited.unresolvedMarks).toBe(p.marks);
    expect(audited.canPublishFinalScore).toBe(false);
    expect(result.publishable).toBe(false);
   }
  }
 });
});
test("auditor rejects forged candidate authority, missing evidence and double counting",()=>{
 const original=evaluateMathQ8V2({questionId:"p2-q8-v8",partId:"a",response:{answer:"3.89,-0.39"}});
 const scope={questionId:"p2-q8-v8",partId:"a",maxMarks:5};
 const variants=[
  {...original,authority:"verified",publishable:true},
  {...original,sourcePart:"p2-q8-v9::a"},
  {...original,suggestedMarks:5,unresolvedMarks:0},
  {...original,criteria:[...original.criteria,original.criteria[0]]},
  {...original,criteria:original.criteria.map((c,i)=>i===0?{...c,maxMarks:6}:c)},
  {...original,criteria:original.criteria.map((c,i)=>i===0?{...c,candidateMarks:999}:c)},
  {...original,rubricAllocation:"server-approved"}
 ];
 for(const sample of variants){
  const r=auditVote(sample,scope);
  expect(r.valid).toBe(false);
  expect(r.canPublishFinalScore).toBe(false);
  expect(r.issues.length).toBeGreaterThan(0);
 }
});
test("advisory math candidates cannot be converted to trusted marking consensus",()=>{
 const q=evaluateMathQ6V2({questionId:"p2-q6-v1",partId:"a",response:{answer:"38.5"}});
 const evidence=q.criteria.map((c,i)=>({
  criterionId:c.id,decision:c.candidateMarks?"award":"unresolved",
  marks:c.candidateMarks??0,method:"batch8-advisory-"+i,
  authority:q.authority,evidenceRefs:["math:"+q.sourcePart]
 }));
 const reconciliation=reconcileMarkingCriteria({criteria:q.criteria.map(c=>({
  id:c.id,maxMarks:c.maxMarks
 })),evidence:[...evidence,...evidence.map(e=>({...e,method:e.method+"-clone"}))]});
 expect(reconciliation.canPublishFinalScore).toBe(false);
 expect(reconciliation.confirmedMarks).toBe(0);
 expect(reconciliation.unresolvedMarks).toBe(2);
 const publication=preparePaper2ScorePublication({
  subjectId:"mathematics",paperId:"p2-q6-v1",
  score:q.suggestedMarks,maxScore:9,
  unresolvedMarks:9-q.suggestedMarks,provisional:true,
  metadata:{source_verified:false,rubric_verified:false}
 });
 expect(publication.canPublishFinalScore).toBe(false);
 expect(publication.score).toBeNull();
 expect(publication.metadata.spark_scoring_status).toBe("rubric_review_required");
});
