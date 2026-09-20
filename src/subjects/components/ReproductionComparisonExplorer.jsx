import React, { useState } from "react";
import "./reproductionComparisonExplorer.css";

const CONTENT = {
  asexual: {
    title: "Asexual reproduction",
    summary: "One parent produces offspring without the fusion of gametes.",
    details: [
      "Mitosis produces genetically identical cells.",
      "The offspring are clones of the parent.",
      "Useful crop qualities can be reproduced quickly.",
      "Low variation can leave a whole crop vulnerable to the same disease.",
    ],
  },
  sexual: {
    title: "Sexual reproduction",
    summary: "Male and female gametes fuse during fertilisation.",
    details: [
      "Meiosis produces gametes with half the chromosome number.",
      "Fertilisation forms a zygote.",
      "The offspring show genetic variation.",
      "Variation gives a population more chance of surviving change or disease.",
    ],
  },
};

function Arrow({ x1, y1, x2, y2 }) {
  return (
    <>
      <line className="spark-repro-arrow" x1={x1} y1={y1} x2={x2} y2={y2} />
      <path
        className="spark-repro-arrow-head"
        d={`M${x2 - 20} ${y2 - 12} L${x2} ${y2} L${x2 - 20} ${y2 + 12}`}
      />
    </>
  );
}

function AsexualDiagram() {
  return (
    <svg viewBox="0 0 900 430" role="img" aria-label="Asexual reproduction process">
      <g className="spark-repro-card parent">
        <rect x="55" y="145" width="190" height="120" rx="22" />
        <text x="150" y="192" textAnchor="middle">One parent</text>
        <text className="small" x="150" y="225" textAnchor="middle">desired qualities</text>
      </g>
      <Arrow x1={265} y1={205} x2={390} y2={205} />
      <g className="spark-repro-card process">
        <rect x="410" y="145" width="180" height="120" rx="22" />
        <text x="500" y="192" textAnchor="middle">Mitosis</text>
        <text className="small" x="500" y="225" textAnchor="middle">no gamete fusion</text>
      </g>
      <Arrow x1={610} y1={205} x2={700} y2={205} />
      <g className="spark-repro-card offspring">
        <rect x="720" y="70" width="135" height="75" rx="18" />
        <rect x="720" y="177" width="135" height="75" rx="18" />
        <rect x="720" y="284" width="135" height="75" rx="18" />
        <text x="788" y="116" textAnchor="middle">Clone</text>
        <text x="788" y="223" textAnchor="middle">Clone</text>
        <text x="788" y="330" textAnchor="middle">Clone</text>
      </g>
      <text className="spark-repro-caption" x="450" y="48" textAnchor="middle">
        Same inherited qualities, little genetic variation
      </text>
    </svg>
  );
}

function SexualDiagram() {
  return (
    <svg viewBox="0 0 900 470" role="img" aria-label="Sexual reproduction process">
      <g className="spark-repro-card parent">
        <rect x="40" y="85" width="150" height="90" rx="20" />
        <rect x="40" y="295" width="150" height="90" rx="20" />
        <text x="115" y="138" textAnchor="middle">Parent 1</text>
        <text x="115" y="348" textAnchor="middle">Parent 2</text>
      </g>
      <Arrow x1={210} y1={130} x2={330} y2={130} />
      <Arrow x1={210} y1={340} x2={330} y2={340} />
      <g className="spark-repro-card process">
        <rect x="350" y="75" width="155" height="110" rx="20" />
        <rect x="350" y="285" width="155" height="110" rx="20" />
        <text x="428" y="120" textAnchor="middle">Meiosis</text>
        <text className="small" x="428" y="151" textAnchor="middle">male gamete</text>
        <text x="428" y="330" textAnchor="middle">Meiosis</text>
        <text className="small" x="428" y="361" textAnchor="middle">female gamete</text>
      </g>
      <line className="spark-repro-arrow" x1="525" y1="130" x2="625" y2="214" />
      <line className="spark-repro-arrow" x1="525" y1="340" x2="625" y2="256" />
      <g className="spark-repro-card fertilisation">
        <rect x="625" y="180" width="170" height="110" rx="20" />
        <text x="710" y="225" textAnchor="middle">Fertilisation</text>
        <text className="small" x="710" y="256" textAnchor="middle">gametes fuse</text>
      </g>
      <Arrow x1={805} y1={235} x2={850} y2={235} />
      <circle className="spark-repro-zygote" cx="865" cy="235" r="32" />
      <text className="spark-repro-zygote-text" x="865" y="240" textAnchor="middle">zygote</text>
      <text className="spark-repro-caption" x="450" y="45" textAnchor="middle">
        Genetic material is combined, so offspring show variation
      </text>
    </svg>
  );
}

export default function ReproductionComparisonExplorer() {
  const [mode, setMode] = useState("asexual");
  const content = CONTENT[mode];

  return (
    <section className="spark-reproduction-comparison">
      <header>
        <span>PROCESS COMPARISON</span>
        <h3>Asexual and sexual reproduction</h3>
        <p>Follow both pathways and compare cell division, gametes and genetic variation.</p>
      </header>

      <div className="spark-reproduction-tabs" role="tablist" aria-label="Reproduction process">
        {Object.entries(CONTENT).map(([key, item]) => (
          <button
            type="button"
            role="tab"
            aria-selected={mode === key}
            className={mode === key ? "active" : ""}
            key={key}
            onClick={() => setMode(key)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="spark-reproduction-grid">
        <div className="spark-reproduction-stage">
          {mode === "asexual" ? <AsexualDiagram /> : <SexualDiagram />}
        </div>
        <aside className="spark-reproduction-notes">
          <strong>{content.title}</strong>
          <p>{content.summary}</p>
          <ul>
            {content.details.map(detail => <li key={detail}>{detail}</li>)}
          </ul>
        </aside>
      </div>
    </section>
  );
}
