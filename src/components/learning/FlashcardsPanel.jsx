import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import Icon from "../ui/Icon";
import SparkLoader from "../ui/SparkLoader";
import MathText from "../../practice/MathText";
import {
  FLASHCARDS,
  FLASHCARD_DECKS,
  getDueFlashcards,
  nextFlashcardProgress,
  normalizeFlashcardProgress,
  recommendedDeckIdsForSkills,
} from "../../learning/flashcards";
import { flashcardEvidenceForRating } from "../../learning/learnerModel";
import { observeRecommendationOutcome } from "../../learning/learnerIntelligencePersistence";
import { readSparkHashRoute, subscribeSparkRoute } from "../../routing/sparkRoutingV270";

function deckCount(deckId) {
  return FLASHCARDS.filter(card => card.deck === deckId).length;
}

export default function FlashcardsPanel({ userId, supabase, showToast, onProgressChange, onReviewRecorded, onLearnerStateChange, weakSkills = [] }) {
  const [rows, setRows] = useState([]);
  const requestedDeck = readSparkHashRoute().params.get("deck");
  const validRequestedDeck = FLASHCARD_DECKS.some(item => item.id === requestedDeck) ? requestedDeck : null;
  const [deck, setDeck] = useState(validRequestedDeck || "all");
  const [mode, setMode] = useState("due");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [clock, setClock] = useState(() => Date.now());
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [cardSettling, setCardSettling] = useState(false);
  const dragRef = useRef({ pointerId: null, startX: 0, lastX: 0, lastTime: 0, velocity: 0, dragged: false });
  const suppressRevealRef = useRef(false);

  // Keep the due queue live during a study session. In particular, an "Again"
  // card should return after its short retry interval without requiring the
  // student to change tabs or refresh the page.
  useEffect(() => {
    const timer = window.setInterval(() => setClock(Date.now()), 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("spark_flashcard_progress")
      .select("card_id,repetitions,interval_days,ease_factor,last_rating,last_reviewed_at,next_review_at,review_count,updated_at")
      .eq("user_id", userId);
    if (error) {
      console.error("Could not load flashcards:", error);
      setLoadError("Flashcard progress could not be loaded. Make sure the latest SPARK database migration has been applied.");
      setRows([]);
    } else {
      setLoadError("");
      setRows(data || []);
      onProgressChange?.(data || []);
    }
    setLoading(false);
  }, [userId, supabase, onProgressChange]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => subscribeSparkRoute(() => {
    const requested = readSparkHashRoute().params.get("deck");
    if (FLASHCARD_DECKS.some(item => item.id === requested)) setDeck(requested);
  }), []);

  const progress = useMemo(() => normalizeFlashcardProgress(rows), [rows]);
  const priorityDecks = useMemo(() => recommendedDeckIdsForSkills(weakSkills), [weakSkills]);
  const allDueCards = useMemo(() => getDueFlashcards(rows, "all", new Date(clock), priorityDecks), [rows, priorityDecks, clock]);
  const dueCards = useMemo(
    () => getDueFlashcards(rows, deck, new Date(clock), deck === "all" ? priorityDecks : []),
    [rows, deck, priorityDecks, clock]
  );
  const visibleCards = useMemo(() => {
    if (mode === "due") return dueCards;
    return FLASHCARDS.filter(card => deck === "all" || card.deck === deck);
  }, [mode, dueCards, deck]);
  const current = visibleCards.length ? visibleCards[Math.min(index, visibleCards.length - 1)] : null;
  const reviewed = rows.reduce((sum, row) => sum + Math.max(0, Number(row.review_count || 0)), 0);
  const mastered = rows.filter(row => Number(row.repetitions || 0) >= 3 && ["got_it", "easy"].includes(row.last_rating)).length;

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
    setDragX(0);
  }, [deck, mode]);

  const moveCard = useCallback(direction => {
    if (!visibleCards.length) return false;
    const nextIndex = direction === "next"
      ? Math.min(visibleCards.length - 1, index + 1)
      : Math.max(0, index - 1);
    if (nextIndex === index) return false;
    setIndex(nextIndex);
    setRevealed(false);
    return true;
  }, [index, visibleCards.length]);

  const beginFlashcardDrag = useCallback(event => {
    if (saving || !current) return;
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
  }, [current, saving]);

  const moveFlashcardDrag = useCallback(event => {
    const state = dragRef.current;
    if (state.pointerId !== event.pointerId) return;

    const rawDelta = event.clientX - state.startX;
    const atStart = index === 0 && rawDelta > 0;
    const atEnd = index >= visibleCards.length - 1 && rawDelta < 0;
    const delta = (atStart || atEnd) ? rawDelta * 0.24 : rawDelta;
    const now = performance.now();
    const elapsed = Math.max(1, now - state.lastTime);

    state.velocity = (event.clientX - state.lastX) / elapsed;
    state.lastX = event.clientX;
    state.lastTime = now;
    if (Math.abs(rawDelta) > 7) state.dragged = true;

    setDragX(delta);
  }, [index, visibleCards.length]);

  const endFlashcardDrag = useCallback(event => {
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

  const cancelFlashcardDrag = useCallback(event => {
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

  const rate = async rating => {
    if (!current || saving) return;
    setSaving(true);
    const previous = progress[current.id] || {};
    const next = nextFlashcardProgress(previous, rating, new Date());
    const { data, error } = await supabase.rpc("spark_record_flashcard_review", {
      p_card_id: current.id,
      p_rating: rating,
      p_repetitions: next.repetitions,
      p_interval_days: next.interval_days,
      p_ease_factor: next.ease_factor,
      p_next_review_at: next.next_review_at,
    });
    if (error) {
      console.error("Could not save flashcard progress:", error);
      showToast?.("Could not save this flashcard review. Please try again.", "error");
      setSaving(false);
      return;
    }

    const savedRow = data || {
      card_id: current.id,
      ...next,
      review_count: Number(previous.review_count || 0) + 1,
      updated_at: new Date().toISOString(),
    };
    const nextRows = rows.filter(row => row.card_id !== current.id).concat(savedRow);
    setRows(nextRows);
    onProgressChange?.(nextRows);
    const reviewedAt = savedRow.last_reviewed_at || new Date().toISOString();
    onReviewRecorded?.({ card_id: current.id, rating, reviewed_at: reviewedAt });

    observeRecommendationOutcome({
      supabase,
      subjectId: "mathematics",
      activityType: "flashcard_review",
      activityKey: `flashcard:${current.id}`,
      metadata: {
        deck_id: current.deck,
        rating,
      },
    }).then(({ error: outcomeError }) => {
      if (outcomeError && !["PGRST202", "42P01", "42883"].includes(outcomeError.code)) {
        console.warn("Could not observe Mathematics flashcard recommendation outcome", outcomeError);
      }
    }).catch(outcomeError => console.warn("Could not observe Mathematics flashcard recommendation outcome", outcomeError));

    // Flashcard self-ratings are useful learner evidence, but carry less weight
    // than scored quiz or Adaptive Practice answers. A failure here never
    // blocks the spaced-repetition review that was already saved above.
    const deckTitle = FLASHCARD_DECKS.find(item => item.id === current.deck)?.title || current.deck || "Flashcards";
    const evidence = flashcardEvidenceForRating(rating);
    supabase.rpc("spark_record_learner_evidence", {
      p_skill: deckTitle,
      p_source: "flashcard",
      p_item_id: current.id,
      p_correct: evidence.correct,
      p_evidence_weight: evidence.weight,
      p_help_used: evidence.helpUsed,
      p_metadata: { deck_id: current.deck, rating },
      p_evidence_key: `flashcard:${current.id}:${reviewedAt}`,
      p_occurred_at: reviewedAt,
    }).then(({ data: learnerState, error: learnerError }) => {
      if (!learnerError && learnerState) onLearnerStateChange?.(learnerState);
      if (learnerError && learnerError.code !== "PGRST202") {
        console.warn("Could not update learner model from flashcard review:", learnerError);
      }
    });

    setRevealed(false);
    setSaving(false);
    if (mode === "due") setIndex(0);
    else setIndex(value => Math.min(value + 1, Math.max(0, visibleCards.length - 1)));
  };

  return (
    <section className="spark-flashcards-view">
      <div className="spark-feature-heading">
        <div>
          <div className="section-kicker">SMART REVIEW</div>
          <h1>Flashcards</h1>
          <p>Short CSEC Mathematics recall practice that automatically brings cards back when you need them. SPARK prioritizes decks linked to your weaker areas.</p>
        </div>
        <div className="spark-flashcard-summary">
          <span><strong>{allDueCards.length}</strong> due</span>
          <span><strong>{reviewed}</strong> reviews</span>
          <span><strong>{mastered}</strong> mastered</span>
        </div>
      </div>

      {loadError && <div className="spark-inline-warning">{loadError}</div>}

      <div className="spark-flashcard-layout">
        <aside className="spark-flashcard-decks">
          <button className={deck === "all" ? "active" : ""} onClick={() => setDeck("all")}>
            <span>Recommended review</span><strong>{allDueCards.length}</strong>
          </button>
          {FLASHCARD_DECKS.map(item => (
            <button key={item.id} className={deck === item.id ? "active" : ""} onClick={() => setDeck(item.id)}>
              <span>{item.title}</span><strong>{deckCount(item.id)}</strong>
            </button>
          ))}
        </aside>

        <div className="spark-flashcard-main">
          <div className="spark-flashcard-toolbar">
            <div className="spark-segmented-control" aria-label="Flashcard mode">
              <button className={mode === "due" ? "active" : ""} onClick={() => setMode("due")}>Due now</button>
              <button className={mode === "all" ? "active" : ""} onClick={() => setMode("all")}>Browse deck</button>
            </div>
            {current && <span>{index + 1} of {visibleCards.length}</span>}
          </div>

          {loading ? (
            <Card className="spark-flashcard-empty"><SparkLoader variant="inline" label="Loading your flashcards" /></Card>
          ) : !current ? (
            <Card className="spark-flashcard-empty">
              <div className="spark-feature-icon"><Icon name="flashcards" size={24}/></div>
              <h2>You're caught up</h2>
              <p>No cards in this selection are due right now. Browse the full deck if you want extra practice.</p>
              <Btn v="outline" onClick={() => setMode("all")}>Browse cards</Btn>
            </Card>
          ) : (
            <>
              <button
                key={current.id}
                type="button"
                className={`spark-flashcard ${revealed ? "revealed" : ""} ${dragging ? "is-dragging" : ""} ${cardSettling ? "is-settling" : ""}`}
                style={{ "--spark-flashcard-drag-x": `${dragX}px` }}
                onPointerDown={beginFlashcardDrag}
                onPointerMove={moveFlashcardDrag}
                onPointerUp={endFlashcardDrag}
                onPointerCancel={cancelFlashcardDrag}
                onClick={event => {
                  if (suppressRevealRef.current) {
                    event.preventDefault();
                    return;
                  }
                  setRevealed(true);
                }}
                aria-label={revealed ? `Flashcard answer: ${current.back}` : `Flashcard question: ${current.front}. Reveal answer.`}
              >
                <div className="spark-flashcard-label">{FLASHCARD_DECKS.find(item => item.id === current.deck)?.title}</div>
                <MathText as="div" prose className="spark-flashcard-question spark-flashcard-math">{current.front}</MathText>
                {revealed ? (
                  <MathText as="div" prose className="spark-flashcard-answer spark-flashcard-math">{current.back}</MathText>
                ) : (
                  <div className="spark-flashcard-reveal">Tap to reveal the answer</div>
                )}
              </button>

              {revealed && (
                <div className="spark-flashcard-rating" aria-label="How well did you know this card?">
                  <button disabled={saving} onClick={() => rate("again")}><strong>Again</strong><span>About 10 min</span></button>
                  <button disabled={saving} onClick={() => rate("hard")}><strong>Hard</strong><span>Needs work</span></button>
                  <button disabled={saving} onClick={() => rate("got_it")}><strong>Got it</strong><span>Good recall</span></button>
                  <button disabled={saving} onClick={() => rate("easy")}><strong>Easy</strong><span>Well known</span></button>
                </div>
              )}

              <div className="spark-flashcard-nav">
                <button disabled={index === 0} onClick={() => { setIndex(value => Math.max(0, value - 1)); setRevealed(false); }}>
                  <span className="spark-nav-arrow" aria-hidden="true">←</span><span>Previous</span>
                </button>
                <button disabled={index >= visibleCards.length - 1} onClick={() => { setIndex(value => Math.min(visibleCards.length - 1, value + 1)); setRevealed(false); }}>
                  <span>Next</span><span className="spark-nav-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
