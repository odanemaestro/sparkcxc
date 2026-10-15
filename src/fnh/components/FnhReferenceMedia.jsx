import React, { useState } from "react";
import { fnhMediaForTopic } from "../data/fnhReferenceMedia";
import "./fnhReferenceMedia.css";

function FnhVisualItem({ item }) {
  const [failed, setFailed] = useState(false);
  const isVideo = item.kind === "video";
  const [playRequested, setPlayRequested] = useState(false);
  return <figure className="spark-fnh-ref-card">
    <div className="spark-fnh-ref-stage">
      {failed ? <div className="spark-fnh-ref-fallback" role="status">
        <strong>This reference could not be loaded.</strong>
        <p>The lesson content is still available. Open the source page to view the media.</p>
        <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">View original source</a>
      </div> : isVideo ? (
        playRequested ?
        <video
          controls
          playsInline
          preload="none"
          aria-label={item.alt}
          onError={() => setFailed(true)}
        >
          <source src={item.mediaUrl} type="video/webm"/>
          Your browser cannot play this video. Use the source link below.
        </video> :
        <div className="spark-fnh-ref-video-prompt">
          <span aria-hidden="true" className="spark-fnh-ref-play-icon">▶</span>
          <strong>Short learning video</strong>
          <p>Play when ready. Videos do not autoplay or count toward lesson marks.</p>
          <button type="button" onClick={() => setPlayRequested(true)}>Load video</button>
        </div>
      ) : (
        <a href={item.mediaUrl} target="_blank" rel="noopener noreferrer" className="spark-fnh-ref-image-link" aria-label={`View larger image: ${item.title}`}>
          <img src={item.mediaUrl} alt={item.alt} loading="lazy" decoding="async" onError={() => setFailed(true)}/>
          <span>View larger <span aria-hidden="true">↗</span></span>
        </a>
      )}
    </div>
    <figcaption>
      <div className="spark-fnh-ref-caption-top">
        <span className="spark-fnh-ref-type">{isVideo ? "Watch and learn" : "Visual example"}</span>
        <strong>{item.title}</strong>
      </div>
      <p>{item.focus}</p>
      {item.note && <p className="spark-fnh-ref-context">{item.note}</p>}
      <div className="spark-fnh-ref-credit">
        <span>By {item.author}</span>
        <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Original source</a>
        <span aria-hidden="true">·</span>
        <a href={item.licenceUrl} target="_blank" rel="noopener noreferrer">{item.licence}</a>
      </div>
    </figcaption>
  </figure>;
}

export default function FnhReferenceMedia({ topicId }) {
  const items=fnhMediaForTopic(topicId);
  if (!items.length) return null;
  return <section className="spark-fnh-reference-media" aria-label="Food Nutrition and Health visual references" id="fnh-lesson-visuals">
    <header>
      <span>Learn by seeing</span>
      <h3>Examples and visual guides</h3>
      <p>Study each illustration, photo or video alongside your lesson notes. The questions and practical activities below remain part of the lesson.</p>
    </header>
    <div className="spark-fnh-ref-grid">
      {items.map(item=><FnhVisualItem key={item.file} item={item}/>)}
    </div>
  </section>;
}
