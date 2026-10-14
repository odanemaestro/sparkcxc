import {FNH_P1_2003_TRANSCRIPTION_DRAFT,FNH_P1_2003_QA} from "./fnhHistorical2003Paper1Draft";
import {FNH_P1_2004_TRANSCRIPTION_DRAFT,FNH_P1_2004_QA} from "./fnhHistorical2004Paper1Draft";

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
export const FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS=Object.freeze([
 {year:2003,source:"CSEC_FNH_Paper_1_-_May_June_2003.pdf",...fnhHistoricalPaper1ReleaseCheck(FNH_P1_2003_TRANSCRIPTION_DRAFT)},
 {year:2004,source:"CSEC_FNH_Paper_1_-_May_June_2004.pdf",...fnhHistoricalPaper1ReleaseCheck(FNH_P1_2004_TRANSCRIPTION_DRAFT)},
]);
