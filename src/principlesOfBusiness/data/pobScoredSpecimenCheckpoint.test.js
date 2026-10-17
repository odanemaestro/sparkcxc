import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT as checkpoint,verifyPobSpecimenCheckpoint} from "./pobCxcSpecimenP1Checkpoint";
import {POB_SUPPLIED_ARCHIVE,POB_SOURCE_INVENTORY} from "./pobHistoricalInventory";
import {POB_HISTORICAL_BATCH04} from "./pobHistoricalBatch04";
import {POB_HISTORICAL_BATCH05} from "./pobHistoricalBatch05";
import {validatePobHistoricalCandidate} from "./pobHistoricalReleaseGate";
import {POB_PAPER1_ORIGINAL_ITEMS} from "./pobPaper1Original";
import fs from "fs";
import path from "path";

test("first ten 2019 specimen items match CXC's official source-key allocation",()=>{
 expect(verifyPobSpecimenCheckpoint()).toEqual({valid:true,issues:[]});
 expect(checkpoint.questions.map(q=>q.answer).join("")).toBe("AABBCACBDC");
 expect(checkpoint.questions.map(q=>q.syllabusRef)).toEqual(["1.1","1.2","1.3","1.6","1.7","2.2","2.10","2.9","2.5","2.6"]);
 expect(checkpoint.questions.map(q=>q.sourcePage)).toEqual([2,2,2,2,2,2,2,2,2,3]);
 expect(checkpoint.sourcePdfSha256).toMatch(/^[0-9a-f]{64}$/);
 expect(checkpoint.questions).toHaveLength(10);
 expect(checkpoint.maxScore).toBe(10);
 expect(checkpoint.originalSpecimenQuestionCount).toBe(60);
});
test("checkpoint rejects wrong answer keys or missing answer choices",()=>{
 const badKey={...checkpoint,questions:checkpoint.questions.map((q,i)=>i===4?{...q,answer:"D"}:q)};
 expect(verifyPobSpecimenCheckpoint(badKey).valid).toBe(false);
 const badChoice={...checkpoint,questions:checkpoint.questions.map((q,i)=>i===7?{...q,options:["x","x","y","z"]}:q)};
 expect(verifyPobSpecimenCheckpoint(badChoice).valid).toBe(false);
});
test("specimen is independently scored and never substituted into full original 60-item paper",()=>{
 expect(POB_PAPER1_ORIGINAL_ITEMS.length).toBe(60);
 expect(checkpoint.questions.every(q=>q.origin==="cxc-official-specimen")).toBe(true);
 expect(POB_PAPER1_ORIGINAL_ITEMS.every(q=>q.origin==="spark-original")).toBe(true);
 const correct=Object.fromEntries(checkpoint.questions.map(q=>[q.id,q.answer]));
 expect(checkpoint.questions.filter(q=>correct[q.id]===q.answer)).toHaveLength(10);
 expect(checkpoint.questions.filter(q=>q.answer==="X")).toHaveLength(0);
});
test("practice hub offers the full 60-item specimen with one navigator",()=>{
 const view=fs.readFileSync(path.join(__dirname,"..","practice","PobPracticeHub.jsx"),"utf8");
 expect(view).toContain('mode==="specimen"||mode==="specimenFull"');
 expect(view).toContain("paperOverride={POB_CXC_2019_SPECIMEN_P1_FULL}");
 expect(view).toContain("score,maxScore,percent:Math.round(100*score/maxScore)");
 expect(view).toContain("className=\"pob-primary\" disabled={index===questions.length-1}");
 expect(view).toContain('source:isSpecimen?"cxc-official-specimen":"spark-original"');
});
test("2019 wrong-labelled paper is reclassified as an additional Paper 2 copy",()=>{
 const x=POB_SUPPLIED_ARCHIVE.find(p=>p.id==="POB-P2-2019-MJ-ALT");
 const y=POB_SUPPLIED_ARCHIVE.find(p=>p.id==="POB-P2-2019-MJ");
 expect(x).toBeDefined();
 expect(y).toBeDefined();
 expect(x.filename).toBe("CSEC_Principles_of_Business_P1_2019_MJ.pdf");
 expect(x.sourceArchivePaperLabel).toBe(1);
 expect(x.paper).toBe(2);
 expect(x.reclassifiedFromPaper1).toBe(true);
 expect(x.filename).not.toBe(y.filename);
 expect(POB_SOURCE_INVENTORY.genuinePaper1SourceCount).toBe(20);
 expect(POB_SOURCE_INVENTORY.actualPaper2SourceCount).toBe(26);
 expect(POB_SOURCE_INVENTORY.actualPagesPaper1).toBe(178);
 expect(POB_SOURCE_INVENTORY.actualPagesPaper2).toBe(290);
 expect(POB_HISTORICAL_BATCH04.find(p=>p.id===x.id).paper).toBe(2);
 expect(POB_HISTORICAL_BATCH05).toHaveLength(6);
 expect(validatePobHistoricalCandidate(x).ready).toBe(false);
});
