import React, { useMemo, useState } from 'react';
import { buildNewtonTrolleyModel, buildUniformAccelerationModel } from '../../mechanics/interactives/a4InteractiveModels.mjs';
import { SimFrame, useTaskChecklist, useDerivedTasks, Playback, SimSlider, SimGraph, Readouts, LiveText, Arrow, fmt } from '../core/SimKit.jsx';
import { useSimulationClock } from '../core/useSimulationClock.js';

const W = 560, H = 190, GROUND = 130, X0 = 60, TRACK_LEN_M = 20, PX_PER_M = 22;
const DURATION = 6;

export default function ForceBodySim({ onEvidence }) {
  const [massKg, setMass] = useState(2);
  const [appliedN, setApplied] = useState(10);
  const [frictionN, setFriction] = useState(4);
  const clock = useSimulationClock({ duration: DURATION });
  const { done, mark, resetTasks } = useTaskChecklist();
  const [ranMasses, setRanMasses] = useState(() => new Set());

  // Friction opposes motion; from rest it cannot exceed the applied force.
  const effectiveFriction = Math.min(frictionN, appliedN);
  const model = useMemo(() => buildNewtonTrolleyModel({ massKg, forcesN: [appliedN, -effectiveFriction] }), [massKg, appliedN, effectiveFriction]);
  const a = model.accelerationMPerS2;
  const motion = buildUniformAccelerationModel({ initialVelocityMPerS: 0, accelerationMPerS2: a, timeS: clock.time });
  const state = { s: motion.displacementM, v: motion.velocityMPerS };
  const weightN = massKg * 10;
  const vPoints = useMemo(() => [{ x: 0, y: 0 }, { x: DURATION, y: a * DURATION }], [a]);

  // Task marking happens in an effect, never during render.
  useDerivedTasks(mark, {
    run: clock.time > 1 && a > 0,
    // The trolley must be run with balanced forces and stay at rest.
    balanced: clock.time > 0.5 && appliedN > 0 && Math.abs(model.resultantN) < 1e-9 && Math.abs(state.v) < 1e-9,
    // Three different masses, each one actually run for long enough to see the gradient.
    masses: ranMasses.size >= 3,
  });

  const change = (setter) => v => { setter(v); clock.reset(); };
  // Record a mass only once its run has produced motion, so simply sweeping the
  // slider does not tick the task off.
  React.useEffect(() => { if (clock.time > 1 && a > 0) setRanMasses(s => (s.has(massKg) ? s : new Set(s).add(massKg))); }, [clock.time, a, massKg]);
  const px = Math.min(X0 + TRACK_LEN_M * PX_PER_M, X0 + state.s * PX_PER_M);
  // Arrow scales are fixed fractions of the space available, so the longest
  // force at the top of each slider still fits inside the drawing.
  const scale = 140 / 30; // px per newton horizontally (30 N is the slider maximum)
  const weightScale = 60 / 60; // px per newton vertically (60 N is the largest weight)
  const weightArrow = weightN * weightScale;

  return (
    <SimFrame title="Newton's second law trolley" intro="Apply a pulling force to a trolley on a bench. The free-body diagram updates live; press Play to see how the resultant force controls the acceleration." prediction={{ question: 'If the resultant force stays the same but the mass is doubled, the acceleration will…', options: [{ id: 'double', label: 'double' }, { id: 'same', label: 'stay the same' }, { id: 'half', label: 'halve' }], answer: 'half' }}
      tasks={[{ id: 'run', label: 'Make the applied force bigger than friction and play the motion.' }, { id: 'balanced', label: 'Set friction equal to the applied force and play: the trolley should not accelerate.' }, { id: 'masses', label: 'Try at least three different masses and compare the velocity-time gradients.' }]} done={done}
      onComplete={() => onEvidence?.({ objective: 'A4.4', score: 1, result: 'completed' })}
      observation={`Resultant force ${fmt(model.resultantN, 1)} N on ${massKg} kg gives a = F/m = ${fmt(a, 2)} m s⁻². The trolley is ${model.state}.`}
      explanation={<><p>Only the resultant (unbalanced) force produces acceleration: F = ma. The weight and the normal reaction cancel vertically, so the horizontal resultant is applied force − friction. When these are equal the resultant is zero and the trolley stays at rest or keeps a constant velocity (Newton's first law).</p><p>Doubling the mass with the same resultant halves the acceleration, which appears as a shallower gradient on the velocity-time graph.</p></>}>
      <div className="psim-controls">
        <SimSlider id="fb-m" label="Mass m" value={massKg} min={0.5} max={6} step={0.5} unit=" kg" dp={1} onChange={change(setMass)} />
        <SimSlider id="fb-f" label="Applied force" value={appliedN} min={0} max={30} step={1} unit=" N" dp={0} onChange={change(setApplied)} />
        <SimSlider id="fb-fr" label="Friction" value={frictionN} min={0} max={30} step={1} unit=" N" dp={0} onChange={change(setFriction)} />
      </div>
      <Playback clock={clock} stepSize={0.1} />
      <svg className="psim-stage" viewBox={`-24 0 ${W + 48} ${H}`} role="img" aria-label="Trolley with free-body diagram">
        <line className="psim-axis" x1={20} y1={GROUND + 14} x2={W - 20} y2={GROUND + 14} />
        <g transform={`translate(${px} ${GROUND})`}>
          <rect className="psim-mass" x={-30} y={-30} width={60} height={30} rx={6} />
          <circle className="psim-solid" cx={-16} cy={6} r={7} /><circle className="psim-solid" cx={16} cy={6} r={7} />
          <text className="psim-label" textAnchor="middle" y={-10}>{massKg} kg</text>
          <Arrow className="g" x1={32} y1={-15} x2={32 + appliedN * scale} y2={-15} label={`F = ${appliedN} N`} labelOffset={-14} />
          {effectiveFriction > 0 && <Arrow className="d" x1={-32} y1={-15} x2={-32 - effectiveFriction * scale} y2={-15} label={`friction ${effectiveFriction} N`} labelOffset={14} />}
          <Arrow className="muted" x1={0} y1={-30} x2={0} y2={-30 - weightArrow} width={2} label={`R = ${weightN} N`} labelOffset={-30} />
          <Arrow className="muted" x1={0} y1={4} x2={0} y2={4 + weightArrow} width={2} label={`W = ${weightN} N`} labelOffset={-30} />
        </g>
        <text className="psim-tick" x={W - 24} y={24} textAnchor="end">v = {fmt(state.v, 2)} m s⁻¹ · s = {fmt(Math.min(state.s, TRACK_LEN_M), 1)} m</text>
      </svg>
      <SimGraph label="Velocity-time graph for the trolley" height={200} x={{ min: 0, max: DURATION, label: 't / s' }} y={{ min: 0, max: Math.max(5, Math.ceil(a * DURATION / 10) * 10), label: 'v / m s⁻¹' }} series={[{ points: vPoints, className: 'b' }]} marker={{ x: clock.time, y: state.v }} />
      <Readouts items={[['Resultant force', `${fmt(model.resultantN, 1)} N`, Math.abs(model.resultantN) < 1e-9 ? 'warn' : ''], ['Acceleration', `${fmt(a, 2)} m s⁻²`], ['Velocity now', `${fmt(state.v, 2)} m s⁻¹`], ['State', model.state]]} />
      <div className="psim-equation">a = F/m = ({appliedN} − {effectiveFriction}) N ÷ {massKg} kg = {fmt(a, 2)} m s⁻²</div>
      <LiveText>{frictionN > appliedN ? 'Friction cannot exceed the applied force on a trolley starting from rest, so it is capped at the applied force and the trolley stays still.' : `Resultant ${fmt(model.resultantN, 1)} newtons; acceleration ${fmt(a, 2)} metres per second squared.`}</LiveText>
    </SimFrame>
  );
}
