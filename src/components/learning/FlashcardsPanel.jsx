import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import Icon from "../ui/Icon";
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

function deckCount(deckId) {
  return FLASHCARDS.filter(card => card.deck === deckId).length;
}

export default function FlashcardsPanel({ userId, supabase, showToast, onProgressChange, onReviewRecorded, onLearnerStateChange, weakSkills = [] }) {
  const [rows, setRows] = useState([]);
  const [deck, setDeck] = useState("all");
  const [mode, setMode] = useState("due");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [clock, setClock] = useState(() => Date.now());

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
  }, [deck, mode]);

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
            <Card className="spark-flashcard-empty"><p>Loading your flashcards…</p></Card>
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
                type="button"
                className={`spark-flashcard ${revealed ? "revealed" : ""}`}
                onClick={() => setRevealed(true)}
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
