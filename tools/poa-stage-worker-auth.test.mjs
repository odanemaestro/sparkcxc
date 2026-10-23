import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {createHash} from "node:crypto";
import {transform} from "esbuild";
import {isOpaqueServiceKey,legacyServiceClaims,stageServiceKeyFromRequest} from "./poa-stage-worker-auth.mjs";
import {adaptStageWorkerSource} from "./build-poa-stage-worker.mjs";
import {POA_STAGE_REF,POA_STAGE_URL} from "./poa-staging-edge-runtime.mjs";

const secret=`sb_secret_${"s".repeat(40)}`;
const jwt=claims=>`${Buffer.from('{"alg":"HS256"}').toString("base64url")}.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.fixture-signature`;
const now=1_800_000_000;
const legacy=jwt({ref:POA_STAGE_REF,role:"service_role",exp:now+3600});

test("only the exact stage-held service key authenticates; anonymous/user/cross-project requests are denied",async()=>{
  const environment={serviceRoleKey:secret};
  assert.equal(await stageServiceKeyFromRequest(secret,POA_STAGE_URL,environment,now),secret);
  for(const apiKey of [null,"",`sb_publishable_${"p".repeat(40)}`,jwt({ref:POA_STAGE_REF,role:"anon",exp:now+3600}),
    jwt({ref:POA_STAGE_REF,role:"authenticated",exp:now+3600}),`sb_secret_${"x".repeat(40)}`,legacy])
    assert.equal(await stageServiceKeyFromRequest(apiKey,POA_STAGE_URL,environment,now),null);
  for(const projectUrl of ["https://ymnfexzyjtvjkufcefmf.supabase.co","https://different.invalid",`${POA_STAGE_URL}/`,`${POA_STAGE_URL}/rest/v1`])
    assert.equal(await stageServiceKeyFromRequest(secret,projectUrl,environment,now),null);
});

test("JSON default secret fallback and legacy keys require the exact trusted server credential",async()=>{
  assert.equal(await stageServiceKeyFromRequest(secret,POA_STAGE_URL,{secretKeys:JSON.stringify({default:secret})},now),secret);
  assert.equal(await stageServiceKeyFromRequest(secret,POA_STAGE_URL,{secretKeys:"invalid JSON"},now),null);
  assert.equal(await stageServiceKeyFromRequest(legacy,POA_STAGE_URL,{serviceRoleKey:legacy},now),legacy);
  const foreign=jwt({ref:"abcdefghijklmnopqrst",role:"service_role",exp:now+3600});
  const expired=jwt({ref:POA_STAGE_REF,role:"service_role",exp:now-1});
  for(const key of [foreign,expired,"sb_secret_short",jwt({ref:POA_STAGE_REF,role:"authenticated",exp:now+3600})])
    assert.equal(await stageServiceKeyFromRequest(key,POA_STAGE_URL,{serviceRoleKey:key},now),null);
  assert.equal(isOpaqueServiceKey(secret),true);
  assert.equal(isOpaqueServiceKey("sb_publishable_public"),false);
  assert.equal(legacyServiceClaims(legacy).ref,POA_STAGE_REF);
  assert.equal(legacyServiceClaims("malformed"),null);
});

test("stage adapter leaves the production source and entire examiner protocol unchanged",()=>{
  const sourcePath=new URL("../supabase/functions/mark-paper2-v2-shadow/index.ts",import.meta.url);
  const original=fs.readFileSync(sourcePath,"utf8");
  const normalized=original.replace(/\r\n/g,"\n");
  const marker=" const client=createClient(endpoint,incoming,{";
  const adapted=adaptStageWorkerSource(original,"2.108.2");
  assert.equal(adapted.source.slice(adapted.source.indexOf(marker)),normalized.slice(normalized.indexOf(marker)));
  assert.equal(adapted.protocolSha256,createHash("sha256").update(normalized.slice(normalized.indexOf(marker))).digest("hex"));
  assert.match(adapted.source,/npm:@supabase\/supabase-js@2\.108\.2/);
  assert.match(adapted.source,/stageServiceKeyFromRequest\(req\.headers\.get\("apikey"\)/);
  assert.match(adapted.source,/verify_jwt=false/);
  assert.equal(fs.readFileSync(sourcePath,"utf8"),original);
  assert.throws(()=>adaptStageWorkerSource(original.replace("serviceRoleJwtFromRequest","changedShape"),"2.108.2"),/authentication shape changed/);
});

test("the actual adapted HTTP handler returns 401 for invalid, anonymous, user and foreign-project callers",async()=>{
  const original=fs.readFileSync(new URL("../supabase/functions/mark-paper2-v2-shadow/index.ts",import.meta.url),"utf8");
  const source=adaptStageWorkerSource(original,"2.108.2").source.replace(/^import .*;\n/gm,"");
  const compiled=await transform(source,{loader:"ts",target:"es2022",format:"esm"});
  let handler,rpcCalls=0,endpoint=POA_STAGE_URL;
  const deno={serve:callback=>{handler=callback;},env:{get:name=>({SUPABASE_URL:endpoint,SUPABASE_SERVICE_ROLE_KEY:secret})[name]}};
  const client=(url,key)=>{
    assert.equal(url,POA_STAGE_URL);assert.equal(key,secret);
    return {rpc:async name=>{assert.equal(name,"spark_v2_claim_next_shadow_job");rpcCalls++;return {data:null,error:null};}};
  };
  new Function("Deno","stageServiceKeyFromRequest","createClient","evaluateExistingSubjectPaper2V2","BUNDLE_SHA256",compiled.code)(
    deno,stageServiceKeyFromRequest,client,()=>{throw Error("Idle worker must not examine scripts");},"fixture-checksum");
  const invoke=headers=>handler(new Request(`${POA_STAGE_URL}/functions/v1/mark-paper2-v2-shadow`,{method:"POST",headers,body:"{}"}));
  for(const headers of [{},{apikey:"wrong"},{apikey:`sb_publishable_${"p".repeat(40)}`},
    {apikey:`sb_publishable_${"p".repeat(40)}`,authorization:`Bearer ${jwt({ref:POA_STAGE_REF,role:"authenticated",exp:now+3600})}`}])
    assert.equal((await invoke(headers)).status,401);
  endpoint="https://ymnfexzyjtvjkufcefmf.supabase.co";
  assert.equal((await invoke({apikey:secret})).status,401);
  assert.equal(rpcCalls,0);
  endpoint=POA_STAGE_URL;
  const accepted=await invoke({apikey:secret});
  assert.equal(accepted.status,200);
  assert.deepEqual(await accepted.json(),{status:"idle",processed:0});
  assert.equal(rpcCalls,1);
});
