import {POB_HISTORICAL_REVIEW_BANKS} from "../principlesOfBusiness/data/pobHistoricalArchiveRegistry";
import {auditPobOwnerPaper2Calibration,POB_OWNER_P2_PILOT_IDS} from "./pobOwnerArchiveCalibration";
import {buildPobArchiveExaminerPack,defaultPobArchiveSelection} from "./pobArchiveExaminer";

const reports=POB_HISTORICAL_REVIEW_BANKS.filter(r=>r.paper===2)
 .map(auditPobOwnerPaper2Calibration).filter(r=>r.issues[0]!=="owner_source_unavailable");
test("all 20 uploaded papers have an explicit detailed rubric compatibility report",()=>{
 expect(reports).toHaveLength(20);
 expect(new Set(reports.map(r=>r.id)).size).toBe(20);
 expect(reports.every(r=>r.sourceParts>0&&r.candidateChoices>0)).toBe(true);
 // Baseline reports identify outstanding differences rather than silently granting marks.
 expect(reports.some(r=>!r.ready)).toBe(true);
});
test("released pilot has full 100-mark criteria, all five compulsory questions and source prompts",()=>{
 expect(POB_OWNER_P2_PILOT_IDS).toEqual(["POB-P2-2022-JAN"]);
 for(const id of POB_OWNER_P2_PILOT_IDS){
  const record=POB_HISTORICAL_REVIEW_BANKS.find(r=>r.id===id);
  const audit=auditPobOwnerPaper2Calibration(record);
  expect(audit.issues).toEqual([]);
  const pack=buildPobArchiveExaminerPack({paperId:id,ownerSource:true,
    selectedQuestions:defaultPobArchiveSelection(record.bank)});
  expect(pack.maxMarks).toBe(100);
  expect(pack.ownerSourceProvisional).toBe(true);
  expect(pack.calibrationVerified).toBe(false);
  expect(pack.sourceQuestionsDigitised).toBe(true);
  expect(pack.items.reduce((n,i)=>n+i.maxMarks,0)).toBe(100);
  expect(pack.parts.every(p=>p.criteria.reduce((n,c)=>n+c.marks,0)===p.maxMarks)).toBe(true);
  expect(pack.parts.every(p=>p.prompt&&p.modelAnswer)).toBe(true);
 }
});
test("all other transcriptions are refused for versioned owner pilot scoring",()=>{
 const record=POB_HISTORICAL_REVIEW_BANKS.find(r=>r.id==="POB-P2-2015-MJ");
 expect(()=>buildPobArchiveExaminerPack({paperId:record.id,ownerSource:true,
  selectedQuestions:defaultPobArchiveSelection(record.bank)})).toThrow("owner_calibration_not_released");
});
