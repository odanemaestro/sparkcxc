import { PGlite } from "@electric-sql/pglite";
import fs from "node:fs";
import assert from "node:assert/strict";
const db = new PGlite();
await db.exec(`create schema spark_grading_private;
create table public.spark_subjects(id text primary key,name text,short_name text,qualification text,mark text,description text,enabled boolean,status text,sort_order int,implementation text,study_view text,capabilities jsonb,routes jsonb,stats jsonb,learning_config jsonb,manifest_version int,updated_at timestamptz default now());
create table public.spark_subject_sections(subject_id text references public.spark_subjects(id),section_id text,title text,description text,sort_order int,enabled boolean,metadata jsonb,updated_at timestamptz default now(),primary key(subject_id,section_id));
create table public.spark_subject_topics(subject_id text references public.spark_subjects(id),topic_id text,section_id text,title text,description text,sort_order int,enabled boolean,metadata jsonb,updated_at timestamptz default now(),primary key(subject_id,topic_id));
create table spark_grading_private.rubrics_v2(subject_id text,rubric_version text,paper_id text,criteria jsonb,active boolean,verification_status text,expected_total_marks int,primary key(subject_id,rubric_version,paper_id));
insert into public.spark_subjects(id,name,enabled,status) values('principles-of-business','Existing Business',true,'live');`);
const sql = fs.readFileSync(
  "supabase/migrations/20261021090000_principles_of_accounts_course_draft.sql",
  "utf8",
);
await db.exec(sql);
await db.exec(sql);
const counts = await db.query(
  `select (select count(*)::int from public.spark_subject_sections) sections,(select count(*)::int from public.spark_subject_topics) topics,(select count(*)::int from spark_grading_private.rubrics_v2) rubrics`,
);
assert.deepEqual(counts.rows[0], { sections: 11, topics: 33, rubrics: 2 });
const rubric = (
  await db.query(`select * from spark_grading_private.rubrics_v2 where paper_id='POA-ORIGINAL-02-01'`)
).rows[0];
assert.equal(rubric.criteria.length, 100);
assert.equal(
  rubric.criteria.reduce((n, c) => n + c.maxMarks, 0),
  100,
);
assert.equal(rubric.active, false);
assert.equal(rubric.verification_status, "draft");
const specimen = (await db.query(`select * from spark_grading_private.rubrics_v2 where paper_id='poa-specimen-2-2017'`)).rows[0];
assert.equal(specimen.criteria.length, 22);
assert.equal(specimen.criteria.reduce((n, c) => n + c.maxMarks, 0), 100);
assert.equal(specimen.active, false);
assert.equal(specimen.verification_status, "draft");
assert.equal(specimen.criteria.filter((c) => c.sourceMarking.part.finalScoreUnresolved).reduce((n, c) => n + c.maxMarks, 0), 7);
const accounts = (
  await db.query(
    `select enabled,status,stats from public.spark_subjects where id='principles-of-accounts'`,
  )
).rows[0];
assert.equal(accounts.enabled, false);
assert.equal(accounts.status, "draft");
assert.equal(accounts.stats.objectives, 106);
assert.equal(
  (
    await db.query(
      `select name from public.spark_subjects where id='principles-of-business'`,
    )
  ).rows[0].name,
  "Existing Business",
);
await db.exec(
  `update public.spark_subjects set enabled=true,status='live' where id='principles-of-accounts'`,
);
await db.exec(sql);
assert.equal(
  (
    await db.query(
      `select enabled from public.spark_subjects where id='principles-of-accounts'`,
    )
  ).rows[0].enabled,
  true,
);
await db.exec(`create role anon;create role authenticated;create role service_role;
create table public.profiles(id uuid primary key,name text);
create table public.spark_student_subject_enrollments(student_id uuid,subject_id text,status text);
create table public.poa_test_notifications(kind text,message text);
create table public.spark_subject_activity_events(id serial primary key,user_id uuid,subject_id text,completed boolean,score numeric,max_score numeric,percent numeric,metadata jsonb,activity_key text,activity_type text,section_id text,topic_id text,title text);
create function public.spark_create_notification(uuid,text,text,text,text,text,uuid,uuid,uuid,jsonb,text) returns void language sql as $$insert into public.poa_test_notifications values('student',$4)$$;
create function public.spark_notify_linked_parents(uuid,text,text,text,text,text,uuid,jsonb,text) returns void language sql as $$insert into public.poa_test_notifications values('parent',$4)$$;
insert into public.profiles values('11111111-1111-4111-8111-111111111111','Student');
insert into public.spark_student_subject_enrollments values('11111111-1111-4111-8111-111111111111','principles-of-accounts','active');`);
await db.exec(
  fs.readFileSync(
    "supabase/migrations/20261021091000_poa_progress_notifications.sql",
    "utf8",
  ),
);
await db.exec(
  `insert into public.spark_subject_activity_events(user_id,subject_id,completed,score,max_score,metadata,activity_key,activity_type,title) values('11111111-1111-4111-8111-111111111111','principles-of-accounts',true,null,100,'{"paper":"02"}','exam:poa-paper2:fixture','exam','Accounts Paper 02')`,
);
assert.equal(
  (
    await db.query(
      "select count(*)::int total from public.poa_test_notifications",
    )
  ).rows[0].total,
  2,
);
assert.match(
  (
    await db.query(
      "select message from public.poa_test_notifications where kind='student'",
    )
  ).rows[0].message,
  /final score is not yet available/,
);
await db.exec(
  `update public.spark_student_subject_enrollments set status='inactive';insert into public.spark_subject_activity_events(user_id,subject_id,completed,metadata,activity_key,activity_type) values('11111111-1111-4111-8111-111111111111','principles-of-accounts',true,'{}','lesson:fixture','lesson')`,
);
assert.equal(
  (
    await db.query(
      "select count(*)::int total from public.poa_test_notifications",
    )
  ).rows[0].total,
  2,
);
await db.exec(
  `update public.spark_student_subject_enrollments set status='active';update public.spark_subjects set enabled=false,status='draft' where id='principles-of-accounts';insert into public.spark_subject_activity_events(user_id,subject_id,completed,metadata,activity_key,activity_type) values('11111111-1111-4111-8111-111111111111','principles-of-accounts',true,'{}','lesson:draft','lesson')`,
);
assert.equal(
  (
    await db.query(
      "select count(*)::int total from public.poa_test_notifications",
    )
  ).rows[0].total,
  2,
);
assert.equal(
  (
    await db.query(
      "select has_function_privilege('anon','public.spark_poa_subject_activity_notifications()','execute') allowed",
    )
  ).rows[0].allowed,
  false,
);
assert.equal(
  (
    await db.query(
      "select has_function_privilege('authenticated','public.spark_poa_subject_activity_notifications()','execute') allowed",
    )
  ).rows[0].allowed,
  false,
);
await db.close();
console.log(
  "Accounts SQL tests pass: idempotent course seed, preserved publication choices, inactive V2 rubric, enrolled/published notification guards, pending-score messaging and revoked direct function access.",
);
