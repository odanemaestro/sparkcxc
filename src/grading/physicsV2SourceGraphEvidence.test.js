import {evaluateExistingSubjectPaper2V2} from "./serverPaper2V2SubjectEngine";
import paper1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import paper2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import paper3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import paper4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";

const cases=[paper1,paper2,paper3,paper4];
const registered=paper=>paper.questions.flatMap(q=>q.parts.map(p=>({
  id:q.question_id+"::"+p.id,maxMarks:p.marks,
  sourceMarking:{
   answer:p.answer,solution:p.solution,modelResponse:p.modelResponse,
   criteria:JSON.parse(JSON.stringify(p.criteria)),responseType:p.responseType
  }
})));
const graphPart=paper=>{
 const question=paper.questions.find(q=>q.parts.some(p=>p.responseType==="graph"));
 const part=question.parts.find(p=>p.responseType==="graph");
 return {part,id:question.question_id+"::"+part.id};
};
const responseFor=part=>{
 const grid=part.grid;
 const line=part.graph.line;
 const x=Math.min(Number(grid.xMax)*.85,Number(line.from||0)+
  (Number(line.to)-Number(line.from))*.85);
 return {answer:"",graph:{
  points:part.graph.points.map(p=>({...p})),
  line:[{x:0,y:Number(line.intercept||0)},
   {x,y:x*Number(line.gradient)+Number(line.intercept||0)}],
  axisXLabel:grid.xLabel,axisYLabel:grid.yLabel,
  axisXMin:grid.xMin,axisXMax:grid.xMax,axisYMin:grid.yMin,axisYMax:grid.yMax,
  axisXStep:grid.xStep,axisYStep:grid.yStep
 }};
};

describe.each(cases)("Physics source graph V2, $paper_id",paper=>{
 const {part,id}=graphPart(paper);
 const criteria=registered(paper);
 const evaluate=value=>evaluateExistingSubjectPaper2V2({
  subjectId:"physics",paperId:paper.paper_id,criteria,
  responses:{[id]:value}
 });
 const item=res=>res.rows.find(x=>x.criterionId===id);
 test("source-backed, accurately plotted typed graph earns bounded diagnostic marks, never final authority",()=>{
  const graded=evaluate(responseFor(part));
  expect(item(graded)).toEqual(expect.objectContaining({
   criterionId:id,maxMarks:7,suggestedMarks:7,resolved:false,
   method:"source-graph-typed-advisory"
  }));
  expect(graded.canPublishFinalScore).toBe(false);
  expect(graded.confirmedMarks).toBe(null);
 });
 test("text claiming the graph is correct never earns visual marks",()=>{
  for(const value of ["A correct graph with all points and best fit",
   {answer:"all six points plotted, best fit line drawn"}]){
   const graded=evaluate(value);
   expect(item(graded).suggestedMarks).toBe(0);
   expect(graded.canPublishFinalScore).toBe(false);
  }
  expect(item(evaluate({graph:{points:[],line:[]}})).suggestedMarks).toBe(0);
 });
 test("wrong axes, distorted line and missing or extra points lose their corresponding marks",()=>{
  const graph=responseFor(part);
  const wrongAxes=JSON.parse(JSON.stringify(graph));
  wrongAxes.graph.axisXLabel="Pressure";wrongAxes.graph.axisYLabel="Current";
  expect(item(evaluate(wrongAxes)).suggestedMarks).toBeLessThan(7);
  const brokenLine=JSON.parse(JSON.stringify(graph));
  brokenLine.graph.line=[{x:0,y:0},{x:graph.graph.line[1].x,y:0}];
  expect(item(evaluate(brokenLine)).suggestedMarks).toBeLessThanOrEqual(5);
  const missing=JSON.parse(JSON.stringify(graph));
  missing.graph.points=missing.graph.points.slice(0,-2);
  expect(item(evaluate(missing)).suggestedMarks).toBeLessThan(7);
  const extra=JSON.parse(JSON.stringify(graph));
  extra.graph.points.push({x:Number(part.grid.xMax)*.7,y:0});
  expect(item(evaluate(extra)).suggestedMarks).toBeLessThan(7);
 });
 test("rejects a tiny exact-slope segment and contradictory axis labels",()=>{
  const good=responseFor(part);
  const tiny=JSON.parse(JSON.stringify(good));
  const m=Number(part.graph.line.gradient);
  const x=Number(part.graph.points[0].x);
  const delta=(Math.max(...part.graph.points.map(p=>p.x))-
    Math.min(...part.graph.points.map(p=>p.x)))*0.01;
  tiny.graph.line=[{x,y:m*x},{x:x+delta,y:m*(x+delta)}];
  expect(item(evaluate(tiny)).suggestedMarks).toBeLessThanOrEqual(5);
  const contradicted=JSON.parse(JSON.stringify(good));
  contradicted.graph.axisXLabel="not "+String(part.grid.xLabel);
  expect(item(evaluate(contradicted)).suggestedMarks).toBeLessThanOrEqual(6);
  const flipped=JSON.parse(JSON.stringify(good));
  flipped.graph.axisXLabel="incorrect "+String(part.grid.xLabel);
  expect(item(evaluate(flipped)).suggestedMarks).toBeLessThanOrEqual(6);
 });
 test("malformed/unbounded/spoofed graph evidence fails closed",()=>{
  for(const [name,modify] of [
   ["infinity",g=>{g.graph.points[0].x=Infinity;}],
   ["numeric-string",g=>{g.graph.points[0].x="0.2";}],
   ["out-of-grid",g=>{g.graph.points[0].x=1e10;}],
   ["spoofed-credit",g=>{g.graph.points[0].credit=7;}],
   ["too-many-points",g=>{g.graph.points=Array(25).fill({x:0,y:0});}],
   ["single-line-endpoint",g=>{g.graph.line=[{x:0,y:0}];}],
   ["empty-artifact",g=>{g.graph.points=[];g.graph.line=[];}]
  ]){
   const artifact=responseFor(part);
   modify(artifact);
   const marks=item(evaluate(artifact)).suggestedMarks;
   // A malformed line forfeits B4 (2 marks), not legitimate separate
   // axis/scales/points B1+B2+B3 (5 marks).
   const expected=name==="single-line-endpoint"?5:0;
   expect({name,marks}).toEqual({name,marks:expected});
  }
 });
 test("source criteria mutation cannot claim trust in graph geometry",()=>{
  const altered=registered(paper);
  const target=altered.find(c=>c.id===id);
  target.sourceMarking.criteria[0]={...target.sourceMarking.criteria[0],
   description:"Fabricated source marking scheme"};
  expect(()=>evaluateExistingSubjectPaper2V2({
   subjectId:"physics",paperId:paper.paper_id,criteria:altered,
   responses:{[id]:responseFor(part)}
  })).toThrow(/source drift/i);
 });
});
