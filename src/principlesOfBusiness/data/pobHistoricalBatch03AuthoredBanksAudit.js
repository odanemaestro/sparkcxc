// Batch 3 COMPLETE authored marking inventory for 15/15 source PDFs.
// Covers 5 x Paper 01 (300 source MCQ slots) and 10 x Paper 02 (100 marks
// candidate max each, 1220 marks across all offered source questions).
// Valid STRUCTURE is not a live key, completed source transcriptions,
// independently confirmed CXC official key, or trained/calibrated grader.
// This audit never sets publication flags.
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {POB_HISTORICAL_BATCH03_SOURCE_QA} from "./pobHistoricalBatch03SourceAudit";
import {POB_2020_JAN_P1_AUTHORED_KEY,verifyPob2020JanP1AuthoredKey} from "./pobHistorical2020JanP1AuthoredKey";
import {POB_2020_MJ_P1_AUTHORED_KEY,verifyPob2020MjP1AuthoredKey} from "./pobHistorical2020MjP1AuthoredKey";
import {POB_2021_MJ_P1_AUTHORED_KEY,verifyPob2021MjP1AuthoredKey} from "./pobHistorical2021MjP1AuthoredKey";
import {POB_2022_JAN_P1_AUTHORED_KEY,verifyPob2022JanP1AuthoredKey} from "./pobHistorical2022JanP1AuthoredKey";
import {POB_2024_MJ_P1_AUTHORED_KEY,verifyPob2024MjP1AuthoredKey} from "./pobHistorical2024MjP1AuthoredKey";
import {POB_2005_MJ_P2_AUTHORED_SCHEME,verifyPob2005MjP2AuthoredScheme} from "./pobHistorical2005MjP2AuthoredScheme";
import {POB_2006_MJ_P2_AUTHORED_SCHEME,verifyPob2006MjP2AuthoredScheme} from "./pobHistorical2006MjP2AuthoredScheme";
import {POB_2007_MJ_P2_AUTHORED_SCHEME,verifyPob2007MjP2AuthoredScheme} from "./pobHistorical2007MjP2AuthoredScheme";
import {POB_2008_MJ_P2_AUTHORED_SCHEME,verifyPob2008MjP2AuthoredScheme} from "./pobHistorical2008MjP2AuthoredScheme";
import {POB_2019_JAN_P2_AUTHORED_SCHEME,verifyPob2019JanP2AuthoredScheme} from "./pobHistorical2019JanP2AuthoredScheme";
import {POB_2019_MJ_P2_AUTHORED_SCHEME,verifyPob2019MjP2AuthoredScheme} from "./pobHistorical2019MjP2AuthoredScheme";
import {POB_2021_MJ_P2_AUTHORED_SCHEME,verifyPob2021MjP2AuthoredScheme} from "./pobHistorical2021MjP2AuthoredScheme";
import {POB_2023_MJ_P2_AUTHORED_SCHEME,verifyPob2023MjP2AuthoredScheme} from "./pobHistorical2023MjP2AuthoredScheme";
import {POB_2024_MJ_P2_AUTHORED_SCHEME,verifyPob2024MjP2AuthoredScheme} from "./pobHistorical2024MjP2AuthoredScheme";
import {POB_2025_JAN_P2_AUTHORED_SCHEME,verifyPob2025JanP2AuthoredScheme} from "./pobHistorical2025JanP2AuthoredScheme";
const BANKS=Object.freeze([
 ["POB-P1-2020-JAN",POB_2020_JAN_P1_AUTHORED_KEY,verifyPob2020JanP1AuthoredKey],
 ["POB-P1-2020-MJ",POB_2020_MJ_P1_AUTHORED_KEY,verifyPob2020MjP1AuthoredKey],
 ["POB-P1-2021-MJ",POB_2021_MJ_P1_AUTHORED_KEY,verifyPob2021MjP1AuthoredKey],
 ["POB-P1-2022-JAN",POB_2022_JAN_P1_AUTHORED_KEY,verifyPob2022JanP1AuthoredKey],
 ["POB-P1-2024-MJ",POB_2024_MJ_P1_AUTHORED_KEY,verifyPob2024MjP1AuthoredKey],
 ["POB-P2-2005-MJ",POB_2005_MJ_P2_AUTHORED_SCHEME,verifyPob2005MjP2AuthoredScheme],
 ["POB-P2-2006-MJ",POB_2006_MJ_P2_AUTHORED_SCHEME,verifyPob2006MjP2AuthoredScheme],
 ["POB-P2-2007-MJ",POB_2007_MJ_P2_AUTHORED_SCHEME,verifyPob2007MjP2AuthoredScheme],
 ["POB-P2-2008-MJ",POB_2008_MJ_P2_AUTHORED_SCHEME,verifyPob2008MjP2AuthoredScheme],
 ["POB-P2-2019-JAN",POB_2019_JAN_P2_AUTHORED_SCHEME,verifyPob2019JanP2AuthoredScheme],
 ["POB-P2-2019-MJ",POB_2019_MJ_P2_AUTHORED_SCHEME,verifyPob2019MjP2AuthoredScheme],
 ["POB-P2-2021-MJ",POB_2021_MJ_P2_AUTHORED_SCHEME,verifyPob2021MjP2AuthoredScheme],
 ["POB-P2-2023-MJ",POB_2023_MJ_P2_AUTHORED_SCHEME,verifyPob2023MjP2AuthoredScheme],
 ["POB-P2-2024-MJ",POB_2024_MJ_P2_AUTHORED_SCHEME,verifyPob2024MjP2AuthoredScheme],
 ["POB-P2-2025-JAN",POB_2025_JAN_P2_AUTHORED_SCHEME,verifyPob2025JanP2AuthoredScheme],
]);
export const POB_HISTORICAL_BATCH03_AUTHORED_BANK_COUNT=BANKS.length;
export function auditPobHistoricalBatch03AuthoredBanks(){
 const issues=[],seen=new Set(),reports=[];let p1=0,p2=0,mcqs=0,p2Parts=0,offeredP2=0;
 const allowed=new Set(POB_HISTORICAL_BATCH03_SOURCE_QA.map(s=>s.id));
 for(const [id,bank,verify] of BANKS){
  const trusted=POB_SUPPLIED_ARCHIVE.find(x=>x.id===id);
  const result=verify(bank);
  if(!result?.valid)issues.push("Failed academic STRUCTURAL validation: "+id+" "+JSON.stringify(result));
  if(seen.has(id)||!allowed.has(id)||!trusted||bank.id!==id||
     trusted.paper!==bank.paper||trusted.sourceSha256!==bank.sourceSha256)
   issues.push("Unmatched, repeated or changed source: "+id);
  seen.add(id);
  if(bank.liveScoringApproved!==false)
   issues.push("Historical grade improperly marked for live use: "+id);
  let assessed=0,offered=0,disputed=[];
  if(bank.paper===1){
   p1++;mcqs+=bank.entries?.length||0;
   if(bank.entries?.length!==60)issues.push("Incomplete 60-question source: "+id);
   const questions=new Set(bank.entries.map(q=>q.number));
   if(questions.size!==60)issues.push("Not sixty unique MCQ slots: "+id);
   disputed=bank.entries.filter(q=>q.status==="academic-dispute"||q.academicStatus==="disputed").map(q=>q.number);
   assessed=bank.entries?.length||0;offered=60;
  }else if(bank.paper===2){
   p2++;assessed=bank.questions.reduce((n,q)=>n+q.parts.length,0);
   offered=bank.questions.reduce((n,q)=>n+q.parts.reduce((m,p)=>m+p.marks,0),0);
   p2Parts+=assessed;offeredP2+=offered;
   if(offered!==(bank.year<=2007?160:bank.year===2008?140:100))
    issues.push("Wrong year-specific offered marks: "+id);
  }else issues.push("Unknown paper class: "+id);
  reports.push({id,paper:bank.paper,sourceSha256:bank.sourceSha256,assessedParts:assessed,offeredMarks:offered,
   disputedQuestionNumbers:disputed,liveScoringApproved:false,structuralChecksPassed:result.valid});
 }
 if(BANKS.length!==15||seen.size!==15||[...allowed].some(id=>!seen.has(id)))
  issues.push("Not all original batch-3 fifteen source files have authored banks.");
 if(p1!==5||p2!==10||mcqs!==300||offeredP2!==1220)
  issues.push("Batch 3 P1/P2 counts, MCQ slots or offered marks inconsistent.");
 const released=pobReleasedHistoricalPapers().length;
 if(released!==0)issues.push("Unreviewed historic papers were made live.");
 return {valid:issues.length===0,issues,authoredSources:BANKS.length,
  authoredPaper1:p1,authoredPaper2:p2,authoredMcqSlots:mcqs,
  authoredPaper2Parts:p2Parts,offeredPaper2Marks:offeredP2,
  officialPublishedCxcKeysProvided:0,livePapersReleased:released,
  reports};
}
