import React from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import ForwardArrowIcon from "../../components/ui/ForwardArrowIcon";
import HistoryExam, { requiredQuestionCount } from "../../caribbeanHistory/practice/HistoryExam";
import { usePracticeRouteState } from "../../routing/usePracticeRouteState";
import { writeSparkNestedRoute } from "../../routing/sparkRoutingV270";
import { GEOGRAPHY_ID } from "../data/geographyCourse";
import { GEOGRAPHY_PRACTICE_PAPERS } from "../data/geographyPracticePapers";
import { GEOGRAPHY_SYLLABUS } from "../data/geographyLessons";
import archive from "../data/geographyArchive";
import GeographyWorkspace, { GEOGRAPHY_TOOLS } from "./GeographyWorkspace";
import GeographySketch from "./GeographySketch";
import "../../principlesOfAccounts/practice/poaPractice.css";
import "../../principlesOfAccounts/practice/poaLayout.css";
import "../../officeAdministration/practice/oaPractice.css";
import "../../caribbeanHistory/practice/historyPractice.css";
import "./geographyPractice.css";

const path = "/practice/geography";
const papersById = new Map([...GEOGRAPHY_PRACTICE_PAPERS, ...archive].map(paper => [paper.id, paper]));
const options = (values, fallback) => ({ decode:value => values.includes(value) ? value : fallback, replace:true });
const paperNames = {
  1: ["Paper 1", "Multiple choice", "60 questions · 90 minutes"],
  2: ["Paper 2", "Map reading and structured responses", "4 questions · 150 minutes"],
  3: ["Paper 032", "Field study skills for private candidates", "6 questions · 105 minutes"],
};
const renderDrawing = ({ part, ...props }) => <GeographySketch key={part.id} background={part.background} {...props} />;

export default function GeographyPracticeHub({ userId, supabase, onBack }) {
  const [view] = usePracticeRouteState(GEOGRAPHY_ID, "view", "home", options(["home","library","exam","workshop"], "home"));
  const [paperNumber] = usePracticeRouteState(GEOGRAPHY_ID, "paper", "1", options(["1","2","3"], "1"));
  const [library] = usePracticeRouteState(GEOGRAPHY_ID, "library", "practice", options(["practice","historical"], "practice"));
  const [year, setYear] = usePracticeRouteState(GEOGRAPHY_ID, "year", "all", { decode:raw => /^\d{4}$/.test(raw) ? raw : "all", replace:true });
  const [paperId] = usePracticeRouteState(GEOGRAPHY_ID, "source", "", { decode:raw => papersById.has(raw) ? raw : "" });
  const [tool, setTool] = usePracticeRouteState(GEOGRAPHY_ID, "tool", "map", options(GEOGRAPHY_TOOLS.map(([id]) => id), "map"));
  const go = params => writeSparkNestedRoute(path, params);
  const paper = papersById.get(paperId);
  const historic = library === "historical";
  const hasArchive = archive.some(item => item.paper === Number(paperNumber));
  const collection = historic && hasArchive ? archive : GEOGRAPHY_PRACTICE_PAPERS;
  const available = collection.filter(item => item.paper === Number(paperNumber)).sort((a,b) => (b.year || 0)-(a.year || 0));
  const years = [...new Set(available.map(item => item.year).filter(Boolean))];
  const [name, format] = paperNames[paperNumber];
  const backToLibrary = () => go({ view:"library", paper:paper.paper, library:paper.year ? "historical" : "practice", year:paper.year && year !== "all" ? year : null });

  if (view === "exam" && paper) return <HistoryExam key={`${userId || "guest"}:${paper.id}`} paper={paper}
    userId={userId} supabase={supabase} subjectId={GEOGRAPHY_ID} subjectName="Geography" onBack={backToLibrary} renderDrawing={renderDrawing} />;

  const inLibrary = view === "library" || view === "exam";
  return <main className="poa-practice poa-practice-shell oa-practice geo-practice">
    <button className="poa-back" type="button" onClick={() => view === "home" ? onBack?.() : go({})}>
      <BackArrowIcon />{view === "home" ? "Choose another subject" : "Back to Geography practice"}
    </button>
    {view === "workshop" && <GeographyWorkspace tool={tool} setTool={setTool} userId={userId} />}
    {view === "home" && <>
      <header className="poa-library-header"><h1>Geography practice</h1><p>Use maps and data to answer questions, then put those skills to work in a timed paper.</p></header>
      <div className="poa-paper-choices">
        {Object.entries(paperNames).map(([number,[label,detail,timing]]) => <button type="button" key={number} className="poa-paper-choice" onClick={() => go({view:"library",paper:number})}>
          <span className="poa-paper-choice-number">{number === "3" ? "032" : `0${number}`}</span>
          <span className="poa-paper-choice-copy"><strong>{label}</strong><span>{detail}</span><small>{timing}</small></span>
          <ForwardArrowIcon />
        </button>)}
      </div>
      <section className="poa-workspace-entry"><div><h2>Geography workshop</h2><p>Measure distance, plot a climate graph, sketch a landform or plan fieldwork.</p></div>
        <button className="oa-primary" type="button" onClick={() => go({view:"workshop"})}>Open workshop</button>
      </section>
    </>}
    {inLibrary && <>
      <header className="poa-library-header"><h1>Geography {name}</h1><p>{format}</p>
        <a href={GEOGRAPHY_SYLLABUS} target="_blank" rel="noreferrer">CXC Geography syllabus</a>
      </header>
      {hasArchive && <div className="poa-library-tabs" role="group" aria-label="Paper library">
        <button type="button" aria-pressed={!historic} onClick={() => go({view:"library",paper:paperNumber})}>Practice papers</button>
        <button type="button" aria-pressed={historic} onClick={() => go({view:"library",paper:paperNumber,library:"historical"})}>Historical papers</button>
      </div>}
      {historic && years.length > 0 && <label className="oa-library-filter">Year<select value={years.includes(Number(year)) ? year : "all"} onChange={event => setYear(event.target.value)}>
        <option value="all">All years</option>{years.map(item => <option key={item} value={item}>{item}</option>)}
      </select></label>}
      <div className="oa-library-list">
        {available.filter(item => !historic || !years.includes(Number(year)) || item.year === Number(year)).map(item => <section className="poa-library-card" key={item.id}>
          <div><h2>{item.title}</h2><p>{item.duration} minutes · {item.allQuestions || item.paper === 1 ? "" : "Answer "}{requiredQuestionCount(item)} questions</p></div>
          <button className="oa-primary" type="button" onClick={() => go({view:"exam",paper:paperNumber,source:item.id,library:historic ? "historical" : null,year:historic && year !== "all" ? year : null})}>Open digital paper</button>
        </section>)}
      </div>
    </>}
  </main>;
}
