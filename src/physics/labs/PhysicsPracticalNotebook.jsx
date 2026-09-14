import React, { useEffect, useMemo, useState } from 'react';
import MathText from '../../practice/MathText';
import { physicsPracticalForInteractive } from './physicsPracticalBlueprints.mjs';
import './physicsPracticalNotebook.css';

const emptyRows = (blueprint) => Array.from({ length: blueprint?.table?.rows || 5 }, () =>
  Object.fromEntries((blueprint?.table?.columns || []).map(column => [column.key, '']))
);

function storageKey(interactiveId, userId) {
  return `spark:physics:practical:v1:${String(userId || 'guest')}:${interactiveId}`;
}

function readNotebook(interactiveId, userId, blueprint) {
  const fallback = { rows:emptyRows(blueprint), conclusion:'', evaluation:'' };
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const parsed = JSON.parse(window.localStorage.getItem(storageKey(interactiveId, userId)) || 'null');
    if (!parsed || !Array.isArray(parsed.rows)) return fallback;
    return { rows:parsed.rows, conclusion:String(parsed.conclusion || ''), evaluation:String(parsed.evaluation || '') };
  } catch (_) {
    return fallback;
  }
}

function numeric(value) {
  const text = String(value ?? '').trim().replace(',', '.');
  if (!text) return null;
  const valueNumber = Number(text);
  return Number.isFinite(valueNumber) ? valueNumber : null;
}

function linearFit(points) {
  if (points.length < 2) return null;
  const n = points.length;
  const sx = points.reduce((sum, point) => sum + point.x, 0);
  const sy = points.reduce((sum, point) => sum + point.y, 0);
  const sxx = points.reduce((sum, point) => sum + point.x * point.x, 0);
  const sxy = points.reduce((sum, point) => sum + point.x * point.y, 0);
  const denominator = n * sxx - sx * sx;
  if (Math.abs(denominator) < 1e-12) return null;
  const gradient = (n * sxy - sx * sy) / denominator;
  const intercept = (sy - gradient * sx) / n;
  return { gradient, intercept };
}

const SUPERSCRIPT_DIGITS = Object.freeze({ '-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹' });
function formatNumber(value) {
  if (!Number.isFinite(value)) return '';
  const magnitude = Math.abs(value);
  if (magnitude !== 0 && (magnitude >= 10000 || magnitude < 0.001)) {
    const exponent = Math.floor(Math.log10(magnitude));
    const coefficient = Number((value / 10 ** exponent).toFixed(3));
    const raised = String(exponent).split('').map(character => SUPERSCRIPT_DIGITS[character] || character).join('');
    return `${coefficient} × 10${raised}`;
  }
  return Number(value.toFixed(4)).toString();
}

function NotebookGraph({ blueprint, rows }) {
  const graph = blueprint.graph;
  const state = useMemo(() => {
    if (!graph) return null;
    const points = rows.map(row => ({ x:numeric(row[graph.xKey]), y:numeric(row[graph.yKey]) })).filter(point => point.x !== null && point.y !== null);
    if (points.length < 2 || graph.fitMode === 'none') return { points, fit:null };
    return { points, fit:linearFit(points) };
  }, [blueprint, graph, rows]);

  if (!graph) return null;
  const points = state?.points || [];
  const fit = state?.fit || null;
  const width = 560, height = 330, left = 64, right = 24, top = 24, bottom = 58;
  const usableW = width - left - right, usableH = height - top - bottom;
  let xMin = points.length ? Math.min(...points.map(point => point.x)) : 0;
  let xMax = points.length ? Math.max(...points.map(point => point.x)) : 1;
  let yMin = points.length ? Math.min(...points.map(point => point.y)) : 0;
  let yMax = points.length ? Math.max(...points.map(point => point.y)) : 1;
  if (xMin >= 0) xMin = 0;
  if (yMin >= 0) yMin = 0;
  if (xMax === xMin) xMax = xMin + 1;
  if (yMax === yMin) yMax = yMin + 1;
  xMax += (xMax - xMin) * 0.08;
  yMax += (yMax - yMin) * 0.08;
  const X = x => left + ((x - xMin) / (xMax - xMin)) * usableW;
  const Y = y => top + usableH - ((y - yMin) / (yMax - yMin)) * usableH;
  const fitStart = fit ? { x:xMin, y:fit.gradient * xMin + fit.intercept } : null;
  const fitEnd = fit ? { x:xMax, y:fit.gradient * xMax + fit.intercept } : null;

  return (
    <section className="ppn-graph-card">
      <div className="ppn-subhead"><div><span>Live graph</span><h5>{graph.yLabel} against {graph.xLabel}</h5></div><small>{points.length < 2 ? 'Enter at least two numeric pairs' : `${points.length} points plotted`}</small></div>
      <div className="ppn-graph-wrap">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Graph of ${graph.yLabel} against ${graph.xLabel}`}>
          <line className="ppn-axis" x1={left} y1={top} x2={left} y2={height-bottom}/>
          <line className="ppn-axis" x1={left} y1={height-bottom} x2={width-right} y2={height-bottom}/>
          {[0,1,2,3,4].map(index => {
            const fraction = index / 4;
            const xValue = xMin + (xMax-xMin)*fraction;
            const yValue = yMin + (yMax-yMin)*fraction;
            return <React.Fragment key={index}>
              <line className="ppn-gridline" x1={X(xValue)} y1={top} x2={X(xValue)} y2={height-bottom}/>
              <line className="ppn-gridline" x1={left} y1={Y(yValue)} x2={width-right} y2={Y(yValue)}/>
              <text className="ppn-tick" x={X(xValue)} y={height-bottom+22} textAnchor="middle">{formatNumber(xValue)}</text>
              <text className="ppn-tick" x={left-10} y={Y(yValue)+4} textAnchor="end">{formatNumber(yValue)}</text>
            </React.Fragment>;
          })}
          {fit && fitStart && fitEnd && <line className="ppn-best-fit" x1={X(fitStart.x)} y1={Y(fitStart.y)} x2={X(fitEnd.x)} y2={Y(fitEnd.y)}/>}
          {points.map((point,index) => <circle className="ppn-point" key={index} cx={X(point.x)} cy={Y(point.y)} r="5"/>)}
          <text className="ppn-axis-label" x={left+usableW/2} y={height-10} textAnchor="middle">{graph.xLabel}</text>
          <text className="ppn-axis-label" x="16" y={top+usableH/2} textAnchor="middle" transform={`rotate(-90 16 ${top+usableH/2})`}>{graph.yLabel}</text>
        </svg>
      </div>
      {fit && <div className="ppn-fit"><strong>Best-fit line guide</strong><span>gradient ≈ {formatNumber(fit.gradient)}, intercept ≈ {formatNumber(fit.intercept)}</span></div>}
      {!fit && points.length >= 2 && graph.fitMode === 'none' && <div className="ppn-fit ppn-fit-note"><strong>Graph guide</strong><span>{graph.fitGuidance || 'Use the pattern of the plotted points. Do not force a straight line unless the relationship requires one.'}</span></div>}
      <MathText as="p" prose>{graph.relationship}</MathText>
      {graph.gradientMeaning && <MathText as="p" prose>{graph.gradientMeaning}</MathText>}
    </section>
  );
}

export default function PhysicsPracticalNotebook({ interactiveId, userId }) {
  const blueprint = physicsPracticalForInteractive(interactiveId);
  const [notebook, setNotebook] = useState(() => blueprint ? readNotebook(interactiveId, userId, blueprint) : { rows:[], conclusion:'', evaluation:'' });

  useEffect(() => {
    if (!blueprint) return;
    setNotebook(readNotebook(interactiveId, userId, blueprint));
  }, [interactiveId, userId, blueprint]);

  useEffect(() => {
    if (!blueprint) return;
    try {
      if (typeof window !== 'undefined' && window.localStorage) window.localStorage.setItem(storageKey(interactiveId, userId), JSON.stringify(notebook));
    } catch (_) {}
  }, [blueprint, interactiveId, userId, notebook]);

  if (!blueprint) return null;

  const updateCell = (rowIndex, key, value) => setNotebook(previous => ({
    ...previous,
    rows:previous.rows.map((row, index) => index === rowIndex ? { ...row, [key]:value } : row),
  }));
  const clearNotebook = () => setNotebook({ rows:emptyRows(blueprint), conclusion:'', evaluation:'' });

  return (
    <article className="ppn" aria-label={`${blueprint.title} practical notebook`}>
      <header className="ppn-head">
        <div><span className="ppn-kicker">Practical activity</span><h4>{blueprint.title}</h4><MathText as="p" prose>{blueprint.aim}</MathText></div>
        <span className="ppn-source">CSEC Physics</span>
      </header>

      <div className="ppn-overview">
        <section><h5>Apparatus</h5><ul>{blueprint.apparatus.map((item,index) => <li key={index}><MathText prose>{item}</MathText></li>)}</ul></section>
        {blueprint.variables && <section><h5>Variables</h5><p><strong>Independent:</strong> <MathText prose>{blueprint.variables.independent}</MathText></p><p><strong>Dependent:</strong> <MathText prose>{blueprint.variables.dependent}</MathText></p>{blueprint.variables.controls.length > 0 && <p><strong>Keep controlled:</strong> <MathText prose>{blueprint.variables.controls.join('; ')}</MathText></p>}</section>}
      </div>

      <details className="ppn-section" open>
        <summary>Method</summary>
        <ol>{blueprint.method.map((step,index) => <li key={index}><MathText prose>{step}</MathText></li>)}</ol>
      </details>

      {blueprint.table && <section className="ppn-section ppn-record">
        <div className="ppn-subhead"><div><span>Results</span><h5>Record your readings</h5></div><button type="button" className="ppn-clear" onClick={clearNotebook}>Clear table</button></div>
        <div className="ppn-table-wrap" tabIndex="0" aria-label="Practical results table, horizontally scrollable if needed">
          <table><thead><tr>{blueprint.table.columns.map(column => <th key={column.key}><MathText prose>{column.label}{column.unit ? ` / ${column.unit}` : ''}</MathText></th>)}</tr></thead>
          <tbody>{notebook.rows.map((row,rowIndex) => <tr key={rowIndex}>{blueprint.table.columns.map(column => <td key={column.key}><input aria-label={`${column.label} row ${rowIndex+1}`} inputMode={column.type === 'text' ? undefined : 'decimal'} value={row[column.key] ?? ''} onChange={event => updateCell(rowIndex,column.key,event.target.value)} /></td>)}</tr>)}</tbody></table>
        </div>
      </section>}

      <NotebookGraph blueprint={blueprint} rows={notebook.rows} />

      {blueprint.analysis.length > 0 && <details className="ppn-section"><summary>Analysis and calculation</summary><ul>{blueprint.analysis.map((item,index) => <li key={index}><MathText prose>{item}</MathText></li>)}</ul></details>}

      <div className="ppn-evaluation-grid">
        {blueprint.errors.length > 0 && <section><h5>Sources of error</h5><ul>{blueprint.errors.map((item,index) => <li key={index}><MathText prose>{item}</MathText></li>)}</ul></section>}
        {blueprint.accuracy.length > 0 && <section><h5>Precautions</h5><ul>{blueprint.accuracy.map((item,index) => <li key={index}><MathText prose>{item}</MathText></li>)}</ul></section>}
        {blueprint.safety.length > 0 && <section><h5>Safety</h5><ul>{blueprint.safety.map((item,index) => <li key={index}><MathText prose>{item}</MathText></li>)}</ul></section>}
      </div>

      <section className="ppn-writeup">
        <label><span>Conclusion</span><textarea value={notebook.conclusion} onChange={event => setNotebook(previous => ({...previous,conclusion:event.target.value}))} placeholder="State the relationship or result supported by your readings." /></label>
        <label><span>Evaluation</span><textarea value={notebook.evaluation} onChange={event => setNotebook(previous => ({...previous,evaluation:event.target.value}))} placeholder="State one important source of error and one specific improvement to the method." /></label>
      </section>

      {blueprint.followUp.length > 0 && <section className="ppn-followup"><h5>Follow-up questions</h5>{blueprint.followUp.map((item,index) => <details key={index}><summary><MathText prose>{item.q}</MathText></summary><div><MathText prose>{item.a}</MathText></div></details>)}</section>}
    </article>
  );
}
