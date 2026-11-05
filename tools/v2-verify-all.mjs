import {build} from "esbuild";
import {execSync} from "node:child_process";
import fs from "node:fs";
import {openRegistry,loadRubrics,sha256} from "./v2-registry.mjs";
/**
 * Single complete V2 criterion verification run.
 *
 *   node tools/v2-verify-all.mjs [--subject <id>] [--out <dir>]
 *
 * Loads the rubric registry exactly as the committed migrations build it,
 * verifies every criterion against its source-bound fixture matrix using the
 * same examiner bundle the worker deploys, and writes:
 *   <out>/evidence.json      one record per criterion (all 2,118)
 *   <out>/summary.json       counts by subject / outcome / failure reason
 * Pure and repeatable: re-running with unchanged sources gives identical
 * outcomes, so it is safe to resume after any interruption.
 */
const arg=name=>{const i=process.argv.indexOf(name);return i>0?process.argv[i+1]:null;};
const out=arg("--out")||"artifacts/v2-verification";
const only=arg("--subject");
fs.mkdirSync(out,{recursive:true});

const runner=".v2-verify-runner.mjs";
await build({absWorkingDir:process.cwd(),entryPoints:["src/grading/v2VerificationRun.js"],
 bundle:true,format:"esm",platform:"neutral",target:"es2022",outfile:runner,
 logLevel:"error",loader:{".js":"jsx"}});
const {runV2Verification,runV2PaperVerification}=await import("../"+runner);
fs.rmSync(runner);

// Provenance: the deployed examiner bundle and the fixture sources.
execSync("node tools/build-server-marker-v2.mjs",{stdio:"ignore"});
const bundleSha256=fs.readFileSync("supabase/functions/_shared/server-marker-v2.sha256","utf8").trim();
const fixtureFiles=fs.readdirSync("src/grading/v2Fixtures").sort();
const calibrationFiles=fs.readdirSync("src/principlesOfAccounts/calibration").filter(f=>f.endsWith(".js")).sort();
const fixtureSha256=sha256([...fixtureFiles.map(f=>fs.readFileSync("src/grading/v2Fixtures/"+f,"utf8")),
 ...calibrationFiles.map(f=>fs.readFileSync("src/principlesOfAccounts/calibration/"+f,"utf8")),
 ...["src/officeAdministration/data/oaPaper2.js","src/officeAdministration/oaMarkingV2.js"].map(f=>fs.readFileSync(f,"utf8"))].join("\n"));
let gitCommit="unknown";
try{gitCommit=execSync("git rev-parse HEAD").toString().trim();}catch{}
const dirty=execSync("git status --porcelain src supabase tools").toString().trim().length>0;
const provenance={bundleSha256,fixtureSha256,gitCommit,workingTreeDirty:dirty,ranAt:new Date().toISOString()};

const db=await openRegistry();
let papers=await loadRubrics(db);
if(only)papers=papers.filter(p=>p.subject_id===only);
const started=Date.now();
const records=runV2Verification(papers,provenance);

const summary={provenance,criteria:records.length,bySubject:{},byOutcome:{},failureReasons:{},blockers:{}};
for(const r of records){
 const s=summary.bySubject[r.subjectId]??={criteria:0,verified:0,failed:0,blocked:0};
 s.criteria++;s[r.outcome]++;
 summary.byOutcome[r.outcome]=(summary.byOutcome[r.outcome]||0)+1;
 if(r.blocker)summary.blockers[r.blocker]=(summary.blockers[r.blocker]||0)+1;
 for(const f of r.failures||[])for(const reason of f.failures)
  summary.failureReasons[f.cls+":"+reason]=(summary.failureReasons[f.cls+":"+reason]||0)+1;
 for(const m of r.missingClasses||[])summary.failureReasons["missing:"+m]=(summary.failureReasons["missing:"+m]||0)+1;
 for(const m of r.uncommittedClasses||[])summary.failureReasons["uncommitted:"+m]=(summary.failureReasons["uncommitted:"+m]||0)+1;
}
// Every record carries the digest of its own content (excluding the digest).
for(const r of records)r.evidenceSha256=sha256(JSON.stringify({...r,evidenceSha256:undefined}));
const paperRecords=runV2PaperVerification(papers,records,provenance);
for(const p of paperRecords)p.evidenceSha256=sha256(JSON.stringify({...p,evidenceSha256:undefined}));
summary.papers={total:paperRecords.length,verified:paperRecords.filter(p=>p.outcome==="verified").length,
 failed:paperRecords.filter(p=>p.outcome==="failed").map(p=>({paper:p.subjectId+"/"+p.paperId,
  failing:p.scenarios.filter(s=>!s.passed).map(s=>s.name+": "+s.failures.slice(0,3).join("; "))})),
 blocked:paperRecords.filter(p=>p.outcome==="blocked").length};

// Rehearse registration and release against the migrated in-memory registry.
// The database triggers re-validate every record; any rejection is reported.
const rehearsal={criteriaInserted:0,criteriaRejected:[],papersInserted:0,papersRejected:[],released:[],releaseRejected:[]};
await db.exec("set test.jwt_role='service_role'");
for(const r of records.filter(r=>r.outcome==="verified")){
 try{await db.query("select spark_grading_private.register_criterion_verifications_v2($1::jsonb)",[JSON.stringify([r])]);rehearsal.criteriaInserted++;}
 catch(e){rehearsal.criteriaRejected.push(r.paperId+"/"+r.criterionId+": "+e.message);}
}
for(const p of paperRecords.filter(p=>p.outcome==="verified")){
 try{await db.query("select spark_grading_private.register_paper_verification_v2($1::jsonb)",[JSON.stringify(p)]);rehearsal.papersInserted++;}
 catch(e){rehearsal.papersRejected.push(p.paperId+": "+e.message);continue;}
 try{await db.query("select spark_grading_private.release_verified_rubric_v2($1,$2,$3)",[p.subjectId,p.paperId,p.rubricVersion]);rehearsal.released.push(p.subjectId+"/"+p.paperId);}
 catch(e){rehearsal.releaseRejected.push(p.paperId+": "+e.message);}
}
summary.rehearsal={...rehearsal,criteriaRejected:rehearsal.criteriaRejected.slice(0,20),
 criteriaRejectedCount:rehearsal.criteriaRejected.length};

summary.seconds=Math.round((Date.now()-started)/1000);
fs.writeFileSync(out+"/evidence.json",JSON.stringify(records,null,1));
fs.writeFileSync(out+"/papers.json",JSON.stringify(paperRecords,null,1));
fs.writeFileSync(out+"/summary.json",JSON.stringify(summary,null,1));
console.table(summary.bySubject);
console.log(JSON.stringify({byOutcome:summary.byOutcome,failureReasons:summary.failureReasons,blockers:summary.blockers,
 papers:summary.papers,rehearsal:{...summary.rehearsal,released:summary.rehearsal.released.length}},null,1));
