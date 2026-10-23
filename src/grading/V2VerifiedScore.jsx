import React,{useEffect,useRef,useState} from "react";
import {readServerExamV2Result} from "./serverExamAttempt";
import "./serverMarking.css";

const POLL_MS=20000;
const MAX_POLLS=30;

/**
 * The student's own SPARK V2 server result for a submitted Paper 2.
 * Shows a verified score only when the server published one; otherwise says
 * plainly that the score is still being checked or needs review, and that any
 * on-screen mark is a practice estimate.
 */
export default function V2VerifiedScore({supabase,attemptId,estimate=null,maxMarks,onResult}){
  const [result,setResult]=useState(null);
  const [polls,setPolls]=useState(0);
  const [refreshKey,setRefreshKey]=useState(0);
  const onResultRef=useRef(onResult);
  onResultRef.current=onResult;
  useEffect(()=>{
    if(!attemptId||!supabase?.rpc)return undefined;
    let cancelled=false,timer;
    const poll=async(count)=>{
      const next=await readServerExamV2Result({supabase,attemptId});
      if(cancelled)return;
      if(next.available){
        setResult(next);
        onResultRef.current?.(next);
      }
      setPolls(count);
      const pending=!next.available||["queued","running","retry","provisional"].includes(next.status);
      if(pending&&count<MAX_POLLS)timer=setTimeout(()=>poll(count+1),POLL_MS);
    };
    poll(1);
    return()=>{cancelled=true;clearTimeout(timer);};
  },[supabase,attemptId,refreshKey]);

  if(!attemptId||!supabase?.rpc)return null;
  const status=result?.status;
  if(status==="not-eligible")return null;
  const total=result?.maxMarks??maxMarks;
  let body;
  if(status==="verified"&&result.score!=null){
    body=<>
      <div className="spark-marking-score"><span>Verified score</span><strong>{Number(result.score)} / {Number(total)}</strong>
        <small>Marked on SPARK's server against the registered mark scheme</small></div>
    </>;
  }else if(status==="provisional"){
    body=<p role="status">Some answers could not be marked with certainty, so no final score has been published yet
      ({Number(result.unresolvedMarks)} of {Number(total)} marks need review).
      {estimate!=null&&<> Your on-screen mark of {estimate}/{maxMarks} is a practice estimate.</>}</p>;
  }else if(status==="failed"){
    body=<p role="status">Server marking could not be completed for this attempt. Your responses are saved
      {estimate!=null&&<> and your on-screen mark of {estimate}/{maxMarks} remains a practice estimate</>}.</p>;
  }else{
    body=<p role="status">{polls>=MAX_POLLS?"Your paper is still waiting to be marked on the server. Check back later.":
      "Your paper is being marked on SPARK's server. This usually takes two or three minutes."}</p>;
  }
  return <section className="spark-marking-review" aria-label="Server-verified score" aria-live="polite">
    <div className="spark-marking-review-head"><div><span className="spark-marking-eyebrow">SPARK server marking</span>
      <h2>Your verified result</h2></div></div>
    {body}
    {status!=="verified" && <button className="it-practice-secondary" type="button"
      onClick={()=>{setPolls(0);setRefreshKey(n=>n+1);}}>Check verified result</button>}
  </section>;
}
