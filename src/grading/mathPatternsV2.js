/**
 * Conservative advisory calibration for SPARK Mathematics Q7 patterns v1–v5.
 * The source specifies 2/4/2/2 marks per question, but not their atomic
 * distribution. These proposed criteria cannot be used for publication.
 */
import {equivalent} from "../practice/cxcMarking/algebra";

export const PATTERN_SOURCES_V2=Object.freeze({
 "p2-q7-v1":Object.freeze({kind:"tiles",a:[16,16,32],target:165,index:11,shaded:144,final:48}),
 "p2-q7-v2":Object.freeze({kind:"tiles",a:[16,16,32],target:96,index:8,shaded:225,final:60}),
 "p2-q7-v3":Object.freeze({kind:"tiles",a:[16,16,32],target:320,index:16,shaded:400,final:80}),
 "p2-q7-v4":Object.freeze({kind:"dots",a:[4,5,9],target:61,index:30,bottom:24,final:47}),
 "p2-q7-v5":Object.freeze({kind:"dots",a:[4,5,9],target:87,index:43,bottom:31,final:61})
});
const str=v=>typeof v==="string"?v:typeof v==="number"&&Number.isFinite(v)?String(v):"";
const norm=v=>str(v).trim().replace(/[−–—]/g,"-").replace(/[×∗]/g,"*")
 .replace(/²/g,"^2").replace(/[ \t\r]+/g,"").toLowerCase();
const answerOf=r=>r&&typeof r==="object"&&!Array.isArray(r)?str(r.answer):str(r);
const workingOf=r=>r&&typeof r==="object"&&!Array.isArray(r)?str(r.working):"";
const value=v=>{
 const s=norm(v);
 return /^[+]?\d+$/.test(s)&&Number.isSafeInteger(Number(s))?Number(s):null;
};
const candidates=(id,ok,why)=>({
 id,maxMarks:1,candidateMarks:ok?1:null,status:ok?"candidate-correct":"unresolved",
 reason:ok?why:"insufficient-source-evidence"
});
const finish=(questionId,partId,criteria)=>({
 sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
 rubricAllocation:"proposed-from-worked-solution",criteria,
 suggestedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks??0),0),
 unresolvedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks===null?c.maxMarks:0),0)
});
function table(raw){
 // Keep spaces until the row has been tokenised. The source accepts
 // both "4, 5, 9" and "4 5 9"; removing spaces would turn the latter
 // into a single, incorrect number.
 const s=str(raw).trim().replace(/[−–—]/g,"-").replace(/^\[/,"").replace(/\]$/,"");
 const segments=s.split(/[;\n,\s]+/).filter(Boolean);
 if(segments.length!==3||segments.some(v=>value(v)===null))return null;
 return segments.map(value);
}
function formulaFields(raw,kind){
 let s=norm(raw);
 if(!s||s.length>500||/\b(?:or|either|maybe)\b/.test(s))return null;
 const segments=s.split(/[;\n,]/).filter(Boolean);
 const labels=kind==="tiles"?["shaded","unshaded","total"]:["top","bottom","total"];
 if(segments.length===3){
  const hasLabels=segments.some(segment=>labels.some(label=>segment.startsWith(label)));
  if(hasLabels){
   if(segments.some((segment,i)=>!segment.startsWith(labels[i])))return null;
   return segments.map((segment,i)=>{
    const suffix=segment.slice(labels[i].length);
    return suffix.replace(/^[:=]/,"");
   });
  }
  return segments;
 }
 // The source explicitly accepts only these whitespace-separated triples.
 // Do not heuristically split arbitrary adjacent algebraic expressions.
 const loose=str(raw).trim().toLowerCase().replace(/[−–—]/g,"-").replace(/²/g,"^2");
 if(kind==="tiles"){
  const m=/^n\^2\s+4n\s+(n\^2\s*\+\s*4n|n\s*\(\s*n\s*\+\s*4\s*\))$/.exec(loose);
  return m?["n^2","4n",m[1].replace(/\s+/g,"")]:null;
 }
 return /^n\s+n\s*\+\s*1\s+2n\s*\+\s*1$/.test(loose)
  ?["n","n+1","2n+1"]:null;
}
const expectedExpressions=kind=>kind==="tiles"?["n^2","4n","n^2+4n"]:["n","n+1","2n+1"];
function formulaCorrect(input,expected){
 if(!input||input.length>100||!/^[0-9n+\-*^()]+$/.test(input))return false;
 return equivalent(input,expected);
}
function finalIndex(raw,index){
 const s=norm(raw).replace(/^n=/,"").replace(/^(?:the)?(?:design|figure)(?:number)?=?/,"")
  .replace(/(?:st|nd|rd|th)?(?:design|figure)$/,"");
 return value(s)===index&&index>0;
}
function reversePatternMethod(working,source){
 const s=norm(working),steps=s.split(/[;\n]/);
 if(source.kind==="tiles"){
  const eq="n^2+4n="+source.target;
  const factored="n^2+4n-"+source.target+"=0";
  const c=source.index,other=c+4;
  const roots="(n+"+other+")(n-"+c+")=0";
  return steps.some(x=>x===eq||x===factored||x===roots);
 }
 const first="2n+1="+source.target;
 const second="2n="+(source.target-1);
 return steps.some(x=>x===first||x===second);
}
function backPatternMethod(working,source){
 const s=norm(working),steps=s.split(/[;\n]/);
 if(source.kind==="tiles"){
  const root=Math.round(Math.sqrt(source.shaded));
  return steps.some(x=>x==="n^2="+source.shaded||x==="n="+root||
   x==="4("+root+")="+source.final||x==="4*"+root+"="+source.final);
 }
 const n=source.bottom-1;
 return steps.some(x=>x==="n+1="+source.bottom||x==="n="+n||
  x==="2("+n+")+1="+source.final||x==="2*"+n+"+1="+source.final);
}
export function evaluateMathPatternsV2({questionId,partId,response={}}={}){
 const source=PATTERN_SOURCES_V2[questionId];
 if(!source||!["a","b","c","d"].includes(partId))
  throw new TypeError("Uncalibrated Mathematics pattern question");
 const answer=answerOf(response),working=workingOf(response);
 if(partId==="a"){
  const cells=table(answer);
  return finish(questionId,partId,[
   candidates("M1",cells!==null&&cells[0]===source.a[0]&&cells[1]===source.a[1],
    "correct-first-and-second-table-values"),
   candidates("A1",cells!==null&&cells[2]===source.a[2],"correct-pattern-total")
  ]);
 }
 if(partId==="b"){
  const fields=formulaFields(answer,source.kind);
  const expected=expectedExpressions(source.kind);
  const okay=expected.map((x,i)=>!!fields&&formulaCorrect(fields[i],x));
  return finish(questionId,partId,[
   candidates("B1",okay[0],"first-pattern-expression"),
   candidates("B2",okay[1],"second-pattern-expression"),
   candidates("M1",okay[0]&&okay[1]&&okay[2],"supported-combined-expression"),
   candidates("A1",okay[2],"equivalent-total-pattern-formula")
  ]);
 }
 if(partId==="c")return finish(questionId,partId,[
  candidates("M1",reversePatternMethod(working,source),"source-total-equation"),
  candidates("A1",finalIndex(answer,source.index),"correct-positive-pattern-index")
 ]);
 return finish(questionId,partId,[
  candidates("M1",backPatternMethod(working,source),"source-shaded-or-bottom-row-working"),
  candidates("A1",value(answer)===source.final,"correct-other-component-or-total")
 ]);
}
