import assert from "node:assert/strict";
import {randomUUID} from "node:crypto";
import {createClient} from "@supabase/supabase-js";
import {stagingConfig,stagingWorkerHeaders,verifiedScriptsFromRecords} from "./test-poa-staging.mjs";
import {createPoaStageFetch} from "./poa-stage-fetch.mjs";

// Hosted only: the deployment embeds a fixed set of genuinely verified source
// papers. HTTP callers supply no SQL, responses, paper IDs or credentials.
export async function runMethodStagingBatch(config,{verification,paperIds,throwOnFailure=true}={}){
 config=stagingConfig({POA_STAGING_URL:config.url,POA_STAGING_PROJECT_REF:config.ref,
  POA_STAGING_ANON_KEY:config.anonKey,POA_STAGING_SERVICE_ROLE_KEY:config.serviceKey,POA_STAGING_ALLOW_WRITES:"disposable-accounts-stage"});
 assert.equal(config.ref,"cfqetgozfxmavwexhrxz");
 assert(paperIds.length>0&&paperIds.length<=14);
 const stageFetch=createPoaStageFetch();
 const options={auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false},global:{fetch:stageFetch}};
 const service=createClient(config.url,config.serviceKey,options),created=[],runId=randomUUID();
 const report={kind:"live-supabase-http",runId,startedAt:new Date().toISOString(),checks:[],passed:false,cleanup:{passed:false}};
 let initialCourse;
 const value=async(operation,label)=>{const {data,error}=await operation;if(error)throw Error(`${label}: ${error.code||error.status} ${error.message}`);return data;};
 const rpc=(client,name,params)=>value(client.rpc(name,params),name);
 const row=data=>Array.isArray(data)?data[0]:data;
 const select=(client,table,columns,filters={})=>{
  let q=client.from(table).select(columns);for(const [k,v]of Object.entries(filters))q=q.eq(k,v);
  return value(q,"read "+table);
 };
 try{
  const users=await value(service.auth.admin.listUsers({page:1,perPage:1000}),"inspect stage accounts");
  assert(users.users.length<1000&&users.users.every(u=>u.app_metadata?.poa_staging_fixture===true));
  initialCourse=row(await select(service,"spark_subjects","enabled,status",{id:"principles-of-accounts"}));assert(initialCourse);
  for(const [name,role]of [["student","student"],["parent","parent"],["other","student"]]){
   const email=`poa-method-${name}-${runId}@example.invalid`,password=`Stage!${randomUUID()}`;
   const data=await value(service.auth.admin.createUser({email,password,email_confirm:true,app_metadata:{poa_staging_fixture:true,staging_run:runId},user_metadata:{name:"Accounts method rehearsal"}}),"create fixture");
   const user={id:data.user.id,client:createClient(config.url,config.anonKey,options)};created.push(user);
   await value(service.from("profiles").upsert({id:user.id,name:"Accounts method rehearsal",role}),"fixture profile");
   await value(user.client.auth.signInWithPassword({email,password}),"fixture sign in");
  }
  const [student,parent,other]=created;
  await value(service.from("spark_subjects").update({enabled:true,status:"live"}).eq("id","principles-of-accounts"),"stage visibility");
  await rpc(student.client,"spark_set_subject_enrollment",{p_subject_id:"principles-of-accounts",p_enrolled:true});
  await value(service.from("parent_student_links").insert({parent_id:parent.id,student_id:student.id,status:"approved",approved_at:new Date().toISOString()}),"fixture family link");
  for(const paperId of paperIds){
   const fixture=verifiedScriptsFromRecords(verification.records,verification.papers,paperId),p=fixture.paper;
   assert.equal(p.rubricVersion,"poa-source-methods-v1");assert.match(p.sourcePdfSha256,/^[a-f0-9]{64}$/);
   assert.equal(paperId,p.sourcePaperId+"--q-"+p.selectedQuestions.join("-"));
   const metadata={paper:"02",paper_id:p.sourcePaperId,source:"poa-historical-text-v1",source_sha256:p.sourcePdfSha256,selected_questions:p.selectedQuestions,staging_run:runId};
   for(const scenario of fixture.scenarios){
    const a=row(await rpc(student.client,"spark_start_exam_attempt",{p_subject_id:"principles-of-accounts",p_paper:"02",p_session_mode:"timed",p_duration_seconds:10800,
     p_bank_version:"poa-historical-text-v1:"+p.sourcePaperId,p_rubric_version:"browser-draft",p_grader_version:"marking-reconciliation-v2",p_metadata:{...metadata,selected_questions:[]}}));
    const submit={p_attempt_id:a.attempt_id,p_response_snapshot:scenario.responses,p_response_snapshot_hash:"stage-fixed-fixture",p_score:100,p_max_score:100,p_metadata:metadata};
    assert((await other.client.rpc("spark_submit_exam_attempt",submit)).error,"Foreign submission must fail");
    await rpc(student.client,"spark_submit_exam_attempt",submit);
    const pending=await rpc(student.client,"spark_v2_exam_result",{p_attempt_id:a.attempt_id});assert.equal(pending.score,null);assert.equal(pending.status,"queued");
    const response=await stageFetch(config.url+"/functions/v1/mark-paper2-v2-shadow",{method:"POST",headers:stagingWorkerHeaders(config,config.serviceKey,{service:true}),body:"{}"});
    assert.equal(response.status,200);const done=await response.json();assert.equal(done.processed,1);assert.equal(done.status,scenario.status);assert.equal(done.score,scenario.score);
    const result=await rpc(student.client,"spark_v2_exam_result",{p_attempt_id:a.attempt_id});assert.equal(result.status,scenario.status);assert.equal(result.score,scenario.score);
    assert.equal(await rpc(other.client,"spark_v2_exam_result",{p_attempt_id:a.attempt_id}),null);
    const attempt=row(await select(student.client,"spark_exam_attempts","score,v2_paper_id,v2_rubric_version,response_snapshot,metadata",{id:a.attempt_id}));
    assert.equal(attempt.v2_paper_id,paperId);assert.equal(attempt.v2_rubric_version,p.rubricVersion);assert.deepEqual(attempt.response_snapshot,scenario.responses);assert.equal(attempt.score,scenario.score);
    const progress=row(await select(student.client,"spark_subject_progress","score,metadata",{activity_key:"exam:poa-v2:"+a.attempt_id,user_id:student.id}));
    if(scenario.score===null)assert.equal(progress,undefined);
    else{assert.equal(progress.score,scenario.score);assert.equal(progress.metadata.v2_source_sha256,p.sourceSha256);assert.equal(attempt.metadata.v2_marker_sha256,p.provenance.bundleSha256);}
    for(const person of [student,parent]){
     const notices=(await select(person.client,"notifications","metadata",{recipient_user_id:person.id})).filter(n=>n.metadata?.server_attempt_id===a.attempt_id&&n.metadata?.v2_result_phase==="verified");
     assert.equal(notices.length,scenario.score===null?0:1);
    }
    report.checks.push({name:`${paperId}: ${scenario.name}, source, ownership, score, progress and family notification`,passed:true,status:result.status,score:result.score});
   }
  }
  report.passed=true;
 }catch(error){report.failure=error.message;if(throwOnFailure)throw error;}
 finally{
  const errors=[];
  if(initialCourse)try{await value(service.from("spark_subjects").update(initialCourse).eq("id","principles-of-accounts"),"restore stage visibility");}catch(e){errors.push(e.message);}
  for(const user of created.reverse()){
   try{await value(user.client.auth.signOut({scope:"global"}),"fixture sign out");}catch(e){errors.push(e.message);}
   try{await value(service.auth.admin.deleteUser(user.id),"fixture deletion");}catch(e){errors.push(e.message);}
  }
  report.cleanup={passed:errors.length===0,fixtureAccounts:created.length,errors};report.finishedAt=new Date().toISOString();report.passed&&=report.cleanup.passed;
 }
 return report;
}
