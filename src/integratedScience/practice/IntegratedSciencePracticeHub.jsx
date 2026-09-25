import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useIntegratedSciencePracticeRoute } from "../../routing/sparkRoutingV270";
import SparkLoader from "../../components/ui/SparkLoader";
import { recordSubjectActivity } from "../../subjects/subjectProgress";
import {
  integratedScienceObjectives,
  integratedSciencePaper1For,
  integratedSciencePaper2For,
  loadIntegratedScienceBankIndex,
  loadIntegratedScienceModule,
} from "../data/integratedScienceBank";
import {
  IntegratedSciencePaper1Question,
  IntegratedSciencePaper2Question,
} from "./IntegratedScienceQuestionRenderer";
import IntegratedSciencePaper1Exam from "./IntegratedSciencePaper1Exam";
import IntegratedSciencePaper2Exam from "./IntegratedSciencePaper2Exam";
import "./integratedSciencePractice.css";
import "./integratedScienceExam.css";

const MODULE_TITLES = {
  1:"Organisms and Life Processes",
  2:"Energy",
  3:"Our Planet",
};

function TopicBank({ supabase, userId, onBack }) {
  const [moduleNumber,setModuleNumber] = useState(1);
  const [moduleData,setModuleData] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [paper,setPaper] = useState("paper1");
  const [topic,setTopic] = useState("all");
  const [objective,setObjective] = useState("all");
  const [paper2Kind,setPaper2Kind] = useState("all");
  const [questionIndex,setQuestionIndex] = useState(0);
  const [answers,setAnswers] = useState({});

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadIntegratedScienceModule(moduleNumber)
      .then(data => {
        if (cancelled) return;
        setModuleData(data);
        setTopic("all");
        setObjective("all");
        setQuestionIndex(0);
        setLoading(false);
      })
      .catch(loadError => {
        if (cancelled) return;
        setError(loadError);
        setLoading(false);
      });
    return () => { cancelled = true; };
  },[moduleNumber]);

  const topicNumber = topic === "all" ? null : Number(topic);
  const objectiveCode = objective === "all" ? null : objective;

  const objectives = useMemo(
    () => integratedScienceObjectives(moduleData,topicNumber),
    [moduleData,topicNumber]
  );

  const paper1 = useMemo(
    () => integratedSciencePaper1For(moduleData,{topic:topicNumber,objective:objectiveCode}),
    [moduleData,objectiveCode,topicNumber]
  );

  const paper2 = useMemo(
    () => integratedSciencePaper2For(moduleData,{
      topic:topicNumber,
      objective:objectiveCode,
      kind:paper2Kind === "all" ? null : paper2Kind,
    }),
    [moduleData,objectiveCode,paper2Kind,topicNumber]
  );

  useEffect(() => {
    setObjective("all");
    setQuestionIndex(0);
  },[topic,paper,moduleNumber,paper2Kind]);

  const savePaper1Attempt = useCallback(async (question,letter) => {
    if (!question || !supabase || !userId) return;
    const correct = letter === question.answer;
    try {
      await recordSubjectActivity({
        supabase,
        activity:{
          subjectId:"integrated-science",
          activityKey:`practice:${question.id}`,
          activityType:"practice",
          sectionId:`module-${question.module}`,
          topicId:question.objective?.code || null,
          title:`${question.id} Paper 01 practice`,
          completed:true,
          score:correct ? 1 : 0,
          maxScore:1,
          percent:correct ? 100 : 0,
          metadata:{
            source:"integrated_science_question_bank_v1_2",
            paper:"01",
            module:question.module,
            topic:question.topic,
            objective:question.objective?.code || null,
            profile:question.profile || null,
            difficulty:question.difficulty || null,
            selected_answer:letter,
            correct_answer:question.answer,
            at:new Date().toISOString(),
          },
        },
      });
    } catch (saveError) {
      console.warn("Could not save Integrated Science topic-practice attempt",saveError);
    }
  },[supabase,userId]);

  if (error) {
    return (
      <main className="is-practice-shell">
        <div className="is-empty-bank">
          <p>{error.message}</p>
          <button type="button" onClick={onBack}>Back to practice</button>
        </div>
      </main>
    );
  }

  const rows = paper === "paper1" ? paper1 : paper2;
  const current = rows[questionIndex] || null;

  return (
    <main className="is-practice-shell">
      <div className="is-practice-top-actions">
        <button type="button" className="is-back-button" onClick={onBack}>
          <span aria-hidden="true">{"\u2190"}</span>
          Back to practice modes
        </button>
      </div>

      <header className="is-practice-toolbar">
        <div>
          <span>CSEC INTEGRATED SCIENCE</span>
          <h1>Topic practice</h1>
          <p>Use the complete bank for focused practice by module, topic and specific objective.</p>
        </div>
      </header>

      <section className="is-bank-filters">
        <label>
          <span>Paper</span>
          <select value={paper} onChange={event => setPaper(event.target.value)}>
            <option value="paper1">Paper 01 multiple choice</option>
            <option value="paper2">Paper 02 structured</option>
          </select>
        </label>

        <label>
          <span>Module</span>
          <select value={moduleNumber} onChange={event => setModuleNumber(Number(event.target.value))}>
            {[1,2,3].map(number => (
              <option key={number} value={number}>Module {number}: {MODULE_TITLES[number]}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Topic</span>
          <select value={topic} onChange={event => setTopic(event.target.value)}>
            <option value="all">All topics</option>
            {(moduleData?.topics || []).map(item => (
              <option key={item.topic} value={item.topic}>{item.topic}. {item.title}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Specific objective</span>
          <select value={objective} onChange={event => setObjective(event.target.value)}>
            <option value="all">All objectives</option>
            {objectives.map(item => (
              <option key={item.code} value={item.code}>{item.code} {item.text}</option>
            ))}
          </select>
        </label>

        {paper === "paper2" && (
          <label>
            <span>Question type</span>
            <select value={paper2Kind} onChange={event => setPaper2Kind(event.target.value)}>
              <option value="all">All types</option>
              <option value="practical">Practical / investigative</option>
              <option value="structured">Structured</option>
            </select>
          </label>
        )}
      </section>

      {loading ? (
        <SparkLoader variant="section" label={`Loading Module ${moduleNumber}`} />
      ) : (
        <>
          <section className="is-question-nav">
            <div>
              <strong>{rows.length}</strong>
              <span>matching questions</span>
            </div>
            <div>
              <button type="button" disabled={questionIndex <= 0} onClick={() => setQuestionIndex(index => Math.max(0,index - 1))}>Previous</button>
              <span>{rows.length ? questionIndex + 1 : 0} / {rows.length}</span>
              <button type="button" disabled={questionIndex >= rows.length - 1} onClick={() => setQuestionIndex(index => Math.min(rows.length - 1,index + 1))}>Next</button>
              <button type="button" disabled={!rows.length} onClick={() => setQuestionIndex(Math.floor(Math.random() * rows.length))}>Random</button>
            </div>
          </section>

          {current ? paper === "paper1" ? (
            <IntegratedSciencePaper1Question
              moduleData={moduleData}
              question={current}
              selectedAnswer={answers[current.id] || null}
              onAnswer={letter => {
                if (answers[current.id]) return;
                setAnswers(existing => ({...existing,[current.id]:letter}));
                savePaper1Attempt(current,letter);
              }}
            />
          ) : (
            <IntegratedSciencePaper2Question question={current} />
          ) : (
            <div className="is-empty-bank">No questions match these filters.</div>
          )}
        </>
      )}
    </main>
  );
}

export default function IntegratedSciencePracticeHub({ supabase, userId, onBack }) {
  const [mode,setModeState] = useState(readPracticeMode);
  const [bankIndex,setBankIndex] = useState(null);

  useEffect(() => {
    loadIntegratedScienceBankIndex().then(setBankIndex).catch(() => {});
    const sync = () => setModeState(readPracticeMode());
    window.addEventListener("popstate",sync);
    window.addEventListener("hashchange",sync);
    window.addEventListener("spark:routechange",sync);
    return () => {
      window.removeEventListener("popstate",sync);
      window.removeEventListener("hashchange",sync);
      window.removeEventListener("spark:routechange",sync);
    };
  },[]);

  const setMode = next => {
    setModeState(next);
    writePracticeMode(next);
  };

  if (mode === "paper1") {
    return <IntegratedSciencePaper1Exam supabase={supabase} userId={userId} onBack={() => setMode("home")} />;
  }

  if (mode === "paper2") {
    return <IntegratedSciencePaper2Exam supabase={supabase} userId={userId} onBack={() => setMode("home")} />;
  }

  if (mode === "topic") {
    return <TopicBank supabase={supabase} userId={userId} onBack={() => setMode("home")} />;
  }

  return (
    <main className="is-practice-shell">
      <div className="is-practice-home-shell">
        <div className="is-practice-top-actions">
          <button type="button" className="is-back-button" onClick={onBack}>
            <span aria-hidden="true">{"\u2190"}</span>
            Change subject
          </button>
        </div>

        <header className="is-practice-hero">
          <div>
            <span>CSEC INTEGRATED SCIENCE PRACTICE</span>
            <h1>Choose a practice mode</h1>
            <p>Sit full Paper 01 and Paper 02 simulations under the official examination timing, or practise individual syllabus objectives from the complete bank.</p>
          </div>
        </header>

        <section className="is-practice-mode-list">
          <button type="button" className="is-practice-section-card" onClick={() => setMode("paper1")}>
            <span className="is-practice-section-code">01</span>
            <span className="is-practice-section-copy">
              <span>FULL EXAMINATION SIMULATOR</span>
              <strong>Integrated Science Paper 1</strong>
              <small>
                <span>60 multiple-choice questions</span>
                <span className="is-inline-separator" aria-hidden="true">&middot;</span>
                <span>1 hour 15 minutes</span>
                <span className="is-inline-separator" aria-hidden="true">&middot;</span>
                <span>20 questions from each module</span>
                <span className="is-inline-separator" aria-hidden="true">&middot;</span>
                <span>automatic marking and answer review</span>
              </small>
            </span>
            <span className="is-practice-section-arrow" aria-hidden="true">{"\u2192"}</span>
          </button>

          <button type="button" className="is-practice-section-card" onClick={() => setMode("paper2")}>
            <span className="is-practice-section-code">02</span>
            <span className="is-practice-section-copy">
              <span>FULL EXAMINATION SIMULATOR</span>
              <strong>Integrated Science Paper 2</strong>
              <small>
                <span>6 compulsory structured questions</span>
                <span className="is-inline-separator" aria-hidden="true">&middot;</span>
                <span>2 hours 30 minutes</span>
                <span className="is-inline-separator" aria-hidden="true">&middot;</span>
                <span>two questions per module</span>
                <span className="is-inline-separator" aria-hidden="true">&middot;</span>
                <span>105 marks</span>
                <span className="is-inline-separator" aria-hidden="true">&middot;</span>
                <span>practical/investigative questions included</span>
              </small>
            </span>
            <span className="is-practice-section-arrow" aria-hidden="true">{"\u2192"}</span>
          </button>

          <button type="button" className="is-practice-section-card" onClick={() => setMode("topic")}>
            <span className="is-practice-section-code">QB</span>
            <span className="is-practice-section-copy">
              <span>TOPIC PRACTICE</span>
              <strong>Full question bank</strong>
              <small>
                <span>{bankIndex?.totals?.paper01Items || 1561} Paper 01 items</span>
                <span className="is-inline-separator" aria-hidden="true">&middot;</span>
                <span>{bankIndex?.totals?.paper02Questions || 84} Paper 02 questions</span>
                <span className="is-inline-separator" aria-hidden="true">&middot;</span>
                <span>filter by module, topic and specific objective</span>
              </small>
            </span>
            <span className="is-practice-section-arrow" aria-hidden="true">{"\u2192"}</span>
          </button>
        </section>

        <section className="is-practice-exam-note">
          <strong>CXC examination structure</strong>
          <p>Paper 01 uses 20 questions from each module. Paper 02 uses two compulsory questions from each module, with the first question in each module being practical/investigative.</p>
        </section>
      </div>
    </main>
  );
}
