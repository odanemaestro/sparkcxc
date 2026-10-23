import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {PRODUCTION_REF,stagingConfig,stagingWorkerHeaders,verifiedScripts,verifiedScriptsFromRecords} from "./test-poa-staging.mjs";

const REF="abcdefghijklmnopqrst";
const jwt=claims=>`${Buffer.from('{"alg":"HS256"}').toString("base64url")}.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.test-signature`;
const environment=(ref=REF)=>({POA_STAGING_ALLOW_WRITES:"disposable-accounts-stage",
  POA_STAGING_URL:`https://${ref}.supabase.co`,POA_STAGING_PROJECT_REF:ref,
  POA_STAGING_ANON_KEY:"test-publishable-key",POA_STAGING_SERVICE_ROLE_KEY:jwt({
    ref,role:"service_role",exp:Math.floor(Date.now()/1000)+3600})});

test("requires an exact disposable-project acknowledgement and never accepts SPARK production",()=>{
  assert.equal(stagingConfig(environment()).ref,REF);
  assert.throws(()=>stagingConfig(environment(PRODUCTION_REF)),/Production SPARK is forbidden/);
  assert.throws(()=>stagingConfig({...environment(),POA_STAGING_ALLOW_WRITES:"true"}),/isolated, disposable/);
  assert.throws(()=>stagingConfig({...environment(),POA_STAGING_PROJECT_REF:"different"}),/must match/);
  assert.throws(()=>stagingConfig({...environment(),POA_STAGING_URL:`https://${REF}.supabase.co/rest/v1`}),/without a path/);
});

test("rejects cross-project, non-service and expired worker credentials before HTTP",()=>{
  assert.throws(()=>stagingConfig({...environment(),POA_STAGING_SERVICE_ROLE_KEY:"sb_secret_too-short"}),/server secret key or legacy service-role JWT/);
  for(const change of [{ref:PRODUCTION_REF},{role:"authenticated"},{exp:1}]){
    const key=jwt({ref:REF,role:"service_role",exp:Math.floor(Date.now()/1000)+3600,...change});
    assert.throws(()=>stagingConfig({...environment(),POA_STAGING_SERVICE_ROLE_KEY:key}));
  }
});

test("accepts new server secret keys without treating them as JWTs or forwarding them as Bearer tokens",()=>{
  const serviceKey=`sb_secret_${"s".repeat(40)}`;
  const anonKey=`sb_publishable_${"p".repeat(40)}`;
  const configured=stagingConfig({...environment(),POA_STAGING_SERVICE_ROLE_KEY:serviceKey,POA_STAGING_ANON_KEY:anonKey});
  assert.equal(configured.serviceKey,serviceKey);
  assert.deepEqual(stagingWorkerHeaders(configured,serviceKey,{service:true}),{
    apikey:serviceKey,"content-type":"application/json"});
  assert.deepEqual(stagingWorkerHeaders(configured,anonKey),{apikey:anonKey,"content-type":"application/json"});
  assert.deepEqual(stagingWorkerHeaders(configured,"fixture-user-jwt"),{
    apikey:anonKey,"content-type":"application/json",authorization:"Bearer fixture-user-jwt"});
  assert.throws(()=>stagingConfig({...environment(),POA_STAGING_SERVICE_ROLE_KEY:anonKey}),/server secret key/);
});

test("does not turn blocked or incomplete calibration artifacts into live release fixtures",()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),"poa-staging-guard-"));
  const write=(records,papers)=>{
    fs.writeFileSync(path.join(dir,"evidence.json"),JSON.stringify(records));
    fs.writeFileSync(path.join(dir,"papers.json"),JSON.stringify(papers));
  };
  const paper={subjectId:"principles-of-accounts",paperId:"guard-fixture",rubricVersion:"guard-v1",
    criteria:1,expectedTotalMarks:1,outcome:"verified"};
  const criterion={subjectId:paper.subjectId,paperId:paper.paperId,rubricVersion:paper.rubricVersion,
    criterionId:"guard-criterion",maxMarks:1,outcome:"verified",cases:[
      {cls:"full",response:"full fixture",passed:true,resolved:true},
      {cls:"incorrect",response:"wrong fixture",passed:true,resolved:true},
      {cls:"contradiction",response:"uncertain fixture",passed:true,resolved:false},
    ]};
  try{
    write([criterion],[{...paper,outcome:"blocked"}]);
    assert.throws(()=>verifiedScripts(dir,paper.paperId),/no verified paper evidence/);
    write([],[paper]);
    assert.throws(()=>verifiedScripts(dir,paper.paperId),/Incomplete committed criterion evidence/);
    write([{...criterion,outcome:"blocked"}],[paper]);
    assert.throws(()=>verifiedScripts(dir,paper.paperId),/Every criterion needs verified/);
    write([{...criterion,cases:criterion.cases.filter(c=>c.cls!=="contradiction")}],[paper]);
    assert.throws(()=>verifiedScripts(dir,paper.paperId),/committed unresolved response/);
    write([criterion],[paper]);
    const loaded=verifiedScripts(dir,paper.paperId);
    const inMemory={records:[criterion],papers:[paper]};
    const before=JSON.stringify(inMemory);
    assert.deepEqual(verifiedScriptsFromRecords(inMemory.records,inMemory.papers,paper.paperId),loaded,
      "The Edge/Deno in-memory verification path must retain the exact committed scenarios");
    assert.equal(JSON.stringify(inMemory),before,"Evidence records must not be mutated for the rehearsal");
    assert.deepEqual(loaded.scenarios.map(s=>[s.name,s.status,s.score]),[
      ["full","verified",1],["zero","verified",0],["unresolved","provisional",null],
    ]);
  }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
