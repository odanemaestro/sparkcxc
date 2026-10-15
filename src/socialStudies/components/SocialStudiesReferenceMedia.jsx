import React, { useState } from "react";
import { socialStudiesMediaForTopic } from "../data/socialStudiesReferenceMedia";
import "./socialStudiesReferenceMedia.css";

function SocialStudiesMediaItem({item}) {
  const [loadError,setLoadError]=useState(false);
  const [playRequested,setPlayRequested]=useState(false);
  const isVideo=item.kind==="video";
  return <figure className="ss-reference-card">
    <div className="ss-reference-stage">
      {loadError ? <div role="status" className="ss-reference-fallback">
        <strong>Media unavailable</strong>
        <p>This visual is temporarily unavailable. You can still study the lesson and visit the original source.</p>
        <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">View original source</a>
      </div> : isVideo ? (
        playRequested ? <video
          controls playsInline preload="none" aria-label={item.alt}
          onError={()=>setLoadError(true)}
        ><source src={item.mediaUrl} type="video/webm"/>Your browser cannot play this file. Please use the source link below.</video>
        : <div className="ss-reference-video-prompt">
          <span aria-hidden="true">▶</span>
          <strong>Short satellite animation</strong>
          <p>Play only when you are ready. This video is not part of your assessed practice.</p>
          <button type="button" onClick={()=>setPlayRequested(true)}>Load video</button>
        </div>
      ) : <a className="ss-reference-image-link" href={item.mediaUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open large image: ${item.title}`}>
          <img src={item.mediaUrl} alt={item.alt} loading="lazy" decoding="async" onError={()=>setLoadError(true)}/>
          <span>View larger <span aria-hidden="true">↗</span></span>
        </a>}
    </div>
    <figcaption>
      <span className="ss-reference-eyebrow">{isVideo ? "Animation" : "Visual reference"}</span>
      <strong>{item.title}</strong>
      <p>{item.question}</p>
      {item.note && <p className="ss-reference-note">{item.note}</p>}
      <div className="ss-reference-credits">
        <span>Credit: {item.author}</span>
        <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Source</a>
        <span aria-hidden="true">·</span>
        <a href={item.licenseUrl} target="_blank" rel="noopener noreferrer">{item.license}</a>
      </div>
    </figcaption>
  </figure>;
}

export default function SocialStudiesReferenceMedia({topicId}) {
  const items=socialStudiesMediaForTopic(topicId);
  if(!items.length)return null;
  return <section id="spark-social-visuals" className="ss-reference-section" aria-label="Social Studies visual references">
    <header className="ss-reference-heading">
      <span>See and understand</span>
      <h3>Examples and visual guides</h3>
      <p>Use these maps, diagrams, photographs and animations to connect the lesson to real Caribbean experiences. Check dates and sources before drawing conclusions.</p>
    </header>
    <div className="ss-reference-grid">{items.map(item=><SocialStudiesMediaItem item={item} key={item.file}/>)}</div>
  </section>;
}
