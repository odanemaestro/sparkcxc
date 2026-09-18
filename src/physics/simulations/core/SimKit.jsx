import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const fmt = (n, dp = 2) => {
  if (!Number.isFinite(Number(n))) return '—';
  return Number(n).toFixed(dp).replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');
};

// ---------------------------------------------------------------------------
// Frame: title + Predict -> Experiment -> Observe -> Explain scaffold.
// `prediction`: {question, options:[{id,label}], answer:id}
// `tasks`: [{id,label}], `done`: Set of completed ids.
// `explanation` is only revealed once every task is complete.
// ---------------------------------------------------------------------------
export function SimFrame({ title, eyebrow = 'Virtual lab', intro, prediction, tasks = [], done, explanation, observation, children, onComplete }) {
  const [choice, setChoice] = useState(null);
  const allDone = tasks.length > 0 && tasks.every(t => done?.has(t.id));
  const [reported, setReported] = useState(false);
  useEffect(() => {
    if (allDone && !reported) { setReported(true); onComplete?.(); }
  }, [allDone, reported, onComplete]);
  const locked = Boolean(prediction) && choice == null;
  return (
    <section className="psim" aria-label={title}>
      <header className="psim-head">
        <div>
          <span className="psim-eyebrow">{eyebrow}</span>
          <h4>{title}</h4>
          {intro && <p>{intro}</p>}
        </div>
        {tasks.length > 0 && <span className={`psim-status ${allDone ? 'done' : ''}`} aria-live="polite">{allDone ? 'Task complete' : `${tasks.filter(t => done?.has(t.id)).length}/${tasks.length} steps`}</span>}
      </header>

      {prediction && (
        <div className="psim-step psim-predict">
          <strong>1 · Predict</strong>
          <p>{prediction.question}</p>
          <div className="psim-options" role="group" aria-label="Prediction options">
            {prediction.options.map(o => (
              <button key={o.id} type="button" aria-pressed={choice === o.id} className={`psim-option${choice === o.id ? ' selected' : ''}${allDone && choice != null ? (o.id === prediction.answer ? ' correct' : choice === o.id ? ' incorrect' : '') : ''}`} onClick={() => setChoice(o.id)}>{o.label}</button>
            ))}
          </div>
          {choice == null && <span className="psim-hint">Choose a prediction before experimenting.</span>}
        </div>
      )}

      <div className={`psim-step psim-experiment${locked ? ' locked' : ''}`} aria-disabled={locked || undefined}>
        <strong>{prediction ? '2 · Experiment' : 'Experiment'}</strong>
        <div className="psim-experiment-body" inert={locked ? true : undefined}>
          {children}
        </div>
      </div>

      {tasks.length > 0 && (
        <div className="psim-step psim-observe">
          <strong>{prediction ? '3 · Observe' : 'Observe'}</strong>
          <ul className="psim-tasks">
            {tasks.map(t => <li key={t.id} className={done?.has(t.id) ? 'done' : ''}><span aria-hidden="true">{done?.has(t.id) ? '✓' : '○'}</span>{t.label}{done?.has(t.id) && <em className="sr-only"> (done)</em>}</li>)}
          </ul>
          {observation && <p className="psim-observation" aria-live="polite">{observation}</p>}
        </div>
      )}

      {explanation && (
        <div className="psim-step psim-explain" aria-live="polite">
          <strong>{prediction ? '4 · Explain' : 'Explain'}</strong>
          {allDone ? (
            <div className="psim-explain-body">
              {prediction && choice != null && <p className={`psim-verdict ${choice === prediction.answer ? 'good' : 'warn'}`}>{choice === prediction.answer ? 'Your prediction matched the result.' : 'Your prediction did not match. Compare it with what you observed.'}</p>}
              {explanation}
            </div>
          ) : <p className="psim-hint">Complete the steps above to reveal the explanation.</p>}
        </div>
      )}
    </section>
  );
}

// Hook that manages the Set of completed task ids.
//
// `mark` MUST only be called from an event handler or an effect — never during
// render. Marking a task is a state update, and React does not allow a setter
// to run while a component is rendering. Tasks that depend on derived state
// (for example "the beam is balanced") are marked through `useDerivedTasks`,
// which runs after the render has committed.
export function useTaskChecklist() {
  const [done, setDone] = useState(() => new Set());
  const mark = useCallback(id => {
    setDone(prev => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);
  const resetTasks = useCallback(() => setDone(new Set()), []);
  return { done, mark, resetTasks };
}

// Marks tasks whose condition is satisfied by the state the user can currently
// see. Runs in an effect after commit, so no setter is called during render.
// `conditions` is a plain object: { taskId: boolean }.
export function useDerivedTasks(mark, conditions) {
  const ref = useRef(conditions);
  ref.current = conditions;
  const signature = Object.entries(conditions).map(([id, ok]) => `${id}:${ok ? 1 : 0}`).join('|');
  useEffect(() => {
    for (const [id, ok] of Object.entries(ref.current)) if (ok) mark(id);
  }, [signature, mark]);
}

// ---------------------------------------------------------------------------
// Controls
// ---------------------------------------------------------------------------
export function Playback({ clock, stepSize = 0.1, showSpeed = true, timeLabel = true }) {
  return (
    <div className="psim-toolbar" role="group" aria-label="Playback controls">
      <button type="button" className="psim-btn" onClick={clock.toggle} aria-pressed={clock.playing}>{clock.playing ? 'Pause' : 'Play'}</button>
      <button type="button" className="psim-btn secondary" onClick={() => clock.step(stepSize)}>Step</button>
      <button type="button" className="psim-btn secondary" onClick={clock.reset}>Reset</button>
      {showSpeed && (
        <div className="psim-speed" role="group" aria-label="Playback speed">
          {[0.25, 1].map(r => <button type="button" key={r} className={`psim-chip${clock.rate === r ? ' active' : ''}`} aria-pressed={clock.rate === r} onClick={() => clock.setRate(r)}>{r === 1 ? 'Normal' : 'Slow'}</button>)}
        </div>
      )}
      {timeLabel && <output className="psim-time" aria-live="off">t = {fmt(clock.time, 2)} s</output>}
      {clock.reducedMotion && <span className="psim-hint">Reduced motion: playing in steps.</span>}
    </div>
  );
}

export function SimSlider({ id, label, value, min, max, step = 1, onChange, unit = '', dp = 2, disabled }) {
  return (
    <label className="pm-control psim-slider" htmlFor={id}>
      <span><strong>{label}</strong><output>{typeof value === 'number' ? fmt(value, dp) : value}{unit}</output></span>
      <input id={id} type="range" min={min} max={max} step={step} value={value} disabled={disabled} onChange={e => onChange(Number(e.target.value))} aria-valuetext={`${fmt(value, dp)}${unit}`} />
    </label>
  );
}

export function SimToggle({ label, options, value, onChange }) {
  return (
    <div className="psim-toggle" role="group" aria-label={label}>
      {options.map(o => <button type="button" key={o.value} className={`psim-chip${value === o.value ? ' active' : ''}`} aria-pressed={value === o.value} onClick={() => onChange(o.value)}>{o.label}</button>)}
    </div>
  );
}

export function SimSwitch({ label, checked, onChange }) {
  return (
    <button type="button" role="switch" aria-checked={checked} className={`psim-switch${checked ? ' on' : ''}`} onClick={() => onChange(!checked)}>
      <i aria-hidden="true" /><span>{label}</span>
    </button>
  );
}

export function Readouts({ items }) {
  return (
    <dl className="psim-readouts">
      {items.map(([label, value, tone]) => <div key={label} className={`psim-readout ${tone || ''}`}><dt>{label}</dt><dd>{value}</dd></div>)}
    </dl>
  );
}

// Text equivalent of the current animated state, announced to screen readers.
export function LiveText({ children }) {
  return <p className="psim-live" aria-live="polite">{children}</p>;
}

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------
export function Arrow({ x1, y1, x2, y2, className = '', width = 3, head = 10, label, labelOffset = 12 }) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
  if (len < 0.5) return null;
  const ux = dx / len, uy = dy / len;
  const bx = x2 - ux * head, by = y2 - uy * head;
  const px = -uy * head * 0.5, py = ux * head * 0.5;
  const lx = (x1 + x2) / 2 - uy * labelOffset, ly = (y1 + y2) / 2 + ux * labelOffset;
  return (
    <g className={`psim-arrow ${className}`}>
      <line x1={x1} y1={y1} x2={bx} y2={by} strokeWidth={width} />
      <polygon points={`${x2},${y2} ${bx + px},${by + py} ${bx - px},${by - py}`} />
      {label && <text x={lx} y={ly} className="psim-label" textAnchor="middle" dominantBaseline="middle">{label}</text>}
    </g>
  );
}

// Responsive graph with a live marker. `children(sx, sy)` may draw extras.
export function SimGraph({ width = 560, height = 240, pad = { l: 58, r: 16, t: 18, b: 42 }, x, y, series = [], marker, xTicks = 4, yTicks = 4, label, children, className = '' }) {
  const sx = useMemo(() => v => pad.l + (v - x.min) / (x.max - x.min) * (width - pad.l - pad.r), [pad, x, width]);
  const sy = useMemo(() => v => height - pad.b - (v - y.min) / (y.max - y.min) * (height - pad.t - pad.b), [pad, y, height]);
  const ticks = (min, max, n) => Array.from({ length: n + 1 }, (_, i) => min + (max - min) * i / n);
  const zeroY = y.min < 0 && y.max > 0 ? sy(0) : sy(y.min);
  return (
    <svg className={`psim-graph ${className}`} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      {ticks(x.min, x.max, xTicks).map(t => <g key={`x${t}`}><line className="psim-gridline" x1={sx(t)} y1={pad.t} x2={sx(t)} y2={height - pad.b} /><text className="psim-tick" x={sx(t)} y={height - pad.b + 14} textAnchor="middle">{fmt(t, 1)}</text></g>)}
      {ticks(y.min, y.max, yTicks).map(t => <g key={`y${t}`}><line className="psim-gridline" x1={pad.l} y1={sy(t)} x2={width - pad.r} y2={sy(t)} /><text className="psim-tick" x={pad.l - 6} y={sy(t) + 3} textAnchor="end">{fmt(t, 1)}</text></g>)}
      <line className="psim-axis" x1={pad.l} y1={zeroY} x2={width - pad.r} y2={zeroY} />
      <line className="psim-axis" x1={pad.l} y1={pad.t} x2={pad.l} y2={height - pad.b} />
      <text className="psim-axis-label" x={width - pad.r} y={height - 6} textAnchor="end">{x.label}</text>
      <text className="psim-axis-label" x={pad.l + 4} y={pad.t - 6}>{y.label}</text>
      {series.map((s, i) => s.points.length > 1 && <polyline key={i} className={`psim-series ${s.className || ''}`} points={s.points.map(p => `${sx(p.x)},${sy(p.y)}`).join(' ')} />)}
      {children?.(sx, sy)}
      {marker && Number.isFinite(marker.x) && Number.isFinite(marker.y) && (
        <g className="psim-marker">
          <line x1={sx(marker.x)} y1={pad.t} x2={sx(marker.x)} y2={height - pad.b} />
          <circle cx={sx(marker.x)} cy={sy(Math.max(y.min, Math.min(y.max, marker.y)))} r="6" />
          {marker.label && <text className="psim-label" x={sx(marker.x) + 8} y={sy(Math.max(y.min, Math.min(y.max, marker.y))) - 8}>{marker.label}</text>}
        </g>
      )}
    </svg>
  );
}
