import {POB_PAPER2_ORIGINAL_01,validatePobPaper2} from "./pobPaper2Original";
const clone=()=>JSON.parse(JSON.stringify(POB_PAPER2_ORIGINAL_01));
test("valid original paper satisfies structure and rubric totals",()=>{
 expect(validatePobPaper2()).toEqual({valid:true,issues:[]});
});
test("rejects incomplete Paper 2 exams and incorrect timing",()=>{
 const paper=clone();paper.questions.pop();paper.timeLimitMinutes=90;
 const issues=validatePobPaper2(paper).issues.join(" ");
 expect(issues).toMatch(/Five compulsory/);
 expect(issues).toMatch(/120-minute/);
});
test("rejects repeated part identifiers and missing model answers",()=>{
 const paper=clone(),parts=paper.questions[0].items;
 parts[1].id=parts[0].id;parts[1].modelAnswer="";
 const issues=validatePobPaper2(paper).issues.join(" ");
 expect(issues).toMatch(/duplicate or missing part ID/);
 expect(issues).toMatch(/model answer/);
});
test("rejects marking criteria with inconsistent marks or missing rules",()=>{
 const paper=clone();paper.questions[2].items[0].criteria[0].marks=0;
 paper.questions[2].items[1].criteria[0].rule="";
 const issues=validatePobPaper2(paper).issues.join(" ");
 expect(issues).toMatch(/malformed marking criterion/);
 expect(issues).toMatch(/rubric does not total/);
});
test("handles malformed input without crashing",()=>{
 expect(validatePobPaper2({questions:null}).valid).toBe(false);
 const paper=clone();paper.questions[0].items=null;
 expect(validatePobPaper2(paper).valid).toBe(false);
});
