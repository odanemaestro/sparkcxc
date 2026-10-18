/**
 * Advisory source-specific Mathematics Paper 2 Q7 number statements.
 * Source originals v6 and v7: 2/2/4/2 marks. Atomic distributions below
 * are PROPOSED from the worked solutions, not an authorised marking scheme.
 * Do not use candidate marks to publish scores.
 */
import {equivalent} from "../practice/cxcMarking/algebra";

export const NUMBER_STATEMENT_SOURCES_V2=Object.freeze({
 "p2-q7-v6":Object.freeze({target:71,index:7}),
 "p2-q7-v7":Object.freeze({target:131,index:10})
});
const raw=x=>typeof x==="string"?x:typeof x==="number"&&Number.isFinite(x)?String(x):"";
const compact=x=>raw(x).trim().toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[×∗]/g,"*").replace(/²/g,"^2").replace(/[ \t\r]+/g,"");
const answerOf=r=>r&&typeof r==="object"&&!Array.isArray(r)?raw(r.answer):raw(r);
const workingOf=r=>r&&typeof r==="object"&&!Array.isArray(r)?raw(r.working):"";
const isPositiveInteger=s=>/^[+]?\d+$/.test(s)&&Number.isSafeInteger(Number(s))&&Number(s)>0?Number(s):null;
const veto=s=>/\b(?:or|either|perhaps|maybe)\b/i.test(raw(s))||raw(s).length>1000;
const criterion=(id,yes,reason)=>({
 id,maxMarks:1,candidateMarks:yes?1:null,
 status:yes?"candidate-correct":"unresolved",
 reason:yes?reason:"insufficient-source-evidence"
});
const result=(questionId,partId,criteria)=>({
 sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
 rubricAllocation:"proposed-from-worked-solution",criteria,
 suggestedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks??0),0),
 unresolvedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks===null?c.maxMarks:0),0)
});
const steps=rawText=>compact(rawText).split(/[;\n=]/).map(v=>v.trim()).filter(Boolean);
function statementStep(s,k){
 const expression=k+"*"+(k+2)+"+"+(k+1);
 return s===expression||s===k+"x"+(k+2)+"+"+(k+1)
  ||s===k+"("+(k+2)+")+"+(k+1)
  ||s===k+"*("+(k+2)+")+"+(k+1)
  ||s===k+"*"+(k+2)+"+"+(k+1);
}
function sumStep(s,k){
 return s===k*(k+2)+"+"+(k+1);
}
function statementEvidence(answer,working,k){
 const sourceSteps=[...steps(answer),...steps(working)];
 const m=sourceSteps.some(v=>statementStep(v,k)||sumStep(v,k));
 const answerString=compact(answer).replace(/^(?:finalanswer|answer|ans):?/,"").trim();
 const numeric=isPositiveInteger(answerString);
 // A bare correct number is accepted by the question bank. For an
 // equation, the RHS is only a valid answer when the LHS was the
 // source-supported calculation rather than a fabricated equality.
 const pieces=steps(answer);
 const fromEquation=pieces.length===2&&(statementStep(pieces[0],k)||sumStep(pieces[0],k))
  ?isPositiveInteger(pieces[1]):null;
 const fromWorking=[...steps(working)].some((v,i,a)=>
  (statementStep(v,k)||sumStep(v,k))&&a[i+1]===String(k*(k+2)+(k+1)));
 return {method:!veto(answer)&&!veto(working)&&m,
  accuracy:!veto(answer)&&(numeric===k*(k+2)+(k+1)
   ||fromEquation===k*(k+2)+(k+1)),
  calculationInWorking:fromWorking};
}
function sourceStructure(s){
 const t=compact(s);
 return /(?:^|=|;|\n)n(?:\*|x)?\(n\+2\)(?:\+\(n\+1\)|\+n\+1)?(?=$|=|;|\n)/.test(t);
}
function nthPieces(s){
 const t=compact(s);
 const portions=t.split(/[;=\n]/);
 const beginning=portions.some(v=>v==="n(n+2)"||v==="n*(n+2)"||v==="n*(n+2)+(n+1)"
   ||v==="n(n+2)+(n+1)"||v==="n(n+2)+n+1"||v==="n*(n+2)+n+1");
 const full=portions.some(v=>sourceStructure(v));
 return {beginning,full};
}
function uncollected(s){
 const x=compact(s);
 return x.split(/[;=\n]/).some(v=>
  /^(?:n\^2\+2\*?n\+n\+1|n\^2\+n\+2\*?n\+1)$/.test(v));
}
function simplifiedPolynomial(s){
 const t=compact(s);
 if(!t||t.length>100||t.includes("=")||/[()]/.test(t)
  ||!/^[0-9n+\-*^]+$/.test(t))return false;
 // Require exactly one quadratic term, one linear term and one constant.
 // n^2+2n+n+1 is equivalent but not fully simplified.
 const parts=t.match(/[+-]?[^+-]+/g);
 if(!parts||parts.length!==3)return false;
 const categories=parts.map(p=>{
  const x=p.replace(/^[+-]/,"");
  if(/^(?:\d+\*)?n\^2$/.test(x))return "square";
  if(/^(?:\d+\*?)?n$/.test(x))return "linear";
  if(/^\d+$/.test(x))return "constant";
  return "other";
 });
 if(new Set(categories).size!==3||categories.includes("other"))return false;
 return equivalent(t,"n^2+3n+1");
}
function nthAnswer(answer){
 if(veto(answer))return {structure:false,expanded:false,simplified:false};
 const parts=steps(answer);
 return {structure:parts.some(sourceStructure),
  expanded:uncollected(answer),
  simplified:parts.some(simplifiedPolynomial)};
}
function reverseMethod(working,source){
 if(veto(working))return false;
 const n=source.index,target=source.target;
 const candidates=[
  "n^2+3n+1="+target,
  "n^2+3n-"+(target-1)+"=0",
  "(n+"+(n+3)+")(n-"+n+")=0"
 ];
 const s=compact(working);
 return candidates.some(c=>s.split(/[;\n]/).includes(c));
}
function indexFinal(answer,source){
 if(veto(answer))return false;
 const s=compact(answer).replace(/^n=/,"").replace(/^(?:the)?(?:statementnumber|statement)=?/,"")
  .replace(/(?:st|nd|rd|th)?statement$/,"");
 return isPositiveInteger(s)===source.index;
}
export function evaluateMathNumberStatementsV2({questionId,partId,response={}}={}){
 const source=NUMBER_STATEMENT_SOURCES_V2[questionId];
 if(!source||!["a","b","c","d"].includes(partId))
  throw new TypeError("Uncalibrated Mathematics number-statement source");
 const answer=answerOf(response),working=workingOf(response);
 if(partId==="a"||partId==="b"){
  const n=partId==="a"?5:10,evidence=statementEvidence(answer,working,n);
  return result(questionId,partId,[
   criterion("M1",evidence.method,"source-statement-formation"),
   criterion("A1",evidence.accuracy,"verified-statement-value")
  ]);
 }
 if(partId==="c"){
  const all=nthPieces(answer+"\n"+working),final=nthAnswer(answer);
  return result(questionId,partId,[
   criterion("M1",all.beginning,"source-nth-multiplication"),
   criterion("M2",all.full,"complete-nth-statement"),
   criterion("M3",uncollected(answer+"\n"+working),"supported-intermediate-expansion"),
   criterion("A1",final.simplified,"equivalent-fully-collected-polynomial")
  ]);
 }
 return result(questionId,partId,[
  criterion("M1",reverseMethod(working,source),"target-equation-or-factorisation"),
  criterion("A1",indexFinal(answer,source),"correct-positive-statement-index")
 ]);
}
