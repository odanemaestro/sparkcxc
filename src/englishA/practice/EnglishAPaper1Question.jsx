import React from "react";
import { englishAStimuli } from "../data/englishAPaper1Pool";
import "./englishAExam.css";

function Stimulus({ stimulus }) {
  if (!stimulus) return null;

  if (stimulus.kind === "visual" && stimulus.columns && stimulus.rows) {
    return (
      <section className="ea-stimulus ea-stimulus-visual" aria-label={stimulus.title}>
        <div className="ea-stimulus-kicker">{stimulus.label}</div>
        <h3>{stimulus.title}</h3>
        <div className="ea-table-wrap">
          <table>
            <thead>
              <tr>{stimulus.columns.map(column => <th key={column}>{column}</th>)}</tr>
            </thead>
            <tbody>
              {stimulus.rows.map((row,index) => (
                <tr key={stimulus.id + "-" + index}>
                  {row.map((cell,cellIndex) => cellIndex === 0
                    ? <th key={index + "-" + cellIndex} scope="row">{cell}</th>
                    : <td key={index + "-" + cellIndex}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {stimulus.note && <p className="ea-stimulus-note">{stimulus.note}</p>}
      </section>
    );
  }

  if (stimulus.kind === "visual") {
    return (
      <section className="ea-stimulus ea-poster" aria-label={stimulus.title}>
        <div className="ea-stimulus-kicker">{stimulus.label}</div>
        <h3>{stimulus.title}</h3>
        {stimulus.headline && <strong className="ea-poster-headline">{stimulus.headline}</strong>}
        <div className="ea-poster-body">
          {(stimulus.body || []).map((line,index) => <p key={stimulus.id + "-body-" + index}>{line}</p>)}
        </div>
        {stimulus.callout && <div className="ea-poster-callout">{stimulus.callout}</div>}
        {stimulus.footer && <p className="ea-poster-footer">{stimulus.footer}</p>}
      </section>
    );
  }

  const lines = Array.isArray(stimulus.text) ? stimulus.text : [String(stimulus.text || "")];
  return (
    <section className={"ea-stimulus " + (stimulus.kind === "poem" ? "ea-poem" : "")} aria-label={stimulus.title}>
      <div className="ea-stimulus-kicker">{stimulus.label}</div>
      <h3>{stimulus.title}</h3>
      {stimulus.kind === "poem"
        ? <div className="ea-poem-lines">{lines.map((line,index) => <div key={stimulus.id + "-" + index}>{line || " "}</div>)}</div>
        : <div className="ea-prose-lines">{lines.map((line,index) => <p key={stimulus.id + "-" + index}>{line}</p>)}</div>}
    </section>
  );
}

export default function EnglishAPaper1Question({
  question,
  selectedAnswer,
  onAnswer,
  revealFeedback = false,
}) {
  const stimulus = question?.stimulusId ? englishAStimuli[question.stimulusId] : null;

  return (
    <div className="ea-question">
      {stimulus && <Stimulus stimulus={stimulus} />}

      <div className="ea-question-stem">{question.stem}</div>

      <div className="ea-option-list" role="radiogroup" aria-label={"Answers for " + question.id}>
        {Object.entries(question.options || {}).map(([letter,text]) => {
          const selected = selectedAnswer === letter;
          const correct = revealFeedback && question.answer === letter;
          const wrong = revealFeedback && selected && question.answer !== letter;

          return (
            <button
              type="button"
              key={letter}
              className={"ea-option " + (selected ? "selected " : "") + (correct ? "correct " : "") + (wrong ? "wrong" : "")}
              aria-pressed={selected}
              onClick={() => !revealFeedback && onAnswer?.(letter)}
              disabled={revealFeedback}
            >
              <span className="ea-option-letter">{letter}</span>
              <span>{text}</span>
            </button>
          );
        })}
      </div>

      {revealFeedback && (
        <div className={"ea-answer-feedback " + (selectedAnswer === question.answer ? "correct" : "wrong")}>
          <strong>{selectedAnswer === question.answer ? "Correct" : "Correct answer: " + question.answer}</strong>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
