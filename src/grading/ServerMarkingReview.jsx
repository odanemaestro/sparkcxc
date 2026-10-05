import React,{useEffect,useState} from "react";
import "./serverMarking.css";

export default function ServerMarkingReview({supabase,attemptId}){
  const enabled=process.env.REACT_APP_SERVER_MARKING==="true";
  const [job,setJob]=useState(null),[busy,setBusy]=useState(false),[error,setError]=useState("");
  const [refresh,setRefresh]=useState(0);
  useEffect(()=>{
    setJob(null);setError("");
    if(!enabled||!attemptId||!supabase?.from)return;
    let cancelled=false,timer;
    const poll=async()=>{
      try{
        const {data,error}=await supabase.from("spark_marking_jobs").select("id,status,result,error_code")
          .eq("attempt_id",attemptId).order("created_at",{ascending:false}).limit(1).maybeSingle();
        if(cancelled)return;
        if(error)throw error;
        setJob(data || null);
        if(data && ["queued","processing"].includes(data.status))timer=setTimeout(poll,15000);
      }catch{if(!cancelled)setError("The deeper check status could not be loaded. Your original result is still available.");}
    };
    poll();
    return ()=>{cancelled=true;clearTimeout(timer);};
  },[enabled,attemptId,supabase,refresh]);
  if(!enabled)return null;
  async function enqueue(){
    setBusy(true);setError("");
    try{
      const {data,error}=await supabase.rpc("spark_enqueue_marking",{p_attempt_id:attemptId});
      if(error)throw error;
      setJob(Array.isArray(data)?data[0]:data);
      setRefresh(value=>value+1);
    }catch{setError("A deeper check is not available right now. Your saved practice result is unchanged; try again later.");}
    finally{setBusy(false);}
  }
  const result=job?.result;
  return <section className="spark-marking-review" aria-label="Deeper automated marking">
    <h2>Deeper automated check</h2>
    <p>Checks written answers against the question rubric and compares two automated assessments. Scores remain practice estimates.</p>
    {!attemptId&&<p>A saved online attempt is needed for this check. Your current feedback remains available.</p>}
    {attemptId&&!job&&<button type="button" disabled={busy} onClick={enqueue}>{busy?"Requesting check…":"Check written answers"}</button>}
    {job&&["queued","processing"].includes(job.status)&&<p role="status">{job.status==="queued"?"Your check is queued. You can leave this page and return later.":"Your answers are being checked automatically."}</p>}
    {job?.status==="failed"&&<p role="status">The deeper check could not be completed after automatic retries. Your original result remains available.</p>}
    {result&&<><p><strong>{result.score===null?`${result.minScore}–${result.maxScore}`:result.score} / {result.maxMarks}</strong>{result.uncertain?" — some criteria have a narrow score range":" — automated practice estimate"}</p>
      {(result.criteria || []).map(c=>{
        const ranged=c.marks===null&&Number.isFinite(c.minMarks)&&Number.isFinite(c.maxPossibleMarks);
        const narrow=ranged&&(c.maxPossibleMarks-c.minMarks)<=1;
        return <details key={c.id}>
          <summary>{c.id}: {ranged?`${c.minMarks}–${c.maxPossibleMarks}/${c.maxMarks}`:c.marks===null?"Uncertain":`${c.marks}/${c.maxMarks}`}</summary>
          <p>{narrow?"Both automated checks rated this response very similarly and differed by only one mark.":c.feedback}</p>
          {c.marks===null&&(c.passes||[]).map((pass,index)=><div key={index} className="spark-marking-pass"><strong>Check {index+1}: {pass.marks}/{c.maxMarks}</strong><p>{pass.feedback}</p></div>)}
          {(c.evidence || []).map((e,i)=><blockquote key={i}>{e.quote}</blockquote>)}
        </details>;
      })}</>}
    {error&&<p role="status">{error}</p>}
  </section>;
}
