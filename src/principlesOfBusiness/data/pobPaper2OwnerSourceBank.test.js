import {auditPobOwnerPaper2Source,buildPobOwnerPaper2Bank} from "./pobPaper2OwnerSourceBank";
import {validatePobArchiveSelection,defaultPobArchiveSelection} from "../../grading/pobArchiveExaminer";

test("all twenty supplied paper two sources retain numbered questions and correct per-question marks",()=>{
 const rows=auditPobOwnerPaper2Source();
 expect(rows).toHaveLength(20);
 expect(new Set(rows.map(r=>r.id)).size).toBe(20);
 for(const row of rows){
  expect(row.numbered).toBe(true);
  expect(row.marksMatch).toBe(true);
  expect(row.missingAnswer).toBe(0);
  expect([5,7,9]).toContain(row.questions);
  const paper=buildPobOwnerPaper2Bank(row.id);
  expect(validatePobArchiveSelection(paper,defaultPobArchiveSelection(paper))).toBe(true);
  expect(paper.questions.flatMap(q=>q.parts).every(p=>p.prompt.trim()&&p.modelAnswer.trim()&&p.marks>0)).toBe(true);
 }
});
test("older Paper 2 options preserve compulsory and either-or groupings",()=>{
 const paper=buildPobOwnerPaper2Bank("POB-P2-2005-MJ");
 expect(paper.questions).toHaveLength(9);
 expect(paper.questions.map(q=>q.marks)).toEqual([10,10,20,20,20,20,20,20,20]);
 expect(defaultPobArchiveSelection(paper)).toEqual([1,2,3,4,6,8]);
 expect(paper.questions.flatMap(q=>q.parts).some(p=>p.id==="c")).toBe(true);
});
test("source drafts do not shadow alternative or currently unsupported sittings",()=>{
 expect(buildPobOwnerPaper2Bank("POB-P2-2019-MJ-ALT")).toBeNull();
 expect(buildPobOwnerPaper2Bank("POB-P2-2026-JAN")).toBeNull();
});
