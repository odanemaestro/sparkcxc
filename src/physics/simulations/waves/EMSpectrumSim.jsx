import React, { useMemo, useState } from 'react';
import {
  SimFrame,
  Playback,
  Readouts,
  LiveText,
  fmt,
  useDerivedTasks,
  useTaskChecklist,
} from '../core/SimKit';
import { useSimulationClock } from '../core/useSimulationClock';
import { buildEMSpectrumModel } from '../../waves/interactives/cWavesInteractiveModels.mjs';

const SUP = {'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
const superscript = n => String(n).split('').map(ch => SUP[ch] || ch).join('');

function scientific(value, places = 1) {
  if (!Number.isFinite(value) || value === 0) return '0';
  const exp = Math.floor(Math.log10(Math.abs(value)));
  const coefficient = value / 10 ** exp;
  const shown = Number(coefficient.toFixed(places));
  return exp === 0 ? String(shown) : `${shown} × 10${superscript(exp)}`;
}

function formatLength(metres) {
  const v = Math.abs(metres);
  if (v >= 1) return `${fmt(metres, 2)} m`;
  if (v >= 1e-2) return `${fmt(metres * 100, 2)} cm`;
  if (v >= 1e-3) return `${fmt(metres * 1000, 2)} mm`;
  if (v >= 1e-6) return `${fmt(metres * 1e6, 2)} μm`;
  if (v >= 1e-9) return `${fmt(metres * 1e9, 2)} nm`;
  if (v >= 1e-12) return `${fmt(metres * 1e12, 2)} pm`;
  return `${scientific(metres, 1)} m`;
}

function formatFrequency(hz) {
  const v = Math.abs(hz);
  if (v < 1e3) return `${fmt(hz, 1)} Hz`;
  if (v < 1e6) return `${fmt(hz / 1e3, 2)} kHz`;
  if (v < 1e9) return `${fmt(hz / 1e6, 2)} MHz`;
  if (v < 1e12) return `${fmt(hz / 1e9, 2)} GHz`;
  if (v < 1e15) return `${fmt(hz / 1e12, 2)} THz`;
  return `${scientific(hz, 1)} Hz`;
}

function spectrumWave({ index, time }) {
  const left = 34;
  const right = 686;
  const mid = 92;
  const amp = 30;
  const cycles = 2 + index * 1.3;
  const samples = 160;
  return Array.from({ length:samples + 1 }, (_, n) => {
    const q = n / samples;
    const x = left + (right - left) * q;
    const y = mid - amp * Math.sin(2 * Math.PI * (cycles * q - time * 0.8));
    return `${n ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
}

export default function EMSpectrumSim({ onEvidence }) {
  const [index, setIndex] = useState(3);
  const [visited, setVisited] = useState(() => new Set([3]));
  const clock = useSimulationClock({ duration:4, loop:true });
  const { done, mark } = useTaskChecklist();
  const model = useMemo(() => buildEMSpectrumModel({ index }), [index]);
  const path = useMemo(() => spectrumWave({ index:model.index, time:clock.time }), [model.index, clock.time]);

  useDerivedTasks(mark, {
    animate: clock.time > 0.08,
    compare: visited.size >= 4,
    extremes: visited.has(0) && visited.has(6),
  });

  const choose = n => {
    setIndex(n);
    setVisited(previous => new Set(previous).add(n));
  };

  const tasks = [
    { id:'animate', label:'Play or step the schematic wave trace.' },
    { id:'compare', label:'Compare at least four regions of the electromagnetic spectrum.' },
    { id:'extremes', label:'Compare radio waves with gamma rays.' },
  ];

  return (
    <SimFrame
      title="Electromagnetic spectrum explorer"
      intro="Move across the electromagnetic spectrum and compare wavelength, frequency, source and use."
      prediction={{
        question:'Across the electromagnetic spectrum, as frequency increases, wavelength…',
        options:[
          { id:'increases', label:'increases' },
          { id:'decreases', label:'decreases' },
          { id:'same', label:'stays the same' },
        ],
        answer:'decreases',
      }}
      tasks={tasks}
      done={done}
      observation={`${model.region} has wavelength ${formatLength(model.wavelengthM)} and frequency ${formatFrequency(model.frequencyHz)}. Moving towards gamma increases frequency and decreases wavelength.`}
      explanation={<p>All electromagnetic waves travel at approximately <strong>3 × 10⁸ m/s in a vacuum</strong>. Since <strong>c = fλ</strong>, frequency and wavelength change inversely.</p>}
      onComplete={() => onEvidence?.({ result:'completed', tasks:tasks.map(task => task.id) })}
    >
      <Playback clock={clock} stepSize={0.05} timeLabel={false}/>
      <div className="psim-em-spectrum" role="group" aria-label="Electromagnetic spectrum regions">
        {model.order.map((region, n) => (
          <button key={region} type="button" className={n === model.index ? 'active' : ''} aria-pressed={n === model.index} onClick={() => choose(n)}>
            {region}
          </button>
        ))}
      </div>

      <svg className="psim-wave-stage psim-em-stage" viewBox="0 0 720 190" role="img" aria-label={`Schematic ${model.region} electromagnetic wave`}>
        <line className="psim-wave-axis" x1="34" y1="92" x2="686" y2="92"/>
        <path className="psim-em-wave" d={path}/>
        <text className="psim-wave-caption" x="360" y="168" textAnchor="middle">schematic only: frequency differences are compressed so every region remains visible</text>
      </svg>

      <Readouts items={[
        ['Region', model.region, 'good'],
        ['Wavelength', formatLength(model.wavelengthM)],
        ['Frequency', formatFrequency(model.frequencyHz)],
        ['Typical source', model.source],
        ['Typical use', model.use],
      ]}/>
      <div className="psim-equation">c = fλ = 3 × 10⁸ m/s</div>
      <p className="psim-stage-note">Equivalent in metres: {scientific(model.wavelengthM, 1)} m.</p>
      <LiveText>{model.region}. Wavelength {formatLength(model.wavelengthM)}. Frequency {formatFrequency(model.frequencyHz)}.</LiveText>
    </SimFrame>
  );
}
