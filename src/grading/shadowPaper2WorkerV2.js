/**
 * Batch 4 end-to-end shadow worker. Server-side only.
 * Loads the submitted script and rubric from trusted DB storage.
 * Advisory phrase matches NEVER become verified marks or published grades.
 */
import {createPostgresGradingJobStore} from "./postgresGradingJobStoreV2";
import {createGradingSubmissionRepository} from "./gradingSubmissionRepositoryV2";
import {processGradingJob} from "./gradingJobRunnerV2";
import {suggestSecondPassEvidence} from "./markingSecondPassV2";
import {adjudicateMarkingEvidence} from "./markingAdjudicationV2";
import {evaluateObjectiveCriteria} from "./objectiveMarkingV2";

const nonEmpty=value=>typeof value==="string"&&value.trim().length>0;
export function createShadowPaper2Grader(repository){
 if(typeof repository?.load!=="function")throw new TypeError("Trusted submission repository required");
 return async({attemptId,rubricVersion})=>{
  const submission=await repository.load(attemptId,rubricVersion);
  if(submission.attemptId!==attemptId||submission.rubricVersion!==rubricVersion||
     !nonEmpty(submission.subjectId)||!nonEmpty(submission.paperId))
    throw new Error("Submission identity mismatch");
  if(!Array.isArray(submission.criteria)||!submission.criteria.length||
     !submission.criteria.every(c=>Array.isArray(c.acceptedPhrases)))
    throw new Error("Unconfigured shadow rubric");
  // No trusted marking decisions are generated from text matching.
  const advisory=suggestSecondPassEvidence({
    criteria:submission.criteria,responses:submission.responses
  });
  const objectiveEvidence=evaluateObjectiveCriteria({criteria:submission.criteria,responses:submission.responses});
  const adjudication=adjudicateMarkingEvidence({
    criteria:submission.criteria,evidence:[]
  });
  if(!adjudication.reconciliation)throw new Error("Adjudication failed");
  return {
   reconciliation:adjudication.reconciliation,
   // Suggestions are intentionally not persisted with raw response text.
   advisoryCount:advisory.filter(x=>x.matchedPhrases.length>0).length,
   objectiveCandidateCount:objectiveEvidence.length,
   serverAttested:false
  };
 };
}
export async function runShadowPaper2Job({db,jobId}={}){
 if(typeof db?.query!=="function")throw new TypeError("Trusted DB connection required");
 const store=createPostgresGradingJobStore(db);
 const repository=createGradingSubmissionRepository(db);
 return processGradingJob({
  store,grader:createShadowPaper2Grader(repository),jobId
 });
}
