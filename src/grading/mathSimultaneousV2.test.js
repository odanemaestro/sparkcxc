import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathSimultaneousV2 as mark} from "./mathSimultaneousV2";
const cases=[
 {id:"p2-q2-v9",equations:"3x+2y=32;5x+4y=58",
  scaled:"6x+4y=64",x:6,y:7,total:71,swapped:"y=7,x=6",labelled:"notebook $6, pen $7"},
 {id:"p2-q2-v10",equations:"4x+3y=41;2x+5y=45",
  scaled:"8x+6y=82",x:5,y:7,total:65,swapped:"y=7,x=5",labelled:"cup $5, plate $7"}
];
describe.each(cases)("Math Paper 2 simultaneous equations and dependent calculation",fixture=>{
 const evaluate=(partId,response,previousResponses={})=>mark({
  questionId:fixture.id,partId,response,previousResponses
 });
 test("real bank preserves two equation marks, five solution marks and two total marks",()=>{
  const q=PAPER2_QUESTION_BANK.find(x=>x.question_id===fixture.id);
  expect(q).toBeDefined();
  expect(q.parts.map(p=>[p.id,p.marks])).toEqual([["a",2],["b",5],["c",2]]);
  expect(q.parts.find(p=>p.id==="a").solution).toMatch(/first purchase/i);
  expect(q.parts.find(p=>p.id==="b").solution).toMatch(/eliminat/i);
  expect(q.parts.find(p=>p.id==="c").answer).toBe(String(fixture.total));
 });
 test("reordered and scaled source-equivalent equations receive separate advisory marks",()=>{
  for(const answer of [
   fixture.equations,
   fixture.equations.split(";").reverse().join("\n"),
   fixture.scaled+";"+fixture.equations.split(";")[1]
  ]){
   const r=evaluate("a",{answer});
   expect(r.criteria.map(x=>x.candidateMarks)).toEqual([1,1]);
   expect(r.publishable).toBe(false);
  }
 });
 test("one valid equation cannot claim marks for a missing second equation",()=>{
  const r=evaluate("a",{answer:fixture.equations.split(";")[0]});
  expect(r.suggestedMarks).toBe(1);
  expect(r.unresolvedMarks).toBe(1);
 });
 test("repeating one equation does not satisfy two different source equations",()=>{
  const one=fixture.equations.split(";")[0];
  const r=evaluate("a",{answer:one+";"+one});
  expect(r.suggestedMarks).toBe(1);
 });
 test("wrong coefficient or empty equations cannot receive canonical credit",()=>{
  const r=evaluate("a",{answer:"x+y=20;2x+2y=40"});
  expect(r.suggestedMarks).toBe(0);
  expect(evaluate("a",{answer:""}).unresolvedMarks).toBe(2);
 });
 test("correct labelled, reversed or ordered solutions support only two of five marks",()=>{
  for(const answer of [
   "x="+fixture.x+",y="+fixture.y,
   fixture.swapped,fixture.labelled,
   "("+fixture.x+", "+fixture.y+")",
   fixture.x+", "+fixture.y
  ]){
   const r=evaluate("b",{answer});
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,null]);
   expect(r.suggestedMarks).toBe(2);
   expect(r.unresolvedMarks).toBe(3);
   expect(r.publishable).toBe(false);
  }
 });
 test("valid one-coordinate work is never promoted into full solution marks",()=>{
  const r=evaluate("b",{answer:"x="+fixture.x+",y=200"});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,null,null]);
  expect(r.unresolvedMarks).toBe(4);
 });
 test("ambiguous pair or explanatory prose without final pair stays unresolved",()=>{
  for(const answer of [
   "x="+fixture.x+" or 9,y=7",
   "x="+fixture.x+" and y="+fixture.y+" maybe",
   "solving gives "+fixture.x+" and "+fixture.y,
   "",
   "x="+fixture.x+",y=7; x=3,y=7"
  ])expect(evaluate("b",{answer}).suggestedMarks).toBe(0);
 });
 test("canonical total and explicit item-wise working give two advisory marks",()=>{
  const r=evaluate("c",{answer:"$"+fixture.total,
   working:"6("+fixture.x+") + 5("+fixture.y+") = "+fixture.total});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
 });
 test("correct final total by itself does not invent method marks",()=>{
  const r=evaluate("c",{answer:String(fixture.total)});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
 });
 test("valid follow-through from earlier wrong prices preserves calculation credit",()=>{
  const earlier={answer:"x=8,y=9"};
  const target=6*8+5*9;
  const r=evaluate("c",{answer:String(target),working:"6(8)+5(9)="+target},{b:earlier});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(r.criteria[1].reason).toBe("supported-follow-through");
  expect(r.publishable).toBe(false);
 });
 test("missing or competing earlier prices cannot authorise follow-through",()=>{
  const r=evaluate("c",{answer:"93",working:"6(8)+5(9)=93"},
   {b:{answer:"8 or 6, 9"}});
  expect(r.criteria[1].candidateMarks).toBeNull();
 });
 test("a wrong final and bogus method never earn advisory credit",()=>{
  const r=evaluate("c",{answer:"0",working:"6+5"});
  expect(r.suggestedMarks).toBe(0);
 });
});
test("source-gating rejects Mathematics parts outside the calibrated originals",()=>{
 for(const bad of [{questionId:"p2-q2-v1",partId:"b"},
  {questionId:"p2-q2-v9",partId:"b1"},
  {questionId:"p2-q2-v11",partId:"a"}]){
  expect(()=>mark({...bad,response:{answer:"x=6,y=7"}})).toThrow(/Uncalibrated/);
 }
});
