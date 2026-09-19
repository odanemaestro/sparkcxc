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
import { buildPitchLoudnessModel } from '../../waves/interactives/cWavesInteractiveModels.mjs';

function soundPath({ frequency, amplitude, time }) {
  const left = 138;
  const right = 694;
  const mid = 124;
  const ampPx = 18 + amplitude * 62;
  const cycles = 2 + (frequency - 100) / 1100 * 8;
  const samples = 160;
  return Array.from({ length:samples + 1 }, (_, index) => {
    const q = index / samples;
    const x = left + (right - left) * q;
    const phase = 2 * Math.PI * (cycles * q - time * 1.5);
    const y = mid - ampPx * Math.sin(phase);
    return `${index ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
}

export default function PitchLoudnessSim({ onEvidence }) {
  const [frequency, setFrequency] = useState(440);
  const [amplitude, setAmplitude] = useState(0.5);
  const clock = useSimulationClock({ duration:4, loop:true });
  const { done, mark } = useTaskChecklist();

  const model = useMemo(
    () => buildPitchLoudnessModel({ frequencyHz:frequency, amplitude }),
    [frequency, amplitude]
  );
  const path = useMemo(
    () => soundPath({ frequency, amplitude, time:clock.time }),
    [frequency, amplitude, clock.time]
  );

  useDerivedTasks(mark, {
    animate: clock.time > 0.08,
    frequency: Math.abs(frequency - 440) >= 200,
    amplitude: Math.abs(amplitude - 0.5) >= 0.25,
  });

  const tasks = [
    { id:'animate', label:'Play or step the trace so you can observe the travelling sound pattern.' },
    { id:'frequency', label:'Change frequency substantially and compare the number of cycles and pitch.' },
    { id:'amplitude', label:'Change amplitude substantially and compare wave height and loudness.' },
  ];

  return (
    <SimFrame
      title="Pitch and loudness"
      intro="Change frequency and amplitude independently to see which quantity controls pitch and which controls loudness."
      prediction={{
        question:'If frequency increases while amplitude stays the same, the sound becomes…',
        options:[
          { id:'higher', label:'higher in pitch' },
          { id:'louder', label:'louder only' },
          { id:'softer', label:'softer only' },
        ],
        answer:'higher',
      }}
      tasks={tasks}
      done={done}
      observation={`At ${frequency} Hz the pitch is classified as ${model.pitchLabel}. With amplitude ${fmt(amplitude, 2)}, the relative loudness is ${model.loudnessLabel}.`}
      explanation={<p><strong>Frequency determines pitch.</strong> A greater frequency gives a higher pitch. <strong>Amplitude is related to loudness.</strong> A greater amplitude represents a louder sound. These are independent properties.</p>}
      onComplete={() => onEvidence?.({ result:'completed', tasks:tasks.map(task => task.id) })}
    >
      <Playback clock={clock} stepSize={0.05} timeLabel={false}/>
      <div className="psim-controls">
        <SimSlider id="c2-pitch-frequency" label="Frequency" value={frequency} min={100} max={1200} step={20} unit=" Hz" dp={0} onChange={setFrequency}/>
        <SimSlider id="c2-pitch-amplitude" label="Amplitude" value={amplitude} min={0.1} max={1} step={0.05} dp={2} onChange={setAmplitude}/>
      </div>

      <svg className="psim-wave-stage psim-sound-stage" viewBox="0 0 720 250" role="img" aria-label="Animated sound waveform leaving a loudspeaker">
        <g className="psim-speaker">
          <rect x="34" y="78" width="54" height="92" rx="8"/>
          <polygon points="88,92 128,70 128,178 88,156"/>
          <line x1="128" y1="74" x2={128 + amplitude * 8} y2="74"/>
          <line x1="128" y1="174" x2={128 + amplitude * 8} y2="174"/>
        </g>
        <line className="psim-wave-axis" x1="138" y1="124" x2="694" y2="124"/>
        <path className="psim-wave-line" d={path}/>
        <text className="psim-wave-caption" x="416" y="226" textAnchor="middle">schematic trace: visual motion is slowed for readability</text>
      </svg>

      <Readouts items={[
        ['Pitch', model.pitchLabel, 'good'],
        ['Relative loudness', model.loudnessLabel],
        ['Frequency', `${frequency} Hz`],
      ]}/>
      <LiveText>Frequency {frequency} hertz gives {model.pitchLabel} pitch. Relative amplitude {fmt(amplitude, 2)} gives {model.loudnessLabel} loudness.</LiveText>
    </SimFrame>
  );
}
