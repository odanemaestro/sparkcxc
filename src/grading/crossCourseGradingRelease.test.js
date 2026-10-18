import {auditPaper2MarkBounds,auditCrossCourseCalibration,
  PAPER2_GRADING_SUBJECTS} from "./crossCourseGradingRelease";
import {runCxcOfficialCalibration} from "./cxcOfficialPaper2Calibration";
import {gradeChemistryPaper2Item,CHEMISTRY_P2_GRADER_VERSION} from "../chemistry/practice/chemistryPaper2Grader";
import {gradeIntegratedSciencePaper2Item,INTEGRATED_SCIENCE_P2_GRADER_VERSION} from "../integratedScience/practice/integratedSciencePaper2Grader";
import {gradeEnglishAPaper2Response} from "../englishA/practice/englishAPaper2Grader";
import {physicsValueCheck} from "../physics/paper2/physicsPaper2Marking";
import {markPart} from "../practice/cxcMarking/markScheme";
import {formulaMatches} from "../informationTechnology/practice/itPaper2Marking";
import {gradeSocialStudiesShortAnswer} from "../socialStudies/marking/socialStudiesShortAnswerGrader";
import {gradeFnhWrittenPart,FNH_P2_RUBRIC_CALIBRATION_VERSION} from "../fnh/practice/fnhPaper2Marking";
import {gradePobHistoricalArithmetic} from "../principlesOfBusiness/data/pobHistoricalPaper2Evidence";

const calibration=runCxcOfficialCalibration();
const part=(marks,points)=>({marks,markScheme:{points}});
const chem=(answer)=>gradeChemistryPaper2Item({id:"CALCHEM"},0,0,
  part(1,["ions move through solution"]),{"CALCHEM:0:0":answer}).score;
const sci=(answer)=>gradeIntegratedSciencePaper2Item({id:"CALSCI"},0,0,
  {...part(1,["heat increases evaporation"]),response:{type:"lines"}},
  {"CALSCI:0:0":answer}).score;
const enTask={kind:"summary",module:1,wordLimit:50,
  stimulus:{paragraphs:["Community libraries give young people quiet places to study and reliable access to books."]}};
const eng=(answer)=>gradeEnglishAPaper2Response(enTask,answer)
  .dimensions.find(d=>d.id==="understanding")?.score||0;
const phy=(answer)=>Number(physicsValueCheck(answer,{type:"value",value:4000,unit:"J"}));
const math=(answer)=>markPart({answer},{id:"a",marks:1,check:{type:"numeric",value:150}},{}).marks;
const it=(answer)=>Number(formulaMatches(answer,["=SUM(A1:A3)"]));
const socioScheme={type:"definition",maxMarks:2,groups:[
  {id:"trained",phrases:["highly skilled"],marks:1},
  {id:"leaving",phrases:["leave the country"],marks:1}
]};
const social=(answer)=>gradeSocialStudiesShortAnswer(answer,socioScheme).marks;
const fnhPart={marks:1,modelPoints:["Diet means the usual foods and drinks consumed by a person."]};
const fnh=(answer)=>gradeFnhWrittenPart(fnhPart,answer).confirmedMarks;
const pob=(answer)=>gradePobHistoricalArithmetic("POB-P2-2005-MJ","Q9:a.ii",answer).marks;

const fixtures=[
  ["chemistry",chem,1, "Ions move through solution.","Ions never move through solution.",CHEMISTRY_P2_GRADER_VERSION],
  ["integrated-science",sci,1,"Heat increases evaporation.","Heat does not increase evaporation.",INTEGRATED_SCIENCE_P2_GRADER_VERSION],
  ["english-a",eng,1,
    "Libraries give young people quiet places to study and access to books.",
    "Fruit should be kept in the fridge.","english-a-p2-source-ideas-v1"],
  ["physics",phy,1,"4000 J","4000 W","physics-p2-calibration"],
  ["mathematics",math,1,"150","151","cxc-math-method-v1"],
  ["information-technology",it,1,"=A3+A1+A2","=A3+A1+A1","it-paper2-rule-v1"],
  ["social-studies",social,2,
    "Highly skilled people leave the country.",
    "Visitors spend money in hotels.","social-studies-developed-v1"],
  ["food-nutrition-and-health",fnh,1,
    "Diet means the usual foods and drinks consumed by a person.",
    "A diet is never the usual foods and drinks consumed by a person.",FNH_P2_RUBRIC_CALIBRATION_VERSION],
  ["principles-of-business",pob,2,
    "24000 - 26000 = -2000 deficit; final answer: -2000",
    "Current account balance 3000; final answer: 3000","pob-historical-p2-rubric"]
];

function cases(){
  return fixtures.flatMap(([subjectId,mark,maxMarks,good,bad,rubricVersion])=>[
    {caseId:subjectId+":correct",subjectId,maxMarks,expectedMark:maxMarks,
      observedMark:mark(good),rubricVersion,gradingEvidenceId:"internal-verified-candidate-fixture:"+subjectId,
      label:"positive"},
    {caseId:subjectId+":incorrect",subjectId,maxMarks,expectedMark:0,
      observedMark:mark(bad),rubricVersion,gradingEvidenceId:"internal-verified-candidate-fixture:"+subjectId,
      label:"negative"}
  ]);
}

test("all nine named Paper 2 subjects have positive and negative scorer fixtures",()=>{
  const rows=cases();
  expect(PAPER2_GRADING_SUBJECTS).toHaveLength(9);
  expect(rows).toHaveLength(18);
  for(const row of rows){
    expect({caseId:row.caseId,observed:row.observedMark}).toEqual({
      caseId:row.caseId,observed:row.expectedMark
    });
  }
  // Correct working can receive legitimate method credit even when the
  // candidate's declared final is wrong. Never label this a zero-mark case.
  expect(pob("24000 - 26000 = -2000 deficit; final answer: 3000")).toBe(1);
  const gate=auditCrossCourseCalibration({
    officialReport:calibration,sourceRegistry:calibration.sources,subjectCases:rows
  });
  expect(gate.issues).toEqual([]);
  expect(gate.pass).toBe(true);
  for(const id of PAPER2_GRADING_SUBJECTS){
    expect(gate.bySubject[id].positive).toBe(1);
    expect(gate.bySubject[id].negative).toBe(1);
  }
});
test("a duplicated positive-only benchmark cannot pass a nine-course release",()=>{
  const rows=cases().filter(row=>row.label==="positive");
  const gate=auditCrossCourseCalibration({
    officialReport:calibration,sourceRegistry:calibration.sources,subjectCases:rows
  });
  expect(gate.pass).toBe(false);
  expect(gate.issues).toContain("missing-positive-negative-pair:chemistry");
});
test("official calibration source IDs must match the registered subject and CXC evidence",()=>{
  const officialReport={cases:[...calibration.cases.map(row=>({...row}))]};
  officialReport.cases[0].sourceId="unregistered-source";
  const gate=auditCrossCourseCalibration({
    officialReport,sourceRegistry:calibration.sources,subjectCases:cases()
  });
  expect(gate.issues).toContain("unverified-official-source");
});
test("invented, duplicate, or missing benchmark identities block promotion",()=>{
  const duplicate=cases();
  duplicate[1]={...duplicate[1],caseId:duplicate[0].caseId};
  const gate=auditCrossCourseCalibration({officialReport:calibration,
    sourceRegistry:calibration.sources,subjectCases:duplicate});
  expect(gate.issues).toContain("missing-or-duplicate-case-id");
});
test("an incorrect answer granted credit fails calibration even if all other subjects pass",()=>{
  const rows=cases();
  const target=rows.find(row=>row.subjectId==="physics"&&row.label==="negative");
  target.observedMark=1;
  const gate=auditCrossCourseCalibration({officialReport:calibration,
    sourceRegistry:calibration.sources,subjectCases:rows});
  expect(gate.issues).toContain("calibration-disagreement");
  expect(gate.pass).toBe(false);
});
test("mark reconciliation rejects impossible subject, criterion and part totals",()=>{
  const good=auditPaper2MarkBounds({subjectId:"chemistry",score:2,maxMarks:5,
    unresolvedMarks:1,provisional:true,parts:[
      {score:1,maxMarks:2},{score:1,maxMarks:3}
    ]});
  expect(good.pass).toBe(true);
  expect(good.releaseState).toBe("provisional");
  expect(auditPaper2MarkBounds({subjectId:"chemistry",score:4,maxMarks:5,
    unresolvedMarks:2}).issues).toContain("potential-exceeds-maximum");
  expect(auditPaper2MarkBounds({subjectId:"chemistry",score:2,maxMarks:5,
    unresolvedMarks:1,provisional:true,final:true}).issues).toContain("premature-final-score");
  expect(auditPaper2MarkBounds({subjectId:"chemistry",score:2,maxMarks:5,
    parts:[{score:1,maxMarks:5}]}).issues).toContain("part-score-reconciliation");
  expect(auditPaper2MarkBounds({subjectId:"chemistry",score:1,maxMarks:1,
    criteria:[{score:2,maxMarks:1}]}).issues).toContain("invalid-criterion-marks");
});
