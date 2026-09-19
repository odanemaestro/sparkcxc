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
import { buildReflectionModel } from '../../waves/interactives/cWavesInteractiveModels.mjs';

const CX = 360;
const CY = 142;
const RAY = 180;

function endpoint(angleDeg, side) {
  const r = angleDeg * Math.PI / 180;
  return {
    x: CX + side * Math.sin(r) * RAY,
    y: CY - Math.cos(r) * RAY,
  };
}

export default function ReflectionSim({ onEvidence }) {
  const [incidence, setIncidence] = useState(35);
  const [seenLow, setSeenLow] = useState(false);
  const [seenHigh, setSeenHigh] = useState(false);
  const clock = useSimulationClock({ duration:2.6, loop:true });
  const { done, mark } = useTaskChecklist();
  const model = useMemo(() => buildReflectionModel({ incidenceDeg:incidence }), [incidence]);

  const incoming = endpoint(incidence, -1);
  const outgoing = endpoint(incidence, 1);
  const fraction = Math.max(0, Math.min(1, clock.time / 2.6));
  const onIncoming = fraction < 0.5;
  const leg = onIncoming ? fraction * 2 : (fraction - 0.5) * 2;
  const pulse = onIncoming
    ? { x:incoming.x + (CX - incoming.x) * leg, y:incoming.y + (CY - incoming.y) * leg }
    : { x:CX + (outgoing.x - CX) * leg, y:CY + (outgoing.y - CY) * leg };

  useDerivedTasks(mark, {
    animate: clock.time > 0.08,
    low: seenLow,
    high: seenHigh,
  });

  const changeAngle = value => {
    setIncidence(value);
    if (value <= 25) setSeenLow(true);
    if (value >= 55) setSeenHigh(true);
  };

  const tasks = [
    { id:'animate', label:'Play or step a light pulse through one reflection.' },
    { id:'low', label:'Set a small angle of incidence, 25° or less.' },
    { id:'high', label:'Set a large angle of incidence, 55° or more, and compare the reflected angle.' },
  ];

  return (
    <SimFrame
      title="Reflection of light"
      intro="Change the angle of incidence and observe how the reflected ray remains symmetrical about the normal."
      prediction={{
        question:'For reflection from a plane mirror, the angle of reflection is…',
        options:[
          { id:'equal', label:'equal to the angle of incidence' },
          { id:'half', label:'half the angle of incidence' },
          { id:'greater', label:'always greater than the angle of incidence' },
        ],
        answer:'equal',
      }}
      tasks={tasks}
      done={done}
      observation={`Angle of incidence = ${fmt(model.incidenceDeg, 0)}°. Angle of reflection = ${fmt(model.reflectionDeg, 0)}°. Both are measured from the normal.`}
      explanation={<p>The law of reflection states that the <strong>angle of incidence equals the angle of reflection</strong>. Both angles are measured from the normal to the reflecting surface.</p>}
      onComplete={() => onEvidence?.({ result:'completed', tasks:tasks.map(task => task.id) })}
    >
      <Playback clock={clock} stepSize={0.05} timeLabel={false}/>
      <div className="psim-controls">
        <SimSlider id="c4-reflection-angle" label="Angle of incidence" value={incidence} min={5} max={80} step={1} unit="°" dp={0} onChange={changeAngle}/>
      </div>

      <svg className="psim-optics-stage" viewBox="0 0 720 330" role="img" aria-label={`Reflection diagram with incidence and reflection angles both ${incidence} degrees`}>
        <line className="psim-mirror" x1="76" y1={CY} x2="644" y2={CY}/>
        <line className="psim-normal" x1={CX} y1="26" x2={CX} y2="276"/>
        <line className="psim-ray incident" x1={incoming.x} y1={incoming.y} x2={CX} y2={CY}/>
        <line className="psim-ray reflected" x1={CX} y1={CY} x2={outgoing.x} y2={outgoing.y}/>
        <circle className="psim-ray-pulse" cx={pulse.x} cy={pulse.y} r="8"/>
        <path className="psim-angle-arc" d={`M ${CX - 46 * Math.sin(incidence*Math.PI/180)} ${CY - 46 * Math.cos(incidence*Math.PI/180)} A 46 46 0 0 1 ${CX} ${CY - 46}`}/>
        <path className="psim-angle-arc" d={`M ${CX} ${CY - 46} A 46 46 0 0 1 ${CX + 46 * Math.sin(incidence*Math.PI/180)} ${CY - 46 * Math.cos(incidence*Math.PI/180)}`}/>
        <text className="psim-optics-label" x={CX - 64} y={CY - 54}>i = {incidence}°</text>
        <text className="psim-optics-label" x={CX + 36} y={CY - 54}>r = {incidence}°</text>
        <text className="psim-optics-label" x={CX + 8} y="32">normal</text>
        <text className="psim-optics-label" x="92" y={CY + 26}>mirror</text>
      </svg>

      <Readouts items={[
        ['Angle of incidence', `${model.incidenceDeg}°`],
        ['Angle of reflection', `${model.reflectionDeg}°`, 'good'],
        ['Angle to mirror surface', `${model.fromSurfaceDeg}°`],
      ]}/>
      <LiveText>Incident angle {model.incidenceDeg} degrees. Reflected angle {model.reflectionDeg} degrees.</LiveText>
    </SimFrame>
  );
}
