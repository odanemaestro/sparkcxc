import {POB_HISTORICAL_REVIEW_BANKS} from "../principlesOfBusiness/data/pobHistoricalArchiveRegistry";
import {buildPobOwnerPaper2Bank,POB_OWNER_P2_GROUPED_RUBRICS} from "../principlesOfBusiness/data/pobPaper2OwnerSourceBank";
import {auditPobOwnerPaper2Calibration} from "./pobOwnerArchiveCalibration";

test("2005, 2006 and 2007 mark rules map to original grouped question parts",()=>{
 const expected={"POB-P2-2005-MJ":3,"POB-P2-2006-MJ":1,"POB-P2-2007-MJ":3};
 for(const [id,count] of Object.entries(expected)){
  const record=POB_HISTORICAL_REVIEW_BANKS.find(r=>r.id===id);
  const paper=buildPobOwnerPaper2Bank(id,record.bank);
  for(const key of POB_OWNER_P2_GROUPED_RUBRICS[id]){
   const [n,part]=key.split(":");
   const source=paper.questions.find(q=>q.number===Number(n)).parts.find(p=>p.id===part);
   expect(source).toBeDefined();
   expect(source.criteria).toHaveLength(
    record.bank.questions.find(q=>q.number===Number(n)).parts
      .filter(p=>p.id.startsWith(part+".")).flatMap(p=>p.criteria).length);
   expect(source.criteria.reduce((sum,c)=>sum+c.marks,0)).toBe(source.marks);
   expect(source.modelAnswer.length).toBeGreaterThan(20);
   expect(source.prompt).toMatch(/\(i\)/);
  }
  expect(POB_OWNER_P2_GROUPED_RUBRICS[id]).toHaveLength(count);
  const result=auditPobOwnerPaper2Calibration(record);
  expect(result.issues).toEqual([]);
  expect(result.ready).toBe(true);
  expect(result.candidateChoices).toBe(8);
 }
});
test("unreviewed historical groupings remain excluded rather than silently merging",()=>{
 const record=POB_HISTORICAL_REVIEW_BANKS.find(r=>r.id==="POB-P2-2009-MJ");
 const report=auditPobOwnerPaper2Calibration(record);
 expect(report.ready).toBe(false);
 expect(report.issues.some(x=>x.includes("rubric_absent_or_mark_mismatch"))).toBe(true);
 expect(POB_OWNER_P2_GROUPED_RUBRICS[record.id]).toBeUndefined();
});
