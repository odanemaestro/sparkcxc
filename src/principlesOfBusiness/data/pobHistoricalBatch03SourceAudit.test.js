import {
 POB_HISTORICAL_BATCH03_SOURCE_QA,auditPobHistoricalBatch03Sources
} from "./pobHistoricalBatch03SourceAudit";
import {
 POB_2020_JAN_P1_AUTHORED_KEY,verifyPob2020JanP1AuthoredKey
} from "./pobHistorical2020JanP1AuthoredKey";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";

describe("third historical POB scoring intake, 15 original source PDFs",()=>{
 test("all 15 PDF page counts and SHA-256 fingerprints match the approved inventory",()=>{
  expect(auditPobHistoricalBatch03Sources()).toEqual({
   valid:true,issues:[],sourceCount:15,totalPages:167,
   pagesRequiringVisualReading:150,paper1Count:5,paper2Count:10,
   liveScoringApproved:0
  });
  expect(new Set(POB_HISTORICAL_BATCH03_SOURCE_QA.map(x=>x.id)).size).toBe(15);
  expect(new Set(POB_HISTORICAL_BATCH03_SOURCE_QA.map(x=>x.sourceSha256)).size).toBe(15);
  expect(pobReleasedHistoricalPapers()).toEqual([]);
 });
 test("2005-2008 historical P2 cover rules differ and are not silently applied as modern 2019+ five compulsory",()=>{
  const early=POB_HISTORICAL_BATCH03_SOURCE_QA.filter(x=>x.paper===2&&x.year<=2008);
  expect(early).toHaveLength(4);
  for(const x of early){
   expect(x.sittingRule).toMatch(/section-I/);
   expect(x.sittingRule).not.toMatch(/five-compulsory/);
  }
  expect(POB_HISTORICAL_BATCH03_SOURCE_QA.find(x=>x.id==="POB-P2-2008-MJ").sittingRule)
   .toBe("paper-2-three-section-I-and-two-section-II-cover");
  const modern=POB_HISTORICAL_BATCH03_SOURCE_QA.filter(x=>x.paper===2&&x.year>=2019);
  expect(modern).toHaveLength(6);
  expect(modern.every(x=>x.sittingRule==="paper-2-five-compulsory-cover")).toBe(true);
 });
 test("2020 January source has sixty authored explanations but four tracked academic disputes",()=>{
  const paper=POB_2020_JAN_P1_AUTHORED_KEY;
  expect(verifyPob2020JanP1AuthoredKey()).toEqual({
   valid:true,issues:[],disputes:[24,52,55,57]
  });
  expect(paper.sourceSha256).toBe(POB_SUPPLIED_ARCHIVE.find(x=>x.id===paper.id).sourceSha256);
  expect(paper.entries).toHaveLength(60);
  expect(paper.entries.filter(x=>x.originalOptionImageReviewed).map(x=>x.number))
   .toEqual([9,47,49]);
  expect(paper.entries.find(x=>x.number===9).proposedOption).toBe("A");
  expect(paper.entries.find(x=>x.number===47).proposedOption).toBe("C");
  expect(paper.entries.find(x=>x.number===49).proposedOption).toBe("B");
  expect(paper.entries.find(x=>x.number===55).proposedOption).toBeNull();
  expect(paper.liveScoringApproved).toBe(false);
 });
 test("unverified historical P1 cannot be published by changing a single key or flag",()=>{
  const copy=()=>JSON.parse(JSON.stringify(POB_2020_JAN_P1_AUTHORED_KEY));
  const altered=copy();altered.entries[54].proposedOption="B";
  expect(verifyPob2020JanP1AuthoredKey(altered).valid).toBe(false);
  const missing=copy();missing.entries.pop();
  expect(verifyPob2020JanP1AuthoredKey(missing).valid).toBe(false);
  const falseSource=copy();falseSource.sourceSha256="0".repeat(64);
  expect(verifyPob2020JanP1AuthoredKey(falseSource).valid).toBe(false);
  const fakeApproval=copy();fakeApproval.liveScoringApproved=true;
  expect(verifyPob2020JanP1AuthoredKey(fakeApproval).valid).toBe(false);
  const hiddenDispute=copy();hiddenDispute.entries[23].status="spark-internal-provisional";
  expect(verifyPob2020JanP1AuthoredKey(hiddenDispute).valid).toBe(false);
 });
});
