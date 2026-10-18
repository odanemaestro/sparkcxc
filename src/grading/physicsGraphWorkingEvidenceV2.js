/**
 * Structural checks for candidate-created Physics Q1 graph working.
 * Evidence is submitted by the client: these checks are advisory only.
 * The source is the student's saved Q1(b) plotted line, not a model line.
 */
export const PHYSICS_GRAPH_LIMITS=Object.freeze({xMin:0,xMax:11,yMin:0,yMax:260});
const finite=v=>typeof v==="number"&&Number.isFinite(v);
const inGrid=p=>p&&finite(p.x)&&finite(p.y)
 &&p.x>=PHYSICS_GRAPH_LIMITS.xMin&&p.x<=PHYSICS_GRAPH_LIMITS.xMax
 &&p.y>=PHYSICS_GRAPH_LIMITS.yMin&&p.y<=PHYSICS_GRAPH_LIMITS.yMax;
export function physicsGraphLine(graphResponse){
 const points=graphResponse?.graph?.line;
 if(!Array.isArray(points)||points.length!==2||!points.every(inGrid))return null;
 const [a,b]=points;
 if(Math.abs(a.x-b.x)<1e-9||Math.abs(a.y-b.y)<1e-9)return null;
 return {a,b,minX:Math.min(a.x,b.x),maxX:Math.max(a.x,b.x)};
}
export function samplePhysicsGraphLine(graphResponse,x){
 const line=physicsGraphLine(graphResponse);
 if(!line||!finite(x)||x<line.minX||x>line.maxX)return null;
 const y=line.a.y+(x-line.a.x)*(line.b.y-line.a.y)/(line.b.x-line.a.x);
 return Number.isFinite(y)&&inGrid({x,y})?{x,y}:null;
}
export function validatePhysicsGradientTriangle({graphResponse,response}={}){
 const evidence=response?.graphEvidence;
 if(evidence?.kind!=="physics-gradient-triangle-v1"||
  !Array.isArray(evidence.points)||evidence.points.length!==2)return false;
 const line=physicsGraphLine(graphResponse);
 if(!line)return false;
 const [a,b]=evidence.points;
 if(!inGrid(a)||!inGrid(b))return false;
 // A source marker requires the triangle to span at least half the line.
 // Also require half the original grid to avoid gaming a tiny segment.
 if(Math.abs(a.x-b.x)<Math.max(5.5,0.5*(line.maxX-line.minX)))return false;
 return [a,b].every(p=>{
  const onLine=samplePhysicsGraphLine(graphResponse,p.x);
  return onLine&&Math.abs(p.y-onLine.y)<0.000001;
 });
}
export function validatePhysicsPressureReading({graphResponse,response}={}){
 const evidence=response?.graphEvidence;
 const p=evidence?.point;
 if(evidence?.kind!=="physics-pressure-reading-v1"||!inGrid(p))return false;
 // 1/V at V=18 cm3 on the displayed x-axis (units of 10^-2 cm^-3).
 if(Math.abs(p.x-100/18)>0.12)return false;
 const onLine=samplePhysicsGraphLine(graphResponse,p.x);
 return !!onLine&&Math.abs(p.y-onLine.y)<0.000001;
}
