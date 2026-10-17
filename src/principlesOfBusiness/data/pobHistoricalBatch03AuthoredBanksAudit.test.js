import {auditPobHistoricalBatch03AuthoredBanks,POB_HISTORICAL_BATCH03_AUTHORED_BANK_COUNT} from "./pobHistoricalBatch03AuthoredBanksAudit";
import {POB_2022_JAN_P1_AUTHORED_KEY,verifyPob2022JanP1AuthoredKey} from "./pobHistorical2022JanP1AuthoredKey";
import {POB_2024_MJ_P1_AUTHORED_KEY,verifyPob2024MjP1AuthoredKey} from "./pobHistorical2024MjP1AuthoredKey";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
describe("historical POB batch three COMPLETE authoring QA, 15 original source files",()=>{
 test("every one of the 15 source PDFs has a distinct structurally verified SPARK answer/rubric bank",()=>{
  const audit=auditPobHistoricalBatch03AuthoredBanks();
  expect(audit.issues).toEqual([]);
  expect(audit.valid).toBe(true);
  expect(POB_HISTORICAL_BATCH03_AUTHORED_BANK_COUNT).toBe(15);
  expect(audit.authoredSources).toBe(15);
  expect(audit.authoredPaper1).toBe(5);
  expect(audit.authoredPaper2).toBe(10);
  expect(audit.authoredMcqSlots).toBe(300);
  expect(audit.authoredPaper2Parts).toBe(363);
  expect(audit.offeredPaper2Marks).toBe(1220);
  expect(audit.officialPublishedCxcKeysProvided).toBe(0);
  expect(audit.livePapersReleased).toBe(0);
  expect(audit.reports).toHaveLength(15);
  expect(pobReleasedHistoricalPapers()).toEqual([]);
  for(const p of audit.reports){
   expect(p.sourceSha256).toBe(POB_SUPPLIED_ARCHIVE.find(src=>src.id===p.id).sourceSha256);
   expect(p.liveScoringApproved).toBe(false);
   expect(p.structuralChecksPassed).toBe(true);
  }
 });
 test("January 2022 60 original P1 questions include both unanswerable items explicitly",()=>{
  expect(verifyPob2022JanP1AuthoredKey()).toEqual({valid:true,problems:[],disputed:[24,58]});
  expect(POB_2022_JAN_P1_AUTHORED_KEY.entries).toHaveLength(60);
  expect(POB_2022_JAN_P1_AUTHORED_KEY.entries[23].proposedOption).toBeNull();
  expect(POB_2022_JAN_P1_AUTHORED_KEY.entries[57].proposedOption).toBeNull();
  expect(POB_2022_JAN_P1_AUTHORED_KEY.entries[51].proposedOption).toBe("B"); // Recycling + conservation
  expect(POB_2022_JAN_P1_AUTHORED_KEY.liveScoringApproved).toBe(false);
 });
 test("May/June 2024 untrusted marked PDF is not treated as an official GNP answer key",()=>{
  expect(verifyPob2024MjP1AuthoredKey()).toEqual({valid:true,errors:[],disputes:[30,50,56]});
  const paper=POB_2024_MJ_P1_AUTHORED_KEY;
  expect(paper.sourceHasUnverifiedHandMarkedAnswers).toBe(true);
  expect(paper.entries).toHaveLength(60);
  expect(paper.entries[3].proposedOption).toBe("C"); // Sole trader II and III
  expect(paper.entries[49].proposedOption).toBe("D"); // Progressive redistribution, not red B
  expect(paper.entries[55].proposedOption).toBeNull(); // No precise GNP option
  expect(paper.liveScoringApproved).toBe(false);
 });
 test("tampered source SHA or forcing a disputed answer fails internal checks",()=>{
  const copy22=()=>JSON.parse(JSON.stringify(POB_2022_JAN_P1_AUTHORED_KEY));
  const tampered22=copy22();tampered22.sourceSha256="0".repeat(64);
  expect(verifyPob2022JanP1AuthoredKey(tampered22).valid).toBe(false);
  const forged22=copy22();forged22.entries[57].proposedOption="A";
  expect(verifyPob2022JanP1AuthoredKey(forged22).valid).toBe(false);
  const fake22=copy22();fake22.liveScoringApproved=true;
  expect(verifyPob2022JanP1AuthoredKey(fake22).valid).toBe(false);
  const copy24=()=>JSON.parse(JSON.stringify(POB_2024_MJ_P1_AUTHORED_KEY));
  const forged24=copy24();forged24.entries[55].proposedOption="D";
  expect(verifyPob2024MjP1AuthoredKey(forged24).valid).toBe(false);
  const unsafe24=copy24();unsafe24.liveScoringApproved=true;
  expect(verifyPob2024MjP1AuthoredKey(unsafe24).valid).toBe(false);
 });
});
