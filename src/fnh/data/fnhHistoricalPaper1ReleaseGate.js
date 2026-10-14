import {FNH_P1_2003_TRANSCRIPTION_DRAFT,FNH_P1_2003_QA} from "./fnhHistorical2003Paper1Draft";
import {FNH_P1_2004_TRANSCRIPTION_DRAFT,FNH_P1_2004_QA} from "./fnhHistorical2004Paper1Draft";
import {FNH_P1_2005_TRANSCRIPTION_DRAFT} from "./fnhHistorical2005Paper1Draft";
import {FNH_HISTORICAL_P1_2006} from "./fnhHistorical2006Paper1";
import {FNH_P1_2007_TRANSCRIPTION_DRAFT} from "./fnhHistorical2007Paper1Draft";
import {FNH_P1_2008_TRANSCRIPTION_DRAFT} from "./fnhHistorical2008Paper1Draft";
import {FNH_P1_2009_TRANSCRIPTION_DRAFT} from "./fnhHistorical2009Paper1Draft";
import {FNH_P1_2014_TRANSCRIPTION_DRAFT} from "./fnhHistorical2014Paper1Draft";
import {FNH_P1_2015_TRANSCRIPTION_DRAFT} from "./fnhHistorical2015Paper1Draft";
import {FNH_P1_2016_TRANSCRIPTION_DRAFT} from "./fnhHistorical2016Paper1Draft";
import {FNH_SUPPLIED_ARCHIVE} from "./fnhPastPaperInventory";

// Publishing rule for original historical Paper 01 transcriptions.
// A candidate list and suggested keys are not sufficient to publish an
// examination that presents its marks as correct and final.
export function fnhHistoricalPaper1ReleaseCheck(items=[],{expectedQuestions=60,verifiedKeyEvidence=false}={}){
 const records=Array.isArray(items)?items:[];
 const numbered=new Set(records.map(x=>x.number));
 const complete=records.length===expectedQuestions
   &&numbered.size===expectedQuestions
   &&Array.from({length:expectedQuestions},(_,i)=>i+1).every(n=>numbered.has(n));
 const sourceComplete=complete&&records.every(x=>x.sourceChecked===true
   &&Array.isArray(x.options)&&x.options.length===4
   &&new Set(x.options).size===4&&String(x.stem||"").trim());
 const keysComplete=sourceComplete&&records.every(x=>x.officialKeyVerified===true
   &&"ABCD".includes(String(x.proposedAnswer||"")));
 const ready=Boolean(sourceComplete&&keysComplete&&verifiedKeyEvidence);
 return {ready,questions:records.length,numbered:complete,sourceComplete,
   keysComplete,verifiedKeyEvidence:Boolean(verifiedKeyEvidence),
   pendingSourceNumbers:records.filter(x=>!x.sourceChecked||!Array.isArray(x.options)||x.options.length!==4).map(x=>x.number),
   pendingKeyNumbers:records.filter(x=>!x.officialKeyVerified).map(x=>x.number)};
}
// This report is informational and never grants a historical exam release.
const transcriptionRecords=Object.freeze({
  2003:FNH_P1_2003_TRANSCRIPTION_DRAFT,
  2004:FNH_P1_2004_TRANSCRIPTION_DRAFT,
  2005:FNH_P1_2005_TRANSCRIPTION_DRAFT,
  2006:FNH_HISTORICAL_P1_2006.map(row=>({
    number:row.number,stem:row.stem,options:row.options,sourceChecked:row.questionTextChecked,
    proposedAnswer:row.answer,officialKeyVerified:row.keyReviewStatus==="approved"
  })),
  2007:FNH_P1_2007_TRANSCRIPTION_DRAFT,
  2008:FNH_P1_2008_TRANSCRIPTION_DRAFT,
  2009:FNH_P1_2009_TRANSCRIPTION_DRAFT,
  2014:FNH_P1_2014_TRANSCRIPTION_DRAFT,
  2015:FNH_P1_2015_TRANSCRIPTION_DRAFT,
  2016:FNH_P1_2016_TRANSCRIPTION_DRAFT
});
export const FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS=Object.freeze(
  FNH_SUPPLIED_ARCHIVE.filter(p=>p.paper===1).map(row=>{
    const records=transcriptionRecords[row.year];
    const check=records
      ?fnhHistoricalPaper1ReleaseCheck(records)
      :fnhHistoricalPaper1ReleaseCheck([]);
    return {
      id:row.id,year:row.year,source:row.sourceFilename,
      ...check,
      reportedTranscribed:row.transcribedQuestionCount||0,
      missingSourceQuestions:row.missingSourceQuestionNumbers||[],
      answerKeyStatus:row.answerKeyStatus||"source-and-key-review-required",
      ready:false
    };
  })
);
export function fnhPaper1ArchiveReadiness(){
  const rows=FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS;
  return {
    total:rows.length,
    ready:rows.filter(row=>row.ready).length,
    inProgress:rows.filter(row=>row.reportedTranscribed>0).length,
    pending:rows.filter(row=>!row.ready).length,
    rows
  };
}
