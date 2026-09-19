import React from "react";

export function TaskList({ tasks }) {
  const done = tasks.filter(task => task.done).length;
  const percent = tasks.length ? Math.round(done / tasks.length * 100) : 0;
  return (
    <>
      <div className="itv2-task-summary">
        <div><strong>{done}/{tasks.length}</strong><span>skills demonstrated</span></div>
        <div className="itv2-progress"><i style={{ width: `${percent}%` }}/></div>
        <b>{percent}%</b>
      </div>
      <div className="itv2-task-list">
        {tasks.map(task => (
          <div className={task.done ? "done" : ""} key={task.id}>
            <span aria-hidden="true">{task.done ? "✓" : "○"}</span>
            <p><strong>{task.label}</strong>{task.help && <small>{task.help}</small>}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export function RibbonTabs({ tabs, active, onChange }) {
  return (
    <div className="itv2-ribbon-tabs" role="tablist" aria-label="Lab ribbon tabs">
      {tabs.map(tab => (
        <button
          type="button"
          role="tab"
          aria-selected={active === tab}
          className={active === tab ? "active" : ""}
          key={tab}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function LabFrame({
  lab,
  tasks,
  completed,
  onBack,
  onComplete,
  children,
  footer,
}) {
  const ready = tasks.length > 0 && tasks.every(task => task.done);
  return (
    <main className="itv2-lab-page">
      <div className="itv2-lab-page-inner">
        <button type="button" className="itv2-back" data-spark-action="nav" onClick={onBack}>← Practical Labs</button>
        <header className="itv2-lab-hero">
          <div>
            <div className="itv2-kicker">CSEC INFORMATION TECHNOLOGY · PRACTICAL</div>
            <h1>{lab.title}</h1>
            <p>{lab.description}</p>
          </div>
          <div className="itv2-app-chip"><span>{lab.mark}</span><strong>{lab.app}</strong></div>
        </header>

        <div className="itv2-lab-layout">
          <aside className="itv2-mission">
            <div className="itv2-kicker">SKILL CHECK</div>
            <h2>Complete the task</h2>
            <TaskList tasks={tasks}/>
            <button
              type="button"
              className="itv2-complete"
              disabled={!ready || completed}
              onClick={onComplete}
            >
              {completed ? "✓ Lab completed" : "Complete lab"}
            </button>
            {!ready && <small className="itv2-complete-note">Demonstrate every required skill before completing the lab.</small>}
          </aside>

          <section className="itv2-workspace-wrap">
            {children}
            {footer && <div className="itv2-workspace-footer">{footer}</div>}
          </section>
        </div>
      </div>
    </main>
  );
}

export function WindowBar({ title, subtitle, status = "Saved" }) {
  return (
    <div className="itv2-window-bar">
      <div>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
      <div className="itv2-window-status"><i/> {status}</div>
    </div>
  );
}
