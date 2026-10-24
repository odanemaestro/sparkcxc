/**
 * Source-bound cumulative-frequency graph scoring for historical Mathematics
 * E-J practice F/H/J, Q5(b). No freehand sketches or prose are score evidence.
 */
const DATA={
 "p2f-q5::b":{values:[[10,4],[20,15],[30,33],[40,42],[50,50]],groups:[5],max:3},
 "p2h-q5::b":{values:[[10,6],[20,20],[30,40],[40,52],[50,60]],groups:[3,2],max:3},
 "p2j-q5::b":{values:[[15,5],[20,17],[25,33],[30,43],[35,50]],groups:[3,2],max:3}
};
const object=x=>Boolean(x)&&typeof x==="object"&&!Array.isArray(x);
const coord=p=>object(p)&&Number.isFinite(p.x)&&Number.isFinite(p.y);
const near=(a,b,tol)=>Math.abs(a.x-b[0])<=tol&&Math.abs(a.y-b[1])<=tol;
const identical=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const graphShapeOk=(part,expected)=>{
 const schema=part?.responseSchema,graph=schema?.graph;
 if(schema?.type!=="graph"||part.marks!==3||graph?.mode!=="curve"||
   graph.axisSetupMode==="custom"||graph.allowCustomAxes||
   !Array.isArray(graph.tools)||!graph.tools.includes("curve")||
   !Array.isArray(schema.criteria)||schema.criteria.length!==2)
   return false;
 const [points,curve]=schema.criteria;
 return points.kind==="graph_points"&&points.marks===2&&
  curve.kind==="graph_curve"&&curve.marks===1&&
  identical(points.points,expected)&&identical(curve.referencePoints,expected);
};
const rubricOk=(id,source,part)=>{
 const lines=source?.criteria,data=DATA[id];
 if(!data||!Array.isArray(lines)||source.answer!==part.answer)return false;
 if(id.startsWith("p2f")){
  return lines.length===2&&lines[0].marks===2&&lines[1].marks===1&&
   lines.every(x=>x.kind==="B"&&x.check?.type==="manual-verification"&&
     typeof x.check.evidence==="string"&&x.check.evidence.trim());
 }
 return lines.length===3&&lines.every(x=>x.kind==="B"&&x.marks===1&&
  x.check?.type==="manual-verification"&&typeof x.check.evidence==="string"&&
  x.check.evidence.trim());
};
export function gradeOriginalMathOgive({criterionId,source,part,response}){
 const definition=DATA[criterionId];if(!definition)return null;
 const graph=part?.responseSchema?.graph;
 if(!graphShapeOk(part,definition.values)||!rubricOk(criterionId,source,part)||
   !object(response)||!Array.isArray(response.points)||response.points.length>25)
  return null;
 const pts=response.points;
 if(pts.some(p=>!coord(p)||p.x<graph.xMin||p.x>graph.xMax||
  p.y<graph.yMin||p.y>graph.yMax||p.label!==undefined))return null;
 if(new Set(pts.map(p=>p.x+","+p.y)).size!==pts.length)return null;
 for(const [key,value] of Object.entries({
  axisXMin:graph.xMin,axisXMax:graph.xMax,
  axisYMin:graph.yMin,axisYMax:graph.yMax,
  axisXStep:graph.xStep,axisYStep:graph.yStep,
  axisXLabel:graph.xLabel,axisYLabel:graph.yLabel
 }))if(response[key]!==undefined&&String(response[key])!==String(value))return null;
 const matches=definition.values.map(value=>pts.filter(p=>near(p,value,1.2)));
 const exact=matches.map(a=>a.length===1);
 // A five-point frequency curve may contain *only* its source plot points.
 // A competing extra point makes the requested curve ambiguous.
 const noExtra=pts.length===matches.filter(a=>a.length===1).length;
 const ordered=pts.length>1?[...pts].sort((a,b)=>a.x-b.x):pts;
 const increasing=ordered.every((p,i)=>i===0||
   (p.x>ordered[i-1].x&&p.y>=ordered[i-1].y));
 const full=exact.every(Boolean)&&noExtra;
 const sourceGroupMarks=definition.groups.length===1
  ?Number(full)*2
  :Number(exact.slice(0,3).every(Boolean))+
   Number(exact.slice(3).every(Boolean));
 const curveMark=Number(full&&increasing&&response.curve===true&&
  (!Array.isArray(response.linePoints)||response.linePoints.length===0));
 return {marks:sourceGroupMarks+curveMark,resolved:true,
  method:"source-cumulative-frequency-graph-v1"};
}
