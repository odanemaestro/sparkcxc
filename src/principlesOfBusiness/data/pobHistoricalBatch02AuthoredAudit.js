// Academic key authoring progress, not production score readiness.
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {POB_HISTORICAL_SCORING_BATCHES} from "./pobHistoricalScoringBatches";
import {POB_2002_MJ_P1_AUTHORED_KEY,verifyPob2002MjP1AuthoredKey} from "./pobHistorical2002MjP1AuthoredKey";
import {POB_2003_MJ_P1_AUTHORED_KEY,verifyPob2003MjP1AuthoredKey} from "./pobHistorical2003MjP1AuthoredKey";
import {POB_2004_MJ_P1_AUTHORED_KEY,verifyPob2004MjP1AuthoredKey} from "./pobHistorical2004MjP1AuthoredKey";
import {POB_2005_MJ_P1_AUTHORED_KEY,verifyPob2005MjP1AuthoredKey} from "./pobHistorical2005MjP1AuthoredKey";
import {POB_2008_MJ_P1_AUTHORED_KEY,verifyPob2008MjP1AuthoredKey} from "./pobHistorical2008MjP1AuthoredKey";
import {POB_2006_MJ_P1_AUTHORED_KEY,verifyPob2006MjP1AuthoredKey} from "./pobHistorical2006MjP1AuthoredKey";
import {POB_2007_MJ_P1_AUTHORED_KEY,verifyPob2007MjP1AuthoredKey} from "./pobHistorical2007MjP1AuthoredKey";
import {POB_2011_MJ_P1_AUTHORED_KEY,verifyPob2011MjP1AuthoredKey} from "./pobHistorical2011MjP1AuthoredKey";
import {POB_2012_MJ_P1_AUTHORED_KEY,auditPob2012MjP1AuthorKey} from "./pobHistorical2012MjP1AuthoredKey";
import {POB_2014_MJ_P1_AUTHORED_KEY,validatePob2014MjP1AuthoredKey} from "./pobHistorical2014MjP1AuthoredKey";
import {POB_2015_MJ_P1_AUTHORED_KEY,verifyPob2015MjP1AuthoredKey} from "./pobHistorical2015MjP1AuthoredKey";
import {POB_2016_MJ_P1_AUTHORED_KEY,verifyPob2016MjP1AuthoredKey} from "./pobHistorical2016MjP1AuthoredKey";
import {POB_2018_MJ_P1_AUTHORED_KEY,verifyPob2018MjP1AuthoredKey} from "./pobHistorical2018MjP1AuthoredKey";
import {POB_2019_MJ_ALT_P2_AUTHORED_SCHEME,verifyPob2019MjAltP2AuthoredScheme} from "./pobHistorical2019MjAltP2AuthoredScheme";
import {POB_2017_MJ_P1_AUTHORED_KEY,verifyPob2017MjP1AuthoredKey} from "./pobHistorical2017MjP1AuthoredKey";

const AUTHORED=Object.freeze([
 [POB_2002_MJ_P1_AUTHORED_KEY,verifyPob2002MjP1AuthoredKey],
 [POB_2003_MJ_P1_AUTHORED_KEY,verifyPob2003MjP1AuthoredKey],
 [POB_2004_MJ_P1_AUTHORED_KEY,verifyPob2004MjP1AuthoredKey],
 [POB_2005_MJ_P1_AUTHORED_KEY,verifyPob2005MjP1AuthoredKey],
 [POB_2006_MJ_P1_AUTHORED_KEY,verifyPob2006MjP1AuthoredKey],
 [POB_2007_MJ_P1_AUTHORED_KEY,verifyPob2007MjP1AuthoredKey],
 [POB_2008_MJ_P1_AUTHORED_KEY,verifyPob2008MjP1AuthoredKey],
 [POB_2011_MJ_P1_AUTHORED_KEY,verifyPob2011MjP1AuthoredKey],
 [POB_2012_MJ_P1_AUTHORED_KEY,auditPob2012MjP1AuthorKey],
 [POB_2014_MJ_P1_AUTHORED_KEY,validatePob2014MjP1AuthoredKey],
 [POB_2015_MJ_P1_AUTHORED_KEY,verifyPob2015MjP1AuthoredKey],
 [POB_2016_MJ_P1_AUTHORED_KEY,verifyPob2016MjP1AuthoredKey],
 [POB_2017_MJ_P1_AUTHORED_KEY,verifyPob2017MjP1AuthoredKey],
]);
export const POB_HISTORICAL_BATCH02_AUTHORED=AUTHORED;
export const POB_HISTORICAL_BATCH02_PARTIAL_SOURCE=POB_2018_MJ_P1_AUTHORED_KEY;
export const POB_HISTORICAL_BATCH02_PAPER2_SCHEME=POB_2019_MJ_ALT_P2_AUTHORED_SCHEME;
export function auditPobHistoricalBatch02AnswerAuthorship(){
 const sourceIds=new Set(POB_HISTORICAL_SCORING_BATCHES[1].map(s=>s.id));
 const uniqueIds=new Set(),issues=[],status=[];
 for(const [key,validate] of AUTHORED){
  const source=POB_SUPPLIED_ARCHIVE.find(r=>r.id===key.id);
  const report=validate(key);
  if(!source||source.sourceSha256!==key.sourceSha256||source.paper!==1||!sourceIds.has(key.id))
   issues.push("Unapproved source or incorrect paper identity: "+key.id);
  if(uniqueIds.has(key.id))issues.push("Duplicate authored key "+key.id);
  uniqueIds.add(key.id);
  if(report.valid!==true)issues.push("Incomplete answer model "+key.id+": "+(report.issues||report.problems||[]).join("; "));
  if(key.liveScoringApproved!==false)
   issues.push("An unverified Paper 1 key was prematurely enabled: "+key.id);
  const candidates=key.proposedEntries||key.questions||key.entries||[];
  if(candidates.length!==60)issues.push("Exactly sixty answer explanations must exist: "+key.id);
  status.push(Object.freeze({
   sourceId:key.id,sourceSha256:key.sourceSha256,
   internallyAuthoredCount:candidates.length,
   disputedQuestions:Array.isArray(report.disputedNumbers)?report.disputedNumbers:
    Array.isArray(report.disputes)?report.disputes:
    Array.isArray(report.disputed)?report.disputed:[],
   structurallyComplete:report.valid===true,
   sourceTranscriptionAndAcademicCalibrationComplete:false,
   liveScoringApproved:false
  }));
 }
 // The 2018 supplied PDF is visibly incomplete: Q53-57 do not exist.
 const partial=verifyPob2018MjP1AuthoredKey(POB_2018_MJ_P1_AUTHORED_KEY);
 const orig18=POB_SUPPLIED_ARCHIVE.find(s=>s.id===POB_2018_MJ_P1_AUTHORED_KEY.id);
 if(!partial.valid||orig18?.sourceSha256!==POB_2018_MJ_P1_AUTHORED_KEY.sourceSha256||
    partial.missing.join(",")!=="53,54,55,56,57")
  issues.push("Original 2018 scan Q53-57 missing-page evidence has been compromised.");
 uniqueIds.add(POB_2018_MJ_P1_AUTHORED_KEY.id);
 status.push(Object.freeze({
  sourceId:POB_2018_MJ_P1_AUTHORED_KEY.id,
  sourceSha256:POB_2018_MJ_P1_AUTHORED_KEY.sourceSha256,
  internallyAuthoredCount:partial.authored,missingOriginalQuestions:[...partial.missing],
  structurallyComplete:false,sourceTranscriptionAndAcademicCalibrationComplete:false,
  liveScoringApproved:false
 }));
 // The misnamed 2019 source is the genuine FIVE-question Paper 02.
 const p2=verifyPob2019MjAltP2AuthoredScheme(POB_2019_MJ_ALT_P2_AUTHORED_SCHEME);
 const orig19=POB_SUPPLIED_ARCHIVE.find(s=>s.id===POB_2019_MJ_ALT_P2_AUTHORED_SCHEME.id);
 if(!p2.valid||orig19?.paper!==2||
    orig19?.sourceSha256!==POB_2019_MJ_ALT_P2_AUTHORED_SCHEME.sourceSha256)
  issues.push("The mislabelled 2019 May/June Paper 02 100-mark rubric failed integrity checks.");
 uniqueIds.add(POB_2019_MJ_ALT_P2_AUTHORED_SCHEME.id);
 status.push(Object.freeze({
  sourceId:POB_2019_MJ_ALT_P2_AUTHORED_SCHEME.id,
  sourceSha256:POB_2019_MJ_ALT_P2_AUTHORED_SCHEME.sourceSha256,
  internallyAuthoredCount:p2.parts,sourceQuestionCount:5,offeredMarks:p2.marks,
  structurallyComplete:p2.valid,sourceTranscriptionAndAcademicCalibrationComplete:false,
  liveScoringApproved:false
 }));
 if(uniqueIds.size!==15)issues.push("One or more of the fifteen original batch sources is missing/duplicated.");
 if(POB_HISTORICAL_SCORING_BATCHES[1].length!==15)issues.push("Expected 15 original source PDFs.");
 if(pobReleasedHistoricalPapers().length!==0)issues.push("Historical scoring unexpectedly enabled.");
 return {
  valid:issues.length===0,issues,
  totalBatchSources:15,
  authoredPaper1SourceCount:AUTHORED.length,
  authoredQuestions:AUTHORED.length*60,
  authored2018PartialMcqs:partial.authored,
  missing2018OriginalQuestionNumbers:[...partial.missing],
  authored2019AltPaper2RubricParts:p2.parts,
  authored2019AltPaper2RubricMarks:p2.marks,
  sourcesWithAuthoredMaterial:AUTHORED.length+2,
  completedOriginalSourceQuestionSets:AUTHORED.length+1,
  incompleteOriginalSourceFiles:1,
  remainingBatchSources:15-(AUTHORED.length+2),
  historicalLiveScoringEnabled:0,
  status:Object.freeze(status)
 };
}
