import assert from "node:assert/strict";
import {build} from "esbuild";
import {createHash} from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {fileURLToPath,pathToFileURL} from "node:url";
import {POA_STAGE_REF,POA_STAGE_URL} from "./poa-staging-edge-runtime.mjs";

const localRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const sha256=value=>createHash("sha256").update(value).digest("hex");
function replaceOnce(source,from,to) {
  assert.equal(source.split(from).length,2,"Production worker authentication shape changed; review the stage adapter");
  return source.replace(from,to);
}

export function adaptStageWorkerSource(original,supabaseVersion) {
  assert.match(supabaseVersion,/^\d+\.\d+\.\d+$/);
  let adapted=original.replace(/\r\n/g,"\n");
  adapted=replaceOnce(adapted,'import { serviceRoleJwtFromRequest } from "./worker-auth.mjs";',
    'import { stageServiceKeyFromRequest } from "./stage-worker-auth.mjs";');
  adapted=replaceOnce(adapted,'import { createClient } from "npm:@supabase/supabase-js@2.57.0";',
    `import { createClient } from "npm:@supabase/supabase-js@${supabaseVersion}";`);
  adapted=replaceOnce(adapted,` // The Supabase gateway MUST verify JWT signatures (verify_jwt=true).
 // Restrict signed tokens further to service_role and this exact project.
 const incoming=serviceRoleJwtFromRequest(req.headers.get("authorization"),endpoint);`,
    ` // Disposable-stage API-key authentication: deploy this adapter with verify_jwt=false.
 // The exact hosted stage and the server-held secret are checked before any RPC.
 const incoming=await stageServiceKeyFromRequest(req.headers.get("apikey"),endpoint,{
  serviceRoleKey:Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),secretKeys:Deno.env.get("SUPABASE_SECRET_KEYS")
 });`);
  adapted=replaceOnce(adapted,` // Avoid comparing against a separately provisioned, potentially stale
 // SUPABASE_SERVICE_ROLE_KEY. Use the gateway-verified caller for RPC calls.`,
    " // Use only the exact server-held credential accepted by the stage adapter for RPC calls.");
  const protocolStart=" const client=createClient(endpoint,incoming,{";
  assert.equal(adapted.slice(adapted.indexOf(protocolStart)),original.replace(/\r\n/g,"\n").slice(original.replace(/\r\n/g,"\n").indexOf(protocolStart)),
    "Stage authentication must preserve the genuine examiner/RPC protocol unchanged");
  return {source:adapted,protocolSha256:sha256(adapted.slice(adapted.indexOf(protocolStart)))};
}

export async function buildPoaStageWorker({root=localRoot,outDir=".audit-output/poa-stage-worker"}={}) {
  root=path.resolve(root);outDir=path.resolve(root,outDir);
  assert(outDir.startsWith(path.join(root,".audit-output")+path.sep),"Stage deployment artifacts must stay in .audit-output");
  const productionPath=path.join(root,"supabase/functions/mark-paper2-v2-shadow/index.ts");
  const original=fs.readFileSync(productionPath,"utf8");
  const supabaseVersion=JSON.parse(fs.readFileSync(path.join(root,"node_modules/@supabase/supabase-js/package.json"),"utf8")).version;
  const adapted=adaptStageWorkerSource(original,supabaseVersion);
  const markerPath=path.join(root,"supabase/functions/_shared/server-marker-v2.mjs");
  const checksumPath=path.join(root,"supabase/functions/_shared/server-marker-v2-checksum.mjs");
  const marker=fs.readFileSync(markerPath);
  const bundleSha256=sha256(marker);
  assert(fs.readFileSync(checksumPath,"utf8").includes(JSON.stringify(bundleSha256)),"Rebuild the marker checksum before staging");
  fs.mkdirSync(outDir,{recursive:true});
  const indexPath=path.join(outDir,"index.mjs");
  await build({absWorkingDir:root,stdin:{contents:adapted.source,resolveDir:outDir,sourcefile:"poa-stage-worker-entry.ts",loader:"ts"},
    bundle:true,format:"esm",platform:"neutral",packages:"external",target:"es2022",legalComments:"none",minify:false,
    outfile:indexPath,logLevel:"warning",external:["./server-marker-v2.mjs","./server-marker-v2-checksum.mjs"],
    plugins:[{name:"fixed-stage-worker-auth",setup(plugin){plugin.onResolve({filter:/^\.\/stage-worker-auth\.mjs$/},()=>({
      path:path.join(root,"tools/poa-stage-worker-auth.mjs")}));}}]});
  const deployedMarkerPath=path.join(outDir,"server-marker-v2.mjs");
  const deployedChecksumPath=path.join(outDir,"server-marker-v2-checksum.mjs");
  fs.writeFileSync(deployedMarkerPath,marker);
  fs.copyFileSync(checksumPath,deployedChecksumPath);
  const metadata={projectRef:POA_STAGE_REF,projectUrl:POA_STAGE_URL,functionName:"mark-paper2-v2-shadow",verifyJwt:false,
    authentication:"Exact server-held service key in apikey header, constant-time digest comparison; fixed disposable stage only",
    supabaseVersion,bundleSha256,productionSourceSha256:sha256(original),protocolSha256:adapted.protocolSha256,
    files:[indexPath,deployedMarkerPath,deployedChecksumPath].map(file=>({path:file,name:path.basename(file),sha256:sha256(fs.readFileSync(file))}))};
  fs.writeFileSync(path.join(outDir,"deployment.json"),JSON.stringify(metadata,null,2)+"\n");
  return metadata;
}

if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)
  console.log(JSON.stringify(await buildPoaStageWorker(),null,2));
