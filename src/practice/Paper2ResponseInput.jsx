import React, { useMemo, useState } from "react";
import MathText from "./MathText";
import { collectConstructionSnapPoints, nearestSnapPoint, snapValue } from "./paper2WorkspaceGeometry";

const safeObject = value => value && typeof value === "object" && !Array.isArray(value) ? value : {};
const formatNumber = value => {
  const n = Number(value);
  if (!Number.isFinite(n)) return "";
  if (Math.abs(n - Math.round(n)) < 1e-8) return String(Math.round(n));
  return String(Number(n.toFixed(2)));
};

function clientToSvg(event) {
  const svg = event.currentTarget;
  const matrix = svg.getScreenCTM?.();
  if (matrix && svg.createSVGPoint) {
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const local = point.matrixTransform(matrix.inverse());
    return { x: local.x, y: local.y };
  }
  const rect = svg.getBoundingClientRect();
  const viewBox = svg.viewBox?.baseVal || { x: 0, y: 0, width: rect.width, height: rect.height };
  return {
    x: viewBox.x + ((event.clientX - rect.left) / Math.max(1, rect.width)) * viewBox.width,
    y: viewBox.y + ((event.clientY - rect.top) / Math.max(1, rect.height)) * viewBox.height,
  };
}

function graphSnapStep(axisStep, range) {
  const step = Number(axisStep);
  if (Number.isFinite(step) && step > 0) return Math.max(0.05, step / 20);
  return Math.max(0.05, Number(range || 1) / 200);
}

function angleDegrees(vertex, firstRayPoint, secondRayPoint) {
  if (!vertex || !firstRayPoint || !secondRayPoint) return null;
  const ax = Number(firstRayPoint.x) - Number(vertex.x);
  const ay = Number(firstRayPoint.y) - Number(vertex.y);
  const bx = Number(secondRayPoint.x) - Number(vertex.x);
  const by = Number(secondRayPoint.y) - Number(vertex.y);
  const denom = Math.hypot(ax, ay) * Math.hypot(bx, by);
  if (!denom) return null;
  const cosine = Math.max(-1, Math.min(1, (ax * bx + ay * by) / denom));
  return Math.acos(cosine) * 180 / Math.PI;
}

function smoothCurvePath(points, toScreen) {
  if (!Array.isArray(points) || points.length < 2) return "";
  const p = points.map(toScreen);
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i += 1) {
    const p0 = p[i - 1] || p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] || p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function FieldInput({ field, value, onChange }) {
  const common = { value: value ?? "", onChange: event => onChange(event.target.value), autoComplete: "off" };
  if (field.answerType === "select" || field.options) {
    return (
      <select {...common} aria-label={field.label}>
        <option value="">Select</option>
        {(field.options || []).map(option => <option value={option} key={option}>{option}</option>)}
      </select>
    );
  }
  if (field.answerType === "reason") {
    return <textarea {...common} rows={3} spellCheck="true" placeholder={field.placeholder || "State your mathematical reason"} aria-label={field.label} />;
  }
  return <input {...common} type="text" spellCheck="false" placeholder={field.placeholder || "Enter answer"} aria-label={field.label} />;
}

function FieldsResponse({ schema, value, onChange }) {
  const response = safeObject(value);
  const update = (id, next) => onChange({ ...response, [id]: next });
  return (
    <div className="paper2-rich-fields">
      {(schema.fields || []).map(field => (
        <label className="paper2-rich-field" key={field.id}>
          <span><MathText>{field.label}</MathText></span>
          <FieldInput field={field} value={response[field.id]} onChange={next => update(field.id, next)} />
        </label>
      ))}
    </div>
  );
}

function TableResponse({ schema, value, onChange }) {
  const response = safeObject(value);
  const cells = safeObject(response.cells);
  const update = (key, next) => onChange({ ...response, cells: { ...cells, [key]: next } });
  return (
    <div className="paper2-workspace paper2-table-workspace">
      <p className="paper2-workspace-help">Complete the blank cells directly in the table. Each box is saved as you type.</p>
      <div className="paper2-table-input-wrap">
        <table className="paper2-data-table paper2-input-table">
          {(schema.headers || []).length > 0 && (
            <thead><tr>{schema.headers.map((header, index) => <th key={`${header}-${index}`}><MathText>{header}</MathText></th>)}</tr></thead>
          )}
          <tbody>
            {(schema.rows || []).map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => {
                  const editable = cell && typeof cell === "object" && !Array.isArray(cell) && cell.key;
                  return (
                    <td key={`${rowIndex}-${cellIndex}`} className={editable ? "paper2-table-editable" : ""}>
                      {editable ? (
                        <input
                          type="text"
                          inputMode={cell.inputMode || "text"}
                          autoComplete="off"
                          spellCheck="false"
                          value={cells[cell.key] ?? ""}
                          onChange={event => update(cell.key, event.target.value)}
                          placeholder={cell.placeholder || "?"}
                          aria-label={cell.label || `Table row ${rowIndex + 1}, column ${cellIndex + 1}`}
                        />
                      ) : <MathText>{cell ?? ""}</MathText>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paper2-workspace-status">
        {Object.values(cells).filter(item => String(item ?? "").trim()).length} of {Number(schema.blankCount || 0)} table entr{Number(schema.blankCount || 0) === 1 ? "y" : "ies"} filled
      </div>
    </div>
  );
}

function WorkspaceGuide({ type, protractorAllowed = false, rulerCompassOnly = false }) {
  if (type === "graph") {
    return (
      <details className="paper2-workspace-guide" open>
        <summary>How to use the graph workspace</summary>
        <div>
          <p><strong>1. Check the scale.</strong> Read the values shown on both axes before plotting.</p>
          <p><strong>2. Preview the coordinate.</strong> Move the pointer over the grid. The crosshair and coordinate label show the exact snapped point.</p>
          <p><strong>3. Plot.</strong> Click once when the coordinate shown is the one you want. Use the plotted-points list to remove a mistake.</p>
          <p><strong>4. Finish the graph.</strong> For a curve, plot the required points then select <em>Join with smooth curve</em>. For a straight line, select two points on that line.</p>
          <p className="paper2-workspace-guide-note">These instructions explain the digital controls only. They do not identify which mathematical points you should plot.</p>
        </div>
      </details>
    );
  }
  return (
    <details className="paper2-workspace-guide" open>
      <summary>How to use the construction tools</summary>
      <div>
        <p><strong>Straightedge.</strong> Click the starting point, move the pointer and check the live length, then click the ending point.</p>
        <p><strong>Compass.</strong> Click once to set the centre. Move the pointer to set the radius, then click again to leave the circle. A compass controls distance, not degrees.</p>
        {protractorAllowed && <p><strong>Protractor.</strong> Click the angle vertex, click a point on the baseline, then move to the second arm. The live display shows the angle before the final click.</p>}
        <p><strong>Snapping.</strong> Nearby endpoints and genuine compass/line intersections are highlighted automatically so the construction stays mathematically precise.</p>
        {rulerCompassOnly && <p className="paper2-workspace-guide-note"><strong>Exam restriction:</strong> this question requires ruler and compasses only, so the protractor is not available.</p>}
        <p className="paper2-workspace-guide-note">The tool guide explains operation only. SPARK does not reveal the construction method required by the question.</p>
      </div>
    </details>
  );
}

function ConstructionWorkspace({ schema, value, onChange }) {
  const response = safeObject(value);
  const objects = Array.isArray(response.objects) ? response.objects : [];
  const allowedTools = Array.isArray(schema.allowedTools) && schema.allowedTools.length ? schema.allowedTools : ["segment", "circle"];
  const [tool, setTool] = useState(allowedTools[0] || "segment");
  const [anchor, setAnchor] = useState(null);
  const [hover, setHover] = useState(null);
  const [protractorPoints, setProtractorPoints] = useState([]);
  const width = 620, height = 400, margin = 28;
  const xMax = 14, yMax = 9;
  const sx = (width - margin * 2) / xMax;
  const sy = (height - margin * 2) / yMax;
  const scale = Math.min(sx, sy);
  const toScreen = point => ({ x: margin + point.x * scale, y: height - margin - point.y * scale });
  const toMath = local => ({
    x: Math.max(0, Math.min(xMax, (local.x - margin) / scale)),
    y: Math.max(0, Math.min(yMax, (height - margin - local.y) / scale)),
  });
  const addObject = object => onChange({ ...response, objects: [...objects, object] });
  const constructionCandidates = collectConstructionSnapPoints(objects);
  const precisePoint = event => {
    const raw = toMath(clientToSvg(event));
    const nearby = nearestSnapPoint(raw, constructionCandidates, 0.22);
    if (nearby) return nearby;
    return { x: snapValue(raw.x, 0.05), y: snapValue(raw.y, 0.05) };
  };
  const resetPending = () => { setAnchor(null); setProtractorPoints([]); };
  const selectTool = next => { setTool(next); resetPending(); };
  const handleCanvas = event => {
    const point = precisePoint(event);
    if (tool === "protractor") {
      if (protractorPoints.length === 0) { setProtractorPoints([point]); return; }
      if (protractorPoints.length === 1) { setProtractorPoints([...protractorPoints, point]); return; }
      const [vertex, first] = protractorPoints;
      const degrees = angleDegrees(vertex, first, point);
      if (Number.isFinite(degrees)) addObject({ kind: "angle_measure", vx: vertex.x, vy: vertex.y, ax: first.x, ay: first.y, bx: point.x, by: point.y, degrees: snapValue(degrees, 0.1) });
      setProtractorPoints([]);
      return;
    }
    if (!anchor) { setAnchor(point); return; }
    if (tool === "segment") addObject({ kind: "segment", x1: anchor.x, y1: anchor.y, x2: point.x, y2: point.y });
    else if (tool === "circle") addObject({ kind: "circle", cx: anchor.x, cy: anchor.y, r: snapValue(Math.hypot(point.x - anchor.x, point.y - anchor.y), 0.05) });
    setAnchor(null);
  };
  const handleMove = event => setHover(precisePoint(event));
  const segments = objects.filter(item => item.kind === "segment");
  const circles = objects.filter(item => item.kind === "circle");
  const measurements = objects.filter(item => item.kind === "angle_measure");
  const segmentPoints = [];
  segments.forEach(item => {
    [{ x: item.x1, y: item.y1 }, { x: item.x2, y: item.y2 }].forEach(point => {
      if (!segmentPoints.some(existing => Math.hypot(existing.x - point.x, existing.y - point.y) < 0.16)) segmentPoints.push(point);
    });
  });
  const labels = ["P", "Q", "R", "S", "T", "U", "V"];
  const liveLength = anchor && hover ? Math.hypot(hover.x - anchor.x, hover.y - anchor.y) : null;
  const liveAngle = tool === "protractor" && protractorPoints.length === 2 && hover ? angleDegrees(protractorPoints[0], protractorPoints[1], hover) : null;
  const rulerCompassOnly = schema.toolPolicy === "ruler_compasses_only";
  return (
    <div className="paper2-workspace paper2-construction-workspace">
      <WorkspaceGuide type="construction" protractorAllowed={allowedTools.includes("protractor")} rulerCompassOnly={rulerCompassOnly} />
      <div className="paper2-workspace-toolbar" aria-label="Construction tools">
        {allowedTools.includes("segment") && <button type="button" className={tool === "segment" ? "active" : ""} onClick={() => selectTool("segment")}>Straightedge</button>}
        {allowedTools.includes("circle") && <button type="button" className={tool === "circle" ? "active" : ""} onClick={() => selectTool("circle")}>Compass</button>}
        {allowedTools.includes("protractor") && <button type="button" className={tool === "protractor" ? "active" : ""} onClick={() => selectTool("protractor")}>Protractor</button>}
        <button type="button" disabled={!objects.length} onClick={() => { onChange({ ...response, objects: objects.slice(0, -1) }); resetPending(); }}>Undo</button>
        <button type="button" disabled={!objects.length} onClick={() => { onChange({ ...response, objects: [] }); resetPending(); }}>Clear</button>
      </div>
      <div className="paper2-tool-instruction" role="status">
        {tool === "segment" && <>Straightedge selected. Click a start point, then an end point. {Number.isFinite(liveLength) && <strong>Length: {liveLength.toFixed(2)} cm</strong>}</>}
        {tool === "circle" && <>Compass selected. Click the centre, then choose the radius. {Number.isFinite(liveLength) && <strong>Radius: {liveLength.toFixed(2)} cm</strong>}</>}
        {tool === "protractor" && <>Protractor selected. Vertex → baseline → second arm. {Number.isFinite(liveAngle) && <strong>Angle: {liveAngle.toFixed(1)}°</strong>}</>}
      </div>
      <svg className="paper2-construction-canvas" viewBox={`0 0 ${width} ${height}`} onPointerDown={handleCanvas} onPointerMove={handleMove} onPointerLeave={() => setHover(null)} role="application" aria-label="Virtual mathematical construction workspace">
        <rect x="0" y="0" width={width} height={height} fill="none" stroke="currentColor" strokeOpacity="0.28" />
        {Array.from({ length: xMax + 1 }, (_, index) => {
          const p = toScreen({ x: index, y: 0 });
          return <g key={`xt-${index}`}><line x1={p.x} y1={height - margin} x2={p.x} y2={height - margin + 6} stroke="currentColor"/><text x={p.x} y={height - 7} textAnchor="middle" fill="currentColor" stroke="none" fontSize="10">{index}</text></g>;
        })}
        {Array.from({ length: yMax + 1 }, (_, index) => {
          const p = toScreen({ x: 0, y: index });
          return <g key={`yt-${index}`}><line x1={margin - 6} y1={p.y} x2={margin} y2={p.y} stroke="currentColor"/><text x={margin - 9} y={p.y + 3} textAnchor="end" fill="currentColor" stroke="none" fontSize="10">{index}</text></g>;
        })}
        {objects.map((item, index) => {
          if (item.kind === "circle") {
            const c = toScreen({ x: item.cx, y: item.cy });
            return <circle key={index} cx={c.x} cy={c.y} r={item.r * scale} fill="none" stroke="currentColor" strokeOpacity="0.62" strokeDasharray="4 3" />;
          }
          if (item.kind === "angle_measure") {
            const v=toScreen({x:item.vx,y:item.vy}), a=toScreen({x:item.ax,y:item.ay}), b=toScreen({x:item.bx,y:item.by});
            return <g key={index} className="paper2-protractor-measure" pointerEvents="none"><line x1={v.x} y1={v.y} x2={a.x} y2={a.y} stroke="currentColor" strokeOpacity="0.35"/><line x1={v.x} y1={v.y} x2={b.x} y2={b.y} stroke="currentColor" strokeOpacity="0.35"/><text x={v.x+12} y={v.y-12} fill="currentColor" stroke="none" fontSize="12">{Number(item.degrees).toFixed(1)}°</text></g>;
          }
          const a = toScreen({ x: item.x1, y: item.y1 }), b = toScreen({ x: item.x2, y: item.y2 });
          return <line key={index} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeWidth="2" />;
        })}
        {anchor && hover && tool === "segment" && (() => { const a = toScreen(anchor), b = toScreen(hover); return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 4" strokeOpacity="0.65" />; })()}
        {anchor && hover && tool === "circle" && (() => { const c = toScreen(anchor); const r = Math.hypot(hover.x-anchor.x, hover.y-anchor.y) * scale; return <circle cx={c.x} cy={c.y} r={r} fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 4" strokeOpacity="0.65" />; })()}
        {tool === "protractor" && protractorPoints.length >= 1 && (() => { const v=toScreen(protractorPoints[0]); return <circle cx={v.x} cy={v.y} r="4" fill="currentColor" stroke="none"/>; })()}
        {tool === "protractor" && protractorPoints.length === 2 && hover && (() => {
          const v=toScreen(protractorPoints[0]), a=toScreen(protractorPoints[1]), b=toScreen(hover);
          const baseline = Math.atan2(a.y - v.y, a.x - v.x);
          const cross = (a.x-v.x)*(b.y-v.y) - (a.y-v.y)*(b.x-v.x);
          const side = cross >= 0 ? 1 : -1;
          const radius = 68;
          const ticks = Array.from({ length: 19 }, (_, i) => {
            const degrees = i * 10;
            const theta = baseline + side * degrees * Math.PI / 180;
            const major = degrees % 30 === 0;
            const inner = radius - (major ? 10 : 6);
            const x1=v.x+inner*Math.cos(theta), y1=v.y+inner*Math.sin(theta);
            const x2=v.x+radius*Math.cos(theta), y2=v.y+radius*Math.sin(theta);
            const lx=v.x+(radius+12)*Math.cos(theta), ly=v.y+(radius+12)*Math.sin(theta);
            return <g key={`deg-${degrees}`}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity={major ? "0.55" : "0.32"}/>{major && <text x={lx} y={ly+3} textAnchor="middle" fill="currentColor" stroke="none" fontSize="9">{degrees}</text>}</g>;
          });
          const arcStart={x:v.x+radius*Math.cos(baseline),y:v.y+radius*Math.sin(baseline)};
          const arcEnd={x:v.x+radius*Math.cos(baseline+side*Math.PI),y:v.y+radius*Math.sin(baseline+side*Math.PI)};
          return <g pointerEvents="none" className="paper2-protractor-preview"><path d={`M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 0 ${side > 0 ? 1 : 0} ${arcEnd.x} ${arcEnd.y}`} fill="none" stroke="currentColor" strokeOpacity="0.28"/>{ticks}<line x1={v.x} y1={v.y} x2={a.x} y2={a.y} stroke="currentColor" strokeOpacity="0.62"/><line x1={v.x} y1={v.y} x2={b.x} y2={b.y} stroke="currentColor" strokeOpacity="0.62"/>{Number.isFinite(liveAngle) && <text x={v.x+14} y={v.y-14} fill="currentColor" stroke="none" fontSize="12" fontWeight="700">{liveAngle.toFixed(1)}°</text>}</g>;
        })()}
        {hover && (() => { const p = toScreen(hover); return <g pointerEvents="none" className="paper2-snap-crosshair"><line x1={p.x-7} y1={p.y} x2={p.x+7} y2={p.y} stroke="currentColor"/><line x1={p.x} y1={p.y-7} x2={p.x} y2={p.y+7} stroke="currentColor"/><circle cx={p.x} cy={p.y} r="2.5" fill="currentColor" stroke="none"/></g>; })()}
        {anchor && (() => { const p = toScreen(anchor); return <circle cx={p.x} cy={p.y} r="4" fill="currentColor" stroke="none" />; })()}
        {segmentPoints.slice(0, labels.length).map((point, index) => { const p = toScreen(point); return <text key={`${point.x}-${point.y}`} x={p.x + 7} y={p.y - 7} fill="currentColor" stroke="none" fontSize="13" fontStyle="italic">{labels[index]}</text>; })}
      </svg>
      <div className="paper2-workspace-status">
        {segments.length} straightedge line{segments.length === 1 ? "" : "s"} · {circles.length} compass circle{circles.length === 1 ? "" : "s"}{measurements.length ? ` · ${measurements.length} angle measurement${measurements.length === 1 ? "" : "s"}` : ""}
        {hover ? ` · pointer ${hover.x.toFixed(2)} cm, ${hover.y.toFixed(2)} cm` : ""}
        {anchor && tool === "circle" ? ` · centre locked at (${anchor.x.toFixed(2)}, ${anchor.y.toFixed(2)})` : ""}
        {anchor && tool === "segment" ? ` · start locked at (${anchor.x.toFixed(2)}, ${anchor.y.toFixed(2)})` : ""}
      </div>
    </div>
  );
}

function TilePatternWorkspace({ value, onChange }) {
  const response = safeObject(value);
  const cells = Array.isArray(response.cells) ? response.cells : [];
  const map = useMemo(() => new Map(cells.map(cell => [`${cell.x},${cell.y}`, cell.state])), [cells]);
  const cycle = (x, y) => {
    const key = `${x},${y}`;
    const current = map.get(key) || "empty";
    const next = current === "empty" ? "white" : current === "white" ? "shaded" : "empty";
    const retained = cells.filter(cell => !(cell.x === x && cell.y === y));
    onChange({ ...response, cells: next === "empty" ? retained : [...retained, { x, y, state: next }] });
  };
  return (
    <div className="paper2-workspace paper2-tile-workspace">
      <p className="paper2-workspace-help">Click a square to cycle through empty, white and shaded tiles. Build the design in the grid.</p>
      <div className="paper2-tile-grid">
        {Array.from({ length: 5 }, (_, y) => Array.from({ length: 10 }, (__, x) => {
          const state = map.get(`${x},${y}`) || "empty";
          return <button type="button" aria-label={`row ${y + 1}, column ${x + 1}, ${state}`} className={`paper2-tile-cell ${state}`} key={`${x}-${y}`} onClick={() => cycle(x, y)}>{state === "shaded" ? "■" : state === "white" ? "□" : ""}</button>;
        }))}
      </div>
      <div className="paper2-workspace-toolbar"><button type="button" disabled={!cells.length} onClick={() => onChange({ ...response, cells: [] })}>Clear design</button></div>
    </div>
  );
}

function GraphWorkspace({ schema, value, onChange }) {
  const response = safeObject(value);
  const [hover, setHover] = useState(null);
  const graph = schema.graph || {};
  const width = 650, height = 420, margin = 45;
  const xMin = Number(graph.xMin ?? -5), xMax = Number(graph.xMax ?? 5);
  const yMin = Number(graph.yMin ?? -5), yMax = Number(graph.yMax ?? 5);
  const toScreen = point => ({
    x: margin + ((Number(point.x) - xMin) / (xMax - xMin)) * (width - 2 * margin),
    y: height - margin - ((Number(point.y) - yMin) / (yMax - yMin)) * (height - 2 * margin),
  });
  const toMath = local => ({
    x: xMin + ((local.x - margin) / (width - 2 * margin)) * (xMax - xMin),
    y: yMin + ((height - margin - local.y) / (height - 2 * margin)) * (yMax - yMin),
  });
  const points = Array.isArray(response.points) ? response.points : [];
  const linePoints = Array.isArray(response.linePoints) ? response.linePoints : [];
  const mode = graph.mode || "curve";
  const xGrid = Number(response.axisXStep || graph.xStep || 1);
  const yGrid = Number(response.axisYStep || graph.yStep || 1);
  const xSnap = Number(graph.snapX || graphSnapStep(xGrid, xMax - xMin));
  const ySnap = Number(graph.snapY || graphSnapStep(yGrid, yMax - yMin));
  const pointFromEvent = event => {
    const raw = toMath(clientToSvg(event));
    return {
      x: Math.max(xMin, Math.min(xMax, snapValue(raw.x, xSnap))),
      y: Math.max(yMin, Math.min(yMax, snapValue(raw.y, ySnap))),
    };
  };
  const sameCoordinate = (a,b) => Math.abs(Number(a.x)-Number(b.x)) < 1e-8 && Math.abs(Number(a.y)-Number(b.y)) < 1e-8;
  const click = event => {
    const p = pointFromEvent(event);
    if (mode === "line") {
      const next = linePoints.length >= 2 ? [p] : linePoints.some(existing => sameCoordinate(existing,p)) ? linePoints : [...linePoints, p];
      onChange({ ...response, linePoints: next });
    } else if (!points.some(existing => sameCoordinate(existing,p))) {
      onChange({ ...response, points: [...points, p] });
    }
  };
  const xTicks = [];
  const yTicks = [];
  if (xGrid > 0) for (let x = Math.ceil(xMin / xGrid) * xGrid; x <= xMax + 1e-9; x += xGrid) xTicks.push(Number(x.toFixed(6)));
  if (yGrid > 0) for (let y = Math.ceil(yMin / yGrid) * yGrid; y <= yMax + 1e-9; y += yGrid) yTicks.push(Number(y.toFixed(6)));
  const orderedPoints = [...points].sort((a, b) => Number(a.x) - Number(b.x));
  const background = Array.isArray(graph.backgroundPoints) ? graph.backgroundPoints.map(([x, y]) => ({ x, y })) : [];
  const answerFields = safeObject(response.answerFields);
  const activePoints = mode === "line" ? linePoints : points;
  const removePoint = index => {
    if (mode === "line") onChange({ ...response, linePoints: linePoints.filter((_,i) => i !== index) });
    else onChange({ ...response, points: points.filter((_,i) => i !== index) });
  };
  return (
    <div className="paper2-workspace paper2-graph-workspace">
      <WorkspaceGuide type="graph" />
      {graph.requireAxisSetup && (
        <div className="paper2-axis-setup">
          <label><span>x-axis interval</span><select value={response.axisXStep ?? ""} onChange={event => onChange({ ...response, axisXStep: Number(event.target.value) || "" })}><option value="">Select</option>{(graph.axisChoices || []).map(v => <option key={v} value={v}>{v}</option>)}</select></label>
          <label><span>y-axis interval</span><select value={response.axisYStep ?? ""} onChange={event => onChange({ ...response, axisYStep: Number(event.target.value) || "" })}><option value="">Select</option>{(graph.axisChoices || []).map(v => <option key={v} value={v}>{v}</option>)}</select></label>
        </div>
      )}
      <div className="paper2-tool-instruction" role="status">
        {hover ? <><strong>Coordinate: ({formatNumber(hover.x)}, {formatNumber(hover.y)})</strong> Click to {mode === "line" ? "select this point for the line" : "plot this point"}.</> : <>Move over the grid to preview the exact coordinate before plotting.</>}
      </div>
      <svg className="paper2-graph-canvas" viewBox={`0 0 ${width} ${height}`} onPointerDown={click} onPointerMove={event => setHover(pointFromEvent(event))} onPointerLeave={() => setHover(null)} role="application" aria-label="Interactive graph plotting workspace">
        <rect x="0" y="0" width={width} height={height} fill="none" stroke="currentColor" strokeOpacity="0.25" />
        {xTicks.map(x => { const p = toScreen({ x, y: 0 }); return <g key={`x-${x}`}><line x1={p.x} y1={margin} x2={p.x} y2={height-margin} stroke="currentColor" strokeOpacity="0.12"/><text x={p.x} y={height-margin+18} textAnchor="middle" fill="currentColor" stroke="none" fontSize="10">{x}</text></g>; })}
        {yTicks.map(y => { const p = toScreen({ x: 0, y }); return <g key={`y-${y}`}><line x1={margin} y1={p.y} x2={width-margin} y2={p.y} stroke="currentColor" strokeOpacity="0.12"/><text x={margin-8} y={p.y+3} textAnchor="end" fill="currentColor" stroke="none" fontSize="10">{y}</text></g>; })}
        {xMin <= 0 && xMax >= 0 && (() => { const p = toScreen({x:0,y:0}); return <line x1={p.x} y1={margin} x2={p.x} y2={height-margin} stroke="currentColor" strokeWidth="1.5"/>; })()}
        {yMin <= 0 && yMax >= 0 && (() => { const p = toScreen({x:0,y:0}); return <line x1={margin} y1={p.y} x2={width-margin} y2={p.y} stroke="currentColor" strokeWidth="1.5"/>; })()}
        {graph.xLabel && <text x={width-margin+24} y={toScreen({x:0,y:0}).y+4} fill="currentColor" stroke="none" fontSize="12">{graph.xLabel}</text>}
        {graph.yLabel && <text x={toScreen({x:0,y:0}).x+6} y={margin-14} fill="currentColor" stroke="none" fontSize="12">{graph.yLabel}</text>}
        {background.length > 1 && <path d={smoothCurvePath(background, toScreen)} fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />}
        {response.curve && orderedPoints.length > 1 && <path d={smoothCurvePath(orderedPoints, toScreen)} fill="none" stroke="currentColor" strokeWidth="2" />}
        {points.map((point,index) => { const p=toScreen(point); return <g key={`p-${index}`}><circle cx={p.x} cy={p.y} r="4" fill="currentColor" stroke="none"/><text x={p.x+6} y={p.y-7} fill="currentColor" stroke="none" fontSize="9">({formatNumber(point.x)}, {formatNumber(point.y)})</text></g>; })}
        {linePoints.length >= 2 && (() => { const a=toScreen(linePoints[0]),b=toScreen(linePoints[linePoints.length-1]); return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeWidth="2.2"/>; })()}
        {linePoints.map((point,index) => { const p=toScreen(point); return <circle key={`l-${index}`} cx={p.x} cy={p.y} r="4" fill="currentColor" stroke="none"/>; })}
        {hover && (() => { const p=toScreen(hover); const tx=Math.min(width-118,Math.max(6,p.x+10)); const ty=Math.max(20,p.y-12); return <g pointerEvents="none" className="paper2-graph-crosshair"><line x1={p.x} y1={margin} x2={p.x} y2={height-margin} stroke="currentColor" strokeDasharray="3 3"/><line x1={margin} y1={p.y} x2={width-margin} y2={p.y} stroke="currentColor" strokeDasharray="3 3"/><circle cx={p.x} cy={p.y} r="5" fill="none" stroke="currentColor" strokeWidth="2"/><rect x={tx} y={ty-14} width="104" height="20" rx="5" fill="currentColor" opacity="0.88"/><text x={tx+52} y={ty} textAnchor="middle" fill="white" stroke="none" fontSize="11">({formatNumber(hover.x)}, {formatNumber(hover.y)})</text></g>; })()}
      </svg>
      {activePoints.length > 0 && (
        <div className="paper2-plotted-points" aria-label="Plotted points">
          <span>{mode === "line" ? "Line points" : "Points plotted"}</span>
          <div>{activePoints.map((point,index) => <button type="button" key={`${point.x}-${point.y}-${index}`} onClick={() => removePoint(index)} title="Remove this point">({formatNumber(point.x)}, {formatNumber(point.y)}) ×</button>)}</div>
        </div>
      )}
      <div className="paper2-workspace-toolbar">
        {mode !== "line" && <button type="button" className={response.curve ? "active" : ""} onClick={() => onChange({ ...response, curve: !response.curve })}>{response.curve ? "Smooth curve selected" : "Join with smooth curve"}</button>}
        <button type="button" disabled={!activePoints.length} onClick={() => onChange({ ...response, points: points.slice(0, -1), linePoints: linePoints.slice(0, -1) })}>Undo point</button>
        <button type="button" disabled={!activePoints.length} onClick={() => onChange({ ...response, points: [], linePoints: [] })}>Clear graph</button>
      </div>
      {(schema.answerFields || []).length > 0 && (
        <div className="paper2-rich-fields paper2-graph-answer-fields">
          {schema.answerFields.map(field => <label className="paper2-rich-field" key={field.id}><span>{field.label}</span><FieldInput field={field} value={answerFields[field.id]} onChange={next => onChange({ ...response, answerFields: { ...answerFields, [field.id]: next } })}/></label>)}
        </div>
      )}
    </div>
  );
}

export default function Paper2ResponseInput({ part, value, onChange }) {
  const schema = part?.responseSchema;
  if (!schema) return null;
  if (schema.type === "fields") return <FieldsResponse schema={schema} value={value} onChange={onChange} />;
  if (schema.type === "table") return <TableResponse schema={schema} value={value} onChange={onChange} />;
  if (schema.type === "construction_triangle") return <ConstructionWorkspace schema={schema} value={value} onChange={onChange} />;
  if (schema.type === "tile_pattern") return <TilePatternWorkspace schema={schema} value={value} onChange={onChange} />;
  if (schema.type === "graph") return <GraphWorkspace schema={schema} value={value} onChange={onChange} />;
  return null;
}
