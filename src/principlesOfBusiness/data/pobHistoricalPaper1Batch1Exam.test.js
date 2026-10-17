import {POB_HISTORICAL_REVIEW_BANKS} from "./pobHistoricalArchiveRegistry";
import {POB_BATCH1_P1_PAPERS,POB_BATCH1_P1_BY_ID} from "./pobHistoricalPaper1Batch1Source";
import {auditPobHistoricalP1Batch1,buildPobHistoricalP1Exam,getPobHistoricalP1Source} from "./pobHistoricalPaper1Batch1Exam";
test("ten historically distinct supplied Paper 1 sittings carry all 600 original-numbered MCQs",()=>{
 expect(POB_BATCH1_P1_PAPERS).toHaveLength(10);
 expect(POB_BATCH1_P1_PAPERS.map(p=>p.year)).toEqual([2002,2003,2004,2005,2006,2007,2008,2011,2012,2014]);
 expect(Object.keys(POB_BATCH1_P1_BY_ID)).toHaveLength(10);
 const report=auditPobHistoricalP1Batch1(POB_HISTORICAL_REVIEW_BANKS);
 expect(report.papers).toBe(10);
 expect(report.questions).toBe(600);
 for(const row of report.counts){
  expect(row.correctNumbering).toBe(true);
  expect(row.optionErrors).toEqual([]);
  expect(row.eligible+row.excluded).toBe(60);
  const record=POB_HISTORICAL_REVIEW_BANKS.find(r=>r.id===row.id);
  const practice=buildPobHistoricalP1Exam(record);
  expect(practice.questions).toHaveLength(60);
  expect(practice.provisional).toBe(true);
  expect(practice.questions.every(q=>q.options.length===4&&/^[ABCD]$/.test(q.answer))).toBe(true);
  expect(practice.questions.some(q=>q.scoringEligible)).toBe(true);
  expect(practice.questions.filter(q=>q.sourceReviewPending||q.sourceGraphicPending).every(q=>!q.scoringEligible)).toBe(true);
 }
});
test("original charts, illegible source lines, and conflicting keys cannot silently earn marks",()=>{
 const a=id=>buildPobHistoricalP1Exam(POB_HISTORICAL_REVIEW_BANKS.find(p=>p.id===id));
 expect(a("POB-P1-2002-MJ").questions[38].sourceGraphicPending).toBe(true);
 expect(a("POB-P1-2002-MJ").questions[38].scoringEligible).toBe(false);
 expect(a("POB-P1-2003-MJ").questions[8].scoringEligible).toBe(false);
 expect(a("POB-P1-2008-MJ").questions[11].scoringEligible).toBe(false);
 expect(a("POB-P1-2014-MJ").questions[6].scoringEligible).toBe(false);
 expect(getPobHistoricalP1Source("POB-P1-2019-MJ")).toBeNull();
});
test("source PDF hashes remain paired to the existing trusted POB inventory",()=>{
 for(const paper of POB_BATCH1_P1_PAPERS){
  const record=POB_HISTORICAL_REVIEW_BANKS.find(x=>x.id===paper.id);
  expect(record).toBeTruthy();
  expect(record.bank.sourceSha256).toBe(record.source.sourceSha256);
 }
});
