/**
 * Advisory-only, source-calibrated Mathematics Paper 2 arithmetic sequences.
 * The 10-mark Q7 versions 8–10 have no authored atomic M/A split, so all
 * criteria below are proposed from worked solutions and cannot publish marks.
 */
import {equivalent} from "../practice/cxcMarking/algebra";

export const ARITHMETIC_SEQUENCE_SOURCES_V2=Object.freeze({
 "p2-q7-v8":Object.freeze({a:7,d:4,term:12,value:51,count:20,sum:900,target:79,index:19}),
 "p2-q7-v9":Object.freeze({a:13,d:5,term:16,value:88,count:18,sum:999,target:98,index:18}),
 "p2-q7-v10":Object.freeze({a:5,d:7,term:14,value:96,count:15,sum:810,target:138,index:20})
});
const str=v=>typeof v==="string"?v:typeof v==="number"&&Number.isFinite(v)?String(v):"";
const norm=s=>str(s).replace(/[−–—]/g,"-").replace(/[×∗]/g,"*").replace(/\s+/g,"").toLowerCase();
const answerOf=r=>r&&typeof r==="object"&&!Array.isArray(r)?str(r.answer):str(r);
const workingOf=r=>r&&typeof r==="object"&&!Array.isArray(r)?str(r.working):"";
const positiveInt=s=>/^[+]?\d+$/.test(s)&&Number.isSafeInteger(Number(s))&&Number(s)>0?Number(s):null;
const isNumber=(s,expected)=>positiveInt(norm(s))===expected;
function finalNumber(raw,kind){
 let s=norm(raw);
 if(s.length>100||s.includes(";")||s.includes("\n")||/\b(?:or|either|maybe)\b/.test(s))return null;
 if(kind==="term"||kind==="sum")s=s.replace(/^[ts]_?\d+=/,"");
 if(kind==="index")s=s.replace(/^n=/,"").replace(/^the/,"").replace(/(?:st|nd|rd|th)term$/,"");
 return positiveInt(s);
}
function finalFormula(raw,source){
 let s=norm(raw).replace(/^(?:t_?n|u_?n)=/,"");
 if(s.length>100||s.includes("=")||!s.includes("n"))return false;
 // The source specifically asks for the simplified form an+b.
 if(!/^([+-]?\d+)\*?n([+-]\d+)$/.test(s)
   &&!/^([+-]?\d+)([+-]\d+)\*?n$/.test(s))return false;
 const offset=source.a-source.d;
 return equivalent(s,source.d+"n"+(offset<0?offset:"+"+offset));
}
const components=s=>norm(s).split(/[;\n]/).filter(Boolean);
function nthMethod(working,source){
 const terms=components(working);
 const general=terms.some(x=>/(?:^|=)a\+\(n-1\)\*?d(?:=|$)/.test(x)
  &&/^(?:t_?n|u_?n)=/.test(x));
 const a=source.a,d=source.d;
 const rx=new RegExp("(?:^|=)"+a+"\\+\\(n-1\\)\\*?\\(?"+d+"\\)?(?=$|=)");
 const substitution=terms.some(x=>rx.test(x));
 return {general,substitution};
}
function laterTermMethod(working,source){
 const a=source.a,d=source.d,t=source.term,offset=a-d;
 const suffix=offset<0?String(offset):"+"+offset;
 const variants=[
  a+"+("+t+"-1)("+d+")",
  a+"+("+t+"-1)*"+d,
  d+"("+t+")"+suffix,
  d+"*"+t+suffix
 ];
 const steps=norm(working).split(/[;\n=]/);
 return variants.some(v=>steps.includes(v));
}
function arithmeticSumMethod(working,source){
 const a=source.a,d=source.d,n=source.count,last=a+(n-1)*d;
 const variants=[
  "("+n+"/2)[2("+a+")+("+n+"-1)("+d+")]",
  "("+n+"/2)(2("+a+")+("+n+"-1)("+d+"))",
  "("+n+"/2)*(2("+a+")+("+n+"-1)("+d+"))",
  "("+n+"/2)*(2*"+a+"+("+n+"-1)*"+d+")",
  "("+n+"/2)*("+a+"+"+last+")",
  "("+n+"/2)("+a+"+"+last+")",
  n+"/2*("+a+"+"+last+")"
 ];
 const steps=norm(working).split(/[;\n=]/);
 return variants.some(v=>steps.includes(v));
}
function reverseMethod(working,source){
 const offset=source.a-source.d;
 const suffix=offset<0?offset:"+"+offset;
 const a=source.a,d=source.d,t=source.target;
 const variants=[d+"n"+suffix+"="+t,a+"+(n-1)("+d+")="+t];
 return variants.some(v=>components(working).includes(v));
}
const criterion=(id,valid,why)=>({id,maxMarks:1,
 candidateMarks:valid?1:null,status:valid?"candidate-correct":"unresolved",
 reason:valid?why:"insufficient-source-evidence"});
function report(questionId,partId,criteria){
 return {sourcePart:questionId+"::"+partId,authority:"advisory",
  publishable:false,rubricAllocation:"proposed-from-worked-solution",
  criteria,
  suggestedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks===null?c.maxMarks:0),0)};
}
export function evaluateMathArithmeticSequencesV2({questionId,partId,response={}}={}){
 const source=ARITHMETIC_SEQUENCE_SOURCES_V2[questionId];
 if(!source||!["a","b","c","d","e"].includes(partId))
  throw new TypeError("Uncalibrated Mathematics arithmetic-sequence source");
 const answer=answerOf(response),working=workingOf(response);
 if(partId==="a")return report(questionId,partId,[
  criterion("B1",isNumber(answer,source.d),"source-common-difference")]);
 if(partId==="b"){
  const method=nthMethod(working,source);
  return report(questionId,partId,[
   criterion("M1",method.general,"arithmetic-sequence-nth-term-formula"),
   criterion("M2",method.substitution,"source-substitution"),
   criterion("A1",finalFormula(answer,source),"equivalent-linear-nth-term")]);
 }
 if(partId==="c")return report(questionId,partId,[
  criterion("M1",laterTermMethod(working,source),"requested-term-substitution"),
  criterion("A1",finalNumber(answer,"term")===source.value,"correct-term")]);
 if(partId==="d")return report(questionId,partId,[
  criterion("M1",arithmeticSumMethod(working,source),"source-sum-substitution"),
  criterion("A1",finalNumber(answer,"sum")===source.sum,"correct-sum")]);
 return report(questionId,partId,[
  criterion("M1",reverseMethod(working,source),"correct-target-term-equation"),
  criterion("A1",finalNumber(answer,"index")===source.index,"correct-positive-term-index")]);
}
