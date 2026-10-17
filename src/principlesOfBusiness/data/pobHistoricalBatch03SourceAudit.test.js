import {
 POB_HISTORICAL_BATCH03_SOURCE_QA,auditPobHistoricalBatch03Sources,validatePob2005to2007P2Selection
} from "./pobHistoricalBatch03SourceAudit";
import {
 POB_2020_JAN_P1_AUTHORED_KEY,verifyPob2020JanP1AuthoredKey
} from "./pobHistorical2020JanP1AuthoredKey";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {assessPobHistoricalAutoScoring} from "./pobHistoricalAutoScoringGate";
import {POB_2008_MJ_P2_AUTHORED_SCHEME,verifyPob2008MjP2AuthoredScheme,validatePob2008MjP2Choices} from "./pobHistorical2008MjP2AuthoredScheme";
import {POB_2005_MJ_P2_AUTHORED_SCHEME,verifyPob2005MjP2AuthoredScheme} from "./pobHistorical2005MjP2AuthoredScheme";
import {POB_2006_MJ_P2_AUTHORED_SCHEME,verifyPob2006MjP2AuthoredScheme} from "./pobHistorical2006MjP2AuthoredScheme";
import {POB_2007_MJ_P2_AUTHORED_SCHEME,verifyPob2007MjP2AuthoredScheme} from "./pobHistorical2007MjP2AuthoredScheme";
import {POB_2019_MJ_P2_AUTHORED_SCHEME,verifyPob2019MjP2AuthoredScheme} from "./pobHistorical2019MjP2AuthoredScheme";
import {POB_2019_MJ_ALT_P2_AUTHORED_SCHEME} from "./pobHistorical2019MjAltP2AuthoredScheme";

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
  const earlySix=POB_HISTORICAL_BATCH03_SOURCE_QA.filter(x=>x.paper===2&&x.year<=2007);
  expect(earlySix).toHaveLength(3);
  for(const row of earlySix){
   expect(row.sittingRule).toBe("paper-2-section-I-2005-07-Q1-Q2-10-each-Q3-20-and-Q4-9-choose-3");
   expect(validatePob2005to2007P2Selection(row.id,[1,2,3,4,6,8]))
    .toEqual({valid:true,maximumMarks:100,offeredMarks:160,issue:null});
   expect(validatePob2005to2007P2Selection(row.id,[1,2,3,5,7,9]).valid).toBe(true);
   for(const incorrect of [
    [1,2,3,4,6],[1,2,3,4,5,8],[1,2,3,4,6,7],[1,2,3,4,4,8]
   ])expect(validatePob2005to2007P2Selection(row.id,incorrect).valid).toBe(false);
  }
  expect(POB_HISTORICAL_BATCH03_SOURCE_QA.find(x=>x.id==="POB-P2-2008-MJ").sittingRule)
   .toBe("paper-2-three-section-I-and-two-section-II-cover");
  const modern=POB_HISTORICAL_BATCH03_SOURCE_QA.filter(x=>x.paper===2&&x.year>=2019);
  expect(modern).toHaveLength(6);
  expect(modern.every(x=>x.sittingRule==="paper-2-five-compulsory-cover")).toBe(true);
 });
 test("historical scoring gate uses the real 2005–07 six-answer format and 10-mark first questions",()=>{
  const original=POB_SUPPLIED_ARCHIVE.find(p=>p.id==="POB-P2-2005-MJ");
  const candidate={
   ...original,sourceFilename:original.filename,
   selectedQuestionNumbers:[1,2,3,4,6,8],
   questions:Array.from({length:9},(_,i)=>({
    number:i+1,marks:i<2?10:20,questionWordingVerified:true,parts:[]
   }))
  };
  const correct=assessPobHistoricalAutoScoring(candidate);
  expect(correct.ready).toBe(false);
  expect(correct.issues.some(x=>x.includes("Original 2005–07 section choices invalid"))).toBe(false);
  expect(correct.issues.some(x=>x.includes("question 1 is not a verified 10-mark question"))).toBe(false);
  expect(correct.issues.some(x=>x.includes("question 2 is not a verified 10-mark question"))).toBe(false);
  const badChoices=assessPobHistoricalAutoScoring({...candidate,selectedQuestionNumbers:[1,2,3,4,5,6]});
  expect(badChoices.issues.some(x=>x.includes("Original 2005–07 section choices invalid"))).toBe(true);
  const badMarks=assessPobHistoricalAutoScoring({
   ...candidate,questions:candidate.questions.map((q,i)=>i===0?{...q,marks:20}:q)
  });
  expect(badMarks.issues.some(x=>x.includes("not a verified 10-mark question"))).toBe(true);
  const missing=assessPobHistoricalAutoScoring({...candidate,questions:candidate.questions.slice(0,7)});
  expect(missing.issues.some(x=>x.includes("Full Paper 2 question set"))).toBe(true);
 });
 test("2008 Paper 2 gate respects five-answered rule and cannot borrow six-answer selections",()=>{
  const original=POB_SUPPLIED_ARCHIVE.find(p=>p.id==="POB-P2-2008-MJ");
  const candidate={...original,sourceFilename:original.filename,
   selectedQuestionNumbers:[1,2,3,4,6],
   questions:Array.from({length:7},(_,i)=>({number:i+1,marks:20,questionWordingVerified:true,parts:[]}))
  };
  const correct=assessPobHistoricalAutoScoring(candidate);
  expect(correct.issues.some(x=>x.includes("Original 2008 compulsory/optional"))).toBe(false);
  const wrong=assessPobHistoricalAutoScoring({...candidate,selectedQuestionNumbers:[1,2,3,4,6,8]});
  expect(wrong.issues.some(x=>x.includes("Original 2008 compulsory/optional"))).toBe(true);
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
 test("2005, 2006 and 2007 Paper 2 contain full SPARK-authored 160 offered marks",()=>{
  const cases=[
   [POB_2005_MJ_P2_AUTHORED_SCHEME,verifyPob2005MjP2AuthoredScheme,45],
   [POB_2006_MJ_P2_AUTHORED_SCHEME,verifyPob2006MjP2AuthoredScheme,43],
   [POB_2007_MJ_P2_AUTHORED_SCHEME,verifyPob2007MjP2AuthoredScheme,50]
  ];
  for(const [paper,verify,parts] of cases){
   const result=verify();
   expect(result.valid).toBe(true);
   expect(result.issues).toEqual([]);
   expect(result.offeredMarks).toBe(160);
   expect(result.parts).toBe(parts);
   expect(paper.questions.map(q=>q.parts.reduce((sum,p)=>sum+p.marks,0)))
    .toEqual([10,10,20,20,20,20,20,20,20]);
   expect(paper.sourceSha256).toBe(POB_SUPPLIED_ARCHIVE.find(x=>x.id===paper.id).sourceSha256);
   expect(paper.liveScoringApproved).toBe(false);
   const bad={...paper,sourceSha256:"0".repeat(64)};
   expect(verify(bad).valid).toBe(false);
  }
  const question=POB_2005_MJ_P2_AUTHORED_SCHEME.questions[8];
  expect(question.parts.find(p=>p.id==="a.ii").modelAnswer).toContain("2,000");
  expect(question.parts.find(p=>p.id==="b").modelAnswer).toContain("3,000");
  const q4=POB_2006_MJ_P2_AUTHORED_SCHEME.questions[3];
  expect(q4.parts.find(p=>p.id==="c.ii").modelAnswer).toMatch(/two/i);
  const q1=POB_2007_MJ_P2_AUTHORED_SCHEME.questions[0];
  expect(q1.parts.find(p=>p.id==="d").modelAnswer).toMatch(/^No,/);
 });
 test("2019 May/June independently scanned source reuses identical paper answers, not a false source SHA",()=>{
  const result=verifyPob2019MjP2AuthoredScheme();
  expect(result).toEqual({valid:true,issues:[],parts:32,marks:100});
  const regular=POB_2019_MJ_P2_AUTHORED_SCHEME;
  const alt=POB_2019_MJ_ALT_P2_AUTHORED_SCHEME;
  expect(regular.id).toBe("POB-P2-2019-MJ");
  expect(regular.sourceSha256).not.toBe(alt.sourceSha256);
  expect(regular.sourceSha256).toBe(POB_SUPPLIED_ARCHIVE.find(p=>p.id===regular.id).sourceSha256);
  expect(regular.questions).toBe(alt.questions);
  expect(regular.liveScoringApproved).toBe(false);
  const tampered={...regular,sourceSha256:alt.sourceSha256};
  expect(verifyPob2019MjP2AuthoredScheme(tampered).valid).toBe(false);
 });
 test("May/June 2008 Paper 2 has seven 20-mark questions, five to attempt",()=>{
  const source=POB_2008_MJ_P2_AUTHORED_SCHEME;
  expect(verifyPob2008MjP2AuthoredScheme()).toEqual({
   valid:true,issues:[],offeredMarks:140,partCount:31
  });
  expect(source.questions.map(q=>q.parts.reduce((n,p)=>n+p.marks,0)))
   .toEqual([20,20,20,20,20,20,20]);
  expect(source.sourceSha256).toBe(POB_SUPPLIED_ARCHIVE.find(x=>x.id===source.id).sourceSha256);
  expect(source.sourcePagesReviewed).toEqual([1,2,3,4]);
  // Official CXC syllabus defines production levels as subsistence,
  // domestic consumption, surplus and export, not generic 'commercial'.
  const levels=source.questions[1].parts.find(p=>p.id==="a");
  expect(levels.modelAnswer).toMatch(/subsistence/i);
  expect(levels.modelAnswer).toMatch(/surplus/i);
  expect(levels.criteria.some(c=>c.rule.includes("syllabus-listed level"))).toBe(true);
  expect(source.liveScoringApproved).toBe(false);
  expect(validatePob2008MjP2Choices([1,2,3,4,6])).toBe(true);
  expect(validatePob2008MjP2Choices([1,2,3,5,7])).toBe(true);
  for(const wrong of [[1,2,3,4,5],[1,2,3,6,7],[1,2,3,4,4],[1,2,3,4,8]]){
   expect(validatePob2008MjP2Choices(wrong)).toBe(false);
  }
 });
 test("May/June 2008 Paper 2 does not tolerate altered marks or fabricated authorization",()=>{
  const clone=()=>JSON.parse(JSON.stringify(POB_2008_MJ_P2_AUTHORED_SCHEME));
  const a=clone();a.questions[0].parts[0].criteria[0].marks=100;
  expect(verifyPob2008MjP2AuthoredScheme(a).valid).toBe(false);
  const b=clone();b.maximumCandidateMarks=140;
  expect(verifyPob2008MjP2AuthoredScheme(b).valid).toBe(false);
  const c=clone();c.liveScoringApproved=true;
  expect(verifyPob2008MjP2AuthoredScheme(c).valid).toBe(false);
  const d=clone();d.questions[5].parts.pop();
  expect(verifyPob2008MjP2AuthoredScheme(d).valid).toBe(false);
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
