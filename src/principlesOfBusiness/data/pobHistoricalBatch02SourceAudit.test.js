import {
 POB_HISTORICAL_BATCH02_SOURCES,auditPobHistoricalBatch02Sources
} from "./pobHistoricalBatch02SourceAudit";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {POB_2011_MJ_P1_AUTHORED_KEY,verifyPob2011MjP1AuthoredKey} from "./pobHistorical2011MjP1AuthoredKey";
import {POB_2012_MJ_P1_AUTHORED_KEY,auditPob2012MjP1AuthorKey} from "./pobHistorical2012MjP1AuthoredKey";
import {
 POB_2014_MJ_P1_AUTHORED_KEY,validatePob2014MjP1AuthoredKey,canScorePob2014MjP1Item
} from "./pobHistorical2014MjP1AuthoredKey";
import {
 POB_2015_MJ_P1_AUTHORED_KEY,verifyPob2015MjP1AuthoredKey
} from "./pobHistorical2015MjP1AuthoredKey";
import {
 POB_2017_MJ_P1_AUTHORED_KEY,verifyPob2017MjP1AuthoredKey
} from "./pobHistorical2017MjP1AuthoredKey";

describe("POB historical batch two: source, academic dispute, answer QA",()=>{
 test("the exact 15 source PDFs are tracked, including P2 disguised as 2019 P1",()=>{
  expect(auditPobHistoricalBatch02Sources()).toEqual({
   valid:true,issues:[],sourceCount:15,historicalPaper1Count:14,
   historicalPaper2Count:1,sourcePages:136,flaggedImageOnlyPages:32,
   scoringReleased:0
  });
  expect(new Set(POB_HISTORICAL_BATCH02_SOURCES.map(row=>row.id)).size).toBe(15);
  expect(POB_HISTORICAL_BATCH02_SOURCES.filter(row=>row.lowTextPages>0)
   .map(row=>row.year)).toEqual([2016,2018,2019]);
  const disguised=POB_HISTORICAL_BATCH02_SOURCES.find(row=>row.year===2019);
  expect(disguised).toMatchObject({
   id:"POB-P2-2019-MJ-ALT",paper:2,paperNamedInFilename:1,
   printedPaperOnCover:2,printedTestCode:"01240020",
   lowTextPages:15
  });
  expect(pobReleasedHistoricalPapers()).toEqual([]);
 });
 test("all source fingerprints match approved original PDF bytes",()=>{
  for(const row of POB_HISTORICAL_BATCH02_SOURCES){
   const trusted=POB_SUPPLIED_ARCHIVE.find(s=>s.id===row.id);
   expect(row.sourceSha256).toMatch(/^[a-f0-9]{64}$/);
   expect(row.sourceSha256).toBe(trusted.sourceSha256);
  }
  const altered=POB_HISTORICAL_BATCH02_SOURCES.map(x=>({...x}));
  altered[0].sourceSha256="0".repeat(64);
  expect(auditPobHistoricalBatch02Sources(altered).valid).toBe(false);
 });
 test("May/June 2011 P1: all 60 items, regressive graph answer and disputes",()=>{
  expect(verifyPob2011MjP1AuthoredKey()).toEqual({
   valid:true,issues:[],disputed:[6,22,40,43,55,56]
  });
  expect(POB_2011_MJ_P1_AUTHORED_KEY.entries).toHaveLength(60);
  expect(POB_2011_MJ_P1_AUTHORED_KEY.sourceSha256).toBe(
   POB_SUPPLIED_ARCHIVE.find(s=>s.id==="POB-P1-2011-MJ").sourceSha256
  );
  expect(POB_2011_MJ_P1_AUTHORED_KEY.entries[40]).toMatchObject({
   number:41,pdfPage:6,proposedOption:"D"
  });
  expect(POB_2011_MJ_P1_AUTHORED_KEY.entries[54]).toMatchObject({
   number:55,proposedOption:null,dispute:"no-correct-employment-policy"
  });
  const bad=JSON.parse(JSON.stringify(POB_2011_MJ_P1_AUTHORED_KEY));
  bad.entries[39].status="spark-internal-provisional";
  expect(verifyPob2011MjP1AuthoredKey(bad).valid).toBe(false);
 });
 test("May/June 2012 P1 has 60 explained source-bound answer proposals",()=>{
  const audit=auditPob2012MjP1AuthorKey();
  expect(audit).toEqual({valid:true,issues:[],disputes:[16,27,41,45,55]});
  expect(POB_2012_MJ_P1_AUTHORED_KEY.entries).toHaveLength(60);
  expect(POB_2012_MJ_P1_AUTHORED_KEY.sourceSha256).toBe(
   POB_SUPPLIED_ARCHIVE.find(s=>s.id==="POB-P1-2012-MJ").sourceSha256
  );
  expect(POB_2012_MJ_P1_AUTHORED_KEY.entries[54]).toMatchObject({
   number:55,proposedOption:null,dispute:"no-valid-option",alternatives:[]
  });
  const altered=JSON.parse(JSON.stringify(POB_2012_MJ_P1_AUTHORED_KEY));
  altered.entries[54].status="spark-internal-provisional";
  expect(auditPob2012MjP1AuthorKey(altered).valid).toBe(false);
  expect(POB_2012_MJ_P1_AUTHORED_KEY.liveScoringApproved).toBe(false);
 });
 test("May/June 2014 P1 has 60 proposed reasoned items and five disputed questions",()=>{
  const result=validatePob2014MjP1AuthoredKey();
  expect(result).toEqual({valid:true,issues:[],disputes:5,
   disputedNumbers:[51,53,56,57,60]});
  expect(POB_2014_MJ_P1_AUTHORED_KEY.proposedEntries).toHaveLength(60);
  expect(POB_2014_MJ_P1_AUTHORED_KEY.proposedEntries.every(r=>r.explanation.length>36)).toBe(true);
  expect(POB_2014_MJ_P1_AUTHORED_KEY.proposedEntries[6]).toMatchObject({
   number:7,page:3,answer:"C"
  });
  expect(POB_2014_MJ_P1_AUTHORED_KEY.proposedEntries[7]).toMatchObject({
   number:8,page:3,answer:"B"
  });
  expect(POB_2014_MJ_P1_AUTHORED_KEY.proposedEntries[50]).toMatchObject({
   number:51,answer:null,dispute:"no-correct-option",acceptedAlternatives:[]
  });
  expect(POB_2014_MJ_P1_AUTHORED_KEY.proposedEntries[59]).toMatchObject({
   number:60,answer:null,dispute:"multiple-correct-option-pairs",acceptedAlternatives:["B","C"]
  });
 });
 test("disputes and all historical item scoring remain securely disabled",()=>{
  for(const number of [1,7,51,53,56,57,60])
   expect(canScorePob2014MjP1Item(number)).toBe(false);
  const spoof={...POB_2014_MJ_P1_AUTHORED_KEY,liveScoringApproved:true};
  for(const number of [51,53,56,57,60])
   expect(canScorePob2014MjP1Item(number,spoof)).toBe(false);
 });
 test("2015 P1 answer proposals contain 60 explanations, 3 academic disputes",()=>{
  expect(verifyPob2015MjP1AuthoredKey()).toEqual({
   valid:true,problems:[],disputes:[52,56,59]
  });
  expect(POB_2015_MJ_P1_AUTHORED_KEY.questions[9]).toMatchObject({
   number:10,proposedOption:"A",sourcePage:3
  });
  expect(POB_2015_MJ_P1_AUTHORED_KEY.questions[59]).toMatchObject({
   number:60,proposedOption:"A",sourcePage:9
  });
  expect(POB_2015_MJ_P1_AUTHORED_KEY.liveScoringApproved).toBe(false);
 });
 test("2017 P1 key uses verified chart choices and maintains two disputes",()=>{
  expect(verifyPob2017MjP1AuthoredKey()).toEqual({
   valid:true,problems:[],disputes:[47,56]
  });
  expect(POB_2017_MJ_P1_AUTHORED_KEY.entries[5]).toMatchObject({
   number:6,pdfPage:3,proposedOption:"C"
  });
  expect(POB_2017_MJ_P1_AUTHORED_KEY.entries[6]).toMatchObject({
   number:7,pdfPage:3,proposedOption:"B"
  });
  expect(POB_2017_MJ_P1_AUTHORED_KEY.entries).toHaveLength(60);
  expect(POB_2017_MJ_P1_AUTHORED_KEY.liveScoringApproved).toBe(false);
 });
 test("tampered scores, dropped entries and fake fingerprints fail",()=>{
  const a=JSON.parse(JSON.stringify(POB_2014_MJ_P1_AUTHORED_KEY));
  a.proposedEntries[50].status="spark-authored-provisional";
  expect(validatePob2014MjP1AuthoredKey(a).valid).toBe(false);
  const b=JSON.parse(JSON.stringify(POB_2015_MJ_P1_AUTHORED_KEY));
  b.questions.pop();
  expect(verifyPob2015MjP1AuthoredKey(b).valid).toBe(false);
  const c=JSON.parse(JSON.stringify(POB_2017_MJ_P1_AUTHORED_KEY));
  c.sourceSha256="0".repeat(64);
  expect(verifyPob2017MjP1AuthoredKey(c).valid).toBe(false);
 });
});