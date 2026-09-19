import React, { useMemo, useRef, useState } from 'react';
import { buildVectorResultantModel, buildVectorComponentsModel } from '../../mechanics/interactives/a2InteractiveModels.mjs';
import { SimFrame, useTaskChecklist, useDerivedTasks, SimSlider, SimToggle, SimSwitch, Readouts, LiveText, Arrow, fmt } from '../core/SimKit.jsx';
import { useDragHandle } from '../core/useDragHandle.js';
import { angleWithin } from '../core/taskGate.js';

const W = 700, H = 430, OX = W / 2, OY = H / 2, S = 1.85; // centred four-quadrant plane; fits the maximum 90 N resultant
const MAX = 45;
const toSvg = (x, y) => ({ x: OX + x * S, y: OY - y * S });
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const polarFromPoint = p => {
  const dx = (p.x - OX) / S, dy = (OY - p.y) / S;
  const mag = clamp(Math.round(Math.hypot(dx, dy)), 0, MAX);
  let ang = Math.round(Math.atan2(dy, dx) * 180 / Math.PI);
  if (ang < 0) ang += 360;
  return { mag, ang };
};

function Grid() {
  const lines = [];
  const step = 10 * S;
  for (let x = OX; x <= W - 24; x += step) lines.push(<line key={`vr${x}`} x1={x} y1={24} x2={x} y2={H - 24} />);
  for (let x = OX - step; x >= 24; x -= step) lines.push(<line key={`vl${x}`} x1={x} y1={24} x2={x} y2={H - 24} />);
  for (let y = OY; y <= H - 24; y += step) lines.push(<line key={`hd${y}`} x1={24} y1={y} x2={W - 24} y2={y} />);
  for (let y = OY - step; y >= 24; y -= step) lines.push(<line key={`hu${y}`} x1={24} y1={y} x2={W - 24} y2={y} />);
  return <g className="psim-grid">
    {lines}
    <text className="psim-tick" x={30} y={H - 10}>1 square = 10 N</text>
  </g>;
}

function AngleArc({ deg, r = 34, label }) {
  const a = deg * Math.PI / 180;
  const end = { x: OX + r * Math.cos(a), y: OY - r * Math.sin(a) };
  const large = deg > 180 ? 1 : 0;
  const mid = deg / 2 * Math.PI / 180;
  return <g><path className="psim-dash" d={`M ${OX + r} ${OY} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`} />{label && <text className="psim-label muted" x={OX + (r + 14) * Math.cos(mid)} y={OY - (r + 14) * Math.sin(mid)} textAnchor="middle" dominantBaseline="middle">{label}</text>}</g>;
}

function Handle({ svgRef, point, onMove, onKey, label, valueText, tone = '' }) {
  const { handleProps } = useDragHandle({ svgRef, onMove, onKey, label, valueText });
  return <g {...handleProps} className={`${handleProps.className} ${tone}`} transform={`translate(${point.x} ${point.y})`}><circle className="hit" r="26" /><circle className="knob" r="9" /></g>;
}

function SvgSummary({ lines }) {
  // Values are already shown in the live readouts beside the graph.
  // Returning null keeps every quadrant unobstructed, whatever the vector direction.
  void lines;
  return null;
}

export default function VectorSim({ mode = 'resultant', onEvidence }) {
  const svgRef = useRef(null);
  const [a, setA] = useState({ mag: 30, ang: 0 });
  const [b, setB] = useState({ mag: 20, ang: 55 });
  const [method, setMethod] = useState('triangle');
  const [grid, setGrid] = useState(true);
  const [showComponents, setShowComponents] = useState(mode === 'components');
  const { done, mark, resetTasks } = useTaskChecklist();
  const [methodsSeen, setMethodsSeen] = useState(() => new Set(['triangle']));

  const model = useMemo(() => buildVectorResultantModel({ firstMagnitude: a.mag, firstAngle: a.ang, secondMagnitude: b.mag, secondAngle: b.ang, method }), [a, b, method]);
  const comp = useMemo(() => buildVectorComponentsModel({ magnitude: a.mag, angleDegrees: a.ang }), [a]);
  const isComponents = mode === 'components';

  const aHead = toSvg(model.first.components.x, model.first.components.y);
  const rHead = toSvg(model.resultant.components.x, model.resultant.components.y);
  const bFromOrigin = toSvg(model.second.components.x, model.second.components.y);
  const bStart = method === 'triangle' ? aHead : { x: OX, y: OY };
  const bEnd = method === 'triangle' ? rHead : bFromOrigin;

  const moveA = p => { const n = polarFromPoint(p); setA(n); mark('drag'); };
  const moveB = p => {
    // B is dragged by its tip; in tip-to-tail mode the tip sits at A's head.
    const origin = method === 'triangle' ? aHead : { x: OX, y: OY };
    const n = polarFromPoint({ x: p.x - origin.x + OX, y: p.y - origin.y + OY });
    setB(n); mark('drag');
  };
  const keyA = (dx, dy) => { const n = { mag: clamp(a.mag - dy, 0, MAX), ang: (a.ang + dx + 360) % 360 }; setA(n); mark('drag'); };
  const keyB = (dx, dy) => { setB({ mag: clamp(b.mag - dy, 0, MAX), ang: (b.ang + dx + 360) % 360 }); mark('drag'); };
  const changeMethod = m => { setMethod(m); setMethodsSeen(s => new Set(s).add(m)); };
  const reset = () => { setA({ mag: 30, ang: 0 }); setB({ mag: 20, ang: 55 }); setMethod('triangle'); setMethodsSeen(new Set(['triangle'])); resetTasks(); };

  const rMag = model.resultant.magnitude;
  // Task marking happens in an effect, never during render.
  useDerivedTasks(mark, {
    target: !isComponents && Math.abs(rMag - 50) <= 1,
    angle: isComponents && angleWithin(a.ang, 60, 2),
    methods: methodsSeen.size === 2,
  });

  const tasks = isComponents
    ? [{ id: 'drag', label: 'Drag the vector tip (or use arrow keys) to change its magnitude and direction.' }, { id: 'angle', label: 'Set the vector at 60° above the horizontal and read both components.' }]
    : [{ id: 'drag', label: 'Drag a vector tip to change its magnitude or direction.' }, { id: 'methods', label: 'Compare the tip-to-tail and parallelogram constructions.' }, { id: 'target', label: 'Adjust the vectors until the resultant is 50 N (±1 N).' }];

  const prediction = isComponents
    ? { question: 'Keep the magnitude fixed and increase the angle above the horizontal. What happens to the horizontal component?', options: [{ id: 'up', label: 'It increases' }, { id: 'down', label: 'It decreases' }, { id: 'same', label: 'It stays the same' }], answer: 'down' }
    : { question: 'If vector B is turned to point in the same direction as A, the resultant magnitude will be…', options: [{ id: 'sum', label: 'A + B' }, { id: 'diff', label: 'A − B' }, { id: 'pyth', label: '√(A² + B²)' }], answer: 'sum' };

  const objective = isComponents ? 'A2.4' : 'A2.2';
  const onComplete = () => onEvidence?.({ objective, score: 1, result: 'completed' });

  return (
    <SimFrame title={isComponents ? 'Component resolver workspace' : 'Vector construction workspace'} intro={isComponents ? 'Drag one vector and watch it split into perpendicular components. Scalars such as speed and mass have no arrow; vectors such as velocity and force need a direction.' : 'Build the resultant of two forces. Drag the arrow tips, or use the sliders and arrow keys, and watch the resultant update live.'} prediction={prediction} tasks={tasks} done={done} onComplete={onComplete}
      explanation={isComponents
        ? <p>The horizontal component is F cos θ and the vertical component is F sin θ. As θ grows, cos θ falls and sin θ rises, so the vector trades horizontal effect for vertical effect. Recombining the components with Pythagoras returns the original magnitude: √(Fx² + Fy²) = F.</p>
        : <p>Vectors add tip-to-tail: the resultant runs from the tail of the first vector to the tip of the last. Its components are simply the sums Rx = Ax + Bx and Ry = Ay + By, and R = √(Rx² + Ry²). When A and B point the same way the components add directly, so R = A + B; the parallelogram construction gives the same diagonal.</p>}>
      <div className="psim-layout">
        <div className="psim-stage-wrap">
          <svg ref={svgRef} className="psim-stage" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={isComponents ? 'Vector with its horizontal and vertical components' : 'Two vectors and their resultant'}>
            {grid && <Grid />}
            <line className="psim-axis" x1={24} y1={OY} x2={W - 24} y2={OY} />
            <line className="psim-axis" x1={OX} y1={H - 24} x2={OX} y2={24} />
            <text className="psim-tick" x={W - 30} y={OY - 9} textAnchor="end">+x</text>
            <text className="psim-tick" x={30} y={OY - 9}>−x</text>
            <text className="psim-tick" x={OX + 9} y={32}>+y</text>
            <text className="psim-tick" x={OX + 9} y={H - 28}>−y</text>
            {!isComponents && <>
              {method === 'parallelogram' && <g><line className="psim-dash" x1={aHead.x} y1={aHead.y} x2={rHead.x} y2={rHead.y} /><line className="psim-dash" x1={bFromOrigin.x} y1={bFromOrigin.y} x2={rHead.x} y2={rHead.y} /></g>}
              <Arrow x1={OX} y1={OY} x2={aHead.x} y2={aHead.y} label="A" />
              <Arrow className="b" x1={bStart.x} y1={bStart.y} x2={bEnd.x} y2={bEnd.y} label="B" />
              {method === 'parallelogram' && <Arrow className="b faint" x1={aHead.x} y1={aHead.y} x2={rHead.x} y2={rHead.y} />}
              <Arrow className="r" x1={OX} y1={OY} x2={rHead.x} y2={rHead.y} width={3.5} label="R" labelOffset={-14} />
              {showComponents && <g><line className="psim-dash" x1={OX} y1={OY} x2={rHead.x} y2={OY} /><line className="psim-dash" x1={rHead.x} y1={OY} x2={rHead.x} y2={rHead.y} /></g>}
              {a.ang > 0 && a.ang <= 180 && <AngleArc deg={a.ang} r={28} />}
              <SvgSummary lines={[
                `A = ${a.mag} N at ${a.ang}°`,
                `B = ${b.mag} N at ${b.ang}°`,
                `R = ${fmt(rMag, 1)} N`,
                `θR = ${fmt(model.resultant.angleDegrees, 1)}° from +x`,
              ]} />
              <Handle svgRef={svgRef} point={aHead} onMove={moveA} onKey={keyA} label="Vector A tip" valueText={`${a.mag} newtons at ${a.ang} degrees`} />
              <Handle svgRef={svgRef} point={bEnd} onMove={moveB} onKey={keyB} label="Vector B tip" valueText={`${b.mag} newtons at ${b.ang} degrees`} tone="b" />
            </>}
            {isComponents && <>
              <Arrow x1={OX} y1={OY} x2={aHead.x} y2={OY} width={2.5} />
              <Arrow className="b" x1={aHead.x} y1={OY} x2={aHead.x} y2={aHead.y} width={2.5} />
              <polyline className="psim-stroke-muted" points={`${aHead.x - 12},${OY} ${aHead.x - 12},${OY - 12} ${aHead.x},${OY - 12}`} />
              <Arrow className="r" x1={OX} y1={OY} x2={aHead.x} y2={aHead.y} width={3.5} />
              {a.mag > 0 && a.ang > 0 && a.ang <= 180 && <AngleArc deg={a.ang} r={30} />}
              <SvgSummary lines={[
                `F = ${a.mag} N at ${a.ang}°`,
                `Fx = ${fmt(comp.horizontal, 1)} N`,
                `Fy = ${fmt(comp.vertical, 1)} N`,
                `√(Fx² + Fy²) = ${fmt(comp.reconstructedMagnitude, 1)} N`,
              ]} />
              <Handle svgRef={svgRef} point={aHead} onMove={moveA} onKey={keyA} label="Vector tip" valueText={`${a.mag} newtons at ${a.ang} degrees`} tone="r" />
            </>}
          </svg>
        </div>
        <div>
          <div className="psim-controls" style={{ gridTemplateColumns: '1fr' }}>
            <SimSlider id={`vs-a-mag-${mode}`} label={isComponents ? 'Magnitude F' : 'Magnitude A'} value={a.mag} min={0} max={MAX} step={1} unit=" N" dp={0} onChange={v => { setA({ ...a, mag: v }); mark('drag'); }} />
            <SimSlider id={`vs-a-ang-${mode}`} label={isComponents ? 'Angle θ from +x' : 'Direction A'} value={a.ang} min={0} max={isComponents ? 90 : 359} step={1} unit="°" dp={0} onChange={v => { setA({ ...a, ang: v }); mark('drag'); }} />
            {!isComponents && <>
              <SimSlider id="vs-b-mag" label="Magnitude B" value={b.mag} min={0} max={MAX} step={1} unit=" N" dp={0} onChange={v => { setB({ ...b, mag: v }); mark('drag'); }} />
              <SimSlider id="vs-b-ang" label="Direction B" value={b.ang} min={0} max={359} step={1} unit="°" dp={0} onChange={v => { setB({ ...b, ang: v }); mark('drag'); }} />
            </>}
          </div>
          <div className="psim-toolbar">
            {!isComponents && <SimToggle label="Construction method" value={method} onChange={changeMethod} options={[{ value: 'triangle', label: 'Tip-to-tail' }, { value: 'parallelogram', label: 'Parallelogram' }]} />}
            <SimSwitch label="Grid" checked={grid} onChange={setGrid} />
            {!isComponents && <SimSwitch label="Show components" checked={showComponents} onChange={setShowComponents} />}
            <button type="button" className="psim-btn secondary" onClick={reset}>Reset</button>
          </div>
          {isComponents
            ? <Readouts items={[['Fx = F cos θ', `${fmt(comp.horizontal, 2)} N`], ['Fy = F sin θ', `${fmt(comp.vertical, 2)} N`], ['√(Fx² + Fy²)', `${fmt(comp.reconstructedMagnitude, 2)} N`, 'good']]} />
            : <Readouts items={[['Rx', `${fmt(model.resultant.components.x, 1)} N`], ['Ry', `${fmt(model.resultant.components.y, 1)} N`], ['|R|', `${fmt(rMag, 1)} N`, Math.abs(rMag - 50) <= 1 ? 'good' : ''], ['θR from +x', `${fmt(model.resultant.angleDegrees, 1)}°`]]} />}
          <div className="psim-equation">{isComponents ? `F = ${a.mag} N, θ = ${a.ang}° → Fx = ${fmt(comp.horizontal, 1)} N, Fy = ${fmt(comp.vertical, 1)} N` : `R = √(${fmt(model.resultant.components.x, 1)}² + ${fmt(model.resultant.components.y, 1)}²) = ${fmt(rMag, 1)} N`}</div>
          <LiveText>{isComponents ? `A ${a.mag} N vector at ${a.ang}° has horizontal component ${fmt(comp.horizontal, 1)} N and vertical component ${fmt(comp.vertical, 1)} N.` : `A is ${a.mag} N at ${a.ang}°, B is ${b.mag} N at ${b.ang}°. Their resultant is ${fmt(rMag, 1)} N at ${fmt(model.resultant.angleDegrees, 0)}° from the positive x direction.`}</LiveText>
        </div>
      </div>
    </SimFrame>
  );
}
