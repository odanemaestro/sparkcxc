/**
 * Source-gated, ADVISORY-only evidence for SPARK Mathematics Paper 2
 * enlargement + area Q3-v4/v5/v6. These papers specify three marks per
 * part, but no source-authorised atomic M/A split. Proposed checks may not
 * publish or deny marks, and unsupported evidence stays unresolved.
 */
export const MATH_ENLARGEMENT_SOURCES_V2=Object.freeze({
 "p2-q3-v4":Object.freeze({scale:3,base:2,height:3,area:3,imageArea:27}),
 "p2-q3-v5":Object.freeze({scale:2,base:3,height:2,area:3,imageArea:12}),
 "p2-q3-v6":Object.freeze({scale:2,base:2,height:3,area:3,imageArea:12})
});
const asText=v=>typeof v==="string"?v:typeof v==="number"&&Number.isFinite(v)?String(v):"";
const norm=v=>asText(v).trim().toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[×∗]/g,"*").replace(/÷/g,"/").replace(/[²]/g,"^2")
 .replace(/,/g,"").replace(/[ \t\r]+/g,"");
const answer=r=>r&&typeof r==="object"&&!Array.isArray(r)?asText(r.answer):asText(r);
const working=r=>r&&typeof r==="object"&&!Array.isArray(r)?asText(r.working):"";
function number(raw,{units=false}={}){
 let s=norm(raw);
 if(units)s=s.replace(/(?:squareunits?|units?\^2|units?|cm\^2)$/,"").trim();
 if(!/^\+?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))return null;
 const x=Number(s);return Number.isFinite(x)&&x>=0&&x<=1e8?x:null;
}
const approx=(a,b)=>a!==null&&Math.abs(a-b)<=0.011;
const vote=(id,valid,reason)=>({id,maxMarks:1,candidateMarks:valid?1:null,
 status:valid?"candidate-correct":"unresolved",
 reason:valid?reason:"insufficient-source-evidence"});
const packet=(questionId,partId,criteria)=>({
 sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
 rubricAllocation:"proposed-from-worked-solution",criteria,
 suggestedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks??0),0),
 unresolvedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks===null?c.maxMarks:0),0)
});
function transformation(text,source){
 // Descriptive transformations depend on word boundaries. Do not use
 // compact arithmetic normalisation here; it erases those boundaries.
 const s=asText(text).trim().toLowerCase().replace(/[−–—]/g,"-")
  .replace(/\s+/g," ");
 const enlargement=/\benlarg(?:ement|ed|e)\b/.test(s);
 const contrary=/\b(?:reflection|reflected|rotation|rotated|translation|translated)\b/.test(s);
 const centers=[/\b(?:centre|center)\b\s*(?:(?:at|is|the|of)\s*){0,2}(?:the\s+)?origin\b/,
  /\b(?:centre|center)\b\s*(?:(?:at|is|the|of)\s*){0,2}\(?\s*0\s*,\s*0\s*\)?/,
  /\babout\s+(?:the\s+)?origin\b/];
 const center=centers.some(re=>re.test(s));
 const factor=[new RegExp("(?:scale\\s*factor|factor|sf|k)\\s*(?:of|is|=|:)?\\s*"+source.scale+"(?:\\.0+)?\\b"),
  new RegExp("\\b"+source.scale+"(?:\\.0+)?\\s*(?:times|x|×)\\s*(?:as\\s+large|bigger)\\b")];
 const statedFactor=factor.some(re=>re.test(s));
 const otherFactors=/\b(?:scale\s*factor|factor|sf|k)\s*(?:of|is|=|:)?\s*[-+]?\d+(?:\.\d+)?/g;
 const multiples=[...s.matchAll(otherFactors)].map(x=>Number(x[0].match(/[-+]?\d+(?:\.\d+)?$/)?.[0]));
 const contradictory=multiples.some(n=>Number.isFinite(n)&&n!==source.scale)
  ||/\b(?:not|isn't|is\s+not)\s+(?:an?\s+)?enlargement\b/.test(s);
 return {enlargement:enlargement&&!contrary&&!contradictory,
  center:center&&!contrary&&!contradictory,
  factor:statedFactor&&!contrary&&!contradictory};
}
function partBWorking(text,source){
 const w=norm(text);
 const lines=w.split(/[;\n=]/).filter(Boolean);
 const formula=lines.some(x=>/^(?:area|a)?(?:=|:)?(?:1\/2|0\.5)\*?(?:base|b)\*?(?:height|h)$/.test(x))
  ||/area=(?:1\/2|0\.5)\*?(?:base|b)\*?(?:height|h)/.test(w);
 const args=[
  "1/2*"+source.base+"*"+source.height,
  "1/2*"+source.height+"*"+source.base,
  "1/2("+source.base+")("+source.height+")",
  "1/2("+source.height+")("+source.base+")",
  "0.5*"+source.base+"*"+source.height,
  "0.5*"+source.height+"*"+source.base
 ];
 const substitution=lines.some(x=>args.includes(x));
 return {formula,substitution};
}
function areaScaling(text,source,previous){
 const w=norm(text),steps=w.split(/[;\n=]/).filter(Boolean);
 const k=source.scale,square=k*k;
 const kSquared=steps.some(x=>[
  k+"^2",k+"*"+k,k+"^2*"+source.area,k+"^2("+source.area+")",
  square+"*"+source.area
 ].includes(x));
 const candidate=number(answer(previous),{units:true});
 const prior=candidate!==null&&candidate<=100000&&candidate!==source.area?candidate:null;
 const multipliers=[source.area,...(prior===null?[]:[prior])];
 const calculation=steps.some(x=>multipliers.some(area=>[
  square+"*"+area,k+"^2*"+area,
  area+"*"+square,area+"*"+k+"^2",
  k+"^2("+area+")"
 ].includes(x)));
 return {kSquared,calculation,prior,validMethod:calculation&&kSquared};
}
export function evaluateMathEnlargementV2({
 questionId,partId,response={},previousResponses={}
}={}){
 const source=MATH_ENLARGEMENT_SOURCES_V2[questionId];
 if(!source||!["a","b","c"].includes(partId))
  throw new TypeError("Uncalibrated Mathematics enlargement source");
 const a=answer(response),w=working(response);
 if(partId==="a"){
  const evidence=transformation(a+"\n"+w,source);
  return packet(questionId,partId,[
   vote("B1",evidence.enlargement,"enlargement-type"),
   vote("B2",evidence.center,"center-at-origin"),
   vote("B3",evidence.factor,"correct-scale-factor")
  ]);
 }
 if(partId==="b"){
  const method=partBWorking(w,source);
  return packet(questionId,partId,[
   vote("M1",method.formula,"triangle-area-formula"),
   vote("M2",method.substitution,"correct-grid-base-and-height"),
   vote("A1",approx(number(a,{units:true}),source.area),"correct-object-area")
  ]);
 }
 const method=areaScaling(w,source,previousResponses?.b);
 const numeric=number(a,{units:true});
 const canonical=approx(numeric,source.imageArea);
 const carried=method.prior!==null&&method.validMethod&&
  approx(numeric,method.prior*source.scale**2);
 return packet(questionId,partId,[
  vote("M1",method.kSquared,"squared-scale-factor"),
  vote("M2",method.calculation,"source-or-verified-earlier-area-multiplication"),
  vote("A1",canonical||carried,carried&&!canonical?
   "explicit-prior-area-follow-through":"correct-enlarged-area")
 ]);
}
