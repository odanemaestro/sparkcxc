import React, { useMemo, useState } from "react";
import Modal from "../ui/Modal";
import Btn from "../ui/Btn";
import Icon from "../ui/Icon";
import InsightText from "../learning/InsightText";
import { buildProgressReport } from "../../insights/progressAnalytics";
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
}) {
  const [period, setPeriod] = useState("month");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [emailing, setEmailing] = useState(false);
  const dateError = customRangeError(period, customStart, customEnd);
  const report = useMemo(() => buildProgressReport({ ...data, learnerName: student?.name || "" }, {
    period,
    custom: { start: customStart, end: customEnd },
  }), [data, student?.name, period, customStart, customEnd]);

  const pdfArgs = {
    studentName: student?.name || "Student",
    parentName,
    subject: "CSEC Mathematics",
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
          report: {
            summary: report.summary,
            activity: report.activity,
            strongestSkills: report.strongestSkills,
            weakestSkills: report.weakestSkills,
            recommendations: report.recommendations,
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

        <div className="spark-report-periods" aria-label="Report period">
          {[["week","This week"],["month","This month"],["term","This term"],["custom","Custom"]].map(([key,label]) => (
            <button key={key} className={period === key ? "active" : ""} onClick={() => setPeriod(key)}>{label}</button>
          ))}
        </div>
        {period === "custom" && <div className="spark-report-custom-dates"><label>From<input type="date" value={customStart} onChange={event => setCustomStart(event.target.value)}/></label><label>To<input type="date" value={customEnd} onChange={event => setCustomEnd(event.target.value)}/></label></div>}
        {dateError && <div className="spark-report-date-error" role="alert">{dateError}</div>}

        <div className="spark-report-preview">
          <div className="spark-report-preview-title"><div><strong>CSEC Mathematics</strong><span>{report.period.label}</span></div><span>{new Date(report.generatedAt).toLocaleDateString()}</span></div>
          <div className="spark-report-metrics">
            <div><strong>{masteryValue}</strong><span>Skill mastery</span></div>
            <div><strong>{examAverageValue}</strong><span>Exam average</span></div>
            <div><strong>{activity.questionsAttempted || 0}</strong><span>Questions</span></div>
            <div><strong>{activity.lessonsCompleted || 0}</strong><span>Lessons</span></div>
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
