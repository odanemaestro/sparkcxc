import React, { useState } from "react";
import { GEOGRAPHY_FIGURES } from "../data/geographyFigures";
import "./geographyLearning.css";

function StudyFigure({ figure }) {
  const [failed, setFailed] = useState(false);
  return <figure className="geo-study-figure">
    <figcaption><strong>{figure.title}</strong><p>{figure.caption}</p></figcaption>
    {figure.src && !failed && <a href={figure.href || figure.src} target="_blank" rel="noreferrer" aria-label={`Open ${figure.title} at full size`}>
      <img src={figure.src} alt={figure.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
    </a>}
    <div className="geo-figure-links">
      {figure.href && (!figure.src || failed) && <a href={figure.href} target="_blank" rel="noreferrer">Open figure</a>}
      <a href={figure.sourceUrl} target="_blank" rel="noreferrer">{figure.source}</a>
    </div>
  </figure>;
}

export default function GeographyLessonFigures({ topic }) {
  const figures = GEOGRAPHY_FIGURES[topic.id.slice(4)];
  if (!figures?.length) return null;
  return <section className="geo-study-figures" aria-label="Geography diagrams">
    {figures.map(figure => <StudyFigure key={figure.title} figure={figure} />)}
  </section>;
}
