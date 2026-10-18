// Source-backed historical Paper 1 data assembled from the owner's batch 1 JSON.
// Marking is provisional, and an original diagram/stem or disputed answer is never
// quietly awarded a mark. Never use this to certify an official CXC score.
import {POB_BATCH1_P1_BY_ID} from "./pobHistoricalPaper1Batch1Source";
import {POB_HIST_2023_JAN_FULL_60,verifyPobHistorical2023FullPaper} from "./pobHistorical2023JanP1Full";

import batch2_2015_MJ from "./pobHistoricalP1OwnerBatch2_2015_MJ";
import batch2_2016_MJ from "./pobHistoricalP1OwnerBatch2_2016_MJ";
import batch2_2017_MJ from "./pobHistoricalP1OwnerBatch2_2017_MJ";
import batch2_2020_JAN from "./pobHistoricalP1OwnerBatch2_2020_JAN";
import batch2_2020_MJ from "./pobHistoricalP1OwnerBatch2_2020_MJ";
import batch2_2021_MJ from "./pobHistoricalP1OwnerBatch2_2021_MJ";
import batch2_2022_JAN from "./pobHistoricalP1OwnerBatch2_2022_JAN";
import batch2_2024_MJ from "./pobHistoricalP1OwnerBatch2_2024_MJ";
const POB_BATCH2_P1_BY_ID=Object.freeze(Object.fromEntries([batch2_2015_MJ,batch2_2016_MJ,batch2_2017_MJ,batch2_2020_JAN,batch2_2020_MJ,batch2_2021_MJ,batch2_2022_JAN,batch2_2024_MJ].map(p=>[p.id,p])));
const LETTERS=["A","B","C","D"];
const bankRows=bank=>[...(bank.questions||bank.entries||bank.proposedEntries||[])];
const choice=row=>row?.proposedOption||row?.answer||row?.correctOption||row?.correctAnswer||null;
const academicConcern=(row,bank)=>Boolean(
 row?.dispute||row?.disputeType||row?.disputeDetail||row?.disputeEvidence||
 row?.uncertainty||row?.issue||bank.answerReviewNotes?.[row?.number]||
 /disputed|missing|uncertain|source-question-missing/i.test(String(row?.status||row?.academicStatus||""))
);
export const getPobHistoricalP1Source=id=>POB_BATCH1_P1_BY_ID[id]||POB_BATCH2_P1_BY_ID[id]||
 (id==="POB-P1-2023-JAN"?POB_HIST_2023_JAN_FULL_60:null);

export function buildPobHistoricalP1Exam(record){
 const source=getPobHistoricalP1Source(record?.id);
 if(!source||record?.paper!==1||record?.bank?.sourceSha256!==record?.source?.sourceSha256)
   throw new Error("source_paper_not_available");
 if(source.id==="POB-P1-2023-JAN"&&!verifyPobHistorical2023FullPaper(source).valid)
   throw new Error("source_paper_incomplete");
 const rows=bankRows(record.bank);
 const lookup=new Map(rows.map(q=>[q.number,q]));
 const questions=source.questions.map(q=>{
  const row=lookup.get(q.number);
  const proposal=q.proposedAnswer||q.answer;
  const existing=choice(row);
  const dispute=academicConcern(row,record.bank);
  const answerConflict=Boolean(existing&&proposal&&existing!==proposal);
  const sourceUncertain=Boolean(q.sourceReviewPending||q.sourceGraphicPending);
  const scoringEligible=!dispute&&!sourceUncertain&&!answerConflict&&
    LETTERS.includes(proposal)&&existing===proposal;
  return {...q,id:source.id+":Q"+q.number,
   answer:proposal,explanation:row?.explanation||q.explanation||"",
   scoringEligible,answerConflict,reviewReason:dispute?"SPARK answer is disputed or academically unverified for this item.":
    answerConflict?"The uploaded answer conflicts with the existing SPARK answer bank.":
    sourceUncertain?"Question or diagram transcription needs checking against the original PDF.":
    !existing?"No independent SPARK key is recorded for this item.":null
  };
 });
 const timeLimitMinutes=Number(record.bank.paperDurationMinutes||record.bank.timeLimitMinutes||source.timeLimitMinutes||75);
 const candidateTotal=questions.length;
 const eligible=questions.filter(q=>q.scoringEligible).length;
 return {id:source.id,label:record.label,sourceStatus:"owner-transcribed, source QA incomplete",
  timeLimitMinutes,questions,questionCount:candidateTotal,eligible,
  excluded:candidateTotal-eligible,provisional:true};
}
export function auditPobHistoricalP1Batch1(registry){
 const counts=Object.keys(POB_BATCH1_P1_BY_ID).map(id=>{
  const record=registry.find(row=>row.id===id);
  if(!record)throw new Error("missing historical source "+id);
  const paper=buildPobHistoricalP1Exam(record);
  const nums=paper.questions.map(q=>q.number);
  const optionErrors=paper.questions.filter(q=>!q.stem||!Array.isArray(q.options)||
    q.options.length!==4||q.options.some(a=>typeof a!=="string"||!a.trim())).map(q=>q.number);
  return {id,questions:nums.length,correctNumbering:nums.every((n,i)=>n===i+1),
   optionErrors,eligible:paper.eligible,excluded:paper.excluded,
   keyConflicts:paper.questions.filter(q=>q.answerConflict).map(q=>q.number),
   sourcePending:paper.questions.filter(q=>q.sourceReviewPending).map(q=>q.number)};
 });
 return {papers:counts.length,questions:counts.reduce((s,p)=>s+p.questions,0),counts};
}

/**
 * Source-QA inventory for all archived historical Paper 1 sittings.
 * A proposed key is not an authenticated CXC answer key. No item is
 * source-verified merely because it has 4 options and a proposed answer.
 */
export function auditPobHistoricalP1SourceReadiness(registry){
 const records=registry.filter(record=>record.paper===1);
 return {
  totalSittings:records.length,
  completeTranscriptions:records.filter(record=>Boolean(getPobHistoricalP1Source(record.id))).length,
  pendingTranscriptions:records.filter(record=>!getPobHistoricalP1Source(record.id))
    .map(record=>({id:record.id,label:record.label,reason:"Original numbered stems, all four options and referenced figures require source transcription."})),
  sourceQuestionsToReview:records.flatMap(record=>{
   if(!getPobHistoricalP1Source(record.id))return [];
   const exam=buildPobHistoricalP1Exam(record);
   return exam.questions.filter(q=>!q.scoringEligible).map(q=>({
    paperId:record.id,number:q.number,reason:q.reviewReason||"Source verification required.",
    sourceGraphicPending:Boolean(q.sourceGraphicPending),
    sourceReviewPending:Boolean(q.sourceReviewPending),
    answerConflict:Boolean(q.answerConflict)
   }));
  }),
  sourceVerifiedForOfficialScoring:0
 };
}
