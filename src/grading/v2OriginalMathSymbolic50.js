/** Conservative source-pinned original Mathematics M/A grading.
 * Unrecognised working is unresolved and never graded incorrect.
 */
export const SOURCE_SYMBOLIC_50_IDS=Object.freeze([
 "p2-q10-v10::d",
 "p2-q10-v6::a",
 "p2-q10-v7::a",
 "p2-q10-v8::d",
 "p2-q10-v9::d",
 "p2-q2-v10::a",
 "p2-q2-v3::a",
 "p2-q2-v3::b1",
 "p2-q2-v3::b2",
 "p2-q2-v3::c2",
 "p2-q2-v7::c1",
 "p2-q2-v8::c1",
 "p2-q2-v9::a",
 "p2-q3-v1::b",
 "p2-q3-v7::a",
 "p2-q3-v8::a",
 "p2-q4-v1::b",
 "p2-q4-v10::b",
 "p2-q4-v10::c",
 "p2-q4-v3::c",
 "p2-q4-v4::b",
 "p2-q4-v5::b",
 "p2-q4-v6::b",
 "p2-q4-v7::b",
 "p2-q4-v9::b",
 "p2-q4-v9::c",
 "p2-q5-v4::a",
 "p2-q5-v5::a",
 "p2-q5-v6::c",
 "p2-q5-v7::c",
 "p2-q7-v10::e",
 "p2-q7-v3::a",
 "p2-q7-v4::a",
 "p2-q7-v5::a",
 "p2-q7-v6::a",
 "p2-q7-v6::b",
 "p2-q7-v7::a",
 "p2-q7-v7::b",
 "p2-q7-v8::e",
 "p2-q7-v9::e",
 "p2-q8-v3::c",
 "p2-q8-v3::d",
 "p2-q8-v4::c",
 "p2-q8-v4::d",
 "p2-q8-v5::c",
 "p2-q8-v5::d",
 "p2-q8-v6::c",
 "p2-q8-v7::c",
 "p2-q4-v10::a",
 "p2-q5-v10::c"
]);
const allowed=new Set(SOURCE_SYMBOLIC_50_IDS);
const obj=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const normalize=s=>s.trim().toLowerCase()
 .replace(/[−–—]/g,"-").replace(/[×∗]/g,"*").replace(/÷/g,"/")
 .replace(/\s+/g,"").replace(/；/g,";").replace(/，/g,",");
export function gradeSourceSymbolic50({criterionId,source,part,response}){
 if(!allowed.has(criterionId)||!obj(source)||!obj(part)||!obj(response))return null;
 const max=part.marks,rs=source.criteria;
 if(![2,3].includes(max)||!Array.isArray(rs)||rs.length!==max)return null;
 if(rs.some((r,i)=>r?.code!==(i===max-1?"A1":"M"+(i+1))||
  r?.kind!==(i===max-1?"A":"M")||r?.marks!==1||
  r?.check?.type!=="manual-verification"))return null;
 if(source.answer!==part.answer||source.solution!==part.solution||
  typeof source.answer!=="string"||typeof source.solution!=="string"||
  !source.answer.trim()||!source.solution.trim()||
  ["graph","drawing","construction","table"].includes(part.responseSchema?.type))return null;
 if(!Object.prototype.hasOwnProperty.call(response,"answer")||
  Object.keys(response).some(k=>k!=="answer"&&k!=="working")||
  typeof response.answer!=="string"||
  (response.working!==undefined&&typeof response.working!=="string"))return null;
 const {answer}=response,working=response.working??"";
 if(answer.length>1200||working.length>2400)return null;
 if(!answer.trim()&&!working.trim())
  return {marks:0,resolved:true,method:"source-symbolic-50-v1"};
 const correct=normalize(answer)===normalize(source.answer);
 const sourceWorking=!!working.trim()&&normalize(working)===normalize(source.solution);
 if(working.trim()&&!sourceWorking)
  return {marks:0,resolved:false,method:"source-symbolic-50-unknown-working-v1"};
 if(!sourceWorking)
  return {marks:Number(correct),resolved:false,method:"source-symbolic-50-provisional-v1"};
 return {marks:max-1+Number(correct),resolved:true,method:"source-symbolic-50-v1"};
}
