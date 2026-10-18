/**
 * Independent advisory candidate checks for the ORIGINAL SPARK Mathematics
 * Paper 2 p2-q1-v1(a), the exact-fraction question.
 *
 * The authored bank has three marks but not an authored M/A split. These
 * proposed one-mark steps require visible evidence and can never publish marks.
 */
const SOURCE="p2-q1-v1::a";
const gcd=(a,b)=>b===0?Math.abs(a):gcd(b,a%b);
function exactIntegerFraction(raw){
 if(typeof raw!=="string"&&typeof raw!=="number")return null;
 const s=String(raw).trim().replace(/[−–—]/g,"-");
 const m=/^([+-]?\d+)(?:\s*\/\s*([+-]?\d+))?$/.exec(s);
 if(!m)return null;
 const num=Number(m[1]),den=m[2]===undefined?1:Number(m[2]);
 if(!Number.isSafeInteger(num)||!Number.isSafeInteger(den)||den<=0)return null;
 return {num,den,lowest:gcd(num,den)===1};
}
const normalize=s=>typeof s==="string"?s.replace(/[−–—]/g,"-")
 .replace(/[÷]/g,"/").replace(/×/g,"*").replace(/\s+/g,""):"";
const vote=(id,ok,reason)=>({id,maxMarks:1,candidateMarks:ok?1:null,
 status:ok?"candidate-correct":"unresolved",
 reason:ok?reason:"insufficient-source-evidence"});
export function evaluateMathExactFractionsV2({questionId="p2-q1-v1",partId="a",response={}}={}){
 if(questionId!=="p2-q1-v1"||partId!=="a")
  throw new TypeError("Uncalibrated Mathematics exact-fraction source");
 const raw=response&&typeof response==="object"&&!Array.isArray(response)
  ?response.answer:response;
 const working=normalize(response&&typeof response==="object"&&!Array.isArray(response)?response.working:"");
 // A computed numerator and denominator must be shown as equalities, not
 // copied numbers floating elsewhere in the student's prose.
 const numerator=/(?:7\/3\+7\/4|28\/12\+21\/12)=49\/12(?=$|[^0-9/])/.test(working);
 const denominator=/(?:5\/6-1\/4|10\/12-3\/12)=7\/12(?=$|[^0-9/])/.test(working);
 const fraction=exactIntegerFraction(raw);
 const final=!!fraction&&fraction.lowest&&fraction.num===7*fraction.den;
 const criteria=[
  vote("M1",numerator,"correct-mixed-number-numerator"),
  vote("M2",denominator,"correct-subtracted-denominator"),
  vote("A1",final,"exact-result-in-lowest-terms")
 ];
 return {sourcePart:SOURCE,authority:"advisory",publishable:false,
  rubricAllocation:"proposed-from-worked-solution",criteria,
  suggestedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks===null?1:0),0)};
}
