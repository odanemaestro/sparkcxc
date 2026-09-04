import { useState } from "react";
import { T, FB } from "../../theme";

// ============================================================================
// Done by: Odane Robinson
//
// A lightweight "report a problem with this question" control, added
// directly because of how many real content errors this session's manual
// audit turned up (an incompletely-factorised answer in 212 questions, an
// entire topic's worth of wrong inequality answers, mislabelled diagram
// geometry, etc.) that a human audit alone is never going to catch
// everything. A feedback channel from actual students using the app is a
// much faster way to surface the next one.
//
// Deliberately dependency-light so it can drop into either question
// surface in this app: it takes `supabase`/`userId` as props rather than
// importing a singleton client, since App.js's QuizEngine and
// AdaptivePractice.jsx each get their Supabase client differently.
//
// Requires the `question_reports` table - see
// supabase/migrations/20260827_question_reports_and_self_assessment.sql.
// ============================================================================
export default function ReportQuestionButton({
  supabase,
  userId,
  questionId,
  questionSource, // "lesson_bank" | "adaptive_bank"
  questionText,
  topic,
  area,
  className,
  style,
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error

  async function handleSubmit() {
    const trimmed = message.trim();
    if (trimmed.length < 5) {
      setStatus("error");
      return;
    }
    if (!supabase) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    const { error } = await supabase.from("question_reports").insert({
      question_id: questionId,
      question_source: questionSource,
      topic: topic || null,
      area: area || null,
      question_text: questionText ? String(questionText).slice(0, 2000) : null,
      message: trimmed,
      reported_by: userId || null,
    });
    if (error) {
      console.error("Could not submit question report:", error);
      setStatus("error");
    } else {
      setStatus("done");
    }
  }

  function reset() {
    setOpen(false);
    setMessage("");
    setStatus("idle");
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        style={{
          background: "none", border: "none", cursor: "pointer", padding: "4px 0",
          color: T.textMuted, fontSize: 12.5, fontFamily: FB, textDecoration: "underline",
          textUnderlineOffset: 3, ...style,
        }}
      >
        ⚑ Report a problem with this question
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Report a problem with this question"
      style={{
        border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginTop: 8,
        background: T.paper, color: T.ink, boxShadow: T.shadowSm, fontSize: 13.5, fontFamily: FB, ...style,
      }}
      className={className}
    >
      {status === "done" ? (
        <>
          <p style={{ margin: "0 0 10px", color: T.emerald, fontWeight: 700 }}>
            Thank you. Your report was submitted.
          </p>
          <button type="button" onClick={reset} style={{
              minHeight: 40, padding: "9px 14px", borderRadius: 8, border: `1px solid ${T.border}`,
              background: T.muted, color: T.ink, fontFamily: FB, fontSize: 13, fontWeight: 700, cursor: "pointer"
            }}>Close</button>
        </>
      ) : (
        <>
          <label style={{ display: "block", marginBottom: 7, fontWeight: 700, color: T.ink }}>
            What's wrong with this question?
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. the answer doesn't match the question, the diagram looks wrong, a number seems off..."
            rows={3}
            style={{ width: "100%", boxSizing: "border-box", minHeight: 96, padding: "11px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.bg, color: T.ink, fontFamily: FB, fontSize: 13.5, lineHeight: 1.5, resize: "vertical", outline: "none" }}
          />
          {status === "error" && (
            <p style={{ color: T.red, margin: "7px 0 0", fontSize: 12.5 }}>
              {message.trim().length < 5
                ? "Please add a few more details before submitting."
                : "Your report was not submitted. Please try again."}
            </p>
          )}
          <div className="spark-question-report-actions" style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
            <button type="button" onClick={handleSubmit} disabled={status === "submitting"} style={{
              minHeight: 40, padding: "9px 15px", borderRadius: 8, border: `1px solid ${T.teal}`,
              background: T.teal, color: T.navyDeep, fontFamily: FB, fontSize: 13, fontWeight: 800,
              cursor: status === "submitting" ? "not-allowed" : "pointer", opacity: status === "submitting" ? .6 : 1
            }}>
              {status === "submitting" ? "Submitting…" : "Submit report"}
            </button>
            <button type="button" onClick={reset} disabled={status === "submitting"} style={{
              minHeight: 40, padding: "9px 15px", borderRadius: 8, border: `1px solid ${T.border}`,
              background: T.muted, color: T.ink, fontFamily: FB, fontSize: 13, fontWeight: 700,
              cursor: status === "submitting" ? "not-allowed" : "pointer", opacity: status === "submitting" ? .6 : 1
            }}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}
