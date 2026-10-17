import {POB_CXC_2019_SPECIMEN_PAPER2 as specimen,validatePobSpecimenPaper2Draft} from "./pobCxc2019SpecimenPaper2Draft";
describe("CXC 2019 specimen POB Paper 2 source mark scheme mapping",()=>{
 test("five official 20-mark questions preserve 100 marks across 25 source-linked parts",()=>{
  expect(validatePobSpecimenPaper2Draft()).toEqual({valid:true,sourceMapped:true,simulatorReady:false,problems:[]});
  expect(specimen.questions).toHaveLength(5);
  expect(specimen.questions.flatMap(q=>q.parts)).toHaveLength(25);
  expect(specimen.questions.map(q=>q.marks)).toEqual([20,20,20,20,20]);
  expect(specimen.questions.flatMap(q=>q.parts).reduce((s,p)=>s+p.marks,0)).toBe(100);
  expect(specimen.sourceQuestionPdfPages[0]).toBe(90);
  expect(specimen.sourceQuestionPdfPages.at(-1)).toBe(102);
  expect(specimen.sourceSchemePdfPages[0]).toBe(109);
  expect(specimen.sourceSchemePdfPages.at(-1)).toBe(120);
 });
 test("rubric retains named official equivalents while requiring semantic verification",()=>{
  expect(specimen.questions[0].parts.find(p=>p.id==="a-ii").acceptableExamples).toContain("self-employment");
  expect(specimen.questions[1].parts.find(p=>p.id==="a-i").acceptableExamples).toContain("planning");
  expect(specimen.questions[3].parts.find(p=>p.id==="c-ii").acceptableExamples).toContain("frustration");
  expect(specimen.questions[4].parts.find(p=>p.id==="a-ii").acceptableExamples).toContain("consumer protection law");
  expect(specimen.questions.flatMap(q=>q.parts).every(p=>p.sourceVerified&&!p.automaticallyCertified)).toBe(true);
  expect(specimen.simulatorReady).toBe(false);
 });
 test("inaccurate marks or unsupported automatic publication fail gate",()=>{
  const broken={...specimen,questions:specimen.questions.map((q,i)=>i===2?{...q,parts:q.parts.map((p,j)=>j===0?{...p,marks:4}:p)}:q)};
  expect(validatePobSpecimenPaper2Draft(broken).valid).toBe(false);
  const pretendApproved={...specimen,simulatorReady:true};
  expect(validatePobSpecimenPaper2Draft(pretendApproved).valid).toBe(false);
 });
});