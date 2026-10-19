import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathRotationV2 as evaluate,MATH_ROTATION_SOURCES_V2} from "./mathRotationV2";
const cases=[
 {id:"p2-q3-v7",direction:"clockwise",points:[[1,-2],[1,-6],[4,-2]],
  original:[[2,1],[6,1],[2,4]],mid:[4,1],mapped:[1,-4],rule:"(x,y)->(y,-x)",
  wrongRule:"(x,y)->(-y,x)"},
 {id:"p2-q3-v8",direction:"anticlockwise",points:[[-2,1],[-2,5],[-6,1]],
  original:[[1,2],[5,2],[1,6]],mid:[3,2],mapped:[-2,3],rule:"(x,y)->(-y,x)",
  wrongRule:"(x,y)->(y,-x)"}
];
const check=(s,partId,answer="",working="")=>
 evaluate({questionId:s.id,partId,response:{answer,working}});
const format=pt=>"("+pt.join(", ")+")";
describe.each(cases)("Q3 Mathematics rotation source calibration",s=>{
 const q=PAPER2_QUESTION_BANK.find(entry=>entry.question_id===s.id);
 test("assembled 2/4/3 mark allocations match exact source geometry",()=>{
  expect(q).toBeDefined();
  expect(q.parts.map(p=>[p.id,p.marks])).toEqual([["a",2],["b",4],["c",3]]);
  expect(q.parts[0].prompt).toContain(s.direction);
  expect(q.parts[1].answer.replace(/\s+/g,""))
   .toBe(s.points.map(format).join(";").replace(/\s+/g,""));
  expect(q.parts[2].answer.replace(/\s+/g,"")).toBe(format(s.mapped).replace(/\s+/g,""));
  expect(MATH_ROTATION_SOURCES_V2[s.id].rotated).toEqual(s.points);
 });
 test("rotation rule maps each symbolic coordinate correctly",()=>{
  const r=check(s,"a",s.rule);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(r.authority).toBe("advisory");
  expect(r.publishable).toBe(false);
  expect(r.rubricAllocation).toBe("proposed-from-worked-solution");
 });
 test("accepted arrow glyph, worded mapping and individual coordinate mapping",()=>{
  const alternatives=[s.rule.replace("->","→"),s.rule.replace("->"," maps to ")];
  for(const answer of alternatives)
   expect(check(s,"a",answer).suggestedMarks).toBe(2);
  const expected=s.direction==="clockwise"?["y","-x"]:["-y","x"];
  expect(check(s,"a","x'="+expected[0]+", y'="+expected[1]).suggestedMarks).toBe(2);
 });
 test("one symbolic coordinate alone is a separate provisional candidate",()=>{
  const expected=s.direction==="clockwise"?["y","-x"]:["-y","x"];
  expect(check(s,"a","x'="+expected[0]).criteria.map(c=>c.candidateMarks))
   .toEqual([1,null]);
  expect(check(s,"a","y'="+expected[1]).criteria.map(c=>c.candidateMarks))
   .toEqual([null,1]);
 });
 test("opposite rotation and ambiguous or incorrect mapping fail closed",()=>{
  for(const answer of [s.wrongRule,"(x,y)->(x,y)","(x,y)->(y,y) or "+s.rule]){
   expect(check(s,"a",answer).suggestedMarks).toBe(0);
  }
 });
 test("all three correct images plus explicit rotation working reach four candidates",()=>{
  const first=s.original[0],image=s.points[0];
  const w=format(first)+"->"+format(image);
  const r=check(s,"b",s.points.map(format).join("; "),w);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1,1]);
  expect(r.suggestedMarks).toBe(4);
  expect(r.publishable).toBe(false);
 });
 test("correct coordinates without working cannot invent M1",()=>{
  const r=check(s,"b",s.points.map(format).join(", "));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1,1,1]);
 });
 test("unlabelled valid vertices may appear in a different order",()=>{
  const r=check(s,"b",s.points.slice().reverse().map(format).join("; "));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1,1,1]);
 });
 test("labelled vertices preserve identity even when written in reverse order",()=>{
  const r=check(s,"b",s.points.map((pt,i)=>"abc"[i]+"'"+format(pt)).reverse().join("; "));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1,1,1]);
  const swapped=check(s,"b","a'"+format(s.points[1])+"; b'"+format(s.points[0]));
  expect(swapped.suggestedMarks).toBe(0);
 });
 test("one correct vertex earns only its own B mark",()=>{
  const r=check(s,"b",format(s.points[0]));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1,null,null]);
 });
 test("duplicate coordinates cannot satisfy two source vertices",()=>{
  const r=check(s,"b",[s.points[0],s.points[0],s.points[1]].map(format).join("; "));
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1,1,null]);
 });
 test("unparsed prose, mixed labels or more than three points earn no vertex marks",()=>{
  for(const answer of [
   s.points.map(format).join("; ")+" or none",
   s.points.map(format).join("; ")+" (0,0)",
   "a'"+format(s.points[0])+"; "+format(s.points[1]),
   "These are "+s.points.map(format).join(",")
  ])expect(check(s,"b",answer).suggestedMarks).toBe(0);
 });
 test("original midpoint and correct mapping support separate method and accuracy",()=>{
  const [a,b]=s.original,[mx,my]=s.mid;
  const w="("+a[0]+"+"+b[0]+")/2="+mx+"; ("+a[1]+"+"+b[1]+")/2="+my+
   "; "+format(s.mid)+"->"+format(s.mapped);
  const r=check(s,"c",format(s.mapped),w);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
 });
 test("midpoint alone or rotated final without working receives only evidenced marks",()=>{
  const bare=check(s,"c",format(s.mapped));
  expect(bare.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1]);
  const partial=check(s,"c","(999, 999)",format(s.mid)+"->"+format(s.mapped));
  expect(partial.criteria.map(c=>c.candidateMarks)).toEqual([null,1,null]);
 });
 test("wrong final or nonpoint must not earn accuracy candidate",()=>{
  for(const answer of [
   format(s.mid),format(s.mapped)+" or "+format(s.mid),
   "x="+s.mapped[0]+", y="+s.mapped[1],
   "(999, 999)"
  ])expect(check(s,"c",answer).criteria[2].candidateMarks).toBeNull();
 });
 test("all empty responses remain fully unresolved with exact source cap",()=>{
  for(const part of q.parts){
   const r=check(s,part.id);
   expect(r.suggestedMarks).toBe(0);
   expect(r.unresolvedMarks).toBe(part.marks);
   expect(r.criteria.reduce((v,c)=>v+c.maxMarks,0)).toBe(part.marks);
   expect(r.publishable).toBe(false);
  }
 });
});
test("unknown rotation and unrelated part IDs fail closed",()=>{
 for(const [questionId,partId] of [["p2-q3-v6","a"],["p2-q3-v7","d"],["p2-q3-v9","c"]])
  expect(()=>evaluate({questionId,partId,response:{answer:"(1,-2)"}})).toThrow(/Uncalibrated/);
});
