import {evaluateExistingSubjectPaper2V2} from "./serverPaper2V2SubjectEngine";
import {markPhysicsPaper2} from "../physics/paper2/physicsPaper2Marking";
import paper1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import paper2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";

const registered=paper=>paper.questions.flatMap(q=>q.parts.map(p=>({
 id:q.question_id+"::"+p.id,maxMarks:p.marks,
 sourceMarking:{answer:p.answer,solution:p.solution,modelResponse:p.modelResponse,
  criteria:JSON.parse(JSON.stringify(p.criteria)),responseType:p.responseType}
})));
const grade=(paper,id,response)=>evaluateExistingSubjectPaper2V2({subjectId:"physics",
 paperId:paper.paper_id,criteria:registered(paper),responses:{[id]:response}}).rows.find(r=>r.criterionId===id);
const markPart=(paper,qid,pid,response)=>{
 const q=paper.questions.find(x=>x.question_id===qid);
 return markPhysicsPaper2({...paper,questions:[{...q,parts:q.parts.filter(p=>p.id===pid)}]},
  {[qid+"::"+pid]:response}).criteria;
};

test("a reversed claim sharing the model's words earns nothing",()=>{
 // Model: increase the current, increase the number of turns, use a soft iron core.
 const row=grade(paper2,"phy-p2-2-q5::c",{answer:"decrease the current, decrease the number of turns on the coil, and use a stronger magnet."});
 expect(row.suggestedMarks).toBe(0);
});

test("a part answer does not collect every criterion through a model-answer match",()=>{
 const lines=markPart(paper1,"phy-p2-1-q2","c",{answer:"Pressure is the force acting normally per unit area."});
 expect(lines.find(l=>l.criterion.code==="B1").earned).toBe(1);
 expect(lines.find(l=>l.criterion.code==="B2").earned).toBe(0);
});

test("a category line is not met by repeating its own words",()=>{
 // "a correct example of a transverse wave" needs an example.
 const lines=markPart(paper1,"phy-p2-1-q4","a",{answer:"In a transverse wave the particles vibrate at right angles to the direction of travel"});
 expect(lines.filter(l=>l.earned>0).map(l=>l.criterion.code)).toEqual(["B1"]);
});

test("a stated formula earns its method mark and certifies it",()=>{
 const row=grade(paper1,"phy-p2-1-q2::f",{answer:"212000 Pa",working:"P = hρg"});
 expect(row).toEqual(expect.objectContaining({suggestedMarks:1,resolved:true,method:"existing-physics-rubric-checks"}));
});

test("an explicit denial is never certified",()=>{
 const row=grade(paper1,"phy-p2-1-q2::e",{answer:"The smallest face, because pressure is inversely proportional to area for a fixed force.\nIt is false that the smallest face."});
 expect(row.resolved).toBe(false);
});

test("follow-through and graph-reading method marks stay provisional",()=>{
 const row=grade(paper1,"phy-p2-1-q1::d",{answer:"133 kPa",working:"1/V = 1/18.0 = 5.56 × 10⁻² cm⁻³; read off the line"});
 expect(row.resolved).toBe(false);
});
