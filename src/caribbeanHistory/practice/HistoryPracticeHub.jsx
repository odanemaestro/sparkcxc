import React from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import ForwardArrowIcon from "../../components/ui/ForwardArrowIcon";
import { usePracticeRouteState } from "../../routing/usePracticeRouteState";
import { HISTORY_ID, HISTORY_SYLLABUS_URL } from "../data/historyCourse";
import { HISTORY_PAPER1 } from "../data/historyPaper1";
import { HISTORY_PAPER2S } from "../data/historyPaper2";
import archive from "../data/historyArchive.json";
import HistoryExam, { historyGroups } from "./HistoryExam";
import HistoryWorkspace, { HISTORY_TOOLS } from "./HistoryWorkspace";
import "../../principlesOfAccounts/practice/poaPractice.css";
import "../../principlesOfAccounts/practice/poaLayout.css";
import "../../officeAdministration/practice/oaPractice.css";
import "./historyPractice.css";

const practicePapers = [HISTORY_PAPER1, ...HISTORY_PAPER2S];
const papersById = new Map([...practicePapers, ...archive].map(paper => [paper.id, paper]));
const options = (values, fallback) => ({ decode: raw => values.includes(raw) ? raw : fallback, replace: true });

export default function HistoryPracticeHub({ userId, supabase, onBack }) {
  const [view, setView] = usePracticeRouteState(HISTORY_ID, "view", "home", options(["home", "library", "exam", "workshop"], "home"));
  const [paperNumber, setPaperNumber] = usePracticeRouteState(HISTORY_ID, "paper", "1", options(["1", "2"], "1"));
  const [library, setLibrary] = usePracticeRouteState(HISTORY_ID, "library", "practice", options(["practice", "historical"], "practice"));
  const [year, setYear] = usePracticeRouteState(HISTORY_ID, "year", "all", { decode: raw => /^\d{4}$/.test(raw) ? raw : "all", replace: true });
  const [paperId, setPaperId] = usePracticeRouteState(HISTORY_ID, "source", "", { decode: raw => papersById.has(raw) ? raw : "", replace: true });
  const [tool, setTool] = usePracticeRouteState(HISTORY_ID, "tool", "timeline", options(HISTORY_TOOLS, "timeline"));
  const paper = papersById.get(paperId);
  const historical = library === "historical";
  const visiblePapers = (historical ? archive : practicePapers)
    .filter(item => String(item.paper) === paperNumber)
    .sort((a, b) => (b.year || 0) - (a.year || 0));
  const years = [...new Set(visiblePapers.map(item => item.year).filter(Boolean))].sort((a, b) => b - a);

  if (view === "exam" && paper) return <HistoryExam key={`${userId || "guest"}:${paper.id}`} paper={paper} userId={userId} supabase={supabase} onBack={() => {
    setPaperNumber(String(paper.paper)); setLibrary(paper.year ? "historical" : "practice"); setView("library"); setPaperId("");
  }} />;

  return <main className="poa-practice poa-practice-shell oa-practice ch-practice">
    <button className="poa-back" type="button" onClick={() => view === "home" ? onBack?.() : setView("home")}>
      <BackArrowIcon />{view === "home" ? "Choose another subject" : "Back to Caribbean History practice"}
    </button>
    {view === "workshop" ? <HistoryWorkspace userId={userId} tool={tool} onToolChange={setTool} /> : view === "home" ? <>
      <header className="poa-library-header"><h1>Caribbean History practice</h1><p>Sit a full paper or practise the skills behind a strong history answer.</p></header>
      <div className="poa-paper-choices">
        {["1", "2"].map(number => <button key={number} type="button" className="poa-paper-choice" onClick={() => { setPaperNumber(number); setYear("all"); setView("library"); }}>
          <span className="poa-paper-choice-number">0{number}</span>
          <span className="poa-paper-choice-copy"><strong>Paper {number}</strong><span>{number === "1" ? "Multiple choice" : "Short answers and essays"}</span><small>{number === "1" ? "60 questions · 75 minutes" : "Choose one question per section or module"}</small></span>
          <ForwardArrowIcon />
        </button>)}
      </div>
      <section className="poa-workspace-entry"><div><h2>History skills workshop</h2><p>Put events in order, analyse a source, plan an essay or organise SBA evidence.</p></div>
        <button className="oa-primary" type="button" onClick={() => setView("workshop")}>Open workshop</button>
      </section>
    </> : <>
      <header className="poa-library-header"><h1>Caribbean History Paper {paperNumber}</h1>
        <p>{paperNumber === "1" ? "Choose one option for each question." : "Choose a paper for your sitting. The Paper 2 format changes in 2028."}</p>
        {paperNumber === "2" && <p><a href={HISTORY_SYLLABUS_URL} target="_blank" rel="noreferrer">Check your syllabus with CXC</a></p>}
      </header>
      <div className="poa-library-tabs" role="group" aria-label="Paper library">
        <button type="button" aria-pressed={!historical} onClick={() => { setLibrary("practice"); setYear("all"); }}>Practice papers</button>
        <button type="button" aria-pressed={historical} onClick={() => { setLibrary("historical"); setYear("all"); }}>Historical papers</button>
      </div>
      {historical && years.length > 0 && <label className="oa-library-filter">Year<select value={years.includes(Number(year)) ? year : "all"} onChange={event => setYear(event.target.value)}>
        <option value="all">All years</option>{years.map(item => <option key={item} value={item}>{item}</option>)}
      </select></label>}
      <div className="oa-library-list">
        {visiblePapers.filter(item => !historical || !years.includes(Number(year)) || item.year === Number(year)).map(item => <section className="poa-library-card" key={item.id}>
          <div><h2>{item.title}</h2><p>{item.duration} minutes · {item.paper === 1 ? `${item.questions.length} questions` : `Answer ${historyGroups(item).length} questions`}</p></div>
          <button className="oa-primary" type="button" onClick={() => { setPaperId(item.id); setView("exam"); }}>Open digital paper</button>
        </section>)}
        {visiblePapers.length === 0 && <p>There are no papers in this collection yet.</p>}
      </div>
    </>}
  </main>;
}
