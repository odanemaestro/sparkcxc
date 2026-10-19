/**
 * SPARK Mathematics Paper 2 Q10, original 10 templates.
 * Source-specific M/A/B candidates are advisory, NEVER final score authority.
 * Correct answers do not automatically establish missing working or reasons.
 */
export const MATH_Q10_SOURCES_V2=Object.freeze({
 "p2-q10-v1":{kind:"matrix",marks:{a:3,b:1,b2:1,c:3,d:4},
  m:[2,3,1,5],n:[4,-1,0,2],product:[8,4,4,9],det:7,inverse:[5,-3,-1,2],
  rhs:[13,17],solution:[2,3]},
 "p2-q10-v2":{kind:"matrix",marks:{a:3,b:2,c:3,d:4},
  m:[3,1,2,4],n:[1,-2,0,5],product:[3,-1,2,16],det:10,inverse:[4,-1,-2,3],
  rhs:[11,24],solution:[2,5]},
 "p2-q10-v3":{kind:"matrix",marks:{a:3,b:2,c:3,d:4},
  m:[4,3,2,5],n:[2,0,1,3],product:[11,9,9,15],det:14,inverse:[5,-3,-2,4],
  rhs:[15,11],solution:[3,1]},
 "p2-q10-v4":{kind:"transform",marks:{a:3,b:3,c:3,d:3},
  point:[3,2],rotated:[-2,3],given:[4,-3],image:[10,-7.5],
  k:2.5,combined:[0,-2.5,2.5,0],areaFactor:6.25},
 "p2-q10-v5":{kind:"transform",marks:{a:3,b:3,c:3,d:3},
  point:[2,5],rotated:[-5,2],given:[-2,4],image:[-6,12],
  k:3,combined:[0,-3,3,0],areaFactor:9},
 "p2-q10-v6":{kind:"vectors",marks:{a:2,b:3,c:3,d:4}},
 "p2-q10-v7":{kind:"vectors",marks:{a:2,b:3,c:3,d:4}},
 "p2-q10-v8":{kind:"position",marks:{a:3,b:3,c:4,d:2},
  a:[3,1],b:[7,9],ab:[4,8],magnitude:8.94,ratio:[1,3],c:[4,3],cross:[32,12]},
 "p2-q10-v9":{kind:"position",marks:{a:3,b:3,c:4,d:2},
  a:[2,-1],b:[10,5],ab:[8,6],magnitude:10.00,ratio:[1,1],c:[6,2],cross:[36,16]},
 "p2-q10-v10":{kind:"position",marks:{a:3,b:3,c:4,d:2},
  a:[-1,2],b:[8,8],ab:[9,6],magnitude:10.82,ratio:[2,1],c:[5,6],cross:[30,54]}
});
const str=x=>typeof x==="string"?x:typeof x==="number"&&Number.isFinite(x)?String(x):"";
const field=(r,key)=>r&&typeof r==="object"&&!Array.isArray(r)?str(r[key]):key==="answer"?str(r):"";
const norm=x=>str(x).trim().toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[×∗]/g,"*").replace(/÷/g,"/").replace(/½/g,"1/2")
 .replace(/\s+/g,"");
const ambiguous=x=>/\b(?:or|either|maybe|perhaps|not sure|incorrect)\b/i.test(str(x));
function reportedNumber(input){
 const s=str(input).trim().replace(/,/g,"").replace(/^(?:k|det(?:erminant)?)\s*=\s*/i,"");
 return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)?Number(s):null;
}
function accurateNumber(input,expected,decimals=null){
 const value=reportedNumber(input);
 if(value===null||Math.abs(value-expected)>0.000001)return false;
 if(decimals===null)return true;
 const raw=str(input).trim().replace(/^(?:k|det(?:erminant)?)\s*=\s*/i,"");
 return new RegExp("^[+-]?\\d+\\.\\d{"+decimals+"}$").test(raw);
}
function coordinate(input){
 const s=str(input).trim().replace(/^(?:[a-z]{1,3}|\\vec\{[A-Za-z]{1,3}\})\s*=\s*/,"");
 const m=/^\(?\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)?$/.exec(s);
 return m?[Number(m[1]),Number(m[2])]:null;
}
const same=(a,b)=>!!a&&!!b&&a.length===b.length&&a.every((v,i)=>Math.abs(v-b[i])<1e-9);
function flatMatrix(input){
 const s=str(input).trim().replace(/\s+/g,"");
 // Require an actual 2x2 representation OR a four-entry ordered matrix.
 const body=s.match(/^\[\[([^\]]+)\],\[([^\]]+)\]\]$/);
 const parts=body?[...body[1].split(","),...body[2].split(",")]:
  /^\[?([+\d.,-]+)\]?$/.test(s)?s.replace(/^\[/,"").replace(/\]$/,"").split(","):[];
 if(parts.length!==4)return null;
 const values=parts.map(x=>/^[-+]?\d+(?:\.\d+)?$/.test(x)?Number(x):null);
 return values.every(x=>x!==null)?values:null;
}
function inverseMatrix(input,source){
 let s=str(input).trim().replace(/\s+/g,"");
 s=s.replace(/^M\^-?1=/i,"").replace(/^M⁻¹=/i,"");
 const scalar=new RegExp("^\\(?1/"+source.det+"\\)?(?:\\*|×)?(\\[\\[.*)$").exec(s);
 if(scalar)return same(flatMatrix(scalar[1]),source.inverse);
 // A fully multiplied-out inverse is also valid if every entry equals
 // the source adjugate divided by the source determinant.
 const brackets=s.match(/^\[\[([^\]]+)\],\[([^\]]+)\]\]$/);
 if(!brackets)return false;
 const entries=[...brackets[1].split(","),...brackets[2].split(",")];
 if(entries.length!==4)return false;
 const values=entries.map(v=>{
  const m=/^([+-]?\d+(?:\.\d+)?)(?:\/(\d+))?$/.exec(v);
  return m?Number(m[1])/Number(m[2]||1):NaN;
 });
 return values.every(Number.isFinite)&&values.every((v,i)=>
  Math.abs(v-source.inverse[i]/source.det)<1e-9);
}
function vectorExpression(input,kind){
 const v=norm(input).replace(/\\vec\{(?:ab|mn)\}=/g,"")
  .replace(/^(?:ab|mn)=/,"").replace(/\s/g,"");
 if(kind==="ab")return ["b-a","-a+b","(-a)+b"].includes(v);
 return ["(1/2)(b-a)","1/2(b-a)","(b-a)/2","0.5(b-a)",
  "1/2*(b-a)","0.5*(b-a)","(b-a)*0.5","(b-a)*1/2",
  "(1/2)b-(1/2)a","1/2b-1/2a","0.5b-0.5a",
  "b/2-a/2","(b/2)-(a/2)","1/2*b-1/2*a"].includes(v);
}
function worked(response,expression){
 const w=norm(field(response,"working")).replace(/\r/g,"");
 if(!w||ambiguous(field(response,"working")))return false;
 const e=norm(expression);
 return w.split(/[;\n]/).some(seg=>seg===e||seg.startsWith(e+"=")||
  seg.endsWith("="+e)||seg.includes("="+e+"="));
}
const vote=(id,ok,reason)=>({
 id,maxMarks:1,candidateMarks:ok?1:null,
 status:ok?"candidate-correct":"unresolved",
 reason:ok?reason:"source-specific-evidence-unresolved"
});
const unresolved=id=>({
 id,maxMarks:1,candidateMarks:null,status:"unresolved",
 reason:"atomic-method-allocation-not-independently-verified"
});
const textEvidence=r=>(field(r,"answer")+" "+field(r,"working")).toLowerCase();
function singularReason(r){
 const t=textEvidence(r);
 return !ambiguous(t)&&/\bnot\s+singular\b/.test(t)
  &&/\bdet(?:erminant)?\b/.test(t)&&/\b(?:nonzero|non-zero|not\s+zero|isn't\s+zero|is\s+7)\b/.test(t);
}
function matrixCriteria(s,p,r){
 const answer=field(r,"answer");
 if(p==="a"){
  const correct=same(flatMatrix(answer),s.product);
  const [a,b,c,d]=s.m,[e,f,g,h]=s.n;
  const first=worked(r,a+"*"+e+"+"+b+"*"+g);
  const last=worked(r,c+"*"+f+"+"+d+"*"+h);
  return [vote("M1",first,"first-source-matrix-row-column-product"),
   vote("M2",last,"last-source-matrix-row-column-product"),
   vote("A1",correct,"source-product-matrix")];
 }
 if(p==="b"){
  if(s.marks.b===1)return [vote("A1",accurateNumber(answer,s.det),"source-determinant")];
  const [a,b,c,d]=s.m;
  return [vote("M1",worked(r,a+"*"+d+"-"+b+"*"+c),
   "ad-minus-bc"),vote("A1",accurateNumber(answer,s.det),"source-determinant")];
 }
 if(p==="b2")return [vote("B1",singularReason(r),
  "non-singular-because-determinant-nonzero")];
 if(p==="c"){
  const [a,b,c,d]=s.m;
  return [vote("M1",worked(r,a+"*"+d+"-"+b+"*"+c),"source-determinant"),
   unresolved("M-extra"),vote("A1",inverseMatrix(answer,s),"source-inverse-matrix")];
 }
 if(p==="d"){
  const coordinateAnswer=coordinate(answer);
  const assigned=/^\s*x\s*=\s*([+-]?\d+)\s*[,;]\s*y\s*=\s*([+-]?\d+)\s*$/i.exec(answer);
  const pair=assigned?[Number(assigned[1]),Number(assigned[2])]:coordinateAnswer;
  const method=worked(r,"1/"+s.det+"*("+s.inverse[0]+"*"+s.rhs[0]+"+"+s.inverse[1]+"*"+s.rhs[1]+")");
  const rhs=worked(r,"("+s.rhs.join(",")+")");
  return [vote("M1",rhs,"source-matrix-system-rhs"),
   vote("M2",method,"source-inverse-substitution"),
   vote("A1",!!pair&&pair[0]===s.solution[0],"solution-x"),
   vote("A2",!!pair&&pair[1]===s.solution[1],"solution-y")];
 }
 throw new TypeError("Uncalibrated Q10 matrix part");
}
function transformCriteria(s,p,r){
 const answer=field(r,"answer"),t=textEvidence(r);
 if(p==="a")return [vote("M1",worked(r,"-("+s.point[1]+","+s.point[0]+")"),
   "rotate-coordinate"),
  unresolved("M-extra"),vote("A1",same(coordinate(answer),s.rotated),
   "anticlockwise-rotation-image")];
 if(p==="b"){
  // The student-facing bank explicitly accepts 5/2 for the 2.5 scale
  // factor. Exact rational equivalents are legitimate, never competing
  // answers or methods inferred from text.
  const rational=/^\s*(?:k\s*=\s*)?([+-]?\d+)\s*\/\s*(\d+)\s*$/i.exec(answer);
  const ratio=rational&&Number(rational[2])!==0?
   Number(rational[1])/Number(rational[2]):null;
  const scale=accurateNumber(answer,s.k)||(ratio!==null&&
   Number.isFinite(ratio)&&Math.abs(ratio-s.k)<1e-9);
  return [vote("M1",worked(r,s.given[0]+"*k="+s.image[0]),
   "enlargement-scale-equation"),unresolved("M-extra"),
   vote("A1",scale,"source-enlargement-factor")];
 }
 if(p==="c")return [vote("M1",worked(r,"t*r")||worked(r,"tr"),
   "correct-transform-composition-order"),unresolved("M-extra"),
   vote("A1",same(flatMatrix(answer),s.combined),"combined-matrix")];
 if(p==="d"){
  // Distinguish a stated determinant from the same number repeated only
  // in an area-scaling sentence. Each is a separate proposed criterion.
  const first=answer.split(/[;,]/)[0].trim();
  const direct=/^(?:(?:det|determinant)(?:\s*(?:is|=|:))?\s*)?([+]?(?:\d+(?:\.\d+)?|\.\d+))$/i.exec(first);
  const factor=!!direct&&Number(direct[1])===s.areaFactor&&!ambiguous(answer);
  const reason=!ambiguous(t)&&/\b(?:area|areas)\b/.test(t)&&
   /\b(?:multipli(?:ed|es|er)|factor|scal(?:ed|e))\b/.test(t)&&
   new RegExp("(^|\\D)"+s.areaFactor.toString().replace(".","\\.")+"(\\D|$)").test(t);
  return [unresolved("M1"),vote("A1",factor,"source-determinant"),
   vote("B1",reason,"area-scale-is-determinant")];
 }
 throw new TypeError("Uncalibrated Q10 transformation part");
}
function vectorsCriteria(s,p,r){
 const a=field(r,"answer"),t=textEvidence(r);
 if(p==="a")return [unresolved("M1"),vote("A1",
  vectorExpression(a,"ab"),"vector-ab-difference")];
 if(p==="b")return [unresolved("M1"),unresolved("M2"),vote("A1",
  vectorExpression(a,"mn"),"half-vector-ab")];
 if(p==="c"){
  const parallel=/\bparallel\b/.test(t)&&!/\bnot\s+parallel\b/.test(t);
  const half=/\b(?:half|1\/2|0\.5)\b/.test(t)&&
   /\b(?:length|long|ab|mn)\b/.test(t);
  const reason=!ambiguous(t)&&(
   /\b(?:scalar|multiple)\b/.test(t)||
   /(?:\\vec\{)?mn(?:\})?=\s*(?:1\/2|0\.5)/.test(t));
  return [vote("B1",parallel,"mn-parallel-ab"),
   vote("B2",half,"mn-half-ab-length"),
   vote("B3",parallel&&half&&reason,"scalar-multiple-explanation")];
 }
 if(p==="d"){
  const t0=norm(t);
  const derived=/ap=(?:a\+b)-a=b|ap=b|\\vec\{ap\}=b/.test(t0);
  const equal=/ap=(?:b=)?(?:ob|\\vec\{ob\})|apandobareequal|ap=ob/.test(t0)||
   (/\bap\b/.test(t)&&/\bob\b/.test(t)&&/\bequal\b/.test(t));
  const parallel=/\bparallel\b/.test(t);
  const conclude=/\bparallelogram\b/.test(t)&&
   !/\b(?:not|isn't|isnt|never)\s+(?:a\s+)?parallelogram\b/.test(t);
  return [vote("B1",derived,"derive-ap-equals-b"),
   vote("B2",derived,"source-ap-vector-derived"),
   vote("B3",(equal||parallel)&&!ambiguous(t),"opposite-sides-equal-parallel"),
   vote("B4",conclude,"oapb-is-parallelogram")];
 }
 throw new TypeError("Uncalibrated Q10 vector part");
}
function positionCriteria(s,p,r){
 const answer=field(r,"answer"),t=textEvidence(r);
 if(p==="a")return [vote("M1",worked(r,
  "("+s.b[0]+"-"+s.a[0]+","+s.b[1]+"-"+s.a[1]+")"),
  "ob-minus-oa"),unresolved("M-extra"),
  vote("A1",same(coordinate(answer),s.ab),"position-vector-ab")];
 if(p==="b")return [vote("M1",worked(r,
  "sqrt("+s.ab[0]+"^2+"+s.ab[1]+"^2)"),"vector-magnitude"),
  unresolved("M-extra"),vote("A1",
  accurateNumber(answer,s.magnitude,2),"two-decimal-magnitude")];
 if(p==="c"){
  const ratio=s.ratio[0]+"/"+(s.ratio[0]+s.ratio[1]);
  const split=worked(r,ratio+"*("+s.ab.join(",")+")");
  const added=worked(r,"("+s.a.join(",")+")+("+s.c.map((x,i)=>x-s.a[i]).join(",")+")");
  const result=coordinate(answer);
  return [vote("M1",split,"correct-internal-division-ratio"),
   vote("M2",added,"oa-plus-ac"),
   unresolved("M-extra"),vote("A1",same(result,s.c),"position-vector-oc")];
 }
 if(p==="d"){
  const no=!ambiguous(t)&&/\b(?:not\s+parallel|notparallel|no)\b/.test(t)
   &&!/\b(?:are\s+parallel|is\s+parallel)\b/.test(t);
  const cross=s.cross;
  const justified=!ambiguous(t)&&(
   worked(r,cross[0]+"!="+cross[1])||
   worked(r,cross[0]+"≠"+cross[1])||
   (/\b(?:ratios?|components?|scalar)\b/.test(t)&&
    /\b(?:different|unequal|not\s+equal)\b/.test(t)));
  return [vote("B1",no,"oc-not-parallel-ab"),
   vote("B2",no&&justified,"nonparallel-coordinate-justification")];
 }
 throw new TypeError("Uncalibrated Q10 position part");
}
export function evaluateMathQ10V2({questionId,partId,response={}}={}){
 const source=MATH_Q10_SOURCES_V2[questionId];
 if(!source||!Object.prototype.hasOwnProperty.call(source.marks,partId))
  throw new TypeError("Uncalibrated Mathematics Question 10 source");
 const criteria=source.kind==="matrix"?matrixCriteria(source,partId,response)
  :source.kind==="transform"?transformCriteria(source,partId,response)
  :source.kind==="vectors"?vectorsCriteria(source,partId,response)
  :positionCriteria(source,partId,response);
 const total=criteria.reduce((n,c)=>n+c.maxMarks,0);
 if(total!==source.marks[partId])
  throw new Error("Q10 source mark allocation mismatch");
 return {sourcePart:questionId+"::"+partId,authority:"advisory",
  publishable:false,rubricAllocation:"proposed-from-worked-solution",
  criteria,suggestedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks===null?c.maxMarks:0),0)};
}
