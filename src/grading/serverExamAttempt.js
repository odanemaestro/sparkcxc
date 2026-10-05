import { attemptSnapshotHash } from "./attemptProvenance";

export async function startServerExamAttempt({
  supabase,subjectId,paper,mode="timed",durationSeconds,
  bankVersion=null,rubricVersion=null,graderVersion=null,metadata={},
}={}){
  if(!supabase?.rpc) return {available:false};
  try{
    const {data,error}=await supabase.rpc("spark_start_exam_attempt",{
      p_subject_id:subjectId,p_paper:paper,p_session_mode:mode,p_duration_seconds:durationSeconds,
      p_bank_version:bankVersion,p_rubric_version:rubricVersion,p_grader_version:graderVersion,
      p_metadata:metadata,
    });
    if(error) throw error;
    const row=Array.isArray(data)?data[0]:data;
    return row ? {available:true,...row} : {available:false};
  }catch(error){
    console.warn("Server exam attempt start unavailable",error);
    return {available:false,error};
  }
}

export async function readServerExamClock({supabase,attemptId}={}){
  if(!supabase?.rpc || !attemptId) return {available:false};
  try{
    const {data,error}=await supabase.rpc("spark_exam_attempt_clock",{p_attempt_id:attemptId});
    if(error) throw error;
    const row=Array.isArray(data)?data[0]:data;
    return row ? {available:true,...row} : {available:false};
  }catch(error){
    return {available:false,error};
  }
}

export async function submitServerExamAttempt({
  supabase,attemptId,responses={},score,maxScore,metadata={},
}={}){
  if(!supabase?.rpc || !attemptId) return {available:false};
  try{
    const {data,error}=await supabase.rpc("spark_submit_exam_attempt",{
      p_attempt_id:attemptId,
      p_response_snapshot:responses,
      p_response_snapshot_hash:attemptSnapshotHash(responses),
      p_score:score,
      p_max_score:maxScore,
      p_metadata:metadata,
    });
    if(error) throw error;
    const row=Array.isArray(data)?data[0]:data;
    return row ? {available:true,...row} : {available:false};
  }catch(error){
    console.warn("Server exam attempt submit unavailable",error);
    return {available:false,error};
  }
}
