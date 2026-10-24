/**
 * Source-bound verification for the two original digital biology drawings.
 *
 * This deliberately certifies only constrained, legible compositions drawn in
 * the calibrated 600x300 workspace. Freehand submissions outside the pattern
 * remain provisional under the existing biological drawing examiner.
 *
 * Canvas coordinates are virtual drawing units (0.4 mm per unit), independent
 * of a browser's physical CSS pixel size. The recorded dimension must agree
 * with the student's actual drawn bounding box.
 */
import {markSourceBiologicalDrawing} from "./sourceBiologicalDrawingMarking";
import {markSourceFlowerMagnification} from "./sourceFlowerMagnificationMarking";

const STOMA="IS-M1-P2-21:1:0";
const FLOWER="IS-M1-P2-27:0:0";
const MAG="IS-M1-P2-27:0:1";
export const BIOLOGY_DRAWING_UNIT_MM=0.4;
const read=x=>{try{return typeof x==="string"?JSON.parse(x):x;}catch{return null;}};
const finite=x=>typeof x==="number"&&Number.isFinite(x);
const numeric=x=>/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(String(x??"").trim())&&Number(x)>0;
const near=(a,b,t=0.02)=>Math.abs(a-b)<=Math.max(t,Math.abs(b)*.02);
const rectangle=path=>{
 const xs=path.map(p=>p.x),ys=path.map(p=>p.y);
 return {l:Math.min(...xs),r:Math.max(...xs),t:Math.min(...ys),b:Math.max(...ys)};
};
const contains=(b,pt,pad=8)=>pt.x>=b.l-pad&&pt.x<=b.r+pad&&pt.y>=b.t-pad&&pt.y<=b.b+pad;
const centroid=b=>({x:(b.l+b.r)/2,y:(b.t+b.b)/2});
const width=b=>b.r-b.l,height=b=>b.b-b.t;
const normalizeName=n=>String(n||"").trim().toLowerCase().replace(/\s+/g," ");
function geometry(base,raw){
 const paths=read(raw);
 if(!Array.isArray(paths)||paths.length>(base===STOMA?6:15))return null;
 if(!paths.every(p=>Array.isArray(p)&&p.length>=10&&p.length<=300&&p.every(
  v=>v&&finite(v.x)&&finite(v.y)&&v.x>=0&&v.x<=600&&v.y>=0&&v.y<=300)))return null;
 if(!paths.every(p=>Math.hypot(p[0].x-p.at(-1).x,p[0].y-p.at(-1).y)<=18))return null;
 const shapes=paths.map(p=>({path:p,b:rectangle(p)}));
 const outer=rectangle(paths.flat());
 return {paths,shapes,outer};
}
function sourceEvidence(base,responses){
 const entry=read(responses[base+":biologicalEvidence"]);
 if(!entry||typeof entry!=="object"||!Array.isArray(entry.labels)||entry.labels.length>18)return null;
 if(!entry.labels.every(l=>l&&typeof l.name==="string"&&
  Array.isArray(l.from)&&Array.isArray(l.to)&&l.from.length===2&&l.to.length===2&&
  [...l.from,...l.to].every(v=>finite(v)&&v>=0&&v<=1)))return null;
 return entry;
}
function concave(path){
 const signs=new Set();
 for(let i=0;i<path.length-2;i++){
  const a=path[i],b=path[i+1],c=path[i+2];
  const cross=(b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x);
  if(Math.abs(cross)>2)signs.add(Math.sign(cross));
 }
 return signs.size===2;
}
function stomaFeatures(g){
 if(g.shapes.length!==3)return null;
 const tall=g.shapes.filter(s=>height(s.b)>150&&height(s.b)>width(s.b)*1.12)
  .sort((a,b)=>centroid(a.b).x-centroid(b.b).x);
 if(tall.length!==2||tall.some(s=>!concave(s.path)))return null;
 const [left,right]=tall;
 const pore=g.shapes.find(s=>s!==left&&s!==right);
 if(!pore)return null;
 const lc=centroid(left.b),rc=centroid(right.b),pc=centroid(pore.b);
 const aligned=Math.abs(lc.y-rc.y)<30&&Math.abs(height(left.b)-height(right.b))<55;
 const gap=right.b.l-left.b.r;
 if(!aligned||gap<12||gap>140||pc.x<=left.b.r||pc.x>=right.b.l||
    Math.abs(pc.y-(lc.y+rc.y)/2)>34||height(pore.b)<40)return null;
 return {left,right,pore,aligned};
}
function flowerFeatures(g){
 if(g.shapes.length<8)return null;
 const a=g.shapes,all=g.outer,cx=centroid(all).x,mid=centroid(all).y;
 const petals=a.filter(s=>width(s.b)>=65&&height(s.b)>=55&&centroid(s.b).y<mid+8);
 const sepals=a.filter(s=>width(s.b)>=30&&height(s.b)>=22&&
  centroid(s.b).y>mid+15);
 const ovary=a.find(s=>Math.abs(centroid(s.b).x-cx)<55&&
  centroid(s.b).y>mid&&width(s.b)>=25&&width(s.b)<=95&&height(s.b)>=42);
 const pair=(shapes,sep)=>shapes.some(l=>shapes.some(r=>l!==r&&
  centroid(l.b).x<cx&&centroid(r.b).x>cx&&
  centroid(r.b).x-centroid(l.b).x>=sep));
 if(!pair(petals,65)||!pair(sepals,50)||!ovary)return null;
 const inner=a.filter(s=>!petals.includes(s)&&!sepals.includes(s)&&s!==ovary);
 const stigma=inner.find(s=>Math.abs(centroid(s.b).x-cx)<35&&centroid(s.b).y<mid-40);
 const style=inner.find(s=>Math.abs(centroid(s.b).x-cx)<35&&
  Math.abs(centroid(s.b).y-mid)<38&&height(s.b)>=30);
 const anther=inner.find(s=>Math.abs(centroid(s.b).x-cx)>35&&centroid(s.b).y<mid);
 if(!stigma||!style||!anther)return null;
 return {petals,sepals,ovary,stigma,style,anther};
}
function endPoint(l){return {x:l.to[0]*600,y:l.to[1]*300};}
function labelTarget(name,p,features,isStoma){
 if(isStoma){
  if(["guard cell","guard cells"].includes(name))
   return contains(features.left.b,p)||contains(features.right.b,p);
  if(["stoma","stomatal pore","pore"].includes(name))return contains(features.pore.b,p);
  if(["chloroplast","chloroplasts","nucleus","nuclei"].includes(name))
   return contains(features.left.b,p)||contains(features.right.b,p);
  return false;
 }
 if(name==="petal"||name==="petals")return features.petals.some(s=>contains(s.b,p));
 if(name==="sepal"||name==="sepals")return features.sepals.some(s=>contains(s.b,p));
 if(name==="ovary")return contains(features.ovary.b,p);
 if(name==="stigma")return contains(features.stigma.b,p);
 if(name==="style")return contains(features.style.b,p);
 if(name==="anther")return contains(features.anther.b,p);
 return false; // Unsupported structures are unresolved, never guessed correct.
}
function labelsCorrect(evidence,features,isStoma){
 const names=new Set();
 for(const label of evidence.labels){
  const name=normalizeName(label.name),point=endPoint(label);
  if(!labelTarget(name,point,features,isStoma))continue;
  const concept=isStoma
   ?(["guard cell","guard cells"].includes(name)?"guard":/stoma|pore/.test(name)?"pore":"organelle")
   :name.replace(/s$/,"");
  names.add(concept);
 }
 return isStoma?Number(names.has("guard")&&names.has("pore")&&names.has("organelle"))
  :names.size>=6?2:names.size>=3?1:0;
}
function reportedDimension(g,e,axis){
 return numeric(e.measurementMm)&&near(Number(e.measurementMm),
  (axis==="width"?width(g.outer):height(g.outer))*BIOLOGY_DRAWING_UNIT_MM,0.6);
}
function drawingResult(base,responses){
 const g=geometry(base,responses[base+":strokes"]);
 const e=sourceEvidence(base,responses);
 if(!g){
  // A text-only answer must never be published as a final drawing mark.
  // The existing source examiner retains provisional/advisory handling.
  return null;
 }
 if(!e)return null;
 const original=markSourceBiologicalDrawing(
  base.split(":")[0],Number(base.split(":")[1]),0,
  {marks:base===STOMA?7:6,response:{type:"drawing"}},responses);
 if(!original?.visualEvidence?.cleanContinuousLines||!original.visualEvidence.large)return null;
 const feature=base===STOMA?stomaFeatures(g):flowerFeatures(g);
 if(!feature)return null;
 const parts=original.criteria||[];
 if(base===STOMA){
  const shape=1,proportions=Number(feature.aligned);
  const labels=labelsCorrect(e,feature,true);
  const title=Number(/\b(?:stoma|stomata|stomatal)\b/i.test(e.title||"")&&
   /\b(?:leaf|epidermis)\b/i.test(e.title||"")&&/\b(?:surface|view)\b/i.test(e.title||""));
  const mag=Number(reportedDimension(g,e,"width")&&
   numeric(e.measurementMm)&&
   [...String(responses[base]??"").matchAll(/[×xX]\s*(\d+(?:\.\d+)?)/g)].some(m=>
    near(Number(m[1]),Number(e.measurementMm)/.02,1)));
  return {score:Number(parts[0]?.earned)+Number(parts[1]?.earned)+shape+proportions+
    labels+title+mag,resolved:true,unitVerified:true};
 }
 const marks=labelsCorrect(e,feature,false);
 const leaders=Number(parts[5]?.earned===true);
 return {score:Number(parts[0]?.earned)+Number(parts[1]?.earned)+1+marks+leaders,
  resolved:true,unitVerified:true};
}
function magnificationResult(responses){
 const drawing=drawingResult(FLOWER,responses);
 if(!drawing?.resolved||!drawing.unitVerified)return null;
 const e=sourceEvidence(FLOWER,responses);
 const g=geometry(FLOWER,responses[FLOWER+":strokes"]);
 if(!e||!g)return null;
 const base=MAG;
 const actual=responses[base+":actualHeightMm"];
 const drawn=responses[base+":drawingHeightMm"];
 const reference=60; // Figure 6's 60 mm reference in the authored source marking example.
 if(!reportedDimension(g,e,"height")||!numeric(drawn)||
    !near(Number(drawn),Number(e.measurementMm),0.6))return null;
 const source=markSourceFlowerMagnification(responses,base);
 // A submitted size inconsistent with the source reference has no certain
 // answer credit. Source height is not chosen by the student.
 if(!numeric(actual)||!near(Number(actual),reference,.1))
  return {score:0,resolved:true,unitVerified:true};
 return {score:source.score,resolved:true,unitVerified:true};
}
/** Strict source assessment. Returns null if the conventional grader must abstain. */
export function verifyOriginalBiologyEvidence(base,responses){
 if(base===MAG)return magnificationResult(responses);
 if(base===STOMA||base===FLOWER)return drawingResult(base,responses);
 return null;
}
