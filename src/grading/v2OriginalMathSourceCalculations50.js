/**
 * Original Mathematics source-verified numerical calculations, batch of 50.
 * Preserve original M/A allocation, withhold any unsupported method marks.
 */
export const SOURCE_CALC_50_IDS=Object.freeze([
 "p2-q2-v10::c",
 "p2-q2-v7::c2",
 "p2-q2-v8::c2",
 "p2-q2-v9::c",
 "p2-q3-v1::c",
 "p2-q3-v10::b",
 "p2-q3-v9::b",
 "p2-q4-v1::a2",
 "p2-q4-v4::a",
 "p2-q4-v4::c",
 "p2-q4-v5::a",
 "p2-q4-v5::c",
 "p2-q4-v6::a",
 "p2-q4-v6::c",
 "p2-q4-v8::b",
 "p2-q5-v1::d",
 "p2-q5-v10::d",
 "p2-q5-v2::d",
 "p2-q5-v3::d",
 "p2-q5-v6::a",
 "p2-q5-v6::d",
 "p2-q5-v7::a",
 "p2-q5-v7::d",
 "p2-q5-v8::a",
 "p2-q5-v8::b",
 "p2-q5-v8::d",
 "p2-q5-v9::a",
 "p2-q5-v9::b",
 "p2-q5-v9::d",
 "p2-q6-v5::c",
 "p2-q7-v1::c",
 "p2-q7-v1::d",
 "p2-q7-v2::c",
 "p2-q7-v2::d",
 "p2-q7-v3::c",
 "p2-q7-v3::d",
 "p2-q7-v6::d",
 "p2-q7-v7::d",
 "p2-q8-v1::b1",
 "p2-q8-v1::b2",
 "p2-q8-v2::b1",
 "p2-q8-v2::b2",
 "p2-q8-v3::b1",
 "p2-q8-v3::b2",
 "p2-q9-v1::a2",
 "p2-q9-v1::b2",
 "p2-q9-v1::b3",
 "p2-q9-v2::a2",
 "p2-q9-v2::b2",
 "p2-q9-v2::b3"
]);
const accepted=new Set(SOURCE_CALC_50_IDS);
const obj=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const gcd=(a,b)=>b?gcd(b,a%b):a;
export function parseCalcNumber(raw){
 if(typeof raw!=="string"&&!(typeof raw==="number"&&Number.isFinite(raw)))return null;
 const s=String(raw).trim();
 if(!s||s.length>70)return null;
 const mixed=/^([+-]?\d{1,8})\s+(\d{1,8})\s*\/\s*(\d{1,8})$/.exec(s);
 if(mixed){
  const w=Number(mixed[1]),n=Number(mixed[2]),d=Number(mixed[3]);
  if(!w||!n||!d||n>=d)return null;
  return {num:(w<0?-1:1)*(Math.abs(w)+n/d),frac:true,reduced:gcd(n,d)===1};
 }
 const frac=/^([+-]?\d{1,8})\s*\/\s*(\d{1,8})$/.exec(s);
 if(frac){
  const n=Number(frac[1]),d=Number(frac[2]);
  if(!d)return null;
  return {num:n/d,frac:true,reduced:gcd(Math.abs(n),d)===1};
 }
 if(!/^[+-]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?$/.test(s))return null;
 const n=Number(s.replace(/,/g,""));
 return Number.isFinite(n)&&Math.abs(n)<=1e10?
  {num:n,frac:false,reduced:true}:null;
}
const normalize=s=>typeof s==="string"?s.trim().toLowerCase()
 .replace(/[−–—]/g,"-").replace(/[×∗]/g,"*").replace(/÷/g,"/")
 .replace(/\s+/g," ").replace(/\.$/,""):"";
const validSchema=(source,part,marks)=>{
 const scheme=source?.criteria;
 if(!Array.isArray(scheme)||scheme.length!==marks||part?.marks!==marks||
    source.answer!==part.answer||source.solution!==part.solution||
    typeof source.solution!=="string"||source.solution.trim().length<15||
    !parseCalcNumber(source.answer)||
    ["graph","construction","drawing","table"].includes(part.responseSchema?.type))return false;
 return scheme.every((c,i)=>{
  const final=i===marks-1;
  return c?.code===(final?"A1":"M"+(i+1))&&c?.kind===(final?"A":"M")&&
   c.marks===1&&c?.check&&
   (c.check.type==="manual-verification"||
    (final&&marks===2&&["numeric","fraction"].includes(c.check.type)));
 });
};
export function gradeSourceCalc50({criterionId,source,part,response}){
 if(!accepted.has(criterionId)||!obj(response)||!obj(source)||!obj(part))return null;
 const max=part.marks;
 if((max!==2&&max!==3)||!validSchema(source,part,max)||
  !Object.prototype.hasOwnProperty.call(response,"answer")||
  Object.keys(response).some(k=>k!=="answer"&&k!=="working"))return null;
 const {answer}=response,working=response.working??"";
 if((typeof answer!=="string"&&!(typeof answer==="number"&&Number.isFinite(answer)))||
   typeof working!=="string"||working.length>2000)return null;
 if(!String(answer).trim()&&!working.trim())
  return {marks:0,resolved:true,method:"source-calc-50-v1"};
 const value=parseCalcNumber(answer),expected=parseCalcNumber(source.answer);
 const validMethod=!!working.trim()&&normalize(working)===normalize(source.solution);
 if(working.trim()&&!validMethod)return null;
 const decimal=/correct to (\d+) decimal places?/i.exec(part.prompt||"");
 const precisionOk=!decimal||
   (typeof answer==="string"&&new RegExp("^\\s*[-+]?\\d+\\.\\d{"+Number(decimal[1])+"}\\s*$").test(answer));
 const bearing=/\bbearing\b/i.test(part.prompt||"")||/^0\d{2}$/.test(String(source.answer));
 const bearingOk=!bearing||/^\d{3}$/.test(String(answer).trim());
 const correct=!!value&&!!expected&&value.reduced&&precisionOk&&bearingOk&&
  (!expected.frac||value.frac)&&Math.abs(value.num-expected.num)<1e-9;
 if(!validMethod&&value)
  return {marks:Number(correct),resolved:false,method:"source-calc-50-provisional-v1"};
 return {marks:(validMethod?max-1:0)+Number(correct),resolved:true,method:"source-calc-50-v1"};
}
