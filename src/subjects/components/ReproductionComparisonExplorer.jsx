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

function ChromosomePair({x,y,variant="same"}) {
  const rightClass=variant==="mixed" ? "spark-repro-chromosome paternal" : "spark-repro-chromosome";
  return <g>
    <path className="spark-repro-chromosome maternal" d={`M${x-10} ${y-24}L${x+10} ${y+24}M${x+10} ${y-24}L${x-10} ${y+24}`}/>
    <path className={rightClass} d={`M${x+28} ${y-24}L${x+48} ${y+24}M${x+48} ${y-24}L${x+28} ${y+24}`}/>
  </g>;
}

function AsexualDiagram() {
  return (
    <svg className="spark-asexual-repro-svg" viewBox="0 0 980 500" role="img" aria-label="Asexual reproduction showing one diploid parent cell undergoing mitosis to form genetically identical diploid offspring cells">
      <defs>
        <marker id="repro-asexual-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="spark-repro-arrow-fill"/>
        </marker>
      </defs>

      <g className="repro-cell parent" transform="translate(80 145)">
        <circle cx="100" cy="100" r="82"/>
        <circle className="repro-nucleus" cx="100" cy="100" r="47"/>
        <ChromosomePair x={78} y={100}/>
        <text x="100" y="210" textAnchor="middle">one parent cell</text>
        <text className="small" x="100" y="232" textAnchor="middle">diploid, 2n</text>
      </g>

      <path className="spark-repro-arrow" d="M270 245H420" markerEnd="url(#repro-asexual-arrow)"/>
      <g className="repro-mitosis" transform="translate(435 115)">
        <rect x="0" y="0" width="170" height="250" rx="22"/>
        <text x="85" y="42" textAnchor="middle">MITOSIS</text>
        <circle cx="55" cy="105" r="35"/><circle cx="115" cy="145" r="35"/>
        <path className="repro-chromatid" d="M45 85L65 125M65 85L45 125M105 125L125 165M125 125L105 165"/>
        <text className="small" x="85" y="205" textAnchor="middle">chromosome number</text>
        <text className="small" x="85" y="226" textAnchor="middle">is maintained</text>
      </g>
      <path className="spark-repro-arrow" d="M625 245H745" markerEnd="url(#repro-asexual-arrow)"/>

      <g className="repro-clone-group">
        {[0,1,2].map((i)=><g key={i} transform={`translate(${755+i*70} ${120+i*95}) scale(.66)`}>
          <circle className="repro-clone-cell" cx="100" cy="100" r="75"/>
          <circle className="repro-nucleus" cx="100" cy="100" r="42"/>
          <ChromosomePair x={78} y={100}/>
        </g>)}
      </g>

      <text className="spark-repro-caption" x="825" y="445" textAnchor="middle">offspring are genetically identical clones, 2n</text>
      <text className="spark-repro-caption emphasis" x="490" y="55" textAnchor="middle">No gametes fuse in asexual reproduction.</text>
    </svg>
  );
}

function SexualDiagram() {
  return (
    <svg className="spark-sexual-repro-svg" viewBox="0 0 1040 560" role="img" aria-label="Sexual reproduction showing diploid parent cells producing haploid gametes by meiosis and fertilisation restoring the diploid chromosome number in a genetically varied zygote">
      <defs>
        <marker id="repro-sexual-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="spark-repro-arrow-fill"/>
        </marker>
      </defs>

      <g className="repro-parent-sexual" transform="translate(50 70)">
        <circle className="repro-parent-one" cx="100" cy="100" r="72"/>
        <circle className="repro-nucleus" cx="100" cy="100" r="42"/>
        <ChromosomePair x={78} y={100}/>
        <text x="100" y="198" textAnchor="middle">Parent 1 cell, 2n</text>
      </g>
      <g className="repro-parent-sexual" transform="translate(50 310)">
        <circle className="repro-parent-two" cx="100" cy="100" r="72"/>
        <circle className="repro-nucleus" cx="100" cy="100" r="42"/>
        <ChromosomePair x={78} y={100} variant="mixed"/>
        <text x="100" y="198" textAnchor="middle">Parent 2 cell, 2n</text>
      </g>

      <path className="spark-repro-arrow" d="M230 170H350" markerEnd="url(#repro-sexual-arrow)"/>
      <path className="spark-repro-arrow" d="M230 410H350" markerEnd="url(#repro-sexual-arrow)"/>

      <g className="repro-meiosis-box">
        <rect x="365" y="85" width="170" height="150" rx="20"/>
        <rect x="365" y="325" width="170" height="150" rx="20"/>
        <text x="450" y="125" textAnchor="middle">MEIOSIS</text>
        <text x="450" y="365" textAnchor="middle">MEIOSIS</text>
        <text className="small" x="450" y="155" textAnchor="middle">halves chromosome number</text>
        <text className="small" x="450" y="395" textAnchor="middle">halves chromosome number</text>
        <g className="repro-gamete mini" transform="translate(410 168)"><circle cx="40" cy="28" r="27"/><path className="spark-repro-chromosome maternal" d="M34 12L46 44M46 12L34 44"/></g>
        <g className="repro-gamete mini" transform="translate(410 408)"><circle cx="40" cy="28" r="27"/><path className="spark-repro-chromosome paternal" d="M34 12L46 44M46 12L34 44"/></g>
      </g>

      <path className="spark-repro-arrow" d="M555 170Q650 205 690 260" markerEnd="url(#repro-sexual-arrow)"/>
      <path className="spark-repro-arrow" d="M555 410Q650 375 690 320" markerEnd="url(#repro-sexual-arrow)"/>

      <g className="repro-gametes">
        <circle className="male" cx="710" cy="250" r="48"/>
        <path className="spark-repro-chromosome maternal" d="M700 225L720 275M720 225L700 275"/>
        <text className="small" x="710" y="315" textAnchor="middle">male gamete, n</text>

        <circle className="female" cx="710" cy="355" r="48"/>
        <path className="spark-repro-chromosome paternal" d="M700 330L720 380M720 330L700 380"/>
        <text className="small" x="710" y="420" textAnchor="middle">female gamete, n</text>
      </g>

      <path className="spark-repro-arrow" d="M765 285H850" markerEnd="url(#repro-sexual-arrow)"/>
      <text className="repro-fertilisation-label" x="808" y="265" textAnchor="middle">fertilisation</text>

      <g className="repro-zygote-group">
        <circle className="spark-repro-zygote" cx="930" cy="305" r="72"/>
        <circle className="repro-nucleus" cx="930" cy="305" r="43"/>
        <ChromosomePair x={908} y={305} variant="mixed"/>
        <text className="spark-repro-zygote-text" x="930" y="398" textAnchor="middle">zygote, 2n</text>
      </g>

      <text className="spark-repro-caption emphasis" x="520" y="38" textAnchor="middle">Meiosis makes haploid gametes. Fertilisation restores the diploid chromosome number.</text>
      <text className="spark-repro-caption" x="520" y="535" textAnchor="middle">The zygote contains genetic material from both parents, producing variation.</text>
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
