import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {validatePobHistoricalPaper1} from "./pobHistoricalMcqReleaseGate";
import {validatePobHistoricalCandidate} from "./pobHistoricalReleaseGate";
import {POB_HISTORICAL_FIRST_FIFTEEN,validatePobHistoricalP2Selection} from "./pobHistoricalScoringBatches";
import {validatePob2005to2007P2Selection} from "./pobHistoricalBatch03SourceAudit";
import {validatePob2008MjP2Choices} from "./pobHistorical2008MjP2AuthoredScheme";

// Development/readiness gate only. The live grading server must independently
// resolve the trusted paper ID, source digest, rubric and user authorization.
// Do not treat booleans in a student-submitted payload as trusted evidence.
export function assessPobHistoricalAutoScoring(candidate,{
  secureServerMarkerEnabled=false,
  calibratedServerBenchmarkPassed=false
}={}){
 const issues=[];
 const source=POB_SUPPLIED_ARCHIVE.find(p=>p.id===candidate?.id);
 if(!source){
  issues.push("Historical source ID does not match the approved 46-PDF archive.");
 }else{
  if(source.ownerAutoScoringAuthorized!==true)
   issues.push("Owner has not authorized automated scoring for this source.");
  if(candidate?.filename!==source.filename&&candidate?.sourceFilename!==source.filename)
   issues.push("Source filename does not match the approved historical PDF.");
  if(!candidate?.sourceSha256||candidate.sourceSha256!==source.sourceSha256)
   issues.push("Source SHA-256 does not match the approved historical PDF.");
  if(candidate?.paper!==source.paper)
   issues.push("Examination paper type does not match the verified PDF cover.");
  if(candidate?.year!==source.year||candidate?.sitting!==source.sitting)
   issues.push("Examination year or sitting does not match the approved source.");
 }
 const base=candidate?.paper===1?validatePobHistoricalPaper1(candidate):
   validatePobHistoricalCandidate(candidate);
 issues.push(...base.issues);
 if(candidate?.paper===2){
  const earlySix=source?.paper===2&&source.year>=2005&&source.year<=2007;
  const year2008=source?.paper===2&&source.year===2008;
  if(earlySix){
   const choice=validatePob2005to2007P2Selection(candidate.id,candidate.selectedQuestionNumbers);
   if(!choice.valid)issues.push("Original 2005–07 section choices invalid: "+choice.issue);
  }
  if(year2008&&!validatePob2008MjP2Choices(candidate.selectedQuestionNumbers))
   issues.push("Original 2008 compulsory/optional question choices invalid.");
  // A client-provided boolean is not evidence of a valid sitting selection.
  // Apply original source-based rules for sources audited in batch 1.
  const sourceRule=POB_HISTORICAL_FIRST_FIFTEEN.find(p=>p.id===candidate?.id&&p.paper===2);
  if(sourceRule){
   const selection=validatePobHistoricalP2Selection(candidate.id,candidate.selectedQuestionNumbers);
   if(!selection.valid)
    issues.push("Source-based question selection is not verified: "+selection.issue);
   if(sourceRule.sourceForm!=="exam-booklet")
    issues.push("Supplied source is a derivative transcript, not a verified original exam booklet.");
  }
  if(candidate?.semanticAssessmentCalibrated!==true)
   issues.push("Written-answer assessment has not been calibrated.");
  if(candidate?.gradingBenchmarkPassed!==true)
   issues.push("The sitting-specific Paper 2 benchmark has not passed.");
  if(candidate?.questionSelectionRulesVerified!==true)
   issues.push("Paper 2 compulsory and optional question rules have not been verified.");
  const questions=candidate?.questions;
  const expectedOfferedCount=earlySix?9:year2008?7:null;
  if(!Array.isArray(questions)||
    (expectedOfferedCount!==null?questions.length!==expectedOfferedCount:questions.length<5))
   issues.push("Full Paper 2 question set is missing or wrong for the printed sitting.");
  else{
   if(candidate?.candidateMaximumMarks!==100)
    issues.push("The sitting's candidate maximum must be verified as 100 marks.");
   const ids=new Set();
   questions.forEach((q,i)=>{
    if(!Number.isInteger(q?.number)||q.number<1||ids.has(q.number))
     issues.push(`Paper 2 question ${i+1} has an invalid or duplicate number.`);
    ids.add(q?.number);
    const expectedMarks=earlySix&&(q?.number===1||q?.number===2)?10:20;
    if(q?.marks!==expectedMarks||q?.questionWordingVerified!==true)
     issues.push(`Paper 2 question ${i+1} is not a verified ${expectedMarks}-mark question.`);
    if(!Array.isArray(q?.parts)||!q.parts.length){
     issues.push(`Paper 2 question ${i+1} lacks a complete rubric.`);
     return;
    }
    const seenParts=new Set();
    let questionTotal=0;
    q.parts.forEach((part,j)=>{
     const partId=part?.id;
     if(typeof partId!=="string"||!partId.trim()||seenParts.has(partId))
      issues.push(`Question ${i+1}, part ${j+1} has an invalid or duplicate ID.`);
     seenParts.add(partId);
     if(!Number.isInteger(part?.marks)||part.marks<=0||
        !part?.prompt||part?.sourceQuestionVerified!==true)
      issues.push(`Question ${i+1}, part ${j+1} lacks verified wording or marks.`);
     const criteria=part?.criteria;
     if(!Array.isArray(criteria)||!criteria.length||
        criteria.some(c=>!Number.isInteger(c.marks)||c.marks<=0||
        typeof c.rule!=="string"||!c.rule.trim()||
        c.sourceSchemeVerified!==true)||
        criteria.reduce((sum,c)=>sum+(Number.isInteger(c?.marks)?c.marks:0),0)!==part?.marks)
      issues.push(`Question ${i+1}, part ${j+1} lacks a complete source-verified criterion rubric.`);
     if(Number.isInteger(part?.marks))questionTotal+=part.marks;
    });
    if(questionTotal!==expectedMarks)
     issues.push(`Question ${i+1} part marks do not total ${expectedMarks}.`);
   });
  }
 }
 if(secureServerMarkerEnabled!==true)
  issues.push("Secure server marking must be enabled and verified.");
 if(calibratedServerBenchmarkPassed!==true)
  issues.push("A production-equivalent calibration benchmark is still required.");
 return {
  ownerAuthorized:source?.ownerAutoScoringAuthorized===true,
  academicallyVerified:base.ready&&issues.length===0,
  ready:issues.length===0,
  issues
 };
}
