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
import {FNH_P1_2017_TRANSCRIPTION_DRAFT} from "./fnhHistorical2017Paper1Draft";
import {FNH_P1_2018_TRANSCRIPTION_DRAFT} from "./fnhHistorical2018Paper1Draft";
import {FNH_P1_2020_TRANSCRIPTION_DRAFT} from "./fnhHistorical2020Paper1Draft";
import {FNH_P1_2026_TRANSCRIPTION_DRAFT} from "./fnhHistorical2026Paper1Draft";
import {FNH_P1_2019_TRANSCRIPTION_DRAFT} from "./fnhHistorical2019Paper1Draft";
import {FNH_SUPPLIED_ARCHIVE} from "./fnhPastPaperInventory";

// Publishing rule for original historical Paper 01 transcriptions.
// A candidate list and suggested keys are not sufficient to publish an
// examination that presents its marks as correct and final.
// An answer key is not "official" because someone entered a plausible letter
// or typed an unsourced string. A reviewer must inspect a separate source and
// record a keyed, page-specific citation that matches the candidate item.
function fnhAuthenticKeyEvidence(row){
 const evidence=row?.officialKeyEvidence;
 if(!evidence||typeof evidence!=="object"||Array.isArray(evidence))return false;
 const reviews=evidence.reviewers;
 return evidence.sourceType==="CXC-official-answer-key"
   &&typeof evidence.documentId==="string"&&evidence.documentId.trim().length>=8
   &&typeof evidence.documentSha256==="string"&&/^[a-f0-9]{64}$/i.test(evidence.documentSha256)
   &&Number.isInteger(evidence.page)&&evidence.page>0
   &&evidence.questionNumber===row.number
   &&evidence.answer===row.proposedAnswer
   &&Array.isArray(reviews)&&reviews.length>=2
   &&reviews.every(r=>r&&typeof r.reviewerId==="string"&&r.reviewerId.trim().length>=3
     &&typeof r.verifiedAt==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(r.verifiedAt))
   &&new Set(reviews.map(r=>r.reviewerId.trim())).size>=2;
}
export function fnhHistoricalPaper1ReleaseCheck(items=[],{expectedQuestions=60,verifiedKeyEvidence=false}={}){
 const records=Array.isArray(items)?items:[];
 const numbers=records.map(x=>x?.number);
 const numbered=new Set(numbers);
 const expected=Array.from({length:expectedQuestions},(_,i)=>i+1);
 const missingNumbers=expected.filter(n=>!numbered.has(n));
 const duplicateNumbers=[...new Set(numbers.filter((n,i)=>numbers.indexOf(n)!==i))];
 const complete=Number.isInteger(expectedQuestions)&&expectedQuestions>0
   &&records.length===expectedQuestions&&numbered.size===expectedQuestions
   &&missingNumbers.length===0&&duplicateNumbers.length===0;
 const validSource=x=>x&&Number.isInteger(x.number)&&x.number>=1&&x.number<=expectedQuestions
   &&x.sourceChecked===true
   &&typeof x.stem==="string"&&x.stem.trim().length>0
   &&Array.isArray(x.options)&&x.options.length===4
   &&x.options.every(o=>typeof o==="string"&&o.trim().length>0)
   &&new Set(x.options).size===4;
 const sourceComplete=complete&&records.every(validSource);
 const figureComplete=sourceComplete&&records.every(x=>!x.diagramId||(
   x.sourceFigureVerified===true
   &&typeof x.sourceFigureEvidence==="string"&&x.sourceFigureEvidence.trim().length>=8));
 const keysComplete=sourceComplete&&records.every(x=>x.officialKeyVerified===true
   &&/^[ABCD]$/.test(String(x.proposedAnswer||"")));
 const evidenceComplete=keysComplete&&records.every(fnhAuthenticKeyEvidence);
 const ready=Boolean(sourceComplete&&figureComplete&&keysComplete&&evidenceComplete&&verifiedKeyEvidence);
 return {ready,questions:records.length,numbered:complete,sourceComplete,figureComplete,
   keysComplete,evidenceComplete,verifiedKeyEvidence:Boolean(verifiedKeyEvidence),
   missingNumbers,duplicateNumbers,
   pendingSourceNumbers:records.filter(x=>!validSource(x)).map(x=>x?.number),
   pendingFigureNumbers:records.filter(x=>x?.diagramId&&
     !(x.sourceFigureVerified===true&&typeof x.sourceFigureEvidence==="string"
       &&x.sourceFigureEvidence.trim().length>=8)).map(x=>x.number),
   pendingKeyNumbers:records.filter(x=>!x||x.officialKeyVerified!==true
     ||!/^[ABCD]$/.test(String(x.proposedAnswer||""))||!fnhAuthenticKeyEvidence(x)).map(x=>x?.number)};
}
// This report is informational and never grants a historical exam release.
const transcriptionRecords=Object.freeze({
  2003:FNH_P1_2003_TRANSCRIPTION_DRAFT,
  2004:FNH_P1_2004_TRANSCRIPTION_DRAFT,
  2005:FNH_P1_2005_TRANSCRIPTION_DRAFT,
  2006:FNH_HISTORICAL_P1_2006.map(row=>({
    number:row.number,stem:row.stem,options:row.options,sourceChecked:row.questionTextChecked,
    id:row.id,sourcePage:row.sourcePage,diagramId:row.diagramId,sourceContext:row.sourceContext,
    proposedAnswer:row.answer,officialKeyVerified:row.keyReviewStatus==="approved"
  })),
  2007:FNH_P1_2007_TRANSCRIPTION_DRAFT,
  2008:FNH_P1_2008_TRANSCRIPTION_DRAFT,
  2009:FNH_P1_2009_TRANSCRIPTION_DRAFT,
  2014:FNH_P1_2014_TRANSCRIPTION_DRAFT,
  2015:FNH_P1_2015_TRANSCRIPTION_DRAFT,
  2016:FNH_P1_2016_TRANSCRIPTION_DRAFT,
  2017:FNH_P1_2017_TRANSCRIPTION_DRAFT,
  2018:FNH_P1_2018_TRANSCRIPTION_DRAFT,
  2019:FNH_P1_2019_TRANSCRIPTION_DRAFT,
  2020:FNH_P1_2020_TRANSCRIPTION_DRAFT,
  2026:FNH_P1_2026_TRANSCRIPTION_DRAFT
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


// Reader mode is an unscored source transcription browser, NOT a release gate.
// A large portion of older PDF figure redraws is still under review. Withhold
// every incomplete choice set or unavailable diagram rather than invent a figure.
// Crucially, no proposedAnswer, official key flag, explanation or score is
// returned to the UI. Publication permission is handled separately above.
export const FNH_P1_RENDERABLE_DIAGRAM_IDS=Object.freeze([
 "place-setting-2004","kitchen-u-shaped-2004","refrigerator-table-2004",
 "place-setting-2018","luncheon-menu-2018","kitchen-u-shaped-2018",
 "refrigerator-positions-2018","luncheon-presentation-2018","meal-comparison-2018",
 "meal-comparison-2019","kitchen-u-shaped-2019","luncheon-presentation-2019",
 "place-setting-2020","kitchen-u-shaped-2020","caribbean-dishes-2020",
 "refrigerator-storage-2020","luncheon-presentation-2020",
 "guava-jam-label-2026","kitchen-u-shaped-2026","nutrient-types-2026",
 "meal-comparison-2026","luncheon-presentation-2026","nutrition-label-2026"
]);
const diagramReady=new Set(FNH_P1_RENDERABLE_DIAGRAM_IDS);
export function fnhHistoricalPaper1Reader(sourceId){
 const source=FNH_SUPPLIED_ARCHIVE.find(x=>x.id===sourceId&&x.paper===1);
 if(!source||source.sourceIdentityVerified===false||source.sourceYearVerified===false)return null;
 const original=transcriptionRecords[source.year]||[];
 const excluded=[];
 const questions=[];
 const seenNumbers=new Set();
 for(const row of original){
  const options=row.options;
  const complete=Number.isInteger(row.number)&&row.number>=1&&row.number<=60
    &&row.sourceChecked===true&&typeof row.stem==="string"&&row.stem.trim()
    &&Array.isArray(options)&&options.length===4
    &&options.every(choice=>typeof choice==="string"&&choice.trim())
    &&new Set(options).size===4;
  if(!complete||seenNumbers.has(row.number)||(row.diagramId&&!diagramReady.has(row.diagramId))){
   excluded.push(row.number);
   continue;
  }
  seenNumbers.add(row.number);
  questions.push(Object.freeze({
   number:row.number,stem:row.stem,sourcePage:row.sourcePage||null,
   options:Object.freeze([...options]),
   ...(row.diagramId?{diagramId:row.diagramId}:{}),
   ...(row.sourceContext?{sourceContext:row.sourceContext}:{})
  }));
 }
 if(!questions.length)return null;
 questions.sort((a,b)=>a.number-b.number);
 return Object.freeze({
  id:source.id,year:source.year,qualification:source.year>=2017?"Technical Proficiency":"General Proficiency",
  paperTitle:source.year>=2017?"Food, Nutrition and Health":"Food and Nutrition",
  missingSourceQuestions:Object.freeze([...(source.missingSourceQuestionNumbers||[])]),
  excludedNumbers:Object.freeze(excluded.sort((a,b)=>a-b)),
  sourceQuestionCount:source.sourceQuestionsExpected||60,
  questions:Object.freeze(questions),
  scored:false,verifiedKeys:false
 });
}
