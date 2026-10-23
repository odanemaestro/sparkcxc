import p2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import p3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import p4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";
import {getPhysicsGraphWorkingSpec} from "./physicsGraphWorkingSpecsV2";
import {samplePhysicsGraphLine} from "./physicsGraphWorkingEvidenceV2";
import {evaluatePhysicsSourceGradient,PHYSICS_GRADIENT_SOURCE_POLICIES} from "./physicsGraphGradientPoliciesV2";

const cases=[
 {paper:p2,answer:"gradient = 4.0 s² m⁻¹",unitOnly:"4.0 V",numericWrong:"7 s² m⁻¹"},
 {paper:p3,answer:"gradient = 5.0 Ω",unitOnly:"5.0 N",numericWrong:"7 Ω"},
 {paper:p4,answer:"gradient = 0.0100 N cm⁻³",unitOnly:"0.0100 s",numericWrong:"0.012 N cm⁻³"}
];
describe.each(cases)("source-specific Physics gradient $paper.paper_id",({paper,answer,unitOnly,numericWrong})=>{
 const question=paper.questions[0],qid=question.question_id;
 const spec=getPhysicsGraphWorkingSpec(qid),limits=spec.limits;
 const graphPart=question.parts.find(p=>p.id===spec.graphPart);
 const sourcePart=question.parts.find(p=>p.id===spec.trianglePart);
 const span=limits.xMax-limits.xMin;
 const a={x:limits.xMin,y:limits.yMin+(limits.yMax-limits.yMin)*0.1};
 const b={x:limits.xMin+span*.9,y:limits.yMin+(limits.yMax-limits.yMin)*.9};
 const previousGraphResponse={graph:{line:[a,b]}};
 const point=x=>samplePhysicsGraphLine(previousGraphResponse,x,qid);
 const triangle={kind:"physics-gradient-triangle-v1",
  points:[point(a.x+span*.05),point(a.x+span*.78)]};
 const mark=(response,graph=previousGraphResponse)=>
  evaluatePhysicsSourceGradient({questionId:qid,response,previousGraphResponse:graph});
 test("source criteria, accepted answer and policy match",()=>{
  expect(sourcePart.criteria.map(c=>[c.code,c.marks])).toEqual([["M1",2],["A1",1],["B1",1]]);
  expect(graphPart.responseType).toBe("graph");
  expect(sourcePart.answer).toBe(answer);
  expect(PHYSICS_GRADIENT_SOURCE_POLICIES[qid]).toBeTruthy();
  expect(mark({answer,graphEvidence:triangle}).criteria.map(c=>c.candidateMarks)).toEqual([2,1,1]);
 });
 test("separates triangle, number and unit marks",()=>{
  expect(mark({answer}).criteria.map(c=>c.candidateMarks)).toEqual([null,1,1]);
  expect(mark({answer:unitOnly,graphEvidence:triangle}).criteria.map(c=>c.candidateMarks)).toEqual([2,1,null]);
  expect(mark({answer:numericWrong,graphEvidence:triangle}).criteria.map(c=>c.candidateMarks)).toEqual([2,null,1]);
  expect(mark({answer:"a large triangle"}).suggestedMarks).toBe(0);
 });
 test("rejects malformed or stale line evidence, never authorizes publication",()=>{
  const valid=mark({answer,graphEvidence:triangle});
  expect(valid.publishable).toBe(false);
  expect(valid.authority).toBe("advisory");
  const stale={graph:{line:[a,{...b,y:b.y-0.15*(limits.yMax-limits.yMin)}]}};
  expect(mark({answer,graphEvidence:triangle},stale).criteria[0].candidateMarks).toBeNull();
  const forged={kind:"physics-gradient-triangle-v1",points:[{x:"1",y:3},{x:4,y:5}]};
  expect(mark({answer,graphEvidence:forged}).criteria[0].candidateMarks).toBeNull();
 });
});
