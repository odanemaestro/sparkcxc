import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {
 evaluateMathRatioInverseVariationV2 as examine,
 MATH_RATIO_VARIATION_SOURCES_V2
} from "./mathRatioInverseVariationV2";

const fixtures=[
 {id:"p2-q1-v9",total:5040,ratios:[2,3,4],parts:9,unit:560,
  largest:2240,smallest:1120,difference:1120,workers:8,days:15,
  newWorkers:12,newDays:10,numStep:"15/4-3/2=9/4",
  denStep:"3/8-1/6=5/24",final:"54/5",differentLargest:2200},
 {id:"p2-q1-v10",total:7200,ratios:[3,4,5],parts:12,unit:600,
  largest:3000,smallest:1800,difference:1200,workers:6,days:20,
  newWorkers:10,newDays:12,numStep:"12/5+4/3=56/15",
  denStep:"7/10-1/6=8/15",final:"7",differentLargest:2900}
];
const check=(f,partId,answer="",working="",previousResponses={})=>examine({
 questionId:f.id,partId,response:{answer,working},previousResponses
});
describe.each(fixtures)("Math P2 source-calibrated Q1 ratio and inverse variation",f=>{
 const paper=PAPER2_QUESTION_BANK.find(q=>q.question_id===f.id);
 test("real assembled question and all published mark ceilings are preserved",()=>{
  expect(paper).toBeDefined();
  expect(paper.marks).toBe(9);
  expect(paper.stem).toContain("$"+f.total.toLocaleString("en-US"));
  expect(paper.stem).toContain(f.ratios.join(" : "));
  expect(paper.parts.map(p=>[p.id,p.marks])).toEqual([
   ["a",3],["b1",2],["b2",2],["c",2]
  ]);
  expect(paper.parts.find(p=>p.id==="a").answer).toBe(f.final);
  expect(paper.parts.find(p=>p.id==="b1").answer).toBe(f.largest.toFixed(2));
  expect(paper.parts.find(p=>p.id==="b2").answer).toBe(f.difference.toFixed(2));
  expect(Number(paper.parts.find(p=>p.id==="c").answer)).toBe(f.newDays);
  expect(paper.parts.find(p=>p.id==="c").prompt).toContain(f.workers+" workers");
  expect(paper.parts.find(p=>p.id==="c").prompt).toContain(f.days+" days");
  expect(paper.parts.find(p=>p.id==="c").prompt).toContain(f.newWorkers+" workers");
  expect(MATH_RATIO_VARIATION_SOURCES_V2[f.id]).toMatchObject({
   total:f.total,parts:f.parts,unit:f.unit,
   workers:f.workers,days:f.days,newWorkers:f.newWorkers,newDays:f.newDays
  });
 });
 test("source numerator, denominator and simplest final give three advisory candidates",()=>{
  const r=check(f,"a",f.final,f.numStep+"\n"+f.denStep);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  expect(r.suggestedMarks).toBe(3);
  expect(r.publishable).toBe(false);
  expect(r.authority).toBe("advisory");
  expect(r.rubricAllocation).toBe("proposed-from-worked-solution");
 });
 test("a bare correct fraction result cannot grant missing numerator and denominator marks",()=>{
  const r=check(f,"a",f.final);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1]);
  expect(r.unresolvedMarks).toBe(2);
  expect(check(f,"a","incorrect",f.numStep).criteria.map(c=>c.candidateMarks))
   .toEqual([1,null,null]);
  expect(check(f,"a","incorrect",f.denStep).criteria.map(c=>c.candidateMarks))
   .toEqual([null,1,null]);
 });
 test("source alternate common-denominator work is accepted",()=>{
  const work=f.id.endsWith("v9")
   ?"15/4-6/4=9/4;9/24-4/24=5/24"
   :"36/15+20/15=56/15;21/30-5/30=8/15";
  expect(check(f,"a",f.final,work).suggestedMarks).toBe(3);
 });
 test("bare intermediate numbers or copied final cannot fabricate method marks",()=>{
  const w=f.id.endsWith("v9")?"9/4;5/24;54/5":"56/15;8/15;7";
  expect(check(f,"a",f.final,w).criteria.map(c=>c.candidateMarks))
   .toEqual([null,null,1]);
 });
 test("simplest form is mandatory; unreduced and competing fractions fail closed",()=>{
  const bad=f.id.endsWith("v9")?["108/10","270/25","10.80","54/0","54/5 or 11"]
   :["14/2","21/3","7/1 or 7","7.0","7/0"];
  for(const answer of bad)expect(check(f,"a",answer).criteria[2].candidateMarks).toBeNull();
 });
 test("source-published alternative fraction results are preserved exactly",()=>{
  if(f.id.endsWith("v9")){
   for(const answer of ["54/5","10 4/5","10.8"]){
    expect(check(f,"a",answer).criteria[2].candidateMarks).toBe(1);
   }
  }else{
   for(const answer of ["7","7/1"]){
    expect(check(f,"a",answer).criteria[2].candidateMarks).toBe(1);
   }
  }
 });
 test("largest share: ratio-parts method and source amount receive two candidates",()=>{
  const work=f.ratios.join("+")+"="+f.parts+";"+
   f.total+"/"+f.parts+"="+f.unit+";"+f.ratios[2]+"*"+f.unit+"="+f.largest;
  const r=check(f,"b1","$"+f.largest.toLocaleString("en-US",{minimumFractionDigits:2}),work);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(r.suggestedMarks).toBe(2);
 });
 test("ratio amount alone is only accuracy evidence and does not invent workings",()=>{
  const r=check(f,"b1",String(f.largest));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
  expect(check(f,"b1",String(f.largest+100),f.total+"/"+f.parts)
   .criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
 });
 test("equivalent direct fraction-of-whole method is accepted",()=>{
  const work=f.total+"*("+f.ratios[2]+"/"+f.parts+")="+f.largest;
  expect(check(f,"b1",String(f.largest),work).suggestedMarks).toBe(2);
 });
 test("difference: correct source subtraction gives two candidates",()=>{
  const work=f.largest+"-"+f.smallest+"="+f.difference;
  const r=check(f,"b2","$"+f.difference.toFixed(2),work);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
 });
 test("ratio-parts difference is an alternative valid subtraction method",()=>{
  const work=(f.ratios[2]-f.ratios[0])+"*"+f.unit+"="+f.difference;
  expect(check(f,"b2",String(f.difference),work).suggestedMarks).toBe(2);
 });
 test("a correct difference alone cannot invent subtraction method credit",()=>{
  expect(check(f,"b2",String(f.difference)).criteria.map(c=>c.candidateMarks))
   .toEqual([null,1]);
 });
 test("incorrect prior largest share permits consistent follow-through only when worked",()=>{
  const prior=f.differentLargest;
  const resultingDifference=prior-f.smallest;
  const prev={b1:{answer:String(prior)}};
  const work=prior+"-"+f.smallest+"="+resultingDifference;
  const r=check(f,"b2",String(resultingDifference),work,prev);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(r.criteria[1].reason).toBe("verified-previous-largest-share-follow-through");
  expect(r.publishable).toBe(false);
  expect(check(f,"b2",String(resultingDifference),"",prev)
   .criteria[1].candidateMarks).toBeNull();
  expect(check(f,"b2",String(resultingDifference),work)
   .criteria[1].candidateMarks).toBeNull();
 });
 test("ambiguous, missing or invalid prior values do not create follow-through",()=>{
  const prior=f.differentLargest,expected=prior-f.smallest;
  const work=prior+"-"+f.smallest+"="+expected;
  for(const bad of ["wrong",prior+" or "+f.largest,"-"+prior,"9999999999"]){
   const r=check(f,"b2",String(expected),work,{b1:{answer:bad}});
   expect(r.criteria[1].candidateMarks).toBeNull();
  }
 });
 test("inverse proportion: constant worker-days calculation earns method and result",()=>{
  const effort=f.workers*f.days;
  const work=f.workers+" × "+f.days+" = "+effort+" worker-days\n"
    +effort+" ÷ "+f.newWorkers+" = "+f.newDays+" days";
  for(const answer of [String(f.newDays),f.newDays+" days",f.newDays+".0 d"]){
   const r=check(f,"c",answer,work);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
   expect(r.publishable).toBe(false);
  }
 });
 test("direct inverse-proportion formula is also a valid method",()=>{
  const work="("+f.workers+"*"+f.days+")/"+f.newWorkers+"="+f.newDays;
  expect(check(f,"c",f.newDays+" days",work).suggestedMarks).toBe(2);
 });
 test("the right days without a method is only one candidate",()=>{
  const r=check(f,"c",String(f.newDays));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
  expect(r.unresolvedMarks).toBe(1);
 });
 test("wrong numerical answer with correct inverse setup keeps method evidence",()=>{
  const work=f.workers+"*"+f.days+"=incorrect";
  const r=check(f,"c",String(f.newDays+3),work);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
 });
 test("direct-proportion errors and wrong quantities cannot be awarded",()=>{
  const invalid=f.days+"*"+f.newWorkers+"/"+f.workers;
  expect(check(f,"c",String(f.newDays),invalid).criteria.map(c=>c.candidateMarks))
   .toEqual([null,1]);
  for(const answer of [f.newDays+" workers",f.newDays+" or "+(f.newDays+1),
   "-"+f.newDays,"Infinity",String(f.newDays+1)]){
   expect(check(f,"c",answer).criteria[1].candidateMarks).toBeNull();
  }
 });
 test("empty response preserves unresolved marks and cannot publish",()=>{
  for(const part of paper.parts){
   const result=check(f,part.id);
   expect(result.suggestedMarks).toBe(0);
   expect(result.unresolvedMarks).toBe(part.marks);
   expect(result.criteria.reduce((s,c)=>s+c.maxMarks,0)).toBe(part.marks);
   expect(result.publishable).toBe(false);
  }
 });
});
test("checker fails closed for unsupported paper and part identities",()=>{
 for(const [questionId,partId] of [
  ["p2-q1-v1","c"],["p2-q1-v11","c"],["p2-q1-v9","d"],
  ["P2-HISTORICAL-2019","c"]
 ]){
  expect(()=>examine({questionId,partId,response:{answer:"10"}}))
   .toThrow(/Uncalibrated/);
 }
});
