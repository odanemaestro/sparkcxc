/**
 * Conservative provisional scoring of historical freehand biology drawings.
 * Only objective canvas evidence is counted here. Shape identification,
 * anatomical labelling and genuine physical size are NOT certified by geometry.
 */
const STOMA="IS-M1-P2-21:1:0",FLOWER="IS-M1-P2-27:0:0";
const within=(v,hi)=>typeof v==="number"&&Number.isFinite(v)&&v>=0&&v<=hi;
const length=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const near=(a,b,t)=>Math.hypot(a[0]-b[0],a[1]-b[1])<=t;
function points(raw){
 let data;
 try{data=typeof raw==="string"?JSON.parse(raw):raw;}catch{return [];}
 if(!Array.isArray(data)||data.length>60)return [];
 return data.filter(path=>Array.isArray(path)&&path.length>=2&&path.length<=300&&
  path.every(p=>p&&within(p.x,600)&&within(p.y,300)));
}
function labels(raw){
 let data;
 try{data=typeof raw==="string"?JSON.parse(raw):raw;}catch{return null;}
 if(!data||typeof data!=="object"||Array.isArray(data)||!Array.isArray(data.labels))return null;
 const valid=p=>Array.isArray(p)&&p.length===2&&p.every(x=>within(x,1));
 if(data.labels.length>18||!data.labels.every(l=>l&&typeof l.name==="string"&&valid(l.from)&&valid(l.to)))
  return null;
 return data;
}
function bounds(paths){
 const coords=paths.flat();
 if(!coords.length)return null;
 const xs=coords.map(p=>p.x),ys=coords.map(p=>p.y);
 return {left:Math.min(...xs),right:Math.max(...xs),top:Math.min(...ys),bottom:Math.max(...ys)};
}
function clean(paths){
 if(paths.length<2||paths.length>24)return false;
 const total=paths.reduce((sum,p)=>sum+p.length,0);
 if(total<20||total>1800)return false;
 return paths.every(p=>{
  const dist=p.slice(1).map((pt,i)=>length(pt,p[i]));
  return dist.every(d=>d>0&&d<45)&&dist.reduce((n,d)=>n+d,0)>16;
 });
}
function intersects(a,b,c,d){
 const cross=(p,q,r)=>(q[0]-p[0])*(r[1]-p[1])-(q[1]-p[1])*(r[0]-p[0]);
 const ab1=cross(a,b,c),ab2=cross(a,b,d),cd1=cross(c,d,a),cd2=cross(c,d,b);
 return ab1*ab2<-.000001&&cd1*cd2<-.000001;
}
function pointNearStrokes(point,paths,tolerance=25){
 const px=point[0]*600,py=point[1]*300;
 return paths.some(path=>path.some(p=>Math.hypot(px-p.x,py-p.y)<tolerance));
}
function rulerLabels(evidence,paths){
 if(!evidence||evidence.labels.length<3)return false;
 const placements=evidence.labels;
 const distinct=new Set(placements.map(l=>l.name));
 if(distinct.size<3||!placements.every(l=>!near(l.from,l.to,.065)&&pointNearStrokes(l.to,paths)))return false;
 return placements.every((l,i)=>placements.every((r,j)=>j<=i||!intersects(l.from,l.to,r.from,r.to)));
}
function stomaTitle(title){
 return /\b(?:stoma|stomata|stomatal)\b/i.test(title)&&
  /\b(?:leaf|epidermis)\b/i.test(title)&&
  /\b(?:surface|view)\b/i.test(title);
}
function magnificationReported(evidence,notes){
 const width=String(evidence?.measurementMm??"").trim();
 if(!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(width)||Number(width)<=0)return false;
 const expected=Number(width)/.02;
 const candidates=[...String(notes??"").matchAll(/[×xX]\s*(\d+(?:\.\d+)?)/g)];
 return candidates.length===1&&Math.abs(Number(candidates[0][1])-expected)<=Math.max(.05,expected*.005);
}
export function markSourceBiologicalDrawing(qid,partIndex,itemIndex,item,responses={}){
 const base=qid+":"+partIndex+":"+itemIndex;
 const isStoma=base===STOMA,isFlower=base===FLOWER;
 if(!isStoma&&!isFlower)return null;
 if(item?.response?.type!=="drawing"||Number(item.marks)!==(isStoma?7:6))return null;
 const paths=points(responses[base+":strokes"]);
 const evidence=labels(responses[base+":biologicalEvidence"]);
 const box=bounds(paths);
 const tidy=clean(paths);
 const large=Boolean(box&&(box.right-box.left)>=210&&(box.bottom-box.top)>=155);
 const leaderLines=rulerLabels(evidence,paths);
 const scoreParts=isStoma?[
  {label:"Clean continuous lines, no shading",ok:tidy},
  {label:"Large drawing",ok:large},
  {label:"Correct stoma and guard cell structure",ok:false,unknown:true},
  {label:"Correct anatomical proportions",ok:false,unknown:true},
  {label:"Correctly placed anatomical labels",ok:false,unknown:true},
  {label:"Appropriate title and surface view",ok:stomaTitle(evidence?.title||"")},
  {label:"Stated magnification agrees with measured width and 0.02 mm",ok:magnificationReported(evidence,responses[base])}
 ]:[
  {label:"Clean continuous lines, no shading",ok:tidy},
  {label:"Large drawing",ok:large},
  {label:"Main flower parts in the correct proportions",ok:false,unknown:true},
  {label:"Correctly placed flower labels (first mark)",ok:false,unknown:true},
  {label:"Correctly placed flower labels (second mark)",ok:false,unknown:true},
  {label:"Ruled non-crossing leader lines",ok:leaderLines}
 ];
 const score=scoreParts.reduce((sum,p)=>sum+Number(p.ok),0);
 return {score,maxMarks:isStoma?7:6,unassessedMarks:scoreParts.length-score,
  sourceBiological:true,sourceResolved:false,provisional:true,visualEvidenceRequired:true,
  confidence:"low",
  criteria:scoreParts.map((p,i)=>({id:base+":bio:"+i,label:p.label,marks:Number(p.ok),maxMarks:1,earned:p.ok,
   provisional:p.unknown===true||true})),
  visualEvidence:{strokeCount:paths.length,cleanContinuousLines:tidy,large,nonCrossingLabelLines:leaderLines,
   title:stomaTitle(evidence?.title||""),shapeAndLabelTargetsIndependentlyVerified:false}
 };
}
