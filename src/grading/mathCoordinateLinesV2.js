/**
 * Advisory source-calibrated Mathematics Paper 2 Q4 coordinate-line verifier.
 * Three SPARK-authored variants; the individual M/A breakdown is proposed,
 * not source-authorised. Never publishes grades or denies alternative marks.
 */
const SOURCES=Object.freeze({
 "p2-q4-v4":Object.freeze({p:[-2,7],q:[4,-5],gradient:-2,mid:[1,1],length:13.42,intercept:3}),
 "p2-q4-v5":Object.freeze({p:[-3,1],q:[5,7],gradient:0.75,mid:[1,4],length:10,intercept:3.25}),
 "p2-q4-v6":Object.freeze({p:[1,-4],q:[7,8],gradient:2,mid:[4,2],length:13.42,intercept:-6})
});
const input=v=>typeof v==="string"?v:typeof v==="number"&&Number.isFinite(v)?String(v):"";
const clean=v=>input(v).replace(/[−–—]/g,"-").replace(/×/g,"*").replace(/\s+/g,"").toLowerCase();
const val=String.raw`[+-]?(?:\d+(?:\.\d*)?|\.\d+)`;
function rational(s){
 const x=clean(s);
 if(!new RegExp("^"+val+"(?:/"+val+")?$").test(x))return null;
 const parts=x.split("/");
 const a=Number(parts[0]),b=parts.length===2?Number(parts[1]):1;
 return Number.isFinite(a)&&Number.isFinite(b)&&b!==0?a/b:null;
}
const close=(a,b,t=0.000001)=>a!==null&&Number.isFinite(a)&&Math.abs(a-b)<=t;
const responseAnswer=r=>r&&typeof r==="object"&&!Array.isArray(r)?input(r.answer):input(r);
const responseWorking=r=>r&&typeof r==="object"&&!Array.isArray(r)?input(r.working):"";
const mark=(id,ok,reason)=>({id,maxMarks:1,candidateMarks:ok?1:null,
 status:ok?"candidate-correct":"unresolved",
 reason:ok?reason:"insufficient-source-evidence"});
const envelope=(questionId,partId,criteria)=>({
 sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
 rubricAllocation:"proposed-from-worked-solution",criteria,
 suggestedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks??0),0),
 unresolvedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks===null?c.maxMarks:0),0)
});
function pair(s){
 const m=new RegExp("^\\(\\s*("+val+")\\s*,\\s*("+val+")\\s*\\)$").exec(input(s).trim());
 return m?{x:Number(m[1]),y:Number(m[2])}:null;
}
function atomicEvidence(s,term){
 const escaped=term.replace(/[-/\\^$*+?.()|[\]{}]/g,ch=>"\\"+ch);
 return new RegExp("(?:^|[^0-9.])"+escaped+"(?=$|[^0-9.])").test(s);
}
function gradientWorking(w,source){
 const s=clean(w);
 const [px,py]=source.p,[qx,qy]=source.q;
 const dy=qy-py,dx=qx-px;
 const signed=n=>n<0?"("+n+")":String(n);
 const first="("+signed(qy)+"-"+signed(py)+")/("+signed(qx)+"-"+signed(px)+")";
 const second="("+signed(py)+"-"+signed(qy)+")/("+signed(px)+"-"+signed(qx)+")";
 const simple=String(dy)+"/"+String(dx),reverse=String(-dy)+"/"+String(-dx);
 return [first,second,simple,reverse].some(term=>atomicEvidence(s,term));
}
function distanceWorking(w,source){
 const s=clean(w).replace(/√/g,"sqrt").replace(/²/g,"^2");
 const dx=Math.abs(source.q[0]-source.p[0]),dy=Math.abs(source.q[1]-source.p[1]);
 const sum=dx*dx+dy*dy;
 const root=s.includes("sqrt")||s.includes("^0.5");
 const squared=[dx+"^2+"+dy+"^2",dy+"^2+"+dx+"^2",
  "("+dx+"^2+"+dy+"^2)","("+dy+"^2+"+dx+"^2)"];
 return root&&(squared.some(term=>atomicEvidence(s,term))||
  atomicEvidence(s,"sqrt("+sum+")")||atomicEvidence(s,"sqrt"+sum));
}
function twoDecimals(s,expected){
 const text=clean(s).replace(/units?$/,"");
 if(!/^[+]?\d+\.\d{2}$/.test(text))return false;
 return close(Number(text),expected,0.005);
}
function slopeIntercept(raw){
 const s=clean(raw);
 if(!s.startsWith("y="))return null;
 let right=s.slice(2);
 if(right.length>90||!right||right.includes("="))return null;
 // Only canonical slope-intercept syntax, not a general-equation rearrangement.
 // Support 3x/4, (3/4)x, x/2, -x and signed decimal gradients.
 let m=/^(\([+-]?(?:\d+(?:\.\d+)?|\.\d+)\/(?:\d+(?:\.\d+)?|\.\d+)\)|[+-]?(?:(?:\d+(?:\.\d+)?|\.\d+))?)\*?x(\/(?:\d+(?:\.\d+)?|\.\d+))?([+-].+)?$/.exec(right);
 if(!m)return null;
 let slopeToken=m[1];
 if(slopeToken.startsWith("("))slopeToken=slopeToken.slice(1,-1);
 else slopeToken=slopeToken.replace(/x$/,"");
 if(slopeToken===""||slopeToken==="+")slopeToken="1";
 else if(slopeToken==="-")slopeToken="-1";
 if(m[2])slopeToken+=m[2];
 const slope=rational(slopeToken);
 let intercept=0;
 if(m[3]){
  let part=m[3];
  if(/^[+-]\(.+\)$/.test(part))part=part[0]+part.slice(2,-1);
  intercept=rational(part);
 }
 return slope===null||intercept===null?null:{slope,intercept};
}
function lineMethod(w,source,previous){
 const s=clean(w);
 const previousGradient=rational(responseAnswer(previous));
 const used=[source.gradient,...(previousGradient===null?[]:[previousGradient])];
 const pointSlope=used.some(m=>{
  if(!Number.isFinite(m))return false;
  // The student must have a genuine point-slope substitution using P or Q.
  // Source gradients are exact -2, 3/4 or 2; typed decimals are supported.
  const variants=m===0.75?["3/4","0.75"]:m===-2?["-2"]:m===2?["2"]:[String(m)];
  return variants.some(a=>[source.p,source.q].some(([x,y])=>{
   const minus=n=>n<0?"+"+(-n):"-"+n;
   const signedX=x<0?"(x+"+(-x)+")":"(x-"+x+")";
   return s.includes("y"+minus(y)+"="+a+signedX)
    ||s.includes("y"+minus(y)+"="+a+"*"+signedX);
  }));
 });
 const declarations=[...s.matchAll(/(?:^|[;\n])m=([+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:\/[+-]?(?:\d+(?:\.\d+)?|\.\d+))?)(?=$|[;\n])/g)];
 const declared=declarations.some(match=>close(rational(match[1]),source.gradient));
 const gradient=used.some(m=>close(m,source.gradient))&&
  (declared||gradientWorking(w,source));
 return {gradient,pointSlope};
}
export function evaluateMathCoordinateLinesV2({
 questionId,partId,response={},previousResponses={}
}={}){
 const source=SOURCES[questionId];
 if(!source||!["a","b","c","d"].includes(partId))
  throw new TypeError("Unsupported Mathematics coordinate-line source");
 const answer=responseAnswer(response),working=responseWorking(response);
 if(partId==="a")return envelope(questionId,partId,[
  mark("M1",gradientWorking(working,source),"gradient-from-coordinate-differences"),
  mark("A1",close(rational(answer),source.gradient),"correct-gradient")
 ]);
 if(partId==="b"){
  const middle=pair(answer);
  return envelope(questionId,partId,[
   mark("B1",middle!==null&&close(middle.x,source.mid[0]),"correct-midpoint-x"),
   mark("B2",middle!==null&&close(middle.y,source.mid[1]),"correct-midpoint-y")
  ]);
 }
 if(partId==="c")return envelope(questionId,partId,[
  mark("M1",distanceWorking(working,source),"source-coordinate-distance-method"),
  mark("A1",twoDecimals(answer,source.length),"distance-to-two-decimal-places")
 ]);
 const line=slopeIntercept(answer),method=lineMethod(working,source,previousResponses?.a);
 const accurate=line!==null&&close(line.slope,source.gradient)&&
  close(line.intercept,source.intercept);
 return envelope(questionId,partId,[
  mark("M1",method.gradient,"correct-source-gradient-evidence"),
  mark("M2",method.pointSlope,"point-slope-substitution"),
  mark("A1",accurate,"correct-slope-intercept-form")
 ]);
}
