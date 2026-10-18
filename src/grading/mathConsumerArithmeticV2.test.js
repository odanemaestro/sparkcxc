import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathConsumerArithmeticV2 as examine} from "./mathConsumerArithmeticV2";
import {mapMathematicsPaper2} from "./paper2RemainingAdaptersV2";

const source=PAPER2_QUESTION_BANK.find(q=>q.question_id==="p2-q1-v1");
const b1={answer:"3500",working:"Cost = 4500 x 100 / 125 = 3500"};
const b2={answer:"4900",working:"Using my cost 3500 x 1.4 = 4900"};
const b3={answer:"8.89%",working:"Increase = 4900 - 4500 = 400. 400 / 4500 x 100 = 8.89"};
const mark=(partId,response,previousResponses)=>examine({
 questionId:source.question_id,partId,response,previousResponses
});
test("original source paper has two marks each for the three chained parts",()=>{
 expect(source).toBeDefined();
 expect(source.stem).toMatch(/4,500.*25%/);
 expect(source.parts.filter(p=>["b1","b2","b3"].includes(p.id)).map(p=>[p.id,p.marks,p.answer]))
  .toEqual([["b1",2,"3600.00"],["b2",2,"5040.00"],["b3",2,"12"]]);
 expect(source.parts.find(p=>p.id==="b3").suffix).toBe("%");
 const mapped=mapMathematicsPaper2({questions:[source],answers:{
  [source.question_id]:{b1,b2,b3}
 }});
 expect(mapped.criteria.filter(c=>["::b1","::b2","::b3"].some(id=>c.id.endsWith(id)))
  .map(c=>c.maxMarks)).toEqual([2,2,2]);
 expect(mapped.responses["p2-q1-v1::b2"]).toEqual(b2);
});
test("original correct consumer arithmetic with working gets two advisory marks per part",()=>{
 for(const [id,response,earlier] of [
  ["b1",{answer:"$3,600.00",working:"4500 / 1.25 = 3600"},{}],
  ["b2",{answer:"$5,040",working:"3600 x 140/100 = 5040"},{b1:{answer:"3600"}}],
  ["b3",{answer:"12%",working:"(5040-4500)/4500 x 100 = 12"},{b2:{answer:"5040"}}]
 ]){
  const result=mark(id,response,earlier);
  expect(result.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(result.publishable).toBe(false);
  expect(result.authority).toBe("advisory");
 }
});
test("correct final only supplies accuracy candidate without invented working",()=>{
 for(const [partId,answer,prev] of [
  ["b1","3600",{}],["b2","5040",{}],["b3","12%",{}]
 ]){
  const result=mark(partId,{answer},prev);
  expect(result.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
  expect(result.unresolvedMarks).toBe(1);
 }
});
test("valid inverse-profit method retains M1 with wrong cost price",()=>{
 const r=mark("b1",b1,{});
 expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
});
test("wrong cost price can be followed through to new selling price",()=>{
 const r=mark("b2",b2,{b1});
 expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
 expect(r.criteria[1].reason).toBe("verified-earlier-cost-follow-through");
});
test("correct new price does not require previous cost to be correct",()=>{
 const r=mark("b2",{answer:"5040",working:"3600 x 1.4 = 5040"},{b1});
 expect(r.suggestedMarks).toBe(2);
});
test("correct calculation following earlier erroneous price gets percentage credit",()=>{
 const r=mark("b3",b3,{b2});
 expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
 expect(r.criteria[1].reason).toBe("verified-earlier-price-follow-through");
});
test("method steps earn one candidate mark even when arithmetic answer is incorrect",()=>{
 for(const [id,response,earlier] of [
  ["b2",{answer:"4000",working:"3500 x 1.4 = 4000"},{b1}],
  ["b3",{answer:"7%",working:"(4900-4500)/4500 x 100 = 7"},{b2}]
 ]){
  const r=mark(id,response,earlier);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
 }
});
test("copying prior result without correct transformation cannot claim method mark",()=>{
 expect(mark("b2",{answer:"4900",working:"My cost was 3500"},{b1}).criteria[0].candidateMarks).toBeNull();
 expect(mark("b3",{answer:"8.89",working:"4900"},{b2}).criteria[0].candidateMarks).toBeNull();
});
test("unverified or contradictory prior answers do not authorise ECF",()=>{
 for(const earlier of [
  {answer:"3500 or 3600"},{answer:"-3500"},{answer:"wrong"},{answer:"4900"}
 ]){
  const r=mark("b2",b2,{b1:earlier});
  expect(r.criteria[1].candidateMarks).toBeNull();
 }
 for(const earlier of [{answer:"4900 or 5040"},{answer:"eight thousand"},{answer:"-4900"}]){
  expect(mark("b3",b3,{b2:earlier}).criteria[1].candidateMarks).toBeNull();
 }
});
test("invalid finals and unrelated numbers cannot produce candidate accuracy",()=>{
 for(const [id,answer,earlier] of [
  ["b1","3600 or 3500",{}],["b1","$3600 USD",{}],
  ["b2","4900 and 5040",{b1}],["b3","8.89 dollars",{b2}],
  ["b3","12% or 8.89%",{b2}],["b3","Infinity",{b2}]
 ]){
  expect(mark(id,{answer},earlier).criteria[1].candidateMarks).toBeNull();
 }
});
test("incorrect arithmetic formulas, even with canonical finals, do not earn method",()=>{
 expect(mark("b1",{answer:"3600",working:"4500-25%=3600"}).criteria[0].candidateMarks).toBeNull();
 expect(mark("b2",{answer:"5040",working:"3600+40=5040"}).criteria[0].candidateMarks).toBeNull();
 expect(mark("b3",{answer:"12%",working:"540/5040x100"}).criteria[0].candidateMarks).toBeNull();
});
test("every part is capped, and unknown source and question IDs fail closed",()=>{
 for(const id of ["b1","b2","b3"]){
  const r=mark(id,{answer:""},{});
  expect(r.suggestedMarks).toBe(0);
  expect(r.unresolvedMarks).toBe(2);
  expect(r.criteria.reduce((s,c)=>s+c.maxMarks,0)).toBe(2);
  expect(r.publishable).toBe(false);
 }
 expect(()=>examine({questionId:"p2-q1-v7",partId:"b2",
  response:{answer:"5040"}})).toThrow(/Uncalibrated/);
 expect(()=>examine({questionId:"p2-q1-v1",partId:"a",
  response:{answer:"7"}})).toThrow(/Uncalibrated/);
});


test("separate arithmetic sentences or lines are not mistaken for decimals",()=>{
 const examples=[
  "Increase = 4900 - 4500 = 400. 400 / 4500 x 100 = 8.89",
  "Increase = 4900 - 4500 = 400\n400 / 4500 x 100 = 8.89",
  "4900-4500=400;400/4500x100=8.89"
 ];
 for(const working of examples){
  const r=mark("b3",{answer:"8.89",working},{b2});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
 }
});
test("incorrect operation or a written decimal does not masquerade as two-step working",()=>{
 const wrong=mark("b1",{answer:"3600",working:"4500 / 100 / 125 = 3600"});
 expect(wrong.criteria[0].candidateMarks).toBeNull();
 const falseSeparator=mark("b3",{answer:"8.89%",
  working:"4900-4500=400.400/4500x100=8.89"},{b2});
 expect(falseSeparator.criteria[0].candidateMarks).toBeNull();
});
