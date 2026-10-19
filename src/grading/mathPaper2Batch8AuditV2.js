/**
 * Mathematics Paper 2 V2 cross-question audit.
 *
 * Verifies the learner-facing ORIGINAL ten-paper / 100-template inventory,
 * immutable paper/part ceilings and conservative advisory-candidate accounting.
 * These are quality gates, NOT examiner sign-off or scoring authority.
 */
export const MATH_P2_BATCH8_AUDIT_VERSION="math-p2-batch8-1";
const idPattern=/^p2-q(10|[1-9])-v(10|[1-9])$/;
const integer=n=>typeof n==="number"&&Number.isSafeInteger(n);
const issue=(issues,reason,ref)=>issues.push(ref?reason+":"+ref:reason);
export function auditMathOriginalPapersV2(questionBank=[]){
 const issues=[],seen=new Set(),papers=new Map();
 if(!Array.isArray(questionBank)){issue(issues,"invalid-bank");return {
  version:MATH_P2_BATCH8_AUDIT_VERSION,valid:false,issues,papers:[],
  templates:0,parts:0,totalSourceMarks:0};}
 for(const q of questionBank){
  const matched=idPattern.exec(String(q?.question_id??""));
  if(!matched)continue; // E-J and other papers must not pollute this audit.
  const number=Number(matched[1]),version=Number(matched[2]);
  const id=q.question_id;
  if(seen.has(id))issue(issues,"duplicate-source",id);
  seen.add(id);
  if(q.question_number!==number)issue(issues,"wrong-question-number",id);
  const expected=number===7?10:number>=8?12:9;
  if(q.marks!==expected)issue(issues,"wrong-question-mark-ceiling",id);
  if(!Array.isArray(q.parts)||!q.parts.length){
   issue(issues,"empty-parts",id);continue;
  }
  let total=0;
  const partIds=new Set();
  for(const p of q.parts){
   const key=id+"::"+String(p?.id??"");
   if(!p?.id||partIds.has(p.id))issue(issues,"duplicate-or-missing-part",key);
   partIds.add(p?.id);
   if(!integer(p?.marks)||p.marks<=0)issue(issues,"invalid-part-marks",key);
   else total+=p.marks;
   if(!p?.prompt||typeof p.prompt!=="string")issue(issues,"missing-part-prompt",key);
   if(typeof p?.answer!=="string"||!p.answer.trim())
    issue(issues,"missing-part-source-answer",key);
   if(p?.criteria!==undefined){
    if(!Array.isArray(p.criteria))issue(issues,"invalid-authored-criteria",key);
    else{
     const sum=p.criteria.reduce((n,c)=>n+Number(c?.marks??0),0);
     if(p.criteria.some(c=>!integer(c?.marks)||c.marks<=0)||sum!==p.marks)
      issue(issues,"authored-criteria-marks-mismatch",key);
    }
   }
  }
  if(total!==expected)issue(issues,"part-total-mismatch",id);
  const row=papers.get(version)??{version,questions:[],marks:0,parts:0};
  row.questions.push(number);row.marks+=total;row.parts+=q.parts.length;
  papers.set(version,row);
 }
 for(let version=1;version<=10;version++){
  const p=papers.get(version);
  if(!p){issue(issues,"missing-original-paper","v"+version);continue;}
  if(p.questions.length!==10||new Set(p.questions).size!==10||
   !Array.from({length:10},(_,i)=>i+1).every(n=>p.questions.includes(n)))
   issue(issues,"missing-or-duplicate-question","v"+version);
  if(p.marks!==100)issue(issues,"paper-not-100-marks","v"+version);
 }
 const rows=[...papers.values()].sort((a,b)=>a.version-b.version);
 return {version:MATH_P2_BATCH8_AUDIT_VERSION,valid:issues.length===0,
  issues,papers:rows,templates:seen.size,
  parts:rows.reduce((n,p)=>n+p.parts,0),
  totalSourceMarks:rows.reduce((n,p)=>n+p.marks,0),
  // A structurally valid question bank does not prove an examiner-grade rubric.
  examinerRubricApproved:false,canPublishFinalScore:false};
}
export function auditMathAdvisoryCandidateV2(report,{questionId,partId,maxMarks}={}){
 const issues=[],source=questionId+"::"+partId;
 if(!questionId||!partId||!integer(maxMarks)||maxMarks<=0)
  issue(issues,"invalid-audit-scope");
 if(report?.sourcePart!==source)issue(issues,"source-identity-mismatch");
 if(report?.authority!=="advisory"||report?.publishable!==false)
  issue(issues,"unexpected-score-authority");
 if(!Array.isArray(report?.criteria)||!report.criteria.length)
  issue(issues,"missing-criteria");
 let earned=0,unresolved=0,offered=0;
 const ids=new Set();
 for(const c of Array.isArray(report?.criteria)?report.criteria:[]){
  if(!c?.id||ids.has(c.id))issue(issues,"duplicate-or-invalid-criterion");
  ids.add(c?.id);
  if(!integer(c?.maxMarks)||c.maxMarks<=0){
   issue(issues,"invalid-criterion-ceiling");continue;
  }
  offered+=c.maxMarks;
  if(c.candidateMarks===null){
   unresolved+=c.maxMarks;
   if(c.status!=="unresolved")issue(issues,"missing-unresolved-status");
  }else if(integer(c.candidateMarks)&&c.candidateMarks>=0&&
    c.candidateMarks<=c.maxMarks){
   earned+=c.candidateMarks;
   // This review uses only non-null award proposals. No zero is a denial.
   if(c.status!=="candidate-correct")issue(issues,"unexpected-candidate-status");
  }else issue(issues,"invalid-candidate-marks");
 }
 if(offered!==maxMarks)issue(issues,"criterion-ceiling-mismatch");
 if(report?.suggestedMarks!==earned)issue(issues,"candidate-total-mismatch");
 if(report?.unresolvedMarks!==unresolved)issue(issues,"unresolved-total-mismatch");
 if(earned+unresolved!==maxMarks)issue(issues,"unreconciled-part-budget");
 if(!report?.rubricAllocation||
   !["proposed-from-worked-solution","authored","authored-reasoning-criteria"].includes(report.rubricAllocation))
  issue(issues,"missing-rubric-provenance");
 return {version:MATH_P2_BATCH8_AUDIT_VERSION,
  valid:issues.length===0,issues,sourcePart:source,
  offeredMarks:offered,candidateMarks:earned,unresolvedMarks:unresolved,
  // This function certifies only bookkeeping, never a final mark.
  canPublishFinalScore:false,examinerRubricApproved:false};
}
