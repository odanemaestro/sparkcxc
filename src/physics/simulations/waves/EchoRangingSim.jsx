import React, { useMemo } from 'react';
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
import { buildEchoLabModel } from '../../waves/interactives/cWavesInteractiveModels.mjs';
import { useState } from 'react';

const W = 720;
const SOURCE_X = 86;
const REFLECTOR_X = 628;
const PATH_Y = 126;

export default function EchoRangingSim({ onEvidence }) {
  const [echoTime, setEchoTime] = useState(0.5);
  const [speed, setSpeed] = useState(340);
  const clock = useSimulationClock({ duration:echoTime, loop:false });
  const { done, mark } = useTaskChecklist();

  const model = useMemo(
    () => buildEchoLabModel({ speedMps:speed, timeS:echoTime }),
    [speed, echoTime]
  );

  const fraction = Math.max(0, Math.min(1, echoTime > 0 ? clock.time / echoTime : 0));
  const outward = fraction <= 0.5;
  const legProgress = outward ? fraction * 2 : (fraction - 0.5) * 2;
  const pulseX = outward
    ? SOURCE_X + (REFLECTOR_X - SOURCE_X) * legProgress
    : REFLECTOR_X - (REFLECTOR_X - SOURCE_X) * legProgress;

  useDerivedTasks(mark, {
    run: fraction >= 0.99,
    time: Math.abs(echoTime - 0.5) >= 0.15,
    speed: Math.abs(speed - 340) >= 100,
  });

  const changeTime = value => {
    setEchoTime(value);
    clock.reset();
  };
  const changeSpeed = value => {
    setSpeed(value);
    clock.reset();
  };

  const tasks = [
    { id:'run', label:'Run one complete outward-and-return echo journey.' },
    { id:'time', label:'Change the measured return time and observe the new distance.' },
    { id:'speed', label:'Change the wave speed and compare the calculated distance.' },
  ];

  return (
    <SimFrame
      title="Echo ranging lab"
      intro="Send a pulse to a reflector and use the measured round-trip time to calculate the one-way distance."
      prediction={{
        question:'The measured echo time includes the outward and return journeys. Which expression gives the one-way distance?',
        options:[
          { id:'vt', label:'d = vt' },
          { id:'half', label:'d = vt/2' },
          { id:'two', label:'d = 2vt' },
        ],
        answer:'half',
      }}
      tasks={tasks}
      done={done}
      observation={fraction >= 0.99
        ? `The echo has returned. The pulse travelled ${fmt(model.totalPathM, 1)} m in total, so the reflector is ${fmt(model.distanceM, 1)} m away.`
        : outward
          ? 'The pulse is travelling from the source towards the reflector.'
          : 'The reflected pulse is travelling back towards the source.'}
      explanation={<p>The measured echo time is for the <strong>round trip</strong>. The total path is <strong>vt</strong>, so the one-way distance to the reflector is <strong>vt/2</strong>.</p>}
      onComplete={() => onEvidence?.({ result:'completed', tasks:tasks.map(task => task.id) })}
    >
      <Playback clock={clock} stepSize={0.05} showSpeed={false}/>
      <div className="psim-controls">
        <SimSlider id="c2-echo-time" label="Echo return time" value={echoTime} min={0.2} max={2} step={0.05} unit=" s" dp={2} onChange={changeTime}/>
        <SimSlider id="c2-echo-speed" label="Wave speed" value={speed} min={300} max={1600} step={20} unit=" m/s" dp={0} onChange={changeSpeed}/>
      </div>

      <svg className="psim-wave-stage psim-echo-stage" viewBox={`0 0 ${W} 250`} role="img" aria-label={`Echo pulse travelling between source and reflector. One-way distance ${fmt(model.distanceM, 1)} metres.`}>
        <g className="psim-echo-source">
          <circle cx={SOURCE_X} cy={PATH_Y} r="22"/>
          <path d={`M ${SOURCE_X + 24} ${PATH_Y - 14} Q ${SOURCE_X + 48} ${PATH_Y} ${SOURCE_X + 24} ${PATH_Y + 14}`}/>
          <path d={`M ${SOURCE_X + 32} ${PATH_Y - 24} Q ${SOURCE_X + 68} ${PATH_Y} ${SOURCE_X + 32} ${PATH_Y + 24}`}/>
        </g>
        <g className="psim-echo-reflector">
          <rect x={REFLECTOR_X - 8} y="62" width="16" height="128" rx="4"/>
          <line x1={REFLECTOR_X - 22} y1="62" x2={REFLECTOR_X + 22} y2="62"/>
          <line x1={REFLECTOR_X - 22} y1="190" x2={REFLECTOR_X + 22} y2="190"/>
        </g>
        <line className="psim-echo-path" x1={SOURCE_X + 28} y1={PATH_Y} x2={REFLECTOR_X - 12} y2={PATH_Y}/>
        <circle className={`psim-echo-pulse ${outward ? 'outward' : 'returning'}`} cx={pulseX} cy={PATH_Y} r="10"/>
        <text className="psim-wave-caption" x={SOURCE_X} y="222" textAnchor="middle">source</text>
        <text className="psim-wave-caption" x={REFLECTOR_X} y="222" textAnchor="middle">reflector</text>
        <text className="psim-wave-caption" x={(SOURCE_X + REFLECTOR_X) / 2} y="42" textAnchor="middle">{outward ? 'outward pulse' : 'return echo'}</text>
      </svg>

      <Readouts items={[
        ['Round-trip path', `${fmt(model.totalPathM, 1)} m`],
        ['One-way distance', `${fmt(model.distanceM, 1)} m`, 'good'],
        ['Return time', `${fmt(echoTime, 2)} s`],
      ]}/>
      <div className="psim-equation">d = vt/2 = {speed} × {fmt(echoTime, 2)} ÷ 2 = {fmt(model.distanceM, 1)} m</div>
      <LiveText>{outward ? 'Pulse moving towards reflector.' : 'Echo moving back towards source.'} Calculated one-way distance {fmt(model.distanceM, 1)} metres.</LiveText>
    </SimFrame>
  );
}
