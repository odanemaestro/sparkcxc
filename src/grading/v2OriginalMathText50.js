/** Exact source-bound original Paper 2 short-answer evidence, 50 parts.
 * Conservative resolution. Unknown student methods remain provisional.
 */
export const ORIGINAL_TEXT_50_IDS=Object.freeze([
 "p2-q2-v1::c2",
 "p2-q7-v1::a",
 "p2-q7-v1::b",
 "p2-q2-v10::b",
 "p2-q7-v10::a",
 "p2-q7-v10::b",
 "p2-q8-v10::a",
 "p2-q8-v10::b2",
 "p2-q9-v10::c",
 "p2-q9-v10::d",
 "p2-q10-v10::a",
 "p2-q10-v10::c",
 "p2-q2-v2::c2",
 "p2-q3-v2::b",
 "p2-q7-v2::a",
 "p2-q7-v2::b",
 "p2-q2-v3::c1",
 "p2-q3-v3::b",
 "p2-q4-v3::a1",
 "p2-q7-v3::a",
 "p2-q7-v4::a",
 "p2-q7-v5::a",
 "p2-q8-v6::a",
 "p2-q8-v6::b",
 "p2-q3-v7::b",
 "p2-q3-v7::c",
 "p2-q4-v7::a",
 "p2-q8-v7::a",
 "p2-q8-v7::b",
 "p2-q3-v8::b",
 "p2-q3-v8::c",
 "p2-q4-v8::a",
 "p2-q7-v8::a",
 "p2-q7-v8::b",
 "p2-q8-v8::a",
 "p2-q8-v8::b2",
 "p2-q9-v8::b",
 "p2-q9-v8::c",
 "p2-q9-v8::d",
 "p2-q2-v9::b",
 "p2-q7-v9::a",
 "p2-q7-v9::b",
 "p2-q8-v9::a",
 "p2-q8-v9::b2",
 "p2-q9-v9::a",
 "p2-q9-v9::b",
 "p2-q9-v9::c",
 "p2-q9-v9::d",
 "p2-q10-v9::a",
 "p2-q10-v9::c"
]);
const allowed=new Set(ORIGINAL_TEXT_50_IDS);
const obj=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const norm=s=>s.trim().toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[×∗]/g,"*").replace(/÷/g,"/").replace(/\s+/g," ").replace(/\.$/,"");
const schemaOk=(source,part)=>{
 const marks=part?.marks,checks=source?.criteria;
 return Number.isInteger(marks)&&marks>=1&&marks<=5&&
  Array.isArray(checks)&&checks.length===marks&&
  checks.every((c,i)=>c?.marks===1&&c?.check?.type==="manual-verification"&&
   ["A","B","M"].includes(c.kind)&&
   c.code===(c.kind==="A"?"A":c.kind)+(c.kind==="A"?1:
    checks.slice(0,i+1).filter(y=>y.kind===c.kind).length))&&
  source.answer===part.answer&&source.solution===part.solution&&
  typeof part.answer==="string"&&typeof part.solution==="string"&&
  !!part.answer.trim()&&part.solution.trim().length>20&&
  !["graph","construction","drawing","table"].includes(part.responseSchema?.type);
};
export function gradeOriginalText50({criterionId,source,part,response}){
 if(!allowed.has(criterionId)||!obj(source)||!obj(part)||!obj(response)||
  !schemaOk(source,part))return null;
 if(!Object.prototype.hasOwnProperty.call(response,"answer")||
  Object.keys(response).some(k=>k!=="answer"&&k!=="working")||
  typeof response.answer!=="string"||
  (response.working!==undefined&&typeof response.working!=="string"))return null;
 const {answer}=response,working=response.working??"";
 if(answer.length>1800||working.length>3500)return null;
 if(!answer.trim()&&!working.trim())
  return {marks:0,resolved:true,method:"source-text-50-v1"};
 const correct=norm(answer)===norm(part.answer);
 const fullWork=!!working.trim()&&norm(working)===norm(part.solution);
 if(working.trim()&&!fullWork)return {marks:0,resolved:false,
  method:"source-text-50-unknown-working-v1"};
 if(!fullWork&&norm(answer)==="banana")return {marks:0,resolved:true,
  method:"source-text-50-nonanswer-v1"};
 if(!fullWork){
  if(part.marks===1&&source.criteria[0].kind==="A"&&correct)
   return {marks:1,resolved:true,method:"source-text-50-A1-v1"};
  return {marks:Number(correct&&source.criteria[part.marks-1].kind==="A"),
   resolved:false,method:"source-text-50-provisional-v1"};
 }
 return {marks:part.marks-1+Number(correct),resolved:true,method:"source-text-50-v1"};
}
