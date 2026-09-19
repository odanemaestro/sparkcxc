import React, { lazy, Suspense, useMemo, useState } from "react";
import { INFORMATION_TECHNOLOGY_PRACTICAL_LABS } from "./labCatalog";
import { readLabCompletion, writeLabCompletion } from "./labProgress";
import { useInformationTechnologyLabRoute } from "../../routing/sparkRoutingV270";
import "./informationTechnologyLabs.css";

const WordLab = lazy(() => import("./labs/WordLab"));
const SpreadsheetLab = lazy(() => import("./labs/SpreadsheetLab"));
const DatabaseLab = lazy(() => import("./labs/DatabaseLab"));
const PresentationLab = lazy(() => import("./labs/PresentationLab"));
const WebDesignLab = lazy(() => import("./labs/WebDesignLab"));
const ProgrammingLab = lazy(() => import("./labs/ProgrammingLab"));

const LAB_COMPONENTS = {
  "word-processing": WordLab,
  spreadsheet: SpreadsheetLab,
  database: DatabaseLab,
  presentation: PresentationLab,
  "web-design": WebDesignLab,
  programming: ProgrammingLab,
};

function Loader() {
  return <div className="itv2-lab-loader"><span/><strong>Opening practical workspace…</strong></div>;
}

export default function InformationTechnologyPracticalLabs({ userId, onBack, onActivity }) {
  const labIds = useMemo(() => INFORMATION_TECHNOLOGY_PRACTICAL_LABS.map(lab => lab.id), []);
  const [activeId, setActiveId] = useInformationTechnologyLabRoute(labIds);
  const [completion, setCompletion] = useState(() => readLabCompletion(userId));

  const completedCount = useMemo(
    () => INFORMATION_TECHNOLOGY_PRACTICAL_LABS.filter(lab => completion[lab.id]?.completed).length,
    [completion]
  );

  function completeLab(lab) {
    const at = new Date().toISOString();
    const next = {
      ...completion,
      [lab.id]: { completed: true, completedAt: at },
    };
    setCompletion(next);
    writeLabCompletion(userId, next);
    onActivity?.({
      type: "it_lab_completion",
      labId: lab.id,
      title: lab.title,
      section: lab.section,
      completed: true,
      at,
    });
  }

  if (activeId) {
    const lab = INFORMATION_TECHNOLOGY_PRACTICAL_LABS.find(item => item.id === activeId);
    const Component = LAB_COMPONENTS[activeId];
    return (
      <Suspense fallback={<Loader/>}>
        <Component
          lab={lab}
          userId={userId}
          completed={Boolean(completion[activeId]?.completed)}
          onBack={() => setActiveId(null)}
          onComplete={() => completeLab(lab)}
        />
      </Suspense>
    );
  }

  return (
    <main className="itv2-labs-home">
      <div className="itv2-labs-home-inner">
        <button type="button" className="itv2-back" data-spark-action="nav" onClick={onBack}>← Information Technology</button>
        <header className="itv2-labs-hero">
          <div>
            <div className="itv2-kicker">SPARK PRACTICAL LABS</div>
            <h1>Learn the software by using it.</h1>
            <p>These workspaces behave like familiar productivity and development tools. You will work with ribbons, worksheets, tables, queries, slides, previews, code editors and other controls instead of only reading about them.</p>
          </div>
          <div className="itv2-lab-count"><strong>{completedCount}/{INFORMATION_TECHNOLOGY_PRACTICAL_LABS.length}</strong><span>labs completed</span></div>
        </header>

        <section className="itv2-lab-grid">
          {INFORMATION_TECHNOLOGY_PRACTICAL_LABS.map(lab => {
            const done = Boolean(completion[lab.id]?.completed);
            return (
              <button type="button" className={`itv2-lab-card ${done ? "done" : ""}`} key={lab.id} onClick={() => setActiveId(lab.id)}>
                <span className="itv2-lab-card-mark">{lab.mark}</span>
                <span className="itv2-lab-card-copy">
                  <small>{done ? "✓ COMPLETED" : lab.section}</small>
                  <strong>{lab.title}</strong>
                  <span>{lab.description}</span>
                  <em>{lab.outcomes.join(" · ")}</em>
                </span>
                <b aria-hidden="true">↗</b>
              </button>
            );
          })}
        </section>

        <section className="itv2-disclaimer">
          <strong>Built for skill transfer</strong>
          <p>SPARK recreates the workflows and concepts students need to learn, not Microsoft Office itself. The controls are intentionally familiar so that the skills transfer naturally when students use Word, Excel, Access, PowerPoint or comparable software.</p>
        </section>
      </div>
    </main>
  );
}

export { INFORMATION_TECHNOLOGY_PRACTICAL_LABS };
