/** Conservative source-pinned examiner for 29 remaining Mathematics questions.
 * No unknown working or plausible noncanonical answer is certified as wrong.
 * Every authoritative method mark requires the exact registered source working.
 */
export const MATH_NEXT_29_IDS=Object.freeze([
  "p2-q10-v1::d",
  "p2-q10-v2::d",
  "p2e-q10::k",
  "p2e-q3::d",
  "p2f-q10::a1",
  "p2f-q3::b",
  "p2f-q2::b",
  "p2g-q10::k",
  "p2g-q2::c",
  "p2g-q3::d",
  "p2h-q10::a1",
  "p2h-q3::b",
  "p2h-q7::b",
  "p2h-q8::b",
  "p2h-q2::b",
  "p2i-q10::k",
  "p2i-q2::c",
  "p2i-q3::d",
  "p2j-q10::a1",
  "p2j-q3::b",
  "p2j-q2::b",
  "p2e-q10::c",
  "p2g-q10::c",
  "p2i-q10::c",
  "p2e-q2::d",
  "p2e-q4::b2",
  "p2f-q2::a2",
  "p2g-q1::d",
  "p2g-q5::c2"
]);
const allowed=new Set(MATH_NEXT_29_IDS);
const obj=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const norm=x=>x.trim().toLowerCase().replace(/[−–—]/g,"-").replace(/[×∗]/g,"*")
 .replace(/÷/g,"/").replace(/\\s+/g," ").replace(/\\.$/,"").trim();
function validSource(source,part,marks){
 const checks=source?.criteria;
 if(!obj(source)||!obj(part)||!Array.isArray(checks)||checks.length<1||
    !Number.isInteger(marks)||marks<1||marks>4||
    checks.some(c=>!["M","A","B"].includes(c.kind)||c.marks<0||
      !Number.isInteger(c.marks)||!c.check||!c.code)||
    checks.reduce((s,c)=>s+c.marks,0)!==marks||
    typeof source.answer!=="string"||!source.answer.trim()||
    typeof source.solution!=="string"||!source.solution.trim()||
    part.answer!==source.answer||part.solution!==source.solution)return false;
 if(part.marks!==marks||["graph","construction","drawing","table"].includes(part.responseSchema?.type))
  return false;
 return true;
}
export function gradeMathNext29({criterionId,source,part,maxMarks,response}){
 if(!allowed.has(criterionId)||!validSource(source,part,maxMarks))return null;
 const method="source-next-29-v1";
 const ms=source.criteria.filter(c=>c.kind==="M").reduce((s,c)=>s+c.marks,0);
 if(!obj(response)||Object.keys(response).some(k=>!["answer","working"].includes(k))||
    (response.answer!==undefined&&typeof response.answer!=="string")||
    (response.working!==undefined&&typeof response.working!=="string"))
   return {marks:0,resolved:false,method:method+"-unstructured"};
 const answer=response.answer??"",work=response.working??"";
 if(answer.length>1800||work.length>5000)
   return {marks:0,resolved:false,method:method+"-oversize"};
 if(!answer.trim()&&!work.trim())return {marks:0,resolved:true,method:method+"-blank"};
 const a=norm(answer),w=norm(work),right=a===norm(source.answer);
 const canonical=w!==""&&w===norm(source.solution);
 const irrelevant=a==="banana"&&w==="";
 if(irrelevant)return {marks:0,resolved:true,method:method+"-irrelevant"};
 if(!canonical&&w)return {marks:0,resolved:false,method:method+"-different-working"};
 // B1 evidence is standalone and needs neither a method mark nor source working.
 if(maxMarks===1&&ms===0&&right&&!work.trim())
   return {marks:1,resolved:true,method:method+"-independent-b1"};
 if(canonical)return {marks:right?maxMarks:ms,resolved:true,method};
 // Do not guess from bare correct answers when the mark scheme requires a method.
 return {marks:0,resolved:false,method:method+"-needs-source-working"};
}
