import React, { useMemo, useState } from 'react';
import {
  SimFrame,
  SimSlider,
  SimToggle,
  Playback,
  Readouts,
  LiveText,
  fmt,
  useDerivedTasks,
  useTaskChecklist,
} from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildWaveLabModel } from '../../waves/interactives/cWavesInteractiveModels.mjs';

const W = 720;
const H = 250;
const LEFT = 34;
const RIGHT = W - 34;
const MID = 126;
const DOMAIN_M = 2;

function transverseState({ frequencyHz, wavelengthM, timeS }) {
  const count = 61;
  return Array.from({ length: count }, (_, index) => {
    const xM = DOMAIN_M * index / (count - 1);
    const phase = 2 * Math.PI * (xM / wavelengthM - frequencyHz * timeS);
    return {
      x: LEFT + (RIGHT - LEFT) * index / (count - 1),
      y: MID - 56 * Math.sin(phase),
    };
  });
}

function longitudinalState({ frequencyHz, wavelengthM, timeS }) {
  const count = 46;
  const spacing = (RIGHT - LEFT) / (count - 1);
  const displacementPx = Math.min(10, spacing * 0.75);
  return Array.from({ length: count }, (_, index) => {
    const xM = DOMAIN_M * index / (count - 1);
    const phase = 2 * Math.PI * (xM / wavelengthM - frequencyHz * timeS);
    return {
      x: LEFT + spacing * index + displacementPx * Math.sin(phase),
      baseX: LEFT + spacing * index,
    };
  });
}

export default function WaveBuilderSim({ onEvidence }) {
  const [frequency, setFrequency] = useState(5);
  const [wavelength, setWavelength] = useState(0.4);
  const [type, setType] = useState('transverse');
  const [visited, setVisited] = useState(() => new Set(['transverse']));
  const clock = useSimulationClock({ duration:4, loop:true });
  const { done, mark } = useTaskChecklist();

  const model = useMemo(
    () => buildWaveLabModel({ frequencyHz:frequency, wavelengthM:wavelength, type }),
    [frequency, wavelength, type]
  );

  const transverse = useMemo(
    () => transverseState({ frequencyHz:frequency, wavelengthM:wavelength, timeS:clock.time }),
    [frequency, wavelength, clock.time]
  );
  const longitudinal = useMemo(
    () => longitudinalState({ frequencyHz:frequency, wavelengthM:wavelength, timeS:clock.time }),
    [frequency, wavelength, clock.time]
  );

  const changedControls = Math.abs(frequency - 5) >= 1 && Math.abs(wavelength - 0.4) >= 0.1;
  useDerivedTasks(mark, {
    animate: clock.time > 0.08,
    types: visited.has('transverse') && visited.has('longitudinal'),
    relationship: changedControls,
  });

  const changeType = next => {
    setType(next);
    setVisited(previous => new Set(previous).add(next));
  };

  const trackedClock = {
    ...clock,
    toggle: () => clock.toggle(),
    step: value => clock.step(value),
  };

  const tasks = [
    { id:'animate', label:'Play or step the wave so you can observe particle motion.' },
    { id:'types', label:'Compare both transverse and longitudinal waves.' },
    { id:'relationship', label:'Change both frequency and wavelength, then observe the new wave speed.' },
  ];

  const wavePoints = transverse.map(point => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');

  return (
    <SimFrame
      title="Wave builder"
      intro="Animate a wave, compare particle motion, and connect frequency and wavelength with wave speed."
      prediction={{
        question:'In a transverse wave, the particles of the medium vibrate…',
        options:[
          { id:'parallel', label:'parallel to the direction of travel' },
          { id:'perpendicular', label:'perpendicular to the direction of travel' },
          { id:'forward', label:'only forward with the wave' },
        ],
        answer:'perpendicular',
      }}
      tasks={tasks}
      done={done}
      observation={type === 'transverse'
        ? `Particles move up and down while the disturbance travels across the screen. v = fλ = ${fmt(model.speedMps, 2)} m/s.`
        : `Particles move back and forth parallel to travel, producing moving compressions and rarefactions. v = fλ = ${fmt(model.speedMps, 2)} m/s.`}
      explanation={<p>Wave speed is related to frequency and wavelength by <strong>v = fλ</strong>. In a transverse wave the particle vibration is perpendicular to travel. In a longitudinal wave it is parallel to travel.</p>}
      onComplete={() => onEvidence?.({ result:'completed', tasks:tasks.map(task => task.id) })}
    >
      <SimToggle
        label="Wave type"
        value={type}
        onChange={changeType}
        options={[
          { value:'transverse', label:'Transverse' },
          { value:'longitudinal', label:'Longitudinal' },
        ]}
      />
      <Playback clock={trackedClock} stepSize={0.05} timeLabel={false}/>
      <div className="psim-controls">
        <SimSlider id="c1-wave-builder-frequency" label="Frequency" value={frequency} min={1} max={12} step={1} unit=" Hz" onChange={setFrequency}/>
        <SimSlider id="c1-wave-builder-wavelength" label="Wavelength" value={wavelength} min={0.2} max={1.2} step={0.05} unit=" m" dp={2} onChange={setWavelength}/>
      </div>

      <svg className="psim-wave-stage" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={type === 'transverse' ? 'Animated transverse wave with particles moving vertically' : 'Animated longitudinal wave with compressions and rarefactions'}>
        <line className="psim-wave-axis" x1={LEFT} y1={MID} x2={RIGHT} y2={MID}/>
        {type === 'transverse' ? (
          <>
            <polyline className="psim-wave-line" points={wavePoints}/>
            {transverse.filter((_, index) => index % 5 === 0).map((point, index) => (
              <g key={index}>
                <line className="psim-wave-guide" x1={point.x} y1={MID} x2={point.x} y2={point.y}/>
                <circle className="psim-wave-particle" cx={point.x} cy={point.y} r="5"/>
              </g>
            ))}
          </>
        ) : (
          <>
            {longitudinal.map((point, index) => (
              <g key={index}>
                {index % 5 === 0 && <line className="psim-wave-guide" x1={point.baseX} y1="72" x2={point.baseX} y2="180"/>}
                <circle className="psim-wave-particle" cx={point.x} cy={MID} r="5"/>
              </g>
            ))}
            <text className="psim-wave-caption" x="180" y="212" textAnchor="middle">compression</text>
            <text className="psim-wave-caption" x="540" y="212" textAnchor="middle">rarefaction</text>
          </>
        )}
        <path className="psim-wave-travel" d={`M ${RIGHT - 100} 36 H ${RIGHT - 24}`}/>
        <text className="psim-wave-caption" x={RIGHT - 62} y="27" textAnchor="middle">wave travel</text>
      </svg>

      <Readouts items={[
        ['Wave speed', `${fmt(model.speedMps, 2)} m/s`, 'good'],
        ['Period', `${fmt(model.periodS, 3)} s`],
        ['Particle motion', model.particleMotion],
      ]}/>
      <div className="psim-equation">v = fλ = {frequency} × {fmt(wavelength, 2)} = {fmt(model.speedMps, 2)} m/s</div>
      <LiveText>{type === 'transverse' ? 'Transverse wave selected.' : 'Longitudinal wave selected.'} Frequency {frequency} hertz, wavelength {fmt(wavelength, 2)} metres, speed {fmt(model.speedMps, 2)} metres per second.</LiveText>
    </SimFrame>
  );
}
