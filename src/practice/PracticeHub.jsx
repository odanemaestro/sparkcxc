import React, { lazy, Suspense, useEffect, useMemo } from "react";
import SubjectSelectionView from "../subjects/SubjectSelectionView";
import { useMathPracticeRoute } from "../routing/sparkRoutingV270";
import { getSparkSubjectRegistry, subjectsForCapability } from "../subjects/subjectRegistry";
import { syncLocalPracticeResults } from "./persistence";
import SparkLoader from "../components/ui/SparkLoader";
import BackArrowIcon from "../components/ui/BackArrowIcon";
import "./practiceExam.css";

const AdaptivePractice = lazy(() => import("../adaptive/AdaptivePractice"));
const Paper1Exam = lazy(() => import("./Paper1Exam"));
const Paper2Exam = lazy(() => import("./Paper2Exam"));
const Syllabus2027Hub = lazy(() => import("./Syllabus2027Hub"));
const PhysicsPracticeHub = lazy(() => import("../physics/course/components/PhysicsPracticeHub"));
const InformationTechnologyPracticeHub = lazy(() =>
  import("../informationTechnology/practice/InformationTechnologyPracticeHub")
);
const IntegratedSciencePracticeHub = lazy(() =>
  import("../integratedScience/practice/IntegratedSciencePracticeHub")
);

function PracticeLazyBoundary({ label, children }) {
  return (
    <Suspense fallback={<SparkLoader variant="section" label={label} />}>
      {children}
    </Suspense>
  );
}
const PAPER1_ACTIVE_KEY = "spark-paper1-active-v1";
const PAPER1_RESULTS_KEY = "spark-paper1-results-v1";
const PAPER2_ACTIVE_KEY = "spark-paper2-active-v2";
const PAPER2_RESULTS_KEY = "spark-paper2-results-v2";

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export default function PracticeHub({ supabase, userId, setView, physicsEnabled = false, enrolledSubjectIds = null, initialSubject = null, onSubjectActivity, subjects = null }) {
  const subject = initialSubject;
  const { mode, setMode, examIntent, setExamIntent } = useMathPracticeRoute(initialSubject === "mathematics");

  const paper1Active = readJson(PAPER1_ACTIVE_KEY, null);
  const paper1Results = readJson(PAPER1_RESULTS_KEY, []);
  const paper1Latest = paper1Results[0];
  const paper2Active = readJson(PAPER2_ACTIVE_KEY, null);
  const paper2Results = readJson(PAPER2_RESULTS_KEY, []);
  const paper2Latest = paper2Results[0];

  useEffect(() => {
    if (!initialSubject) {
      setMode("home");
      setExamIntent("resume");
    }
  }, [initialSubject, setMode, setExamIntent]);

  useEffect(() => {
    if (!supabase || !userId) return;
    const storedPaper1Results = readJson(PAPER1_RESULTS_KEY, []);
    const storedPaper2Results = readJson(PAPER2_RESULTS_KEY, []);
    syncLocalPracticeResults({ supabase, userId, paper1Results: storedPaper1Results, paper2Results: storedPaper2Results }).catch(() => {});
  }, [supabase, userId]);

  const practiceSubjects = useMemo(() => {
    const supported = subjectsForCapability(
      Array.isArray(subjects) ? subjects : getSparkSubjectRegistry({ physicsEnabled }),
      "practice"
    );
    if (!Array.isArray(enrolledSubjectIds)) return supported;
    const enrolled = new Set(enrolledSubjectIds.map(id => String(id || "").trim().toLowerCase()).filter(Boolean));
    return supported.filter(item => enrolled.has(String(item.id || "").toLowerCase()));
  }, [physicsEnabled, enrolledSubjectIds, subjects]);
  const selectedSubject = !subject || !Array.isArray(enrolledSubjectIds) || practiceSubjects.some(item => item.id === subject)
    ? subject
    : null;

  if (!selectedSubject) {
    return <SubjectSelectionView
      eyebrow="Practice"
      title="Choose a subject"
      description="Select the CSEC subject you want to practise. Each subject only shows assessment modes supported by its current content."
      capability="practice"
      subjects={practiceSubjects}
      onSelect={item => {
        setMode("home");
        setView?.(
          item.id === "physics"
            ? "practice-physics"
            : item.id === "information-technology"
              ? "practice-information-technology"
              : item.id === "integrated-science"
                ? "practice-integrated-science"
                : "practice-math"
        );
      }}
      onBack={() => setView?.("dashboard")}
    />;
  }

  if (selectedSubject === "physics") {
    return (
      <PracticeLazyBoundary label="Loading Physics practice">
        <PhysicsPracticeHub
          userId={userId}
          onBack={() => { setMode("home"); setView?.("practice"); }}
          onActivity={onSubjectActivity}
        />
      </PracticeLazyBoundary>
    );
  }


  if (selectedSubject === "integrated-science") {
    return (
      <PracticeLazyBoundary label="Loading Integrated Science practice">
        <IntegratedSciencePracticeHub
          supabase={supabase}
          userId={userId}
          onBack={() => setView?.("practice")}
        />
      </PracticeLazyBoundary>
    );
  }

  if (selectedSubject === "information-technology") {
    return (
      <PracticeLazyBoundary label="Loading Information Technology practice">
        <InformationTechnologyPracticeHub
      supabase={supabase}
      userId={userId}
      onActivity={onSubjectActivity}
          onBack={() => { setMode("home"); setView?.("practice"); }}
        />
      </PracticeLazyBoundary>
    );
  }

if (mode === "adaptive") {
    return (
      <PracticeLazyBoundary label="Loading adaptive practice">
        <AdaptivePractice supabase={supabase} userId={userId} setView={() => setMode("home")} backLabel="Back to Practice" />
      </PracticeLazyBoundary>
    );
  }

  if (mode === "paper1") {
    return (
      <PracticeLazyBoundary label="Loading Mathematics Paper 1">
        <Paper1Exam onExit={() => setMode("home")} startFresh={examIntent === "new"} supabase={supabase} userId={userId} />
      </PracticeLazyBoundary>
    );
  }

  if (mode === "paper2") {
    return (
      <PracticeLazyBoundary label="Loading Mathematics Paper 2">
        <Paper2Exam onExit={() => setMode("home")} startFresh={examIntent === "new"} supabase={supabase} userId={userId} />
      </PracticeLazyBoundary>
    );
  }

  if (mode === "2027") {
    return (
      <PracticeLazyBoundary label="Loading 2027 Mathematics practice">
        <Syllabus2027Hub onExit={() => setMode("home")} supabase={supabase} userId={userId} />
      </PracticeLazyBoundary>
    );
  }

  return (
    <main className="practice-hub">
      <section className="practice-hero">
        <div>
          <div className="practice-eyebrow">CSEC Mathematics practice</div>
          <h1>Practise under examination conditions.</h1>
          <p>Select a full Paper 1 or Paper 2 examination, or practise a selected topic.</p>
        </div>
        <button className="practice-back" type="button" onClick={() => { setMode("home"); setView?.("practice"); }}><BackArrowIcon/><span>Change subject</span></button>
      </section>

      <section className="practice-mode-grid practice-mode-grid-three">
        <article className="practice-mode-card paper-mode-card">
          <div className="practice-mode-icon" aria-hidden="true">60</div>
          <div className="practice-mode-label">Paper 1 examination</div>
          <h2>Paper 1 Simulator</h2>
          <p>Answer 60 multiple-choice questions in 1 hour 30 minutes. Questions are selected to reflect the topic coverage and question types used in CSEC Mathematics Paper 01.</p>
          <div className="practice-specs-line">60 questions <span>&middot;</span> 90 minutes <span>&middot;</span> 60 marks <span>&middot;</span> Multiple choice</div>
          <div className="practice-card-actions">
            {paper1Active?.questionIds?.length === 60 && <button type="button" className="practice-primary" onClick={() => { setExamIntent("resume"); setMode("paper1"); }}>Resume paper</button>}
            <button type="button" className={paper1Active?.questionIds?.length === 60 ? "practice-secondary" : "practice-primary"} onClick={() => { setExamIntent("new"); setMode("paper1"); }}>Start new paper</button>
          </div>
        </article>

        <article className="practice-mode-card paper2-mode-card">
          <div className="practice-mode-icon paper2-mode-icon" aria-hidden="true">02</div>
          <div className="practice-mode-label">Paper 2 examination</div>
          <h2>Paper 2 Simulator</h2>
          <p>Answer 10 compulsory structured questions in 2 hours 40 minutes. The paper follows the Section I and Section II mark allocation used in CSEC Mathematics Paper 02. Answers are marked when the paper is submitted.</p>
          <div className="practice-specs-line">10 questions <span>&middot;</span> 160 minutes <span>&middot;</span> 100 marks <span>&middot;</span> Auto-graded</div>
          <div className="practice-card-actions">
            {paper2Active?.exam?.questions?.length === 10 && <button type="button" className="practice-primary" onClick={() => { setExamIntent("resume"); setMode("paper2"); }}>Resume paper</button>}
            <button type="button" className={paper2Active?.exam?.questions?.length === 10 ? "practice-secondary" : "practice-primary"} onClick={() => { setExamIntent("new"); setMode("paper2"); }}>Start new paper</button>
          </div>
        </article>

        <article className="practice-mode-card adaptive-mode-card">
          <div className="practice-mode-icon adaptive-icon" aria-hidden="true"><svg width="32" height="32" viewBox="0 0 32 32" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="16" cy="16" r="10"/><circle cx="16" cy="16" r="5"/><circle cx="16" cy="16" r="1.7" fill="currentColor" stroke="none"/></svg></div>
          <div className="practice-mode-label">Topic practice</div>
          <h2>Adaptive Practice</h2>
          <p>Select a topic and answer questions based on your recent performance.</p>
          <div className="practice-specs-line">Topic focused <span>&middot;</span> Worked solutions <span>&middot;</span> Immediate feedback</div>
          <div className="practice-card-actions"><button type="button" className="practice-primary" onClick={() => setMode("adaptive")}>Open adaptive practice</button></div>
        </article>
      </section>

      <section className="practice-2027-feature-card">
        <div className="practice-2027-feature-copy">
          <div className="practice-2027-feature-kicker"><span>NEW</span> Effective for examinations from May&ndash;June 2027</div>
          <h2>2027 Syllabus Practice</h2>
          <p>Practise the revised modular CSEC Mathematics format, including the compulsory Module 1 investigation and questions written for the amended syllabus objectives.</p>
          <div className="practice-feature-specs-line">3 modules <span>&middot;</span> New Paper 2 structure <span>&middot;</span> Conceptual Knowledge <span>&middot;</span> Algorithmic Knowledge <span>&middot;</span> Reasoning</div>
        </div>
        <button type="button" className="practice-primary practice-2027-open" onClick={() => setMode("2027")}>Open 2027 practice</button>
      </section>

      <section className="practice-integrity-card">
        <div>
          <div className="practice-mode-label">Question selection</div>
          <h2>No question is repeated within the same paper.</h2>
          <p>Paper 1 excludes duplicate and equivalent question variants. Paper 2 selects one question for each examination position and gives priority to questions not used in your recent attempts.</p>
        </div>
        <div className="practice-integrity-stats practice-integrity-stats-four">
          <div><strong>1,675</strong><span>Paper 1 records</span></div>
          <div><strong>60</strong><span>Paper 2 questions</span></div>
          <div><strong>10</strong><span>Paper 2 positions</span></div>
          <div><strong>100</strong><span>Paper 2 marks</span></div>
        </div>
      </section>

      {(paper1Latest || paper2Latest) && (
        <section className="practice-results-grid">
          {paper1Latest && <div className="practice-last-result"><div><span>Latest Paper 1</span><strong>{paper1Latest.score}/60</strong></div><div><span>Percentage</span><strong>{paper1Latest.percent}%</strong></div><div><span>Completed</span><strong>{new Date(paper1Latest.completedAt).toLocaleDateString()}</strong></div></div>}
          {paper2Latest && <div className="practice-last-result"><div><span>Latest Paper 2</span><strong>{paper2Latest.score}/100</strong></div><div><span>Percentage</span><strong>{paper2Latest.percent}%</strong></div><div><span>Completed</span><strong>{new Date(paper2Latest.completedAt).toLocaleDateString()}</strong></div></div>}
        </section>
      )}
    </main>
  );
}
