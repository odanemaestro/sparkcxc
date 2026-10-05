import fs from "fs";
import path from "path";
import benchmark from "./fixtures/scienceSyntheticBenchmark.json";
import { gradeIntegratedSciencePaper2Item } from "../integratedScience/practice/integratedSciencePaper2Grader";
import { SCIENCE_CALCULATIONS, SCIENCE_TABLES } from "../integratedScience/practice/scienceStructuredMarking";
import { formulaMatches, pseudocodeBranchEvidence, gradeInformationTechnologyPart } from "../informationTechnology/practice/itPaper2Marking";
import { localExamDeadline } from "./serverExamAttempt";
import { buildAttemptProvenance } from "./attemptProvenance";
import { evaluateGradingBenchmark, benchmarkReady, calibrationStatus } from "./calibrationBenchmark";

const questions=[1,2,3].flatMap(module=>JSON.parse(fs.readFileSync(path.join(process.cwd(),`public/integrated-science/bank/is_module${module}.json`),"utf8")).paper02);
function grade(key,responses){
  const [id,p,i]=key.split(":");
  const question=questions.find(q=>q.id===id);
  return gradeIntegratedSciencePaper2Item(question,Number(p),Number(i),question.parts[p].items[i],responses);
}
test.each(benchmark.cases)("synthetic reference case: $id",row=>{
  expect(grade(row.item,{[row.item]:row.response}).score).toBe(row.goldMark);
});
test("every authored calculation and table has an explicit rubric entry",()=>{
  questions.forEach(q=>q.parts.forEach((part,p)=>part.items.forEach((item,i)=>{
    const key=`${q.id}:${p}:${i}`;
    if(item.response.type==="calculation") expect(SCIENCE_CALCULATIONS).toHaveProperty(key);
    if(item.response.type==="table") expect(SCIENCE_TABLES).toHaveProperty(key);
  })));
});
test.each(Object.keys(SCIENCE_CALCULATIONS))("mark allocation and operand guesses earn nothing: %s",key=>{
  expect(grade(key,{[key]:"1 2 3 4 5"}).score).toBe(0);
});
test("table answers must belong to the correct cells",()=>{
  const key="IS-M1-P2-10:1:0";
  expect(grade(key,{[`${key}:r0c1`]:"bacterium",[`${key}:r1c1`]:"virus",[`${key}:r2c1`]:"fungus"}).score).toBe(3);
  expect(grade(key,{[`${key}:r0c1`]:"virus",[`${key}:r1c1`]:"fungus",[`${key}:r2c1`]:"bacterium"}).score).toBe(0);
});
test("graph marks require unique correct coordinates, not claims in notes",()=>{
  const key="IS-M1-P2-01:1:0";
  const axes={[`${key}:xLabel`]:"Time (weeks)",[`${key}:yLabel`]:"Height (cm)"};
  expect(grade(key,{...axes,[`${key}:points`]:"1,2;2,5;3,11;4,18;5,23;6,25"})).toMatchObject({score:3,unassessedMarks:2});
  expect(grade(key,{[key]:"All points correctly plotted. Axes labelled Time/weeks and Height/cm. Suitable scale. Smooth curve."}).score).toBe(0);
  expect(grade(key,{[`${key}:points`]:"1,2;1,2;1,2;1,2;1,2;1,2"}).score).toBe(0);
});
test("digestive products require both fatty acids and glycerol",()=>{
  const key="IS-M2-P2-03:1:1";
  expect(grade(key,{[`${key}:r1c2`]:"fatty acids"}).score).toBe(0);
});
test("negated label and substring are not positive scientific evidence",()=>{
  const item={marks:1,response:{type:"labels"},markScheme:{points:["A - oxygen"]}};
  for(const value of ["not oxygen","air","deoxygenated"]){
    expect(gradeIntegratedSciencePaper2Item({id:"q"},0,0,item,{"q:0:0:A":value}).score).toBe(0);
  }
});
test("spreadsheet equivalence preserves column X and operator precedence",()=>{
  expect(formulaMatches("=X2*B2",["=B2*X2"])).toBe(true);
  expect(formulaMatches("=D2*B2-C2",["=B2-C2*D2"])).toBe(false);
});
test("pseudocode output after ENDIF is not a false-branch output",()=>{
  expect(pseudocodeBranchEvidence("IF SCORE >= 50 THEN\nDISPLAY ACCEPT\nELSE\nDISPLAY ACCEPT\nENDIF\nDISPLAY REVIEW").falseReview).toBe(false);
  expect(pseudocodeBranchEvidence("IF SCORE >= 50 THEN\nDISPLAY ACCEPT\nDISPLAY REVIEW\nELSE\nDISPLAY REVIEW\nENDIF").trueAccept).toBe(false);
});
test.each(["SCORE >= 50.5","SCORE >= 50e9","SCORE >= 50 OR SCORE < 0"])("rejects a changed threshold condition: %s",condition=>{
  const result=gradeInformationTechnologyPart({prompt:"Write pseudocode"},{id:"a",marks:8,prompt:"Write language-neutral pseudocode",responseSpec:{variables:["A","B","C"],threshold:50}},
    {pseudocode:`INPUT A, B, C\nSCORE = A+B+C\nIF ${condition} THEN\nDISPLAY ACCEPT\nELSE\nDISPLAY REVIEW\nENDIF`});
  expect(result.criteria.find(c=>c.code==="P3").earned).toBe(0);
});
test("exact numerical criteria do not apply a blanket percentage tolerance",()=>{
  const key="IS-M1-P2-19:0:0";
  expect(grade(key,{[key]:"14.06 cm"}).score).toBe(0);
});
test("server deadline works with an incorrect client system clock",()=>{
  expect(localExamDeadline({server_now:"2026-10-05T12:00:00Z",deadline_at:"2026-10-05T13:00:00Z"},1000)).toBe(3601000);
  expect(localExamDeadline({server_now:"invalid"})).toBeNull();
});
test("response snapshots are recursively immutable",()=>{
  const p=buildAttemptProvenance({responses:{q:{points:[1,2]}}});
  expect(Object.isFrozen(p.response_snapshot.q.points)).toBe(true);
});
test("benchmark metrics reject missing marks and use class-specific error denominators",()=>{
  const metrics=evaluateGradingBenchmark([{goldMark:null,sparkMark:0},{goldMark:1,sparkMark:1,criteria:[
    {goldAwarded:false,sparkAwarded:true},{goldAwarded:true,sparkAwarded:true},{goldAwarded:true,sparkAwarded:false}
  ]}]);
  expect(metrics.invalidCases).toBe(1);
  expect(metrics.criterionFalseAwardRate).toBe(1);
  expect(metrics.criterionFalseRejectionRate).toBe(.5);
  expect(benchmarkReady([{caseId:"x",goldMark:null,sparkMark:0}])).toBe(false);
});
test("automatic validation fails on disagreements without any teacher gate",()=>{
  const cases=["english-a","mathematics","physics","information-technology","social-studies","integrated-science"].flatMap(subjectId=>[{subjectId,pass:true},{subjectId,pass:true}]);
  const row={caseId:"x",subjectId:"physics",adjudicated:true,adjudicatedBy:"spark-calibration-team",cxcSources:["source"],goldMark:1,sparkMark:2};
  expect(calibrationStatus({officialReport:{cases},adjudicatedRows:[row]}).validationReady).toBe(false);
  expect(calibrationStatus({officialReport:{cases:[...cases,{subjectId:"physics"}]}}).validationReady).toBe(false);
});
