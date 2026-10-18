/**
 * Advisory, source-specific evidence for SPARK Mathematics P2 Q1 v9/v10.
 * Includes inverse workforce/time proportion, ratio shares and exact fraction
 * calculations. The source bank assigns 3/2/2/2 but does not author atomic
 * M/A criteria: every split here is a proposal, never a publishable grade.
 */
export const MATH_RATIO_VARIATION_SOURCES_V2=Object.freeze({
 "p2-q1-v9":Object.freeze({ratio:[2,3,4],total:5040,parts:9,unit:560,
  largest:2240,smallest:1120,difference:1120,
  workers:8,days:15,newWorkers:12,newDays:10,
  numerator:"9/4",denominator:"5/24",fraction:"54/5"}),
 "p2-q1-v10":Object.freeze({ratio:[3,4,5],total:7200,parts:12,unit:600,
  largest:3000,smallest:1800,difference:1200,
  workers:6,days:20,newWorkers:10,newDays:12,
  numerator:"56/15",denominator:"8/15",fraction:"7"})
});
const raw=v=>typeof v==="string"?v:typeof v==="number"&&Number.isFinite(v)?String(v):"";
const responseAnswer=r=>r&&typeof r==="object"&&!Array.isArray(r)?raw(r.answer):raw(r);
const responseWorking=r=>r&&typeof r==="object"&&!Array.isArray(r)?raw(r.working):"";
const canon=v=>raw(v).replace(/[−–—]/g,"-").replace(/[×∗]/g,"*").replace(/÷/g,"/")
 .replace(/,/g,"").replace(/\$/g,"").replace(/[ \t\r]+/g,"").toLowerCase();
const escaped=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
function containsStep(working,expressions){
 const text=canon(working).replace(/\n/g,";");
 return expressions.some(part=>new RegExp("(?:^|[;=])"+escaped(part)+"(?=$|[;=])").test(text));
}
function numberOf(rawAnswer,kind){
 let s=canon(rawAnswer).trim();
 if(!s||s.length>100||s.includes(";")||s.includes("\n"))return null;
 if(kind==="days")s=s.replace(/(?:days?|d)$/,"");
 if(!/^\+?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))return null;
 const num=Number(s);
 return Number.isFinite(num)&&num>=0&&num<=1e8?num:null;
}
const near=(a,b,t=0.01)=>a!==null&&Math.abs(a-b)<=t;
const gcd=(a,b)=>b===0?Math.abs(a):gcd(b,a%b);
function canonicalFraction(answer,source){
 const original=raw(answer).trim().replace(/[−–—]/g,"-");
 const compact=original.replace(/\s*\/\s*/g,"/").replace(/[ \t]+/g," ");
 if(!compact||compact.length>100||/(\bor\b|\beither\b)/i.test(compact))return false;
 // The first paper explicitly includes 10.8 as a published accepted form
 // despite saying "exact"; preserve the source's documented acceptance.
 if(source.fraction==="54/5"&&compact==="10.8")return true;
 const target=source.fraction.split("/").map(Number);
 const targetNumerator=target[0],targetDenominator=target[1]??1;
 const mixed=/^(\d+)\s+(\d+)\/(\d+)$/.exec(compact);
 if(mixed){
  const [,wholeText,numText,denText]=mixed;
  const whole=Number(wholeText),num=Number(numText),den=Number(denText);
  return Number.isSafeInteger(whole)&&Number.isSafeInteger(num)&&Number.isSafeInteger(den)
   &&den>0&&num>0&&num<den&&gcd(num,den)===1
   &&(whole*den+num)*targetDenominator===targetNumerator*den;
 }
 const fraction=/^(\d+)(?:\/(\d+))?$/.exec(compact);
 if(!fraction)return false;
 const num=Number(fraction[1]),den=fraction[2]===undefined?1:Number(fraction[2]);
 return Number.isSafeInteger(num)&&Number.isSafeInteger(den)&&den>0
  &&gcd(num,den)===1&&num*targetDenominator===targetNumerator*den;
}
function fractionMethods(working,source){
 if(source.fraction==="54/5"){
  return [
   containsStep(working,["15/4-3/2","15/4-6/4","15/4-3/2","9/4"]),
   containsStep(working,["3/8-1/6","9/24-4/24","5/24"])
  ];
 }
 return [
  containsStep(working,["12/5+4/3","36/15+20/15","56/15"]),
  containsStep(working,["7/10-1/6","21/30-5/30","8/15"])
 ];
}
function computedFractionStep(work,source){
 const w=canon(work);
 const numerator=source.numerator,denominator=source.denominator;
 const fraction=source.fraction;
 // A complete transformation is an additional alternative source method;
 // each atomic method still requires evidence of its own component.
 return containsStep(w,[numerator+"/"+denominator,
  numerator+"*"+denominator.split("/").reverse().join("/"),
  numerator+"*("+denominator.split("/").reverse().join("/")+")",
  fraction]);
}
function shareMethod(work,source){
 const [small,medium,large]=source.ratio;
 return containsStep(work,[
  source.total+"/"+source.parts,
  small+"+"+medium+"+"+large,
  source.unit+"*"+large,large+"*"+source.unit,
  source.total+"*"+large+"/"+source.parts,
  source.total+"*("+large+"/"+source.parts+")",
  large+"/"+source.parts+"*"+source.total,
  "("+large+"/"+source.parts+")*"+source.total
 ]);
}
function differenceMethod(work,source,priorValue){
 const valid=[
  source.largest+"-"+source.smallest,
  source.unit+"*"+(source.ratio[2]-source.ratio[0]),
  (source.ratio[2]-source.ratio[0])+"*"+source.unit
 ];
 if(priorValue!==null&&priorValue!==source.largest)
  valid.push(priorValue+"-"+source.smallest);
 return containsStep(work,valid);
}
function inverseMethod(work,source){
 const workerDays=source.workers*source.days;
 return containsStep(work,[
  source.workers+"*"+source.days,
  source.days+"*"+source.workers,
  workerDays+"/"+source.newWorkers,
  source.workers+"*"+source.days+"/"+source.newWorkers,
  source.days+"*"+source.workers+"/"+source.newWorkers,
  "("+source.workers+"*"+source.days+")/"+source.newWorkers,
  "("+source.days+"*"+source.workers+")/"+source.newWorkers
 ]);
}
function vote(id,okay,why){
 return {id,maxMarks:1,candidateMarks:okay?1:null,
  status:okay?"candidate-correct":"unresolved",
  reason:okay?why:"insufficient-source-evidence"};
}
function pack(questionId,partId,criteria){
 return {sourcePart:questionId+"::"+partId,authority:"advisory",
  publishable:false,rubricAllocation:"proposed-from-worked-solution",criteria,
  suggestedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks===null?c.maxMarks:0),0)};
}
export function evaluateMathRatioInverseVariationV2({
 questionId,partId,response={},previousResponses={}
}={}){
 const source=MATH_RATIO_VARIATION_SOURCES_V2[questionId];
 if(!source||!["a","b1","b2","c"].includes(partId))
  throw new TypeError("Uncalibrated Mathematics ratio/inverse-variation part");
 const answer=responseAnswer(response),work=responseWorking(response);
 if(partId==="a"){
  const [numerator,denominator]=fractionMethods(work,source);
  const methodFull=computedFractionStep(work,source);
  return pack(questionId,partId,[
   vote("M1",numerator||methodFull,"numerator-fraction-calculation"),
   vote("M2",denominator||methodFull,"denominator-fraction-calculation"),
   vote("A1",canonicalFraction(answer,source),"published-exact-fraction-answer")
  ]);
 }
 if(partId==="b1")return pack(questionId,partId,[
  vote("M1",shareMethod(work,source),"total-parts-and-largest-share-method"),
  vote("A1",near(numberOf(answer),source.largest),"correct-largest-ratio-share")
 ]);
 if(partId==="b2"){
  const previous=numberOf(previousResponses?.b1?.answer??previousResponses?.b1);
  const validPrior=previous!==null&&previous>source.smallest&&previous<1000000;
  const candidate=numberOf(answer);
  const followThrough=validPrior&&previous!==source.largest
   &&differenceMethod(work,source,previous)
   &&near(candidate,previous-source.smallest);
  return pack(questionId,partId,[
   vote("M1",differenceMethod(work,source,validPrior?previous:null),
    "largest-minus-smallest-method"),
   vote("A1",near(candidate,source.difference)||followThrough,
    followThrough&&!near(candidate,source.difference)
     ?"verified-previous-largest-share-follow-through":"correct-share-difference")
  ]);
 }
 const time=numberOf(answer,"days");
 return pack(questionId,partId,[
  vote("M1",inverseMethod(work,source),"constant-worker-days-method"),
  vote("A1",near(time,source.newDays,0.011),"source-correct-number-of-days")
 ]);
}
