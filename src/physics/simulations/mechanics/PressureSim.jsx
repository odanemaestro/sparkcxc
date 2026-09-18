import React, { useMemo, useRef, useState } from 'react';
import { buildPressureDepthModel, buildPressureFootprintModel, buildHydraulicPressModel } from '../../mechanics/interactives/a6InteractiveModels.mjs';
import { SimFrame, useTaskChecklist, useDerivedTasks, SimSlider, SimToggle, SimGraph, Readouts, LiveText, Arrow, fmt } from '../core/SimKit.jsx';
import { useDragHandle } from '../core/useDragHandle.js';

const W = 560, H = 260, TANK_L = 60, TANK_R = 300, SURFACE = 40, FLOOR = 240, MAX_DEPTH = 10;
const yOf = d => SURFACE + d / MAX_DEPTH * (FLOOR - SURFACE);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const FLUIDS = [{ value: 1000, label: 'Water 1000' }, { value: 1025, label: 'Sea water 1025' }, { value: 800, label: 'Oil 800' }, { value: 13600, label: 'Mercury 13 600' }];

function DepthLab({ onEvidence }) {
  const svgRef = useRef(null);
  const [depthM, setDepth] = useState(3);
  const [density, setDensity] = useState(1000);
  const { done, mark } = useTaskChecklist();
  const model = useMemo(() => buildPressureDepthModel({ densityKgM3: density, gNPerKg: 10, depthM }), [density, depthM]);
  const move = p => { setDepth(clamp(Math.round((p.y - SURFACE) / (FLOOR - SURFACE) * MAX_DEPTH * 10) / 10, 0, MAX_DEPTH)); mark('drag'); };
  const key = (dx, dy) => { setDepth(d => clamp(Math.round((d - dy * 0.1) * 10) / 10, 0, MAX_DEPTH)); mark('drag'); };
  const { handleProps } = useDragHandle({ svgRef, onMove: move, onKey: key, label: 'Pressure probe depth', valueText: `${depthM.toFixed(1)} metres` });
  // Task marking happens in an effect, never during render.
  useDerivedTasks(mark, { fluid: density !== 1000 && depthM > 0, deep: depthM >= 9.9 });
  const py = yOf(depthM);
  // Arrow length is scaled against the greatest pressure this liquid can reach
  // at the bottom of the tank, then clamped, so mercury at 10 m cannot draw
  // arrows outside the stage.
  const maxGaugePa = density * 10 * MAX_DEPTH;
  const arrowLen = 8 + Math.min(1, model.gaugePressurePa / maxGaugePa) * 34;
  const jets = [2.5, 5, 7.5].map(d => ({ d, len: 30 * Math.sqrt(d / MAX_DEPTH) * 2 }));
  const graphPts = useMemo(() => [{ x: 0, y: 0 }, { x: MAX_DEPTH, y: density * 10 * MAX_DEPTH / 1000 }], [density]);
  const yMax = Math.ceil(density * 10 * MAX_DEPTH / 1000 / 10) * 10 || 10;

  return (
    <SimFrame title="Pressure in a liquid" intro="Drag the probe up and down the tank (or use the slider and arrow keys). The pressure arrows push equally in every direction and grow with depth." prediction={{ question: 'If the probe is moved from 2 m to 4 m below the surface, the gauge pressure will…', options: [{ id: 'double', label: 'double' }, { id: 'quad', label: 'quadruple' }, { id: 'same', label: 'stay the same' }], answer: 'double' }}
      tasks={[{ id: 'drag', label: 'Move the probe to a new depth.' }, { id: 'deep', label: 'Take the probe to the bottom of the tank (10 m).' }, { id: 'fluid', label: 'Change the liquid and compare the pressure at the same depth.' }]} done={done}
      onComplete={() => onEvidence?.({ objective: 'A6.2', score: 1, result: 'completed' })}
      observation={`At ${depthM.toFixed(1)} m in a liquid of density ${density} kg m⁻³, gauge pressure P = ρgh = ${fmt(model.gaugePressurePa / 1000, 1)} kPa.`}
      explanation={<><p>Pressure at a depth h in a liquid of density ρ is P = ρgh (above atmospheric pressure). It increases uniformly with depth, which is why the pressure–depth graph is a straight line through the origin and why water jets from lower holes travel further.</p><p>Pressure at a point acts equally in all directions and does not depend on the shape or width of the container, only on depth and density.</p></>}>
      <div className="psim-layout">
        <svg ref={svgRef} className="psim-stage" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Tank of liquid with a movable pressure probe">
          <rect className="psim-water" x={TANK_L} y={SURFACE} width={TANK_R - TANK_L} height={FLOOR - SURFACE} />
          <polyline className="psim-stroke" points={`${TANK_L},${SURFACE - 10} ${TANK_L},${FLOOR} ${TANK_R},${FLOOR} ${TANK_R},${SURFACE - 10}`} />
          <line className="psim-water-line" x1={TANK_L} y1={SURFACE} x2={TANK_R} y2={SURFACE} />
          {[0, 2, 4, 6, 8, 10].map(d => <g key={d}><line className="psim-stroke-muted" x1={TANK_R} y1={yOf(d)} x2={TANK_R + 6} y2={yOf(d)} /><text className="psim-tick" x={TANK_R + 10} y={yOf(d) + 4}>{d} m</text></g>)}
          {jets.map(j => <path key={j.d} className="psim-water-line" style={{ fill: 'none' }} d={`M ${TANK_R} ${yOf(j.d)} q ${j.len * 0.6} 0 ${j.len} ${FLOOR - yOf(j.d)}`} opacity="0.7" />)}
          <g {...handleProps} transform={`translate(${(TANK_L + TANK_R) / 2} ${py})`}>
            <circle className="hit" r="34" />
            <line className="psim-stroke-muted" x1={0} y1={-py + SURFACE - 10} x2={0} y2={0} />
            <circle className="knob" r="10" />
            <Arrow className="b" x1={-14} y1={0} x2={-14 - arrowLen} y2={0} width={2.5} />
            <Arrow className="b" x1={14} y1={0} x2={14 + arrowLen} y2={0} width={2.5} />
            <Arrow className="b" x1={0} y1={-14} x2={0} y2={-14 - Math.min(arrowLen, py - SURFACE - 2)} width={2.5} />
            <Arrow className="b" x1={0} y1={14} x2={0} y2={14 + Math.min(arrowLen, FLOOR - py - 2)} width={2.5} />
          </g>
          <text className="psim-label" x={TANK_L + 6} y={SURFACE - 16}>ρ = {density} kg m⁻³</text>
          <text className="psim-label" x={W - 16} y={30} textAnchor="end">P = {fmt(model.gaugePressurePa / 1000, 1)} kPa</text>
          <text className="psim-tick" x={W - 16} y={48} textAnchor="end">at h = {depthM.toFixed(1)} m</text>
        </svg>
        <div>
          <SimSlider id="pd-h" label="Probe depth h" value={depthM} min={0} max={MAX_DEPTH} step={0.1} unit=" m" dp={1} onChange={v => { setDepth(v); mark('drag'); }} />
          <div className="psim-toolbar"><SimToggle label="Liquid density" value={density} onChange={setDensity} options={FLUIDS} /></div>
          <Readouts items={[['Density ρ', `${density} kg m⁻³`], ['Depth h', `${depthM.toFixed(1)} m`], ['Gauge pressure', `${fmt(model.gaugePressurePa / 1000, 2)} kPa`, 'good'], ['Absolute pressure', `${fmt((model.gaugePressurePa + 101000) / 1000, 1)} kPa`]]} />
          <div className="psim-equation">P = ρgh = {density} × 10 × {depthM.toFixed(1)} = {fmt(model.gaugePressurePa, 0)} Pa</div>
        </div>
      </div>
      <SimGraph label="Gauge pressure against depth" height={200} x={{ min: 0, max: MAX_DEPTH, label: 'depth / m' }} y={{ min: 0, max: yMax, label: 'P / kPa' }} series={[{ points: graphPts, className: 'b' }]} marker={{ x: depthM, y: model.gaugePressurePa / 1000 }} />
      <LiveText>Probe at {depthM.toFixed(1)} metres. Gauge pressure {fmt(model.gaugePressurePa / 1000, 1)} kilopascals.</LiveText>
    </SimFrame>
  );
}

function HydraulicLab({ onEvidence }) {
  const [effortN, setEffort] = useState(50);
  const [effortArea, setEffortArea] = useState(0.002);
  const [loadArea, setLoadArea] = useState(0.02);
  const [push, setPush] = useState(0); // 0..1 of small piston stroke
  const { done, mark } = useTaskChecklist();
  const out = buildHydraulicPressModel({ forceN: effortN, effortAreaM2: effortArea, loadAreaM2: loadArea, effortStrokeM: 0.06 * push });
  const pressure = buildPressureFootprintModel({ forceN: effortN, areaM2: effortArea }).pressurePa;
  const ratio = loadArea / effortArea;
  const smallStroke = 60 * push, bigStroke = smallStroke / ratio;
  // Task marking happens in an effect, never during render.
  useDerivedTasks(mark, { push: push > 0.5, ratio: ratio >= 20, lift: out.loadForceN >= 1000 && push > 0 });
  const smallW = 30 + effortArea * 8000, bigW = 40 + loadArea * 2500;

  return (
    <SimFrame title="Hydraulic press" intro="Push the small piston and watch the large piston lift a heavy load. The liquid transmits pressure equally, so a small force on a small area becomes a large force on a large area." prediction={{ question: 'The large piston has 10× the area of the small one. When the small piston moves down 10 cm, the large piston moves up…', options: [{ id: 'a', label: '1 cm' }, { id: 'b', label: '10 cm' }, { id: 'c', label: '100 cm' }], answer: 'a' }}
      tasks={[{ id: 'push', label: 'Push the small piston more than half way down.' }, { id: 'ratio', label: 'Make the load piston at least 20 times the area of the effort piston.' }, { id: 'lift', label: 'Produce a load force of 1000 N or more.' }]} done={done}
      onComplete={() => onEvidence?.({ objective: 'A6.1', score: 1, result: 'completed' })}
      observation={`Pressure in the liquid = ${fmt(pressure / 1000, 1)} kPa; load force = P × A₂ = ${fmt(out.loadForceN, 0)} N. Force multiplied ×${fmt(ratio, 1)}, distance divided by the same factor.`}
      explanation={<><p>Pascal's principle: pressure applied to an enclosed liquid is transmitted equally to every part of it. So F₁/A₁ = F₂/A₂ and the load force is F₂ = F₁ × (A₂/A₁).</p><p>Energy is not created: the liquid is incompressible, so the volume pushed out of the small cylinder equals the volume entering the large one, A₁d₁ = A₂d₂. The load moves a smaller distance and work in ≈ work out.</p></>}>
      <div className="psim-controls">
        <SimSlider id="hy-f" label="Effort force F₁" value={effortN} min={10} max={200} step={5} unit=" N" dp={0} onChange={setEffort} />
        <SimSlider id="hy-a1" label="Effort piston area A₁" value={effortArea * 10000} min={5} max={50} step={5} unit=" cm²" dp={0} onChange={v => setEffortArea(v / 10000)} />
        <SimSlider id="hy-a2" label="Load piston area A₂" value={loadArea * 10000} min={50} max={1000} step={50} unit=" cm²" dp={0} onChange={v => setLoadArea(v / 10000)} />
        <SimSlider id="hy-push" label="Push small piston" value={push * 100} min={0} max={100} step={5} unit=" %" dp={0} onChange={v => setPush(v / 100)} />
      </div>
      <svg className="psim-stage" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Hydraulic press with two pistons">
        <path className="psim-water" d={`M ${120 - smallW / 2} 120 h ${smallW} v 70 h 60 v -70 h ${bigW} v 110 h -${bigW + 120 + smallW} z`} />
        <path className="psim-stroke" d={`M ${120 - smallW / 2} 100 v 130 h ${smallW + 60 + bigW + 60} v -130`} fill="none" />
        <g transform={`translate(0 ${smallStroke})`}>
          <rect className="psim-component" x={120 - smallW / 2} y={100} width={smallW} height={16} />
          <Arrow className="g" x1={120} y1={50} x2={120} y2={96} label={`F₁ = ${effortN} N`} labelOffset={-40} />
        </g>
        <g transform={`translate(0 ${-bigStroke})`}>
          <rect className="psim-component" x={120 + smallW / 2 + 60} y={100} width={bigW} height={16} />
          <rect className="psim-mass" x={120 + smallW / 2 + 60 + bigW / 2 - 30} y={60} width={60} height={40} rx={6} />
          <text className="psim-label" x={120 + smallW / 2 + 60 + bigW / 2} y={85} textAnchor="middle">{fmt(out.loadForceN, 0)} N</text>
        </g>
        <text className="psim-tick" x={120} y={245} textAnchor="middle">A₁ = {fmt(effortArea * 10000, 0)} cm²</text>
        <text className="psim-tick" x={120 + smallW / 2 + 60 + bigW / 2} y={245} textAnchor="middle">A₂ = {fmt(loadArea * 10000, 0)} cm²</text>
        <text className="psim-label muted" x={W - 16} y={30} textAnchor="end">P = {fmt(pressure / 1000, 1)} kPa throughout</text>
      </svg>
      <Readouts items={[['Pressure P = F₁/A₁', `${fmt(pressure / 1000, 1)} kPa`], ['Load force F₂ = P A₂', `${fmt(out.loadForceN, 0)} N`, 'good'], ['Force multiplier', `× ${fmt(ratio, 1)}`], ['Load moves', `${fmt(smallStroke / 60 * 10 / ratio, 2)} cm per 10 cm push`]]} />
      <div className="psim-equation">F₂ = F₁ × A₂/A₁ = {effortN} × {fmt(loadArea * 10000, 0)}/{fmt(effortArea * 10000, 0)} = {fmt(out.loadForceN, 0)} N</div>
      <LiveText>Effort {effortN} newtons produces a load force of {fmt(out.loadForceN, 0)} newtons.</LiveText>
    </SimFrame>
  );
}

export default function PressureSim({ mode = 'depth', onEvidence }) {
  return mode === 'hydraulic' ? <HydraulicLab onEvidence={onEvidence} /> : <DepthLab onEvidence={onEvidence} />;
}
