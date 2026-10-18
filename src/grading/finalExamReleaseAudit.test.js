import fs from "fs";
import path from "path";
import {buildPaper1Exam,validatePaper1Exam,scorePaper1,auditPaper1OptionIntegrity} from "../practice/paper1Engine";
import {auditPaper2FinalRelease,auditFinalExamReleaseSet} from "./finalExamReleaseAudit";
import {PAPER2_GRADING_SUBJECTS} from "./crossCourseGradingRelease";
import {buildAttemptProvenance} from "./attemptProvenance";
import {FNH_HISTORICAL_P2_2018} from "../fnh/data/fnhHistorical2018Paper2";
import {gradeFnhWrittenPart} from "../fnh/practice/fnhPaper2Marking";
import {gradeChemistryPaper2Item} from "../chemistry/practice/chemistryPaper2Grader";
import {gradeIntegratedSciencePaper2Item} from "../integratedScience/practice/integratedSciencePaper2Grader";
import {POB_HISTORICAL_REVIEW_BANKS} from "../principlesOfBusiness/data/pobHistoricalArchiveRegistry";
import {buildPobOwnerPaper2Bank} from "../principlesOfBusiness/data/pobPaper2OwnerSourceBank";
import {reviewPobHistoricalPaper2} from "../principlesOfBusiness/data/pobHistoricalPaper2RubricReview";

const base=(subjectId,paperId,answers={})=>buildAttemptProvenance({
 subjectId,paper:paperId,responses:answers,
 bankVersion:"source-fixture-v1",rubricVersion:"criteria-fixture-v1",
 graderVersion:"grading-fixture-v1",submittedAt:"2026-10-18T12:00:00Z"
});
const sample=(subjectId="chemistry",paperId="fixture",extra={})=>({
 subjectId,paperId,score:2,maxMarks:3,unresolvedMarks:0,assessedMarks:2,
 parts:[{id:"a",score:1,maxMarks:1,unresolvedMarks:0,assessedMarks:1},
        {id:"b",score:1,maxMarks:2,unresolvedMarks:0,assessedMarks:1}],
 provenance:base(subjectId,paperId),...extra
});
const letter=i=>String.fromCharCode(97+(i%26))+String.fromCharCode(97+Math.floor(i/26));
const fakePaper=()=>Array.from({length:60},(_,i)=>({
 question_id:"q"+i,question_number:i+1,paper:"source-template",
 topic:"General",subtopic:"Topic",stem:"Find the token "+letter(i),
 correct_option:["A","B","C","D"][i%4],
 option_a:"alpha",option_b:"beta",option_c:"gamma",option_d:"delta"
}));

test("live Paper 1 source bank has valid choices and answer keys",()=>{
 const file=path.join(process.cwd(),"public","practice-exam","questions.json");
 const bank=JSON.parse(fs.readFileSync(file,"utf8"));
 const result=auditPaper1OptionIntegrity(bank);
 expect(result.clean).toBe(true);
 expect(result.total).toBeGreaterThan(60);
});
test("Paper 1 exam builder rejects missing or duplicated options before selecting 60 questions",()=>{
 const paper=fakePaper();
 expect(validatePaper1Exam({questions:paper}).valid).toBe(true);
 const duplicated=paper.map((q,i)=>i===5?{...q,option_b:" ALPHA "}:q);
 const audit=validatePaper1Exam({questions:duplicated});
 expect(audit.valid).toBe(false);
 expect(audit.sourceAudit.duplicateOptions).toEqual(["q5"]);
 expect(()=>buildPaper1Exam(duplicated,{seed:"release-14"})).toThrow();
 const invalid=paper.map((q,i)=>i===2?{...q,correct_option:"E"}:q);
 expect(validatePaper1Exam({questions:invalid}).valid).toBe(false);
 expect(validatePaper1Exam({questions:invalid}).sourceAudit.invalidKeys).toEqual(["q2"]);
});
test("Paper 1 scoring preserves counts but warns against finalizing invalid source keys",()=>{
 const paper=fakePaper();
 const answers=Object.fromEntries(paper.slice(0,25).map(q=>[q.question_id,q.correct_option.toLowerCase()]));
 const result=scorePaper1(paper,answers);
 expect(result.correct).toBe(25);
 expect(result.unanswered).toBe(35);
 expect(result.incorrect).toBe(0);
 expect(result.correct+result.incorrect+result.unanswered).toBe(result.total);
 expect(result.fullyGraded).toBe(true);
 expect(result.gradingStatus).toBe("verified");
 const corrupt=scorePaper1(paper.map((q,i)=>i===0?{...q,correct_option:"Z"}:q),answers);
 expect(corrupt.correct).toBe(24);
 expect(corrupt.invalidQuestionIds).toEqual(["q0"]);
 expect(corrupt.fullyGraded).toBe(false);
 expect(corrupt.gradingStatus).toBe("source-answer-key-review-required");
});
test("Paper 2 final release reconciles parts, scores and immutable response provenance",()=>{
 const result=auditPaper2FinalRelease(sample());
 expect(result.canPublishFinalScore).toBe(true);
 expect(result.issues).toEqual([]);
 expect(result.releaseStatus).toBe("verified-final");
 const changed=auditPaper2FinalRelease(sample("chemistry","fixture",{
   provenance:{...base("chemistry","fixture"),response_snapshot:{a:"tampered"}}
 }));
 expect(changed.canPublishFinalScore).toBe(false);
 expect(changed.issues).toContain("response-snapshot-hash-mismatch");
 const foreign=auditPaper2FinalRelease(sample("chemistry","fixture",{
   provenance:base("physics","fixture")
 }));
 expect(foreign.issues).toContain("provenance-paper-mismatch");
});
test("incomplete written Paper 2 scores are never incorrectly announced final",()=>{
 const report=auditPaper2FinalRelease(sample("integrated-science","written",{
   score:1,unresolvedMarks:1,assessedMarks:null,provisional:true,
   parts:[{id:"a",score:1,maxMarks:1,unresolvedMarks:0,assessedMarks:1},
          {id:"b",score:0,maxMarks:2,unresolvedMarks:1,assessedMarks:null}]
 }));
 expect(report.canPublishFinalScore).toBe(false);
 expect(report.issues).toEqual(expect.arrayContaining([
   "unresolved-written-credit","not-fully-assessed","unresolved-part"
 ]));
 const invalid=auditPaper2FinalRelease(sample("chemistry","bad",{
    score:4,maxMarks:3,unresolvedMarks:1,assessedMarks:4,
    provenance:base("chemistry","bad")
 }));
 expect(invalid.issues).toContain("confirmed-plus-unresolved-exceeds-total");
 expect(invalid.issues).toContain("score-exceeds-maximum");
});
test("Paper 2 never silently drops unscored parts or changes source maxima",()=>{
 const report=auditPaper2FinalRelease(sample("chemistry","fixture",{
  parts:[{id:"a",score:1,maxMarks:1},{id:"a",score:1,maxMarks:1}]
 }));
 expect(report.issues).toContain("duplicate-part-identity");
 expect(report.issues).toContain("part-total-maximum-mismatch");
 const mismatch=auditPaper2FinalRelease(sample("chemistry","fixture",{
  parts:[{id:"a",score:2,maxMarks:3,unresolvedMarks:1}]
 }));
 expect(mismatch.issues).toContain("part-total-unresolved-mismatch");
});
test("historical source verification remains separate from deterministic mark accuracy",()=>{
 const report=auditPaper2FinalRelease(sample("principles-of-business","historical",{
  historical:true,sourceVerified:false,rubricVerified:false,
  provenance:base("principles-of-business","historical")
 }));
 expect(report.canPublishFinalScore).toBe(false);
 expect(report.issues).toContain("historical-source-or-rubric-unverified");
 const verified=auditPaper2FinalRelease(sample("principles-of-business","historical",{
  historical:true,sourceVerified:true,rubricVerified:true,
  provenance:base("principles-of-business","historical")
 }));
 expect(verified.canPublishFinalScore).toBe(true);
});
test("nine-subject release report flags any unverified course and duplicates",()=>{
 const audits=PAPER2_GRADING_SUBJECTS.map(id=>auditPaper2FinalRelease(sample(id,"release-final")));
 const verified=auditFinalExamReleaseSet(audits);
 expect(verified.complete).toBe(true);
 expect(verified.verified).toBe(9);
 const oneUnresolved=auditPaper2FinalRelease(sample("chemistry","release-final",{
   unresolvedMarks:1,assessedMarks:null,provisional:true
 }));
 const failed=auditFinalExamReleaseSet([oneUnresolved,...audits.slice(1)]);
 expect(failed.complete).toBe(false);
 expect(failed.needingReview).toBe(1);
 expect(failed.issues).toContain("review-required:chemistry:release-final");
 expect(auditFinalExamReleaseSet([...audits,audits[0]]).issues).toContain("duplicate-audit-paper");
});
test("actual 2018 FNH Paper 2 rubric is blocked as final if developed evidence is unresolved",()=>{
 const part=FNH_HISTORICAL_P2_2018.questions[0].items.find(p=>p.id==="b");
 const provisional=gradeFnhWrittenPart(part,"Educate families about balanced diets and food safety.");
 expect(provisional.confirmedMarks).toBe(2);
 expect(provisional.unresolvedMarks).toBe(2);
 const report=auditPaper2FinalRelease({
   subjectId:"food-nutrition-and-health",paperId:"fnh-2018-q1b",
   score:provisional.confirmedMarks,maxMarks:part.marks,
   unresolvedMarks:provisional.unresolvedMarks,assessedMarks:provisional.assessedMarks,
   provisional:provisional.assessedMarks===null,provenance:base("food-nutrition-and-health","fnh-2018-q1b"),
   parts:[{id:part.id,score:provisional.confirmedMarks,maxMarks:part.marks,
     unresolvedMarks:provisional.unresolvedMarks,assessedMarks:provisional.assessedMarks}]
 });
 expect(report.canPublishFinalScore).toBe(false);
 expect(report.issues).toContain("unresolved-written-credit");
});
test("real POB historical method credit remains provisional without full rubric evidence",()=>{
 const archive=POB_HISTORICAL_REVIEW_BANKS.find(p=>p.id==="POB-P2-2005-MJ");
 const paper=buildPobOwnerPaper2Bank(archive.id,archive.bank);
 const graded=reviewPobHistoricalPaper2({"Q2:c":"Training."},paper,[2]);
 const part=graded.questions[0].parts.find(p=>p.part==="c");
 expect(part.confirmedMarks).toBe(1);
 expect(part.unresolvedMarks).toBe(5);
 const report=auditPaper2FinalRelease({
   subjectId:"principles-of-business",paperId:"pob-2005-q2c",
   score:part.confirmedMarks,maxMarks:part.availableMarks,
   unresolvedMarks:part.unresolvedMarks,assessedMarks:part.assessedMarks,
   provisional:true,provenance:base("principles-of-business","pob-2005-q2c"),
   parts:[{id:"c",score:part.confirmedMarks,maxMarks:part.availableMarks,
     unresolvedMarks:part.unresolvedMarks,assessedMarks:part.assessedMarks}]
 });
 expect(report.canPublishFinalScore).toBe(false);
});
test("actual Chemistry and Integrated Science graders retain conservative source-point accounting",()=>{
 const question={id:"B14"};
 const item={marks:3,markScheme:{points:["heat increases reaction rate"]}};
 const chem=gradeChemistryPaper2Item(question,0,0,item,{"B14:0:0":"Heat increases reaction rate."});
 const science=gradeIntegratedSciencePaper2Item(question,0,0,
  {marks:3,markScheme:{points:["heat increases evaporation"]}},
  {"B14:0:0":"Heat increases evaporation."});
 for(const result of [chem,science]){
  expect(result.score).toBe(1);
  expect(result.unassessedMarks).toBe(2);
  const release=auditPaper2FinalRelease(sample("chemistry","science-14",{
    score:result.score,maxMarks:result.maxMarks,
    unresolvedMarks:result.unassessedMarks,assessedMarks:null,
    provisional:result.provisional,
    provenance:base("chemistry","science-14"),
    parts:[{id:"written",score:result.score,maxMarks:result.maxMarks,
      unresolvedMarks:result.unassessedMarks,assessedMarks:null}]
  }));
  expect(release.canPublishFinalScore).toBe(false);
  expect(release.issues).toContain("unresolved-written-credit");
 }
});
