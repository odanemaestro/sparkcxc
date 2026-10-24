/** Source-verified original Mathematics methods, fifty question parts.
 * Source-specific M1..Mn and A1 marks stay distinct. Other valid methods
 * require further calibration, not zero marks.
 */
export const SOURCE_METHODS_50_IDS=Object.freeze([
 "p2-q8-v2::a",
 "p2-q10-v3::a",
 "p2-q10-v3::c",
 "p2-q10-v3::d",
 "p2-q4-v3::b",
 "p2-q7-v3::b",
 "p2-q8-v3::a",
 "p2-q9-v3::a",
 "p2-q9-v3::b",
 "p2-q9-v3::c",
 "p2-q10-v4::a",
 "p2-q10-v4::c",
 "p2-q10-v4::d",
 "p2-q2-v4::a",
 "p2-q2-v4::b",
 "p2-q4-v4::d",
 "p2-q7-v4::b",
 "p2-q9-v4::a",
 "p2-q9-v4::b",
 "p2-q9-v4::c",
 "p2-q10-v5::a",
 "p2-q10-v5::c",
 "p2-q10-v5::d",
 "p2-q2-v5::a",
 "p2-q2-v5::b",
 "p2-q4-v5::d",
 "p2-q7-v5::b",
 "p2-q9-v5::a",
 "p2-q9-v5::b",
 "p2-q9-v5::c",
 "p2-q10-v6::b",
 "p2-q10-v6::c",
 "p2-q2-v6::a",
 "p2-q2-v6::b",
 "p2-q4-v6::d",
 "p2-q6-v6::c",
 "p2-q7-v6::c",
 "p2-q8-v6::d",
 "p2-q9-v6::d",
 "p2-q10-v7::b",
 "p2-q10-v7::c",
 "p2-q4-v7::c",
 "p2-q4-v7::d",
 "p2-q7-v7::c",
 "p2-q8-v7::d",
 "p2-q9-v7::d",
 "p2-q10-v8::a",
 "p2-q10-v8::c",
 "p2-q4-v8::c",
 "p2-q4-v8::d"
]);
const cohort=new Set(SOURCE_METHODS_50_IDS);
const isObject=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const clean=s=>s.trim().toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[×∗]/g,"*").replace(/÷/g,"/")
 .replace(/\s+/g," ").replace(/\.$/,"");
export function gradeOriginalSourceMethod50({criterionId,source,part,response}){
 if(!cohort.has(criterionId)||!isObject(source)||!isObject(part)||!isObject(response))return null;
 const marks=part.marks,scheme=source.criteria;
 if(!Number.isInteger(marks)||marks<3||marks>5||
  !Array.isArray(scheme)||scheme.length!==marks||
  scheme.some((c,i)=>c?.code!==(i===marks-1?"A1":"M"+(i+1))||
   c?.kind!==(i===marks-1?"A":"M")||c?.marks!==1||
   c?.check?.type!=="manual-verification")||
  source.answer!==part.answer||source.solution!==part.solution||
  typeof part.answer!=="string"||typeof part.solution!=="string"||
  !part.answer.trim()||part.solution.trim().length<25||
  ["graph","construction","drawing","table"].includes(part.responseSchema?.type))return null;
 if(!Object.prototype.hasOwnProperty.call(response,"answer")||
  Object.keys(response).some(k=>k!=="answer"&&k!=="working")||
  typeof response.answer!=="string"||
  (response.working!==undefined&&typeof response.working!=="string"))return null;
 const {answer}=response,working=response.working??"";
 if(answer.length>1800||working.length>3500)return null;
 if(!answer.trim()&&!working.trim())
  return {marks:0,resolved:true,method:"source-method-50-v1"};
 const accurate=clean(answer)===clean(part.answer);
 const methodEvidence=!!working.trim()&&clean(working)===clean(part.solution);
 if(working.trim()&&!methodEvidence)
  return {marks:0,resolved:false,method:"source-method-50-unrecognised-v1"};
 if(!methodEvidence&&answer.trim()==="banana")
  return {marks:0,resolved:true,method:"source-method-50-nonanswer-v1"};
 if(!methodEvidence)
  return {marks:Number(accurate),resolved:false,method:"source-method-50-provisional-v1"};
 return {marks:marks-1+Number(accurate),resolved:true,method:"source-method-50-v1"};
}
