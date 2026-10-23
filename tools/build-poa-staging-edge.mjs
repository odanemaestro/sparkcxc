import assert from "node:assert/strict";
import {build} from "esbuild";
import {createHash,randomBytes,randomUUID} from "node:crypto";
import {execFileSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {fileURLToPath,pathToFileURL} from "node:url";
import {verifiedScriptsFromRecords} from "./test-poa-staging.mjs";
import {POA_STAGE_REF,POA_STAGE_URL,POA_STAGE_CLAIM_RPC} from "./poa-staging-edge-runtime.mjs";

const SUBJECT="principles-of-accounts";
const sha256=data=>createHash("sha256").update(data).digest("hex");
const localRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const git=(root,...args)=>execFileSync("git",args,{cwd:root,encoding:"utf8"}).trimEnd();

export function nonceGuardSql(nonceSha256,expiresAt) {
  assert.match(nonceSha256,/^[a-f0-9]{64}$/);
  assert.equal(new Date(expiresAt).toISOString(),expiresAt);
  return `-- Disposable Accounts stage ${POA_STAGE_REF} only. No production deployment.
begin;
do $guard$ begin
  if current_setting('app.settings.project_ref',true) is not null
    and current_setting('app.settings.project_ref',true) <> '${POA_STAGE_REF}'
  then raise exception 'Wrong disposable stage project'; end if;
end $guard$;
create schema if not exists poa_stage_rehearsal;
revoke all on schema poa_stage_rehearsal from public,anon,authenticated;
grant usage on schema poa_stage_rehearsal to service_role;
create table if not exists poa_stage_rehearsal.authorization (
  nonce_sha256 text primary key check (nonce_sha256 ~ '^[a-f0-9]{64}$'),
  expires_at timestamptz not null,
  consumed_at timestamptz
);
alter table poa_stage_rehearsal.authorization enable row level security;
revoke all on poa_stage_rehearsal.authorization from public,anon,authenticated;
grant select,update on poa_stage_rehearsal.authorization to service_role;
insert into poa_stage_rehearsal.authorization(nonce_sha256,expires_at)
values ('${nonceSha256}','${expiresAt}') on conflict do nothing;
create or replace function public.${POA_STAGE_CLAIM_RPC}()
returns boolean language sql volatile security invoker set search_path='' as $claim$
  with claimed as (
    update poa_stage_rehearsal.authorization set consumed_at=clock_timestamp()
    where nonce_sha256='${nonceSha256}' and consumed_at is null
      and expires_at>clock_timestamp()
    returning true
  ) select exists(select 1 from claimed);
$claim$;
revoke all on function public.${POA_STAGE_CLAIM_RPC}() from public,anon,authenticated;
grant execute on function public.${POA_STAGE_CLAIM_RPC}() to service_role;
commit;
`;
}

export async function buildPoaStagingEdge({root=localRoot,outDir=".audit-output/poa-staging-edge",
  evidenceDir="artifacts/poa-v2-verification",ttlMinutes=60}={}) {
  root=path.resolve(root);
  outDir=path.resolve(root,outDir);
  // Secrets and deployment-only fixtures must remain in ignored audit output.
  const auditRoot=path.resolve(root,".audit-output")+path.sep;
  assert(outDir.startsWith(auditRoot),"Deployment files must stay inside .audit-output");
  assert(Number.isInteger(ttlMinutes) && ttlMinutes>=5 && ttlMinutes<=120,"Use a 5–120 minute nonce lifetime");
  evidenceDir=path.resolve(root,evidenceDir);
  const records=JSON.parse(fs.readFileSync(path.join(evidenceDir,"evidence.json"),"utf8"));
  const papers=JSON.parse(fs.readFileSync(path.join(evidenceDir,"papers.json"),"utf8"));
  const accountsPapers=papers.filter(paper=>paper.subjectId===SUBJECT);
  const selected=accountsPapers.filter(paper=>paper.outcome==="verified");
  assert(selected.length,"No verified Accounts calibration evidence found");
  const commit=git(root,"rev-parse","HEAD");
  const bundle=fs.readFileSync(path.join(root,"supabase/functions/_shared/server-marker-v2.mjs"));
  const bundleSha256=sha256(bundle);
  const currentChanges=git(root,"status","--porcelain","--untracked-files=all").split(/\r?\n/).filter(Boolean)
    .map(line=>line.slice(3)).filter(file=>!file.startsWith("artifacts/poa-v2-verification/"));
  assert.equal(currentChanges.length,0,"Commit source changes before building the staging rehearsal");
  for(const paper of selected) {
    verifiedScriptsFromRecords(records,papers,paper.paperId);
    assert.equal(paper.provenance?.workingTreeDirty,false,"Re-run the verifier from a clean source commit");
    assert.equal(paper.provenance?.gitCommit,commit,"Verification evidence belongs to a different source commit");
    assert.equal(paper.provenance?.bundleSha256,bundleSha256,"Verification evidence belongs to a different marker bundle");
  }
  const paperIds=selected.map(paper=>paper.paperId);
  const selectedIds=new Set(paperIds);
  const verification={records:records.filter(record=>record.subjectId===SUBJECT && selectedIds.has(record.paperId)),papers:selected};
  assert(verification.records.every(record=>record.provenance?.workingTreeDirty===false
    && record.provenance?.gitCommit===commit && record.provenance?.bundleSha256===bundleSha256),
    "Every criterion must have clean matching marker provenance");
  fs.mkdirSync(outDir,{recursive:true});
  // Vite may serve any file under the repository. Keep the opaque authorization
  // outside the entire repository/web root, including ignored audit output.
  const privateDir=path.resolve(root,"..","poa-staging-secrets");
  assert(privateDir!==root && !privateDir.startsWith(root+path.sep),"Private nonce must stay outside the repository web root");
  fs.mkdirSync(privateDir,{recursive:true,mode:0o700});
  const nonce=randomBytes(32).toString("hex");
  const nonceSha256=sha256(nonce);
  const expiresAt=new Date(Date.now()+ttlMinutes*60_000).toISOString();
  const noncePath=path.join(privateDir,`nonce-${randomUUID()}.txt`);
  fs.writeFileSync(noncePath,nonce+"\n",{mode:0o600,flag:"wx"});
  const supabaseVersion=JSON.parse(fs.readFileSync(path.join(root,"node_modules/@supabase/supabase-js/package.json"),"utf8")).version;
  assert.match(supabaseVersion,/^\d+\.\d+\.\d+$/,"Pin an exact installed Supabase client version");
  const entry=`import {createClient} from "@supabase/supabase-js";
import {runStaging} from ${JSON.stringify(path.join(root,"tools/test-poa-staging.mjs"))};
import {createStageRehearsalHandler,POA_STAGE_CLAIM_RPC} from ${JSON.stringify(path.join(root,"tools/poa-staging-edge-runtime.mjs"))};
const handler=createStageRehearsalHandler({nonceSha256:${JSON.stringify(nonceSha256)},expiresAt:${JSON.stringify(expiresAt)},
 paperIds:${JSON.stringify(paperIds)},verification:${JSON.stringify(verification)},runStaging,
 env:name=>Deno.env.get(name),claimNonce:async({url,serviceKey})=>{
   const {data,error}=await createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}}).rpc(POA_STAGE_CLAIM_RPC);
   if(error)throw new Error("Could not claim fixed staging rehearsal");
   return data===true;
 }});
Deno.serve(handler);
`;
  const activePath=path.join(outDir,"index.mjs");
  await build({absWorkingDir:root,stdin:{contents:entry,resolveDir:root,sourcefile:"poa-stage-only-entry.mjs"},
    bundle:true,format:"esm",platform:"neutral",packages:"external",target:"es2022",legalComments:"none",
    minify:false,write:true,outfile:activePath,logLevel:"warning",
    plugins:[{name:"pin-supabase-for-deno",setup(plugin){plugin.onResolve({filter:/^@supabase\/supabase-js$/},()=>({
      path:`npm:@supabase/supabase-js@${supabaseVersion}`,external:true}));}}]});
  const active=fs.readFileSync(activePath,"utf8");
  assert(!active.includes(nonce),"Opaque rehearsal authorization must not be embedded in deployment source");
  const disabledPath=path.join(outDir,"disabled.mjs");
  fs.writeFileSync(disabledPath,`// Rehearsal retired. Deploy with verify_jwt=true.\nDeno.serve(()=>new Response(JSON.stringify({error:"Accounts staging rehearsal is disabled"}),{status:403,headers:{"content-type":"application/json","cache-control":"no-store"}}));\n`);
  const guardPath=path.join(outDir,"nonce-guard.sql");
  fs.writeFileSync(guardPath,nonceGuardSql(nonceSha256,expiresAt));
  const metadata={projectRef:POA_STAGE_REF,projectUrl:POA_STAGE_URL,functionName:"poa-staging-rehearsal",verifyJwt:true,
    paperIds,excludedPapers:accountsPapers.filter(paper=>paper.outcome!=="verified")
      .map(paper=>({paperId:paper.paperId,outcome:paper.outcome,criteria:paper.criteria,verifiedCriteria:paper.verifiedCriteria})),
    expiresAt,gitCommit:commit,bundleSha256,activePath,disabledPath,guardPath,noncePath,
    activeSha256:sha256(active),disabledSha256:sha256(fs.readFileSync(disabledPath)),
    instruction:"Apply guard SQL only to the exact disposable stage, deploy active source with verify_jwt=true, POST {} with the private nonce header, then deploy disabled source and verify 403. Never print the nonce or server credentials."};
  fs.writeFileSync(path.join(outDir,"deployment.json"),JSON.stringify(metadata,null,2)+"\n");
  return metadata;
}

if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
  const metadata=await buildPoaStagingEdge();
  console.log(JSON.stringify(metadata,null,2));
}
