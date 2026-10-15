import React,{useState} from "react";
import {referencesFor} from "./curatedStudyMedia";
import "./curatedStudyMedia.css";

function VisualCard({item}){
  const [failed,setFailed]=useState(false);
  const [requested,setRequested]=useState(false);
  const isVideo=item.kind==="video";
  return <figure className="spark-csm-card">
    <div className="spark-csm-media">
      {failed?<div className="spark-csm-fallback" role="status"><strong>Reference unavailable</strong><p>You can still use the lesson and practical activities.</p><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Open original source</a></div>
       :isVideo?(requested
        ?<video controls playsInline preload="none" aria-label={item.alt} onError={()=>setFailed(true)}><source type="video/webm" src={item.mediaUrl}/>Your browser cannot play this video.</video>
        :<div className="spark-csm-prompt"><span aria-hidden="true">▶</span><p>Watch the reference only when you are ready. It is not a graded activity.</p><button type="button" onClick={()=>setRequested(true)}>Load video</button></div>)
       :<a className="spark-csm-image" href={item.mediaUrl} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge image: ${item.title}`}><img src={item.mediaUrl} alt={item.alt} loading="lazy" decoding="async" onError={()=>setFailed(true)}/><span>View larger <span aria-hidden="true">↗</span></span></a>}
    </div>
    <figcaption>
      <span className="spark-csm-type">{isVideo?"Short video":"Reference diagram"}</span>
      <strong>{item.title}</strong>
      <p>{item.focus}</p>
      {item.note&&<p className="spark-csm-note">{item.note}</p>}
      <div className="spark-csm-credit"><span>Credit: {item.credit}</span><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Original source</a><span aria-hidden="true">·</span><a href={item.licenseUrl} target="_blank" rel="noopener noreferrer">{item.license}</a></div>
    </figcaption>
  </figure>;
}
export default function CuratedStudyMedia({subject,topicId}){
  const resources=referencesFor(subject,topicId);
  if(!resources.length)return null;
  return <section className="spark-csm" aria-label={subject==="physics"?"Physics visual references":"Information Technology visual references"}>
    <header className="spark-csm-heading">
      <span>Look closely</span>
      <h3>Examples and visual guides</h3>
      <p>These are reference examples to support the lesson. Use the existing SPARK simulations and practical tools to test your understanding.</p>
    </header>
    <div className="spark-csm-grid">{resources.map(item=><VisualCard item={item} key={item.file}/>)}</div>
  </section>;
}
