import React from "react";
import { ArrowLeftIcon } from "./Icons";

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
  function handleKey(event, index) {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!direction && event.key !== "Home" && event.key !== "End") return;
    if (!tabs.length) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + direction + tabs.length) % tabs.length;
    onChange(tabs[next]);
    const buttons = event.currentTarget.parentElement?.querySelectorAll('[role="tab"]');
    buttons?.[next]?.focus();
  }
  return (
    <div className="itv2-ribbon-tabs" role="tablist" aria-label="Lab ribbon tabs" aria-orientation="horizontal">
      {tabs.map((tab, index) => (
        <button
          type="button"
          role="tab"
          aria-selected={active === tab}
          tabIndex={active === tab ? 0 : -1}
          className={active === tab ? "active" : ""}
          key={tab}
          onKeyDown={event => handleKey(event, index)}
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
        <button type="button" className="itv2-back" onClick={onBack} data-spark-action="nav"><ArrowLeftIcon/> <span>Practical Labs</span></button>
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
