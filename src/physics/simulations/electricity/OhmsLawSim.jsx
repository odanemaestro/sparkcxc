import React, { useMemo, useState } from 'react';
import { buildOhmModel } from '../../electricity/interactives/dElectricityInteractiveModels.mjs';
import { SimFrame, useTaskChecklist, useDerivedTasks, SimSlider, SimSwitch, SimGraph, Readouts, LiveText, fmt } from '../core/SimKit.jsx';
import { useSimulationClock } from '../core/useSimulationClock.js';
import { distinctValueCount } from '../core/taskGate.js';

const W = 560, H = 260;
// Rectangular loop: battery on left, resistor on top, ammeter on right, voltmeter across resistor.
const L = 70, R = 490, T = 50, B = 195, VM_Y = 108;
const PERIM = 2 * (R - L) + 2 * (B - T);
function pointOnLoop(f) {
  let d = ((f % 1) + 1) % 1 * PERIM;
  if (d < R - L) return { x: L + d, y: T }; d -= R - L;
  if (d < B - T) return { x: R, y: T + d }; d -= B - T;
  if (d < R - L) return { x: R - d, y: B }; d -= R - L;
  return { x: L, y: B - d };
}

export default function OhmsLawSim({ onEvidence }) {
  const [v, setV] = useState(6);
  const [res, setRes] = useState(12);
  const [closed, setClosed] = useState(false);
  const [readings, setReadings] = useState([]);
  const clock = useSimulationClock({ loop: true, duration: 1e9 });
  const { done, mark, resetTasks } = useTaskChecklist();
  const model = useMemo(() => buildOhmModel({ voltageV: v, resistanceOhm: res }), [v, res]);
  const i = closed ? model.currentA : 0;

  // Keep the electron animation running only while the switch is closed.
  React.useEffect(() => { if (closed && !clock.playing) clock.play(); if (!closed && clock.playing) clock.pause(); }, [closed]); // eslint-disable-line react-hooks/exhaustive-deps
  // Five readings only count if they are at five different potential
  // differences, so repeatedly recording the same reading does not pass.
  const distinctV = distinctValueCount(readings.map(r => r.y), 1);
  // Task marking happens in an effect, never during render.
  useDerivedTasks(mark, { close: closed, readings: distinctV >= 5 });

  const record = () => { if (!closed) return; setReadings(r => [...r, { x: model.currentA, y: v, r: res }].slice(-8)); };
  const clear = () => { setReadings([]); resetTasks(); };
  // Electron speed proportional to current (conventional current flows the other way).
  const phase = clock.time * i * 0.08;
  const electrons = Array.from({ length: 16 }, (_, k) => pointOnLoop(-(k / 16 + phase)));
  const maxV = 24;
  // The controls allow 24 V across 1 Ω, so the current axis must follow the
  // readings and the present working point instead of being fixed at 2 A.
  const iMax = Math.max(0.5, i, ...readings.map(r => r.x));
  const axisI = Math.ceil(iMax * 1.15 * 10) / 10;
  const linePts = [{ x: 0, y: 0 }, { x: Math.min(axisI, maxV / res), y: Math.min(axisI * res, maxV) }];

  return (
    <SimFrame title="Ohm's law circuit" intro="Close the switch, change the potential difference and resistance, and read the ammeter and voltmeter. Record readings to build a V–I graph." prediction={{ question: 'If the potential difference across a fixed resistor is doubled, the current will…', options: [{ id: 'double', label: 'double' }, { id: 'half', label: 'halve' }, { id: 'same', label: 'stay the same' }], answer: 'double' }}
      tasks={[{ id: 'close', label: 'Close the switch so current flows.' }, { id: 'readings', label: 'Record at least five (V, I) readings at different potential differences.' }]} done={done}
      onComplete={() => onEvidence?.({ objective: 'D4.7', score: 1, result: 'completed' })}
      observation={closed ? `Ammeter reads ${fmt(i, 2)} A and voltmeter reads ${fmt(v, 1)} V, so V/I = ${fmt(v / i, 1)} Ω, which matches the resistor.` : 'The switch is open: no complete path, so the ammeter reads 0 A even though the battery still has an e.m.f.'}
      explanation={<><p>Ohm's law: for a metallic conductor at constant temperature, the current is directly proportional to the potential difference across it, I ∝ V. The constant of proportionality is the resistance, R = V/I, so the V–I graph is a straight line through the origin with gradient R.</p><p>The ammeter is connected in series (it must carry the current) and the voltmeter in parallel across the resistor (it measures the p.d. between its two ends). Electrons drift from the negative terminal; conventional current is drawn from positive to negative.</p></>}>
      <div className="psim-toolbar">
        <SimSwitch label={closed ? 'Switch closed' : 'Switch open'} checked={closed} onChange={setClosed} />
        <button type="button" className="psim-btn" onClick={record} disabled={!closed}>Record reading</button>
        <button type="button" className="psim-btn secondary" onClick={clear}>Clear readings</button>
      </div>
      <div className="psim-controls">
        <SimSlider id="ohm-v" label="Battery p.d." value={v} min={1} max={maxV} step={1} unit=" V" dp={0} onChange={setV} />
        <SimSlider id="ohm-r" label="Resistance" value={res} min={1} max={50} step={1} unit=" Ω" dp={0} onChange={setRes} />
      </div>
      <svg className="psim-stage" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Series circuit, switch ${closed ? 'closed' : 'open'}`}>
        <polyline className={`psim-wire${closed ? '' : ' off'}`} points={`${L},${T} ${R},${T} ${R},${B} ${L},${B} ${L},${T}`} />
        {/* battery */}
        <rect className="psim-fill-card" x={L - 10} y={100} width={20} height={40} />
        <line className="psim-stroke" x1={L - 14} y1={104} x2={L + 14} y2={104} strokeWidth={3} />
        <line className="psim-stroke" x1={L - 7} y1={116} x2={L + 7} y2={116} />
        <line className="psim-stroke" x1={L - 14} y1={128} x2={L + 14} y2={128} strokeWidth={3} />
        <line className="psim-stroke" x1={L - 7} y1={140} x2={L + 7} y2={140} />
        <text className="psim-tick" x={L - 20} y={100} textAnchor="end">+</text>
        <text className="psim-tick" x={L - 20} y={148} textAnchor="end">−</text>
        <text className="psim-label" x={L - 20} y={124} textAnchor="end">{v} V</text>
        {/* resistor */}
        <rect className="psim-component" x={240} y={T - 10} width={80} height={20} rx={3} />
        <text className="psim-label" x={280} y={T - 16} textAnchor="middle">R = {res} Ω</text>
        {/* switch on bottom */}
        <g><rect className="psim-fill-card" x={250} y={B - 12} width={60} height={24} /><circle className="psim-solid" cx={252} cy={B} r={3} /><circle className="psim-solid" cx={308} cy={B} r={3} /><line className="psim-wire" x1={252} y1={B} x2={closed ? 308 : 300} y2={closed ? B : B - 22} /></g>
        <text className="psim-tick" x={280} y={B + 26} textAnchor="middle">switch</text>
        {/* ammeter in series (right) */}
        <g className="psim-meter"><rect className="psim-fill-card" x={R - 18} y={100} width={36} height={40} /><circle className="psim-component" cx={R} cy={120} r={18} /><text x={R} y={124} textAnchor="middle">A</text><text x={R + 26} y={124}>{fmt(i, 2)} A</text></g>
        {/* voltmeter in parallel across R */}
        <g className="psim-meter"><polyline className="psim-wire" points={`240,${T} 240,${VM_Y} 320,${VM_Y} 320,${T}`} style={{ strokeWidth: 2 }} /><rect className="psim-fill-card" x={262} y={VM_Y - 18} width={36} height={36} /><circle className="psim-component" cx={280} cy={VM_Y} r={16} /><text x={280} y={VM_Y + 4} textAnchor="middle">V</text><text className="psim-label muted" x={280} y={VM_Y + 34} textAnchor="middle">{fmt(closed ? v : 0, 1)} V</text></g>
        {closed && electrons.map((p, k) => <circle key={k} className="psim-electron" cx={p.x} cy={p.y} r={4} />)}
      </svg>
      <p className="psim-stage-note">Blue dots show electron flow from − to +. Conventional current is taken as flowing from + to −.</p>
      <SimGraph label="Potential difference against current" height={210} x={{ min: 0, max: axisI, label: 'I / A' }} y={{ min: 0, max: maxV, label: 'V / V' }} series={[{ points: linePts, className: 'b dashed' }]} marker={closed ? { x: i, y: v } : undefined}>
        {(sx, sy) => readings.map((r, k) => <circle key={k} className="psim-fill-accent" r={4} cx={sx(r.x)} cy={sy(r.y)} />)}
      </SimGraph>
      {readings.length > 0 && <table className="psim-table"><thead><tr><th>V / V</th>{readings.map((r, k) => <td key={k}>{fmt(r.y, 1)}</td>)}</tr></thead><tbody><tr><th>I / A</th>{readings.map((r, k) => <td key={k}>{fmt(r.x, 2)}</td>)}</tr><tr><th>V/I / Ω</th>{readings.map((r, k) => <td key={k}>{fmt(r.y / r.x, 1)}</td>)}</tr></tbody></table>}
      <Readouts items={[['Ammeter', `${fmt(i, 2)} A`], ['Voltmeter', `${fmt(closed ? v : 0, 1)} V`], ['V / I', closed ? `${fmt(v / i, 1)} Ω` : '—', 'good'], ['Gradient of V–I line', `${res} Ω`]]} />
      <div className="psim-equation">
        {closed
          ? `I = V / R = ${v} V ÷ ${res} Ω = ${fmt(i, 2)} A`
          : `Switch open → actual circuit current I = 0 A. If the switch were closed, V/R = ${v}/${res} = ${fmt(model.currentA, 2)} A.`}
      </div>
      <LiveText>{closed ? `Current ${fmt(i, 2)} amperes flows.` : 'Switch open; no current.'} {readings.length} reading{readings.length === 1 ? '' : 's'} recorded.</LiveText>
    </SimFrame>
  );
}
