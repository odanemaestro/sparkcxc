import React, { useMemo, useState } from 'react';
import { SimFrame, useTaskChecklist, useDerivedTasks, Playback, SimSlider, SimGraph, Readouts, LiveText, Arrow, fmt } from '../core/SimKit.jsx';
import { useSimulationClock } from '../core/useSimulationClock.js';
import { buildUniformAccelerationModel } from '../../mechanics/interactives/a4InteractiveModels.mjs';

const DURATION = 8; // seconds of simulated motion
const W = 560, H = 150, TRACK_L = 40, TRACK_R = 520, TRACK_Y = 96;
const S_MIN = -20, S_MAX = 60; // metres shown on the track

export default function MotionTrackSim({ onEvidence }) {
  const [u, setU] = useState(2);
  const [a, setA] = useState(1);
  const clock = useSimulationClock({ duration: DURATION });
  const { done, mark, resetTasks } = useTaskChecklist();
  const model = buildUniformAccelerationModel({ initialVelocityMPerS: u, accelerationMPerS2: a, timeS: clock.time });
  const state = { s: model.displacementM, v: model.velocityMPerS };

  const sPoints = useMemo(() => Array.from({ length: 81 }, (_, i) => { const t = i / 10; return { x: t, y: buildUniformAccelerationModel({ initialVelocityMPerS: u, accelerationMPerS2: a, timeS: t }).displacementM }; }), [u, a]);
  const vPoints = useMemo(() => [{ x: 0, y: u }, { x: DURATION, y: u + a * DURATION }], [u, a]);

  // Task marking happens in an effect, never during render.
  useDerivedTasks(mark, {
    run: clock.time >= 2 && a !== 0,
    // Only counts once the trolley has actually slowed, stopped and reversed.
    decel: a < 0 && u > 0 && state.v < 0,
  });

  const px = Math.max(TRACK_L, Math.min(TRACK_R, TRACK_L + (state.s - S_MIN) / (S_MAX - S_MIN) * (TRACK_R - TRACK_L)));
  const offTrack = state.s < S_MIN || state.s > S_MAX;
  const vArrow = Math.max(-90, Math.min(90, state.v * 6));
  const aArrow = Math.max(-60, Math.min(60, a * 18));

  // Axes follow the extremes the controls can actually produce, so the curve is
  // never drawn outside the plotting area at the ends of the sliders.
  const niceMax = v => { const m = Math.max(1, Math.abs(v)); const step = 10 ** Math.floor(Math.log10(m)); return Math.ceil(m / step) * step; };
  const sVals = sPoints.map(p => p.y);
  const sAxis = { min: Math.min(0, -niceMax(Math.min(...sVals))), max: niceMax(Math.max(...sVals, 1)) };
  const vEnd = u + a * DURATION;
  const vAxis = { min: Math.min(0, -niceMax(Math.min(u, vEnd))), max: niceMax(Math.max(u, vEnd, 1)) };

  const reset = () => { clock.reset(); resetTasks(); };

  return (
    <SimFrame title="Motion track with synchronised graphs" intro="A trolley moves along a straight track. Press Play and watch the marker move along the displacement-time and velocity-time graphs at the same time." prediction={{ question: 'With a positive initial velocity and a negative acceleration, what will the velocity-time graph look like?', options: [{ id: 'flat', label: 'A horizontal line' }, { id: 'downslope', label: 'A straight line sloping downwards' }, { id: 'curve', label: 'A curve bending upwards' }], answer: 'downslope' }}
      tasks={[{ id: 'run', label: 'Set a non-zero acceleration and play the motion for at least 2 s.' }, { id: 'decel', label: 'Make the acceleration negative and run again. Watch the trolley slow, stop and reverse.' }]} done={done}
      onComplete={() => onEvidence?.({ objective: 'A4.1', score: 1, result: 'completed' })}
      observation={`At t = ${fmt(clock.time, 1)} s the trolley is at s = ${fmt(state.s, 1)} m moving at v = ${fmt(state.v, 2)} m s⁻¹.`}
      explanation={<><p>The velocity-time graph is a straight line because the acceleration is constant: its gradient is a. With a negative acceleration the line slopes down, crossing the time axis when the trolley momentarily stops (v = 0 at t = −u/a) and then going negative as it reverses.</p><p>The displacement-time graph is a curve whose gradient at any instant equals the velocity. Where the v–t line crosses zero, the s–t curve reaches its maximum. The equations used are v = u + at and s = ut + ½at².</p></>}>
      <div className="psim-controls">
        <SimSlider id="mt-u" label="Initial velocity u" value={u} min={-6} max={6} step={0.5} unit=" m s⁻¹" dp={1} onChange={v => { setU(v); clock.reset(); }} />
        <SimSlider id="mt-a" label="Acceleration a" value={a} min={-3} max={3} step={0.25} unit=" m s⁻²" dp={2} onChange={v => { setA(v); clock.reset(); }} />
      </div>
      <Playback clock={clock} stepSize={0.1} />
      <button type="button" className="psim-btn secondary" onClick={reset} style={{ marginBottom: 8 }}>Reset lab</button>
      <svg className="psim-stage" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Trolley on a straight track">
        <line className="psim-axis" x1={TRACK_L} y1={TRACK_Y + 14} x2={TRACK_R} y2={TRACK_Y + 14} />
        {[-20, 0, 20, 40, 60].map(m => { const x = TRACK_L + (m - S_MIN) / (S_MAX - S_MIN) * (TRACK_R - TRACK_L); return <g key={m}><line className="psim-stroke-muted" x1={x} y1={TRACK_Y + 10} x2={x} y2={TRACK_Y + 18} /><text className="psim-tick" x={x} y={TRACK_Y + 32} textAnchor="middle">{m} m</text></g>; })}
        <g transform={`translate(${px} ${TRACK_Y})`} opacity={offTrack ? 0.35 : 1}>
          <rect className="psim-mass" x={-26} y={-26} width={52} height={28} rx={6} />
          <circle className="psim-solid" cx={-15} cy={6} r={7} /><circle className="psim-solid" cx={15} cy={6} r={7} />
          {Math.abs(vArrow) > 3 && <Arrow className="b" x1={0} y1={-40} x2={vArrow} y2={-40} width={3} label="v" labelOffset={-12} />}
          {Math.abs(aArrow) > 3 && <Arrow className="r" x1={0} y1={-58} x2={aArrow} y2={-58} width={2.5} label="a" labelOffset={-12} />}
        </g>
        {offTrack && <text className="psim-label muted" x={W / 2} y={30} textAnchor="middle">Trolley has left the visible track</text>}
        <text className="psim-tick" x={TRACK_R} y={TRACK_Y - 60} textAnchor="end">blue arrow: velocity · amber arrow: acceleration</text>
      </svg>
      <div className="psim-graphs">
        <SimGraph label="Displacement-time graph" x={{ min: 0, max: DURATION, label: 't / s' }} y={{ min: sAxis.min, max: sAxis.max, label: 's / m' }} series={[{ points: sPoints }]} marker={{ x: clock.time, y: state.s }} />
        <SimGraph label="Velocity-time graph" x={{ min: 0, max: DURATION, label: 't / s' }} y={{ min: vAxis.min, max: vAxis.max, label: 'v / m s⁻¹' }} series={[{ points: vPoints, className: 'b' }]} marker={{ x: clock.time, y: state.v }} yTicks={5} />
      </div>
      <Readouts items={[['Time', `${fmt(clock.time, 2)} s`], ['Displacement', `${fmt(state.s, 2)} m`], ['Velocity', `${fmt(state.v, 2)} m s⁻¹`], ['Acceleration', `${fmt(a, 2)} m s⁻²`]]} />
      <div className="psim-equation">v = u + at = {fmt(u, 1)} + ({fmt(a, 2)})({fmt(clock.time, 2)}) = {fmt(state.v, 2)} m s⁻¹ · s = ut + ½at² = {fmt(state.s, 2)} m</div>
      <LiveText>{clock.playing ? 'Motion playing.' : 'Motion paused.'} Gradient of the v–t line is {fmt(a, 2)} m s⁻²; gradient of the s–t curve right now is {fmt(state.v, 2)} m s⁻¹.</LiveText>
    </SimFrame>
  );
}
