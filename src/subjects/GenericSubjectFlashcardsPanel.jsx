import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Card from "../components/ui/Card";
import SparkLoader from "../components/ui/SparkLoader";
import ProgressBar from "../components/ui/ProgressBar";
import { SubjectChangeButton } from "./SubjectSelectionView";
import { loadGenericSubjectStructure } from "./genericSubjectCatalog";
import { recordSubjectActivity } from "./subjectProgress";
import "./genericSubjectFlashcards.css";

function cleanText(value, max = 700) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length <= max ? text : `${text.slice(0, max - 1).trim()}…`;
}

function lessonData(topic = {}) {
  const lesson = topic?.metadata?.lesson;
  return lesson && typeof lesson === "object" && !Array.isArray(lesson) ? lesson : {};
}

function stableCardId(topicId, source, index) {
  return `${String(topicId || "topic")}:${source}:${index}`
    .toLowerCase()
    .replace(/[^a-z0-9:_-]+/g, "-");
}

export function buildGenericSubjectFlashcards(structure = {}) {
  const cards = [];
  const seen = new Set();

  const add = ({ topic, front, back, source, index }) => {
    const safeFront = cleanText(front, 180);
    const safeBack = cleanText(back, 700);
    if (!topic?.id || !safeFront || !safeBack) return;

    const signature = `${safeFront.toLowerCase()}|${safeBack.toLowerCase()}`;
    if (seen.has(signature)) return;
    seen.add(signature);

    cards.push({
      id: stableCardId(topic.id, source, index),
      topicId: topic.id,
      topicTitle: topic.title || topic.id,
      sectionId: topic.sectionId || "",
      front: safeFront,
      back: safeBack,
    });
  };

  (structure?.topics || []).forEach(topic => {
    const lesson = lessonData(topic);
    const explicit = Array.isArray(lesson.flashcards) ? lesson.flashcards : [];

    explicit.forEach((card, index) => {
      add({
        topic,
        front: card?.front || card?.question || card?.prompt,
        back: card?.back || card?.answer || card?.explanation,
        source: "published",
        index,
      });
    });

    const sections = Array.isArray(lesson.sections) ? lesson.sections : [];
    sections.forEach((section, sectionIndex) => {
      const bullets = Array.isArray(section?.bullets) ? section.bullets : [];
      bullets.forEach((bullet, bulletIndex) => {
        const text = cleanText(bullet);
        const match = text.match(/^([^:]{2,80}):\s*(.+)$/);
        if (!match) return;
        add({
          topic,
          front: `What should you know about ${match[1].trim()}?`,
          back: match[2].trim(),
          source: `section-${sectionIndex}-bullet`,
          index: bulletIndex,
        });
      });

      const paragraphs = Array.isArray(section?.paragraphs)
        ? section.paragraphs.filter(Boolean)
        : section?.body
          ? [section.body]
          : [];

      if (section?.title && paragraphs[0]) {
        add({
          topic,
          front: `What should you know about ${cleanText(section.title, 80)}?`,
          back: paragraphs[0],
          source: "section",
          index: sectionIndex,
        });
      }
    });

    const diagrams = Array.isArray(lesson.interactiveDiagrams) ? lesson.interactiveDiagrams : [];
    diagrams.forEach((diagram, diagramIndex) => {
      (Array.isArray(diagram?.labels) ? diagram.labels : []).forEach((label, labelIndex) => {
        if (!label?.text || !label?.explanation) return;
        add({
          topic,
          front: `What should you know about ${cleanText(label.text, 80)}?`,
          back: label.explanation,
          source: `diagram-${diagramIndex}`,
          index: labelIndex,
        });
      });
    });

    const points = Array.isArray(lesson.keyPoints) ? lesson.keyPoints : [];
    points.forEach((point, index) => {
      add({
        topic,
        front: `${cleanText(topic.title, 110)} · Key point ${index + 1}`,
        back: point,
        source: "key-point",
        index,
      });
    });

    if (!cards.some(card => card.topicId === topic.id) && lesson.summary) {
      add({
        topic,
        front: `What is the main takeaway from ${cleanText(topic.title, 100)}?`,
        back: lesson.summary,
        source: "summary",
        index: 0,
      });
    }
  });

  return cards;
}

export default function GenericSubjectFlashcardsPanel({
  supabase,
  userId,
  subject,
  onChangeSubject,
  showToast,
}) {
  const subjectId = String(subject?.id || "").trim().toLowerCase();
  const [structure, setStructure] = useState(null);
  const [loading, setLoading] = useState(Boolean(subjectId));
  const [error, setError] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("all");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewedKeys, setReviewedKeys] = useState(new Set());
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [settling, setSettling] = useState(false);
  const dragRef = useRef({ pointerId: null, startX: 0, lastX: 0, lastTime: 0, velocity: 0, dragged: false });
  const suppressRevealRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    if (!subjectId) {
      setLoading(false);
      setStructure(null);
      return () => { cancelled = true; };
    }

    setLoading(true);
    setError("");

    Promise.all([
      loadGenericSubjectStructure({ supabase, subjectId }),
      userId
        ? supabase.from("spark_subject_progress")
            .select("activity_key,completed")
            .eq("user_id", userId)
            .eq("subject_id", subjectId)
            .eq("activity_type", "flashcard_review")
            .eq("completed", true)
        : Promise.resolve({ data: [], error: null }),
    ]).then(([structureResult, progressResult]) => {
      if (cancelled) return;

      if (structureResult.error) {
        setError("These flashcards could not be loaded. Please try again.");
        setStructure(null);
      } else {
        setStructure(structureResult.data);
      }

      if (!progressResult?.error) {
        setReviewedKeys(new Set(
          (progressResult.data || [])
            .map(row => String(row.activity_key || ""))
            .filter(Boolean)
        ));
      }

      setLoading(false);
    }).catch(loadError => {
      if (cancelled) return;
      console.error("Generic subject flashcards could not load", loadError);
      setError("These flashcards could not be loaded. Please try again.");
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [subjectId, supabase, userId]);

  const allCards = useMemo(() => buildGenericSubjectFlashcards(structure), [structure]);
  const cards = useMemo(
    () => activeSectionId === "all"
      ? allCards
      : allCards.filter(card => card.sectionId === activeSectionId),
    [activeSectionId, allCards]
  );

  const current = cards.length ? cards[Math.min(index, cards.length - 1)] : null;
  const currentReviewed = cards.filter(card => reviewedKeys.has(`flashcard:${card.id}`)).length;

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
    setDragX(0);
  }, [activeSectionId]);

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

  const markReviewed = useCallback(async card => {
    if (!card || !subjectId) return;
    const activityKey = `flashcard:${card.id}`;
    if (reviewedKeys.has(activityKey)) return;

    setReviewedKeys(currentKeys => new Set([...currentKeys, activityKey]));

    const result = await recordSubjectActivity({
      supabase,
      silent: true,
      activity: {
        subjectId,
        activityKey,
        activityType: "flashcard_review",
        sectionId: card.sectionId || null,
        topicId: card.topicId || null,
        title: `${card.topicTitle} flashcard review`,
        completed: true,
        metadata: {
          source: "generic_subject_flashcards",
          card_id: card.id,
          at: new Date().toISOString(),
        },
      },
    });

    if (result?.error) {
      console.warn("Could not save generic subject flashcard review", result.error);
      setReviewedKeys(currentKeys => {
        const next = new Set(currentKeys);
        next.delete(activityKey);
        return next;
      });
      showToast?.("Flashcard opened, but the review could not be saved.", "error");
    }
  }, [reviewedKeys, showToast, subjectId, supabase]);

  const reveal = useCallback(() => {
    if (!current || revealed) return;
    setRevealed(true);
    markReviewed(current);
  }, [current, markReviewed, revealed]);

  const beginDrag = useCallback(event => {
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
    setSettling(false);
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }, [current]);

  const moveDrag = useCallback(event => {
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

  const finishDrag = useCallback(event => {
    const state = dragRef.current;
    if (state.pointerId !== event.pointerId) return;

    const rawDelta = event.clientX - state.startX;
    const direction = rawDelta < 0 ? "next" : "previous";
    const shouldMove = Math.abs(rawDelta) > 64 || Math.abs(state.velocity) > 0.45;
    const moved = shouldMove ? moveCard(direction) : false;

    suppressRevealRef.current = state.dragged;
    dragRef.current.pointerId = null;
    setDragging(false);
    setSettling(!moved);
    setDragX(0);

    window.setTimeout(() => {
      suppressRevealRef.current = false;
      setSettling(false);
    }, moved ? 0 : 260);
  }, [moveCard]);

  const cancelDrag = useCallback(event => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    suppressRevealRef.current = dragRef.current.dragged;
    dragRef.current.pointerId = null;
    setDragging(false);
    setSettling(true);
    setDragX(0);
    window.setTimeout(() => {
      suppressRevealRef.current = false;
      setSettling(false);
    }, 260);
  }, []);

  if (loading) return <SparkLoader variant="section" label={`Loading ${subject?.shortName || "subject"} flashcards`} />;

  return (
    <section className="spark-generic-flashcards">
      <header className="spark-generic-flashcards-head">
        <div>
          <span className="section-kicker">{subject?.qualification || "CSEC"} {subject?.shortName || subject?.name}</span>
          <h1>{subject?.shortName || subject?.name || "Subject"} flashcards</h1>
          <p>Review key ideas taken directly from the published SPARK lessons for this subject.</p>
        </div>
        <SubjectChangeButton onClick={onChangeSubject} />
      </header>

      {error ? (
        <Card className="spark-generic-flashcards-empty">
          <h2>Flashcards could not be loaded</h2>
          <p>{error}</p>
          <button type="button" className="spark-generic-flashcard-action" onClick={onChangeSubject}>Choose another subject</button>
        </Card>
      ) : allCards.length === 0 ? (
        <Card className="spark-generic-flashcards-empty">
          <h2>No flashcards are published yet</h2>
          <p>This subject is available in SPARK, but its lesson content does not contain review cards yet.</p>
          <button type="button" className="spark-generic-flashcard-action" onClick={onChangeSubject}>Choose another subject</button>
        </Card>
      ) : (
        <>
          <div className="spark-generic-flashcards-summary">
            <Card><strong>{allCards.length}</strong><span>Review cards</span></Card>
            <Card><strong>{reviewedKeys.size}</strong><span>Reviewed</span></Card>
            <Card><strong>{structure?.topicCount || 0}</strong><span>Topics represented</span></Card>
          </div>

          <div className="spark-generic-flashcards-sections" aria-label="Choose flashcard section">
            <button type="button" className={activeSectionId === "all" ? "active" : ""} onClick={() => setActiveSectionId("all")}>
              All review
            </button>
            {(structure?.sections || []).filter(section => allCards.some(card => card.sectionId === section.id)).map(section => (
              <button
                type="button"
                key={section.id}
                className={activeSectionId === section.id ? "active" : ""}
                onClick={() => setActiveSectionId(section.id)}
              >
                {section.title}
              </button>
            ))}
          </div>

          <div className="spark-generic-flashcard-progress-row">
            <div>
              <span>{currentReviewed} of {cards.length} reviewed in this selection</span>
              <strong>{cards.length ? Math.round((currentReviewed / cards.length) * 100) : 0}%</strong>
            </div>
            <ProgressBar value={currentReviewed} max={Math.max(1, cards.length)} />
          </div>

          {current && (
            <div className="spark-generic-flashcard-stage">
              <div className="spark-generic-flashcard-count">{index + 1} of {cards.length}</div>
              <button
                key={current.id}
                type="button"
                className={`spark-generic-flashcard ${revealed ? "revealed" : ""} ${dragging ? "is-dragging" : ""} ${settling ? "is-settling" : ""}`}
                style={{ "--spark-generic-flashcard-drag-x": `${dragX}px` }}
                onPointerDown={beginDrag}
                onPointerMove={moveDrag}
                onPointerUp={finishDrag}
                onPointerCancel={cancelDrag}
                onClick={event => {
                  if (suppressRevealRef.current) {
                    event.preventDefault();
                    return;
                  }
                  reveal();
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
                aria-label={revealed ? `Flashcard answer: ${current.back}` : `Flashcard question: ${current.front}. Reveal answer.`}
              >
                <span className="spark-generic-flashcard-topic">{current.topicTitle}</span>
                <div className="spark-generic-flashcard-copy">{revealed ? current.back : current.front}</div>
                <span className="spark-generic-flashcard-hint">{revealed ? "Answer" : "Tap to reveal the answer"}</span>
              </button>

              <div className="spark-generic-flashcard-nav">
                <button type="button" disabled={index === 0} onClick={() => moveCard("previous")}>← Previous</button>
                <button type="button" disabled={index >= cards.length - 1} onClick={() => moveCard("next")}>Next →</button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
