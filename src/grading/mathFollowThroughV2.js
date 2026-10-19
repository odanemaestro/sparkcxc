/**
 * Advisory-only follow-through (error-carried-forward) evidence.
 *
 * An earlier incorrect value can be used consistently in a later step.
 * This checks a small whitelist of source-specific mathematical dependencies.
 * No mark can be published or added to another candidate from this output.
 * It does not establish whether the earlier calculation deserved credit.
 */
import { MATH_Q6_SOURCES_V2 } from "./mathMensurationTrigonometryV2";
import { MATH_Q9_SOURCES_V2 } from "./mathCircleTrigonometryBearingsV2";
import { MATH_Q10_SOURCES_V2 } from "./mathMatricesVectorsV2";

const raw=v=>typeof v==="string"?v:typeof v==="number"&&Number.isFinite(v)?String(v):"";
const answer=v=>v&&typeof v==="object"&&!Array.isArray(v)?raw(v.answer):raw(v);
const work=v=>v&&typeof v==="object"&&!Array.isArray(v)?raw(v.working):"";
const ambiguous=v=>/\b(?:or|either|maybe|perhaps|approximately|not|wrong|incorrect)\b/i.test(raw(v));
const compact=v=>raw(v).toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[×∗]/g,"*").replace(/÷/g,"/").replace(/\s+/g,"");
const numeric=v=>{
 const s=answer(v).trim().replace(/,/g,"").replace(/[−–—]/g,"-")
  .replace(/\s*(?:cm(?:\^?[23])?|m(?:\^?[23])?|hours?|hrs?|km)\s*$/i,"");
 return /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(s)?Number(s):null;
};
const close=(a,b,epsilon=0.011)=>a!==null&&b!==null&&
 Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=epsilon;
const plausible=(value,correct)=>value!==null&&Number.isFinite(value)&&
 value>correct*0.25&&value<correct*3&&!close(value,correct);
const numberText=v=>String(Number(v));
function evidenceEquation(response,left,right){
 const s=compact(work(response));
 if(!s||ambiguous(work(response)))return false;
 return s.split(/[;\n]/).some(piece=>{
  const halves=piece.split("=");
  return halves.length===2&&
   halves[0]===compact(left)&&close(numeric(halves[1]),right);
 });
}
function vector(v){
 const m=/^\(?\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)?$/.exec(answer(v).trim());
 return m?[Number(m[1]),Number(m[2])]:null;
}
function saneVector(v,source){
 return v?.length===2&&v.every((n,i)=>Number.isFinite(n)&&
  Math.abs(n)<Math.max(20,Math.abs(source[i])*4));
}
function numericFollowThrough(q,p,current,earlier){
 const s=MATH_Q6_SOURCES_V2[q];
 if(!s||!["cylinder","prism"].includes(s.kind))return null;
 let dependency,multiplier,operation,expectedPrior,expectedResult;
 if(p==="b"){
  dependency="a";
  multiplier=s.kind==="cylinder"?s.h:s.length;
  operation="*";
  expectedPrior=s.area;
  expectedResult=s.answers.b;
 }else if(p==="d"&&s.kind==="cylinder"){
  dependency="b";multiplier=s.rate;operation="/";
  expectedPrior=s.volume;expectedResult=s.time;
 }else return null;
 const prev=numeric(earlier?.[dependency]);
 const currentNumber=numeric(current);
 if(!plausible(prev,expectedPrior)||currentNumber===null)return null;
 const computed=operation==="*"?prev*multiplier:prev/multiplier;
 if(close(currentNumber,expectedResult)||!close(currentNumber,computed))return null;
 const priorText=numberText(prev),factor=numberText(multiplier);
 const valid=evidenceEquation(current,priorText+operation+factor,computed)||
  (operation==="*"&&evidenceEquation(current,factor+"*"+priorText,computed));
 return valid?{
  dependency,sourceValue:prev,computedValue:computed,relationship:operation==="*"
   ?"prior-area-times-height-or-length":"prior-volume-divided-by-rate"
 }:null;
}
function positionFollowThrough(q,p,current,earlier){
 const s=MATH_Q10_SOURCES_V2[q];
 if(s?.kind!=="position"||p!=="c")return null;
 const prior=vector(earlier?.a),candidate=vector(current);
 if(!saneVector(prior,s.ab)||!candidate||
  prior.every((x,i)=>close(x,s.ab[i],1e-9)))return null;
 const portion=s.ratio[0]/(s.ratio[0]+s.ratio[1]);
 const output=s.a.map((x,i)=>x+portion*prior[i]);
 if(output.every((x,i)=>close(x,s.c[i]))||
  !candidate.every((x,i)=>close(x,output[i])))return null;
 const ratio=s.ratio[0]+"/"+(s.ratio[0]+s.ratio[1]);
 const left="("+s.a.join(",")+")+"+ratio+"*("+prior.join(",")+")";
 const original=compact(work(current));
 const lines=original.split(/[;\n]/).filter(Boolean);
 if(ambiguous(work(current))||!lines.some(line=>
   line===compact(left)+"=("+output.join(",")+")"||
   line===compact(left)+"=("+candidate.join(",")+")"))return null;
 return {dependency:"a",sourceValue:prior,computedValue:output,
  relationship:"oa-plus-ratio-times-earlier-ab"};
}
function inverseFollowThrough(q,p,current,earlier){
 const s=MATH_Q10_SOURCES_V2[q];
 if(s?.kind!=="matrix"||p!=="c")return null;
 const prior=numeric(earlier?.b);
 if(!Number.isInteger(prior)||!plausible(prior,s.det)||prior===0)return null;
 const matrix="[["+s.inverse.slice(0,2).join(",")+"],["+
  s.inverse.slice(2).join(",")+"]]";
 const input=compact(answer(current)).replace(/^m(?:\^-?1|⁻¹)=/,"");
 if(input!=="(1/"+prior+")"+matrix&&input!=="1/"+prior+matrix&&
  input!=="(1/"+prior+")*"+matrix)return null;
 return {dependency:"b",sourceValue:prior,computedValue:"1/"+prior+matrix,
  relationship:"adjugate-divided-by-earlier-determinant"};
}
function cosineFollowThrough(q,p,current,earlier){
 const s=MATH_Q9_SOURCES_V2[q];
 if(s?.kind!=="cosine"||p!=="b")return null;
 const previousText=answer(earlier?.a).trim(),previous=numeric(earlier?.a);
 if(!/^\d+\.\d$/.test(previousText)||!plausible(previous,s.km))return null;
 if(previous<=Math.abs(s.lk-s.lm)||previous>=s.lk+s.lm)return null;
 const ratio=(s.lk**2+previous**2-s.lm**2)/(2*s.lk*previous);
 if(ratio<=-1||ratio>=1)return null;
 const calculated=Math.round(Math.acos(ratio)*180/Math.PI);
 const final=numeric(current);
 if(!close(final,calculated,0.001)||close(final,s.atK,0.001)||
  !/^\d+$/.test(answer(current).trim()))return null;
 const middle="("+s.lk+"^2+"+previous+"^2-"+s.lm+
  "^2)/(2*"+s.lk+"*"+previous+")";
 const w=compact(work(current));
 if(!w||ambiguous(work(current))||!w.split(/[;\n=]/).includes(compact(middle)))return null;
 return {dependency:"a",sourceValue:previous,computedValue:calculated,
  relationship:"cosine-rule-angle-using-earlier-side"};
}
export function evaluateMathFollowThroughV2({
 questionId,partId,response={},precedingResponses={}
}={}){
 // No supplied client rule or arbitrary question identifier is trusted.
 const source=MATH_Q6_SOURCES_V2[questionId]||
  MATH_Q9_SOURCES_V2[questionId]||MATH_Q10_SOURCES_V2[questionId];
 if(!source||!Object.prototype.hasOwnProperty.call(source.marks,partId))
  throw new TypeError("Uncalibrated Mathematics follow-through source");
 const candidate=numericFollowThrough(questionId,partId,response,precedingResponses)||
  positionFollowThrough(questionId,partId,response,precedingResponses)||
  inverseFollowThrough(questionId,partId,response,precedingResponses)||
  cosineFollowThrough(questionId,partId,response,precedingResponses);
 return {
  sourcePart:questionId+"::"+partId,
  authority:"advisory",publishable:false,additiveToScore:false,
  rubricAllocation:"unverified-follow-through-review-only",
  requiresRubricReconciliation:true,
  dependency:candidate?.dependency??null,
  criteria:[{
   id:"FT-review-1",maxMarks:1,
   candidateMarks:candidate?1:null,
   status:candidate?"candidate-follow-through":"unresolved",
   reason:candidate?.relationship??"no-supported-cross-part-evidence"
  }],
  suggestedMarks:candidate?1:0,
  // Separate evidence, NOT an extra mark on the original paper.
  evidence:candidate?{dependency: candidate.dependency,
   sourceValue:candidate.sourceValue,computedValue:candidate.computedValue}:null
 };
}
