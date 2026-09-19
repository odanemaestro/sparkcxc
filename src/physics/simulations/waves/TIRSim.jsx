import React, { useMemo, useState } from 'react';
import {
  SimFrame,
  SimSlider,
  Playback,
  Readouts,
  LiveText,
  fmt,
  useDerivedTasks,
  useTaskChecklist,
} from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildTIRModel } from '../../waves/interactives/cWavesInteractiveModels.mjs';

const CX = 360;
const CY = 152;
const RAY = 176;

function lowerLeft(angleDeg) {
  const r = angleDeg * Math.PI / 180;
  return { x:CX - Math.sin(r) * RAY, y:CY + Math.cos(r) * RAY };
}

function lowerRight(angleDeg) {
  const r = angleDeg * Math.PI / 180;
  return { x:CX + Math.sin(r) * RAY, y:CY + Math.cos(r) * RAY };
}

function upperRight(angleDeg) {
  const r = angleDeg * Math.PI / 180;
  return { x:CX + Math.sin(r) * RAY, y:CY - Math.cos(r) * RAY };
}

function refractedAngle(n, incidence) {
  const sinR = n * Math.sin(incidence * Math.PI / 180);
  if (sinR >= 1) return null;
  return Math.asin(sinR) * 180 / Math.PI;
}

export default function TIRSim({ onEvidence }) {
  const [n, setN] = useState(1.5);
  const [incidence, setIncidence] = useState(30);
  const [seenBelow, setSeenBelow] = useState(false);
  const [seenAbove, setSeenAbove] = useState(false);
  const clock = useSimulationClock({ duration:2.8, loop:true });
  const { done, mark } = useTaskChecklist();

  const model = useMemo(() => buildTIRModel({ refractiveIndex:n, incidenceDeg:incidence }), [n, incidence]);
  const iPoint = lowerLeft(incidence);
  const reflected = lowerRight(incidence);
  const rDeg = refractedAngle(n, incidence);
  const refracted = rDeg == null ? null : upperRight(rDeg);

  const fraction = Math.max(0, Math.min(1, clock.time / 2.8));
  const beforeBoundary = fraction < 0.5;
  const leg = beforeBoundary ? fraction * 2 : (fraction - 0.5) * 2;
  const outgoing = model.state.includes('total') ? reflected : refracted || { x:CX + RAY, y:CY };
  const pulse = beforeBoundary
    ? { x:iPoint.x + (CX - iPoint.x) * leg, y:iPoint.y + (CY - iPoint.y) * leg }
    : { x:CX + (outgoing.x - CX) * leg, y:CY + (outgoing.y - CY) * leg };

  useDerivedTasks(mark, {
    animate: clock.time > 0.08,
    below: seenBelow,
    above: seenAbove,
  });

  const changeAngle = value => {
    setIncidence(value);
    const next = buildTIRModel({ refractiveIndex:n, incidenceDeg:value });
    if (value < next.criticalAngleDeg - 2) setSeenBelow(true);
    if (value > next.criticalAngleDeg + 2) setSeenAbove(true);
  };

  const changeN = value => {
    setN(value);
    setSeenBelow(false);
    setSeenAbove(false);
  };

  const tasks = [
    { id:'animate', label:'Play or step a ray at the boundary.' },
    { id:'below', label:'Set the incidence angle below the critical angle and observe refraction.' },
    { id:'above', label:'Set the incidence angle above the critical angle and observe total internal reflection.' },
  ];

  return (
    <SimFrame
      title="Total internal reflection"
      intro="Move the incident angle through the critical angle and watch the refracted ray become a reflected ray."
      prediction={{
        question:'Total internal reflection occurs when light travels from a denser to a less dense medium and the incidence angle is…',
        options:[
          { id:'greater', label:'greater than the critical angle' },
          { id:'less', label:'less than the critical angle' },
          { id:'zero', label:'zero degrees' },
        ],
        answer:'greater',
      }}
      tasks={tasks}
      done={done}
      observation={`Critical angle = ${fmt(model.criticalAngleDeg, 1)}°. At i = ${incidence}°, the result is: ${model.state}.`}
      explanation={<p>Total internal reflection requires two conditions: light must travel from <strong>higher to lower refractive index</strong>, and the angle of incidence must be <strong>greater than the critical angle</strong>. The critical angle satisfies <strong>sin c = 1/n</strong> for material-to-air.</p>}
      onComplete={() => onEvidence?.({ result:'completed', tasks:tasks.map(task => task.id) })}
    >
      <Playback clock={clock} stepSize={0.05} timeLabel={false}/>
      <div className="psim-controls">
        <SimSlider id="c4-tir-index" label="Refractive index" value={n} min={1.1} max={2.2} step={0.05} dp={2} onChange={changeN}/>
        <SimSlider id="c4-tir-angle" label="Internal incidence" value={incidence} min={5} max={85} step={1} unit="°" dp={0} onChange={changeAngle}/>
      </div>

      <svg className="psim-optics-stage" viewBox="0 0 720 350" role="img" aria-label={`Total internal reflection model. Critical angle ${fmt(model.criticalAngleDeg,1)} degrees.`}>
        <rect className="psim-medium-fill" x="46" y={CY} width="628" height="166"/>
        <line className="psim-boundary" x1="46" y1={CY} x2="674" y2={CY}/>
        <line className="psim-normal" x1={CX} y1="24" x2={CX} y2="326"/>
        <line className="psim-ray incident" x1={iPoint.x} y1={iPoint.y} x2={CX} y2={CY}/>
        {model.state.includes('total') ? (
          <line className="psim-ray reflected" x1={CX} y1={CY} x2={reflected.x} y2={reflected.y}/>
        ) : rDeg == null ? null : (
          <line className="psim-ray refracted" x1={CX} y1={CY} x2={refracted.x} y2={refracted.y}/>
        )}
        {Math.abs(incidence - model.criticalAngleDeg) < 1.5 && <line className="psim-ray critical" x1={CX} y1={CY} x2="650" y2={CY}/>}
        <circle className="psim-ray-pulse" cx={pulse.x} cy={pulse.y} r="8"/>
        <text className="psim-optics-label" x="66" y="38">air</text>
        <text className="psim-optics-label" x="66" y="184">material, n = {fmt(n, 2)}</text>
        <text className="psim-optics-label" x={CX + 18} y={CY + 44}>i = {incidence}°</text>
        <text className="psim-optics-label" x="480" y="314">{model.state}</text>
      </svg>

      <Readouts items={[
        ['Critical angle', `${fmt(model.criticalAngleDeg, 1)}°`, 'good'],
        ['Angle of incidence', `${incidence}°`],
        ['Result', model.state],
      ]}/>
      <div className="psim-equation">sin c = 1/n → c = {fmt(model.criticalAngleDeg, 1)}°</div>
      <LiveText>Incidence {incidence} degrees. Critical angle {fmt(model.criticalAngleDeg, 1)} degrees. {model.state}.</LiveText>
    </SimFrame>
  );
}
