import React, { useMemo, useState } from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import ProgressBar from "../../components/ui/ProgressBar";
import { SOCIAL_STUDIES_SHORT_ANSWER_BANK } from "../data/socialStudiesShortAnswerBank";
import { gradeSocialStudiesShortAnswer } from "../marking/socialStudiesShortAnswerGrader";

function shuffled(items){
  const copy=[...items];
  for(let index=copy.length-1;index>0;index-=1){
    const swap=Math.floor(Math.random()*(index+1));
    [copy[index],copy[swap]]=[copy[swap],copy[index]];
  }
  return copy;
}

function commandLabel(command){
  return String(command || "").replace(/^./,character=>character.toUpperCase());
}

export default function SocialStudiesShortAnswerPractice({ onExit, onComplete }){
  const [sectionId,setSectionId]=useState("ALL");
  const [started,setStarted]=useState(false);
  const [questions,setQuestions]=useState([]);
  const [index,setIndex]=useState(0);
  const [response,setResponse]=useState("");
  const [mark,setMark]=useState(null);
  const [results,setResults]=useState([]);
  const [finished,setFinished]=useState(false);

  const available=useMemo(
    ()=>sectionId==="ALL"
      ? SOCIAL_STUDIES_SHORT_ANSWER_BANK
      : SOCIAL_STUDIES_SHORT_ANSWER_BANK.filter(item=>item.sectionId===sectionId),
    [sectionId]
  );

  const begin=()=>{
    const count=Math.min(10,available.length);
    setQuestions(shuffled(available).slice(0,count));
    setIndex(0);
    setResponse("");
    setMark(null);
    setResults([]);
    setFinished(false);
    setStarted(true);
    window.scrollTo?.(0,0);
  };

  if(!started){
    return <main className="ss-practice-page">
      <div className="ss-practice-shell">
        <header className="ss-practice-hero">
          <div>
            <span className="ss-eyebrow">CXC short-answer examiner</span>
            <h1>Practise answers the way marks are awarded.</h1>
            <p>SPARK checks recognised Social Studies concepts, accepted wording, spelling variants and whether an explanation is developed enough for the second mark.</p>
          </div>
          <button type="button" className="ss-back" onClick={onExit}><BackArrowIcon/><span>Back to practice</span></button>
        </header>

        <section className="ss-short-answer-start">
          <div>
            <span>Question set</span>
            <strong>Choose the syllabus area</strong>
          </div>
          <select value={sectionId} onChange={event=>setSectionId(event.target.value)}>
            <option value="ALL">Mixed course</option>
            <option value="A1">A1 · Individual and the Family</option>
            <option value="A2">A2 · Society and Governance</option>
            <option value="B1">B1 · Development and Use of Resources</option>
            <option value="B2">B2 · Regional Development</option>
          </select>
          <p>{available.length} short-answer questions are available in this selection. Each session uses up to 10.</p>
          <button type="button" className="ss-primary" onClick={begin}>Start short-answer practice</button>
        </section>
      </div>
    </main>;
  }

  if(finished){
    const score=results.reduce((sum,item)=>sum+item.marks,0);
    const maxScore=results.reduce((sum,item)=>sum+item.maxMarks,0);
    const percent=maxScore?Math.round(score/maxScore*100):0;
    return <main className="ss-practice-page">
      <div className="ss-practice-shell">
        <section className="ss-results-card">
          <span className="ss-eyebrow">Short-answer practice complete</span>
          <h1>{percent}%</h1>
          <p>{score} of {maxScore} marks earned across {results.length} questions.</p>
          <ProgressBar value={score} max={maxScore}/>
          <div className="ss-results-actions">
            <button type="button" className="ss-primary" onClick={begin}>Try another set</button>
            <button type="button" className="ss-secondary" onClick={onExit}>Back to Social Studies practice</button>
          </div>
        </section>

        <section className="ss-short-answer-summary">
          {results.map((result,resultIndex)=><article key={result.id}>
            <div><span>{result.sectionId} · {commandLabel(result.command)}</span><strong>{result.marks}/{result.maxMarks}</strong></div>
            <p>{result.prompt}</p>
          </article>)}
        </section>
      </div>
    </main>;
  }

  const current=questions[index];
  const runningScore=results.reduce((sum,item)=>sum+item.marks,0);
  const runningMax=results.reduce((sum,item)=>sum+item.maxMarks,0);

  const check=()=>{
    if(!response.trim()) return;
    setMark(gradeSocialStudiesShortAnswer(response,current.marking));
  };

  const next=()=>{
    if(!mark) return;
    const record={
      id:current.id,
      sectionId:current.sectionId,
      command:current.command,
      prompt:current.prompt,
      marks:mark.marks,
      maxMarks:mark.maxMarks,
    };
    const nextResults=[...results,record];
    if(index===questions.length-1){
      setResults(nextResults);
      setFinished(true);
      onComplete?.(
        nextResults.reduce((sum,item)=>sum+item.marks,0),
        nextResults.reduce((sum,item)=>sum+item.maxMarks,0)
      );
      window.scrollTo?.(0,0);
      return;
    }
    setResults(nextResults);
    setIndex(value=>value+1);
    setResponse("");
    setMark(null);
    window.scrollTo?.(0,0);
  };

  return <main className="ss-practice-page">
    <div className="ss-practice-shell">
      <header className="ss-practice-session-head ss-paper-head">
        <button type="button" className="ss-back" onClick={onExit}><BackArrowIcon/><span>Exit practice</span></button>
        <div>
          <span>Short-answer examiner · {current.sectionId}</span>
          <strong>Question {index+1} of {questions.length}</strong>
        </div>
        <b>{runningScore}/{runningMax || 0}</b>
      </header>

      <ProgressBar value={index} max={questions.length}/>

      <article className="ss-short-answer-card">
        <div className="ss-question-meta">
          <span>{current.sectionId}</span>
          <span>{commandLabel(current.command)}</span>
          <span>{current.marks} marks</span>
        </div>
        <h1>{current.prompt}</h1>
        <div className="ss-command-tip">
          <strong>{commandLabel(current.command)}</strong>
          <span>{current.command==="explain" || current.command==="suggest"
            ? "A relevant point earns credit. Develop how or why it works to earn the second mark."
            : current.command==="distinguish"
              ? "Make the difference between the named ideas clear."
              : current.command==="define"
                ? "Include the essential ideas in the meaning, not a memorised sentence."
                : "Give the exact number of distinct points requested."}</span>
        </div>
        <textarea
          value={response}
          disabled={Boolean(mark)}
          onChange={event=>setResponse(event.target.value)}
          placeholder="Write your answer in clear Social Studies sentences."
        />

        {!mark
          ? <button type="button" className="ss-primary" disabled={!response.trim()} onClick={check}>Mark my response</button>
          : <section className="ss-short-answer-feedback">
              <div className="ss-short-answer-score">
                <span>{mark.status==="correct" ? "Full credit" : mark.status==="partial" ? "Partial credit" : "Needs work"}</span>
                <strong>{mark.marks}/{mark.maxMarks}</strong>
              </div>
              <p>{mark.feedback}</p>
              {mark.criteria?.length>0 && <div className="ss-social-mark-lines">
                {mark.criteria.map((criterion,criterionIndex)=><div
                  key={criterion.id || criterionIndex}
                  className={criterion.earned ? "earned" : "missed"}
                >
                  <b>{criterion.earned ? `+${criterion.marks}` : "0"}</b>
                  <span>
                    {criterion.label}
                    {criterion.developed===false ? " — valid point, but it needs a clear how or why link for the development mark." : ""}
                  </span>
                </div>)}
              </div>}
              {mark.reviewSuggested && <p className="ss-mark-review-note">Your answer contains substantial wording that did not fully match the automatic concept bank. Compare your response with the accepted points below before treating it as fully wrong.</p>}
              <div className="ss-model-points">
                <strong>Accepted answer directions include</strong>
                <ul>{current.modelPoints.map(point=><li key={point}>{point}</li>)}</ul>
              </div>
              <button type="button" className="ss-primary" onClick={next}>{index===questions.length-1 ? "See results" : "Next question"}</button>
            </section>}
      </article>
    </div>
  </main>;
}
