import assert from "node:assert/strict";
import {randomUUID} from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {pathToFileURL} from "node:url";
import {openRegistry} from "./v2-registry.mjs";
const MIGRATIONS="supabase/migrations/",SUBJECT="office-administration";
const file=suffix=>{
 const name=fs.readdirSync(MIGRATIONS).find(n=>n.endsWith(suffix));assert(name,"Missing OA migration "+suffix);
 return fs.readFileSync(MIGRATIONS+name,"utf8");
};
/** Disposable in-memory Postgres using actual canonical progress/notification
 * functions. No credentials, network, Supabase project or production writes. */
export async function installOfficeProgressTestSchema(db){
 await db.exec([
  "create table public.profiles(id uuid primary key references auth.users(id),name text,role text);",
  "create table public.parent_student_links(id uuid primary key default gen_random_uuid(),parent_id uuid references public.profiles(id),student_id uuid references public.profiles(id),status text);",
  "create table public.tutors(id uuid primary key,user_id uuid);create table public.bookings(id uuid primary key);",
  "create table public.spark_subjects(id text primary key,enabled boolean,status text);",
  "create table public.spark_student_subject_enrollments(student_id uuid,subject_id text,status text);",
  "grant select on public.profiles,public.parent_student_links to authenticated;",
  "insert into public.spark_subjects values('office-administration',false,'draft'),('principles-of-business',true,'live');"
 ].join("\n"));
 const progress=fs.readFileSync(MIGRATIONS+"20260910_spark_multisubject_progress_v1.sql","utf8");
 const end=progress.indexOf("-- Make SPARK Points reflect learning across subjects.");assert(end>0);
 await db.exec(progress.slice(0,end)+"\ncommit;");
 const notify=fs.readFileSync(MIGRATIONS+"20260902_notification_centre.sql","utf8");
 const nend=notify.indexOf("create or replace function public.spark_booking_notifications()");assert(nend>0);
 await db.exec(notify.slice(0,nend));
 for(const suffix of["_office_administration_progress_notifications.sql","_marking_v2_office_administration_release_integration.sql","_marking_v2_office_administration_historical_score_guard.sql"]){
  await db.exec(file(suffix));await db.exec(file(suffix));
 }
}
export function officeVerifiedScripts(dir){
 const records=JSON.parse(fs.readFileSync(path.join(dir,"evidence.json"),"utf8")).filter(r=>r.subjectId===SUBJECT);
 const papers=JSON.parse(fs.readFileSync(path.join(dir,"papers.json"),"utf8")).filter(p=>p.subjectId===SUBJECT);
 assert.equal(records.length,54);assert.equal(papers.length,3);
 return papers.map(paper=>{
  assert.equal(paper.outcome,"verified");
  const criteria=records.filter(c=>c.paperId===paper.paperId&&c.rubricVersion===paper.rubricVersion);
  assert.equal(criteria.length,paper.criteria);assert(criteria.every(c=>c.outcome==="verified"));
  assert.equal(criteria.reduce((sum,c)=>sum+c.maxMarks,0),90);
  const response=(c,cls)=>{const f=c.cases.find(f=>f.cls===cls&&f.passed&&f.resolved);assert(f);return f.response;};
  const full=Object.fromEntries(criteria.map(c=>[c.criterionId,response(c,"full")]));
  const zero=Object.fromEntries(criteria.map(c=>[c.criterionId,response(c,"incorrect")]));
  const uncertain=criteria.find(c=>c.cases.some(f=>f.cls==="competing"&&f.passed&&!f.resolved));assert(uncertain);
  const unresolved={...full,[uncertain.criterionId]:uncertain.cases.find(f=>f.cls==="competing"&&f.passed&&!f.resolved).response};
  return {paper,criteria,full,zero,unresolved};
 });
}
export async function runOfficeReleaseIntegration(dir=".audit-output/oa-v2-release"){
 const scripts=officeVerifiedScripts(dir);
 const {evaluateExistingSubjectPaper2V2}=await import("../supabase/functions/_shared/server-marker-v2.mjs");
 const {BUNDLE_SHA256}=await import("../supabase/functions/_shared/server-marker-v2-checksum.mjs");
 assert(scripts.every(s=>s.paper.provenance.bundleSha256===BUNDLE_SHA256),"Re-run OA evidence against current worker bundle");
 const db=await openRegistry(),checks=[],passed=name=>checks.push(name);
 const one=async(sql,params)=>(await db.query(sql,params)).rows[0];
 const service=()=>db.exec("reset role;set test.jwt_role='service_role';set test.user_id=''");
 const user=async id=>{
  await db.exec("reset role;set test.jwt_role='authenticated'");
  await db.query("select set_config('test.user_id',$1,false)",[id]);await db.exec("set role authenticated");
 };
 const ids=Object.fromEntries(["student","other","parent","pendingParent","stranger"].map(n=>[n,randomUUID()]));
 const progress=(key,type="exam",meta={},score=90,max=90)=>db.query(
  "select public.spark_record_subject_progress($1,$2,$3,null,null,'Office Administration Paper 01',true,$4,$5,100,$6::jsonb,false)",
  [SUBJECT,key,type,score,max,JSON.stringify(meta)]);
 const start=async(paperId,answers,owner=ids.student)=>{
  await user(owner);
  const a=await one("select * from public.spark_start_exam_attempt($1,'02','timed',7200,'oa-source','untrusted','estimate',$2::jsonb)",[SUBJECT,JSON.stringify({paper_id:paperId})]);
  await db.query("select * from public.spark_submit_exam_attempt($1,$2::jsonb,'fixture',90,90,$3::jsonb)",
   [a.attempt_id,JSON.stringify(answers),JSON.stringify({score_authority:"server-v2-deterministic",scorePublicationAllowed:true})]);
  const row=await one("select score,max_score,metadata from public.spark_exam_attempts where id=$1",[a.attempt_id]);
  assert.equal(row.score,null);assert.equal(Number(row.max_score),90);
  assert.equal(row.metadata.score_authority,"pending-server-marking");assert.equal(row.metadata.scorePublicationAllowed,false);
  return a.attempt_id;
 };
 const claim=async()=>{
  await service();const job=(await one("select public.spark_v2_claim_next_shadow_job() j")).j;assert(job);
  return {job,exam:evaluateExistingSubjectPaper2V2({subjectId:job.subjectId,paperId:job.paperId,criteria:job.criteria,responses:job.responses})};
 };
 const finish=(job,rows,bundle=BUNDLE_SHA256)=>one("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4) r",
  [job.jobId,job.leaseToken,JSON.stringify(rows),bundle]);
 try{
  await installOfficeProgressTestSchema(db);await service();
  for(const[name,id]of Object.entries(ids)){
   await db.query("insert into auth.users values($1)",[id]);
   await db.query("insert into public.profiles values($1,$2,$3)",[id,name,/parent/i.test(name)?"parent":"student"]);
  }
  await db.query("insert into public.parent_student_links(parent_id,student_id,status) values($1,$2,'approved'),($3,$2,'pending')",[ids.parent,ids.student,ids.pendingParent]);
  for(const id of[ids.student,ids.other])await db.query("insert into public.spark_student_subject_enrollments values($1,$2,'active')",[id,SUBJECT]);
  await user(ids.student);
  await assert.rejects(db.query("select * from public.spark_start_exam_attempt($1,'02','timed',7200)",[SUBJECT]),/active enrollment in a live course/);
  await assert.rejects(progress("draft","lesson",{},null,null),/active enrollment in a live course/);
  await service();
  assert.equal((await one("select count(*)::int n from public.spark_exam_attempts where subject_id=$1",[SUBJECT])).n,0);
  assert.equal((await one("select count(*)::int n from public.notifications")).n,0);
  await db.query("update public.spark_subjects set enabled=true,status='live' where id=$1",[SUBJECT]);
  for(const id of[ids.stranger,ids.parent]){
   await user(id);
   await assert.rejects(db.query("select * from public.spark_start_exam_attempt($1,'02','timed',7200)",[SUBJECT]),/active enrollment/);
   await assert.rejects(progress("unenrolled","lesson",{},null,null),/active enrollment|Only Student/);
  }
  passed("draft courses, unenrolled students and parent accounts cannot start OA attempts or progress");

  await user(ids.student);
  for(const[paper,duration]of[["01",7200],["01",1],["02",4500],["02",10800]])
   await assert.rejects(db.query("select * from public.spark_start_exam_attempt($1,$2,'timed',$3)",[SUBJECT,paper,duration]),/Office Administration timed paper/);
  for(const[paper,duration]of[["01",4500],["02",7200]]){
   const a=await one("select * from public.spark_start_exam_attempt($1,$2,'timed',$3)",[SUBJECT,paper,duration]);
   assert.equal((new Date(a.deadline_at)-new Date(a.started_at))/1000,duration);
  }
  await db.query("select * from public.spark_start_exam_attempt($1,'02','practice',731)",[SUBJECT]);
  await db.query("select * from public.spark_start_exam_attempt('information-technology','02','timed',731)");
  for(const type of["lesson","lab"]){
   await progress(type+":oa",type,{},null,null);await progress(type+":oa",type,{},null,null);
  }
  await service();
  const learning=(await db.query("select recipient_user_id,metadata from public.notifications")).rows;
  assert.equal(learning.length,3);
  assert.equal(learning.filter(n=>n.recipient_user_id===ids.student).length,1);
  assert.equal(learning.filter(n=>n.recipient_user_id===ids.parent).length,2);
  assert(learning.every(n=>n.metadata.subject_id===SUBJECT));
  passed("OA timed attempts use 75/120 minutes; lessons notify the approved parent and labs notify student and parent once");

  await user(ids.student);
  const p1=await one("select * from public.spark_start_exam_attempt($1,'01','timed',4500)",[SUBJECT]);
  await db.query("select * from public.spark_submit_exam_attempt($1,'{\"1\":{\"answer\":\"A\"}}','source',null,60)",[p1.attempt_id]);
  assert.equal((await one("select score from public.spark_exam_attempts where id=$1",[p1.attempt_id])).score,null);
  await progress("p1-estimate","exam",{paper:"01",server_attempt_id:p1.attempt_id},41,60);
  const p1estimate=await one("select score,metadata from public.spark_subject_progress where activity_key='p1-estimate'");
  assert.equal(Number(p1estimate.score),41);assert.equal(p1estimate.metadata.score_authority,"client-practice-estimate");
  const control=await one("select * from public.spark_start_exam_attempt('information-technology','01','practice',731)");
  await assert.rejects(db.query("select * from public.spark_submit_exam_attempt($1,'{}','source',null,60)",[control.attempt_id]),/Invalid practice score/);
  for(const paperId of ["OA-P2-2025-MJ","OA-P2-2005-MJ","OA-P2-SPECIMEN-2024"]){
   await progress("historical-spoof:"+paperId,"lesson",{paper:"01",paper_id:paperId},90,90);
   const row=await one("select score,percent,activity_type,metadata from public.spark_subject_progress where activity_key=$1",["historical-spoof:"+paperId]);
   assert.equal(row.score,null);assert.equal(row.percent,null);assert.equal(row.activity_type,"exam");
   assert.equal(row.metadata.paper,"02");assert.equal(row.metadata.score_authority,"pending-server-marking");
  }
  passed("OA source Paper 1 accepts unscored responses; other subjects retain null-score rejection");

  await service();
  const drafts=(await db.query("select active,verification_status from spark_grading_private.rubrics_v2 where subject_id=$1",[SUBJECT])).rows;
  assert.equal(drafts.length,3);assert(drafts.every(r=>!r.active&&r.verification_status==="draft"));
  await assert.rejects(db.query("select spark_grading_private.release_verified_rubric_v2($1,$2,$3)",[SUBJECT,scripts[0].paper.paperId,scripts[0].paper.rubricVersion]),/Missing evidence/);
  for(const field of["sourceFormat","sourceVersion","sourcePaperId","sourceQuestion"]){
   await assert.rejects(db.query("update spark_grading_private.rubrics_v2 set criteria=criteria #- $3::text[],source_sha256=encode(sha256(convert_to((criteria #- $3::text[])::text,'UTF8')),'hex'),verification_status='verified',active=true,verified_by='identity-negative-test',verified_at=clock_timestamp() where subject_id=$1 and paper_id=$2",
    [SUBJECT,scripts[0].paper.paperId,["0",field]]),/Rubric criterion identity or marks mismatch/);
  }
  const unreleased=await start(scripts[0].paper.paperId,scripts[0].full);await service();
  assert.equal((await one("select count(*)::int n from spark_grading_private.marking_jobs_v2 where attempt_id=$1",[unreleased])).n,0);
  for(const script of scripts){
   await db.query("select spark_grading_private.register_criterion_verifications_v2($1::jsonb)",[JSON.stringify(script.criteria)]);
   await db.query("select spark_grading_private.register_paper_verification_v2($1::jsonb)",[JSON.stringify(script.paper)]);
   await db.query("select spark_grading_private.release_verified_rubric_v2($1,$2,$3)",[SUBJECT,script.paper.paperId,script.paper.rubricVersion]);
  }
  for(const role of["anon","authenticated"])for(const fn of[
   "spark_grading_private.oa_student_can_learn_v2(uuid)","spark_grading_private.oa_client_attempt_guard_v2()",
   "spark_grading_private.oa_client_progress_guard_v2()","spark_grading_private.publish_oa_verified_progress_v2()"]){
   assert.equal((await one("select has_function_privilege($1,$2,'execute') allowed",[role,fn])).allowed,false);
  }
  passed("3 OA drafts activate only after all 54 real criteria and 3 paper records pass canonical identity and evidence checks");

  const attempt=await start(scripts[0].paper.paperId,scripts[0].full),key="exam:oa-v2:"+attempt;
  await assert.rejects(db.query("update public.spark_exam_attempts set score=90 where id=$1",[attempt]),/permission denied/);
  await assert.rejects(db.query("insert into public.spark_subject_progress(user_id,subject_id,activity_key,activity_type) values($1,$2,'direct-spoof','exam')",[ids.student,SUBJECT]),/permission denied/);
  await assert.rejects(db.query("insert into public.spark_subject_activity_events(user_id,subject_id,activity_key,activity_type) values($1,$2,'direct-spoof','exam')",[ids.student,SUBJECT]),/permission denied/);
  await assert.rejects(db.query("select * from spark_grading_private.oa_published_results_v2"),/permission denied/);
  const spoof={paper:"01",paper_type:"paper1",server_attempt_id:attempt,score_authority:"server-v2-deterministic",scorePublicationAllowed:true,finalScore:90};
  await progress(key,"topic_quiz",spoof);
  await progress("legacy-owned-p2","lesson",spoof);await progress("source-p2","lesson",{paper:"01",paper_id:scripts[0].paper.paperId});
  await db.query("select public.spark_sync_subject_progress($1,$2::jsonb)",[SUBJECT,JSON.stringify([{
   activity_key:key,activity_type:"lesson",completed:true,score:90,max_score:90,percent:100,best_percent:100,metadata:{paper:"01"},
  }])]);
  for(const activityKey of[key,"legacy-owned-p2","source-p2"]){
   const p=await one("select activity_type,title,score,percent,best_percent,metadata from public.spark_subject_progress where activity_key=$1",[activityKey]);
   assert.equal(p.activity_type,"exam");assert.equal(p.title,"Office Administration Paper 02");
   for(const field of["score","percent","best_percent"])assert.equal(p[field],null);
   assert.equal(p.metadata.paper,"02");assert.equal(p.metadata.score_authority,"pending-server-marking");
   assert.equal(p.metadata.finalScore,undefined);assert.equal(p.metadata.scorePublicationAllowed,false);
  }
  await user(ids.other);
  assert.equal((await one("select public.spark_v2_exam_result($1) r",[attempt])).r,null);
  assert.equal((await db.query("select * from public.spark_subject_progress where user_id=$1",[ids.student])).rows.length,0);
  assert.equal((await db.query("select * from public.spark_subject_activity_events where user_id=$1",[ids.student])).rows.length,0);
  assert.equal((await db.query("select * from public.spark_exam_attempts where id=$1",[attempt])).rows.length,0);
  await assert.rejects(db.query("select * from public.spark_submit_exam_attempt($1,'{}','forged',90,90)",[attempt]),/Attempt not found/);
  await assert.rejects(progress(key,"exam",{paper:"01",server_attempt_id:attempt}),/does not belong/);
  await assert.rejects(progress("foreign-reference","lesson",{paper:"01",server_attempt_id:attempt}),/does not belong/);
  await assert.rejects(db.query("select public.spark_v2_complete_subject_job($1,$2,'[]',$3)",[randomUUID(),randomUUID(),BUNDLE_SHA256]),/permission denied/);
  await service();
  const notices=(await db.query("select type,message,metadata from public.notifications where metadata->>'activity_key'=any($1::text[])",[[key,"legacy-owned-p2","source-p2"]])).rows;
  assert.equal(notices.length,6);
  for(const n of notices){
   assert(["paper2_completed","child_paper2_completed"].includes(n.type));assert(!/scored|100[.]?0?%/.test(n.message));
   assert.equal(n.metadata.score,null);assert.equal(n.metadata.percent,null);
  }
  passed("spoofed Paper 1, quiz and lesson labels cannot publish P2 marks; foreign references and private results are blocked");

  const {job,exam}=await claim();assert.equal(job.attemptId,attempt);assert.equal(exam.confirmedMarks,90);
  await assert.rejects(finish(job,exam.rows.map((r,i)=>i?r:{...r,method:"existing-IT-specific-rules"})),/Office Administration examiner provenance mismatch/);
  await assert.rejects(finish(job,exam.rows,"0".repeat(64)),/Office Administration examiner provenance mismatch/);
  await assert.rejects(finish(job,exam.rows.map((r,i)=>i?r:{...r,suggestedMarks:r.maxMarks+1})),/exceeds source scheme/);
  assert.equal((await one("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4) r",
   [job.jobId,randomUUID(),JSON.stringify(exam.rows),BUNDLE_SHA256])).r.status,"stale-lease");
  await db.query("update public.spark_student_subject_enrollments set status='inactive' where student_id=$1",[ids.student]);
  await assert.rejects(finish(job,exam.rows),/active enrollment in a live course/);
  assert.equal((await one("select score from public.spark_exam_attempts where id=$1",[attempt])).score,null);
  await db.query("update public.spark_student_subject_enrollments set status='active' where student_id=$1",[ids.student]);
  await db.query("update public.spark_subjects set status='draft' where id=$1",[SUBJECT]);
  await assert.rejects(finish(job,exam.rows),/active enrollment in a live course/);
  await db.query("update public.spark_subjects set status='live' where id=$1",[SUBJECT]);
  assert.equal((await finish(job,exam.rows)).r.status,"verified");assert.equal((await finish(job,exam.rows)).r.status,"stale-lease");
  passed("wrong method/bundle, inflated marks, stale lease, removed enrollment and reverted draft course cannot publish");

  const final=await one("select score,max_score,percent,metadata from public.spark_subject_progress where activity_key=$1",[key]);
  assert.equal(Number(final.score),90);assert.equal(Number(final.max_score),90);assert.equal(Number(final.percent),100);
  assert.equal(final.metadata.score_authority,"server-v2-deterministic");assert.equal(final.metadata.server_attempt_id,attempt);
  assert.equal((await one("select count(*)::int n from spark_grading_private.oa_published_results_v2 where attempt_id=$1",[attempt])).n,1);
  const finals=(await db.query("select recipient_user_id,message,metadata from public.notifications where metadata->>'v2_result_phase'='verified'")).rows;
  assert.equal(finals.length,2);assert.deepEqual(new Set(finals.map(n=>n.recipient_user_id)),new Set([ids.student,ids.parent]));
  assert(finals.every(n=>/100[.]0%/.test(n.message)&&Number(n.metadata.score)===90));
  await db.query("update public.spark_exam_attempts set metadata=metadata||'{\"retry\":true}' where id=$1",[attempt]);
  await assert.rejects(db.query("update public.spark_exam_attempts set score=89 where id=$1",[attempt]),/source and score reconciliation/);
  await user(ids.student);
  const own=(await one("select public.spark_v2_exam_result($1) r",[attempt])).r;
  assert.equal(own.status,"verified");assert.equal(own.score,90);assert.equal(own.maxMarks,90);assert.equal(own.unresolvedMarks,0);
  await progress(key,"exam",{paper:"02",server_attempt_id:attempt},0);
  await progress("late-legacy-p2","exam",{paper:"01",server_attempt_id:attempt},90);
  await db.query("select public.spark_sync_subject_progress($1,$2::jsonb)",[SUBJECT,JSON.stringify([{
   activity_key:key,activity_type:"exam",completed:true,score:0,max_score:90,percent:0,best_percent:0,metadata:{paper:"02"},
  }])]);
  assert.equal(Number((await one("select score from public.spark_subject_progress where activity_key=$1",[key])).score),90);
  await service();
  assert.equal((await one("select count(*)::int n from public.notifications where metadata->>'v2_result_phase'='verified'")).n,2);
  assert.equal((await one("select count(*)::int n from public.spark_subject_activity_events where activity_key=$1 and metadata->>'score_authority'='server-v2-deterministic'",[key])).n,1);
  assert.equal((await one("select count(*)::int n from public.notifications where metadata->>'activity_key'='late-legacy-p2'")).n,0);
  passed("one canonical score and final student/parent notices survive retry, tampering and late offline sync");

  for(const script of scripts.slice(1)){
   const id=await start(script.paper.paperId,script.zero);const {job,exam}=await claim();assert.equal(job.attemptId,id);
   assert.equal(exam.confirmedMarks,0);assert.equal((await finish(job,exam.rows)).r.status,"verified");
   const p=await one("select score,max_score,percent from public.spark_subject_progress where activity_key=$1",["exam:oa-v2:"+id]);
   assert.equal(Number(p.score),0);assert.equal(Number(p.max_score),90);assert.equal(Number(p.percent),0);
  }
  for(const script of scripts){
   const id=await start(script.paper.paperId,script.unresolved);const {job,exam}=await claim();assert.equal(job.attemptId,id);
   const r=(await finish(job,exam.rows)).r;assert.equal(r.status,"provisional");assert.equal(r.score,null);
   assert.equal((await one("select score from public.spark_exam_attempts where id=$1",[id])).score,null);
   assert.equal((await one("select count(*)::int n from spark_grading_private.oa_published_results_v2 where attempt_id=$1",[id])).n,0);
   assert.equal((await one("select count(*)::int n from public.spark_subject_progress where activity_key=$1",["exam:oa-v2:"+id])).n,0);
   await user(ids.student);
   const ownUncertain=(await one("select public.spark_v2_exam_result($1) r",[id])).r;
   assert.equal(ownUncertain.status,"provisional");assert.equal(ownUncertain.score,null);assert(ownUncertain.unresolvedMarks>0);
   await service();
   assert.equal((await one("select count(*)::int n from public.notifications where metadata->>'server_attempt_id'=$1",[id])).n,0);
  }
  await user(ids.parent);assert.equal(Number((await one("select score from public.spark_subject_progress where activity_key=$1",[key])).score),90);
  assert.equal((await db.query("select * from public.notifications where recipient_user_id=$1",[ids.student])).rows.length,0);
  await user(ids.pendingParent);
  assert.equal((await db.query("select * from public.spark_subject_progress where user_id=$1",[ids.student])).rows.length,0);
  assert.equal((await db.query("select * from public.spark_subject_activity_events where user_id=$1",[ids.student])).rows.length,0);
  assert.equal((await db.query("select * from public.spark_exam_attempts where id=$1",[attempt])).rows.length,0);
  assert.equal((await db.query("select * from public.notifications")).rows.length,0);
  await db.exec("reset role;set test.jwt_role='anon';set test.user_id='';set role anon");
  await assert.rejects(db.query("select * from public.spark_start_exam_attempt($1,'02','timed',7200)",[SUBJECT]),/permission denied/);
  await assert.rejects(progress("anon-spoof","lesson",{},null,null),/permission denied/);
  await assert.rejects(db.query("select public.spark_v2_exam_result($1)",[attempt]),/permission denied/);
  passed("all source papers reconcile; zero is final, uncertain responses remain unpublished, and pending parents and anonymous users see no result");
  const report={passed:true,kind:"isolated-postgres-office-administration-parity",checks,criteria:54,papers:3};
  console.log(JSON.stringify(report,null,2));return report;
 }finally{await db.close();}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{await runOfficeReleaseIntegration(process.argv[2]||undefined);}
 catch(error){console.error(error.message);if(error.where)console.error(error.where);console.error(error.stack);process.exitCode=1;}
}
