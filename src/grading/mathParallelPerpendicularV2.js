/**
 * Source-gated, advisory calibration of SPARK Mathematics Paper 2 Q4
 * parallel/perpendicular line variants v7 and v8.
 *
 * The source has part totals of 1/2/3/3, but no authored atomic M/A split.
 * All proposed allocations remain advisory and never publish or deny marks.
 */
const SOURCES=Object.freeze({
 "p2-q4-v7":Object.freeze({original:3,point:[6,1],parallel:3,perpendicular:-1/3,
  parallelIntercept:-17,perpendicularIntercept:3}),
 "p2-q4-v8":Object.freeze({original:-2,point:[4,1],parallel:-2,perpendicular:1/2,
  parallelIntercept:9,perpendicularIntercept:-1})
});
const raw=x=>typeof x==="string"?x:typeof x==="number"&&Number.isFinite(x)?String(x):"";
const clean=x=>raw(x).trim().replace(/[−–—]/g,"-").replace(/×/g,"*").replace(/\s+/g,"").toLowerCase();
const N=String.raw`(?:\d+(?:\.\d*)?|\.\d+)`;
function quantity(rawValue){
 const s=clean(rawValue);
 const match=new RegExp("^([+-]?"+N+")(?:/([+-]?"+N+"))?$").exec(s);
 if(!match)return null;
 const num=Number(match[1]),den=match[2]===undefined?1:Number(match[2]);
 if(!Number.isFinite(num)||!Number.isFinite(den)||den===0)return null;
 return num/den;
}
const exact=(a,b,tolerance=1e-9)=>a!==null&&Number.isFinite(a)&&Number.isFinite(b)
 &&Math.abs(a-b)<=tolerance;
function slopeMatches(value,expected){
 const n=quantity(value);
 if(exact(n,expected))return true;
 // The source accepts -0.333 for -1/3. Recognise more precise,
 // correctly rounded decimals without accepting broad near-misses.
 if(expected===-1/3&&n!==null){
  const decimal=/^-(?:\d+)?\.(\d{3,12})$/.exec(clean(value));
  return !!decimal&&n===Number(expected.toFixed(decimal[1].length));
 }
 return false;
}
function readSlopeIntercept(answer){
 const text=clean(answer);
 if(text.length>110||!text.startsWith("y=")||text.slice(2).includes("="))return null;
 const value=text.slice(2);
 // Require actual y=mx+c form. No point-slope, general equation, or
 // extra mathematical terms. Recognise x/2 and (-1/3)x as well as 3x.
 const fraction="(?:[+-]?"+N+"/"+N+")";
 const prefix="(?:[+-]?\\([+-]?"+N+"/"+N+"\\)|[+-]?"+N+"|[+-]?)";
 const rx=new RegExp("^("+prefix+")\\*?x(?:/("+N+"))?([+-](?:"+N+"(?:/"+N+")?))?$");
 const match=rx.exec(value);
 if(!match)return null;
 let coefficient=match[1];
 if(coefficient===""||coefficient==="+")coefficient="1";
 if(coefficient==="-")coefficient="-1";
 if(coefficient.startsWith("(")&&coefficient.endsWith(")"))
  coefficient=coefficient.slice(1,-1);
 if(coefficient.startsWith("+(")&&coefficient.endsWith(")"))
  coefficient=coefficient.slice(2,-1);
 if(coefficient.startsWith("-(")&&coefficient.endsWith(")"))
  coefficient="-"+coefficient.slice(2,-1);
 let slope=quantity(coefficient);
 const divider=match[2]===undefined?1:Number(match[2]);
 if(slope===null||!Number.isFinite(divider)||divider===0)return null;
 slope/=divider;
 const intercept=match[3]===undefined?0:quantity(match[3]);
 return intercept===null?null:{slope,intercept};
}
function previousSlope(item){
 const answer=item&&typeof item==="object"&&!Array.isArray(item)?item.answer:item;
 const value=quantity(answer);
 return value!==null&&Math.abs(value)<=1000?value:null;
}
function splitWorking(value){
 return raw(value).replace(/[−–—]/g,"-").replace(/×/g,"*")
  .split(/[\n;]/).map(clean).filter(Boolean);
}
function slopeDeclared(steps,expected){
 return steps.some(line=>{
  const matched=/^(?:m|gradient|slope|m_parallel|m_perp|mperp|mparallel|mperpendicular)=([^\s]+)$/.exec(line);
  return matched!==null&&slopeMatches(matched[1],expected);
 });
}
function reciprocalShown(steps,original,expected){
 return steps.some(line=>{
  const match=/^(?:m|gradient|slope|m_perp|mperp|mperpendicular)=-1\/\(?([+-]?(?:\d+(?:\.\d*)?|\.\d+))\)?(?:=([^\s]+))?$/.exec(line);
  if(match&&exact(quantity(match[1]),original)&&
   (match[2]===undefined||slopeMatches(match[2],expected)))return true;
  if(original===-2&&/^(?:m|gradient|slope|m_perp|mperp|mperpendicular)=-1\/\(-2\)(?:=1\/2|=0\.5(?:0+)?)?$/.test(line))return true;
  return false;
 });
}
function pointSlopeShown(steps,m,point){
 const [x,y]=point;
 const lhs=y<0?"y+"+(-y):"y-"+y;
 const xexpr="(x"+(x<0?"+"+(-x):"-"+x)+")";
 const forms=[String(m)];
 if(exact(m,-1/3))forms.push("-1/3","(-1/3)");
 if(exact(m,1/2))forms.push("1/2","(1/2)","0.5");
 if(Number.isInteger(m))forms.push(m.toFixed(1));
 return steps.some(line=>forms.some(form=>
  line===lhs+"="+form+xexpr||
  line===lhs+"="+form+"*"+xexpr));
}
const criterion=(id,yes,description)=>({
 id,maxMarks:1,candidateMarks:yes?1:null,
 status:yes?"candidate-correct":"unresolved",
 reason:yes?description:"insufficient-source-evidence"
});
function result(questionId,partId,criteria){
 return {sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
  rubricAllocation:"proposed-from-worked-solution",criteria,
  suggestedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks===null?c.maxMarks:0),0)};
}
export function evaluateMathParallelPerpendicularV2({
 questionId,partId,response={},previousResponses={}
}={}){
 const source=SOURCES[questionId];
 if(!source||!["a","b","c","d"].includes(partId))
  throw new TypeError("Unsupported Mathematics parallel/perpendicular source part");
 const answer=response&&typeof response==="object"&&!Array.isArray(response)
  ?raw(response.answer):raw(response);
 const work=response&&typeof response==="object"&&!Array.isArray(response)
  ?raw(response.working):"";
 const steps=splitWorking(work);
 if(partId==="a")return result(questionId,partId,[
  criterion("B1",slopeMatches(answer,source.parallel),"parallel-lines-share-gradient")
 ]);
 if(partId==="b")return result(questionId,partId,[
  criterion("M1",reciprocalShown(steps,source.original,source.perpendicular),
   "negative-reciprocal-calculation"),
  criterion("A1",slopeMatches(answer,source.perpendicular),"perpendicular-gradient")
 ]);
 const perpendicular=partId==="d";
 const m=perpendicular?source.perpendicular:source.parallel;
 const intercept=perpendicular?source.perpendicularIntercept:source.parallelIntercept;
 const earlier=previousSlope(previousResponses?.[perpendicular?"b":"a"]);
 const methodSlopes=[m,...(earlier!==null?[earlier]:[])];
 const method=pointSlopeShown(steps,m,source.point);
 const follow=earlier!==null&&!exact(earlier,m)&&
  pointSlopeShown(steps,earlier,source.point);
 const final=readSlopeIntercept(answer);
 const accurate=final!==null&&exact(final.slope,m)&&exact(final.intercept,intercept);
 return result(questionId,partId,[
  criterion("M1",slopeDeclared(steps,m)||
   (perpendicular&&reciprocalShown(steps,source.original,m)),
   "source-supported-line-gradient"),
  criterion("M2",method||follow,
   follow&&!method?"earlier-student-gradient-follow-through":"point-slope-substitution"),
  criterion("A1",accurate,"correct-required-slope-intercept-equation")
 ]);
}
