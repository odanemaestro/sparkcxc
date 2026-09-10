import React, { useMemo, useState } from "react";
import { SECTION_A_TOPICS } from "../sectionAMechanics.mjs";
import { PhysicsMechanicsCheckpoint, PhysicsTopicQuiz } from "./PhysicsMechanicsSection";
import { A1_STRUCTURED_BANK } from "../a1ScientificMeasurementStructuredBank.mjs";
import { A2_STRUCTURED_BANK } from "../a2VectorsStructuredBank.mjs";
import { A3_STRUCTURED_BANK } from "../a3StaticsStructuredBank.mjs";
import { A4_STRUCTURED_BANK } from "../a4KinematicsDynamicsStructuredBank.mjs";
import { A5_STRUCTURED_BANK } from "../a5EnergyStructuredBank.mjs";
import { A6_STRUCTURED_BANK } from "../a6HydrostaticsStructuredBank.mjs";
import "./physicsMechanics.css";

const STRUCTURED_BY_TOPIC = Object.freeze({
  A1: A1_STRUCTURED_BANK,
  A2: A2_STRUCTURED_BANK,
  A3: A3_STRUCTURED_BANK,
  A4: A4_STRUCTURED_BANK,
  A5: A5_STRUCTURED_BANK,
  A6: A6_STRUCTURED_BANK,
});

function StructuredPractice() {
  const [topicId, setTopicId] = useState("A1");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [revealed, setRevealed] = useState(false);
  const questions = STRUCTURED_BY_TOPIC[topicId] || [];
  const question = questions[questionIndex % Math.max(questions.length, 1)];

  const responseKey = (partId, field = "answer") => `${topicId}:${question?.id || "q"}:${partId}:${field}`;
  const setResponse = (partId, field, value) => setResponses(current => ({ ...current, [responseKey(partId, field)]: value }));

  return <div className="pm-structured-practice">
    <div className="pm-panel">
      <div className="pm-challenge-row"><div><strong>Structured practice</strong><span>Original CSEC-style Mechanics questions with criterion-by-criterion marking guidance.</span></div></div>
      <nav className="pm-topics" aria-label="Structured practice topic">
        {SECTION_A_TOPICS.map(topic => <button key={topic.id} type="button" className={`pm-topic-btn ${topicId === topic.id ? "active" : ""}`} aria-pressed={topicId === topic.id} onClick={() => { setTopicId(topic.id); setQuestionIndex(0); setResponses({}); setRevealed(false); }}>{topic.id}</button>)}
      </nav>
      {questions.length > 1 && <div className="pm-structured-question-tabs">{questions.map((item, index) => <button type="button" key={item.id} className={questionIndex === index ? "active" : ""} onClick={() => { setQuestionIndex(index); setResponses({}); setRevealed(false); }}>Question {index + 1}</button>)}</div>}
    </div>

    {!question ? <div className="pm-empty">No structured question is available for this topic.</div> : <article className="pm-panel pm-structured-question">
      <div className="pm-structured-title"><div><span className="pm-chip">{topicId}</span><h2>{question.title}</h2></div><strong>{question.marks} marks</strong></div>
      <p className="pm-structured-stem">{question.stem}</p>
      <div className="pm-structured-parts">
        {question.parts.map(part => {
          const fields = Array.isArray(part.responseFields) && part.responseFields.length ? part.responseFields : ["answer"];
          return <section key={part.id} className="pm-structured-part">
            <div className="pm-structured-part-head"><strong>({part.id})</strong><span>{part.marks} marks</span></div>
            <p>{part.prompt}</p>
            {part.requireDrawing && <div className="pm-structured-drawing-note">Complete the required drawing or graph on paper or in your working space. Use the box below for supporting calculations or notes.</div>}
            <div className={`pm-structured-response-grid ${fields.length > 1 ? "multi" : ""}`}>
              {fields.map(field => <label key={field}><span>{field === "answer" ? "Your response" : field.replace(/_/g," ")}</span><textarea value={responses[responseKey(part.id, field)] || ""} onChange={event => setResponse(part.id, field, event.target.value)} rows={fields.length > 1 ? 3 : 4} /></label>)}
            </div>
            {revealed && <div className="pm-marking-guide"><strong>Marking guide</strong><ul>{part.criteria.map((criterion, index) => <li key={`${criterion.code}-${index}`}><span>{criterion.code}</span>{criterion.description}{criterion.manual ? " (manual drawing check)" : ""}</li>)}</ul></div>}
          </section>;
        })}
      </div>
      <div className="pm-action-row"><button type="button" className="pm-btn" onClick={() => setRevealed(value => !value)}>{revealed ? "Hide marking guide" : "Reveal marking guide"}</button><span className="pm-feedback">Use the guide to compare each mark-worthy step. Drawing criteria stay manual.</span></div>
    </article>}
  </div>;
}

export default function PhysicsMechanicsPractice({ userId, onBack, onActivity }) {
  const [mode, setMode] = useState("home");
  const [topicId, setTopicId] = useState("A1");
  const topic = useMemo(() => SECTION_A_TOPICS.find(item => item.id === topicId) || SECTION_A_TOPICS[0], [topicId]);

  if (mode === "topic") return <main className="physics-mechanics"><div className="pm-shell"><div className="pm-support-head"><div><div className="pm-eyebrow">CSEC Physics practice</div><h1>Topic test</h1><p>Choose one Mechanics topic and complete a 10-question objective-linked test.</p></div><button type="button" className="pm-btn secondary" onClick={() => setMode("home")}>← Physics practice</button></div><nav className="pm-topics" aria-label="Physics practice topics">{SECTION_A_TOPICS.map(item => <button key={item.id} type="button" className={`pm-topic-btn ${topicId === item.id ? "active" : ""}`} aria-pressed={topicId === item.id} onClick={() => setTopicId(item.id)}>{item.id} · {item.title}</button>)}</nav><PhysicsTopicQuiz key={topic.id} topic={topic} onActivity={onActivity}/></div></main>;
  if (mode === "checkpoint") return <main className="physics-mechanics"><div className="pm-shell"><div className="pm-support-head"><div><div className="pm-eyebrow">CSEC Physics practice</div><h1>Mechanics checkpoint</h1><p>Complete a cumulative 30-question SPARK assessment across A1 to A6.</p></div><button type="button" className="pm-btn secondary" onClick={() => setMode("home")}>← Physics practice</button></div><PhysicsMechanicsCheckpoint onActivity={onActivity}/></div></main>;
  if (mode === "structured") return <main className="physics-mechanics"><div className="pm-shell"><div className="pm-support-head"><div><div className="pm-eyebrow">CSEC Physics practice</div><h1>Structured practice</h1><p>Work through original Mechanics structured and data-analysis questions, then compare your response with the authored marking criteria.</p></div><button type="button" className="pm-btn secondary" onClick={() => setMode("home")}>← Physics practice</button></div><StructuredPractice /></div></main>;

  return <main className="physics-mechanics"><div className="pm-shell"><div className="pm-support-head"><div>{onBack && <button type="button" className="pm-btn secondary" onClick={onBack} style={{marginBottom:12}}>← Choose another subject</button>}<div className="pm-eyebrow">CSEC Physics · Section A Mechanics</div><h1>Physics practice</h1><p>Choose the type of Mechanics practice you want. Full Physics Paper 1 and Paper 2 simulations are not enabled from a Section A-only release.</p></div></div><div className="pm-practice-card-grid"><button type="button" className="pm-practice-card" onClick={() => setMode("topic")}><span>10</span><small>Topic practice</small><h2>Topic test</h2><p>Choose A1 to A6 and answer 10 objective-linked multiple-choice questions with immediate explanations.</p><b>Open topic test →</b></button><button type="button" className="pm-practice-card" onClick={() => setMode("structured")}><span>Σ</span><small>Written practice</small><h2>Structured questions</h2><p>Work through CSEC-style Mechanics questions and compare your response with the mark-worthy criteria.</p><b>Open structured practice →</b></button><button type="button" className="pm-practice-card" onClick={() => setMode("checkpoint")}><span>30</span><small>Cumulative practice</small><h2>Mechanics checkpoint</h2><p>Answer 30 questions across all six Mechanics topics. This is a SPARK Section A checkpoint, not a full CXC Paper 01.</p><b>Start checkpoint →</b></button></div></div></main>;
}
