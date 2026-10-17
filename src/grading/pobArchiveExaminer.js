// Source-controlled SPARK examiner for the historical Paper 2 archive.
// This scores the student's written responses against our authored rubrics.
// For most older papers the full CXC stems are NOT yet digitised. Results
// must be labelled provisional practice estimates, never official CXC marks.
import {POB_HISTORICAL_REVIEW_BANKS,getPobHistoricalReviewBank} from "../principlesOfBusiness/data/pobHistoricalArchiveRegistry";
import {POB_2009_MJ_P2_SOURCE,verifyPob2009SourcePrompts} from "../principlesOfBusiness/data/pobHistorical2009MjP2SourceQuestions";
import {requestSemanticPass,reconcileSemanticPasses} from "./semanticMarking";

export const POB_ARCHIVE_RUBRIC_VERSION="pob-historical-archive-rubric-v1";
export const pobArchiveBankVersion=id=>"pob-archive-v1-"+id.toLowerCase();

export function eligiblePobArchiveScoringSources(){
 return POB_HISTORICAL_REVIEW_BANKS.filter(p=>p.paper===2&&p.id!=="POB-P2-2026-JAN");
}
export function validatePobArchiveSelection(paper,selectedNumbers){
 const offered=paper.questions.map(q=>q.number);
 if(new Set(offered).size!==offered.length)return false;
 const selected=selectedNumbers?.slice().sort((a,b)=>a-b);
 if(!selected||new Set(selected).size!==selected.length||
   selected.some(n=>!Number.isInteger(n)||!offered.includes(n)))return false;
 if(offered.length===5)return selected.join(",")==="1,2,3,4,5";
 if(offered.length===7)return selected.length===5&&[1,2,3].every(n=>selected.includes(n))&&
   [4,5].filter(n=>selected.includes(n)).length===1&&
   [6,7].filter(n=>selected.includes(n)).length===1;
 if(offered.length===9)return selected.length===6&&[1,2,3].every(n=>selected.includes(n))&&
   [4,5].filter(n=>selected.includes(n)).length===1&&
   [6,7].filter(n=>selected.includes(n)).length===1&&
   [8,9].filter(n=>selected.includes(n)).length===1;
 return false;
}
export function defaultPobArchiveSelection(paper){
 if(paper.questions.length===5)return [1,2,3,4,5];
 if(paper.questions.length===7)return [1,2,3,4,6];
 if(paper.questions.length===9)return [1,2,3,4,6,8];
 return [];
}
export function buildPobArchiveExaminerPack({paperId,selectedQuestions,responses={}}={}){
 const record=getPobHistoricalReviewBank(paperId);
 if(!record||record.paper!==2||record.id==="POB-P2-2026-JAN")throw new Error("unsupported_bank_version");
 const paper=record.bank;
 const fullSource=paperId==="POB-P2-2009-MJ"&&verifyPob2009SourcePrompts(paper).valid;
 if(paper.sourceSha256!==record.source.sourceSha256)throw new Error("historical_source_not_verified");
 if(!validatePobArchiveSelection(paper,selectedQuestions))throw new Error("invalid_historical_question_selection");
 if(!responses||typeof responses!=="object"||Array.isArray(responses))throw new Error("invalid_snapshot");
 const selected=paper.questions.filter(q=>selectedQuestions.includes(q.number));
 const parts=[],items=[];
 for(const q of selected){
  const questionParts=q.parts||q.items||[];
  let questionMarks=0;
  for(const part of questionParts){
   if(!Array.isArray(part.criteria)||!part.criteria.length||
       typeof part.modelAnswer!=="string"||part.modelAnswer.length<12)
     throw new Error("incomplete_historical_rubric");
   const id=paperId+":Q"+q.number+":"+part.id;
   const sum=part.criteria.reduce((n,c)=>n+Number(c.marks||0),0);
   if(sum!==part.marks||sum<=0)throw new Error("historical_criterion_marks_mismatch");
   questionMarks+=sum;
   const prompt=(fullSource&&POB_2009_MJ_P2_SOURCE.prompts[q.number+":"+part.id])||part.prompt||part.sourcePromptSummary||
      "Historical Paper 2, question "+q.number+"("+part.id+"). Use the original source booklet for exact question wording.";
   parts.push({id,question:q.number,part:part.id,maxMarks:sum,
      modelAnswer:part.modelAnswer,prompt,
      criteria:part.criteria.map((c,i)=>({id:id+":C"+(i+1),
        marks:c.marks,rule:c.rule}))});
   for(const [i,criterion] of part.criteria.entries()){
     items.push({id:id+":C"+(i+1),maxMarks:criterion.marks,responseKeys:[id],
       prompt,context:"CSEC Principles of Business historical practice: "+record.label+
         ". Original printed question should be read by candidate. "+(part.sourcePromptSummary||""),
       exemplar:part.modelAnswer,
       rubric:[{marks:criterion.marks,rule:criterion.rule,
         alternatives:part.acceptedIllustrations||criterion.alternatives||[]}],
       constraints:{historicalExaminerMarking:true,primaryResponseKey:id,
         questionNumber:q.number,criterionNumber:i+1,
         criterionCount:part.criteria.length,sourceStemFullyVerified:fullSource}
     });
   }
  }
  if(questionMarks!==(q.marks||q.maxMarks||q.maximumMarks))
    throw new Error("historical_question_marks_mismatch");
 }
 if(items.reduce((n,i)=>n+i.maxMarks,0)!==100)
   throw new Error("historical_candidate_total_mismatch");
 const allowed=new Set(parts.map(p=>p.id));
 if(Object.keys(responses).some(id=>!allowed.has(id)))
   throw new Error("unknown_historical_part");
 const clean=Object.fromEntries(parts.map(p=>[p.id,String(responses[p.id]||"")]));
 return {items,parts,responses:clean,selectedQuestions,
   maxMarks:100,criterionLevel:true,
   historicalArchiveId:paperId,historicalPaperId:paperId,
   sourceSha256:record.source.sourceSha256,
   bankVersion:pobArchiveBankVersion(paperId),
   rubricVersion:POB_ARCHIVE_RUBRIC_VERSION,
   calibrationVerified:false,sourceQuestionsDigitised:fullSource
 };
}
export async function gradePobArchiveExaminerPaper({
 pack,model,apiKey,requestPass=requestSemanticPass
}={}){
 if(!pack?.historicalArchiveId||!pack?.criterionLevel||pack?.maxMarks!==100)
   throw new Error("historical_examiner_pack_required");
 const parts=pack.parts,questions=[];
 const allCriteria=[];
 let uncertain=false;
 for(const number of pack.selectedQuestions){
  const sourceParts=parts.filter(p=>p.question===number);
  const items=pack.items.filter(i=>i.constraints.questionNumber===number);
  if(!sourceParts.length||!items.length)throw new Error("historical_question_missing");
  const answered=sourceParts.some(p=>String(pack.responses[p.id]||"").trim());
  let semantic;
  if(!answered){
   semantic={criteria:items.map(i=>({id:i.id,marks:0,maxMarks:i.maxMarks,
     minMarks:0,maxPossibleMarks:0,status:"agreed",feedback:"No answer submitted.",
     evidence:[]})),uncertain:false,score:0,minScore:0,maxScore:0};
  }else{
   const [first,second]=await Promise.all([1,2].map(pass=>
     requestPass({model,apiKey,items,responses:pack.responses,pass})));
   semantic=reconcileSemanticPasses(first,second,items,pack.responses);
  }
  allCriteria.push(...semantic.criteria);
  uncertain=uncertain||semantic.uncertain;
  const questionMax=items.reduce((n,i)=>n+i.maxMarks,0);
  questions.push({number,maxMarks:questionMax,
    score:semantic.score,minMarks:semantic.minScore,maxPossibleMarks:semantic.maxScore});
 }
 const indexed=new Map(allCriteria.map(c=>[c.id,c]));
 const partBreakdown=parts.map(p=>{
  const rows=p.criteria.map(c=>indexed.get(c.id));
  const blank=!String(pack.responses[p.id]||"").trim();
  return {...p,marks:blank?0:rows.some(c=>c.marks===null)?null:
       rows.reduce((n,c)=>n+c.marks,0),
    minMarks:blank?0:rows.reduce((n,c)=>n+c.minMarks,0),
    maxPossibleMarks:blank?0:rows.reduce((n,c)=>n+c.maxPossibleMarks,0),
    criteria:p.criteria.map((source,i)=>({...source,marks:blank?0:rows[i].marks,
      minMarks:blank?0:rows[i].minMarks,
      maxPossibleMarks:blank?0:rows[i].maxPossibleMarks,
      feedback:blank?"No answer submitted.":rows[i].feedback,
      evidence:blank?[]:rows[i].evidence||[],
      status:blank?"agreed":rows[i].status}))};
 });
 const score=questions.some(q=>q.score===null)?null:questions.reduce((n,q)=>n+q.score,0);
 return {criteria:allCriteria,questions,parts:partBreakdown,
   score,minScore:questions.reduce((n,q)=>n+q.minMarks,0),
   maxScore:questions.reduce((n,q)=>n+q.maxPossibleMarks,0),uncertain};
}
