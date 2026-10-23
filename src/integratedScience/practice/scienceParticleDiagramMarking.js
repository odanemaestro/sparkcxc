/**
 * Source-bound particle diagram geometry. Credit is based on independently
 * entered particle positions, never a "solid" or "liquid" selection.
 * Unclassifiable diagrams abstain and remain available for visual review.
 */
const ID="IS-M3-P2-25";
const SOURCE_POINTS=[
 "Solid: particles closely packed in a regular arrangement (1)",
 "Liquid: particles close together but irregularly arranged (1)"
];
const within=(n,a,b)=>n>=a&&n<=b;
const gap=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const uniqueGroups=(values,tol=.025)=>{
 const sorted=[...values].sort((a,b)=>a-b),groups=[];
 for(const v of sorted){
  if(!groups.length||Math.abs(v-groups.at(-1).mean)>tol)groups.push({mean:v,n:1});
  else {const g=groups.at(-1);g.mean=(g.mean*g.n+v)/(g.n+1);g.n++;}
 }
 return groups.map(g=>g.mean);
};
function parse(value){
 let layout=value;
 if(typeof value==="string"){try{layout=JSON.parse(value);}catch{return null;}}
 if(!layout||typeof layout!=="object"||Array.isArray(layout))return null;
 const validate=p=>Array.isArray(p)&&p.length===2&&p.every(n=>typeof n==="number"&&Number.isFinite(n)&&within(n,0,1));
 for(const k of ["solid","liquid"]){
  if(!Array.isArray(layout[k])||layout[k].length>36||!layout[k].every(validate))return null;
 }
 return layout;
}
function characterize(pts){
 if(pts.length<9)return {type:pts.length?"insufficient":"blank"};
 const distances=pts.map((p,i)=>Math.min(...pts.filter((_,j)=>i!==j).map(q=>gap(p,q))));
 if(distances.some(d=>d<.04))return {type:"ambiguous"}; // repeated or overlapping particles
 const average=distances.reduce((n,d)=>n+d,0)/distances.length;
 if(!within(average,.105,.33))return {type:average>.4?"sparse":"ambiguous"};
 const xs=uniqueGroups(pts.map(p=>p[0])),ys=uniqueGroups(pts.map(p=>p[1]));
 const lattice=xs.length>=3&&ys.length>=3&&xs.length*ys.length<=pts.length+2&&
  pts.every(p=>xs.some(x=>Math.abs(x-p[0])<.025)&&ys.some(y=>Math.abs(y-p[1])<.025));
 if(lattice){
  const spacing=v=>v.slice(1).map((x,i)=>x-v[i]);
  const dx=spacing(xs),dy=spacing(ys),all=[...dx,...dy];
  const regular=all.every(d=>within(d,.13,.34))&&
    Math.max(...dx)/Math.min(...dx)<1.35&&Math.max(...dy)/Math.min(...dy)<1.35&&
    xs.length>=3&&ys.length>=3;
  if(regular)return {type:"regular"};
 }
 // Liquid points must be close to neighbours, yet not form a lattice.
 const close=distances.filter(d=>d<=.285).length/pts.length;
 const xspan=Math.max(...pts.map(p=>p[0]))-Math.min(...pts.map(p=>p[0]));
 const yspan=Math.max(...pts.map(p=>p[1]))-Math.min(...pts.map(p=>p[1]));
 if(close>=.8&&xspan>=.33&&yspan>=.33&&xspan<=.85&&yspan<=.85)
  return {type:"irregular"};
 return {type:"ambiguous"};
}
export function isSourceParticleDiagram(qid,pi,ii,item){
 return qid===ID&&pi===1&&ii===0&&item?.response?.type==="drawing"&&Number(item?.marks)===2&&
  JSON.stringify(item?.markScheme?.points||[])===JSON.stringify(SOURCE_POINTS);
}
export function markSourceParticleDiagram(qid,pi,ii,item,input,hasFreehand=false){
 if(!isSourceParticleDiagram(qid,pi,ii,item))return null;
 if(input==null){
  return hasFreehand?null:{score:0,maxMarks:2,sourceGeometry:true,sourceResolved:true,
   provisional:false,confidence:"high",unassessedMarks:0,criteria:[]};
 }
 const layout=parse(input);
 if(!layout)return {score:0,maxMarks:2,sourceGeometry:true,sourceResolved:false,
  provisional:true,confidence:"low",unassessedMarks:2,criteria:[]};
 const solid=characterize(layout.solid),liquid=characterize(layout.liquid);
 const first=solid.type==="regular",second=liquid.type==="irregular";
 const resolved=[solid,liquid].every(x=>["regular","irregular","blank","insufficient","sparse"].includes(x.type));
 const score=Number(first)+Number(second);
 return {score,maxMarks:2,sourceGeometry:true,sourceResolved:resolved,provisional:!resolved,
  confidence:resolved?"high":"low",unassessedMarks:resolved?0:2-score,
  criteria:[
   {id:"solid-particles",label:SOURCE_POINTS[0],marks:Number(first),maxMarks:1,earned:first},
   {id:"liquid-particles",label:SOURCE_POINTS[1],marks:Number(second),maxMarks:1,earned:second}
  ],visualEvidence:{solidType:solid.type,liquidType:liquid.type,
   solidParticles:layout.solid.length,liquidParticles:layout.liquid.length}};
}
