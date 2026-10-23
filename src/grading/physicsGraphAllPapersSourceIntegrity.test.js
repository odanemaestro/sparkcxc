import paper1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import paper2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import paper3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import paper4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";
import {getPhysicsGraphWorkingSpec} from "./physicsGraphWorkingSpecsV2";
import {
 samplePhysicsGraphLine,
 validatePhysicsGradientTriangle,
 validatePhysicsPressureReading,
} from "./physicsGraphWorkingEvidenceV2";

// Cross-paper regression: method marks require a saved student selection,
// tied to that student's line, rather than a typed claim or a source key.
describe.each([paper1,paper2,paper3,paper4])("Physics graph-working source integrity: $paper_id",paper=>{
 const q=paper.questions[0];
 const spec=getPhysicsGraphWorkingSpec(q.question_id);
 test("spec refers to the actual plotted graph and gradient rubric",()=>{
  expect(spec).toBeTruthy();
  const graph=q.parts.find(p=>p.id===spec.graphPart);
  const gradient=q.parts.find(p=>p.id===spec.trianglePart);
  expect(graph.responseType).toBe("graph");
  expect(gradient.criteria.some(c=>c.kind==="M"&&/triangle/i.test(c.description))).toBe(true);
 });
 test("accepts sufficiently wide saved triangle, rejects a short or stale one",()=>{
  const l=spec.limits;
  const span=l.xMax-l.xMin;
  const a={x:l.xMin,y:l.yMin+(l.yMax-l.yMin)*0.15};
  const b={x:l.xMin+span*0.9,y:l.yMin+(l.yMax-l.yMin)*0.75};
  const graphResponse={graph:{line:[a,b]}};
  const point=x=>samplePhysicsGraphLine(graphResponse,x,q.question_id);
  const first=point(a.x+span*0.05);
  const second=point(a.x+span*0.83);
  expect(first).toBeTruthy();
  expect(second).toBeTruthy();
  const response={graphEvidence:{kind:"physics-gradient-triangle-v1",points:[first,second]}};
  expect(validatePhysicsGradientTriangle({graphResponse,response,questionId:q.question_id})).toBe(true);
  expect(validatePhysicsGradientTriangle({graphResponse,response:{
   graphEvidence:{kind:"physics-gradient-triangle-v1",points:[first,point(a.x+span*0.15)]}
  },questionId:q.question_id})).toBe(false);
  expect(validatePhysicsGradientTriangle({graphResponse,response:{
   answer:"correct gradient",working:"large triangle drawn"
  },questionId:q.question_id})).toBe(false);
  const stale={graph:{line:[a,{...b,y:b.y-(l.yMax-l.yMin)*0.12}]}};
  expect(validatePhysicsGradientTriangle({graphResponse:stale,response,questionId:q.question_id})).toBe(false);
  const tampered={graphEvidence:{kind:"physics-gradient-triangle-v1",
   points:[first,{...second,x:String(second.x)}]}};
  expect(validatePhysicsGradientTriangle({graphResponse,response:tampered,questionId:q.question_id})).toBe(false);
 });
 test("pressure read-off is offered only where source rubric permits it",()=>{
  if(spec.readingPart===null){
   expect(validatePhysicsPressureReading({graphResponse:{graph:{line:[]}},
    response:{graphEvidence:{kind:"physics-pressure-reading-v1",point:{x:0,y:0}}},
    questionId:q.question_id})).toBe(false);
  }else{
   expect(q.parts.some(p=>p.id===spec.readingPart&&
    p.criteria.some(c=>c.kind==="M"&&/read|line|graph/i.test(c.description)))).toBe(true);
  }
 });
});
