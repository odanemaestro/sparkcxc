import {gradePobP2VisualTask,getPobP2VisualTask} from "./pobHistoricalPaper2Visual";
import {gradePobHistoricalArithmetic,matchPobWrittenEvidence} from "./pobHistoricalPaper2Evidence";
import {gradePobDevelopedPart,getPobDevelopedTask,POB_DEVELOPED_SUBCRITERIA_VERSION} from "./pobHistoricalDevelopedMarking";
import {gradePobDemandPricePart,getPobDemandPriceTask,POB_DEMAND_PRICE_RUBRIC_VERSION} from "./pobHistoricalDemandPriceMarking";
import {gradePobFoundationalPart,getPobFoundationalTask,POB_FOUNDATIONAL_CRITERIA_VERSION} from "./pobHistoricalFoundationalCriteria";

// SPARK's source-linked, conservative Paper 2 rubric assessment.
// Marks are confirmed per criterion only where a testable response supports
// the criterion. Open-ended alternatives are left pending, never guessed as
// incorrect. AI is NOT part of this marking function.
const normalize=text=>String(text??"").toLowerCase().replace(/[’‘]/g,"'")
 .replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
export const POB_HISTORICAL_RUBRIC_REVIEW_VERSION="pob-historical-p2-rubric-review-v6";

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
   const visualTask=getPobP2VisualTask(paper.id,id);
   const visual=valid&&visualTask&&raw?.kind===visualTask.kind
    ?gradePobP2VisualTask(paper.id,id,raw):null;
   const sameAsGuide=Boolean(!visualTask&&response&&valid&&normalize(response)===normalize(part.modelAnswer));
   const arithmetic=!visualTask&&valid&&response?gradePobHistoricalArithmetic(paper.id,id,response):null;
   const developedTask=getPobDevelopedTask(paper.id,id);
   const developed=valid&&developedTask&&criteria.length===developedTask.maxDistinct&&
     criteria.every(c=>c.marks===2)&&maxMarks===developedTask.maxMarks&&response
     ?gradePobDevelopedPart(paper.id,id,response):null;
   const demandTask=getPobDemandPriceTask(paper.id,id);
   const demandPrice=valid&&demandTask&&criteria.length===3&&
     criteria.every(c=>c.marks===2)&&maxMarks===demandTask.maximum&&response
     ?gradePobDemandPricePart(paper.id,id,response):null;
   const definitionTask=getPobFoundationalTask(paper.id,id);
   const foundational=valid&&definitionTask&&criteria.length===2&&
     criteria.every(c=>c.marks===1)&&maxMarks===2&&response
     ?gradePobFoundationalPart(paper.id,id,response):null;
   const blank=visual?visual.blank:!raw||typeof raw==="string"&&!response;
   const evidenced=!visualTask&&!sameAsGuide&&!arithmetic&&!developed&&!demandPrice&&!foundational&&response&&valid
    ?matchPobWrittenEvidence(response,part.modelAnswer,criteria):null;
   let assessed,confirmed,status;
   if(blank){assessed=criteria.map(()=>0);status="unanswered";}
   else if(visual){assessed=criteria.map((_,i)=>visual.criteria[i]?.marks??null);status="diagram-verified";}
   else if(sameAsGuide){assessed=criteria.map(c=>c.marks);status="verified-model-match";}
   else if(arithmetic){assessed=criteria.map((c,i)=>arithmetic.criteria[i]?c.marks:0);status="calculation-verified";}
   else if(developed){
    assessed=criteria.map((_,i)=>developed.criteria[i]?.marks??null);
    status=developed.status;
   }
   else if(demandPrice){
    assessed=criteria.map((_,i)=>demandPrice.criteria[i]?.marks??null);
    status=demandPrice.status;
   }
   else if(foundational){
    assessed=criteria.map((_,i)=>foundational.criteria[i]?.marks??null);
    status=foundational.status;
   }
   else if(evidenced){
    // Matching one response clause establishes at most one mark. Where
    // the source criterion is worth several marks, its remaining marks need
    // independently evidenced subcriteria. Do not invent full credit.
    assessed=criteria.map((c,i)=>evidenced.confirmed.some(hit=>hit.criterion===i)
      ?Math.min(1,c.marks):null);
    status=assessed.every((n,i)=>n!==null&&n===criteria[i].marks)
      ?"criterion-verified":"requires-rubric-assessment";
   }else{assessed=criteria.map(()=>null);status=visualTask?"diagram-input-required":"requires-rubric-assessment";}
   // Invalid or missing source criteria cannot become a final grade.
   if(!valid&&!blank){assessed=criteria.map(()=>null);status="requires-rubric-assessment";}
   confirmed=assessed.reduce((n,m)=>n+(m||0),0);
   // Invalid or missing criteria still account for the full possible mark.
   // Weighted, partially evidenced criteria also leave their balance pending.
   // Exact arithmetic and diagram checkers explicitly resolve every
   // criterion, including known incorrect results. Only open prose and
   // structurally invalid rubrics keep undetermined marks pending.
   const determined=Boolean(valid&&(visual||arithmetic||sameAsGuide||
     developed?.assessedMarks!==null&&Boolean(developed)||
     demandPrice?.assessedMarks!==null&&Boolean(demandPrice)||
     foundational?.assessedMarks!==null&&Boolean(foundational)));
   const unresolved=blank||determined?0:valid
     ?Math.max(0,maxMarks-confirmed):maxMarks;
   const assessedMarks=valid&&unresolved===0&&assessed.every(n=>n!==null)?confirmed:null;
   return {id,question:question.number,part:part.id,availableMarks:maxMarks,
    confirmedMarks:confirmed,unresolvedMarks:unresolved,assessedMarks,
    rubricComplete:valid,status,
    subcriteriaVersion:developed?POB_DEVELOPED_SUBCRITERIA_VERSION:
      demandPrice?POB_DEMAND_PRICE_RUBRIC_VERSION:
      foundational?POB_FOUNDATIONAL_CRITERIA_VERSION:null,
    criteria:criteria.map((criterion,index)=>({
     id:id+":criterion-"+(index+1),rule:criterion.rule,availableMarks:criterion.marks,
     assessedMarks:assessed[index],alternatives:criterion.alternatives||[],
     evidence:developed?.criteria[index]?.evidence||demandPrice?.criteria[index]?.evidence||foundational?.criteria[index]?.evidence||null,
     developedPoint:developed?.criteria[index]?.conceptId||demandPrice?.criteria[index]?.conceptId||foundational?.criteria[index]?.conceptId||null,
    })),
   };
  });
  return {number:question.number,availableMarks:Number(question.marks||question.maxMarks||0),
   confirmedMarks:parts.reduce((n,p)=>n+p.confirmedMarks,0),
   unresolvedMarks:parts.reduce((n,p)=>n+p.unresolvedMarks,0),
   assessedMarks:parts.every(p=>p.assessedMarks!==null)?parts.reduce((n,p)=>n+p.assessedMarks,0):null,
   parts};
 });
 const parts=questions.flatMap(q=>q.parts);
 const fullyAssessed=parts.every(p=>p.assessedMarks!==null&&p.unresolvedMarks===0);
 const maximum=questions.reduce((n,q)=>n+q.availableMarks,0);
 const confirmedMarks=parts.reduce((n,p)=>n+p.confirmedMarks,0);
 const unresolvedMarks=parts.reduce((n,p)=>n+p.unresolvedMarks,0);
 return {paperId:paper.id,rubricVersion:POB_HISTORICAL_RUBRIC_REVIEW_VERSION,
  availableMarks:maximum,confirmedMarks,unresolvedMarks,
  assessedMarks:fullyAssessed?confirmedMarks:null,fullyAssessed,
  answeredParts:parts.filter(p=>p.status!=="unanswered").length,
  totalParts:parts.length,unresolvedParts:parts.filter(p=>p.assessedMarks===null).length,
  rubricIncompleteParts:parts.filter(p=>!p.rubricComplete).length,
  questions};
}
