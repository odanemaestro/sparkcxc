// Complete 15-source academic AUTHORING coverage report.
// Not an academic certification, grading calibration, or course publication.
// The paper-specific references below are trusted server-side code, not
// client-provided markers. Any absent or failed structure blocks readiness.
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {POB_HISTORICAL_FIRST_FIFTEEN} from "./pobHistoricalScoringBatches";
import {POB_2023_JAN_P1_AUTHORED_KEY,verifyPob2023JanP1AuthoredKey} from "./pobHistorical2023JanP1AuthoredKey";
import {POB_2009_MJ_P2_AUTHORED_SCHEME,verifyPob2009MjP2AuthoredScheme} from "./pobHistorical2009MjP2AuthoredScheme";
import {POB_2010_MJ_P2_AUTHORED_SCHEME,verifyPob2010MjP2AuthoredScheme} from "./pobHistorical2010MjP2AuthoredScheme";
import {POB_2011_MJ_P2_AUTHORED_SCHEME,verifyPob2011MjP2AuthoredScheme} from "./pobHistorical2011MjP2AuthoredScheme";
import {POB_2012_MJ_P2_AUTHORED_SCHEME,verifyPob2012MjP2AuthoredScheme} from "./pobHistorical2012MjP2AuthoredScheme";
import {POB_2013_MJ_P2_AUTHORED_SCHEME,verifyPob2013MjP2AuthoredScheme} from "./pobHistorical2013MjP2AuthoredScheme";
import {POB_2014_MJ_P2_AUTHORED_SCHEME,verifyPob2014MjP2AuthoredScheme} from "./pobHistorical2014MjP2AuthoredScheme";
import {POB_2015_MJ_P2_AUTHORED_SCHEME,verifyPob2015MjP2AuthoredScheme} from "./pobHistorical2015MjP2AuthoredScheme";
import {POB_2016_MJ_P2_AUTHORED_SCHEME,verifyPob2016MjP2AuthoredScheme} from "./pobHistorical2016MjP2AuthoredScheme";
import {POB_2017_MJ_P2_AUTHORED_SCHEME,verifyPob2017MjP2AuthoredScheme} from "./pobHistorical2017MjP2AuthoredScheme";
import {POB_2018_MJ_P2_AUTHORED_SCHEME,verifyPob2018MjP2AuthoredScheme} from "./pobHistorical2018MjP2AuthoredScheme";
import {POB_2022_JAN_P2_AUTHORED_SCHEME,verifyPob2022JanP2AuthoredScheme} from "./pobHistorical2022JanP2AuthoredScheme";
import {POB_2022_MJ_P2_AUTHORED_SCHEME,verifyPob2022MjP2AuthoredScheme} from "./pobHistorical2022MjP2AuthoredScheme";
import {POB_2023_JAN_P2_AUTHORED_SCHEME,verifyPob2023JanP2AuthoredScheme} from "./pobHistorical2023JanP2AuthoredScheme";
import {POB_2024_JAN_P2_SPARK_MARKING,verifyPob2024JanP2AuthoredRubric} from "./pobHistorical2024JanP2AuthoredRubric";
const BATCH=Object.freeze([
 [POB_2023_JAN_P1_AUTHORED_KEY,verifyPob2023JanP1AuthoredKey],
 [POB_2009_MJ_P2_AUTHORED_SCHEME,verifyPob2009MjP2AuthoredScheme],
 [POB_2010_MJ_P2_AUTHORED_SCHEME,verifyPob2010MjP2AuthoredScheme],
 [POB_2011_MJ_P2_AUTHORED_SCHEME,verifyPob2011MjP2AuthoredScheme],
 [POB_2012_MJ_P2_AUTHORED_SCHEME,verifyPob2012MjP2AuthoredScheme],
 [POB_2013_MJ_P2_AUTHORED_SCHEME,verifyPob2013MjP2AuthoredScheme],
 [POB_2014_MJ_P2_AUTHORED_SCHEME,verifyPob2014MjP2AuthoredScheme],
 [POB_2015_MJ_P2_AUTHORED_SCHEME,verifyPob2015MjP2AuthoredScheme],
 [POB_2016_MJ_P2_AUTHORED_SCHEME,verifyPob2016MjP2AuthoredScheme],
 [POB_2017_MJ_P2_AUTHORED_SCHEME,verifyPob2017MjP2AuthoredScheme],
 [POB_2018_MJ_P2_AUTHORED_SCHEME,verifyPob2018MjP2AuthoredScheme],
 [POB_2022_JAN_P2_AUTHORED_SCHEME,verifyPob2022JanP2AuthoredScheme],
 [POB_2022_MJ_P2_AUTHORED_SCHEME,verifyPob2022MjP2AuthoredScheme],
 [POB_2023_JAN_P2_AUTHORED_SCHEME,verifyPob2023JanP2AuthoredScheme],
 [POB_2024_JAN_P2_SPARK_MARKING,verifyPob2024JanP2AuthoredRubric],
]);
export function auditPobHistoricalAuthoredBatch01(){
 const issues=[],ids=new Set();
 let paper1=0,paper2=0,authoredParts=0,offeredPaper2Marks=0;
 const summary=[];
 for(const [paper,verify] of BATCH){
  const source=POB_SUPPLIED_ARCHIVE.find(x=>x.id===paper.id);
  const result=verify(paper);
  if(!source||source.sourceSha256!==paper.sourceSha256)
   issues.push("Source digest is missing or wrong: "+paper.id);
  if(!result.valid)issues.push("Academic structural rubric invalid: "+paper.id+": "+(result.errors||result.issues||[]).join("; "));
  if(ids.has(paper.id))issues.push("Repeated source in authored inventory: "+paper.id);
  ids.add(paper.id);
  if(source?.paper===1){
   paper1++;
   if(paper.entries?.length!==60||paper.liveScoringApproved!==false)
    issues.push("P1 authored key is incomplete or wrongly live: "+paper.id);
  }else if(source?.paper===2){
   paper2++;
   const questions=paper.questions||[];
   const offered=questions.reduce((total,q)=>total+
    (q.parts||[]).reduce((sub,p)=>sub+(p.marks||0),0),0);
   const sourceMax=questions.length===7?140:100;
   if(offered!==sourceMax||paper.liveScoringApproved!==false)
    issues.push("Paper 2 authored marks or status invalid: "+paper.id);
   offeredPaper2Marks+=offered;
   authoredParts+=questions.reduce((n,q)=>n+(q.parts?.length||0),0);
  }else issues.push("Source type missing: "+paper.id);
  summary.push({id:paper.id,sha256:paper.sourceSha256,
   passedStructuralValidation:result.valid,
   candidateMaximumMarks:source?.paper===1?60:100,
   liveScoringApproved:false});
 }
 const expected=new Set(POB_HISTORICAL_FIRST_FIFTEEN.map(x=>x.id));
 if(BATCH.length!==15||ids.size!==15||ids.size!==expected.size||
    [...expected].some(id=>!ids.has(id)))issues.push("Not all original batch-1 sources have authored answers.");
 if(paper1!==1||paper2!==14)issues.push("Incorrect batch paper type totals.");
 if(pobReleasedHistoricalPapers().length!==0)
  issues.push("Unverified historical examinations improperly released.");
 return {
  valid:issues.length===0,issues,
  authoredSources:BATCH.length,paper1Authored:paper1,paper2Authored:paper2,
  authoredPaper2Parts:authoredParts,offeredPaper2Marks,
  officialHistoricalKeysSupplied:0,academicCalibrationPassed:0,
  liveScoringReleased:pobReleasedHistoricalPapers().length,
  summaries:summary
 };
}
