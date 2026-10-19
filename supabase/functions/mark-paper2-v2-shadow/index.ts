import { createClient } from "npm:@supabase/supabase-js@2.57.0";

/**
 * Server-only V2 shadow-worker entrypoint.
 * No browser submission, rubric text or scores accepted as input.
 * It handles at most one server-verified paper per invocation.
 * Never writes to spark_exam_attempts or publishes a grade.
 */
const tokenEquals=(a:string,b:string)=>{
 if(!a||!b||a.length!==b.length)return false;
 let diff=0;
 for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);
 return diff===0;
};
Deno.serve(async(req:Request)=>{
 if(req.method!=="POST")return new Response("Method not allowed",{status:405});
 const key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||"";
 const endpoint=Deno.env.get("SUPABASE_URL")||"";
 const incoming=(req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");
 // Edge Function deployment must keep verify_jwt enabled, too.
 if(!key||!endpoint||!tokenEquals(incoming,key))
  return new Response("Unauthorized",{status:401});
 const client=createClient(endpoint,key,{
  auth:{persistSession:false,autoRefreshToken:false}
 });
 const {data:job,error:claimError}=await client.rpc("spark_v2_claim_next_shadow_job");
 if(claimError)return new Response(JSON.stringify({status:"worker-unavailable"}),
  {status:503,headers:{"content-type":"application/json"}});
 if(!job)return Response.json({status:"idle",processed:0});
 const fields=job as Record<string,unknown>;
 const criteria=fields.criteria;
 const responses=fields.responses;
 if(!Array.isArray(criteria)||criteria.length===0||
    !responses||typeof responses!=="object"||Array.isArray(responses))
  return Response.json({status:"invalid-server-source",processed:0},{status:500});
 const ids=new Set<string>();
 let total=0;
 for(const row of criteria){
  const c=row as Record<string,unknown>;
  if(typeof c?.id!=="string"||!c.id.trim()||ids.has(c.id)||
     !Number.isSafeInteger(c.maxMarks)||Number(c.maxMarks)<=0)
   return Response.json({status:"invalid-server-rubric",processed:0},{status:500});
  ids.add(c.id);
  total+=Number(c.maxMarks);
 }
 if(!Number.isSafeInteger(total)||total<=0||total>1000)
  return Response.json({status:"invalid-server-ceiling",processed:0},{status:500});
 // All criteria remain unresolved until independently reconciled.
 const {data:accepted,error:finishError}=await client.rpc("spark_v2_finish_shadow_job",{
  p_job_id:fields.jobId,p_lease_token:fields.leaseToken,p_reviewed_items:criteria.length
 });
 if(finishError||accepted!==true)
  return Response.json({status:"lease-lost",processed:0},{status:409});
 return Response.json({status:"provisional",processed:1,
  confirmedMarks:0,unresolvedMarks:total,canPublishFinalScore:false});
});
