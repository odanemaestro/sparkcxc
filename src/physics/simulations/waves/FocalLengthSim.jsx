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
import { buildFocalBenchModel } from '../../waves/interactives/cWavesInteractiveModels.mjs';

const TRUE_F = 15;
const W = 760;
const H = 300;
const LENS_X = 376;
const CY = 154;

export default function FocalLengthSim({ onEvidence }) {
  const [u, setU] = useState(40);
  const [v, setV] = useState(24);
  const [readings, setReadings] = useState([]);
  const clock = useSimulationClock({ duration:3.2, loop:true });
  const { done, mark } = useTaskChecklist();

  const model = useMemo(
    () => buildFocalBenchModel({ trueFocalLengthCm:TRUE_F, objectDistanceCm:u, screenDistanceCm:v }),
    [u, v]
  );

  useDerivedTasks(mark, {
    animate: clock.time > 0.08,
    focus: model.sharpness === 'sharp',
    repeat: readings.length >= 3,
  });

  const setObject = value => {
    setU(value);
    setV(Math.max(16, Math.min(60, Math.round((TRUE_F * value / (value - TRUE_F)) * 2) / 2 + 3)));
    clock.reset();
  };

  const record = () => {
    if (model.sharpness !== 'sharp') return;
    setReadings(previous => {
      if (previous.some(row => Math.abs(row.u - u) < .01)) return previous;
      return [...previous, {
        u,
        v,
        f:model.calculatedFocalLengthCm,
      }].slice(-5);
    });
  };

  const averageF = readings.length
    ? readings.reduce((sum,row) => sum + row.f, 0) / readings.length
    : null;

  const objectX = 72;
  const lensX = LENS_X;
  const screenX = 688;
  const focusError = model.focusErrorCm;
  const rayBlur = Math.min(26, focusError * 3.4);
  const fraction = Math.max(0, Math.min(1, clock.time / 3.2));
  const pulseX = objectX + (screenX - objectX) * fraction;
  const pulseY = fraction < .5
    ? 92 + (CY - 92) * (fraction * 2)
    : CY + (98 - CY) * ((fraction - .5) * 2);

  const tasks = [
    { id:'animate', label:'Play or step the light path along the optical bench.' },
    { id:'focus', label:'Adjust the screen until the image is sharply focused.' },
    { id:'repeat', label:'Record sharp-image readings for three different object positions.' },
  ];

  return (
    <SimFrame
      title="Determine focal length"
      intro="Use a converging lens, object and screen. Adjust the screen for a sharp real image, record u and v, then repeat and calculate f."
      prediction={{
        question:'Before recording object and image distances in this practical, the image on the screen should be…',
        options:[
          { id:'sharp', label:'sharply focused' },
          { id:'blurred', label:'as blurred as possible' },
          { id:'virtual', label:'virtual so it cannot reach the screen' },
        ],
        answer:'sharp',
      }}
      tasks={tasks}
      done={done}
      observation={model.sharpness === 'sharp'
        ? `Sharp image obtained. u = ${fmt(u,1)} cm and v = ${fmt(v,1)} cm give f = ${fmt(model.calculatedFocalLengthCm,2)} cm.`
        : `The screen is ${fmt(model.focusErrorCm,1)} cm from the sharp-image position. Move the screen until the image is sharp before recording.`}
      explanation={<p>For each sharp real image, measure object distance <strong>u</strong> and image distance <strong>v</strong> from the optical centre. Calculate <strong>1/f = 1/u + 1/v</strong> and repeat. Repeated readings reduce the effect of measurement error.</p>}
      onComplete={() => onEvidence?.({ result:'completed', readings:readings.length, averageFocalLengthCm:averageF })}
    >
      <Playback clock={clock} stepSize={0.05} timeLabel={false}/>
      <div className="psim-controls">
        <SimSlider id="c5-focal-u" label="Object distance u" value={u} min={25} max={70} step={1} unit=" cm" dp={0} onChange={setObject}/>
        <SimSlider id="c5-focal-v" label="Screen distance v" value={v} min={16} max={60} step={0.5} unit=" cm" dp={1} onChange={setV}/>
      </div>

      <svg className="psim-optical-bench" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Optical bench. Image is ${model.sharpness}. Object distance ${u} centimetres. Screen distance ${v} centimetres.`}>
        <line className="psim-bench-axis" x1="42" y1={CY} x2="720" y2={CY}/>
        <g className="psim-bench-object">
          <rect x={objectX-18} y={CY-62} width="36" height="62" rx="5"/>
          <path d={`M ${objectX} ${CY-48} v32 M ${objectX-8} ${CY-38} h16`}/>
        </g>
        <path className="psim-bench-lens" d={`M ${lensX} 62 C ${lensX-22} 92 ${lensX-22} 216 ${lensX} 246 C ${lensX+22} 216 ${lensX+22} 92 ${lensX} 62 Z`}/>
        <rect className="psim-bench-screen" x={screenX-10} y="66" width="20" height="176" rx="4"/>
        <line className="psim-bench-ray" x1={objectX} y1={CY-48} x2={lensX} y2={CY-48}/>
        <line className="psim-bench-ray" x1={lensX} y1={CY-48} x2={screenX} y2={CY + rayBlur}/>
        <line className="psim-bench-ray secondary" x1={objectX} y1={CY-48} x2={lensX} y2={CY}/>
        <line className="psim-bench-ray secondary" x1={lensX} y1={CY} x2={screenX} y2={CY - rayBlur}/>
        <circle className="psim-ray-pulse" cx={pulseX} cy={pulseY} r="8"/>
        <g className={`psim-screen-image ${model.sharpness.replace(' ','-')}`}>
          <line x1={screenX} y1={CY-36-rayBlur/2} x2={screenX} y2={CY+36+rayBlur/2}/>
          <line x1={screenX-7-rayBlur/4} y1={CY+28} x2={screenX+7+rayBlur/4} y2={CY+28}/>
        </g>
        <text className="psim-lens-label" x={objectX} y="274" textAnchor="middle">object</text>
        <text className="psim-lens-label" x={lensX} y="274" textAnchor="middle">lens</text>
        <text className="psim-lens-label" x={screenX} y="274" textAnchor="middle">screen</text>
      </svg>

      <div className="psim-focus-status" role="status">
        <strong>{model.sharpness === 'sharp' ? '✓ Sharp image' : model.sharpness === 'nearly sharp' ? 'Nearly sharp' : 'Blurred image'}</strong>
        <span>Ideal screen distance for this object position: {fmt(model.idealImageDistanceCm, 1)} cm</span>
      </div>

      <button type="button" className="psim-btn" disabled={model.sharpness !== 'sharp'} onClick={record}>
        Record sharp reading
      </button>

      <Readouts items={[
        ['u', `${fmt(u,1)} cm`],
        ['v', `${fmt(v,1)} cm`],
        ['Calculated f', `${fmt(model.calculatedFocalLengthCm,2)} cm`, model.sharpness === 'sharp' ? 'good' : ''],
        ['Magnification', fmt(model.magnification,2)],
        ['Recorded readings', String(readings.length)],
        ['Average f', averageF == null ? '—' : `${fmt(averageF,2)} cm`],
      ]}/>

      {readings.length > 0 && (
        <div className="psim-table-wrap">
          <table className="psim-data-table">
            <thead><tr><th>Reading</th><th>u / cm</th><th>v / cm</th><th>f / cm</th></tr></thead>
            <tbody>{readings.map((row,index) => <tr key={`${row.u}-${index}`}><td>{index+1}</td><td>{fmt(row.u,1)}</td><td>{fmt(row.v,1)}</td><td>{fmt(row.f,2)}</td></tr>)}</tbody>
          </table>
        </div>
      )}

      <div className="psim-equation">1/f = 1/u + 1/v</div>
      <LiveText>{model.sharpness} image. Screen focus error {fmt(focusError,1)} centimetres. {readings.length} readings recorded.</LiveText>
    </SimFrame>
  );
}
