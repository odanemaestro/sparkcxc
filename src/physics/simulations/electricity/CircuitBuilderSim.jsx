import React, { useMemo, useState } from 'react';
import { buildTwoLampCircuitModel } from '../../electricity/interactives/dElectricityInteractiveModels.mjs';
import { SimFrame, useTaskChecklist, useDerivedTasks, SimSlider, SimToggle, SimSwitch, Readouts, LiveText, fmt } from '../core/SimKit.jsx';
import { useSimulationClock } from '../core/useSimulationClock.js';
import { observedInAll } from '../core/taskGate.js';

const W = 560, H = 250;

function Lamp({ x, y, power, label, broken }) {
  const glow = broken ? 0 : Math.min(1, power / 6);
  return (
    <g transform={`translate(${x} ${y})`}>
      {glow > 0.02 && <circle className="psim-lamp-glow" r={16 + glow * 18} opacity={glow * 0.45} />}
      <circle className="psim-component" r={14} style={glow > 0.02 ? { fill: 'var(--pm-accent-soft)' } : undefined} />
      <line className="psim-stroke" x1={-9} y1={-9} x2={9} y2={9} /><line className="psim-stroke" x1={-9} y1={9} x2={9} y2={-9} />
      {broken && <line className="psim-dash" x1={-20} y1={0} x2={20} y2={0} style={{ stroke: 'var(--pm-danger)', strokeWidth: 3 }} />}
      <text className="psim-tick" y={30} textAnchor="middle">{label}</text>
    </g>
  );
}

function Dots({ path, count, speed, phase, reverse }) {
  // path: array of points forming a polyline; distribute dots along it
  const segs = []; let total = 0;
  for (let k = 0; k < path.length - 1; k++) { const l = Math.hypot(path[k + 1].x - path[k].x, path[k + 1].y - path[k].y); segs.push({ a: path[k], b: path[k + 1], l }); total += l; }
  if (total === 0 || speed <= 0) return null;
  const at = f => { let d = ((f % 1) + 1) % 1 * total; for (const s of segs) { if (d <= s.l) { const t = d / s.l; return { x: s.a.x + (s.b.x - s.a.x) * t, y: s.a.y + (s.b.y - s.a.y) * t }; } d -= s.l; } return segs[segs.length - 1].b; };
  return <g>{Array.from({ length: count }, (_, k) => { const p = at((reverse ? -1 : 1) * (k / count + phase)); return <circle key={k} className="psim-electron" cx={p.x} cy={p.y} r={3.5} />; })}</g>;
}

export default function CircuitBuilderSim({ onEvidence }) {
  const [emf, setEmf] = useState(6);
  const [r1, setR1] = useState(6);
  const [r2, setR2] = useState(3);
  const [mode, setMode] = useState('series');
  const [closed, setClosed] = useState(false);
  const [broken, setBroken] = useState(false); // lamp 2 removed
  const clock = useSimulationClock({ loop: true, duration: 1e9 });
  const { done, mark, resetTasks } = useTaskChecklist();
  // All circuit arithmetic comes from the existing electricity model layer.
  const c = useMemo(() => {
    const m = buildTwoLampCircuitModel({ emfV: emf, r1, r2, mode, switchClosed: closed, removedLamp: broken });
    return { totalOhm: m.totalResistanceOhm, totalA: m.totalCurrentA, i1: m.lamp1.currentA, i2: m.lamp2.currentA, v1: m.lamp1.voltageV, v2: m.lamp2.voltageV, p1: m.lamp1.powerW, p2: m.lamp2.powerW, openCircuit: m.openCircuit };
  }, [emf, r1, r2, mode, closed, broken]);

  React.useEffect(() => { if (closed && !clock.playing) clock.play(); if (!closed && clock.playing) clock.pause(); }, [closed]); // eslint-disable-line react-hooks/exhaustive-deps
  // Removing lamp 2 must be observed with the switch closed in BOTH
  // arrangements: the series break and the surviving parallel branch.
  const [removalSeen, setRemovalSeen] = useState(() => new Set());
  React.useEffect(() => { if (broken && closed) setRemovalSeen(s => (s.has(mode) ? s : new Set(s).add(mode))); }, [broken, closed, mode]);
  // Each arrangement must also have been run with current flowing.
  const [ranModes, setRanModes] = useState(() => new Set());
  React.useEffect(() => { if (closed && !broken) setRanModes(s => (s.has(mode) ? s : new Set(s).add(mode))); }, [closed, broken, mode]);
  // Task marking happens in an effect, never during render.
  useDerivedTasks(mark, {
    close: closed,
    both: observedInAll(ranModes, ['series', 'parallel']),
    remove: observedInAll(removalSeen, ['series', 'parallel']),
  });

  const changeMode = m => setMode(m);
  const reset = () => { setEmf(6); setR1(6); setR2(3); setMode('series'); setClosed(false); setBroken(false); setRemovalSeen(new Set()); setRanModes(new Set()); resetTasks(); };
  const phase = clock.time * 0.06;

  // Geometry
  const left = 60, right = 500, top = 50, bottom = 200, midY = 125;
  const main = mode === 'series'
    ? [{ x: left, y: bottom }, { x: left, y: top }, { x: right, y: top }, { x: right, y: bottom }, { x: left, y: bottom }]
    : [{ x: left, y: bottom }, { x: left, y: top }, { x: 200, y: top }];
  const branch1 = [{ x: 200, y: top }, { x: 200, y: 90 }, { x: 360, y: 90 }, { x: 360, y: top }];
  const branch2 = [{ x: 200, y: top }, { x: 200, y: 160 }, { x: 360, y: 160 }, { x: 360, y: top }];
  const tail = [{ x: 360, y: top }, { x: right, y: top }, { x: right, y: bottom }, { x: left, y: bottom }];
  const pts = a => a.map(p => `${p.x},${p.y}`).join(' ');
  const wireCls = `psim-wire${closed && c.totalA > 0 ? '' : ' off'}`;

  return (
    <SimFrame title="Series and parallel lamp circuit" intro="Two lamps run from the same battery. Swap between series and parallel, close the switch, and compare the ammeter readings and lamp brightness. Try removing one lamp." prediction={{ question: 'Two identical lamps are connected in parallel to a battery. Compared with the same lamps in series, each lamp will be…', options: [{ id: 'brighter', label: 'brighter' }, { id: 'dimmer', label: 'dimmer' }, { id: 'same', label: 'the same brightness' }], answer: 'brighter' }}
      tasks={[{ id: 'close', label: 'Close the switch.' }, { id: 'both', label: 'Run the lamps with the switch closed in both series and parallel.' }, { id: 'remove', label: 'With the switch closed, remove lamp 2 in BOTH arrangements and watch lamp 1 each time.' }]} done={done}
      onComplete={() => onEvidence?.({ objective: 'D4.11', score: 1, result: 'completed' })}
      observation={!closed
        ? 'Switch open: there is no complete circuit, so the current is 0 A.'
        : c.openCircuit
          ? 'Lamp 2 has been removed from the series circuit. The only path is broken, so both lamps are off and the current is 0 A.'
          : mode === 'series'
            ? `Series: the same current ${fmt(c.totalA, 2)} A passes through both lamps and the p.d.s add up (${fmt(c.v1, 2)} V + ${fmt(c.v2, 2)} V = ${emf} V).`
            : broken
              ? `Parallel with lamp 2 removed: lamp 1 remains directly across the ${emf} V supply and carries ${fmt(c.i1, 2)} A.`
              : `Parallel: each lamp has the full ${emf} V across it; the branch currents ${fmt(c.i1, 2)} A + ${fmt(c.i2, 2)} A add to ${fmt(c.totalA, 2)} A from the battery.`}
      explanation={<><p>In series there is one path: the current is the same everywhere, the p.d.s across the components add up to the e.m.f., and the total resistance is R = R₁ + R₂. Removing one lamp breaks the only path so both go out.</p><p>In parallel each lamp is connected directly across the battery, so each gets the full p.d. and the currents in the branches add, I = I₁ + I₂. The combined resistance 1/R = 1/R₁ + 1/R₂ is smaller than either lamp alone, so the battery supplies more current. Removing one lamp leaves the other lit, which is why house wiring is parallel.</p></>}>
      <div className="psim-toolbar">
        <SimToggle label="Arrangement" value={mode} onChange={changeMode} options={[{ value: 'series', label: 'Series' }, { value: 'parallel', label: 'Parallel' }]} />
        <SimSwitch label={closed ? 'Switch closed' : 'Switch open'} checked={closed} onChange={setClosed} />
        <SimSwitch label="Lamp 2 removed" checked={broken} onChange={setBroken} />
        <button type="button" className="psim-btn secondary" onClick={reset}>Reset</button>
      </div>
      <div className="psim-controls">
        <SimSlider id="cb-emf" label="Battery e.m.f." value={emf} min={1.5} max={12} step={1.5} unit=" V" dp={1} onChange={setEmf} />
        <SimSlider id="cb-r1" label="Lamp 1 resistance" value={r1} min={1} max={20} step={1} unit=" Ω" dp={0} onChange={setR1} />
        <SimSlider id="cb-r2" label="Lamp 2 resistance" value={r2} min={1} max={20} step={1} unit=" Ω" dp={0} onChange={setR2} />
      </div>
      <svg className="psim-stage" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Two lamps in ${mode}, switch ${closed ? 'closed' : 'open'}`}>
        <polyline className={wireCls} points={pts(main)} />
        {mode === 'parallel' && <><polyline className={`psim-wire${closed && c.i1 > 0 ? '' : ' off'}`} points={pts(branch1)} /><polyline className={`psim-wire${closed && c.i2 > 0 ? '' : ' off'}`} points={pts(branch2)} /><polyline className={wireCls} points={pts(tail)} /></>}
        {/* battery on left */}
        <rect className="psim-fill-card" x={left - 12} y={midY - 22} width={24} height={44} />
        <line className="psim-stroke" x1={left - 14} y1={midY - 14} x2={left + 14} y2={midY - 14} strokeWidth={3} /><line className="psim-stroke" x1={left - 7} y1={midY - 4} x2={left + 7} y2={midY - 4} />
        <line className="psim-stroke" x1={left - 14} y1={midY + 6} x2={left + 14} y2={midY + 6} strokeWidth={3} /><line className="psim-stroke" x1={left - 7} y1={midY + 16} x2={left + 7} y2={midY + 16} />
        <text className="psim-label" x={left - 20} y={midY + 4} textAnchor="end">{emf} V</text>
        {/* switch at bottom */}
        <g><rect className="psim-fill-card" x={250} y={bottom - 14} width={60} height={28} /><circle className="psim-solid" cx={252} cy={bottom} r={3} /><circle className="psim-solid" cx={308} cy={bottom} r={3} /><line className="psim-wire" x1={252} y1={bottom} x2={closed ? 308 : 300} y2={closed ? bottom : bottom - 22} /></g>
        {/* main ammeter on right */}
        <g className="psim-meter"><rect className="psim-fill-card" x={right - 18} y={midY - 20} width={36} height={40} /><circle className="psim-component" cx={right} cy={midY} r={16} /><text x={right} y={midY + 4} textAnchor="middle">A</text><text x={right + 22} y={midY + 4}>{fmt(c.totalA, 2)} A</text></g>
        {mode === 'series' ? <>
          <rect className="psim-fill-card" x={170} y={top - 20} width={220} height={40} />
          <Lamp x={200} y={top} power={c.p1} label={`L1 ${fmt(c.v1, 1)} V`} />
          <Lamp x={360} y={top} power={c.p2} label={`L2 ${fmt(c.v2, 1)} V`} broken={broken} />
          <line className={wireCls} x1={214} y1={top} x2={346} y2={top} />
          {closed && c.totalA > 0 && <Dots path={main} count={22} speed={c.totalA} phase={phase * c.totalA} reverse />}
        </> : <>
          <rect className="psim-fill-card" x={264} y={90 - 16} width={32} height={32} /><rect className="psim-fill-card" x={264} y={160 - 16} width={32} height={32} />
          <Lamp x={280} y={90} power={c.p1} label={`L1 ${fmt(c.i1, 2)} A`} />
          <Lamp x={280} y={160} power={c.p2} label={`L2 ${fmt(c.i2, 2)} A`} broken={broken} />
          {closed && c.totalA > 0 && <Dots path={[...main, ...tail]} count={18} speed={c.totalA} phase={phase * c.totalA} reverse />}
          {closed && c.i1 > 0 && <Dots path={branch1} count={8} speed={c.i1} phase={phase * c.i1} reverse />}
          {closed && c.i2 > 0 && <Dots path={branch2} count={8} speed={c.i2} phase={phase * c.i2} reverse />}
        </>}
      </svg>
      <p className="psim-stage-note">Lamp glow represents relative power, P = I²R. Blue dots show electron flow when the circuit is complete.</p>
      <Readouts items={[['Combined resistance', c.openCircuit ? 'open circuit' : `${fmt(c.totalOhm, 2)} Ω`], ['Battery current', `${fmt(c.totalA, 2)} A`, 'good'], ['Lamp 1', `${fmt(c.i1, 2)} A · ${fmt(c.v1, 1)} V · ${fmt(c.p1, 1)} W`], ['Lamp 2', broken ? 'removed' : `${fmt(c.i2, 2)} A · ${fmt(c.v2, 1)} V · ${fmt(c.p2, 1)} W`]]} />
      <div className="psim-equation">
        {!closed
          ? 'Switch open → I = 0 A because the circuit is incomplete.'
          : c.openCircuit
            ? 'Lamp 2 removed in series → open circuit → I = 0 A.'
            : broken && mode === 'parallel'
              ? `Lamp 2 removed: R = R₁ = ${r1} Ω → I = V/R₁ = ${emf}/${r1} = ${fmt(c.totalA, 2)} A.`
              : mode === 'series'
                ? `R = R₁ + R₂ = ${r1} + ${r2} = ${fmt(c.totalOhm, 2)} Ω → I = ${emf}/${fmt(c.totalOhm, 2)} = ${fmt(c.totalA, 2)} A.`
                : `1/R = 1/${r1} + 1/${r2} → R = ${fmt(c.totalOhm, 2)} Ω → I = ${emf}/${fmt(c.totalOhm, 2)} = ${fmt(c.totalA, 2)} A.`}
      </div>
      <LiveText>{closed ? `Battery supplies ${fmt(c.totalA, 2)} amperes in ${mode}. Lamp 1 ${c.p1 > 0.05 ? 'lit' : 'off'}, lamp 2 ${broken ? 'removed' : c.p2 > 0.05 ? 'lit' : 'off'}.` : 'Switch open; both lamps off.'}</LiveText>
    </SimFrame>
  );
}
