/**
 * Advisory geometry evidence for three original Mathematics Paper 2 Q3
 * practice variants. A complete reflection is not assumed to prove all
 * 3 unsplit scheme marks. Translation coordinates are assessed separately,
 * as are the three proposed distance-calculation steps.
 */
const SOURCES=Object.freeze({
 "p2-q3-v1":Object.freeze({reflection:"x",vector:[-6,2],
  source:[[1,1],[5,1],[1,4]],target:[[-5,3],[-1,3],[-5,6]],distance:5}),
 "p2-q3-v2":Object.freeze({reflection:"y",vector:[3,-7],
  source:[[2,2],[6,2],[2,5]],target:[[5,-5],[9,-5],[5,-2]],distance:5}),
 "p2-q3-v3":Object.freeze({reflection:"x",vector:[-5,-1],
  source:[[1,2],[4,2],[1,6]],target:[[-4,1],[-1,1],[-4,5]],distance:5})
});
const str=s=>typeof s==="string"?s:"";
const clean=s=>str(s).trim().toLowerCase().replace(/[−–—]/g,"-");
const vote=(id,marks,good,reason)=>({id,maxMarks:marks,
 candidateMarks:good?marks:null,status:good?"candidate-correct":"unresolved",
 reason:good?reason:"insufficient-source-evidence"});
const result=(questionId,partId,criteria)=>({
 sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
 rubricAllocation:"proposed-from-worked-solution",criteria,
 suggestedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks??0),0),
 unresolvedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks===null?c.maxMarks:0),0)
});
function parseCoordinates(raw){
 const s=clean(raw);
 const regex=/([abc]\s*['′]?\s*(?:=|:)?\s*)?\(\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)/gi;
 const points=[...s.matchAll(regex)];
 if(!points.length||points.length>3)return null;
 const rest=s.replace(regex,"").replace(/\b(?:and)\b/g,"").replace(/[\s,;]+/g,"");
 if(rest)return null;
 const labelled=points.map(m=>m[1]?m[1].trim().slice(0,1).toUpperCase():null);
 if(labelled.some(Boolean)&&labelled.some(label=>!label))return null;
 if(labelled.some(Boolean)&&new Set(labelled).size!==labelled.length)return null;
 return points.map((m,i)=>({label:labelled[i],x:Number(m[2]),y:Number(m[3])}));
}
const same=(p,a)=>p.x===a[0]&&p.y===a[1];
function translationCriteria(value,source){
 const points=parseCoordinates(value)||[];
 const used=new Set();
 return source.target.map((target,i)=>{
  const found=points.findIndex((p,j)=>!used.has(j)&&
   (p.label===null||p.label==="ABC"[i])&&same(p,target));
  if(found>=0)used.add(found);
  return vote("B"+(i+1),1,found>=0,"correct-translated-vertex");
 });
}
function reflection(raw,axis){
 const s=clean(raw).replace(/\s+/g," ");
 const reflectionWord=/\breflect(?:ion|ed)?\b/.test(s);
 const exact=axis==="x" ? /(?:\bx[- ]axis\b|\by\s*=\s*0\b)/ :
  /(?:\by[- ]axis\b|\bx\s*=\s*0\b)/;
 const opposite=axis==="x" ? /(?:\by[- ]axis\b|\bx\s*=\s*0\b)/ :
  /(?:\bx[- ]axis\b|\by\s*=\s*0\b)/;
 return reflectionWord&&exact.test(s)&&!opposite.test(s);
}
const mathLine=raw=>clean(raw).replace(/\s+/g,"").replace(/[×*]/g,"*")
 .replace(/√/g,"sqrt").replace(/[²]/g,"^2");
function distanceWorking(raw,source){
 const s=mathLine(raw);
 const [b,c]=[source.source[1],source.source[2]];
 const dx=Math.abs(b[0]-c[0]),dy=Math.abs(b[1]-c[1]);
 const coordinateTerms=[
  "("+c[0]+"-"+b[0]+")^2+("+c[1]+"-"+b[1]+")^2",
  "("+b[0]+"-"+c[0]+")^2+("+b[1]+"-"+c[1]+")^2"
 ];
 const squares=[dx+"^2+"+dy+"^2",dy+"^2+"+dx+"^2"];
 const hasRoot=s.includes("sqrt")||s.includes("^0.5");
 const validMethod=hasRoot&&(coordinateTerms.some(t=>s.includes(t))||
  squares.some(t=>s.includes(t)));
 const numericWork=(s.includes("16+9=25")||s.includes("9+16=25")||
  squares.some(t=>s.includes(t+"=25")));
 return {validMethod,numericWork};
}
export function evaluateMathCoordinateGeometryV2({questionId,partId,response={}}={}){
 const source=SOURCES[questionId];
 if(!source||!["a","b","c"].includes(partId))
  throw new TypeError("Uncalibrated Mathematics coordinate-geometry part");
 const answer=typeof response==="string"?response:response?.answer;
 const working=typeof response==="object"&&response!==null?response.working:"";
 if(partId==="a"){
  return result(questionId,partId,[
   vote("B1",1,reflection(answer,source.reflection),"correct-reflection-axis"),
   vote("unresolved-source-allocation",2,false,"")
  ]);
 }
 if(partId==="b")return result(questionId,partId,translationCriteria(answer,source));
 const steps=distanceWorking(working,source);
 // This source explicitly requests an answer correct to two decimal places.
 // A bare "5" is mathematically equivalent, but does not satisfy that format.
 const final=/^5\.00(?:\s*units?)?$/i.test(str(answer).trim());
 return result(questionId,partId,[
  vote("M1",1,steps.validMethod,"distance-formula-using-source-coordinates"),
  vote("M2",1,steps.numericWork,"squared-components-summed"),
  vote("A1",1,final,"correct-length-to-two-decimal-places")
 ]);
}
