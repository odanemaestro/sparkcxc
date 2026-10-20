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
   criteria:p.criteria,responseType:p.responseType
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
   {answer:"all six points plotted, best fit line drawn"},
   {graph:{points:[],line:[]}}]){
   const graded=evaluate(value);
   expect(item(graded).suggestedMarks).toBe(0);
   expect(graded.canPublishFinalScore).toBe(false);
  }
 });
 test("wrong axes, distorted line and missing or extra points lose their corresponding marks",()=>{
  const graph=responseFor(part);
  const wrongAxes=structuredClone(graph);
  wrongAxes.graph.axisXLabel="Pressure";wrongAxes.graph.axisYLabel="Current";
  expect(item(evaluate(wrongAxes)).suggestedMarks).toBeLessThan(7);
  const brokenLine=structuredClone(graph);
  brokenLine.graph.line=[{x:0,y:0},{x:graph.graph.line[1].x,y:0}];
  expect(item(evaluate(brokenLine)).suggestedMarks).toBeLessThanOrEqual(5);
  const missing=structuredClone(graph);
  missing.graph.points=missing.graph.points.slice(0,-2);
  expect(item(evaluate(missing)).suggestedMarks).toBeLessThan(7);
  const extra=structuredClone(graph);
  extra.graph.points.push({x:Number(part.grid.xMax)*.7,y:0});
  expect(item(evaluate(extra)).suggestedMarks).toBeLessThan(7);
 });
 test("malformed/unbounded/spoofed graph evidence fails closed",()=>{
  for(const modify of [
   g=>{g.graph.points[0].x=Infinity;},
   g=>{g.graph.points[0].x="0.2";},
   g=>{g.graph.points[0].x=1e10;},
   g=>{g.graph.points[0].credit=7;},
   g=>{g.graph.points=Array(25).fill({x:0,y:0});},
   g=>{g.graph.line=[{x:0,y:0}];},
   g=>{g.graph.points=[];g.graph.line=[];}
  ]){
   const artifact=responseFor(part);
   modify(artifact);
   expect(item(evaluate(artifact)).suggestedMarks).toBe(0);
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
