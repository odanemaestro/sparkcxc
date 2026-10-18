// Paper 2 owner-source rubric alignment and staged provisional scoring.
// A structurally aligned rubric is NOT evidence of an official CXC key or
// examiner-equivalence calibration. Never enable a sitting with incomplete marks.
import {buildPobOwnerPaper2Bank} from "../principlesOfBusiness/data/pobPaper2OwnerSourceBank";

export const POB_OWNER_P2_PILOT_IDS=Object.freeze(["POB-P2-2022-JAN"]);
export const POB_OWNER_P2_RUBRIC_VERSION="pob-owner-historical-rubric-v2";
export const pobOwnerP2BankVersion=id=>"pob-archive-owner-v2-"+id.toLowerCase();

const selections=count=>count===5?[[1,2,3,4,5]]:
 count===7?[4,5].flatMap(a=>[6,7].map(b=>[1,2,3,a,b])):
 count===9?[4,5].flatMap(a=>[6,7].flatMap(b=>[8,9].map(c=>[1,2,3,a,b,c]))):[];

export function auditPobOwnerPaper2Calibration(record){
 const bank=record?.paper===2?buildPobOwnerPaper2Bank(record.id,record.bank):null;
 if(!bank)return {id:record?.id||null,ready:false,issues:["owner_source_unavailable"]};
 const issues=[],ids=new Set();
 if(bank.questions.length!==record.bank.questions.length)issues.push("question_count_mismatch");
 bank.questions.forEach((q,index)=>{
  if(q.number!==index+1)issues.push("Q"+q.number+":question_number");
  if(!record.bank.questions.some(p=>p.number===q.number))issues.push("Q"+q.number+":missing_reference_rubric");
  if(q.parts.reduce((n,p)=>n+Number(p.marks||0),0)!==q.marks)issues.push("Q"+q.number+":part_marks");
  for(const p of q.parts){
   const id="Q"+q.number+":"+p.id;
   if(ids.has(id))issues.push(id+":duplicate");
   ids.add(id);
   if(!p.prompt?.trim()||!p.modelAnswer?.trim())issues.push(id+":text_or_answer_missing");
   // A complete question transcription does not itself certify a printed figure.
   const originalText=[q.context,p.prompt].filter(Boolean).join(" ").toLowerCase();
   if(q.diagramSvg||p.diagramSvg||/figure\\s*\\d+/.test(originalText))
    issues.push(id+":original_visual_needs_qa");
   if(/\\b(?:construct|sketch|draw|plot)\\b/.test(originalText) &&
      /\\b(?:chart|graph|diagram)\\b/.test(originalText))
    issues.push(id+":candidate_drawing_input_missing");
   if(!Array.isArray(p.criteria)||p.criteria.length===0)issues.push(id+":rubric_absent_or_mark_mismatch");
   if(p.criteria?.some(c=>!c.rule?.trim()||!Number.isInteger(c.marks)||c.marks<=0))
    issues.push(id+":invalid_criterion");
   if((p.criteria||[]).reduce((n,c)=>n+Number(c.marks||0),0)!==p.marks)
    issues.push(id+":criterion_marks");
  }
 });
 const options=selections(bank.questions.length);
 if(!options.length)issues.push("unsupported_question_count");
 for(const list of options){
  const total=bank.questions.filter(q=>list.includes(q.number)).reduce((n,q)=>n+q.marks,0);
  if(total!==100)issues.push("selection_not_100:"+list.join(","));
 }
 const visualIssues=issues.filter(x=>x.endsWith(":original_visual_needs_qa")||x.endsWith(":candidate_drawing_input_missing"));
 const rubricReady=issues.length===visualIssues.length;
 return {id:record.id,ready:issues.length===0,rubricReady,issues,visualIssues,offeredQuestions:bank.questions.length,
   sourceParts:ids.size,rubricParts:bank.questions.flatMap(q=>q.parts).filter(p=>p.criteria.length>0).length,
   candidateChoices:options.length,status:!rubricReady?"needs_source_rubric_reconciliation":
   visualIssues.length?"structurally_compatible_visual_review_pending":"structurally_compatible_not_benchmarked"};
}
