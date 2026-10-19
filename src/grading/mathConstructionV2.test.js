import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathConstructionV2 as grade,MATH_CONSTRUCTION_SOURCES_V2} from "./mathConstructionV2";

describe.each(["p2-q3-v9","p2-q3-v10"])("Mathematics construction calibration %s",id=>{
 const source=MATH_CONSTRUCTION_SOURCES_V2[id];
 const question=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
 const result=(partId,answer="",working="")=>grade({questionId:id,partId,response:{answer,working}});
 test("preserves source-specific part allocations and advisory-only publication",()=>{
  expect(question).toBeDefined();
  expect(question.parts.map(p=>p.marks)).toEqual([4,2,3]);
  for(const p of question.parts){
   const r=result(p.id);
   expect(r.criteria.reduce((sum,c)=>sum+c.maxMarks,0)).toBe(p.marks);
   expect(r.suggestedMarks+r.unresolvedMarks).toBe(p.marks);
   expect(r.authority).toBe("advisory");
   expect(r.publishable).toBe(false);
  }
 });
 test("construction requires actual drawn arc and geometric evidence",()=>{
  expect(result("a","A perfect triangle").suggestedMarks).toBe(0);
  expect(result("a","8 cm, 6 cm, 60 degrees").unresolvedMarks).toBe(4);
 });
 test("one-decimal measured side is source-specific",()=>{
  expect(result("b",String(source.side)+" cm").criteria.map(c=>c.candidateMarks))
   .toEqual([null,1]);
  expect(result("b",String(source.side+1)).suggestedMarks).toBe(0);
  expect(result("b",source.side+" or "+(source.side+1)).suggestedMarks).toBe(0);
 });
 test("incorrect included angle never earns substitution evidence",()=>{
  const incorrect=source.angle===90
   ? "area=1/2*base*height;1/2*9*5*sin60="+source.area
   : "area=1/2*base*height;1/2*8*6="+source.area;
  const marks=result("c",String(source.area),incorrect).criteria.map(c=>c.candidateMarks);
  expect(marks).toEqual([1,null,1]);
 });
 test("source-grounded triangle area recognises separate evidenced marks",()=>{
  const work=source.angle===90
   ? "area=1/2*base*height;1/2*9*5="+source.area
   : "area=1/2*base*height;1/2*8*6*sin60="+source.area;
  expect(result("c",String(source.area)+" cm^2",work)
   .criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  expect(result("c",String(source.area)).criteria.map(c=>c.candidateMarks))
   .toEqual([null,null,1]);
  expect(result("c","20.8 or 22.5",work).criteria[2].candidateMarks).toBeNull();
 });
});
test("unknown construction template is not approved",()=>{
 expect(()=>grade({questionId:"p2-q3-v8",partId:"a"})).toThrow(/Uncalibrated/);
});
