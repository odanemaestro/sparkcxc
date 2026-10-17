// The entire owner-supplied 46-PDF POB archive in ONE read-only,
 // development-only authorship audit. Authored does not mean CXC-verified,
 // scorer-calibrated, or live student-ready.
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {auditPobHistoricalAuthoredBatch01} from "./pobHistoricalAuthoredBatch01Audit";
import {auditPobHistoricalBatch02AnswerAuthorship} from "./pobHistoricalBatch02AuthoredAudit";
import {auditPobHistoricalBatch03AuthoredBanks} from "./pobHistoricalBatch03AuthoredBanksAudit";
import {POB_2026_JAN_P2_AUTHORED_SCHEME,verifyPob2026JanP2AuthoredScheme} from "./pobHistorical2026JanP2AuthoredScheme";
import {POB_HISTORICAL_SCORING_BATCHES} from "./pobHistoricalScoringBatches";

export function auditPobCompleteHistoricalAuthoring(){
 const a=auditPobHistoricalAuthoredBatch01();
 const b=auditPobHistoricalBatch02AnswerAuthorship();
 const c=auditPobHistoricalBatch03AuthoredBanks();
 const d=verifyPob2026JanP2AuthoredScheme();
 const issues=[];
 if(!a.valid)issues.push("Batch one structural evidence failed: "+a.issues.join("; "));
 if(!b.valid)issues.push("Batch two source evidence failed: "+b.issues.join("; "));
 if(!c.valid)issues.push("Batch three mark evidence failed: "+c.issues.join("; "));
 if(!d.valid)issues.push("Batch four 2026 source/rubric failed: "+d.issues.join("; "));
 const allIds=POB_HISTORICAL_SCORING_BATCHES.flat().map(row=>row.id);
 if(allIds.length!==46||new Set(allIds).size!==46||
   POB_SUPPLIED_ARCHIVE.length!==46||
   POB_SUPPLIED_ARCHIVE.some(source=>!allIds.includes(source.id)))
  issues.push("Approved 46-PDF archive source identity count inconsistent.");
 const sourceCount=a.authoredSources+b.sourcesWithAuthoredMaterial+c.authoredSources+1;
 if(sourceCount!==46)issues.push("Not all owner-approved PDFs have SPARK-authored materials.");
 const paper1Count=a.paper1Authored+b.authoredPaper1SourceCount+1+c.authoredPaper1;
 // Batch two's 14th P1 is the user-supplied 2018 incomplete 55-item source.
 const paper2Count=a.paper2Authored+1+c.authoredPaper2+1;
 if(paper1Count!==20||paper2Count!==26)
  issues.push("Genuine Paper 1 and Paper 2 classifications differ from 20/26.");
 const knownSourceMissing=Object.freeze([
  Object.freeze({id:"POB-P1-2018-MJ",missingOriginalQuestionNumbers:Object.freeze([53,54,55,56,57]),
    reason:"Source original scan jumps directly from Q52 on physical page 8 to Q58 on physical page 9.",
    liveScoringApproved:false})
 ]);
 if(b.missing2018OriginalQuestionNumbers?.join(",")!=="53,54,55,56,57"||
    b.authored2018PartialMcqs!==55)
  issues.push("2018 original five missing questions are not preserved as unanswerable placeholders.");
 const authoredSourceBackedMcqAnswers=60+b.authoredQuestions+b.authored2018PartialMcqs+c.authoredMcqSlots;
 if(authoredSourceBackedMcqAnswers!==1195)
  issues.push("The original 1,200 MCQ slots must retain five missing 2018 source questions.");
 const live=pobReleasedHistoricalPapers().length;
 if(live!==0)issues.push("Historical scoring must be kept disabled until academic and secure grading QA.");
 return Object.freeze({
  valid:issues.length===0,issues,
  sourceCount,originalPdfCount:46,
  historicalPaper1Count:paper1Count,historicalPaper2Count:paper2Count,
  offeredMcqQuestionSlots:1200,authoredSourceBackedMcqAnswers,
  missingOriginalMcqCount:5,
  historicalPaper2RubricSources:paper2Count,
  lastPaperId:POB_2026_JAN_P2_AUTHORED_SCHEME.id,
  lastPaperAuthoredPartCount:d.partCount,lastPaperOfferedMarks:d.offeredMarks,
  incompleteOriginalSourceFiles:1,knownSourceMissing,
  officialCxcKeyStatus:"SPARK-authored models, not a CXC-certified answer key",
  academicAnswerAdjudicationComplete:false,
  secureSemanticScoringCalibrated:false,
  liveScoringReleased:live
 });
}
