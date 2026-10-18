import physics from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import {
 physicsGraphLine,samplePhysicsGraphLine,
 validatePhysicsGradientTriangle,validatePhysicsPressureReading
} from "./physicsGraphWorkingEvidenceV2";
import {evaluatePhysicsGraphGradient,evaluatePhysicsGraphPressure} from "./physicsGraphGradientV2";

const graphResponse={graph:{line:[{x:0,y:0},{x:10,y:240}]}};
const point=x=>samplePhysicsGraphLine(graphResponse,x);
const triangle=(first=2,second=8)=>({
 answer:"2400 kPa cm³",
 graphEvidence:{kind:"physics-gradient-triangle-v1",points:[point(first),point(second)]}
});
const reading=(x=100/18)=>({
 answer:"133 kPa",working:"1/18=0.0556",
 graphEvidence:{kind:"physics-pressure-reading-v1",point:point(x)}
});

test("saved graph line and marks come from original Physics Q1 source",()=>{
 const q=physics.questions[0];
 expect(q.question_id).toBe("phy-p2-1-q1");
 const graph=q.parts.find(p=>p.id==="b");
 expect(graph.graph.line.gradient).toBe(24);
 expect(graph.grid.xMax).toBe(11);
 const c=q.parts.find(p=>p.id==="c");
 const d=q.parts.find(p=>p.id==="d");
 expect(c.criteria.find(r=>r.code==="M1").marks).toBe(2);
 expect(d.criteria.find(r=>r.code==="M2").marks).toBe(1);
});

test("student's large triangle is accepted as advisory geometry evidence",()=>{
 expect(physicsGraphLine(graphResponse)).not.toBeNull();
 expect(validatePhysicsGradientTriangle({graphResponse,response:triangle()})).toBe(true);
 const graded=evaluatePhysicsGraphGradient({previousGraphResponse:graphResponse,response:triangle()});
 expect(graded.criteria[0].candidateMarks).toBe(2);
 expect(graded.suggestedMarks).toBe(4);
 expect(graded.publishable).toBe(false);
});

test("shorter than half the chart or line does not support the triangle mark",()=>{
 for(const candidate of [triangle(2,4),triangle(3,7),triangle(2,2)]){
  expect(validatePhysicsGradientTriangle({graphResponse,response:candidate})).toBe(false);
  expect(evaluatePhysicsGraphGradient({previousGraphResponse:graphResponse,response:candidate})
   .criteria[0].candidateMarks).toBeNull();
 }
});

test("forged off-line or out-of-range triangle endpoints fail closed",()=>{
 const off=triangle();off.graphEvidence.points[1].y+=10;
 const outside=triangle();outside.graphEvidence.points[0].x=-1;
 expect(validatePhysicsGradientTriangle({graphResponse,response:off})).toBe(false);
 expect(validatePhysicsGradientTriangle({graphResponse,response:outside})).toBe(false);
});

test("editing Q1(b) plotted line invalidates the formerly recorded triangle",()=>{
 const modified={graph:{line:[{x:0,y:0},{x:10,y:210}]}};
 expect(validatePhysicsGradientTriangle({graphResponse:modified,response:triangle()})).toBe(false);
});

test("one coordinate or typed gradient never proves a drawn triangle",()=>{
 const a=triangle();
 a.graphEvidence.points.pop();
 expect(validatePhysicsGradientTriangle({graphResponse,response:a})).toBe(false);
 expect(evaluatePhysicsGraphGradient({response:{answer:"2400 kPa cm³"},
  previousGraphResponse:graphResponse}).criteria[0].candidateMarks).toBeNull();
});

test("a recorded reading at 1/18 on the user's own line supplies advisory M2",()=>{
 const graded=evaluatePhysicsGraphPressure({response:reading(),previousGraphResponse:graphResponse});
 expect(validatePhysicsPressureReading({graphResponse,response:reading()})).toBe(true);
 expect(graded.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
 expect(graded.publishable).toBe(false);
});

test("numerically correct pressure without saved graphical selection cannot claim M2",()=>{
 const result=evaluatePhysicsGraphPressure({response:{answer:"133 kPa",working:"2400/18=133.3"},
  previousGraphResponse:graphResponse});
 expect(result.criteria[1].candidateMarks).toBeNull();
});

test("off-line, wrong x position, or stale graph evidence cannot claim graph reading",()=>{
 const wrongX=reading(6.5);
 const stale=reading();
 stale.graphEvidence.point.y+=10;
 const otherLine={graph:{line:[{x:0,y:0},{x:10,y:230}]}};
 for(const [graph,r] of [[graphResponse,wrongX],[graphResponse,stale],[otherLine,reading()]]){
  expect(validatePhysicsPressureReading({graphResponse:graph,response:r})).toBe(false);
  expect(evaluatePhysicsGraphPressure({response:r,previousGraphResponse:graph})
   .criteria[1].candidateMarks).toBeNull();
 }
});

test("saved point requires a compatible student final pressure reading for M2",()=>{
 const r=reading();
 r.answer="100 kPa";
 const graded=evaluatePhysicsGraphPressure({response:r,previousGraphResponse:graphResponse});
 expect(graded.criteria[1].candidateMarks).toBeNull();
});

test("malformed graph evidence never throws or generates a candidate mark",()=>{
 const invalid=[
  {},{graphEvidence:{kind:"physics-gradient-triangle-v1",points:"bad"}},
  {graphEvidence:{kind:"physics-pressure-reading-v1",point:{x:"5.56",y:133}}},
  {graphEvidence:{kind:"physics-gradient-triangle-v1",points:[null,null]}}
 ];
 for(const response of invalid){
  expect(validatePhysicsGradientTriangle({graphResponse,response})).toBe(false);
  expect(validatePhysicsPressureReading({graphResponse,response})).toBe(false);
 }
 expect(samplePhysicsGraphLine({graph:{line:[]}},5)).toBeNull();
});
