/**
 * Batch 1 source-gated advisory accuracy evidence for original Mathematics Q1 v2-v8.
 * One correct final-result candidate per part. Unauthored method marks remain
 * unresolved, even where working looks plausible. Never publish these votes.
 */
export const MATH_Q1_REMAINING_SOURCES_V2=Object.freeze({
 "p2-q1-v2":{a:"9/5",b1:"4500",b2:"6075",b3:"12.5"},
 "p2-q1-v3":{a:"46/3",b1:"900",b2:"4200",b3:"16.67"},
 "p2-q1-v4":{a:"10",b1:"960",b2:"5220",b3:"8.75"},
 "p2-q1-v5":{a:"32/5",b1:"252",b2:"1212",c:"5520"},
 "p2-q1-v6":{a:"41/5",b1:"576",b2:"1696",c:"9125"},
 "p2-q1-v7":{a:"7/2",b1:"38016",b2:"38776.32",c:"450"},
 "p2-q1-v8":{a:"7/2",b1:"28350",b2:"29200.50",c:"420"}
});
const string=v=>typeof v==="string"?v:typeof v==="number"&&Number.isFinite(v)?String(v):"";
const extract=v=>v&&typeof v==="object"&&!Array.isArray(v)?string(v.answer):string(v);
const gcd=(a,b)=>b===0n?a:gcd(b,a%b);
function exactFraction(raw){
 const t=string(raw).trim().replace(/[−–—]/g,"-");
 const match=/^([+]?\d+)(?:\s+(\d+)\/(\d+)|\s*\/\s*(\d+))?$/.exec(t);
 if(!match)return null;
 const whole=BigInt(match[1]),n=match[2]?BigInt(match[2]):whole;
 const d=BigInt(match[3]||match[4]||1);
 if(d===0n||d>100000000n||n>100000000n)return null;
 const numerator=match[2]?whole*d+n:n;
 if(match[2]&&(n===0n||n>=d))return null;
 if(gcd(numerator,d)!==1n)return null;
 return {numerator,denominator:d};
}
function correct(raw,expected,part){
 if(part==="a"){
  const got=exactFraction(raw),target=exactFraction(expected);
  return !!got&&!!target&&got.numerator*target.denominator===target.numerator*got.denominator;
 }
 let s=string(raw).trim().replace(/,/g,"").replace(/^\$/,"").trim();
 if(part==="b3")s=s.replace(/%$/,"").trim();
 if(!/^\+?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))return false;
 const tolerance=part==="b3"?0.011:0.01;
 return Number.isFinite(Number(s))&&Math.abs(Number(s)-Number(expected))<=tolerance;
}
export function evaluateMathQ1RemainingV2({questionId,partId,response={}}={}){
 const source=MATH_Q1_REMAINING_SOURCES_V2[questionId];
 if(!source||!Object.hasOwn(source,partId))throw new TypeError("Uncalibrated Mathematics Q1 source");
 const total=partId==="a"?3:2;
 const final=correct(extract(response),source[partId],partId);
 const criteria=[
  {id:"M-unverified",maxMarks:total-1,candidateMarks:null,status:"unresolved",
   reason:"source-has-no-authorised-atomic-method-allocation"},
  {id:"A1",maxMarks:1,candidateMarks:final?1:null,
   status:final?"candidate-correct":"unresolved",
   reason:final?"exact-source-final-answer":"insufficient-source-evidence"}
 ];
 return {sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
  rubricAllocation:"proposed-from-worked-solution",criteria,
  suggestedMarks:final?1:0,unresolvedMarks:total-(final?1:0)};
}
