// Deterministic source-QA batches for the owner-approved 46 historical PDFs.
// This is a release-control and sitting-rules index, NOT an answer key.
// No student score is produced from these records. All 46 remain unreleased.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";

// Batch 1 prioritises 15 sources with useful selectable text, not 15 scored papers.
// Under-50 refers to source PDF pages with fewer than 50 extractable characters.
// Cover instructions below come from the original bytes, but still need full
// page-by-page transcription, authenticated answer keys and examiner rubrics.
const FIRST_FIFTEEN=Object.freeze([
 ["POB-P1-2023-JAN",9,0,"mcq-60","exam-booklet"],
 ["POB-P2-2009-MJ",4,0,"choice-3-plus-1-plus-1","exam-booklet"],
 ["POB-P2-2010-MJ",4,0,"choice-3-plus-1-plus-1","exam-booklet"],
 ["POB-P2-2011-MJ",4,0,"choice-3-plus-1-plus-1","exam-booklet"],
 ["POB-P2-2012-MJ",5,0,"choice-3-plus-1-plus-1","exam-booklet"],
 ["POB-P2-2013-MJ",5,0,"choice-3-plus-1-plus-1","exam-booklet"],
 ["POB-P2-2014-MJ",5,0,"choice-3-plus-1-plus-1","exam-booklet"],
 ["POB-P2-2015-MJ",16,0,"choice-3-plus-1-plus-1","exam-booklet"],
 ["POB-P2-2016-MJ",18,0,"choice-3-plus-1-plus-1","exam-booklet"],
 ["POB-P2-2017-MJ",16,0,"all-five","exam-booklet"],
 ["POB-P2-2018-MJ",14,0,"all-five","exam-booklet"],
 ["POB-P2-2022-JAN",20,2,"all-five","exam-booklet"],
 ["POB-P2-2022-MJ",13,0,"all-five","exam-booklet"],
 ["POB-P2-2023-JAN",24,2,"all-five","exam-booklet"],
 // Two-page typed question transcript, not a complete CXC-printed paper.
 ["POB-P2-2024-JAN",2,0,"unverified-instructions","derivative-transcription"]
]);

// Explicit batches of 15, 15, 15, 1. The 2019 filename/cover conflict
// remains reclassified as P2 in the canonical inventory.
const OTHER_BATCHES=Object.freeze([
 Object.freeze(["POB-P1-2002-MJ","POB-P1-2003-MJ","POB-P1-2004-MJ","POB-P1-2005-MJ",
  "POB-P1-2006-MJ","POB-P1-2007-MJ","POB-P1-2008-MJ","POB-P1-2011-MJ",
  "POB-P1-2012-MJ","POB-P1-2014-MJ","POB-P1-2015-MJ","POB-P1-2016-MJ",
  "POB-P1-2017-MJ","POB-P1-2018-MJ","POB-P2-2019-MJ-ALT"]),
 Object.freeze(["POB-P1-2020-JAN","POB-P1-2020-MJ","POB-P1-2021-MJ","POB-P1-2022-JAN",
  "POB-P1-2024-MJ","POB-P2-2005-MJ","POB-P2-2006-MJ","POB-P2-2007-MJ",
  "POB-P2-2008-MJ","POB-P2-2019-JAN","POB-P2-2019-MJ","POB-P2-2021-MJ",
  "POB-P2-2023-MJ","POB-P2-2024-MJ","POB-P2-2025-JAN",
  "POB-P2-2026-JAN"]),
 Object.freeze(["POB-P2-2026-JAN"])
]);

export const POB_HISTORICAL_SCORING_BATCHES=Object.freeze([
 Object.freeze(FIRST_FIFTEEN.map(([id,pages,pagesNeedingImageReview,rule,sourceForm])=>{
  const source=POB_SUPPLIED_ARCHIVE.find(row=>row.id===id);
  if(!source)throw new Error("Unknown POB batch source: "+id);
  const lowTextPagesReviewed=id==="POB-P2-2022-JAN"?[2,19]:
   id==="POB-P2-2023-JAN"?[2,23]:[];
  return Object.freeze({
   id,batch:1,paper:source.paper,filename:source.filename,
   sourceSha256:source.sourceSha256,pages,pagesNeedingImageReview,
   // Both 2022/2023 low-text pairs are non-question DO NOT WRITE pages.
   lowTextPagesReviewed:Object.freeze(lowTextPagesReviewed),
   remainingLowTextPagesToReview:pagesNeedingImageReview-lowTextPagesReviewed.length,
   rule,sourceForm,ownerAuthorized:true,
   // Even a verified cover is not a verified exam or scoring rubric.
   fullPageVisualQA:false,completeVerifiedAnswers:false,
   fullCriterionRubricVerified:false,calibrationPassed:false,
   liveScoringApproved:false
  });
 })),
 ...OTHER_BATCHES.map((ids,i)=>Object.freeze(ids.map(id=>{
  const source=POB_SUPPLIED_ARCHIVE.find(row=>row.id===id);
  if(!source)throw new Error("Unknown POB batch source: "+id);
  return Object.freeze({
   id,batch:i+2,paper:source.paper,filename:source.filename,
   sourceSha256:source.sourceSha256,pages:source.pages,
   rule:"unverified-instructions",sourceForm:"not-reviewed-in-this-batch",
   fullPageVisualQA:false,completeVerifiedAnswers:false,
   fullCriterionRubricVerified:false,calibrationPassed:false,
   liveScoringApproved:false
  });
 })))
]);

export const POB_HISTORICAL_SCORING_BATCH_COUNTS=Object.freeze(
 POB_HISTORICAL_SCORING_BATCHES.map(group=>group.length)
);
export const POB_HISTORICAL_FIRST_FIFTEEN=POB_HISTORICAL_SCORING_BATCHES[0];

// Evaluate selections ONLY. This never awards marks or authenticates answers.
// Old Paper 2: Q1-3 and exactly one from Q4/5 and Q6/7.
// New Paper 2: five compulsory questions. Jan-2024 typed notes are withheld.
export function validatePobHistoricalP2Selection(id,selectedNumbers){
 // Strictly whitelisted third- and fourth-batch source booklets were
 // visually read. These have five compulsory questions not in batch one.
 // This verifies the printed *selection rule*, NOT academic scores or live
 // grading. Never accept a mere client-supplied paper or boolean.
 const laterCompulsory=new Set([
  "POB-P2-2019-JAN","POB-P2-2019-MJ","POB-P2-2021-MJ",
  "POB-P2-2023-MJ","POB-P2-2024-MJ","POB-P2-2025-JAN"
 ]);
 const reviewedLater=[...POB_HISTORICAL_SCORING_BATCHES[2],
  ...POB_HISTORICAL_SCORING_BATCHES[3]].find(
  row=>row.id===id&&row.paper===2&&laterCompulsory.has(id)
 );
 const original=POB_HISTORICAL_FIRST_FIFTEEN.find(row=>row.id===id&&row.paper===2);
 const paper=original||(reviewedLater&&{
  ...reviewedLater,rule:"all-five",sourceForm:"exam-booklet"
 });
 if(!paper)return {valid:false,maximumMarks:0,issue:"Unreviewed or unknown Paper 2 source."};
 if(paper.rule==="unverified-instructions"||paper.sourceForm!=="exam-booklet")
  return {valid:false,maximumMarks:0,issue:"Original examination instructions require verification."};
 if(!Array.isArray(selectedNumbers)||selectedNumbers.length!==5||
   selectedNumbers.some(n=>!Number.isInteger(n))||
   new Set(selectedNumbers).size!==5)
  return {valid:false,maximumMarks:0,issue:"Select five distinct numbered questions."};
 const selected=new Set(selectedNumbers);
 const valid=paper.rule==="all-five"
  ?[1,2,3,4,5].every(n=>selected.has(n))
  :paper.rule==="choice-3-plus-1-plus-1"&&
   [1,2,3].every(n=>selected.has(n))&&
   [4,5].filter(n=>selected.has(n)).length===1&&
   [6,7].filter(n=>selected.has(n)).length===1;
 return valid
  ?{valid:true,maximumMarks:100,issue:null}
  :{valid:false,maximumMarks:0,issue:"Question choices conflict with this sitting's original instructions."};
}

export function auditPobHistoricalScoringBatches(){
 const rows=POB_HISTORICAL_SCORING_BATCHES.flat();
 const ids=new Set(rows.map(r=>r.id));
 const expected=new Set(POB_SUPPLIED_ARCHIVE.map(r=>r.id));
 const issues=[];
 if(POB_HISTORICAL_SCORING_BATCH_COUNTS.join(",")!=="15,15,15,1")
  issues.push("Incorrect batch sizes.");
 if(ids.size!==46||expected.size!==46||[...expected].some(id=>!ids.has(id)))
  issues.push("Missing, repeated or unknown source ID.");
 for(const row of rows){
  const source=POB_SUPPLIED_ARCHIVE.find(s=>s.id===row.id);
  if(!source||row.pages!==source.pages||row.paper!==source.paper||
    row.filename!==source.filename||row.sourceSha256!==source.sourceSha256)
   issues.push("Source identity, page count or fingerprint differs: "+row.id);
  if(row.liveScoringApproved!==false)
   issues.push("Unverified paper improperly scored: "+row.id);
 }
 return {valid:issues.length===0,issues,total:rows.length,
  batchCounts:[...POB_HISTORICAL_SCORING_BATCH_COUNTS],
  liveScoringReleased:rows.filter(r=>r.liveScoringApproved).length,
  firstBatchPages:POB_HISTORICAL_FIRST_FIFTEEN.reduce((n,r)=>n+r.pages,0),
  firstBatchPagesNeedingImageReview:POB_HISTORICAL_FIRST_FIFTEEN.reduce(
   (n,r)=>n+r.pagesNeedingImageReview,0),
  firstBatchLowTextPagesVisuallyResolved:POB_HISTORICAL_FIRST_FIFTEEN.reduce(
   (n,r)=>n+r.lowTextPagesReviewed.length,0),
  firstBatchRemainingLowTextPagesToReview:POB_HISTORICAL_FIRST_FIFTEEN.reduce(
   (n,r)=>n+r.remainingLowTextPagesToReview,0)
 };
}
