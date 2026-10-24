import {evaluateExistingSubjectPaper2V2} from "./serverPaper2V2SubjectEngine";

// The source bank's (c)(ii) response depends on part (c)(i), which is
// index 2 within the four source parts of the same question.
const questionId="ss-p2-q1";
const rows=[
 {id:questionId+"::(a)",maxMarks:2,sourceMarking:{marking:{type:"list",maxMarks:2,maxPoints:2,points:[]}}},
 {id:questionId+"::(b)",maxMarks:4,sourceMarking:{marking:{type:"developed_points",maxMarks:4,maxPoints:2,points:[]}}},
 {id:questionId+"::(c) (i)",maxMarks:4,sourceMarking:{marking:{type:"developed_points",maxMarks:4,maxPoints:2,
   points:[{id:"financial-support",concepts:["financial_counselling"],developmentConcepts:["budgeting"]}]}}},
 {id:questionId+"::(c) (ii)",maxMarks:4,sourceMarking:{marking:{type:"linked_development",maxMarks:4,maxPoints:2,
   followFromPartIndex:2,
   links:[{id:"financial-benefit",triggerConcepts:["financial_counselling"],
     resultConcepts:["improved_money_control"]}]}}}
];
const previousId=rows[2].id, linkedId=rows[3].id;
const explanation="Financial counselling helps families manage money better.";
const grade=(responses,criteria=rows)=>evaluateExistingSubjectPaper2V2({
 subjectId:"social-studies",paperId:"ss-p2-original-A",criteria,responses
}).rows.find(row=>row.criterionId===linkedId);

test("Social Studies linked source part earns explanation marks only with the prior strategy",()=>{
 const withSource=grade({[previousId]:"Provide financial counselling and a budget.",
  [linkedId]:explanation});
 expect(withSource.suggestedMarks).toBe(2);
 expect(withSource.resolved).toBe(false); // Draft subject cannot publish yet.
 expect(grade({[linkedId]:explanation}).suggestedMarks).toBe(0);
 expect(grade({[previousId]:"Organise a sports day", [linkedId]:explanation}).suggestedMarks).toBe(0);
});

test("an unrelated prior question cannot supply source follow-through evidence",()=>{
 expect(grade({["ss-p2-q2::(c) (i)"]:"Provide financial counselling",
  [linkedId]:explanation}).suggestedMarks).toBe(0);
});

test("invalid or reordered source follow-through index fails closed",()=>{
 const malformed=rows.map(r=>({...r,sourceMarking:{...r.sourceMarking,
  marking:{...r.sourceMarking.marking}}}));
 malformed[3].sourceMarking.marking.followFromPartIndex=3;
 expect(()=>grade({[previousId]:"Provide financial counselling",
  [linkedId]:explanation},malformed)).toThrow(/Invalid Social Studies source follow-through index/);
});
