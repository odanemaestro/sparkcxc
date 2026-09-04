// ============================================================================
// SPARK - CSEC Mathematics study app
// Done by: Odane Robinson
//
// This file is the main application shell: authentication, navigation,
// the lesson/question-bank content for all CSEC syllabus topics, and the
// core UI screens (dashboard, lesson view, practice/quiz view, review).
//
// QA / correction log (Odane Robinson):
//   - The "cxc25-*" questions below reproduce/adapt real CXC Mathematics
//     January and May/June 2025 past-paper questions. Every one of them
//     was checked against the actual exam wording and re-derived from
//     first principles (not just re-typed) before being accepted here.
//   - cxc25-may-q6 originally mislabelled the rectangle's HEIGHT as "OR"
//     (using cos20° instead of sin20°), which cascaded into a wrong
//     shaded-area and perimeter answer. The model answer below has been
//     corrected and now shows the full derivation so the mistake can't
//     silently reappear.
//   - The accompanying diagrams (in public/cxc2025/) were re-drawn from
//     verified coordinate geometry - see the comment at the top of each
//     .svg file for what was wrong and how it was fixed (e.g. points
//     that weren't actually on the circle they were "on", a
//     "parallelogram" that was really a trapezoid, an 18° sector drawn
//     at ~70°, etc).
// ============================================================================
import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import PracticeHub from "./practice/PracticeHub";
import MathText from "./practice/MathText";
import {
  LESSONS, SYLLABUS_SECTIONS, QUESTION_BANK,
  getQuestionsForTopic, getMCQForTopic, getStructuredForTopic, getQuizQuestionsForTopic,
} from "./data/lessonBank";
import { COUNTRY_CODES, isoToFlagEmoji } from "./data/countryCodes";
import { supabase, getRememberMePreference, setRememberMePreference } from "./lib/supabaseClient";
import { sortTutors } from "./lib/tutorSort";
import { saveTutorApplicationDraft, loadTutorApplicationDraft, clearTutorApplicationDraft } from "./lib/tutorApplicationDraft";
import { T, FD, FB } from "./theme";
import GlobalStyles from "./components/ui/GlobalStyles";
import Btn from "./components/ui/Btn";
import Badge from "./components/ui/Badge";
import Card from "./components/ui/Card";
import ProgressBar from "./components/ui/ProgressBar";
import Toast from "./components/ui/Toast";
import Modal from "./components/ui/Modal";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import ReportQuestionButton from "./components/ui/ReportQuestionButton";
import NotificationCenter from "./components/notifications/NotificationCenter";
import { friendlyErrorMessage } from "./lib/errorMessages";
import { getExamPerformanceStatus } from "./lib/examPerformance";
import { detachCurrentPushAssociation, restorePushAssociation } from "./lib/pushNotifications";
import "./family.css";
import "./responsive.css";
import GOOGLE_ICON_B64 from "./assets/icons/google-icon.png";
import GOOGLE_CALENDAR_ICON_B64 from "./assets/icons/google-calendar-icon.png";
import OUTLOOK_ICON_B64 from "./assets/icons/outlook-icon.png";
import APPLE_CALENDAR_ICON_B64 from "./assets/icons/apple-calendar-icon.png";

// ─── URL ROUTING ─────────────────────────────────────────────────────────────
// GitHub Pages serves SPARK as a static single-page app. Hash-based routes keep
// every screen refresh-safe without requiring server rewrite rules or a 404
// redirect workaround. The rest of the app can continue calling setView(...)
// exactly as before while the URL stays in sync with the visible screen.
const VIEW_ROUTE_PATHS = Object.freeze({
  home: "/",
  tutors: "/tutors",
  "how-it-works": "/how-it-works",
  login: "/login",
  auth: "/signup",
  "auth-recovery": "/reset-password",
  dashboard: "/dashboard",
  admin: "/admin",
  lesson: "/study",
  practice: "/practice",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  "become-tutor": "/become-tutor",
});

const ROUTE_PATH_VIEWS = Object.freeze({
  "/": "home",
  "/home": "home",
  "/tutors": "tutors",
  "/how-it-works": "how-it-works",
  "/login": "login",
  "/auth": "auth",
  "/signup": "auth",
  "/reset-password": "auth-recovery",
  "/dashboard": "dashboard",
  "/admin": "admin",
  "/lesson": "lesson",
  "/study": "lesson",
  "/practice": "practice",
  "/about": "about",
  "/contact": "contact",
  "/privacy": "privacy",
  "/become-tutor": "become-tutor",
});

const DASHBOARD_ROUTE_SECTIONS = new Set([
  "overview",
  "subjects",
  "progress",
  "bookings",
  "sessions",
  "students",
  "reviews",
  "earnings",
  "profile",
]);

function normalizedSparkPathFromBrowserHash() {
  if (typeof window === "undefined") return "/";

  const hash = String(window.location.hash || "");
  if (!hash || hash === "#" || hash === "#/") return "/";

  // Supabase may temporarily use the hash for auth tokens. Do not rewrite or
  // interpret those as SPARK routes. The auth state listener will move the user
  // to the appropriate SPARK screen once Supabase has processed the callback.
  if (!hash.startsWith("#/")) return null;

  const rawPath = hash.slice(1).split("?")[0];
  return rawPath.length > 1
    ? rawPath.replace(/\/+$/, "")
    : rawPath;
}

function viewFromBrowserHash() {
  const normalizedPath = normalizedSparkPathFromBrowserHash();
  if (!normalizedPath) return "home";

  // Dashboard tabs are first-class routes. Any recognized nested dashboard
  // path still resolves to the Dashboard screen at the app-shell level.
  if (normalizedPath === "/dashboard" || normalizedPath.startsWith("/dashboard/")) {
    return "dashboard";
  }

  return ROUTE_PATH_VIEWS[normalizedPath] || "home";
}

function dashboardSectionFromBrowserHash() {
  const path = normalizedSparkPathFromBrowserHash();
  if (!path || path === "/dashboard") return "overview";
  if (!path.startsWith("/dashboard/")) return "overview";

  const section = path.slice("/dashboard/".length).split("/")[0];
  return DASHBOARD_ROUTE_SECTIONS.has(section) ? section : "overview";
}

function emitSparkRouteChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("spark:routechange"));
}

function writeRouteHash(nextHash, { replace = false } = {}) {
  if (typeof window === "undefined") return;
  if ((window.location.hash || "") === nextHash) return;

  const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
  if (replace) {
    window.history.replaceState(window.history.state, "", nextUrl);
  } else {
    window.history.pushState(window.history.state, "", nextUrl);
  }
  // pushState/replaceState do not emit popstate/hashchange themselves. This
  // keeps mounted nested screens synchronized when code changes the route.
  emitSparkRouteChange();
}

function writeViewToBrowserHash(view, { replace = false } = {}) {
  if (typeof window === "undefined") return;

  const path = VIEW_ROUTE_PATHS[view] || VIEW_ROUTE_PATHS.home;
  const nextHash = `#${path}`;
  const currentHash = window.location.hash || "";

  // Treat an empty hash and #/ as the same Home route so loading the homepage
  // does not create a needless browser-history entry.
  const alreadyAtRoute = currentHash === nextHash ||
    (view === "home" && (currentHash === "" || currentHash === "#" || currentHash === "#/"));
  if (alreadyAtRoute) return;

  writeRouteHash(nextHash, { replace });
}

function writeDashboardSectionToBrowserHash(section, { replace = false } = {}) {
  const safeSection = DASHBOARD_ROUTE_SECTIONS.has(section) ? section : "overview";
  const path = safeSection === "overview" ? "/dashboard" : `/dashboard/${safeSection}`;
  writeRouteHash(`#${path}`, { replace });
}

// ─── Brand icons (inlined as data URIs so no separate asset files are
// needed) - used by the "Continue with Google" button and the
// "Add to calendar" dropdown.

// spark-lessons.js
// Full lesson content for all 107 CSEC Mathematics syllabus topics
// Structure per lesson:
//   intro: opening concept explanation
//   sections: array of { heading, content, example? (with question/solution), tip? }
//   keyFacts: bullet list of things to memorise
//   commonMistakes: what students get wrong
//   examTip: specific CXC exam advice
//
// LESSONS, SYLLABUS_SECTIONS, QUESTION_BANK, and the getQuestionsForTopic/
// getMCQForTopic/getStructuredForTopic helpers now live in
// src/data/lessonBank.js (imported at the top of this file) - done by:
// Odane Robinson.



// spark-app.jsx
// Main application file
//
// Supabase client, design tokens (T/FD/FB), and small reusable UI
// components used to live inline here. They've been split out to
// src/lib/ and src/components/ui/ (see the imports at the top of this
// file) so this file holds the app's views and routing, not its whole
// design system in one place - done by: Odane Robinson.

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
// T, FD, FB now live in src/theme.js (imported at the top of this file) so
// every view/component shares one theme module instead of a private const.

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────

// ─── SHARED UI ──────────────────────────────────────────────────────────────






// ─── SCROLL TO TOP ──────────────────────────────────────────────────────────


// Custom start-time picker for booking a session. Rather than a free-form
// hour/minute/AM-PM dial that lets a student pick any time of day and only
// find out afterward that it's unavailable, this shows a single scrollable
// list of actual start-time slots across a wide practical tutoring window,
// with slots that are already booked or in the past visibly disabled -
// not just rejected on submit. It expands in normal document flow (not as
// a floating overlay), so it can never get clipped by a scrollable parent
// like the booking Modal.
// value/onChange use "HH:MM" 24-hour strings, same as the input it replaces.

const SLOT_WINDOW_START_MIN = 6 * 60;       // 6:00 AM
const SLOT_WINDOW_END_MIN = 21 * 60 + 30;   // 9:30 PM - last selectable start time
const SLOT_STEP_MIN = 30;

// Booking policy: students book at least 90 minutes ahead. Tutors must
// confirm at least 60 minutes before start. A final reminder is sent at 75.
const BOOKING_MIN_NOTICE_MIN = 90;
const BOOKING_CONFIRMATION_CUTOFF_MIN = 60;

function buildDaySlots() {
  const slots = [];
  for (let m = SLOT_WINDOW_START_MIN; m <= SLOT_WINDOW_END_MIN; m += SLOT_STEP_MIN) {
    slots.push(minutesToTime(m));
  }
  return slots;
}
const DAY_SLOTS = buildDaySlots();

// Jamaica is fixed at UTC-5 year-round (no DST) - same assumption used by
// the calendar-export helpers below. Reading the UTC-shifted timestamp's
// UTC fields back out gives Jamaica's wall-clock date/time regardless of
// the visitor's own browser timezone.
function jamaicaNowParts() {
  const shifted = new Date(Date.now() - 5 * 60 * 60 * 1000);
  return {
    dateKey: `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, "0")}-${String(shifted.getUTCDate()).padStart(2, "0")}`,
    minutes: shifted.getUTCHours() * 60 + shifted.getUTCMinutes()
  };
}

const TimeSlotPicker = ({ value, onChange, date, duration, busyOnDate = [], placeholder = "Select a start time" }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const selectedRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Bring the current selection into view the moment the list opens, so
  // reopening to check a late-afternoon slot doesn't mean scrolling past
  // the whole morning again.
  useEffect(() => {
    if (open && selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: "center" });
    }
  }, [open]);

  const nowMs = Date.now();

  const slots = DAY_SLOTS.map(t => {
    const slotAt = date ? calendarDateTime(date, t) : null;
    const slotMs = slotAt && !isNaN(slotAt.getTime()) ? slotAt.getTime() : null;
    const past = slotMs != null && slotMs <= nowMs;
    const tooSoon = slotMs != null && !past && slotMs < nowMs + BOOKING_MIN_NOTICE_MIN * 60 * 1000;
    const clash = !past && !tooSoon && busyOnDate.some(b => sessionsOverlap(t, duration, b.start_time, b.duration_minutes));
    return {
      time: t,
      disabled: past || tooSoon || clash,
      reason: past ? "Past" : tooSoon ? "90 min notice" : clash ? "Booked" : null,
    };
  });
  const anyAvailable = slots.some(s => !s.disabled);

  return (
    <div ref={wrapRef}>
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{width:"100%",padding:"11px 14px",border:`1.5px solid ${open?T.teal:T.border}`,
          borderRadius:T.rSm,fontSize:14,fontFamily:FB,color:value?T.ink:T.textMuted,
          background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center",
          cursor:"pointer",transition:`all .18s ${T.ease}`,
          boxShadow:open?`0 0 0 3px ${T.tealLight}`:"none"}}>
        <span>{value ? fmtClock(value) : placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{opacity:.55,flexShrink:0,transform:open?"rotate(180deg)":"none",transition:`transform .18s ${T.ease}`}}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div className="fade-in" style={{marginTop:8,border:`1px solid ${T.borderSoft}`,borderRadius:T.rSm,
          boxShadow:T.shadowSm,maxHeight:240,overflowY:"auto",background:"#fff"}}>
          {!date ? (
            <div style={{padding:"16px 12px",fontSize:13,color:T.textMuted,textAlign:"center"}}>
              Pick a date first to see available times.
            </div>
          ) : !anyAvailable ? (
            <div style={{padding:"16px 12px",fontSize:13,color:T.textMuted,textAlign:"center"}}>
              No available times on this date. Try another day.
            </div>
          ) : (
            slots.map((s, i) => {
              const active = value === s.time;
              return (
                <div key={s.time}
                  ref={active ? selectedRef : null}
                  onClick={() => { if (!s.disabled) { onChange(s.time); setOpen(false); } }}
                  style={{
                    display:"flex",justifyContent:"space-between",alignItems:"center",
                    padding:"10px 14px",
                    cursor:s.disabled?"not-allowed":"pointer",
                    fontSize:13.5,
                    fontWeight:active?700:500,
                    color:s.disabled?T.textMuted:(active?T.tealDark:T.inkSoft),
                    background:active?T.tealLight:"transparent",
                    opacity:s.disabled?.55:1,
                    borderBottom:i<slots.length-1?`1px solid ${T.borderSoft}`:"none",
                    transition:`background .12s ${T.ease}`
                  }}>
                  <span style={{textDecoration:s.disabled?"line-through":"none"}}>{fmtClock(s.time)}</span>
                  {s.reason && <span style={{fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.04em"}}>{s.reason}</span>}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

function showToastGlobal(msg, setToast) {
  setToast(msg);
  setTimeout(() => setToast(null), 2800);
}

// NOTE (Odane Robinson): A `COMPLETED_LESSONS` block used to live here,
// auto-generated to plug the topics that had no real lesson content yet,
// wired in via a Object • assign(...) call targeting LESSONS. That call ran
// at module-load time and, because ES module imports of objects are live
// references, it MUTATED the actual `LESSONS` object exported by
// data/lessonBank.js in place - silently overwriting every one of that
// file's real, hand-verified lessons with generic templated placeholder
// text for the same 108 topics, every time the app loaded. It has been
// removed now that all 108 topics have genuine authored content in
// data/lessonBank.js; nothing should ever mutate the shared LESSONS
// object like this again.

// ─── INTERACTIVE LESSON RENDERER ────────────────────────────────────────────
function LessonContent({ topicName, onQuizStart, onComplete, isCompleted }) {
  const lesson = LESSONS[topicName];
  const [openSections, setOpenSections] = useState({ 0: true });
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [selfCheckAnswers, setSelfCheckAnswers] = useState({});

  if (!lesson) {
    return (
      <Card style={{background:T.redLight,padding:28}}>
        <strong>Lesson unavailable</strong>
        <p style={{color:T.textMuted}}>This topic is not present in the curriculum data.</p>
        <Btn onClick={onQuizStart}>Take practice quiz →</Btn>
      </Card>
    );
  }

  const toggleSection = (i) => setOpenSections(prev => ({ ...prev, [i]: !prev[i] }));
  const revealSolution = (key) => setRevealedSolutions(prev => ({ ...prev, [key]: true }));

  return (
    <div className="fade-in">
      {/* Intro */}
      <MathText as="p" prose className="lesson-math-copy" style={{fontSize:15.5,color:T.inkSoft,lineHeight:1.8,marginBottom:26,
        padding:"18px 22px",background:`linear-gradient(135deg,${T.tealLight},#EFFBF8)`,borderRadius:T.rMd,
        borderLeft:`3px solid ${T.teal}`,boxShadow:T.shadowSm}}>
        {lesson.intro}
      </MathText>

      {/* Sections */}
      {lesson.sections.map((sec, i) => (
        <div key={i} className="lesson-section">
          <div className="lesson-section-header" onClick={() => toggleSection(i)}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:openSections[i]?T.teal:T.muted,
                color:openSections[i]?"#fff":T.textMuted,display:"flex",alignItems:"center",
                justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>
                {i + 1}
              </div>
              <span style={{fontFamily:FD,fontSize:17,fontWeight:600,color:T.ink}}>{sec.heading}</span>
            </div>
            <span style={{color:T.textMuted,fontSize:18,transform:openSections[i]?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
          </div>

          {openSections[i] && (
            <div className="lesson-section-body fade-in">
              <MathText as="p" prose className="lesson-math-copy" style={{fontSize:14.5,color:T.inkSoft,lineHeight:1.8,whiteSpace:"pre-line",marginBottom:16}}>
                {sec.content}
              </MathText>

              {sec.example && (
                <div className="example-box">
                  <div style={{fontSize:11,fontWeight:600,color:T.teal,textTransform:"uppercase",
                    letterSpacing:"0.06em",marginBottom:8}}>Worked Example</div>
                  <MathText as="div" prose className="example-question lesson-math-copy">{sec.example.question}</MathText>
                  {!revealedSolutions[`${i}-ex`] ? (
                    <button onClick={() => revealSolution(`${i}-ex`)}
                      style={{background:"none",border:`1.5px solid ${T.teal}`,color:T.teal,
                        padding:"8px 16px",borderRadius:6,fontSize:13,cursor:"pointer",
                        fontFamily:FB,fontWeight:500}}>
                      Show full solution →
                    </button>
                  ) : (
                    <div className="solution-reveal fade-in">
                      <div style={{fontSize:11,fontWeight:600,color:T.emerald,textTransform:"uppercase",
                        letterSpacing:"0.05em",marginBottom:6}}>Full Solution</div>
                      <MathText as="div" prose className="solution-content lesson-math-copy">{sec.example.solution}</MathText>
                    </div>
                  )}
                </div>
              )}

              {sec.tip && (
                <div style={{background:T.amberLight,borderLeft:`3px solid ${T.amber}`,
                  borderRadius:"0 8px 8px 0",padding:"12px 16px",marginTop:12}}>
                  <span style={{fontWeight:600,color:T.amber}}>💡 Tip: </span>
                  <MathText as="span" prose className="lesson-math-copy" style={{fontSize:14,color:T.inkSoft}}>{sec.tip}</MathText>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Key Facts */}
      <Card style={{marginBottom:16,borderTop:`3px solid ${T.emerald}`}}>
        <div style={{fontFamily:FD,fontSize:17,fontWeight:600,color:T.ink,marginBottom:14}}>
          📌 Key facts to memorise
        </div>
        {lesson.keyFacts.map((fact, i) => (
          <div key={i} className="key-fact">
            <div style={{width:20,height:20,borderRadius:"50%",background:T.emeraldLight,
              color:T.emerald,display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:10,fontWeight:700,flexShrink:0}}>✓</div>
            <MathText as="span" prose className="lesson-math-copy">{fact}</MathText>
          </div>
        ))}
      </Card>

      {/* Common Mistakes */}
      <Card style={{marginBottom:16,borderTop:`3px solid ${T.red}`}}>
        <div style={{fontFamily:FD,fontSize:17,fontWeight:600,color:T.ink,marginBottom:14}}>
          ⚠ Common mistakes students make
        </div>
        {lesson.commonMistakes.map((m, i) => (
          <div key={i} className="mistake-item">
            <div style={{width:20,height:20,borderRadius:"50%",background:T.redLight,
              color:T.red,display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:10,fontWeight:700,flexShrink:0}}>✗</div>
            <MathText as="span" prose className="lesson-math-copy">{m}</MathText>
          </div>
        ))}
      </Card>

      {/* Exam Tip */}
      <div style={{background:`linear-gradient(135deg,${T.ink},${T.navyDeep})`,borderRadius:T.rMd,padding:"20px 22px",marginBottom:26,color:"#fff",boxShadow:T.shadowMd}}>
        <div style={{fontSize:12,fontWeight:700,color:"#5EEAD4",textTransform:"uppercase",
          letterSpacing:"0.06em",marginBottom:7}}>CXC Exam Strategy</div>
        <MathText as="p" prose className="lesson-math-copy" style={{fontSize:14.5,color:"rgba(255,255,255,.88)",lineHeight:1.7,margin:0}}>
          {lesson.examTip}
        </MathText>
      </div>

      {/* Actions */}
      <div className="lesson-final-actions" style={{display:"flex",gap:12,flexWrap:"wrap",paddingTop:8}}>
        <Btn onClick={onQuizStart} style={{fontSize:15,padding:"14px 28px"}}>
          Take practice quiz →
        </Btn>
        {!isCompleted && (
          <Btn v="tealOutline" onClick={onComplete}>
            Mark lesson complete ✓
          </Btn>
        )}
        {isCompleted && (
          <div style={{display:"flex",alignItems:"center",gap:8,color:T.emerald,fontWeight:600,fontSize:14}}>
            <span style={{fontSize:18}}>✓</span> Lesson completed
          </div>
        )}
      </div>
    </div>
  );
}

// ─── QUIZ ENGINE ─────────────────────────────────────────────────────────────
function QuizEngine({ topicName, userId, onBack, onComplete, showToast }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [textAnswers, setTextAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [activeQ, setActiveQ] = useState(0);
  const [isContentGap, setIsContentGap] = useState(false);

  useEffect(() => {
    // Load questions from question bank. getQuizQuestionsForTopic checks
    // the topic's exact QUESTION_BANK entry, then TOPIC_ALIASES for
    // topics whose real content is filed under a differently-worded
    // combined topic name (see the alias map's own comment for why this
    // exists) - done by: Odane Robinson.
    const { questions: allQs, isContentGap: gap } = getQuizQuestionsForTopic(topicName);
    // Mix MCQ and structured: take up to 3 MCQ and 1-2 structured
    const mcqs = allQs.filter(q => q.type === "mcq").sort(() => Math.random() - 0.5).slice(0, 4);
    const structured = allQs.filter(q => q.type === "structured").sort(() => Math.random() - 0.5).slice(0, 1);
    const combined = [...mcqs, ...structured];
    // QA fix: this used to silently fall back to two hardcoded generic
    // "study skills" questions (not real CXC content) whenever a topic had
    // no matching entry - which, before the alias map above, was 92 of
    // 124 syllabus topics (74%). A student had no way to tell the
    // difference between "you got these right" and "there's no real
    // content for this topic yet." Now that's an honest, explicit state
    // (isContentGap) instead of fake questions pretending to be real ones.
    setIsContentGap(gap);
    setQuestions(combined);
  }, [topicName]);


  const answerMCQ = async (qi, optionIdx) => {
    if (answers[qi] !== undefined) return;
    const q = questions[qi];
    const isCorrect = optionIdx === q.correct;
    setAnswers(prev => ({ ...prev, [qi]: optionIdx }));

    // Save to Supabase
    if (userId && q.id && !q.id.startsWith("gen-")) {
      try {
        await supabase.from("quiz_attempts").insert({
          user_id: userId,
          question_id: q.id,
          is_correct: isCorrect,
          selected_index: optionIdx,
        });
      } catch (e) { /* silent fail */ }
    }
  };

  const revealModelAnswer = (qi) => {
    setRevealed(prev => ({ ...prev, [qi]: true }));
  };

  const submitAll = () => {
    const mcqQs = questions.filter(q => q.type === "mcq");
    const correct = Object.entries(answers)
      .filter(([qi, oi]) => questions[Number(qi)]?.type === "mcq" && Number(oi) === questions[Number(qi)]?.correct)
      .length;
    setScore(correct);
    setSubmitted(true);
    if (correct === mcqQs.length && mcqQs.length > 0) {
      showToast("Perfect score! 🎉");
    }
    onComplete && onComplete(correct, mcqQs.length);
  };

  const allMCQAnswered = questions.filter(q => q.type === "mcq").every((_, i) => answers[i] !== undefined);
  const mcqCount = questions.filter(q => q.type === "mcq").length;
  const correctCount = Object.entries(answers)
    .filter(([qi, oi]) => questions[Number(qi)]?.type === "mcq" && Number(oi) === questions[Number(qi)]?.correct).length;

  // QA fix (Odane Robinson): an honest state for topics with no real quiz
  // content - see the useEffect above and TOPIC_ALIASES's comment in
  // src/data/lessonBank.js for why this exists instead of fake filler
  // questions.
  if (isContentGap) {
    return (
      <div className="fade-in">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <div style={{fontSize:11,color:T.teal,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>
              Practice quiz
            </div>
            <h2 style={{fontFamily:FD,fontSize:22,fontWeight:700,color:T.ink,margin:"0 0 4px"}}>
              {topicName}
            </h2>
          </div>
          <Btn v="outline" onClick={onBack} style={{fontSize:13,padding:"7px 14px"}}>← Back to lesson</Btn>
        </div>
        <Card style={{textAlign:"center",padding:36}}>
          <div style={{fontSize:32,marginBottom:10}} aria-hidden="true">🚧</div>
          <div style={{fontFamily:FD,fontSize:19,fontWeight:700,color:T.ink,marginBottom:8}}>
            Practice questions for this topic are coming soon
          </div>
          <p style={{fontSize:14,color:T.textMuted,lineHeight:1.6,maxWidth:440,margin:"0 auto 20px"}}>
            We haven't written CXC-style practice questions for "{topicName}" yet. Review the
            lesson content above in the meantime, and check back soon.
          </p>
          <Btn onClick={onBack}>Back to lesson</Btn>
        </Card>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
        <div>
          <div style={{fontSize:11,color:T.teal,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>
            Practice quiz
          </div>
          <h2 style={{fontFamily:FD,fontSize:22,fontWeight:700,color:T.ink,margin:"0 0 4px"}}>
            {topicName}
          </h2>
          <div style={{fontSize:13,color:T.textMuted}}>
            {questions.length} question{questions.length !== 1 ? "s" : ""} · Past-paper style · Show all working
          </div>
        </div>
        <Btn v="outline" onClick={onBack} style={{fontSize:13,padding:"7px 14px"}}>← Back to lesson</Btn>
      </div>

      {/* Progress bar */}
      {!submitted && (
        <div style={{marginBottom:24}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textMuted,marginBottom:5}}>
            <span>Progress</span>
            <span>{Object.keys(answers).length} of {mcqCount} MCQ answered</span>
          </div>
          <ProgressBar value={Object.keys(answers).length} max={mcqCount} />
        </div>
      )}

      {/* Score result */}
      {submitted && (
        <Card style={{textAlign:"center",padding:28,marginBottom:24,
          borderTop:`3px solid ${correctCount===mcqCount?T.emerald:correctCount>=mcqCount/2?T.amber:T.red}`}}
          className="fade-in">
          <div style={{fontFamily:FD,fontSize:32,fontWeight:700,color:T.ink,marginBottom:4}}>
            {correctCount}/{mcqCount}
          </div>
          <div style={{fontSize:15,color:T.textMuted,marginBottom:16}}>
            {correctCount === mcqCount ? "Perfect! You're ready for this topic." :
             correctCount >= mcqCount / 2 ? "Review the explanations below, then try the questions again." :
             "Read the lesson again, then try the questions again."}
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <Btn v="outline" onClick={onBack}>Back to lesson</Btn>
            <Btn onClick={() => { setAnswers({}); setRevealed({}); setSubmitted(false); setScore(0); }}>
              Try again
            </Btn>
          </div>
        </Card>
      )}

      {/* Questions */}
      {questions.map((q, qi) => {
        const isAnswered = answers[qi] !== undefined;
        const isRevealed = revealed[qi];

        return (
          <Card key={q.id || qi} style={{marginBottom:18}} className="fade-in">
            {/* Question header */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:11,fontWeight:600,color:T.teal,textTransform:"uppercase",letterSpacing:"0.06em"}}>
                  Question {qi + 1}
                </span>
                <Badge c={q.difficulty === "hard" ? "red" : q.difficulty === "easy" ? "green" : "amber"}>
                  {q.difficulty}
                </Badge>
                {q.marks && <Badge c="ink">{q.marks} mark{q.marks > 1 ? "s" : ""}</Badge>}
              </div>
              {q.type === "structured" && (
                <Badge c="teal">Paper 02 style</Badge>
              )}
            </div>

            {/* Question text */}
            <MathText as="div" prose className="lesson-quiz-question lesson-math-copy" style={{fontSize:15,color:T.ink,fontWeight:500,lineHeight:1.65,marginBottom:18,
              whiteSpace:"pre-line"}}>
              {q.question}
            </MathText>

            {/* Question table - for questions like "complete the table"
                that need an actual rendered table, not a pipe-delimited
                string embedded in the question text. Odane Robinson. */}
            {q.table && (
              <div style={{margin:"0 0 20px",overflowX:"auto"}}>
                <table style={{borderCollapse:"collapse",width:"100%",fontSize:14,fontFamily:FB}}>
                  <thead>
                    <tr>
                      {q.table.headers.map((h, i) => (
                        <th key={i} style={{textAlign:"left",padding:"9px 14px",background:T.muted,
                          border:`1px solid ${T.border}`,color:T.ink,fontWeight:700,whiteSpace:"nowrap"}}>
                          <MathText prose>{h}</MathText>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {q.table.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci} style={{padding:"9px 14px",border:`1px solid ${T.border}`,
                            color:T.inkSoft,whiteSpace:"nowrap"}}>
                            <MathText prose>{cell}</MathText>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Question figure */}
            {q.image && (
              <div style={{margin:"0 0 20px",padding:"16px",background:"#fff",
                border:`1px solid ${T.border}`,borderRadius:10,overflowX:"auto",textAlign:"center"}}>
                <img src={q.image} alt={q.imageAlt || "Question figure"}
                  style={{display:"block",width:"100%",maxWidth:760,height:"auto",margin:"0 auto"}} />
              </div>
            )}

            <div style={{marginBottom:14}}>
              <ReportQuestionButton
                supabase={supabase}
                userId={userId}
                questionId={q.id || `${topicName}-${qi}`}
                questionSource="lesson_bank"
                questionText={q.question}
                topic={topicName}
              />
            </div>

            {/* MCQ options */}
            {q.type === "mcq" && (
              <div>
                {q.options.map((opt, oi) => {
                  const chosen = answers[qi] === oi;
                  const isCorrect = oi === q.correct;
                  let cls = "quiz-option";
                  if (isAnswered) {
                    if (isCorrect) cls += " correct";
                    else if (chosen) cls += " wrong";
                  }
                  return (
                    <button key={oi} className={cls}
                      onClick={() => answerMCQ(qi, oi)}
                      disabled={isAnswered}>
                      <MathText prose>{opt}</MathText>
                    </button>
                  );
                })}

                {/* Explanation */}
                {isAnswered && (
                  <div style={{marginTop:10,padding:"12px 15px",
                    background:answers[qi] === q.correct ? T.emeraldLight : T.redLight,
                    borderRadius:8,fontSize:13.5,
                    color:answers[qi] === q.correct ? T.emerald : T.red,
                    lineHeight:1.65}} className="fade-in">
                    {answers[qi] === q.correct ? "✓ Correct. " : "✗ Incorrect. "}
                    <MathText as="span" prose className="lesson-math-copy" style={{color:T.inkSoft}}>{q.explanation}</MathText>
                  </div>
                )}
              </div>
            )}

            {/* Structured question */}
            {q.type === "structured" && (
              <div>
                <div style={{fontSize:13,color:T.textMuted,marginBottom:10}}>
                  Write your full working in the space below, then reveal the model answer to check.
                </div>
                <textarea
                  className="structured-answer"
                  placeholder="Show all working and write your final answer here."
                  value={textAnswers[qi] || ""}
                  onChange={e => setTextAnswers(prev => ({ ...prev, [qi]: e.target.value }))}
                />
                <div style={{marginTop:10}}>
                  {!isRevealed ? (
                    <Btn v="outline" onClick={() => revealModelAnswer(qi)}>
                      Reveal model answer
                    </Btn>
                  ) : (
                    <div className="fade-in">
                      <div style={{fontSize:12,fontWeight:600,color:T.teal,textTransform:"uppercase",
                        letterSpacing:"0.05em",marginBottom:8}}>Model Answer</div>
                      <MathText as="div" prose className="solution-content lesson-math-copy">{q.modelAnswer}</MathText>
                      <div style={{marginTop:10,padding:"10px 14px",background:T.tealLight,
                        borderRadius:8,fontSize:13.5,color:T.tealDark,lineHeight:1.65}}>
                        💡 <strong>Why this approach:</strong> <MathText as="span" prose className="lesson-math-copy">{q.explanation}</MathText>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        );
      })}

      {/* Submit */}
      {!submitted && allMCQAnswered && mcqCount > 0 && (
        <div style={{textAlign:"center",marginTop:8}}>
          <Btn onClick={submitAll} style={{fontSize:15,padding:"13px 28px"}}>
            Submit and see results →
          </Btn>
        </div>
      )}
    </div>
  );
}

// ─── LESSON VIEW (full layout) ───────────────────────────────────────────────
function LessonView({ user, setView, showToast, hasTutorApp }) {
  const [sections] = useState(SYLLABUS_SECTIONS);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeTopicIdx, setActiveTopicIdx] = useState(0);
  const [inQuiz, setInQuiz] = useState(false);
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [openSidebarSection, setOpenSidebarSection] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const contentRef = useRef(null);

  const activeSection = sections[activeSectionIdx];
  const activeTopic = activeSection?.topics[activeTopicIdx];
  const totalTopics = sections.reduce((a, s) => a + s.topics.length, 0);

  // Load the student's real completed-topics from the database so this page
  // reflects the same progress shown on the Dashboard, and land them on the
  // first topic they haven't finished yet - this is what "Continue studying"
  // from the Dashboard should actually do, instead of always restarting at
  // Section 1, Topic 1.
  useEffect(() => {
    if (!user?.id) { setProgressLoaded(true); return; }
    supabase.from("lesson_progress")
      .select("completed, lessons(title)")
      .eq("user_id", user.id).eq("completed", true)
      .then(({data}) => {
        const doneTitles = new Set((data || []).map(r => r.lessons?.title).filter(Boolean));
        const keys = [];
        let firstIncomplete = null;
        sections.forEach((sec, si) => sec.topics.forEach((topic, ti) => {
          if (doneTitles.has(topic)) keys.push(`${si}-${ti}`);
          else if (!firstIncomplete) firstIncomplete = { si, ti };
        }));
        setCompletedTopics(new Set(keys));
        if (firstIncomplete) {
          setActiveSectionIdx(firstIncomplete.si);
          setActiveTopicIdx(firstIncomplete.ti);
          setOpenSidebarSection(firstIncomplete.si);
        }
        setProgressLoaded(true);
      });
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Navigation issue fix: jumping between topics/sections or in and out of a
  // quiz used to leave the scroll position wherever it was on the previous
  // page. Reset the lesson content pane to the top on every navigation.
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [activeSectionIdx, activeTopicIdx, inQuiz]);

  const markTopicComplete = useCallback(async (sIdx, tIdx, options = {}) => {
    const key = `${sIdx}-${tIdx}`;
    const source = options.source === "quiz" ? "quiz" : "manual";
    const topicTitle = sections[sIdx]?.topics[tIdx];
    const sectionTitle = sections[sIdx]?.title || `Section ${sIdx + 1}`;
    const sectionTopics = sections[sIdx]?.topics || [];
    const sectionWillBeComplete = sectionTopics.length > 0 && sectionTopics.every((_, ti) => (
      ti === tIdx || completedTopics.has(`${sIdx}-${ti}`)
    ));

    setCompletedTopics(prev => new Set([...prev, key]));
    showToast("Topic marked complete ✓");
    if (!user?.id) return;

    // Save the completion source so the database can avoid sending parents a
    // duplicate lesson alert when a passed topic test marks the same lesson
    // complete. The scored topic-test notification is more useful in that case.
    const { data: lesson } = await supabase.from("lessons")
      .select("id").eq("title", topicTitle).single();
    if (!lesson?.id) return;

    const { error: progressError } = await supabase.from("lesson_progress").upsert({
      user_id: user.id,
      lesson_id: lesson.id,
      completed: true,
      completion_source: source,
      completed_at: new Date().toISOString()
    });
    if (progressError) {
      console.error("Could not save lesson completion:", progressError);
      return;
    }

    // Section completion is a meaningful parent milestone. The RPC dedupes it,
    // so completing or revisiting the final topic cannot create repeat alerts.
    if (sectionWillBeComplete) {
      const { error: milestoneError } = await supabase.rpc("spark_record_student_milestone", {
        p_event_type: "section_completed",
        p_title: sectionTitle,
        p_score: null,
        p_max_score: null,
        p_skill: null,
        p_metadata: { section_index: sIdx, section_title: sectionTitle }
      });
      if (milestoneError) console.warn("Could not save section completion milestone:", milestoneError);
    }
  }, [user, sections, showToast, completedTopics]);

  const handleQuizComplete = async (correct, total) => {
    if (user?.id && total > 0) {
      // The database limits repeat alerts for the same topic on the same day.
      const { error } = await supabase.rpc("spark_record_student_milestone", {
        p_event_type: "topic_quiz_completed",
        p_title: activeTopic,
        p_score: correct,
        p_max_score: total,
        p_skill: activeTopic,
        p_metadata: {
          section_index: activeSectionIdx,
          section_title: activeSection?.title || null,
          topic: activeTopic
        }
      });
      if (error) console.warn("Could not save topic test milestone:", error);
    }

    if (total > 0 && correct >= total * 0.6) {
      await markTopicComplete(activeSectionIdx, activeTopicIdx, { source: "quiz" });
    }
  };

  const isTopicDone = (si, ti) => completedTopics.has(`${si}-${ti}`);

  return (
    <div className="lesson-layout" style={{display:"grid",gridTemplateColumns:"280px 1fr",minHeight:"calc(100vh - 56px)"}}>
      {/* Sidebar */}
      <div style={{background:`linear-gradient(180deg,${T.ink},${T.navyDeep})`,overflowY:"auto",borderRight:`1px solid rgba(255,255,255,.08)`}}
        className="lesson-sidebar">
        <div style={{padding:"16px 18px",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,.45)",textTransform:"uppercase",
            letterSpacing:"0.06em",marginBottom:7,fontWeight:600}}>CSEC Mathematics</div>
          <ProgressBar value={completedTopics.size} max={totalTopics} color={T.teal} height={5}/>
          <div style={{fontSize:11,color:"rgba(255,255,255,.45)",marginTop:6}}>
            {completedTopics.size} of {totalTopics} topics complete
          </div>
        </div>

        {sections.map((sec, si) => {
          const secDone = sec.topics.filter((_, ti) => isTopicDone(si, ti)).length;
          const isOpen = openSidebarSection === si;
          return (
            <div key={si}>
              <div onClick={() => setOpenSidebarSection(isOpen ? -1 : si)}
                style={{padding:"11px 16px",fontSize:11,fontWeight:600,textTransform:"uppercase",
                  letterSpacing:"0.04em",cursor:"pointer",display:"flex",justifyContent:"space-between",
                  alignItems:"center",color:"rgba(255,255,255,.55)",transition:`background .18s ${T.ease}`,
                  background:isOpen?"rgba(255,255,255,.05)":"transparent"}}
                onMouseEnter={e=>{if(!isOpen)e.currentTarget.style.background="rgba(255,255,255,.03)";}}
                onMouseLeave={e=>{if(!isOpen)e.currentTarget.style.background="transparent";}}>
                <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"80%"}}>
                  {sec.title.replace("Section ","S")}
                </span>
                <span style={{color:secDone===sec.topics.length&&sec.topics.length>0?T.teal:"rgba(255,255,255,.3)",
                  fontSize:11,flexShrink:0,marginLeft:4}}>
                  {secDone}/{sec.topics.length}
                </span>
              </div>
              {isOpen && sec.topics.map((topic, ti) => {
                const done = isTopicDone(si, ti);
                const isActive = si === activeSectionIdx && ti === activeTopicIdx;
                return (
                  <div key={ti}
                    onClick={() => { setActiveSectionIdx(si); setActiveTopicIdx(ti); setInQuiz(false); }}
                    style={{padding:"9px 16px 9px 28px",fontSize:12.5,cursor:"pointer",
                      display:"flex",alignItems:"center",gap:8,transition:`all .18s ${T.ease}`,
                      borderLeft:`3px solid ${isActive?T.teal:"transparent"}`,
                      background:isActive?"rgba(13,148,136,.18)":"transparent",
                      color:isActive?"#5EEAD4":done?"rgba(255,255,255,.55)":"rgba(255,255,255,.7)"}}
                    onMouseEnter={e=>{if(!isActive)e.currentTarget.style.background="rgba(255,255,255,.04)";}}
                    onMouseLeave={e=>{if(!isActive)e.currentTarget.style.background="transparent";}}>
                    <div style={{width:16,height:16,borderRadius:"50%",flexShrink:0,
                      border:`1.5px solid ${done?T.emerald:"rgba(255,255,255,.25)"}`,
                      background:done?T.emerald:"transparent",transition:`all .18s ${T.ease}`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:8,color:"#fff"}}>
                      {done ? "✓" : ""}
                    </div>
                    <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {topic}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}

        <div style={{padding:14,borderTop:"1px solid rgba(255,255,255,.08)",marginTop:8}}>
          <button onClick={() => setView("dashboard")}
            style={{width:"100%",padding:"9px",borderRadius:6,background:"rgba(255,255,255,.06)",
              color:"rgba(255,255,255,.7)",fontSize:13,border:"1px solid rgba(255,255,255,.1)",
              cursor:"pointer",fontFamily:FB}}>
            ← Dashboard
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div ref={contentRef} className="app-scroll-panel" style={{padding:"28px 36px",overflowY:"auto",background:T.bg}}>
        <div className="lesson-mobile-picker" aria-label="Choose lesson topic">
          <label>
            <span>Section</span>
            <select value={activeSectionIdx} onChange={e => {
              const next = Number(e.target.value);
              setActiveSectionIdx(next); setActiveTopicIdx(0); setOpenSidebarSection(next); setInQuiz(false);
            }}>
              {sections.map((section, index) => <option key={section.title} value={index}>{section.title}</option>)}
            </select>
          </label>
          <label>
            <span>Topic</span>
            <select value={activeTopicIdx} onChange={e => { setActiveTopicIdx(Number(e.target.value)); setInQuiz(false); }}>
              {activeSection?.topics.map((topic, index) => <option key={topic} value={index}>{topic}</option>)}
            </select>
          </label>
        </div>
        {/* Topic breadcrumb */}
        <div style={{marginBottom:16,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <span style={{fontSize:12,color:T.teal,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"}}>
            {activeSection?.title}
          </span>
          <span style={{color:T.border}}>›</span>
          <span style={{fontSize:13,color:T.inkSoft}}>{activeTopic}</span>
          {isTopicDone(activeSectionIdx, activeTopicIdx) && (
            <Badge c="green">Completed ✓</Badge>
          )}
        </div>

        {!inQuiz ? (
          <>
            <h1 style={{fontFamily:FD,fontSize:"clamp(22px,3vw,30px)",fontWeight:700,
              color:T.ink,margin:"0 0 20px",lineHeight:1.2}}>
              {activeTopic}
            </h1>
            <LessonContent
              topicName={activeTopic}
              onQuizStart={() => setInQuiz(true)}
              onComplete={() => markTopicComplete(activeSectionIdx, activeTopicIdx)}
              isCompleted={isTopicDone(activeSectionIdx, activeTopicIdx)}
            />
          </>
        ) : (
          <QuizEngine
            topicName={activeTopic}
            userId={user?.id}
            onBack={() => setInQuiz(false)}
            onComplete={handleQuizComplete}
            showToast={showToast}
          />
        )}

        {/* Previous / Next nav */}
        <div data-avoid-scrolltop style={{display:"flex",justifyContent:"space-between",marginTop:32,
          paddingTop:20,borderTop:`1px solid ${T.border}`}}>
          <button onClick={() => {
            if (activeTopicIdx > 0) {
              setActiveTopicIdx(t => t - 1);
            } else if (activeSectionIdx > 0) {
              const prevSec = sections[activeSectionIdx - 1];
              setActiveSectionIdx(s => s - 1);
              setActiveTopicIdx(prevSec.topics.length - 1);
              setOpenSidebarSection(activeSectionIdx - 1);
            }
            setInQuiz(false);
          }} style={{background:"none",border:`1.5px solid ${T.border}`,padding:"9px 16px",
            borderRadius:7,cursor:"pointer",fontSize:13,color:T.textMuted,fontFamily:FB}}>
            ← Previous topic
          </button>
          <button onClick={() => {
            if (activeTopicIdx < activeSection.topics.length - 1) {
              setActiveTopicIdx(t => t + 1);
            } else if (activeSectionIdx < sections.length - 1) {
              setActiveSectionIdx(s => s + 1);
              setActiveTopicIdx(0);
              setOpenSidebarSection(activeSectionIdx + 1);
            }
            setInQuiz(false);
          }} style={{background:T.teal,border:"none",padding:"9px 16px",
            borderRadius:7,cursor:"pointer",fontSize:13,color:"#fff",fontFamily:FB,fontWeight:600}}>
            Next topic →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav({ setView, user, profile, onLogout, liveStats, hasTutorApp, tutorApp, view }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isTutor = profile?.role === "tutor" || tutorApp?.status === "approved";
  const isStudent = profile?.role === "student";
  const isParent = profile?.role === "parent";

  useEffect(() => { setMenuOpen(false); }, [view]);

  const navigate = (nextView) => {
    setMenuOpen(false);
    setView(nextView);
  };

  const signedInLinks = (
    <>
      <NavBtn onClick={() => navigate("dashboard")} active={view === "dashboard"}>Dashboard</NavBtn>
      {!isTutor && !isParent && <NavBtn onClick={() => navigate("lesson")} active={view === "lesson"}>Study</NavBtn>}
      {!isTutor && !isParent && <NavBtn onClick={() => navigate("practice")} active={view === "practice"}>Practice</NavBtn>}
      <NavBtn onClick={() => navigate("tutors")} active={view === "tutors"}>Tutors</NavBtn>
      {!isStudent && !isParent && !hasTutorApp && view !== "become-tutor" && (
        <NavBtn onClick={() => navigate("become-tutor")}>Submit application to become a tutor</NavBtn>
      )}
      {profile?.is_admin && <NavBtn onClick={() => navigate("admin")} active={view === "admin"}>Admin</NavBtn>}
    </>
  );

  const publicLinks = (
    <>
      <NavBtn onClick={() => navigate("tutors")} active={view === "tutors"}>Tutors</NavBtn>
      <NavBtn onClick={() => navigate("how-it-works")} active={view === "how-it-works"}>How it works</NavBtn>
      <NavBtn onClick={() => navigate("login")} active={view === "login"}>Log in</NavBtn>
    </>
  );

  return (
    <nav className="glass-nav spark-nav" aria-label="Primary navigation">
      <div className="spark-nav-inner">
        <button type="button" className="spark-brand" onClick={() => navigate("home")} aria-label="SPARK home">
          <svg width="26" height="26" viewBox="0 0 512 512" aria-hidden="true">
            <path d="M 340 110 C 340 78, 312 60, 268 60 C 268 60, 190 60, 190 60 C 130 60, 92 96, 92 148 C 92 198, 128 226, 186 236 C 186 236, 296 254, 296 254 C 216 258, 326 276, 326 276 C 384 286, 420 314, 420 364 C 420 416, 382 452, 322 452 C 322 452, 244 452, 244 452 C 200 452, 172 434, 172 402"
              fill="none" stroke="#5EEAD4" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 274 92 L 182 244 L 240 244 L 196 380 L 348 208 L 282 208 Z" fill="#FCD34D"/>
          </svg>
          <span>SPARK</span>
        </button>

        <div className="spark-nav-actions">
          {user && <NotificationCenter user={user} profile={profile} setView={navigate} />}

          <div className="spark-nav-desktop">
            {user ? (
              <>
                {signedInLinks}
                <span className="spark-nav-name">{profile?.name?.split(" ")[0]}</span>
                <Btn v="outline" onClick={onLogout}
                  style={{color:"#fff",borderColor:"rgba(255,255,255,.25)",padding:"8px 16px",fontSize:13}}>
                  Log out
                </Btn>
              </>
            ) : (
              <>
                {publicLinks}
                <Btn v="primary" onClick={() => navigate("auth")}
                  style={{padding:"9px 20px",fontSize:13,marginLeft:4}}>Get started</Btn>
              </>
            )}
          </div>

          <button
            type="button"
            className={`spark-menu-button ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(value => !value)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="spark-mobile-menu fade-in">
          <div className="spark-mobile-menu-links">
            {user ? signedInLinks : publicLinks}
          </div>
          {user ? (
            <div className="spark-mobile-account-row">
              <span>{profile?.name || user.email}</span>
              <button onClick={() => { setMenuOpen(false); onLogout(); }}>Log out</button>
            </div>
          ) : (
            <Btn v="primary" onClick={() => navigate("auth")} style={{width:"100%",justifyContent:"center"}}>Get started</Btn>
          )}
        </div>
      )}
    </nav>
  );
}

const NavBtn = ({ children, onClick, active = false }) => {
  const [hover, setHover] = useState(false);
  return (
    <button className="spark-nav-link" onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{background:active?"rgba(255,255,255,.1)":hover?"rgba(255,255,255,.07)":"none",
        border:"none",color:active?"#fff":hover?"#fff":"rgba(255,255,255,.75)",
        padding:"8px 13px",borderRadius:7,fontSize:13.5,fontWeight:active?600:500,
        transition:`all .18s ${T.ease}`,position:"relative"}}>
      {children}
      {active && <span style={{position:"absolute",bottom:1,left:13,right:13,height:2,
        borderRadius:2,background:"#5EEAD4"}}/>}
    </button>
  );
};

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function Footer({ setView, hasTutorApp, isTutor, isParent }) {
  return (
    <footer className="spark-footer" style={{background:`linear-gradient(180deg,${T.ink},${T.navyDeep})`,color:"rgba(255,255,255,.6)",padding:"44px 28px 22px",flexShrink:0}}>
      <div className="spark-footer-grid" style={{maxWidth:1100,margin:"0 auto",display:"grid",
        gridTemplateColumns:(isTutor || isParent)?"1.5fr 1fr":"1.5fr repeat(3,1fr)",gap:28,marginBottom:32}}>
        <div>
          <div style={{fontFamily:FD,fontSize:19,fontWeight:700,color:"#fff",marginBottom:8,display:"flex",alignItems:"center",gap:8}}>
            <svg width="22" height="22" viewBox="0 0 512 512" aria-hidden="true">
              <path d="M 340 110 C 340 78, 312 60, 268 60 C 268 60, 190 60, 190 60 C 130 60, 92 96, 92 148 C 92 198, 128 226, 186 236 C 186 236, 296 254, 296 254 C 216 258, 326 276, 326 276 C 384 286, 420 314, 420 364 C 420 416, 382 452, 322 452 C 322 452, 244 452, 244 452 C 200 452, 172 434, 172 402"
                fill="none" stroke="#5EEAD4" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 274 92 L 182 244 L 240 244 L 196 380 L 348 208 L 282 208 Z" fill="#FCD34D"/>
            </svg>
            SPARK
          </div>
          <div style={{fontSize:13,lineHeight:1.65,maxWidth:240}}>
            The exam prep platform built around the CXC syllabus.
          </div>
        </div>
        {[
          // Tutors don't take lessons themselves, so the "Study" column
          // (student subjects) doesn't apply to them.
          ...((isTutor || isParent) ? [] : [["Study", [["Mathematics",()=>setView("lesson")],["Physics (soon)",null],["English A (planned)",null]]]]),
          ...((isTutor || isParent) ? [] : [["Tutors", [
            ["Find a tutor",()=>setView("tutors")],
            ...(hasTutorApp ? [] : [["Submit application to become a tutor",()=>setView("become-tutor")]]),
            ["How it works",()=>setView("how-it-works")]
          ]]]),
          ["Company", [["About SPARK",()=>setView("about")],["Contact us",()=>setView("contact")],["Privacy Policy",()=>setView("privacy")]]],
        ].map(([title, links]) => (
          <div key={title}>
            <div style={{fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",
              color:"rgba(255,255,255,.4)",marginBottom:10}}>{title}</div>
            {links.map(([label, action]) => (
              <div key={label} onClick={action||undefined}
                style={{fontSize:13,marginBottom:6,cursor:action?"pointer":"default",
                  color:"rgba(255,255,255,.6)",transition:"color .15s"}}
                onMouseEnter={e=>{if(action)e.target.style.color="#fff";}}
                onMouseLeave={e=>{e.target.style.color="rgba(255,255,255,.6)";}}>{label}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:16,textAlign:"center",
        fontSize:12,maxWidth:1100,margin:"0 auto"}}>
        © 2026 SPARK. Built for CSEC and CAPE students across the Caribbean.
      </div>
    </footer>
  );
}

// ─── HOME VIEW ───────────────────────────────────────────────────────────────
function HomeView({ setView, liveStats, hasTutorApp, user, profile, tutorApp, isParent }) {
  const [demoAnswer, setDemoAnswer] = useState(null);
  const totalTopics = SYLLABUS_SECTIONS.reduce((a, s) => a + s.topics.length, 0);
  // Tutors don't take lessons or book other tutors themselves, so the
  // student-facing "Start learning free" / "Find a tutor" CTAs are
  // meaningless (and confusing) for a signed-in tutor account.
  const isTutor = !!user && (profile?.role === "tutor" || !!tutorApp);

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      {/* HERO */}
      <div className="home-hero" style={{background:`linear-gradient(150deg,${T.navyDeep} 0%,#1A3A6B 55%,${T.tealDeep} 100%)`,
        color:"#fff",padding:"76px 28px 60px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div className="orb orb-float" style={{width:340,height:340,background:"#5EEAD4",top:-120,left:-80}}/>
        <div className="orb orb-float" style={{width:300,height:300,background:"#FCD34D",bottom:-140,right:-60,animationDelay:"2s",opacity:.35}}/>
        <div className="home-hero-inner spark-home-hero-inner" style={{position:"relative",width:"100%",margin:"0 auto"}}>
        <div className="home-kicker spark-home-hero-badge" style={{display:"inline-block",fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",
          color:"#5EEAD4",marginBottom:16,padding:"6px 14px",borderRadius:99,
          background:"rgba(94,234,212,.1)",border:"1px solid rgba(94,234,212,.25)"}}>Official CXC Syllabus · CSEC & CAPE</div>
        <div className="spark-home-copy-column">
          <h1 className="home-hero-title spark-home-hero-title" style={{fontFamily:FD,fontSize:"clamp(30px,5vw,54px)",fontWeight:800,
            lineHeight:1.1,margin:"0 0 20px",letterSpacing:"-0.01em"}}>
            <span className="spark-home-hero-title-line">The exam prep platform</span>
            <span className="spark-home-hero-title-line">built for <span style={{color:"#FCD34D"}}>the Caribbean</span></span>
          </h1>
          <p className="home-hero-copy spark-home-hero-copy" style={{fontSize:16.5,color:"rgba(255,255,255,.82)",margin:"0 0 30px",lineHeight:1.7}}>
            A lesson for every topic on the CXC syllabus. Original past-paper style questions. Section and final exams. Verified tutors. One platform built around how CXC actually tests.
          </p>
        </div>
        <div className="home-hero-actions spark-home-hero-actions" style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
      		{isTutor ? (
			  <Btn v="amber" onClick={() => setView("dashboard")}
				style={{background:T.amber,fontSize:15,padding:"13px 28px"}}>
				Go to your dashboard →
			  </Btn>
			) : isParent ? null : (
			  <>
				<Btn v="amber" onClick={() => setView("auth")}
				  style={{background:T.amber,fontSize:15,padding:"13px 28px"}}>
				  Start learning free →
				</Btn>
				<Btn v="ghost" onClick={() => setView("tutors")}
				  style={{fontSize:15,padding:"13px 28px"}}>
				  Find a tutor
				</Btn>
			  </>
			)}
        </div>

        {/* Demo question */}
        <div className="hl home-demo-card spark-home-demo-card" style={{background:T.paper,borderRadius:T.rLg,padding:24,maxWidth:400,
          margin:"40px auto 0",textAlign:"left",boxShadow:"0 16px 40px rgba(0,0,0,.22)",
          border:"1px solid rgba(255,255,255,.06)"}}>
          <div style={{fontSize:10,fontWeight:700,color:T.teal,textTransform:"uppercase",
            letterSpacing:"0.07em",marginBottom:9}}>CSEC Mathematics · Algebra · Try it</div>
          <div style={{fontSize:14.5,color:T.ink,marginBottom:14,lineHeight:1.55,fontWeight:500}}>
            Factorise completely: x² − 5x + 4
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[["(x − 1)(x − 4)", true],["(x + 1)(x − 4)", false],
              ["(x − 2)(x − 2)", false],["(x + 1)(x + 4)", false]].map(([opt, correct], i) => (
              <div key={i} onClick={() => !demoAnswer && setDemoAnswer(i)}
                style={{padding:"10px 14px",borderRadius:T.rSm,fontSize:13,
                  cursor:demoAnswer!==null?"default":"pointer",transition:`all .18s ${T.ease}`,
                  border:`1.5px solid ${demoAnswer===null?T.border:correct?T.emerald:demoAnswer===i?T.red:T.border}`,
                  background:demoAnswer===null?"#fff":correct?T.emeraldLight:demoAnswer===i?T.redLight:"#fff",
                  color:demoAnswer===null?T.inkSoft:correct?T.emerald:demoAnswer===i?T.red:T.inkSoft,
                  fontWeight:demoAnswer!==null&&correct?600:400}}>
                {opt}
              </div>
            ))}
          </div>
          {demoAnswer !== null && (
            <div className="fade-in" style={{marginTop:11,padding:"11px 14px",background:T.muted,borderRadius:T.rSm,
              fontSize:13,color:T.inkSoft,lineHeight:1.55}}>
              💡 Find two numbers that multiply to 4 and add to −5: those are −1 and −4. So x² − 5x + 4 = (x − 1)(x − 4).
            </div>
          )}
        </div>

        {/* Live stats */}
        <div className="home-live-stats" style={{display:"flex",justifyContent:"center",gap:44,marginTop:52,
          paddingTop:36,borderTop:"1px solid rgba(255,255,255,.12)",flexWrap:"wrap"}}>
          {[
            ["39%","CSEC Math pass rate, 2025"],
            [totalTopics,"Syllabus topics"],
            [liveStats.questions > 0 ? `${liveStats.questions}+` : "200+","Practice questions"],
            [liveStats.tutors > 0 ? `${liveStats.tutors}` : "6","Verified tutors"],
          ].map(([n, l]) => (
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:FD,fontSize:36,fontWeight:700,color:"#FCD34D",letterSpacing:"-0.01em"}}>{n}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.6)",textTransform:"uppercase",
                letterSpacing:"0.05em",marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Features */}
      <div style={{background:"#fff",borderTop:`1px solid ${T.border}`,flexShrink:0}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"64px 28px"}}>
          <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",
            color:T.teal,marginBottom:10}}>How it works</div>
          <h2 style={{fontFamily:FD,fontSize:"clamp(24px,3.5vw,36px)",fontWeight:700,
            color:T.ink,marginBottom:40,letterSpacing:"-0.01em"}}>
            Built around the actual CXC syllabus
          </h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20}}>
            {[
              ["📖",`${totalTopics} syllabus topics`,"Every specific objective from all 10 sections of the CSEC Mathematics syllabus has its own written lesson.",T.teal,T.tealLight],
              ["✏️","Past-paper style questions","Questions modelled directly on CXC past papers from 2010–2015. Same structure, same difficulty, different numbers.",T.amber,T.amberLight],
              ["🎓","Verified tutors","Vetted, student-rated tutors by subject. See rates, read reviews, book directly.",T.purple,T.purpleLight],
              ["📊","Weak topic detection","Every quiz answer is tracked. The platform flags your weakest topics automatically.",T.emerald,T.emeraldLight],
              ["📝","Section & final exams","After each section, a structured exam. Then a full final paper with Section A, B and C.",T.red,T.redLight],
              ["🧠","Interactive lessons","Lessons include key facts, examples, common errors and solutions for self-checking.",T.teal,T.tealLight],
            ].map(([icon, title, desc, accent, accentBg]) => (
              <div key={title} className="hl"
                style={{background:T.paper,border:`1px solid ${T.border}`,borderRadius:T.rMd,padding:24,
                  boxShadow:T.shadowSm}}>
                <div style={{width:44,height:44,borderRadius:T.rSm,background:accentBg,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,marginBottom:14}}>{icon}</div>
                <div style={{fontFamily:FD,fontSize:17.5,fontWeight:600,color:T.ink,marginBottom:7}}>{title}</div>
                <div style={{fontSize:13.5,color:T.textMuted,lineHeight:1.65}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer setView={setView} hasTutorApp={hasTutorApp} isTutor={!!user && (profile?.role === "tutor" || tutorApp?.status === "approved")} isParent={isParent}/>
    </div>
  );
}

// ─── AUTH VIEW ───────────────────────────────────────────────────────────────
function AuthView({ setView, initialMode = "signup", recoveryMode = false }) {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(getRememberMePreference());
  const [newPassword, setNewPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [resetStage, setResetStage] = useState("email");
  const [err, setErr] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("spark_verification_email");
    if (savedEmail) setEmail(savedEmail);
    if (recoveryMode) {
      const resetEmail = localStorage.getItem("spark_reset_email");
      if (resetEmail) setEmail(resetEmail);
      setMode("forgot");
      setResetStage("password");
      setMessage("Your reset link is verified. Create a new password below.");
    }
  }, [recoveryMode]);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setErr(null); setMessage(null);
    setVerificationSent(false); setShowResendVerification(false); setResetStage("email"); setResetCode("");
  };

  const validatePassword = (value) => {
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(value)) return "Password must contain at least one letter and one number.";
    if (value.length > 72) return "Password must be 72 characters or fewer.";
    return null;
  };

  const submit = async () => {
    setErr(null); setMessage(null); setShowResendVerification(false); setLoading(true);
    try {
      if (mode === "signup") {
        if (role === "tutor") { setView("become-tutor"); return; }
        const passwordError = validatePassword(password);
        if (passwordError) throw new Error(passwordError);
        const cleanEmail = email.trim().toLowerCase();
        if (!cleanEmail) throw new Error("Enter your email address.");
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail, password,
          options: { data: { name: name.trim(), role } }
        });
        if (error) throw error;
        localStorage.setItem("spark_verification_email", cleanEmail);
        setVerificationSent(true);
        setMessage(data.session ? "Account created. Your email is already verified." : "Check your email for the verification link before logging in.");
        if (data.session && data.user?.email_confirmed_at) setView("dashboard");
      } else if (mode === "login") {
        // Apply the user's choice before Supabase creates/persists the session.
        setRememberMePreference(rememberMe);
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
        if (error) throw error;
        if (!data.user?.email_confirmed_at) {
          localStorage.setItem("spark_verification_email", email.trim().toLowerCase());
          await supabase.auth.signOut();
          setVerificationSent(true);
          setShowResendVerification(true);
          setMessage("Please verify your email before logging in.");
          return;
        }
        // Login succeeded with a verified email - any stale email left over
        // from a past signup/verification-pending flow no longer applies.
        localStorage.removeItem("spark_verification_email");
        setView("dashboard");
      }
    } catch (e) {
      // Supabase rejects unverified users at sign-in with an "Email not confirmed"
      // error. Surface the resend action instead of leaving the user at a dead-end.
      const errorMessage = String(e?.message || e?.error_description || "");
      const errorCode = String(e?.code || "");
      if (mode === "login" && /email not confirmed|email_not_confirmed/i.test(errorMessage + " " + errorCode)) {
        const cleanEmail = email.trim().toLowerCase();
        if (cleanEmail) localStorage.setItem("spark_verification_email", cleanEmail);
        setShowResendVerification(true);
        setMessage("Your email hasn't been verified yet. Resend the verification email below.");
      } else {
        setErr(e.message || "Something went wrong. Please try again.");
      }
    }
    finally { setLoading(false); }
  };

  const resendVerification = async () => {
    setErr(null); setMessage(null); setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail) throw new Error("Enter your email address first.");
      const { error } = await supabase.auth.resend({ type: "signup", email: cleanEmail });
      if (error) throw error;
      localStorage.setItem("spark_verification_email", cleanEmail);
      setMessage("Verification email sent again. Check your inbox.");
    } catch (e) { setErr(e.message || "Could not resend the verification email."); }
    finally { setLoading(false); }
  };

  const sendResetCode = async () => {
    setErr(null); setMessage(null); setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail) throw new Error("Enter your email address.");
      // Supabase's recovery email must expose {{ .Token }} so the user can enter
      // the six-digit recovery code on this screen.
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}${process.env.PUBLIC_URL || ""}`
      });
      if (error) throw error;
      localStorage.setItem("spark_reset_email", cleanEmail);
      setResetStage("code");
      setMessage("Check your email for your 6-digit SPARK password reset code.");
    } catch (e) { setErr(e.message || "Could not send the reset code."); }
    finally { setLoading(false); }
  };

  const verifyResetCode = async () => {
    setErr(null); setMessage(null); setLoading(true);
    try {
      const cleanEmail = (email || localStorage.getItem("spark_reset_email") || "").trim().toLowerCase();
      const code = resetCode.trim();
      if (!cleanEmail) throw new Error("Enter your email address.");
      if (!/^\d{6}$/.test(code)) throw new Error("Enter the 6-digit verification code from your email.");
      const { error } = await supabase.auth.verifyOtp({ email: cleanEmail, token: code, type: "recovery" });
      if (error) throw error;
      setResetStage("password");
      setMessage("Code verified. Choose a new password.");
    } catch (e) { setErr(e.message || "That verification code is invalid or expired."); }
    finally { setLoading(false); }
  };

  const updatePassword = async () => {
    setErr(null); setMessage(null); setLoading(true);
    try {
      const passwordError = validatePassword(newPassword);
      if (passwordError) throw new Error(passwordError);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      await supabase.auth.signOut();
      setPassword(""); setNewPassword(""); setResetCode(""); setResetStage("email");
      setMode("login");
      setMessage("Password updated. You can now log in with your new password.");
    } catch (e) { setErr(e.message || "Could not update your password."); }
    finally { setLoading(false); }
  };

  const continueWithGoogle = async () => {
    setErr(null); setMessage(null); setLoading(true);
    try {
      // Apply the same Remember Me choice to Google OAuth. The preference is
      // read by the custom Supabase storage adapter after the OAuth redirect.
      setRememberMePreference(rememberMe);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}${process.env.PUBLIC_URL || ""}` }
      });
      if (error) throw error;
    } catch (e) { setErr(e.message || "Google sign-in is not available right now."); setLoading(false); }
  };

  const verificationScreen = mode !== "forgot" && verificationSent;

  return (
    <div className="spark-auth-shell" style={{flex:1,display:"flex",alignItems:"flex-start",justifyContent:"center",
      padding:"48px 20px",background:T.bg}}>
      <div className="spark-auth-card" style={{background:T.paper,border:`1px solid ${T.borderSoft}`,borderRadius:T.rLg,
        padding:38,width:"100%",maxWidth:420,boxShadow:T.shadowLg,margin:"auto 0"}}>
        {verificationScreen ? (
          <>
            <div style={{fontSize:36,marginBottom:14}}>✉️</div>
            <h2 style={{fontFamily:FD,fontSize:24,fontWeight:700,color:T.ink,margin:"0 0 7px"}}>Check your email</h2>
            <p style={{fontSize:13.5,color:T.textMuted,lineHeight:1.6,marginBottom:18}}>
              We sent a verification link to <strong style={{color:T.ink}}>{email}</strong>. Verify your email before you log in.
            </p>
            {message && <div style={{background:T.tealLight,color:T.tealDark,borderRadius:8,padding:"10px 12px",fontSize:13,marginBottom:12}}>{message}</div>}
            {err && <div style={{color:T.red,fontSize:13,marginBottom:12}}>{err}</div>}
            <Btn onClick={resendVerification} disabled={loading} full>{loading ? "Sending…" : "Resend verification email"}</Btn>
            <button onClick={() => { setVerificationSent(false); setMode("login"); setErr(null); setMessage(null); }}
              style={{width:"100%",marginTop:10,padding:10,border:"none",background:"transparent",color:T.teal,cursor:"pointer",fontFamily:FB,fontWeight:600}}>
              Back to log in
            </button>
          </>
        ) : mode === "forgot" ? (
          <>
            <h2 style={{fontFamily:FD,fontSize:24,fontWeight:700,color:T.ink,margin:"0 0 5px"}}>Reset your password</h2>
            <p style={{fontSize:13.5,color:T.textMuted,lineHeight:1.6,marginBottom:22}}>
              {resetStage === "email" ? "Enter your email and we'll send you a 6-digit verification code." :
               resetStage === "code" ? "Enter the 6-digit code from the email we sent you." : "Create a new password for your SPARK account."}
            </p>
            {resetStage === "email" && <div style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:5}}>Email address</div>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
                style={{width:"100%",padding:"10px 13px",border:`1.5px solid ${T.border}`,borderRadius:7,fontSize:14,color:T.ink,background:T.paper,outline:"none"}} />
            </div>}
            {resetStage === "code" && <>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:5}}>Verification code</div>
                <input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={resetCode} onChange={e=>setResetCode(e.target.value.replace(/\D/g,""))} placeholder="123456"
                  style={{width:"100%",padding:"12px 13px",border:`1.5px solid ${T.border}`,borderRadius:7,fontSize:20,letterSpacing:5,color:T.ink,background:T.paper,outline:"none",textAlign:"center"}} />
              </div>
              <div style={{fontSize:12.5,color:T.textMuted,marginBottom:14}}>Code sent to {email}</div>
            </>}
            {resetStage === "password" && <>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:5}}>New password</div>
                <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="At least 8 characters"
                  style={{width:"100%",padding:"10px 13px",border:`1.5px solid ${T.border}`,borderRadius:7,fontSize:14,color:T.ink,background:T.paper,outline:"none"}} />
              </div>
              <div style={{fontSize:12.5,color:T.textMuted,marginBottom:14}}>Use at least 8 characters, including a letter and a number.</div>
            </>}
            {message && <div style={{background:T.tealLight,color:T.tealDark,borderRadius:8,padding:"10px 12px",fontSize:13,marginBottom:12}}>{message}</div>}
            {err && <div style={{color:T.red,fontSize:13,marginBottom:12}}>{err}</div>}
            <Btn onClick={resetStage === "email" ? sendResetCode : resetStage === "code" ? verifyResetCode : updatePassword} disabled={loading} full>
              {loading ? "Please wait…" : resetStage === "email" ? "Send verification code" : resetStage === "code" ? "Verify code" : "Update password"}
            </Btn>
            {resetStage === "code" && <button onClick={sendResetCode} disabled={loading} style={{width:"100%",marginTop:10,padding:9,border:"none",background:"transparent",color:T.teal,cursor:"pointer",fontFamily:FB,fontSize:13}}>Resend code</button>}
            <button onClick={() => { switchMode("login"); }} style={{width:"100%",marginTop:8,padding:9,border:"none",background:"transparent",color:T.textMuted,cursor:"pointer",fontFamily:FB,fontSize:13}}>Back to log in</button>
          </>
        ) : (
          <>
            <div className="spark-auth-tabs" style={{display:"flex",gap:4,marginBottom:26,background:T.muted,padding:4,borderRadius:T.rSm+2}}>
              {["signup","login"].map(m => (
                <button key={m} onClick={() => switchMode(m)}
                  style={{flex:1,padding:"9px 0",border:"none",borderRadius:T.rSm,cursor:"pointer",fontFamily:FB,fontWeight:600,fontSize:14,
                    transition:`all .2s ${T.ease}`,background:mode===m?T.paper:"transparent",boxShadow:mode===m?T.shadowSm:"none",color:mode===m?T.ink:T.textMuted}}>
                  {m === "signup" ? "Sign up" : "Log in"}
                </button>
              ))}
            </div>
            <h2 style={{fontFamily:FD,fontSize:22,fontWeight:700,color:T.ink,margin:"0 0 4px"}}>{mode === "signup" ? "Create your account" : "Welcome back"}</h2>
            <p style={{fontSize:13.5,color:T.textMuted,marginBottom:22}}>{mode === "signup" ? "Start with Mathematics." : "Log in to continue studying."}</p>
            {mode === "signup" && <>
              <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:8}}>I am a</div>
              <div className="spark-auth-role-row" style={{display:"flex",gap:8,marginBottom:14}}>
                {["student","tutor","parent"].map(r => <button key={r} onClick={() => setRole(r)}
                  style={{flex:1,padding:9,borderRadius:7,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:FB,transition:"all .15s",
                    border:`1.5px solid ${role===r?T.teal:T.border}`,background:role===r?T.tealLight:"transparent",color:role===r?T.tealDark:T.textMuted}}>
                    {r.charAt(0).toUpperCase()+r.slice(1)}
                  </button>)}
              </div>
              {role === "tutor" && <div style={{background:T.amberLight,border:`1px solid ${T.amber}`,borderRadius:8,padding:"10px 13px",marginBottom:12,fontSize:13,color:T.amber}}>Tutors go through an application process. Clicking Continue will take you to the tutor application.</div>}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:5}}>Full name</div>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Shanice Williams"
                  style={{width:"100%",padding:"10px 13px",border:`1.5px solid ${T.border}`,borderRadius:7,fontSize:14,color:T.ink,background:T.paper,outline:"none"}} />
              </div>
            </>}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:5}}>Email address</div>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
                style={{width:"100%",padding:"10px 13px",border:`1.5px solid ${T.border}`,borderRadius:7,fontSize:14,color:T.ink,background:T.paper,outline:"none"}} />
            </div>
            <div style={{marginBottom:8}}>
              <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:5}}>Password</div>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={mode==="signup"?"At least 8 characters":""}
                onKeyDown={e=>{if(e.key==="Enter") submit();}}
                style={{width:"100%",padding:"10px 13px",border:`1.5px solid ${T.border}`,borderRadius:7,fontSize:14,color:T.ink,background:T.paper,outline:"none"}} />
            </div>
            {mode === "login" && (
              <div className="spark-auth-utility-row" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:14}}>
                <label style={{display:"inline-flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:T.inkSoft,userSelect:"none"}}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e=>{
                      const checked = e.target.checked;
                      setRememberMe(checked);
                      setRememberMePreference(checked);
                    }}
                    style={{width:16,height:16,accentColor:T.teal,cursor:"pointer",margin:0}}
                  />
                  <span>Remember Me</span>
                </label>
                <button onClick={() => switchMode("forgot")} style={{border:"none",background:"transparent",color:T.teal,cursor:"pointer",fontFamily:FB,fontSize:13,fontWeight:600,padding:0}}>Forgot your password?</button>
              </div>
            )}
            {err && <div style={{color:T.red,fontSize:13,marginBottom:12}}>{err}</div>}
            {message && <div style={{background:T.tealLight,color:T.tealDark,borderRadius:8,padding:"10px 12px",fontSize:13,marginBottom:12}}>{message}</div>}
            {showResendVerification && mode === "login" && (
              <button onClick={resendVerification} disabled={loading}
                style={{width:"100%",padding:"10px 13px",marginBottom:12,border:`1.5px solid ${T.teal}`,borderRadius:7,background:"transparent",color:T.teal,cursor:loading?"not-allowed":"pointer",fontFamily:FB,fontWeight:600,fontSize:13}}>
                {loading ? "Sending…" : "Resend verification email"}
              </button>
            )}
            <Btn onClick={submit} disabled={loading} full>{loading ? "Please wait…" : mode==="signup" ? role==="tutor" ? "Continue to tutor application →" : "Create account" : "Log in"}</Btn>
            <div style={{display:"flex",alignItems:"center",gap:10,margin:"18px 0",color:T.textMuted,fontSize:12}}><div style={{height:1,background:T.border,flex:1}}/><span>OR</span><div style={{height:1,background:T.border,flex:1}}/></div>
            <button className="spark-google-auth-button" onClick={continueWithGoogle} disabled={loading}
              style={{width:"100%",padding:"10px 13px",border:`1.5px solid ${T.border}`,borderRadius:999,
                background:T.paper,color:T.ink,cursor:loading?"not-allowed":"pointer",fontFamily:FB,fontWeight:600,fontSize:14,
                display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
              <img src={GOOGLE_ICON_B64} alt="" width={18} height={18} style={{flexShrink:0}}/>
              Continue with Google
            </button>
            <p style={{textAlign:"center",fontSize:13,color:T.textMuted,marginTop:14}}>{mode==="signup"?"Already have an account?":"Don't have an account?"}{" "}
              <span style={{color:T.teal,cursor:"pointer",fontWeight:500}} onClick={() => switchMode(mode==="signup"?"login":"signup")}>{mode==="signup"?"Log in":"Sign up"}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// How many consecutive days (ending today or yesterday) the student has
// completed at least one lesson. Replaces the old hardcoded "5 🔥".
function computeStreak(rows) {
  if (!rows || rows.length === 0) return 0;
  const days = new Set(
    rows.map(r => (r.completed_at || r.created_at || "").slice(0, 10)).filter(Boolean)
  );
  if (days.size === 0) return 0;
  const toStr = (d) => d.toISOString().slice(0, 10);
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  if (!days.has(toStr(cursor))) {
    // No activity today yet - the streak is still "alive" if there was
    // activity yesterday, it just hasn't been extended today.
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(toStr(cursor))) return 0;
  }
  let streak = 0;
  while (days.has(toStr(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// A booking is only cancellable up to 1 hour before its scheduled start.
function canCancelBooking(b) {
  if (!b || b.status === "cancelled" || b.status === "declined" || b.confirmation_expired_at) return false;
  if (!b.session_date || !b.start_time) return false;
  const sessionAt = calendarDateTime(b.session_date, b.start_time);
  if (!sessionAt || isNaN(sessionAt.getTime())) return false;
  return sessionAt.getTime() - Date.now() >= BOOKING_CONFIRMATION_CUTOFF_MIN * 60 * 1000;
}

// Derived display status. We keep the booking response state in the database
// and derive time-based UI states consistently across student, tutor and parent views.
// Pending requests close 60 minutes before start; confirmed sessions complete after their end time.
function bookingDisplayStatus(b) {
  if (!b) return "pending";
  if (b.status === "cancelled") return "cancelled";
  if (b.status === "declined") return "declined";

  const baseStatus = b.status === "confirmed" ? "confirmed" : "pending";

  // A booking without a complete scheduled time should keep its real response state.
  if (!b.session_date || !b.start_time) return baseStatus;

  const sessionStart = calendarDateTime(b.session_date, b.start_time);
  if (!sessionStart || isNaN(sessionStart.getTime())) return baseStatus;

  const nowMs = Date.now();

  if (baseStatus === "pending") {
    const confirmationDeadlineMs = sessionStart.getTime() - BOOKING_CONFIRMATION_CUTOFF_MIN * 60 * 1000;
    if (b.confirmation_expired_at || confirmationDeadlineMs <= nowMs) return "expired";
  }

  if (baseStatus === "confirmed") {
    const durationMinutes = Number(b.duration_minutes || 60);
    const sessionEnd = new Date(sessionStart.getTime() + durationMinutes * 60 * 1000);
    if (sessionEnd.getTime() <= nowMs) return "completed";
  }

  return baseStatus;
}

const BOOKING_STATUS_ORDER = { pending: 0, confirmed: 1, completed: 2, expired: 3, declined: 4, cancelled: 5 };
const BOOKING_STATUS_BADGE = {
  pending:   { c: "amber", label: "Pending" },
  confirmed: { c: "green", label: "Confirmed" },
  completed: { c: "teal",  label: "Completed" },
  expired:   { c: "red",   label: "Not confirmed" },
  declined:  { c: "red",   label: "Declined" },
  cancelled: { c: "red",   label: "Cancelled" },
};

// ─── TIME / DURATION HELPERS (shared by the booking modal + dashboard) ──────
// Session lengths a student can pick when booking. Tutors don't pick fixed
// time *slots* - they just say when they're generally free (free-text
// availability) - but a session still needs a length so we know how long it
// blocks the tutor's calendar for conflict-checking.
const SESSION_DURATIONS = [
  { label: "1 hour", mins: 60 },
  { label: "1.5 hours", mins: 90 },
  { label: "2 hours", mins: 120 },
  { label: "2.5 hours", mins: 150 },
  { label: "3 hours", mins: 180 },
];

function timeToMinutes(t) {
  if (!t) return 0;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}
function minutesToTime(mins) {
  const wrapped = ((mins % 1440) + 1440) % 1440;
  return `${String(Math.floor(wrapped / 60)).padStart(2, "0")}:${String(wrapped % 60).padStart(2, "0")}`;
}
function fmtClock(t) {
  const [h, m] = (t || "0:0").split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${ampm}`;
}
// e.g. fmtSessionRange("15:00:00", 90) -> "3:00 PM–4:30 PM"
function fmtSessionRange(startTime, mins) {
  if (!startTime) return "";
  return `${fmtClock(startTime)}–${fmtClock(minutesToTime(timeToMinutes(startTime) + (mins || 60)))}`;
}

// ─── CALENDAR INTEGRATION ───────────────────────────────────────────────

function calendarPad(n) {
  return String(n).padStart(2, "0");
}

// Jamaica does not observe daylight saving time - it's UTC-5 year-round.
// session_date / start_time are stored as Jamaica wall-clock time, so we
// build the Date as the correct UTC instant here rather than letting the
// browser's *own* local timezone reinterpret the raw numbers. Without this,
// a student or tutor viewing SPARK from outside Jamaica (US, Canada, UK,
// etc.) would get a calendar event shifted by their timezone offset.
const JAMAICA_UTC_OFFSET_HOURS = 5;

function calendarDateTime(dateString, timeString) {
  if (!dateString || !timeString) return null;

  const [year, month, day] = String(dateString).split("-").map(Number);
  const [hour, minute] = String(timeString).split(":").map(Number);

  return new Date(
    Date.UTC(
      year,
      month - 1,
      day,
      (hour || 0) + JAMAICA_UTC_OFFSET_HOURS,
      minute || 0,
      0
    )
  );
}

// Formats a Date (already the correct UTC instant) as a UTC calendar
// timestamp with a trailing "Z". This is what both the Google Calendar
// URL param and the ICS format expect for an unambiguous, timezone-safe
// timestamp - every calendar app converts it to the viewer's local time.
function calendarUTCDate(date) {
  return (
    date.getUTCFullYear() +
    calendarPad(date.getUTCMonth() + 1) +
    calendarPad(date.getUTCDate()) +
    "T" +
    calendarPad(date.getUTCHours()) +
    calendarPad(date.getUTCMinutes()) +
    calendarPad(date.getUTCSeconds()) +
    "Z"
  );
}

function calendarGoogleDate(date) {
  return calendarUTCDate(date);
}

function calendarICSDate(date) {
  return calendarUTCDate(date);
}

function calendarEscapeICS(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function getCalendarEventDetails(booking, isTutor, user) {
  const start = calendarDateTime(
    booking.session_date,
    booking.start_time
  );

  if (!start) return null;

  const duration = Number(booking.duration_minutes || 60);

  const end = new Date(start.getTime() + duration * 60 * 1000);

  const otherPerson = isTutor
    ? booking.profiles?.name || "Student"
    : booking.tutors?.name || "Tutor";

  const subject = booking.subject || "Tutoring Session";

  return {
    start,
    end,
    subject,
    otherPerson,
    title: `SPARK Tutoring - ${subject}`,
    description:
      `SPARK Tutoring Session\n\n` +
      `Subject: ${subject}\n` +
      `${isTutor ? "Student" : "Tutor"}: ${otherPerson}\n` +
      `Date: ${bookingDateLabel(booking.session_date)}\n` +
      `Time: ${fmtSessionRange(
        booking.start_time,
        booking.duration_minutes
      )} (Jamaica time)\n\n` +
      `Booked through SPARK.`,
    location: "SPARK Tutoring"
  };
}

function addToGoogleCalendar(booking, isTutor, user) {
  const event = getCalendarEventDetails(booking, isTutor, user);

  if (!event) return;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates:
      `${calendarGoogleDate(event.start)}/` +
      `${calendarGoogleDate(event.end)}`,
    details: event.description,
    location: event.location
  });

  window.open(
    `https://calendar.google.com/calendar/render?${params.toString()}`,
    "_blank",
    "noopener,noreferrer"
  );
}

function addToOutlookCalendar(booking, isTutor, user) {
  const event = getCalendarEventDetails(booking, isTutor, user);

  if (!event) return;

  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    startdt: event.start.toISOString(),
    enddt: event.end.toISOString(),
    body: event.description,
    location: event.location
  });

  window.open(
    `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`,
    "_blank",
    "noopener,noreferrer"
  );
}

function downloadICSCalendar(booking, isTutor, user) {
  const event = getCalendarEventDetails(booking, isTutor, user);

  if (!event) return;

  const now = new Date();

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SPARK Tutoring//Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:spark-${booking.id}@spark`,
    `DTSTAMP:${calendarICSDate(now)}`,
    `DTSTART:${calendarICSDate(event.start)}`,
    `DTEND:${calendarICSDate(event.end)}`,
    `SUMMARY:${calendarEscapeICS(event.title)}`,
    `DESCRIPTION:${calendarEscapeICS(event.description)}`,
    `LOCATION:${calendarEscapeICS(event.location)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob(
    [ics],
    { type: "text/calendar;charset=utf-8" }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `SPARK-${booking.subject || "Session"}.ics`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function AddToCalendar({ booking, isTutor, user }) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState(null);
  const wrapRef = useRef(null);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  const computePos = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMenuPos({ left: r.left, top: r.bottom + 6, width: 210 });
  }, []);

  // Recompute position right before paint so the menu is aligned to the
  // button on first open, even though it renders through a portal.
  useLayoutEffect(() => {
    if (open) computePos();
  }, [open, computePos]);

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e) => {
      const insideButton = wrapRef.current && wrapRef.current.contains(e.target);
      const insideMenu = menuRef.current && menuRef.current.contains(e.target);
      if (!insideButton && !insideMenu) setOpen(false);
    };
    // Close (rather than let it drift out of alignment) if the page
    // scrolls or resizes while the menu is open - the button may be
    // inside a scrollable list.
    const handleReflow = () => setOpen(false);

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("scroll", handleReflow, true);
    window.addEventListener("resize", handleReflow);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", handleReflow, true);
      window.removeEventListener("resize", handleReflow);
    };
  }, [open]);

  const status = bookingDisplayStatus(booking);

  if (status !== "confirmed") return null;

  return (
    <div ref={wrapRef} style={{position:"relative",display:"inline-block"}}>
      <button
        ref={btnRef}
        onClick={() => setOpen(v => !v)}
        style={{
          background:T.teal,
          color:"#fff",
          border:"none",
          borderRadius:7,
          padding:"7px 12px",
          fontSize:12,
          fontWeight:700,
          cursor:"pointer",
          fontFamily:FB
        }}
      >
        ＋ Add to calendar
      </button>

      {open && menuPos && createPortal(
        <div
          ref={menuRef}
          className="spark-calendar-menu"
          style={{
            position:"fixed",
            left:menuPos.left,
            top:menuPos.top,
            width:menuPos.width,
            background:"#fff",
            border:`1px solid ${T.border}`,
            borderRadius:9,
            boxShadow:"0 8px 24px rgba(0,0,0,.12)",
            padding:6,
            zIndex:9999
          }}
        >
          <button
            onClick={() => {
              addToGoogleCalendar(booking, isTutor, user);
              setOpen(false);
            }}
            style={{
              width:"100%",
              display:"flex",
              alignItems:"center",
              gap:10,
              padding:"9px 12px",
              background:"none",
              border:"none",
              textAlign:"left",
              borderRadius:6,
              cursor:"pointer",
              fontFamily:FB,
              fontSize:13,
              color:T.ink
            }}
          >
            <img src={GOOGLE_CALENDAR_ICON_B64} alt="" width={18} height={18} style={{flexShrink:0}}/>
            Google Calendar
          </button>

          <button
            onClick={() => {
              addToOutlookCalendar(booking, isTutor, user);
              setOpen(false);
            }}
            style={{
              width:"100%",
              display:"flex",
              alignItems:"center",
              gap:10,
              padding:"9px 12px",
              background:"none",
              border:"none",
              textAlign:"left",
              borderRadius:6,
              cursor:"pointer",
              fontFamily:FB,
              fontSize:13,
              color:T.ink
            }}
          >
            <img src={OUTLOOK_ICON_B64} alt="" width={18} height={18} style={{flexShrink:0}}/>
            Outlook
          </button>

          <button
            onClick={() => {
              downloadICSCalendar(booking, isTutor, user);
              setOpen(false);
            }}
            style={{
              width:"100%",
              display:"flex",
              alignItems:"center",
              gap:10,
              padding:"9px 12px",
              background:"none",
              border:"none",
              textAlign:"left",
              borderRadius:6,
              cursor:"pointer",
              fontFamily:FB,
              fontSize:13,
              color:T.ink
            }}
          >
            <img src={APPLE_CALENDAR_ICON_B64} alt="" width={18} height={18} style={{flexShrink:0}}/>
            Apple Calendar
          </button>

          <button
            onClick={() => {
              downloadICSCalendar(booking, isTutor, user);
              setOpen(false);
            }}
            style={{
              width:"100%",
              display:"flex",
              alignItems:"center",
              gap:10,
              padding:"9px 12px",
              background:"none",
              border:"none",
              textAlign:"left",
              borderRadius:6,
              cursor:"pointer",
              fontFamily:FB,
              fontSize:13,
              color:T.ink
            }}
          >
            <span style={{width:18,display:"inline-flex",justifyContent:"center",flexShrink:0,fontSize:14,opacity:.65}}>⬇</span>
            Download .ics
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
// Do two [start, start+duration) session windows on the same day overlap?
function sessionsOverlap(startA, minsA, startB, minsB) {
  const aStart = timeToMinutes(startA), aEnd = aStart + (minsA || 60);
  const bStart = timeToMinutes(startB), bEnd = bStart + (minsB || 60);
  return aStart < bEnd && bStart < aEnd;
}

// Real day-streak from lesson_progress rows (each with a completed_at
// timestamp): counts consecutive calendar days with at least one completed
// topic, walking backwards from today. If nothing was completed today yet,
// the streak still counts as "alive" as long as yesterday has activity -
// it just won't include today until something is completed.
function computeStudyStreak(rows) {
  if (!rows || rows.length === 0) return 0;
  const days = new Set(
    rows.map(r => r.completed_at ? r.completed_at.slice(0, 10) : null).filter(Boolean)
  );
  const cursor = new Date();
  const todayKey = cursor.toISOString().slice(0, 10);
  if (!days.has(todayKey)) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function calendarDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function parseCalendarDate(key) {
  const [y, m, d] = String(key || "").split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}
function calendarMonthLabel(date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
function calendarDayLabel(key) {
  return parseCalendarDate(key).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

// Compact, readable date for booking/session cards.
function bookingDateLabel(key) {
  if (!key) return "";
  return parseCalendarDate(key).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function calendarMonthCells(monthDate) {
  const first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  return Array.from({length: 42}, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function SessionCalendar({ bookings, isTutor, user, studentReviews = [], onAccept, onDecline, onCancel, onReview }) {
  const todayKey = calendarDateKey(new Date());
  const [monthDate, setMonthDate] = useState(() => {
    const firstBooking = bookings.find(b => b.session_date);
    return firstBooking ? parseCalendarDate(firstBooking.session_date) : new Date();
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const firstFuture = bookings.find(b => b.session_date && b.session_date >= todayKey);
    return firstFuture?.session_date || todayKey;
  });

  const cells = calendarMonthCells(monthDate);
  const eventsByDay = bookings.reduce((acc, b) => {
    if (!b.session_date) return acc;
    (acc[b.session_date] ||= []).push(b);
    return acc;
  }, {});
  Object.values(eventsByDay).forEach(list => list.sort((a,b) => (a.start_time || "").localeCompare(b.start_time || "")));
  const selectedEvents = eventsByDay[selectedDate] || [];

  const moveMonth = (delta) => {
    const next = new Date(monthDate.getFullYear(), monthDate.getMonth() + delta, 1);
    setMonthDate(next);
    const monthKey = calendarDateKey(next).slice(0,7);
    const firstEventDay = Object.keys(eventsByDay).filter(k => k.startsWith(monthKey)).sort()[0];
    setSelectedDate(firstEventDay || calendarDateKey(next));
  };
  const goToday = () => {
    const now = new Date();
    setMonthDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(todayKey);
  };
  const displayName = (b) => isTutor ? (b.profiles?.name || "Student") : (b.tutors?.name || "Tutor");

  return (
    <div className="session-calendar-shell fade-in">
      <div className="session-calendar-card">
        <div className="session-calendar-toolbar">
          <div className="session-calendar-month">
            <button className="calendar-icon-btn" aria-label="Previous month" onClick={() => moveMonth(-1)}>‹</button>
            <button className="calendar-icon-btn" aria-label="Next month" onClick={() => moveMonth(1)}>›</button>
            <div className="session-calendar-month-title">{calendarMonthLabel(monthDate)}</div>
            <button className="calendar-today-btn" onClick={goToday}>Today</button>
          </div>
        </div>
        <div className="calendar-grid">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => <div className="calendar-weekday" key={day}>{day}</div>)}
          {cells.map((day, i) => {
            const key = calendarDateKey(day);
            const events = eventsByDay[key] || [];
            const outside = day.getMonth() !== monthDate.getMonth();
            const isToday = key === todayKey;
            const isSelected = key === selectedDate;
            return (
              <div key={key + i}
                className={`calendar-day${outside ? " is-outside" : ""}${isToday ? " is-today" : ""}`}
                style={isSelected ? {boxShadow:`inset 0 0 0 2px ${T.tealLight}`} : undefined}
                onClick={() => setSelectedDate(key)}>
                <div className="calendar-day-number">{day.getDate()}</div>
                {events.slice(0,3).map(b => {
                  const status = bookingDisplayStatus(b);
                  return (
                    <button key={b.id} className={`calendar-event ${status}`} onClick={(e) => { e.stopPropagation(); setSelectedDate(key); }}>
                      <div className="calendar-event-title">{b.subject || "Session"}</div>
                      <div className="calendar-event-time">{b.start_time ? fmtSessionRange(b.start_time, b.duration_minutes) : "Time not set"}</div>
                    </button>
                  );
                })}
                {events.length > 3 && <div className="calendar-more">+{events.length - 3} more</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="session-calendar-card calendar-agenda">
        <div className="calendar-agenda-kicker">Selected day</div>
        <div className="calendar-agenda-title">{calendarDayLabel(selectedDate)}</div>
        {selectedEvents.length === 0 ? (
          <div className="calendar-agenda-empty">No sessions scheduled for this day.<br />Select another date to see your sessions.</div>
        ) : selectedEvents.map(b => {
          const status = bookingDisplayStatus(b);
          const cancellable = canCancelBooking(b) && status !== "completed";
          const alreadyReviewed = !isTutor && studentReviews.some(r => r.booking_id === b.id);
          return (
            <div className="calendar-agenda-event" key={b.id}>
              <div className="calendar-agenda-event-head">
                <div>
                  <div className="calendar-agenda-event-name">{b.subject || "Tutoring session"}</div>
                  <div className="calendar-agenda-meta">{displayName(b)}</div>
                </div>
                <Badge c={BOOKING_STATUS_BADGE[status]?.c || "teal"}>{BOOKING_STATUS_BADGE[status]?.label || status}</Badge>
              </div>
              <div className="calendar-agenda-meta">{b.start_time ? fmtSessionRange(b.start_time, b.duration_minutes) : "Time not set"}<br />J${Number(b.rate_jmd || 0).toLocaleString()}/hr</div>
              {(status === "cancelled" || status === "declined") && b.cancellation_reason && <div className="calendar-agenda-meta" style={{marginTop:7,fontStyle:"italic"}}>{b.cancellation_reason}</div>}
              <div className="calendar-agenda-actions">
                {status === "confirmed" && <AddToCalendar booking={b} isTutor={isTutor} user={user} />}
                {isTutor && status === "pending" && <>
                  <button className="calendar-booking-action-btn" onClick={() => onDecline(b)} style={{background:"none",border:`1.5px solid ${T.red}`,color:T.red,borderRadius:7,padding:"6px 10px",fontSize:11,fontWeight:700}}>Decline</button>
                  <button className="calendar-booking-action-btn" onClick={() => onAccept(b)} style={{background:T.teal,border:`1.5px solid ${T.teal}`,color:"#fff",borderRadius:7,padding:"6px 10px",fontSize:11,fontWeight:700}}>Accept</button>
                </>}
                {isTutor && status === "confirmed" && canCancelBooking(b) && <button onClick={() => onCancel(b)} style={{background:"none",border:`1.5px solid ${T.red}`,color:T.red,borderRadius:7,padding:"6px 10px",fontSize:11,fontWeight:700}}>Cancel session</button>}
                {!isTutor && cancellable && <button onClick={() => onCancel(b)} style={{background:"none",border:`1.5px solid ${T.red}`,color:T.red,borderRadius:7,padding:"6px 10px",fontSize:11,fontWeight:700}}>Cancel booking</button>}
                {!isTutor && status === "completed" && !alreadyReviewed && <button onClick={() => onReview(b)} style={{background:T.teal,border:`1.5px solid ${T.teal}`,color:"#fff",borderRadius:7,padding:"6px 10px",fontSize:11,fontWeight:700}}>Leave a review</button>}
                {!isTutor && status === "completed" && alreadyReviewed && <span style={{fontSize:11,color:T.emerald,fontWeight:700,padding:"6px 0"}}>✓ Review submitted</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


const PROFILE_PHOTO_MAX_BYTES = 5 * 1024 * 1024;
const PROFILE_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function parseAvatarStoragePath(storedPath) {
  const value = String(storedPath || "").replace(/^\/+/, "");
  const slash = value.indexOf("/");
  if (slash <= 0) return null;
  const bucket = value.slice(0, slash);
  const objectPath = value.slice(slash + 1);
  if (!["profile-photos", "tutor-avatars"].includes(bucket) || !objectPath) return null;
  return { bucket, objectPath };
}

function ProfileAvatar({ path: storedPath, name, size = 36, fallbackBackground, className = "" }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let active = true;
    setSrc("");

    const parsed = parseAvatarStoragePath(storedPath);
    if (!parsed) return () => { active = false; };

    if (parsed.bucket === "tutor-avatars") {
      const { data } = supabase.storage.from(parsed.bucket).getPublicUrl(parsed.objectPath);
      if (active) setSrc(data?.publicUrl || "");
      return () => { active = false; };
    }

    supabase.storage.from(parsed.bucket).createSignedUrl(parsed.objectPath, 3600)
      .then(({ data, error }) => {
        if (!active || error) return;
        setSrc(data?.signedUrl || "");
      });

    return () => { active = false; };
  }, [storedPath]);

  const px = Number(size) || 36;
  const baseStyle = {
    width: px,
    height: px,
    borderRadius: "50%",
    flexShrink: 0,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: fallbackBackground || `linear-gradient(135deg,${T.teal},${T.tealDark})`,
    color: "#fff",
    fontWeight: 700,
    fontSize: Math.max(12, Math.round(px * 0.32)),
    boxShadow: T.shadowSm,
  };

  if (src) {
    return (
      <img
        className={className}
        src={src}
        alt={name ? `${name}'s profile` : "Profile"}
        style={{ ...baseStyle, objectFit: "cover", display: "block" }}
      />
    );
  }

  return (
    <div className={className} style={baseStyle} aria-label={name ? `${name}'s profile` : "Profile"}>
      {getInitials(name || "?")}
    </div>
  );
}

function ProfilePhotoEditor({
  user,
  profile,
  isTutorProfile = false,
  disabled = false,
  showToast,
  onProfileUpdated,
  onTutorUpdated,
  size = 38,
  showActions = false,
}) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [localPath, setLocalPath] = useState(profile?.avatar_path || "");

  useEffect(() => {
    setLocalPath(profile?.avatar_path || "");
  }, [profile?.avatar_path]);

  const choosePhoto = () => {
    if (!busy && !disabled) inputRef.current?.click();
  };

  const uploadPhoto = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !user?.id || busy || disabled) return;

    if (!PROFILE_PHOTO_TYPES.has(file.type)) {
      showToast("Use a JPG, PNG or WebP image.", "error");
      return;
    }
    if (file.size > PROFILE_PHOTO_MAX_BYTES) {
      showToast("Profile photos must be 5 MB or smaller.", "error");
      return;
    }

    setBusy(true);
    const oldParsed = parseAvatarStoragePath(localPath);
    const bucket = isTutorProfile ? "tutor-avatars" : "profile-photos";
    const objectPath = `${user.id}/avatar-${Date.now()}`;
    const storedPath = `${bucket}/${objectPath}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(objectPath, file, {
          cacheControl: "3600",
          contentType: file.type,
          upsert: false,
        });
      if (uploadError) throw uploadError;

      const { error: pathError } = await supabase.rpc("set_my_avatar_path", {
        p_avatar_path: storedPath,
      });
      if (pathError) {
        await supabase.storage.from(bucket).remove([objectPath]).catch(() => {});
        throw pathError;
      }

      setLocalPath(storedPath);
      onProfileUpdated?.({ avatar_path: storedPath });
      onTutorUpdated?.(storedPath);

      if (
        oldParsed &&
        oldParsed.objectPath.startsWith(`${user.id}/`) &&
        (oldParsed.bucket === "profile-photos" || oldParsed.bucket === "tutor-avatars")
      ) {
        supabase.storage.from(oldParsed.bucket).remove([oldParsed.objectPath]).catch(() => {});
      }

      showToast("Profile photo updated.");
    } catch (error) {
      console.error("Profile photo upload failed:", error);
      showToast(error?.message || "We couldn't update your profile photo.", "error");
    } finally {
      setBusy(false);
    }
  };

  const removePhoto = async () => {
    if (!localPath || !user?.id || busy || disabled) return;
    setBusy(true);

    const oldParsed = parseAvatarStoragePath(localPath);

    try {
      const { error } = await supabase.rpc("set_my_avatar_path", {
        p_avatar_path: null,
      });
      if (error) throw error;

      setLocalPath("");
      onProfileUpdated?.({ avatar_path: null });
      onTutorUpdated?.(null);

      if (
        oldParsed &&
        oldParsed.objectPath.startsWith(`${user.id}/`) &&
        (oldParsed.bucket === "profile-photos" || oldParsed.bucket === "tutor-avatars")
      ) {
        supabase.storage.from(oldParsed.bucket).remove([oldParsed.objectPath]).catch(() => {});
      }

      showToast("Profile photo removed.");
    } catch (error) {
      console.error("Profile photo removal failed:", error);
      showToast(error?.message || "We couldn't remove your profile photo.", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`profile-photo-editor ${showActions ? "profile-photo-editor-actions" : "profile-photo-editor-compact"}`} style={{ display:"flex", alignItems:"center", gap: showActions ? 14 : 0 }}>
      <div className="profile-photo-shell" style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
        <button
          type="button"
          className="profile-photo-trigger"
          onClick={choosePhoto}
          disabled={busy || disabled}
          title={disabled ? "Profile photo is loading" : localPath ? "Change profile photo" : "Add profile photo"}
          aria-label={localPath ? "Change profile photo" : "Add profile photo"}
          style={{
            padding:0,
            border:"none",
            background:"transparent",
            borderRadius:"50%",
            cursor:busy || disabled ? "default" : "pointer",
            opacity:busy ? .6 : 1,
            display:"block",
          }}
        >
          <ProfileAvatar path={localPath} name={profile?.name} size={size} />
          {!disabled && (
            <span className="profile-photo-camera" style={{
              position:"absolute",
              right:-2,
              bottom:-2,
              width:20,
              height:20,
              borderRadius:"50%",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              background:T.teal,
              color:"#fff",
              border:"2px solid #fff",
              fontSize:10,
              lineHeight:1,
              pointerEvents:"none",
            }}>📷</span>
          )}
        </button>

        {!showActions && localPath && !disabled && (
          <button
            type="button"
            className="profile-photo-remove"
            onClick={removePhoto}
            disabled={busy}
            title="Remove profile photo"
            aria-label="Remove profile photo"
            style={{
              position:"absolute",
              top:-5,
              right:-5,
              width:18,
              height:18,
              padding:0,
              borderRadius:"50%",
              border:"2px solid #fff",
              background:T.ink,
              color:"#fff",
              fontSize:11,
              lineHeight:1,
              cursor:busy ? "default" : "pointer",
            }}
          >×</button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={uploadPhoto}
          style={{ display:"none" }}
        />
      </div>

      {showActions && (
        <div>
          <div style={{fontSize:13,fontWeight:600,color:T.ink,marginBottom:3}}>Profile photo</div>
          <div style={{fontSize:11.5,color:T.textMuted,marginBottom:8}}>Optional. JPG, PNG or WebP, up to 5 MB.</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button
              type="button"
              onClick={choosePhoto}
              disabled={busy || disabled}
              style={{
                border:`1px solid ${T.border}`,
                background:T.paper,
                color:T.tealDark,
                borderRadius:7,
                padding:"7px 11px",
                fontFamily:FB,
                fontSize:12,
                fontWeight:600,
                cursor:busy || disabled ? "default" : "pointer",
              }}
            >
              {busy ? "Uploading..." : localPath ? "Change photo" : "Add photo"}
            </button>
            {localPath && (
              <button
                type="button"
                onClick={removePhoto}
                disabled={busy || disabled}
                style={{
                  border:"none",
                  background:"transparent",
                  color:T.red,
                  padding:"7px 5px",
                  fontFamily:FB,
                  fontSize:12,
                  cursor:busy || disabled ? "default" : "pointer",
                }}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardView({ user, profile, setView, showToast, hasTutorApp, tutorApp, tutorAppLoaded = true, onProfileUpdated }) {
  // profile.role is only set once, at signup - it's never flipped to "tutor"
  // when someone who signed up as a student later applies and gets approved.
  // Falling back to an approved tutor-application status keeps this accurate
  // for those accounts too (this was why approved tutors' bookings/tabs
  // weren't showing up here).
  const isTutor = profile?.role === "tutor" || tutorApp?.status === "approved";
  const isStudent = profile?.role === "student";
  // Student profiles can later become approved tutors without profile.role
  // changing. Wait for that tutor lookup before canonicalizing a nested
  // dashboard route, otherwise #/dashboard/sessions could briefly be mistaken
  // for the student's #/dashboard/bookings route during refresh.
  const dashboardRoleResolved = profile?.role === "tutor" || tutorAppLoaded;
  const normalizeDashboardSection = useCallback((section) => {
    if (isTutor) {
      if (section === "bookings") return "sessions";
      return ["overview", "sessions", "students", "reviews", "earnings", "profile"].includes(section) ? section : "overview";
    }
    if (section === "sessions") return "bookings";
    return ["overview", "subjects", "progress", "bookings"].includes(section) ? section : "overview";
  }, [isTutor]);
  const [notificationTarget, setNotificationTarget] = useState(() => {
    try {
      const raw = sessionStorage.getItem("spark_dashboard_notification_target");
      if (!raw) return null;
      sessionStorage.removeItem("spark_dashboard_notification_target");
      return JSON.parse(raw);
    } catch (error) {
      return null;
    }
  });
  // Keep the raw route until the tutor lookup is resolved. Once we know which
  // dashboard variant this account owns, the effects below normalize aliases
  // (sessions <-> bookings) and keep the URL canonical.
  const [sec, setSec] = useState(() => notificationTarget?.section || dashboardSectionFromBrowserHash());
  const [bookings, setBookings] = useState([]);
  const [bookingsLoaded, setBookingsLoaded] = useState(false);
  const [bookingsLoadError, setBookingsLoadError] = useState(false);
  const [progressData, setProgressData] = useState([]);
  const [examAttempts, setExamAttempts] = useState([]);
  const [tutorRow, setTutorRow] = useState(null);
  const [tutorRowLoaded, setTutorRowLoaded] = useState(false);
  const [tutorReviews, setTutorReviews] = useState([]);
  const [studentReviews, setStudentReviews] = useState([]);
  const [reviewTarget, setReviewTarget] = useState(null);
  const [parentLinks, setParentLinks] = useState([]);
  const [familyCode, setFamilyCode] = useState("");
  const [profileForm, setProfileForm] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [bookingSort, setBookingSort] = useState("date");
  const [bookingView, setBookingView] = useState("list");
  const [cancelTarget, setCancelTarget] = useState(null);
  const [declineTarget, setDeclineTarget] = useState(null);
  const [tutorCancelTarget, setTutorCancelTarget] = useState(null);
  const totalTopics = SYLLABUS_SECTIONS.reduce((a, s) => a + s.topics.length, 0);

  const setDashboardSection = useCallback((section, options = {}) => {
    if (!dashboardRoleResolved) {
      setSec(section);
      return;
    }
    const normalized = normalizeDashboardSection(section);
    setSec(normalized);
    writeDashboardSectionToBrowserHash(normalized, options);
  }, [dashboardRoleResolved, normalizeDashboardSection]);

  // Resolve the URL on first mount/refresh once we know whether this account
  // owns the student or tutor dashboard. This is what makes refreshing
  // #/dashboard/bookings or #/dashboard/sessions reopen the exact tab.
  useEffect(() => {
    if (!dashboardRoleResolved || notificationTarget?.section) return;
    const requested = dashboardSectionFromBrowserHash();
    const normalized = normalizeDashboardSection(requested);
    setSec(normalized);
    if (normalized !== requested) {
      writeDashboardSectionToBrowserHash(normalized, { replace: true });
    }
  }, [dashboardRoleResolved, notificationTarget?.section, normalizeDashboardSection]);

  // Browser Back/Forward and route changes triggered elsewhere in SPARK must
  // update the visible dashboard tab too, not only the top-level App view.
  useEffect(() => {
    if (!dashboardRoleResolved) return undefined;
    const syncDashboardSectionFromUrl = () => {
      if (viewFromBrowserHash() !== "dashboard") return;
      const requested = dashboardSectionFromBrowserHash();
      const normalized = normalizeDashboardSection(requested);
      setSec(normalized);
      if (normalized !== requested) {
        writeDashboardSectionToBrowserHash(normalized, { replace: true });
      }
    };

    window.addEventListener("popstate", syncDashboardSectionFromUrl);
    window.addEventListener("hashchange", syncDashboardSectionFromUrl);
    window.addEventListener("spark:routechange", syncDashboardSectionFromUrl);
    return () => {
      window.removeEventListener("popstate", syncDashboardSectionFromUrl);
      window.removeEventListener("hashchange", syncDashboardSectionFromUrl);
      window.removeEventListener("spark:routechange", syncDashboardSectionFromUrl);
    };
  }, [dashboardRoleResolved, normalizeDashboardSection]);

  useEffect(() => {
    const handleNotificationTarget = (event) => {
      const target = event?.detail;
      if (!target?.section) return;
      try { sessionStorage.removeItem("spark_dashboard_notification_target"); } catch (error) {}
      setNotificationTarget(target);
      setSec(target.section);
      if (target.bookingId) setBookingView("list");
    };

    window.addEventListener("spark:dashboard-notification-target", handleNotificationTarget);
    return () => window.removeEventListener("spark:dashboard-notification-target", handleNotificationTarget);
  }, []);

  useEffect(() => {
    if (!notificationTarget?.section || !dashboardRoleResolved) return;
    setDashboardSection(notificationTarget.section, { replace: true });
    if (notificationTarget.bookingId) setBookingView("list");
  }, [notificationTarget, dashboardRoleResolved, setDashboardSection]);

  useEffect(() => {
    const bookingId = notificationTarget?.bookingId;
    if (!bookingId || bookingView !== "list") return undefined;
    if (!bookings.some(booking => String(booking.id) === String(bookingId))) return undefined;

    const scrollTimer = window.setTimeout(() => {
      const target = document.querySelector(".notification-booking-target");
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);

    const clearTimer = window.setTimeout(() => setNotificationTarget(null), 3200);
    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(clearTimer);
    };
  }, [notificationTarget, bookings, bookingView]);

  useEffect(() => {
    if (!notificationTarget?.anchor || notificationTarget.bookingId) return undefined;
    const scrollTimer = window.setTimeout(() => {
      const selector = notificationTarget.attemptKey
        ? `[data-notification-attempt="${notificationTarget.attemptKey}"]`
        : `[data-notification-anchor="${notificationTarget.anchor}"]`;
      const target = document.querySelector(selector) || document.querySelector(`[data-notification-anchor="${notificationTarget.anchor}"]`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
    const clearTimer = window.setTimeout(() => setNotificationTarget(null), 3200);
    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(clearTimer);
    };
  }, [notificationTarget, sec, parentLinks, examAttempts]);

  // Student data (lessons/progress) - tutors don't have this.
  const loadStudentBookings = useCallback(async () => {
    if (!user?.id) return;
    const { data, error } = await supabase.from("bookings")
      .select("*,tutors(name,subjects,initials,avatar_color)")
      .eq("student_id", user.id)
      .order("session_date", {ascending:false});

    if (error) {
      console.error("Failed to load student bookings:", error);
      setBookingsLoadError(true);
      setBookingsLoaded(true);
      return;
    }

    setBookings(data || []);
    setBookingsLoadError(false);
    setBookingsLoaded(true);
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id || isTutor) return;
    loadStudentBookings();
    supabase.from("reviews").select("*").eq("student_id", user.id)
      .then(({data}) => setStudentReviews(data || []));
    supabase.from("student_family_codes").select("code").eq("student_id", user.id).maybeSingle()
      .then(({data}) => setFamilyCode(data?.code || ""));
    supabase.from("parent_student_links").select("*").eq("student_id", user.id).order("created_at", {ascending:false})
      .then(({data}) => setParentLinks(data || []));
    supabase.from("lesson_progress").select("*").eq("user_id", user.id).eq("completed", true)
      .then(({data}) => setProgressData(data || []));
    supabase.from("practice_exam_attempts")
      .select("id,attempt_key,paper_type,score,max_score,percent,completed_at,duration_seconds,timed_out,answered_count,total_questions,correct_count")
      .eq("user_id", user.id).order("completed_at", {ascending:false}).limit(20)
      .then(({data}) => setExamAttempts(data || []));

    // Family requests are realtime: if a parent re-sends a request after a
    // previous decline, the student should see the new pending request
    // without having to sign out, refresh, or revisit the dashboard.
    const familyChannel = supabase
      .channel(`student-family-links-${user.id}`)
      .on("postgres_changes", {
        event: "*", schema: "public", table: "parent_student_links",
        filter: `student_id=eq.${user.id}`,
      }, (payload) => {
        if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          supabase.from("parent_student_links").select("*")
            .eq("student_id", user.id).order("created_at", {ascending:false})
            .then(({data}) => setParentLinks(data || []));
          if (payload.new?.status === "pending") {
            showToast("A parent or guardian sent a new connection request.");
          }
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(familyChannel); };
  }, [user?.id, isTutor, loadStudentBookings, showToast]);

  // Tutor's own row in the tutors table (needed to look up bookings/reviews and to edit profile).
  useEffect(() => {
    if (!user?.id || !isTutor) { setTutorRowLoaded(true); return; }
    setTutorRowLoaded(false);
    // maybeSingle (not single) - single() errors out and silently leaves
    // tutorRow null if this ever returns 0 rows, which would make a real
    // tutor's bookings never load (the bookings effect below is gated on
    // tutorRow?.id). Logging the error surfaces that case instead of it
    // looking like "no bookings".
    supabase.from("tutors").select("*").eq("user_id", user.id).maybeSingle()
      .then(({data, error}) => {
        if (error) {
          console.error("Failed to load tutor row:", error);
          setBookingsLoadError(true);
          setBookingsLoaded(true);
        } else if (!data) {
          console.error("Tutor account is approved but no tutor row was returned.");
          setBookingsLoadError(true);
          setBookingsLoaded(true);
        }
        setTutorRow(data);
        if (data) setProfileForm({ bio: data.bio || "", subjects: data.subjects || [], rate: data.rate_jmd || 1500, availability: data.availability || "" });
        setTutorRowLoaded(true);
      });
  }, [user?.id, isTutor]);

  // Tutor's bookings - students who've booked sessions with them.
  const syncTutorCompletedSessions = useCallback(async () => {
    if (!tutorRow?.id) return;
    const { error } = await supabase.rpc("sync_tutor_completed_sessions", { p_tutor_id: tutorRow.id });
    if (error) console.error("Failed to sync completed tutor sessions:", error);
  }, [tutorRow?.id]);

  const loadTutorBookings = useCallback(async () => {
    if (!tutorRow?.id) return;
    await syncTutorCompletedSessions();
    // `bookings` has two FKs to `profiles` (student_id and cancelled_by), so
    // the embed must name which one - plain `profiles(name)` is ambiguous
    // and PostgREST rejects the whole query (this was silently emptying
    // the tutor's bookings list before, since the error was never checked).
    const { data, error } = await supabase.from("bookings")
      .select("*,profiles!bookings_student_id_fkey(name)")
      .eq("tutor_id", tutorRow.id)
      .order("session_date", {ascending:false});

    if (error) {
      console.error("Failed to load tutor bookings:", error);
      setBookingsLoadError(true);
      setBookingsLoaded(true);
      return;
    }

    setBookings(data || []);
    setBookingsLoadError(false);
    setBookingsLoaded(true);
  }, [tutorRow?.id, syncTutorCompletedSessions]);

  useEffect(() => {
    if (!isTutor || !tutorRow?.id) return;
    loadTutorBookings();
  }, [isTutor, tutorRow?.id, loadTutorBookings]);

  // Tutor's reviews.
  useEffect(() => {
    if (!isTutor || !tutorRow?.id) return;
    supabase.from("reviews").select("*").eq("tutor_id", tutorRow.id)
      .order("created_at", {ascending:false})
      .then(({data}) => setTutorReviews(data || []));
  }, [isTutor, tutorRow?.id]);

  // Instant cancellation alerts for tutors - listens for new notification
  // rows created for this tutor (e.g. by a student cancelling a booking)
  // and surfaces them immediately via realtime, without a page refresh.
  useEffect(() => {
    if (!isTutor || !tutorRow?.id) return;
    const channel = supabase
      .channel(`tutor-notifications-${tutorRow.id}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "notifications",
        filter: `tutor_id=eq.${tutorRow.id}`,
      }, (payload) => {
        showToast(payload.new?.message || "You have a new notification.");
        loadTutorBookings();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isTutor, tutorRow?.id, showToast]);

  // Instant alerts for students - a tutor accepting, declining, or
  // cancelling shows up right away without a page refresh, same as the
  // tutor-side channel above.
  useEffect(() => {
    if (isTutor || !user?.id) return;
    const channel = supabase
      .channel(`student-notifications-${user.id}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "notifications",
        filter: `student_id=eq.${user.id}`,
      }, (payload) => {
        showToast(payload.new?.message || "You have a new notification.");
        loadStudentBookings();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isTutor, user?.id, showToast, loadStudentBookings]);

  const respondToParentLink = async (linkId, status) => {
    const {error} = await supabase.rpc("respond_parent_link", {p_link_id: linkId, p_status: status});
    if (error) { showToast(error.message || "Couldn't update the family request."); return; }
    setParentLinks(prev => prev.map(l => l.id === linkId ? {...l, status} : l));
    showToast(status === "approved" ? "Parent connection approved." : "Request declined.");
  };

  const cancelBooking = async (booking, reason) => {
    if (!reason || !reason.trim()) { showToast("Please give a reason for cancelling."); return; }
    if (!canCancelBooking(booking)) {
      showToast("This session starts too soon to cancel. Please contact your tutor directly.");
      return;
    }
    const { error } = await supabase.rpc("cancel_booking_as_student", {
      p_booking_id: booking.id,
      p_reason: reason.trim(),
    });
    if (error) {
      console.error("Failed to cancel student booking:", error);
      showToast({ type: "error", message: friendlyErrorMessage(error, "We couldn't cancel this booking. Please try again.") });
      return;
    }
    showToast("Booking cancelled. Your tutor has been notified.");
    setCancelTarget(null);
    loadStudentBookings();
  };

  const acceptBooking = async (booking) => {
    if (bookingDisplayStatus(booking) !== "pending") {
      showToast("This booking request has closed. Sessions must be confirmed at least 60 minutes before the start time.");
      loadTutorBookings();
      return;
    }
    const { error } = await supabase.rpc("respond_to_booking", {
      p_booking_id: booking.id,
      p_action: "confirm",
      p_reason: null,
    });
    if (error) {
      console.error("Failed to confirm booking:", error);
      showToast({ type: "error", message: friendlyErrorMessage(error, "We couldn't confirm this booking. Please try again.") });
      return;
    }
    showToast("Session confirmed.");
    loadTutorBookings();
  };

  const declineBooking = async (booking, reason) => {
    if (!reason || !reason.trim()) { showToast("Please give a reason for declining."); return; }
    const { error } = await supabase.rpc("respond_to_booking", {
      p_booking_id: booking.id,
      p_action: "decline",
      p_reason: reason.trim(),
    });
    if (error) {
      console.error("Failed to decline booking:", error);
      showToast({ type: "error", message: friendlyErrorMessage(error, "We couldn't decline this booking. Please try again.") });
      return;
    }
    showToast("Booking declined.");
    setDeclineTarget(null);
    loadTutorBookings();
  };

  const tutorCancelBooking = async (booking, reason) => {
    if (!reason || !reason.trim()) { showToast("Please give a reason for cancelling."); return; }
    const { error } = await supabase.rpc("respond_to_booking", {
      p_booking_id: booking.id,
      p_action: "cancel",
      p_reason: reason.trim(),
    });
    if (error) {
      console.error("Failed to cancel tutor booking:", error);
      showToast({ type: "error", message: friendlyErrorMessage(error, "We couldn't cancel this booking. Please try again.") });
      return;
    }
    showToast("Booking cancelled. The student has been notified.");
    setTutorCancelTarget(null);
    loadTutorBookings();
  };

  const saveProfile = async () => {
    if (!profileForm.bio || profileForm.subjects.length === 0) {
      showToast("Bio and at least one subject are required."); return;
    }
    setSavingProfile(true);
    try {
      const subjectKeys = [...new Set(profileForm.subjects.map(s => SUBJECT_KEY_MAP[s] || s.toLowerCase()))];
      const { error } = await supabase.from("tutors").update({
        bio: profileForm.bio, subjects: profileForm.subjects, subject_keys: subjectKeys,
        rate_jmd: profileForm.rate, availability: profileForm.availability,
      }).eq("id", tutorRow.id);
      if (error) throw error;
      setTutorRow(r => ({ ...r, bio: profileForm.bio, subjects: profileForm.subjects,
        subject_keys: subjectKeys, rate_jmd: profileForm.rate, availability: profileForm.availability }));
      showToast("Profile updated.");
    } catch (e) {
      showToast(e.message || "Couldn't save changes. Please try again.");
    } finally {
      setSavingProfile(false);
    }
  };

  const toggleProfileSubject = (s) => {
    setProfileForm(f => ({ ...f,
      subjects: f.subjects.includes(s) ? f.subjects.filter(x => x !== s) : [...f.subjects, s] }));
  };

  const done = progressData.length;
  const streak = computeStudyStreak(progressData);
  const now = new Date();
  const upcomingSessions = bookings.filter(b => { const status = bookingDisplayStatus(b); return status === "pending" || status === "confirmed"; });
  // A session becomes completed only after its actual end time has passed. The database
  // sync function stamps completed_at, so earnings are not based on date-only guesses.
  const completedSessions = bookings.filter(b => !!b.completed_at && b.status === "confirmed");
  const totalEarned = completedSessions.reduce((sum, b) => sum + Number(b.rate_jmd || 0), 0);
  const pendingPayout = completedSessions.filter(b => (b.payout_status || "pending") !== "paid").reduce((sum, b) => sum + Number(b.rate_jmd || 0), 0);
  const paidEarnings = completedSessions.filter(b => b.payout_status === "paid").reduce((sum, b) => sum + Number(b.rate_jmd || 0), 0);
  const monthKey = now.toLocaleDateString("en-CA", {timeZone:"America/Jamaica"}).slice(0,7);
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const weekKey = weekStart.toLocaleDateString("en-CA", {timeZone:"America/Jamaica"});
  const earningsThisMonth = completedSessions.filter(b => String(b.session_date || "").startsWith(monthKey)).reduce((sum,b)=>sum+Number(b.rate_jmd||0),0);
  const earningsThisWeek = completedSessions.filter(b => String(b.session_date || "") >= weekKey).reduce((sum,b)=>sum+Number(b.rate_jmd||0),0);
  const earningsBySubject = completedSessions.reduce((acc,b)=>{ acc[b.subject || "Other"]=(acc[b.subject || "Other"]||0)+Number(b.rate_jmd||0); return acc; },{});
  const avgRating = tutorReviews.length
    ? (tutorReviews.reduce((s, r) => s + r.rating, 0) / tutorReviews.length).toFixed(1)
    : null;
  const uniqueStudents = Object.values(
    bookings.reduce((acc, b) => {
      const key = b.student_id;
      if (!acc[key]) acc[key] = { id: key, name: b.profiles?.name || "Student", subjects: new Set(), sessions: 0 };
      acc[key].subjects.add(b.subject);
      acc[key].sessions += 1;
      return acc;
    }, {})
  );

  // Final dashboard-level guard. Never choose the student/tutor tab set
  // while the account role is still unresolved. On a direct refresh of the
  // bookings/sessions route, also wait for the first bookings query so a
  // temporary empty array can never flash a false empty-state CTA.
  const activeBookingSectionLoading =
    (sec === "bookings" || sec === "sessions") && !bookingsLoaded;

  if (!profile || !dashboardRoleResolved || activeBookingSectionLoading) {
    return (
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",
        minHeight:"55vh",background:T.bg,fontFamily:FB,color:T.textMuted}}>
        Loading your dashboard...
      </div>
    );
  }

  const navItems = isTutor ? [
    {k:"overview",l:"📊 Overview"},
    {k:"sessions",l:"📅 My sessions"},
    {k:"students",l:"🎓 My students"},
    {k:"reviews",l:"⭐ Reviews"},
    {k:"earnings",l:"💰 Earnings"},
    {k:"profile",l:"👤 My profile"},
  ] : [
    {k:"overview",l:"📊 Overview"},
    {k:"subjects",l:"📚 My subjects"},
    {k:"progress",l:"📈 Progress"},
    {k:"bookings",l:"📅 My bookings"},
  ];

  return (
    <div style={{display:"grid",gridTemplateColumns:"228px 1fr",flex:1}} className="dash-layout">
      <div style={{background:T.paper,borderRight:`1px solid ${T.border}`,padding:"18px 12px",
        display:"flex",flexDirection:"column",gap:2}}
        className="dash-sidebar">
        <div className="dash-profile-card" style={{padding:"10px 12px 16px",borderBottom:`1px solid ${T.borderSoft}`,marginBottom:10,
          display:"flex",alignItems:"center",gap:10}}>
          <ProfilePhotoEditor
            user={user}
            profile={profile}
            isTutorProfile={isTutor && !!tutorRow}
            disabled={isTutor && !tutorRowLoaded}
            showToast={showToast}
            onProfileUpdated={onProfileUpdated}
            onTutorUpdated={avatarPath => setTutorRow(row => row ? {...row, avatar_path: avatarPath} : row)}
            size={38}
          />
          <div style={{minWidth:0}}>
            <div style={{fontWeight:700,color:T.ink,fontSize:13.5,overflow:"hidden",
              textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{profile?.name}</div>
            <div style={{fontSize:11,color:T.textMuted,textTransform:"capitalize"}}>{profile?.role}</div>
          </div>
        </div>
        {navItems.map(item => (
          <div className="dash-nav-item" key={item.k} onClick={() => setDashboardSection(item.k)}
            style={{padding:"10px 14px",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",
              gap:8,borderRadius:T.rSm,
              color:sec===item.k?T.tealDark:T.textMuted,background:sec===item.k?T.tealLight:"transparent",
              fontWeight:sec===item.k?600:500,transition:`all .18s ${T.ease}`}}
            onMouseEnter={e=>{if(sec!==item.k)e.currentTarget.style.background=T.muted;}}
            onMouseLeave={e=>{if(sec!==item.k)e.currentTarget.style.background="transparent";}}>
            {item.l}
          </div>
        ))}
        {!isTutor && (
          <>
            <div className="dash-nav-divider" style={{height:1,background:T.borderSoft,margin:"10px 6px"}}/>
            <div className="dash-nav-item dash-secondary-item" onClick={() => setView("lesson")}
              style={{padding:"10px 14px",fontSize:14,cursor:"pointer",color:T.textMuted,
                borderRadius:T.rSm,transition:`all .18s ${T.ease}`}}
              onMouseEnter={e=>e.currentTarget.style.background=T.muted}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              📖 Study
            </div>
            <div className="dash-nav-item dash-secondary-item" onClick={() => setView("tutors")}
              style={{padding:"10px 14px",fontSize:14,cursor:"pointer",color:T.textMuted,
                borderRadius:T.rSm,transition:`all .18s ${T.ease}`}}
              onMouseEnter={e=>e.currentTarget.style.background=T.muted}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              🎓 Find a tutor
            </div>
          </>
        )}
        {!isStudent && !hasTutorApp && (
          <div className="dash-nav-item dash-secondary-item" onClick={() => setView("become-tutor")}
            style={{padding:"10px 14px",fontSize:14,cursor:"pointer",color:T.teal,fontWeight:600,
              borderRadius:T.rSm,transition:`all .18s ${T.ease}`,marginTop:!isTutor?0:10}}
            onMouseEnter={e=>e.currentTarget.style.background=T.tealLight}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            🧑‍🏫 Submit application to become a tutor
          </div>
        )}
      </div>

      <div className="app-scroll-panel" style={{padding:28,background:T.bg,overflowY:"auto"}}>
        {isTutor && tutorRowLoaded && !tutorRow ? (
          // A "tutor" account with no application on file has nothing else
          // useful to do here - every other tab would just be empty. Show
          // one clear, unmissable way forward instead of a broken dashboard.
          <Card style={{textAlign:"center",padding:48,maxWidth:520,margin:"40px auto"}}>
            <div style={{fontSize:36,marginBottom:14}}>🧑‍🏫</div>
            <div style={{fontFamily:FD,fontSize:20,color:T.ink,marginBottom:8,fontWeight:700}}>
              Finish setting up your tutor account
            </div>
            <p style={{color:T.textMuted,fontSize:14,marginBottom:22,lineHeight:1.6}}>
              We don't have an application on file for you yet, so there's nothing to show here. Submit your
              application - it only takes a few minutes - and we'll review it within 3 business days.
            </p>
            <Btn onClick={() => setView("become-tutor")}>Submit application to become a tutor →</Btn>
          </Card>
        ) : (
        <>
        {sec === "overview" && isTutor && (
          <>
            <h1 style={{fontFamily:FD,fontSize:24,fontWeight:700,color:T.ink,margin:"0 0 4px"}}>
              Good {new Date().getHours()<12?"morning":new Date().getHours()<17?"afternoon":"evening"}, {profile?.name?.split(" ")[0]}.
            </h1>
            <p style={{color:T.textMuted,fontSize:14,marginBottom:24}}>
              {tutorRow && !tutorRow.verified ? "Your application is under review." : "Here's what's coming up."}
            </p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",
              gap:14,marginBottom:24}}>
              {[["Upcoming sessions",upcomingSessions.length,T.teal,T.tealLight],
                ["Total students",uniqueStudents.length,T.purple,T.purpleLight],
                ["Sessions booked",bookings.length,T.amber,T.amberLight],
                ["Status",tutorRow?.verified ? "Verified ✓" : "Pending",T.emerald,T.emeraldLight]].map(([label,val,accent,accentBg]) => (
                <Card key={label} style={{padding:18,borderTop:`3px solid ${accent}`}}>
                  <div style={{fontFamily:FD,fontSize:24,fontWeight:700,color:T.ink}}>{val}</div>
                  <div style={{fontSize:11,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.04em",marginTop:3}}>
                    {label}
                  </div>
                </Card>
              ))}
            </div>
            <Card>
              <div style={{fontFamily:FD,fontSize:17,fontWeight:600,color:T.ink,marginBottom:14}}>
                Upcoming sessions
              </div>
              {upcomingSessions.length === 0 ? (
                <div style={{fontSize:14,color:T.textMuted}}>No upcoming sessions booked yet.</div>
              ) : upcomingSessions.slice(0,5).map(b => (
                <div key={b.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"10px 0",borderBottom:`1px solid ${T.border}`}}>
                  <div>
                    <div style={{fontWeight:600,color:T.ink,fontSize:14}}>{b.profiles?.name || "Student"}</div>
                    <div style={{fontSize:12,color:T.textMuted}}>{b.subject} · {b.session_date}</div>
                  </div>
                  <Badge c={BOOKING_STATUS_BADGE[bookingDisplayStatus(b)].c}>
                    {BOOKING_STATUS_BADGE[bookingDisplayStatus(b)].label}
                  </Badge>
                </div>
              ))}
            </Card>
          </>
        )}

        {sec === "overview" && !isTutor && (
          <>
            <h1 style={{fontFamily:FD,fontSize:24,fontWeight:700,color:T.ink,margin:"0 0 4px"}}>
              Good {new Date().getHours()<12?"morning":new Date().getHours()<17?"afternoon":"evening"}, {profile?.name?.split(" ")[0]}.
            </h1>
            <p style={{color:T.textMuted,fontSize:14,marginBottom:24}}>Keep that momentum going.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",
              gap:14,marginBottom:24}}>
              {[["Topics done",done,T.teal],["Syllabus covered",done>0?`${Math.round((done/totalTopics)*100)}%`:"0%",T.purple],
                ["Sessions booked",bookings.length,T.amber],["Day streak",streak>0?`${streak} 🔥`:"0",T.emerald]].map(([label,val,accent]) => (
                <Card key={label} style={{padding:18,borderTop:`3px solid ${accent}`}}>
                  <div style={{fontFamily:FD,fontSize:26,fontWeight:700,color:T.ink}}>{val}</div>
                  <div style={{fontSize:11,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.04em",marginTop:3}}>
                    {label}
                  </div>
                </Card>
              ))}
            </div>
            <Card style={{marginBottom:20}}>
              <div style={{fontFamily:FD,fontSize:17,fontWeight:600,color:T.ink,marginBottom:10}}>
                CSEC Mathematics
              </div>
              <ProgressBar value={done} max={totalTopics} style={{marginBottom:6}}/>
              <div style={{fontSize:12,color:T.textMuted,marginBottom:14}}>
                {done} of {totalTopics} topics complete · {SYLLABUS_SECTIONS.length} sections
              </div>
              <Btn onClick={() => setView("lesson")}>Continue studying →</Btn>
            </Card>
            {parentLinks.filter(l => l.status === "pending").length > 0 && (
              <Card className="family-request-card notification-anchor-card" data-notification-anchor="family-request" style={{marginBottom:20}}>
                <div className="family-request-icon">👨‍👩‍👧</div>
                <div style={{flex:1}}>
                  <div className="section-kicker">FAMILY CONNECTION</div>
                  <div style={{fontFamily:FD,fontSize:17,fontWeight:700,color:T.ink,margin:"3px 0 5px"}}>A parent wants to connect</div>
                  <p style={{fontSize:13,color:T.textMuted,lineHeight:1.5,margin:"0 0 12px"}}>Approve this only if you recognize the parent or guardian.</p>
                  {parentLinks.filter(l=>l.status==="pending").map(link => (
                    <div key={link.id} className="family-request-actions">
                      <button className="cp-btn cp-btn-secondary" onClick={()=>respondToParentLink(link.id,"declined")}>Decline</button>
                      <button className="cp-btn cp-btn-primary" onClick={()=>respondToParentLink(link.id,"approved")}>Approve parent</button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            {familyCode && (
              <Card className="family-code-card" style={{marginBottom:20}}>
                <div>
                  <div className="section-kicker">YOUR FAMILY CODE</div>
                  <div style={{fontFamily:FD,fontSize:17,fontWeight:700,color:T.ink,margin:"3px 0 5px"}}>Share this with a parent or guardian</div>
                  <p style={{fontSize:13,color:T.textMuted,lineHeight:1.5,margin:0}}>They can use it to request access to your learning progress. You stay in control and approve the connection.</p>
                </div>
                <div className="family-code-value">{familyCode}</div>
              </Card>
            )}
          </>
        )}

        {sec === "sessions" && isTutor && (
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:20}}>
              <div>
                <h1 style={{fontFamily:FD,fontSize:22,fontWeight:700,color:T.ink,margin:0}}>My sessions</h1>
                <p style={{fontSize:13,color:T.textMuted,margin:"4px 0 0"}}>Manage upcoming tutoring sessions at a glance.</p>
              </div>
              <div className="calendar-view-switch" aria-label="Session view">
                <button className={bookingView === "list" ? "active" : ""} onClick={() => setBookingView("list")}>☷ List</button>
                <button className={bookingView === "calendar" ? "active" : ""} onClick={() => setBookingView("calendar")}>▦ Calendar</button>
              </div>
            </div>
            {bookingsLoadError ? (
              <Card style={{textAlign:"center",padding:40}}><div style={{fontSize:32,marginBottom:12}}>!</div><div style={{fontFamily:FD,fontSize:18,color:T.ink,marginBottom:8}}>Couldn't load your sessions</div><p style={{color:T.textMuted,fontSize:14}}>Refresh the page to try again. If the problem continues, please contact support.</p></Card>
            ) : bookings.length === 0 ? (
              <Card style={{textAlign:"center",padding:40}}><div style={{fontSize:32,marginBottom:12}}>📅</div><div style={{fontFamily:FD,fontSize:18,color:T.ink,marginBottom:8}}>No sessions booked yet</div><p style={{color:T.textMuted,fontSize:14}}>Sessions students book with you will show up here.</p></Card>
            ) : bookingView === "calendar" ? (
              <SessionCalendar bookings={bookings} isTutor={true} user={user} onAccept={acceptBooking} onDecline={setDeclineTarget} onCancel={setTutorCancelTarget} onReview={() => {}} />
            ) : bookings.map(b => {
              const dispStatus = bookingDisplayStatus(b);
              return (
              <Card key={b.id} className={String(notificationTarget?.bookingId || "") === String(b.id) ? "notification-booking-target" : ""} style={{marginBottom:14}}>
                <div className="booking-list-row" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:14}}>
                  <div style={{minWidth:0}}>
                    <div style={{fontWeight:600,color:T.ink,fontSize:15}}>{b.profiles?.name || "Student"}</div>
                    <div style={{fontSize:13,color:T.textMuted,marginTop:2}}>{b.subject} · {bookingDateLabel(b.session_date)}{b.start_time ? ` · ${fmtSessionRange(b.start_time, b.duration_minutes)}` : ""}</div>
                    <div style={{fontSize:13,color:T.textMuted}}>J${b.rate_jmd?.toLocaleString()}/hr</div>
                    {dispStatus === "declined" && b.cancellation_reason && <div style={{fontSize:12,color:T.textMuted,marginTop:6,fontStyle:"italic"}}>You declined - {b.cancellation_reason}</div>}
                    {dispStatus === "cancelled" && b.cancellation_reason && <div style={{fontSize:12,color:T.textMuted,marginTop:6,fontStyle:"italic"}}>{b.cancelled_by === user.id ? "You cancelled" : "Cancelled by student"} - {b.cancellation_reason}</div>}
                  </div>
                  <div className="booking-list-actions" style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
                    <Badge c={BOOKING_STATUS_BADGE[dispStatus].c}>{BOOKING_STATUS_BADGE[dispStatus].label}</Badge>
                    {dispStatus === "pending" && <div className="booking-pending-actions" style={{display:"flex",gap:8}}><button className="booking-pending-btn booking-pending-decline" onClick={() => setDeclineTarget(b)} style={{background:"none",border:`1.5px solid ${T.red}`,color:T.red,borderRadius:7,padding:"5px 11px",fontSize:12,cursor:"pointer",fontFamily:FB}}>Decline</button><button className="booking-pending-btn booking-pending-accept" onClick={() => acceptBooking(b)} style={{background:T.teal,border:"none",color:"#fff",borderRadius:7,padding:"5px 11px",fontSize:12,cursor:"pointer",fontFamily:FB,fontWeight:600}}>Accept</button></div>}
                    {dispStatus === "confirmed" && <AddToCalendar booking={b} isTutor={true} user={user} />}
                    {dispStatus === "confirmed" && canCancelBooking(b) && <button onClick={() => setTutorCancelTarget(b)} style={{background:"none",border:`1.5px solid ${T.red}`,color:T.red,borderRadius:7,padding:"5px 11px",fontSize:12,cursor:"pointer",fontFamily:FB}}>Cancel session</button>}
                  </div>
                </div>
              </Card>
              );
            })}
          </>
        )}

        {sec === "students" && isTutor && (
          <section className="tutor-students-view">
            <div className="tutor-students-heading">
              <h1 style={{fontFamily:FD,fontSize:22,fontWeight:700,color:T.ink,marginBottom:20}}>My students</h1>
              {uniqueStudents.length > 0 && (
                <span className="tutor-students-mobile-count">
                  {uniqueStudents.length} student{uniqueStudents.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            {uniqueStudents.length === 0 ? (
              <Card style={{textAlign:"center",padding:40}}>
                <div style={{fontSize:32,marginBottom:12}}>🎓</div>
                <div style={{fontFamily:FD,fontSize:18,color:T.ink,marginBottom:8}}>No students yet</div>
                <p style={{color:T.textMuted,fontSize:14}}>Students who book sessions with you will show up here.</p>
              </Card>
            ) : (
              <div className="tutor-students-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
                {uniqueStudents.map(s => {
                  const initials = String(s.name || "Student")
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map(part => part[0] || "")
                    .join("")
                    .toUpperCase();
                  return (
                    <Card key={s.id} className="tutor-student-card">
                      <div className="tutor-student-card-inner">
                        <div className="tutor-student-avatar" aria-hidden="true">{initials || "S"}</div>
                        <div className="tutor-student-info">
                          <div className="tutor-student-name" style={{fontWeight:600,color:T.ink,fontSize:15,marginBottom:4}}>{s.name}</div>
                          <div className="tutor-student-subjects" style={{fontSize:12,color:T.textMuted,marginBottom:8}}>
                            {[...s.subjects].join(", ")}
                          </div>
                        </div>
                        <div className="tutor-student-session-count">
                          <Badge c="teal">{s.sessions} session{s.sessions !== 1 ? "s" : ""}</Badge>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {sec === "reviews" && isTutor && (
          <>
            <h1 style={{fontFamily:FD,fontSize:22,fontWeight:700,color:T.ink,marginBottom:4}}>Reviews</h1>
            <p style={{color:T.textMuted,fontSize:14,marginBottom:20}}>
              {avgRating ? `★ ${avgRating} average from ${tutorReviews.length} review${tutorReviews.length !== 1 ? "s" : ""}` : "No reviews yet."}
            </p>
            {tutorReviews.length === 0 ? (
              <Card style={{textAlign:"center",padding:40}}>
                <div style={{fontSize:32,marginBottom:12}}>⭐</div>
                <div style={{fontFamily:FD,fontSize:18,color:T.ink,marginBottom:8}}>No reviews yet</div>
                <p style={{color:T.textMuted,fontSize:14}}>Reviews from students appear here after completed sessions.</p>
              </Card>
            ) : tutorReviews.map((r, i) => (
              <Card key={r.id || i} style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontWeight:600,fontSize:14,color:T.ink}}>Verified student</span>
                  <span style={{color:"#FBBF24"}}>{"★".repeat(r.rating)}</span>
                </div>
                <div style={{fontSize:13.5,color:T.inkSoft,lineHeight:1.55}}>"{r.body}"</div>
              </Card>
            ))}
          </>
        )}

        {sec === "earnings" && isTutor && (
          <>
            <h1 style={{fontFamily:FD,fontSize:22,fontWeight:700,color:T.ink,marginBottom:4}}>Earnings</h1>
            <p style={{fontSize:13,color:T.textMuted,marginBottom:20}}>Your earnings are based on sessions that have actually finished, using the rate saved on each booking.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:14,marginBottom:20}}>
              {[
                ["J$"+totalEarned.toLocaleString(),"Total earned"],
                ["J$"+earningsThisMonth.toLocaleString(),"This month"],
                ["J$"+earningsThisWeek.toLocaleString(),"This week"],
                [String(completedSessions.length),"Sessions completed"],
                ["J$"+pendingPayout.toLocaleString(),"Pending payout"],
                ["J$"+(tutorRow?.rate_jmd || 0).toLocaleString(),"Current rate/hr"],
              ].map(([value,label]) => (
                <Card key={label} style={{padding:16}}>
                  <div style={{fontFamily:FD,fontSize:23,fontWeight:700,color:T.ink}}>{value}</div>
                  <div style={{fontSize:11,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.04em",marginTop:3}}>{label}</div>
                </Card>
              ))}
            </div>

            <div className="dash-responsive-split" style={{display:"grid",gridTemplateColumns:"minmax(0,2fr) minmax(220px,1fr)",gap:16,alignItems:"start"}}>
              <Card>
                <div style={{fontFamily:FD,fontSize:17,fontWeight:600,color:T.ink,marginBottom:14}}>Session history</div>
                {completedSessions.length === 0 ? (
                  <div style={{padding:"22px 0",fontSize:14,color:T.textMuted}}>No completed sessions yet. Once a confirmed session's end time passes, it will appear here automatically.</div>
                ) : completedSessions.slice().sort((a,b)=>String(b.session_date).localeCompare(String(a.session_date))).map(b => (
                  <div key={b.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,padding:"12px 0",borderBottom:`1px solid ${T.border}`}}>
                    <div style={{minWidth:0}}>
                      <div style={{fontWeight:600,color:T.ink,fontSize:14}}>{b.profiles?.name || "Student"}</div>
                      <div style={{fontSize:12,color:T.textMuted}}>{b.subject} · {bookingDateLabel(b.session_date)} · {b.duration_minutes || 60} min</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontWeight:700,color:T.ink,fontSize:14}}>J${Number(b.rate_jmd || 0).toLocaleString()}</div>
                      <div style={{fontSize:11,color:b.payout_status === "paid" ? T.teal : T.textMuted}}>{b.payout_status === "paid" ? "Paid" : "Pending payout"}</div>
                    </div>
                  </div>
                ))}
              </Card>

              <Card>
                <div style={{fontFamily:FD,fontSize:17,fontWeight:600,color:T.ink,marginBottom:14}}>By subject</div>
                {Object.keys(earningsBySubject).length === 0 ? (
                  <div style={{fontSize:13,color:T.textMuted}}>No earnings to break down yet.</div>
                ) : Object.entries(earningsBySubject).sort((a,b)=>b[1]-a[1]).map(([subject,amount]) => (
                  <div key={subject} style={{display:"flex",justifyContent:"space-between",gap:12,padding:"9px 0",borderBottom:`1px solid ${T.border}`}}>
                    <span style={{fontSize:13,color:T.inkSoft}}>{subject}</span>
                    <strong style={{fontSize:13,color:T.ink}}>J${amount.toLocaleString()}</strong>
                  </div>
                ))}
                <div style={{marginTop:14,paddingTop:12,borderTop:`1px solid ${T.border}`,fontSize:12,color:T.textMuted}}>Paid so far: <strong style={{color:T.ink}}>J${paidEarnings.toLocaleString()}</strong></div>
              </Card>
            </div>
          </>
        )}

        {sec === "profile" && isTutor && profileForm && (
          <>
            <h1 style={{fontFamily:FD,fontSize:22,fontWeight:700,color:T.ink,marginBottom:4}}>My profile</h1>
            <p style={{color:T.textMuted,fontSize:14,marginBottom:20}}>This is what students see on the Tutors page.</p>
            <Card style={{maxWidth:580}}>
              <div style={{marginBottom:22,paddingBottom:20,borderBottom:`1px solid ${T.borderSoft}`}}>
                <ProfilePhotoEditor
                  user={user}
                  profile={profile}
                  isTutorProfile={true}
                  disabled={!tutorRow}
                  showToast={showToast}
                  onProfileUpdated={onProfileUpdated}
                  onTutorUpdated={avatarPath => setTutorRow(row => row ? {...row, avatar_path: avatarPath} : row)}
                  size={84}
                  showActions
                />
              </div>
              <TextareaField label="Your tutor bio" value={profileForm.bio}
                onChange={v => setProfileForm(f => ({...f, bio: v}))} rows={5} required
                placeholder="Tell students about your teaching background, your approach, and what you specialise in." />
              <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:8}}>
                Subjects you tutor<span style={{color:T.red}}> *</span>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
                {ALL_SUBJECTS.map(s => (
                  <button key={s} onClick={() => toggleProfileSubject(s)}
                    style={{padding:"8px 14px",borderRadius:99,fontSize:13,cursor:"pointer",
                      fontFamily:FB,transition:"all .15s",
                      border:`1.5px solid ${profileForm.subjects.includes(s) ? T.teal : T.border}`,
                      background:profileForm.subjects.includes(s) ? T.tealLight : "transparent",
                      color:profileForm.subjects.includes(s) ? T.tealDark : T.textMuted,
                      fontWeight:profileForm.subjects.includes(s) ? 600 : 400}}>
                    {s}
                  </button>
                ))}
              </div>
              <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:8}}>Your hourly rate (J$)</div>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
                <input type="range" min={800} max={5000} step={100} value={profileForm.rate}
                  onChange={e => setProfileForm(f => ({...f, rate: parseInt(e.target.value)}))}
                  style={{flex:1,accentColor:T.teal}} />
                <div style={{fontFamily:FD,fontSize:20,fontWeight:700,color:T.ink,minWidth:110,textAlign:"right"}}>
                  J${profileForm.rate.toLocaleString()}/hr
                </div>
              </div>
              <TextareaField label="Typical availability" value={profileForm.availability}
                onChange={v => setProfileForm(f => ({...f, availability: v}))} rows={3}
                placeholder="e.g. Weekday afternoons 3–8pm, Saturday mornings." />
              <Btn onClick={saveProfile} disabled={savingProfile}>
                {savingProfile ? "Saving…" : "Save changes"}
              </Btn>
            </Card>
          </>
        )}

        {sec === "subjects" && (
          <>
            <h1 style={{fontFamily:FD,fontSize:22,fontWeight:700,color:T.ink,marginBottom:20}}>My subjects</h1>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
              <Card className="hl" onClick={() => setView("lesson")} style={{cursor:"pointer"}}>
                <div style={{fontFamily:FD,fontSize:18,fontWeight:600,color:T.ink,marginBottom:4}}>CSEC Mathematics</div>
                <div style={{fontSize:12,color:T.textMuted,marginBottom:12}}>
                  {SYLLABUS_SECTIONS.length} sections · {totalTopics} topics · 39% regional pass rate
                </div>
                <ProgressBar value={done} max={totalTopics}/>
                <div style={{fontSize:11,color:T.textMuted,marginTop:5,marginBottom:14}}>
                  {done} of {totalTopics} topics done
                </div>
                <Btn style={{fontSize:12,padding:"7px 14px"}}>Open subject →</Btn>
              </Card>
              <Card style={{opacity:.6}}>
                <div style={{fontFamily:FD,fontSize:18,fontWeight:600,color:T.ink,marginBottom:4}}>CSEC Physics</div>
                <div style={{fontSize:12,color:T.textMuted,marginBottom:12}}>Coming soon</div>
                <Badge c="teal">Planned</Badge>
              </Card>
            </div>
          </>
        )}

        {sec === "progress" && (
          <div data-notification-anchor="student-progress">
            <h1 style={{fontFamily:FD,fontSize:22,fontWeight:700,color:T.ink,marginBottom:20}}>My progress</h1>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:24}}>
              <Card><div style={{fontFamily:FD,fontSize:30,fontWeight:700,color:T.ink}}>{done}</div>
                <div style={{fontSize:12,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.04em"}}>Topics completed</div></Card>
              <Card><div style={{fontFamily:FD,fontSize:30,fontWeight:700,color:T.teal}}>
                {done>0?Math.round((done/totalTopics)*100):0}%</div>
                <div style={{fontSize:12,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.04em"}}>Syllabus covered</div></Card>
            </div>
            <Card style={{marginBottom:20}}>
              <div style={{fontFamily:FD,fontSize:17,fontWeight:600,color:T.ink,marginBottom:5}}>Paper 1 and Paper 2 results</div>
              <div style={{fontSize:12,color:T.textMuted,marginBottom:14}}>Your latest full-paper examination results.</div>
              {examAttempts.length ? examAttempts.slice(0,8).map(attempt => {
                const percent = Math.round(Number(attempt.percent || 0));
                const performance = getExamPerformanceStatus(percent);
                const isTarget = notificationTarget?.attemptKey && notificationTarget.attemptKey === attempt.attempt_key;
                return <div key={attempt.id} data-notification-attempt={attempt.attempt_key || undefined} className={isTarget ? "notification-exam-target" : ""} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,padding:"11px 0",borderBottom:`1px solid ${T.border}`,flexWrap:"wrap"}}>
                  <div><strong style={{fontSize:13,color:T.ink}}>{attempt.paper_type === "paper2" ? "Paper 2" : "Paper 1"}</strong><div style={{fontSize:11,color:T.textMuted,marginTop:2}}>{new Date(attempt.completed_at).toLocaleString([], {dateStyle:"medium",timeStyle:"short"})}</div></div>
                  <div className="student-exam-result-score"><div><strong style={{fontSize:14,color:T.ink}}>{attempt.score}/{attempt.max_score}</strong><div style={{fontSize:12,color:T.teal,fontWeight:700}}>{percent}%</div></div><span className={`exam-performance-badge ${performance.key}`}>{performance.label}</span></div>
                </div>;
              }) : <div style={{fontSize:13,color:T.textMuted}}>No full exam attempts yet.</div>}
            </Card>
            <Card>
              <div style={{fontFamily:FD,fontSize:17,fontWeight:600,color:T.ink,marginBottom:14}}>Progress by section</div>
              {SYLLABUS_SECTIONS.map((section, si) => (
                <div key={si} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:13,color:T.inkSoft,maxWidth:"75%"}}>{section.title}</span>
                    <span style={{fontSize:12,color:T.textMuted}}>{section.topics.length} topics</span>
                  </div>
                  <ProgressBar value={0} max={section.topics.length}/>
                </div>
              ))}
            </Card>
          </div>
        )}

        {sec === "bookings" && (
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:20}}>
              <div>
                <h1 style={{fontFamily:FD,fontSize:22,fontWeight:700,color:T.ink,margin:0}}>My bookings</h1>
                <p style={{fontSize:13,color:T.textMuted,margin:"4px 0 0"}}>Keep track of every tutoring session in the view that works best for you.</p>
              </div>
              <div className="calendar-view-switch" aria-label="Booking view">
                <button className={bookingView === "list" ? "active" : ""} onClick={() => setBookingView("list")}>☷ List</button>
                <button className={bookingView === "calendar" ? "active" : ""} onClick={() => setBookingView("calendar")}>▦ Calendar</button>
              </div>
            </div>
            {bookingsLoadError ? (
              <Card style={{textAlign:"center",padding:40}}><div style={{fontSize:32,marginBottom:12}}>!</div><div style={{fontFamily:FD,fontSize:18,color:T.ink,marginBottom:8}}>Couldn't load your bookings</div><p style={{color:T.textMuted,fontSize:14}}>Refresh the page to try again. If the problem continues, please contact support.</p></Card>
            ) : bookings.length === 0 ? (
              <Card style={{textAlign:"center",padding:40}}><div style={{fontSize:32,marginBottom:12}}>📅</div><div style={{fontFamily:FD,fontSize:18,color:T.ink,marginBottom:8}}>No sessions booked yet</div><p style={{color:T.textMuted,fontSize:14,marginBottom:20}}>Find a verified tutor and book your first session.</p><Btn onClick={() => setView("tutors")}>Find a tutor →</Btn></Card>
            ) : bookingView === "calendar" ? (
              <SessionCalendar bookings={bookings} isTutor={false} user={user} studentReviews={studentReviews} onCancel={setCancelTarget} onReview={setReviewTarget} onAccept={() => {}} onDecline={() => {}} />
            ) : (
              <>
                <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:8,marginBottom:14}}><span style={{fontSize:12,color:T.textMuted}}>Sort by</span><select value={bookingSort} onChange={e=>setBookingSort(e.target.value)} style={{padding:"7px 10px",border:`1.5px solid ${T.border}`,borderRadius:7,fontSize:13,fontFamily:FB,color:T.ink,outline:"none"}}><option value="date">Session date</option><option value="status">Status</option></select></div>
                {[...bookings].sort((a,b) => bookingSort === "status" ? BOOKING_STATUS_ORDER[bookingDisplayStatus(a)] - BOOKING_STATUS_ORDER[bookingDisplayStatus(b)] : b.session_date.localeCompare(a.session_date)).map(b => {
                  const dispStatus = bookingDisplayStatus(b);
                  const cancellable = canCancelBooking(b) && dispStatus !== "completed";
                  return <Card key={b.id} className={String(notificationTarget?.bookingId || "") === String(b.id) ? "notification-booking-target" : ""} style={{marginBottom:14}}><div className="booking-list-row" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:14}}><div style={{minWidth:0}}><div style={{fontWeight:600,color:T.ink,fontSize:15}}>{isTutor ? b.profiles?.name : b.tutors?.name}</div><div style={{fontSize:13,color:T.textMuted,marginTop:2}}>{b.subject} · {bookingDateLabel(b.session_date)}{b.start_time ? ` · ${fmtSessionRange(b.start_time, b.duration_minutes)}` : ""}</div><div style={{fontSize:13,color:T.textMuted}}>J${b.rate_jmd?.toLocaleString()}/hr</div>{dispStatus === "cancelled" && b.cancellation_reason && <div style={{fontSize:12,color:T.textMuted,marginTop:6,fontStyle:"italic"}}>{b.cancelled_by === user.id ? "You cancelled" : "Cancelled by tutor"} - {b.cancellation_reason}</div>}{dispStatus === "declined" && b.cancellation_reason && <div style={{fontSize:12,color:T.textMuted,marginTop:6,fontStyle:"italic"}}>Declined by tutor - {b.cancellation_reason}</div>}</div><div className="booking-list-actions" style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}><Badge c={BOOKING_STATUS_BADGE[dispStatus].c}>{BOOKING_STATUS_BADGE[dispStatus].label}</Badge>{dispStatus === "confirmed" && <AddToCalendar booking={b} isTutor={isTutor} user={user} />}{cancellable && <button onClick={() => setCancelTarget(b)} style={{background:"none",border:`1.5px solid ${T.red}`,color:T.red,borderRadius:7,padding:"5px 11px",fontSize:12,cursor:"pointer",fontFamily:FB}}>Cancel booking</button>}{dispStatus === "completed" && (() => {const alreadyReviewed = studentReviews.some(r => r.booking_id === b.id); return alreadyReviewed ? <span style={{fontSize:11,color:T.emerald,fontWeight:600}}>✓ Review submitted</span> : <button className="cp-btn cp-btn-teal" onClick={() => setReviewTarget(b)}>Leave a review</button>;})()}{!cancellable && dispStatus !== "cancelled" && dispStatus !== "declined" && dispStatus !== "completed" && dispStatus !== "expired" && <span style={{fontSize:11,color:T.textMuted}}>Too close to cancel</span>}</div></div></Card>;
                })}
              </>
            )}
          </>
        )}
        </>
        )}
      </div>

      {cancelTarget && (
        <CancelBookingModal
          booking={cancelTarget}
          onClose={() => setCancelTarget(null)}
          onConfirm={(reason) => cancelBooking(cancelTarget, reason)}
        />
      )}
      {declineTarget && (
        <DeclineBookingModal
          booking={declineTarget}
          onClose={() => setDeclineTarget(null)}
          onConfirm={(reason) => declineBooking(declineTarget, reason)}
        />
      )}
      {tutorCancelTarget && (
        <TutorCancelBookingModal
          booking={tutorCancelTarget}
          onClose={() => setTutorCancelTarget(null)}
          onConfirm={(reason) => tutorCancelBooking(tutorCancelTarget, reason)}
        />
      )}
      {reviewTarget && (
        <ReviewModal
          booking={reviewTarget}
          user={user}
          onClose={() => setReviewTarget(null)}
          onSubmitted={(review) => {
            setStudentReviews(prev => [review, ...prev]);
            setReviewTarget(null);
            showToast("Thank you. Your review has been submitted.", "success");
          }}
          showToast={showToast}
        />
      )}
    </div>
  );
}

// Reason-required cancellation modal - enforces the "no later than 1 hour
// before the session" rule client-side (the button that opens this is
// itself hidden once that window has passed).
function CancelBookingModal({ booking, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  return (
    <Modal onClose={onClose}>
      <div style={{fontFamily:FD,fontSize:19,fontWeight:700,color:T.ink,marginBottom:4}}>Cancel booking</div>
      <div className="booking-action-modal-meta" style={{fontSize:13,color:T.textMuted,marginBottom:18}}>
        with {booking.tutors?.name || "your tutor"} · {booking.subject} · {bookingDateLabel(booking.session_date)}
      </div>
      <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:6}}>Reason for cancelling</div>
      <textarea className="booking-action-modal-textarea" value={reason} onChange={e=>setReason(e.target.value)} rows={3}
        placeholder="Let your tutor know why you're cancelling…"
        style={{width:"100%",padding:"10px 12px",border:`1.5px solid ${T.border}`,borderRadius:7,
          fontSize:14,fontFamily:FB,color:T.ink,outline:"none",resize:"vertical",marginBottom:16}}/>
      <div className="booking-action-modal-note" style={{fontSize:12,color:T.textMuted,marginBottom:16}}>
        Your tutor will be notified immediately once you cancel.
      </div>
      <div className="booking-action-modal-actions" style={{display:"flex",gap:10}}>
        <Btn v="outline" onClick={onClose} style={{flex:1,justifyContent:"center"}}>Keep booking</Btn>
        <Btn onClick={async () => { setSubmitting(true); await onConfirm(reason); setSubmitting(false); }}
          disabled={submitting || !reason.trim()} style={{flex:2,justifyContent:"center",background:T.red,borderColor:T.red}}>
          {submitting ? "Cancelling…" : "Cancel booking"}
        </Btn>
      </div>
    </Modal>
  );
}

// Reason-required decline modal - the tutor-side counterpart to
// CancelBookingModal above. A student booking is only ever "declined" by
// the tutor before it's been accepted (see the "pending"-only Decline
// button), so there's no time-window check here like there is for a
// student cancelling a confirmed session.
function DeclineBookingModal({ booking, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  return (
    <Modal onClose={onClose}>
      <div style={{fontFamily:FD,fontSize:19,fontWeight:700,color:T.ink,marginBottom:4}}>Decline booking</div>
      <div className="booking-action-modal-meta" style={{fontSize:13,color:T.textMuted,marginBottom:18}}>
        with {booking.profiles?.name || "this student"} · {booking.subject} · {bookingDateLabel(booking.session_date)}
      </div>
      <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:6}}>Reason for declining</div>
      <textarea className="booking-action-modal-textarea" value={reason} onChange={e=>setReason(e.target.value)} rows={3}
        placeholder="Let the student know why you can't take this session…"
        style={{width:"100%",padding:"10px 12px",border:`1.5px solid ${T.border}`,borderRadius:7,
          fontSize:14,fontFamily:FB,color:T.ink,outline:"none",resize:"vertical",marginBottom:16}}/>
      <div className="booking-action-modal-note" style={{fontSize:12,color:T.textMuted,marginBottom:16}}>
        The student will see this reason on their booking.
      </div>
      <div className="booking-action-modal-actions" style={{display:"flex",gap:10}}>
        <Btn v="outline" onClick={onClose} style={{flex:1,justifyContent:"center"}}>Keep pending</Btn>
        <Btn onClick={async () => { setSubmitting(true); await onConfirm(reason); setSubmitting(false); }}
          disabled={submitting || !reason.trim()} style={{flex:2,justifyContent:"center",background:T.red,borderColor:T.red}}>
          {submitting ? "Declining…" : "Decline booking"}
        </Btn>
      </div>
    </Modal>
  );
}

// Cancel-a-confirmed-session modal - tutor-side counterpart to the
// student's CancelBookingModal, for a booking that's already been
// accepted. Uses the same canCancelBooking() 1-hour cutoff, gated in the
// "Cancel session" button before this modal is even opened.
function TutorCancelBookingModal({ booking, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  return (
    <Modal onClose={onClose}>
      <div style={{fontFamily:FD,fontSize:19,fontWeight:700,color:T.ink,marginBottom:4}}>Cancel session</div>
      <div className="booking-action-modal-meta" style={{fontSize:13,color:T.textMuted,marginBottom:18}}>
        with {booking.profiles?.name || "this student"} · {booking.subject} · {bookingDateLabel(booking.session_date)}
      </div>
      <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:6}}>Reason for cancelling</div>
      <textarea className="booking-action-modal-textarea" value={reason} onChange={e=>setReason(e.target.value)} rows={3}
        placeholder="Let the student know why this confirmed session can't go ahead…"
        style={{width:"100%",padding:"10px 12px",border:`1.5px solid ${T.border}`,borderRadius:7,
          fontSize:14,fontFamily:FB,color:T.ink,outline:"none",resize:"vertical",marginBottom:16}}/>
      <div className="booking-action-modal-note" style={{fontSize:12,color:T.textMuted,marginBottom:16}}>
        The student will see this reason and be notified right away.
      </div>
      <div className="booking-action-modal-actions" style={{display:"flex",gap:10}}>
        <Btn v="outline" onClick={onClose} style={{flex:1,justifyContent:"center"}}>Keep session</Btn>
        <Btn onClick={async () => { setSubmitting(true); await onConfirm(reason); setSubmitting(false); }}
          disabled={submitting || !reason.trim()} style={{flex:2,justifyContent:"center",background:T.red,borderColor:T.red}}>
          {submitting ? "Cancelling…" : "Cancel session"}
        </Btn>
      </div>
    </Modal>
  );
}

// ─── TUTORS VIEW ─────────────────────────────────────────────────────────────
function TutorsView({ user, profile, tutorApp, setView, showToast, hasTutorApp, isParent }) {
  // A tutor browsing the marketplace shouldn't be offered "Book a session"
  // on other tutors, and the footer's student-facing links don't apply to
  // them either. Same isTutor fallback used in DashboardView/HomeView.
  const isTutor = !!user && (profile?.role === "tutor" || tutorApp?.status === "approved");
  const [tutors, setTutors] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [bookingTutor, setBookingTutor] = useState(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(""); // "HH:MM", 24h, from <input type="time">
  const [duration, setDuration] = useState(60);
  const [subj, setSubj] = useState("");
  const [bookingDone, setBookingDone] = useState(false);
  const [reviews, setReviews] = useState({});
  const [reviewTutor, setReviewTutor] = useState(null);
  const [confirming, setConfirming] = useState(false);
  // The tutor's other non-cancelled bookings on the selected date - used to
  // block the student from picking a time that would clash with one of them.
  const [busyOnDate, setBusyOnDate] = useState([]);
  const [loadingBusy, setLoadingBusy] = useState(false);

  useEffect(() => {
    supabase.from("tutors").select("*").eq("active", true)
      .then(({data}) => setTutors(data || []));
  }, []);

  useEffect(() => {
    tutors.forEach(t => {
      supabase.from("reviews").select("*").eq("tutor_id", t.id)
        .then(({data}) => setReviews(r => ({...r, [t.id]: data || []})));
    });
  }, [tutors]);

  // Changing the date invalidates whatever time was picked for the old one
  // (different bookings, different "is this in the past" answer), so clear
  // it rather than risk carrying over a start time that's no longer valid.
  useEffect(() => {
    setSlot("");
  }, [date]);

  // Whenever a tutor + date are picked, load that tutor's other bookings for
  // the day so we can flag/prevent a clash. Re-runs if the student changes
  // the date after opening the modal.
  useEffect(() => {
    if (!bookingTutor || !date) { setBusyOnDate([]); return; }
    setLoadingBusy(true);
    supabase.from("bookings").select("start_time,duration_minutes")
      .eq("tutor_id", bookingTutor.id).eq("session_date", date)
      .neq("status", "cancelled")
      .then(({data}) => { setBusyOnDate(data || []); setLoadingBusy(false); });
  }, [bookingTutor, date]);

  const filtered = tutors.filter(t => {
    const mf = filter === "all" || t.subject_keys?.includes(filter);
    const ms = !search || t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects?.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return mf && ms;
  });

  // Done by: Odane Robinson - sort by highest rating or by hourly rate,
  // via the pure, unit-tested sortTutors() helper (src/lib/tutorSort.js).
  const sorted = sortTutors(filtered, sortBy);

  const FILTERS = [["all","All"],["math","Mathematics"],["physics","Physics"],["english","English"],["accounts","Accounts"],["bio","Biology"],["chem","Chemistry"]];

  // True if the currently-selected time+duration overlaps any of the
  // tutor's other bookings already loaded for this date.
  const hasClash = slot && busyOnDate.some(b => sessionsOverlap(slot, duration, b.start_time, b.duration_minutes));

  const confirmBooking = async () => {
    if (!date || !slot || !subj) { showToast("Please fill in all booking details."); return; }
    if (!user) { showToast("Please sign in to book a session."); return; }
    const requestedStart = calendarDateTime(date, `${slot}:00`);
    if (!requestedStart || requestedStart.getTime() - Date.now() < BOOKING_MIN_NOTICE_MIN * 60 * 1000) {
      showToast("Sessions must be booked at least 90 minutes before the start time. Please choose a later slot.");
      return;
    }
    setConfirming(true);
    // Re-check for a clash right before writing, in case someone else booked
    // this same slot while the modal was open (the loaded busyOnDate list
    // could be a few seconds stale).
    const { data: freshBusy } = await supabase.from("bookings")
      .select("start_time,duration_minutes").eq("tutor_id", bookingTutor.id)
      .eq("session_date", date).neq("status", "cancelled");
    const clash = (freshBusy || []).some(b => sessionsOverlap(slot, duration, b.start_time, b.duration_minutes));
    if (clash) {
      setBusyOnDate(freshBusy || []);
      setConfirming(false);
      showToast(`${bookingTutor.name} already has a session at that time. Please pick another slot.`);
      return;
    }
    const { error } = await supabase.from("bookings").insert({
      student_id: user.id, tutor_id: bookingTutor.id, subject: subj,
      session_date: date, start_time: `${slot}:00`, duration_minutes: duration,
      rate_jmd: bookingTutor.rate_jmd, status: "pending"
    });
    setConfirming(false);
    if (error) { showToast("Booking failed. Please try again."); return; }
    setBookingDone(true);
    showToast(`Booking request sent to ${bookingTutor.name}.`);
  };

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <div className="tutors-page-shell" style={{maxWidth:1100,margin:"0 auto",padding:"44px 28px",flex:1,width:"100%"}}>
        <div className="tutors-page-heading" style={{marginBottom:30}}>
          <div className="tutors-kicker" style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:T.teal,marginBottom:9}}>Tutor marketplace</div>
          <h1 style={{fontFamily:FD,fontSize:34,fontWeight:700,color:T.ink,marginBottom:8,letterSpacing:"-0.01em"}}>Find your tutor</h1>
          <p style={{fontSize:15,color:T.textMuted}}>All tutors are verified and student-rated. See their rate, read reviews, and book directly.</p>
        </div>
        <div className="tutors-toolbar" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
          <div className="tutor-filter-row" style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {FILTERS.map(([k,l]) => (
              <button className={`tutor-filter ${filter===k ? "active" : ""}`} key={k} onClick={() => setFilter(k)}
                style={{padding:"8px 15px",borderRadius:99,fontSize:13,cursor:"pointer",fontFamily:FB,
                  transition:`all .18s ${T.ease}`,border:`1.5px solid ${filter===k?T.teal:T.border}`,
                  background:filter===k?T.teal:"transparent",boxShadow:filter===k?T.shadowSm:"none",
                  color:filter===k?"#fff":T.textMuted,fontWeight:filter===k?600:500}}>
                {l}
              </button>
            ))}
          </div>
          <input className="tutor-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tutors…"
            style={{padding:"10px 15px",border:`1.5px solid ${T.border}`,borderRadius:T.rSm,
              fontSize:14,width:210,outline:"none",fontFamily:FB,transition:`border-color .18s ${T.ease},box-shadow .18s ${T.ease}`}}
            onFocus={e=>{e.target.style.borderColor=T.teal;e.target.style.boxShadow=`0 0 0 3px ${T.tealLight}`;}}
            onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow="none";}}/>
          <select className="tutor-sort" value={sortBy} onChange={e => setSortBy(e.target.value)} aria-label="Sort tutors"
            style={{padding:"10px 15px",border:`1.5px solid ${T.border}`,borderRadius:T.rSm,
              fontSize:14,outline:"none",fontFamily:FB,color:T.ink,background:T.paper,cursor:"pointer"}}
            onFocus={e=>{e.target.style.borderColor=T.teal;e.target.style.boxShadow=`0 0 0 3px ${T.tealLight}`;}}
            onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow="none";}}>
            <option value="default">Sort: Featured</option>
            <option value="rating_desc">Sort: Highest rated</option>
            <option value="price_asc">Sort: Price (low to high)</option>
            <option value="price_desc">Sort: Price (high to low)</option>
          </select>
        </div>
        <div className="tutor-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:20}}>
          {sorted.map(t => {
            const avatarColor = getTutorAvatarColor(t);
            const initials = getInitials(t.name || t.initials || "Tutor");
            return (
            <Card key={t.id} className="tutor-card hl">
              <div style={{marginBottom:16}}>
                <ProfileAvatar
                  path={t.avatar_path}
                  name={t.name}
                  size={58}
                  fallbackBackground={avatarColor}
                  className="tutor-avatar"
                />
              </div>
              <div style={{fontFamily:FD,fontSize:17.5,fontWeight:600,color:T.ink}}>{t.name}</div>
              <div style={{fontSize:12,color:T.teal,fontWeight:600,margin:"3px 0 9px"}}>{t.subjects?.join(" · ")}</div>
              <p style={{fontSize:13,color:T.textMuted,lineHeight:1.6,marginBottom:14}}>{t.bio}</p>
              {(reviews[t.id]||[]).slice(0,2).map((r,i) => (
                <div key={i} className="tutor-review-snippet" style={{background:T.muted,borderRadius:T.rSm,padding:"10px 12px",marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontWeight:600,fontSize:11,color:T.ink}}>Verified student</span>
                    <span style={{color:"#FBBF24"}}>{"★".repeat(r.rating)}</span>
                  </div>
                  <div style={{fontSize:12.5,color:T.inkSoft,lineHeight:1.5}}>"{r.body}"</div>
                </div>
              ))}
              {(reviews[t.id]||[]).length > 0 && (
                <button className="review-list-link" onClick={() => setReviewTutor(t)}>
                  View {(reviews[t.id]||[]).length} review{(reviews[t.id]||[]).length !== 1 ? "s" : ""} →
                </button>
              )}
              <div className="tutor-card-meta" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,
                paddingTop:12,borderTop:`1px solid ${T.borderSoft}`}}>
                <span style={{fontSize:13,color:T.textMuted}}>★ {t.rating} ({t.session_count} sessions)</span>
                <div><span style={{fontWeight:700,color:T.ink,fontSize:15}}>J${t.rate_jmd?.toLocaleString()}</span>
                  <span style={{fontSize:11,color:T.textMuted}}>/hr</span></div>
              </div>
              {!isTutor && !isParent && (
                <Btn full onClick={() => { setBookingTutor(t); setBookingDone(false); setDate(""); setSlot(""); setDuration(60); setSubj(t.subjects?.[0]||""); }}
                  style={{fontSize:13.5}}>
                  Book a session
                </Btn>
              )}
            </Card>
            );
          })}
          {filtered.length === 0 && (
            <div style={{gridColumn:"1/-1",textAlign:"center",padding:40,color:T.textMuted,fontSize:14}}>
              No tutors found for this filter. Try selecting "All subjects".
            </div>
          )}
        </div>
      </div>
      <Footer setView={setView} hasTutorApp={hasTutorApp} isTutor={isTutor} isParent={isParent} />

      {bookingTutor && (
        <Modal onClose={() => setBookingTutor(null)}>
          {!bookingDone ? (
            <>
              <div style={{fontFamily:FD,fontSize:20,fontWeight:700,color:T.ink,marginBottom:4}}>Book a session</div>
              <div style={{fontSize:13,color:T.textMuted,marginBottom:20}}>
                with {bookingTutor.name} · J${bookingTutor.rate_jmd?.toLocaleString()}/hr
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:6}}>Subject</div>
                <select value={subj} onChange={e=>setSubj(e.target.value)}
                  style={{width:"100%",padding:"10px 12px",border:`1.5px solid ${T.border}`,
                    borderRadius:7,fontSize:14,fontFamily:FB,color:T.ink,outline:"none"}}>
                  {(bookingTutor.subjects||[]).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:6}}>Date</div>
                <input type="date" value={date} onChange={e=>setDate(e.target.value)}
                  min={jamaicaNowParts().dateKey}
                  style={{width:"100%",padding:"10px 12px",border:`1.5px solid ${T.border}`,
                    borderRadius:7,fontSize:14,fontFamily:FB,color:T.ink,outline:"none"}}/>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:500,color:T.inkSoft,marginBottom:6}}>Duration</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {SESSION_DURATIONS.map(d => (
                    <button key={d.mins} onClick={() => setDuration(d.mins)}
                      style={{padding:"8px 12px",borderRadius:7,fontSize:12.5,cursor:"pointer",
                        fontFamily:FB,transition:"all .15s",
                        border:`1.5px solid ${duration===d.mins?T.teal:T.border}`,
                        background:duration===d.mins?T.tealLight:"#fff",
                        color:duration===d.mins?T.tealDark:T.inkSoft,fontWeight:duration===d.mins?600:400}}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:600,color:T.inkSoft,marginBottom:6}}>Start time (Jamaica Standard Time)</div>
                {/* Tutors set a general availability window rather than fixed
                    slots - any time works as long as it doesn't clash with
                    another session they already have booked. */}
                {bookingTutor.availability && (
                  <div style={{fontSize:12,color:T.textMuted,marginBottom:8}}>
                    {bookingTutor.name}'s typical availability: {bookingTutor.availability}
                  </div>
                )}
                <TimeSlotPicker value={slot} onChange={setSlot} date={date} duration={duration} busyOnDate={busyOnDate} placeholder="Please select your start time"/>
                <div style={{fontSize:11.5,color:T.textMuted,marginTop:7,lineHeight:1.5}}>
                  Book at least 90 minutes ahead. Your tutor must confirm at least 60 minutes before the session.
                </div>
                {date && loadingBusy && (
                  <div style={{fontSize:12,color:T.textMuted,marginTop:6}}>Checking {bookingTutor.name}'s schedule…</div>
                )}
                {hasClash && (
                  <div style={{fontSize:12.5,color:T.red,marginTop:6,fontWeight:500}}>
                    That overlaps a session {bookingTutor.name} already has booked. Please choose a different time.
                  </div>
                )}
              </div>
              {date && slot && !hasClash && (
                <div style={{background:T.amberLight,borderRadius:8,padding:"11px 14px",
                  marginBottom:16,fontSize:13,color:T.amber,fontWeight:500}}>
                  📅 {bookingTutor.name} · {subj} · {date} at {fmtSessionRange(slot, duration)} Jamaica time
                </div>
              )}
              <div style={{display:"flex",gap:10}}>
                <Btn v="outline" onClick={() => setBookingTutor(null)} style={{flex:1,justifyContent:"center"}}>Cancel</Btn>
                <Btn onClick={confirmBooking} disabled={!date||!slot||hasClash||confirming}
                  style={{flex:2,justifyContent:"center"}}>{confirming ? "Sending request…" : "Send booking request"}</Btn>
              </div>
            </>
          ) : (
            <div style={{textAlign:"center",padding:"12px 0"}}>
              <div style={{width:64,height:64,borderRadius:"50%",background:T.emeraldLight,
                display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:28}}>✓</div>
              <div style={{fontFamily:FD,fontSize:22,fontWeight:700,color:T.ink,marginBottom:8}}>Request sent</div>
              <div style={{maxWidth:500,margin:"0 auto 24px",padding:"0 6px",textAlign:"left",color:T.textMuted,fontSize:14,lineHeight:1.65}}>
                <p style={{margin:"0 0 10px"}}>
                  {bookingTutor.name} has been notified. We'll let you know as soon as your {subj} session on {calendarDayLabel(date)}, from {fmtClock(slot)} to {fmtClock(minutesToTime(timeToMinutes(slot) + duration))} Jamaica time is confirmed.
                </p>
                <p style={{margin:0}}>
                  If the session is still unconfirmed 60 minutes before the start time, the request will close automatically.
                </p>
              </div>
              <Btn onClick={() => setBookingTutor(null)} full>Done</Btn>
            </div>
          )}
        </Modal>
      )}
      {reviewTutor && (
        <Modal onClose={() => setReviewTutor(null)}>
          <div className="review-modal-head">
            <div>
              <div className="eyebrow">TUTOR REVIEWS</div>
              <h2 style={{fontFamily:FD,fontSize:24,color:T.ink,margin:"5px 0 4px"}}>{reviewTutor.name}</h2>
              <p style={{fontSize:13,color:T.textMuted,margin:0}}>Verified student feedback</p>
            </div>
            <button className="cp-icon-btn" onClick={() => setReviewTutor(null)} aria-label="Close">×</button>
          </div>
          <div className="review-summary-line"><strong>★ {reviewTutor.rating}</strong><span>{(reviews[reviewTutor.id]||[]).length} written review{(reviews[reviewTutor.id]||[]).length !== 1 ? "s" : ""}</span></div>
          <div className="review-all-list">
            {(reviews[reviewTutor.id]||[]).map((r,i) => (
              <div className="review-full-card" key={r.id || i}>
                <div className="review-full-top"><strong>Verified student</strong><span>{"★".repeat(r.rating)}</span></div>
                <p>“{r.body}”</p>
                <small>{r.created_at ? new Date(r.created_at).toLocaleDateString() : ""}</small>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}


// ─── ADMIN VIEW ────────────────────────────────────────────────────────────
const STATUS_BADGE = {
  pending:     { c: "amber", label: "Pending review" },
  approved:    { c: "green", label: "Verified" },
  rejected:    { c: "red",   label: "Rejected" },
  deactivated: { c: "red",   label: "Deactivated" },
};

function AdminView({ showToast, adminUserId }) {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [filter, setFilter] = useState("pending");
  const [payouts, setPayouts] = useState([]);
  const [payoutLoading, setPayoutLoading] = useState(false);

  const load = () => {
    setLoading(true);
    // Relies on the "Admins can view all tutors" RLS policy - a non-admin
    // calling this would just get the normal active-only rows back.
    supabase.from("tutors").select("*").order("created_at", {ascending:false})
      .then(({data}) => { setTutors(data || []); setLoading(false); });
  };

  const loadPayouts = async () => {
    setPayoutLoading(true);
    const { data, error } = await supabase.rpc("admin_get_pending_tutor_payouts");
    if (error) showToast(error.message || "Couldn't load pending payouts.");
    setPayouts(data || []);
    setPayoutLoading(false);
  };

  useEffect(() => { load(); loadPayouts(); }, []);

  const STATUS_TOASTS = {
    approved: "Tutor approved.",
    rejected: "Tutor rejected.",
    deactivated: "Tutor deactivated.",
  };

  const setStatus = async (tutorId, status) => {
    setBusyId(tutorId);
    // Goes through the admin_set_tutor_status RPC (security definer, checks
    // is_admin server-side) rather than a raw .update() - a raw update would
    // be blocked anyway now that tutors' UPDATE grant excludes this column,
    // but this is also how *admins* are meant to write status/verified/active.
    // The RPC itself also rejects p_tutor_id belonging to the calling admin
    // (see the admin_set_tutor_status migration) - this is a second,
    // client-side guard so the option is never even presented.
    const { error } = await supabase.rpc("admin_set_tutor_status", {
      p_tutor_id: tutorId, p_status: status,
    });
    if (error) {
      showToast(error.message || "Action failed. Are you still an admin?");
    } else {
      showToast(STATUS_TOASTS[status] || "Updated.");
      load();
    }
    setBusyId(null);
  };

  // Admins must never see, let alone approve, their own tutor application -
  // even though the RLS policy and RPC also enforce this server-side, we
  // filter it out of the list here too so there's no dangling UI for it.
  const visibleTutors = tutors.filter(t => t.user_id !== adminUserId);
  const ownApplicationHidden = tutors.some(t => t.user_id === adminUserId);
  const filtered = visibleTutors.filter(t => filter === "all" || t.status === filter);

  return (
    <div style={{maxWidth:920,margin:"0 auto",padding:"40px 28px",flex:1,width:"100%"}}>
      <h1 style={{fontFamily:FD,fontSize:26,fontWeight:700,color:T.ink,marginBottom:6}}>Tutor applications</h1>
      <p style={{color:T.textMuted,fontSize:14,marginBottom:20}}>
        Approve or reject tutor applications. Approving sets a tutor live on the Tutors page.
      </p>
      {ownApplicationHidden && (
        <div style={{background:T.amberLight,border:`1px solid ${T.amber}`,borderRadius:8,
          padding:"10px 13px",marginBottom:20,fontSize:13,color:T.amber}}>
          You have a tutor application on file - it's hidden from this list and can't be actioned by you.
          Another admin needs to review it.
        </div>
      )}
      <div style={{display:"flex",gap:7,marginBottom:22,flexWrap:"wrap"}}>
        {[["pending","Pending"],["approved","Verified"],["rejected","Rejected"],["deactivated","Deactivated"],["all","All"]].map(([k,l]) => (
          <button key={k} onClick={() => setFilter(k)}
            style={{padding:"8px 15px",borderRadius:99,fontSize:13,cursor:"pointer",fontFamily:FB,
              transition:`all .18s ${T.ease}`,
              border:`1.5px solid ${filter===k?T.teal:T.border}`,
              background:filter===k?T.teal:"transparent",boxShadow:filter===k?T.shadowSm:"none",
              color:filter===k?"#fff":T.textMuted,fontWeight:filter===k?600:500}}>
            {l}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{color:T.textMuted,fontSize:14}}>Loading…</div>
      ) : filtered.length === 0 ? (
        <Card style={{textAlign:"center",padding:40}}>
          <div style={{fontSize:32,marginBottom:12}}>📋</div>
          <div style={{fontFamily:FD,fontSize:18,color:T.ink,marginBottom:8}}>Nothing here</div>
          <p style={{color:T.textMuted,fontSize:14}}>No tutors match this filter right now.</p>
        </Card>
      ) : filtered.map(t => (
        <Card key={t.id} style={{marginBottom:14}}>
          <div style={{display:"flex",gap:14}}>
            <div style={{width:48,height:48,borderRadius:"50%",background:t.avatar_color,flexShrink:0,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:"#fff"}}>
              {t.initials}
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontWeight:600,color:T.ink,fontSize:15}}>{t.name}</div>
                  <div style={{fontSize:12,color:T.teal,margin:"2px 0 6px"}}>{t.subjects?.join(" · ")}</div>
                </div>
                <Badge c={STATUS_BADGE[t.status]?.c || "amber"}>
                  {STATUS_BADGE[t.status]?.label || t.status}
                </Badge>
              </div>
              <p style={{fontSize:13,color:T.inkSoft,lineHeight:1.5,marginBottom:8}}>{t.bio}</p>
              {t.phone && (
                <div style={{fontSize:12,color:T.textMuted,marginBottom:4}}>
                  <strong style={{color:T.inkSoft}}>Phone:</strong> {t.phone} <span style={{color:T.textMuted}}>(for scheduling an interview)</span>
                </div>
              )}
              {t.quals && (
                <div style={{fontSize:12,color:T.textMuted,marginBottom:4}}>
                  <strong style={{color:T.inkSoft}}>Qualifications:</strong> {t.quals}
                </div>
              )}
              {t.experience && (
                <div style={{fontSize:12,color:T.textMuted,marginBottom:4}}>
                  <strong style={{color:T.inkSoft}}>Experience:</strong> {t.experience}
                </div>
              )}
              <div style={{fontSize:12,color:T.textMuted,marginBottom:10}}>
                J${t.rate_jmd?.toLocaleString()}/hr
              </div>
              <div style={{display:"flex",gap:8}}>
                {t.status === "pending" && (
                  <>
                    <Btn onClick={() => setStatus(t.id, "approved")} disabled={busyId===t.id}
                      style={{fontSize:12,padding:"7px 14px"}}>
                      {busyId===t.id ? "…" : "Approve"}
                    </Btn>
                    <Btn v="outline" onClick={() => setStatus(t.id, "rejected")} disabled={busyId===t.id}
                      style={{fontSize:12,padding:"7px 14px",color:T.red,borderColor:T.red}}>
                      {busyId===t.id ? "…" : "Reject"}
                    </Btn>
                  </>
                )}
                {t.status === "approved" && (
                  <Btn v="outline" onClick={() => setStatus(t.id, "deactivated")} disabled={busyId===t.id}
                    style={{fontSize:12,padding:"7px 14px",color:T.red,borderColor:T.red}}>
                    {busyId===t.id ? "…" : "Deactivate"}
                  </Btn>
                )}
                {(t.status === "rejected" || t.status === "deactivated") && (
                  <Btn onClick={() => setStatus(t.id, "approved")} disabled={busyId===t.id}
                    style={{fontSize:12,padding:"7px 14px"}}>
                    {busyId===t.id ? "…" : t.status === "rejected" ? "Reconsider & approve" : "Reactivate"}
                  </Btn>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}

      <div style={{marginTop:36}}>
        <h2 style={{fontFamily:FD,fontSize:20,color:T.ink,marginBottom:5}}>Tutor payouts</h2>
        <p style={{fontSize:13,color:T.textMuted,marginBottom:14}}>Completed sessions awaiting payout. Marking a payout as paid does not change the tutor's earned amount.</p>
        {ownApplicationHidden && (
          <div style={{background:T.amberLight,border:`1px solid ${T.amber}`,borderRadius:8,
            padding:"10px 13px",marginBottom:14,fontSize:13,color:T.amber}}>
            You have a tutor profile - any pending payouts for your own sessions are hidden from this list and can't be marked paid by you.
            Another admin needs to process them.
          </div>
        )}
        <Card>
          {payoutLoading ? <div style={{padding:18,color:T.textMuted,fontSize:13}}>Loading pending payouts…</div> : payouts.length === 0 ? (
            <div style={{padding:18,color:T.textMuted,fontSize:13}}>No pending tutor payouts.</div>
          ) : payouts.map(row => (
            <div key={row.booking_id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:14,padding:"12px 0",borderBottom:`1px solid ${T.border}`,flexWrap:"wrap"}}>
              <div>
                <div style={{fontWeight:700,color:T.ink,fontSize:14}}>{row.tutor_name || "Tutor"}</div>
                <div style={{fontSize:12,color:T.textMuted}}>{row.student_name || "Student"} · {row.subject} · {row.session_date}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <strong style={{color:T.ink}}>J${Number(row.rate_jmd || 0).toLocaleString()}</strong>
                <Btn v="primary" onClick={async () => {
                  const {error} = await supabase.rpc("admin_mark_tutor_earnings_paid", {p_booking_ids:[row.booking_id]});
                  if (error) showToast(error.message || "Couldn't record the payout.");
                  else { showToast("Payout marked as paid."); loadPayouts(); }
                }}>Mark paid</Btn>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────

function getTutorAvatarColor(tutor = {}) {
  const raw = String(tutor.avatar_color || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(raw)) return raw;
  const palette = ["#0D9488", "#155E75", "#2563EB", "#7C3AED", "#C2410C", "#047857"];
  const key = String(tutor.id || tutor.name || "Tutor");
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
  return palette[Math.abs(hash) % palette.length];
}

function getInitials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "CP";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function ReviewModal({ booking, user, onClose, onSubmitted, showToast }) {
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [hover, setHover] = useState(0);
  const [saving, setSaving] = useState(false);
  const tutorName = booking?.tutors?.name || "your tutor";
  const submit = async () => {
    if (rating < 1) return showToast("Please choose a star rating.");
    if (body.trim().length < 10) return showToast("Please write at least 10 characters so your review is useful.");
    setSaving(true);
    const { data, error } = await supabase.rpc("submit_tutor_review", {
      p_booking_id: booking.id,
      p_rating: rating,
      p_body: body.trim(),
    });
    setSaving(false);
    if (error) {
      showToast({ type: "error", message: friendlyErrorMessage(error) });
      return;
    }
    onSubmitted(data);
  };
  return (
    <Modal onClose={onClose}>
      <div className="review-modal-head">
        <div>
          <div className="eyebrow">SESSION REVIEW</div>
          <h2 style={{fontFamily:FD,fontSize:24,color:T.ink,margin:"5px 0 4px"}}>How was your session?</h2>
          <p style={{fontSize:13,color:T.textMuted,margin:0}}>Share your experience with {tutorName}.</p>
        </div>
        <button className="cp-icon-btn" onClick={onClose} aria-label="Close">×</button>
      </div>
      <div className="review-rating-box">
        <div className="review-rating-label">Your rating</div>
        <div className="star-picker" aria-label="Choose a rating">
          {[1,2,3,4,5].map(n => (
            <button key={n} type="button" onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setRating(n)} aria-label={`${n} star${n>1?"s":""}`}>
              <span className={(hover || rating) >= n ? "star active" : "star"}>★</span>
            </button>
          ))}
        </div>
        <div className="rating-caption">{rating ? ["Poor","Fair","Good","Very good","Excellent"][rating-1] : "Tap a star to rate"}</div>
      </div>
      <label className="cp-label">Your review</label>
      <textarea className="cp-textarea" rows={5} value={body} onChange={e => setBody(e.target.value)} maxLength={1000}
        placeholder="What did your tutor explain well? What helped you improve?" />
      <div className="review-guidance"><span>✓ Helpful and specific</span><span>✓ Be respectful</span><span>{body.length}/1000</span></div>
      <div className="review-actions">
        <button className="cp-btn cp-btn-secondary" onClick={onClose}>Cancel</button>
        <button className="cp-btn cp-btn-primary" onClick={submit} disabled={saving || !rating || body.trim().length < 10}>
          {saving ? "Submitting…" : "Publish review"}
        </button>
      </div>
    </Modal>
  );
}

const PARENT_MILESTONE_META = {
  lesson_completed: { short: "L", label: "Lesson completed" },
  topic_quiz_completed: { short: "Q", label: "Topic test" },
  adaptive_session_completed: { short: "A", label: "Adaptive Practice" },
  section_completed: { short: "S", label: "Section completed" },
  section_test_completed: { short: "T", label: "Section test" },
  course_completed: { short: "✓", label: "Course completed" },
  mastery_milestone: { short: "★", label: "Mastery milestone" },
  weak_skill_alert: { short: "!", label: "Needs attention" },
  skill_improved: { short: "↑", label: "Skill improving" },
};

function ParentView({ user, profile, setView, showToast, onProfileUpdated }) {
  const [links, setLinks] = useState([]);
  const [children, setChildren] = useState([]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [childData, setChildData] = useState(null);
  const [notificationTarget, setNotificationTarget] = useState(() => {
    try {
      const raw = sessionStorage.getItem("spark_dashboard_notification_target");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed?.scope !== "parent") return null;
      sessionStorage.removeItem("spark_dashboard_notification_target");
      return parsed;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    const handleNotificationTarget = (event) => {
      const target = event?.detail;
      if (target?.scope !== "parent") return;
      try { sessionStorage.removeItem("spark_dashboard_notification_target"); } catch (error) {}
      setNotificationTarget(target);
    };
    window.addEventListener("spark:dashboard-notification-target", handleNotificationTarget);
    return () => window.removeEventListener("spark:dashboard-notification-target", handleNotificationTarget);
  }, []);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    const {data: linkRows} = await supabase.from("parent_student_links").select("*").eq("parent_id", user.id).order("created_at", {ascending:false});
    setLinks(linkRows || []);
    const approved = (linkRows || []).filter(l => l.status === "approved");
    if (approved.length) {
      const ids = approved.map(l => l.student_id);
      const {data: profiles} = await supabase.from("profiles").select("id,name,role,xp,created_at,avatar_path").in("id", ids);
      setChildren(profiles || []);
      if (!selectedChild && profiles?.[0]) setSelectedChild(profiles[0]);
    } else setChildren([]);
    setLoading(false);
  }, [user?.id]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!notificationTarget?.studentId || children.length === 0) return;
    const child = children.find(item => String(item.id) === String(notificationTarget.studentId));
    if (child && String(selectedChild?.id || "") !== String(child.id)) setSelectedChild(child);
  }, [notificationTarget, children, selectedChild?.id]);

  useEffect(() => {
    if (!notificationTarget?.anchor) return undefined;
    const needsSelectedChild = notificationTarget.anchor !== "parent-family";
    if (needsSelectedChild && notificationTarget.studentId && String(selectedChild?.id || "") !== String(notificationTarget.studentId)) return undefined;
    if (needsSelectedChild && (notificationTarget.attemptKey || notificationTarget.bookingId || notificationTarget.milestoneId) && !childData) return undefined;

    const scrollTimer = window.setTimeout(() => {
      let selector = `[data-notification-anchor="${notificationTarget.anchor}"]`;
      if (notificationTarget.attemptKey) selector = `[data-notification-attempt="${notificationTarget.attemptKey}"]`;
      if (notificationTarget.bookingId) selector = `[data-notification-booking="${notificationTarget.bookingId}"]`;
      if (notificationTarget.milestoneId) selector = `[data-notification-milestone="${notificationTarget.milestoneId}"]`;
      const target = document.querySelector(selector) || document.querySelector(`[data-notification-anchor="${notificationTarget.anchor}"]`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);

    const clearTimer = window.setTimeout(() => setNotificationTarget(null), 3600);
    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(clearTimer);
    };
  }, [notificationTarget, selectedChild?.id, childData]);

  // Keep the adult dashboard live too: a child approving/declining a request
  // should update the parent's pending/connected state without a refresh.
  useEffect(() => {
    if (!user?.id) return;
    const familyChannel = supabase
      .channel(`parent-family-links-${user.id}`)
      .on("postgres_changes", {
        event: "*", schema: "public", table: "parent_student_links",
        filter: `parent_id=eq.${user.id}`,
      }, (payload) => {
        load();
        if (payload.new?.status === "approved") showToast("Your family connection was approved.");
        if (payload.new?.status === "declined") showToast("The student declined the connection request.");
        if (payload.new?.status === "pending" && payload.eventType === "UPDATE") showToast("Your connection request is pending again.");
      })
      .subscribe();
    return () => { supabase.removeChannel(familyChannel); };
  }, [user?.id, load, showToast]);

  const loadChildData = useCallback(async () => {
    if (!selectedChild?.id) { setChildData(null); return; }
    const [prog, attempts, lessons, bookings, examAttempts, milestones] = await Promise.all([
      supabase.from("csec_skill_progress").select("*").eq("user_id", selectedChild.id).order("mastery_score", {ascending:true}),
      supabase.from("csec_question_attempts").select("id,correct,attempted_at,skill").eq("user_id", selectedChild.id).order("attempted_at", {ascending:false}).limit(20),
      supabase.from("lesson_progress").select("id,lesson_id,completed,completed_at").eq("user_id", selectedChild.id).eq("completed", true),
      supabase.from("bookings").select("id,subject,session_date,start_time,duration_minutes,status,rate_jmd,confirmation_expired_at,tutors(name)").eq("student_id", selectedChild.id).order("session_date", {ascending:false}).limit(100),
      supabase.from("practice_exam_attempts").select("id,attempt_key,paper_type,score,max_score,percent,completed_at,duration_seconds,timed_out,answered_count,total_questions,correct_count").eq("user_id", selectedChild.id).order("completed_at", {ascending:false}).limit(20),
      supabase.from("learning_milestones").select("id,event_type,title,score,max_score,percent,skill,lesson_id,metadata,created_at").eq("user_id", selectedChild.id).order("created_at", {ascending:false}).limit(40),
    ]);
    const rows = prog.data || [];
    const attemptsRows = attempts.data || [];
    const mastery = rows.length ? Math.round(rows.reduce((s,r)=>s+Number(r.mastery_score||0),0)/rows.length) : 0;
    const weakest = rows.filter(r=>Number(r.mastery_score)<80).slice(0,3);
    setChildData({ progress:rows, attempts:attemptsRows, lessons:lessons.data||[], bookings:bookings.data||[], examAttempts:examAttempts.data||[], milestones:milestones.data||[], mastery, weakest });
  }, [selectedChild?.id]);

  useEffect(() => { loadChildData(); }, [loadChildData]);

  useEffect(() => {
    if (!selectedChild?.id) return;
    const examChannel = supabase
      .channel(`parent-exam-results-${user.id}-${selectedChild.id}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "practice_exam_attempts",
        filter: `user_id=eq.${selectedChild.id}`,
      }, () => loadChildData())
      .subscribe();
    const milestoneChannel = supabase
      .channel(`parent-learning-milestones-${user.id}-${selectedChild.id}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "learning_milestones",
        filter: `user_id=eq.${selectedChild.id}`,
      }, () => loadChildData())
      .subscribe();
    return () => {
      supabase.removeChannel(examChannel);
      supabase.removeChannel(milestoneChannel);
    };
  }, [selectedChild?.id, user.id, loadChildData]);

  const requestLink = async () => {
    if (!code.trim()) return showToast("Enter the student's family code.");
    setSending(true);
    const {error} = await supabase.rpc("request_parent_link", {p_code: code.trim()});
    setSending(false);
    if (error) return showToast(error.message || "Couldn't send the request.");
    setCode("");
    showToast("Connection request sent. The student must approve it.");
    load();
  };


  if (loading) return <div className="parent-page"><div className="page-shell"><div className="loading-card">Loading your family dashboard…</div></div></div>;
  const pending = links.filter(l => l.status === "pending");
  const examAttempts = childData?.examAttempts || [];
  const paper1Attempts = examAttempts.filter(a => a.paper_type === "paper1");
  const paper2Attempts = examAttempts.filter(a => a.paper_type === "paper2");
  const examAverage = examAttempts.length ? Math.round(examAttempts.reduce((sum, a) => sum + Number(a.percent || 0), 0) / examAttempts.length) : 0;
  const learningMilestones = childData?.milestones || [];
  const formatExamDuration = seconds => {
    const safe = Math.max(0, Number(seconds) || 0);
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    if (hours && minutes) return `${hours}h ${minutes}m`;
    if (hours) return `${hours}h`;
    return `${minutes}m`;
  };
  return (
    <div className="parent-page">
      <div className="page-shell">
        <div className="parent-hero">
          <div>
            <div className="eyebrow">PARENT & GUARDIAN</div>
            <h1>Stay close to their progress.</h1>
            <p>Review mastery, practice, lesson progress and tutor sessions from the parent dashboard.</p>
          </div>
          <div className="parent-hero-profile" style={{display:"flex",justifyContent:"center"}}>
            <ProfilePhotoEditor
              user={user}
              profile={profile}
              isTutorProfile={false}
              showToast={showToast}
              onProfileUpdated={onProfileUpdated}
              size={72}
            />
            <div className="parent-hero-profile-copy">
              <strong>Profile photo</strong>
              <span>Tap the photo to change it</span>
            </div>
          </div>
        </div>

        {pending.length > 0 && <section className="parent-section alert-section">
          <div className="section-kicker">AWAITING APPROVAL</div>
          <h2>Connection requests sent</h2>
          <p className="muted-copy">Your request is waiting for the student's approval. They remain in control of who can access their learning progress.</p>
          {pending.map(link => <div className="pending-pill" key={link.id}>Pending approval · {new Date(link.created_at).toLocaleDateString()}</div>)}
        </section>}

        <section className="parent-section" data-notification-anchor="parent-family">
          <div className="section-heading parent-family-heading"><div><div className="section-kicker">YOUR FAMILY</div><h2>Children</h2></div><button className="cp-btn cp-btn-primary parent-connect-button" onClick={()=>document.getElementById("add-child")?.scrollIntoView({behavior:"smooth"})}>+ Connect a child</button></div>
          {children.length === 0 ? <div className="empty-parent"><div className="empty-icon">👨‍👩‍👧</div><h3>No child connected yet</h3><p>Ask your child to open their account and give you their private family code.</p></div> :
            <div className="child-grid">{children.map(child => <button key={child.id} className={`child-card ${selectedChild?.id===child.id?"selected":""}`} onClick={()=>setSelectedChild(child)}><div className="child-avatar">{getInitials(child.name)}</div><div><strong>{child.name}</strong><span>CSEC Mathematics</span></div><span className="child-arrow" aria-hidden="true">›</span></button>)}</div>}
        </section>

        {selectedChild && childData && <section className="parent-section">
          <div className="section-heading"><div><div className="section-kicker">LEARNING SNAPSHOT</div><h2>{selectedChild.name}'s progress</h2></div><span className="mastery-pill">{childData.mastery}% mastery</span></div>
          <div className="parent-stat-grid"><div className="parent-stat"><strong>{childData.mastery}%</strong><span>Average skill mastery</span></div><div className="parent-stat"><strong>{childData.lessons.length}</strong><span>Lessons completed</span></div><div className="parent-stat"><strong>{examAttempts.length}</strong><span>Full exam attempts</span></div><div className="parent-stat"><strong>{childData.bookings.filter(b=>b.status!=="cancelled"&&b.status!=="declined").length}</strong><span>Tutor bookings</span></div></div>

          <div className="parent-learning-panel" data-notification-anchor="parent-learning-activity">
            <div className="parent-learning-head">
              <div><div className="panel-title">Recent learning activity</div><p>Completed lessons, tests, Adaptive Practice and mastery milestones appear here.</p></div>
              <span className="learning-count-pill">{learningMilestones.length} update{learningMilestones.length === 1 ? "" : "s"}</span>
            </div>
            {learningMilestones.length ? <div className="learning-milestone-list">{(() => {
              const targetId = notificationTarget?.milestoneId;
              const targetMilestone = targetId ? learningMilestones.find(item => String(item.id) === String(targetId)) : null;
              const rows = learningMilestones.slice(0, 10);
              if (targetMilestone && !rows.some(item => item.id === targetMilestone.id)) rows.unshift(targetMilestone);
              return rows.map(item => {
                const meta = PARENT_MILESTONE_META[item.event_type] || { short: "i", label: "Learning update" };
                const isTarget = targetId && String(item.id) === String(targetId);
                const percent = item.percent == null ? null : Math.round(Number(item.percent));
                return <article className={`learning-milestone-row ${isTarget ? "notification-learning-target" : ""}`} data-notification-milestone={item.id} key={item.id}>
                  <div className={`learning-milestone-icon ${item.event_type}`}>{meta.short}</div>
                  <div className="learning-milestone-main"><div className="learning-milestone-title"><strong>{item.title}</strong><span>{meta.label}</span></div><div className="learning-milestone-meta"><span>{new Date(item.created_at).toLocaleString([], {dateStyle:"medium", timeStyle:"short"})}</span>{item.skill && item.skill !== item.title && <span>{item.skill}</span>}</div></div>
                  {percent != null && <div className="learning-milestone-score"><strong>{percent}%</strong>{item.score != null && item.max_score != null && <span>{Number(item.score)}/{Number(item.max_score)}</span>}</div>}
                </article>;
              });
            })()}</div> : <div className="learning-milestone-empty"><strong>No learning milestones yet.</strong><span>New lesson, test and practice milestones will appear as the student studies.</span></div>}
          </div>

          <div className="exam-results-panel" data-notification-anchor="parent-exam-results">
            <div className="exam-results-head">
              <div><div className="panel-title">Paper 1 and Paper 2 results</div><p>Completed full-paper simulations appear here as soon as the student's result is saved.</p></div>
              <div className="exam-summary-pills"><span>Paper 1 <strong>{paper1Attempts.length}</strong></span><span>Paper 2 <strong>{paper2Attempts.length}</strong></span>{examAttempts.length > 0 && <span>Average <strong>{examAverage}%</strong></span>}</div>
            </div>
            {examAttempts.length ? <div className="exam-attempt-list">{examAttempts.slice(0,8).map(attempt => {
              const label = attempt.paper_type === "paper2" ? "Paper 2" : "Paper 1";
              const percent = Math.round(Number(attempt.percent || 0));
              const performance = getExamPerformanceStatus(percent);
              const isTargetAttempt = notificationTarget?.attemptKey && notificationTarget.attemptKey === attempt.attempt_key;
              return <article className={`exam-attempt-row ${isTargetAttempt ? "notification-exam-target" : ""}`} data-notification-attempt={attempt.attempt_key || undefined} key={attempt.id}>
                <div className={`exam-paper-badge ${attempt.paper_type}`}>{attempt.paper_type === "paper2" ? "P2" : "P1"}</div>
                <div className="exam-attempt-main"><div className="exam-attempt-title"><strong>{label}</strong><span>{new Date(attempt.completed_at).toLocaleString([], {dateStyle:"medium", timeStyle:"short"})}</span></div><div className="exam-score-track"><span style={{width:`${Math.max(0,Math.min(100,percent))}%`}} /></div><div className="exam-attempt-meta"><span>{attempt.answered_count == null ? "Answer count unavailable" : `${attempt.answered_count}/${attempt.total_questions} questions completed`}</span><span>{formatExamDuration(attempt.duration_seconds)}</span><span className={attempt.timed_out?"exam-timeout":"exam-submitted"}>{attempt.timed_out?"Time expired":"Submitted"}</span></div></div>
                <div className="exam-attempt-score"><strong>{attempt.score}/{attempt.max_score}</strong><span className="exam-percent">{percent}%</span><span className={`exam-performance-badge ${performance.key}`}>{performance.label}</span></div>
              </article>;
            })}</div> : <div className="exam-results-empty"><strong>No full exam attempts yet.</strong><span>Paper 1 and Paper 2 scores will appear after the student submits an exam.</span></div>}
          </div>

          <div className="parent-columns">
            <div className="panel-white"><div className="panel-title">Skills needing attention</div>{childData.weakest.length ? childData.weakest.map(r=><div className="skill-row" key={r.id}><div><strong>{r.skill}</strong><span>{r.mastery_level}</span></div><div className="skill-score">{Math.round(Number(r.mastery_score))}%</div></div>) : <p className="muted-copy">No weak skills recorded yet. Keep encouraging consistent practice.</p>}</div>
            <div className="panel-white" data-notification-anchor="parent-booking"><div className="panel-title">Tutor sessions</div>{childData.bookings.length ? (() => {
              const targetId = notificationTarget?.bookingId;
              const targetBooking = targetId ? childData.bookings.find(b => String(b.id) === String(targetId)) : null;
              const rows = childData.bookings.slice(0,8);
              if (targetBooking && !rows.some(b => b.id === targetBooking.id)) rows.unshift(targetBooking);
              return rows.map(b => {
                const isTargetBooking = targetId && String(b.id) === String(targetId);
                return <div className={`session-row ${isTargetBooking ? "notification-booking-target" : ""}`} data-notification-booking={b.id} key={b.id}><div className="session-main"><strong>{b.tutors?.name || "Tutor"}</strong><span>{b.subject} · {bookingDateLabel(b.session_date)}{b.start_time ? ` · ${fmtSessionRange(b.start_time, b.duration_minutes)}` : ""}</span></div><div className="session-status">{(() => { const status = bookingDisplayStatus(b); return <Badge c={BOOKING_STATUS_BADGE[status]?.c || "ink"}>{BOOKING_STATUS_BADGE[status]?.label || status}</Badge>; })()}</div></div>;
              });
            })() : <p className="muted-copy">No tutor sessions yet.</p>}</div>
          </div>
        </section>}

        <section className="parent-section connect-section" id="add-child">
          <div><div className="section-kicker">PRIVATE CONNECTION</div><h2>Connect a child</h2><p>Enter the family code your child shares with you. SPARK will send the connection request to their account.</p></div>
          <div className="code-form"><input className="cp-input" value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="CP-XXXXXXXX" maxLength={11}/><button className="cp-btn cp-btn-primary" onClick={requestLink} disabled={sending}>{sending?"Sending…":"Send request"}</button></div>
        </section>

      </div>
    </div>
  );
}

export default function App() {
  const [view, setViewState] = useState(() => viewFromBrowserHash());
  const viewRef = useRef(view);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [liveStats, setLiveStats] = useState({ tutors: 0, questions: 0, topics: 0 });
  // The signed-in user's own row in `tutors` (id + status), or null if
  // they've never applied. Only a `rejected` status (or no row at all)
  // should let someone see/use "Become a tutor" - pending, approved, and
  // deactivated all mean the link should stay hidden.
  const [tutorApp, setTutorApp] = useState(null);
  const [tutorAppLoaded, setTutorAppLoaded] = useState(false);
  // Tracks whichever user id we last saw signed in, so the auth listener
  // below can tell a genuine sign-in apart from Supabase simply re-confirming
  // the same session (e.g. a token refresh triggered by the tab regaining
  // focus) - the event name alone isn't a reliable way to tell these apart.
  const knownUserId = useRef(null);
  // The first auth callback is session restoration, not a fresh login. Keeping
  // track of that distinction is what lets an already signed-in user refresh
  // #/contact, #/tutors, #/dashboard, etc. without being forced elsewhere.
  const authInitialized = useRef(false);
  const hasTutorApp = !!tutorApp && tutorApp.status !== "rejected";
  // Student accounts are never eligible to apply as a tutor, so the
  // "Submit application to become a tutor" link (nav, footer, dashboard)
  // should stay hidden for them the same way it does for accounts that
  // already have an application on file. hasTutorApp is only ever used
  // downstream to control that one link, so folding the student check in
  // here keeps every one of those call sites correct without touching each
  // of them individually.
  const hideTutorApplyLink = profile?.role === "student" || hasTutorApp;

  const setView = useCallback((nextView, options = {}) => {
    const requestedView = typeof nextView === "function"
      ? nextView(viewRef.current)
      : nextView;
    const resolvedView = VIEW_ROUTE_PATHS[requestedView] ? requestedView : "home";

    viewRef.current = resolvedView;
    setViewState(resolvedView);
    writeViewToBrowserHash(resolvedView, options);
  }, []);

  // Keep React in sync when the user uses browser Back/Forward or manually
  // changes a hash route. pushState itself is handled by setView above.
  useEffect(() => {
    const syncViewFromUrl = () => {
      const nextView = viewFromBrowserHash();
      viewRef.current = nextView;
      setViewState(nextView);
    };

    window.addEventListener("popstate", syncViewFromUrl);
    window.addEventListener("hashchange", syncViewFromUrl);
    window.addEventListener("spark:routechange", syncViewFromUrl);
    return () => {
      window.removeEventListener("popstate", syncViewFromUrl);
      window.removeEventListener("hashchange", syncViewFromUrl);
      window.removeEventListener("spark:routechange", syncViewFromUrl);
    };
  }, []);

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const toastTimerRef = useRef(null);

  const dismissToast = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback((msg, type = "info") => {
    const resolvedType = typeof msg === "object" && msg?.type ? msg.type : type;
    const normalized = typeof msg === "object" && msg !== null
      ? { ...msg, type: resolvedType, message: friendlyErrorMessage(msg.message || msg) }
      : { message: friendlyErrorMessage(msg), type: resolvedType };

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(normalized);

    const duration = resolvedType === "error"
      ? 5200
      : resolvedType === "warning"
        ? 4200
        : 3400;

    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, duration);
  }, []);

  

  const updateProfileState = useCallback((patch) => {
    setProfile(current => current ? { ...current, ...patch } : current);
  }, []);
useEffect(() => () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }, []);

  // Load live stats from Supabase
  useEffect(() => {
    Promise.all([
      supabase.from("tutors").select("id", {count:"exact"}).eq("verified", true).eq("active", true),
      supabase.from("questions").select("id", {count:"exact"}),
      supabase.from("topics").select("id", {count:"exact"}),
    ]).then(([tutorsRes, questionsRes, topicsRes]) => {
      setLiveStats({
        tutors: tutorsRes.count || 0,
        questions: questionsRes.count || 0,
        topics: topicsRes.count || 0,
      });
    }).catch(() => {}); // Silent fail - fallback values shown in HomeView
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({data}) => {
      const s = data.session;
      if (s && !s.user.email_confirmed_at) {
        localStorage.setItem("spark_verification_email", s.user.email || "");
        await supabase.auth.signOut();
        setSession(null);
        setLoading(false);
        setView("auth");
        return;
      }
      setSession(s);
      if (s) {
        // getSession() and onAuthStateChange() may both resolve the same
        // restored session. Only the first path should reload account data.
        const shouldLoadProfile = knownUserId.current !== s.user.id;
        knownUserId.current = s.user.id;
        if (shouldLoadProfile) loadProfile(s.user.id);
        restorePushAssociation(s.user.id).catch(error => console.error("Push association restore failed:", error));
      } else setLoading(false);
    });
    const {data: L} = supabase.auth.onAuthStateChange((event, s) => {
      const isInitialAuthResolution = !authInitialized.current;
      authInitialized.current = true;

      // A password-reset link creates a temporary recovery session. It is
      // authenticated, but it must NOT be treated as a normal login. Keep
      // the user on the password-reset screen so they can choose a new
      // password instead of being sent straight to the dashboard.
      if (event === "PASSWORD_RECOVERY") {
        const recoveryEmail = s?.user?.email || localStorage.getItem("spark_reset_email") || "";
        if (recoveryEmail) localStorage.setItem("spark_reset_email", recoveryEmail);
        setSession(s);
        setLoading(false);
        setView("auth-recovery");
        return;
      }
      setSession(s);
      if (s) {
        if (!s.user.email_confirmed_at) {
          localStorage.setItem("spark_verification_email", s.user.email || "");
          knownUserId.current = null;
          setSession(null);
          setProfile(null);
          setTutorApp(null);
          setTutorAppLoaded(false);
          setLoading(false);
          setView("auth");
          return;
        }
        // A verified session is now active - clear any stale email left
        // over from a past signup/verification-pending flow so it stops
        // reappearing on the login form.
        localStorage.removeItem("spark_verification_email");
        const sameSignedInUser = knownUserId.current === s.user.id;
        if (!sameSignedInUser) loadProfile(s.user.id);
        // Supabase can re-fire a session event (token refresh, tab
        // refocus, multi-tab sync) for a user who was already signed in -
        // sometimes even labelled SIGNED_IN, so the event name isn't
        // trustworthy on its own. Only navigate when the signed-in user
        // actually changed (a real sign-in), never when it's the same
        // person's session simply being reconfirmed. Otherwise anything
        // mid-task - a booking modal open on Tutors, for example - gets
        // yanked away and closed the moment the tab regains focus.
        const isNewSignIn = !isInitialAuthResolution && !sameSignedInUser;
        knownUserId.current = s.user.id;
        if (isNewSignIn) {
          restorePushAssociation(s.user.id).catch(error => console.error("Push association restore failed:", error));
          // Don't yank the user off "become-tutor" - signUp() there also
          // fires this listener, and we want them to see the application
          // confirmation screen (step 4) instead of jumping to the dashboard.
          setView(v => v === "become-tutor" ? v : "dashboard");
        }
      }
      else {
        knownUserId.current = null;
        setProfile(null); setTutorApp(null); setTutorAppLoaded(false); setLoading(false);
        // On the first auth resolution, preserve whatever public route was
        // loaded from the URL. A real later sign-out still returns to Home.
        if (!isInitialAuthResolution) setView("home", { replace: true });
      }
    });
    return () => L.subscription.unsubscribe();
  }, []);

  const loadProfile = async (uid) => {
    const {data} = await supabase.from("profiles").select("*").eq("id", uid).single();
    setProfile(data);
    // Resolve tutor status before revealing the authenticated UI. This avoids
    // a student-dashboard flash for approved tutors and lets nested dashboard
    // routes be interpreted correctly on the very first rendered frame.
    await loadTutorApp(uid);
    setLoading(false);
  };

  // The user's own tutor application (id + status), if any - used to
  // decide whether "Become a tutor" should be visible/usable and what
  // BecomeTutorView should show (form, reapply, or a locked message).
  // Called on login and again right after a fresh submission, so state
  // stays correct without waiting for the next full profile reload.
  const loadTutorApp = async (uid) => {
    setTutorAppLoaded(false);
    const {data: tutorRows, error} = await supabase.from("tutors").select("id,status").eq("user_id", uid).limit(1);
    if (error) {
      console.error("Failed to load tutor application status:", error);
      setTutorApp(null);
    } else {
      setTutorApp((tutorRows || [])[0] || null);
    }
    setTutorAppLoaded(true);
  };

  const handleLogout = async () => {
    try { await detachCurrentPushAssociation(); }
    catch (error) { console.error("Push device detach failed during logout:", error); }
    await supabase.auth.signOut();
    showToast("Logged out successfully.", "success");
  };

  // Do not reveal authenticated UI until both the profile and tutor-role
  // lookup have resolved. getSession() and onAuthStateChange() can overlap
  // during refresh, so `loading` alone is not a sufficient render guard.
  const authenticatedRolePending = !!session && (!profile || !tutorAppLoaded);

  if (loading || authenticatedRolePending) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
      background:T.bg,fontFamily:FB,color:T.textMuted}}>
      Loading SPARK…
    </div>
  );

  const navProps = { setView, user: session?.user, profile, onLogout: handleLogout, liveStats, hasTutorApp: hideTutorApplyLink, tutorApp, view };

  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <GlobalStyles/>
      <Nav {...navProps}/>
      {view === "home"         && <HomeView setView={setView} liveStats={liveStats} hasTutorApp={hideTutorApplyLink} user={session?.user} profile={profile} tutorApp={tutorApp} isParent={profile?.role === "parent"}/>}
      {/* key={view} forces a fresh mount when switching between the "auth"
          and "login" routes, so AuthView's internal mode state re-reads
          initialMode each time instead of staying frozen on whichever tab
          it first opened on (that was making Get started/Log in look
          unresponsive when navigating from one to the other). */}
      {(view === "auth" || view === "login" || view === "auth-recovery") && (
        <AuthView
          key={view}
          setView={setView}
          initialMode={view === "login" ? "login" : view === "auth-recovery" ? "forgot" : "signup"}
          recoveryMode={view === "auth-recovery"}
        />
      )}
      {view === "dashboard"    && session && profile?.role === "parent" ? <ParentView user={session.user} profile={profile} setView={setView} showToast={showToast} onProfileUpdated={updateProfileState}/> : null}
      {view === "dashboard"    && session && profile?.role !== "parent" && <DashboardView user={session.user} profile={profile} setView={setView} showToast={showToast} hasTutorApp={hideTutorApplyLink} tutorApp={tutorApp} tutorAppLoaded={tutorAppLoaded} onProfileUpdated={updateProfileState}/>}
      {view === "admin"        && session && profile?.is_admin && <AdminView showToast={showToast} adminUserId={session.user.id}/>}
      {view === "lesson"       && session && <LessonView user={session.user} setView={setView} showToast={showToast} hasTutorApp={hideTutorApplyLink}/>}
      {view === "practice"    && session && profile?.role !== "tutor" && tutorApp?.status !== "approved" && <PracticeHub supabase={supabase} userId={session.user.id} setView={setView}/>}
      {view === "tutors"       && <TutorsView user={session?.user} profile={profile} tutorApp={tutorApp} setView={setView} showToast={showToast} hasTutorApp={hideTutorApplyLink} isParent={profile?.role === "parent"}/>}
	  
	  
      {view === "how-it-works" && <HowItWorksView setView={setView} hasTutorApp={hideTutorApplyLink} isParent={profile?.role === "parent"}/>}
	  {view === "about"        && <AboutView setView={setView} hasTutorApp={hideTutorApplyLink} isParent={profile?.role === "parent"}/>}
	  {view === "contact"      && <ContactView setView={setView} showToast={showToast} hasTutorApp={hideTutorApplyLink} isParent={profile?.role === "parent"}/>}
	  {view === "privacy"      && <PrivacyView setView={setView} hasTutorApp={hideTutorApplyLink} isParent={profile?.role === "parent"}/>}
	  {view === "become-tutor" && <BecomeTutorView setView={setView} user={session?.user} profile={profile} showToast={showToast} hasTutorApp={hideTutorApplyLink} tutorApp={tutorApp} onApplicationSubmitted={loadTutorApp}/>}
      
	
	  
	  {(view === "dashboard" || view === "lesson") && !session && (
        <div style={{flex:1,padding:"4rem",textAlign:"center",color:T.textMuted}}>
          Please <span style={{color:T.teal,cursor:"pointer"}} onClick={() => setView("login")}>sign in</span> to continue.
        </div>
      )}
      <Toast msg={toast} onDismiss={dismissToast}/>
      <ScrollToTopButton raised={!!toast}/>
    </div>
  );
}
// Everything below this line is React component code.
// These components use the same T, FD, FB, Btn, Card, Badge, Footer
// constants that are already defined in spark-app.jsx.
// ─────────────────────────────────────────────────────────────────────────────

// ─── HOW IT WORKS ────────────────────────────────────────────────────────────
function HowItWorksView({ setView, hasTutorApp, isParent }) {
  const studentSteps = [
    ["1", "Sign up free", "Create your account and pick Mathematics. No credit card, no trial period."],
    ["2", "Follow the syllabus", "Every topic on the CXC CSEC syllabus has its own lesson. Work through them in order, or jump to the topics you need most."],
    ["3", "Read the lesson", "Each lesson covers the concept, worked examples you reveal yourself, key facts to memorise, and common mistakes to avoid."],
    ["4", "Practice after every topic", "Complete CSEC-style questions at the end of each topic, using the same question types and level of difficulty."],
    ["5", "Take section exams", "After finishing all topics in a section, take the section exam. This is structured like a real CXC section."],
    ["6", "Sit the full final paper", "Complete a full examination under timed conditions using the required section and question structure."],
    ["7", "Book a tutor if needed", "Book a live session with a verified tutor when you need additional help with a topic."],
  ];

  const tutorSteps = [
    ["1", "Apply online", "Submit your application with your qualifications, subjects, and rate. Our team reviews every application before approval."],
    ["2", "Get verified", "We may request qualification documents. Your profile remains under review until verification is complete, usually within 3 business days."],
    ["3", "Set your availability", "Control your own schedule. Mark which days and times you're available each week. Change it whenever you need to."],
    ["4", "Get booked by students", "Students find you in the marketplace and book directly. You receive a notification with 24 hours notice before each session."],
    ["5", "Conduct the session", "Use a video link of your choice, such as Zoom, Google Meet or Teams. You control the session environment."],
    ["6", "Get reviewed", "After every completed session, students leave a star rating and a written review. Your reputation grows with every booking."],
  ];

  return (
    <div className="how-page" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Hero */}
      <div className="how-hero" style={{ background: `linear-gradient(135deg,${T.navyDeep},${T.navyMid})`, color: "#fff", padding: "56px 28px 48px", textAlign: "center", flexShrink: 0 }}>
        <h1 style={{ fontFamily: FD, fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, margin: "0 0 12px", letterSpacing:"-0.01em" }}>
          How SPARK works
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.8)", maxWidth: 520, margin: "0 auto" }}>
          See how students, parents and tutors use SPARK.
        </p>
      </div>

      <div className="how-page-content" style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 28px", flex: 1 }}>
        {/* Two-column steps */}
        <div className="marketing-grid responsive-grid how-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 48, marginBottom: 52 }}>
          {/* Students */}
          <div>
            <h2 style={{ fontFamily: FD, fontSize: 26, fontWeight: 700, color: T.ink, marginBottom: 24 }}>For students</h2>
            {studentSteps.map(([n, title, desc]) => (
              <div key={n} className="how-step" style={{ display: "flex", gap: 14, marginBottom: 22 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,${T.teal},${T.tealDark})`, color: "#fff", boxShadow: T.shadowSm,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{n}</div>
                <div>
                  <div style={{ fontWeight: 600, color: T.ink, fontSize: 15, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13.5, color: T.textMuted, lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tutors */}
          <div>
            <h2 style={{ fontFamily: FD, fontSize: 26, fontWeight: 700, color: T.ink, marginBottom: 24 }}>For tutors</h2>
            {tutorSteps.map(([n, title, desc]) => (
              <div key={n} className="how-step" style={{ display: "flex", gap: 14, marginBottom: 22 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,${T.amber},#B45309)`, color: "#fff", boxShadow: T.shadowSm,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{n}</div>
                <div>
                  <div style={{ fontWeight: 600, color: T.ink, fontSize: 15, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13.5, color: T.textMuted, lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: FD, fontSize: 24, fontWeight: 700, color: T.ink, marginBottom: 24 }}>Common questions</h2>
          <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {[
              ["Do I need to pay to use SPARK?", "No. The content-subscription line launches free. We'll introduce paid tiers for advanced features, but core lesson content and quizzes will always have a free tier."],
              ["Do tutors need to be on the platform to teach?", "No. Tutors use a video service of their choice, such as Zoom, Google Meet or Teams. SPARK manages the booking."],
              ["Are the practice questions from actual CXC past papers?", "Paper 2 practice questions are original and follow the wording, topic coverage and level of CSEC Mathematics papers. Paper 1 uses the question bank provided for the practice examination."],
              ["Which subjects are available?", "CSEC Mathematics is fully available at launch, covering all 107 specific objectives in the official syllabus. Physics is in development. English A, Chemistry, Biology, and Principles of Accounts are planned."],
              ["Can schools use SPARK?", "Yes. School licensing is one of the three platform lines. Email schools@sparkcxc.com to discuss group access for your institution."],
              ["How does weak topic detection work?", "Every quiz answer you submit is recorded. The platform compares your accuracy per topic against your overall average and flags topics where you're consistently scoring below 60%. These appear in your dashboard under 'Needs work'."],
            ].map(([q, a]) => (
              <Card key={q}>
                <div style={{ fontFamily: FD, fontSize: 16, fontWeight: 600, color: T.ink, marginBottom: 8 }}>{q}</div>
                <div style={{ fontSize: 13.5, color: T.textMuted, lineHeight: 1.6 }}>{a}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Student/tutor conversion CTA - parents don't need either action. */}
        {!isParent && <div style={{ background: `linear-gradient(135deg,${T.teal},${T.tealDark})`, borderRadius: T.rMd,
          padding: 30, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20,
          boxShadow: "0 12px 32px rgba(13,148,136,.28)" }}>
          <div>
            <h3 style={{ fontFamily: FD, fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Ready to start?</h3>
            <p style={{ color: "rgba(255,255,255,.85)", fontSize: 14, margin: 0 }}>Create your free account. No credit card required.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Btn v="amber" onClick={() => setView("auth")} style={{ background: T.amber }}>Start learning →</Btn>
            {!hasTutorApp && (
              <Btn v="ghost" onClick={() => setView("become-tutor")}>Submit application to become a tutor</Btn>
            )}
          </div>
        </div>}
      </div>
      <Footer setView={setView} hasTutorApp={hasTutorApp} isParent={isParent} />
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function AboutView({ setView, hasTutorApp, isParent }) {
  const totalTopics = SYLLABUS_SECTIONS.reduce((a, s) => a + s.topics.length, 0);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div className="about-hero" style={{ background: `linear-gradient(135deg,${T.navyDeep},${T.navyMid})`, color: "#fff", padding: "52px 28px 44px", flexShrink: 0 }}>
        <div className="about-hero-inner">
          <h1 className="about-hero-title" style={{ fontFamily: FD, fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, margin: "0 0 8px" }}>
            About SPARK
          </h1>
          <p className="about-hero-kicker" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#5EEAD4", textTransform: "uppercase", margin: "0 0 14px" }}>
            Student Platform for Assistance, Resources &amp; Knowledge
          </p>
          <p className="about-hero-copy" style={{ fontSize: 16, color: "rgba(255,255,255,.8)", margin: 0 }}>
            Built by educators who grew up doing CSEC exams. Designed for the students who are sitting them now.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 28px", flex: 1 }}>
        {/* Story + stats */}
        <div className="marketing-grid responsive-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 52, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: FD, fontSize: 26, fontWeight: 700, color: T.ink, marginBottom: 16 }}>Why we built this</h2>
            <p style={{ fontSize: 15, color: T.inkSoft, lineHeight: 1.8, marginBottom: 14 }}>
              Many students need more than past papers and solution videos. SPARK combines syllabus-based lessons, timed practice, progress tracking and access to tutors in one place.
            </p>
            <p style={{ fontSize: 15, color: T.inkSoft, lineHeight: 1.8, marginBottom: 14 }}>
              SPARK was built to close that gap. Not by taking a US or UK curriculum platform and relabelling it. By building directly from the official CXC syllabus, with content that is mapped to exactly what CXC tests, exactly how CXC marks it, in language that Caribbean students and teachers actually use.
            </p>
            <p style={{ fontSize: 15, color: T.inkSoft, lineHeight: 1.8 }}>
              Every lesson maps to a specific objective in the official syllabus. Every practice question is written from scratch, modelled on real past papers. Every tutor is vetted before going live. Nothing on this platform is borrowed from somewhere else and relabelled.
            </p>
          </div>
          <div>
            <Card style={{ borderLeft: `3px solid ${T.teal}`, marginBottom: 16 }}>
              <div style={{ fontFamily: FD, fontSize: 36, fontWeight: 700, color: T.ink }}>39%</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 8 }}>Regional CSEC Mathematics pass rate, 2025</div>
              <div style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.55 }}>
                That means 61 out of every 100 students who sat the exam did not pass. SPARK is built to change that number.
              </div>
            </Card>
            <Card style={{ borderLeft: `3px solid ${T.amber}`, marginBottom: 16 }}>
              <div style={{ fontFamily: FD, fontSize: 36, fontWeight: 700, color: T.ink }}>{totalTopics}</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 8 }}>Syllabus topics at launch</div>
              <div style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.55 }}>
                Every specific objective from all 10 sections of the CSEC Mathematics syllabus is included.
              </div>
            </Card>
            <Card style={{ borderLeft: `3px solid ${T.purple}` }}>
              <div style={{ fontFamily: FD, fontSize: 36, fontWeight: 700, color: T.ink }}>27</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 8 }}>Past paper years used to model questions</div>
              <div style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.55 }}>
                CXC Mathematics past papers from 2000 to 2026 were analysed to understand question style, difficulty, and mark allocation before writing each original question.
              </div>
            </Card>
          </div>
        </div>

        {/* Principles */}
        <h2 style={{ fontFamily: FD, fontSize: 24, fontWeight: 700, color: T.ink, marginBottom: 20 }}>
          What we stand for
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginBottom: 48 }}>
          {[
            ["Syllabus-first", "Every piece of content maps to a specific objective in the official CXC syllabus. We don't add content that isn't tested. We don't leave out content that is."],
            ["Original questions", "Every practice question is written from scratch. Same style and difficulty as the real exam, entirely different numbers and scenarios. No copyright issues, no lazy reproduction."],
            ["Honest about difficulty", "We don't tell students the exam is easy. We tell them exactly where they're struggling and give them more practice there."],
            ["Regional by design", "Designed for students preparing for Caribbean secondary examinations."],
            ["No video dependency", "Lessons are written, interactive, and self-paced. Students in areas with limited connectivity or data can study the full lesson without a video loading."],
            ["Tutor quality over quantity", "Every tutor is reviewed and verified before going live. A smaller list of excellent tutors is more useful than a large list of unvetted ones."],
          ].map(([title, desc]) => (
            <Card key={title} className="hl">
              <div style={{ fontFamily: FD, fontSize: 17, fontWeight: 600, color: T.ink, marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 13.5, color: T.textMuted, lineHeight: 1.6 }}>{desc}</div>
            </Card>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Btn onClick={() => setView("auth")} style={{ fontSize: 15, padding: "13px 28px" }}>
            Start learning for free →
          </Btn>
        </div>
      </div>
      <Footer setView={setView} hasTutorApp={hasTutorApp} isParent={isParent} />
    </div>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function ContactView({ setView, showToast, hasTutorApp, isParent }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const sendMessage = () => {
    if (!name || !email || !message) { showToast("Please fill in all required fields."); return; }
    setSent(true);
    showToast("Message sent! We'll reply within 2 business days.");
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div className="contact-hero" style={{ background: `linear-gradient(135deg,${T.navyDeep},${T.navyMid})`, color: "#fff", padding: "52px 28px 44px", flexShrink: 0 }}>
        <div className="contact-hero-inner">
          <h1 className="contact-hero-title" style={{ fontFamily: FD, fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, margin: "0 0 12px" }}>Contact us</h1>
          <p className="contact-hero-copy" style={{ fontSize: 16, color: "rgba(255,255,255,.8)", margin: 0 }}>
            Contact us about questions, feedback, tutor applications or school partnerships.
          </p>
        </div>
      </div>

      <div className="contact-page-content" style={{ maxWidth: 1000, margin: "0 auto", padding: "52px 28px", flex: 1 }}>
        <div className="marketing-grid responsive-grid contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48, alignItems: "start" }}>
          {/* Left: contact details */}
          <div>
            <h2 style={{ fontFamily: FD, fontSize: 22, fontWeight: 700, color: T.ink, marginBottom: 20 }}>Get in touch</h2>
            {[
              ["📧", "Email", "hello@sparkcxc.com"],
              ["🏫", "Schools", "schools@sparkcxc.com"],
              ["📍", "Based in", "Kingston, Jamaica"],
              ["🕐", "Response time", "Within 2 business days"],
            ].map(([icon, label, val]) => (
              <div key={label} style={{ display: "flex", gap: 14, marginBottom: 20, alignItems: "flex-start" }}>
                <div style={{ fontSize: 22 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 600, color: T.ink, fontSize: 14, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 14, color: T.textMuted }}>{val}</div>
                </div>
              </div>
            ))}
            <Card style={{ background: T.tealLight, borderColor: T.teal, marginTop: 8 }}>
              <div style={{ fontFamily: FD, fontSize: 16, fontWeight: 600, color: T.tealDark, marginBottom: 6 }}>
                School partnerships
              </div>
              <div style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.55 }}>
                Looking to license SPARK for your school or institution? Email schools@sparkcxc.com and we'll arrange a call to discuss group access, pricing, and teacher dashboards.
              </div>
            </Card>
          </div>

          {/* Right: form */}
          {!sent ? (
            <Card>
              <h2 style={{ fontFamily: FD, fontSize: 20, fontWeight: 700, color: T.ink, margin: "0 0 20px" }}>Send a message</h2>
              {[["Full name", name, setName, "Andre Campbell", "text", true],
                ["Email address", email, setEmail, "you@example.com", "email", true]].map(([label, val, setter, ph, type, req]) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: T.inkSoft, marginBottom: 5 }}>
                    {label}{req && <span style={{ color: T.red }}> *</span>}
                  </div>
                  <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={ph}
                    style={{ width: "100%", padding: "10px 13px", border: `1.5px solid ${T.border}`, borderRadius: 7,
                      fontSize: 14, color: T.ink, background: T.paper, outline: "none" }}
                    onFocus={e => e.target.style.borderColor = T.teal}
                    onBlur={e => e.target.style.borderColor = T.border} />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.inkSoft, marginBottom: 5 }}>What's this about?</div>
                <select value={subject} onChange={e => setSubject(e.target.value)}
                  style={{ width: "100%", padding: "10px 13px", border: `1.5px solid ${T.border}`, borderRadius: 7,
                    fontSize: 14, color: T.ink, background: T.paper, outline: "none", fontFamily: FB }}>
                  <option value="">Choose a topic…</option>
                  <option>Question as a student</option>
                  <option>Applying to become a tutor</option>
                  <option>School or institution partnership</option>
                  <option>Press or media enquiry</option>
                  <option>Technical issue or bug report</option>
                  <option>Something else</option>
                </select>
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.inkSoft, marginBottom: 5 }}>
                  Message<span style={{ color: T.red }}> *</span>
                </div>
                <textarea value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind…" rows={5}
                  style={{ width: "100%", padding: "10px 13px", border: `1.5px solid ${T.border}`, borderRadius: 7,
                    fontSize: 14, color: T.ink, background: T.paper, outline: "none", resize: "vertical", fontFamily: FB }}
                  onFocus={e => e.target.style.borderColor = T.teal}
                  onBlur={e => e.target.style.borderColor = T.border} />
              </div>
              <Btn onClick={sendMessage} full>Send message</Btn>
            </Card>
          ) : (
            <Card style={{ textAlign: "center", padding: 48 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
              <div style={{ fontFamily: FD, fontSize: 22, fontWeight: 700, color: T.ink, marginBottom: 8 }}>Message sent!</div>
              <p style={{ color: T.textMuted, fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                We'll get back to you at <strong>{email}</strong> within 2 business days.
              </p>
              <Btn v="outline" onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); setSubject(""); }}>
                Send another message
              </Btn>
            </Card>
          )}
        </div>
      </div>
      <Footer setView={setView} hasTutorApp={hasTutorApp} isParent={isParent} />
    </div>
  );
}

// ─── PRIVACY ─────────────────────────────────────────────────────────────────
function PrivacyView({ setView, hasTutorApp, isParent }) {
  const sections = [
    ["Who we are", "SPARK is a digital education platform built for CSEC and CAPE students in the Caribbean, based in Kingston, Jamaica. When this policy says 'we', 'us' or 'our', it means SPARK."],
    ["What data we collect", "We collect the information you provide when you create an account: your name, email address, and role (student, tutor, or parent). We also collect data on how you use the platform: which lessons you complete, how you answer practice questions, the topics you cover, and which tutors you book sessions with. If you choose to enable phone notifications, we store your notification preferences and the browser push subscription information needed to deliver alerts to your device. We collect this data only to deliver the service to you."],
    ["How we use your data", "Your data is used to: (1) manage your account and authenticate your sessions; (2) track your lesson progress and quiz results; (3) surface personalised recommendations based on your quiz performance; (4) connect you with tutors and manage your bookings; (5) improve the platform based on aggregate usage patterns. We do not sell your data to any third party. We do not use your data for advertising purposes, and we have no advertising relationships."],
    ["Students under 18", "Most of our users are minors. We take particular care with student data. We do not collect more information than is needed to deliver the service. We do not share a student's performance data with anyone other than that student themselves and, where a parent account is linked, the parent or guardian."],
    ["Data storage and security", "Your data is stored securely using Supabase, hosted on Amazon Web Services (AWS). Data is encrypted at rest and in transit using industry-standard TLS. Row-level security policies in our database mean that each user can only read and modify their own data - not anyone else's."],
    ["Your rights", "You have the right to: request a copy of the data we hold about you; request correction of any inaccurate information; request deletion of your account and all associated data. To exercise any of these rights, email privacy@sparkcxc.com. We will respond within 14 days."],
    ["Data retention", "If you delete your account, we will delete your personal data within 30 days. Anonymised aggregate statistics (for example, the overall percentage of students who completed a given topic) may be retained indefinitely, as they contain no personally identifiable information."],
    ["Cookies and browser storage", "SPARK uses essential browser storage to keep you signed in and preserve application state. If you enable phone notifications, your browser creates a push subscription endpoint and encryption keys that SPARK stores securely so alerts can reach that device. We do not use advertising cookies, tracking pixels, or non-essential analytics cookies in the current product."],
    ["Changes to this policy", "We may update this policy from time to time. We will notify users of any material changes via email and an in-app notice at least 14 days before the change takes effect."],
    ["Contact", "For any privacy-related questions or requests, email privacy@sparkcxc.com."],
  ];

  return (
    <div className="privacy-page" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div className="privacy-hero" style={{ background: `linear-gradient(135deg,${T.navyDeep},${T.navyMid})`, color: "#fff", padding: "52px 28px 44px", textAlign: "center", flexShrink: 0 }}>
        <h1 style={{ fontFamily: FD, fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, margin: "0 0 10px" }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)" }}>Last updated: September 2026</p>
      </div>
      <div className="privacy-content" style={{ maxWidth: 720, margin: "0 auto", padding: "52px 28px", flex: 1 }}>
        {sections.map(([title, content]) => (
          <div key={title} className="privacy-section" style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: FD, fontSize: 19, fontWeight: 600, color: T.ink, marginBottom: 10 }}>{title}</h2>
            <p style={{ fontSize: 15, color: T.inkSoft, lineHeight: 1.8, margin: 0 }}>{content}</p>
          </div>
        ))}
      </div>
      <Footer setView={setView} hasTutorApp={hasTutorApp} isParent={isParent} />
    </div>
  );
}

// ─── BECOME A TUTOR ───────────────────────────────────────────────────────────
const ALL_SUBJECTS = [
  "Mathematics","Physics","English A","English B","Chemistry","Biology",
  "Principles of Accounts","Economics","History","Geography",
  "Social Studies","Information Technology","Spanish","French",
];
const SUBJECT_KEY_MAP = {
  "Mathematics":"math","Physics":"physics","English A":"english","English B":"english",
  "Chemistry":"chem","Biology":"bio","Principles of Accounts":"accounts",
  "Economics":"econ","History":"history","Geography":"geo",
  "Social Studies":"ss","Information Technology":"it","Spanish":"spanish","French":"french",
};

const InputField = ({ label, value, onChange, placeholder, type = "text", required = false, inputMode, autoComplete, maxLength, minLength, pattern, onBlur, error }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ fontSize: 13, fontWeight: 500, color: T.inkSoft, marginBottom: 5 }}>
      {label}{required && <span style={{ color: T.red }}> *</span>}
    </div>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      inputMode={inputMode} autoComplete={autoComplete} maxLength={maxLength} minLength={minLength} pattern={pattern}
      aria-invalid={!!error} aria-describedby={error ? `${label.replace(/\s+/g, "-").toLowerCase()}-error` : undefined}
      style={{ width: "100%", padding: "10px 13px", border: `1.5px solid ${error ? T.red : T.border}`, borderRadius: 7,
        fontSize: 14, color: T.ink, background: T.paper, outline: "none" }}
      onFocus={e => e.target.style.borderColor = error ? T.red : T.teal}
      onBlur={e => { e.target.style.borderColor = error ? T.red : T.border; onBlur?.(e); }} />
    {error && <div id={`${label.replace(/\s+/g, "-").toLowerCase()}-error`} style={{ marginTop: 5, fontSize: 12, color: T.red }}>{error}</div>}
  </div>
);

// Done by: Odane Robinson
// A phone number field with a country dropdown (flag + dial code) in
// front of the local-number input. `countryIso2`/`onCountryChange` and
// `localNumber`/`onLocalNumberChange` are controlled by the parent, which
// is also responsible for composing the full "+<dialcode><local>" value
// used for validation and submission - this component only handles
// picking the country and typing the local digits.
// Done by: Odane Robinson
// A custom (non-native) country picker. Native <select> option lists are
// rendered by the OS, not the page, and many platforms (Windows especially)
// simply don't have flag-emoji glyphs available inside that native list -
// the text renders fine but the flag doesn't, which is exactly the bug
// reported after the first version of this used a plain <select>. Rendering
// the list as ordinary page content (a portal-positioned div, same pattern
// used by AddToCalendar above) uses the browser's normal emoji rendering
// instead, so flags show reliably everywhere a browser can show emoji at
// all. A small filter box is included since the list has 223 countries.
const CountryFlagDropdown = ({ countryIso2, onChange, error }) => {
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [menuPos, setMenuPos] = useState(null);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const filterInputRef = useRef(null);

  const selected = COUNTRY_CODES.find(c => c.iso2 === countryIso2) || COUNTRY_CODES[0];
  const filtered = filterText.trim()
    ? COUNTRY_CODES.filter(c =>
        c.name.toLowerCase().includes(filterText.trim().toLowerCase()) ||
        c.dialCode.includes(filterText.trim()))
    : COUNTRY_CODES;

  const computePos = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMenuPos({ left: r.left, top: r.bottom + 6, width: Math.max(r.width, 260) });
  }, []);

  useLayoutEffect(() => {
    if (open) computePos();
  }, [open, computePos]);

  useEffect(() => {
    if (!open) return;
    filterInputRef.current?.focus();
    const handleOutside = (e) => {
      const insideButton = wrapRef.current && wrapRef.current.contains(e.target);
      const insideMenu = menuRef.current && menuRef.current.contains(e.target);
      if (!insideButton && !insideMenu) { setOpen(false); setFilterText(""); }
    };
    const handleReflow = (event) => {
      if (menuRef.current && menuRef.current.contains(event.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("scroll", handleReflow, true);
    window.addEventListener("resize", handleReflow);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", handleReflow, true);
      window.removeEventListener("resize", handleReflow);
    };
  }, [open]);

  return (
    <div ref={wrapRef} style={{ position: "relative", flex: "0 0 auto" }}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Country code"
        style={{
          width: 118, padding: "10px 8px", border: `1.5px solid ${error ? T.red : T.border}`,
          borderRadius: 7, fontSize: 14, color: T.ink, background: T.paper, outline: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6, fontFamily: FB,
        }}
      >
        <span style={{ fontSize: 16, lineHeight: 1 }}>{isoToFlagEmoji(selected.iso2)}</span>
        <span style={{ fontSize: 13, color: T.ink }}>+{selected.dialCode}</span>
        <span style={{ marginLeft: "auto", fontSize: 10, color: T.textMuted }}>▾</span>
      </button>

      {open && menuPos && createPortal(
        <div
          ref={menuRef}
          role="listbox"
          className="spark-country-menu"
          style={{
            position: "fixed", left: menuPos.left, top: menuPos.top, width: menuPos.width,
            background: "#fff", border: `1px solid ${T.border}`, borderRadius: 9,
            boxShadow: "0 8px 24px rgba(0,0,0,.12)", zIndex: 9999, overflow: "hidden",
          }}
        >
          <input
            ref={filterInputRef}
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            placeholder="Search countries…"
            style={{
              width: "100%", boxSizing: "border-box", padding: "9px 12px", border: "none",
              borderBottom: `1px solid ${T.borderSoft}`, outline: "none", fontSize: 13, fontFamily: FB,
            }}
          />
          <div style={{ maxHeight: 260, overflowY: "auto" }}>
            {filtered.length === 0 && (
              <div style={{ padding: "12px", fontSize: 13, color: T.textMuted }}>No countries match "{filterText}".</div>
            )}
            {filtered.map(c => (
              <button
                key={c.iso2}
                type="button"
                role="option"
                aria-selected={c.iso2 === countryIso2}
                onClick={() => { onChange(c.iso2); setOpen(false); setFilterText(""); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                  background: c.iso2 === countryIso2 ? T.tealLight : "none", border: "none", textAlign: "left",
                  cursor: "pointer", fontFamily: FB, fontSize: 13.5, color: T.ink,
                }}
                onMouseEnter={e => { if (c.iso2 !== countryIso2) e.currentTarget.style.background = T.muted; }}
                onMouseLeave={e => { if (c.iso2 !== countryIso2) e.currentTarget.style.background = "none"; }}
              >
                <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>{isoToFlagEmoji(c.iso2)}</span>
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                <span style={{ color: T.textMuted, flexShrink: 0 }}>+{c.dialCode}</span>
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

const PhoneInputWithCountry = ({
  label = "Phone number", countryIso2, onCountryChange, localNumber, onLocalNumberChange,
  placeholder = "555 0123", required = false, onBlur, error,
}) => {
  const selectedCountry = COUNTRY_CODES.find(c => c.iso2 === countryIso2) || COUNTRY_CODES[0];
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: T.inkSoft, marginBottom: 5 }}>
        {label}{required && <span style={{ color: T.red }}> *</span>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <CountryFlagDropdown countryIso2={countryIso2} onChange={onCountryChange} error={error} />
        <input
          type="tel"
          value={localNumber}
          onChange={e => onLocalNumberChange(e.target.value)}
          placeholder={placeholder}
          inputMode="tel"
          autoComplete="tel-national"
          maxLength={15}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${label.replace(/\s+/g, "-").toLowerCase()}-error` : undefined}
          style={{
            flex: "1 1 auto", minWidth: 0, padding: "10px 13px", border: `1.5px solid ${error ? T.red : T.border}`,
            borderRadius: 7, fontSize: 14, color: T.ink, background: T.paper, outline: "none",
          }}
          onFocus={e => e.target.style.borderColor = error ? T.red : T.teal}
          onBlur={e => { e.target.style.borderColor = error ? T.red : T.border; onBlur?.(e); }}
        />
      </div>
      <div style={{ marginTop: 5, fontSize: 12, color: T.textMuted }}>
        Will be saved as +{selectedCountry.dialCode} {localNumber || "…"}
      </div>
      {error && <div id={`${label.replace(/\s+/g, "-").toLowerCase()}-error`} style={{ marginTop: 5, fontSize: 12, color: T.red }}>{error}</div>}
    </div>
  );
};

const TextareaField = ({ label, value, onChange, placeholder, required = false, rows = 4 }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ fontSize: 13, fontWeight: 500, color: T.inkSoft, marginBottom: 5 }}>
      {label}{required && <span style={{ color: T.red }}> *</span>}
    </div>
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      style={{ width: "100%", padding: "10px 13px", border: `1.5px solid ${T.border}`, borderRadius: 7,
        fontSize: 14, color: T.ink, background: T.paper, outline: "none", resize: "vertical", fontFamily: FB }}
      onFocus={e => e.target.style.borderColor = T.teal}
      onBlur={e => e.target.style.borderColor = T.border} />
  </div>
);

function BecomeTutorView({ setView, user, profile, showToast, hasTutorApp, tutorApp, onApplicationSubmitted }) {
  // Restore an in-progress application draft, if one was saved before the
  // user navigated away (e.g. to log in) and lost the live component state.
  // Lazy initializers (the () => ... form) run only once, on mount.
  const [savedDraft] = React.useState(() => loadTutorApplicationDraft());
  const [step, setStep] = React.useState(() => savedDraft?.step || 1);
  const [form, setForm] = React.useState(() => ({
    name: profile?.name || "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    subjects: [],
    rate: 1500,
    quals: "",
    experience: "",
    availability: "",
    ...(savedDraft?.form || {}),
  }));
  const [loading, setLoading] = React.useState(false);
  const [phoneTouched, setPhoneTouched] = React.useState(false);
  const [phoneCountry, setPhoneCountry] = React.useState(() => savedDraft?.phoneCountry || "JM");
  const [phoneLocal, setPhoneLocal] = React.useState(() => savedDraft?.phoneLocal || "");

  // Autosave the draft (minus password - never persisted, see
  // src/lib/tutorApplicationDraft.js) on every change, so it survives the
  // BecomeTutorView unmount that happens when navigating to log in.
  //
  // BUG FIX (Odane Robinson): step 4 is the "application submitted"
  // success screen, not an in-progress step - it must never be saved as a
  // resumable draft. The original version saved unconditionally, so the
  // very next render after `setStep(4)` (which runs right after the
  // explicit clearTutorApplicationDraft() call below) re-wrote the draft
  // with step:4, undoing the clear. Refreshing the page then restored
  // that draft and showed "Application submitted!" indefinitely, even
  // for a brand new visit. Now step >= 4 always clears instead of saving.
  React.useEffect(() => {
    if (step >= 4) {
      clearTutorApplicationDraft();
      return;
    }
    saveTutorApplicationDraft({ step, form, phoneCountry, phoneLocal });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, form, phoneCountry, phoneLocal]);

  // Keep form.phone (the single string used for validation and submission)
  // in sync with the country dropdown + local number input above it.
  React.useEffect(() => {
    const dialCode = (COUNTRY_CODES.find(c => c.iso2 === phoneCountry) || COUNTRY_CODES[0]).dialCode;
    const localDigits = phoneLocal.replace(/[^\d]/g, "");
    setForm(f => ({ ...f, phone: localDigits ? `+${dialCode}${localDigits}` : "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneCountry, phoneLocal]);

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const toggleSubject = (s) => {
    setForm(f => {
      if (f.subjects.includes(s)) return { ...f, subjects: f.subjects.filter(x => x !== s) };
      if (f.subjects.length >= 8) { showToast("You can select a maximum of 8 subjects."); return f; }
      return { ...f, subjects: [...f.subjects, s] };
    });
  };

  const isValidPhone = (value) => {
    const raw = String(value || "").trim();
    if (!raw) return false;
    // Accept digits plus normal phone formatting characters only.
    if (!/^[+0-9\s().-]+$/.test(raw)) return false;
    const digits = raw.replace(/\D/g, "");
    // Jamaica: local 10-digit numbers beginning 876 or 658, or +1 followed by one.
    if (/^(876|658)\d{7}$/.test(digits)) return true;
    if (/^1(876|658)\d{7}$/.test(digits) && raw.replace(/\D/g, "").length === 11) return true;
    // International E.164-style number when explicitly entered with +.
    return raw.startsWith("+") && /^\d{10,15}$/.test(digits);
  };

  const validateStep1 = () => {
    const name = form.name.trim().replace(/\s+/g, " ");
    const phone = form.phone.trim();
    const bio = form.bio.trim();
    const email = form.email.trim();
    if (name.length < 2 || name.length > 100) return "Enter your full name (2–100 characters).";
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'’.-]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ'’.-]+)+$/.test(name)) return "Please enter a valid first and last name.";
    if (!isValidPhone(phone)) return "Enter a valid phone number for the selected country.";
    if (bio.length < 80 || bio.length > 2000) return "Your tutor bio must be 80–2,000 characters.";
    if (!user && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return "Enter a valid email address.";
    if (!user && form.password.length < 8) return "Your password must be at least 8 characters.";
    if (!user && !/(?=.*[A-Za-z])(?=.*\d)/.test(form.password)) return "Your password must contain at least one letter and one number.";
    if (!user && form.password.length > 72) return "Your password must be 72 characters or fewer.";
    return null;
  };

  const validateStep2 = () => {
    if (form.subjects.length < 1 || form.subjects.length > 8) return "Select between 1 and 8 subjects.";
    if (!Number.isFinite(Number(form.rate)) || Number(form.rate) < 800 || Number(form.rate) > 5000 || Number(form.rate) % 100 !== 0) return "Choose an hourly rate between J$800 and J$5,000 in J$100 increments.";
    return null;
  };

  const validateStep3 = () => {
    const quals = form.quals.trim();
    const experience = form.experience.trim();
    const availability = form.availability.trim();
    if (quals.length < 10 || quals.length > 2000) return "Add your qualifications (10–2,000 characters).";
    if (experience.length < 5 || experience.length > 2000) return "Add your teaching/tutoring experience (5–2,000 characters).";
    if (availability.length < 5 || availability.length > 1000) return "Add a brief description of your typical availability (5–1,000 characters).";
    return null;
  };

  const validateApplication = () => validateStep1() || validateStep2() || validateStep3();

  const submitApplication = async () => {
    const validationError = validateApplication();
    if (validationError) { showToast(validationError); return; }
    setLoading(true);
    try {
      let uid = user?.id;
      if (!uid) {
        const { data, error } = await supabase.auth.signUp({
          email: form.email.trim(), password: form.password,
          options: { data: { name: form.name.trim(), role: "tutor" } }
        });
        if (error) throw error;
        uid = data.user?.id;
        if (!uid) throw new Error("Account created, but the tutor application could not be attached to it. Please sign in and submit again.");
      }
      const subjectKeys = [...new Set(form.subjects.map(s => SUBJECT_KEY_MAP[s] || s.toLowerCase()))];
      const initials = form.name.trim().split(/\s+/).map(w => w[0]).join("").toUpperCase().slice(0, 2);
      const colors = [
        "linear-gradient(135deg,#0D9488,#0F2557)",
        "linear-gradient(135deg,#7C3AED,#1A3A6B)",
        "linear-gradient(135deg,#059669,#0D4A5A)",
        "linear-gradient(135deg,#1E40AF,#0D4A5A)",
      ];
      const payload = {
        name: form.name.trim().replace(/\s+/g, " "), initials, bio: form.bio.trim(), phone: form.phone.trim(),
        subjects: form.subjects, subject_keys: subjectKeys, rate_jmd: Number(form.rate),
        quals: form.quals.trim(), experience: form.experience.trim(), availability: form.availability.trim(),
        avatar_color: tutorApp?.avatar_color || colors[Math.floor(Math.random() * colors.length)],
      };

      // Use the trusted database RPC for both first-time applications and
      // rejected re-applications. Direct applicant UPDATEs to status are
      // intentionally blocked by the database security trigger.
      const { error } = await supabase.rpc("submit_tutor_application", {
        p_tutor_id: tutorApp?.id || null,
        p_name: payload.name,
        p_initials: payload.initials,
        p_bio: payload.bio,
        p_phone: payload.phone,
        p_subjects: payload.subjects,
        p_subject_keys: payload.subject_keys,
        p_rate_jmd: payload.rate_jmd,
        p_quals: payload.quals,
        p_experience: payload.experience,
        p_availability: payload.availability,
        p_avatar_color: payload.avatar_color,
      });
      if (error) throw error;
      onApplicationSubmitted?.(uid);
      clearTutorApplicationDraft();
      setStep(4);
      showToast(tutorApp?.status === "rejected" ? "Your revised application has been resubmitted for review." : "Application submitted! We'll be in touch within 3 business days.");
    } catch (e) {
      showToast(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tutor-apply-page" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div className="tutor-apply-hero" style={{ background: `linear-gradient(135deg,${T.navyDeep},${T.navyMid})`, color: "#fff", padding: "52px 28px 44px", textAlign: "center", flexShrink: 0 }}>
        <h1 style={{ fontFamily: FD, fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, margin: "0 0 12px" }}>
          Become a SPARK tutor
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.8)", maxWidth: 500, margin: "0 auto" }}>
          Share your knowledge with students across the Caribbean. Set your own rate, your own hours, your own subjects.
        </p>
      </div>

      {tutorApp && tutorApp.status !== "rejected" ? (
        <div className="tutor-apply-status-shell" style={{ maxWidth: 560, margin: "0 auto", padding: "0 28px 64px", flex: 1, width: "100%" }}>
          <Card style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>
              {tutorApp.status === "approved" ? "✅" : tutorApp.status === "deactivated" ? "🚫" : "⏳"}
            </div>
            <div style={{ fontFamily: FD, fontSize: 18, color: T.ink, marginBottom: 8 }}>
              {tutorApp.status === "approved" && "You're already a verified tutor"}
              {tutorApp.status === "deactivated" && "Your tutor account is deactivated"}
              {tutorApp.status === "pending" && "Your application is under review"}
            </div>
            <p style={{ color: T.textMuted, fontSize: 14, marginBottom: tutorApp.status === "approved" ? 20 : 0 }}>
              {tutorApp.status === "approved" && "You can manage your tutor profile from your dashboard."}
              {tutorApp.status === "deactivated" && "Contact SPARK support if you believe this was a mistake."}
              {tutorApp.status === "pending" && "We will contact you within 3 business days. You do not need to reapply."}
            </p>
            {tutorApp.status === "approved" && (
              <Btn onClick={() => setView("dashboard")}>Go to dashboard →</Btn>
            )}
          </Card>
        </div>
      ) : (
      <div className="tutor-apply-content" style={{ maxWidth: 860, margin: "0 auto", padding: "48px 28px", flex: 1, width: "100%" }}>
        {/* Restored-draft notice - shown once, when a saved in-progress
            application was found on mount (e.g. after navigating away to
            log in and back). Odane Robinson. */}
        {savedDraft && step < 4 && (
          <div className="tutor-apply-draft-notice" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
            background: T.tealLight, border: `1px solid ${T.teal}`, borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13 }}>
            <span style={{ color: T.tealDark }}>Your saved application has been restored. Continue from where you stopped.</span>
            <button
              onClick={() => {
                if (!window.confirm("Discard your saved progress and start over?")) return;
                clearTutorApplicationDraft();
                setForm({ name: profile?.name || "", email: "", password: "", phone: "", bio: "", subjects: [], rate: 1500, quals: "", experience: "", availability: "" });
                setPhoneCountry("JM");
                setPhoneLocal("");
                setStep(1);
              }}
              style={{ background: "none", border: "none", color: T.tealDark, textDecoration: "underline", cursor: "pointer", fontSize: 13, fontWeight: 600, flexShrink: 0 }}
            >
              Start over
            </button>
          </div>
        )}
        {/* Step indicator */}
        {step < 4 && (
          <div className="tutor-apply-stepper" style={{ display: "flex", gap: 0, marginBottom: 32, borderRadius: 8, overflow: "hidden", border: `1px solid ${T.border}` }}>
            {["Your details", "Subjects & rate", "Background"].map((label, i) => (
              <div key={label} style={{ flex: 1, padding: "12px 0", textAlign: "center", fontSize: 13,
                background: step === i + 1 ? T.teal : step > i + 1 ? T.tealLight : "#fff",
                color: step === i + 1 ? "#fff" : step > i + 1 ? T.tealDark : T.textMuted,
                fontWeight: step === i + 1 ? 600 : 500 }}>
                {step > i + 1 ? "✓ " : ""}{label}
              </div>
            ))}
          </div>
        )}

        {/* Step 1 - Details */}
        {step === 1 && (
          <div className="tutor-apply-step" style={{ maxWidth: 540, margin: "0 auto" }}>
            <h2 style={{ fontFamily: FD, fontSize: 24, fontWeight: 700, color: T.ink, marginBottom: 4 }}>Tell us about yourself</h2>
            <p style={{ color: T.textMuted, fontSize: 14, marginBottom: 22 }}>This is what students will see on your profile.</p>
            {!user && (<>
              <InputField label="Full name" value={form.name} onChange={v => update("name", v)} placeholder="Andre Campbell" required />
              <InputField label="Email address" type="email" value={form.email} onChange={v => update("email", v)} placeholder="you@example.com" required />
              <InputField label="Create a password" type="password" value={form.password} onChange={v => update("password", v)} placeholder="At least 8 characters" required />
            </>)}
            {user && (
              <InputField label="Full name" value={form.name} onChange={v => update("name", v)} placeholder="Andre Campbell" required />
            )}
            <PhoneInputWithCountry
              label="Phone number" countryIso2={phoneCountry} onCountryChange={setPhoneCountry}
              localNumber={phoneLocal} onLocalNumberChange={setPhoneLocal}
              placeholder={phoneCountry === "JM" ? "555 0123" : "555 0123"} required
              onBlur={() => setPhoneTouched(true)}
              error={phoneTouched && form.phone.trim() && !isValidPhone(form.phone)
                ? (phoneCountry === "JM"
                    ? "Enter a valid Jamaica number, e.g. 876 555 0123 or 658 555 0123."
                    : "Enter a valid phone number for the selected country.")
                : null} />
            <div style={{ fontSize: 12, color: T.textMuted, marginTop: -10, marginBottom: 18 }}>
              This number is used for verification only. Students will not see it.
            </div>
            <TextareaField label="Your tutor bio" value={form.bio}
              onChange={v => update("bio", v)} required rows={5}
              placeholder="Describe your teaching background, approach and areas of specialisation. Students will read this before booking." />
            <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 18 }}>
              Tip: Mention your qualifications, how long you've been tutoring, and any CXC-specific experience (former CXC marker, strong CSEC/CAPE results, etc.).
            </div>
            <Btn onClick={() => {
              const error = validateStep1();
              if (error) { showToast(error); return; }
              setStep(2);
            }} full>Continue →</Btn>
          </div>
        )}

        {/* Step 2 - Subjects & rate */}
        {step === 2 && (
          <div className="tutor-apply-step" style={{ maxWidth: 580, margin: "0 auto" }}>
            <h2 style={{ fontFamily: FD, fontSize: 24, fontWeight: 700, color: T.ink, marginBottom: 4 }}>Subjects and your rate</h2>
            <p style={{ color: T.textMuted, fontSize: 14, marginBottom: 20 }}>Select each subject you are qualified and prepared to tutor.</p>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.inkSoft, marginBottom: 8 }}>
              Subjects you tutor<span style={{ color: T.red }}> *</span>
            </div>
            <div className="tutor-subject-chip-list" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {ALL_SUBJECTS.map(s => (
                <button className="tutor-subject-chip" key={s} onClick={() => toggleSubject(s)}
                  style={{ padding: "8px 14px", borderRadius: 99, fontSize: 13, cursor: "pointer",
                    fontFamily: FB, transition: "all .15s",
                    border: `1.5px solid ${form.subjects.includes(s) ? T.teal : T.border}`,
                    background: form.subjects.includes(s) ? T.tealLight : "transparent",
                    color: form.subjects.includes(s) ? T.tealDark : T.textMuted,
                    fontWeight: form.subjects.includes(s) ? 600 : 400 }}>
                  {s}
                </button>
              ))}
            </div>
            {/* Rate slider */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.inkSoft, marginBottom: 8 }}>
                Your hourly rate (J$)<span style={{ color: T.red }}> *</span>
              </div>
              <div className="tutor-rate-row" style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <input type="range" min={800} max={5000} step={100} value={form.rate}
                  onChange={e => update("rate", parseInt(e.target.value))}
                  style={{ flex: 1, accentColor: T.teal }} />
                <div style={{ fontFamily: FD, fontSize: 24, fontWeight: 700, color: T.ink, minWidth: 130, textAlign: "right" }}>
                  J${form.rate.toLocaleString()}/hr
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.textMuted, marginTop: 4 }}>
                <span>J$800</span>
                <span style={{ color: T.teal, fontWeight: 500 }}>Most tutors: J$1,400–J$2,200</span>
                <span>J$5,000</span>
              </div>
            </div>
            <div className="tutor-apply-actions" style={{ display: "flex", gap: 10 }}>
              <Btn v="outline" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: "center" }}>← Back</Btn>
              <Btn onClick={() => {
                const error = validateStep2();
                if (error) { showToast(error); return; }
                setStep(3);
              }} style={{ flex: 2, justifyContent: "center" }}>Continue →</Btn>
            </div>
          </div>
        )}

        {/* Step 3 - Background */}
        {step === 3 && (
          <div className="tutor-apply-step" style={{ maxWidth: 540, margin: "0 auto" }}>
            <h2 style={{ fontFamily: FD, fontSize: 24, fontWeight: 700, color: T.ink, marginBottom: 4 }}>Your background</h2>
            <p style={{ color: T.textMuted, fontSize: 14, marginBottom: 22 }}>
              This helps us verify you before your profile goes live. Students won't see this directly.
            </p>
            <TextareaField label="Qualifications" value={form.quals} onChange={v => update("quals", v)} rows={3}
              placeholder="e.g. BSc Mathematics (UWI), CSEC distinctions in 8 subjects, former CXC Mathematics marker 2018–2022…" />
            <TextareaField label="Teaching or tutoring experience" value={form.experience} onChange={v => update("experience", v)} rows={3}
              placeholder="How long have you been tutoring? Any schools, academies or platforms? Approximate number of students?" />
            <TextareaField label="Typical availability" value={form.availability} onChange={v => update("availability", v)} rows={3}
              placeholder="e.g. Weekday afternoons 3–8pm, Saturday mornings. Note any weeks you're unavailable." />
            <Card style={{ background: T.amberLight, borderColor: T.amber, marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: T.amber, fontWeight: 600, marginBottom: 4 }}>⚠ Verification note</div>
              <div style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.55 }}>
                Every tutor is reviewed before the profile is published. We may request copies of qualifications. Verification is usually completed within 3 business days.
              </div>
            </Card>
            <div className="tutor-apply-actions" style={{ display: "flex", gap: 10 }}>
              <Btn v="outline" onClick={() => setStep(2)} style={{ flex: 1, justifyContent: "center" }}>← Back</Btn>
              <Btn onClick={submitApplication} disabled={loading} style={{ flex: 2, justifyContent: "center" }}>
                {loading ? "Submitting…" : "Submit application →"}
              </Btn>
            </div>
          </div>
        )}

        {/* Step 4 - Success */}
        {step === 4 && (
          <div className="tutor-apply-success" style={{ maxWidth: 540, margin: "0 auto", textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
            <h2 style={{ fontFamily: FD, fontSize: 28, fontWeight: 700, color: T.ink, marginBottom: 12 }}>
              Application submitted!
            </h2>
            <p style={{ fontSize: 15, color: T.textMuted, lineHeight: 1.65, maxWidth: 420, margin: "0 auto 28px" }}>
              Thanks for applying, {form.name.split(" ")[0]}. Our team will review your application and get back to you within 3 business days at the email address you provided.
            </p>
            <div className="tutor-apply-success-actions" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn onClick={() => setView("home")}>Back to home</Btn>
              <Btn v="outline" onClick={() => setView("tutors")}>Browse other tutors</Btn>
            </div>
          </div>
        )}

        {/* Bottom stats (shown on steps 1–3) */}
        {step < 4 && (
          <div className="tutor-apply-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginTop: 48 }}>
            {[
              ["J$1,500–J$2,000", "Average hourly rate earned by our tutors"],
              ["3–5 days", "Typical review time after application"],
              ["You set it", "Your rate, your hours, your subjects"],
              ["100%", "Control over your own availability"],
            ].map(([v, l]) => (
              <Card key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: FD, fontSize: 24, fontWeight: 700, color: T.teal, marginBottom: 4 }}>{v}</div>
                <div style={{ fontSize: 13, color: T.textMuted }}>{l}</div>
              </Card>
            ))}
          </div>
        )}
      </div>
      )}
      {step < 4 && <Footer setView={setView} hasTutorApp={hasTutorApp} />}
    </div>
  );
}


