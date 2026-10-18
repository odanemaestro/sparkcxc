import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathPatternsV2 as mark,PATTERN_SOURCES_V2} from "./mathPatternsV2";

const cases=[
 {id:"p2-q7-v1",kind:"tiles",target:165,index:11,shaded:144,root:12,final:48},
 {id:"p2-q7-v2",kind:"tiles",target:96,index:8,shaded:225,root:15,final:60},
 {id:"p2-q7-v3",kind:"tiles",target:320,index:16,shaded:400,root:20,final:80},
 {id:"p2-q7-v4",kind:"dots",target:61,index:30,bottom:24,root:23,final:47},
 {id:"p2-q7-v5",kind:"dots",target:87,index:43,bottom:31,root:30,final:61}
];
const assess=(item,partId,answer="",working="")=>mark({
 questionId:item.id,partId,response:{answer,working}
});
const expressions=item=>item.kind==="tiles"
 ?["n^2","4n","n^2+4n"]:["n","n+1","2n+1"];
const table=item=>item.kind==="tiles"?"16, 16, 32":"4, 5, 9";
const alt=item=>item.kind==="tiles"?"n(n+4)":"n+(n+1)";
const reverse=item=>item.kind==="tiles"
 ?"n^2+4n="+item.target:"2n+1="+item.target;
const backward=item=>item.kind==="tiles"
 ?"n^2="+item.shaded:"n+1="+item.bottom;

describe.each(cases)("SPARK source Q7 patterns: %s",item=>{
 const paper=PAPER2_QUESTION_BANK.find(q=>q.question_id===item.id);
 test("assembled source marks and targets match the calibrated fixture",()=>{
  expect(paper).toBeDefined();
  expect(paper.parts.map(p=>[p.id,p.marks]))
   .toEqual([["a",2],["b",4],["c",2],["d",2]]);
  expect(paper.parts.find(p=>p.id==="a").answer.replace(/\s+/g,""))
   .toBe(table(item).replace(/\s+/g,""));
  expect(paper.parts.find(p=>p.id==="c").answer).toBe(String(item.index));
  expect(paper.parts.find(p=>p.id==="d").answer).toBe(String(item.final));
  expect(PATTERN_SOURCES_V2[item.id]).toMatchObject({kind:item.kind,target:item.target,index:item.index});
 });
 test("two source table marks require the first two values and the total independently",()=>{
  const expected=table(item);
  expect(assess(item,"a",expected).criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  const values=expected.split(",").map(Number);
  const wrongFirst=[values[0]+1,values[1],values[2]].join(", ");
  const wrongTotal=[values[0],values[1],values[2]+1].join(", ");
  expect(assess(item,"a",wrongFirst).criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
  expect(assess(item,"a",wrongTotal).criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
 });
 test("an incomplete table row is not taken as proof of ordering",()=>{
  const firstTwo=table(item).split(",").slice(0,2).join(",");
  expect(assess(item,"a",firstTwo).suggestedMarks).toBe(0);
  expect(assess(item,"a",table(item)+" or 0").suggestedMarks).toBe(0);
 });
 test("all three correctly labelled formulas receive four advisory candidates",()=>{
  const fields=expressions(item);
  const keys=item.kind==="tiles"?["shaded","unshaded","total"]:["top","bottom","total"];
  const answer=fields.map((v,i)=>keys[i]+"="+v).join("; ");
  const r=assess(item,"b",answer);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1,1]);
  expect(r.rubricAllocation).toBe("proposed-from-worked-solution");
  expect(r.publishable).toBe(false);
 });
 test("accepted comma-separated source formula format retains four candidates",()=>{
  const r=assess(item,"b",expressions(item).join(", "));
  expect(r.suggestedMarks).toBe(4);
 });
 test("factored or unexpanded but equivalent total formula receives final credit",()=>{
  const [a,b]=expressions(item);
  const r=assess(item,"b",[a,b,alt(item)].join(","));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1,1]);
 });
 test("missing component formula cannot be silently inferred from the total",()=>{
  const fields=expressions(item);
  const r=assess(item,"b",["wrong",fields[1],fields[2]].join(","));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1,null,1]);
 });
 test("wrong overall expression cannot receive M1 or A1",()=>{
  const fields=expressions(item);
  const r=assess(item,"b",[fields[0],fields[1],"n^2+99"].join(","));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,null,null]);
 });
 test("substituting a source total into the correct equation earns method candidate",()=>{
  const r=assess(item,"c",String(item.index),reverse(item));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(r.publishable).toBe(false);
 });
 test("correct pattern index alone is not working evidence",()=>{
  const r=assess(item,"c",String(item.index));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
  expect(r.unresolvedMarks).toBe(1);
 });
 test("wrong total equation cannot qualify as source method",()=>{
  const r=assess(item,"c",String(item.index),reverse(item).replace(String(item.target),String(item.target+1)));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
 });
 test("backward reasoning from shaded tiles or bottom row supplies method evidence",()=>{
  const r=assess(item,"d",String(item.final),backward(item));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(r.suggestedMarks).toBe(2);
 });
 test("final answer without backward reasoning gets only accuracy candidate",()=>{
  const r=assess(item,"d",String(item.final));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
  const bad=assess(item,"d",String(item.final+1),backward(item));
  expect(bad.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
 });
 test("no evidence or negative and competing final indices fail closed",()=>{
  for(const part of paper.parts){
   const r=assess(item,part.id);
   expect(r.suggestedMarks).toBe(0);
   expect(r.unresolvedMarks).toBe(part.marks);
   expect(r.authority).toBe("advisory");
   expect(r.publishable).toBe(false);
  }
  for(const answer of ["-"+item.index,item.index+" or "+(item.index+1),"0","unknown"]){
   expect(assess(item,"c",answer).criteria[1].candidateMarks).toBeNull();
  }
 });
});
test("unsupported question IDs and invalid parts cannot enter the scoring pipeline",()=>{
 for(const args of [
  {questionId:"p2-q7-v6",partId:"b"},
  {questionId:"p2-q7-v11",partId:"a"},
  {questionId:"p2-q7-v1",partId:"e"}
 ])expect(()=>mark({...args,response:{answer:"n^2"}})).toThrow(/Uncalibrated/);
});


describe.each(cases)("source-accepted whitespace representations",item=>{
 test("space-separated table cells are not concatenated into a number",()=>{
  const values=table(item).replace(/,/g," ");
  const result=assess(item,"a",values);
  expect(result.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(assess(item,"a",values.replace(/\s+/g,"")).suggestedMarks).toBe(0);
 });
 test("source-accepted space-separated symbolic expressions remain distinct",()=>{
  const expressionsAsSpaces=expressions(item).join(" ");
  const r=assess(item,"b",expressionsAsSpaces);
  expect(r.suggestedMarks).toBe(4);
  expect(r.publishable).toBe(false);
 });
 test("source model labels without equals signs remain accepted",()=>{
  const fields=expressions(item);
  const labels=item.kind==="tiles"?["shaded","unshaded","total"]:["top","bottom","total"];
  const labelled=fields.map((field,i)=>labels[i]+" "+field).join("; ");
  expect(assess(item,"b",labelled).suggestedMarks).toBe(4);
 });
 test("incorrect whitespace-separated totals cannot be split into false method marks",()=>{
  const terms=expressions(item);
  const bad=[terms[0],terms[1],"n^2+99"].join(" ");
  expect(assess(item,"b",bad).suggestedMarks).toBe(0);
 });
});
