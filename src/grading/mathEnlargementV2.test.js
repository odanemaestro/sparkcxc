import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathEnlargementV2 as mark,MATH_ENLARGEMENT_SOURCES_V2} from "./mathEnlargementV2";
const examples=[
 {id:"p2-q3-v4",scale:3,base:2,height:3,area:3,imageArea:27},
 {id:"p2-q3-v5",scale:2,base:3,height:2,area:3,imageArea:12},
 {id:"p2-q3-v6",scale:2,base:2,height:3,area:3,imageArea:12}
];
const evaluate=(s,partId,answer="",working="",previousResponses={})=>
 mark({questionId:s.id,partId,response:{answer,working},previousResponses});
describe.each(examples)("Mathematics P2 source Q3 enlargement",spec=>{
 const question=PAPER2_QUESTION_BANK.find(q=>q.question_id===spec.id);
 test("source holds the original nine-mark enlargement and area question",()=>{
  expect(question).toBeDefined();
  expect(question.marks).toBe(9);
  expect(question.parts.map(p=>[p.id,p.marks])).toEqual([["a",3],["b",3],["c",3]]);
  expect(question.parts.find(p=>p.id==="a").answer).toContain("scale factor "+spec.scale);
  expect(Number(question.parts.find(p=>p.id==="b").answer)).toBe(spec.area);
  expect(Number(question.parts.find(p=>p.id==="c").answer)).toBe(spec.imageArea);
  expect(MATH_ENLARGEMENT_SOURCES_V2[spec.id].scale).toBe(spec.scale);
 });
 test("all 3 independent transformation details are recognised",()=>{
  for(const answer of [
   "Enlargement, centre the origin (0,0), with scale factor "+spec.scale,
   "an enlargement center (0, 0) factor "+spec.scale,
   "enlargement about the origin, sf="+spec.scale
  ]){
   const result=evaluate(spec,"a",answer);
   expect(result.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
   expect(result.publishable).toBe(false);
  }
 });
 test("partial description cannot infer absent transformation properties",()=>{
  expect(evaluate(spec,"a","enlargement").criteria.map(c=>c.candidateMarks)).toEqual([1,null,null]);
  expect(evaluate(spec,"a","centre the origin").criteria.map(c=>c.candidateMarks)).toEqual([null,1,null]);
  expect(evaluate(spec,"a","scale factor "+spec.scale).criteria.map(c=>c.candidateMarks)).toEqual([null,null,1]);
 });
 test("conflicting transformation types and wrong scale factors are not counted",()=>{
  const r=evaluate(spec,"a","reflection and enlargement, centre origin, scale factor "+spec.scale);
  expect(r.suggestedMarks).toBe(0);
  expect(evaluate(spec,"a","enlargement, centre origin, scale factor "+(spec.scale+1))
   .criteria[2].candidateMarks).toBeNull();
  expect(evaluate(spec,"a","not an enlargement, centre origin, scale factor "+spec.scale)
   .suggestedMarks).toBe(0);
 });
 test("area formula and authentic base-height substitution receive separate candidates",()=>{
  const work="area=1/2*base*height;1/2*"+spec.base+"*"+spec.height+"=3";
  const r=evaluate(spec,"b","3 square units",work);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  expect(r.rubricAllocation).toBe("proposed-from-worked-solution");
 });
 test("formula-only, substitution-only and bare final get only evidenced marks",()=>{
  expect(evaluate(spec,"b","0","area=1/2*base*height").criteria.map(c=>c.candidateMarks)).toEqual([1,null,null]);
  expect(evaluate(spec,"b","0","1/2*"+spec.base+"*"+spec.height).criteria.map(c=>c.candidateMarks)).toEqual([null,1,null]);
  expect(evaluate(spec,"b","3").criteria.map(c=>c.candidateMarks)).toEqual([null,null,1]);
 });
 test("other geometrical quantities cannot create numerical accuracy marks",()=>{
  for(const x of ["4","3 or 4","3 cubic units","3.1","unanswered"]){
   expect(evaluate(spec,"b",x).criteria[2].candidateMarks).toBeNull();
  }
 });
 test("squared scale, actual multiplication and answer earn three candidates",()=>{
  const sq=spec.scale**2;
  const work=spec.scale+"^2;"+sq+"*3="+spec.imageArea;
  const r=evaluate(spec,"c",String(spec.imageArea)+" square units",work);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  expect(r.publishable).toBe(false);
 });
 test("the object-area follow-through must be written and match the earlier answer",()=>{
  const wrong=5,wrongImage=wrong*spec.scale**2;
  const work=spec.scale+"^2;"+spec.scale+"^2*"+wrong+"="+wrongImage;
  const prev={b:{answer:String(wrong)}};
  const r=evaluate(spec,"c",String(wrongImage),work,prev);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  expect(r.criteria[2].reason).toMatch(/follow-through/);
  expect(evaluate(spec,"c",String(wrongImage),work).criteria[2].candidateMarks).toBeNull();
  expect(evaluate(spec,"c",String(wrongImage),"",prev).criteria[2].candidateMarks).toBeNull();
 });
 test("area scales by square, not by length factor",()=>{
  const wrong=spec.scale*spec.area;
  expect(evaluate(spec,"c",String(wrong),spec.scale+"*3="+wrong).criteria[2].candidateMarks).toBeNull();
 });
 test("a final answer alone cannot justify scaling methods",()=>{
  const r=evaluate(spec,"c",String(spec.imageArea));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1]);
 });
 test("unanswered parts never claim marks and retain the exact source total",()=>{
  for(const part of question.parts){
   const r=evaluate(spec,part.id);
   expect(r.suggestedMarks).toBe(0);
   expect(r.unresolvedMarks).toBe(part.marks);
   expect(r.publishable).toBe(false);
   expect(r.criteria.reduce((n,c)=>n+c.maxMarks,0)).toBe(part.marks);
  }
 });
});
test("source identity and part ID are mandatory",()=>{
 for(const [questionId,partId] of [["p2-q3-v1","a"],["p2-q3-v4","d"],["p2-q3-v9","c"]])
  expect(()=>mark({questionId,partId,response:{answer:"3"}})).toThrow(/Uncalibrated/);
});
