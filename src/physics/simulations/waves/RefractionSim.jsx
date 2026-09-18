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
import { buildRefractionModel } from '../../waves/interactives/cWavesInteractiveModels.mjs';

const CX = 360;
const CY = 150;
const RAY = 176;

function upperEndpoint(angleDeg) {
  const r = angleDeg * Math.PI / 180;
  return { x:CX - Math.sin(r) * RAY, y:CY - Math.cos(r) * RAY };
}

function lowerEndpoint(angleDeg) {
  const r = angleDeg * Math.PI / 180;
  return { x:CX + Math.sin(r) * RAY, y:CY + Math.cos(r) * RAY };
}

export default function RefractionSim({ onEvidence }) {
  const [incidence, setIncidence] = useState(45);
  const [n, setN] = useState(1.5);
  const [seenLowN, setSeenLowN] = useState(false);
  const [seenHighN, setSeenHighN] = useState(false);
  const clock = useSimulationClock({ duration:2.8, loop:true });
  const { done, mark } = useTaskChecklist();
  const model = useMemo(() => buildRefractionModel({ incidenceDeg:incidence, refractiveIndex:n }), [incidence, n]);

  const incoming = upperEndpoint(incidence);
  const outgoing = lowerEndpoint(model.refractionDeg);
  const fraction = Math.max(0, Math.min(1, clock.time / 2.8));
  const beforeBoundary = fraction < 0.5;
  const leg = beforeBoundary ? fraction * 2 : (fraction - 0.5) * 2;
  const pulse = beforeBoundary
    ? { x:incoming.x + (CX - incoming.x) * leg, y:incoming.y + (CY - incoming.y) * leg }
    : { x:CX + (outgoing.x - CX) * leg, y:CY + (outgoing.y - CY) * leg };

  useDerivedTasks(mark, {
    animate: clock.time > 0.08,
    lowN: seenLowN,
    highN: seenHighN,
  });

  const changeN = value => {
    setN(value);
    if (value <= 1.25) setSeenLowN(true);
    if (value >= 1.8) setSeenHighN(true);
  };

  const tasks = [
    { id:'animate', label:'Play or step a light pulse across the boundary.' },
    { id:'lowN', label:'Try a refractive index of 1.25 or less.' },
    { id:'highN', label:'Try a refractive index of 1.80 or more and compare the bending.' },
  ];

  return (
    <SimFrame
      title="Refraction of light"
      intro="Send light from air into a transparent material and observe how the ray bends as its speed changes."
      prediction={{
        question:'When light enters a material with a higher refractive index from air, it bends…',
        options:[
          { id:'toward', label:'towards the normal' },
          { id:'away', label:'away from the normal' },
          { id:'none', label:'without changing direction' },
        ],
        answer:'toward',
      }}
      tasks={tasks}
      done={done}
      observation={`At i = ${incidence}° and n = ${fmt(n, 2)}, the refracted angle is ${fmt(model.refractionDeg, 1)}°. The ray bends towards the normal because its speed is lower in the material.`}
      explanation={<p>For air entering a material, <strong>n = sin i / sin r</strong>. A greater refractive index means a lower wave speed and, for the same incident angle, stronger bending towards the normal.</p>}
      onComplete={() => onEvidence?.({ result:'completed', tasks:tasks.map(task => task.id) })}
    >
      <Playback clock={clock} stepSize={0.05} timeLabel={false}/>
      <div className="psim-controls">
        <SimSlider id="c4-refraction-angle" label="Angle of incidence" value={incidence} min={5} max={80} step={1} unit="°" dp={0} onChange={setIncidence}/>
        <SimSlider id="c4-refraction-index" label="Refractive index" value={n} min={1.1} max={2.2} step={0.05} dp={2} onChange={changeN}/>
      </div>

      <svg className="psim-optics-stage" viewBox="0 0 720 340" role="img" aria-label={`Refraction from air into material of refractive index ${fmt(n,2)}`}>
        <rect className="psim-medium-fill" x="46" y={CY} width="628" height="158" rx="0"/>
        <line className="psim-boundary" x1="46" y1={CY} x2="674" y2={CY}/>
        <line className="psim-normal" x1={CX} y1="24" x2={CX} y2="316"/>
        <line className="psim-ray incident" x1={incoming.x} y1={incoming.y} x2={CX} y2={CY}/>
        <line className="psim-ray refracted" x1={CX} y1={CY} x2={outgoing.x} y2={outgoing.y}/>
        <circle className="psim-ray-pulse" cx={pulse.x} cy={pulse.y} r="8"/>
        <text className="psim-optics-label" x="66" y="38">air, n ≈ 1.00</text>
        <text className="psim-optics-label" x="66" y="184">material, n = {fmt(n, 2)}</text>
        <text className="psim-optics-label" x={CX - 82} y={CY - 34}>i = {incidence}°</text>
        <text className="psim-optics-label" x={CX + 28} y={CY + 56}>r = {fmt(model.refractionDeg, 1)}°</text>
      </svg>

      <Readouts items={[
        ['Angle of refraction', `${fmt(model.refractionDeg, 1)}°`, 'good'],
        ['Speed in material', `${fmt(model.speedMps / 1e8, 2)} × 10⁸ m/s`],
        ['Calculated n', fmt(model.checkN, 3)],
      ]}/>
      <div className="psim-equation">n = sin i / sin r = {fmt(model.checkN, 3)}</div>
      <LiveText>Incident angle {incidence} degrees. Refracted angle {fmt(model.refractionDeg, 1)} degrees. Refractive index {fmt(n, 2)}.</LiveText>
    </SimFrame>
  );
}
