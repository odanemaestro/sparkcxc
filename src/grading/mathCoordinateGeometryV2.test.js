import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathCoordinateGeometryV2 as mark} from "./mathCoordinateGeometryV2";
const cases=[
 {id:"p2-q3-v1",axis:"x",opposite:"y",vector:"(-6, 2)",points:[[-5,3],[-1,3],[-5,6]],sqrt:"sqrt((1-5)^2+(4-1)^2)"},
 {id:"p2-q3-v2",axis:"y",opposite:"x",vector:"(3, -7)",points:[[5,-5],[9,-5],[5,-2]],sqrt:"sqrt((2-6)^2+(5-2)^2)"},
 {id:"p2-q3-v3",axis:"x",opposite:"y",vector:"(-5, -1)",points:[[-4,1],[-1,1],[-4,5]],sqrt:"sqrt((1-4)^2+(6-2)^2)"}
];
const c=(fixture,partId,response)=>mark({questionId:fixture.id,partId,response});
describe.each(cases)("Math coordinate geometry source variation",fixture=>{
 const bank=PAPER2_QUESTION_BANK.find(q=>q.question_id===fixture.id);
 test("source preserves reflection, translated coordinates and two-decimal BC",()=>{
  expect(bank).toBeDefined();
  expect(bank.parts.map(p=>[p.id,p.marks])).toEqual([["a",3],["b",3],["c",3]]);
  expect(bank.parts[0].answer).toContain(fixture.axis+"-axis");
  expect(bank.parts[1].prompt).toContain(fixture.vector);
  expect(bank.parts[2].prompt).toMatch(/2 decimal places/);
  expect(bank.parts[2].answer).toBe("5.00");
 });
 test("correct reflection identifies orientation but unsplit marks stay unresolved",()=>{
  for(const text of ["A reflection in the "+fixture.axis+"-axis",
   "reflection in "+(fixture.axis==="x"?"y":"x")+" = 0"]){
   const r=c(fixture,"a",{answer:text});
   expect(r.criteria.map(v=>v.candidateMarks)).toEqual([1,null]);
   expect(r.unresolvedMarks).toBe(2);
   expect(r.publishable).toBe(false);
  }
 });
 test("wrong axis or conflicting axes cannot earn a reflection candidate",()=>{
  for(const text of ["reflection in the "+fixture.opposite+"-axis",
   "translation in the "+fixture.axis+"-axis",
   "reflection in the "+fixture.axis+"-axis and "+fixture.opposite+"-axis"]){
   expect(c(fixture,"a",{answer:text}).criteria[0].candidateMarks).toBeNull();
  }
 });
 test("all three source coordinates can earn their own marks in any unlabelled order",()=>{
  const text=fixture.points.map(p=>"("+p.join(",")+")");
  for(const candidate of [text.join("; "),text.slice().reverse().join(", ")]) {
   const r=c(fixture,"b",{answer:candidate});
   expect(r.criteria.map(x=>x.candidateMarks)).toEqual([1,1,1]);
   expect(r.publishable).toBe(false);
  }
 });
 test("labelled A B C coordinates preserve vertex correspondence",()=>{
  const raw=fixture.points.map((p,i)=>"ABC"[i]+"'("+p.join(",")+")").join(", ");
  const r=c(fixture,"b",{answer:raw});
  expect(r.suggestedMarks).toBe(3);
 });
 test("a single valid vertex earns one, not all three, marks",()=>{
  const p=fixture.points[0];
  const r=c(fixture,"b",{answer:"("+p.join(",")+")"});
  expect(r.suggestedMarks).toBe(1);
  expect(r.unresolvedMarks).toBe(2);
 });
 test("duplicate coordinate, bogus point and extra fourth point cannot earn full marks",()=>{
  const [a,b]=fixture.points;
  const r=c(fixture,"b",{answer:"("+a+") ("+a+") ("+b+")"});
  expect(r.suggestedMarks).toBe(2);
  const four=c(fixture,"b",{answer:fixture.points.map(p=>"("+p+")").join(" ")+" (0,0)"});
  expect(four.suggestedMarks).toBe(0);
  const bogus=c(fixture,"b",{answer:"(500,400)"});
  expect(bogus.suggestedMarks).toBe(0);
 });
 test("source distance formula, evaluated components and 5.00 give three candidates",()=>{
  const response={answer:"5.00 units",working:fixture.sqrt+"; 16+9=25"};
  const r=c(fixture,"c",{response, ...response});
  expect(r.criteria.map(x=>x.candidateMarks)).toEqual([1,1,1]);
  expect(r.publishable).toBe(false);
 });
 test("correct 5.00 alone cannot claim invisible distance working",()=>{
  const r=c(fixture,"c",{answer:"5.00"});
  expect(r.criteria.map(x=>x.candidateMarks)).toEqual([null,null,1]);
 });
 test("numerically equal but not 2dp, or wrong length, lacks final format credit",()=>{
  for(const raw of ["5","5.0","4.99","5.000","5 cm","4.00 units"]){
   expect(c(fixture,"c",{answer:raw}).criteria[2].candidateMarks).toBeNull();
  }
 });
 test("correct method with wrong final receives only supported partial marks",()=>{
  const r=c(fixture,"c",{answer:"7.00",working:fixture.sqrt});
  expect(r.criteria.map(v=>v.candidateMarks)).toEqual([1,null,null]);
 });
 test("numeric coincidences without working do not invent method evidence",()=>{
  const r=c(fixture,"c",{answer:"5.00",working:"The sides have 3 and 4, so I guessed 5"});
  expect(r.criteria.map(v=>v.candidateMarks)).toEqual([null,null,1]);
 });
});
test("unknown question or part IDs cannot activate the geometry checker",()=>{
 expect(()=>mark({questionId:"p2-q3-v8",partId:"a",response:{answer:"reflection in x-axis"}})).toThrow();
 expect(()=>mark({questionId:"p2-q3-v1",partId:"d",response:{answer:"5.00"}})).toThrow();
});
