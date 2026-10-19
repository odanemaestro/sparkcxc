/**
 * Source-calibrated advisory candidates for SPARK Mathematics Paper 2 Q2
 * v1–v3: index laws, rectangle perimeter, and dimensions. Original
 * answers and marks are authoritative; proposed atomic breakdowns are not.
 */
import {equivalent} from "../practice/cxcMarking/algebra";

const SOURCES=Object.freeze({
 "p2-q2-v1":{factors:["3x^2y^1","4x^3y^4"],product:"12x^5y^5",answer:"2xy^3",perimeter:"8w+8",width:4.5,length:17.5},
 "p2-q2-v2":{factors:["5x^3y^2","3x^2y^3"],product:"15x^5y^5",answer:"3x^2y^2",perimeter:"6w+10",width:6,length:17},
 "p2-q2-v3":{factors:["4x^4y^3","6x^2y^2"],product:"24x^6y^5",answer:"3x^3y",perimeter:"10w+6",width:5,length:23}
});
const str=v=>typeof v==="string"?v:typeof v==="number"&&Number.isFinite(v)?String(v):"";
const compact=v=>str(v).trim().toLowerCase().replace(/[−–—]/g,"-").replace(/×/g,"*").replace(/[²]/g,"^2").replace(/\s+/g,"");
const readAnswer=r=>r&&typeof r==="object"&&!Array.isArray(r)?str(r.answer):str(r);
const readWorking=r=>r&&typeof r==="object"&&!Array.isArray(r)?str(r.working):"";
const close=(value,target)=>value!==null&&Math.abs(value-target)<=0.01;
const criterion=(id,okay,reason)=>({id,maxMarks:1,candidateMarks:okay?1:null,
 status:okay?"candidate-correct":"unresolved",
 reason:okay?reason:"insufficient-source-evidence"});
const pack=(questionId,partId,criteria)=>({sourcePart:questionId+"::"+partId,
 authority:"advisory",publishable:false,rubricAllocation:"proposed-from-worked-solution",
 criteria,suggestedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks??0),0),
 unresolvedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks===null?1:0),0)});
function numeratorWork(working,source){
 const steps=compact(working).split(/[;\n]/);
 const [a,b]=source.factors,product=source.product;
 return steps.some(step=>{
  const parts=step.split("=");
  if(parts.length!==2||parts[1]!==product)return false;
  const lhs=parts[0].replace(/[()]/g,"");
  return lhs===a+"*"+b||lhs===b+"*"+a||
   lhs===a+b||lhs===b+a;
 });
}
function monomialAnswer(value,source){
 const x=compact(value);
 if(!/^\d+(?:x(?:\^\d+)?y(?:\^\d+)?|y(?:\^\d+)?x(?:\^\d+)?)$/.test(x)||
  /(?:x|y)\^(?:0|1)(?!\d)/.test(x))return false;
 return equivalent(x,source.answer);
}
function perimeterAnswer(value,source){
 const expression=compact(value).replace(/^p=/,"");
 if(!/^(\d+\*?w\+\d+|\d+\+\d+\*?w)$/.test(expression))return false;
 return equivalent(expression,source.perimeter);
}
function dimensions(value){
 const s=str(value).toLowerCase().trim().replace(/[−–—]/g,"-");
 if(!s||s.length>150||/\b(?:or|either|maybe)\b/.test(s))return null;
 const labelled=/\b(width|length)\s*(?:=|:)?\s*(\d+(?:\.\d+)?)\s*(?:cm)?\b/g;
 const matches=[...s.matchAll(labelled)];
 if(matches.length){
  if(matches.length>2||s.replace(labelled,"").replace(/[\s,;]+/g,""))return null;
  const result={};
  for(const m of matches){
   if(result[m[1]]!==undefined)return null;
   result[m[1]]=Number(m[2]);
  }
  return result;
 }
 const m=/^(\d+(?:\.\d+)?)\s*[,;]\s*(\d+(?:\.\d+)?)$/.exec(s);
 return m?{unordered:[Number(m[1]),Number(m[2])]}:null;
}
export function evaluateMathIndicesRectangleV2({questionId,partId,response={}}={}){
 const source=SOURCES[questionId];
 if(!source||!["a","c1","c2"].includes(partId))
  throw new TypeError("Uncalibrated Mathematics indices/rectangle source");
 const answer=readAnswer(response),working=readWorking(response);
 if(partId==="a")return pack(questionId,partId,[
  criterion("M1",numeratorWork(working,source),"multiplied-indices-in-numerator"),
  criterion("A1",monomialAnswer(answer,source),"correct-simplified-monomial")
 ]);
 if(partId==="c1")return pack(questionId,partId,[
  criterion("B1",perimeterAnswer(answer,source),"correct-simplified-perimeter")
 ]);
 const resolved=dimensions(answer);let width=false,length=false;
 if(resolved?.unordered){
  width=resolved.unordered.some(x=>close(x,source.width));
  length=resolved.unordered.some(x=>close(x,source.length));
 }else if(resolved){
  width=close(resolved.width??null,source.width);
  length=close(resolved.length??null,source.length);
 }
 return pack(questionId,partId,[
  criterion("B1",width,"correct-width"),
  criterion("B2",length,"correct-length")
 ]);
}
