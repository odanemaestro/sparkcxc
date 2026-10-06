import React from "react";
import Icon from "../ui/Icon";

export default function StudentNextStepCard({
  greeting,
  photo = null,
  streak = 0,
  step,
  busy = false,
  onPrimary,
  secondaryActions = [],
  glance = [],
}) {
  const streakDays = Math.max(0, Number(streak) || 0);

  return (
    <section className="ssh-card ssh-hero" aria-labelledby="ssh-hero-greeting">
      <div className="ssh-hero-top">
        {photo && <div className="ssh-hero-photo">{photo}</div>}
        <div className="ssh-hero-hello">
          <h1 id="ssh-hero-greeting" className="ssh-hero-greeting">{greeting}</h1>
          <p className={"ssh-streak" + (streakDays > 0 ? " is-active" : "")}>
            <Icon name="flame" size={16} />
            <span>{streakDays > 0 ? streakDays + "-day study streak" : "Study today to start a streak"}</span>
          </p>
        </div>
      </div>

      {step && (
        <div className="ssh-next">
          <p className="ssh-next-label">
            <span>{step.label}</span>
            {step.meta && <span className="ssh-next-meta"><Icon name="clock" size={14} />{step.meta}</span>}
          </p>
          <h2 className="ssh-next-title">{step.title}</h2>
          {step.detail && <p className="ssh-next-detail">{step.detail}</p>}
          <div className="ssh-next-actions">
            {onPrimary && (
              <button type="button" className="ssh-btn ssh-btn--primary" onClick={onPrimary} disabled={busy} aria-busy={busy || undefined}>
                <Icon name={step.kind === "choose" ? "subjects" : "play"} size={16} />
                <span>{busy ? "Opening…" : step.actionLabel}</span>
              </button>
            )}
            {secondaryActions.map(action => (
              <button key={action.key} type="button" className="ssh-btn ssh-btn--quiet" onClick={action.onClick}>
                {action.icon && <Icon name={action.icon} size={16} />}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {glance.length > 0 && (
        <ul className="ssh-glance" aria-label="At a glance">
          {glance.map(item => {
            const content = (
              <>
                <span className="ssh-glance-label">
                  <span className="ssh-glance-icon" aria-hidden="true"><Icon name={item.icon} size={14} /></span>
                  {item.label}
                </span>
                <span className="ssh-glance-value">{item.value}</span>
                {item.detail && <span className="ssh-glance-detail">{item.detail}</span>}
              </>
            );
            return (
              <li key={item.key} className={"ssh-glance-item is-" + (item.tone || "neutral")}>
                {item.onClick
                  ? <button type="button" className="ssh-glance-button" onClick={item.onClick}>{content}</button>
                  : <div className="ssh-glance-static">{content}</div>}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
