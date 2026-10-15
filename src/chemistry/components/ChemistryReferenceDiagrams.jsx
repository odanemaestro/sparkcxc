import React, { useState } from "react";
import { chemistryReferencesFor } from "../data/chemistryReferenceDiagrams";
import "./chemistryReferenceDiagrams.css";

function ReferenceFigure({ diagram }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="spark-chem-reference-figure">
      <div className="spark-chem-reference-visual">
        {failed ? (
          <div className="spark-chem-reference-fallback" role="status">
            <strong>Diagram unavailable right now.</strong>
            <p>The lesson notes and interactive experiment are still available. You can view this diagram at the original source.</p>
            <a href={diagram.sourceUrl} target="_blank" rel="noopener noreferrer">Open source image</a>
          </div>
        ) : (
          <a className="spark-chem-reference-image-link" href={diagram.imageUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size diagram: ${diagram.title}`}>
            <img src={diagram.imageUrl} alt={diagram.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
            <span>View larger <span aria-hidden="true">↗</span></span>
          </a>
        )}
      </div>
      <figcaption>
        <strong>{diagram.title}</strong>
        <p>{diagram.focus}</p>
        <div className="spark-chem-reference-credit">
          <span>Image: {diagram.author}</span>
          <a href={diagram.sourceUrl} target="_blank" rel="noopener noreferrer">Source</a>
          <span aria-hidden="true">·</span>
          <a href={diagram.licenseUrl} target="_blank" rel="noopener noreferrer">{diagram.license}</a>
        </div>
      </figcaption>
    </figure>
  );
}

export default function ChemistryReferenceDiagrams({ topicId }) {
  const diagrams = chemistryReferencesFor(topicId);
  if (!diagrams.length) return null;
  return (
    <section className="spark-chem-reference-section" aria-label="Chemistry reference diagrams">
      <header className="spark-chem-reference-heading">
        <span>Visual reference</span>
        <h3>See the chemistry</h3>
        <p>Use these labelled examples alongside the lesson notes. Tap a diagram to view it larger, then try the practical activity below.</p>
      </header>
      <div className="spark-chem-reference-grid">
        {diagrams.map(diagram => <ReferenceFigure key={diagram.file} diagram={diagram}/>)}
      </div>
    </section>
  );
}
