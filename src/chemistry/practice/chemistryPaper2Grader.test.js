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


test("extra or malformed Chemistry graph points cannot earn full plotting credit",()=>{
 const item={marks:3,response:{type:"graph",x:"time",y:"temperature",points:[{x:0,y:0},{x:1,y:1},{x:2,y:2}]},markScheme:{points:[]}};
 const graph=points=>JSON.stringify({version:1,kind:"line",connection:"smooth",x:{min:0,max:5,step:1},y:{min:0,max:5,step:1},series:[{name:"",points}]});
 const base={"CHEM:0:0:xLabel":"time","CHEM:0:0:yLabel":"temperature"};
 const good=gradeChemistryPaper2Item(question,0,0,item,{...base,"CHEM:0:0:graph":graph("0, 0\n1, 1\n2, 2")});
 const extra=gradeChemistryPaper2Item(question,0,0,item,{...base,"CHEM:0:0:graph":graph("0, 0\n1, 1\n2, 2\n4, 4")});
 const malformed=gradeChemistryPaper2Item(question,0,0,item,{...base,"CHEM:0:0:graph":graph("0, 0\n1, 1\n2, 2\noops")});
 expect(good.score).toBe(3);
 expect(extra.score).toBe(1);
 expect(malformed.score).toBe(1);
 expect(extra.visualEvidence.validPoints).toBe(true);
 expect(malformed.visualEvidence.validPoints).toBe(false);
});

test("incidental source numbers do not award the scientific explanation",()=>{
 expect(grade(1,["2 electrons are transferred"],"2").score).toBe(0);
 expect(grade(1,["2 electrons are transferred"],"Two electrons are transferred.").score).toBe(0);
});
