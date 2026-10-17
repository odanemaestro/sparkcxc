import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {validatePobHistoricalP2Selection} from "./pobHistoricalScoringBatches";
import {
 POB_2026_JAN_P2_AUTHORED_SCHEME,verifyPob2026JanP2AuthoredScheme
} from "./pobHistorical2026JanP2AuthoredScheme";
import {assessPobHistoricalAutoScoring} from "./pobHistoricalAutoScoringGate";

describe("January 2026 POB P2 user PDF, final historical source in 46-paper archive",()=>{
 test("original 6 scanned pages contain five compulsory 20-mark questions and 32 authored subparts",()=>{
  const paper=POB_2026_JAN_P2_AUTHORED_SCHEME;
  const result=verifyPob2026JanP2AuthoredScheme(paper);
  expect(result).toEqual({
   valid:true,issues:[],offeredMarks:100,partCount:32,criterionMarks:100,liveApproved:false
  });
  const original=POB_SUPPLIED_ARCHIVE.find(x=>x.id==="POB-P2-2026-JAN");
  expect(paper.sourceSha256).toBe(original.sourceSha256);
  expect(paper.sourceFilename).toBe(original.filename);
  expect(paper.originalPrintedExamDate).toBe("2026-01-08");
  expect(paper.originalPdfPagesReviewed).toEqual([1,2,3,4,5,6]);
  expect(paper.questions.map(q=>q.parts.reduce((n,p)=>n+p.marks,0)))
   .toEqual([20,20,20,20,20]);
  expect(paper.questions.map(q=>q.parts.length)).toEqual([7,6,7,6,6]);
  expect(paper.questions.flatMap(q=>q.parts).every(
   p=>p.originalQuestionVisualRead&&p.sourcePdfPage>=2&&p.sourcePdfPage<=6
  )).toBe(true);
  expect(paper.liveScoringApproved).toBe(false);
  expect(pobReleasedHistoricalPapers()).toHaveLength(0);
 });
 test("2026 Paper 2 original explicitly instructs five compulsory questions",()=>{
  expect(validatePobHistoricalP2Selection("POB-P2-2026-JAN",[1,2,3,4,5]))
   .toEqual({valid:true,maximumMarks:100,issue:null});
  for(const invalid of [[1,2,3,4,6],[1,2,3,4,4],[1,2,3,4],[1,2,3,4,"5"]])
   expect(validatePobHistoricalP2Selection("POB-P2-2026-JAN",invalid).valid).toBe(false);
 });
 test("source-specific prompts and marks match original scan of each of five printed pages",()=>{
  const paper=POB_2026_JAN_P2_AUTHORED_SCHEME;
  const find=(num,id)=>paper.questions[num-1].parts.find(p=>p.id===id);
  expect(find(1,"c.ii").sourceQuestion).toMatch(/research and development/i);
  expect(find(1,"e.ii").marks).toBe(6);
  expect(find(2,"c.ii").marks).toBe(2);
  expect(find(2,"d").sourceQuestion).toMatch(/fast-food/i);
  expect(find(3,"b.i").sourceQuestion).toMatch(/subsistence/i);
  expect(find(3,"b.ii").sourceQuestion).toMatch(/domestic-consumption/i);
  expect(find(3,"d").marks).toBe(6);
  expect(find(4,"c.i").sourceQuestion).toMatch(/ice cream/i);
  expect(find(4,"c.ii").modelAnswer).toMatch(/diet|taste|price/i);
  expect(find(5,"c.i").modelAnswer).toMatch(/buying/i);
  expect(find(5,"c.ii").modelAnswer).toMatch(/broader/i);
  expect(find(5,"d").marks).toBe(6);
 });
 test("rejects altered SHA, missing criteria, over-awarded marks and fabricated certification",()=>{
  const copy=()=>JSON.parse(JSON.stringify(POB_2026_JAN_P2_AUTHORED_SCHEME));
  const wrongSha=copy();wrongSha.sourceSha256="0".repeat(64);
  expect(verifyPob2026JanP2AuthoredScheme(wrongSha).valid).toBe(false);
  const missingPart=copy();missingPart.questions[2].parts.pop();
  expect(verifyPob2026JanP2AuthoredScheme(missingPart).valid).toBe(false);
  const cap=copy();cap.questions[3].parts[0].marks+=5;
  expect(verifyPob2026JanP2AuthoredScheme(cap).valid).toBe(false);
  const falsifiedScheme=copy();
  falsifiedScheme.questions[4].parts[0].criteria[0].sourceSchemeVerified=true;
  expect(verifyPob2026JanP2AuthoredScheme(falsifiedScheme).valid).toBe(false);
  const fakeLive=copy();fakeLive.liveScoringApproved=true;
  expect(verifyPob2026JanP2AuthoredScheme(fakeLive).valid).toBe(false);
  const wrongPage=copy();wrongPage.questions[1].parts[0].sourcePdfPage=5;
  expect(verifyPob2026JanP2AuthoredScheme(wrongPage).valid).toBe(false);
 });
 test("correct structural rubric cannot override secure-server and semantic scoring guard",()=>{
  const bank=POB_2026_JAN_P2_AUTHORED_SCHEME;
  const inspected=assessPobHistoricalAutoScoring({
   ...bank,selectedQuestionNumbers:[1,2,3,4,5],questionSelectionRulesVerified:true
  });
  expect(inspected.ready).toBe(false);
  expect(inspected.issues).toEqual(expect.arrayContaining([
   expect.stringContaining("calibrated"),
   expect.stringContaining("Secure server marking")
  ]));
  expect(pobReleasedHistoricalPapers()).toEqual([]);
 });
});
