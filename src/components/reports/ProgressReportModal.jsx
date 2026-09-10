import React, { useMemo, useState } from "react";
import Modal from "../ui/Modal";
import Btn from "../ui/Btn";
import Icon from "../ui/Icon";
import InsightText from "../learning/InsightText";
import { buildProgressReport } from "../../insights/progressAnalytics";
import { buildGenericSubjectProgressReport, buildAllSubjectsProgressReport } from "../../subjects/subjectProgress";
import {
  downloadStudentProgressPdf,
  generateStudentProgressPdfBytes,
  pdfBytesToBase64,
} from "../../reports/studentProgressReport";

function ReportSkillList({ title, rows, empty }) {
  return (
    <div className="spark-report-skill-card">
      <h4>{title}</h4>
      {rows?.length ? rows.slice(0, 3).map(row => (
        <div key={`${title}-${row.skill}`}><span>{row.skill}</span><strong>{Math.round(Number(row.score ?? row.mastery_score ?? 0))}%</strong></div>
      )) : <p>{empty}</p>}
    </div>
  );
}

function customRangeError(period, start, end) {
  if (period !== "custom") return "";
  if (!start || !end) return "Choose both a start and end date.";
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return "Choose valid report dates.";
  if (startDate > endDate) return "The start date must be on or before the end date.";
  return "";
}

export default function ProgressReportModal({
  onClose,
  student,
  data,
  parentName = "",
  canEmail = false,
  emailTo = "",
  supabase,
  showToast,
  subjectSources = [],
  initialSubjectId = "all",
  overallGoal = null,
}) {
  const normalizedSources = useMemo(() => subjectSources.length ? subjectSources : [{
    subject: { id: "mathematics", name: "CSEC Mathematics", shortName: "Mathematics", stats: {} },
    kind: "mathematics",
    data,
  }], [subjectSources, data]);
  const hasMultipleSubjects = normalizedSources.length > 1;
  const [subjectId, setSubjectId] = useState(hasMultipleSubjects ? initialSubjectId : normalizedSources[0]?.subject?.id || "mathematics");
  const [period, setPeriod] = useState("month");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [emailing, setEmailing] = useState(false);
  const dateError = customRangeError(period, customStart, customEnd);
  const report = useMemo(() => {
    const options = { period, custom: { start: customStart, end: customEnd } };
    if (subjectId === "all" && normalizedSources.length > 1) {
      return buildAllSubjectsProgressReport({
        subjectSources: normalizedSources.map(source => source.kind === "mathematics"
          ? { ...source, data: { ...(source.data || {}), learnerName: student?.name || "", goal: null } }
          : { ...source, goal: null }),
        goal: overallGoal,
      }, options);
    }
    const source = normalizedSources.find(item => item.subject?.id === subjectId) || normalizedSources[0];
    if (source?.kind === "mathematics") {
      const built = buildProgressReport({ ...(source.data || data || {}), learnerName: student?.name || "" }, options);
      return { ...built, subjectId: source.subject.id, subjectName: source.subject.name };
    }
    return buildGenericSubjectProgressReport({ subject: source?.subject, rows: source?.rows || [], events: source?.events || [] }, options);
  }, [subjectId, normalizedSources, data, student?.name, period, customStart, customEnd, overallGoal]);

  const selectedSubjectName = report?.subjectName || (subjectId === "all" ? "All subjects" : normalizedSources.find(item => item.subject?.id === subjectId)?.subject?.name) || "Learning progress";

  const pdfArgs = {
    studentName: student?.name || "Student",
    parentName,
    subject: selectedSubjectName,
    report,
  };

  const downloadReport = () => {
    if (dateError) {
      showToast?.(dateError, "error");
      return;
    }
    downloadStudentProgressPdf(pdfArgs);
  };

  const emailReport = async () => {
    if (!canEmail || !supabase || !student?.id || dateError) {
      if (dateError) showToast?.(dateError, "error");
      return;
    }
    setEmailing(true);
    try {
      const bytes = generateStudentProgressPdfBytes(pdfArgs);
      const { data: result, error } = await supabase.functions.invoke("send-progress-report", {
        body: {
          student_id: student.id,
          period_label: report.period.label,
          subject_id: report.subjectId || subjectId,
          subject_name: selectedSubjectName,
          report: {
            subject_id: report.subjectId || subjectId,
            subject_name: selectedSubjectName,
            summary: report.summary,
            activity: report.activity,
            strongestSkills: report.strongestSkills,
            weakestSkills: report.weakestSkills,
            recommendations: report.recommendations,
            metrics: report.metrics || [],
            activityLabels: report.activityLabels || {},
            assessmentLabel: report.assessmentLabel || "",
            goal: report.goal || null,
            studyCircle: report.studyCircle || null,
          },
          pdf_base64: pdfBytesToBase64(bytes),
        },
      });
      if (error) {
        let message = error?.message || "Email delivery failed.";
        try {
          const body = error?.context?.clone ? await error.context.clone().json() : null;
          if (body?.error) message = body.error;
        } catch {}
        throw new Error(message);
      }
      if (!result?.ok) throw new Error(result?.error || "Email delivery failed.");
      showToast?.(`Progress report emailed to ${emailTo || "your account email"}.`);
    } catch (error) {
      console.error("Could not email progress report:", error);
      showToast?.(error?.message || "Could not email the report. Check the report email setup and try again.", "error");
    } finally {
      setEmailing(false);
    }
  };

  const activity = report.activity || {};
  const summary = report.summary || {};
  const masteryValue = summary.skillCount ? `${summary.mastery}%` : "—";
  const examAverageValue = activity.hasExamAverage ? `${activity.examAverage}%` : "—";

  return (
    <Modal onClose={onClose} maxWidth={760}>
      <div className="spark-report-modal">
        <div className="spark-report-modal-head">
          <div className="spark-card-title-with-icon">
            <span className="spark-feature-icon compact"><Icon name="report" size={19}/></span>
            <div><span className="section-kicker">PROGRESS REPORT</span><h2>{student?.name || "Student"}</h2></div>
          </div>
          <button className="spark-modal-close" onClick={onClose} aria-label="Close report">×</button>
        </div>

        {hasMultipleSubjects && <div className="spark-report-subjects" aria-label="Report subject">
          <button className={subjectId === "all" ? "active" : ""} onClick={() => setSubjectId("all")}>All subjects</button>
          {normalizedSources.map(source => <button key={source.subject.id} className={subjectId === source.subject.id ? "active" : ""} onClick={() => setSubjectId(source.subject.id)}>{source.subject.shortName || source.subject.name}</button>)}
        </div>}

        <div className="spark-report-periods" aria-label="Report period">
          {[["week","This week"],["month","This month"],["term","This term"],["custom","Custom"]].map(([key,label]) => (
            <button key={key} className={period === key ? "active" : ""} onClick={() => setPeriod(key)}>{label}</button>
          ))}
        </div>
        {period === "custom" && <div className="spark-report-custom-dates"><label>From<input type="date" value={customStart} onChange={event => setCustomStart(event.target.value)}/></label><label>To<input type="date" value={customEnd} onChange={event => setCustomEnd(event.target.value)}/></label></div>}
        {dateError && <div className="spark-report-date-error" role="alert">{dateError}</div>}

        <div className="spark-report-preview">
          <div className="spark-report-preview-title"><div><strong>{selectedSubjectName}</strong><span>{report.period.label}</span></div><span>{new Date(report.generatedAt).toLocaleDateString()}</span></div>
          <div className="spark-report-metrics">
            {Array.isArray(report.metrics) && report.metrics.length ? report.metrics.slice(0,4).map(item => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>) : <>
              <div><strong>{masteryValue}</strong><span>Skill mastery</span></div>
              <div><strong>{examAverageValue}</strong><span>Exam average</span></div>
              <div><strong>{activity.questionsAttempted || 0}</strong><span>Questions</span></div>
              <div><strong>{activity.lessonsCompleted || 0}</strong><span>Lessons</span></div>
            </>}
          </div>
          <div className="spark-report-insight"><span>SPARK INSIGHT</span><p><InsightText text={summary.insight}/></p></div>
          <div className="spark-report-skill-grid">
            <ReportSkillList title="Strongest areas" rows={report.strongestSkills} empty="No mastery data yet."/>
            <ReportSkillList title="Areas to improve" rows={report.weakestSkills} empty="No priority areas recorded."/>
          </div>
          <div className="spark-report-next"><h4>Recommended next steps</h4><ol>{report.recommendations.map(item => <li key={item}>{item}</li>)}</ol></div>
        </div>

        <div className="spark-report-actions">
          <Btn v="outline" disabled={Boolean(dateError)} onClick={downloadReport}>Download PDF</Btn>
          {canEmail && <Btn disabled={emailing || Boolean(dateError)} onClick={emailReport}>{emailing ? "Sending…" : "Email report"}</Btn>}
        </div>
        {canEmail ? <p className="spark-report-email-note">For privacy, SPARK sends this only to the confirmed email on your Parent account: <strong>{emailTo || "your account email"}</strong>.</p> : parentName ? <p className="spark-report-email-note">Confirm the email on your Parent account to enable secure report delivery.</p> : null}
      </div>
    </Modal>
  );
}
