/** Fixed-purpose, disposable-stage-only HTTP adapter. No student input is accepted. */
export const POA_STAGE_REF="cfqetgozfxmavwexhrxz";
export const POA_STAGE_URL=`https://${POA_STAGE_REF}.supabase.co`;
export const POA_STAGE_CLAIM_RPC="poa_claim_staging_rehearsal";

const headers={"content-type":"application/json; charset=utf-8","cache-control":"no-store"};
const reply=(status,body)=>new Response(JSON.stringify(body),{status,headers});

export function equalSha256(left,right) {
  // Both sides are fixed-length digests. Do not return at the first differing byte.
  let different=left.length^right.length;
  for(let i=0;i<64;i++)different|=(left.charCodeAt(i)||0)^(right.charCodeAt(i)||0);
  return different===0;
}

const digest=async text=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",
  new TextEncoder().encode(text))),byte=>byte.toString(16).padStart(2,"0")).join("");

async function emptyBody(request) {
  if(!request.body)return true;
  const reader=request.body.getReader();
  const bytes=[];
  try {
    while(true) {
      const {done,value}=await reader.read();
      if(done)break;
      if(bytes.length+value.byteLength>2){await reader.cancel();return false;}
      bytes.push(...value);
    }
    return bytes.length===0 || (bytes.length===2 && bytes[0]===123 && bytes[1]===125);
  } finally {reader.releaseLock();}
}

export function sanitizeStagingReport(report,paperId,secrets=[]) {
  const text=value=>{
    let result=String(value??"");
    for(const secret of secrets.filter(Boolean))result=result.split(secret).join("[redacted]");
    return result.replace(/\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g,"[redacted JWT]").slice(0,1800);
  };
  const date=value=>typeof value==="string" && Number.isFinite(Date.parse(value))?value:undefined;
  const cleanup={passed:report?.cleanup?.passed===true,
    fixtureAccounts:Number.isSafeInteger(report?.cleanup?.fixtureAccounts)?report.cleanup.fixtureAccounts:0,
    errors:Array.isArray(report?.cleanup?.errors)?report.cleanup.errors.map(text):[]};
  return {kind:"live-supabase-http",projectRef:POA_STAGE_REF,subjectId:"principles-of-accounts",paperId,
    ...(typeof report?.runId==="string"?{runId:text(report.runId)}:{}),
    startedAt:date(report?.startedAt),finishedAt:date(report?.finishedAt),
    passed:report?.passed===true && cleanup.passed,cleanup,
    checks:Array.isArray(report?.checks)?report.checks.map(check=>({name:text(check.name),passed:check.passed===true,
      ...(typeof check.status==="string"?{status:text(check.status)}:{}),
      ...(check.score===null || Number.isFinite(check.score)?{score:check.score}:{})})):[],
    ...(report?.failure?{failure:text(report.failure)}:{}),
  };
}

/** Dependencies are fixed by the generated entry point, never taken from HTTP. */
export function createStageRehearsalHandler({nonceSha256,expiresAt,paperIds,verification,
  runStaging,env,claimNonce,clock=()=>Date.now()}) {
  if(!/^[a-f0-9]{64}$/.test(nonceSha256))throw new Error("Invalid rehearsal authorization digest");
  if(!Number.isFinite(Date.parse(expiresAt)))throw new Error("Invalid rehearsal authorization expiry");
  if(!Array.isArray(paperIds) || !paperIds.length || !paperIds.every(id=>typeof id==="string" && /^POA-[A-Z0-9-]+$/.test(id)))
    throw new Error("Rehearsal requires fixed Accounts paper IDs");
  let claimedHere=false;
  return async request=>{
    if(request.method!=="POST")return reply(405,{error:"Use POST for this fixed staging rehearsal"});
    if(env("SUPABASE_URL")!==POA_STAGE_URL)return reply(403,{error:"This rehearsal is restricted to its disposable stage"});
    if(clock()>=Date.parse(expiresAt))return reply(403,{error:"Rehearsal authorization expired"});
    const token=request.headers.get("x-poa-staging-nonce")||"";
    if(!/^[a-f0-9]{64}$/.test(token) || !equalSha256(await digest(token),nonceSha256))
      return reply(403,{error:"Rehearsal authorization denied"});
    // The request cannot select SQL, projects, papers, responses or fixture data.
    if(new URL(request.url).search)return reply(400,{error:"This rehearsal accepts no query parameters"});
    if((request.headers.get("content-length") && Number(request.headers.get("content-length"))>2))
      return reply(400,{error:"This rehearsal accepts an empty request body"});
    try {if(!await emptyBody(request))return reply(400,{error:"This rehearsal accepts an empty request body"});}
    catch {return reply(400,{error:"Cannot read rehearsal request body"});}
    if(claimedHere)return reply(409,{error:"Rehearsal authorization has already been consumed"});
    const anonKey=env("SUPABASE_ANON_KEY"),serviceKey=env("SUPABASE_SERVICE_ROLE_KEY");
    if(!anonKey || !serviceKey)return reply(503,{error:"Staging server credentials are unavailable"});
    // PostgreSQL atomically claims the nonce across separate concurrent isolates.
    let claimed;
    try {claimed=await claimNonce({url:POA_STAGE_URL,serviceKey});}
    catch {return reply(503,{error:"Could not claim rehearsal authorization"});}
    if(claimed!==true)return reply(409,{error:"Rehearsal authorization has already been consumed or expired"});
    claimedHere=true;
    const reports=[];
    for(const paperId of paperIds) {
      let report;
      try {report=await runStaging({url:POA_STAGE_URL,ref:POA_STAGE_REF,anonKey,serviceKey},
        {verification,paperId,throwOnFailure:false});}
      catch(error) {
        const diagnostic=sanitizeStagingReport({failure:error?.message||"unknown bootstrap error"},paperId,[anonKey,serviceKey,token]);
        console.error("Accounts staging bootstrap:",diagnostic.failure);
        report={passed:false,failure:"Staging runner failed before returning a complete report",
        cleanup:{passed:false,errors:["Inspect stage fixture cleanup before retrying"]}};}
      const sanitized=sanitizeStagingReport(report,paperId,[anonKey,serviceKey,token]);
      reports.push(sanitized);
      if(!sanitized.passed)break;
    }
    const passed=reports.length===paperIds.length && reports.every(report=>report.passed);
    return reply(passed?200:500,{kind:"hosted-accounts-staging-rehearsal",projectRef:POA_STAGE_REF,
      passed,cleanup:{passed:reports.every(report=>report.cleanup.passed)},papers:reports});
  };
}
