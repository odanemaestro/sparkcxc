/** Complete geometry fixtures for the nine source-pinned E-J constructions. */
const F=(cls,response,expect,note)=>({cls,response,expect,note});
const s=(a,b)=>({kind:"segment",x1:a.x,y1:a.y,x2:b.x,y2:b.y});
const c=(p,r)=>({kind:"circle",cx:p.x,cy:p.y,r});
const p=(a)=>({x:a.x,y:a.y});
const midpoint=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
function objectsFor(part){
 const schema=part.responseSchema,pad=schema.pad,def=schema.construction;
 const named=Object.fromEntries(pad.given.map(x=>[x.id,p(x)]));
 if(def.construction==="triangle"){
  const {A,B}=named,{AC,BC,AB}=def.args[0].sides;
  const projected=(AC*AC-BC*BC+AB*AB)/(2*AB);
  const C={x:A.x+projected,y:A.y+Math.sqrt(AC*AC-projected*projected)};
  return [c(A,AC),c(B,BC),s(A,C),s(B,C)];
 }
 if(def.construction==="perpendicularBisector"){
  const {A,B}=named,half=Math.hypot(B.x-A.x,B.y-A.y)/2,r=half+.25,
   center=midpoint(A,B),h=Math.sqrt(r*r-half*half);
  const high={x:center.x,y:center.y+h},low={x:center.x,y:center.y-h};
  return [c(A,r),c(B,r),s(low,high)];
 }
 if(def.construction==="angleBisector"){
  const {M}=named,r=2,U={x:M.x+r,y:M.y},V={x:M.x,y:M.y+r},
   cross={x:M.x+r,y:M.y+r};
  return [c(M,r),c(U,r),c(V,r),s(M,cross)];
 }
 throw Error("Unsupported original construction fixture");
}
export function mathematicsOriginalPadFixtures({criterion,part,maxMarks}){
 if(!/^(p2[e-j]-q4)::a[12]$/.test(criterion.id)||part?.responseSchema?.type!=="construction")return null;
 const id=criterion.id,eligible=new Set([
 "p2e-q4::a1","p2f-q4::a1","p2f-q4::a2","p2g-q4::a1",
 "p2h-q4::a1","p2h-q4::a2","p2i-q4::a1","p2j-q4::a1","p2j-q4::a2"]);
 if(!eligible.has(id))return null;
 const all=objectsFor(part),one=maxMarks===1,full={objects:all};
 const lines=all.filter(x=>x.kind==="segment"),arcs=all.filter(x=>x.kind==="circle");
 const partial=one?{objects:lines}:{objects:lines};
 const confusing={objects:[...lines,c({x:3,y:4},1.25)]};
 return {kind:"structured",ruleId:"math:source-original-pad",
  sourceAnswer:full,alternatives:[{objects:[...all].reverse()}],
  allOrNothing:one,fixtures:[
   F("full",full,maxMarks,"fully source-evidenced ruler and compass geometry"),
   F("equivalent",{objects:[...all].reverse()},maxMarks,"draw order does not change geometry"),
   ...(!one?[F("partial",partial,1,"line geometry alone cannot claim compass-arc marks")]:[]),
   F("incorrect",{objects:[s({x:1,y:1},{x:2,y:1})]},0,"off-target straight line"),
   F("blank",{objects:[]},0),
   F("irrelevant",{objects:[],answer:"I completed the construction"},0),
   F("competing",confusing,one?0:1,"unrelated circle cannot prove requested arcs"),
   F("ceiling",{objects:[...all,s({x:1,y:1},{x:2,y:1})]},maxMarks,
     "extra unrelated geometry never inflates marks")
  ]};
}
