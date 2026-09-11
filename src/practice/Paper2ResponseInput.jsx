import React, { useMemo, useState } from "react";
import MathText from "./MathText";
import { collectConstructionSnapPoints, nearestSnapPoint, segmentCircleIntersections, snapValue } from "./paper2WorkspaceGeometry";

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


function sameConstructionPoint(a, b, tolerance = 0.16) {
  return Boolean(a && b) && Math.hypot(Number(a.x) - Number(b.x), Number(a.y) - Number(b.y)) < tolerance;
}

export function straightedgeAlignment(start, point, thresholdDegrees = 2.5) {
  if (!start || !point) return { point, kind: null, snapped: false, angleFromHorizontal: null };
  const dx = Number(point.x) - Number(start.x);
  const dy = Number(point.y) - Number(start.y);
  const length = Math.hypot(dx, dy);
  if (!length) return { point, kind: null, snapped: false, angleFromHorizontal: 0 };

  let axisAngle = Math.atan2(dy, dx) * 180 / Math.PI;
  axisAngle = ((axisAngle % 180) + 180) % 180;
  const horizontalDeviation = Math.min(axisAngle, 180 - axisAngle);
  const verticalDeviation = Math.abs(90 - axisAngle);

  if (horizontalDeviation <= thresholdDegrees) {
    return {
      point: { x: Number(point.x), y: Number(start.y) },
      kind: "horizontal",
      snapped: Math.abs(dy) > 1e-9,
      angleFromHorizontal: 0,
    };
  }
  if (verticalDeviation <= thresholdDegrees) {
    return {
      point: { x: Number(start.x), y: Number(point.y) },
      kind: "vertical",
      snapped: Math.abs(dx) > 1e-9,
      angleFromHorizontal: 90,
    };
  }
  return {
    point,
    kind: "slanted",
    snapped: false,
    angleFromHorizontal: Math.min(axisAngle, 180 - axisAngle),
  };
}

function triangleNameFromPart(part) {
  const source = `${part?.prompt || ""} ${part?.answer || ""}`;
  const match = source.match(/\btriangle\s+([A-Z])\s*([A-Z])\s*([A-Z])\b/i);
  return match ? [match[1], match[2], match[3]].map(label => label.toUpperCase()) : [];
}

function segmentConnects(segment, a, b) {
  const first = { x: segment.x1, y: segment.y1 };
  const second = { x: segment.x2, y: segment.y2 };
  return (sameConstructionPoint(first, a) && sameConstructionPoint(second, b))
    || (sameConstructionPoint(first, b) && sameConstructionPoint(second, a));
}

function targetValue(target, first, second) {
  const wanted = `${first}${second}`.toLowerCase();
  const reverse = `${second}${first}`.toLowerCase();
  const key = Object.keys(target || {}).find(candidate => {
    const clean = candidate.replace(/[^a-z]/gi, "").toLowerCase();
    return clean === wanted || clean === reverse;
  });
  const value = Number(key ? target[key] : NaN);
  return Number.isFinite(value) ? value : null;
}

function targetAngleValue(target, first, vertex, second) {
  const wanted = `angle${first}${vertex}${second}`.toLowerCase();
  const reverse = `angle${second}${vertex}${first}`.toLowerCase();
  const key = Object.keys(target || {}).find(candidate => {
    const clean = candidate.replace(/[^a-z]/gi, "").toLowerCase();
    return clean === wanted || clean === reverse;
  });
  const value = Number(key ? target[key] : NaN);
  return Number.isFinite(value) ? value : null;
}

export function triangleDerivedLabels({ schema, part, segmentPoints, segments, givenPoints }) {
  const explicit = Array.isArray(schema.pointLabels) ? schema.pointLabels.map(String)
    : Array.isArray(schema.derivedLabels) ? schema.derivedLabels.map(String) : [];
  const labels = explicit.length ? explicit : triangleNameFromPart(part);
  if (labels.length !== 3) return [];

  const givenIds = new Set((givenPoints || []).map(point => String(point.id || "").toUpperCase()));
  const genericTriangle = schema.type === "construction" && schema.construction?.construction === "triangle";
  if (genericTriangle) {
    const missing = labels.filter(label => !givenIds.has(label));
    const available = segmentPoints.filter(point => !(givenPoints || []).some(given => sameConstructionPoint(given, point)));
    return missing.map((label, index) => available[index] ? { point: available[index], label } : null).filter(Boolean);
  }

  if (schema.type !== "construction_triangle" || segmentPoints.length < 3) return [];
  const [firstLabel, vertexLabel, thirdLabel] = labels;
  const target = safeObject(schema.target);
  const firstLength = targetValue(target, firstLabel, vertexLabel);
  const secondLength = targetValue(target, vertexLabel, thirdLabel);
  const wantedAngle = targetAngleValue(target, firstLabel, vertexLabel, thirdLabel);
  if (![firstLength, secondLength, wantedAngle].every(Number.isFinite)) return [];

  let best = null;
  for (const vertex of segmentPoints) {
    const others = segmentPoints.filter(point => !sameConstructionPoint(point, vertex));
    for (const first of others) {
      if (!segments.some(segment => segmentConnects(segment, vertex, first))) continue;
      for (const third of others) {
        if (sameConstructionPoint(first, third)) continue;
        if (!segments.some(segment => segmentConnects(segment, vertex, third))) continue;
        const length1 = Math.hypot(first.x - vertex.x, first.y - vertex.y);
        const length2 = Math.hypot(third.x - vertex.x, third.y - vertex.y);
        const angle = angleDegrees(vertex, first, third);
        if (!Number.isFinite(angle)) continue;
        const score = Math.abs(length1 - firstLength) / Math.max(0.25, firstLength)
          + Math.abs(length2 - secondLength) / Math.max(0.25, secondLength)
          + Math.abs(angle - wantedAngle) / 45;
        if (!best || score < best.score) best = { first, vertex, third, score };
      }
    }
  }
  if (!best) return [];
  return [
    { point: best.first, label: firstLabel },
    { point: best.vertex, label: vertexLabel },
    { point: best.third, label: thirdLabel },
  ];
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

function TableResponse({ schema, value, onChange, readOnly = false }) {
  const response = safeObject(value);
  const cells = safeObject(response.cells);
  const update = (key, next) => { if (!readOnly) onChange({ ...response, cells: { ...cells, [key]: next } }); };
  return (
    <div className={`paper2-workspace paper2-table-workspace${readOnly ? " paper2-workspace-readonly" : ""}`}>
      {!readOnly && <p className="paper2-workspace-help">Complete the blank cells directly in the table. Each box is saved as you type.</p>}
      <div
        className="paper2-table-input-wrap"
        tabIndex={readOnly ? 0 : undefined}
        role={readOnly ? "region" : undefined}
        aria-label={readOnly ? "Scrollable table review" : undefined}
      >
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
                      {editable ? (readOnly ? (
                        <span className="paper2-table-review-value"><MathText>{String(cells[cell.key] ?? "—")}</MathText></span>
                      ) : (
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
                      )) : <MathText>{cell ?? ""}</MathText>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!readOnly && <div className="paper2-workspace-status">
        {Object.values(cells).filter(item => String(item ?? "").trim()).length} of {Number(schema.blankCount || 0)} table entr{Number(schema.blankCount || 0) === 1 ? "y" : "ies"} filled
      </div>}
    </div>
  );
}

function WorkspaceGuide({ type, protractorAllowed = false, rulerCompassOnly = false, customAxes = false }) {
  if (type === "graph") {
    return (
      <details className="paper2-workspace-guide" open>
        <summary>How to use the graph workspace</summary>
        <div>
          <p><strong>1. {customAxes ? "Set up the axes." : "Check the scale."}</strong> {customAxes ? "Type the quantity and unit for each axis, then choose the start, interval and maximum values." : "Read the values shown on both axes before plotting."}</p>
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
        <p><strong>Straightedge.</strong> Click the starting point, then move the pointer. SPARK shows the live length and whether the line is horizontal, vertical or slanted. Near-horizontal and near-vertical lines snap exactly into alignment.</p>
        <p><strong>Compass.</strong> Click once to set the centre. Move the pointer to set the radius, then click again to leave the circle. A compass controls distance, not degrees.</p>
        {protractorAllowed && <p><strong>Protractor.</strong> Click the angle vertex, click a point on the baseline, then move to the second arm. The live display shows the angle before the final click.</p>}
        <p><strong>Snapping.</strong> Nearby endpoints and genuine compass/line intersections are highlighted automatically so the construction stays mathematically precise.</p>
        {rulerCompassOnly && <p className="paper2-workspace-guide-note"><strong>Exam restriction:</strong> this question requires ruler and compasses only, so the protractor is not available.</p>}
        <p className="paper2-workspace-guide-note">The tool guide explains operation only. SPARK does not reveal the construction method required by the question.</p>
      </div>
    </details>
  );
}

function ConstructionWorkspace({ schema, part, value, onChange, readOnly = false }) {
  const response = safeObject(value);
  const objects = Array.isArray(response.objects) ? response.objects : [];
  const pad = safeObject(schema.pad);
  const allowedTools = Array.isArray(schema.allowedTools) && schema.allowedTools.length
    ? schema.allowedTools
    : ["segment", "circle"];
  const [tool, setTool] = useState(allowedTools[0] || "segment");
  const [anchor, setAnchor] = useState(null);
  const [hover, setHover] = useState(null);
  const [protractorPoints, setProtractorPoints] = useState([]);

  const width = 620, height = 400, margin = 28;
  const unitsPerCm = Number(pad.unitsPerCm || 40);
  const xMax = Number(pad.width) > 0 && unitsPerCm > 0 ? Number(pad.width) / unitsPerCm : 14;
  const yMax = Number(pad.height) > 0 && unitsPerCm > 0 ? Number(pad.height) / unitsPerCm : 9;
  const sx = (width - margin * 2) / xMax;
  const sy = (height - margin * 2) / yMax;
  const scale = Math.min(sx, sy);
  const toScreen = point => ({ x: margin + point.x * scale, y: height - margin - point.y * scale });
  const toMath = local => ({
    x: Math.max(0, Math.min(xMax, (local.x - margin) / scale)),
    y: Math.max(0, Math.min(yMax, (height - margin - local.y) / scale)),
  });

  const givenPoints = Array.isArray(pad.given)
    ? pad.given.map(point => ({ ...point, x: Number(point.x), y: Number(point.y) }))
    : [];
  const givenById = Object.fromEntries(givenPoints.map(point => [point.id, point]));
  const givenSegments = (pad.givenSegments || []).map(pair => {
    const a = givenById[pair?.[0]], b = givenById[pair?.[1]];
    return a && b ? { a, b, key: `${pair[0]}-${pair[1]}` } : null;
  }).filter(Boolean);

  const addObject = object => { if (!readOnly) onChange({ ...response, objects: [...objects, object] }); };
  const drawnCirclesForSnap = objects.filter(item => item?.kind === "circle");
  const givenIntersectionCandidates = givenSegments.flatMap(segment => {
    const asSegment = { x1: segment.a.x, y1: segment.a.y, x2: segment.b.x, y2: segment.b.y };
    return drawnCirclesForSnap.flatMap(circle => segmentCircleIntersections(asSegment, circle));
  });
  const constructionCandidates = [
    ...givenPoints.map(point => ({ x: point.x, y: point.y })),
    ...givenIntersectionCandidates,
    ...collectConstructionSnapPoints(objects),
  ];
  const precisePoint = (event, alignFrom = null) => {
    const raw = toMath(clientToSvg(event));
    const nearby = nearestSnapPoint(raw, constructionCandidates, 0.22);
    if (nearby) return nearby;
    const snapped = { x: snapValue(raw.x, 0.05), y: snapValue(raw.y, 0.05) };
    if (tool === "segment" && alignFrom) return straightedgeAlignment(alignFrom, snapped).point;
    return snapped;
  };
  const resetPending = () => { setAnchor(null); setProtractorPoints([]); };
  const selectTool = next => { setTool(next); resetPending(); };

  const handleCanvas = event => {
    const point = precisePoint(event, anchor);
    if (tool === "protractor") {
      if (protractorPoints.length === 0) { setProtractorPoints([point]); return; }
      if (protractorPoints.length === 1) { setProtractorPoints([...protractorPoints, point]); return; }
      const [vertex, first] = protractorPoints;
      const degrees = angleDegrees(vertex, first, point);
      if (Number.isFinite(degrees)) {
        addObject({
          kind: "angle_measure",
          vx: vertex.x, vy: vertex.y,
          ax: first.x, ay: first.y,
          bx: point.x, by: point.y,
          degrees: snapValue(degrees, 0.1),
        });
      }
      setProtractorPoints([]);
      return;
    }
    if (!anchor) { setAnchor(point); return; }
    if (tool === "segment") addObject({ kind: "segment", x1: anchor.x, y1: anchor.y, x2: point.x, y2: point.y });
    else if (tool === "circle") {
      addObject({ kind: "circle", cx: anchor.x, cy: anchor.y, r: snapValue(Math.hypot(point.x - anchor.x, point.y - anchor.y), 0.05) });
    }
    setAnchor(null);
  };

  const handleMove = event => setHover(precisePoint(event, anchor));
  const segments = objects.filter(item => item.kind === "segment");
  const circles = objects.filter(item => item.kind === "circle");
  const measurements = objects.filter(item => item.kind === "angle_measure");
  const segmentPoints = [];
  segments.forEach(item => {
    [{ x: item.x1, y: item.y1 }, { x: item.x2, y: item.y2 }].forEach(point => {
      const isGiven = givenPoints.some(given => Math.hypot(given.x - point.x, given.y - point.y) < 0.16);
      if (!isGiven && !segmentPoints.some(existing => Math.hypot(existing.x - point.x, existing.y - point.y) < 0.16)) segmentPoints.push(point);
    });
  });
  const derivedLabels = triangleDerivedLabels({ schema, part, segmentPoints, segments, givenPoints });
  const liveLength = anchor && hover ? Math.hypot(hover.x - anchor.x, hover.y - anchor.y) : null;
  const liveStraightedge = anchor && hover && tool === "segment" ? straightedgeAlignment(anchor, hover) : null;
  const liveAngle = tool === "protractor" && protractorPoints.length === 2 && hover
    ? angleDegrees(protractorPoints[0], protractorPoints[1], hover)
    : null;
  const rulerCompassOnly = schema.toolPolicy === "ruler_compasses_only";
  const xTicks = Array.from({ length: Math.floor(xMax) + 1 }, (_, index) => index);
  const yTicks = Array.from({ length: Math.floor(yMax) + 1 }, (_, index) => index);

  return (
    <div className={`paper2-workspace paper2-construction-workspace${readOnly ? " paper2-workspace-readonly" : ""}`}>
      {!readOnly && <WorkspaceGuide type="construction" protractorAllowed={allowedTools.includes("protractor")} rulerCompassOnly={rulerCompassOnly} />}
      {!readOnly && <div className="paper2-workspace-toolbar" aria-label="Construction tools">
        {allowedTools.includes("segment") && <button type="button" className={tool === "segment" ? "active" : ""} onClick={() => selectTool("segment")}>Straightedge</button>}
        {allowedTools.includes("circle") && <button type="button" className={tool === "circle" ? "active" : ""} onClick={() => selectTool("circle")}>Compass</button>}
        {allowedTools.includes("protractor") && <button type="button" className={tool === "protractor" ? "active" : ""} onClick={() => selectTool("protractor")}>Protractor</button>}
        <button type="button" disabled={!objects.length} onClick={() => { onChange({ ...response, objects: objects.slice(0, -1) }); resetPending(); }}>Undo</button>
        <button type="button" disabled={!objects.length} onClick={() => { onChange({ ...response, objects: [] }); resetPending(); }}>Clear</button>
      </div>}
      {!readOnly && <div className="paper2-tool-instruction" role="status">
        {tool === "segment" && <>Straightedge selected. Click a start point, then an end point. {Number.isFinite(liveLength) && <strong className={`paper2-straightedge-readout ${liveStraightedge?.kind || ""}`}>{liveStraightedge?.kind === "horizontal" ? "Horizontal, level" : liveStraightedge?.kind === "vertical" ? "Vertical, upright" : `Slanted, ${Number(liveStraightedge?.angleFromHorizontal || 0).toFixed(1)}° from horizontal`} · {liveLength.toFixed(2)} cm{["horizontal", "vertical"].includes(liveStraightedge?.kind) ? " · alignment locked" : ""}</strong>}</>}
        {tool === "circle" && <>Compass selected. Click the centre, then choose the radius. {Number.isFinite(liveLength) && <strong>Radius: {liveLength.toFixed(2)} cm</strong>}</>}
        {tool === "protractor" && <>Protractor selected. Vertex → baseline → second arm. {Number.isFinite(liveAngle) && <strong>Angle: {liveAngle.toFixed(1)}°</strong>}</>}
      </div>}

      <svg className="paper2-construction-canvas" viewBox={`0 0 ${width} ${height}`} onPointerDown={readOnly ? undefined : handleCanvas} onPointerMove={readOnly ? undefined : handleMove} onPointerLeave={readOnly ? undefined : () => setHover(null)} role="img" aria-label={readOnly ? "Construction review diagram" : "Virtual mathematical construction workspace"}>
        <rect x="0" y="0" width={width} height={height} fill="none" stroke="currentColor" strokeOpacity="0.28" />
        {xTicks.map(index => {
          const p = toScreen({ x: index, y: 0 });
          return <g key={`xt-${index}`}><line x1={p.x} y1={height - margin} x2={p.x} y2={height - margin + 6} stroke="currentColor"/><text x={p.x} y={height - 7} textAnchor="middle" fill="currentColor" stroke="none" fontSize="10">{index}</text></g>;
        })}
        {yTicks.map(index => {
          const p = toScreen({ x: 0, y: index });
          return <g key={`yt-${index}`}><line x1={margin - 6} y1={p.y} x2={margin} y2={p.y} stroke="currentColor"/><text x={margin - 9} y={p.y + 3} textAnchor="end" fill="currentColor" stroke="none" fontSize="10">{index}</text></g>;
        })}

        {givenSegments.map(segment => {
          const a = toScreen(segment.a), b = toScreen(segment.b);
          return <line key={`given-${segment.key}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeWidth="2.4" />;
        })}
        {givenPoints.map(point => {
          const p = toScreen(point);
          return <g key={`given-point-${point.id}`} pointerEvents="none"><circle cx={p.x} cy={p.y} r="3.2" fill="currentColor" stroke="none"/><text x={p.x + 7} y={p.y - 7} fill="currentColor" stroke="none" fontSize="13" fontStyle="italic">{point.id}</text></g>;
        })}

        {objects.map((item, index) => {
          if (item.kind === "circle") {
            const c = toScreen({ x: item.cx, y: item.cy });
            return <circle key={index} cx={c.x} cy={c.y} r={item.r * scale} fill="none" stroke="currentColor" strokeWidth={item.constructionGuide ? "1.15" : "1"} strokeOpacity={item.constructionGuide ? "0.48" : "0.62"} strokeDasharray="4 3" />;
          }
          if (item.kind === "angle_measure") {
            const v=toScreen({x:item.vx,y:item.vy}), a=toScreen({x:item.ax,y:item.ay}), b=toScreen({x:item.bx,y:item.by});
            return <g key={index} className="paper2-protractor-measure" pointerEvents="none"><line x1={v.x} y1={v.y} x2={a.x} y2={a.y} stroke="currentColor" strokeOpacity="0.35"/><line x1={v.x} y1={v.y} x2={b.x} y2={b.y} stroke="currentColor" strokeOpacity="0.35"/><text x={v.x+12} y={v.y-12} fill="currentColor" stroke="none" fontSize="12">{Number(item.degrees).toFixed(1)}°</text></g>;
          }
          const a = toScreen({ x: item.x1, y: item.y1 }), b = toScreen({ x: item.x2, y: item.y2 });
          return <line key={index} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeWidth={item.constructionGuide ? "1.35" : "2"} strokeOpacity={item.constructionGuide ? "0.5" : "1"} strokeDasharray={item.constructionGuide ? "5 4" : undefined} />;
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
        {derivedLabels.map(({ point, label }) => {
          const p = toScreen(point);
          return <text key={`${label}-${point.x}-${point.y}`} x={p.x + 7} y={p.y - 7} fill="currentColor" stroke="none" fontSize="13" fontStyle="italic">{label}</text>;
        })}
      </svg>

      {!readOnly && <div className="paper2-workspace-status">
        {segments.length} straightedge line{segments.length === 1 ? "" : "s"} · {circles.length} compass circle{circles.length === 1 ? "" : "s"}{measurements.length ? ` · ${measurements.length} angle measurement${measurements.length === 1 ? "" : "s"}` : ""}
        {givenPoints.length ? ` · ${givenPoints.length} given point${givenPoints.length === 1 ? "" : "s"}` : ""}
        {hover ? ` · pointer ${hover.x.toFixed(2)} cm, ${hover.y.toFixed(2)} cm` : ""}
        {anchor && tool === "circle" ? ` · centre locked at (${anchor.x.toFixed(2)}, ${anchor.y.toFixed(2)})` : ""}
        {anchor && tool === "segment" ? ` · start locked at (${anchor.x.toFixed(2)}, ${anchor.y.toFixed(2)})` : ""}
      </div>}
    </div>
  );
}

function TilePatternWorkspace({ value, onChange, readOnly = false }) {
  const response = safeObject(value);
  const cells = Array.isArray(response.cells) ? response.cells : [];
  const map = useMemo(() => new Map(cells.map(cell => [`${cell.x},${cell.y}`, cell.state])), [cells]);
  const cycle = (x, y) => {
    if (readOnly) return;
    const key = `${x},${y}`;
    const current = map.get(key) || "empty";
    const next = current === "empty" ? "white" : current === "white" ? "shaded" : "empty";
    const retained = cells.filter(cell => !(cell.x === x && cell.y === y));
    onChange({ ...response, cells: next === "empty" ? retained : [...retained, { x, y, state: next }] });
  };
  return (
    <div className={`paper2-workspace paper2-tile-workspace${readOnly ? " paper2-workspace-readonly" : ""}`}>
      {!readOnly && <p className="paper2-workspace-help">Click a square to cycle through empty, white and shaded tiles. Build the design in the grid.</p>}
      <div className="paper2-tile-grid">
        {Array.from({ length: 5 }, (_, y) => Array.from({ length: 10 }, (__, x) => {
          const state = map.get(`${x},${y}`) || "empty";
          return <button type="button" disabled={readOnly} tabIndex={readOnly ? -1 : undefined} aria-label={`row ${y + 1}, column ${x + 1}, ${state}`} className={`paper2-tile-cell ${state}`} key={`${x}-${y}`} onClick={() => cycle(x, y)}>{state === "shaded" ? "■" : state === "white" ? "□" : ""}</button>;
        }))}
      </div>
      {!readOnly && <div className="paper2-workspace-toolbar"><button type="button" disabled={!cells.length} onClick={() => onChange({ ...response, cells: [] })}>Clear design</button></div>}
    </div>
  );
}

function GraphWorkspace({ schema, value, onChange, readOnly = false }) {
  const response = safeObject(value);
  const [hover, setHover] = useState(null);
  const graph = schema.graph || {};
  const width = 650, height = 420, margin = 45;
  const customAxes = graph.axisSetupMode === "custom" || Boolean(graph.allowCustomAxes);
  const numericAxis = (value, fallback) => {
    if (value === "" || value === null || value === undefined) return Number(fallback);
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : Number(fallback);
  };
  const candidateXMin = numericAxis(response.axisXMin, graph.xMin ?? -5);
  const candidateXMax = numericAxis(response.axisXMax, graph.xMax ?? 5);
  const candidateYMin = numericAxis(response.axisYMin, graph.yMin ?? -5);
  const candidateYMax = numericAxis(response.axisYMax, graph.yMax ?? 5);
  const xMin = candidateXMax > candidateXMin ? candidateXMin : Number(graph.xMin ?? -5);
  const xMax = candidateXMax > candidateXMin ? candidateXMax : Number(graph.xMax ?? 5);
  const yMin = candidateYMax > candidateYMin ? candidateYMin : Number(graph.yMin ?? -5);
  const yMax = candidateYMax > candidateYMin ? candidateYMax : Number(graph.yMax ?? 5);
  const hasCustomAxisNumbers = [response.axisXMin, response.axisXMax, response.axisXStep, response.axisYMin, response.axisYMax, response.axisYStep]
    .every(value => value !== "" && value !== null && value !== undefined && Number.isFinite(Number(value)));
  const hasCustomAxisLabels = String(response.axisXLabel || "").trim().length > 0 && String(response.axisYLabel || "").trim().length > 0;
  const customAxisRangesValid = Number(response.axisXMax) > Number(response.axisXMin) && Number(response.axisYMax) > Number(response.axisYMin)
    && Number(response.axisXStep) > 0 && Number(response.axisYStep) > 0;
  const customAxisReady = !customAxes || (hasCustomAxisNumbers && hasCustomAxisLabels && customAxisRangesValid);
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
  const [graphTool, setGraphTool] = useState("point");
  const combinedPointLineMode = mode === "scatter_line";
  const activeGraphTool = combinedPointLineMode ? graphTool : mode;
  const xGrid = Number((customAxes ? response.axisXStep : null) || graph.xStep || 1);
  const yGrid = Number((customAxes ? response.axisYStep : null) || graph.yStep || 1);
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
    if (customAxes && !customAxisReady) return;
    const p = pointFromEvent(event);
    if (activeGraphTool === "line") {
      const next = linePoints.length >= 2 ? [p] : linePoints.some(existing => sameCoordinate(existing,p)) ? linePoints : [...linePoints, p];
      onChange({ ...response, linePoints: next });
    } else if (!points.some(existing => sameCoordinate(existing,p))) {
      onChange({ ...response, points: [...points, p] });
    }
  };
  const xTicks = [];
  const yTicks = [];
  const xMinorTicks = [];
  const yMinorTicks = [];
  if (xGrid > 0) for (let x = Math.ceil(xMin / xGrid) * xGrid; x <= xMax + 1e-9; x += xGrid) xTicks.push(Number(x.toFixed(6)));
  if (yGrid > 0) for (let y = Math.ceil(yMin / yGrid) * yGrid; y <= yMax + 1e-9; y += yGrid) yTicks.push(Number(y.toFixed(6)));
  const minorPerStep = Math.max(1, Number(graph.minorPerStep || 1));
  const xMinor = xGrid / minorPerStep;
  const yMinor = yGrid / minorPerStep;
  if (minorPerStep > 1 && xMinor > 0) {
    for (let x = Math.ceil(xMin / xMinor) * xMinor; x <= xMax + 1e-9; x += xMinor) {
      if (!xTicks.some(major => Math.abs(major - x) < 1e-8)) xMinorTicks.push(Number(x.toFixed(6)));
    }
  }
  if (minorPerStep > 1 && yMinor > 0) {
    for (let y = Math.ceil(yMin / yMinor) * yMinor; y <= yMax + 1e-9; y += yMinor) {
      if (!yTicks.some(major => Math.abs(major - y) < 1e-8)) yMinorTicks.push(Number(y.toFixed(6)));
    }
  }
  const supportsCurve = !combinedPointLineMode && (!Array.isArray(graph.tools) || graph.tools.length === 0 || graph.tools.includes("curve"));
  const orderedPoints = [...points].sort((a, b) => Number(a.x) - Number(b.x));
  const background = Array.isArray(graph.backgroundPoints) ? graph.backgroundPoints.map(([x, y]) => ({ x, y })) : [];
  const answerFields = safeObject(response.answerFields);
  const activePoints = activeGraphTool === "line" ? linePoints : points;
  const removePoint = index => {
    if (activeGraphTool === "line") onChange({ ...response, linePoints: linePoints.filter((_,i) => i !== index) });
    else onChange({ ...response, points: points.filter((_,i) => i !== index) });
  };
  return (
    <div className={`paper2-workspace paper2-graph-workspace${readOnly ? " paper2-workspace-readonly" : ""}`}>
      {!readOnly && <WorkspaceGuide type="graph" customAxes={customAxes} />}
      {!readOnly && combinedPointLineMode && (
        <div className="paper2-workspace-toolbar paper2-graph-mode-toolbar" role="group" aria-label="Graph drawing tool">
          <span>Graph tools</span>
          <button type="button" className={graphTool === "point" ? "active" : ""} onClick={() => setGraphTool("point")}>Plot points</button>
          <button type="button" className={graphTool === "line" ? "active" : ""} onClick={() => setGraphTool("line")}>Best-fit line</button>
        </div>
      )}
      {!readOnly && customAxes && (
        <fieldset className="paper2-axis-editor">
          <legend>Set up your graph axes</legend>
          <p>Name both axes and choose the scale before plotting. If the question specifies a scale, you may still choose another one, but the examiner scale mark follows the stated instruction.</p>
          <div className="paper2-axis-editor-grid">
            <label className="paper2-axis-label-field"><span>x-axis label</span><input type="text" value={response.axisXLabel ?? ""} onChange={event => onChange({ ...response, axisXLabel: event.target.value })} placeholder="Quantity and unit"/></label>
            <label><span>x-axis start</span><input type="number" inputMode="decimal" value={response.axisXMin ?? ""} onChange={event => onChange({ ...response, axisXMin: event.target.value })} placeholder="0"/></label>
            <label><span>x-axis interval</span><input type="number" inputMode="decimal" min="0" step="any" value={response.axisXStep ?? ""} onChange={event => onChange({ ...response, axisXStep: event.target.value })} placeholder="Scale"/></label>
            <label><span>x-axis maximum</span><input type="number" inputMode="decimal" value={response.axisXMax ?? ""} onChange={event => onChange({ ...response, axisXMax: event.target.value })} placeholder="Maximum"/></label>
            <label className="paper2-axis-label-field"><span>y-axis label</span><input type="text" value={response.axisYLabel ?? ""} onChange={event => onChange({ ...response, axisYLabel: event.target.value })} placeholder="Quantity and unit"/></label>
            <label><span>y-axis start</span><input type="number" inputMode="decimal" value={response.axisYMin ?? ""} onChange={event => onChange({ ...response, axisYMin: event.target.value })} placeholder="0"/></label>
            <label><span>y-axis interval</span><input type="number" inputMode="decimal" min="0" step="any" value={response.axisYStep ?? ""} onChange={event => onChange({ ...response, axisYStep: event.target.value })} placeholder="Scale"/></label>
            <label><span>y-axis maximum</span><input type="number" inputMode="decimal" value={response.axisYMax ?? ""} onChange={event => onChange({ ...response, axisYMax: event.target.value })} placeholder="Maximum"/></label>
          </div>
          <div className={`paper2-axis-status ${customAxisReady ? "ready" : "waiting"}`} role="status">{customAxisReady ? "Axes ready. Plot your data using the scale you set." : "Complete both labels, starts, intervals and maximum values to activate plotting."}</div>
        </fieldset>
      )}
      {!readOnly && !customAxes && graph.requireAxisSetup && (
        <div className="paper2-axis-setup">
          <label><span>x-axis interval</span><select value={response.axisXStep ?? ""} onChange={event => onChange({ ...response, axisXStep: Number(event.target.value) || "" })}><option value="">Select</option>{(graph.axisChoices || []).map(v => <option key={v} value={v}>{v}</option>)}</select></label>
          <label><span>y-axis interval</span><select value={response.axisYStep ?? ""} onChange={event => onChange({ ...response, axisYStep: Number(event.target.value) || "" })}><option value="">Select</option>{(graph.axisChoices || []).map(v => <option key={v} value={v}>{v}</option>)}</select></label>
        </div>
      )}
      {!readOnly && <div className="paper2-tool-instruction" role="status">
        {customAxes && !customAxisReady ? <>Set up and label both axes before plotting.</> : hover ? <><strong>Coordinate: ({formatNumber(hover.x)}, {formatNumber(hover.y)})</strong> Click to {activeGraphTool === "line" ? "select this point for the line" : "plot this point"}.</> : <>Move over the grid to preview the exact coordinate before plotting.</>}
      </div>}
      <svg className="paper2-graph-canvas" viewBox={`0 0 ${width} ${height}`} onPointerDown={readOnly || (customAxes && !customAxisReady) ? undefined : click} onPointerMove={readOnly || (customAxes && !customAxisReady) ? undefined : event => setHover(pointFromEvent(event))} onPointerLeave={readOnly ? undefined : () => setHover(null)} role="img" aria-label={readOnly ? "Graph review diagram" : "Interactive graph plotting workspace"}>
        <rect x="0" y="0" width={width} height={height} fill="none" stroke="currentColor" strokeOpacity="0.25" />
        {xMinorTicks.map(x => { const p = toScreen({ x, y: 0 }); return <line key={`xm-${x}`} x1={p.x} y1={margin} x2={p.x} y2={height-margin} stroke="currentColor" strokeOpacity="0.055"/>; })}
        {yMinorTicks.map(y => { const p = toScreen({ x: 0, y }); return <line key={`ym-${y}`} x1={margin} y1={p.y} x2={width-margin} y2={p.y} stroke="currentColor" strokeOpacity="0.055"/>; })}
        {xTicks.map(x => { const p = toScreen({ x, y: 0 }); return <g key={`x-${x}`}><line x1={p.x} y1={margin} x2={p.x} y2={height-margin} stroke="currentColor" strokeOpacity="0.12"/>{(!customAxes || customAxisReady || readOnly) && <text x={p.x} y={height-margin+18} textAnchor="middle" fill="currentColor" stroke="none" fontSize="10">{x}</text>}</g>; })}
        {yTicks.map(y => { const p = toScreen({ x: 0, y }); return <g key={`y-${y}`}><line x1={margin} y1={p.y} x2={width-margin} y2={p.y} stroke="currentColor" strokeOpacity="0.12"/>{(!customAxes || customAxisReady || readOnly) && <text x={margin-8} y={p.y+3} textAnchor="end" fill="currentColor" stroke="none" fontSize="10">{y}</text>}</g>; })}
        {xMin <= 0 && xMax >= 0 && (() => { const p = toScreen({x:0,y:0}); return <line x1={p.x} y1={margin} x2={p.x} y2={height-margin} stroke="currentColor" strokeWidth="1.5"/>; })()}
        {yMin <= 0 && yMax >= 0 && (() => { const p = toScreen({x:0,y:0}); return <line x1={margin} y1={p.y} x2={width-margin} y2={p.y} stroke="currentColor" strokeWidth="1.5"/>; })()}
        {(customAxes ? String(response.axisXLabel || "").trim() : graph.xLabel) && <text x={width/2} y={height-7} textAnchor="middle" fill="currentColor" stroke="none" fontSize="12">{customAxes ? response.axisXLabel : graph.xLabel}</text>}
        {(customAxes ? String(response.axisYLabel || "").trim() : graph.yLabel) && <text transform={`translate(14 ${height/2}) rotate(-90)`} textAnchor="middle" fill="currentColor" stroke="none" fontSize="12">{customAxes ? response.axisYLabel : graph.yLabel}</text>}
        {background.length > 1 && <path d={smoothCurvePath(background, toScreen)} fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />}
        {response.curve && orderedPoints.length > 1 && <path d={smoothCurvePath(orderedPoints, toScreen)} fill="none" stroke="currentColor" strokeWidth="2" />}
        {points.map((point,index) => { const p=toScreen(point); return <g key={`p-${index}`}><circle cx={p.x} cy={p.y} r="4" fill="currentColor" stroke="none"/><text x={p.x+6} y={p.y-7} fill="currentColor" stroke="none" fontSize="9">({formatNumber(point.x)}, {formatNumber(point.y)})</text></g>; })}
        {linePoints.length >= 2 && (() => { const a=toScreen(linePoints[0]),b=toScreen(linePoints[linePoints.length-1]); return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeWidth="2.2"/>; })()}
        {linePoints.map((point,index) => { const p=toScreen(point); return <circle key={`l-${index}`} cx={p.x} cy={p.y} r="4" fill="currentColor" stroke="none"/>; })}
        {hover && (() => { const p=toScreen(hover); const tx=Math.min(width-118,Math.max(6,p.x+10)); const ty=Math.max(20,p.y-12); return <g pointerEvents="none" className="paper2-graph-crosshair"><line x1={p.x} y1={margin} x2={p.x} y2={height-margin} stroke="currentColor" strokeDasharray="3 3"/><line x1={margin} y1={p.y} x2={width-margin} y2={p.y} stroke="currentColor" strokeDasharray="3 3"/><circle cx={p.x} cy={p.y} r="5" fill="none" stroke="currentColor" strokeWidth="2"/><rect x={tx} y={ty-14} width="104" height="20" rx="5" fill="currentColor" opacity="0.88"/><text x={tx+52} y={ty} textAnchor="middle" fill="white" stroke="none" fontSize="11">({formatNumber(hover.x)}, {formatNumber(hover.y)})</text></g>; })()}
      </svg>
      {!readOnly && activePoints.length > 0 && (
        <div className="paper2-plotted-points" aria-label="Plotted points">
          <span>{activeGraphTool === "line" ? "Line points" : "Points plotted"}</span>
          <div>{activePoints.map((point,index) => <button type="button" key={`${point.x}-${point.y}-${index}`} onClick={() => removePoint(index)} title="Remove this point">({formatNumber(point.x)}, {formatNumber(point.y)}) ×</button>)}</div>
        </div>
      )}
      {!readOnly && <div className="paper2-workspace-toolbar">
        {mode !== "line" && supportsCurve && <button type="button" className={response.curve ? "active" : ""} onClick={() => onChange({ ...response, curve: !response.curve })}>{response.curve ? "Smooth curve selected" : "Join with smooth curve"}</button>}
        <button type="button" disabled={!activePoints.length} onClick={() => onChange(activeGraphTool === "line" ? { ...response, linePoints: linePoints.slice(0, -1) } : { ...response, points: points.slice(0, -1) })}>Undo point</button>
        <button type="button" disabled={!activePoints.length} onClick={() => onChange({ ...response, points: [], linePoints: [] })}>Clear graph</button>
      </div>}
      {!readOnly && (schema.answerFields || []).length > 0 && (
        <div className="paper2-rich-fields paper2-graph-answer-fields">
          {schema.answerFields.map(field => <label className="paper2-rich-field" key={field.id}><span>{field.label}</span><FieldInput field={field} value={answerFields[field.id]} onChange={next => onChange({ ...response, answerFields: { ...answerFields, [field.id]: next } })}/></label>)}
        </div>
      )}
    </div>
  );
}

function WrittenResponse({ value, onChange, readOnly = false }) {
  const response = safeObject(value);
  if (readOnly) return <div className="paper2-written-review"><MathText>{response.answer || "No answer"}</MathText></div>;
  return (
    <div className="paper2-workspace paper2-written-workspace">
      <label className="paper2-rich-field">
        <span>Written response</span>
        <textarea
          rows={4}
          value={response.answer ?? ""}
          onChange={event => onChange({ ...response, answer: event.target.value })}
          placeholder="Write your answer and mathematical reason clearly"
          spellCheck="true"
        />
      </label>
    </div>
  );
}

export default function Paper2ResponseInput({ part, value, onChange = () => {}, readOnly = false }) {
  const schema = part?.responseSchema;
  if (!schema) return null;
  if (schema.type === "written") return <WrittenResponse value={value} onChange={onChange} readOnly={readOnly} />;
  if (schema.type === "fields") return <FieldsResponse schema={schema} value={value} onChange={onChange} />;
  if (schema.type === "table") return <TableResponse schema={schema} value={value} onChange={onChange} readOnly={readOnly} />;
  if (schema.type === "construction_triangle" || schema.type === "construction") return <ConstructionWorkspace schema={schema} part={part} value={value} onChange={onChange} readOnly={readOnly} />;
  if (schema.type === "tile_pattern") return <TilePatternWorkspace schema={schema} value={value} onChange={onChange} readOnly={readOnly} />;
  if (schema.type === "graph") return <GraphWorkspace schema={schema} value={value} onChange={onChange} readOnly={readOnly} />;
  return null;
}
