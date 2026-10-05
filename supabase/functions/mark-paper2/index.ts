import {createClient} from "@supabase/supabase-js";
import {buildTrustedAssessment,requestSemanticPass,reconcileSemanticPasses,SEMANTIC_MARKING_REVISION} from "../_shared/server-marker.mjs";

// Invoke on a schedule using x-spark-marker-secret. This endpoint accepts no
// candidate payload, rubric or job ID from the caller; it only leases DB jobs.
const handler = {
  async fetch(req:Request):Promise<Response>{
    if(req.method!=="POST")return new Response("Method not allowed",{status:405});
    const secret=Deno.env.get("SPARK_MARKER_SECRET");
    if(!secret || req.headers.get("x-spark-marker-secret")!==secret)return new Response("Unauthorized",{status:401});
    const apiKey=Deno.env.get("OPENAI_API_KEY"),model=Deno.env.get("SPARK_MARKING_MODEL");
    if(!apiKey||!model)return new Response("Marker not configured",{status:503});
    const url=Deno.env.get("SUPABASE_URL"),key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if(!url||!key)return new Response("Database not configured",{status:503});
    const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
    const {data:jobs,error}=await db.rpc("spark_claim_marking",{p_limit:2});
    if(error)return new Response("Queue unavailable",{status:503});
    const outcomes=await Promise.all((jobs || []).map(async(job:any)=>{
      try{
        if(job.revision!==SEMANTIC_MARKING_REVISION)throw new Error("unsupported_revision");
        const {data:attempt,error}=await db.from("spark_exam_attempts").select("subject_id,paper,status,bank_version,metadata,response_snapshot").eq("id",job.attempt_id).single();
        if(error||!attempt)throw new Error("attempt_unavailable");
        const pack=buildTrustedAssessment(attempt);
        const [first,second]=await Promise.all([1,2].map(pass=>requestSemanticPass({model,apiKey,items:pack.items,responses:pack.responses,pass})));
        const semantic=reconcileSemanticPasses(first,second,pack.items,pack.responses);
        const result={revision:SEMANTIC_MARKING_REVISION,model,authority:"automated-practice-estimate",
          maxMarks:pack.maxMarks,score:semantic.uncertain||pack.unassessedMarks?null:pack.deterministicScore+semantic.score,
          minScore:pack.deterministicScore+semantic.minScore,maxScore:Math.min(pack.maxMarks,pack.deterministicScore+semantic.maxScore+pack.unassessedMarks),
          baselineScore:pack.baselineScore,unassessedMarks:pack.unassessedMarks,uncertain:semantic.uncertain||pack.unassessedMarks>0,
          criteria:semantic.criteria};
        const {data:accepted,error:finishError}=await db.rpc("spark_finish_marking",{p_job_id:job.id,p_claim_token:job.claim_token,p_result:result});
        if(finishError||!accepted)return "lease_lost";
        return "completed";
      }catch(error){
        // Never store raw provider messages or student response text in logs.
        const known=new Set(["provider_rate_limit","provider_unavailable","provider_incomplete","provider_refusal","unsupported_revision","unsupported_bank_version","marking_input_too_large"]);
        const code=error instanceof Error&&known.has(error.message)?error.message:"marking_validation_failed";
        await db.rpc("spark_finish_marking",{p_job_id:job.id,p_claim_token:job.claim_token,p_error_code:code});
        return "retry_scheduled";
      }
    }));
    return Response.json({processed:outcomes.length,outcomes});
  },
};

Deno.serve(handler.fetch);

