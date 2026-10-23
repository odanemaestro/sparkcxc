import sources from "../integratedScience/data/integratedSciencePaper2Specs.json";
import {gradeIntegratedSciencePaper2Item} from "../integratedScience/practice/integratedSciencePaper2Grader";
import {scienceFixtures} from "./v2Fixtures/science";

function part(id,label,itemLabel){
 const question=sources[id],pi=question.parts.findIndex(p=>p.label===label);
 const ii=question.parts[pi].items.findIndex(i=>i.label===itemLabel);
 return {question:{...question,id},pi,ii,item:question.parts[pi].items[ii],
  base:id+":"+pi+":"+ii};
}
test("plug colours are marked only against source-owned X, Y and Z terminals",()=>{
 const {question,pi,ii,item,base}=part("IS-M2-P2-08","(b)","(i)");
 const answers={
  [base+":X"]:"green and yellow",[base+":Y"]:"blue",[base+":Z"]:"brown"
 };
 const score=responses=>gradeIntegratedSciencePaper2Item(question,pi,ii,item,responses).score;
 expect(score(answers)).toBe(3);
 expect(score({...answers,[base+":Y"]:"red"})).toBe(2);
 expect(score({[base+":X"]:"blue",[base+":Y"]:"brown",[base+":Z"]:"green and yellow"})).toBe(0);
 expect(score({})).toBe(0);
});
test("all four source CPR steps remain marking evidence, not examiner instructions",()=>{
 const {item}=part("IS-M2-P2-14","(c)","(i)");
 const rules=scienceFixtures({item,maxMarks:4,others:[]});
 expect(rules.blocked).toBeUndefined();
 expect(rules.fixtures.find(f=>f.cls==="full").expect).toBe(4);
 const full=rules.fixtures.find(f=>f.cls==="full").response.answer;
 expect(full).toMatch(/Give 30 chest compressions/i);
 expect(full).toMatch(/Give 2 rescue breaths/i);
 expect(full).toMatch(/emergency help/i);
 expect(full).toMatch(/Open the airway/i);
});
