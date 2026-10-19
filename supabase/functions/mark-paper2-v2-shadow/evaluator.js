/**
 * Server-side V2 shadow diagnostics. Advisory only, never grade authority.
 * Only complete scalar numerical responses qualify for machine suggestions.
 * Semantic similarity, regex searches within prose, and unsupported answer
 * formats remain unresolved. No raw learner answers leave this evaluator.
 */
const scalarNumber=value=>{
 if(typeof value==="number")return Number.isFinite(value)?value:null;
 if(typeof value!=="string"||value.length>100||
    !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value.trim()))return null;
 const numeric=Number(value.trim());
 return Number.isFinite(numeric)?numeric:null;
};
const extractField=(entry,field)=>{
 if(typeof entry==="string"||typeof entry==="number")
  return field==="answer"?entry:null;
 if(!entry||typeof entry!=="object"||Array.isArray(entry))return null;
 return entry[field]??null;
};
export function evaluateV2ShadowDiagnostics({criteria,responses}={}){
 if(!Array.isArray(criteria)||criteria.length===0||criteria.length>10000||
    !responses||typeof responses!=="object"||Array.isArray(responses))
  throw new TypeError("Invalid server-owned shadow inputs");
 const seen=new Set(),candidates=[];
 let maxMarks=0;
 for(const c of criteria){
  if(!c||typeof c.id!=="string"||!c.id.trim()||seen.has(c.id)||
     !Number.isSafeInteger(c.maxMarks)||c.maxMarks<=0)
   throw new TypeError("Invalid server-owned shadow criterion");
  seen.add(c.id);maxMarks+=c.maxMarks;
  const answer=extractField(responses[c.id],"answer");
  const working=extractField(responses[c.id],"working");
  const marks=c.sourceMarking;
  let suggested=0,rule=null;
  const checks=Array.isArray(marks?.criteria)?marks.criteria:null;
  if(checks?.length){
   const codes=new Set();
   for(const step of checks){
    if(step?.check?.type!=="numeric"||!Number.isSafeInteger(step.marks)||
       step.marks<=0||!Array.isArray(step.depends)||step.depends.length>0||
       typeof step.code!=="string"||codes.has(step.code)||
       !Number.isFinite(step.check.value)||
       !Number.isFinite(step.check.tolerance)||step.check.tolerance<0)continue;
    codes.add(step.code);
    const text=step.field==="working"?working:step.field==="answer"?answer:null;
    const numeric=scalarNumber(text);
    if(numeric!==null&&Math.abs(numeric-step.check.value)<=step.check.tolerance)
      suggested+=step.marks;
   }
   if(suggested>0)rule="typed-numeric-check";
  }else if(checks===null||checks.length===0){
   const expected=scalarNumber(marks?.answer);
   const provided=scalarNumber(answer);
   if(expected!==null&&provided!==null&&expected===provided){
    suggested=c.maxMarks;
    rule="scalar-answer-match";
   }
  }
  if(suggested>0){
   if(suggested>c.maxMarks)throw new TypeError("Shadow criterion suggestion exceeds maximum");
   candidates.push({criterionId:c.id,suggestedMarks:suggested,rule});
  }
 }
 if(!Number.isSafeInteger(maxMarks)||maxMarks<=0||maxMarks>1000)
  throw new TypeError("Invalid paper mark total");
 return {reviewedItems:criteria.length,maxMarks,
  candidates,candidateParts:candidates.length,
  candidateMarks:candidates.reduce((n,c)=>n+c.suggestedMarks,0),
  confirmedMarks:0,unresolvedMarks:maxMarks,canPublishFinalScore:false};
}
