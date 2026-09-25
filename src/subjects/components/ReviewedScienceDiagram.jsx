import React, { useLayoutEffect, useRef, useState } from "react";
import registry from "../data/reviewedScienceDiagrams.json";
import { scienceDiagramSignature } from "./reviewedScienceDiagramModel";
import "./reviewedScienceDiagram.css";

export default function ReviewedScienceDiagram({ site, children }) {
  const originalRef = useRef(null);
  const [selection, setSelection] = useState(null);
  const dialogRef = useRef(null);
  useLayoutEffect(() => {
    const signature = scienceDiagramSignature(originalRef.current?.querySelector("svg"));
    setSelection(registry[site]?.[signature] || null);
  }, [children, site]);

  const base = process.env.PUBLIC_URL || "";
  const sources = selection?.sources || [];
  return <div className="spark-reviewed-science-diagram">
    <div ref={originalRef} hidden={Boolean(selection)}>{children}</div>
    {selection && selection.type !== "remove" && <figure>
      {selection.type === "text" ? <div className="spark-science-process">
        {selection.steps.map((step, index) => <React.Fragment key={step}>
          {index > 0 && <span aria-hidden="true">→</span>}<p>{step}</p>
        </React.Fragment>)}
      </div> : <>
        <button type="button" className="spark-science-image-button" onClick={() => dialogRef.current?.showModal()} aria-label={`Enlarge: ${selection.title}`}>
          <img src={`${base}${selection.path}`} alt={selection.title} loading="lazy" />
        </button>
        <dialog ref={dialogRef} className="spark-science-image-dialog">
          <header><strong>{selection.title}</strong><button type="button" onClick={() => dialogRef.current?.close()}>Close</button></header>
          <img src={`${base}${selection.path}`} alt={selection.title} />
        </dialog>
      </>}
      {selection.caption && <figcaption>{selection.caption}</figcaption>}
      {sources.length > 0 && <details className="spark-science-image-credits"><summary>Image credits</summary>
        {sources.map(source => <p key={source.url}>
          <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>{" — "}{source.author}{" · "}
          <a href={source.licenseUrl} target="_blank" rel="noreferrer">{source.license}</a>
          {source.changes ? ` · ${source.changes}` : ""}
        </p>)}
      </details>}
    </figure>}
  </div>;
}
