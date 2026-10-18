import {gradeChemistryPaper2Item,gradeChemistryPaper2} from "./chemistryPaper2Grader";

const question={id:"CHEM"};
const grade=(marks,points,response)=>gradeChemistryPaper2Item(question,0,0,{marks,markScheme:{points}},{"CHEM:0:0":response});

test("credits supported Chemistry facts without inferring extra marks from one rubric point",()=>{
 const result=grade(3,["electrons transfer between atoms"],"Electrons transfer between atoms.");
 expect(result.score).toBe(1);
 expect(result.unassessedMarks).toBe(2);
 expect(result.provisional).toBe(true);
});
test("does not form one marking point by collecting unrelated sentences",()=>{
 expect(grade(1,["heat increases reaction rate"],"Heat increases. Reaction rate changes.").score).toBe(0);
 expect(grade(1,["heat increases reaction rate"],"Heat increases reaction rate.").score).toBe(1);
});
test("rejects direct contradictions rather than scoring shared keywords",()=>{
 expect(grade(1,["heat increases reaction rate"],"Heat increases reaction rate. Heat does not increase reaction rate.").score).toBe(0);
});
test("does not credit repeated identical marking points twice",()=>{
 const result=grade(2,["ions move through solution","ions move through solution"],"Ions move through solution.");
 expect(result.score).toBe(1);
});
test("does not mistake an intermediate number for the explicitly different final answer",()=>{
 expect(grade(1,["25.0"],"Working: 25.0; final answer: 80.0").score).toBe(0);
 expect(grade(1,["25.0"],"final answer: 25.0").score).toBe(1);
});
test("does not use the former 2.5 percent tolerance for a numerical answer",()=>{
 expect(grade(1,["25.0"],"25.4").score).toBe(0);
 expect(grade(1,["25.0"],"25.0").score).toBe(1);
});
test("preserves paper score caps and identifies unresolved separately",()=>{
 const paper={questions:[{id:"CHEM",totalMarks:3,parts:[{items:[{marks:3,markScheme:{points:["ions move through solution"]}}]}]}]};
 const result=gradeChemistryPaper2(paper,{"CHEM:0:0":"Ions move through solution."});
 expect(result.score).toBe(1);
 expect(result.maxPossibleScore).toBe(3);
 expect(result.unassessedMarks).toBe(2);
});
