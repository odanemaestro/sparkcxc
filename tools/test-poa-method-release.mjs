import assert from "node:assert/strict";
import {randomUUID} from "node:crypto";
import fs from "node:fs";
import {openRegistry} from "./v2-registry.mjs";
import {installAccountsProgressTestSchema} from "./test-poa-release-integration.mjs";
import {verifiedScriptsFromRecords} from "./test-poa-staging.mjs";
import {evaluateExistingSubjectPaper2V2} from "../supabase/functions/_shared/server-marker-v2.mjs";
import {BUNDLE_SHA256} from "../supabase/functions/_shared/server-marker-v2-checksum.mjs";

const dir=process.argv[2]||".audit-output/poa-method-verification";
const records=JSON.parse(fs.readFileSync(dir+"/evidence.json","utf8"));
const papers=JSON.parse(fs.readFileSync(dir+"/papers.json","utf8"));
const methods=papers.filter(p=>p.rubricVersion==="poa-source-methods-v1");
assert.equal(methods.length,94);assert(methods.every(p=>p.outcome==="verified"));
const db=await openRegistry();
const one=async(sql,params)=>(await db.query(sql,params)).rows[0];
const service=()=>db.exec("reset role;set test.jwt_role='service_role'");
const student=randomUUID(),parent=randomUUID();
let scriptsChecked=0;
try{
 await installAccountsProgressTestSchema(db);
 await service();
 const migration=fs.readdirSync("supabase/migrations").find(n=>n.endsWith("_marking_v2_poa_source_methods.sql"));
 await db.exec(fs.readFileSync("supabase/migrations/"+migration,"utf8"));
 await db.exec(fs.readFileSync("supabase/migrations/"+migration,"utf8"));
 for(const r of records.filter(r=>r.outcome==="verified"))await db.query("select spark_grading_private.register_criterion_verifications_v2($1::jsonb)",[JSON.stringify([r])]);
 for(const p of papers.filter(p=>p.outcome==="verified")){
  await db.query("select spark_grading_private.register_paper_verification_v2($1::jsonb)",[JSON.stringify(p)]);
  await db.query("select spark_grading_private.release_verified_rubric_v2($1,$2,$3)",[p.subjectId,p.paperId,p.rubricVersion]);
 }
 for(const [id,role]of [[student,"student"],[parent,"parent"]]){
  await db.query("insert into auth.users(id)values($1)",[id]);
  await db.query("insert into public.profiles values($1,$2,$3)",[id,role,role]);
 }
 await db.query("insert into public.parent_student_links(parent_id,student_id,status)values($1,$2,'approved')",[parent,student]);
 await db.query("insert into public.spark_student_subject_enrollments values($1,'principles-of-accounts','active')",[student]);
 const user=async()=>{await db.exec("reset role;set test.jwt_role='authenticated'");await db.query("select set_config('test.user_id',$1,false)",[student]);await db.exec("set role authenticated");};
 const start=async(p,responses,override={})=>{
  const c=records.find(r=>r.paperId===p.paperId).verifiedSourceAnswer;
  void c;
  const sourceId=p.paperId.split("--q-")[0],selected=p.paperId.split("--q-")[1].split("-").map(Number);
  await service();
  const rubric=await one("select criteria from spark_grading_private.rubrics_v2 where paper_id=$1 and rubric_version=$2",[p.paperId,p.rubricVersion]);
  const metadata={paper:"02",paper_id:sourceId,source:"poa-historical-text-v1",source_sha256:rubric.criteria[0].sourceMarking.sourceSha256,selected_questions:selected,...override};
  await user();
  const a=await one("select * from public.spark_start_exam_attempt('principles-of-accounts','02','practice',731,$1,'browser-draft','marking-reconciliation-v2',$2::jsonb)",["poa-historical-text-v1:"+sourceId,JSON.stringify({...metadata,selected_questions:[]})]);
  await db.query("select * from public.spark_submit_exam_attempt($1,$2::jsonb,'fixture',100,100,$3::jsonb)",[a.attempt_id,JSON.stringify(responses),JSON.stringify(metadata)]);
  return a.attempt_id;
 };
 for(const p of methods){
  const scripts=verifiedScriptsFromRecords(records,papers,p.paperId);
  for(const scenario of scripts.scenarios){
   const id=await start(p,scenario.responses);
   await service();
   const saved=await one("select score,v2_paper_id from public.spark_exam_attempts where id=$1",[id]);
   assert.equal(saved.score,null);assert.equal(saved.v2_paper_id,p.paperId);
   const job=(await one("select public.spark_v2_claim_next_shadow_job() j")).j;
   assert.equal(job.attemptId,id);assert.equal(job.paperId,p.paperId);
   const out=evaluateExistingSubjectPaper2V2({subjectId:job.subjectId,paperId:job.paperId,criteria:job.criteria,responses:job.responses});
   const done=(await one("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4) r",[job.jobId,job.leaseToken,JSON.stringify(out.rows),BUNDLE_SHA256])).r;
   assert.equal(done.status,scenario.status);assert.equal(done.score,scenario.score);
   const progress=await one("select score,metadata from public.spark_subject_progress where activity_key=$1",["exam:poa-v2:"+id]);
   if(scenario.score===null)assert.equal(progress,undefined);
   else{assert.equal(Number(progress.score),scenario.score);assert.equal(progress.metadata.score_authority,"server-v2-deterministic");}
   const notices=await one("select count(*)::int n from public.notifications where metadata->>'server_attempt_id'=$1 and metadata->>'v2_result_phase'='verified'",[id]);
   assert.equal(notices.n,scenario.score===null?0:2);
   scriptsChecked++;
  }
 }
 const p=methods[0],full=verifiedScriptsFromRecords(records,papers,p.paperId).scenarios[0].responses;
 for(const override of [{selected_questions:[1,2,3,4,4]},{selected_questions:[1,2,4,5,6]},{selected_questions:[1,2,3,4,5,6]},{selected_questions:["1",2,3,4,5]},{source_sha256:"0".repeat(64)}]){
  const id=await start(p,full,override);await service();
  assert.equal((await one("select v2_paper_id from public.spark_exam_attempts where id=$1",[id])).v2_paper_id,null);
 }
 const unselected=await start(p,{...full,7:{working:"I do not know"}});await service();
 assert.equal((await one("select v2_paper_id from public.spark_exam_attempts where id=$1",[unselected])).v2_paper_id,null);
 await db.exec("set role authenticated");
 await assert.rejects(db.query("select * from spark_grading_private.poa_method_sources_v2"),/permission denied/);
 console.log(JSON.stringify({passed:true,variants:methods.length,scriptsChecked,invalidSelectionsRejected:6,sourceCatalogPrivate:true,checks:["real enqueue and source identity","full 100 and zero 0 publication","uncertain scores withheld","canonical progress and paired deduplicated notifications","source SHA and question-choice rejection","idempotent migration and private grants"]},null,2));
}finally{await db.close();}
