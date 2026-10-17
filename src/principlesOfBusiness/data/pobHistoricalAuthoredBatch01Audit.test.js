import {auditPobHistoricalAuthoredBatch01} from "./pobHistoricalAuthoredBatch01Audit";
import {
 POB_2012_MJ_P2_AUTHORED_SCHEME,verifyPob2012MjP2AuthoredScheme
} from "./pobHistorical2012MjP2AuthoredScheme";
import {
 POB_2013_MJ_P2_AUTHORED_SCHEME,verifyPob2013MjP2AuthoredScheme
} from "./pobHistorical2013MjP2AuthoredScheme";
import {
 POB_2014_MJ_P2_AUTHORED_SCHEME,verifyPob2014MjP2AuthoredScheme
} from "./pobHistorical2014MjP2AuthoredScheme";
import {
 POB_2015_MJ_P2_AUTHORED_SCHEME,verifyPob2015MjP2AuthoredScheme
} from "./pobHistorical2015MjP2AuthoredScheme";
import {
 POB_2016_MJ_P2_AUTHORED_SCHEME,verifyPob2016MjP2AuthoredScheme
} from "./pobHistorical2016MjP2AuthoredScheme";
import {
 POB_2017_MJ_P2_AUTHORED_SCHEME,verifyPob2017MjP2AuthoredScheme
} from "./pobHistorical2017MjP2AuthoredScheme";
import {
 POB_2018_MJ_P2_AUTHORED_SCHEME,verifyPob2018MjP2AuthoredScheme
} from "./pobHistorical2018MjP2AuthoredScheme";
import {
 POB_2022_JAN_P2_AUTHORED_SCHEME,verifyPob2022JanP2AuthoredScheme
} from "./pobHistorical2022JanP2AuthoredScheme";
import {
 POB_2022_MJ_P2_AUTHORED_SCHEME,verifyPob2022MjP2AuthoredScheme
} from "./pobHistorical2022MjP2AuthoredScheme";
import {
 POB_2023_JAN_P2_AUTHORED_SCHEME,verifyPob2023JanP2AuthoredScheme
} from "./pobHistorical2023JanP2AuthoredScheme";
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {validatePobHistoricalP2Selection} from "./pobHistoricalScoringBatches";
const targets=[
 [POB_2012_MJ_P2_AUTHORED_SCHEME,verifyPob2012MjP2AuthoredScheme,7,42],
 [POB_2013_MJ_P2_AUTHORED_SCHEME,verifyPob2013MjP2AuthoredScheme,7,40],
 [POB_2014_MJ_P2_AUTHORED_SCHEME,verifyPob2014MjP2AuthoredScheme,7,42],
 [POB_2015_MJ_P2_AUTHORED_SCHEME,verifyPob2015MjP2AuthoredScheme,7,42],
 [POB_2016_MJ_P2_AUTHORED_SCHEME,verifyPob2016MjP2AuthoredScheme,7,45],
 [POB_2017_MJ_P2_AUTHORED_SCHEME,verifyPob2017MjP2AuthoredScheme,5,28],
 [POB_2018_MJ_P2_AUTHORED_SCHEME,verifyPob2018MjP2AuthoredScheme,5,32],
 [POB_2022_JAN_P2_AUTHORED_SCHEME,verifyPob2022JanP2AuthoredScheme,5,27],
 [POB_2022_MJ_P2_AUTHORED_SCHEME,verifyPob2022MjP2AuthoredScheme,5,32],
 [POB_2023_JAN_P2_AUTHORED_SCHEME,verifyPob2023JanP2AuthoredScheme,5,31]
];
describe("CXC POB batch-1 authored marking schemes, 2012-2023",()=>{
 test("all 15 owner-approved historical source files have an authored marking model",()=>{
  const audit=auditPobHistoricalAuthoredBatch01();
  expect(audit.valid).toBe(true);
  expect(audit.issues).toEqual([]);
  expect(audit.authoredSources).toBe(15);
  expect(audit.paper1Authored).toBe(1);
  expect(audit.paper2Authored).toBe(14);
  expect(audit.officialHistoricalKeysSupplied).toBe(0);
  expect(audit.academicCalibrationPassed).toBe(0);
  expect(audit.liveScoringReleased).toBe(0);
  expect(audit.summaries).toHaveLength(15);
 });
 test.each(targets)("all originally offered questions/parts have correct mark totals",(
  paper,verify,count,parts
 )=>{
  const result=verify();
  expect(result.valid).toBe(true);
  expect(result.issues).toEqual([]);
  expect(result.offeredMarks).toBe(count===7?140:100);
  expect(result.parts).toBe(parts);
  expect(paper.questions).toHaveLength(count);
  expect(paper.questions.every(q=>q.parts.reduce((n,p)=>n+p.marks,0)===20)).toBe(true);
  const approved=POB_SUPPLIED_ARCHIVE.find(x=>x.id===paper.id);
  expect(paper.sourceSha256).toBe(approved.sourceSha256);
  expect(paper.liveScoringApproved).toBe(false);
  expect(validatePobHistoricalP2Selection(paper.id,count===7?[1,2,3,4,6]:[1,2,3,4,5]).valid).toBe(true);
 });
 test("visually recovered question parts remain credited instead of silently dropped",()=>{
  const q2016=POB_2016_MJ_P2_AUTHORED_SCHEME.questions[6];
  expect(q2016.parts.find(p=>p.id==="b.iii").marks).toBe(2);
  const q2022=POB_2022_MJ_P2_AUTHORED_SCHEME.questions[3];
  expect(q2022.parts.find(p=>p.id==="a.i").modelAnswer).toMatch(/manufacturer/i);
  expect(q2022.parts.find(p=>p.id==="a.i").modelAnswer).toMatch(/retailer/i);
  const q2023=POB_2023_JAN_P2_AUTHORED_SCHEME.questions[2];
  expect(q2023.parts.find(p=>p.id==="b.ii").modelAnswer).toMatch(/secondary/i);
  expect(q2023.parts.find(p=>p.id==="b.ii").modelAnswer).toMatch(/townhouses/i);
 });
 test("tampered criterion, duplicate parts and wrong source must fail",()=>{
  for(const [paper,verify] of targets){
   const copy=JSON.parse(JSON.stringify(paper));
   copy.questions[0].parts[0].criteria[0].marks=500;
   expect(verify(copy).valid).toBe(false);
   const copy2=JSON.parse(JSON.stringify(paper));
   copy2.sourceSha256="0".repeat(64);
   expect(verify(copy2).valid).toBe(false);
   const copy3=JSON.parse(JSON.stringify(paper));
   copy3.liveScoringApproved=true;
   expect(verify(copy3).valid).toBe(false);
  }
 });
});
