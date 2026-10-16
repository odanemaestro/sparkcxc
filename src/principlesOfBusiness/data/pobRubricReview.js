// Comprehensive part-by-part Paper 2 rubric review. Each criterion retains
// its possible marks, but text signals are NOT proof and no numeric grade is
// emitted for written work. Assessment remains an explicit release blocker.
import {POB_PAPER2_ORIGINAL_01} from "./pobPaper2Original";
import {checkPobCalculation,inspectPobCalculationEvidence} from "./pobCalculationFeedback";
import {inspectPobShortAnswer} from "./pobShortAnswerFeedback";
import {inspectPobExtendedResponse} from "./pobExtendedResponseFeedback";
import {getPobP2FeedbackGuide} from "./pobPaper2FeedbackGuides";
import {assessPobPartEvidence} from "./pobAssessmentEvidence";
import {gradePobListingPart} from "./pobDeterministicMarks";

export const POB_P2_RUBRIC_VERSION="pob-original-p2-rubric-v1";
const asText=value=>String(value??"").trim();

export function reviewPobPaper2(answers={},paper=POB_PAPER2_ORIGINAL_01){
 const questions=paper.questions.map(question=>{
  const parts=question.items.map(item=>{
   const key=question.id+":"+item.id;
   const response=asText(answers[key]);
   const answered=response.length>0;
   const calculation=checkPobCalculation(key,response);
   const calculationEvidence=inspectPobCalculationEvidence(key,response);
   const shortAnswer=inspectPobShortAnswer(key,response);
   const extended=inspectPobExtendedResponse(key,response);
   const guide=getPobP2FeedbackGuide(key);
   const evidence=assessPobPartEvidence(key,response);
   const listingGrade=gradePobListingPart(key,response);
   const marks=listingGrade?listingGrade.marks:(answered?null:0);
   return {
    id:key,prompt:item.prompt,answered,availableMarks:item.marks,
    // Zero is definite for blank answers; non-blank answers need genuine rubric assessment.
    assessedMarks:marks,
    status:listingGrade?"graded-listing":answered?"awaiting-rubric-assessment":"unanswered",
    criteria:item.criteria.map((criterion,index)=>({
     id:key+":criterion-"+(index+1),availableMarks:criterion.marks,
     requirement:criterion.rule,alternatives:criterion.alternatives||[],
     assessedMarks:listingGrade?(index<listingGrade.marks?1:0):(answered?null:0),status:listingGrade?"graded-listing":answered?"requires-assessment":"unanswered"
    })),
    diagnostics:{calculation,calculationEvidence,shortAnswer,extended,evidence,listingGrade},
    feedback:guide?.guidance||item.modelAnswer,
    modelAnswer:item.modelAnswer
   };
  });
  return {
   id:question.id,number:question.number,availableMarks:question.marks,
   answeredParts:parts.filter(part=>part.answered).length,
   assessedMarks:parts.every(part=>part.assessedMarks!==null)?parts.reduce((n,part)=>n+part.assessedMarks,0):null,parts
  };
 });
 const parts=questions.flatMap(q=>q.parts);
 const anyAnswered=parts.some(part=>part.answered);
 const fullyAssessed=parts.every(part=>part.assessedMarks!==null);
 const confirmedMarks=parts.reduce((n,part)=>n+(part.assessedMarks??0),0);
 return {
  paperId:paper.id,rubricVersion:POB_P2_RUBRIC_VERSION,
  availableMarks:paper.marks,answeredParts:parts.filter(part=>part.answered).length,
  totalParts:parts.length,
  assessedMarks:fullyAssessed?confirmedMarks:null,
  confirmedMarks,unresolvedParts:parts.filter(part=>part.assessedMarks===null).length,
  fullyAssessed,
  markStatus:fullyAssessed?(anyAnswered?"graded":"unanswered"):"partially-assessed",
  questions
 };
}
