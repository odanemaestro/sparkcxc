/** Conservative source-only Q2 v4-v8 checks, advisory, never publishable.
 * An exact final-answer match is evidence, not authority over equivalent alternatives.
 * Two or one method marks remain unresolved until rubric decomposition is verified.
 */
export const MATH_Q2_REMAINING_SOURCES_V2=Object.freeze({
 "p2-q2-v4":{a:["(x - 7)/((x + 2)(x - 1))",3],b:["r = sqrt(3V/(πh))",3],c:["-37",3]},
 "p2-q2-v5":{a:["(x - 15)/((x + 1)(x - 3))",3],b:["r = sqrt(3V/(πh))",3],c:["-25",3]},
 "p2-q2-v6":{a:["(3x - 16)/((x + 3)(x - 2))",3],b:["r = sqrt(3V/(πh))",3],c:["-21",3]},
 "p2-q2-v7":{a:["-x^2 + 13x - 6",3],b:["(2b - 3)(2a + 5)",2],c1:["x < 7",2],c2:["6",2]},
 "p2-q2-v8":{a:["-x^2 + 5x - 9",3],b:["(2b - 3)(3a + 2)",2],c1:["x < 7",2],c2:["6",2]}
});
const string=x=>typeof x==="string"?x:typeof x==="number"&&Number.isFinite(x)?String(x):"";
const compact=x=>string(x).trim().toLowerCase().replace(/[−–—]/g,"-")
 .replace(/×/g,"*").replace(/π/g,"pi").replace(/\s+/g,"");
// Algebraically verified source variants. Do not allow arbitrary expression
// rewriting: this whitelist preserves numerator, denominator, and factorisation
// requirements from each assembled student-facing question.
export const MATH_Q2_ALTERNATIVES_V2=Object.freeze({
 "p2-q2-v4":{a:["(x-7)/((x-1)(x+2))","(x-7)/(x^2+x-2)"],
  b:["sqrt(3v/(pih))"]},
 "p2-q2-v5":{a:["(x-15)/((x-3)(x+1))","(x-15)/(x^2-2x-3)"],
  b:["sqrt(3v/(pih))"]},
 "p2-q2-v6":{a:["(3x-16)/((x-2)(x+3))","(3x-16)/(x^2+x-6)"],
  b:["sqrt(3v/(pih))"]},
 "p2-q2-v7":{a:["-1x^2+13x-6","13x-x^2-6"],
  b:["(2a+5)(2b-3)","(2b-3)(5+2a)"],c1:["7>x"]},
 "p2-q2-v8":{a:["-1x^2+5x-9","5x-x^2-9"],
  b:["(3a+2)(2b-3)","(2b-3)(2+3a)"],c1:["7>x"]}
});
function accurateSourceAnswer(questionId,partId,value,expected){
 const got=compact(value);
 if(!got)return false;
 const options=[expected,...(MATH_Q2_ALTERNATIVES_V2[questionId]?.[partId]??[])];
 // Values for isolated numerical parts are numbers, not symbolic factors.
 if(["c","c2"].includes(partId)&&/^[-+]?\d+(?:\.\d+)?$/.test(got))
  return Number(got)===Number(expected);
 return options.some(x=>got===compact(x));
}

export function evaluateMathQ2RemainingV2({questionId,partId,response={}}={}){
 const source=MATH_Q2_REMAINING_SOURCES_V2[questionId];
 if(!source||!Object.hasOwn(source,partId))throw new TypeError("Uncalibrated Mathematics Q2 source");
 const [expected,marks]=source[partId];
 const value=response&&typeof response==="object"&&!Array.isArray(response)?response.answer:response;
 const correct=accurateSourceAnswer(questionId,partId,value,expected);
 const criteria=[
  {id:"M-unverified",maxMarks:marks-1,candidateMarks:null,status:"unresolved",
   reason:"method-evidence-requires-verified-atomic-rubric"},
  {id:"A1",maxMarks:1,candidateMarks:correct?1:null,
   status:correct?"candidate-correct":"unresolved",
   reason:correct?"source-answer-match":"unsupported-or-alternative-form-needs-reconciliation"}
 ];
 return {sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
  rubricAllocation:"proposed-from-worked-solution",criteria,
  suggestedMarks:correct?1:0,unresolvedMarks:marks-(correct?1:0)};
}
