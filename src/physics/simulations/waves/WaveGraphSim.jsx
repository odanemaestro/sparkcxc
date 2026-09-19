import React, { useMemo, useState } from 'react';
import {
  SimFrame,
  SimSlider,
  SimToggle,
  Playback,
  Readouts,
  SimGraph,
  LiveText,
  fmt,
  useDerivedTasks,
  useTaskChecklist,
} from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildWaveGraphModel } from '../../waves/interactives/cWavesInteractiveModels.mjs';

function pointsFor({ mode, frequency, wavelength, amplitude, time }) {
  const count = 180;
  const maxX = mode === 'position' ? 2 : 1;
  return Array.from({ length:count + 1 }, (_, index) => {
    const x = maxX * index / count;
    const phase = mode === 'position'
      ? 2 * Math.PI * (x / wavelength - frequency * time)
      : 2 * Math.PI * frequency * x;
    return { x, y:amplitude * Math.sin(phase) };
  });
}

export default function WaveGraphSim({ onEvidence }) {
  const [mode, setMode] = useState('position');
  const [frequency, setFrequency] = useState(3);
  const [wavelength, setWavelength] = useState(0.5);
  const [amplitude, setAmplitude] = useState(0.08);
  const [visited, setVisited] = useState(() => new Set(['position']));
  const clock = useSimulationClock({ duration:4, loop:true });
  const { done, mark } = useTaskChecklist();

  const model = useMemo(
    () => buildWaveGraphModel({ mode, frequencyHz:frequency, wavelengthM:wavelength, amplitudeM:amplitude }),
    [mode, frequency, wavelength, amplitude]
  );

  const points = useMemo(
    () => pointsFor({ mode, frequency, wavelength, amplitude, time:clock.time }),
    [mode, frequency, wavelength, amplitude, clock.time]
  );

  const markerX = mode === 'position' ? 1 : (clock.time % 1);
  const markerY = mode === 'position'
    ? amplitude * Math.sin(2 * Math.PI * (markerX / wavelength - frequency * clock.time))
    : amplitude * Math.sin(2 * Math.PI * frequency * markerX);

  useDerivedTasks(mark, {
    animate: clock.time > 0.08,
    modes: visited.has('position') && visited.has('time'),
    controls: Math.abs(amplitude - 0.08) >= 0.02 && (Math.abs(wavelength - 0.5) >= 0.1 || Math.abs(frequency - 3) >= 1),
  });

  const changeMode = next => {
    setMode(next);
    setVisited(previous => new Set(previous).add(next));
    clock.reset();
  };

  const tasks = [
    { id:'animate', label:'Play or step the graph to follow a live point on the wave.' },
    { id:'modes', label:'Compare displacement-position and displacement-time graphs.' },
    { id:'controls', label:'Change amplitude and either frequency or wavelength, then compare the graph.' },
  ];

  return (
    <SimFrame
      title="Wave graph explorer"
      intro="Read the horizontal axis first, then identify amplitude, wavelength or period from the graph."
      prediction={{
        question:'If only the amplitude is increased, what happens to the distance between successive crests?',
        options:[
          { id:'increase', label:'It increases' },
          { id:'same', label:'It stays the same' },
          { id:'decrease', label:'It decreases' },
        ],
        answer:'same',
      }}
      tasks={tasks}
      done={done}
      observation={mode === 'position'
        ? `This is a displacement-position graph. One horizontal cycle is the wavelength, ${fmt(wavelength, 2)} m.`
        : `This is a displacement-time graph. One horizontal cycle is the period, ${fmt(1 / frequency, 3)} s.`}
      explanation={<p>On a displacement-position graph, the horizontal spacing of one complete cycle is the <strong>wavelength</strong>. On a displacement-time graph, it is the <strong>period</strong>. Amplitude changes the vertical height, not the horizontal cycle spacing.</p>}
      onComplete={() => onEvidence?.({ result:'completed', tasks:tasks.map(task => task.id) })}
    >
      <SimToggle
        label="Graph type"
        value={mode}
        onChange={changeMode}
        options={[
          { value:'position', label:'Displacement-position' },
          { value:'time', label:'Displacement-time' },
        ]}
      />
      <Playback clock={clock} stepSize={0.05} timeLabel={false}/>
      <div className="psim-controls">
        <SimSlider id="c1-wave-graph-frequency" label="Frequency" value={frequency} min={1} max={8} step={1} unit=" Hz" onChange={setFrequency}/>
        <SimSlider id="c1-wave-graph-wavelength" label="Wavelength" value={wavelength} min={0.2} max={1} step={0.05} unit=" m" dp={2} onChange={setWavelength}/>
        <SimSlider id="c1-wave-graph-amplitude" label="Amplitude" value={amplitude} min={0.02} max={0.15} step={0.01} unit=" m" dp={2} onChange={setAmplitude}/>
      </div>

      <SimGraph
        x={{ min:0, max:mode === 'position' ? 2 : 1, label:mode === 'position' ? 'position / m' : 'time / s' }}
        y={{ min:-0.16, max:0.16, label:'displacement / m' }}
        series={[{ points }]}
        marker={{ x:markerX, y:markerY, label:'live point' }}
        xTicks={4}
        yTicks={4}
        label={mode === 'position' ? 'Animated displacement against position graph' : 'Displacement against time graph with a moving time marker'}
      />

      <Readouts items={[
        [model.horizontalQuantity === 'wavelength' ? 'Wavelength' : 'Period', `${fmt(model.horizontalValue, 3)} ${model.horizontalQuantity === 'wavelength' ? 'm' : 's'}`, 'good'],
        ['Amplitude', `${fmt(amplitude, 2)} m`],
        ['Wave speed', `${fmt(frequency * wavelength, 2)} m/s`],
      ]}/>
      <LiveText>{mode === 'position' ? 'Displacement-position graph.' : 'Displacement-time graph.'} Amplitude {fmt(amplitude, 2)} metres.</LiveText>
    </SimFrame>
  );
}
