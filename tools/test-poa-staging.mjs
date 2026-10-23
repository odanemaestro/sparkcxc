import assert from "node:assert/strict";
import {createHash, randomUUID} from "node:crypto";
import process from "node:process";
import fs from "node:fs";
import path from "node:path";
import {pathToFileURL} from "node:url";
import {createClient} from "@supabase/supabase-js";
import {isOpaqueServiceKey,legacyServiceClaims} from "./poa-stage-worker-auth.mjs";
import {createPoaStageFetch} from "./poa-stage-fetch.mjs";

/**
 * Live, disposable Supabase rehearsal. This is not the PGlite SQL test.
 *
 * POA_STAGING_URL=https://<disposable-ref>.supabase.co
 * POA_STAGING_PROJECT_REF=<disposable-ref>
 * POA_STAGING_ANON_KEY=<publishable or legacy anon key>
 * POA_STAGING_SERVICE_ROLE_KEY=<server-only secret key or legacy service-role JWT>
 * POA_STAGING_ALLOW_WRITES=disposable-accounts-stage
 * node tools/test-poa-staging.mjs [--evidence <verified-dir>] [--paper <paper-id>]
 *   [--out .audit-output/poa-live-staging.json]
 *
 * Requires an isolated, schema-only staging branch with the app migrations,
 * Accounts course seed/notification trigger, and mark-paper2-v2-shadow deployed
 * with verify_jwt=true for legacy JWT authentication, or the fixed-stage
 * API-key adapter for new secret keys. It refuses production and genuine accounts.
 * It creates confirmed .invalid users without email, restores course visibility,
 * signs out sessions, and deletes only the fixture accounts it created.
 *
 * With no evidence: asserts draft Paper 2 remains unscored and ineligible.
 * With evidence: requires a genuinely verified paper already released in stage;
 * tests full, zero and unresolved scripts through the deployed worker. It never
 * registers, approves or manufactures grading evidence.
 */
export const PRODUCTION_REF = "ymnfexzyjtvjkufcefmf";
const SUBJECT = "principles-of-accounts";
const arg = (name, argv=process.argv) => {
  const index=argv.indexOf(name);
  return index < 0 ? null : argv[index+1];
};

export function stagingConfig(env=process.env) {
  assert.equal(env.POA_STAGING_ALLOW_WRITES, "disposable-accounts-stage",
    "Set POA_STAGING_ALLOW_WRITES only for an isolated, disposable staging project");
  const url=new URL(env.POA_STAGING_URL || "https://missing.invalid");
  assert.equal(url.protocol, "https:", "Hosted staging requires HTTPS");
  const match=/^([a-z0-9]{20})\.supabase\.co$/.exec(url.hostname);
  assert(match, "POA_STAGING_URL must identify the exact hosted staging project");
  assert.equal(url.pathname, "/", "Use the staging project origin, without a path");
  assert(!url.username && !url.password && !url.search && !url.hash,
    "Staging URL must not contain credentials or query parameters");
  const ref=match[1];
  assert.notEqual(ref, PRODUCTION_REF, "Production SPARK is forbidden in this rehearsal");
  assert.equal(ref, env.POA_STAGING_PROJECT_REF, "Explicit staging project ref must match its URL");
  assert(env.POA_STAGING_ANON_KEY, "Missing staging publishable/anon key");
  const serviceKey=env.POA_STAGING_SERVICE_ROLE_KEY;
  assert(serviceKey, "Missing server-only staging service-role key");
  if(!isOpaqueServiceKey(serviceKey)) {
    const claims=legacyServiceClaims(serviceKey);
    assert(claims,"The worker rehearsal requires a server secret key or legacy service-role JWT");
    assert.equal(claims.ref, ref, "Service-role JWT must belong to this staging project");
    assert.equal(claims.role, "service_role", "Staging worker requires a service-role JWT");
    assert(Number.isSafeInteger(claims.exp) && claims.exp > Math.floor(Date.now()/1000),
      "Staging service-role JWT has expired");
  }
  return {url:url.origin, ref, anonKey:env.POA_STAGING_ANON_KEY, serviceKey};
}

export function verifiedScripts(dir, paperId) {
  const records=JSON.parse(fs.readFileSync(path.join(dir,"evidence.json"),"utf8"));
  const papers=JSON.parse(fs.readFileSync(path.join(dir,"papers.json"),"utf8"));
  return verifiedScriptsFromRecords(records,papers,paperId);
}

export function verifiedScriptsFromRecords(records,papers,paperId) {
  const paper=papers.find(p=>p.subjectId===SUBJECT && p.paperId===paperId);
  assert(paper && paper.outcome==="verified", "This Accounts paper has no verified paper evidence");
  const criteria=records.filter(r=>r.subjectId===SUBJECT && r.paperId===paperId && r.rubricVersion===paper.rubricVersion);
  assert.equal(criteria.length, paper.criteria, "Incomplete committed criterion evidence");
  assert(criteria.length && criteria.every(r=>r.outcome==="verified" && r.cases?.length),
    "Every criterion needs verified, committed response fixtures");
  assert.equal(criteria.reduce((sum,c)=>sum+c.maxMarks,0),paper.expectedTotalMarks);
  const fromCase=(criterion, cls) => {
    const item=criterion.cases.find(c=>c.cls===cls && c.passed && c.resolved);
    assert(item, `Missing resolved ${cls} fixture for ${criterion.criterionId}`);
    return item.response;
  };
  const full=Object.fromEntries(criteria.map(c=>[c.criterionId,fromCase(c,"full")]));
  const zero=Object.fromEntries(criteria.map(c=>[c.criterionId,fromCase(c,"incorrect")]));
  const unresolvedCase=c=>c.cases.find(x=>["contradiction","competing","working"].includes(x.cls) && x.passed && !x.resolved);
  const uncertain=criteria.find(unresolvedCase);
  assert(uncertain, "Need a committed unresolved response to verify score withholding");
  const unresolved={...full,[uncertain.criterionId]:unresolvedCase(uncertain).response};
  return {paper, scenarios:[
    {name:"full",responses:full,status:"verified",score:paper.expectedTotalMarks},
    {name:"zero",responses:zero,status:"verified",score:0},
    {name:"unresolved",responses:unresolved,status:"provisional",score:null},
  ]};
}

const clientOptions={auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false},global:{fetch:createPoaStageFetch()}};
const value=async (operation,label) => {
  const {data,error}=await operation;
  if(error) throw new Error(`${label}: ${error.code || error.status || "error"} ${error.message}`);
  return data;
};
const row=data=>Array.isArray(data)?data[0]:data;
const hash=data=>createHash("sha256").update(JSON.stringify(data)).digest("hex");

export function stagingWorkerHeaders(config,token,{service=false}={}) {
  const headers={apikey:service?config.serviceKey:config.anonKey,"content-type":"application/json"};
  // New secret/publishable API keys are not JWTs and must never be Bearer tokens.
  if(!/^sb_(?:secret|publishable)_/.test(token))headers.authorization=`Bearer ${token}`;
  return headers;
}

export async function runStaging(config, {evidenceDir, verification, paperId="POA-ORIGINAL-02-01", out, throwOnFailure=true}={}) {
  // Keep the same guard when called by an orchestrator rather than the CLI.
  config=stagingConfig({POA_STAGING_URL:config.url,POA_STAGING_PROJECT_REF:config.ref,
    POA_STAGING_ANON_KEY:config.anonKey,POA_STAGING_SERVICE_ROLE_KEY:config.serviceKey,
    POA_STAGING_ALLOW_WRITES:"disposable-accounts-stage"});
  const fixture=verification ? verifiedScriptsFromRecords(verification.records,verification.papers,paperId)
    : evidenceDir ? verifiedScripts(evidenceDir,paperId) : null;
  const runId=randomUUID();
  const service=createClient(config.url,config.serviceKey,clientOptions);
  const anonymous=createClient(config.url,config.anonKey,clientOptions);
  const created=[];
  const checks=[];
  let initialCourse;
  const report={kind:"live-supabase-http",runId,projectRef:config.ref,subjectId:SUBJECT,
    paperId,startedAt:new Date().toISOString(),checks,passed:false,cleanup:{passed:false}};
  const check=(name,details={})=>checks.push({name,passed:true,...details});
  const rpc=(client,name,params)=>value(client.rpc(name,params),name);
  const select=(client,table,columns,filters={})=>{
    let query=client.from(table).select(columns);
    for(const [key,v] of Object.entries(filters))query=query.eq(key,v);
    return value(query,`read ${table}`);
  };
  const progress=(client,key,type,extra={})=>rpc(client,"spark_record_subject_progress",{
    p_subject_id:SUBJECT,p_activity_key:`stage:${runId}:${key}`,p_activity_type:type,
    p_section_id:"poa-section-1",p_topic_id:"poa-s1-lesson-01",p_title:`Staging Accounts ${key}`,
    p_completed:true,p_score:null,p_max_score:null,p_percent:null,
    p_metadata:{staging_run:runId},p_silent:false,...extra,
  });
  const worker=async (token,{service=false}={})=>{
    const headers=stagingWorkerHeaders(config,token,{service});
    const response=await fetch(`${config.url}/functions/v1/mark-paper2-v2-shadow`,{
      method:"POST",headers,body:"{}",
    });
    let body;
    try {body=await response.json();} catch {body={};}
    return {response,body};
  };
  try {
    // Do not send test notifications into an environment with actual people.
    const accountPage=await value(service.auth.admin.listUsers({page:1,perPage:1000}),"inspect staging auth accounts");
    assert(accountPage.users.length < 1000, "Stage must contain only a small disposable fixture population");
    assert(accountPage.users.every(u=>u.app_metadata?.poa_staging_fixture===true),
      "Stage contains nonfixture accounts; use a schema-only disposable branch");
    initialCourse=row(await select(service,"spark_subjects","id,enabled,status",{id:SUBJECT}));
    assert(initialCourse, "Apply the Accounts draft migration before rehearsing");
    check("isolated staging project and Accounts schema present");

    for(const [name,role] of [["student","student"],["other","student"],["parent","parent"]]) {
      const email=`poa-stage-${name}-${runId}@example.invalid`;
      const password=`Stage!${randomUUID()}`;
      const data=await value(service.auth.admin.createUser({email,password,email_confirm:true,
        app_metadata:{poa_staging_fixture:true,staging_run:runId},
        user_metadata:{name:`Accounts staging ${name}`}}),`create fixture ${name}`);
      const user={id:data.user.id,name,role,client:createClient(config.url,config.anonKey,clientOptions)};
      created.push(user);
      await value(service.from("profiles").upsert({id:user.id,name:`Accounts staging ${name}`,role}),`set fixture ${name} role`);
      const signed=await value(user.client.auth.signInWithPassword({email,password}),`sign in fixture ${name}`);
      user.accessToken=signed.session.access_token;
    }
    const [student,other,parent]=created;
    check("confirmed disposable users authenticate with distinct sessions");
    const denied=await anonymous.rpc("spark_set_subject_enrollment",{p_subject_id:SUBJECT,p_enrolled:true});
    assert(denied.error,"Anonymous caller must not enroll");
    const parentDenied=await parent.client.rpc("spark_set_subject_enrollment",{p_subject_id:SUBJECT,p_enrolled:true});
    assert(parentDenied.error,"Parent must not enroll as student");
    if(!initialCourse.enabled || initialCourse.status!=="live") {
      const draftDenied=await student.client.rpc("spark_set_subject_enrollment",{p_subject_id:SUBJECT,p_enrolled:true});
      assert(draftDenied.error,"Draft course must not accept student enrollment");
    }
    await value(service.from("spark_subjects").update({enabled:true,status:"live"}).eq("id",SUBJECT),"enable Accounts in isolated stage");
    assert((await select(anonymous,"spark_subjects","id",{id:SUBJECT})).length===1);
    assert.equal((await select(student.client,"spark_subject_sections","section_id",{subject_id:SUBJECT})).length,11);
    assert.equal((await select(student.client,"spark_subject_topics","topic_id",{subject_id:SUBJECT})).length,33);
    const structure=await rpc(student.client,"spark_get_subject_learning_structure",{p_subject_id:SUBJECT});
    assert.equal(structure?.sections?.length,11); assert.equal(structure?.topics?.length,33);
    check("published staging catalog and learning RPC expose 11 sections and 33 lessons");
    await rpc(student.client,"spark_set_subject_enrollment",{p_subject_id:SUBJECT,p_enrolled:true});
    assert.equal((await select(student.client,"spark_student_subject_enrollments","status",{student_id:student.id,subject_id:SUBJECT}))[0]?.status,"active");
    assert.equal((await select(other.client,"spark_student_subject_enrollments","student_id",{student_id:student.id})).length,0);
    assert.equal((await select(parent.client,"spark_student_subject_enrollments","student_id",{student_id:student.id})).length,0);
    await value(service.from("parent_student_links").insert({parent_id:parent.id,student_id:student.id,status:"approved",approved_at:new Date().toISOString()}),"create disposable approved family link");
    assert.equal((await select(parent.client,"spark_student_subject_enrollments","status",{student_id:student.id,subject_id:SUBJECT}))[0]?.status,"active");
    check("student enrollment and approved-parent ownership rules");

    const lesson=await progress(student.client,"lesson","lesson");
    assert.equal(row(lesson).completed,true);
    const notificationFilter={recipient_user_id:parent.id,type:"child_lesson_completed"};
    const first=await select(parent.client,"notifications","id,metadata",notificationFilter);
    assert.equal(first.filter(n=>n.metadata?.staging_run===runId).length,1);
    await progress(student.client,"lesson","lesson");
    const repeat=await select(parent.client,"notifications","id,metadata",notificationFilter);
    assert.equal(repeat.filter(n=>n.metadata?.staging_run===runId).length,1,"Repeated lesson completion must not duplicate notifications");
    assert((await select(parent.client,"spark_subject_progress","activity_key",{user_id:student.id,subject_id:SUBJECT})).length>0);
    assert.equal((await select(other.client,"spark_subject_progress","user_id",{user_id:student.id,subject_id:SUBJECT})).length,0);
    assert.equal((await select(other.client,"notifications","id",{recipient_user_id:parent.id})).length,0);
    check("lesson progress persists with one linked-parent notification and no cross-user reads");

    await progress(student.client,"lab","lab");
    await progress(student.client,"quiz","topic_quiz",{p_score:4,p_max_score:5});
    const quiz=(await select(student.client,"spark_subject_progress","score,max_score,percent",{user_id:student.id,subject_id:SUBJECT,activity_key:`stage:${runId}:quiz`}))[0];
    assert.equal(Number(quiz.percent),80);
    await rpc(student.client,"spark_set_subject_enrollment",{p_subject_id:SUBJECT,p_enrolled:false});
    const beforeInactive=(await select(parent.client,"notifications","id",{recipient_user_id:parent.id})).length;
    await progress(student.client,"inactive-lesson","lesson");
    const afterInactive=(await select(parent.client,"notifications","id",{recipient_user_id:parent.id})).length;
    assert.equal(afterInactive,beforeInactive,"Inactive enrollment must not notify parent");
    assert.equal((await select(student.client,"spark_student_subject_enrollments","status",{student_id:student.id,subject_id:SUBJECT}))[0].status,"inactive");
    await rpc(student.client,"spark_set_subject_enrollment",{p_subject_id:SUBJECT,p_enrolled:true});
    assert.equal((await select(student.client,"spark_subject_progress","completed",{user_id:student.id,subject_id:SUBJECT,activity_key:`stage:${runId}:lesson`}))[0].completed,true);
    check("labs, practice, leave and reenroll preserve progress and suppress inactive notifications");

    const paper1=row(await rpc(student.client,"spark_start_exam_attempt",{
      p_subject_id:SUBJECT,p_paper:"01",p_session_mode:"timed",p_duration_seconds:5400,
      p_bank_version:`poa-stage-paper1:${runId}`,p_rubric_version:"practice-choices",
      p_grader_version:"stage-practice-check",p_metadata:{staging_run:runId,paper_id:"POA-STAGE-P1"},
    }));
    const paper1Answers={"1":{answer:"A"}};
    await rpc(student.client,"spark_submit_exam_attempt",{p_attempt_id:paper1.attempt_id,
      p_response_snapshot:paper1Answers,p_response_snapshot_hash:hash(paper1Answers),
      p_score:null,p_max_score:60,p_metadata:{staging_run:runId,paper:"01",provisional:true,
        scorePublicationAllowed:false,score_authority:"server-v2-deterministic"}});
    const paper1Saved=row(await select(student.client,"spark_exam_attempts","score,status,response_snapshot,metadata,v2_paper_id,v2_rubric_version",{id:paper1.attempt_id}));
    assert.equal(paper1Saved.status,"submitted");
    assert.equal(paper1Saved.score,null);
    assert.deepEqual(paper1Saved.response_snapshot,paper1Answers);
    assert.equal(paper1Saved.metadata.score_authority,"client-practice-estimate");
    assert.equal(paper1Saved.metadata.provisional,true);
    assert.equal(paper1Saved.metadata.scorePublicationAllowed,false);
    assert.equal(paper1Saved.v2_paper_id,null,"Paper 1 must not enter the Paper 2 worker");
    assert.equal(paper1Saved.v2_rubric_version,null);
    assert.equal(await rpc(student.client,"spark_v2_exam_result",{p_attempt_id:paper1.attempt_id}),null);
    await progress(student.client,"paper1","exam",{p_score:null,p_max_score:60,
      p_metadata:{staging_run:runId,paper:"01",provisional:true,scorePublicationAllowed:false}});
    const paper1Progress=row(await select(student.client,"spark_subject_progress","score,percent,metadata",{user_id:student.id,
      subject_id:SUBJECT,activity_key:`stage:${runId}:paper1`}));
    assert.equal(paper1Progress.score,null);assert.equal(paper1Progress.percent,null);
    assert.equal(paper1Progress.metadata.score_authority,"client-practice-estimate");
    const paper1Notices=(await select(parent.client,"notifications","metadata",{recipient_user_id:parent.id,type:"child_paper1_completed"})).filter(n=>n.metadata?.staging_run===runId);
    assert.equal(paper1Notices.length,1);
    assert.equal(paper1Notices[0].metadata.score,null);assert.equal(paper1Notices[0].metadata.percent,null);
    const paper1Practice=row(await rpc(student.client,"spark_start_exam_attempt",{p_subject_id:SUBJECT,
      p_paper:"01",p_session_mode:"practice",p_duration_seconds:5400,p_metadata:{staging_run:runId}}));
    await rpc(student.client,"spark_submit_exam_attempt",{p_attempt_id:paper1Practice.attempt_id,
      p_response_snapshot:paper1Answers,p_response_snapshot_hash:hash(paper1Answers),p_score:41,p_max_score:60});
    const paper1Estimate=row(await select(student.client,"spark_exam_attempts","score,metadata",{id:paper1Practice.attempt_id}));
    assert.equal(Number(paper1Estimate.score),41);
    assert.equal(paper1Estimate.metadata.score_authority,"client-practice-estimate");
    await progress(student.client,"paper1-numeric-control","exam",{p_score:41,p_max_score:60,
      p_metadata:{staging_run:runId,paper:"01",server_attempt_id:paper1Practice.attempt_id}});
    const paper1NumericProgress=row(await select(student.client,"spark_subject_progress","score,metadata",{user_id:student.id,
      subject_id:SUBJECT,activity_key:`stage:${runId}:paper1-numeric-control`}));
    assert.equal(Number(paper1NumericProgress.score),41);
    assert.equal(paper1NumericProgress.metadata.score_authority,"client-practice-estimate");
    check("Paper 1 choice-only source answers remain unscored; numeric practice estimates persist without V2 Paper 2 routing");

    const deniedWorker=await worker(student.accessToken);
    assert([401,403].includes(deniedWorker.response.status),"Student JWT must not run the private worker");
    const anonWorker=await worker(config.anonKey);
    assert([401,403].includes(anonWorker.response.status),"Anon/publishable key must not run the private worker");
    const deniedClaim=await student.client.rpc("spark_v2_claim_next_shadow_job");
    assert(deniedClaim.error,"Students must not claim examiner jobs");
    check("deployed worker and queue reject student and anonymous invocation");

    const released=await rpc(student.client,"spark_v2_paper_released",{p_subject_id:SUBJECT,p_paper_id:paperId});
    assert.equal(released,Boolean(fixture),fixture?"Register and release the verified paper in stage before this run":"Draft paper unexpectedly released");
    for(const [paper,seconds]of[["01",10800],["02",5400]]){
      const wrong=await student.client.rpc("spark_start_exam_attempt",{p_subject_id:SUBJECT,
        p_paper:paper,p_session_mode:"timed",p_duration_seconds:seconds});
      assert(wrong.error,"Accounts timed duration must be enforced by the server");
    }
    check("server rejects altered Paper 1 and Paper 2 timed durations");
    const scenarios=fixture?.scenarios || [{name:"pending",responses:{},status:"not-eligible",score:null}];
    for(const scenario of scenarios) {
      const started=row(await rpc(student.client,"spark_start_exam_attempt",{
        p_subject_id:SUBJECT,p_paper:"02",p_session_mode:"timed",p_duration_seconds:10800,
        p_bank_version:`poa-stage:${runId}`,p_rubric_version:"client-cannot-choose-v2-version",
        p_grader_version:"stage-ungraded",p_metadata:{paper_id:paperId,staging_run:runId},
      }));
      assert(started?.attempt_id,"Server must return attempt identity and deadline");
      assert.equal(Math.round((Date.parse(started.deadline_at)-Date.parse(started.started_at))/1000),10800);
      const ownClock=await rpc(student.client,"spark_exam_attempt_clock",{p_attempt_id:started.attempt_id});
      assert.equal(row(ownClock).attempt_id,started.attempt_id);
      assert.equal((await rpc(other.client,"spark_exam_attempt_clock",{p_attempt_id:started.attempt_id})).length,0);
      const submit={p_attempt_id:started.attempt_id,p_response_snapshot:scenario.responses,
        p_response_snapshot_hash:hash(scenario.responses),p_score:null,p_max_score:100,
        p_metadata:{staging_run:runId,score_authority:"server-v2-deterministic"}};
      const foreignSubmit=await other.client.rpc("spark_submit_exam_attempt",submit);
      assert(foreignSubmit.error,"A different student must not submit this attempt");
      await rpc(student.client,"spark_submit_exam_attempt",submit);
      const before=row(await select(student.client,"spark_exam_attempts","score,status,response_snapshot,v2_paper_id,v2_rubric_version,metadata",{id:started.attempt_id}));
      assert.equal(before.status,"submitted"); assert.equal(before.score,null);
      assert.notEqual(before.metadata.score_authority,"server-v2-deterministic");
      assert.deepEqual(before.response_snapshot,scenario.responses);
      assert.equal(await rpc(other.client,"spark_v2_exam_result",{p_attempt_id:started.attempt_id}),null);
      const pending=await rpc(student.client,"spark_v2_exam_result",{p_attempt_id:started.attempt_id});
      assert.equal(pending.score,null,"No final score before private examiner completion");
      const progressKey=`exam:poa-v2:${started.attempt_id}`;
      const pendingProgress={p_subject_id:SUBJECT,p_activity_key:progressKey,p_activity_type:"exam",
        p_title:"Staging Accounts Paper 02",p_completed:true,p_score:100,p_max_score:100,p_percent:100,
        p_metadata:{paper:"02",paper_id:paperId,server_attempt_id:started.attempt_id,staging_run:runId,
          score_authority:"server-v2-deterministic",scorePublicationAllowed:true,finalScore:100}};
      await rpc(student.client,"spark_record_subject_progress",pendingProgress);
      const clientProgress=row(await select(student.client,"spark_subject_progress","score,percent,metadata",{user_id:student.id,subject_id:SUBJECT,activity_key:progressKey}));
      assert.equal(clientProgress.score,null);assert.equal(clientProgress.percent,null);
      assert.notEqual(clientProgress.metadata.score_authority,"server-v2-deterministic");
      const spoofKeys=[progressKey,`stage:${runId}:${scenario.name}:paper1-owned-p2`,
        `stage:${runId}:${scenario.name}:conflicting-p2`,
        `stage:${runId}:${scenario.name}:invalid-attempt`,
        `stage:${runId}:${scenario.name}:foreign-attempt`,
        `stage:${runId}:${scenario.name}:conflicting-source`];
      const assertPendingProgress=async key=>{
        const saved=row(await select(student.client,"spark_subject_progress","activity_type,title,score,percent,best_percent,metadata",{
          user_id:student.id,subject_id:SUBJECT,activity_key:key}));
        assert.equal(saved.activity_type,"exam");assert.equal(saved.title,"Principles of Accounts Paper 02");
        assert.equal(saved.score,null);assert.equal(saved.percent,null);assert.equal(saved.best_percent,null);
        assert.equal(saved.metadata.paper,"02");assert.equal(saved.metadata.paper_type,"paper2");
        assert.equal(saved.metadata.score_authority,"pending-server-marking");
        assert.equal(saved.metadata.scorePublicationAllowed,false);assert.equal(saved.metadata.finalScore,undefined);
      };
      const spoofProgress=async(key,type,metadata)=>{
        await rpc(student.client,"spark_record_subject_progress",{...pendingProgress,
          p_activity_key:key,p_activity_type:type,p_title:"Staging Accounts Paper 01",
          p_metadata:{staging_run:runId,score_authority:"server-v2-deterministic",finalScore:100,...metadata}});
        await assertPendingProgress(key);
      };
      await spoofProgress(progressKey,"exam",{paper:"01",paper_type:"paper1",server_attempt_id:started.attempt_id});
      await spoofProgress(progressKey,"topic_quiz",{paper:"01",paper_type:"paper1"});
      await spoofProgress(spoofKeys[1],"lesson",{paper:"01",server_attempt_id:started.attempt_id});
      await spoofProgress(spoofKeys[2],"topic_quiz",{paper:"01",paper_type:"paper2",paper_id:paperId});
      await spoofProgress(spoofKeys[3],"exam",{paper:"01",server_attempt_id:"not-a-uuid"});
      const foreignAttempt=row(await rpc(other.client,"spark_start_exam_attempt",{
        p_subject_id:SUBJECT,p_paper:"02",p_session_mode:"timed",p_duration_seconds:10800,
        p_metadata:{staging_run:runId}}));
      await spoofProgress(spoofKeys[4],"exam",{paper:"01",server_attempt_id:foreignAttempt.attempt_id});
      await spoofProgress(spoofKeys[5],"practice",{paper:"01",paper_type:"paper1",paper_id:paperId});
      await rpc(student.client,"spark_sync_subject_progress",{p_subject_id:SUBJECT,p_rows:[{
        activity_key:progressKey,activity_type:"lesson",title:"Staging Accounts Paper 01",completed:true,
        score:100,max_score:100,percent:100,best_percent:100,metadata:{paper:"01",paper_type:"paper1"},
      }]});
      await assertPendingProgress(progressKey);
      const noEarlyScore=row(await select(student.client,"spark_exam_attempts","score",{id:started.attempt_id}));
      assert.equal(noEarlyScore.score,null);
      for(const client of[student.client,parent.client]){
        const notices=(await select(client,"notifications","type,message,metadata"))
          .filter(n=>spoofKeys.includes(n.metadata?.activity_key));
        assert(notices.length>=8,"Source identity spoofs must exercise each student's and parent's notification path");
        for(const notice of notices){
          assert(["paper2_completed","child_paper2_completed"].includes(notice.type));
          assert(!/scored|100[.]?0?%/.test(notice.message));
          assert.equal(notice.metadata.score,null);assert.equal(notice.metadata.percent,null);
          assert.notEqual(notice.metadata.v2_result_phase,"verified");
        }
      }
      check(`Paper 2 ${scenario.name}: owned identity blocks Paper 1, quiz and lesson score spoofs before the worker`,
        {spoofCases:7,silentSync:true,invalidAndForeignReferences:true});
      if(fixture) {
        assert.equal(before.v2_paper_id,paperId);
        assert.equal(before.v2_rubric_version,fixture.paper.rubricVersion,"Server chooses registered version");
        const done=await worker(config.serviceKey,{service:true});
        assert.equal(done.response.status,200,"Deployed private worker must complete");
        assert.equal(done.body.processed,1); assert.equal(done.body.status,scenario.status);
        assert.equal(done.body.score,scenario.score);
        assert.equal(done.body.canPublishFinalScore,scenario.status==="verified");
      } else {
        const idle=await worker(config.serviceKey,{service:true});
        assert.equal(idle.response.status,200,"Deploy the real worker before rehearsing");
        assert.equal(idle.body.processed,0,"Unreleased paper must not enqueue");
        assert.equal(idle.body.status,"idle");
      }
      const result=await rpc(student.client,"spark_v2_exam_result",{p_attempt_id:started.attempt_id});
      assert.equal(result.status,scenario.status); assert.equal(result.score,scenario.score);
      const stored=row(await select(student.client,"spark_exam_attempts","score,metadata",{id:started.attempt_id}));
      assert.equal(stored.score,scenario.score);
      if(scenario.score===null)assert.notEqual(stored.metadata.score_authority,"server-v2-deterministic");
      else assert.equal(stored.metadata.score_authority,"server-v2-deterministic");
      await rpc(student.client,"spark_submit_exam_attempt",{...submit,p_response_snapshot:{},p_response_snapshot_hash:"retry"});
      const retried=row(await select(student.client,"spark_exam_attempts","response_snapshot,score",{id:started.attempt_id}));
      assert.deepEqual(retried.response_snapshot,scenario.responses,"Retry must not overwrite submitted answers");
      assert.equal(retried.score,scenario.score);
      check(`Paper 2 ${scenario.name}: saved source, owned result, worker state and score publication`,{status:result.status,score:result.score});
      const canonical=row(await select(student.client,"spark_subject_progress","score,max_score,percent,metadata",{user_id:student.id,subject_id:SUBJECT,activity_key:progressKey}));
      assert.equal(canonical.score,scenario.score);
      const finalMessages=async client=>(await select(client,"notifications","id,message,metadata"))
        .filter(n=>n.metadata?.server_attempt_id===started.attempt_id && n.metadata?.v2_result_phase==="verified");
      if(scenario.status==="verified"){
        assert.equal(canonical.metadata.score_authority,"server-v2-deterministic");
        assert.equal(canonical.metadata.v2_source_sha256,fixture.paper.sourceSha256);
        assert.equal(stored.metadata.v2_marker_sha256,fixture.paper.provenance.bundleSha256,"Deployed worker must match the calibrated bundle");
        assert.equal((await finalMessages(student.client)).length,1);
        assert.equal((await finalMessages(parent.client)).length,1);
        const beforeLate=(await select(student.client,"notifications","id",{recipient_user_id:student.id})).length;
        await rpc(student.client,"spark_record_subject_progress",{...pendingProgress,p_score:0,p_percent:0});
        await rpc(student.client,"spark_sync_subject_progress",{p_subject_id:SUBJECT,p_rows:[{
          activity_key:progressKey,activity_type:"exam",completed:true,score:0,max_score:100,
          percent:0,best_percent:0,metadata:{paper:"02",score_authority:"client-practice-estimate"},
        }]});
        const preserved=row(await select(student.client,"spark_subject_progress","score,metadata",{user_id:student.id,subject_id:SUBJECT,activity_key:progressKey}));
        assert.equal(preserved.score,scenario.score);assert.equal(preserved.metadata.score_authority,"server-v2-deterministic");
        assert.equal((await select(student.client,"notifications","id",{recipient_user_id:student.id})).length,beforeLate,
          "Late browser progress must not announce pending after the final result");
        assert.equal((await finalMessages(student.client)).length,1);
        assert.equal((await finalMessages(parent.client)).length,1);
      }else{
        assert.notEqual(canonical.metadata.score_authority,"server-v2-deterministic");
        assert.equal((await finalMessages(student.client)).length,0);
        assert.equal((await finalMessages(parent.client)).length,0);
      }
      check(`Paper 2 ${scenario.name}: canonical progress, deduped family notifications and late-sync protection`);
    }

    await progress(student.client,"pending-paper2","exam",{p_max_score:100,p_metadata:{staging_run:runId,paper:"02"}});
    const notices=await select(student.client,"notifications","message,metadata",{recipient_user_id:student.id,type:"paper2_completed"});
    const pendingNotices=notices.filter(n=>n.metadata?.activity_key===`stage:${runId}:pending-paper2`);
    assert.equal(pendingNotices.length,1); assert.match(pendingNotices[0].message,/final score is not yet available/);
    assert.equal(pendingNotices[0].metadata.score,null); assert.equal(pendingNotices[0].metadata.percent,null);
    const familyNotice=(await select(parent.client,"notifications","message,metadata",{recipient_user_id:parent.id,type:"child_paper2_completed"})).filter(n=>n.metadata?.activity_key===`stage:${runId}:pending-paper2`);
    assert.equal(familyNotice.length,1); assert.equal(familyNotice[0].metadata.score,null);
    assert(!/scored|100%/.test(familyNotice[0].message));
    check("pending Paper 2 student and linked-parent notifications contain no final score");
    report.passed=true;
  } catch(error) {
    report.failure=error.message;
    if(throwOnFailure)throw error;
  } finally {
    const cleanupErrors=[];
    if(initialCourse) {
      try {await value(service.from("spark_subjects").update({enabled:initialCourse.enabled,status:initialCourse.status}).eq("id",SUBJECT),"restore stage course visibility");}
      catch(error){cleanupErrors.push(error.message);}
    }
    for(const user of created.reverse()) {
      try {await value(user.client.auth.signOut({scope:"global"}),`sign out fixture ${user.name}`);}
      catch(error){cleanupErrors.push(error.message);}
      try {await value(service.auth.admin.deleteUser(user.id),`delete fixture ${user.name}`);}
      catch(error){cleanupErrors.push(error.message);}
    }
    report.finishedAt=new Date().toISOString();
    report.cleanup={passed:cleanupErrors.length===0,fixtureAccounts:created.length,errors:cleanupErrors};
    if(cleanupErrors.length)report.passed=false;
    if(out){fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(report,null,2)+"\n");}
    console.log(JSON.stringify(report,null,2));
    if(cleanupErrors.length && throwOnFailure)throw new Error("Staging cleanup was incomplete; inspect the sanitized report");
  }
  return report;
}

if(!globalThis.Deno && process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
  if(process.argv.includes("--help")) {
    console.log(fs.readFileSync(new URL(import.meta.url),"utf8").split("/**")[1].split("*/")[0].replace(/^ \* ?/gm,""));
  } else {
    await runStaging(stagingConfig(),{evidenceDir:arg("--evidence"),paperId:arg("--paper")||undefined,
      out:arg("--out")||".audit-output/poa-live-staging.json"});
  }
}
