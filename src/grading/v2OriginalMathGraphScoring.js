/**
 * Deterministic source-verified evidence for the six original Mathematics
 * Paper 2 E/G/I graph plots. This never interprets screenshots or student
 * prose as coordinates. Source rubric hashes are verified separately at
 * registration. No freehand construction is certified by this evaluator.
 */
const POLOTS={
 "p2e-q3::a":[[-4,-1],[2,8]],
 "p2g-q3::a":[[-5,6],[3,2]],
 "p2i-q3::a":[[-2,-3],[3,7]]
};
const CURVES=new Set(["p2e-q8::b","p2g-q8::b","p2i-q8::b"]);
const isObject=x=>Boolean(x)&&typeof x==="object"&&!Array.isArray(x);
const point=x=>isObject(x)&&Number.isFinite(x.x)&&Number.isFinite(x.y);
const near=(a,b,tol)=>Math.abs(a.x-b[0])<=tol+1e-9&&Math.abs(a.y-b[1])<=tol+1e-9;
const gridOk=(value,spec)=>Number.isFinite(value)&&
  value>=spec.graph.xMin-1e-8&&value<=spec.graph.xMax+1e-8;
const pointInGrid=(p,g)=>p.x>=g.xMin-1e-8&&p.x<=g.xMax+1e-8&&
 p.y>=g.yMin-1e-8&&p.y<=g.yMax+1e-8;
const coordFrom=v=>Array.isArray(v)&&v.length===2&&v.every(Number.isFinite)?v:null;
const schemaPoints=part=>part?.responseSchema?.criteria?.find(x=>x.kind==="graph_points");
const sourceRulesOk=(source,part,marks)=>{
 const rules=source?.criteria;
 return typeof source?.answer==="string"&&source.answer===part.answer&&
 Array.isArray(rules)&&rules.length===marks&&
 rules.every((x,i)=>x.code==="B"+(i+1)&&x.kind==="B"&&
  x.marks===1&&x.check?.type==="manual-verification"&&
  typeof x.check.evidence==="string"&&x.check.evidence.trim());
};
export function gradeOriginalMathematicsGraph({criterionId,source,part,response}){
 const isPlot=Object.prototype.hasOwnProperty.call(POLOTS,criterionId);
 const isCurve=CURVES.has(criterionId);
 if(!isPlot&&!isCurve)return null;
 const marks=isPlot?2:4;
 const schema=part?.responseSchema,config=schema?.graph,pointsSpec=schemaPoints(part);
 if(schema?.type!=="graph"||!config||!pointsSpec||
    part.marks!==marks||!sourceRulesOk(source,part,marks)||
    !isObject(response)||!Array.isArray(response.points)||response.points.length>60)
    return null;
 const expected=(isPlot?POLOTS[criterionId]:pointsSpec.points);
 if(!Array.isArray(expected)||expected.length<(isPlot?2:7)||
    expected.some(x=>!coordFrom(x)))return null;
 const tol=isPlot?0.25:0.3;
 const pts=response.points;
 if(pts.some(p=>!point(p)||!pointInGrid(p,config)))return null;
 // The original plot explicitly requires A and B. A coordinate without its
 // written label does NOT satisfy that original source mark.
 if(isPlot){
   const original=pointsSpec.points;
   if(JSON.stringify(original)!==JSON.stringify(expected)||
      !Array.isArray(config.pointLabels)||
      config.pointLabels.join(",")!=="A,B")return null;
   // Two submitted points bearing the same label are ambiguous evidence.
   const labels=pts.filter(p=>p.label!==undefined).map(p=>p.label);
   if(labels.some(x=>x!=="A"&&x!=="B")||new Set(labels).size!==labels.length)return null;
   const score=expected.reduce((total,xy,i)=>
     total+Number(pts.some(p=>p.label===["A","B"][i]&&near(p,xy,tol))),0);
   return {marks:score,resolved:true,method:"source-labelled-coordinate-plot-v1"};
 }
 const graphCriteria=schema.criteria;
 if(!Array.isArray(graphCriteria)||graphCriteria.length<2||
   !graphCriteria.some(x=>x.kind==="graph_curve")||
   config.pointLabels||config.allowCustomAxes||config.axisSetupMode==="custom")
   return null;
 const fromSchema=pointsSpec.points;
 if(expected.length!==fromSchema.length||
    expected.some((v,i)=>v[0]!==fromSchema[i][0]||v[1]!==fromSchema[i][1]))
    return null;
 // Fixed source axes must not be overridden by student response metadata.
 for(const [key,configured] of [
  ["axisXMin",config.xMin],["axisXMax",config.xMax],
  ["axisYMin",config.yMin],["axisYMax",config.yMax],
  ["axisXStep",config.xStep],["axisYStep",config.yStep],
  ["axisXLabel",config.xLabel],["axisYLabel",config.yLabel]
 ])if(response[key]!==undefined&&String(response[key])!==String(configured))return null;
 const unique=new Set(pts.map(p=>p.x+","+p.y));
 if(unique.size!==pts.length)return null;
 const matches=expected.map(xy=>pts.find(p=>near(p,xy,tol)));
 const group1=matches.slice(0,3).every(Boolean);
 const group2=matches.slice(3).every(Boolean);
 // Original B3 is awarded only with the supplied scale, a valid vertex and
 // plotted data on both sides of the turning point.
 const middle=Math.floor(expected.length/2);
 const axesPlaced=Boolean(matches[0]&&matches[middle]&&matches[expected.length-1]);
 // A smooth curve is produced by the actual SVG curve control. Reject
 // straight-line-only, missing-point or extra off-curve plots.
 const allPoints=matches.every(Boolean)&&pts.length===expected.length;
 const smooth=allPoints&&response.curve===true&&
  !Array.isArray(response.linePoints)&&config.mode==="curve"&&
  Array.isArray(config.tools)&&config.tools.includes("curve");
 return {marks:Number(group1)+Number(group2)+Number(axesPlaced)+Number(smooth),
  resolved:true,method:"source-quadratic-points-and-curve-v1"};
}
