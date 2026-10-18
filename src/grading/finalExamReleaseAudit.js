/**
 * SPARK final exam release audit (non-AI).
 *
 * This does not re-mark student work. It checks accounting, response
 * provenance, source verification, and whether a score may be labelled
 * final. An unanswered criterion may earn zero; a criterion that the
 * deterministic marker cannot evaluate may not be silently turned into zero.
 */
import { auditPaper2MarkBounds, PAPER2_GRADING_SUBJECTS } from "./crossCourseGradingRelease";
import { attemptSnapshotHash } from "./attemptProvenance";

export const FINAL_EXAM_RELEASE_AUDIT_VERSION="1.0.0";
const finite=n=>typeof n==="number"&&Number.isFinite(n);
const valid=n=>finite(n)&&n>=0;
const equal=(a,b)=>Math.abs(a-b)<=1e-6;
const unique=rows=>[...new Set(rows)];

export function auditPaper2FinalRelease({
  subjectId,paperId,score,maxMarks,unresolvedMarks=0,
  assessedMarks,provisional=false,parts=[],provenance=null,
  historical=false,sourceVerified=false,rubricVerified=false,
  requireProvenance=true
}={}){
  const issues=[];
  if(!PAPER2_GRADING_SUBJECTS.includes(subjectId))issues.push("unknown-subject");
  if(!paperId)issues.push("missing-paper-id");
  if(!valid(score)||!valid(maxMarks)||maxMarks===0||!valid(unresolvedMarks))
    issues.push("invalid-mark-values");
  else{
    if(score>maxMarks)issues.push("score-exceeds-maximum");
    if(unresolvedMarks>maxMarks)issues.push("unresolved-exceeds-maximum");
    if(score+unresolvedMarks>maxMarks+1e-6)issues.push("confirmed-plus-unresolved-exceeds-total");
  }
  if(unresolvedMarks>0||provisional)issues.push("unresolved-written-credit");
  if(assessedMarks===null)issues.push("not-fully-assessed");
  else if(assessedMarks!==undefined&&(!valid(assessedMarks)||!equal(assessedMarks,score)))
    issues.push("assessed-mark-mismatch");

  if(!Array.isArray(parts))issues.push("invalid-parts");
  else if(parts.length){
    const keys=new Set();let earned=0,offered=0,pending=0;
    for(const [i,part] of parts.entries()){
      const key=String(part?.id??part?.key??i);
      if(keys.has(key))issues.push("duplicate-part-identity");
      keys.add(key);
      const confirmed=part?.confirmedMarks??part?.score??part?.earned??part?.marks;
      const possible=part?.maxMarks??part?.maximum??part?.availableMarks??part?.possible;
      const unknown=part?.unresolvedMarks??part?.unassessedMarks??0;
      if(!valid(confirmed)||!valid(possible)||!valid(unknown)||
        confirmed+unknown>possible+1e-6){
        issues.push("invalid-part-score");
        continue;
      }
      earned+=confirmed;offered+=possible;pending+=unknown;
      if(part?.assessedMarks===null||part?.provisional===true)issues.push("unresolved-part");
      if(part?.assessedMarks!==undefined&&part?.assessedMarks!==null&&
         !equal(part.assessedMarks,confirmed))issues.push("part-assessed-mark-mismatch");
    }
    if(valid(score)&&!equal(earned,score))issues.push("part-total-score-mismatch");
    if(valid(maxMarks)&&!equal(offered,maxMarks))issues.push("part-total-maximum-mismatch");
    if(valid(unresolvedMarks)&&!equal(pending,unresolvedMarks))
      issues.push("part-total-unresolved-mismatch");
  }

  if(historical&&(!sourceVerified||!rubricVerified))issues.push("historical-source-or-rubric-unverified");
  if(requireProvenance){
    if(!provenance||typeof provenance!=="object")
      issues.push("missing-attempt-provenance");
    else{
      if(provenance.subject_id!==subjectId||
          String(provenance.paper)!==String(paperId))issues.push("provenance-paper-mismatch");
      if(provenance.response_snapshot_hash!==attemptSnapshotHash(provenance.response_snapshot))
        issues.push("response-snapshot-hash-mismatch");
      for(const key of ["bank_version","rubric_version","grader_version"]){
        if(!provenance[key]||provenance[key]==="unknown")
          issues.push("missing-"+key.replace(/_/g,"-"));
      }
    }
  }
  const bounds=auditPaper2MarkBounds({subjectId,score,maxMarks,unresolvedMarks,
    provisional,final:!provisional&&!unresolvedMarks});
  issues.push(...bounds.issues);
  return {
    version:FINAL_EXAM_RELEASE_AUDIT_VERSION,subjectId,paperId,
    confirmedMarks:score,unresolvedMarks,maxMarks,
    releaseStatus:issues.length?"requires-review":"verified-final",
    canPublishFinalScore:issues.length===0,
    issues:unique(issues),
    note:"Passing validates the recorded rule-based grading evidence, not examiner equivalence."
  };
}

/** A cross-paper report must not turn one incomplete result into a global pass. */
export function auditFinalExamReleaseSet(reports=[]){
  const issues=[],bySubject={};
  if(!Array.isArray(reports)||!reports.length)issues.push("missing-exam-audits");
  const ids=new Set();
  for(const report of Array.isArray(reports)?reports:[]){
    const subjectId=String(report?.subjectId??""),paperId=String(report?.paperId??"");
    const key=subjectId+":"+paperId;
    if(ids.has(key))issues.push("duplicate-audit-paper");
    ids.add(key);
    if(!bySubject[subjectId])bySubject[subjectId]={audited:0,verified:0,review:0};
    const subject=bySubject[subjectId];subject.audited++;
    if(report?.canPublishFinalScore===true&&Array.isArray(report?.issues)&&!report.issues.length)
      subject.verified++;
    else{subject.review++;issues.push("review-required:"+key);}
  }
  return {version:FINAL_EXAM_RELEASE_AUDIT_VERSION,
    complete:issues.length===0,issues:unique(issues),bySubject,
    verified: Object.values(bySubject).reduce((n,s)=>n+s.verified,0),
    needingReview:Object.values(bySubject).reduce((n,s)=>n+s.review,0)};
}
