/**
 * Source-specific geometry examiner for IS-M3-P2-11(a)(ii). Students draw
 * segments and leader lines; selecting a label alone never earns marks.
 * The four source points are not interchangeable with textual recognition.
 */
const QID="IS-M3-P2-11";
const POINTS=[
 "Funnel with filter paper drawn correctly (1)",
 "Beaker/flask to collect the filtrate (1)",
 "Labels: filter paper, residue, filtrate, funnel (any three) (1)",
 "Clean lines, drawn with a ruler, appropriate title (1)"
];
const finite=x=>typeof x==="number"&&Number.isFinite(x);
const validPoint=p=>Array.isArray(p)&&p.length===2&&p.every(x=>finite(x)&&x>=0&&x<=1);
const near=(a,b,t=.06)=>Math.hypot(a[0]-b[0],a[1]-b[1])<=t;
const box=(s)=>({x1:Math.min(s[0][0],s[1][0]),x2:Math.max(s[0][0],s[1][0]),
 y1:Math.min(s[0][1],s[1][1]),y2:Math.max(s[0][1],s[1][1])});
const validLine=s=>Array.isArray(s)&&s.length===2&&s.every(validPoint)&&!near(s[0],s[1],.012);
const topBottom=s=>s[0][1]<=s[1][1]?[s[0],s[1]]:[s[1],s[0]];
const mid=s=>[(s[0][0]+s[1][0])/2,(s[0][1]+s[1][1])/2];
const slope=s=>{const [a,b]=topBottom(s);return (b[0]-a[0])/(Math.abs(b[1]-a[1])+.00001);};
function read(value){
 let data=value;
 if(typeof value==="string"){try{data=JSON.parse(value);}catch{return null;}}
 if(!data||typeof data!=="object"||Array.isArray(data)||!Array.isArray(data.lines)||
    !Array.isArray(data.labels)||data.lines.length>80||data.labels.length>12||
    typeof data.title!=="string"||data.title.length>160)return null;
 if(!data.lines.every(validLine))return null;
 if(!data.labels.every(l=>l&&["funnel","filter paper","residue","filtrate"].includes(l.name)&&
    validPoint(l.from)&&validPoint(l.to)&&!near(l.from,l.to,.03)))return null;
 return data;
}
const slanted=(line,sign)=>{
 const [t,b]=topBottom(line),change=b[0]-t[0],dy=b[1]-t[1];
 return dy>=.11&&Math.abs(change)>=.075&&Math.abs(change)<=.37&&
  (sign<0?change>.075:change<-.075);
};
function findFunnel(lines){
 for(const l of lines.filter(s=>slanted(s,-1)))for(const r of lines.filter(s=>slanted(s,1))){
  const [lt,lb]=topBottom(l),[rt,rb]=topBottom(r);
  if(lt[0]>=rt[0]||rt[0]-lt[0]<.17||Math.abs(lt[1]-rt[1])>.10||
    Math.abs(lb[1]-rb[1])>.09||lb[0]>rb[0]+.055)continue;
  const neck=[(lb[0]+rb[0])/2,(lb[1]+rb[1])/2];
  const stem=lines.some(s=>{const [a,b]=topBottom(s);
   return Math.abs(a[0]-b[0])<.043&&b[1]-a[1]>.055&&near(a,neck,.085);
  });
  if(!stem)continue;
  return {left:l,right:r,neck,topY:(lt[1]+rt[1])/2,width:rt[0]-lt[0],
   leftX:lt[0],rightX:rt[0]};
 }
 return null;
}
function findFilter(lines,funnel){
 if(!funnel)return null;
 for(const l of lines.filter(s=>slanted(s,-1)))for(const r of lines.filter(s=>slanted(s,1))){
  if(l===funnel.left||r===funnel.right)continue;
  const [lt,lb]=topBottom(l),[rt,rb]=topBottom(r);
  if(lt[0]>=rt[0]||Math.abs(lb[1]-rb[1])>.085||
   Math.abs(lb[0]-rb[0])>.095)continue;
  const top=(lt[1]+rt[1])/2,tip=[(lb[0]+rb[0])/2,(lb[1]+rb[1])/2];
  if(top<=funnel.topY+.01||top>=funnel.neck[1]-.045||
   lt[0]<=funnel.leftX||rt[0]>=funnel.rightX||
   tip[1]>=funnel.neck[1]+.02||Math.abs(tip[0]-funnel.neck[0])>.085)continue;
  return {left:l,right:r,tip,topY:top};
 }
 return null;
}
function findBeaker(lines,funnel){
 if(!funnel)return null;
 const vertical=lines.filter(s=>{const [a,b]=topBottom(s);return b[1]-a[1]>=.16&&Math.abs(a[0]-b[0])<.045;});
 for(const l of vertical)for(const r of vertical){
  if(l===r)continue;
  const L=topBottom(l),R=topBottom(r);
  if(L[0][0]>=R[0][0]||R[0][0]-L[0][0]<.16||Math.abs(L[1][1]-R[1][1])>.06||
    L[0][1]<funnel.neck[1]-.065||L[0][1]>funnel.neck[1]+.16)continue;
  const bottom=lines.some(s=>{
   const a=s[0],b=s[1];
   return Math.abs(a[1]-b[1])<.04&&
    (near(a,L[1],.06)&&near(b,R[1],.06)||near(a,R[1],.06)&&near(b,L[1],.06));
  });
  if(bottom&&funnel.neck[0]>=L[0][0]-.055&&funnel.neck[0]<=R[0][0]+.055)
   return {left:l,right:r,topY:Math.min(L[0][1],R[0][1]),bottomY:(L[1][1]+R[1][1])/2,
    leftX:L[0][0],rightX:R[0][0]};
 }
 return null;
}
const nearLine=(p,line,tol=.1)=>{
 const [a,b]=line,v=[b[0]-a[0],b[1]-a[1]],w=[p[0]-a[0],p[1]-a[1]];
 const d=v[0]*v[0]+v[1]*v[1],u=Math.max(0,Math.min(1,(w[0]*v[0]+w[1]*v[1])/d));
 return Math.hypot(p[0]-a[0]-u*v[0],p[1]-a[1]-u*v[1])<=tol;
};
function goodLabels(labels,funnel,filter,beaker){
 const valid=new Set();
 for(const l of labels){
  const p=l.to;
  if(l.name==="funnel"&&funnel&&[funnel.left,funnel.right].some(s=>nearLine(p,s,.055)))valid.add(l.name);
  if(l.name==="filter paper"&&filter&&[filter.left,filter.right].some(s=>nearLine(p,s,.055)))valid.add(l.name);
  if(l.name==="residue"&&filter&&p[1]>=filter.topY-.045&&p[1]<=filter.tip[1]&&
    Math.abs(p[0]-filter.tip[0])<.075)valid.add(l.name);
  if(l.name==="filtrate"&&beaker&&p[1]>beaker.topY+.015&&p[1]<beaker.bottomY-.02&&
    p[0]>beaker.leftX+.015&&p[0]<beaker.rightX-.015)valid.add(l.name);
 }
 return valid.size;
}
export function isSourceFiltrationDrawing(qid,pi,ii,item){
 return qid===QID&&pi===0&&ii===1&&item?.response?.type==="drawing"&&
 Number(item?.marks)===4&&JSON.stringify(item?.markScheme?.points||[])===JSON.stringify(POINTS);
}
export function markSourceFiltrationDrawing(qid,pi,ii,item,input,freehand=false){
 if(!isSourceFiltrationDrawing(qid,pi,ii,item))return null;
 if(input==null)return freehand?null:{score:0,maxMarks:4,sourceGeometry:true,sourceResolved:true,
  unassessedMarks:0,provisional:false,criteria:[]};
 const d=read(input);
 if(!d)return {score:0,maxMarks:4,sourceGeometry:true,sourceResolved:false,
  provisional:true,unassessedMarks:4,criteria:[]};
 const funnel=findFunnel(d.lines),paper=findFilter(d.lines,funnel),beaker=findBeaker(d.lines,funnel);
 const labels=goodLabels(d.labels,funnel,paper,beaker);
 const title=/\b(?:filtration|filtering|separating)\b/i.test(d.title)&&
  /\b(?:mixture|sand|salt|apparatus|setup|set.up)\b/i.test(d.title);
 const neat=d.lines.length>=7&&d.lines.length<=25&&!freehand&&
  d.labels.every(l=>!d.lines.some(s=>near(l.from,mid(s),.02)))&&title;
 const hits=[Boolean(funnel&&paper),Boolean(beaker),labels>=3,Boolean(neat)];
 const score=hits.filter(Boolean).length;
 const blank=d.lines.length===0&&d.labels.length===0&&!d.title.trim();
 const uniqueLines=new Set(d.lines.map(s=>[s[0].join(","),s[1].join(",")].sort().join("|")));
 const duplicated=uniqueLines.size!==d.lines.length;
 const unknown=duplicated||d.lines.length>25||d.labels.length>5||Boolean(freehand)||
  // Valid partial credit must have recognizable geometry rather than labels alone.
  (!blank&&d.lines.length>0&&(!funnel||!paper||!beaker)&&score>0&&d.lines.length>6);
 const resolved=!unknown;
 return {score,maxMarks:4,sourceGeometry:true,sourceResolved:resolved,provisional:!resolved,
  unassessedMarks:resolved?0:4-score,confidence:resolved?"high":"low",
  criteria:hits.map((hit,i)=>({id:"filtration-"+i,label:POINTS[i],marks:Number(hit),
   maxMarks:1,earned:hit})),visualEvidence:{funnel:Boolean(funnel),filterPaper:Boolean(paper),
   beaker:Boolean(beaker),correctLabels:labels,appropriateTitle:title}};
}
