import {gradePobP2VisualTask} from "./pobHistoricalPaper2Visual";
import {gradePobHistoricalArithmetic,matchPobWrittenEvidence} from "./pobHistoricalPaper2Evidence";

// SPARK's source-linked, conservative Paper 2 rubric assessment.
// Marks are confirmed per criterion only where a testable response supports
// the criterion. Open-ended alternatives are left pending, never guessed as
// incorrect. AI is NOT part of this marking function.
const normalize=text=>String(text??"").toLowerCase().replace(/[’‘]/g,"'")
 .replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
export const POB_HISTORICAL_RUBRIC_REVIEW_VERSION="pob-historical-p2-rubric-review-v2";

export function reviewPobHistoricalPaper2(answers={},paper,selectedQuestions=[]){
 if(!paper||!Array.isArray(paper.questions))throw new Error("historical_paper_missing");
 const selected=paper.questions.filter(q=>selectedQuestions.includes(q.number));
 if(selected.length!==selectedQuestions.length||new Set(selectedQuestions).size!==selectedQuestions.length)
  throw new Error("invalid_selected_questions");
 const questions=selected.map(question=>{
  const sourceParts=question.parts||question.items||[];
  const parts=sourceParts.map(part=>{
   const id="Q"+question.number+":"+part.id;
   const raw=answers[id];
   const response=typeof raw==="string"?raw.trim():"";
   const maxMarks=Number(part.marks||0),criteria=part.criteria||[];
   const valid=criteria.length>0&&criteria.every(c=>
    Number.isInteger(c.marks)&&c.marks>0&&String(c.rule||"").trim())&&
    criteria.reduce((n,c)=>n+c.marks,0)===maxMarks;
   const visual=valid?gradePobP2VisualTask(paper.id,id,raw):null;
   const sameAsGuide=Boolean(response&&valid&&normalize(response)===normalize(part.modelAnswer));
   const arithmetic=valid&&response?gradePobHistoricalArithmetic(paper.id,id,response):null;
   const blank=visual?visual.blank:!response;
   const evidenced=!visual&&!sameAsGuide&&!arithmetic&&response&&valid
    ?matchPobWrittenEvidence(response,part.modelAnswer,criteria):null;
   let assessed,confirmed,status;
   if(blank){assessed=criteria.map(()=>0);status="unanswered";}
   else if(visual){assessed=criteria.map((_,i)=>visual.criteria[i]?.marks??null);status="diagram-verified";}
   else if(sameAsGuide){assessed=criteria.map(c=>c.marks);status="verified-model-match";}
   else if(arithmetic){assessed=criteria.map((c,i)=>arithmetic.criteria[i]?c.marks:0);status="calculation-verified";}
   else if(evidenced){
    assessed=criteria.map((c,i)=>evidenced.confirmed.some(hit=>hit.criterion===i)?c.marks:null);
    status=assessed.every(n=>n!==null)?"criterion-verified":"requires-rubric-assessment";
   }else{assessed=criteria.map(()=>null);status="requires-rubric-assessment";}
   // Invalid or missing source criteria cannot become a final grade.
   if(!valid&&!blank){assessed=criteria.map(()=>null);status="requires-rubric-assessment";}
   confirmed=assessed.reduce((n,m)=>n+(m||0),0);
   const unresolved=assessed.reduce((n,m,i)=>n+(m===null?criteria[i]?.marks||0:0),0);
   const assessedMarks=assessed.every(n=>n!==null)&&valid?confirmed:null;
   return {id,question:question.number,part:part.id,availableMarks:maxMarks,
    confirmedMarks:confirmed,unresolvedMarks:unresolved,assessedMarks,
    status,
    criteria:criteria.map((criterion,index)=>({
     id:id+":criterion-"+(index+1),rule:criterion.rule,availableMarks:criterion.marks,
     assessedMarks:assessed[index],alternatives:criterion.alternatives||[],
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
 const unresolvedMarks=parts.reduce((n,p)=>n+p.unresolvedMarks,0);
 return {paperId:paper.id,rubricVersion:POB_HISTORICAL_RUBRIC_REVIEW_VERSION,
  availableMarks:maximum,confirmedMarks,unresolvedMarks,
  assessedMarks:fullyAssessed?confirmedMarks:null,fullyAssessed,
  answeredParts:parts.filter(p=>p.status!=="unanswered").length,
  totalParts:parts.length,unresolvedParts:parts.filter(p=>p.assessedMarks===null).length,
  questions};
}
