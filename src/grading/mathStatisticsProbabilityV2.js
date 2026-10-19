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
function fraction(s,requireSimplest=true){
 const m=/^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(clean(s));
 if(!m)return null;
 const n=BigInt(m[1]),d=BigInt(m[2]);
 return d>0n&&d<=100000000n&&n<=100000000n&&n<=d
  &&(!requireSimplest||gcd(n,d)===1n)?[n,d]:null;
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
 if(part==="c"&&[6,7].includes(version)){
  // A candidate may state the correct category and then explain why.
  // Reject competing choices instead of using a loose substring match.
  return s===expected.toLowerCase() ||
   (s.startsWith(expected.toLowerCase()+" because ") && !/\b(?:or|either)\b/i.test(s));
 }
 if(expected.includes("/")){
  // The source explicitly demands lowest terms for Q5 d v1-v7/v10 and
  // Q5 a v8-v9. Other probability prompts accept equivalent fractions.
  const simplest=(part==="a"&&[8,9].includes(version))||
   (part==="d"&&![8,9].includes(version));
  const a=fraction(s,simplest),b=fraction(expected);
  return !!a&&!!b&&a[0]*b[1]===b[0]*a[1];
 }
 const a=number(s),b=number(expected);
 // Graph readings have illustrative source values, not fixed high-precision answers.
 const tolerance=[4,5].includes(version)&&["c","d"].includes(part)?0.051:0.011;
 return a!==null&&b!==null&&Math.abs(a-b)<=tolerance;
}
const Q5_METHODS=Object.freeze({
 "p2-q5-v1":{b:["520/40"],c:["4+8"],d:["16/40"]},
 "p2-q5-v2":{b:["520/40"],c:["5+9"],d:["14/40"]},
 "p2-q5-v3":{b:["442/34"],c:["3+6"],d:["(34-25)/34"]},
 "p2-q5-v4":{a:["5+13"]},
 "p2-q5-v5":{a:["4+10"]},
 "p2-q5-v6":{a:["360-(105+135+75)"],b:["105/360*240"],d:["30/240","45/360"]},
 "p2-q5-v7":{a:["360-(150+90+72)"],b:["90/360*180"],d:["24/180","48/360"]},
 "p2-q5-v8":{a:["5/(5+3+4)"],b:["8/12"],c:["5/12*4/11"],d:["5/12*3/11"]},
 "p2-q5-v9":{a:["4/(4+6+5)"],b:["10/15"],c:["4/15*3/14"],d:["4/15*6/14"]},
 "p2-q5-v10":{b:["510/30"],c:["3+3"],d:["21/30"]}
});
// Two independent method candidates are possible for the grouped mean:
// an evidenced midpoint-frequency sum and an evidenced division by N.
// Other proposed three-mark splits remain unresolved.
const Q5_EXTRA_METHODS=Object.freeze({
 "p2-q5-v1":{b:["4*3+8*8+12*13+16*18"]},
 "p2-q5-v2":{b:["5*3+9*8+12*13+9*18+5*23"]},
 "p2-q5-v3":{b:["3*3+6*8+16*13+6*18+3*23"]},
 "p2-q5-v10":{b:["3*3+3*8+3*13+9*18+12*23"]}
});

function evidencedMethod(questionId,partId,response,methods=Q5_METHODS){
 const patterns=methods[questionId]?.[partId];
 if(!patterns)return false;
 const raw=response&&typeof response==="object"&&!Array.isArray(response)
  ?asText(response.working):"";
 const w=raw.toLowerCase().replace(/[×∗]/g,"*").replace(/[−–—]/g,"-")
  .replace(/÷/g,"/").replace(/\((\d+\/\d+)\)/g,"$1")
  .replace(/[ \t\r]+/g,"").replace(/\n+/g,";");
 if(!w||/\b(?:or|either)\b/i.test(raw))return false;
 return patterns.some(expr=>w.split(/[;=\n]/).includes(expr));
}
function evidencedPieReason(questionId,partId,response){
 if(partId!=="c"||!["p2-q5-v6","p2-q5-v7"].includes(questionId))return false;
 const a=answer(response);
 const w=response&&typeof response==="object"&&!Array.isArray(response)
  ?asText(response.working):"";
 const evidence=(a+" "+w).toLowerCase();
 const category=questionId==="p2-q5-v6"
  ?/\bcar\b/.test(evidence):/\bfootball\b/.test(evidence);
 const angle=questionId==="p2-q5-v6"
  ?/\b135\b/.test(evidence):/\b150\b/.test(evidence);
 return category&&angle&&/\b(?:largest|greatest|biggest|most)\b/.test(evidence)
  &&!/\b(?:or|either|not|isn't|wasn't)\b/.test(evidence)
  // Avoid awarding an unsupported reason that names a different winner.
  &&(questionId==="p2-q5-v6"
   ?!/\b(?:bus|train|walk)\b/.test(evidence)
   :!/\b(?:cricket|netball|athletics)\b/.test(evidence));
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
 const isGraph=expected==="graph";
 const graphDependent=[4,5].includes(version)&&["b","c","d"].includes(partId);
 // The median and IQR must be read from a graph. Matching a memorised source
 // number is not enough to establish even provisional graph-reading accuracy.
 const final=!graphDependent&&accuracy(answer(response),expected,partId,version);
 const method=marks>1&&!graphDependent&&(
  evidencedMethod(questionId,partId,response)||
  evidencedPieReason(questionId,partId,response)
 );
 const extra=marks>2&&!graphDependent&&
  evidencedMethod(questionId,partId,response,Q5_EXTRA_METHODS);
 const criteria=[
  ...(marks>2?[criterion(isGraph?"G-unverified":"M2",1,extra,
   "source-specific-midpoint-frequency-calculation-evidence")]:[]),
  ...(marks>1?[criterion(isGraph?"G-method-unverified":"M1",1,method,
   "source-specific-substitution-evidence")]:[]),
  criterion(isGraph?"G-final-unverified":"A1",1,!graphDependent&&final,"source-supported-final-evidence")
 ];
 return {sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
  rubricAllocation:"proposed-from-worked-solution",criteria,
  suggestedMarks:(final?1:0)+(method?1:0)+(extra?1:0),
  unresolvedMarks:marks-(final?1:0)-(method?1:0)-(extra?1:0)};
}
