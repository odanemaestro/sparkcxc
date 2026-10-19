import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {MATH_Q5_SOURCES_V2 as SOURCES,evaluateMathQ5V2 as grade} from "./mathStatisticsProbabilityV2";

describe.each(Object.keys(SOURCES))("Q5 V2 source calibration %s",id=>{
 const q=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
 test("all four parts align with assembled 9-mark source",()=>{
  expect(q).toBeDefined();
  expect(q.question_number).toBe(5);
  expect(q.marks).toBe(9);
  expect(q.parts.map(p=>p.id)).toEqual(["a","b","c","d"]);
  for(const p of q.parts){
   const [expected,marks]=SOURCES[id][p.id];
   expect(p.marks).toBe(marks);
   if(expected!=="graph"){
    if(/^[\d.]+$/.test(expected))expect(Number(p.answer)).toBe(Number(expected));
    else if(p.answer.includes("/")||/[a-z]/i.test(expected))
     expect(p.answer.replace(/\s+/g,"").toLowerCase()).toBe(expected.replace(/\s+/g,"").toLowerCase());
    else expect(p.answer.replace(/\s/g,"")).toBe(expected);
   }
   const empty=grade({questionId:id,partId:p.id});
   expect(empty.criteria.reduce((sum,c)=>sum+c.maxMarks,0)).toBe(marks);
   expect(empty.suggestedMarks).toBe(0);
   expect(empty.unresolvedMarks).toBe(marks);
   expect(empty.publishable).toBe(false);
  }
 });
 test("supported final values are advisory only, methods stay unresolved",()=>{
  for(const p of q.parts){
   const expected=SOURCES[id][p.id][0];
   const value=expected==="graph"?"A smooth curve through the correct points":p.answer;
   const report=grade({questionId:id,partId:p.id,response:{answer:value}});
   const graphDependent=["p2-q5-v4","p2-q5-v5"].includes(id)&&["b","c","d"].includes(p.id);
   expect(report.suggestedMarks).toBe(graphDependent?0:1);
   expect(report.unresolvedMarks).toBe(p.marks-report.suggestedMarks);
   expect(report.publishable).toBe(false);
  }
 });
 test("competing and incorrect answers cannot claim candidate credit",()=>{
  for(const p of q.parts){
   for(const answer of ["", "incorrect", "3 or 4", p.answer+" or incorrect"]){
    expect(grade({questionId:id,partId:p.id,response:{answer}}).suggestedMarks).toBe(0);
   }
  }
 });
});
test("source-specific exact probabilities accept equivalent simplest fractions only",()=>{
 expect(grade({questionId:"p2-q5-v8",partId:"a",response:"5/12"}).suggestedMarks).toBe(1);
 expect(grade({questionId:"p2-q5-v8",partId:"a",response:"10/24"}).suggestedMarks).toBe(0);
 expect(grade({questionId:"p2-q5-v8",partId:"c",response:"5/33"}).suggestedMarks).toBe(1);
 expect(grade({questionId:"p2-q5-v8",partId:"c",response:"5/33 or 4/33"}).suggestedMarks).toBe(0);
});
test("cumulative frequencies require ordered complete entries",()=>{
 expect(grade({questionId:"p2-q5-v2",partId:"c",response:"5,14,26,35,40"}).suggestedMarks).toBe(1);
 expect(grade({questionId:"p2-q5-v2",partId:"c",response:"40,35,26,14,5"}).suggestedMarks).toBe(0);
 expect(grade({questionId:"p2-q5-v2",partId:"c",response:"5,14,26"}).suggestedMarks).toBe(0);
});
test("graph drawing is never graded from a textual claim",()=>{
 expect(grade({questionId:"p2-q5-v4",partId:"b",response:"drawn"}).unresolvedMarks).toBe(3);
 expect(grade({questionId:"p2-q5-v5",partId:"b",response:"A correct graph"}).publishable).toBe(false);
});
test("reject unknown Q5 paper and part IDs",()=>{
 expect(()=>grade({questionId:"p2-q5-v11",partId:"a"})).toThrow(/Uncalibrated/);
 expect(()=>grade({questionId:"p2-q5-v8",partId:"e"})).toThrow(/Uncalibrated/);
});

test("source-specific working can propose method credit independently of final accuracy",()=>{
 const examples=[
  ["p2-q5-v8","c","5/33","5/12*4/11=5/33"],
  ["p2-q5-v9","c","2/35","4/15*3/14=2/35"],
  ["p2-q5-v8","d","5/44","5/12*3/11=5/44"],
  ["p2-q5-v6","b","70","105/360*240=70"],
  ["p2-q5-v7","a","48","360-(150+90+72)=48"]
 ];
 for(const [questionId,partId,answer,working] of examples){
  const w=working;
  const result=grade({questionId,partId,response:{answer,working:w}});
  expect(result.suggestedMarks).toBe(2);
  expect(result.publishable).toBe(false);
  const wrong=grade({questionId,partId,response:{answer:"incorrect",working:w}});
  expect(wrong.suggestedMarks).toBe(1);
 }
});
test("invented method statements, graph claims and unrelated workings do not create marks",()=>{
 for(const [id,part,working] of [
  ["p2-q5-v8","c","4/15*3/14"],
  ["p2-q5-v9","c","5/12*4/11"],
  ["p2-q5-v6","b","90/360*180"],
  ["p2-q5-v4","b","105/360*240"]
 ]){
  expect(grade({questionId:id,partId:part,response:{answer:"incorrect",working}}).suggestedMarks).toBe(0);
 }
});

test("Q5 mean calculations credit independently evidenced numerator and denominator",()=>{
 for(const [questionId,answer,work] of [
  ["p2-q5-v1","13","520 / 40 = 13"],
  ["p2-q5-v2","13","520/40=13"],
  ["p2-q5-v3","13","442 ÷ 34 = 13"],
  ["p2-q5-v10","17","510/30=17"]
 ]){
  const both=grade({questionId,partId:"b",response:{answer,working:work}});
  expect(both.criteria.map(c=>c.candidateMarks)).toEqual([null,1,1]);
  expect(both.suggestedMarks).toBe(2);
  expect(both.unresolvedMarks).toBe(1);
  expect(both.publishable).toBe(false);
  const methodOnly=grade({questionId,partId:"b",response:{answer:"wrong",working:work}});
  expect(methodOnly.suggestedMarks).toBe(1);
  const answerOnly=grade({questionId,partId:"b",response:{answer}});
  expect(answerOnly.suggestedMarks).toBe(1);
 }
});
test("Q5 cumulative frequency method credit is tied to each source table",()=>{
 for(const [questionId,partId,working,answer] of [
  ["p2-q5-v1","c","4+8=12","4,12,24,40"],
  ["p2-q5-v2","c","5+9=14","5,14,26,35,40"],
  ["p2-q5-v3","c","3+6=9","3,9,25,31,34"],
  ["p2-q5-v4","a","5+13=18","5,18,38,52,60"],
  ["p2-q5-v5","a","4+10=14","4,14,30,52,70,80"],
  ["p2-q5-v10","c","3+3=6","3,6,9,18,30"]
 ]){
  const r=grade({questionId,partId,response:{answer,working}});
  expect(r.suggestedMarks).toBe(2);
  expect(r.publishable).toBe(false);
 }
 expect(grade({questionId:"p2-q5-v1",partId:"c",
  response:{answer:"wrong",working:"5+9=14"}}).suggestedMarks).toBe(0);
});
test("pie sector explanations can be authored with the category and reason",()=>{
 for(const [questionId,category,angle] of [
  ["p2-q5-v6","Car","135"],["p2-q5-v7","Football","150"]
 ]){
  const r=grade({questionId,partId:"c",response:{
   answer:category+" because it has the largest sector angle of "+angle+"°"
  }});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(r.publishable).toBe(false);
  expect(grade({questionId,partId:"c",response:category}).suggestedMarks).toBe(1);
  expect(grade({questionId,partId:"c",response:category+" because it is not the largest at "+angle+" degrees"}).suggestedMarks).toBe(1);
 }
 expect(grade({questionId:"p2-q5-v6",partId:"c",response:{
  answer:"Car because Bus is largest at 135°"
 }}).suggestedMarks).toBe(1);
});
test("graph readings and graph drawing remain completely unresolved without graphical proof",()=>{
 for(const questionId of ["p2-q5-v4","p2-q5-v5"]){
  const q=PAPER2_QUESTION_BANK.find(q=>q.question_id===questionId);
  for(const partId of ["b","c","d"]){
   const p=q.parts.find(x=>x.id===partId);
   for(const response of [
    {answer:p.answer},
    {answer:p.answer,working:"I read it from the graph"},
    {answer:p.answer,graph:{points:[[10.5,5],[20.5,18]]}}
   ]){
    const r=grade({questionId,partId,response});
    expect(r.suggestedMarks).toBe(0);
    expect(r.unresolvedMarks).toBe(p.marks);
    expect(r.publishable).toBe(false);
   }
  }
 }
});
test("probability evidence recognises genuinely equivalent bracketed calculations",()=>{
 const r=grade({questionId:"p2-q5-v8",partId:"c",response:{
  answer:"5/33",working:"P(red then red) = (5/12) × (4/11) = 5/33"
 }});
 expect(r.suggestedMarks).toBe(2);
});
