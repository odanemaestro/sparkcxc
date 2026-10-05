import React, { useMemo, useState } from "react";
import { englishALessonExamples } from "../data/englishALessonExamples";
import "./englishALessonExamples.css";

export default function EnglishALessonExamples({ topicId }) {
  const data = useMemo(() => englishALessonExamples(topicId), [topicId]);
  const [selected,setSelected] = useState(null);
  const [checked,setChecked] = useState(false);

  if (!data) return null;
  const correct = checked && selected === data.check.answer;

  return (
    <section className="ea-lesson-examples" aria-label="English A examples and quick check">
      <div className="ea-lesson-examples-head">
        <span>Examples in context</span>
        <strong>See the skill before you try it</strong>
      </div>

      <div className="ea-lesson-example-grid">
        {data.examples.map((item,index) => (
          <article className="ea-lesson-example-card" key={topicId + "-" + index}>
            <span className="ea-lesson-example-number">Example {index + 1}</span>
            <h4>{item.title}</h4>
            <p className="ea-lesson-example-text">{item.example}</p>
            <div className="ea-lesson-example-why"><strong>Why it works</strong><span>{item.why}</span></div>
          </article>
        ))}
      </div>

      <div className="ea-lesson-check">
        <div className="ea-lesson-check-head">
          <span>Quick check</span>
          <strong>Try it yourself</strong>
        </div>
        <p>{data.check.prompt}</p>
        <div className="ea-lesson-check-options">
          {data.check.options.map((option,index) => {
            const chosen=selected===index;
            const showCorrect=checked && index===data.check.answer;
            const showWrong=checked && chosen && index!==data.check.answer;
            const className=[chosen ? "selected" : "",showCorrect ? "correct" : "",showWrong ? "wrong" : ""].filter(Boolean).join(" ");
            return (
              <button
                type="button"
                key={index}
                className={className}
                onClick={() => {setSelected(index);setChecked(false);}}
              >
                <span>{String.fromCharCode(65+index)}</span>
                <b>{option}</b>
              </button>
            );
          })}
        </div>
        <div className="ea-lesson-check-actions">
          <button type="button" disabled={selected==null} onClick={() => setChecked(true)}>Check answer</button>
          {checked && (
            <div className={correct ? "correct" : "wrong"}>
              <strong>{correct ? "Correct" : "Not quite"}</strong>
              <span>{data.check.feedback}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
