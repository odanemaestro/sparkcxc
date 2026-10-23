import source from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import {evaluatePhysicsCurrentGraphReading} from "./physicsCurrentGraphReadingV2";
import {validatePhysicsCurrentReading,samplePhysicsGraphLine} from "./physicsGraphWorkingEvidenceV2";
import {evaluateExistingSubjectPaper2V2} from "./serverPaper2V2SubjectEngine";

const question=source.questions[0],graphPart=question.parts.find(x=>x.id==="a");
const grid=graphPart.grid,gradient=graphPart.graph.line.gradient;
const xEnd=Math.min(graphPart.graph.line.to,grid.xMax,grid.yMax/gradient*.99);
const line=[{x:0,y:0},{x:xEnd,y:gradient*xEnd}];
const graph={graph:{points:graphPart.graph.points.map(p=>({...p})),line,
 axisXLabel:grid.xLabel,axisYLabel:grid.yLabel,
 axisXMin:grid.xMin,axisXMax:grid.xMax,axisXStep:grid.xStep,
 axisYMin:grid.yMin,axisYMax:grid.yMax,axisYStep:grid.yStep}};
const point=samplePhysicsGraphLine(graph,1.75/gradient,"phy-p2-3-q1");
const reading={answer:"0.35 A",graphEvidence:{kind:"physics-current-reading-v1",point}};
const registered=source.questions.flatMap(q=>q.parts.map(p=>({
 id:q.question_id+"::"+p.id,maxMarks:p.marks,
 sourceMarking:{answer:p.answer,solution:p.solution,modelResponse:p.modelResponse,
  criteria:JSON.parse(JSON.stringify(p.criteria)),responseType:p.responseType}
})));
const evaluate=r=>evaluateExistingSubjectPaper2V2({subjectId:"physics",
 paperId:source.paper_id,criteria:registered,responses:{
 "phy-p2-3-q1::a":graph,"phy-p2-3-q1::e":r
 }});
const row=r=>evaluate(r).rows.find(x=>x.criterionId==="phy-p2-3-q1::e");

test("reading at 1.75 V uses real plotted line, earning three provisional-evaluator marks",()=>{
 expect(validatePhysicsCurrentReading({graphResponse:graph,response:reading})).toBe(true);
 const result=evaluatePhysicsCurrentGraphReading({response:reading,previousGraphResponse:graph});
 expect(result.criteria.map(x=>x.candidateMarks)).toEqual([1,1,1]);
 expect(result.publishable).toBe(false);
 expect(row(reading)).toEqual(expect.objectContaining({suggestedMarks:3,
  maxMarks:3,resolved:true}));
});
test("correct current without saved graph selection cannot earn read-off methods",()=>{
 expect(row({answer:"0.35 A"})).toEqual(expect.objectContaining({
  suggestedMarks:1,resolved:true}));
});
test("off-line, wrong-voltage and mismatched current are not accepted as graph reading",()=>{
 for(const badPoint of [{x:point.x,y:point.y+0.5},
  {x:0.5,y:gradient*.5},{x:-1,y:1.75}]){
  const response={answer:"0.35 A",graphEvidence:{
   kind:"physics-current-reading-v1",point:badPoint}};
  expect(validatePhysicsCurrentReading({graphResponse:graph,response})).toBe(false);
  expect(row(response).suggestedMarks).toBeLessThan(3);
 }
 const incompatible={answer:"0.37 A",graphEvidence:reading.graphEvidence};
 expect(row(incompatible).suggestedMarks).toBeLessThan(3);
});
test("editing the submitted line invalidates previously recorded current selection",()=>{
 const edited={graph:{...graph.graph,line:[{x:0,y:0},{x:xEnd,y:gradient*xEnd*.85}]}};
 expect(validatePhysicsCurrentReading({graphResponse:edited,response:reading})).toBe(false);
 expect(evaluatePhysicsCurrentGraphReading({response:reading,previousGraphResponse:edited})
  .criteria[0].candidateMarks).toBeNull();
});
test("no claim, malformed selection or missing graph never proves a read-off",()=>{
 const malformed={answer:"0.35 A",graphEvidence:{kind:"physics-current-reading-v1",
  point:{x:"0.35",y:1.75}}};
 expect(validatePhysicsCurrentReading({graphResponse:graph,response:malformed})).toBe(false);
 expect(row(malformed).suggestedMarks).toBe(1);
 expect(validatePhysicsCurrentReading({graphResponse:{},response:reading})).toBe(false);
 expect(row({answer:"Read the line at 1.75 V"}).resolved).toBe(false);
});
