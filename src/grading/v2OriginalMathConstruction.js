/**
 * Authoritative only for original v9/v10 Q3(a) when the persisted construction
 * canvas supplies real lines and compass circles. Never infer arcs from prose.
 * All other source geometries remain advisory.
 */
const TARGETS=Object.freeze({
 "p2-q3-v9::a":{pq:8,qr:6,angle:60},
 "p2-q3-v10::a":{pq:9,qr:5,angle:90}
});
const isObject=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const point=(x,y)=>({x,y});
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const within=(a,b,tol)=>dist(a,b)<=tol;
const at=(c,p,tol=0.16)=>within(point(c.cx,c.cy),p,tol);
const unit=(a,b)=>{const d=dist(a,b);return d>1e-6?point((b.x-a.x)/d,(b.y-a.y)/d):null;};
const move=(p,u,d)=>point(p.x+u.x*d,p.y+u.y*d);
const dot=(a,b)=>a.x*b.x+a.y*b.y;
const ang=(u,v)=>Math.acos(Math.max(-1,Math.min(1,dot(u,v))))*180/Math.PI;
const hasLine=(lines,a,b)=>lines.some(s=>
 (within(point(s.x1,s.y1),a,0.16)&&within(point(s.x2,s.y2),b,0.16))||
 (within(point(s.x2,s.y2),a,0.16)&&within(point(s.x1,s.y1),b,0.16)));
const circleAt=(circles,p,r,tol=0.17)=>circles.some(c=>at(c,p)&&Math.abs(c.r-r)<=tol);
const circles60=(circles,P,Q,R)=>{
 const toP=unit(Q,P),toR=unit(Q,R);
 return circles.some(c=>{
  if(!at(c,Q)||c.r<0.5||c.r>4.2)return false;
  const s=move(Q,toP,c.r), intersection=move(Q,toR,c.r);
  return circles.some(other=>other!==c&&at(other,s)&&
    Math.abs(other.r-c.r)<=0.15&&
    Math.abs(dist(point(other.cx,other.cy),intersection)-other.r)<=0.16);
 });
};
const circles90=(circles,P,Q,R)=>{
 const toP=unit(Q,P),toR=unit(Q,R);
 return circles.some(first=>{
  if(!at(first,Q)||first.r<0.5||first.r>3.2)return false;
  const d=first.r, left=move(Q,toP,d),right=move(Q,toP,-d);
  return circles.some(c=>at(c,left)&&c.r>d+0.25&&
   circles.some(other=>other!==c&&at(other,right)&&
    Math.abs(other.r-c.r)<=0.16&&
    Math.abs(dist(point(c.cx,c.cy),move(Q,toR,Math.sqrt(c.r*c.r-d*d)))-c.r)<=0.16&&
    Math.abs(dist(point(other.cx,other.cy),move(Q,toR,Math.sqrt(c.r*c.r-d*d)))-other.r)<=0.16));
 });
};
const expectedSchema=(part,target)=>{
 const s=part?.responseSchema,r=s?.criteria;
 return part?.marks===4&&s?.type==="construction_triangle"&&
 s.toolPolicy==="ruler_compasses_only"&&
 JSON.stringify(s.allowedTools)==='["segment","circle"]'&&
 s.target?.pq===target.pq&&s.target?.qr===target.qr&&
 s.target?.anglePqr===target.angle&&
 s.tolerance?.length===0.25&&s.tolerance?.angle===2.5&&
 Array.isArray(r)&&r.length===4&&
 ["construction_base","construction_angle","construction_side","construction_complete"]
 .every((kind,i)=>r[i]?.kind===kind&&r[i]?.marks===1)&&
 r[1].requireCompassEvidence===true&&r[3].requireCompassEvidence===true;
};
const expectedRubric=(source,part)=>{
 const rows=source?.criteria;
 return source?.answer===part?.answer&&source?.solution===part?.solution&&
 Array.isArray(rows)&&rows.length===4&&
 ["M1","M2","M3","A1"].every((code,i)=>rows[i]?.code===code&&
 rows[i]?.kind===(i===3?"A":"M")&&rows[i]?.marks===1&&
 rows[i]?.check?.type==="manual-verification"&&
 typeof rows[i].check.evidence==="string"&&rows[i].check.evidence.length>20);
};
const validObjects=objects=>Array.isArray(objects)&&objects.length<=48&&
 objects.every(o=>isObject(o)&&(
 (o.kind==="segment"&&[o.x1,o.y1,o.x2,o.y2].every(v=>Number.isFinite(v)&&v>=0&&v<=16)&&
 Math.hypot(o.x2-o.x1,o.y2-o.y1)>0.04)||
 (o.kind==="circle"&&[o.cx,o.cy,o.r].every(Number.isFinite)&&
 o.cx>=0&&o.cx<=16&&o.cy>=0&&o.cy<=16&&o.r>0.04&&o.r<=16)
 ));
export function gradeOriginalMathConstruction({criterionId,source,part,response}){
 const target=TARGETS[criterionId];
 if(!target)return null;
 if(!expectedSchema(part,target)||!expectedRubric(source,part)||
  !isObject(response)||!validObjects(response.objects))return null;
 const lines=response.objects.filter(o=>o.kind==="segment");
 const circles=response.objects.filter(o=>o.kind==="circle");
 // The pad records an unordered set of geometric objects, not trusted
 // student-entered angles or labels. Check both orientations of every base.
 const scores=[];
 for(const base of lines)for(const [P,Q] of [
  [point(base.x1,base.y1),point(base.x2,base.y2)],
  [point(base.x2,base.y2),point(base.x1,base.y1)]])
 {
  if(Math.abs(dist(P,Q)-target.pq)>0.25)continue;
  const u=unit(Q,P);
  let best=1; // PQ ruler line.
  for(const side of lines)for(const [anchor,R] of [
   [point(side.x1,side.y1),point(side.x2,side.y2)],
   [point(side.x2,side.y2),point(side.x1,side.y1)]])
  {
   if(!within(anchor,Q,0.16)||Math.abs(dist(Q,R)-target.qr)>0.25||
      within(R,P,0.25))continue;
   const v=unit(Q,R),correctAngle=Math.abs(ang(u,v)-target.angle)<=2.5;
   const angleArcs=correctAngle&&(target.angle===60
     ?circles60(circles,P,Q,R):circles90(circles,P,Q,R));
   const finished=hasLine(lines,P,R)&&circleAt(circles,Q,target.qr,0.25);
   const marks=1+1+Number(angleArcs)+Number(angleArcs&&finished);
   best=Math.max(best,marks);
  }
  scores.push(best);
 }
 const best=scores.length?Math.max(...scores):0;
 return {marks:best,resolved:true,method:"source-ruler-compass-construction-v1"};
}
