import React, { useId, useRef, useState } from "react";

const readStrokes = value => {
  try {
    const paths = JSON.parse(value || "[]");
    return Array.isArray(paths) ? paths.filter(path => typeof path === "string" && /^[ML0-9., ]+$/.test(path)) : [];
  } catch { return []; }
};

export default function GeographySketch({ value, onChange, readOnly = false, background }) {
  const svg = useRef(null);
  const path = useRef("");
  const [preview, setPreview] = useState("");
  const grid = useId();
  const strokes = readStrokes(value);
  const height = background ? Math.round(600 * background.height / background.width) : 360;
  const write = next => onChange(next.length ? JSON.stringify(next) : "");
  function point(event) {
    const bounds = svg.current.getBoundingClientRect();
    const coordinate = (offset, size, limit) => Math.max(0, Math.min(limit, Math.round(offset * limit / size)));
    return `${coordinate(event.clientX - bounds.left, bounds.width, 600)},${coordinate(event.clientY - bounds.top, bounds.height, height)}`;
  }
  function start(event) {
    if (readOnly || event.button !== 0 || path.current) return;
    svg.current.setPointerCapture(event.pointerId);
    path.current = `M${point(event)}`;
    setPreview(path.current);
  }
  function draw(event) {
    if (!path.current || !svg.current.hasPointerCapture(event.pointerId) || path.current.length > 14000) return;
    path.current += ` L${point(event)}`;
    setPreview(path.current);
  }
  function finish(event) {
    if (!path.current || !svg.current.hasPointerCapture(event.pointerId)) return;
    if (event.type === "pointerup" && path.current.includes(" L") && strokes.length < 48) write([...strokes, path.current]);
    path.current = "";
    setPreview("");
  }
  return <div className="geo-sketch">
    {!readOnly && <p>Draw with a mouse or touch. Use the answer box to add labels or describe your sketch.</p>}
    <svg ref={svg} className={readOnly ? "" : "geo-sketch-edit"} width="600" height={height} viewBox={`0 0 600 ${height}`}
      style={{"--geo-sketch-max-width": `${Math.min(600, Math.round(620 * 600 / height))}px`}}
      role="img" aria-label={background?.alt || "Geography sketch grid"}
      onPointerDown={start} onPointerMove={draw} onPointerUp={finish} onPointerCancel={finish}>
      <defs><pattern id={grid} width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 L 0 30" fill="none" stroke="#cedae5" />
      </pattern></defs>
      {background ? <image href={`${process.env.PUBLIC_URL || ""}/${background.src}`} width="600" height={height} /> :
        <rect width="600" height={height} fill={`url(#${grid})`} />}
      {[...strokes, preview].filter(Boolean).map((stroke, index) => <path key={index} d={stroke} fill="none" stroke="#12335a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />)}
    </svg>
    {!readOnly && <div className="geo-tool-actions">
      <button type="button" className="secondary" disabled={!strokes.length} onClick={() => write(strokes.slice(0, -1))}>Undo stroke</button>
      <button type="button" className="secondary" disabled={!strokes.length} onClick={() => write([])}>Clear sketch</button>
    </div>}
  </div>;
}
