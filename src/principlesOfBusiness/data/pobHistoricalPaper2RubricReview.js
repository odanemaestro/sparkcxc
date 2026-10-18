// Source-bound SPARK Paper 2 rubric review, independent of optional AI.
// Mirrors pobRubricReview: blank=0, proven evidence can earn marks,
// other written work remains unresolved rather than being guessed as wrong.
// Matching the ENTIRE SPARK worked answer is an explicit deterministic
// reference case, not a claim to understand any arbitrary paraphrase.
const normalize=text=>String(text??"").toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
export const POB_HISTORICAL_RUBRIC_REVIEW_VERSION="pob-historical-p2-rubric-review-v1";

export function reviewPobHistoricalPaper2(answers={},paper,selectedQuestions=[]){
 if(!paper||!Array.isArray(paper.questions))throw new Error("historical_paper_missing");
 const selected=paper.questions.filter(q=>selectedQuestions.includes(q.number));
 if(selected.length!==selectedQuestions.length||new Set(selectedQuestions).size!==selectedQuestions.length)
  throw new Error("invalid_selected_questions");
 const questions=selected.map(question=>{
  const sourceParts=question.parts||question.items||[];
  const parts=sourceParts.map(part=>{
   const id="Q"+question.number+":"+part.id;
   const response=String(answers[id]||"").trim();
   const maxMarks=Number(part.marks||0),criteria=part.criteria||[];
   const valid=criteria.length>0&&criteria.every(c=>Number.isInteger(c.marks)&&c.marks>0&&String(c.rule||"").trim())&&
    criteria.reduce((n,c)=>n+c.marks,0)===maxMarks;
   // Exact full-answer recognition is conservative. Equivalent explanations
   // are not penalised; they remain pending evidence-based rubric assessment.
   const sameAsGuide=Boolean(response&&valid&&normalize(response)===normalize(part.modelAnswer));
   const blank=!response,marks=blank?0:sameAsGuide?maxMarks:null;
   return {id,question:question.number,part:part.id,availableMarks:maxMarks,
    confirmedMarks:marks===null?0:marks,assessedMarks:marks,
    status:blank?"unanswered":sameAsGuide?"verified-model-match":"requires-rubric-assessment",
    criteria:criteria.map((criterion,index)=>({
     id:id+":criterion-"+(index+1),rule:criterion.rule,availableMarks:criterion.marks,
     assessedMarks:blank?0:sameAsGuide?criterion.marks:null,
     alternatives:criterion.alternatives||[],
    })),
   };
  });
  return {number:question.number,availableMarks:Number(question.marks||question.maxMarks||0),
   confirmedMarks:parts.reduce((n,p)=>n+p.confirmedMarks,0),
   assessedMarks:parts.every(p=>p.assessedMarks!==null)?parts.reduce((n,p)=>n+p.assessedMarks,0):null,
   parts};
 });
 const parts=questions.flatMap(q=>q.parts);
 const fullyAssessed=parts.every(p=>p.assessedMarks!==null);
 const maximum=questions.reduce((n,q)=>n+q.availableMarks,0);
 const confirmedMarks=parts.reduce((n,p)=>n+p.confirmedMarks,0);
 const unresolvedMarks=parts.filter(p=>p.assessedMarks===null).reduce((n,p)=>n+p.availableMarks,0);
 return {paperId:paper.id,rubricVersion:POB_HISTORICAL_RUBRIC_REVIEW_VERSION,
  availableMarks:maximum,confirmedMarks,unresolvedMarks,
  assessedMarks:fullyAssessed?confirmedMarks:null,fullyAssessed,
  answeredParts:parts.filter(p=>p.status!=="unanswered").length,
  totalParts:parts.length,unresolvedParts:parts.filter(p=>p.assessedMarks===null).length,
  questions};
}
