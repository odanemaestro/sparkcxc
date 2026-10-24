/** Source-bound Mathematics V2 closing cohort: original v4/v5 graph evidence.
 * Student graph payload, not a declared correct-answer string, determines drawing marks.
 * Other mathematical working is resolved only against the registered source scheme.
 */
export const MATH_FINAL_11_IDS=Object.freeze([
  "p2-q5-v4::b",
  "p2-q5-v4::c",
  "p2-q5-v4::d",
  "p2-q8-v4::b",
  "p2-q8-v4::e",
  "p2-q5-v5::b",
  "p2-q5-v5::c",
  "p2-q5-v5::d",
  "p2-q8-v5::b",
  "p2-q8-v5::e",
  "p2e-q2::c"
]);
const ids=new Set(MATH_FINAL_11_IDS);
const obj=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const norm=x=>x.trim().replace(/[−–—]/g,"-").replace(/\s+/g," ").toLowerCase();
const close=(a,b,tol)=>Math.abs(a-b)<=tol+1e-8;
const coord=p=>obj(p)&&Number.isFinite(p.x)&&Number.isFinite(p.y);
const denied=(tag)=>({marks:0,resolved:false,method:"source-final-11-v1-"+tag});
function sourceOk(id,source,part,max){
 const checks=source?.criteria;
 if(!ids.has(id)||!obj(part)||!obj(source)||!Array.isArray(checks)||
  checks.reduce((n,c)=>n+c.marks,0)!==max||
  checks.some(c=>!Number.isInteger(c.marks)||c.marks<0||!c.code||!c.check)||
  typeof source.answer!=="string"||source.answer!==part.answer||
  typeof source.solution!=="string"||source.solution!==part.solution)
  return false;
 if(id==="p2e-q2::c"){
  return max===2&&part.marks===3&&checks.map(c=>c.kind+":"+c.marks).join(",")==="M:1,A:1,B:0";
 }
 return max===part.marks&&(id.endsWith("::b")&&part.responseSchema?.type==="graph"?
   max===3: id.endsWith("::e")?max===2:
   max===2&&part.responseSchema?.type!=="graph");
}
function graphChecks(part,source){
 const schema=part.responseSchema,graph=schema.graph;
 const proof=schema.criteria;
 if(!graph||graph.mode!=="curve"||graph.allowCustomAxes||graph.axisSetupMode==="custom"||
  !Array.isArray(proof)||proof.length!==2||
  proof[0]?.kind!=="graph_points"||proof[0].marks!==2||
  proof[1]?.kind!=="graph_curve"||proof[1].marks!==1||
  !Array.isArray(proof[0].points)||proof[0].points.length<5||
  proof[0].points.some(p=>!Array.isArray(p)||p.length!==2||p.some(v=>!Number.isFinite(v))))return null;
 const cs=source.criteria;
 if(cs.length!==3||cs.map(c=>c.kind+":"+c.marks).join(",")!=="M:1,M:1,A:1"||
  cs.some(c=>c.check.type!=="manual-verification"))return null;
 return proof[0].points;
}
function graphGrade(part,source,response,id){
 const points=graphChecks(part,source);
 if(!points)return null;
 const graph=part.responseSchema.graph,ogive=id.includes("q5");
 if(!obj(response)||!Array.isArray(response.points)||response.points.length>30)
  return denied("missing-graph");
 if(response.points.some(p=>!coord(p)||p.x<graph.xMin||p.x>graph.xMax||
  p.y<graph.yMin||p.y>graph.yMax||p.label!==undefined)||
  new Set(response.points.map(p=>p.x+","+p.y)).size!==response.points.length)
  return denied("invalid-graph");
 const axis={axisXMin:graph.xMin,axisXMax:graph.xMax,axisYMin:graph.yMin,
  axisYMax:graph.yMax,axisXStep:graph.xStep,axisYStep:graph.yStep,
  axisXLabel:graph.xLabel,axisYLabel:graph.yLabel};
 if(Object.entries(axis).some(([k,v])=>response[k]!==undefined&&String(response[k])!==String(v)))
  return denied("axes");
 const tol=part.responseSchema.criteria[0].tolerance;
 const [tx,ty]=Array.isArray(tol)?tol:[tol,tol];
 const hits=points.map(([x,y])=>response.points.filter(p=>close(p.x,x,tx)&&close(p.y,y,ty)));
 // Ambiguous duplicated or unexpected points must not earn authoritative marks.
 const matched=hits.every(v=>v.length<=1);
 if(!matched||response.points.some(p=>!points.some(([x,y])=>close(p.x,x,tx)&&close(p.y,y,ty))))
  return denied("ambiguous-points");
 const n=hits.length,half=Math.ceil(n/2);
 const first=hits.slice(0,half).every(v=>v.length===1);
 const second=hits.slice(half).every(v=>v.length===1);
 const all=first&&second&&response.points.length===n;
 const sorted=[...response.points].sort((a,b)=>a.x-b.x);
 const monotonic=sorted.every((p,i)=>i===0||(p.x>sorted[i-1].x&&p.y>=sorted[i-1].y));
 const smooth=all&&response.curve===true&&!Array.isArray(response.linePoints)&&
  (!ogive||monotonic);
 return {marks:Number(first)+Number(second)+Number(smooth),resolved:true,
  method:"source-final-11-v1-"+(ogive?"ogive":"parabola")};
}
function lineGrade(part,source,response,id){
 const schema=part.responseSchema,g=schema.graph,checks=schema.criteria;
 if(schema.type!=="graph"||g?.mode!=="line"||!Array.isArray(checks)||checks.length!==2||
  checks[0].kind!=="graph_line"||checks[0].marks!==1||
  checks[1].kind!=="root_set"||checks[1].marks!==1||
  source.criteria.map(c=>c.kind+":"+c.marks).join(",")!=="M:1,A:1"||
  !Array.isArray(schema.answerFields)||schema.answerFields.length!==2||
  checks[1].answers.length!==2)return null;
 if(!obj(response))return denied("line-unstructured");
 const lines=response.linePoints;
 if(lines!==undefined&&(!Array.isArray(lines)||lines.length!==2||
  lines.some(p=>!coord(p)||p.x<g.xMin||p.x>g.xMax||p.y<g.yMin||p.y>g.yMax)))
  return denied("line-invalid");
 const target=checks[0].intercept,tol=checks[0].tolerance;
 const line=Array.isArray(lines)&&lines.length===2&&
  lines[0].x!==lines[1].x&&Math.abs(lines[0].x-lines[1].x)>=1&&
  lines.every(p=>close(p.y,target,tol));
 const ans=response.answers;
 if(ans!==undefined&&(!obj(ans)||Object.keys(ans).some(k=>!["x1","x2"].includes(k))))
  return denied("line-root-keys");
 const rootValues=ans&&[ans.x1,ans.x2].map(x=>x===""||x==null?NaN:Number(x));
 const roots=Array.isArray(rootValues)&&rootValues.every(Number.isFinite)&&
  rootValues.every(x=>x>=g.xMin&&x<=g.xMax)&&
  [rootValues,[...rootValues].reverse()].some(r=>r.every((x,i)=>
   close(x,checks[1].answers[i],checks[1].tolerance)));
 return {marks:Number(line)+Number(roots),resolved:true,method:"source-final-11-v1-graph-line-roots"};
}
function textGrade(part,source,response,id,max){
 if(!obj(response)||Object.keys(response).some(k=>!["answer","working"].includes(k))||
  typeof(response.answer??"")!=="string"||typeof(response.working??"")!=="string")
  return denied("unstructured-text");
 const answer=response.answer??"",working=response.working??"";
 if(answer.length>2000||working.length>4000)return denied("text-size");
 if(!answer.trim()&&!working.trim())return {marks:0,resolved:true,method:"source-final-11-v1-blank"};
 if(norm(answer)==="banana"&&!working.trim())
  return {marks:0,resolved:true,method:"source-final-11-v1-irrelevant"};
 if(!working.trim()||norm(working)!==norm(source.solution))return denied("alternative-method");
 const accurate=norm(answer)===norm(source.answer);
 return {marks:max-1+Number(accurate),resolved:true,method:"source-final-11-v1-written"};
}
export function gradeMathFinal11({criterionId,source,part,maxMarks,response}){
 if(!sourceOk(criterionId,source,part,maxMarks))return null;
 if(criterionId.endsWith("::b"))return graphGrade(part,source,response,criterionId);
 if(criterionId.endsWith("::e"))return lineGrade(part,source,response,criterionId);
 return textGrade(part,source,response,criterionId,maxMarks);
}
