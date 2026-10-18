import {gradeIntegratedSciencePaper2Item,gradeIntegratedSciencePaper2} from "./integratedSciencePaper2Grader";

const question={id:"SCI"};
const grade=(marks,points,response)=>gradeIntegratedSciencePaper2Item(question,0,0,{marks,markScheme:{points}},{"SCI:0:0":response});

test("supports science evidence within one meaningful answer statement",()=>{
 expect(grade(1,["heat increases evaporation"],"Heat increases evaporation.").score).toBe(1);
 expect(grade(1,["heat increases evaporation"],"Heat increases. Evaporation occurs.").score).toBe(0);
});
test("rejects science statements that directly contradict source claims",()=>{
 const result=grade(1,["heat increases evaporation"],"Heat increases evaporation. Heat does not increase evaporation.");
 expect(result.score).toBe(0);
});
test("does not award multiple marks from one unpartitioned sentence in the source scheme",()=>{
 const result=grade(4,["heat increases evaporation"],"Heat increases evaporation.");
 expect(result.score).toBe(1);
 expect(result.unassessedMarks).toBe(3);
 expect(result.provisional).toBe(true);
});
test("retains independent rubric point credit and deduplicates repeated points",()=>{
 expect(grade(2,["heat increases evaporation","heat increases evaporation"],"Heat increases evaporation.").score).toBe(1);
 expect(grade(2,["heat increases evaporation","water vapour condenses"],"Heat increases evaporation. Water vapour condenses.").score).toBe(2);
});
test("conservatively separates verified and unresolved scores in full papers",()=>{
 const paper=[{id:"SCI",totalMarks:3,parts:[{items:[{marks:3,markScheme:{points:["heat increases evaporation"]}}]}]}];
 const result=gradeIntegratedSciencePaper2(paper,{"SCI:0:0":"Heat increases evaporation."});
 expect(result.score).toBe(1);
 expect(result.unassessedMarks).toBe(2);
 expect(result.maxPossibleScore).toBe(3);
});
