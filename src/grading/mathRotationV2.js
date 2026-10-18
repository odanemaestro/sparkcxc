/**
 * Advisory-only evidence for original SPARK Mathematics Paper 2 Q3-v7/v8.
 * The original marks are 2/4/3. Atomic candidates here are PROPOSED
 * from the worked answer, not authoritatively awarded or publishable.
 */
export const MATH_ROTATION_SOURCES_V2=Object.freeze({
 "p2-q3-v7":Object.freeze({
  direction:"clockwise",original:[[2,1],[6,1],[2,4]],
  rotated:[[1,-2],[1,-6],[4,-2]],midpoint:[4,1],imageMidpoint:[1,-4]
 }),
 "p2-q3-v8":Object.freeze({
  direction:"anticlockwise",original:[[1,2],[5,2],[1,6]],
  rotated:[[-2,1],[-2,5],[-6,1]],midpoint:[3,2],imageMidpoint:[-2,3]
 })
});
const text=v=>typeof v==="string"?v:typeof v==="number"&&Number.isFinite(v)?String(v):"";
const standard=v=>text(v).trim().toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[→↦]/g,"->").replace(/\bmaps\s+to\b/g,"->");
const answer=r=>r&&typeof r==="object"&&!Array.isArray(r)?text(r.answer):text(r);
const working=r=>r&&typeof r==="object"&&!Array.isArray(r)?text(r.working):"";
const vote=(id,valid,why)=>({id,maxMarks:1,candidateMarks:valid?1:null,
 status:valid?"candidate-correct":"unresolved",
 reason:valid?why:"insufficient-source-evidence"});
const report=(questionId,partId,criteria)=>({
 sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
 rubricAllocation:"proposed-from-worked-solution",criteria,
 suggestedMarks:criteria.reduce((v,c)=>v+(c.candidateMarks??0),0),
 unresolvedMarks:criteria.reduce((v,c)=>v+(c.candidateMarks===null?c.maxMarks:0),0)
});
const pair=String.raw`\\(\\s*([+-]?\\d+(?:\\.\\d+)?)\\s*,\\s*([+-]?\\d+(?:\\.\\d+)?)\\s*\\)`;
function parsePoint(raw){
 const m=new RegExp("^\\s*"+pair+"\\s*$").exec(text(raw));
 if(!m)return null;
 return [Number(m[1]),Number(m[2])];
}
function ruleParts(raw,direction){
 const s=standard(raw).replace(/\s+/g,"");
 const arrow=/^\(x,y\)->\(([-]?x|[-]?y),([-]?x|[-]?y)\)$/.exec(s);
 const expected=direction==="clockwise"?["y","-x"]:["-y","x"];
 if(arrow)return [arrow[1]===expected[0],arrow[2]===expected[1]];
 const assignments=[...s.split(/[;\n,]/).map(x=>x.trim())];
 const x=assignments.some(x=>x==="x'="+expected[0]||x==="x′="+expected[0]);
 const y=assignments.some(x=>x==="y'="+expected[1]||x==="y′="+expected[1]);
 return [x,y];
}
function outputVertices(raw,source){
 const s=standard(raw);
 if(!s||s.length>500||/\b(?:or|either|maybe)\b/i.test(s))return null;
 const matches=[...s.matchAll(/(?:([abc])['′]?\s*(?:=|:)?\s*)?\(\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)/g)];
 if(matches.length===0||matches.length>3)return null;
 const remainder=s.replace(/(?:[abc]['′]?\s*(?:=|:)?\s*)?\(\s*[+-]?\d+(?:\.\d+)?\s*,\s*[+-]?\d+(?:\.\d+)?\s*\)/g,"")
  .replace(/[\s,;]+/g,"").replace(/\band\b/g,"");
 if(remainder)return null;
 if(matches.some(m=>!!m[1])&&matches.some(m=>!m[1]))return null;
 if(matches.some(m=>!!m[1])&&new Set(matches.map(m=>m[1])).size!==matches.length)return null;
 return matches.map(m=>({label:m[1]||null,point:[Number(m[2]),Number(m[3])]}));
}
function rotationStep(work,source){
 const s=standard(work).replace(/\s+/g,"");
 return source.original.some((p,i)=>{
  const q=source.rotated[i];
  const before="("+p[0]+","+p[1]+")";
  const after="("+q[0]+","+q[1]+")";
  return s.includes(before+"->"+after);
 })||ruleParts(work,source.direction).every(Boolean);
}
function midpointMethod(work,source){
 const s=standard(work).replace(/\s+/g,"");
 const [a,b]=source.original;
 const [mx,my]=source.midpoint;
 const pairValue="("+mx+","+my+")";
 const first="("+a[0]+"+"+b[0]+")/2="+mx;
 const second="("+a[1]+"+"+b[1]+")/2="+my;
 return s.includes(first)&&s.includes(second)||
  s.includes("(("+a[0]+"+"+b[0]+")/2,("+a[1]+"+"+b[1]+")/2)="+pairValue);
}
function mappedMidpointMethod(work,source){
 const s=standard(work).replace(/\s+/g,"");
 const [x,y]=source.midpoint,[a,b]=source.imageMidpoint;
 return s.includes("("+x+","+y+")->("+a+","+b+")")||
  ruleParts(work,source.direction).every(Boolean)&&s.includes("("+x+","+y+")");
}
export function evaluateMathRotationV2({questionId,partId,response={}}={}){
 const source=MATH_ROTATION_SOURCES_V2[questionId];
 if(!source||!["a","b","c"].includes(partId))
  throw new TypeError("Uncalibrated Mathematics rotation source");
 const a=answer(response),w=working(response);
 if(partId==="a"){
  const rule=ruleParts(a+"\n"+w,source.direction);
  return report(questionId,partId,[
   vote("B1",rule[0],"correct-first-rotated-coordinate"),
   vote("B2",rule[1],"correct-second-rotated-coordinate")
  ]);
 }
 if(partId==="b"){
  const points=outputVertices(a,source)||[];
  const used=new Set();
  const correct=source.rotated.map((expected,i)=>{
   const index=points.findIndex((entry,j)=>!used.has(j)&&
    (entry.label===null||entry.label==="abc"[i])&&
    entry.point[0]===expected[0]&&entry.point[1]===expected[1]);
   if(index!==-1)used.add(index);
   return index!==-1;
  });
  return report(questionId,partId,[
   vote("M1",rotationStep(w,source),"source-correct-rotation-working"),
   ...correct.map((valid,i)=>vote("B"+(i+1),valid,"correct-rotated-vertex"))
  ]);
 }
 const point=parsePoint(a),final=point!==null&&point.every((x,i)=>x===source.imageMidpoint[i]);
 return report(questionId,partId,[
  vote("M1",midpointMethod(w,source),"original-side-midpoint-working"),
  vote("M2",mappedMidpointMethod(w,source),"rotate-computed-midpoint"),
  vote("A1",final,"correct-rotated-midpoint")
 ]);
}
