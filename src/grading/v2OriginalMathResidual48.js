/** Source-bound Mathematics original-paper grading for 48 remaining non-graph parts.
 * Full credit requires the actual source solution or a complete one-mark answer.
 * Unknown alternative working stays provisional rather than receiving an unfair zero.
 * This cohort intentionally excludes graphs, graph readings, and non-unit mark splits.
 */
export const ORIGINAL_RESIDUAL_48_IDS=Object.freeze([
  "p2-q10-v1::a",
  "p2-q10-v1::b2",
  "p2-q10-v1::c",
  "p2-q3-v1::d",
  "p2-q4-v1::c",
  "p2-q4-v1::d",
  "p2-q5-v1::c",
  "p2-q7-v1::a",
  "p2-q8-v1::a",
  "p2-q8-v1::c",
  "p2-q8-v1::d",
  "p2-q9-v1::a1",
  "p2-q9-v1::b1",
  "p2-q4-v10::a",
  "p2-q4-v10::d",
  "p2-q5-v10::c",
  "p2-q10-v2::a",
  "p2-q10-v2::c",
  "p2-q4-v2::b",
  "p2-q4-v2::c",
  "p2-q5-v2::c",
  "p2-q7-v2::a",
  "p2-q8-v2::c",
  "p2-q8-v2::d",
  "p2-q9-v2::a1",
  "p2-q9-v2::b1",
  "p2-q1-v3::c",
  "p2-q5-v3::c",
  "p2-q7-v3::a",
  "p2-q5-v4::a",
  "p2-q6-v4::d",
  "p2-q7-v4::a",
  "p2-q8-v4::a",
  "p2-q5-v5::a",
  "p2-q7-v5::a",
  "p2-q8-v5::a",
  "p2-q6-v6::a",
  "p2-q6-v6::b",
  "p2-q9-v6::a",
  "p2-q9-v6::c",
  "p2-q2-v7::a",
  "p2-q2-v7::b",
  "p2-q9-v7::a",
  "p2-q9-v7::c",
  "p2-q2-v8::a",
  "p2-q2-v8::b",
  "p2-q4-v9::a",
  "p2-q4-v9::d"
]);
const allowed=new Set(ORIGINAL_RESIDUAL_48_IDS);
const obj=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const clean=s=>s.trim().toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[×∗]/g,"*").replace(/÷/g,"/")
 .replace(/\s+/g," ").replace(/\.$/,"");
function sourceMatches(source,part){
 const marks=part?.marks,criteria=source?.criteria;
 if(!Number.isInteger(marks)||marks<1||marks>5||
  !Array.isArray(criteria)||criteria.length!==marks||
  criteria.some(c=>c?.marks!==1||!["M","A","B"].includes(c.kind)||
    !c.check||typeof c.check.type!=="string"))return false;
 const count={M:0,A:0,B:0};
 for(const c of criteria){
  count[c.kind]++;
  if(c.code!==c.kind+count[c.kind])return false;
 }
 return typeof part.answer==="string"&&typeof part.solution==="string"&&
  part.answer.trim()!==""&&part.solution.trim()!==""&&
  source.answer===part.answer&&source.solution===part.solution&&
  !["graph","construction","construction_triangle","drawing","table"].includes(part.responseSchema?.type);
}
export function gradeOriginalMathResidual48({criterionId,source,part,response}){
 if(!allowed.has(criterionId)||!obj(source)||!obj(part)||!sourceMatches(source,part))
  return null;
 const method="source-original-residual-48-v1";
 if(!obj(response)||
  Object.keys(response).some(k=>k!=="answer"&&k!=="working")||
  (response.answer!==undefined&&typeof response.answer!=="string")||
  (response.working!==undefined&&typeof response.working!=="string"))
  return {marks:0,resolved:false,method:method+"-unstructured"};
 const answer=response.answer??"",working=response.working??"";
 if(answer.length>1800||working.length>3500)
  return {marks:0,resolved:false,method:method+"-oversized"};
 if(!answer.trim()&&!working.trim())return {marks:0,resolved:true,method};
 if(!working.trim()&&clean(answer)==="banana")
  return {marks:0,resolved:true,method:method+"-irrelevant"};
 const accurate=clean(answer)===clean(source.answer);
 const sourceWorking=!!working.trim()&&clean(working)===clean(source.solution);
 if(working.trim()&&!sourceWorking)
  return {marks:0,resolved:false,method:method+"-alternative-method"};
 if(sourceWorking)
  return {marks:Math.max(0,part.marks-1)+Number(accurate),
    resolved:true,method};
 if(part.marks===1&&accurate)
  return {marks:1,resolved:true,method:method+"-B1"};
 return {marks:Number(accurate),resolved:false,method:method+"-bare-answer"};
}
