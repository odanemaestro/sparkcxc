import React, { useState } from "react";
import Card from "../../components/ui/Card";
import "./socialStudiesExplorer.css";

const clean = value => String(value ?? "").trim();

function Progress({ current, total }) {
  const percent = total ? Math.round((current / total) * 100) : 0;
  return (
    <div className="ssx-progress" aria-label={`${current} of ${total} completed`}>
      <div><span>Progress</span><strong>{current}/{total}</strong></div>
      <div className="ssx-progress-track"><i style={{ width:`${percent}%` }} /></div>
    </div>
  );
}

function Feedback({ correct, explanation }) {
  if (correct == null) return null;
  return (
    <div className={`ssx-feedback ${correct ? "is-correct" : "is-wrong"}`} role="status">
      <strong>{correct ? "Good reasoning" : "Look at it again"}</strong>
      {explanation && <p>{explanation}</p>}
    </div>
  );
}

function ChoiceActivity({ activity, onComplete }) {
  const items = Array.isArray(activity.items) ? activity.items : [];
  const [index,setIndex] = useState(0);
  const [selected,setSelected] = useState(null);
  const [score,setScore] = useState(0);
  const item = items[index];
  const done = index >= items.length;

  if (!items.length) return null;
  if (done) {
    const percent = Math.round((score / items.length) * 100);
    return (
      <div className="ssx-result">
        <span>Activity complete</span>
        <strong>{score} of {items.length}</strong>
        <p>{percent >= 80 ? "Strong work. You are applying the idea, not just recalling it." : "Review the explanations, then try the activity again later."}</p>
        <button type="button" onClick={() => onComplete?.({ score,total:items.length,percent })}>Save activity</button>
      </div>
    );
  }

  const choices = Array.isArray(item.choices) ? item.choices : [];
  const correctIndex = Number(item.correctIndex ?? item.correct ?? -1);
  const answered = selected !== null;
  const correct = answered ? selected === correctIndex : null;

  return (
    <>
      <Progress current={index} total={items.length} />
      {item.context && <div className="ssx-context">{item.context}</div>}
      <h4>{item.prompt}</h4>
      <div className="ssx-choice-grid">
        {choices.map((choice,choiceIndex) => (
          <button
            type="button"
            key={choiceIndex}
            disabled={answered}
            className={answered ? (choiceIndex === correctIndex ? "is-answer" : choiceIndex === selected ? "is-missed" : "") : ""}
            onClick={() => {
              setSelected(choiceIndex);
              if (choiceIndex === correctIndex) setScore(value => value + 1);
            }}
          >
            {clean(choice)}
          </button>
        ))}
      </div>
      <Feedback correct={correct} explanation={item.explanation} />
      {answered && (
        <button type="button" className="ssx-next" onClick={() => { setIndex(value => value + 1); setSelected(null); }}>
          {index === items.length - 1 ? "See result" : "Next scenario"}
        </button>
      )}
    </>
  );
}

function ClassifyActivity({ activity, onComplete }) {
  const items = Array.isArray(activity.items) ? activity.items : [];
  const categories = Array.isArray(activity.categories) ? activity.categories : [];
  const [answers,setAnswers] = useState({});
  const [checked,setChecked] = useState(false);

  const total = items.length;
  const score = items.reduce((sum,item,index) => sum + (answers[index] === item.category ? 1 : 0),0);

  return (
    <>
      <p className="ssx-instruction">{activity.instructions || "Choose the best category for each example."}</p>
      <div className="ssx-classify-list">
        {items.map((item,index) => {
          const isCorrect = checked && answers[index] === item.category;
          const isWrong = checked && answers[index] && answers[index] !== item.category;
          return (
            <div key={index} className={`ssx-classify-row ${isCorrect ? "is-correct" : isWrong ? "is-wrong" : ""}`}>
              <div><strong>{item.label}</strong>{item.context && <span>{item.context}</span>}</div>
              <select value={answers[index] || ""} disabled={checked} onChange={event => setAnswers(current => ({...current,[index]:event.target.value}))}>
                <option value="">Choose…</option>
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
              </select>
              {checked && <small>{isCorrect ? "Correct" : `Answer: ${item.category}`}{item.explanation ? ` · ${item.explanation}` : ""}</small>}
            </div>
          );
        })}
      </div>
      {!checked ? (
        <button type="button" className="ssx-check" disabled={Object.keys(answers).length !== total} onClick={() => setChecked(true)}>Check answers</button>
      ) : (
        <div className="ssx-result compact">
          <strong>{score} of {total}</strong>
          <button type="button" onClick={() => onComplete?.({ score,total,percent:total ? Math.round((score/total)*100) : 0 })}>Save activity</button>
        </div>
      )}
    </>
  );
}

function RateCalculator({ activity, onComplete }) {
  const examples = Array.isArray(activity.items) ? activity.items : [];
  const [index,setIndex] = useState(0);
  const [answer,setAnswer] = useState("");
  const [checked,setChecked] = useState(false);
  const [score,setScore] = useState(0);
  const item = examples[index];

  if (!item) {
    const total = examples.length;
    const percent = total ? Math.round((score/total)*100) : 0;
    return <div className="ssx-result"><span>Calculator complete</span><strong>{score} of {total}</strong><button type="button" onClick={() => onComplete?.({score,total,percent})}>Save activity</button></div>;
  }

  const expected = Number(item.answer);
  const numeric = Number(answer);
  const tolerance = Number(item.tolerance ?? 0.05);
  const correct = checked ? Math.abs(numeric - expected) <= tolerance : null;

  return (
    <>
      <Progress current={index} total={examples.length} />
      <div className="ssx-data-card">
        <h4>{item.prompt}</h4>
        {Array.isArray(item.data) && <dl>{item.data.map((pair,i) => <div key={i}><dt>{pair[0]}</dt><dd>{pair[1]}</dd></div>)}</dl>}
        {item.formula && <p className="ssx-formula">{item.formula}</p>}
      </div>
      <label className="ssx-number-answer">
        <span>Your answer{item.unit ? ` (${item.unit})` : ""}</span>
        <input inputMode="decimal" value={answer} disabled={checked} onChange={event => setAnswer(event.target.value)} />
      </label>
      {checked && <Feedback correct={correct} explanation={item.explanation || `Expected answer: ${expected}${item.unit ? ` ${item.unit}` : ""}.`} />}
      {!checked ? (
        <button type="button" className="ssx-check" disabled={answer === "" || Number.isNaN(numeric)} onClick={() => { setChecked(true); if (Math.abs(numeric-expected)<=tolerance) setScore(value=>value+1); }}>Check answer</button>
      ) : (
        <button type="button" className="ssx-next" onClick={() => { setIndex(value=>value+1); setAnswer(""); setChecked(false); }}>Next calculation</button>
      )}
    </>
  );
}

function EvidenceActivity({ activity, onComplete }) {
  const sources = Array.isArray(activity.items) ? activity.items : [];
  const [ratings,setRatings] = useState({});
  const [checked,setChecked] = useState(false);
  const score = sources.reduce((sum,item,index)=>sum+(ratings[index]===item.rating?1:0),0);

  return (
    <>
      <p className="ssx-instruction">Judge each source before deciding whether you would rely on it.</p>
      <div className="ssx-source-list">
        {sources.map((item,index) => (
          <article key={index}>
            <span className="ssx-source-type">{item.type || "Source"}</span>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <div className="ssx-rating-row">
              {["Strong","Use with caution","Weak"].map(rating => (
                <button type="button" key={rating} disabled={checked} className={ratings[index]===rating ? "active" : ""} onClick={() => setRatings(current=>({...current,[index]:rating}))}>{rating}</button>
              ))}
            </div>
            {checked && <small className={ratings[index]===item.rating ? "is-correct" : "is-wrong"}>{ratings[index]===item.rating ? "Good judgement." : `Best judgement: ${item.rating}.`} {item.explanation}</small>}
          </article>
        ))}
      </div>
      {!checked ? <button type="button" className="ssx-check" disabled={Object.keys(ratings).length!==sources.length} onClick={()=>setChecked(true)}>Check judgements</button>
      : <div className="ssx-result compact"><strong>{score} of {sources.length}</strong><button type="button" onClick={()=>onComplete?.({score,total:sources.length,percent:sources.length?Math.round(score/sources.length*100):0})}>Save activity</button></div>}
    </>
  );
}

export default function SocialStudiesExplorer({ activity, completed=false, onComplete }) {
  const mode = clean(activity?.mode || activity?.variant || "choice").toLowerCase();
  const [saved,setSaved] = useState(completed);
  const title = clean(activity?.title || "Social Studies activity");
  const subtitle = clean(activity?.subtitle || activity?.instructions);
  const activityId = clean(activity?.id);

  const complete = result => {
    setSaved(true);
    onComplete?.({ activityId,title,...result });
  };

  let body;
  if (mode === "classify") body = <ClassifyActivity activity={activity} onComplete={complete} />;
  else if (mode === "calculator") body = <RateCalculator activity={activity} onComplete={complete} />;
  else if (mode === "evidence") body = <EvidenceActivity activity={activity} onComplete={complete} />;
  else body = <ChoiceActivity activity={activity} onComplete={complete} />;

  return (
    <Card className="ssx-card">
      <header className="ssx-head">
        <div>
          <span>Interactive practice</span>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {saved && <span className="ssx-complete">Completed</span>}
      </header>
      {body}
      {activity?.sourceNote && <p className="ssx-source-note">{activity.sourceNote}</p>}
      {activityId && <span className="sr-only">Activity {activityId}</span>}
    </Card>
  );
}
