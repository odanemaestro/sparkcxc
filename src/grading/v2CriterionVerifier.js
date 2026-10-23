/**
 * Evidence-backed V2 criterion verification.
 *
 * Every fixture is graded by the real server examiner, in the context of its
 * whole registered paper, exactly as a submission would be. A criterion is
 * verified only when:
 *   - no fixture receives a RESOLVED mark different from its expected mark
 *     (the examiner may abstain, i.e. leave a mark provisional, but never
 *     publish a wrong one);
 *   - every class the criterion requires is present and its "must resolve"
 *     fixtures did resolve to the expected mark;
 *   - nothing exceeds the criterion maximum.
 */
import {evaluateExistingSubjectPaper2V2} from "./serverPaper2V2SubjectEngine";

export const VERIFIER_VERSION="spark-v2-criterion-verifier-1";

export const FIXTURE_CLASSES=[
 "full","equivalent","partial","incorrect","contradiction","competing",
 "blank","irrelevant","ceiling","keyword-list","follow-through","working"
];
// Classes whose fixtures must resolve to the expected mark (no abstention).
const MUST_RESOLVE=new Set(["full","blank"]);

/** Which classes each criterion must cover. */
export function requiredClasses({maxMarks,kind,allOrNothing=false}){
 const req=["full","blank","irrelevant","incorrect","ceiling"];
 if(maxMarks>=2&&!allOrNothing)req.push("partial");
 if(kind==="written")req.push("contradiction","keyword-list");
 if(kind==="structured")req.push("equivalent","competing");
 // Programs and structured charts: alternative valid forms are required;
 // "competing answers" has no meaning for a whole program.
 if(kind==="program")req.push("equivalent");
 return req;
}

function expectationMet(expect,marks){
 if(typeof expect==="number")return Math.abs(marks-expect)<1e-9;
 if(expect&&typeof expect==="object")
  return marks>=(expect.min??0)-1e-9&&marks<=(expect.max??Infinity)+1e-9;
 return false;
}

/**
 * @param {object} p
 * @param {string} p.subjectId
 * @param {string} p.paperId
 * @param {object[]} p.criteria  the complete registered paper criteria
 * @param {string} p.criterionId
 * @param {"written"|"structured"|"visual"} p.kind
 * @param {object[]} p.fixtures  [{cls, responses|response, expect, mustResolve?, note}]
 */
export function verifyCriterion({subjectId,paperId,criteria,criterionId,kind,fixtures,allOrNothing=false}){
 const criterion=criteria.find(c=>c.id===criterionId);
 if(!criterion)throw new Error("Unknown criterion "+criterionId);
 const maxMarks=criterion.maxMarks;
 const results=[];
 for(const f of fixtures){
  if(!FIXTURE_CLASSES.includes(f.cls))throw new Error("Unknown fixture class "+f.cls);
  const responses=f.responses??{[criterionId]:f.response};
  let row,error=null;
  try{
   const graded=evaluateExistingSubjectPaper2V2({subjectId,paperId,criteria,responses});
   row=graded.rows.find(r=>r.criterionId===criterionId);
   if(!row)throw new Error("Criterion missing from examiner output");
  }catch(e){error=e.message;}
  const marks=row?.suggestedMarks??null,resolved=row?.resolved===true;
  const mustResolve=f.mustResolve??MUST_RESOLVE.has(f.cls);
  const correct=marks!==null&&expectationMet(f.expect,marks);
  const failures=[];
  if(error)failures.push("examiner-error: "+error);
  else{
   if(marks>maxMarks+1e-9||marks<0)failures.push("outside-mark-range");
   if(resolved&&!correct)failures.push("resolved-wrong-mark");
   if(mustResolve&&!resolved)failures.push("required-resolution-missing");
   if(f.mustAbstain===true&&resolved)failures.push("required-abstention-missing");
   if(mustResolve&&resolved&&!correct)failures.push("required-mark-wrong");
  }
  results.push({cls:f.cls,note:f.note??null,expect:f.expect,marks,resolved,
   method:row?.method??null,passed:failures.length===0,failures,
   response:f.response??f.responses});
 }
 const required=requiredClasses({maxMarks,kind,allOrNothing});
 const covered=new Set(results.map(r=>r.cls));
 const missing=required.filter(c=>!covered.has(c));
 // A non-abstaining witness is required for the decisive classes: at least
 // one wrong answer and (multi-mark) one partial answer must be committed.
 const committed=cls=>results.some(r=>r.cls===cls&&r.passed&&r.resolved);
 const uncommitted=["incorrect",...(required.includes("partial")?["partial"]:[]),
  ...(kind==="structured"||kind==="program"?["equivalent"]:[])].filter(c=>covered.has(c)&&!committed(c));
 const failed=results.filter(r=>!r.passed);
 const verified=failed.length===0&&missing.length===0&&uncommitted.length===0;
 const byClass={};
 for(const r of results){
  const b=byClass[r.cls]??={total:0,passed:0,resolved:0,abstained:0};
  b.total++;if(r.passed)b.passed++;if(r.resolved)b.resolved++;else b.abstained++;
 }
 return {criterionId,maxMarks,kind,verified,
  outcome:verified?"verified":"failed",
  missingClasses:missing,uncommittedClasses:uncommitted,
  failures:failed.map(r=>({cls:r.cls,note:r.note,expect:r.expect,marks:r.marks,
   resolved:r.resolved,failures:r.failures})),
  byClass,results,verifierVersion:VERIFIER_VERSION};
}
