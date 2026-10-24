/**
 * Source-bound Mathematics E-J ruler-and-compasses grading for the existing
 * construction pad. Only finite saved geometry is admissible evidence.
 * Unknown layouts and rubric changes abstain instead of guessing.
 */
const SOURCES=Object.freeze({
 "p2e-q4::a1":{kind:"triangle",A:[2,2],B:[11,2],AC:7,BC:6},
 "p2f-q4::a1":{kind:"perpendicularBisector",A:[2,2],B:[10,2]},
 "p2f-q4::a2":{kind:"angleBisector",M:[6,2],B:[10,2],T:[6,6]},
 "p2g-q4::a1":{kind:"perpendicularBisector",A:[2,2.5],B:[10,2.5]},
 "p2h-q4::a1":{kind:"perpendicularBisector",A:[2.5,2.5],B:[9.5,2.5]},
 "p2h-q4::a2":{kind:"angleBisector",M:[6,2.5],B:[9.5,2.5],T:[6,6.5]},
 "p2i-q4::a1":{kind:"triangle",A:[3.5,2],B:[9.5,2],AC:6,BC:6},
 "p2j-q4::a1":{kind:"perpendicularBisector",A:[1.5,2],B:[11.5,2]},
 "p2j-q4::a2":{kind:"angleBisector",M:[6.5,2],B:[11.5,2],T:[6.5,6]}
});
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const obj=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const pt=(x,y)=>({x,y});
const point=a=>pt(a[0],a[1]);
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const near=(a,b,t=.18)=>dist(a,b)<=t;
const segment=(o,a,b,t=.18)=>o.kind==="segment"&&(
 (near(pt(o.x1,o.y1),a,t)&&near(pt(o.x2,o.y2),b,t))||
 (near(pt(o.x2,o.y2),a,t)&&near(pt(o.x1,o.y1),b,t)));
const lineExists=(lines,a,b)=>lines.some(o=>segment(o,a,b));
const circleExists=(circles,p,r,t=.20)=>circles.some(o=>
 near(pt(o.cx,o.cy),p,.16)&&Math.abs(o.r-r)<=t);
const validObjects=items=>Array.isArray(items)&&items.length<=50&&items.every(o=>
 obj(o)&&(
 (o.kind==="segment"&&[o.x1,o.y1,o.x2,o.y2].every(v=>Number.isFinite(v)&&v>=0&&v<=16)&&
 dist(pt(o.x1,o.y1),pt(o.x2,o.y2))>.03)||
 (o.kind==="circle"&&[o.cx,o.cy,o.r].every(Number.isFinite)&&
 o.cx>=0&&o.cy>=0&&o.cx<=16&&o.cy<=16&&o.r>.04&&o.r<=16)));
const sameCoord=(a,b)=>obj(a)&&a.x===b[0]&&a.y===b[1];
function matchingSource(id,source,part,config){
 const schema=part?.responseSchema,pad=schema?.pad,model=schema?.construction;
 const expected=config.kind==="angleBisector"?1:3;
 if(!schema||schema.type!=="construction"||part?.marks!==expected||
   !model||model.construction!==config.kind||model.marks!==expected||
   schema.toolPolicy!=="ruler_compasses_only"||schema.allowProtractor!==false||
   JSON.stringify(schema.allowedTools)!=='["segment","circle"]'||
   !Array.isArray(pad?.given)||!Array.isArray(pad?.givenSegments))return false;
 const ids=config.kind==="angleBisector"?["M","B","T"]:["A","B"];
 if(!ids.every(key=>pad.given.some(x=>x.id===key&&sameCoord(x,config[key]))))return false;
 if(config.kind==="triangle"){
  const sides=model.args?.[0]?.sides;
  if(!sameCoord(model.args?.[0]?.A,config.A)||
     !sameCoord(model.args?.[0]?.B,config.B)||
     sides?.AC!==config.AC||sides?.BC!==config.BC||
     sides?.AB!==dist(point(config.A),point(config.B)))return false;
 }else if(config.kind==="perpendicularBisector"){
  if(!sameCoord(model.args?.[0],config.A)||!sameCoord(model.args?.[1],config.B))
   return false;
 }else{
  const args=model.args;
  if(!sameCoord(args?.[0],config.M)||!sameCoord(args?.[1],config.T)||
     !sameCoord(args?.[2],config.B))return false;
 }
 const rules=source?.criteria;
 if(!Array.isArray(rules)||rules.length!==expected||
    source.answer!==part.answer)return false;
 return rules.every((r,i)=>r?.kind==="B"&&r.code==="B"+(i+1)&&r.marks===1&&
  r.check?.type==="manual-verification"&&
  typeof r.check.evidence==="string"&&r.check.evidence.trim().length>0);
}
function triangle(items,cfg){
 const A=point(cfg.A),B=point(cfg.B),D=dist(A,B);
 const s=(cfg.AC*cfg.AC-cfg.BC*cfg.BC+D*D)/(2*D);
 const h2=cfg.AC*cfg.AC-s*s;
 if(h2<=0)return 0;
 const C=pt(A.x+s,Math.max(A.y,B.y)+Math.sqrt(h2));
 const lines=items.filter(o=>o.kind==="segment"),circles=items.filter(o=>o.kind==="circle");
 const correctLines=lineExists(lines,A,C)&&lineExists(lines,B,C);
 const correctArcs=circleExists(circles,A,cfg.AC)&&circleExists(circles,B,cfg.BC);
 return Number(correctLines)+Number(correctArcs)+Number(correctLines&&correctArcs);
}
const distancePointToSegment=(p,s)=>{
 const a=pt(s.x1,s.y1),b=pt(s.x2,s.y2);
 const length2=(b.x-a.x)**2+(b.y-a.y)**2;
 if(length2<1e-8)return Infinity;
 const t=Math.max(0,Math.min(1,((p.x-a.x)*(b.x-a.x)+(p.y-a.y)*(b.y-a.y))/length2));
 return dist(p,pt(a.x+t*(b.x-a.x),a.y+t*(b.y-a.y)));
};
function perpendicularBisector(items,cfg){
 const A=point(cfg.A),B=point(cfg.B),half=dist(A,B)/2;
 const M=pt((A.x+B.x)/2,(A.y+B.y)/2);
 const circles=items.filter(o=>o.kind==="circle"),lines=items.filter(o=>o.kind==="segment");
 const normal=pt(-(B.y-A.y)/(2*half),(B.x-A.x)/(2*half));
 let arcs=false;
 for(const a of circles)for(const b of circles){
  if(a===b||!near(pt(a.cx,a.cy),A,.16)||!near(pt(b.cx,b.cy),B,.16)||
     Math.abs(a.r-b.r)>.15||a.r<half+.15||a.r>half+2)continue;
  const altitude=Math.sqrt(Math.max(0,a.r*a.r-half*half));
  const upper=pt(M.x+normal.x*altitude,M.y+normal.y*altitude);
  const lower=pt(M.x-normal.x*altitude,M.y-normal.y*altitude);
  if(lines.some(s=>distancePointToSegment(upper,s)<=.23&&
          distancePointToSegment(lower,s)<=.23)){arcs=true;break;}
 }
 const correctLine=lines.some(s=>{
  const a=pt(s.x1,s.y1),b=pt(s.x2,s.y2);
  const vector=pt(b.x-a.x,b.y-a.y);
  const len=dist(a,b);
  if(len<2.0)return false;
  const unit=pt(vector.x/len,vector.y/len);
  if(Math.abs(unit.x*normal.x+unit.y*normal.y)<.985)return false;
  const proj1=(a.x-M.x)*normal.x+(a.y-M.y)*normal.y;
  const proj2=(b.x-M.x)*normal.x+(b.y-M.y)*normal.y;
  return proj1*proj2<0&&Math.min(Math.abs(proj1),Math.abs(proj2))>=.8&&
   distancePointToSegment(M,s)<=.20;
 });
 return Number(correctLine)+Number(arcs)+Number(correctLine&&arcs);
}
function angleBisector(items,cfg){
 const M=point(cfg.M),B=point(cfg.B),T=point(cfg.T);
 const unitB=pt((B.x-M.x)/dist(B,M),(B.y-M.y)/dist(B,M));
 const unitT=pt((T.x-M.x)/dist(T,M),(T.y-M.y)/dist(T,M));
 const circles=items.filter(o=>o.kind==="circle"),lines=items.filter(o=>o.kind==="segment");
 for(const mid of circles){
  if(!near(pt(mid.cx,mid.cy),M,.16)||mid.r<.5||
    mid.r>Math.min(dist(M,T),dist(M,B))-.15)continue;
  const s=mid.r;
  const U=pt(M.x+unitB.x*s,M.y+unitB.y*s);
  const V=pt(M.x+unitT.x*s,M.y+unitT.y*s);
  for(const a of circles)for(const b of circles){
   if(a===b||!near(pt(a.cx,a.cy),U,.16)||!near(pt(b.cx,b.cy),V,.16)||
    Math.abs(a.r-b.r)>.15||a.r<=s/Math.sqrt(2)+.1)continue;
   const reach=(s+Math.sqrt(2*a.r*a.r-s*s))/2;
   const P=pt(M.x+(unitB.x+unitT.x)*reach,M.y+(unitB.y+unitT.y)*reach);
   if(lineExists(lines,M,P,.22))return 1;
  }
 }
 return 0;
}
export function gradeOriginalMathPad({criterionId,source,part,response}){
 if(!own(SOURCES,criterionId))return null;
 const cfg=SOURCES[criterionId];
 if(!matchingSource(criterionId,source,part,cfg)||
    !obj(response)||!validObjects(response.objects))return null;
 const marks=cfg.kind==="triangle"?triangle(response.objects,cfg):
  cfg.kind==="perpendicularBisector"?perpendicularBisector(response.objects,cfg):
  angleBisector(response.objects,cfg);
 return {marks,resolved:true,method:"source-original-pad-construction-v1"};
}
