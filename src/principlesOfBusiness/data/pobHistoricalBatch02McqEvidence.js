// Offline academic adjudication report for historical Paper 1 source items.
// Never use this function to award student marks. It only categorises authored
// drafts that are blocked until full visual source/option review and calibration.
import {POB_HISTORICAL_BATCH02_AUTHORED,POB_HISTORICAL_BATCH02_PARTIAL_SOURCE} from "./pobHistoricalBatch02AuthoredAudit";
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";

export function inspectPobBatch02McqEvidence(){
 const papers=[...POB_HISTORICAL_BATCH02_AUTHORED.map(([paper])=>paper),
   POB_HISTORICAL_BATCH02_PARTIAL_SOURCE];
 const issues=[],reports=[];
 for(const paper of papers){
  const source=POB_SUPPLIED_ARCHIVE.find(p=>p.id===paper.id);
  const entries=paper.questions||paper.entries||paper.proposedEntries||[];
  if(!source||paper.paper!==1||source.paper!==1||paper.sourceSha256!==source.sourceSha256)
   issues.push("Unknown or tampered Paper 1 source: "+paper.id);
  const numbers=new Set(),disputes=[],noAnswer=[],missing=[];
  let authoredCount=0;
  for(const item of entries){
   if(!Number.isInteger(item.number)||item.number<1||item.number>60||numbers.has(item.number))
    issues.push("Duplicate/invalid item slot: "+paper.id+" Q"+item.number);
   numbers.add(item.number);
   const state=item.status||item.academicStatus||"unknown";
   const answer=item.proposedOption??item.answer??null;
   // A 60-slot draft can explicitly contain placeholders for pages absent
   // from the source PDF. These are NOT 60 authored questions or valid grades.
   if(state==="source-question-missing"||item.sourceQuestionPresent===false){
    if(item.sourceQuestionPresent!==false||answer!==null||item.pdfPage!==null)
     issues.push("Invalid missing-source placeholder: "+paper.id+" Q"+item.number);
    missing.push(item.number);
    continue;
   }
   authoredCount++;
   const isDisputed=/disput|adjudicat|ambigu|no-correct|unresolv/i.test(state)||
    Boolean(item.dispute||item.disputeType||item.disputeCategory||
      item.uncertainty&&/ambig|disput|unresolv/i.test(item.uncertainty));
   if(isDisputed){
    disputes.push(item.number);
    if(answer===null)noAnswer.push(item.number);
   }else if(!["A","B","C","D"].includes(answer))
    issues.push("Unadjudicated non-letter answer: "+paper.id+" Q"+item.number);
  }
  for(let n=1;n<=60;n++)if(!numbers.has(n))missing.push(n);
  missing.sort((a,b)=>a-b);
  if(paper.id==="POB-P1-2018-MJ"){
   if(missing.join(",")!=="53,54,55,56,57")
    issues.push("Known absent 2018 questions incorrectly supplied or masked.");
  }else if(missing.length)issues.push("Incomplete 60-question authored record: "+paper.id);
  reports.push(Object.freeze({
   paperId:paper.id,sourceSha256:paper.sourceSha256,
   authoredItems:authoredCount,missingOriginalQuestionNumbers:Object.freeze(missing),
   academicallyDisputedNumbers:Object.freeze([...new Set(disputes)].sort((a,b)=>a-b)),
   noProposedAnswerNumbers:Object.freeze([...new Set(noAnswer)].sort((a,b)=>a-b)),
   reliableLiveScoringReady:false
  }));
 }
 if(reports.length!==14||new Set(reports.map(r=>r.paperId)).size!==14)
  issues.push("Must account for exactly fourteen distinct Paper 1 sources.");
 return Object.freeze({
  valid:issues.length===0,issues,
  paperCount:reports.length,
  totalAuthoredMcqItems:reports.reduce((sum,r)=>sum+r.authoredItems,0),
  sourceMissingItemCount:reports.reduce((sum,r)=>sum+r.missingOriginalQuestionNumbers.length,0),
  academicallyDisputedItemCount:reports.reduce((sum,r)=>sum+r.academicallyDisputedNumbers.length,0),
  productionReadyPapers:0,
  reports:Object.freeze(reports)
 });
}
