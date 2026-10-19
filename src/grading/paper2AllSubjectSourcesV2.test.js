import fs from "fs";
import path from "path";
import {
 PAPER2_V2_SOURCE_INVENTORY,auditPaper2SubjectSourceInventory
} from "./paper2AllSubjectSourcesV2";
import {PAPER2_GRADING_SUBJECTS} from "./crossCourseGradingRelease";
import {
 CHEMISTRY_PAPER2_PRACTICE_SETS,CHEMISTRY_PAPER2_FORMAT
} from "../chemistry/data/chemistryPaper2Bank";
import {englishAPaper2Sets,englishAPaper2BankSummary} from "../englishA/data/englishAPaper2Bank";
import {FNH_PAPER2_PRACTICE_SETS,FNH_PAPER2_FORMAT} from "../fnh/data/fnhPaper2Bank";
import itData from "../informationTechnology/practice/itPaper2Data.json";
import {INTEGRATED_SCIENCE_PAPER2_MARKS} from "../integratedScience/practice/integratedScienceExamModel";
import {PAPER2_QUESTION_BANK_V2} from "../practice/paper2QuestionBankV2";
import {PHYSICS_PAPER2_PAPERS,PHYSICS_PAPER2_MARKS} from "../physics/paper2/physicsPaper2Bank";
import {POB_PAPER2_ORIGINAL_01,validatePobPaper2} from "../principlesOfBusiness/data/pobPaper2Original";
import {SOCIAL_STUDIES_PAPER2} from "../socialStudies/data/socialStudiesExamBank";
import {mapMathematicsPaper2} from "./paper2RemainingAdaptersV2";
import {mapInformationTechnologyPaper2,mapPhysicsPaper2} from "./paper2TechnicalAdaptersV2";
import {mapChemistryPaper2,mapFnhHistoricalPaper2} from "./paper2CriteriaAdapterV2";
import {mapEnglishAPaper2,mapIntegratedSciencePaper2} from "./paper2AdditionalAdaptersV2";
import {mapSocialStudiesPaper2} from "./paper2RemainingAdaptersV2";
import {mapPobPaper2Manifest} from "./pobPaper2ManifestAdapterV2";

test("every one of the nine real subjects has its source bank, grader and V2 adapter checked in",()=>{
 const audited=auditPaper2SubjectSourceInventory();
 expect(audited.pass).toBe(true);
 expect(audited.issues).toEqual([]);
 expect(PAPER2_V2_SOURCE_INVENTORY.map(x=>x.subjectId).sort())
  .toEqual([...PAPER2_GRADING_SUBJECTS].sort());
 for(const entry of PAPER2_V2_SOURCE_INVENTORY){
  expect(fs.existsSync(path.resolve(process.cwd(),entry.source))).toBe(true);
  expect(fs.existsSync(path.resolve(process.cwd(),entry.marker))).toBe(true);
  expect(entry.verifiedServerRubric).toBe(false);
  expect(entry.canPublishV2FinalScore).toBe(false);
 }
 expect(audited.serverRubricsVerified).toBe(0);
 expect(audited.canPublishFinalScore).toBe(false);
});
test("fake verification status and missing subject cause source inventory to fail closed",()=>{
 const claimed=PAPER2_V2_SOURCE_INVENTORY.map((x,i)=>i===0?
  {...x,verifiedServerRubric:true,canPublishV2FinalScore:true}:x);
 expect(auditPaper2SubjectSourceInventory(claimed).pass).toBe(false);
 const missing=PAPER2_V2_SOURCE_INVENTORY.filter(x=>x.subjectId!=="english-a");
 expect(auditPaper2SubjectSourceInventory(missing).issues)
  .toContain("missing-subject:english-a");
});
test("real Chemistry paper marking points and totals exist",()=>{
 expect(CHEMISTRY_PAPER2_PRACTICE_SETS.length).toBeGreaterThan(0);
 expect(CHEMISTRY_PAPER2_FORMAT.totalMarks).toBe(100);
 for(const paper of CHEMISTRY_PAPER2_PRACTICE_SETS){
  expect(paper.questions.reduce((n,q)=>n+q.totalMarks,0)).toBe(100);
  const points=paper.questions.flatMap(q=>q.parts.flatMap(p=>p.items));
  expect(points.length).toBeGreaterThan(0);
  expect(points.every(item=>Array.isArray(item.markScheme?.points)&&
   item.markScheme.points.length>0)).toBe(true);
 }
 expect(typeof mapChemistryPaper2).toBe("function");
});
test("real English A source tasks contain a descriptive marking rubric",()=>{
 expect(englishAPaper2Sets.length).toBeGreaterThan(0);
 expect(englishAPaper2BankSummary().marksPerSet).toBe(120);
 for(const set of englishAPaper2Sets){
  expect(set.tasks.length).toBeGreaterThan(0);
  expect(set.tasks.every(t=>Number.isFinite(t.rubric?.marks)&&t.rubric.marks>0)).toBe(true);
  expect(set.tasks.some(t=>Array.isArray(t.rubric?.criteria)&&t.rubric.criteria.length>0)).toBe(true);
 }
 expect(typeof mapEnglishAPaper2).toBe("function");
});
test("real FNH source items contain alternative model marking points",()=>{
 expect(FNH_PAPER2_PRACTICE_SETS.length).toBeGreaterThan(0);
 expect(FNH_PAPER2_FORMAT.totalMarks).toBe(96);
 for(const paper of FNH_PAPER2_PRACTICE_SETS){
  expect(paper.questions.reduce((n,q)=>n+q.marks,0)).toBe(96);
  expect(paper.questions.flatMap(q=>q.items).some(item=>
   Array.isArray(item.modelPoints)&&item.modelPoints.length>0)).toBe(true);
 }
 expect(typeof mapFnhHistoricalPaper2).toBe("function");
});
test("real IT Paper 2 marking scheme retains 90 marks per paper",()=>{
 expect(itData.papers.length).toBeGreaterThan(0);
 for(const paper of itData.papers){
  const mapped=mapInformationTechnologyPaper2({paper});
  expect(mapped.criteria.reduce((n,c)=>n+c.maxMarks,0)).toBe(itData.format.marks);
  expect(paper.questions.flatMap(q=>q.parts).some(p=>
   Array.isArray(p.markScheme)&&p.markScheme.length>0)).toBe(true);
 }
});
test("Integrated Science has its real Paper 2 bank assets and grader adapter",()=>{
 const bank=path.resolve(process.cwd(),"public/integrated-science/bank");
 const idx=JSON.parse(fs.readFileSync(path.join(bank,"index.json"),"utf8"));
 expect(idx).toBeTruthy();
 for(const moduleId of [1,2,3]){
  const moduleData=JSON.parse(fs.readFileSync(path.join(bank,"is_module"+moduleId+".json"),"utf8"));
  expect(Array.isArray(moduleData.paper02)).toBe(true);
  expect(moduleData.paper02.length).toBeGreaterThan(0);
 }
 expect(INTEGRATED_SCIENCE_PAPER2_MARKS).toBe(105);
 expect(typeof mapIntegratedSciencePaper2).toBe("function");
});
test("100 original Maths question templates have source answers and source marks",()=>{
 expect(PAPER2_QUESTION_BANK_V2).toHaveLength(100);
 for(const paper of Array.from({length:10},(_,i)=>i+1)){
  const questions=PAPER2_QUESTION_BANK_V2.filter(q=>q.question_id.endsWith("-v"+paper));
  expect(questions).toHaveLength(10);
  expect(questions.reduce((n,q)=>n+q.marks,0)).toBe(100);
  expect(questions.every(q=>q.parts.every(p=>p.marks>0&&p.answer))).toBe(true);
 }
 expect(typeof mapMathematicsPaper2).toBe("function");
});
test("real Physics source banks have 100-mark criterion-structured parts",()=>{
 expect(PHYSICS_PAPER2_PAPERS.length).toBeGreaterThan(0);
 for(const paper of PHYSICS_PAPER2_PAPERS){
  expect(paper.marks).toBe(PHYSICS_PAPER2_MARKS);
  const mapped=mapPhysicsPaper2({paper});
  expect(mapped.criteria.reduce((n,c)=>n+c.maxMarks,0)).toBe(PHYSICS_PAPER2_MARKS);
  expect(paper.questions.flatMap(q=>q.parts).some(p=>
   Array.isArray(p.criteria)&&p.criteria.length>0)).toBe(true);
 }
});
test("Principles of Business contains source-linked, criterion-summed authored rubrics",()=>{
 expect(validatePobPaper2(POB_PAPER2_ORIGINAL_01).valid).toBe(true);
 expect(POB_PAPER2_ORIGINAL_01.marks).toBe(100);
 expect(POB_PAPER2_ORIGINAL_01.questions.every(q=>q.items.every(p=>
  p.criteria.reduce((n,c)=>n+c.marks,0)===p.marks))).toBe(true);
 expect(typeof mapPobPaper2Manifest).toBe("function");
});
test("Social Studies source contains structured and essay marking evidence",()=>{
 expect(SOCIAL_STUDIES_PAPER2.length).toBeGreaterThan(0);
 expect(SOCIAL_STUDIES_PAPER2.some(q=>q.type==="essay"&&q.contentMarks>0&&
  q.organizationMarks>0)).toBe(true);
 expect(SOCIAL_STUDIES_PAPER2.some(q=>q.type==="structured"&&
  q.parts.some(p=>p.marking))).toBe(true);
 expect(typeof mapSocialStudiesPaper2).toBe("function");
});
