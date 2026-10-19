import { evaluateExistingSubjectPaper2V2 } from "./server-marker-v2.mjs";
import { BUNDLE_SHA256 } from "./server-marker-v2-checksum.mjs";
import { createClient } from "npm:@supabase/supabase-js@2.57.0";
import { serviceRoleJwtFromRequest } from "./worker-auth.mjs";

/**
 * Server-only V2 shadow-worker entrypoint.
 * No browser submission, rubric text or scores accepted as input.
 * It handles at most one server-verified paper per invocation.
 * Publishes a grade only if every registered criterion is resolved by
 * the source examiner and the private database independently validates it.
 */
Deno.serve(async(req:Request)=>{
 if(req.method!=="POST")return new Response("Method not allowed",{status:405});
 const endpoint=Deno.env.get("SUPABASE_URL")||"";
 // The Supabase gateway MUST verify JWT signatures (verify_jwt=true).
 // Restrict signed tokens further to service_role and this exact project.
 const incoming=serviceRoleJwtFromRequest(req.headers.get("authorization"),endpoint);
 if(!incoming)return new Response("Unauthorized",{status:401});
 // Avoid comparing against a separately provisioned, potentially stale
 // SUPABASE_SERVICE_ROLE_KEY. Use the gateway-verified caller for RPC calls.
 const client=createClient(endpoint,incoming,{
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
 // The bundle uses the same subject-specific deterministic graders as SPARK.
 // Registered rubric and submitted responses come only from the private queue.
 let examination;
 try {
  examination=evaluateExistingSubjectPaper2V2({
   subjectId:fields.subjectId,paperId:fields.paperId,criteria,responses
  });
 } catch {
  // Never turn a scoring exception into a zero, and never expose script text.
  return Response.json({status:"examiner-review-required",processed:0},{status:503});
 }
 if(examination.maxMarks!==total || examination.examinedParts!==criteria.length)
  return Response.json({status:"source-reconciliation-error",processed:0},{status:503});
 const {data:completed,error:finishError}=await client.rpc(
  "spark_v2_complete_subject_job",{
   p_job_id:fields.jobId,p_lease_token:fields.leaseToken,
   p_rows:examination.rows,p_bundle_sha256:BUNDLE_SHA256
  });
 if(finishError||!completed||completed.status==="stale-lease")
  return Response.json({status:"lease-lost",processed:0},{status:409});
 return Response.json({status:completed.status,processed:1,
  examinedParts:examination.examinedParts,
  score:completed.score,maxMarks:completed.maxMarks,
  unresolvedMarks:completed.unresolvedMarks,
  canPublishFinalScore:completed.status==="verified"});
});
