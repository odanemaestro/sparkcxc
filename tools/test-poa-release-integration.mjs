import assert from "node:assert/strict";
import {randomUUID} from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {pathToFileURL} from "node:url";
import {openRegistry} from "./v2-registry.mjs";
import {verifiedScripts} from "./test-poa-staging.mjs";

const MIGRATIONS="supabase/migrations/";
const SUBJECT="principles-of-accounts",PAPER="POA-ORIGINAL-02-01";
const integrationFile=()=>fs.readdirSync(MIGRATIONS).find(name=>name.endsWith("_marking_v2_poa_release_integration.sql"));

/** Real committed progress and notification SQL; unrelated booking/reward
 * models are tiny dependency tables, not replacement notification functions.
 * No project URL, API token, network or live database is used by this module.
 */
export async function installAccountsProgressTestSchema(db){
  await db.exec(`create table public.profiles(id uuid primary key references auth.users(id),name text,role text);
    create table public.parent_student_links(id uuid primary key default gen_random_uuid(),parent_id uuid references public.profiles(id),student_id uuid references public.profiles(id),status text);
    create table public.tutors(id uuid primary key,user_id uuid);
    create table public.bookings(id uuid primary key);
    create table public.spark_subjects(id text primary key,enabled boolean,status text);
    create table public.spark_student_subject_enrollments(student_id uuid,subject_id text,status text);
    grant select on public.profiles,public.parent_student_links to authenticated;
    insert into public.spark_subjects values('principles-of-accounts',true,'live'),('principles-of-business',true,'live');`);
  const progress=fs.readFileSync(MIGRATIONS+"20260910_spark_multisubject_progress_v1.sql","utf8");
  const progressEnd=progress.indexOf("-- Make SPARK Points reflect learning across subjects.");
  assert(progressEnd>0,"Canonical progress SQL boundary required");
  await db.exec(progress.slice(0,progressEnd)+"\ncommit;");
  const notifications=fs.readFileSync(MIGRATIONS+"20260902_notification_centre.sql","utf8");
  const notificationsEnd=notifications.indexOf("create or replace function public.spark_booking_notifications()");
  assert(notificationsEnd>0,"Canonical notification SQL boundary required");
  await db.exec(notifications.slice(0,notificationsEnd));
  await db.exec(fs.readFileSync(MIGRATIONS+"20261021091000_poa_progress_notifications.sql","utf8"));
  const file=integrationFile(); assert(file,"Accounts integration migration required");
  const sql=fs.readFileSync(MIGRATIONS+file,"utf8");
  await db.exec(sql); await db.exec(sql);
}

export async function runAccountsReleaseIntegration(dir="artifacts/poa-v2-verification"){
  const scripts=verifiedScripts(dir,PAPER);
  const evidence=JSON.parse(fs.readFileSync(path.join(dir,"evidence.json"),"utf8"))
    .filter(r=>r.subjectId===SUBJECT&&r.paperId===PAPER&&r.outcome==="verified");
  const {evaluateExistingSubjectPaper2V2}=await import("../supabase/functions/_shared/server-marker-v2.mjs");
  const {BUNDLE_SHA256}=await import("../supabase/functions/_shared/server-marker-v2-checksum.mjs");
  const db=await openRegistry();
  const one=async(sql,params)=>(await db.query(sql,params)).rows[0];
  const service=()=>db.exec("reset role; set test.jwt_role='service_role'; set test.user_id=''");
  const user=async id=>{
    await db.exec("reset role; set test.jwt_role='authenticated'");
    await db.query("select set_config('test.user_id',$1,false)",[id]);
    await db.exec("set role authenticated");
  };
  const checks=[];
  const passed=name=>checks.push(name);
  const ids={student:randomUUID(),other:randomUUID(),parent:randomUUID()};
  try{
    await installAccountsProgressTestSchema(db);
    await service();
    for(const [name,id]of Object.entries(ids)){
      await db.query("insert into auth.users(id) values($1)",[id]);
      await db.query("insert into public.profiles values($1,$2,$3)",[id,name,name==="parent"?"parent":"student"]);
    }
    await db.query("insert into public.parent_student_links(parent_id,student_id,status) values($1,$2,'approved')",[ids.parent,ids.student]);
    await db.query("insert into public.spark_student_subject_enrollments values($1,$2,'active')",[ids.student,SUBJECT]);
    await user(ids.student);
    for(const [paper,duration]of[["01",1],["01",10800],["02",5400],["02",21600]])
      await assert.rejects(db.query("select * from public.spark_start_exam_attempt($1,$2,'timed',$3)",[SUBJECT,paper,duration]),/Accounts timed paper/);
    for(const [paper,duration]of[["01",5400],["02",10800]]){
      const a=await one("select * from public.spark_start_exam_attempt($1,$2,'timed',$3)",[SUBJECT,paper,duration]);
      assert.equal((new Date(a.deadline_at)-new Date(a.started_at))/1000,duration);
    }
    await db.query("select * from public.spark_start_exam_attempt($1,'02','practice',731)",[SUBJECT]);
    await db.query("select * from public.spark_start_exam_attempt('information-technology','02','timed',731)");
    await assert.rejects(db.query("select * from public.spark_start_exam_attempt('english-a','02','timed',731)"),/Duration/);
    passed("server-owned Accounts 90/180-minute exams preserve flexible practice and other-subject rules");

    const original=await one("select * from public.spark_start_exam_attempt('information-technology','01','practice',731)");
    await db.query("select * from public.spark_submit_exam_attempt($1,'{}','fixture',41,60)",[original.attempt_id]);
    assert.equal(Number((await one("select score from public.spark_exam_attempts where id=$1",[original.attempt_id])).score),41);
    await db.query("select public.spark_record_subject_progress('principles-of-business','legacy-exam','exam',null,null,'Existing Business',true,41,100,null,'{}',false)");
    assert.equal(Number((await one("select score from public.spark_subject_progress where activity_key='legacy-exam'")).score),41);
    passed("other-subject client practice scoring remains unchanged");

    // The historical Accounts browser submits source answers without claiming a
    // final score. Exercise the real nullable RPC, not a text/regex assertion.
    const checkPaper1=async(label)=>{
      await user(ids.student);
      const start=()=>one("select * from public.spark_start_exam_attempt($1,'01','timed',5400,'poa-historical-text-v1:POA-P1-2025-JAN','poa-source-review-v1','marking-reconciliation-v2',$2::jsonb)",
        [SUBJECT,JSON.stringify({paper_id:"POA-P1-2025-JAN",source:"poa-historical-text-v1",source_sha256:"fixture-source-sha"})]);
      const source=await start(),answers={"1":{answer:"A"}};
      const metadata={paper:"01",paper_id:"POA-P1-2025-JAN",provisional:true,
        scorePublicationAllowed:false,score_authority:"server-v2-deterministic"};
      await user(ids.other);
      await assert.rejects(db.query("select * from public.spark_submit_exam_attempt($1,$2::jsonb,'source',null,60,$3::jsonb)",
        [source.attempt_id,JSON.stringify(answers),JSON.stringify(metadata)]),/Attempt not found/);
      await user(ids.student);
      await db.query("select * from public.spark_submit_exam_attempt($1,$2::jsonb,'source',null,60,$3::jsonb)",
        [source.attempt_id,JSON.stringify(answers),JSON.stringify(metadata)]);
      const saved=await one("select status,score,max_score,response_snapshot,metadata,v2_paper_id,v2_rubric_version from public.spark_exam_attempts where id=$1",[source.attempt_id]);
      assert.equal(saved.status,"submitted");assert.equal(saved.score,null);assert.equal(Number(saved.max_score),60);
      assert.deepEqual(saved.response_snapshot,answers);
      assert.equal(saved.metadata.score_authority,"client-practice-estimate");
      assert.equal(saved.metadata.provisional,true);assert.equal(saved.metadata.scorePublicationAllowed,false);
      assert.equal(saved.metadata.paper_id,"POA-P1-2025-JAN");
      assert.equal(saved.metadata.source_sha256,"fixture-source-sha");
      assert.equal(saved.v2_paper_id,null);assert.equal(saved.v2_rubric_version,null);
      assert.equal((await one("select public.spark_v2_exam_result($1) r",[source.attempt_id])).r,null,
        "Paper 1 has no Paper 2 examiner result");
      await db.query("select * from public.spark_submit_exam_attempt($1,'{}','retry',60,60)",[source.attempt_id]);
      const retried=await one("select score,response_snapshot from public.spark_exam_attempts where id=$1",[source.attempt_id]);
      assert.equal(retried.score,null);assert.deepEqual(retried.response_snapshot,answers);
      const numeric=await start();
      await db.query("select * from public.spark_submit_exam_attempt($1,'{}','numeric',41,60)",[numeric.attempt_id]);
      assert.equal(Number((await one("select score from public.spark_exam_attempts where id=$1",[numeric.attempt_id])).score),41);
      const otherSubject=await one("select * from public.spark_start_exam_attempt('information-technology','01','practice',731)");
      await assert.rejects(db.query("select * from public.spark_submit_exam_attempt($1,'{}','null',null,60)",[otherSubject.attempt_id]),/Invalid practice score/);
      const invalid=await start();
      for(const max of[null,0,-1,10001])
        await assert.rejects(db.query("select * from public.spark_submit_exam_attempt($1,'{}','null',null,$2)",[invalid.attempt_id,max]),/Invalid practice score/);
      await service();
      assert.equal((await one("select count(*)::int n from spark_grading_private.marking_jobs_v2 where attempt_id in ($1,$2)",[source.attempt_id,numeric.attempt_id])).n,0);
      passed(`${label}: unscored Accounts Paper 1 saves source answers idempotently; numeric practice and other-course null rejection remain unchanged`);
    };
    await checkPaper1("minimal registry submission");

    // The production RPC retains older POB source checks and therefore has a
    // different null-validation expression. Replay that exact committed body
    // with its inert dependency tables, then apply the same migration twice.
    await db.exec(`create table public.spark_marking_config(singleton boolean,
      pob_owner_p2_source_pilot_enabled boolean,pob_historical_archive_pilot_enabled boolean,
      pob_historical_jan26_public_enabled boolean,pob_historical_jan26_calibrated boolean,
      pob_historical_jan26_owner_pilot_enabled boolean,pob_historical_jan26_canary_enabled boolean,
      pob_historical_jan26_tester_id uuid);
      create table public.spark_pob_historical_archive_banks(enabled boolean,bank_version text,
        paper_id text,source_sha256 text,rubric_version text);`);
    await db.exec(fs.readFileSync(MIGRATIONS+"20261018170500_paper2_final_score_publication_guard.sql","utf8"));
    await db.exec(fs.readFileSync(MIGRATIONS+"20261019194500_marking_v2_allow_ungraded_submission.sql","utf8"));
    const integrationSql=fs.readFileSync(MIGRATIONS+integrationFile(),"utf8");
    await db.exec(integrationSql);await db.exec(integrationSql);
    await checkPaper1("full production submission");

    for(const role of["anon","authenticated"]){
      await service();
      assert.equal((await one("select has_function_privilege($1,'spark_grading_private.publish_poa_verified_progress_v2()','execute') allowed",[role])).allowed,false);
      assert.equal((await one("select has_function_privilege($1,'spark_grading_private.poa_client_progress_guard_v2()','execute') allowed",[role])).allowed,false);
    }
    await one("select spark_grading_private.register_criterion_verifications_v2($1::jsonb)",[JSON.stringify(evidence)]);
    await one("select spark_grading_private.register_paper_verification_v2($1::jsonb)",[JSON.stringify(scripts.paper)]);
    await one("select spark_grading_private.release_verified_rubric_v2($1,$2,$3)",[SUBJECT,PAPER,scripts.paper.rubricVersion]);
    const specimen=await one("select active,verification_status from spark_grading_private.rubrics_v2 where subject_id=$1 and paper_id='poa-specimen-2-2017'",[SUBJECT]);
    assert.equal(specimen.active,false); assert.equal(specimen.verification_status,"draft");
    passed("genuine evidence releases only original Accounts; private trigger entrypoints and specimen stay protected");

    const scenario=scripts.scenarios.find(s=>s.name==="full");
    const start=async(responses)=>{
      await user(ids.student);
      const a=await one("select * from public.spark_start_exam_attempt($1,'02','timed',10800,'stage-fixture','untrusted-client-version','fixture',$2::jsonb)",[SUBJECT,JSON.stringify({paper_id:PAPER})]);
      await db.query("select * from public.spark_submit_exam_attempt($1,$2::jsonb,'fixture',100,100,$3::jsonb)",
        [a.attempt_id,JSON.stringify(responses),JSON.stringify({score_authority:"server-v2-deterministic"})]);
      assert.equal((await one("select score from public.spark_exam_attempts where id=$1",[a.attempt_id])).score,null);
      return a.attempt_id;
    };
    const attempt=await start(scenario.responses),key=`exam:poa-v2:${attempt}`;
    const recordPending=()=>db.query("select public.spark_record_subject_progress($1,$2,'exam',null,null,'Accounts Paper 02',true,100,100,100,$3::jsonb,false)",
      [SUBJECT,key,JSON.stringify({paper:"02",score_authority:"server-v2-deterministic",scorePublicationAllowed:true,finalScore:100,server_attempt_id:attempt})]);
    await recordPending();
    const pending=await one("select score,percent,best_percent,metadata from public.spark_subject_progress where activity_key=$1",[key]);
    assert.equal(pending.score,null);assert.equal(pending.percent,null);assert.equal(pending.best_percent,null);
    assert.equal(pending.metadata.score_authority,"pending-server-marking");assert.equal(pending.metadata.finalScore,undefined);
    const pendingNotice=await one("select message,metadata from public.notifications where recipient_user_id=$1 and type='paper2_completed'",[ids.student]);
    assert.match(pendingNotice.message,/final score is not yet available/);assert.equal(pendingNotice.metadata.score,null);
    await user(ids.other);
    assert.equal((await one("select public.spark_v2_exam_result($1) r",[attempt])).r,null);
    assert.equal((await db.query("select * from public.spark_subject_progress where user_id=$1",[ids.student])).rows.length,0);
    await assert.rejects(db.query("select public.spark_v2_complete_subject_job($1,$2,'[]',$3)",[randomUUID(),randomUUID(),BUNDLE_SHA256]),/permission denied/);
    passed("forged browser final scores stay null in attempts/progress/notifications and ownership blocks foreign reads");

    await service();
    const job=(await one("select public.spark_v2_claim_next_shadow_job() j")).j;
    const exam=evaluateExistingSubjectPaper2V2({subjectId:job.subjectId,paperId:job.paperId,criteria:job.criteria,responses:job.responses});
    assert.equal(exam.confirmedMarks,100);
    const complete=rows=>one("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4) r",[job.jobId,job.leaseToken,JSON.stringify(rows),BUNDLE_SHA256]);
    await assert.rejects(complete(exam.rows.map((r,i)=>i? r:{...r,method:"existing-IT-specific-rules"})),/Accounts examiner provenance mismatch/);
    await assert.rejects(complete(exam.rows.map((r,i)=>i? r:{...r,suggestedMarks:2})),/exceeds source scheme/);
    assert.equal((await one("select score from public.spark_exam_attempts where id=$1",[attempt])).score,null);
    assert.equal((await one("select count(*)::int n from spark_grading_private.poa_published_results_v2")).n,0);
    const stale=(await one("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4) r",[job.jobId,randomUUID(),JSON.stringify(exam.rows),BUNDLE_SHA256])).r;
    assert.equal(stale.status,"stale-lease");
    assert.equal((await complete(exam.rows)).r.status,"verified");
    assert.equal((await complete(exam.rows)).r.status,"stale-lease");
    passed("wrong examiner methods, inflated marks and stale leases cannot publish; trusted full script publishes atomically");

    const final=await one("select score,max_score,percent,attempt_count,metadata from public.spark_subject_progress where activity_key=$1",[key]);
    assert.equal(Number(final.score),100);assert.equal(Number(final.percent),100);
    assert.equal(final.metadata.score_authority,"server-v2-deterministic");
    assert.equal(final.metadata.server_attempt_id,attempt);
    assert.equal((await one("select count(*)::int n from spark_grading_private.poa_published_results_v2 where attempt_id=$1",[attempt])).n,1);
    const finalEvents=await one("select count(*)::int n from public.spark_subject_activity_events where activity_key=$1 and metadata->>'score_authority'='server-v2-deterministic'",[key]);
    assert.equal(finalEvents.n,1);
    const finalNotices=await db.query("select recipient_user_id,message,metadata from public.notifications where metadata->>'v2_result_phase'='verified'");
    assert.equal(finalNotices.rows.length,2);
    assert.deepEqual(new Set(finalNotices.rows.map(n=>n.recipient_user_id)),new Set([ids.student,ids.parent]));
    for(const notice of finalNotices.rows){assert.match(notice.message,/100[.]0%/);assert.equal(Number(notice.metadata.score),100);}
    await db.query("update public.spark_exam_attempts set metadata=metadata||'{\"repeat\":true}' where id=$1",[attempt]);
    assert.equal((await one("select count(*)::int n from public.notifications where metadata->>'v2_result_phase'='verified'")).n,2);
    await assert.rejects(db.query("update public.spark_exam_attempts set score=99 where id=$1",[attempt]),/source and score reconciliation/);
    passed("verified canonical progress and exactly one student/parent final notification survive worker retries and reject drift");

    await user(ids.student);
    await recordPending();
    await db.query("select public.spark_sync_subject_progress($1,$2::jsonb)",[SUBJECT,JSON.stringify([{activity_key:key,activity_type:"exam",completed:true,score:0,max_score:100,percent:0,best_percent:0,metadata:{paper:"02",score_authority:"client-practice-estimate"}}])]);
    const afterLate=await one("select score,metadata from public.spark_subject_progress where activity_key=$1",[key]);
    assert.equal(Number(afterLate.score),100);assert.equal(afterLate.metadata.score_authority,"server-v2-deterministic");
    await service();
    assert.equal((await one("select count(*)::int n from public.spark_subject_activity_events where activity_key=$1",[key])).n,2);
    assert.equal((await one("select count(*)::int n from public.notifications where type in ('paper2_completed','child_paper2_completed')")).n,4);
    passed("late browser progress and silent offline sync cannot erase a verified grade or emit a later pending notification");

    const uncertain=scripts.scenarios.find(s=>s.name==="unresolved");
    const uncertainAttempt=await start(uncertain.responses);
    await service();
    const uncertainJob=(await one("select public.spark_v2_claim_next_shadow_job() j")).j;
    const uncertainExam=evaluateExistingSubjectPaper2V2({subjectId:uncertainJob.subjectId,paperId:uncertainJob.paperId,criteria:uncertainJob.criteria,responses:uncertainJob.responses});
    const provisional=(await one("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4) r",[uncertainJob.jobId,uncertainJob.leaseToken,JSON.stringify(uncertainExam.rows),BUNDLE_SHA256])).r;
    assert.equal(provisional.status,"provisional");assert.equal(provisional.score,null);
    assert.equal((await one("select score from public.spark_exam_attempts where id=$1",[uncertainAttempt])).score,null);
    assert.equal((await one("select count(*)::int n from spark_grading_private.poa_published_results_v2 where attempt_id=$1",[uncertainAttempt])).n,0);
    await user(ids.parent);
    assert.equal(Number((await one("select score from public.spark_subject_progress where activity_key=$1",[key])).score),100);
    assert.equal((await db.query("select * from public.notifications where recipient_user_id=$1",[ids.student])).rows.length,0);
    passed("unresolved scripts remain unscored; linked parent sees canonical result and only their own notifications");
    const report={passed:true,kind:"isolated-postgres-rehearsal",checks,criteria:evidence.length};
    console.log(JSON.stringify(report,null,2));return report;
  }finally{await db.close();}
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  try{await runAccountsReleaseIntegration(process.argv[2]||undefined);}
  catch(error){console.error(error.message);if(error.where)console.error(error.where);process.exitCode=1;}
}
