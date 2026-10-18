import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathExactFractionsV2 as mark} from "./mathExactFractionsV2";
const part=PAPER2_QUESTION_BANK.find(q=>q.question_id==="p2-q1-v1").parts.find(p=>p.id==="a");
const check=(answer,working="")=>mark({response:{answer,working}});
const numerator="7/3 + 7/4 = 49/12";
const denominator="5/6 - 1/4 = 7/12";

test("authored source asks for an exact lowest-terms answer with three marks",()=>{
 expect(part.marks).toBe(3);
 expect(part.answer).toBe("7");
 expect(part.prompt).toMatch(/EXACT/);
 expect(part.prompt).toMatch(/lowest terms/);
});
test("fully correct computation supplies three advisory candidates",()=>{
 const r=check("7",numerator+"\n"+denominator);
 expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
 expect(r.suggestedMarks).toBe(3);
 expect(r.publishable).toBe(false);
 expect(r.rubricAllocation).toBe("proposed-from-worked-solution");
});
test("equivalent fraction seven over one is accepted as lowest terms",()=>{
 expect(check("7/1").criteria[2].candidateMarks).toBe(1);
});
test("source alternative conversion to common denominators is valid method evidence",()=>{
 const r=check("7","28/12 + 21/12 = 49/12;10/12 - 3/12 = 7/12");
 expect(r.suggestedMarks).toBe(3);
});
test("a correct final alone does not invent numerator or denominator calculations",()=>{
 const r=check("7");
 expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1]);
});
test("an unreduced fraction remains unresolved despite numerical equivalence",()=>{
 for(const answer of ["14/2","49/7","70/10"]){
  const r=check(answer,numerator+"\n"+denominator);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,null]);
 }
});
test("decimal and competing final answers do not qualify as exact simplest form",()=>{
 for(const answer of ["7.0","7 or 8","7/0","-7/-1","7 units"]){
  expect(check(answer).criteria[2].candidateMarks).toBeNull();
 }
});
test("method partial credit does not depend on the final result",()=>{
 const r=check("8",numerator+"\n"+denominator);
 expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,null]);
});
test("floating numerals without calculations cannot claim method credit",()=>{
 const r=check("7","The numbers are 49/12, 7/12, 7/3 and 5/6");
 expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1]);
});
test("false equalities cannot receive method marks",()=>{
 const r=check("7","7/3 + 7/4 = 48/12; 5/6 - 1/4 = 6/12");
 expect(r.criteria[0].candidateMarks).toBeNull();
 expect(r.criteria[1].candidateMarks).toBeNull();
});
test("unsupported question and malformed response fail closed",()=>{
 expect(()=>mark({questionId:"p2-q1-v9",partId:"a",response:{answer:"7"}})).toThrow();
 expect(()=>mark({questionId:"p2-q1-v1",partId:"b1",response:{answer:"7"}})).toThrow();
 expect(check(null).suggestedMarks).toBe(0);
});
