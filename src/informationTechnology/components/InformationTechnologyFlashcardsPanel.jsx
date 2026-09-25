import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import course from "../course/itCourseData.json";
import {
  INFORMATION_TECHNOLOGY_OBJECTIVE_FLASHCARDS,
  INFORMATION_TECHNOLOGY_RECALL_FLASHCARDS,
  INFORMATION_TECHNOLOGY_FLASHCARD_COUNTS,
} from "./itFlashcardBank";
import "./informationTechnologyFlashcards.css";

const STORAGE_PREFIX = "spark-it-flashcards-v2";

function storageKey(userId) {
  return `${STORAGE_PREFIX}:${userId || "student"}`;
}

function readProgress(userId) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(userId)) || "{}") || {};
  } catch {
    return {};
  }
}

function writeProgress(userId, value) {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(value || {}));
  } catch {
    // Flashcards remain usable when local storage is unavailable.
  }
}

function cardLabel(card) {
  if (card?.kind === "objective") return `Section ${card.sectionId} · Objective ${card.objectiveId}`;
  return `Section ${card?.sectionId} · Topic ${card?.topicId}`;
}

function ObjectiveAnswer({ card }) {
  return (
    <div className="it-fc-objective-answer">
      <div className="it-fc-answer-title">A complete answer should include:</div>
      <ul>
        {(card.answerPoints || []).map((point, index) => <li key={`${card.id}-${index}`}>{point}</li>)}
      </ul>
      <div className="it-fc-exam-focus">
        <strong>CSEC focus</strong>
        <span>{card.examFocus}</span>
      </div>
    </div>
  );
}

export default function InformationTechnologyFlashcardsPanel({ userId, onChangeSubject, onActivity }) {
  const sections = course.sections || [];
  const topics = course.topics || [];
  const [mode, setMode] = useState("objectives");
  const [sectionId, setSectionId] = useState(() => String(sections[0]?.id || "1"));
  const [topicId, setTopicId] = useState(() => String(sections[0]?.topics?.[0] || sections[0]?.topicIds?.[0] || topics[0]?.id || "1"));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [progress, setProgress] = useState(() => readProgress(userId));
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [cardSettling, setCardSettling] = useState(false);
  const dragRef = useRef({ pointerId: null, startX: 0, lastX: 0, lastTime: 0, velocity: 0, dragged: false });
  const suppressRevealRef = useRef(false);

  useEffect(() => setProgress(readProgress(userId)), [userId]);

  const section = sections.find(item => String(item.id) === sectionId) || sections[0];
  const sectionTopicIds = section?.topics || section?.topicIds || [];
  const visibleTopics = useMemo(
    () => topics.filter(topic => String(topic.section) === String(section?.id)),
    [topics, section]
  );

  useEffect(() => {
    const valid = visibleTopics.some(topic => String(topic.id) === String(topicId));
    if (!valid && visibleTopics[0]) setTopicId(String(visibleTopics[0].id));
  }, [visibleTopics, topicId]);

  const activeCards = useMemo(() => {
    const source = mode === "objectives"
      ? INFORMATION_TECHNOLOGY_OBJECTIVE_FLASHCARDS.filter(card => String(card.sectionId) === String(section?.id))
      : INFORMATION_TECHNOLOGY_RECALL_FLASHCARDS.filter(card => String(card.topicId) === String(topicId));

    if (!shuffle) return source;
    return [...source].sort((a, b) => b.id.localeCompare(a.id));
  }, [mode, section, topicId, shuffle]);

  const current = activeCards.length ? activeCards[Math.min(index, activeCards.length - 1)] : null;
  const reviewedIds = useMemo(() => new Set(progress.reviewedIds || []), [progress]);
  const reviewedCount = reviewedIds.size;
  const reviewedObjectives = INFORMATION_TECHNOLOGY_OBJECTIVE_FLASHCARDS.filter(card => reviewedIds.has(card.id)).length;
  const currentReviewed = activeCards.filter(card => reviewedIds.has(card.id)).length;

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
    setDragX(0);
  }, [mode, sectionId, topicId, shuffle]);

  const moveCard = useCallback(direction => {
    if (!activeCards.length) return false;
    const nextIndex = direction === "next"
      ? Math.min(activeCards.length - 1, index + 1)
      : Math.max(0, index - 1);
    if (nextIndex === index) return false;
    setIndex(nextIndex);
    setRevealed(false);
    return true;
  }, [activeCards.length, index]);

  const beginCardDrag = useCallback(event => {
    if (!current) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const now = performance.now();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      lastTime: now,
      velocity: 0,
      dragged: false,
    };
    setCardSettling(false);
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }, [current]);

  const moveCardDrag = useCallback(event => {
    const state = dragRef.current;
    if (state.pointerId !== event.pointerId) return;

    const rawDelta = event.clientX - state.startX;
    const atStart = index === 0 && rawDelta > 0;
    const atEnd = index >= activeCards.length - 1 && rawDelta < 0;
    const delta = (atStart || atEnd) ? rawDelta * 0.24 : rawDelta;
    const now = performance.now();
    const elapsed = Math.max(1, now - state.lastTime);

    state.velocity = (event.clientX - state.lastX) / elapsed;
    state.lastX = event.clientX;
    state.lastTime = now;
    if (Math.abs(rawDelta) > 7) state.dragged = true;

    setDragX(delta);
  }, [activeCards.length, index]);

  const endCardDrag = useCallback(event => {
    const state = dragRef.current;
    if (state.pointerId !== event.pointerId) return;

    const rawDelta = event.clientX - state.startX;
    const direction = rawDelta < 0 ? "next" : "previous";
    const shouldMove = Math.abs(rawDelta) > 64 || Math.abs(state.velocity) > 0.45;
    const moved = shouldMove ? moveCard(direction) : false;

    suppressRevealRef.current = state.dragged;
    dragRef.current.pointerId = null;
    setDragging(false);
    setCardSettling(!moved);
    setDragX(0);

    window.setTimeout(() => {
      suppressRevealRef.current = false;
      setCardSettling(false);
    }, moved ? 0 : 260);
  }, [moveCard]);

  const cancelCardDrag = useCallback(event => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    suppressRevealRef.current = dragRef.current.dragged;
    dragRef.current.pointerId = null;
    setDragging(false);
    setCardSettling(true);
    setDragX(0);
    window.setTimeout(() => {
      suppressRevealRef.current = false;
      setCardSettling(false);
    }, 260);
  }, []);

  function selectSection(nextSectionId) {
    const nextSection = sections.find(item => String(item.id) === String(nextSectionId));
    const nextTopicId = (nextSection?.topics || nextSection?.topicIds || [])[0];
    setSectionId(String(nextSectionId));
    if (nextTopicId != null) setTopicId(String(nextTopicId));
  }

  function markReviewed(card) {
    if (!card) return;
    const alreadyReviewed = (progress.reviewedIds || []).includes(card.id);
    const nextIds = Array.from(new Set([...(progress.reviewedIds || []), card.id]));
    const next = {
      ...progress,
      reviewedIds: nextIds,
      lastCardId: card.id,
      updatedAt: new Date().toISOString(),
    };
    setProgress(next);
    writeProgress(userId, next);

    if (!alreadyReviewed) {
      onActivity?.({
        type: "it_flashcard_review",
        cardId: card.id,
        cardTitle: card.front || card.objectiveTitle || card.title || "Information Technology flashcard",
        section: card.sectionId != null ? String(card.sectionId) : null,
        topicId: card.topicId != null ? String(card.topicId) : null,
        completed: true,
        at: new Date().toISOString(),
      });
    }
  }

  function toggleReveal() {
    if (!current) return;
    setRevealed(value => {
      const next = !value;
      if (next) markReviewed(current);
      return next;
    });
  }

  return (
    <section className="it-flashcards">
      <div className="it-flashcards-shell">
        <header className="it-flashcards-head">
          <div>
            <div className="it-flashcards-kicker">CSEC INFORMATION TECHNOLOGY</div>
            <h1>Information Technology flashcards</h1>
            <p>Review every syllabus objective and reinforce the key recall points from the SPARK lessons. The objective deck uses the same terminology and coverage map as the Information Technology course.</p>
          </div>
          {onChangeSubject && (
            <button type="button" className="it-flashcards-change" onClick={onChangeSubject}>
              <span aria-hidden="true">←</span>
              <span>Change subject</span>
            </button>
          )}
        </header>

        <div className="it-flashcards-summary">
          <div><strong>{INFORMATION_TECHNOLOGY_FLASHCARD_COUNTS.objectives}/63</strong><span>objectives covered</span></div>
          <div><strong>{INFORMATION_TECHNOLOGY_FLASHCARD_COUNTS.total}</strong><span>total cards</span></div>
          <div><strong>{reviewedObjectives}</strong><span>objectives reviewed</span></div>
          <div><strong>{reviewedCount}</strong><span>cards reviewed</span></div>
        </div>

        <div className="it-flashcards-mode" role="tablist" aria-label="Information Technology flashcard deck">
          <button type="button" role="tab" aria-selected={mode === "objectives"} className={mode === "objectives" ? "active" : ""} onClick={() => setMode("objectives")}>
            <strong>Syllabus objectives</strong>
            <span>63 objective cards with detailed answer points</span>
          </button>
          <button type="button" role="tab" aria-selected={mode === "recall"} className={mode === "recall" ? "active" : ""} onClick={() => setMode("recall")}>
            <strong>Lesson recall</strong>
            <span>52 quick-review cards from all 26 topics</span>
          </button>
        </div>

        <div className="it-flashcards-layout">
          <aside className="it-flashcards-browser">
            <div className="it-flashcards-browser-title">
              <span>SYLLABUS SECTIONS</span>
              <strong>Choose what to review</strong>
            </div>

            <nav className="it-flashcards-sections" aria-label="Information Technology flashcard sections">
              {sections.map(item => {
                const count = INFORMATION_TECHNOLOGY_OBJECTIVE_FLASHCARDS.filter(card => String(card.sectionId) === String(item.id)).length;
                return (
                  <button type="button" key={item.id} className={String(item.id) === String(section?.id) ? "active" : ""} onClick={() => selectSection(item.id)}>
                    <span>{item.id}</span>
                    <span className="it-fc-section-copy"><strong>{item.title}</strong><small>{count} objectives</small></span>
                  </button>
                );
              })}
            </nav>

            {mode === "recall" && (
              <>
                <div className="it-flashcards-topic-label">TOPICS IN SECTION {section?.id}</div>
                <nav className="it-flashcards-topics" aria-label={`Section ${section?.id} Information Technology topics`}>
                  {visibleTopics.map(topic => {
                    const total = INFORMATION_TECHNOLOGY_RECALL_FLASHCARDS.filter(card => String(card.topicId) === String(topic.id)).length;
                    const reviewed = INFORMATION_TECHNOLOGY_RECALL_FLASHCARDS.filter(card => String(card.topicId) === String(topic.id) && reviewedIds.has(card.id)).length;
                    return (
                      <button type="button" key={topic.id} className={String(topic.id) === String(topicId) ? "active" : ""} onClick={() => setTopicId(String(topic.id))}>
                        <span className="it-flashcards-topic-number">{topic.id}</span>
                        <span className="it-flashcards-topic-copy"><strong>{topic.title}</strong><small>{reviewed}/{total} reviewed</small></span>
                      </button>
                    );
                  })}
                </nav>
              </>
            )}

            {mode === "objectives" && (
              <div className="it-fc-section-objectives">
                <span>SECTION {section?.id} COVERAGE</span>
                <strong>{activeCards.length} objectives represented</strong>
                <p>Each card is tied directly to one mapped syllabus objective and includes every coverage point recorded for that objective.</p>
              </div>
            )}
          </aside>

          <div className="it-flashcards-study">
            <div className="it-flashcards-toolbar">
              <div>
                <span>{mode === "objectives" ? `SECTION ${section?.id} · OBJECTIVE MASTERY` : `SECTION ${section?.id} · TOPIC ${topicId}`}</span>
                <strong>{mode === "objectives" ? section?.title : topics.find(topic => String(topic.id) === String(topicId))?.title}</strong>
              </div>
              <button type="button" className={shuffle ? "active" : ""} aria-pressed={shuffle} onClick={() => setShuffle(value => !value)}>↻ {shuffle ? "Shuffled" : "Shuffle"}</button>
            </div>

            {!current ? <div className="it-flashcards-empty">No flashcards are available for this selection.</div> : (
              <>
                <div className="it-flashcards-meta">
                  <span>{cardLabel(current)}</span>
                  <strong>{index + 1} of {activeCards.length}</strong>
                </div>

                <button
                  key={current.id}
                  type="button"
                  className={`it-flashcard ${revealed ? "revealed" : ""} ${dragging ? "is-dragging" : ""} ${cardSettling ? "is-settling" : ""}`}
                  style={{ "--it-flashcard-drag-x": `${dragX}px` }}
                  onPointerDown={beginCardDrag}
                  onPointerMove={moveCardDrag}
                  onPointerUp={endCardDrag}
                  onPointerCancel={cancelCardDrag}
                  onClick={event => {
                    if (suppressRevealRef.current) {
                      event.preventDefault();
                      return;
                    }
                    toggleReveal();
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
                  aria-label={revealed ? "Show question side" : "Reveal flashcard answer"}
                >
                  <span className="it-flashcard-side">{revealed ? "ANSWER" : mode === "objectives" ? `OBJECTIVE ${current.objectiveKey}` : "QUESTION"}</span>

                  {!revealed ? (
                    <>
                      <h2>{current.front}</h2>
                      <span className="it-flashcard-hint">Recall the key points before you reveal the answer</span>
                    </>
                  ) : current.kind === "objective" ? (
                    <>
                      <ObjectiveAnswer card={current}/>
                      <span className="it-flashcard-hint">Tap to return to the question</span>
                    </>
                  ) : (
                    <>
                      <p className="it-fc-recall-answer">{current.back}</p>
                      <span className="it-flashcard-hint">Tap to return to the question</span>
                    </>
                  )}
                </button>

                <div className="it-flashcards-progress-row">
                  <span className="it-flashcards-progress-track"><i style={{ width: `${activeCards.length ? ((index + 1) / activeCards.length) * 100 : 0}%` }}/></span>
                  <span>{currentReviewed} of {activeCards.length} reviewed</span>
                </div>

                <div className="it-flashcards-nav">
                  <button type="button" disabled={index === 0} onClick={() => { setIndex(value => Math.max(0, value - 1)); setRevealed(false); }}>← Previous</button>
                  <button type="button" disabled={index >= activeCards.length - 1} onClick={() => { setIndex(value => Math.min(activeCards.length - 1, value + 1)); setRevealed(false); }}>Next card →</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
