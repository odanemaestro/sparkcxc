import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const LOCAL_ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const OA_WORKER_STAGE_REF='cfqetgozfxmavwexhrxz';
const hash=value=>createHash('sha256').update(value).digest('hex');
const swap=(text,from,to)=>{assert.equal(text.split(from).length,2,'Unexpected canonical worker authentication; inspect before deploying');return text.replace(from,()=>to);};
/** Package only the disposable stage. The canonical production entry stays unchanged. */
export function buildOaStagingWorker({root=LOCAL_ROOT,outDir='.audit-output/oa-staging-worker'}={}){
 root=path.resolve(root);outDir=path.resolve(root,outDir);
 assert(outDir.startsWith(path.resolve(root,'.audit-output')+path.sep),'Staging worker files must stay inside ignored audit output');
 const read=file=>fs.readFileSync(path.join(root,file),'utf8');
 const marker=read('supabase/functions/_shared/server-marker-v2.mjs');
 const checksum=read('supabase/functions/_shared/server-marker-v2-checksum.mjs');
 const bundleSha256=hash(marker),expected=/BUNDLE_SHA256\s*=\s*["']([a-f0-9]{64})/.exec(checksum)?.[1];
 assert.equal(bundleSha256,expected,'Rebuild the examiner and checksum together');
 const version=JSON.parse(read('node_modules/@supabase/supabase-js/package.json')).version;assert.match(version,/^\d+\.\d+\.\d+$/);
 let entry=read('supabase/functions/mark-paper2-v2-shadow/index.ts');
 entry=swap(entry,'import { serviceRoleJwtFromRequest } from "./worker-auth.mjs";','import { stageServiceKeyFromRequest } from "./stage-worker-auth.mjs";');
 entry=swap(entry,'const incoming=serviceRoleJwtFromRequest(req.headers.get("authorization"),endpoint);','const incoming=await stageServiceKeyFromRequest(req.headers.get("apikey"),endpoint,{serviceRoleKey:Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),secretKeys:Deno.env.get("SUPABASE_SECRET_KEYS")});');
 entry=swap(entry,'npm:@supabase/supabase-js@2.57.0','npm:@supabase/supabase-js@'+version);
 entry=entry.replace(/ \/\/ The Supabase gateway MUST[^\n]*\n \/\/ Restrict signed tokens[^\n]*/,' // Fixed disposable stage: authenticate the private service API key in constant time.\n // Browser and anonymous keys cannot claim or complete marking jobs.');
 entry=entry.replace(/ \/\/ Avoid comparing[^\n]*\n \/\/ SUPABASE_SERVICE_ROLE_KEY[^\n]*/,' // Use only the server credential validated against this stage environment.');
 const auth='const POA_STAGE_REF="'+OA_WORKER_STAGE_REF+'";\nconst POA_STAGE_URL="https://'+OA_WORKER_STAGE_REF+'.supabase.co";\n'+read('tools/poa-stage-worker-auth.mjs').replace(/^import[^\n]*\n/,'');
 const files=[{name:'index.ts',content:entry},{name:'server-marker-v2.mjs',content:marker},{name:'server-marker-v2-checksum.mjs',content:checksum},{name:'stage-worker-auth.mjs',content:auth}];
 fs.mkdirSync(outDir,{recursive:true});for(const file of files)fs.writeFileSync(path.join(outDir,file.name),file.content);
 const metadata={projectRef:OA_WORKER_STAGE_REF,functionName:'oa-staging-paper2-worker',entrypointPath:'index.ts',verifyJwt:false,authentication:'fixed-stage service API key, compared in constant time',bundleSha256,outDir,files:files.map(f=>({name:f.name,sha256:hash(f.content)}))};
 fs.writeFileSync(path.join(outDir,'deployment.json'),JSON.stringify(metadata,null,2)+'\n');return metadata;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)console.log(JSON.stringify(buildOaStagingWorker(),null,2));
