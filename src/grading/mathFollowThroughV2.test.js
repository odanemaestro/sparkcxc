import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {MATH_Q6_SOURCES_V2} from "./mathMensurationTrigonometryV2";
import {MATH_Q9_SOURCES_V2} from "./mathCircleTrigonometryBearingsV2";
import {MATH_Q10_SOURCES_V2} from "./mathMatricesVectorsV2";
import {evaluateMathFollowThroughV2 as ft} from "./mathFollowThroughV2";

const run=(id,p,answer,working,precedingResponses={})=>ft({
 questionId:id,partId:p,response:{answer,working},precedingResponses
});
const supported=[
 ...Object.keys(MATH_Q6_SOURCES_V2),...Object.keys(MATH_Q9_SOURCES_V2),
 ...Object.keys(MATH_Q10_SOURCES_V2)
];
test("follow-through is never an additive, publishable score for any supported source",()=>{
 for(const id of supported){
  const paper=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
  expect(paper).toBeDefined();
  for(const p of paper.parts){
   const r=ft({questionId:id,partId:p.id,response:{answer:p.answer}});
   expect(r.sourcePart).toBe(id+"::"+p.id);
   expect(r.authority).toBe("advisory");
   expect(r.publishable).toBe(false);
   expect(r.additiveToScore).toBe(false);
   expect(r.requiresRubricReconciliation).toBe(true);
   expect(r.rubricAllocation).toBe("unverified-follow-through-review-only");
   expect(r.suggestedMarks).toBe(0);
   expect(r.evidence).toBeNull();
   expect(r.criteria).toHaveLength(1);
   expect(r.criteria[0].candidateMarks).toBeNull();
  }
 }
});
test.each([
 ["p2-q6-v1","b",{"a":"40"},"160","40*4=160","a",40,160],
 ["p2-q6-v2","b",{"a":"150"},"2250","150*15=2250","a",150,2250],
 ["p2-q6-v3","b",{"a":"350"},"2800","350*8=2800","a",350,2800],
 ["p2-q6-v1","d",{"b":"165"},"30","165/5.5=30","b",165,30],
 ["p2-q6-v2","d",{"b":"2100"},"100","2100/21=100","b",2100,100],
 ["p2-q6-v7","b",{"a":"26"},"520","26*20=520","a",26,520],
 ["p2-q6-v8","b",{"a":"32"},"800","32*25=800","a",32,800]
])("Q6 %s %s valid carried-forward evidence is isolated",
 (id,p,previous,answer,working,dep,sourceValue,computedValue)=>{
 const r=run(id,p,answer,working,previous);
 expect(r.suggestedMarks).toBe(1);
 expect(r.criteria[0].status).toBe("candidate-follow-through");
 expect(r.criteria[0].candidateMarks).toBe(1);
 expect(r.dependency).toBe(dep);
 expect(r.evidence.sourceValue).toBe(sourceValue);
 expect(r.evidence.computedValue).toBe(computedValue);
 expect(r.publishable).toBe(false);
 expect(r.additiveToScore).toBe(false);
});
test("Q6 rejects unrelated figures, fabricated earlier values and absent working",()=>{
 for(const r of [
  run("p2-q6-v1","b","160","40*4=160",{}),
  run("p2-q6-v1","b","160","",{"a":"40"}),
  run("p2-q6-v1","b","160","40*4=160",{"a":"38.5"}),
  run("p2-q6-v1","b","160","40*5=200",{"a":"40"}),
  run("p2-q6-v1","b","160","40*4=160",{"a":"40 or 38.5"}),
  run("p2-q6-v1","b","160","40*4=160",{"a":"99999"}),
  run("p2-q6-v1","b","160","40*4=160 or 38.5*4=154",{"a":"40"}),
  run("p2-q6-v1","b","154","38.5*4=154",{"a":"40"}),
  run("p2-q6-v1","d","30","165/5.5=30",{"b":"154"}),
  run("p2-q6-v4","b","160","40*4=160",{"a":"40"}),
  run("p2-q6-v7","d","560","26*20=520",{"a":"26"})
 ]){
  expect(r.suggestedMarks).toBe(0);
  expect(r.publishable).toBe(false);
 }
});
test.each([
 ["p2-q10-v8","(8,8)","(5,3)","(3,1)+1/4*(8,8)=(5,3)"],
 ["p2-q10-v9","(9,6)","(6.5,2)","(2,-1)+1/2*(9,6)=(6.5,2)"],
 ["p2-q10-v10","(6,6)","(3,6)","(-1,2)+2/3*(6,6)=(3,6)"]
])("Q10 %s OC follows an erroneous earlier AB without altering accuracy",
 (id,previous,answer,working)=>{
  const r=run(id,"c",answer,working,{"a":previous});
  expect(r.suggestedMarks).toBe(1);
  expect(r.dependency).toBe("a");
  expect(r.additiveToScore).toBe(false);
  expect(run(id,"c",answer,"",{"a":previous}).suggestedMarks).toBe(0);
  expect(run(id,"c","wrong",working,{"a":previous}).suggestedMarks).toBe(0);
 });
test("Q10 rejects correct AB, contradictory vectors and client-supplied claims",()=>{
 expect(run("p2-q10-v8","c","(4,3)","(3,1)+1/4*(4,8)=(4,3)",
  {"a":"(4,8)"}).suggestedMarks).toBe(0);
 expect(run("p2-q10-v8","c","(5,3)","(3,1)+1/4*(8,8)=(5,3)",
  {"a":"(8,8) or (4,8)"}).suggestedMarks).toBe(0);
 expect(run("p2-q10-v8","c","(5,3)","(3,1)+1/4*(8,8)=(5,3) or wrong",
  {"a":"(8,8)"}).suggestedMarks).toBe(0);
 expect(ft({questionId:"p2-q10-v8",partId:"c",response:{
  answer:"(5,3)",working:"",validated:true,trustPreviousAnswer:true},
  precedingResponses:{a:"(8,8)"}}).suggestedMarks).toBe(0);
});
test.each([
 ["p2-q10-v1",8,"(1/8)[[5,-3],[-1,2]]"],
 ["p2-q10-v2",11,"(1/11)[[4,-1],[-2,3]]"],
 ["p2-q10-v3",15,"(1/15)[[5,-3],[-2,4]]"]
])("Q10 %s inverse denominator follows wrong prior determinant",
 (id,det,answer)=>{
 const r=run(id,"c",answer,"",{"b":String(det)});
 expect(r.suggestedMarks).toBe(1);
 expect(r.evidence.sourceValue).toBe(det);
 expect(r.publishable).toBe(false);
 const trueDet=MATH_Q10_SOURCES_V2[id].det;
 expect(run(id,"c","(1/"+trueDet+")"+answer.slice(answer.indexOf("[[")),
  "",{"b":String(trueDet)}).suggestedMarks).toBe(0);
 expect(run(id,"c",answer,"",{"b":"0"}).suggestedMarks).toBe(0);
 expect(run(id,"c",answer,"",{"b":"9999"}).suggestedMarks).toBe(0);
});
test.each([
 ["p2-q9-v3","14.0","71","(9^2+14^2-14^2)/(2*9*14)=0.3214"],
 ["p2-q9-v4","13.4","75","(11^2+13.4^2-15^2)/(2*11*13.4)=0.256"],
 ["p2-q9-v5","18.0","40","(8^2+18^2-13^2)/(2*8*18)=0.760"]
])("Q9 %s carries a prior cosine-rule side into the next angle",
 (id,previous,angle,working)=>{
  const r=run(id,"b",angle,working,{"a":previous});
  expect(r.suggestedMarks).toBe(1);
  expect(r.evidence.sourceValue).toBe(Number(previous));
  expect(r.publishable).toBe(false);
  expect(run(id,"b",angle,"",{"a":previous}).suggestedMarks).toBe(0);
  expect(run(id,"b",String(MATH_Q9_SOURCES_V2[id].atK),working,
   {"a":previous}).suggestedMarks).toBe(0);
 });
test("follow-through accepts no unrecognised source or invented criterion",()=>{
 for(const [questionId,partId] of [
  ["p2-q6-v11","b"],["p2-q5-v1","b"],["p2-q10-v8","e"],
  ["p2-q9-v3","b2"]
 ])expect(()=>ft({questionId,partId})).toThrow(/Uncalibrated/);
});
