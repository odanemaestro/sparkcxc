/**
 * Mathematics original Paper 2 Q5 v1-v10: source-gated advisory evidence.
 * Source papers specify part totals, not independently approved M/A splits.
 * No result here is publishable, and unresolved drawing / method marks
 * must never be transformed into zero or a final score.
 */
export const MATH_Q5_SOURCES_V2=Object.freeze({
 "p2-q5-v1":{a:["16-20",1],b:["13",3],c:["4,12,24,40",3],d:["2/5",2]},
 "p2-q5-v2":{a:["11-15",1],b:["13",3],c:["5,14,26,35,40",3],d:["7/20",2]},
 "p2-q5-v3":{a:["11-15",1],b:["13",3],c:["3,9,25,31,34",3],d:["9/34",2]},
 "p2-q5-v4":{a:["5,18,38,52,60",2],b:["graph",3],c:["26.5",2],d:["17.3",2]},
 "p2-q5-v5":{a:["4,14,30,52,70,80",2],b:["graph",3],c:["35.0",2],d:["20.7",2]},
 "p2-q5-v6":{a:["45",2],b:["70",3],c:["Car",2],d:["1/8",2]},
 "p2-q5-v7":{a:["48",2],b:["45",3],c:["Football",2],d:["2/15",2]},
 "p2-q5-v8":{a:["5/12",2],b:["2/3",2],c:["5/33",3],d:["5/44",2]},
 "p2-q5-v9":{a:["4/15",2],b:["2/3",2],c:["2/35",3],d:["4/35",2]},
 "p2-q5-v10":{a:["21-25",1],b:["17",3],c:["3,6,9,18,30",3],d:["7/10",2]}
});
const asText=x=>typeof x==="string"?x:typeof x==="number"&&Number.isFinite(x)?String(x):"";
const answer=x=>x&&typeof x==="object"&&!Array.isArray(x)?asText(x.answer):asText(x);
const clean=x=>asText(x).trim().toLowerCase().replace(/[−–—]/g,"-");
const number=x=>{
 const s=clean(x).replace(/,/g,"").replace(/^\$/,"").replace(/(?:\s*(?:kg|marks?|°|degrees?))$/,"").trim();
 if(!/^[+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))return null;
 const n=Number(s);return Number.isFinite(n)&&n<=1e8?n:null;
};
const gcd=(a,b)=>b===0n?a:gcd(b,a%b);
function fraction(s){
 const m=/^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(clean(s));
 if(!m)return null;
 const n=BigInt(m[1]),d=BigInt(m[2]);
 return d>0n&&d<=100000000n&&n<=100000000n&&n<=d&&gcd(n,d)===1n?[n,d]:null;
}
function accuracy(input,expected,part,version){
 const s=clean(input);
 if(!s||s.length>300)return false;
 if(expected==="graph")return false;
 if(part==="a"&&[1,2,3,10].includes(version))
  return s.replace(/\s+/g,"")===expected;
 if((part==="c"&&[1,2,3,10].includes(version))||
   (part==="a"&&[4,5].includes(version))){
  const components=s.split(/[,;\s]+/).filter(Boolean);
  return components.length===expected.split(",").length
   &&components.every((v,i)=>number(v)===Number(expected.split(",")[i]));
 }
 if(part==="c"&&[6,7].includes(version))return s===expected.toLowerCase();
 if(expected.includes("/")){
  const a=fraction(s),b=fraction(expected);
  return !!a&&!!b&&a[0]*b[1]===b[0]*a[1];
 }
 const a=number(s),b=number(expected);
 // Graph readings have illustrative source values, not fixed high-precision answers.
 const tolerance=[4,5].includes(version)&&["c","d"].includes(part)?0.051:0.011;
 return a!==null&&b!==null&&Math.abs(a-b)<=tolerance;
}
const Q5_METHODS=Object.freeze({
 "p2-q5-v6":{a:["360-(105+135+75)"],b:["105/360*240"]},
 "p2-q5-v7":{a:["360-(150+90+72)"],b:["90/360*180"]},
 "p2-q5-v8":{c:["5/12*4/11"],d:["5/12*3/11"]},
 "p2-q5-v9":{c:["4/15*3/14"],d:["4/15*6/14"]}
});
function evidencedMethod(questionId,partId,response){
 const patterns=Q5_METHODS[questionId]?.[partId];
 if(!patterns)return false;
 const raw=response&&typeof response==="object"&&!Array.isArray(response)
  ?asText(response.working):"";
 const w=raw.toLowerCase().replace(/[×∗]/g,"*").replace(/[−–—]/g,"-")
  .replace(/÷/g,"/").replace(/\\s+/g,"");
 if(!w||/\\b(?:or|either)\\b/i.test(raw))return false;
 return patterns.some(expr=>w.split(/[;=\\n]/).includes(expr));
}

function criterion(id,maxMarks,ok,reason){
 return {id,maxMarks,candidateMarks:ok?maxMarks:null,
  status:ok?"candidate-correct":"unresolved",
  reason:ok?reason:"requires-source-specific-verified-evidence"};
}
export function evaluateMathQ5V2({questionId,partId,response={}}={}){
 const source=MATH_Q5_SOURCES_V2[questionId];
 if(!source||!Object.hasOwn(source,partId))
  throw new TypeError("Uncalibrated Mathematics Question 5 source");
 const [expected,marks]=source[partId],version=Number(questionId.split("-v")[1]);
 const final=accuracy(answer(response),expected,partId,version);
 const isGraph=expected==="graph";
 const method=marks>1&&!isGraph&&evidencedMethod(questionId,partId,response);
 const criteria=[
  ...(marks>2?[criterion(isGraph?"G-unverified":"M-unverified",marks-2,false,
   "remaining-unverified-method-or-graph-evidence")]:[]),
  ...(marks>1?[criterion(isGraph?"G-method-unverified":"M1",1,method,
   "source-specific-substitution-evidence")]:[]),
  criterion(isGraph?"G-final-unverified":"A1",1,!isGraph&&final,"source-supported-final-evidence")
 ];
 return {sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
  rubricAllocation:"proposed-from-worked-solution",criteria,
  suggestedMarks:(final&&!isGraph?1:0)+(method?1:0),
  unresolvedMarks:marks-(final&&!isGraph?1:0)-(method?1:0)};
}
