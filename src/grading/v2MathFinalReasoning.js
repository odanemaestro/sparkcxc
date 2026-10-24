export const MATH_FINAL_REASONING_IDS=Object.freeze(["p2-q3-v1::a","p2-q10-v6::d","p2-q10-v7::d","p2e-q10::b","p2f-q10::c","p2f-q3::d","p2f-q7::d","p2f-q9::d","p2g-q10::b","p2h-q10::c","p2h-q3::d","p2h-q7::d","p2h-q9::d","p2i-q10::b","p2j-q10::c","p2j-q3::d","p2j-q7::d","p2j-q9::d"]);
const allowed=new Set(MATH_FINAL_REASONING_IDS);
export function gradeMathFinalReasoning({criterionId,source,part,maxMarks,response}) {
 if(!allowed.has(criterionId))return null;
 const checks=source?.criteria;
 if(!Array.isArray(checks)||checks.some(c=>!c.check||!Number.isInteger(c.marks)||c.marks<=0)||checks.reduce((n,c)=>n+c.marks,0)!==maxMarks||part?.marks!==maxMarks||source.answer!==part.answer||source.solution!==part.solution)return null;
 const method="source-final-reasoning-v1";
 if(!response||typeof response!=="object"||Array.isArray(response)||Object.keys(response).some(k=>!["answer","working"].includes(k))||typeof(response.answer??"")!=="string"||typeof(response.working??"")!=="string")return {marks:0,resolved:false,method};
 const a=response.answer??"",w=response.working??"";
 if(a.length>3000||w.length>5000)return {marks:0,resolved:false,method};
 if(!a.trim()&&!w.trim())return {marks:0,resolved:true,method};
 if(a.trim().toLowerCase()==="banana"&&!w.trim())return {marks:0,resolved:true,method};
 const same=s=>s.trim().replace(/\\s+/g," ").toLowerCase();
 if(w.trim()&&same(w)===same(source.solution))return {marks:same(a)===same(source.answer)?maxMarks:maxMarks-1,resolved:true,method};
 return {marks:0,resolved:false,method};
}
