import React from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import Icon from "../ui/Icon";
import InsightText from "./InsightText";
import StudentGoalCard from "./StudentGoalCard";
import { getDueFlashcards } from "../../learning/flashcards";

function DashboardCardAction({ label, onClick }) {
  return (
    <button type="button" className="spark-dashboard-card-action" onClick={onClick}>
      <span>{label}</span><span className="spark-dashboard-card-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M6 14L14 6M8 6h6v6" /></svg></span>
    </button>
  );
}

function formatUpcoming(booking) {
  if (!booking?.session_date) return "No upcoming tutor session";
  const date = new Date(`${booking.session_date}T${String(booking.start_time || "12:00").slice(0,5)}`);
  return Number.isNaN(date.getTime()) ? booking.session_date : date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

export default function StudentOverviewIntelligence({
  userId,
  supabase,
  summary,
  learnerModel,
  milestones = [],
  flashcardProgress = [],
  showToast,
  setView,
  setDashboardSection,
  onOpenReport,
  onGoalChange,
}) {
  const due = getDueFlashcards(flashcardProgress, "all").length;
  const modelPriorities = learnerModel?.hasEvidence ? learnerModel.prioritySkills || [] : [];
  const weakest = modelPriorities.length
    ? modelPriorities.map(item => ({ skill: item.skill, score: item.mastery, learnerState: item }))
    : summary?.weakestSkills || [];
  const focus = modelPriorities[0] || null;
  const recentAchievements = (milestones || []).slice(0, 3);

  return (
    <div className="spark-intelligence-stack">
      <Card className="spark-insight-card">
        <div className="spark-insight-icon"><Icon name="insight" size={22}/></div>
        <div><span className="section-kicker">SPARK INSIGHT</span><p><InsightText text={summary?.insight}/></p></div>
        {summary?.trendDelta !== 0 && <span className={`spark-trend-chip ${summary.trendDelta > 0 ? "up" : "down"}`}>{summary.trendDelta > 0 ? "+" : ""}{summary.trendDelta}% recent trend</span>}
      </Card>

      <div className="spark-overview-two-col">
        <Card className="spark-focus-card">
          <div className="spark-card-heading-row"><div className="spark-card-title-with-icon"><span className="spark-feature-icon compact"><Icon name="focus" size={19}/></span><div><span className="section-kicker">TODAY'S FOCUS</span><h3>{focus?.skill || weakest[0]?.skill || "Build your baseline"}</h3></div></div></div>
          {focus ? (
            <>
              <p>{focus.recommendation}</p>
              <div className="spark-learner-signal-row" aria-label="Learner model signals">
                <span><strong>{focus.mastery}%</strong> mastery</span>
                <span><strong>{focus.confidenceLabel}</strong> confidence</span>
                <span className={`trend ${focus.trendLabel === "Improving" ? "up" : focus.trendLabel === "Needs attention" ? "down" : ""}`}><strong>{focus.trendLabel}</strong> trend</span>
              </div>
              {focus.commonError && <div className="spark-learner-common-error"><strong>Recurring issue:</strong> {focus.commonError.label}</div>}
            </>
          ) : (
            <p>{weakest[0] ? `Current mastery: ${Math.round(Number(weakest[0].score || 0))}%. Review the lesson, then use targeted practice to strengthen this area.` : "Complete a lesson or practice paper so SPARK can recommend your highest-value next step."}</p>
          )}
          <div className="spark-inline-actions"><Btn onClick={() => setView("lesson")}>Study now</Btn><Btn v="outline" onClick={() => setView("practice")}>Practice</Btn></div>
        </Card>

        <Card className="spark-flashcard-overview-card">
          <div className="spark-card-title-with-icon"><span className="spark-feature-icon compact"><Icon name="flashcards" size={19}/></span><div><span className="section-kicker">FLASHCARDS</span><h3>{due} due today</h3></div></div>
          <p>Use spaced review for formulas, definitions, common errors and quick CSEC Mathematics recall.</p>
          <DashboardCardAction label="Quick review" onClick={() => setDashboardSection("flashcards")} />
        </Card>
      </div>

      <div className="spark-performance-grid">
        <div><span>Paper 1</span><strong>{summary?.paper1Count ? `${summary.paper1Average}%` : "—"}</strong></div>
        <div><span>Paper 2</span><strong>{summary?.paper2Count ? `${summary.paper2Average}%` : "—"}</strong></div>
        <div><span>2027 Practice</span><strong>{summary?.paper2027Count ? `${summary.paper2027Average}%` : "—"}</strong></div>
        <div><span>Question accuracy</span><strong>{summary?.questionAttemptCount ? `${summary.questionAccuracy}%` : "—"}</strong></div>
      </div>

      <div className="spark-overview-two-col spark-overview-lower">
        <Card className="spark-attention-card">
          <div className="spark-card-heading-row"><div><span className="section-kicker">AREAS TO WORK ON</span><h3>Priority topics</h3></div><DashboardCardAction label="View progress" onClick={() => setDashboardSection("progress")} /></div>
          {weakest.length ? <div className="spark-skill-mini-list">{weakest.map(item => {
            const state = item.learnerState;
            return <div key={item.skill} className="spark-learner-priority-row"><span className="spark-learner-priority-copy"><span>{item.skill}</span>{state && <small>{state.confidenceLabel} confidence · {state.trendLabel}{state.commonError ? ` · ${state.commonError.label}` : ""}</small>}</span><strong>{Math.round(Number(item.score || 0))}%</strong></div>;
          })}</div> : <p className="spark-muted">Keep studying and SPARK will identify your priority topics.</p>}
        </Card>

        <StudentGoalCard
          userId={userId}
          supabase={supabase}
          currentPercent={summary?.examCount ? summary.overallExamAverage : summary?.mastery || 0}
          hasCurrentData={Boolean(summary?.examCount || summary?.skillCount)}
          currentLabel={summary?.examCount ? "Current full-paper average" : "Current mastery"}
          showToast={showToast}
          onGoalChange={onGoalChange}
        />
      </div>

      <div className="spark-overview-two-col spark-overview-lower">
        <Card className="spark-upcoming-card">
          <div className="spark-card-title-with-icon"><span className="spark-feature-icon compact"><Icon name="calendar" size={19}/></span><div><span className="section-kicker">UPCOMING</span><h3>What's next</h3></div></div>
          <div className="spark-upcoming-line"><span>Next tutor session</span><strong>{formatUpcoming(summary?.upcomingBooking)}</strong></div>
          <div className="spark-upcoming-line"><span>This week's activity</span><strong>{summary?.weekly?.questions || 0} questions · {summary?.weekly?.lessons || 0} lessons</strong></div>
        </Card>

        <Card className="spark-achievement-card">
          <div className="spark-card-heading-row"><div><span className="section-kicker">RECENT ACHIEVEMENTS</span><h3>Momentum</h3></div></div>
          {recentAchievements.length ? <div className="spark-achievement-list">{recentAchievements.map(item => <div key={item.id || item.title}><Icon name="spark" size={15}/><span>{item.title || "Learning milestone"}</span></div>)}</div> : <p className="spark-muted">Your lesson, practice and mastery milestones will appear here.</p>}
        </Card>
      </div>

      <Card className="spark-report-cta-card">
        <div className="spark-card-title-with-icon"><span className="spark-feature-icon"><Icon name="report" size={22}/></span><div><span className="section-kicker">MY PROGRESS REPORT</span><h3>See the bigger picture</h3><p>Review your performance, activity, strongest areas, improvement priorities and recommended next steps.</p></div></div>
        <DashboardCardAction label="View progress report" onClick={onOpenReport} />
      </Card>
    </div>
  );
}
