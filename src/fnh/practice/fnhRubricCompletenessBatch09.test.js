import {FNH_HISTORICAL_P2_2005} from "../data/fnhHistorical2005Paper2";
import {FNH_HISTORICAL_P2_2006} from "../data/fnhHistorical2006Paper2";
import {FNH_HISTORICAL_P2_2008} from "../data/fnhHistorical2008Paper2";
import {FNH_HISTORICAL_P2_2009} from "../data/fnhHistorical2009Paper2";
import {FNH_HISTORICAL_P2_2010} from "../data/fnhHistorical2010Paper2";
import {FNH_HISTORICAL_P2_2011} from "../data/fnhHistorical2011Paper2";
import {FNH_HISTORICAL_P2_2012} from "../data/fnhHistorical2012Paper2";
import {FNH_HISTORICAL_P2_2013} from "../data/fnhHistorical2013Paper2";
import {FNH_HISTORICAL_P2_2014} from "../data/fnhHistorical2014Paper2";
import {FNH_HISTORICAL_P2_2015} from "../data/fnhHistorical2015Paper2";
import {FNH_HISTORICAL_P2_2016} from "../data/fnhHistorical2016Paper2";
import {FNH_HISTORICAL_P2_2017} from "../data/fnhHistorical2017Paper2";
import {FNH_HISTORICAL_P2_2018} from "../data/fnhHistorical2018Paper2";
import {FNH_HISTORICAL_P2_2019} from "../data/fnhHistorical2019Paper2";
import {FNH_HISTORICAL_P2_2021} from "../data/fnhHistorical2021Paper2";
import {FNH_HISTORICAL_P2_2022} from "../data/fnhHistorical2022Paper2";
import {FNH_HISTORICAL_P2_2024} from "../data/fnhHistorical2024Paper2";
import {FNH_HISTORICAL_P2_2026} from "../data/fnhHistorical2026Paper2";
import {auditHistoricalWrittenRubricBank} from "../../grading/historicalRubricCompleteness";
import {FNH_PAPER2_ORIGINAL_SET_ONE} from "../data/fnhPaper2Bank";
import {FNH_PAPER2_ORIGINAL_SET_TWO} from "../data/fnhPaper2SetTwo";
import {gradeFnhWrittenPart} from "./fnhPaper2Marking";

const archives=[FNH_HISTORICAL_P2_2005,FNH_HISTORICAL_P2_2006,FNH_HISTORICAL_P2_2008,FNH_HISTORICAL_P2_2009,FNH_HISTORICAL_P2_2010,FNH_HISTORICAL_P2_2011,FNH_HISTORICAL_P2_2012,FNH_HISTORICAL_P2_2013,FNH_HISTORICAL_P2_2014,FNH_HISTORICAL_P2_2015,FNH_HISTORICAL_P2_2016,FNH_HISTORICAL_P2_2017,FNH_HISTORICAL_P2_2018,FNH_HISTORICAL_P2_2019,FNH_HISTORICAL_P2_2021,FNH_HISTORICAL_P2_2022,FNH_HISTORICAL_P2_2024,FNH_HISTORICAL_P2_2026];
test("18 historical FNH papers retain exact question allocations, without claiming official rubrics",()=>{
 expect(archives).toHaveLength(18);
 for(const paper of archives){
   const result=auditHistoricalWrittenRubricBank({
     subjectId:"food-nutrition-and-health",paperId:paper.id,questions:paper.questions
   });
   expect(result.markStructureValid).toBe(true);
   expect(result.questionCount).toBe(paper.questions.length);
   expect(result.offeredMarks).toBe(paper.questions.length*16);
   expect(result.partCount).toBeGreaterThan(0);
 }
});
test("source selection preserves 2005 80-mark optional format and 2018 96-mark compulsory format",()=>{
 const old=archives.find(p=>p.year===2005);
 const oldSelected=[...old.sectionACompulsory,...old.sectionBAvailable.slice(0,old.sectionBChoose)];
 const a=auditHistoricalWrittenRubricBank({
  subjectId:"food-nutrition-and-health",paperId:old.id,questions:old.questions,
  selectedQuestionIds:oldSelected.map(n=>old.questions.find(q=>q.number===n).id),
  expectedSelectedMarks:80
 });
 expect(a.errors).toEqual([]);
 expect(a.offeredMarks).toBe(112);
 expect(a.selectedMarks).toBe(80);
 const newer=archives.find(p=>p.year===2018);
 const b=auditHistoricalWrittenRubricBank({
  subjectId:"food-nutrition-and-health",paperId:newer.id,questions:newer.questions,
  selectedQuestionIds:newer.questions.map(q=>q.id),expectedSelectedMarks:96
 });
 expect(b.errors).toEqual([]);
 expect(b.selectedMarks).toBe(96);
});
test("the FNH source bank records rubric shortfalls separately from correct paper totals",()=>{
 const banks=[...archives,
  {id:"original-one",questions:FNH_PAPER2_ORIGINAL_SET_ONE},
  {id:"original-two",questions:FNH_PAPER2_ORIGINAL_SET_TWO}
 ];
 const audits=banks.map(paper=>auditHistoricalWrittenRubricBank({
  subjectId:"food-nutrition-and-health",paperId:paper.id,questions:paper.questions
 }));
 expect(audits).toHaveLength(20);
 expect(audits.every(a=>a.markStructureValid)).toBe(true);
 expect(audits.reduce((sum,a)=>sum+a.partCount,0)).toBeGreaterThan(250);
 // Warnings remain visible, including bank points that only state instructions.
 expect(audits.every(a=>typeof a.criteriaComplete==="boolean")).toBe(true);
});
test("a part with fewer source points than available marks cannot receive an invented complete grade",()=>{
 const part={id:"a",marks:4,modelPoints:["Fibre supports regular bowel movements."]};
 const audit=auditHistoricalWrittenRubricBank({
  subjectId:"food-nutrition-and-health",paperId:"fixture",
  questions:[{id:"q",marks:4,items:[part]}]
 });
 expect(audit.gaps).toEqual(expect.arrayContaining([
  expect.objectContaining({reason:"insufficient-distinct-model-points",partId:"a"})
 ]));
 const mark=gradeFnhWrittenPart(part,"Fibre supports regular bowel movements.");
 expect(mark.confirmedMarks).toBeLessThanOrEqual(1);
 expect(mark.unresolvedMarks).toBeGreaterThanOrEqual(3);
 expect(mark.assessedMarks).toBeNull();
});
test("rubric audit refuses ambiguous optional selection or source mark conflicts",()=>{
 const questions=[{id:"q1",marks:3,items:[{id:"a",marks:2,modelPoints:["an accurate answer"]}]}];
 const report=auditHistoricalWrittenRubricBank({subjectId:"food-nutrition-and-health",
   paperId:"broken",questions,selectedQuestionIds:["q1","q1"],expectedSelectedMarks:3});
 expect(report.markStructureValid).toBe(false);
 expect(report.errors).toContain("question-mark-mismatch:q1");
 expect(report.errors).toContain("invalid-question-selection");
 expect(report.errors).toContain("selected-total-mismatch");
});
