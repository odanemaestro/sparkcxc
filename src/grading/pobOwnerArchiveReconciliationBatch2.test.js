import {POB_HISTORICAL_REVIEW_BANKS} from "../principlesOfBusiness/data/pobHistoricalArchiveRegistry";
import {buildPobOwnerPaper2Bank,POB_OWNER_P2_GROUPED_RUBRICS} from "../principlesOfBusiness/data/pobPaper2OwnerSourceBank";
import {auditPobOwnerPaper2Calibration} from "./pobOwnerArchiveCalibration";
import {buildPobArchiveExaminerPack,defaultPobArchiveSelection} from "./pobArchiveExaminer";

test("all 38 specifically reviewed grouped prompts retain original source and criteria marks",()=>{
 const counts={"POB-P2-2005-MJ":3,"POB-P2-2006-MJ":1,"POB-P2-2007-MJ":3,
  "POB-P2-2009-MJ":5,"POB-P2-2010-MJ":1,"POB-P2-2011-MJ":4,"POB-P2-2012-MJ":7,
  "POB-P2-2013-MJ":1,"POB-P2-2017-MJ":1,"POB-P2-2018-MJ":3,
  "POB-P2-2019-JAN":1,"POB-P2-2019-MJ":4,"POB-P2-2021-MJ":3,
  "POB-P2-2023-JAN":1};
 expect(Object.values(counts).reduce((n,c)=>n+c,0)).toBe(38);
 for(const [id,count] of Object.entries(counts)){
  const record=POB_HISTORICAL_REVIEW_BANKS.find(r=>r.id===id);
  const paper=buildPobOwnerPaper2Bank(id,record.bank);
  expect(POB_OWNER_P2_GROUPED_RUBRICS[id]).toHaveLength(count);
  for(const key of POB_OWNER_P2_GROUPED_RUBRICS[id]){
   const [n,part]=key.split(":");
   const source=paper.questions.find(q=>q.number===Number(n)).parts.find(p=>p.id===part);
   const authored=record.bank.questions.find(q=>q.number===Number(n));
   const split=authored.parts.filter(p=>p.id.startsWith(part+"."));
   expect(split.length).toBeGreaterThanOrEqual(2);
   expect(source.criteria.length).toBe(split.flatMap(p=>p.criteria).length);
   expect(source.criteria.reduce((sum,c)=>sum+c.marks,0)).toBe(source.marks);
   expect(source.modelAnswer.length).toBeGreaterThan(20);
   expect(source.prompt).toContain("(i)");
  }
  // A previously missing mark key is now reconciled, but does not grant
  // official or public numerical grading.
  const report=auditPobOwnerPaper2Calibration(record);
  expect(report.issues.filter(x=>x.includes("rubric_absent_or_mark_mismatch"))).toEqual([]);
 }
});
test("grouping does not bypass the separate live examiner release gate",()=>{
 const record=POB_HISTORICAL_REVIEW_BANKS.find(r=>r.id==="POB-P2-2009-MJ");
 expect(POB_OWNER_P2_GROUPED_RUBRICS[record.id]).toHaveLength(5);
 expect(()=>buildPobArchiveExaminerPack({paperId:record.id,ownerSource:true,
  selectedQuestions:defaultPobArchiveSelection(record.bank)})).toThrow("owner_calibration_not_released");
 expect(POB_OWNER_P2_GROUPED_RUBRICS["POB-P2-2014-MJ"]).toBeUndefined();
});

test("every one of the twenty owner Paper 2 banks has rubric criteria for all source parts",()=>{
 const rows=POB_HISTORICAL_REVIEW_BANKS.filter(r=>r.paper===2)
  .map(record=>({id:record.id,bank:buildPobOwnerPaper2Bank(record.id,record.bank)}))
  .filter(x=>x.bank);
 expect(rows).toHaveLength(20);
 for(const {id,bank} of rows){
  const parts=bank.questions.flatMap(q=>q.parts);
  const missing=parts.filter(p=>!p.criteria.length||
   p.criteria.reduce((n,c)=>n+c.marks,0)!==p.marks);
  expect({id,missing:missing.map(x=>x.id)}).toEqual({id,missing:[]});
 }
});
