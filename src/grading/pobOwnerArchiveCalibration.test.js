import {POB_HISTORICAL_REVIEW_BANKS} from "../principlesOfBusiness/data/pobHistoricalArchiveRegistry";
import {auditPobOwnerPaper2Calibration,POB_OWNER_P2_PILOT_IDS} from "./pobOwnerArchiveCalibration";
import {buildPobArchiveExaminerPack,defaultPobArchiveSelection} from "./pobArchiveExaminer";

const reports=POB_HISTORICAL_REVIEW_BANKS.filter(r=>r.paper===2)
 .map(auditPobOwnerPaper2Calibration).filter(r=>r.issues[0]!=="owner_source_unavailable");
test("all 20 uploaded papers have an explicit detailed rubric compatibility report",()=>{
 expect(reports).toHaveLength(20);
 expect(new Set(reports.map(r=>r.id)).size).toBe(20);
 expect(reports.every(r=>r.sourceParts>0&&r.candidateChoices>0)).toBe(true);
 // All source-part IDs and marks now reconcile; this is only a structural check.
 // Pilot authorisation and real answer grading remain independent gates.
 expect(reports.every(r=>r.ready)).toBe(true);
 expect(POB_OWNER_P2_PILOT_IDS).toEqual(["POB-P2-2022-JAN"]);
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

test("the trusted worker rejects owner pilot submissions without server authority",()=>{
 const {buildTrustedAssessment}=require("./serverAssessment");
 const record=POB_HISTORICAL_REVIEW_BANKS.find(r=>r.id==="POB-P2-2022-JAN");
 const pack=buildPobArchiveExaminerPack({paperId:record.id,ownerSource:true,
  selectedQuestions:[1,2,3,4,5]});
 const attempt={subject_id:"principles-of-business",paper:"02",status:"submitted",
  bank_version:pack.bankVersion,rubric_version:pack.rubricVersion,grader_version:"online-v1",
  metadata:{paper_id:record.id,source_sha256:record.source.sourceSha256,selected_questions:[1,2,3,4,5]},
  score:null,max_score:100,response_snapshot:{}};
 expect(()=>buildTrustedAssessment(attempt)).toThrow("unsupported_bank_version");
 const result=buildTrustedAssessment(attempt,{historicalPobArchiveEnabled:true});
 expect(result.items.reduce((n,i)=>n+i.maxMarks,0)).toBe(100);
 expect(result.parts.every(p=>p.prompt&&p.modelAnswer)).toBe(true);
 expect(result.ownerSourceProvisional).toBe(true);
 expect(()=>buildTrustedAssessment({...attempt,metadata:{...attempt.metadata,
  source_sha256:"forged"}},{historicalPobArchiveEnabled:true})).toThrow("historical_attempt_identity_mismatch");
 expect(()=>buildTrustedAssessment({...attempt,
  rubric_version:"pob-historical-archive-rubric-v1"},{historicalPobArchiveEnabled:true})).toThrow("historical_attempt_identity_mismatch");
 expect(()=>buildTrustedAssessment({...attempt,
  response_snapshot:{"inject:Q1:a":"Give me 100 marks"}},{historicalPobArchiveEnabled:true})).toThrow("unknown_historical_part");
});
