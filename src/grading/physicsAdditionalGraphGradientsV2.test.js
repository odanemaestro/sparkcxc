import paper2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import paper3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import paper4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";
import {getPhysicsGraphWorkingSpec} from "./physicsGraphWorkingSpecsV2";
import {validatePhysicsGradientTriangle,samplePhysicsGraphLine} from "./physicsGraphWorkingEvidenceV2";
import {evaluatePhysicsAdditionalGraphGradient} from "./physicsAdditionalGraphGradientsV2";

const sources=[
 {paper:paper2,unit:"4.0 s² m⁻¹",alternative:"4 s²/m",wrong:"4.5 s²/m",to:1,gradient:4.01,first:0.1,last:0.75},
 {paper:paper3,unit:"5 Ω",alternative:"5 V/A",wrong:"0.2 Ω",to:0.6,gradient:5.05,first:0.07,last:0.49},
 {paper:paper4,unit:"0.0100 N cm⁻³",alternative:"1.0 × 10⁻² N/cm³",wrong:"0.002 N cm⁻³",to:100,gradient:0.01,first:10,last:75}
];
const graph=(entry)=>({graph:{line:[{x:0,y:0},{x:entry.to,y:entry.to*entry.gradient}]}});
const triangle=(entry,answer)=>({
 answer,graphEvidence:{kind:"physics-gradient-triangle-v1",
  points:[samplePhysicsGraphLine(graph(entry),entry.first,entry.paper.questions[0].question_id),
   samplePhysicsGraphLine(graph(entry),entry.last,entry.paper.questions[0].question_id)]
 }
});
describe.each(sources)("source-calibrated additional Physics graph gradient",entry=>{
 const q=entry.paper.questions[0],id=q.question_id;
 const spec=getPhysicsGraphWorkingSpec(id);
 test("configuration and rubric agree with the actual paper",()=>{
  expect(spec).not.toBeNull();
  const graphPart=q.parts.find(p=>p.id===spec.graphPart);
  const gradientPart=q.parts.find(p=>p.id===spec.trianglePart);
  expect(graphPart.responseType).toBe("graph");
  expect(graphPart.grid).toMatchObject(spec.limits);
  expect(spec.referenceXSpan).toBeCloseTo(
   Math.max(...graphPart.graph.points.map(p=>p.x))-Math.min(...graphPart.graph.points.map(p=>p.x)),4);
  expect(gradientPart.criteria.map(c=>[c.code,c.marks]))
   .toEqual([["M1",2],["A1",1],["B1",1]]);
 });
 test("valid source units and a large triangle produce four advisory marks",()=>{
  for(const answer of [entry.unit,entry.alternative]){
   const response=triangle(entry,answer);
   expect(validatePhysicsGradientTriangle({questionId:id,graphResponse:graph(entry),response})).toBe(true);
   const result=evaluatePhysicsAdditionalGraphGradient({questionId:id,previousGraphResponse:graph(entry),response});
   expect(result.suggestedMarks).toBe(4);
   expect(result.unresolvedMarks).toBe(0);
   expect(result.publishable).toBe(false);
  }
 });
 test("numeric errors and missing units never become automatic full credit",()=>{
  const invalid=evaluatePhysicsAdditionalGraphGradient({questionId:id,previousGraphResponse:graph(entry),
   response:triangle(entry,entry.wrong)});
  expect(invalid.criteria[1].candidateMarks).toBeNull();
  const missing=evaluatePhysicsAdditionalGraphGradient({questionId:id,previousGraphResponse:graph(entry),
   response:triangle(entry,entry.gradient.toString())});
  expect(missing.criteria[2].candidateMarks).toBeNull();
 });
 test("an undersized or stale triangle never supplies M1",()=>{
  const item=triangle(entry,entry.unit);
  item.graphEvidence.points[1]={...item.graphEvidence.points[0]};
  expect(evaluatePhysicsAdditionalGraphGradient({questionId:id,previousGraphResponse:graph(entry),
   response:item}).criteria[0].candidateMarks).toBeNull();
  const old=triangle(entry,entry.unit);
  const changed={graph:{line:[{x:0,y:0},{x:entry.to,y:entry.to*entry.gradient*0.85}]}};
  expect(evaluatePhysicsAdditionalGraphGradient({questionId:id,previousGraphResponse:changed,
   response:old}).criteria[0].candidateMarks).toBeNull();
 });
 test("read-off work is available only for the source paper whose question requires it",()=>{
  expect(getPhysicsGraphWorkingSpec(id).readingPart).toBe(
   id==="phy-p2-3-q1"?"e":null);
 });
});
test("unknown question IDs cannot opt into grading",()=>{
 expect(getPhysicsGraphWorkingSpec("phy-p2-10-q1")).toBeNull();
 expect(()=>evaluatePhysicsAdditionalGraphGradient({questionId:"phy-p2-10-q1"})).toThrow();
});
