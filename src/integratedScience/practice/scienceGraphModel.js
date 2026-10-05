export const GRAPH_RESPONSE_VERSION=1;
export function graphText(value){
  return String(value ?? "").toLowerCase().replace(/³/g,"3").replace(/²/g,"2").replace(/[^a-z0-9]+/g," ").trim();
}
export function newScienceGraph(){
  return {version:GRAPH_RESPONSE_VERSION,kind:"",connection:"none",barWidth:.6,
    x:{min:"",max:"",step:""},y:{min:"",max:"",step:""},series:[{name:"",points:""}]};
}
export function readScienceGraph(value){
  try{
    const graph=typeof value==="string"?JSON.parse(value):value;
    if(graph?.version!==1 || !Array.isArray(graph.series) || graph.series.length<1 || graph.series.length>3) return null;
    if(!graph.series.every(s=>s && typeof s.name==="string" && typeof s.points==="string" && s.points.length<=20000)) return null;
    if(!graph.x || !graph.y) return null;
    return graph;
  }catch{return null;}
}
export function graphPoints(text,kind){
  return String(text || "").split(/\n|;/).filter(s=>s.trim()).slice(0,101).map(line=>{
    const match=line.trim().match(/^\(?\s*(.+?)\s*,\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*\)?$/);
    if(!match) return null;
    const x=kind==="bar"?match[1].trim():Number(match[1]);
    return (kind==="bar"?Boolean(x):Number.isFinite(x)) ? {x,y:Number(match[2])} : null;
  });
}
export function graphAxis(axis){
  if(!axis || [axis.min,axis.max,axis.step].some(v=>v==="" || v===null || v===undefined)) return null;
  const min=Number(axis.min),max=Number(axis.max),step=Number(axis.step);
  const intervals=(max-min)/step;
  if(![min,max,step].every(Number.isFinite) || max<=min || step<=0 || intervals<1 || intervals>20 || Math.abs(intervals-Math.round(intervals))>1e-7) return null;
  return {min,max,step,intervals:Math.round(intervals)};
}

// The same interpolation is used in the preview and assessed as an explicit
// digital construction choice. It does not claim to measure freehand skill.
export function graphPath(points,connection){
  if(!points.length || connection==="none") return "";
  if(connection==="best-fit" && points.length>1){
    const n=points.length,sx=points.reduce((s,p)=>s+p.x,0),sy=points.reduce((s,p)=>s+p.y,0);
    const denom=n*points.reduce((s,p)=>s+p.x*p.x,0)-sx*sx;
    if(Math.abs(denom)<1e-12) return "";
    const slope=(n*points.reduce((s,p)=>s+p.x*p.y,0)-sx*sy)/denom;
    const intercept=(sy-slope*sx)/n;
    const left=Math.min(...points.map(p=>p.x)),right=Math.max(...points.map(p=>p.x));
    return `M${left},${slope*left+intercept} L${right},${slope*right+intercept}`;
  }
  if(connection==="segments" || points.length<3) return points.map((p,i)=>`${i?"L":"M"}${p.x},${p.y}`).join(" ");
  if(connection!=="smooth") return "";
  // Monotone cubic interpolation prevents overshoot between measurements.
  const slopes=points.slice(1).map((p,i)=>(p.y-points[i].y)/(p.x-points[i].x));
  if(slopes.some(s=>!Number.isFinite(s))) return "";
  const tangents=points.map((p,i)=>i===0?slopes[0]:i===points.length-1?slopes[i-1]:slopes[i-1]*slopes[i]<=0?0:2/(1/slopes[i-1]+1/slopes[i]));
  return points.slice(1).reduce((d,p,i)=>{
    const a=points[i],dx=(p.x-a.x)/3;
    return `${d} C${a.x+dx},${a.y+dx*tangents[i]} ${p.x-dx},${p.y-dx*tangents[i+1]} ${p.x},${p.y}`;
  },`M${points[0].x},${points[0].y}`);
}
