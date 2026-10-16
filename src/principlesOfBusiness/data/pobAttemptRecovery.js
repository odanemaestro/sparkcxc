// Restore only trusted shape, never reset an expired exam's timer.
export function restorePobAttempt(saved,paperId,questionCount,now=Date.now()){
 if(!saved||saved.paperId!==paperId||!["exam","review"].includes(saved.phase)||
    !saved.attemptId||!saved.answers||typeof saved.answers!=="object"||Array.isArray(saved.answers))return null;
 const index=Number.isInteger(saved.index)?Math.min(Math.max(0,saved.index),questionCount-1):0;
 const answers=Object.fromEntries(Object.entries(saved.answers).filter(([key,value])=>
   typeof key==="string"&&(typeof value==="string"&&value.length<=20000)));
 const flags=saved.flags&&typeof saved.flags==="object"&&!Array.isArray(saved.flags)?saved.flags:{};
 if(saved.phase==="exam"){
  if(!Number.isFinite(saved.deadline)||saved.deadline<=0)return null;
  if(saved.deadline<=now)return {...saved,index,answers,flags,phase:"review",reason:"timer",submittedAt:now};
 }
 return {...saved,index,answers,flags};
}

// Compute the displayed countdown from the saved deadline, not a fresh full duration.
export function pobRemainingSeconds(attempt,durationSeconds,now=Date.now()){
 if(attempt?.phase!=="exam"||!Number.isFinite(attempt.deadline))return durationSeconds;
 return Math.max(0,Math.ceil((attempt.deadline-now)/1000));
}
