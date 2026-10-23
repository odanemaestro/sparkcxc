import React, { useRef, useState } from "react";

function readStrokes(value) {
  try {
    const strokes = JSON.parse(value || "[]");
    if (!Array.isArray(strokes) || strokes.length > 400 || strokes.flat().length > 6000) return [];
    return strokes.every((stroke) => Array.isArray(stroke) && stroke.every((point) => Array.isArray(point) && point.length === 2 && Number.isFinite(point[0]) && Number.isFinite(point[1]) && point[0] >= 0 && point[0] <= 800 && point[1] >= 0 && point[1] <= 420)) ? strokes : [];
  } catch { return []; }
}

export default function PoaDrawingPad({ response, onChange, disabled }) {
  const ref = useRef(null), active = useRef(false), previous = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const strokes = readStrokes(response.parts?.["drawing:strokes"]);
  const current = useRef(strokes);
  current.current = strokes;
  const update = (next) => {
    const value = JSON.stringify(next);
    if (value.length <= 190000) { current.current = next; onChange({ ...response, parts: { ...response.parts, "drawing:strokes": next.length ? value : "" } }); }
  };
  const point = (event) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box?.width || !box.height || !Number.isFinite(event.clientX) || !Number.isFinite(event.clientY)) return null;
    return [Math.round(Math.max(0, Math.min(800, (event.clientX - box.left) / box.width * 800)) * 10) / 10,
      Math.round(Math.max(0, Math.min(420, (event.clientY - box.top) / box.height * 420)) * 10) / 10];
  };
  const start = (event) => {
    const paths = current.current;
    if (disabled || paths.length >= 400 || paths.flat().length >= 6000) return;
    const at = point(event); if (!at) return;
    previous.current = paths; setCanUndo(true); active.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId); update([...paths, [at]]);
  };
  const move = (event) => {
    const paths = current.current;
    if (disabled || !active.current || !paths.length || paths.flat().length >= 6000) return;
    const at = point(event); if (!at) return;
    const last = paths.at(-1).at(-1);
    if (Math.hypot(at[0] - last[0], at[1] - last[1]) < 1) return;
    update(paths.map((stroke, i) => i === paths.length - 1 ? [...stroke, at] : stroke));
  };
  return <section className="poa-drawing-pad" aria-label="Diagram answer">
    <h3>Your diagram</h3><p>Draw with a mouse, pen or finger. Add any labels or a written description below.</p>
    <svg ref={ref} viewBox="0 0 800 420" role="img" aria-label="Accounts diagram drawing area" onPointerDown={start} onPointerMove={move} onPointerUp={() => { active.current = false; }} onPointerCancel={() => { active.current = false; }}>
      {strokes.map((stroke, i) => stroke.length === 1 ? <circle key={i} cx={stroke[0][0]} cy={stroke[0][1]} r="1.2" fill="currentColor"/> : <polyline key={i} points={stroke.map((at) => at.join(",")).join(" ")} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>)}
    </svg>
    {!disabled && <div className="poa-actions"><button type="button" className="secondary" disabled={!canUndo && !strokes.length} onClick={() => { update(previous.current || strokes.slice(0, -1)); previous.current = null; setCanUndo(false); }}>Undo</button><button type="button" className="secondary" disabled={!strokes.length} onClick={() => { previous.current = strokes; setCanUndo(true); update([]); }}>Clear drawing</button></div>}
    <label>Diagram labels or description<textarea rows={4} disabled={disabled} value={response.parts?.["drawing:notes"] || ""} onChange={(e) => onChange({ ...response, parts: { ...response.parts, "drawing:notes": e.target.value } })}/></label>
  </section>;
}
