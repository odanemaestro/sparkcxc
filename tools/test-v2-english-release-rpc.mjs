import fs from "node:fs";
import assert from "node:assert/strict";
import {PGlite} from "@electric-sql/pglite";

const db=new PGlite();
try{
 await db.exec(`
  create role anon;
  create role authenticated;
  create schema auth;
  create schema spark_grading_private;
  create function auth.uid() returns uuid language sql stable as
   $$select nullif(current_setting('test.user_id',true),'')::uuid$$;
  create table spark_grading_private.rubrics_v2 (
   subject_id text,paper_id text,rubric_version text,
   active boolean,verification_status text,source_sha256 text,
   criteria jsonb,expected_total_marks integer,
   primary key(subject_id,paper_id,rubric_version)
  );
  create table spark_grading_private.release_evidence_fixture (
   subject_id text,paper_id text,rubric_version text,
   paper_verified boolean,source_hash_matches boolean,
   verified_criteria integer,criteria integer,
   primary key(subject_id,paper_id,rubric_version)
  );
  create view spark_grading_private.rubric_release_status_v2 as
   select subject_id,paper_id,rubric_version,
     paper_verified,source_hash_matches,verified_criteria,criteria
   from spark_grading_private.release_evidence_fixture;
 `);
 await db.exec(fs.readFileSync(
  "supabase/migrations/20261025045800_v2_english_paper_verified_client_routing.sql","utf8"));
 const source="1".repeat(64);
 const cases=[
  ["english-a","EA-P2-A-C1",true,true,6,6],
  ["english-a","EA-P2-A-C2",true,true,6,6],
  ["english-a","EA-P2-B-C1",false,true,6,6],
  ["english-a","EA-P2-B-C2",false,true,6,6],
  ["principles-of-business","pob-original-paper2-01",true,true,25,25]
 ];
 for(const [subject,paper,verified,digest,approved,count] of cases){
  const expected=subject==="english-a"?120:100;
  const criteria=JSON.stringify(Array.from({length:count},(_,i)=>({
   id:"part-"+i,maxMarks:expected/count
  })));
  await db.query(`insert into spark_grading_private.rubrics_v2
    (subject_id,paper_id,rubric_version,active,verification_status,source_sha256,criteria,expected_total_marks)
    values($1,$2,'source-scheme-draft-v2',true,'verified',$3,$4::jsonb,$5)`,
   [subject,paper,source,criteria,expected]);
  await db.query(`insert into spark_grading_private.release_evidence_fixture
    (subject_id,paper_id,rubric_version,paper_verified,source_hash_matches,verified_criteria,criteria)
    values($1,$2,'source-scheme-draft-v2',$3,$4,$5,$6)`,
   [subject,paper,verified,digest,approved,count]);
 }
 const released=async(subject,paper)=>{
  const q=await db.query("select public.spark_v2_paper_released($1,$2) as permitted",[subject,paper]);
  return q.rows[0].permitted;
 };
 assert.equal(await released("english-a","EA-P2-A"),false,"anonymous cannot query availability");
 await db.exec("set test.user_id='00000000-0000-0000-0000-000000000001'");
 assert.equal(await released("english-a","EA-P2-A"),true,"base set with two verified choices");
 assert.equal(await released("english-a","EA-P2-A-C1"),true,"exact verified creative choice");
 assert.equal(await released("english-a","EA-P2-B"),false,"criteria alone are insufficient");
 assert.equal(await released("principles-of-business","pob-original-paper2-01"),true);
 assert.equal(await released("english-a","EA-P2-A-C9"),false);
 assert.equal(await released("english-a","EA-P2-A-C1-extra"),false);
 assert.equal(await released("english-a","EA-P2-X"),false);
 assert.equal(await released("english-a","pob-original-paper2-01"),false);
 await db.exec(`update spark_grading_private.release_evidence_fixture
  set source_hash_matches=false where paper_id='EA-P2-A-C1'`);
 assert.equal(await released("english-a","EA-P2-A-C1"),false,"source hash cannot drift");
 await db.exec(`update spark_grading_private.release_evidence_fixture
  set source_hash_matches=true,verified_criteria=5 where paper_id='EA-P2-A-C1'`);
 assert.equal(await released("english-a","EA-P2-A-C1"),false,"unapproved part cannot release");
 await db.exec(`update spark_grading_private.release_evidence_fixture
  set verified_criteria=6 where paper_id='EA-P2-A-C1'`);
 await db.exec(`update spark_grading_private.rubrics_v2
  set active=false where paper_id='EA-P2-A-C1'`);
 assert.equal(await released("english-a","EA-P2-A-C1"),false,"inactive variant must be denied");
 assert.equal(await released("english-a","EA-P2-A"),true,
  "other fully verified variant still makes base group available");
 console.log("English A source-gated V2 client-release RPC passed all tests");
}finally{await db.close();}
