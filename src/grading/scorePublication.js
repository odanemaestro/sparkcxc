/**
 * The sole client-side translation from a Paper 2 grader to a score-publication
 * payload. Confirmed credit is retained as evidence even when full grading is
 * not proven. The final exam release audit is the authority for final labels.
 *
 * Never use zero as a replacement for an unresolved mark.
 */
import { auditPaper2FinalRelease, FINAL_EXAM_RELEASE_AUDIT_VERSION } from "./finalExamReleaseAudit";
import { PAPER2_GRADING_SUBJECTS } from "./crossCourseGradingRelease";

const finite=v=>typeof v==="number"&&Number.isFinite(v);
const firstNumber=(...values)=>values.find(finite)??null;
const normalize=value=>String(value??"").trim().toLowerCase();
const paper2Marker=value=>/^(?:0?2|paper[ _-]*0?2|paper[ _-]*two|p2)$/i.test(String(value??"").trim());
const hasPaper2Key=value=>/(?:paper[ _-]*0?2|p2(?:[:_-]|$))/i.test(String(value??""));

export function isPaper2Activity(activity={}){
 const metadata=activity?.metadata||{};
 const subject=normalize(activity.subjectId??activity.subject_id);
 if(!PAPER2_GRADING_SUBJECTS.includes(subject))return false;
 return paper2Marker(metadata.paper)||paper2Marker(metadata.paper_type)||
   hasPaper2Key(activity.activityKey??activity.activity_key)||
   hasPaper2Key(metadata.source)||hasPaper2Key(metadata.event_type);
}

export function preparePaper2ScorePublication({
 subjectId,paperId,score,maxScore,percent=null,metadata={},
 provenance=null,parts=null,assessedMarks=undefined,
 unresolvedMarks=undefined,provisional=undefined,requireProvenance=true
}={}){
 const original={...metadata};
 const currentProvenance=provenance||original.attempt_provenance||original.attemptProvenance||null;
 const sourceScore=firstNumber(score,original.confirmed_marks,original.confirmedMarks);
 const total=firstNumber(maxScore,original.total_marks,original.max_score);
 const pending=firstNumber(unresolvedMarks,original.unresolved_marks,original.unassessed_marks,0);
 // A grader declaring its result provisional means every unverified point must
 // remain outside the final result, even where its pending breakdown is absent.
 const sourceProvisional=provisional===undefined?
   Boolean(original.provisional||original.provisional_grading||
     original.spark_scoring_status==="rubric_review_required"||
     original.review_recommended):
   Boolean(provisional);
 const effectivePending=sourceProvisional&&pending===0&&finite(total)&&finite(sourceScore)
   ?Math.max(0,total-sourceScore):pending;
 const intendedFinal=assessedMarks!==undefined?assessedMarks:
   original.assessed_marks!==undefined?original.assessed_marks:
   original.spark_scoring_status==="verified"&&!sourceProvisional?sourceScore:null;
 const reportedPaperId=String(currentProvenance?.paper??paperId??original.paper_id??original.paper??"");
 const audit=auditPaper2FinalRelease({
   subjectId,paperId:reportedPaperId,score:sourceScore,maxMarks:total,
   unresolvedMarks:effectivePending,assessedMarks:intendedFinal,
   provisional:sourceProvisional,parts:parts??original.score_parts??[],
   provenance:currentProvenance,
   historical:Boolean(original.historical||/historical/i.test(String(original.source??""))),
   sourceVerified:original.source_verified===true,
   rubricVerified:original.rubric_verified===true,
   requireProvenance
 });
 // An audit with a failed property cannot be interpreted as a passing grade.
 // Permit the *score* to remain in metadata as provisional/confirmed evidence.
 const final=audit.canPublishFinalScore;
 return {
   score:final?sourceScore:null,
   maxScore:total,
   percent:final&&finite(total)&&total>0
     ?(finite(percent)?percent:Math.round(sourceScore/total*100)):null,
   metadata:{
     ...original,
     paper_release_audit_version:FINAL_EXAM_RELEASE_AUDIT_VERSION,
     paper_release_issues:audit.issues,
     paper_release_status:audit.releaseStatus,
     spark_scoring_status:final?"verified":"rubric_review_required",
     provisional:!final,
     confirmed_marks:sourceScore,
     unresolved_marks:effectivePending,
     assessed_marks:final?sourceScore:null,
   },
   audit,
   canPublishFinalScore:final
 };
}

export function preparePaper2SubjectActivity(activity){
 if(!isPaper2Activity(activity))return activity;
 const subjectId=normalize(activity.subjectId??activity.subject_id);
 const metadata=activity.metadata||{};
 const verified=preparePaper2ScorePublication({
   subjectId,
   paperId:metadata.paper_id||metadata.paper||activity.activityKey,
   score:activity.score,
   maxScore:activity.maxScore??activity.max_score,
   percent:activity.percent,
   metadata
 });
 return {...activity,score:verified.score,maxScore:verified.maxScore,percent:verified.percent,
   metadata:verified.metadata};
}
