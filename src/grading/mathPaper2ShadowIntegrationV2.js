/**
 * Source-bound SPARK original Mathematics Paper 2 shadow integration.
 * Advisory evidence is NEVER trusted marking evidence or published credit.
 * This module is isolated from the live scorer and has no persistence calls.
 */
import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {mapMathematicsPaper2} from "./paper2RemainingAdaptersV2";
import {auditMathOriginalPapersV2,auditMathAdvisoryCandidateV2} from "./mathPaper2Batch8AuditV2";
import {reconcileMarkingCriteria} from "./markingReconciliationV2";
import {preparePaper2ScorePublication} from "./scorePublication";
import {evaluateMathExactFractionsV2 as q1fraction} from "./mathExactFractionsV2";
import {evaluateMathConsumerArithmeticV2 as q1consumer} from "./mathConsumerArithmeticV2";
import {evaluateMathRatioInverseVariationV2 as q1ratio} from "./mathRatioInverseVariationV2";
import {evaluateMathQ1RemainingV2 as q1other} from "./mathQ1RemainingV2";
import {evaluateMathIndicesRectangleV2 as q2indices} from "./mathIndicesRectangleV2";
import {evaluateMathFactorisationV2 as q2factors} from "./mathFactorisationV2";
import {evaluateMathQ2RemainingV2 as q2other} from "./mathQ2RemainingV2";
import {evaluateMathSimultaneousV2 as q2simultaneous} from "./mathSimultaneousV2";
import {evaluateMathCoordinateGeometryV2 as q3coordinate} from "./mathCoordinateGeometryV2";
import {evaluateMathEnlargementV2 as q3enlarge} from "./mathEnlargementV2";
import {evaluateMathRotationV2 as q3rotate} from "./mathRotationV2";
import {evaluateMathConstructionV2 as q3construct} from "./mathConstructionV2";
import {evaluateMathFunctionsV2 as q4functions} from "./mathFunctionsV2";
import {evaluateMathCoordinateLinesV2 as q4lines} from "./mathCoordinateLinesV2";
import {evaluateMathParallelPerpendicularV2 as q4parallel} from "./mathParallelPerpendicularV2";
import {evaluateMathRelationsV2 as q4relations} from "./mathRelationsV2";
import {evaluateMathQ5V2 as q5} from "./mathStatisticsProbabilityV2";
import {inspectMathQ5CumulativeEvidenceV2 as q5cells} from "./mathQ5CumulativeEvidenceV2";
import {evaluateMathQ6V2 as q6} from "./mathMensurationTrigonometryV2";
import {evaluateMathPatternsV2 as q7patterns} from "./mathPatternsV2";
import {evaluateMathNumberStatementsV2 as q7numbers} from "./mathNumberStatementsV2";
import {evaluateMathArithmeticSequencesV2 as q7sequences} from "./mathArithmeticSequencesV2";
import {evaluateMathQ8V2 as q8} from "./mathQuestion8V2";
import {evaluateMathQ8FollowThroughV2 as q8ft} from "./mathQ8LinearFollowThroughV2";
import {evaluateMathQ9V2 as q9} from "./mathCircleTrigonometryBearingsV2";
import {evaluateMathQ10V2 as q10} from "./mathMatricesVectorsV2";
import {evaluateMathDependentPartAdvisoryV2 as dependent} from "./mathDependentPartAdvisoryV2";

export const MATH_P2_SHADOW_VERSION="math-paper2-shadow-v2-batch9";
const orig=(n,v)=>"p2-q"+n+"-v"+v;
const response=x=>typeof x==="string"?{answer:x}:
 x&&typeof x==="object"&&!Array.isArray(x)?
 {answer:typeof x.answer==="string"?x.answer:"",
  working:typeof x.working==="string"?x.working:""}:{answer:""};
function evaluator(n,v,p){
 if(n===1)return v===1?(p==="a"?q1fraction:q1consumer):v<=8?q1other:q1ratio;
 if(n===2)return v<=3?(p==="b1"||p==="b2"?q2factors:q2indices):
  v<=8?q2other:q2simultaneous;
 if(n===3)return v<=3?q3coordinate:v<=6?q3enlarge:v<=8?q3rotate:q3construct;
 if(n===4)return v<=3?q4functions:v<=6?q4lines:v<=8?q4parallel:q4relations;
 if(n===5)return q5;
 if(n===6)return q6;
 if(n===7)return v<=5?q7patterns:v<=7?q7numbers:q7sequences;
 if(n===8)return q8;
 if(n===9)return q9;
 if(n===10)return q10;
 throw new TypeError("Unknown Mathematics original question");
}
const isCumulative=(id,p)=>(
 (["p2-q5-v4","p2-q5-v5"].includes(id)&&p==="a")||
 (["p2-q5-v1","p2-q5-v2","p2-q5-v3","p2-q5-v10"].includes(id)&&p==="c")
);
export function evaluateMathOriginalPaper2ShadowV2({version,answers={}}={}){
 if(!Number.isInteger(version)||version<1||version>10||
  !answers||typeof answers!=="object"||Array.isArray(answers))
  throw new TypeError("Invalid Mathematics shadow submission");
 const audit=auditMathOriginalPapersV2(PAPER2_QUESTION_BANK);
 if(!audit.valid||audit.templates!==100||audit.totalSourceMarks!==1000)
  throw new Error("Mathematics source inventory failed");
 const questions=Array.from({length:10},(_,i)=>
  PAPER2_QUESTION_BANK.find(q=>q.question_id===orig(i+1,version)));
 if(questions.some(q=>!q))throw new Error("Missing assembled Mathematics source");
 const mapped=mapMathematicsPaper2({questions,answers});
 const reports=[];
 for(const q of questions){
  const n=q.question_number,id=q.question_id;
  const previousResponses=Object.fromEntries(q.parts.map(p=>[
   p.id,response(mapped.responses[id+"::"+p.id])
  ]));
  for(const part of q.parts){
   const p=part.id,opts={
    questionId:id,partId:p,
    response:response(mapped.responses[id+"::"+p]),
    previousResponses,precedingResponses:previousResponses
   };
   const candidate=[6,9,10].includes(n)?dependent(opts):
    n===8&&[6,7].includes(version)&&p==="d"?q8ft(opts):
    evaluator(n,version,p)(opts);
   const valid=auditMathAdvisoryCandidateV2(candidate,{
    questionId:id,partId:p,maxMarks:part.marks
   });
   if(!valid.valid)throw new Error("Invalid advisory part "+id+"::"+p+
    " "+valid.issues.join(","));
   if(candidate.followThrough&&(candidate.followThrough.publishable!==false||
    candidate.followThrough.additiveToScore!==false||
    candidate.followThrough.authority!=="advisory"))
    throw new Error("Untrusted follow-through evidence");
   const cumulative=isCumulative(id,p)?q5cells(opts):null;
   if(cumulative&&(cumulative.suggestedMarks!==0||cumulative.publishable!==false||
    cumulative.additiveToScore!==false))
    throw new Error("Untrusted cumulative-frequency evidence");
   reports.push({
    sourcePart:candidate.sourcePart,maxMarks:part.marks,
    authority:"advisory",publishable:false,
    suggestedMarks:candidate.suggestedMarks,
    unresolvedMarks:candidate.unresolvedMarks,
    rubricAllocation:candidate.rubricAllocation,
    criteria:candidate.criteria,
    followThrough:candidate.followThrough??null,
    cumulativeCellEvidence:cumulative
   });
  }
 }
 const suggested=reports.reduce((n,r)=>n+r.suggestedMarks,0);
 const unresolved=reports.reduce((n,r)=>n+r.unresolvedMarks,0);
 if(suggested+unresolved!==100||
  mapped.criteria.reduce((n,c)=>n+c.maxMarks,0)!==100)
  throw new Error("Mathematics advisory marks do not reconcile");
 // Deliberately empty: no advisory rule can be promoted to a trusted vote.
 const reconciliation=reconcileMarkingCriteria({
  criteria:mapped.criteria.map(c=>({id:c.id,maxMarks:c.maxMarks})),
  evidence:[]
 });
 if(reconciliation.canPublishFinalScore||reconciliation.confirmedMarks!==0||
  reconciliation.unresolvedMarks!==100)
  throw new Error("Shadow marking unexpectedly verified");
 const publication=preparePaper2ScorePublication({
  subjectId:"mathematics",paperId:"original-v"+version,
  score:0,maxScore:100,unresolvedMarks:100,provisional:true,
  assessedMarks:null,parts:reconciliation.parts.map(p=>({
   id:p.id,confirmedMarks:p.awardedMarks,maxMarks:p.maxMarks,
   unresolvedMarks:p.unresolvedMarks,assessedMarks:null,provisional:true
  })),
  // Never trust metadata or verification claims from student responses.
  metadata:{paper:"02",paper_id:"original-v"+version,
   source_verified:false,rubric_verified:false,
   spark_scoring_status:"rubric_review_required"}
 });
 if(publication.canPublishFinalScore||publication.score!==null||
  publication.percent!==null||publication.metadata.assessed_marks!==null)
  throw new Error("Shadow score publication safety violation");
 return {
  version:MATH_P2_SHADOW_VERSION,paperId:"original-v"+version,
  paperMarks:100,questionCount:10,partCount:reports.length,
  sourceStructureValid:true,examinerRubricApproved:false,
  advisory:{suggestedMarks:suggested,unresolvedMarks:unresolved,
   reports,publicationAllowed:false},
  reconciliation,publication,
  finalScore:null,canPublishFinalScore:false
 };
}
