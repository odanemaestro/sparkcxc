import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathRelationsV2 as grade} from "./mathRelationsV2";

const cases=[
 {id:"p2-q4-v9",domain:[-2,-1,0,1,2],
  outputs:[-5,-3,-1,1,3],range:[-5,-3,-1,1,3],
  body:"f(x) = 2x - 1",outside:5},
 {id:"p2-q4-v10",domain:[-1,0,1,2,3],
  outputs:[7,4,1,-2,-5],range:[-5,-2,1,4,7],
  body:"f(x) = -3x + 4",outside:5}
];
const check=(f,partId,answer)=>grade({questionId:f.id,partId,response:{answer}});
const labelled=(f,indices=[0,1,2,3,4])=>indices.map(i=>
 "f("+f.domain[i]+") = "+f.outputs[i]).join("; ");
describe.each(cases)("source-calibrated Mathematics Paper 2 finite relations",f=>{
 const paper=PAPER2_QUESTION_BANK.find(q=>q.question_id===f.id);
 test("assembled source maintains 3/2/2/2 and authored one-to-one claim/reason",()=>{
  expect(paper).toBeDefined();
  expect(paper.marks).toBe(9);
  expect(paper.parts.map(part=>[part.id,part.marks]))
   .toEqual([["a",3],["b",2],["c",2],["d",2]]);
  expect(paper.stem).toContain(f.body);
  expect(paper.parts[0].answer.replace(/\s+/g,"")).toBe(f.outputs.join(","));
  expect(paper.parts[1].answer).toMatch(/[{}]/);
  expect(paper.parts[2].answer).toMatch(/not in the domain/i);
  const d=paper.parts[3];
  expect(d.criteria.map(c=>[c.code,c.marks])).toEqual([["B1",1],["B2",1]]);
  expect(d.answer).toMatch(/different/i);
 });
 test("ordered table recognises complete comma, space and bracketed rows",()=>{
  for(const answer of [
   f.outputs.join(", "),
   f.outputs.join(" "),
   "["+f.outputs.join(",")+"]",
   "Table: "+f.outputs.join(", "),
   labelled(f)
  ]){
   const r=check(f,"a",answer);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
   expect(r.suggestedMarks).toBe(3);
   expect(r.publishable).toBe(false);
  }
 });
 test("table labelled f(x) outputs can be given in any order",()=>{
  const order=[4,2,0,3,1];
  const r=check(f,"a",labelled(f,order));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
 });
 test("supported visible table segments receive only their provisional marks",()=>{
  const first=check(f,"a",labelled(f,[0,1]));
  expect(first.criteria.map(c=>c.candidateMarks)).toEqual([1,null,null]);
  const middle=check(f,"a",labelled(f,[2,3]));
  expect(middle.criteria.map(c=>c.candidateMarks)).toEqual([null,1,null]);
  const last=check(f,"a",labelled(f,[4]));
  expect(last.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1]);
 });
 test("an unlabelled incomplete table is ambiguous about input positions",()=>{
  const r=check(f,"a",f.outputs.slice(0,3).join(","));
  expect(r.suggestedMarks).toBe(0);
  expect(r.unresolvedMarks).toBe(3);
 });
 test("table rejects duplicated mapping inputs, unsupported x and ambiguous alternatives",()=>{
  for(const answer of [
   labelled(f,[0,0,2,3,4]),
   "f(999)=3; "+labelled(f),
   f.outputs.join(",")+" or "+f.outputs.slice().reverse().join(","),
   "x=2 -> "+f.outputs[4],
   f.outputs.join(",")+" and "+f.outputs[0]
  ])expect(check(f,"a",answer).suggestedMarks).toBe(0);
 });
 test("incorrect table value can retain evidence from other, correctly mapped positions",()=>{
  const wrong=f.outputs.slice();
  wrong[0]+=2;
  const r=check(f,"a",wrong.join(", "));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1,1]);
 });
 test("range order is immaterial for set membership and duplicate-free answers",()=>{
  const variants=[
   "{"+f.range.join(", ")+"}",
   "{"+f.range.slice().reverse().join(", ")+"}",
   "range = {"+f.range.slice().reverse().join(", ")+"}",
   f.range.join(" "),
   f.range.slice().reverse().join(",")
  ];
  for(const answer of variants){
   const r=check(f,"b",answer);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
   expect(r.publishable).toBe(false);
  }
 });
 test("valid distinct subset earns proposed partial range credit only",()=>{
  const r=check(f,"b","{"+f.range.slice(0,3).join(",")+"}");
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
  expect(r.rubricAllocation).toBe("proposed-from-worked-solution");
 });
 test("wrong, repeated or extraneous range elements never create automatic credit",()=>{
  for(const answer of [
   "{"+f.range.slice(0,4).join(",")+",999}",
   "{"+f.range[0]+","+f.range[0]+","+f.range.slice(1).join(",")+"}",
   "{"+f.range.slice(0,2).join(",")+"}",
   "{"+f.range.join(",")+"} or {0}",
   "{"+f.range.join(",")
  ])expect(check(f,"b",answer).suggestedMarks).toBe(0);
 });
 test("x=5 and a stated exclusion each satisfy their separate rubric criterion",()=>{
  for(const answer of [
   "x = 5; not in the domain",
   "x=5 because it is outside the given domain",
   "5; not a member of the domain",
   "x = 5; 5 ∉ D"
  ]){
   const r=check(f,"c",answer);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  }
 });
 test("source explicitly accepts x=5 alone, but it does not imply membership mark",()=>{
  for(const answer of ["5","x=5"]){
   const r=check(f,"c",answer);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
  }
  expect(check(f,"c","not in domain").criteria.map(c=>c.candidateMarks))
   .toEqual([null,1]);
 });
 test("incorrect preimages or a contradictory domain statement never become full credit",()=>{
  expect(check(f,"c","x = 4; not in domain").criteria.map(c=>c.candidateMarks))
   .toEqual([null,1]);
  expect(check(f,"c","x = 5; is in the domain").criteria.map(c=>c.candidateMarks))
   .toEqual([1,null]);
  for(const answer of ["x = 5 or x = 4","x = 5; x = 4","x = Infinity"]){
   expect(check(f,"c",answer).criteria[0].candidateMarks).toBeNull();
  }
 });
 test("one-to-one conclusion and a valid distinct-output reason are independent",()=>{
  for(const answer of [
   "Yes, one-to-one, because every x gives a different output.",
   "The relation is one to one because the gradient is non-zero.",
   "Yes, no two domain values give the same output.",
   "One-to-one because the outputs are all distinct."
  ]){
   const r=check(f,"d",answer);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
   expect(r.rubricAllocation).toBe("authored");
  }
 });
 test("an unsupported conclusion does not automatically receive an explanation mark",()=>{
  expect(check(f,"d","yes").criteria.map(c=>c.candidateMarks))
   .toEqual([1,null]);
  expect(check(f,"d","one to one because f is linear").criteria.map(c=>c.candidateMarks))
   .toEqual([1,null]);
  expect(check(f,"d","Different outputs for each input").criteria.map(c=>c.candidateMarks))
   .toEqual([null,1]);
 });
 test("negated or contradictory injectivity statements fail closed",()=>{
  for(const answer of [
   "Not one to one because there are many-to-one mappings",
   "Yes, one to one because two distinct inputs have the same output.",
   "No, not injective because the outputs repeat.",
   "Yes, many-to-one because the slope is non-zero."
  ])expect(check(f,"d",answer).suggestedMarks).toBe(0);
 });
 test("every new relation candidate stays bounded and never publishable",()=>{
  for(const part of paper.parts){
   const result=check(f,part.id,"");
   expect(result.criteria.reduce((s,c)=>s+c.maxMarks,0)).toBe(part.marks);
   expect(result.suggestedMarks+result.unresolvedMarks).toBe(part.marks);
   expect(result.authority).toBe("advisory");
   expect(result.publishable).toBe(false);
  }
 });
});
test("unapproved relation, unrelated part and historical paper IDs are rejected",()=>{
 for(const args of [
  {questionId:"p2-q4-v8",partId:"a"},
  {questionId:"p2-q4-v9",partId:"e"},
  {questionId:"p2-q4-v11",partId:"d"},
  {questionId:"P2-2019-JUN-Q4",partId:"b"}
 ]){
  expect(()=>grade({...args,response:{answer:"yes"}})).toThrow(/Unsupported/);
 }
});


describe.each(cases)("authored relation-reason working-field safeguards",f=>{
 test("a conclusion in the answer and a valid reason in working earn separate candidates",()=>{
  const r=grade({questionId:f.id,partId:"d",
   response:{answer:"Yes, one-to-one",working:"The gradient is non-zero, so every x gives a different output."}});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(r.rubricAllocation).toBe("authored");
  expect(r.publishable).toBe(false);
 });
 test("reason in working without a one-to-one claim earns only explanation evidence",()=>{
  const r=grade({questionId:f.id,partId:"d",
   response:{answer:"",working:"Different outputs for each input."}});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
 });
 test("claims about repeated outputs cannot count as evidence of injectivity",()=>{
  const r=grade({questionId:f.id,partId:"d",
   response:{answer:"Yes",working:"There are repeated outputs."}});
  expect(r.criteria[1].candidateMarks).toBeNull();
 });
 test("contradictory working prevents a purportedly correct injectivity statement",()=>{
  const r=grade({questionId:f.id,partId:"d",
   response:{answer:"Yes, one-to-one",working:"Two distinct inputs have the same output."}});
  expect(r.suggestedMarks).toBe(0);
  expect(r.publishable).toBe(false);
 });
});
