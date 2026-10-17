import {PGlite} from "@electric-sql/pglite";
import assert from "node:assert/strict";
import {randomUUID} from "node:crypto";
import fs from "node:fs";

const db=new PGlite();
await db.exec(`create schema auth;create table auth.users(id uuid primary key);
 create role anon;create role authenticated;create role service_role bypassrls;
 create function auth.uid() returns uuid language sql stable
 as $$select nullif(current_setting('test.user_id',true),'')::uuid$$;
 grant usage on schema auth,public to anon,authenticated,service_role;
 grant execute on function auth.uid() to anon,authenticated,service_role;`);
const read=name=>fs.readFileSync("supabase/migrations/"+name,"utf8");
for(const file of [
 "20261005043000_exam_attempt_integrity.sql",
 "20261005120000_exam_attempt_write_protection.sql",
 "20261005160000_automated_marking_queue.sql"
])await db.exec(read(file));
// Budget columns exist in deployed SPARK. The minimal in-memory schema used
// by test-marking-database.mjs predates those operational budget extensions.
await db.exec(`alter table public.spark_marking_config
 add column daily_global_limit integer not null default 20,
 add column daily_token_budget bigint not null default 1000000,
 add column per_job_token_reservation integer not null default 50000;
 alter table public.spark_marking_jobs add column reserved_tokens integer not null default 50000;`);
for(const file of [
 "20261016072000_pob_paper2_semantic_queue.sql",
 "20261016072500_pob_unscored_paper2_submission.sql",
 "20261017190000_pob_original_p2_controlled_queue.sql",
 "20261017201000_pob_jan2026_historical_queue_canary.sql",
 "20261017201500_pob_jan2026_historical_submission_canary.sql",
 "20261017210500_pob_jan2026_owner_pilot_practice.sql",
 "20261017230000_pob_historical_archive_experimental_scoring.sql"
])await db.exec(read(file));
const tester=randomUUID(),other=randomUUID();
await db.query("insert into auth.users(id) values($1),($2)",[tester,other]);
const root=()=>db.exec("reset role");
async function asUser(id){await root();await db.query("select set_config('test.user_id',$1,false)",[id]);await db.exec("set role authenticated");}
const sourceSha="0183bfa029cf71f60882ad8ad99295725006f00b429dc52ac57cb3e40e3d2581";
const metadata={paper_id:"POB-P2-2026-JAN",source_sha256:sourceSha};
const start=async(meta=metadata,bank="pob-historical-2026-jan-p2-v1")=>{
 const {rows}=await db.query(`select * from public.spark_start_exam_attempt(
  'principles-of-business','02','timed',7200,$1,
  'pob-historical-2026-jan-p2-rubric-v1','online-v1',$2::jsonb)`,
  [bank,JSON.stringify(meta)]);
 return rows[0].attempt_id;
};
const submit=(id,additional={})=>db.query(`select * from public.spark_submit_exam_attempt(
 $1,$2::jsonb,'source-bounded',null,100,$3::jsonb)`,[id,
 JSON.stringify({"POB-P2-2026-JAN:Q2:a.i":"Asset pledged as security for a loan."}),
 JSON.stringify(additional)]);
const enqueue=id=>db.query("select (public.spark_enqueue_marking($1)).*",[id]);
await root();
await db.exec("update public.spark_marking_config set enabled=true");
await asUser(tester);
const denied=await start();
await assert.rejects(submit(denied),/Historical POB submission not enabled/);
await root();
let flags=(await db.query(`select pob_historical_jan26_calibrated,
 pob_historical_jan26_canary_enabled,pob_historical_jan26_public_enabled,
 pob_historical_jan26_tester_id from public.spark_marking_config`)).rows[0];
assert.equal(flags.pob_historical_jan26_calibrated,false);
assert.equal(flags.pob_historical_jan26_canary_enabled,false);
assert.equal(flags.pob_historical_jan26_public_enabled,false);
assert.equal(flags.pob_historical_jan26_tester_id,null);
await assert.rejects(db.exec("update public.spark_marking_config set pob_historical_jan26_public_enabled=true"),/spark_pob_jan26_public_requires_calibrated/);
await db.query("update public.spark_marking_config set pob_historical_jan26_canary_enabled=true,pob_historical_jan26_tester_id=$1",[tester]);
await asUser(other);
const forbidden=await start();
await assert.rejects(submit(forbidden),/Historical POB submission not enabled/);
await asUser(tester);
const tampered=await start({...metadata,source_sha256:"fake"});
await assert.rejects(submit(tampered),/Historical POB submission not enabled/);
const attempt=await start();
await submit(attempt,{paper_id:"hijacked",source_sha256:"forged",score:100});
const saved=(await db.query("select status,score,max_score,metadata from public.spark_exam_attempts where id=$1",[attempt])).rows[0];
assert.equal(saved.score,null);
assert.equal(Number(saved.max_score),100);
assert.equal(saved.metadata.paper_id,"POB-P2-2026-JAN");
assert.equal(saved.metadata.source_sha256,sourceSha);
assert.equal(saved.status,"submitted");
const job=(await enqueue(attempt)).rows[0];
assert.equal(job.user_id,tester);
assert.equal((await enqueue(attempt)).rows[0].id,job.id);
await assert.rejects(db.query("select * from public.spark_claim_marking(1)"),/permission denied/);
await root();await db.exec("set role service_role");
const claimed=(await db.query("select * from public.spark_claim_marking(1)")).rows[0];
assert.equal(claimed.id,job.id);
assert.equal((await db.query("select public.spark_finish_marking($1,$2,$3::jsonb) as accepted",[
 job.id,claimed.claim_token,JSON.stringify({score:null,uncertain:true,authority:"automated-practice-estimate"})
])).rows[0].accepted,true);
await root();
const stored=(await db.query("select status,result from public.spark_marking_jobs where id=$1",[job.id])).rows[0];
assert.equal(stored.status,"completed");
assert.equal(stored.result.score,null);
// The historical canary must never opt the SPARK original paper into marking.
await asUser(tester);
const original=(await db.query(`select * from public.spark_start_exam_attempt(
 'principles-of-business','02','timed',7200,
 'pob-original-paper2-01','pob-original-rubric','online-v1',
 '{"paper_id":"pob-original-paper2-01"}'::jsonb)`)).rows[0].attempt_id;
await submit(original);
await assert.rejects(enqueue(original),/POB internal marking not enabled/);
// Archive pilots must stay closed by default, require exact canonical paper
// identity, and preserve original bank and existing queue quota protections.
const archiveId="POB-P2-2025-JAN";
const archiveSha="3bf50ed41965c7f84efa8b321d235c38a5425b45216ed528ca7d6a1bf6f571cf";
const archiveMeta={paper_id:archiveId,source_sha256:archiveSha,
 selected_questions:[1,2,3,4,5]};
async function startArchive(meta=archiveMeta){
 const {rows}=await db.query(`select * from public.spark_start_exam_attempt(
 'principles-of-business','02','timed',7200,
 'pob-archive-v1-pob-p2-2025-jan','pob-historical-archive-rubric-v1',
 'online-v1',$1::jsonb)`,[JSON.stringify(meta)]);
 return rows[0].attempt_id;
}
const candidate=await startArchive();
await assert.rejects(submit(candidate),/Historical archive POB submission not enabled/);
await root();
const state=(await db.query("select pob_historical_archive_pilot_enabled from public.spark_marking_config")).rows[0];
assert.equal(state.pob_historical_archive_pilot_enabled,false);
await db.exec("update public.spark_marking_config set pob_historical_archive_pilot_enabled=true");
await asUser(tester);
const invalid=await startArchive({...archiveMeta,source_sha256:"bad"});
await assert.rejects(submit(invalid),/Historical archive POB submission not enabled/);
const live=await startArchive();
await submit(live,{paper_id:"forged",selected_questions:[5,4,3,2,1],source_sha256:"wrong"});
const data=(await db.query("select score,metadata from public.spark_exam_attempts where id=$1",[live])).rows[0];
assert.equal(data.score,null);
assert.equal(data.metadata.paper_id,archiveId);
assert.equal(data.metadata.source_sha256,archiveSha);
assert.deepEqual(data.metadata.selected_questions,[1,2,3,4,5]);
const archiveJob=(await enqueue(live)).rows[0];
assert.equal(archiveJob.user_id,tester);
assert.equal((await enqueue(live)).rows[0].id,archiveJob.id);
await root();
console.log(JSON.stringify({offlinePostgres:true,sourceChecked:true,canaryDefaultsClosed:true,
 testerOnly:true,metadataImmutable:true,queueIdempotent:true,originalBankUnaffected:true,
 archivePilotDefaultClosed:true,archiveIdentityProtected:true,productionModified:false,providerExecuted:false,releaseApproved:false},null,2));
await db.close();
