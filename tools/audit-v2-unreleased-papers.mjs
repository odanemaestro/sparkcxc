import fs from "node:fs";
import assert from "node:assert/strict";
// Mandatory whole-paper gate. Criterion approvals alone never count as release.
const dir=process.argv[2]||"artifacts/v2-all-paper-readiness";
const summary=JSON.parse(fs.readFileSync(dir+"/summary.json","utf8"));
const papers=JSON.parse(fs.readFileSync(dir+"/papers.json","utf8"));
const focus=new Set(["mathematics","english-a","social-studies","principles-of-business"]);
const wanted={"mathematics":16,"english-a":12,"social-studies":3,"principles-of-business":1};
const report=[];
for(const [subjectId,expectedPapers] of Object.entries(wanted)){
 const group=papers.filter(p=>p.subjectId===subjectId);
 assert.equal(group.length,expectedPapers,subjectId+" source paper count drift");
 for(const p of group){
  const failed=(p.scenarios||[]).filter(s=>s.passed!==true);
  const possible=p.outcome==="verified"&&failed.length===0 &&
    p.scenarios?.length>=9 &&
    (p.scenarios||[]).filter(s=>s.canPublish).length>=7;
  report.push({
   subjectId,paperId:p.paperId,rubricVersion:p.rubricVersion,
   outcome:p.outcome,canRelease:Boolean(possible),
   verifiedCriteria:p.verifiedCriteria,totalCriteria:p.criteria,
   scenarios:p.scenarios?.length||0,
   failedScenarios:failed.map(s=>({
    name:s.name,failures:s.failures?.slice(0,18),
    canPublish:s.canPublish,expectedTotal:s.expectedTotal,
    confirmedMarks:s.confirmedMarks
   })),
   unverifiedCriteria:p.unverifiedCriteria||p.missingFullFixtures||[]
  });
 }
}
assert.equal(report.length,32,"all 32 unreleased current paper drafts must appear");
const blocked=report.filter(x=>!x.canRelease),eligible=report.filter(x=>x.canRelease);
const bySubject=Object.fromEntries(Object.keys(wanted).map(subject=>[subject,{
 total:report.filter(r=>r.subjectId===subject).length,
 eligible:eligible.filter(r=>r.subjectId===subject).length,
 blocked:blocked.filter(r=>r.subjectId===subject).length
}]));
const evidence={source:"actual-source-v2-worker-replay",generatedAt:new Date().toISOString(),
 repositoryCommit:summary.provenance.gitCommit,verifiedCriteria:summary.byOutcome.verified,
 sourceCounts:bySubject,total:report.length,eligible:eligible.length,
 blocked:blocked.length,papers:report};
fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(dir+"/paper-release-readiness.json",JSON.stringify(evidence,null,2));
console.log("V2_ALL_PAPER_READY_COUNTS="+JSON.stringify({
 total:32,eligible:eligible.length,blocked:blocked.length,bySubject
}));
for(const p of report)console.log("V2_ALL_PAPER_READY_ITEM="+JSON.stringify({
 subject:p.subjectId,paper:p.paperId,outcome:p.outcome,releaseReady:p.canRelease,
 failed:p.failedScenarios.map(s=>s.name+":"+s.failures?.slice(0,3).join(" | ")),
 missing:p.unverifiedCriteria.slice(0,7)
}));
if(summary.rehearsal.criteriaRejectedCount||summary.rehearsal.papersRejected.length||
   summary.rehearsal.releaseRejected.length)
 throw Error("Full-scope rehearsal has rejected source evidence; do not release");
console.log("V2 readiness inspection complete. No database activation is performed.");
