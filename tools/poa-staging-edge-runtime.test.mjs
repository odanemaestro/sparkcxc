import test from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {execFileSync} from "node:child_process";
import {createStageRehearsalHandler,equalSha256,sanitizeStagingReport,POA_STAGE_REF,POA_STAGE_URL} from "./poa-staging-edge-runtime.mjs";
import {nonceGuardSql} from "./build-poa-staging-edge.mjs";

const nonce="a".repeat(64);
const nonceSha256=createHash("sha256").update(nonce).digest("hex");
const paperIds=["POA-ORIGINAL-02-01","POA-SPECIMEN-02-2017"];
const config={nonceSha256,expiresAt:"2030-01-01T00:00:00.000Z",paperIds,
  verification:{records:[],papers:[]},clock:()=>Date.parse("2026-10-22T00:00:00Z")};
const env=name=>({SUPABASE_URL:POA_STAGE_URL,SUPABASE_ANON_KEY:"fixture-anon",SUPABASE_SERVICE_ROLE_KEY:"fixture-service"})[name];
const request=({token=nonce,method="POST",body="{}",search="",headers={}}={})=>new Request(`${POA_STAGE_URL}/functions/v1/poa-staging-rehearsal${search}`,{
  method,headers:{"x-poa-staging-nonce":token,...headers},...(["GET","HEAD"].includes(method)?{}:{body})});
const passing=()=>({passed:true,cleanup:{passed:true,fixtureAccounts:3,errors:[]},checks:[{name:"real HTTP check",passed:true}],
  startedAt:"2026-10-22T00:00:00Z",finishedAt:"2026-10-22T00:01:00Z"});

test("rejects other projects, expired authorization and unsupported input before claiming or running",async()=>{
  let calls=0;
  const dependencies={...config,env,claimNonce:async()=>{calls++;return true;},runStaging:async()=>{calls++;return passing();}};
  for(const [change,req,status] of [
    [{env:name=>name==="SUPABASE_URL"?"https://ymnfexzyjtvjkufcefmf.supabase.co":env(name)},request(),403],
    [{env:name=>name==="SUPABASE_URL"?`${POA_STAGE_URL}/rest/v1`:env(name)},request(),403],
    [{expiresAt:"2020-01-01T00:00:00Z"},request(),403],
    [{},request({method:"GET"}),405],
    [{},request({token:"b".repeat(64)}),403],
    [{},request({search:"?sql=select"}),400],
    [{},request({body:'{"paper":"other"}'}),400],
    [{},request({headers:{"content-length":"300"}}),400],
  ])assert.equal((await createStageRehearsalHandler({...dependencies,...change})(req)).status,status);
  assert.equal(calls,0);
});

test("claims authorization once across independent isolates and runs only embedded papers and fixtures",async()=>{
  let consumed=false,claims=0;
  const runs=[];
  const verification={records:[{trusted:"embedded"}],papers:[]};
  const dependencies={...config,verification,env,claimNonce:async credentials=>{
    assert.deepEqual(credentials,{url:POA_STAGE_URL,serviceKey:"fixture-service"});
    claims++;
    if(consumed)return false;
    consumed=true;return true;
  },runStaging:async(credentials,options)=>{
    assert.equal(credentials.ref,POA_STAGE_REF);
    assert.equal(credentials.serviceKey,"fixture-service");
    assert.equal(options.verification,verification);
    assert.equal(options.throwOnFailure,false);
    runs.push(options.paperId);return passing();
  }};
  const first=createStageRehearsalHandler(dependencies);
  const second=createStageRehearsalHandler(dependencies);
  const responses=await Promise.all([first(request()),second(request())]);
  assert.deepEqual(responses.map(response=>response.status).sort(),[200,409]);
  assert.deepEqual(runs,paperIds);
  assert.equal(claims,2);
  const report=await responses.find(response=>response.status===200).json();
  assert.equal(report.passed,true);assert.equal(report.cleanup.passed,true);
  assert.equal((await first(request())).status,409);
  assert.deepEqual(runs,paperIds);
});

test("returns failed checks and cleanup details without leaking credentials or accepting another run",async()=>{
  let runs=0;
  const handler=createStageRehearsalHandler({...config,env,claimNonce:async()=>true,runStaging:async()=>{
    runs++;return {passed:false,failure:`fixture-service ${nonce}`,cleanup:{passed:false,fixtureAccounts:3,
      errors:["fixture-anon could not sign out"]},checks:[{name:"fixture-service check",passed:true}],credential:"must not appear"};
  }});
  const response=await handler(request());
  assert.equal(response.status,500);
  const text=await response.text();
  for(const secret of ["fixture-service","fixture-anon",nonce,"must not appear"])assert(!text.includes(secret));
  const report=JSON.parse(text);
  assert.equal(report.cleanup.passed,false);
  assert.equal(report.papers[0].cleanup.fixtureAccounts,3);
  assert.equal(report.papers[0].checks.length,1);
  assert.equal(runs,1,"Stop the second paper after a failed run or cleanup");
  assert.equal((await handler(request())).status,409);
});

test("a runner exception never claims cleanup succeeded",async()=>{
  const handler=createStageRehearsalHandler({...config,env,claimNonce:async()=>true,runStaging:async()=>{throw Error("private failure");}});
  const response=await handler(request());
  const report=await response.json();
  assert.equal(response.status,500);assert.equal(report.cleanup.passed,false);
  assert.equal(report.papers[0].cleanup.passed,false);
  assert(!JSON.stringify(report).includes("private failure"));
});

test("nonce guard uses an atomic no-argument service-only claim and does not store the nonce",()=>{
  const sql=nonceGuardSql(nonceSha256,config.expiresAt);
  assert(!sql.includes(nonce));
  assert.match(sql,/update poa_stage_rehearsal\.authorization set consumed_at=clock_timestamp\(\)/);
  assert.match(sql,/consumed_at is null/);
  assert.match(sql,/expires_at>clock_timestamp\(\)/);
  assert.match(sql,/enable row level security/);
  assert.match(sql,/security invoker set search_path=''/);
  assert.match(sql,/revoke all on function public\.poa_claim_staging_rehearsal\(\) from public,anon,authenticated/);
  assert.match(sql,/grant execute on function public\.poa_claim_staging_rehearsal\(\) to service_role/);
});

test("builder and runtime import without invoking a live runner or generating an authorization",()=>{
  const imported=execFileSync(process.execPath,["--input-type=module","-e",
    "await import('./tools/build-poa-staging-edge.mjs'); await import('./tools/poa-staging-edge-runtime.mjs'); process.stdout.write('import-safe');"],
  {cwd:new URL("../",import.meta.url),encoding:"utf8"});
  assert.equal(imported,"import-safe");
  assert(equalSha256(nonceSha256,nonceSha256));
  assert(!equalSha256(nonceSha256,`0${nonceSha256.slice(1)}`));
  assert(!equalSha256(nonceSha256,nonceSha256.slice(1)));
  const sanitized=sanitizeStagingReport({passed:true,cleanup:{passed:false},accessToken:"hidden"},paperIds[0]);
  assert.equal(sanitized.passed,false);assert(!("accessToken" in sanitized));
});
