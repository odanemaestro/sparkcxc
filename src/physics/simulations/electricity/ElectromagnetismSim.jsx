import React, { useMemo, useState } from 'react';
import { buildCurrentFieldModel } from '../../electricity/interactives/dElectricityInteractiveModels.mjs';
import { SimFrame, useTaskChecklist, useDerivedTasks, SimSlider, SimToggle, SimSwitch, Readouts, LiveText, Arrow, fmt } from '../core/SimKit.jsx';

const W = 600, H = 290;

// Compass needle pointing along the field at a given angle (degrees, SVG frame).
function Compass({ x, y, angle }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle className="psim-component" r={11} />
      <g transform={`rotate(${angle})`} style={{ transition: 'transform .4s ease' }}>
        <polygon className="psim-pole-n" points="0,-9 3,0 -3,0" />
        <polygon className="psim-pole-s" points="0,9 3,0 -3,0" />
      </g>
    </g>
  );
}

function StraightWire({ up, on, strength }) {
  // Wire seen end-on at the centre; concentric field circles; dot = current out of page, cross = into page.
  const cx = 150, cy = 130;
  const rings = [28, 52, 80, 112];
  // Right-hand grip: current out of page (dot) → anticlockwise field when viewed from above.
  const sense = up ? -1 : 1; // -1 anticlockwise in SVG coordinates
  return (
    <g>
      {on && rings.map((r, k) => {
        const opacity = Math.max(0.15, Math.min(1, strength * (1 - k * 0.2)));
        return <g key={r} opacity={opacity}><circle className="psim-field" cx={cx} cy={cy} r={r} />
          {[0, 90, 180, 270].map(a => { const rad = a * Math.PI / 180; const px = cx + r * Math.cos(rad), py = cy + r * Math.sin(rad); const tx = -Math.sin(rad) * sense, ty = Math.cos(rad) * sense; return <Arrow key={a} className="b" x1={px - tx * 6} y1={py - ty * 6} x2={px + tx * 6} y2={py + ty * 6} width={1.6} head={7} />; })}
        </g>;
      })}
      <circle className="psim-component" cx={cx} cy={cy} r={12} />
      {up ? <circle className="psim-solid" cx={cx} cy={cy} r={4} /> : <><line className="psim-stroke" x1={cx - 6} y1={cy - 6} x2={cx + 6} y2={cy + 6} /><line className="psim-stroke" x1={cx - 6} y1={cy + 6} x2={cx + 6} y2={cy - 6} /></>}
      <text className="psim-label muted" x={cx} y={cy + 124} textAnchor="middle">wire seen end-on · {up ? '⊙ current towards you' : '⊗ current away from you'}</text>
      {[{ x: cx + 66, y: cy, a: 0 }, { x: cx, y: cy - 66, a: 90 }, { x: cx - 66, y: cy, a: 180 }, { x: cx, y: cy + 66, a: 270 }].map((c, k) => {
        // needle north points along field; field direction is tangent (anticlockwise or clockwise)
        const tangent = up ? c.a + 90 : c.a - 90; // maths angle of tangent
        const svgAngle = on ? 90 - tangent : 0; // needle drawn pointing up at 0; SVG rotates clockwise
        return <Compass key={k} x={c.x} y={c.y} angle={svgAngle} />;
      })}
    </g>
  );
}

function Solenoid({ model, on, strength }) {
  const x0 = 340, x1 = 520, cy = 130, coils = Math.max(4, Math.round(model.turns / 20));
  const leftN = model.solenoidLeftPole === 'N';
  return (
    <g>
      {on && [0, 1, 2].map(k => { const ry = 22 + k * 22, rx = 110 + k * 30; return <ellipse key={k} className="psim-field" cx={(x0 + x1) / 2} cy={cy} rx={rx} ry={ry} opacity={Math.max(0.15, strength * (1 - k * 0.25))} />; })}
      {on && Array.from({ length: 5 }, (_, k) => { const y = cy - 12 + k * 6; return <Arrow key={k} className="b" x1={leftN ? x1 - 30 : x0 + 30} y1={y} x2={leftN ? x0 + 30 : x1 - 30} y2={y} width={1.4} head={6} />; })}
      <rect className="psim-fill-line" x={x0} y={cy - 20} width={x1 - x0} height={40} rx={6} />
      {Array.from({ length: coils }, (_, k) => { const x = x0 + 8 + k * ((x1 - x0 - 16) / (coils - 1)); return <ellipse key={k} className="psim-stroke" cx={x} cy={cy} rx={4} ry={22} style={{ strokeWidth: 1.6 }} />; })}
      <text className={`psim-label ${leftN ? 'psim-pole-n' : 'psim-pole-s'}`} x={x0 - 12} y={cy + 5} textAnchor="end" style={{ fill: leftN ? 'var(--pm-danger)' : 'var(--pm-blue)' }}>{on ? model.solenoidLeftPole : ''}</text>
      <text className="psim-label" x={x1 + 12} y={cy + 5} style={{ fill: leftN ? 'var(--pm-blue)' : 'var(--pm-danger)' }}>{on ? model.solenoidRightPole : ''}</text>
      <Compass x={x0 - 40} y={cy + 60} angle={on ? (leftN ? -90 : 90) : 0} />
      <Compass x={x1 + 40} y={cy + 60} angle={on ? (leftN ? -90 : 90) : 0} />
      <text className="psim-label muted" x={(x0 + x1) / 2} y={cy + 100} textAnchor="middle">solenoid · {model.turns} turns</text>
    </g>
  );
}

export default function ElectromagnetismSim({ onEvidence }) {
  const [direction, setDirection] = useState('up');
  const [turns, setTurns] = useState(120);
  const [current, setCurrent] = useState(2);
  const [on, setOn] = useState(false);
  const { done, mark, resetTasks } = useTaskChecklist();
  const model = useMemo(() => buildCurrentFieldModel({ currentDirection: direction, turns }), [direction, turns]);
  const strength = Math.min(1.3, model.relativeFieldStrength * current / 2);
  const [dirsSeen, setDirs] = useState(() => new Set(['up']));
  // Reversal only counts if the direction was changed while the current was
  // actually switched on, so the field and compasses were seen to flip.
  const [reversedLive, setReversedLive] = useState(false);
  const liveDirs = React.useRef(new Set());
  React.useEffect(() => {
    if (!on) return;
    liveDirs.current.add(direction);
    if (liveDirs.current.size >= 2) setReversedLive(true);
  }, [on, direction]);

  // Task marking happens in an effect, never during render.
  useDerivedTasks(mark, { on, reverse: reversedLive, turns: on && turns >= 200 });
  const changeDir = d => { setDirection(d); setDirs(s => new Set(s).add(d)); };
  const reset = () => { setDirection('up'); setTurns(120); setCurrent(2); setOn(false); setDirs(new Set(['up'])); liveDirs.current = new Set(); setReversedLive(false); resetTasks(); };

  return (
    <SimFrame title="Magnetic field of a current" intro="Switch the current on and watch the plotting compasses swing to follow the field around a straight wire and a solenoid. Reverse the current and change the number of turns." prediction={{ question: 'When the current in the wire is reversed, the compass needles around it will…', options: [{ id: 'flip', label: 'all reverse direction' }, { id: 'same', label: 'stay as they are' }, { id: 'north', label: 'all point to geographic north' }], answer: 'flip' }}
      tasks={[{ id: 'on', label: 'Switch the current on and observe the compass needles.' }, { id: 'reverse', label: 'Reverse the current direction with the current on.' }, { id: 'turns', label: 'Increase the solenoid to at least 200 turns and compare the field strength.' }]} done={done}
      onComplete={() => onEvidence?.({ objective: 'D7.1', score: 1, result: 'completed' })}
      observation={on ? `Field around the wire is ${model.fieldSense}. The solenoid's left end is a ${model.solenoidLeftPole} pole and its right end a ${model.solenoidRightPole} pole; relative field strength ${fmt(strength, 2)} (× the 120-turn, 2 A reference).` : 'No current: the compasses simply point to magnetic north and there is no field pattern from the wire.'}
      explanation={<><p>A current-carrying conductor produces a magnetic field. Around a straight wire the field lines are concentric circles; the right-hand grip rule gives the direction (thumb along conventional current, fingers curl in the field direction). Reversing the current reverses the field, so every compass swings round.</p><p>A solenoid produces a field like a bar magnet. Looking at one end, if the current flows anticlockwise that end is a North pole; clockwise, a South pole. The field is stronger with more turns, a larger current or a soft-iron core.</p></>}>
      <div className="psim-toolbar">
        <SimSwitch label={on ? 'Current on' : 'Current off'} checked={on} onChange={setOn} />
        <SimToggle label="Current direction" value={direction} onChange={changeDir} options={[{ value: 'up', label: 'Forward' }, { value: 'down', label: 'Reversed' }]} />
        <button type="button" className="psim-btn secondary" onClick={reset}>Reset</button>
      </div>
      <div className="psim-controls">
        <SimSlider id="em-i" label="Current" value={current} min={0.5} max={5} step={0.5} unit=" A" dp={1} onChange={setCurrent} />
        <SimSlider id="em-n" label="Solenoid turns" value={turns} min={40} max={400} step={20} unit=" turns" dp={0} onChange={setTurns} />
      </div>
      <div className="psim-stage-wrap">
        <svg className="psim-stage wide" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Magnetic field of a straight wire and a solenoid, current ${on ? 'on' : 'off'}`}>
          <StraightWire up={direction === 'up'} on={on} strength={strength} />
          <Solenoid model={model} on={on} strength={strength} />
        </svg>
      </div>
      <Readouts items={[['Field around wire', on ? model.fieldSense : 'none'], ['Solenoid poles', on ? `${model.solenoidLeftPole} — ${model.solenoidRightPole}` : '—'], ['Relative strength', `${fmt(strength, 2)}`, 'good'], ['Turns', `${model.turns}`]]} />
      <LiveText>{on ? `Current on, ${direction === 'up' ? 'forward' : 'reversed'}. Field ${model.fieldSense}. Solenoid left end ${model.solenoidLeftPole}, right end ${model.solenoidRightPole}.` : 'Current off.'}</LiveText>
    </SimFrame>
  );
}
