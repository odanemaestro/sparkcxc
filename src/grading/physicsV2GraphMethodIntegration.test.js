import paper from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import {evaluateExistingSubjectPaper2V2} from "./serverPaper2V2SubjectEngine";
import {samplePhysicsGraphLine} from "./physicsGraphWorkingEvidenceV2";
const q=paper.questions[0];
const rows=paper.questions.flatMap(question=>question.parts.map(part=>({
 id:question.question_id+"::"+part.id,maxMarks:part.marks,
 sourceMarking:{answer:part.answer,solution:part.solution,
  modelResponse:part.modelResponse,criteria:JSON.parse(JSON.stringify(part.criteria)),
  responseType:part.responseType}
})));
const graphPart=q.parts.find(p=>p.id==="b");
const line=[{x:0,y:0},{x:10,y:240}];
const graph={graph:{points:graphPart.graph.points.map(p=>({...p})),line,
 axisXLabel:graphPart.grid.xLabel,axisYLabel:graphPart.grid.yLabel,
 axisXMin:graphPart.grid.xMin,axisXMax:graphPart.grid.xMax,
 axisXStep:graphPart.grid.xStep,axisYMin:graphPart.grid.yMin,
 axisYMax:graphPart.grid.yMax,axisYStep:graphPart.grid.yStep}};
const mark=(part,response,graphResponse=graph)=>{
 const results=evaluateExistingSubjectPaper2V2({subjectId:"physics",
  paperId:paper.paper_id,criteria:rows,responses:{
   "phy-p2-1-q1::b":graphResponse,["phy-p2-1-q1::"+part]:response
  }});
 return results.rows.find(r=>r.criterionId==="phy-p2-1-q1::"+part);
};
test("saved full-size gradient triangle contributes provisional method evidence",()=>{
 const response={answer:"2400 kPa cm³",graphEvidence:{
  kind:"physics-gradient-triangle-v1",
  points:[samplePhysicsGraphLine(graph,2),samplePhysicsGraphLine(graph,8)]
 }};
 const row=mark("c",response);
 expect(row.suggestedMarks).toBe(4);
 expect(row.resolved).toBe(false);
 expect(row.method).toBe("existing-physics-graph-working-advisory");
});
test("a typed triangle claim cannot turn provisional gradient evidence into full credit",()=>{
 const row=mark("c",{answer:"2400 kPa cm³",working:"triangle drawn"});
 expect(row.resolved).toBe(false);
 expect(row.suggestedMarks).toBeLessThanOrEqual(4);
});
test("recorded read-off point contributes provisional pressure method evidence",()=>{
 const point=samplePhysicsGraphLine(graph,100/18);
 const row=mark("d",{answer:"133 kPa",working:"1/18=0.0556",
 graphEvidence:{kind:"physics-pressure-reading-v1",point}});
 expect(row.suggestedMarks).toBe(3);
 expect(row.resolved).toBe(false);
});
test("missing student graph never authorizes trusted geometry",()=>{
 const row=mark("c",{answer:"2400 kPa cm³",graphEvidence:{
 kind:"physics-gradient-triangle-v1",points:[{x:2,y:48},{x:8,y:192}]
 }},{graph:{points:[],line:[]}});
 expect(row.resolved).toBe(false);
 expect(row.method).toBe("existing-physics-rubric-checks");
});
