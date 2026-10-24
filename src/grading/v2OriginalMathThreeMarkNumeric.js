/**
 * Source-locked scoring of original Mathematics M1/M2/A1 numeric parts.
 * An unrecognised method abstains; a correct bare answer never proves both M marks.
 */
export const THREE_MARK_NUMERIC_IDS=Object.freeze([
 "p2-q1-v1::a",
 "p2-q5-v1::b",
 "p2-q6-v1::b",
 "p2-q1-v2::a",
 "p2-q3-v2::c",
 "p2-q4-v2::a2",
 "p2-q5-v2::b",
 "p2-q6-v2::b",
 "p2-q1-v3::a",
 "p2-q3-v3::c",
 "p2-q4-v3::a2",
 "p2-q5-v3::b",
 "p2-q6-v3::b",
 "p2-q1-v4::a",
 "p2-q10-v4::b",
 "p2-q2-v4::c",
 "p2-q3-v4::b",
 "p2-q3-v4::c",
 "p2-q1-v5::a",
 "p2-q10-v5::b",
 "p2-q2-v5::c",
 "p2-q3-v5::b",
 "p2-q3-v5::c",
 "p2-q1-v6::a",
 "p2-q2-v6::c",
 "p2-q3-v6::b",
 "p2-q3-v6::c",
 "p2-q5-v6::b",
 "p2-q1-v7::a",
 "p2-q5-v7::b",
 "p2-q6-v7::d",
 "p2-q9-v7::b",
 "p2-q1-v8::a",
 "p2-q10-v8::b",
 "p2-q5-v8::c",
 "p2-q6-v8::d",
 "p2-q9-v8::a",
 "p2-q1-v9::a",
 "p2-q10-v9::b",
 "p2-q3-v9::c",
 "p2-q5-v9::c",
 "p2-q6-v9::a",
 "p2-q1-v10::a",
 "p2-q10-v10::b",
 "p2-q3-v10::c",
 "p2-q5-v10::b",
 "p2-q6-v10::a",
 "p2-q6-v4::b",
 "p2-q6-v5::a",
 "p2-q6-v5::b"
]);
const allowed=new Set(THREE_MARK_NUMERIC_IDS);
const finite=x=>typeof x==="number"&&Number.isFinite(x);
const object=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const gcd=(a,b)=>b?gcd(b,a%b):a;
export function numericValue(raw){
 if(typeof raw!=="string"&&!finite(raw))return null;
 const s=String(raw).trim();
 if(!s||s.length>60)return null;
 const f=/^([+-]?\d{1,8})\s*\/\s*(\d{1,8})$/.exec(s);
 if(f){const n=Number(f[1]),d=Number(f[2]);return d>0?{value:n/d,fraction:true,reduced:gcd(Math.abs(n),d)===1}:null;}
 if(!/^[+-]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?$/.test(s))return null;
 const n=Number(s.replace(/,/g,""));
 return Number.isFinite(n)&&Math.abs(n)<=1e10?{value:n,fraction:false,reduced:true}:null;
}
const normalize=s=>typeof s==="string"?s.trim().toLowerCase()
 .replace(/[−–—]/g,"-").replace(/[×∗]/g,"*").replace(/÷/g,"/")
 .replace(/\s+/g," ").replace(/\.$/,""):"";
export function gradeThreeMarkNumericSource({criterionId,source,part,response}){
 if(!allowed.has(criterionId)||!object(source)||!object(part)||!object(response))return null;
 const rules=source.criteria;
 if(!Array.isArray(rules)||rules.length!==3||part.marks!==3||
  !rules.every((r,i)=>r?.code===["M1","M2","A1"][i]&&r?.kind===["M","M","A"][i]&&r?.marks===1&&typeof r?.check?.type==="string")||
  source.answer!==part.answer||source.solution!==part.solution||
  typeof source.solution!=="string"||source.solution.length<25||
  numericValue(source.answer)===null||
  ["graph","construction","drawing","table"].includes(part.responseSchema?.type))return null;
 if(!Object.prototype.hasOwnProperty.call(response,"answer")||
   Object.keys(response).some(k=>k!=="answer"&&k!=="working"))return null;
 const {answer}=response,working=response.working??"";
 if((typeof answer!=="string"&&!finite(answer))||typeof working!=="string"||
  working.length>2500)return null;
 if(!String(answer).trim()&&!working.trim())return {marks:0,resolved:true,method:"source-MMA-numeric-v1"};
 const submitted=numericValue(answer),expected=numericValue(source.answer);
 const method=!!working.trim()&&normalize(working)===normalize(source.solution);
 if(working.trim()&&!method)return null;
 const correct=!!submitted&&!!expected&&
  Math.abs(submitted.value-expected.value)<1e-9&&
  (!expected.fraction||(submitted.fraction&&submitted.reduced));
 if(correct&&!method)return null;
 return {marks:Number(method)*2+Number(correct),resolved:true,method:"source-MMA-numeric-v1"};
}
