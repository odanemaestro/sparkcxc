import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MathText from "../../../practice/MathText";
import PhysicsFlashcardVisual from "../../components/PhysicsFlashcardVisual";
import { SECTION_A_TOPICS } from "../sectionAMechanics.mjs";
import { MECHANICS_INTERACTIVES } from "../interactives/mechanicsInteractiveRegistry.mjs";
import { readPhysicsMechanicsProgress, physicsMechanicsProgressSummary } from "../physicsMechanicsProgress.mjs";
import { PHYSICS_COURSE_SECTIONS } from "../../course/fullCourseIndex.mjs";
import { physicsFlashcardQuestion } from "../../course/physicsFlashcardLanguage.mjs";
import { SECTION_B_TOPICS } from "../../thermal/sectionBThermal.mjs";
import { THERMAL_INTERACTIVES } from "../../thermal/interactives/bThermalInteractiveRegistry.mjs";
import { readPhysicsThermalProgress, physicsThermalProgressSummary } from "../../thermal/physicsThermalProgress.mjs";
import { SECTION_C_TOPICS } from "../../waves/sectionCWaves.mjs";
import { WAVES_INTERACTIVES } from "../../waves/interactives/cWavesInteractiveRegistry.mjs";
import { readPhysicsWavesProgress, physicsWavesProgressSummary } from "../../waves/physicsWavesProgress.mjs";
import { SECTION_D_TOPICS } from "../../electricity/sectionDElectricity.mjs";
import { ELECTRICITY_INTERACTIVES } from "../../electricity/interactives/dElectricityInteractiveRegistry.mjs";
import { readPhysicsElectricityProgress, physicsElectricityProgressSummary } from "../../electricity/physicsElectricityProgress.mjs";
import { SECTION_E_TOPICS } from "../../atomic/sectionEAtomic.mjs";
import { ATOMIC_INTERACTIVES } from "../../atomic/interactives/eAtomicInteractiveRegistry.mjs";
import { readPhysicsAtomicProgress, physicsAtomicProgressSummary } from "../../atomic/physicsAtomicProgress.mjs";
import { readPhysicsCourseProgress } from "../../course/physicsCourseProgress.mjs";
import "./physicsMechanics.css";

function ChangeSubjectButton({ onClick }) {
  if (!onClick) return null;
  return (
    <button type="button" className="pm-btn secondary pm-change-subject-btn" onClick={onClick}>
      <svg className="pm-change-subject-icon" viewBox="0 0 20 20" focusable="false" aria-hidden="true">
        <path d="M12.5 5.5 8 10l4.5 4.5M8 10h8" />
      </svg>
      <span>Change subject</span>
    </button>
  );
}

export function PhysicsMechanicsFlashcardsPanel({ onChangeSubject }) {
  const ALL_TOPICS = useMemo(() => [...SECTION_A_TOPICS, ...SECTION_B_TOPICS, ...SECTION_C_TOPICS, ...SECTION_D_TOPICS, ...SECTION_E_TOPICS], []);
  const [topicId, setTopicId] = useState("A1");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [settling, setSettling] = useState(false);
  const dragRef = useRef({ pointerId:null, startX:0, lastX:0, lastTime:0, velocity:0, dragged:false });
  const suppressToggleRef = useRef(false);
  const topic = ALL_TOPICS.find(item => item.id === topicId) || ALL_TOPICS[0];
  const cards = topic.flashcards || [];
  const current = cards.length ? cards[index % cards.length] : null;
  const activeSection = String(topic?.id || "A1").charAt(0);
  const sectionGroups = useMemo(() => ([
    { id: "A", label: "Mechanics" },
    { id: "B", label: "Thermal Physics" },
    { id: "C", label: "Waves and Optics" },
    { id: "D", label: "Electricity" },
    { id: "E", label: "Atomic Physics" },
  ]).map(section => ({
    ...section,
    topics: ALL_TOPICS.filter(item => String(item.id).startsWith(section.id)),
  })), [ALL_TOPICS]);
  const visibleTopics = sectionGroups.find(section => section.id === activeSection)?.topics || [];

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
    setDragX(0);
  }, [topicId]);

  const moveCard = useCallback(direction => {
    if (!cards.length) return false;
    const nextIndex = direction === "next"
      ? Math.min(cards.length - 1, index + 1)
      : Math.max(0, index - 1);
    if (nextIndex === index) return false;
    setIndex(nextIndex);
    setRevealed(false);
    return true;
  }, [cards.length, index]);

  const beginCardDrag = useCallback(event => {
    if (!current) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const now = performance.now();
    dragRef.current = {
      pointerId:event.pointerId,
      startX:event.clientX,
      lastX:event.clientX,
      lastTime:now,
      velocity:0,
      dragged:false,
    };
    setSettling(false);
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }, [current]);

  const moveCardDrag = useCallback(event => {
    const state = dragRef.current;
    if (state.pointerId !== event.pointerId) return;

    const rawDelta = event.clientX - state.startX;
    const atStart = index === 0 && rawDelta > 0;
    const atEnd = index >= cards.length - 1 && rawDelta < 0;
    const delta = (atStart || atEnd) ? rawDelta * 0.24 : rawDelta;
    const now = performance.now();
    const elapsed = Math.max(1, now - state.lastTime);

    state.velocity = (event.clientX - state.lastX) / elapsed;
    state.lastX = event.clientX;
    state.lastTime = now;
    if (Math.abs(rawDelta) > 7) state.dragged = true;

    setDragX(delta);
  }, [cards.length, index]);

  const finishCardDrag = useCallback(event => {
    const state = dragRef.current;
    if (state.pointerId !== event.pointerId) return;

    const rawDelta = event.clientX - state.startX;
    const direction = rawDelta < 0 ? "next" : "previous";
    const shouldMove = Math.abs(rawDelta) > 64 || Math.abs(state.velocity) > 0.45;
    const moved = shouldMove ? moveCard(direction) : false;

    suppressToggleRef.current = state.dragged;
    dragRef.current.pointerId = null;
    setDragging(false);
    setSettling(!moved);
    setDragX(0);

    window.setTimeout(() => {
      suppressToggleRef.current = false;
      setSettling(false);
    }, moved ? 0 : 260);
  }, [moveCard]);

  const cancelCardDrag = useCallback(event => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    suppressToggleRef.current = dragRef.current.dragged;
    dragRef.current.pointerId = null;
    setDragging(false);
    setSettling(true);
    setDragX(0);
    window.setTimeout(() => {
      suppressToggleRef.current = false;
      setSettling(false);
    }, 260);
  }, []);

  function selectSection(sectionId) {
    const firstTopic = sectionGroups.find(section => section.id === sectionId)?.topics?.[0];
    if (firstTopic) setTopicId(firstTopic.id);
  }

  return (
    <section className="physics-mechanics pm-dashboard-panel pm-flashcards-dashboard">
      <div className="pm-support-head">
        <div>
          <div className="pm-eyebrow">CSEC Physics</div>
          <h1>Physics flashcards</h1>
          <p>Choose any Physics topic with an audited flashcard bank, recall the answer, then reveal the response.</p>
        </div>
        <ChangeSubjectButton onClick={onChangeSubject} />
      </div>

      <div className="pm-flashcard-topic-picker">
        <nav className="pm-flashcard-sections" aria-label="Physics flashcard sections">
          {sectionGroups.map(section => (
            <button key={section.id} type="button" aria-pressed={activeSection === section.id} className={`pm-section-filter ${activeSection === section.id ? "active" : ""}`} onClick={() => selectSection(section.id)}>
              <span>Section {section.id}</span>
              <strong>{section.label}</strong>
            </button>
          ))}
        </nav>
        <nav className="pm-topics pm-flashcard-topics" aria-label={`Section ${activeSection} Physics flashcard topics`}>
          {visibleTopics.map(item => (
            <button key={item.id} type="button" aria-pressed={topicId === item.id} className={`pm-topic-btn ${topicId === item.id ? "active" : ""}`} onClick={() => setTopicId(item.id)}>
              <span>{item.id}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </nav>
      </div>

      {!current ? <div className="pm-empty">No flashcards are available for this topic.</div> : (
        <div className="pm-flashcard-study-shell">
          <div className="pm-flashcard-study-meta">
            <div><strong>{topic.id} · {topic.title}</strong><span>{index + 1} of {cards.length}</span></div>
            <span className="pm-chip">{current.objective}</span>
          </div>
          <button
            key={current.id || `${topic.id}-${index}`}
            type="button"
            className={`pm-flashcard pm-flashcard-polished ${revealed ? "revealed" : ""} ${dragging ? "is-dragging" : ""} ${settling ? "is-settling" : ""}`}
            style={{ "--pm-flashcard-drag-x": `${dragX}px` }}
            onPointerDown={beginCardDrag}
            onPointerMove={moveCardDrag}
            onPointerUp={finishCardDrag}
            onPointerCancel={cancelCardDrag}
            onClick={event => {
              if (suppressToggleRef.current) {
                event.preventDefault();
                return;
              }
              setRevealed(value => !value);
            }}
            onKeyDown={event => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveCard("previous");
              } else if (event.key === "ArrowRight") {
                event.preventDefault();
                moveCard("next");
              }
            }}
            aria-label={revealed ? "Show question side" : "Reveal answer"}
          >
            {revealed ? (
              <>
                <small className="pm-flashcard-side-label">ANSWER</small>
                <MathText as="div" prose className="pm-flashcard-answer-text">{current.back}</MathText>
                <PhysicsFlashcardVisual objective={current.objective}/>
                <span className="pm-flashcard-hint">Tap to return to the question</span>
              </>
            ) : (
              <>
                <small className="pm-flashcard-side-label">{current.objective}</small>
                <MathText as="h2" prose className="pm-flashcard-question-text">{physicsFlashcardQuestion(current)}</MathText>
                <span className="pm-flashcard-hint">Tap to reveal the answer</span>
              </>
            )}
          </button>
          <div className="pm-flashcard-nav-row">
            <button type="button" className="pm-btn secondary" disabled={index === 0} onClick={() => moveCard("previous")}>← Previous</button>
            <div className="pm-flashcard-progress-dots" aria-hidden="true"><span style={{ width: `${((index + 1) / cards.length) * 100}%` }} /></div>
            <button type="button" className="pm-btn" disabled={index >= cards.length - 1} onClick={() => moveCard("next")}>Next card →</button>
          </div>
        </div>
      )}
    </section>
  );
}

export function PhysicsMechanicsProgressPanel({ userId, onChangeSubject, onOpenSubject }) {
  const [mechanicsProgress, setMechanicsProgress] = useState(() => readPhysicsMechanicsProgress(userId));
  const [courseProgress, setCourseProgress] = useState(() => readPhysicsCourseProgress(userId));
  const [thermalProgress, setThermalProgress] = useState(() => readPhysicsThermalProgress(userId));
  const [wavesProgress, setWavesProgress] = useState(() => readPhysicsWavesProgress(userId));
  const [electricityProgress, setElectricityProgress] = useState(() => readPhysicsElectricityProgress(userId));
  const [atomicProgress, setAtomicProgress] = useState(() => readPhysicsAtomicProgress(userId));
  useEffect(() => { setMechanicsProgress(readPhysicsMechanicsProgress(userId)); setCourseProgress(readPhysicsCourseProgress(userId)); setThermalProgress(readPhysicsThermalProgress(userId)); setWavesProgress(readPhysicsWavesProgress(userId)); setElectricityProgress(readPhysicsElectricityProgress(userId)); setAtomicProgress(readPhysicsAtomicProgress(userId)); }, [userId]);
  const mechanicsSummary = useMemo(() => physicsMechanicsProgressSummary(mechanicsProgress, SECTION_A_TOPICS, MECHANICS_INTERACTIVES), [mechanicsProgress]);
  const thermalSummary = useMemo(() => physicsThermalProgressSummary(thermalProgress, SECTION_B_TOPICS, THERMAL_INTERACTIVES), [thermalProgress]);
  const wavesSummary = useMemo(() => physicsWavesProgressSummary(wavesProgress, SECTION_C_TOPICS, WAVES_INTERACTIVES), [wavesProgress]);
  const electricitySummary = useMemo(() => physicsElectricityProgressSummary(electricityProgress, SECTION_D_TOPICS, ELECTRICITY_INTERACTIVES), [electricityProgress]);
  const atomicSummary = useMemo(() => physicsAtomicProgressSummary(atomicProgress, SECTION_E_TOPICS, ATOMIC_INTERACTIVES), [atomicProgress]);
  const sectionRows = useMemo(() => Object.entries(PHYSICS_COURSE_SECTIONS).map(([section, lessons]) => {
    const completed = section === "A"
      ? SECTION_A_TOPICS.filter(topic => mechanicsProgress[`lesson:${topic.id}`]).length
      : lessons.filter(lesson => courseProgress[`lesson:${lesson.id}`]).length;
    return { section, completed, total: lessons.length, percent: lessons.length ? Math.round((completed / lessons.length) * 100) : 0 };
  }), [mechanicsProgress, courseProgress]);
  const lessonsCompleted = sectionRows.reduce((sum, row) => sum + row.completed, 0);
  const lessonsTotal = sectionRows.reduce((sum, row) => sum + row.total, 0);
  const lessonPercent = lessonsTotal ? Math.round((lessonsCompleted / lessonsTotal) * 100) : 0;

  return (
    <section className="physics-mechanics pm-dashboard-panel">
      <div className="pm-support-head">
        <div>
          <div className="pm-eyebrow">CSEC Physics</div>
          <h1>Physics progress</h1>
          <p>Track lesson completion across the Physics course, plus lab exploration and available section assessment activity. Completion records study activity separately from assessment performance.</p>
        </div>
        <ChangeSubjectButton onClick={onChangeSubject} />
      </div>

      <div className="pm-progress-summary-grid">
        <div className="pm-progress-summary-card"><strong>{lessonsCompleted}/{lessonsTotal}</strong><span>Course lessons completed</span></div>
        <div className="pm-progress-summary-card"><strong>{mechanicsSummary.labsCompleted + thermalSummary.labsCompleted + wavesSummary.labsCompleted + electricitySummary.labsCompleted + atomicSummary.labsCompleted}/{mechanicsSummary.labsTotal + thermalSummary.labsTotal + wavesSummary.labsTotal + electricitySummary.labsTotal + atomicSummary.labsTotal}</strong><span>Available Physics labs explored</span></div>
        <div className="pm-progress-summary-card"><strong>{lessonPercent}%</strong><span>Lesson coverage</span></div>
      </div>

      <div className="pm-panel pm-progress-topic-panel">
        <div className="pm-progress-panel-head"><div><strong>Progress by Physics section</strong><span>Lesson completion across Sections A to E</span></div>{onOpenSubject && <button type="button" className="pm-btn" onClick={onOpenSubject}>Open Physics</button>}</div>
        <div className="pm-progress-topic-list">
          {sectionRows.map(item => <div key={item.section} className="pm-progress-topic-row"><div><strong>Section {item.section}</strong><span>{item.completed} of {item.total} lessons</span></div><div className="pm-progress-topic-meter"><i style={{width:`${item.percent}%`}} /></div><b>{item.percent}%</b></div>)}
        </div>
      </div>
    </section>
  );
}
