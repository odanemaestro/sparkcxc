/**
 * Source-bound symbolic geometry for the CSEC fuse, voltmeter and switch.
 * Mark the student's primitives, never a selected symbol name. Extra or
 * unrecognisable work abstains so ambiguous hand drawings remain reviewable.
 */
const SOURCE_ID="IS-M2-P2-25";
const MARKING=[
 "Fuse: rectangle with a line through it (1)",
 "Voltmeter: circle containing V (1)",
 "Switch: break with a hinged line (1)"
];
const names=["fuse","voltmeter","switch"];
const inRange=(n,min,max)=>Number.isFinite(n)&&n>=min&&n<=max;
const point=(x,y)=>inRange(x,0,1)&&inRange(y,0,1);
const nearby=(a,b,eps=.07)=>Math.hypot(a[0]-b[0],a[1]-b[1])<=eps;
const isLine=s=>s.kind==="line"&&[s.x1,s.y1,s.x2,s.y2].every(n=>inRange(n,0,1));
const horizontal=l=>Math.abs(l.y1-l.y2)<=.065&&Math.abs(l.x1-l.x2)>=.14;
const endpoint=(line,left)=>line.x1<=line.x2?
 [left?[line.x1,line.y1]:[line.x2,line.y2]]:[left?[line.x2,line.y2]:[line.x1,line.y1]];
const left=l=>l.x1<=l.x2?[l.x1,l.y1]:[l.x2,l.y2];
const right=l=>l.x1<=l.x2?[l.x2,l.y2]:[l.x1,l.y1];
function fuse(shapes){
 const rectangles=shapes.filter(s=>s.kind==="rect"&&
  [s.x,s.y,s.w,s.h].every(Number.isFinite)&&point(s.x,s.y)&&
  inRange(s.w,.18,.65)&&inRange(s.h,.09,.43)&&s.x+s.w<=1&&s.y+s.h<=1);
 const wires=shapes.filter(s=>isLine(s)&&horizontal(s));
 return rectangles.some(r=>wires.some(l=>{
  const lo=left(l),hi=right(l),middle=r.y+r.h/2;
  return lo[0]<r.x-.02&&hi[0]>r.x+r.w+.02&&
   Math.abs(lo[1]-middle)<r.h*.2&&Math.abs(hi[1]-middle)<r.h*.2;
 }));
}
function voltmeter(shapes){
 const circles=shapes.filter(s=>s.kind==="circle"&&
  point(s.cx,s.cy)&&inRange(s.r,.12,.40)&&
  s.cx-s.r>=0&&s.cy-s.r>=0&&s.cx+s.r<=1&&s.cy+s.r<=1);
 const letters=shapes.filter(s=>s.kind==="letter"&&s.text==="V"&&point(s.x,s.y));
 return circles.some(c=>letters.some(v=>nearby([c.cx,c.cy],[v.x,v.y],Math.min(.11,c.r*.55))));
}
function openSwitch(shapes){
 const h=shapes.filter(s=>isLine(s)&&horizontal(s));
 const angled=shapes.filter(s=>isLine(s)&&
  Math.abs(s.y1-s.y2)>=.11&&Math.abs(s.x1-s.x2)>=.12);
 return h.some(a=>h.some(b=>{
  if(a===b)return false;
  const la=left(a),ra=right(a),lb=left(b),rb=right(b);
  const gap=lb[0]-ra[0];
  if(!inRange(gap,.13,.55)||Math.abs(ra[1]-lb[1])>.075||
     ra[0]-la[0]<.13||rb[0]-lb[0]<.13)return false;
  return angled.some(s=>{
   const p=[s.x1,s.y1],q=[s.x2,s.y2];
   const hinge=nearby(p,ra)||nearby(q,ra);
   const tip=nearby(p,ra)?q:p;
   // Blade approaches, but must not touch, the other open contact.
   return hinge&&tip[0]>ra[0]+.07&&tip[0]<lb[0]+.035&&
    Math.hypot(tip[0]-lb[0],tip[1]-lb[1])>.09;
  });
 }));
}
const checker={fuse,voltmeter,switch:openSwitch};
function read(input){
 let source=input;try{if(typeof source==="string")source=JSON.parse(source);}catch{return null;}
 if(!source||typeof source!=="object"||Array.isArray(source))return null;
 const out={};
 for(const n of names){
  if(!Array.isArray(source[n])||source[n].length>20)return null;
  for(const s of source[n]){
   if(!s||typeof s!=="object"||!["line","rect","circle","letter"].includes(s.kind))return null;
   if(s.kind==="line"&&!isLine(s))return null;
   if(s.kind==="rect"&&![s.x,s.y,s.w,s.h].every(Number.isFinite))return null;
   if(s.kind==="circle"&&![s.cx,s.cy,s.r].every(Number.isFinite))return null;
   if(s.kind==="letter"&&(!point(s.x,s.y)||s.text!=="V"))return null;
  }
  out[n]=source[n];
 }
 return out;
}
export function isSourceCircuitSymbols(qid,pi,ii,item){
 return qid===SOURCE_ID&&pi===1&&ii===0&&item?.response?.type==="drawing"&&
  Number(item?.marks)===3&&JSON.stringify(item?.markScheme?.points||[])===JSON.stringify(MARKING);
}
export function markSourceCircuitSymbols(qid,pi,ii,item,value,freehand=false){
 if(!isSourceCircuitSymbols(qid,pi,ii,item))return null;
 if(value==null)return freehand?null:{score:0,maxMarks:3,sourceGeometry:true,sourceResolved:true,provisional:false,unassessedMarks:0,criteria:[]};
 const drawing=read(value);
 if(!drawing)return {score:0,maxMarks:3,sourceGeometry:true,sourceResolved:false,provisional:true,unassessedMarks:3,criteria:[]};
 const earned=names.map(n=>checker[n](drawing[n]));
 const score=earned.filter(Boolean).length;
 // Multiple redundant drawings or mixed freehand geometry are uncertain.
 const overdrawn=names.some(n=>drawing[n].length>4);
 const resolved=!freehand&&!overdrawn;
 return {score,maxMarks:3,sourceGeometry:true,sourceResolved:resolved,
  provisional:!resolved,unassessedMarks:resolved?0:3-score,confidence:resolved?"high":"low",
  criteria:names.map((name,i)=>({id:"circuit-symbol-"+name,label:MARKING[i],
   marks:Number(earned[i]),maxMarks:1,earned:earned[i]}))};
}
