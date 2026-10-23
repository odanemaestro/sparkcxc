import {readServerExamV2Result,submitServerExamAttempt} from "../../../grading/serverExamAttempt";

/** A submitted server attempt is not enough: the queue's owner-scoped RPC
 * must acknowledge the job before we display "being marked". In particular,
 * 'not-eligible' means submission succeeded but the V2 queue did not accept it.
 * Repeating a submitted attempt cannot re-enqueue it; it needs investigation.
 */
const QUEUED_STATUSES=new Set(["queued","running","retry","verified","provisional","failed"]);

export async function confirmPhysicsV2Submission({
 supabase,attemptId,paperId,responses,maxMarks,provenance,timedOut=false,
 checkOnly=false
}={}){
 if(!supabase?.rpc||!attemptId)return {status:"unavailable"};
 if(!checkOnly){
  const ack=await submitServerExamAttempt({
   supabase,attemptId,responses,score:null,maxScore:maxMarks,
   metadata:{subject:"physics",paper:"02",paper_id:paperId,
    client_timed_out:Boolean(timedOut),spark_scoring_status:"rubric_review_required",
    attempt_provenance:provenance}
  });
  if(!ack?.available||String(ack.attempt_id??ack.attemptId??"")!==String(attemptId)
    ||!ack.submitted_at)return {status:"failed"};
 }
 const state=await readServerExamV2Result({supabase,attemptId});
 if(!state?.available)return {status:"checking"};
 if(String(state.attemptId??"")!==String(attemptId))return {status:"checking"};
 if(state.status==="not-eligible")return {status:"not-eligible"};
 if(QUEUED_STATUSES.has(state.status))return {status:"confirmed",result:state};
 return {status:"checking"};
}
