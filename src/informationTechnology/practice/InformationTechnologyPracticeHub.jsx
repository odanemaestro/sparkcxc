import React, { useEffect, useMemo, useState } from "react";
import InformationTechnologyPaper1Exam from "./InformationTechnologyPaper1Exam";
import InformationTechnologyPaper2Exam from "./InformationTechnologyPaper2Exam";
import InformationTechnologySbaCentre from "./InformationTechnologySbaCentre";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import "./informationTechnologyPractice.css";
import { useInformationTechnologyPracticeRoute } from "../../routing/sparkRoutingV270";
import { syncInformationTechnologyLocalProgress } from "../../subjects/subjectProgress";

const P1_ACTIVE_KEYS = ["spark-it-paper1-active-v3", "spark-it-paper1-active-v2", "spark-it-paper1-active-v1"];
const P1_RESULTS = "spark-it-paper1-results-v1";
const P2_ACTIVE_KEYS = ["spark-it-paper2-active-v2", "spark-it-paper2-active-v1"];
const P2_RESULTS = "spark-it-paper2-results-v1";

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function readFirst(keys) {
  for (const key of keys) {
    const value = readJson(key, null);
    if (value) return value;
  }
  return null;
}

export default function InformationTechnologyPracticeHub({ onBack, supabase, userId, onActivity }) {
  const [mode, setMode] = useInformationTechnologyPracticeRoute(true);
  const [fresh, setFresh] = useState(false);
  const snapshot = useMemo(() => ({
    p1Active: readFirst(P1_ACTIVE_KEYS),
    p1Latest: readJson(P1_RESULTS, [])[0],
    p2Active: readFirst(P2_ACTIVE_KEYS),
    p2Latest: readJson(P2_RESULTS, [])[0],
  }), [mode]);

  useEffect(() => {
    if (!supabase || !userId) return;
    syncInformationTechnologyLocalProgress({
      supabase,
      paper1Results: readJson(P1_RESULTS, []),
      paper2Results: readJson(P2_RESULTS, []),
    }).catch(error => console.warn("IT local progress backfill failed", error));
  }, [supabase, userId]);

  if (mode === "paper1") return <InformationTechnologyPaper1Exam startFresh={fresh} onActivity={onActivity} onExit={() => setMode("home")}/>;
  if (mode === "paper2") return <InformationTechnologyPaper2Exam startFresh={fresh} onActivity={onActivity} onExit={() => setMode("home")}/>;
  if (mode === "sba") return <InformationTechnologySbaCentre onBack={() => setMode("home")}/>;

  return (
    <main className="it-practice-hub">
      <section className="it-practice-hero">
        <div>
          <div className="it-practice-eyebrow">CSEC Information Technology practice</div>
          <h1>Practise under examination conditions.</h1>
          <p>Prepare for Paper 01 and Paper 02, or work through the SBA Centre with guided projects, clear steps and original SPARK reference examples.</p>
        </div>
        <button className="it-practice-back" data-spark-action="nav" type="button" onClick={onBack}><BackArrowIcon/><span>Change subject</span></button>
      </section>

      <section className="it-practice-mode-grid it-practice-mode-grid-three">
        <article className="it-practice-mode-card">
          <div className="it-practice-mode-icon">PAPER 01</div>
          <div className="it-practice-label">Multiple-choice examination</div>
          <h2>Paper 1 Simulator</h2>
          <p>Answer 60 multiple-choice questions in 1 hour 15 minutes. Every paper follows the required 35 / 15 / 10 section distribution and includes a mixture of text, tables, diagrams, spreadsheets, databases, flowcharts and code where appropriate.</p>
          <div className="it-practice-specs">9 full papers <span>·</span> 540 questions <span>·</span> 75 minutes</div>
          <div className="it-practice-actions">
            {snapshot.p1Active?.paperId && <button className="it-practice-primary" type="button" onClick={() => { setFresh(false); setMode("paper1"); }}>Resume paper</button>}
            <button className={snapshot.p1Active?.paperId ? "it-practice-secondary" : "it-practice-primary"} type="button" onClick={() => { setFresh(true); setMode("paper1"); }}>{snapshot.p1Active?.paperId ? "New paper instructions" : "View instructions"}</button>
          </div>
        </article>

        <article className="it-practice-mode-card">
          <div className="it-practice-mode-icon">PAPER 02</div>
          <div className="it-practice-label">Structured examination</div>
          <h2>Paper 2 Simulator</h2>
          <p>Answer four compulsory structured questions in 2 hours. Questions use realistic scenarios, worksheet extracts, database structures, network diagrams, algorithms and other stimulus material, followed by guided marking.</p>
          <div className="it-practice-specs">9 full papers <span>·</span> 36 structured questions <span>·</span> 90 marks</div>
          <div className="it-practice-actions">
            {snapshot.p2Active?.paperId && <button className="it-practice-primary" type="button" onClick={() => { setFresh(false); setMode("paper2"); }}>Resume paper</button>}
            <button className={snapshot.p2Active?.paperId ? "it-practice-secondary" : "it-practice-primary"} type="button" onClick={() => { setFresh(true); setMode("paper2"); }}>{snapshot.p2Active?.paperId ? "New paper instructions" : "View instructions"}</button>
          </div>
        </article>

        <article className="it-practice-mode-card it-sba-mode-card">
          <div className="it-practice-mode-icon">SBA</div>
          <div className="it-practice-label">School-Based Assessment</div>
          <h2>SBA Centre</h2>
          <p>Work through five original practice projects. Follow each component step by step, compare your thinking with completed SPARK references and download useful starter and reference files.</p>
          <div className="it-practice-specs">5 guided projects <span>&middot;</span> 5 linked areas <span>&middot;</span> Reference downloads</div>
          <div className="it-practice-actions">
            <button className="it-practice-primary" type="button" onClick={() => setMode("sba")}>Open SBA Centre</button>
          </div>
        </article>
      </section>

      <section className="it-practice-integrity">
        <div>
          <div className="it-practice-label">Exam blueprint</div>
          <h2>Built around the current CSEC Information Technology structure.</h2>
          <p>Paper 01 uses 35 items from Sections 1 to 3, 15 from Sections 4 to 6 and 10 from Sections 7 to 8. Paper 02 uses four compulsory questions and preserves the 35 Theory, 30 Productivity Tools and 25 Problem-Solving and Programming mark allocation.</p>
        </div>
        <div className="it-practice-stats">
          <div><strong>540</strong><span>Paper 1 MCQs</span></div>
          <div><strong>36</strong><span>Paper 2 questions</span></div>
          <div><strong>18</strong><span>full simulations</span></div>
        </div>
      </section>

      {(snapshot.p1Latest || snapshot.p2Latest) && (
        <section className="it-practice-results">
          {snapshot.p1Latest && <div><span>Latest Paper 1</span><strong>{snapshot.p1Latest.score}/60</strong><small>{snapshot.p1Latest.percent}%</small></div>}
          {snapshot.p2Latest && <div><span>Latest Paper 2</span><strong>{snapshot.p2Latest.score}/90</strong><small>{snapshot.p2Latest.percent}%</small></div>}
        </section>
      )}
    </main>
  );
}
