import React, { useMemo, useState } from 'react';
import { buildRampRunModel } from '../../mechanics/interactives/a5InteractiveModels.mjs';
import { SimFrame, useTaskChecklist, useDerivedTasks, Playback, SimSlider, SimGraph, Readouts, LiveText, fmt } from '../core/SimKit.jsx';
import { useSimulationClock } from '../core/useSimulationClock.js';
import { changedEnough } from '../core/taskGate.js';

const W = 560, H = 230, LEFT = 60, RIGHT = 500, TOP = 40, BASE = 190;
const G = 10;
const START_HEIGHT = 5;
// The drawn ramp keeps a fixed shape, so its slope is fixed: the horizontal run
// is (RIGHT − LEFT)/(BASE − TOP) times the drop. The ramp length that follows
// from that geometry is what the timing model is given, so the clock shows real
// seconds for this incline rather than a normalised progress value.
const RUN_PER_DROP = (RIGHT - LEFT) / (BASE - TOP);
const LENGTH_PER_DROP = Math.hypot(RUN_PER_DROP, 1);

export default function EnergyRampSim({ onEvidence }) {
  const [massKg, setMass] = useState(2);
  const [heightM, setHeight] = useState(START_HEIGHT);
  const [frictionPct, setFrictionPct] = useState(0);
  const { done, mark, resetTasks } = useTaskChecklist();

  const rampLengthM = heightM * LENGTH_PER_DROP;
  const timing = useMemo(() => buildRampRunModel({ massKg, gNPerKg: G, dropM: heightM, rampLengthM, frictionFraction: frictionPct / 100, timeS: 0 }), [massKg, heightM, rampLengthM, frictionPct]);
  const travelTimeS = timing.travelTimeS;
  const clock = useSimulationClock({ duration: travelTimeS, loop: false });

  const run = useMemo(() => buildRampRunModel({ massKg, gNPerKg: G, dropM: heightM, rampLengthM, frictionFraction: frictionPct / 100, timeS: clock.time }), [massKg, heightM, rampLengthM, frictionPct, clock.time]);
  const model = run.bars;
  const fraction = run.fractionOfRamp;
  const fallenM = run.fallenM;
  const totalJ = massKg * G * heightM;
  const atBottom = fraction >= 0.999;

  useDerivedTasks(mark, {
    run: atBottom && frictionPct === 0,
    friction: atBottom && frictionPct > 0,
    height: atBottom && changedEnough(START_HEIGHT, heightM, 1),
  });

  const change = setter => v => { setter(v); clock.reset(); };
  const x = LEFT + fraction * (RIGHT - LEFT);
  const y = TOP + fraction * (BASE - TOP);
  const angle = Math.atan2(BASE - TOP, RIGHT - LEFT) * 180 / Math.PI;
  const barMax = Math.max(totalJ, 1);
  const bar = (v, xPos, cls, label) => { const h = Math.max(0, Math.min(1, v / barMax)) * 120; return <g key={label}><rect className="psim-bar-track" x={xPos} y={20} width={38} height={120} rx={4} /><rect className={`psim-bar ${cls}`} x={xPos} y={140 - h} width={38} height={h} rx={4} /><text className="psim-tick" x={xPos + 19} y={156} textAnchor="middle">{label}</text><text className="psim-tick" x={xPos + 19} y={170} textAnchor="middle">{fmt(v, 0)} J</text></g>; };
  const speedPoints = useMemo(() => Array.from({ length: 21 }, (_, i) => {
    const t = travelTimeS * i / 20;
    const m = buildRampRunModel({ massKg, gNPerKg: G, dropM: heightM, rampLengthM, frictionFraction: frictionPct / 100, timeS: t });
    return { x: m.fallenM, y: m.bars.speedMPerS };
  }), [massKg, heightM, rampLengthM, frictionPct, travelTimeS]);
  const bottomSpeed = speedPoints[20].y;
  const speedAxisMax = Math.ceil(Math.sqrt(2 * G * 10)) + 1;

  return (
    <SimFrame title="Energy on a ramp" intro="A block slides from rest down a smooth or rough ramp. Watch gravitational potential energy convert to kinetic energy, and to thermal energy when friction is present." prediction={{ question: 'With no friction, how does the speed at the bottom depend on the mass of the block?', options: [{ id: 'more', label: 'Heavier blocks arrive faster' }, { id: 'same', label: 'Mass makes no difference' }, { id: 'less', label: 'Heavier blocks arrive slower' }], answer: 'same' }}
      tasks={[{ id: 'run', label: 'Run the block all the way down a frictionless ramp and read the speed at the bottom.' }, { id: 'friction', label: 'Add friction and complete another run. Where does the missing kinetic energy go?' }, { id: 'height', label: 'Change the ramp height by at least 1 m and complete another run.' }]} done={done}
      onComplete={() => onEvidence?.({ objective: 'A5.6', score: 1, result: 'completed' })}
      observation={`Fallen ${fmt(fallenM, 2)} m of ${heightM} m after ${fmt(clock.time, 2)} s: GPE ${fmt(model.gravitationalJ, 0)} J, KE ${fmt(model.kineticJ, 0)} J, thermal ${fmt(model.dissipatedJ, 0)} J, speed ${fmt(model.speedMPerS, 2)} m s⁻¹.`}
      explanation={<><p>Energy is conserved: GPE lost = KE gained + energy dissipated as heat and sound. On a frictionless ramp mgh = ½mv², so v = √(2gh). The mass cancels, which is why a heavier block reaches the bottom at the same speed.</p><p>With friction, work done against friction transfers some energy to the surfaces as thermal energy, so the KE bar never reaches the full height of the original GPE bar. The run also takes longer, because the acceleration along the slope falls from g sin θ to g sin θ (1 − f).</p></>}>
      <div className="psim-controls">
        <SimSlider id="er-m" label="Mass" value={massKg} min={0.5} max={5} step={0.5} unit=" kg" dp={1} onChange={change(setMass)} />
        <SimSlider id="er-h" label="Ramp height h" value={heightM} min={1} max={10} step={0.5} unit=" m" dp={1} onChange={change(setHeight)} />
        <SimSlider id="er-f" label="Energy lost to friction" value={frictionPct} min={0} max={60} step={5} unit=" %" dp={0} onChange={change(setFrictionPct)} />
      </div>
      <Playback clock={clock} stepSize={Math.max(0.05, travelTimeS / 20)} />
      <div className="psim-layout">
        <svg className="psim-stage" viewBox={`-24 0 ${W + 48} ${H}`} role="img" aria-label="Block sliding down a ramp">
          <polygon className="psim-fill-line" points={`${LEFT},${TOP} ${RIGHT},${BASE} ${LEFT},${BASE}`} />
          <line className="psim-stroke" x1={LEFT} y1={TOP} x2={RIGHT} y2={BASE} />
          <line className="psim-axis" x1={20} y1={BASE} x2={W - 20} y2={BASE} />
          <line className="psim-dash" x1={LEFT - 30} y1={TOP} x2={LEFT} y2={TOP} />
          <text className="psim-label muted" x={LEFT - 34} y={(TOP + BASE) / 2} textAnchor="end">h = {heightM} m</text>
          <line className="psim-dash" x1={LEFT - 20} y1={TOP} x2={LEFT - 20} y2={BASE} />
          <g transform={`translate(${x} ${y}) rotate(${angle})`}>
            <rect className="psim-mass" x={-20} y={-30} width={40} height={30} rx={4} />
            <text className="psim-label" textAnchor="middle" y={-10}>{massKg} kg</text>
          </g>
          {frictionPct > 0 && fraction > 0.02 && <g className="psim-ghost"><line className="psim-thermal" x1={LEFT + 10} y1={TOP + 14} x2={x - 10} y2={y + 14} style={{ stroke: 'var(--pm-danger)', strokeWidth: 4, strokeDasharray: '3 5' }} /></g>}
          <text className="psim-tick" x={W - 24} y={BASE + 24} textAnchor="end">v = {fmt(model.speedMPerS, 2)} m s⁻¹ · slope {fmt(timing.inclineDegrees, 1)}° · L = {fmt(rampLengthM, 1)} m</text>
        </svg>
        <svg className="psim-stage" viewBox="0 0 200 180" role="img" aria-label="Energy bar chart">
          {bar(model.gravitationalJ, 18, '', 'GPE')}
          {bar(model.kineticJ, 80, 'ke', 'KE')}
          {bar(model.dissipatedJ, 142, 'th', 'Thermal')}
        </svg>
      </div>
      <SimGraph label="Speed against height fallen" height={200} x={{ min: 0, max: heightM, label: 'height fallen / m' }} y={{ min: 0, max: speedAxisMax, label: 'v / m s⁻¹' }} series={[{ points: speedPoints, className: 'b' }]} marker={{ x: fallenM, y: model.speedMPerS }} />
      <Readouts items={[['Time on the ramp', `${fmt(clock.time, 2)} s of ${fmt(travelTimeS, 2)} s`], ['Acceleration along ramp', `${fmt(timing.accelerationAlongRampMPerS2, 2)} m s⁻²`], ['GPE remaining', `${fmt(model.gravitationalJ, 0)} J`], ['Kinetic energy', `${fmt(model.kineticJ, 0)} J`], ['Thermal energy', `${fmt(model.dissipatedJ, 0)} J`, frictionPct ? 'danger' : ''], ['Speed', `${fmt(model.speedMPerS, 2)} m s⁻¹`, 'good']]} />
      <div className="psim-equation">mgh = {massKg} × 10 × {heightM} = {fmt(totalJ, 0)} J → ½mv² = {fmt(model.kineticJ, 0)} J at the bottom{frictionPct ? ` after ${frictionPct}% is dissipated` : ''} → v = {fmt(bottomSpeed, 2)} m s⁻¹ after {fmt(travelTimeS, 2)} s</div>
      <LiveText>After {fmt(clock.time, 2)} seconds the block has fallen {fmt(fallenM, 2)} metres. Kinetic energy {fmt(model.kineticJ, 0)} joules, speed {fmt(model.speedMPerS, 2)} metres per second.</LiveText>
    </SimFrame>
  );
}
