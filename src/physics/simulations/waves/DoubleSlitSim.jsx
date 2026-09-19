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
import { buildDoubleSlitModel } from '../../waves/interactives/cWavesInteractiveModels.mjs';

function wavelengthColour(nm) {
  const t = Math.max(0, Math.min(1, (nm - 400) / 300));
  return `hsl(${Math.round(270 - 270 * t)} 88% 58%)`;
}

export default function DoubleSlitSim({ onEvidence }) {
  const [wavelength, setWavelength] = useState(600);
  const [spacing, setSpacing] = useState(0.3);
  const [distance, setDistance] = useState(2);
  const clock = useSimulationClock({ duration:4, loop:true });
  const { done, mark } = useTaskChecklist();

  const model = useMemo(
    () => buildDoubleSlitModel({ wavelengthNm:wavelength, slitSpacingMm:spacing, screenDistanceM:distance }),
    [wavelength, spacing, distance]
  );

  useDerivedTasks(mark, {
    animate: clock.time > 0.08,
    wavelength: Math.abs(wavelength - 600) >= 100,
    spacing: Math.abs(spacing - 0.3) >= 0.1,
    distance: Math.abs(distance - 2) >= 0.5,
  });

  const tasks = [
    { id:'animate', label:'Play or step the wavefronts through the two slits.' },
    { id:'wavelength', label:'Change wavelength by at least 100 nm and compare fringe spacing.' },
    { id:'spacing', label:'Change slit separation by at least 0.10 mm and compare the pattern.' },
    { id:'distance', label:'Change screen distance by at least 0.5 m and compare the pattern.' },
  ];

  const colour = wavelengthColour(wavelength);
  const fringeMm = model.fringeSpacingM * 1000;
  const visualSpacing = Math.max(10, Math.min(62, fringeMm * 9));
  const phase = (clock.time % 1) * 42;
  const rings = Array.from({ length:8 }, (_, n) => 16 + n * 30 + phase);
  const bands = Array.from({ length:21 }, (_, n) => n - 10);

  return (
    <SimFrame
      title="Young's double-slit interference"
      intro="Animate coherent wavefronts through two narrow slits and observe how wavelength, slit separation and screen distance control the fringe spacing."
      prediction={{
        question:'If wavelength is increased while slit separation and screen distance stay the same, the bright fringes become…',
        options:[
          { id:'farther', label:'farther apart' },
          { id:'closer', label:'closer together' },
          { id:'same', label:'the same distance apart' },
        ],
        answer:'farther',
      }}
      tasks={tasks}
      done={done}
      observation={`Fringe spacing = ${fmt(fringeMm, 2)} mm. Increasing wavelength or screen distance increases the spacing. Increasing slit separation decreases it.`}
      explanation={<p>For small angles, the fringe spacing is <strong>x = λD/a</strong>. Bright fringes occur where waves arrive in phase and interfere constructively. Dark fringes occur where they arrive out of phase and interfere destructively.</p>}
      onComplete={() => onEvidence?.({ result:'completed', tasks:tasks.map(task => task.id) })}
    >
      <Playback clock={clock} stepSize={0.05} timeLabel={false}/>
      <div className="psim-controls">
        <SimSlider id="c4-double-wavelength" label="Wavelength" value={wavelength} min={400} max={700} step={10} unit=" nm" dp={0} onChange={setWavelength}/>
        <SimSlider id="c4-double-spacing" label="Slit separation" value={spacing} min={0.15} max={0.6} step={0.05} unit=" mm" dp={2} onChange={setSpacing}/>
        <SimSlider id="c4-double-distance" label="Screen distance" value={distance} min={1} max={3.5} step={0.25} unit=" m" dp={2} onChange={setDistance}/>
      </div>

      <div className="psim-double-slit-layout">
        <svg className="psim-double-slit-stage" viewBox="0 0 520 300" role="img" aria-label="Animated wavefronts from two coherent slits">
          <line className="psim-slit-barrier" x1="195" y1="28" x2="195" y2="118"/>
          <line className="psim-slit-barrier" x1="195" y1="139" x2="195" y2="161"/>
          <line className="psim-slit-barrier" x1="195" y1="182" x2="195" y2="272"/>
          <circle className="psim-source-dot" cx="80" cy="150" r="8"/>
          {rings.slice(0,5).map((r, n) => <circle key={`source-${n}`} className="psim-wavefront" cx="80" cy="150" r={r}/>)}
          {rings.map((r, n) => <circle key={`top-${n}`} className="psim-wavefront secondary" cx="195" cy="128" r={r}/>)}
          {rings.map((r, n) => <circle key={`bottom-${n}`} className="psim-wavefront secondary" cx="195" cy="172" r={r}/>)}
          <line className="psim-screen-line" x1="476" y1="24" x2="476" y2="276"/>
          <text className="psim-optics-label" x="80" y="286" textAnchor="middle">coherent source</text>
          <text className="psim-optics-label" x="195" y="286" textAnchor="middle">double slit</text>
          <text className="psim-optics-label" x="476" y="286" textAnchor="middle">screen</text>
        </svg>

        <div className="waves-fringe-screen psim-fringe-screen" aria-label="Interference fringe screen">
          {bands.map(n => (
            <i
              key={n}
              style={{
                left:`calc(50% + ${n * visualSpacing}px)`,
                '--fringe-colour':colour,
                opacity:Math.max(0.18, 1 - Math.abs(n) * 0.055),
              }}
            />
          ))}
        </div>
      </div>

      <Readouts items={[
        ['Fringe spacing', `${fmt(fringeMm, 2)} mm`, 'good'],
        ['Wavelength', `${wavelength} nm`],
        ['Slit separation', `${fmt(spacing, 2)} mm`],
        ['Screen distance', `${fmt(distance, 2)} m`],
      ]}/>
      <div className="psim-equation">x = λD/a = {fmt(fringeMm, 2)} mm</div>
      <LiveText>Fringe spacing {fmt(fringeMm, 2)} millimetres for wavelength {wavelength} nanometres, slit separation {fmt(spacing,2)} millimetres and screen distance {fmt(distance,2)} metres.</LiveText>
    </SimFrame>
  );
}
