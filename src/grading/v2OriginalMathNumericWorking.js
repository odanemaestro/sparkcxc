/**
 * Fifty deliberately limited original-paper numeric method/accuracy checks.
 *
 * The registered M1 and A1 rows in these papers are source-manual drafts.
 * A typed correct number DOES NOT establish the M mark. A source-authored
 * worked solution establishes one M mark; the independently entered numeric
 * answer establishes A. Unsupported or unfamiliar working remains provisional.
 * This intentionally favours abstention over false marking of alternate work.
 */
export const SOURCE_NUMERIC_TWO_MARK_IDS=Object.freeze([
 "p2-q1-v3::b1",
 "p2-q1-v3::b2",
 "p2-q1-v4::b1",
 "p2-q1-v4::b2",
 "p2-q1-v4::b3",
 "p2-q1-v5::b1",
 "p2-q1-v5::b2",
 "p2-q1-v5::c",
 "p2-q1-v6::b1",
 "p2-q1-v6::b2",
 "p2-q1-v6::c",
 "p2-q1-v7::b1",
 "p2-q1-v7::b2",
 "p2-q1-v7::c",
 "p2-q1-v8::b1",
 "p2-q1-v8::b2",
 "p2-q1-v8::c",
 "p2-q1-v9::b1",
 "p2-q1-v9::b2",
 "p2-q1-v9::c",
 "p2-q1-v10::b1",
 "p2-q1-v10::b2",
 "p2-q1-v10::c",
 "p2-q6-v1::a",
 "p2-q6-v1::c",
 "p2-q6-v2::a",
 "p2-q6-v2::c",
 "p2-q6-v3::a",
 "p2-q6-v3::c",
 "p2-q6-v3::d",
 "p2-q6-v4::a",
 "p2-q6-v4::c",
 "p2-q6-v7::a",
 "p2-q6-v7::b",
 "p2-q6-v7::c",
 "p2-q6-v8::a",
 "p2-q6-v8::b",
 "p2-q6-v8::c",
 "p2-q7-v4::c",
 "p2-q7-v4::d",
 "p2-q7-v5::c",
 "p2-q7-v5::d",
 "p2-q7-v8::c",
 "p2-q7-v8::d",
 "p2-q7-v9::c",
 "p2-q7-v9::d",
 "p2-q7-v10::c",
 "p2-q7-v10::d",
 "p2-q10-v2::b",
 "p2-q10-v3::b"
]);
const ALLOWED=new Set(SOURCE_NUMERIC_TWO_MARK_IDS);
const own=Object.prototype.hasOwnProperty;
const plain=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const numeric=/^[+-]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?$/;
const parse=s=>{
 if(typeof s!=="string"&&typeof s!=="number")return null;
 const v=String(s).trim();
 if(v.length>50||!numeric.test(v))return null;
 const n=Number(v.replace(/,/g,""));
 return Number.isFinite(n)&&Math.abs(n)<=1e10?n:null;
};
const clean=s=>typeof s==="string"?s.trim()
 .replace(/[−–—]/g,"-").replace(/[×∗]/g,"*").replace(/÷/g,"/")
 .replace(/\s+/g," ").replace(/\.$/,"").toLowerCase():"";
const schemeOk=(source,part)=>{
 const rules=source?.criteria;
 return Array.isArray(rules)&&rules.length===2&&
  rules[0]?.code==="M1"&&rules[0]?.kind==="M"&&rules[0]?.marks===1&&
  rules[1]?.code==="A1"&&rules[1]?.kind==="A"&&rules[1]?.marks===1&&
  rules[0].check?.type==="manual-verification"&&
  typeof rules[0].check.evidence==="string"&&
  rules[0].check.evidence.trim().length>20&&
  (rules[1].check?.type==="numeric"||
   (rules[1].check?.type==="manual-verification"&&
    typeof rules[1].check.evidence==="string"&&
    rules[1].check.evidence.trim().length>20))&&
  source?.answer===part?.answer&&source?.solution===part?.solution&&
  typeof source?.solution==="string"&&source.solution.trim().length>=18&&
  typeof source.answer==="string"&&parse(source.answer)!==null&&
  part.marks===2&&
  !["graph","construction","table","drawing"].includes(part?.responseSchema?.type);
};
export function gradeOriginalMathNumericWorking({criterionId,source,part,response}){
 if(!ALLOWED.has(criterionId))return null;
 if(!schemeOk(source,part)||!plain(response)||!own.call(response,"answer"))
  return null;
 if(Object.keys(response).some(key=>!["answer","working"].includes(key)))return null;
 const a=response.answer,w=response.working??"";
 if((typeof a!=="number"&&typeof a!=="string")||
    (typeof a==="number"&&!Number.isFinite(a))||
    typeof w!=="string"||w.length>1600)return null;
 const answer=String(a).trim();
 const working=w.trim();
 if(!answer&&!working)return {marks:0,resolved:true,method:"source-atomic-numeric-m1-a1-v1"};
 const expected=parse(source.answer),got=parse(answer);
 // Strictly allow only canonical, source-proven method working. Other
 // nonempty methods are not evaluated here and must never be marked wrong.
 const sourceMethod=working.length>0&&clean(working)===clean(source.solution);
 if(working&&!sourceMethod)return null;
 const accuracy=got!==null&&Math.abs(got-expected)<1e-7;
 // No worked evidence with a correct final answer leaves M1 unknown.
 if(accuracy&&!sourceMethod)return null;
 // Wrong/no answer with no working is conclusively zero for these parts.
 const marks=Number(sourceMethod)+Number(accuracy);
 return {marks,resolved:true,method:"source-atomic-numeric-m1-a1-v1"};
}
