/**
 * One complete V2 criterion verification run over every registered paper.
 *
 * For each criterion: load its source-bound fixtures, grade every fixture with
 * the real examiner in full-paper context, and produce an evidence record.
 * Criteria without fixtures, or whose subject has no reviewed resolution
 * policy, are recorded as "blocked" with the precise reason, never approved.
 */
import {verifyCriterion,VERIFIER_VERSION} from "./v2CriterionVerifier";
import {informationTechnologyFixtures} from "./v2Fixtures/informationTechnology";
import {informationTechnologyPaper2RuleFor} from "../informationTechnology/practice/itPaper2Marking";
import itPaper2Archive from "../informationTechnology/practice/itPaper2Data.json";

function itContext(paperId,criterionId){
 const paper=itPaper2Archive.papers.find(p=>p.id===paperId);
 for(const question of paper?.questions||[])for(const part of question.parts)
  if(question.number+"-"+part.id===criterionId)
   return {question,part,rule:informationTechnologyPaper2RuleFor(question,part)};
 return null;
}

/** Returns {kind, fixtures, sourceAnswer, alternatives, ruleId} or {blocked}. */
export function fixturesForCriterion({subjectId,paperId,criterion}){
 if(subjectId==="information-technology"){
  const ctx=itContext(paperId,criterion.id);
  if(!ctx)return {blocked:"criterion-not-found-in-source-archive"};
  const set=informationTechnologyFixtures({...ctx,maxMarks:criterion.maxMarks});
  if(!set)return {blocked:"no-source-fixtures-for-rule:"+ctx.rule};
  return {...set,ruleId:"it:"+ctx.rule};
 }
 return {blocked:"subject-resolution-policy-not-yet-verified"};
}

/**
 * @param {object[]} papers  [{subject_id,paper_id,rubric_version,source_sha256,
 *   criteria,criterionSha:Map}]
 * @param {object} provenance  {bundleSha256, gitCommit, fixtureSha256, ranAt}
 */
export function runV2Verification(papers,provenance){
 const records=[];
 for(const p of papers){
  for(const criterion of p.criteria){
   const base={
    subjectId:p.subject_id,paperId:p.paper_id,rubricVersion:p.rubric_version,
    criterionId:criterion.id,sourceSha256:p.source_sha256,
    criterionSha256:p.criterionSha.get(criterion.id),maxMarks:criterion.maxMarks
   };
   const set=fixturesForCriterion({subjectId:p.subject_id,paperId:p.paper_id,criterion});
   if(set.blocked){
    records.push({...base,outcome:"blocked",blocker:set.blocked,markingRuleId:null,
     verificationMethod:VERIFIER_VERSION,provenance});
    continue;
   }
   const result=verifyCriterion({subjectId:p.subject_id,paperId:p.paper_id,
    criteria:p.criteria,criterionId:criterion.id,kind:set.kind,fixtures:set.fixtures,
    allOrNothing:set.allOrNothing===true});
   const methods=[...new Set(result.results.map(r=>r.method).filter(Boolean))];
   records.push({...base,
    outcome:result.outcome,
    markingRuleId:set.ruleId+"@"+(methods[0]??"unknown"),
    verifiedSourceAnswer:set.sourceAnswer,
    acceptedAlternatives:set.alternatives,
    kind:set.kind,
    testResults:result.byClass,
    failures:result.failures,
    missingClasses:result.missingClasses,
    uncommittedClasses:result.uncommittedClasses,
    cases:result.results.map(r=>({cls:r.cls,expect:r.expect,marks:r.marks,
     resolved:r.resolved,passed:r.passed,note:r.note,response:r.response})),
    verificationMethod:VERIFIER_VERSION+" (automated source-bound fixture matrix, real V2 examiner, full-paper context)",
    provenance});
  }
 }
 return records;
}
