import React, { useLayoutEffect, useRef, useState } from "react";
import registry from "../data/reviewedScienceDiagrams.json";
import byId from "../data/reviewedScienceDiagramsById.json";
import references from "../data/reviewedScienceReferences.json";
import { scienceDiagramSignature } from "./reviewedScienceDiagramModel";
import "./reviewedScienceDiagram.css";

export default function ReviewedScienceDiagram({ site, diagramId, children, hideCaption = false }) {
  const originalRef = useRef(null);
  const [selection, setSelection] = useState(null);
  const dialogRef = useRef(null);
  const [controls, setControls] = useState([]);
  useLayoutEffect(() => {
    const svg = originalRef.current?.querySelector("svg");
    const signature = scienceDiagramSignature(svg);
    const exact = byId[diagramId] || registry[site]?.[signature];
    // Continuous inputs have more values than the reviewed snapshots. Keep an
    // approved reference visible while the lesson's live values stay outside it.
    const words = new Set((svg?.textContent || "").toLowerCase().match(/[a-z]+/g) || []);
    const candidates = references[site] || [];
    const closest = candidates.reduce((best, item) => {
      const score = item.words.reduce((sum, word) => sum + (words.has(word) ? 1 : 0), 0) / Math.max(1, item.words.length);
      return !best || score > best.score ? { id: item.id, score } : best;
    }, null);
    setSelection(exact || byId[closest?.id] || null);
    setControls([...(site?.startsWith("HumanSkeletonExplorer") ? svg?.querySelectorAll('[role="button"]') : []) || []].map(node => ({
      node, label: node.getAttribute("aria-label") || node.textContent.trim(),
      pressed: node.getAttribute("aria-pressed") === "true",
    })));
  }, [children, site, diagramId]);

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
      {selection.caption && !hideCaption && <figcaption>{selection.caption}</figcaption>}
      {controls.length > 0 && <div className="spark-science-controls" aria-label="Explore diagram details">
        {controls.map((control, index) => <button type="button" key={index} aria-pressed={control.pressed}
          onClick={() => control.node.dispatchEvent(new MouseEvent("click", { bubbles: true }))}>{control.label}</button>)}
      </div>}
      {sources.length > 0 && <details className="spark-science-image-credits"><summary>Image credits</summary>
        {sources.map((source, index) => <p key={`${source.url}-${index}`}>
          <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>{" — "}{source.author}{" · "}
          <a href={source.licenseUrl} target="_blank" rel="noreferrer">{source.license}</a>
          {source.changes ? ` · ${source.changes}` : ""}
        </p>)}
      </details>}
    </figure>}
  </div>;
}
