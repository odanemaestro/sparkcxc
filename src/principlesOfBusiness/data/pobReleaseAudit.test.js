import {auditPobRelease} from "./pobReleaseAudit";
import {POB_OBJECTIVES,POB_TOPICS} from "./pobCourse";
import {POB_PAPER1_ORIGINAL_ITEMS} from "./pobPaper1Original";
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {getSparkSubjectRegistry} from "../../subjects/subjectRegistry";

describe("POB pre-release audit",()=>{
 const liveSubject=()=>getSparkSubjectRegistry().find(s=>s.id==="principles-of-business");
 test("reports structural coverage without incorrectly approving release",()=>{
   const result=auditPobRelease({subject:liveSubject()});
   expect(result.passedStructuralChecks).toBe(true);
   expect(result.issues).toEqual([]);
   expect(result.releaseApproved).toBe(false);
   expect(result.coverage.objectives).toBe(119);
   expect(result.coverage.detailedObjectives).toBe(119);
   expect(result.coverage.paper1Items).toBe(60);
   expect(result.coverage.paper2Parts).toBe(25);
   expect(result.coverage.unverifiedHistorical).toBe(46);
   expect(result.blockers.length).toBeGreaterThan(0);
 });
 test("detects an unlinked objective in Paper 1",()=>{
   const items=POB_PAPER1_ORIGINAL_ITEMS.map((item,index)=>
     index===0?{...item,objectiveCode:"S1.999"}:item);
   expect(auditPobRelease({paper1Items:items}).issues).toContain(
     "Paper 1 contains a non-existent syllabus objective.");
 });
 test("rejects a published state without permission",()=>{
   const result=auditPobRelease({subject:{enabled:true,status:"published"}});
   expect(result.passedStructuralChecks).toBe(false);
   expect(result.releaseApproved).toBe(false);
 });
 test("blocks historical papers from becoming simulator-ready without verification",()=>{
   const historical=POB_SUPPLIED_ARCHIVE.map((paper,index)=>
     index===0?{...paper,simulatorReady:true}:paper);
   expect(auditPobRelease({historical}).issues).toContain(
     "Unverified historical papers must not be released as simulator-ready.");
 });
 test("detects missing lesson objective mapping",()=>{
   const topics=POB_TOPICS.map((topic,index)=>index===0?{
     ...topic,metadata:{...topic.metadata,syllabus:{
       ...topic.metadata.syllabus,objectiveCodes:[]}}
   }:topic);
   expect(auditPobRelease({topics}).passedStructuralChecks).toBe(false);
 });
 test("detects missing deep-dive details",()=>{
   const objectives=POB_OBJECTIVES.filter(o=>o.code!=="S10.15");
   expect(auditPobRelease({objectives}).passedStructuralChecks).toBe(false);
 });
});
