import {PGlite} from "@electric-sql/pglite";
import {randomUUID} from "node:crypto";
import fs from "node:fs";
import assert from "node:assert/strict";
import {performance} from "node:perf_hooks";

// In-memory PostgreSQL only. No project URL, access token or live connection.
const db=new PGlite();
await db.exec(`create schema auth; create table auth.users(id uuid primary key);
  create role anon; create role authenticated; create role service_role bypassrls;
  create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('test.user_id',true),'')::uuid$$;
  grant usage on schema auth,public to anon,authenticated,service_role;
  grant execute on function auth.uid() to anon,authenticated,service_role;`);
for(const file of ["20261005043000_exam_attempt_integrity.sql","20261005120000_exam_attempt_write_protection.sql","20261005160000_automated_marking_queue.sql"])
  await db.exec(fs.readFileSync(`supabase/migrations/${file}`,"utf8"));
const owner=randomUUID(),other=randomUUID();
await db.query("insert into auth.users(id) values($1),($2)",[owner,other]);
async function asUser(id){await db.exec("reset role");await db.query("select set_config('test.user_id',$1,false)",[id]);await db.exec("set role authenticated");}
async function admin(){await db.exec("reset role");}
async function worker(){await db.exec("reset role; set role service_role");}
const start=()=>db.query("select * from public.spark_start_exam_attempt('integrated-science','02','timed',9000,'integrated-science-v1.2.0')");
const submit=id=>db.query("select * from public.spark_submit_exam_attempt($1,'{}','fnv1a32:test',0,105)",[id]);
await asUser(owner);
const attempt=(await start()).rows[0].attempt_id;
await assert.rejects(db.query("update public.spark_exam_attempts set deadline_at=now()+interval '1 day' where id=$1",[attempt]),/permission denied/);
await assert.rejects(db.query("select * from public.spark_start_exam_attempt('integrated-science','02','timed',21000)"),/Duration/);
await assert.rejects(db.query("select * from public.spark_submit_exam_attempt($1,'{}','h',999,105)",[attempt]),/Invalid practice score/);
await submit(attempt);
const first=(await db.query("select response_snapshot,submitted_at from public.spark_exam_attempts where id=$1",[attempt])).rows[0];
await db.query("select * from public.spark_submit_exam_attempt($1,'{\"changed\":true}','different',100,105)",[attempt]);
assert.deepEqual((await db.query("select response_snapshot,submitted_at from public.spark_exam_attempts where id=$1",[attempt])).rows[0],first);
await assert.rejects(db.query("select public.spark_enqueue_marking($1)",[attempt]),/not enabled/);
await admin();await db.exec("update public.spark_marking_config set enabled=true");
await asUser(other);
assert.equal((await db.query("select * from public.spark_exam_attempts where id=$1",[attempt])).rows.length,0);
await assert.rejects(db.query("select public.spark_enqueue_marking($1)",[attempt]),/Submitted attempt required/);
await asUser(owner);
const enqueue=()=>db.query("select (public.spark_enqueue_marking($1)).*",[attempt]);
const job=(await enqueue()).rows[0];
assert.equal((await enqueue()).rows[0].id,job.id);
await assert.rejects(db.query("select * from public.spark_claim_marking(1)"),/permission denied/);
await assert.rejects(db.query("update public.spark_marking_jobs set status='completed'"),/permission denied/);
await worker();
let claim=(await db.query("select * from public.spark_claim_marking(1)")).rows[0];
assert.equal(claim.id,job.id);
const oldToken=claim.claim_token;
await admin();await db.query("update public.spark_marking_jobs set lease_expires_at=now()-interval '1 second' where id=$1",[job.id]);
await worker();claim=(await db.query("select * from public.spark_claim_marking(1)")).rows[0];
assert.notEqual(claim.claim_token,oldToken);
const finish=(token,result={score:0,maxMarks:105})=>db.query("select public.spark_finish_marking($1,$2,$3::jsonb) as accepted",[job.id,token,JSON.stringify(result)]);
assert.equal((await finish(oldToken)).rows[0].accepted,false);
assert.equal((await finish(claim.claim_token)).rows[0].accepted,true);
assert.equal((await finish(claim.claim_token,{score:100})).rows[0].accepted,false);
await asUser(other);assert.equal((await db.query("select * from public.spark_marking_jobs")).rows.length,0);
await admin();await db.exec("update public.spark_marking_config set daily_user_limit=1000");

// A reproducible local burst exercises the actual RPCs. PGlite serializes its
// connection, so this is NOT a production throughput/capacity certification.
await asUser(owner);
const samples=[];const ids=[];
for(let i=0;i<100;i++){
  const t=performance.now(),id=(await start()).rows[0].attempt_id;
  await db.query("select * from public.spark_exam_attempt_clock($1)",[id]);
  await submit(id);
  await db.query("select public.spark_enqueue_marking($1)",[id]);
  samples.push(performance.now()-t);ids.push(id);
}
await worker();
const batches=await Promise.all(Array.from({length:12},()=>db.query("select * from public.spark_claim_marking(4)")));
const leased=batches.flatMap(b=>b.rows);
assert.equal(leased.length,4);assert.equal(new Set(leased.map(j=>j.id)).size,4);
// Failed work has backoff, and the last retry becomes terminal.
const retry=leased[0];
await db.query("select public.spark_finish_marking($1,$2,null,'provider_rate_limit')",[retry.id,retry.claim_token]);
const retryRow=(await db.query("select * from public.spark_marking_jobs where id=$1",[retry.id])).rows[0];
assert.equal(retryRow.status,"queued");assert.ok(new Date(retryRow.available_at)>new Date(retryRow.created_at));
await admin();await db.query("update public.spark_marking_jobs set status='processing',tries=3,lease_expires_at=now()-interval '1 second' where id=$1",[retry.id]);
await worker();await db.query("select * from public.spark_claim_marking(1)");
assert.equal((await db.query("select status from public.spark_marking_jobs where id=$1",[retry.id])).rows[0].status,"failed");
samples.sort((a,b)=>a-b);
console.log(JSON.stringify({database:"in-memory PostgreSQL (PGlite)",checks:"ownership, write denial, payload validation, fixed duration, idempotency, leases, retries, capacity passed",burstAttempts:100,p50Milliseconds:samples[49],p95Milliseconds:samples[94],maxConcurrentClaims:4},null,2));
await db.close();
