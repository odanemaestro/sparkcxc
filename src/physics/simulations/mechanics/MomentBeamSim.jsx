import React, { useMemo, useRef, useState } from 'react';
import { buildMomentBeamModel } from '../../mechanics/interactives/a3InteractiveModels.mjs';
import { SimFrame, useTaskChecklist, useDerivedTasks, SimSlider, Readouts, LiveText, Arrow, fmt } from '../core/SimKit.jsx';
import { useDragHandle } from '../core/useDragHandle.js';
import { momentsBalanced } from '../core/taskGate.js';

const W = 560, H = 250, CX = 280, CY = 150, HALF_M = 1.0, PX_PER_M = 220;
const xOf = m => CX + m * PX_PER_M;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function MassHandle({ svgRef, mass, setMass, tone, label, angle }) {
  const move = p => setMass(m => ({ ...m, positionM: clamp(Math.round((p.x - CX) / PX_PER_M * 20) / 20, -HALF_M, HALF_M) }));
  const key = dx => setMass(m => ({ ...m, positionM: clamp(Math.round((m.positionM + dx * 0.05) * 100) / 100, -HALF_M, HALF_M) }));
  const { handleProps } = useDragHandle({ svgRef, onMove: move, onKey: key, label, valueText: `${Math.abs(mass.positionM).toFixed(2)} metres ${mass.positionM < 0 ? 'left' : 'right'} of the pivot, ${mass.forceN} newtons` });
  const x = xOf(mass.positionM);
  const drop = Math.min(90, 28 + mass.forceN * 2);
  const nearPivot = Math.abs(mass.positionM) < 0.08;
  // If a weight sits at the pivot, draw its downward force slightly to one
  // side so it does not lie directly on top of the upward pivot reaction.
  const forceX = nearPivot ? x + (tone === 'b' ? -20 : 20) : x;
  return (
    <g transform={`rotate(${angle} ${CX} ${CY})`}>
      <g {...handleProps} className={`${handleProps.className} ${tone}`} transform={`translate(${x} ${CY - 6})`}>
        <circle className="hit" r="30" />
        <rect className="psim-mass" x={-16} y={-30} width={32} height={30} rx={5} />
        <text className="psim-label" textAnchor="middle" y={-10}>{mass.forceN} N</text>
        <circle className="knob" r="6" cy={-40} opacity="0" />
      </g>
      {nearPivot && <line className="psim-dash" x1={x} y1={CY + 4} x2={forceX} y2={CY + 12} />}
      <Arrow className={tone === 'b' ? 'b' : 'r'} x1={forceX} y1={CY + 12} x2={forceX} y2={CY + drop} width={3} />
      {Math.abs(mass.positionM) >= 0.08 && <text className="psim-tick" x={forceX} y={CY + drop + 14} textAnchor="middle">{Math.abs(mass.positionM).toFixed(2)} m</text>}
    </g>
  );
}

export default function MomentBeamSim({ onEvidence }) {
  const svgRef = useRef(null);
  const [left, setLeft] = useState({ positionM: -0.6, forceN: 10 });
  const [right, setRight] = useState({ positionM: 0.4, forceN: 10 });
  const { done, mark, resetTasks } = useTaskChecklist();
  const model = useMemo(() => buildMomentBeamModel({ forces: [{ positionM: left.positionM, forceN: left.forceN, direction: 'down' }, { positionM: right.positionM, forceN: right.forceN, direction: 'down' }] }), [left, right]);
  const balanced = momentsBalanced({ clockwise: model.clockwise, anticlockwise: model.anticlockwise });
  const tilt = balanced ? 0 : clamp(model.netClockwise * 1.2, -9, 9); // positive = clockwise tip (right side down)

  // Task marking happens in an effect, never during render.
  useDerivedTasks(mark, {
    balance: balanced,
    unequal: balanced && left.forceN !== right.forceN,
  });

  const setL = fn => { setLeft(typeof fn === 'function' ? fn : () => fn); mark('move'); };
  const setR = fn => { setRight(typeof fn === 'function' ? fn : () => fn); mark('move'); };
  const reset = () => { setLeft({ positionM: -0.6, forceN: 10 }); setRight({ positionM: 0.4, forceN: 10 }); resetTasks(); };

  return (
    <SimFrame title="Balancing beam: principle of moments" intro="A metre rule pivots at its centre. Drag each hanging weight along the rule (or use the sliders and arrow keys) until the clockwise and anticlockwise moments are equal." prediction={{ question: 'A 10 N weight hangs 0.6 m left of the pivot. Where must a 20 N weight hang on the right to balance it?', options: [{ id: 'a', label: '0.3 m from the pivot' }, { id: 'b', label: '0.6 m from the pivot' }, { id: 'c', label: '1.2 m from the pivot' }], answer: 'a' }}
      tasks={[{ id: 'move', label: 'Move a weight and watch the beam tip towards the larger moment.' }, { id: 'balance', label: 'Balance the beam (moments equal within 3%).' }, { id: 'unequal', label: 'Balance the beam using two different weights.' }]} done={done}
      onComplete={() => onEvidence?.({ objective: 'A3.7', score: 1, result: 'completed' })}
      observation={balanced ? `Balanced: ${fmt(model.anticlockwise, 2)} N m anticlockwise = ${fmt(model.clockwise, 2)} N m clockwise.` : `Not balanced: the beam tips ${model.netClockwise > 0 ? 'clockwise (right side down)' : 'anticlockwise (left side down)'}.`}
      explanation={<><p>Moment = force × perpendicular distance from the pivot. The principle of moments states that for a body in equilibrium the sum of the clockwise moments about any point equals the sum of the anticlockwise moments about that point.</p><p>A heavier weight balances a lighter one only when it hangs closer to the pivot: 20 N × 0.3 m = 10 N × 0.6 m = 6 N m. The pivot's upward reaction (equal to the total weight, {fmt(left.forceN + right.forceN, 0)} N here) has zero moment about the pivot because its distance is zero.</p></>}>
      <div className="psim-stage-wrap">
        <svg ref={svgRef} className="psim-stage" viewBox={`0 0 ${W} ${H + 70}`} role="img" aria-label="Beam on a central pivot with two hanging weights">
          <g transform={`rotate(${tilt} ${CX} ${CY})`} style={{ transition: 'transform 0.35s ease' }}>
            <rect className="psim-beam" x={xOf(-HALF_M) - 10} y={CY - 6} width={2 * HALF_M * PX_PER_M + 20} height={12} rx={3} />
            {[-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1].map(m => <line key={m} className="psim-stroke-muted" x1={xOf(m)} y1={CY - 8} x2={xOf(m)} y2={CY + 8} />)}
          </g>
          <MassHandle svgRef={svgRef} mass={left} setMass={setL} tone="b" label="Left weight" angle={tilt} />
          <MassHandle svgRef={svgRef} mass={right} setMass={setR} tone="r" label="Right weight" angle={tilt} />
          <polygon className="psim-solid" points={`${CX - 18},${CY + 60} ${CX + 18},${CY + 60} ${CX},${CY + 6}`} />
          <Arrow className="g" x1={CX} y1={CY + 132} x2={CX} y2={CY + 68} width={2.5} label={`R = ${left.forceN + right.forceN} N`} labelOffset={-46} />
          <text className="psim-label muted" x={CX} y={CY + 150} textAnchor="middle">{balanced ? 'Balanced' : model.netClockwise > 0 ? 'Tips clockwise' : 'Tips anticlockwise'}</text>
          <text className="psim-tick" x={CX - 8} y={28} textAnchor="end">anticlockwise side ⟲</text>
          <text className="psim-tick" x={CX + 8} y={28}>⟳ clockwise side</text>
          <text className="psim-tick" x={CX} y={48} textAnchor="middle">Scale: up to 1.0 m from the pivot on either side</text>
        </svg>
      </div>
      <div className="psim-controls">
        <SimSlider id="mb-lf" label="Left weight" value={left.forceN} min={2} max={30} step={1} unit=" N" dp={0} onChange={v => setL(m => ({ ...m, forceN: v }))} />
        <SimSlider id="mb-lx" label="Left distance from pivot" value={-left.positionM} min={0} max={1} step={0.05} unit=" m" dp={2} onChange={v => setL(m => ({ ...m, positionM: -v }))} />
        <SimSlider id="mb-rf" label="Right weight" value={right.forceN} min={2} max={30} step={1} unit=" N" dp={0} onChange={v => setR(m => ({ ...m, forceN: v }))} />
        <SimSlider id="mb-rx" label="Right distance from pivot" value={right.positionM} min={0} max={1} step={0.05} unit=" m" dp={2} onChange={v => setR(m => ({ ...m, positionM: v }))} />
      </div>
      <div className="psim-toolbar"><button type="button" className="psim-btn secondary" onClick={reset}>Reset</button></div>
      <Readouts items={[['Anticlockwise moment', `${fmt(model.anticlockwise, 2)} N m`], ['Clockwise moment', `${fmt(model.clockwise, 2)} N m`], ['Difference', `${fmt(Math.abs(model.netClockwise), 2)} N m`, balanced ? 'good' : 'warn'], ['Pivot reaction', `${left.forceN + right.forceN} N`]]} />
      <div className="psim-equation">{left.forceN} N × {Math.abs(left.positionM).toFixed(2)} m = {fmt(model.anticlockwise, 2)} N m   |   {right.forceN} N × {Math.abs(right.positionM).toFixed(2)} m = {fmt(model.clockwise, 2)} N m</div>
      <LiveText>{balanced ? 'The beam is balanced.' : `The beam tips ${model.netClockwise > 0 ? 'clockwise' : 'anticlockwise'} by ${fmt(Math.abs(model.netClockwise), 2)} newton metres.`}</LiveText>
    </SimFrame>
  );
}
