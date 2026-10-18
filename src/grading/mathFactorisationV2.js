/**
 * Mathematics Paper 2 Q2, authored SPARK source factorisation calibration.
 *
 * Only the two explicitly mapped SPARK originals are supported. All checks
 * are advisory: source scheme gives 2 marks per part but does not contain an
 * authored M/A breakdown. One candidate method and one accuracy mark are
 * calibration proposals, never a final grade or a denial of other methods.
 */
import {equivalent,isFullyFactorised} from "../practice/cxcMarking/algebra";

const SOURCES=Object.freeze({
 "p2-q2-v1":Object.freeze({
  b1:Object.freeze({original:"4m^2-100n^2",partial:"4(m^2-25n^2)",answer:"4(m-5n)(m+5n)"}),
  b2:Object.freeze({original:"2x^2+5x-12",partial:"2x^2+8x-3x-12",group:"2x(x+4)-3(x+4)",answer:"(2x-3)(x+4)",split:/8\s*x\s*-\s*3\s*x/i})
 }),
 "p2-q2-v2":Object.freeze({
  b1:Object.freeze({original:"3m^2-147n^2",partial:"3(m^2-49n^2)",answer:"3(m-7n)(m+7n)"}),
  b2:Object.freeze({original:"3x^2+7x-6",partial:"3x^2+9x-2x-6",group:"3x(x+3)-2(x+3)",answer:"(3x-2)(x+3)",split:/9\s*x\s*-\s*2\s*x/i})
 })
});
const clean=s=>typeof s==="string"?s.replace(/[−–—]/g,"-").replace(/[²]/g,"^2").trim():"";
function terms(raw){
 // Only safely separated written lines and explicit equality steps.
 // A lone repetition of the original expression does not demonstrate method.
 return clean(raw).split(/[\n;=]/).map(s=>s.trim()).filter(Boolean);
}
const voted=(id,ok,reason)=>({id,maxMarks:1,candidateMarks:ok?1:null,
 status:ok?"candidate-correct":"unresolved",
 reason:ok?reason:"insufficient-source-evidence"});
export function evaluateMathFactorisationV2({questionId,partId,response={}}={}){
 const source=SOURCES[questionId]?.[partId];
 if(!source)throw new TypeError("Unsupported source-calibrated factorisation");
 const answer=clean(typeof response==="string"?response:response?.answer);
 const working=clean(response&&typeof response==="object"?response.working:"");
 const allSteps=terms(working);
 const partial=partId==="b1"
  ?allSteps.some(s=>/^\s*[34]\s*\(/.test(s)&&/m\s*\^2/.test(s)&&/n\s*\^2/.test(s)&&equivalent(s,source.partial))
  :allSteps.some(s=>(source.split.test(s.replace(/\s+/g,""))||s.replace(/\s+/g,"")===source.group)&&equivalent(s,source.original));
 const inAnswer=answer&&equivalent(answer,source.partial);
 const method=partial||!!inAnswer;
 // Numeric equivalence alone is not enough: the result must be in a product
 // with all nontrivial algebraic factors extracted.
 const finalOk=!!answer&&isFullyFactorised(answer)&&equivalent(answer,source.answer);
 const criteria=[voted("M1",method,"source-supported-intermediate-factorisation"),
  voted("A1",finalOk,"fully-factorised-equivalent-product")];
 return {sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
  criteria,suggestedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks===null?1:0),0)};
}
