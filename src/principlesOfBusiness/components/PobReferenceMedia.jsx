import React,{useState} from "react";
import {pobMediaForTopic} from "../data/pobReferenceMedia";
import "./pobReferenceMedia.css";

function ReferenceCard({item}){
 const [failed,setFailed]=useState(false);
 return <figure className="pob-ref-card">
  <div className="pob-ref-visual">
   {failed?<div role="status" className="pob-ref-error">
    <strong>Visual temporarily unavailable</strong><p>Continue the lesson and open the original source when you have internet access.</p>
    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Open original diagram</a>
   </div>:<a href={item.mediaUrl} className="pob-ref-image" target="_blank" rel="noopener noreferrer" aria-label={"Enlarge image: "+item.title}>
    <img loading="lazy" decoding="async" src={item.mediaUrl} alt={item.alt} onError={()=>setFailed(true)}/>
    <span>View larger ↗</span></a>}
  </div>
  <figcaption>
    <small>Educational diagram</small><strong>{item.title}</strong>
    <p>{item.focus}</p>
    {item.note&&<p className="pob-ref-note">{item.note}</p>}
    <div className="pob-ref-credit"><span>Credit: {item.author}</span>
      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Original source</a><span aria-hidden="true">·</span>
      <a href={item.licenseUrl} target="_blank" rel="noopener noreferrer">{item.license}</a></div>
  </figcaption>
 </figure>;
}
export default function PobReferenceMedia({topic}){
 const items=pobMediaForTopic(topic);
 if(!items.length)return null;
 return <section className="pob-ref-section" id="pob-lesson-visuals" aria-label="Principles of Business visual references">
  <header><span>Understand by seeing</span><h3>Examples and visual guides</h3>
   <p>Explore these real educational diagrams alongside the lesson, then apply them to a Caribbean business or community.</p></header>
  <div className="pob-ref-grid">{items.map(item=><ReferenceCard key={item.file} item={item}/>)}</div>
 </section>;
}
