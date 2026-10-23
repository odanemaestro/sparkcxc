import {getPhysicsGraphWorkingSpec} from "./physicsGraphWorkingSpecsV2";
/**
 * Graph working geometry is compared with the student's plotted line and the
 * fixed graph limits from the source paper. All results are advisory.
 */
export const PHYSICS_GRAPH_LIMITS=Object.freeze({xMin:0,xMax:11,yMin:0,yMax:260});
const finite=v=>typeof v==="number"&&Number.isFinite(v);
const limitsFor=questionId=>{
 const spec=questionId?getPhysicsGraphWorkingSpec(questionId):null;
 return questionId&&!spec?null:spec?.limits||PHYSICS_GRAPH_LIMITS;
};
const inGrid=(p,limits)=>!!p&&!!limits&&finite(p.x)&&finite(p.y)
 &&p.x>=limits.xMin&&p.x<=limits.xMax&&p.y>=limits.yMin&&p.y<=limits.yMax;
export function physicsGraphLine(graphResponse,questionId){
 const limits=limitsFor(questionId);
 const points=graphResponse?.graph?.line;
 if(!limits||!Array.isArray(points)||points.length!==2||!points.every(p=>inGrid(p,limits)))return null;
 const [a,b]=points;
 if(Math.abs(a.x-b.x)<1e-9||Math.abs(a.y-b.y)<1e-9)return null;
 return {a,b,minX:Math.min(a.x,b.x),maxX:Math.max(a.x,b.x)};
}
export function samplePhysicsGraphLine(graphResponse,x,questionId){
 const limits=limitsFor(questionId);
 const line=physicsGraphLine(graphResponse,questionId);
 if(!line||!finite(x)||x<line.minX||x>line.maxX)return null;
 const y=line.a.y+(x-line.a.x)*(line.b.y-line.a.y)/(line.b.x-line.a.x);
 return Number.isFinite(y)&&inGrid({x,y},limits)?{x,y}:null;
}
export function validatePhysicsGradientTriangle({graphResponse,response,questionId}={}){
 const spec=questionId?getPhysicsGraphWorkingSpec(questionId):null;
 if(questionId&&!spec?.trianglePart)return false;
 const limits=limitsFor(questionId);
 const evidence=response?.graphEvidence;
 if(evidence?.kind!=="physics-gradient-triangle-v1"||
  !Array.isArray(evidence.points)||evidence.points.length!==2)return false;
 const line=physicsGraphLine(graphResponse,questionId);
 if(!line)return false;
 const [a,b]=evidence.points;
 if(!inGrid(a,limits)||!inGrid(b,limits))return false;
 const lineWidth=line.maxX-line.minX;
 // Reject a token line too short to represent the source experiment.
 if(spec&&lineWidth+1e-10<0.5*spec.referenceXSpan)return false;
 // The marking scheme measures the triangle against the line drawn,
 // rather than against the whole plotting grid.
 if(Math.abs(a.x-b.x)+1e-10<0.5*lineWidth)return false;
 return [a,b].every(p=>{
  const onLine=samplePhysicsGraphLine(graphResponse,p.x,questionId);
  return onLine&&Math.abs(p.y-onLine.y)<=Math.max(1e-10,1e-8*(limits.yMax-limits.yMin));
 });
}
export function validatePhysicsPressureReading({graphResponse,response,questionId="phy-p2-1-q1"}={}){
 if(questionId!=="phy-p2-1-q1")return false;
 const spec=getPhysicsGraphWorkingSpec(questionId);
 if(!spec?.readingPart)return false;
 const limits=limitsFor(questionId);
 const evidence=response?.graphEvidence;
 const p=evidence?.point;
 if(evidence?.kind!=="physics-pressure-reading-v1"||!inGrid(p,limits))return false;
 if(Math.abs(p.x-100/18)>0.12)return false;
 const onLine=samplePhysicsGraphLine(graphResponse,p.x,questionId);
 return !!onLine&&Math.abs(p.y-onLine.y)<=Math.max(1e-10,1e-8*(limits.yMax-limits.yMin));
}

/** Current is read across from 1.75 V, then down to the x-axis, on the
 * candidate's actual V against I line (Paper 3 Q1). This is saved graphic
 * evidence, never a numerical estimate inferred from prose. */
export function validatePhysicsCurrentReading({graphResponse,response,questionId="phy-p2-3-q1"}={}){
 if(questionId!=="phy-p2-3-q1")return false;
 const spec=getPhysicsGraphWorkingSpec(questionId);
 if(spec?.readingPart!=="e")return false;
 const point=response?.graphEvidence?.point;
 if(response?.graphEvidence?.kind!=="physics-current-reading-v1"||
  !inGrid(point,spec.limits))return false;
 if(Math.abs(point.y-1.75)>0.08)return false;
 const onLine=samplePhysicsGraphLine(graphResponse,point.x,questionId);
 return !!onLine&&Math.abs(point.y-onLine.y)<=
  Math.max(1e-10,1e-8*(spec.limits.yMax-spec.limits.yMin));
}
