/**
 * Independent, source-gated advisory evidence for SPARK Mathematics P2 Q4
 * versions 1-3. No publication, denial or trusted scoring occurs here.
 * Method allocations derived from worked solutions are provisional.
 */
import {equivalent} from "../practice/cxcMarking/algebra";

const SOURCES=Object.freeze({
 "p2-q4-v1":Object.freeze({a:2,b:7,t:4,s:2,k:-3,root:4,inner:1,
  single:15,composite:9,compositeMarks:2,inverseMarks:2,reason:true}),
 "p2-q4-v2":Object.freeze({a:3,b:-5,t:6,s:3,k:1,root:5,inner:10,
  single:13,composite:25,compositeMarks:3,inverseMarks:3,reason:false}),
 "p2-q4-v3":Object.freeze({a:4,b:3,t:2,s:4,k:-2,root:6,inner:14,
  single:11,composite:59,compositeMarks:3,inverseMarks:3,reason:false})
});
const text=value=>typeof value==="string"?value:typeof value==="number"&&Number.isFinite(value)?String(value):"";
const normalize=value=>text(value).trim().replace(/[−–—]/g,"-").replace(/×/g,"*").replace(/²/g,"^2");
const compact=value=>normalize(value).toLowerCase().replace(/\s+/g,"");
const sign=n=>n<0?"-"+Math.abs(n):"+"+n;
const parseNumber=value=>{
 const s=normalize(value).replace(/,/g,"").trim();
 return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)&&Number.isFinite(Number(s))?Number(s):null;
};
const candidate=(id,yes,reason)=>({
 id,maxMarks:1,candidateMarks:yes?1:null,
 status:yes?"candidate-correct":"unresolved",
 reason:yes?reason:"insufficient-source-evidence"
});
const finish=(questionId,partId,criteria,authored=false)=>({
 sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
 rubricAllocation:authored?"authored":"proposed-from-worked-solution",
 criteria,
 suggestedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks??0),0),
 unresolvedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks===null?c.maxMarks:0),0)
});
function hasExactStep(working,statement){
 const lines=working.split(/[;\n]/).map(x=>compact(x));
 return lines.some(line=>line===statement||line.startsWith(statement+";")||
  line.endsWith(";"+statement)||line.includes(statement+"="));
}
function correctInner(working,source){
 const q=source.s,result=source.inner,shift=sign(source.k);
 return hasExactStep(working,"g("+q+")="+result)
  ||hasExactStep(working,q+"^2"+shift+"="+result);
}
function correctOuter(working,source){
 const input=source.inner,result=source.composite,shift=sign(source.b);
 return hasExactStep(working,"f("+input+")="+result)
  ||hasExactStep(working,source.a+"("+input+")"+shift+"="+result)
  ||hasExactStep(working,source.a+"*"+input+shift+"="+result);
}
function inverseResult(answer,source){
 let expression=normalize(answer)
  .replace(/^\s*(?:f\s*\^\s*-\s*1\s*\(\s*x\s*\)|y)\s*=\s*/i,"").trim();
 if(!expression||expression.length>100||!/^[0-9xX+\-*/().^\s]+$/.test(expression))return false;
 expression=expression.replace(/X/g,"x");
 return equivalent(expression,"(x"+sign(-source.b)+")/"+source.a);
}
function roots(answer,source){
 const s=compact(answer);
 const root=source.root,values=new Set();
 if(["±"+root,"+/-"+root,"x=±"+root,"x=+/-"+root].includes(s))
  return new Set([root,-root]);
 if(!s||s.length>100)return values;
 const stripped=s.replace(/^\(/,"").replace(/\)$/,"");
 const parts=stripped.split(/,|;|\band\b|\bor\b/);
 if(parts.length>2)return values;
 for(const part of parts){
  const num=parseNumber(part.replace(/^x=/,""));
  if(num===null)return new Set();
  values.add(num);
 }
 return values;
}
function inverseReason(answer){
 const s=normalize(answer).toLowerCase().replace(/\s+/g," ");
 const negative=/(?:\bno\b|\bnot\b|\bcannot\b|\bdoesn't\b|\bdoes not\b).{0,45}\b(?:inverse|invertible)\b/.test(s)
  ||/\b(?:inverse|invertible)\b.{0,30}\b(?:doesn't exist|does not exist|cannot exist)\b/.test(s);
 const positive=/\b(?:yes|has an inverse|does have an inverse)\b/.test(s)&&
  !/\b(?:doesn't have an inverse|does not have an inverse)\b/.test(s);
 const basis=/\bmany[- ]to[- ]one\b|\bnot one[- ]to[- ]one\b/.test(s)
  ||/g\s*\(\s*4\s*\)\s*=\s*13/.test(s)&&/g\s*\(\s*-4\s*\)\s*=\s*13/.test(s);
 return {negative:negative&&!positive,basis:basis&&!positive};
}
export function evaluateMathFunctionsV2({questionId,partId,response={}}={}){
 const source=SOURCES[questionId];
 if(!source||!["a1","a2","b","c",...(source.reason?["d"]:[])].includes(partId))
  throw new TypeError("Uncalibrated Mathematics function source");
 const answer=response&&typeof response==="object"&&!Array.isArray(response)
  ?text(response.answer):text(response);
 const working=response&&typeof response==="object"&&!Array.isArray(response)
  ?text(response.working):"";
 if(partId==="a1")return finish(questionId,partId,[
  candidate("B1",parseNumber(answer)===source.single,"correct-function-evaluation")
 ]);
 if(partId==="a2"){
  const inner=correctInner(working,source),outer=correctOuter(working,source);
  const accurate=parseNumber(answer)===source.composite;
  return finish(questionId,partId,source.compositeMarks===2
   ?[candidate("M1",inner||outer,"composition-substitution"),
     candidate("A1",accurate,"correct-composition")]
   :[candidate("M1",inner,"correct-inner-function"),
     candidate("M2",outer,"outer-function-substitution"),
     candidate("A1",accurate,"correct-composition")]);
 }
 if(partId==="b"){
  const w=compact(working);
  const interchanged=w.includes("x="+source.a+"y"+sign(source.b));
  const isolated=w.includes(source.a+"y=x"+sign(-source.b))
   ||w.includes("x"+sign(-source.b)+"="+source.a+"y");
  return finish(questionId,partId,source.inverseMarks===2
   ?[candidate("M1",interchanged||isolated,"inverse-rearrangement"),
     candidate("A1",inverseResult(answer,source),"equivalent-inverse-expression")]
   :[candidate("M1",interchanged,"variables-interchanged"),
     candidate("M2",isolated,"isolating-inverse-variable"),
     candidate("A1",inverseResult(answer,source),"equivalent-inverse-expression")]);
 }
 if(partId==="c"){
  const found=roots(answer,source);
  return finish(questionId,partId,[
   candidate("B1",found.has(source.root),"positive-quadratic-root"),
   candidate("B2",found.has(-source.root),"negative-quadratic-root")]);
 }
 const reason=inverseReason(answer);
 return finish(questionId,partId,[
  candidate("B1",reason.negative,"no-inverse-stated"),
  candidate("B2",reason.basis,"many-to-one-reason")
 ],true);
}
