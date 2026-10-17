import {POB_HISTORICAL_BATCH02_SOURCES,auditPobHistoricalBatch02Sources} from "./pobHistoricalBatch02SourceAudit";
import {POB_HISTORICAL_BATCH02_AUTHORED,auditPobHistoricalBatch02AnswerAuthorship} from "./pobHistoricalBatch02AuthoredAudit";
import {POB_2002_MJ_P1_AUTHORED_KEY,verifyPob2002MjP1AuthoredKey} from "./pobHistorical2002MjP1AuthoredKey";
import {POB_2003_MJ_P1_AUTHORED_KEY,verifyPob2003MjP1AuthoredKey} from "./pobHistorical2003MjP1AuthoredKey";
import {POB_2004_MJ_P1_AUTHORED_KEY,verifyPob2004MjP1AuthoredKey} from "./pobHistorical2004MjP1AuthoredKey";
import {POB_2005_MJ_P1_AUTHORED_KEY,verifyPob2005MjP1AuthoredKey} from "./pobHistorical2005MjP1AuthoredKey";
import {POB_2008_MJ_P1_AUTHORED_KEY,verifyPob2008MjP1AuthoredKey} from "./pobHistorical2008MjP1AuthoredKey";
import {POB_2006_MJ_P1_AUTHORED_KEY,verifyPob2006MjP1AuthoredKey} from "./pobHistorical2006MjP1AuthoredKey";
import {POB_2007_MJ_P1_AUTHORED_KEY,verifyPob2007MjP1AuthoredKey} from "./pobHistorical2007MjP1AuthoredKey";
import {POB_2008_MJ_P1_AUTHORED_KEY,verifyPob2008MjP1AuthoredKey} from "./pobHistorical2008MjP1AuthoredKey";
import {POB_2011_MJ_P1_AUTHORED_KEY,verifyPob2011MjP1AuthoredKey} from "./pobHistorical2011MjP1AuthoredKey";
import {POB_2012_MJ_P1_AUTHORED_KEY,auditPob2012MjP1AuthorKey} from "./pobHistorical2012MjP1AuthoredKey";
import {POB_2014_MJ_P1_AUTHORED_KEY,validatePob2014MjP1AuthoredKey} from "./pobHistorical2014MjP1AuthoredKey";
import {POB_2015_MJ_P1_AUTHORED_KEY,verifyPob2015MjP1AuthoredKey} from "./pobHistorical2015MjP1AuthoredKey";
import {POB_2016_MJ_P1_AUTHORED_KEY,verifyPob2016MjP1AuthoredKey} from "./pobHistorical2016MjP1AuthoredKey";
import {POB_2018_MJ_P1_AUTHORED_KEY,verifyPob2018MjP1AuthoredKey} from "./pobHistorical2018MjP1AuthoredKey";
import {POB_2019_MJ_ALT_P2_AUTHORED_SCHEME,verifyPob2019MjAltP2AuthoredScheme} from "./pobHistorical2019MjAltP2AuthoredScheme";
import {POB_2017_MJ_P1_AUTHORED_KEY,verifyPob2017MjP1AuthoredKey} from "./pobHistorical2017MjP1AuthoredKey";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";

describe("Historical POB answer authorship, 15-file second batch",()=>{
 test("all 15 original sources are present, including the genuine 2019 MJ P2 reclassification",()=>{
  const report=auditPobHistoricalBatch02Sources();
  expect(report).toMatchObject({
   valid:true,issues:[],sourceCount:15,historicalPaper1Count:14,
   historicalPaper2Count:1,sourcePages:136,flaggedImageOnlyPages:32,
   scoringReleased:0
  });
  expect(new Set(POB_HISTORICAL_BATCH02_SOURCES.map(x=>x.sourceSha256)).size).toBe(15);
  const alt=POB_HISTORICAL_BATCH02_SOURCES.find(x=>x.year===2019);
  expect(alt).toMatchObject({
   id:"POB-P2-2019-MJ-ALT",printedPaperOnCover:2,
   printedTestCode:"01240020",paper:2,paperNamedInFilename:1,pages:15
  });
  expect(pobReleasedHistoricalPapers()).toEqual([]);
 });
 test("eight historical Paper 1 sittings provide 480 explained MCQ proposals",()=>{
  const audit=auditPobHistoricalBatch02AnswerAuthorship();
  expect(audit.valid).toBe(true);
  expect(audit.issues).toEqual([]);
  expect(audit.totalBatchSources).toBe(15);
  expect(audit.authoredPaper1SourceCount).toBe(13);
  expect(audit.authoredQuestions).toBe(780);
  expect(audit.remainingBatchSources).toBe(0);
  expect(audit.sourcesWithAuthoredMaterial).toBe(15);
  expect(audit.completedOriginalSourceQuestionSets).toBe(14);
  expect(audit.incompleteOriginalSourceFiles).toBe(1);
  expect(audit.authored2018PartialMcqs).toBe(55);
  expect(audit.missing2018OriginalQuestionNumbers).toEqual([53,54,55,56,57]);
  expect(audit.authored2019AltPaper2RubricParts).toBe(32);
  expect(audit.authored2019AltPaper2RubricMarks).toBe(100);
  expect(audit.historicalLiveScoringEnabled).toBe(0);
  for(const summary of audit.status){
   expect(summary.internallyAuthoredCount).toBe(60);
   expect(summary.structurallyComplete).toBe(true);
   expect(summary.liveScoringApproved).toBe(false);
   expect(summary.sourceTranscriptionAndAcademicCalibrationComplete).toBe(false);
  }
 });
 test("all authored responses remain linked to the approved original PDF fingerprints",()=>{
  for(const [key,validate] of POB_HISTORICAL_BATCH02_AUTHORED){
   const source=POB_SUPPLIED_ARCHIVE.find(s=>s.id===key.id);
   expect(source).toBeDefined();
   expect(source.sourceSha256).toBe(key.sourceSha256);
   expect(source.paper).toBe(1);
   expect(validate(key).valid).toBe(true);
   const altered={...key,sourceSha256:"0".repeat(64)};
   expect(validate(altered).valid).toBe(false);
   expect(key.liveScoringApproved).toBe(false);
  }
 });
 test("2002 answers preserve a non-overstated nominal share capital calculation",()=>{
  expect(verifyPob2002MjP1AuthoredKey().valid).toBe(true);
  const q5=POB_2002_MJ_P1_AUTHORED_KEY.questions[4];
  expect(q5.proposedOption).toBe("B");
  expect(q5.explanation).toMatch(/\$20,000/);
  const q16=POB_2002_MJ_P1_AUTHORED_KEY.questions[15];
  expect(q16.proposedOption).toBe("C");
  expect(q16.explanation).toMatch(/\$1,500/);
  const diagram=POB_2002_MJ_P1_AUTHORED_KEY.questions.filter(q=>q.visualDiagramChecked);
  expect(diagram.map(x=>x.number)).toEqual([39,40,49,58]);
  expect(diagram.map(x=>x.proposedOption)).toEqual(["D","C","B","A"]);
 });
 test("2003 organisation structure and 2004 scanned initial page are source-checked",()=>{
  expect(verifyPob2003MjP1AuthoredKey().valid).toBe(true);
  expect(POB_2003_MJ_P1_AUTHORED_KEY.entries.filter(x=>x.diagramPageChecked).map(x=>x.number)).toEqual([9,10,11]);
  expect(POB_2003_MJ_P1_AUTHORED_KEY.entries.filter(x=>x.diagramPageChecked).map(x=>x.proposedOption)).toEqual(["B","B","C"]);
  expect(verifyPob2004MjP1AuthoredKey().valid).toBe(true);
  const visuallyChecked=POB_2004_MJ_P1_AUTHORED_KEY.entries.filter(x=>x.visualQuestionReviewed);
  expect(visuallyChecked.map(x=>x.number)).toEqual([1,2,3,4,5,6,7,8,9,39]);
  expect(POB_2004_MJ_P1_AUTHORED_KEY.entries[32].proposedOption).toBe("B");
  expect(POB_2004_MJ_P1_AUTHORED_KEY.entries[32].explanation).toMatch(/\$84/);
  expect(POB_2005_MJ_P1_AUTHORED_KEY.questions[17]).toMatchObject({
   number:18,proposedOption:"D",sourceGraphicReviewed:true
  });
  expect(POB_2005_MJ_P1_AUTHORED_KEY.questions[57]).toMatchObject({
   number:58,proposedOption:null,status:"academic-dispute"
  });
  expect(POB_2006_MJ_P1_AUTHORED_KEY.entries[13]).toMatchObject({
   number:14,proposedOption:"B",diagramReviewed:true
  });
  expect(POB_2006_MJ_P1_AUTHORED_KEY.entries[58]).toMatchObject({
   number:59,proposedOption:null,status:"academic-dispute"
  });
 });
 test("ambiguous original items stay visible, not silently approved",()=>{
  expect(verifyPob2002MjP1AuthoredKey().disputedNumbers).toEqual([9,14,18,51,56]);
  expect(verifyPob2003MjP1AuthoredKey().disputedNumbers).toEqual([1,19,36,44,52,60]);
  expect(verifyPob2004MjP1AuthoredKey().disputedNumbers).toEqual([3,9,16,43,57,58]);
  expect(verifyPob2005MjP1AuthoredKey().disputed).toEqual([2,7,8,20,37,58,60]);
  expect(verifyPob2006MjP1AuthoredKey().disputes).toEqual([8,9,13,15,18,22,32,43,59]);
  expect(verifyPob2007MjP1AuthoredKey().disputes).toEqual([9,29,32,38,47,58]);
  expect(verifyPob2008MjP1AuthoredKey().disputes).toEqual([2,10,12,16,17,29,39,43,50,53,54,56,57]);
  expect(verifyPob2011MjP1AuthoredKey().disputed).toEqual([6,22,40,43,55,56]);
  expect(auditPob2012MjP1AuthorKey().disputes).toEqual([16,27,41,45,55]);
  expect(validatePob2014MjP1AuthoredKey().disputedNumbers).toEqual([51,53,56,57,60]);
  expect(verifyPob2015MjP1AuthoredKey().disputes).toEqual([52,56,59]);
  expect(verifyPob2016MjP1AuthoredKey().disputes).toEqual([15,26,31,41,47,57]);
  expect(verifyPob2017MjP1AuthoredKey().disputes).toEqual([47,56]);
 });
 test("2008 source has 60 explained responses and 13 preserved academic disputes",()=>{
  const result=verifyPob2008MjP1AuthoredKey();
  expect(result.valid).toBe(true);
  expect(result.issues).toEqual([]);
  expect(result.disputes).toEqual([2,10,12,16,17,29,39,43,50,53,54,56,57]);
  expect(POB_2008_MJ_P1_AUTHORED_KEY.entries).toHaveLength(60);
  expect(POB_2008_MJ_P1_AUTHORED_KEY.entries[55]).toMatchObject({
   number:56,proposedOption:null,dispute:"no-valid-long-run-unemployment-policy"
  });
 });
 test("2007: 60 original MCQs with source table and disputed document-of-title item",()=>{
   const report=verifyPob2007MjP1AuthoredKey();
   expect(report).toEqual({valid:true,issues:[],disputes:[9,29,32,38,47,58]});
   expect(POB_2007_MJ_P1_AUTHORED_KEY.entries).toHaveLength(60);
   expect(POB_2007_MJ_P1_AUTHORED_KEY.entries[54]).toMatchObject({
      number:55,proposedOption:"C"
   });
   expect(POB_2007_MJ_P1_AUTHORED_KEY.entries[57]).toMatchObject({
      number:58,proposedOption:null,dispute:"no-valid-employment-remedy"
   });
   expect(POB_2007_MJ_P1_AUTHORED_KEY.liveScoringApproved).toBe(false);
 });
 test("2016 scanned source Q47 cannot falsely award an incorrect merchandise balance",()=>{
  const paper=POB_2016_MJ_P1_AUTHORED_KEY;
  expect(paper.scannedPagesReviewed).toEqual([1,2,3,4,5,6,7,8]);
  expect(paper.entries).toHaveLength(60);
  const q47=paper.entries[46];
  expect(q47).toMatchObject({
   number:47,pdfPage:7,proposedOption:null,status:"academic-dispute",
   sourceVisualChecked:true
  });
  expect(q47.explanation).toContain("$40m");
  expect(q47.explanation).toContain("$200m");
  expect(paper.entries[39]).toMatchObject({number:40,pdfPage:6,proposedOption:"C"});
  expect(paper.liveScoringApproved).toBe(false);
 });
 test("2018 paper has five original questions physically missing, never invented or marked",()=>{
  const key=POB_2018_MJ_P1_AUTHORED_KEY;
  expect(verifyPob2018MjP1AuthoredKey()).toEqual({
   valid:true,issues:[],authored:55,missing:[53,54,55,56,57],disputes:[2,15,38,46]
  });
  expect(key.questions.filter(q=>q.sourceQuestionPresent===false).map(q=>q.number))
   .toEqual([53,54,55,56,57]);
  expect(key.questions.slice(52,57).every(q=>
   q.proposedOption===null&&q.status==="source-question-missing")).toBe(true);
  expect(key.questions[41]).toMatchObject({number:42,proposedOption:"D"});
  expect(key.questions[42]).toMatchObject({number:43,proposedOption:"C"});
  expect(key.sourceQuestionsRecovered).toBe(55);
  expect(key.liveScoringApproved).toBe(false);
 });
 test("mislabelled 2019 May/June P1-named source is exact 100-mark Paper 2 rubric",()=>{
  const p2=POB_2019_MJ_ALT_P2_AUTHORED_SCHEME;
  expect(verifyPob2019MjAltP2AuthoredScheme()).toEqual({
   valid:true,issues:[],marks:100,parts:32
  });
  expect(p2.id).toBe("POB-P2-2019-MJ-ALT");
  expect(p2.sourceFilename).toBe("CSEC_Principles_of_Business_P1_2019_MJ.pdf");
  expect(p2.printedTestCode).toBe("01240020");
  expect(p2.originalFilenamePaper).toBe(1);
  expect(p2.actualCoverPaper).toBe(2);
  expect(p2.questions.every(q=>q.parts.reduce((sum,part)=>sum+part.marks,0)===20)).toBe(true);
  expect(p2.questions[3].parts.find(part=>part.id==="c.ii").modelAnswer)
   .toMatch(/toll-free/i);
  const damaged=JSON.parse(JSON.stringify(p2));
  damaged.questions[4].parts[0].criteria.pop();
  expect(verifyPob2019MjAltP2AuthoredScheme(damaged).valid).toBe(false);
  expect(p2.liveScoringApproved).toBe(false);
 });
 test("source manipulation, removed disputes or fake live switches cannot pass",()=>{
  let clone=JSON.parse(JSON.stringify(POB_2002_MJ_P1_AUTHORED_KEY));
  clone.questions[50].academicStatus="unverified-proposal";
  expect(verifyPob2002MjP1AuthoredKey(clone).valid).toBe(false);
  clone=JSON.parse(JSON.stringify(POB_2003_MJ_P1_AUTHORED_KEY));
  clone.entries[0].explanation="";
  expect(verifyPob2003MjP1AuthoredKey(clone).valid).toBe(false);
  clone=JSON.parse(JSON.stringify(POB_2004_MJ_P1_AUTHORED_KEY));
  clone.liveScoringApproved=true;
  expect(verifyPob2004MjP1AuthoredKey(clone).valid).toBe(false);
 });
});
