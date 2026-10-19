import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathQ1RemainingV2 as evaluate, MATH_Q1_REMAINING_SOURCES_V2 as SOURCES} from "./mathQ1RemainingV2";

describe.each(Object.keys(SOURCES))("Mathematics Q1 Batch 1 completeness %s",id=>{
 const bank=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
 test("all marks and source answers match the assembled learner bank",()=>{
  expect(bank).toBeDefined();
  expect(bank.question_number).toBe(1);
  expect(bank.marks).toBe(9);
  expect(bank.parts.map(p=>p.id).sort()).toEqual(Object.keys(SOURCES[id]).sort());
  for(const part of bank.parts){
   if(part.id==="a"||(id==="p2-q1-v3"&&part.id==="c"))
    expect(String(part.answer)).toBe(String(SOURCES[id][part.id]));
   else expect(Number(part.answer)).toBe(Number(SOURCES[id][part.id]));
   const empty=evaluate({questionId:id,partId:part.id});
   expect(empty.criteria.reduce((n,c)=>n+c.maxMarks,0)).toBe(part.marks);
   expect(empty.suggestedMarks).toBe(0);
   expect(empty.unresolvedMarks).toBe(part.marks);
   expect(empty.authority).toBe("advisory");
   expect(empty.publishable).toBe(false);
  }
 });
 test("correct source results earn only evidence for final accuracy",()=>{
  for(const part of bank.parts){
   const r=evaluate({questionId:id,partId:part.id,response:{answer:part.answer}});
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual(part.marks===1?[1]:[null,1]);
   expect(r.unresolvedMarks).toBe(part.marks-1);
   expect(r.publishable).toBe(false);
  }
 });
 test("unsupported alternatives and wrong values never earn accuracy",()=>{
  for(const part of bank.parts){
   const contradicted=id==="p2-q1-v3"&&part.id==="c"?"Not "+part.answer:"-"+part.answer;
   for(const a of ["", "not sure", part.answer+" or 999", contradicted, "Infinity"]){
    expect(evaluate({questionId:id,partId:part.id,response:a}).suggestedMarks).toBe(0);
   }
  }
 });
});
test("exact fraction evidence accepts mixed numbers but rejects rounded decimals",()=>{
 expect(evaluate({questionId:"p2-q1-v7",partId:"a",response:"3 1/2"}).suggestedMarks).toBe(1);
 expect(evaluate({questionId:"p2-q1-v7",partId:"a",response:"3.5"}).suggestedMarks).toBe(0);
 expect(evaluate({questionId:"p2-q1-v2",partId:"a",response:"18/10"}).suggestedMarks).toBe(0);
});
test("source identity is mandatory",()=>{
 expect(()=>evaluate({questionId:"p2-q1-v9",partId:"a",response:"54/5"})).toThrow(/Uncalibrated/);
 expect(()=>evaluate({questionId:"p2-q1-v2",partId:"missing"})).toThrow(/Uncalibrated/);
});

test("Q1 R2 hire purchase explanation recognises genuinely equivalent reasons",()=>{
 const id="p2-q1-v3",partId="c";
 const valid=[
  "The hire purchase price is larger than the cash price, so the same difference is a smaller fraction of it",
  "The difference stays the same. Since the hire purchase price is greater than the cash price, it gives a lower percentage.",
  "The same increase is a smaller percentage of the higher hire purchase price than of the cash price.",
  "A larger hire purchase price is the base instead of the cash price, so the unchanged difference becomes a smaller fraction."
 ];
 for(const answer of valid){
  const r=evaluate({questionId:id,partId,response:{answer}});
  expect(r.suggestedMarks).toBe(1);
  expect(r.criteria[0].candidateMarks).toBe(1);
  expect(r.publishable).toBe(false);
 }
});
test("Q1 R2 rejects reversed, vague and contradictory hire purchase explanations",()=>{
 for(const answer of [
  "It is just a smaller percentage",
  "The cash price is greater than the hire purchase price, so the percentage is lower",
  "The hire purchase price is larger than the cash price so the percentage is higher",
  "The hire purchase price is larger than the cash price, but the same difference remains the same percentage",
  "The same difference as a fraction of the lower cash price is smaller",
  "The larger hire purchase price and cash price are both used but I am not sure",
  "Because the hire purchase price is larger or smaller than the cash price"
 ]){
  const r=evaluate({questionId:"p2-q1-v3",partId:"c",response:{answer}});
  expect(r.suggestedMarks).toBe(0);
  expect(r.publishable).toBe(false);
 }
});

test("Q1 R2 explanation formatting can use a natural bullet without changing meaning",()=>{
 const explanation="The hire purchase price is larger than the cash price, so the same difference is a smaller fraction of it";
 const r=evaluate({questionId:"p2-q1-v3",partId:"c",response:"- "+explanation});
 expect(r.suggestedMarks).toBe(1);
 expect(r.publishable).toBe(false);
});
