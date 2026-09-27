import React, { useState } from "react";
import "./reproductionComparisonExplorer.css";

const CONTENT = {
  asexual: {
    title:"Asexual reproduction",
    summary:"One parent produces offspring without the fusion of gametes.",
    details:[
      "Mitosis produces daughter cells with the same chromosome number as the parent cell.",
      "No male and female gametes fuse.",
      "Offspring produced by asexual reproduction are genetically very similar to the parent.",
      "Low variation can leave a population vulnerable to the same disease or environmental change.",
    ],
    steps:[
      ["Parent cell","The process starts with one parent cell."],
      ["Mitosis","The nucleus divides so the daughter nuclei receive the same chromosome number."],
      ["Similar offspring","Repeated mitosis underpins growth of genetically similar offspring in many asexual processes."],
    ],
    references:[
      {
        image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Mitosis_cells_sequence.svg",
        source:"https://commons.wikimedia.org/wiki/File:Mitosis_cells_sequence.svg",
        credit:"LadyofHats",
        license:"Public domain",
        alt:"Reference diagram showing the sequence of mitosis in eukaryotic cells",
        caption:"Mitosis maintains chromosome number as one cell divides into daughter cells.",
      },
    ],
  },
  sexual: {
    title:"Sexual reproduction",
    summary:"Male and female gametes fuse during fertilisation.",
    details:[
      "Meiosis produces gametes with half the chromosome number.",
      "Fertilisation joins male and female gametes and restores the diploid chromosome number.",
      "The zygote receives genetic material from both parents.",
      "Sexual reproduction therefore produces genetic variation among offspring.",
    ],
    steps:[
      ["Meiosis","Diploid cells undergo meiosis to produce haploid gametes."],
      ["Gametes","Male and female gametes carry one set of chromosomes each."],
      ["Fertilisation","Fusion of the gametes forms a diploid zygote."],
      ["Variation","The zygote contains genetic material from both parents."],
    ],
    references:[
      {
        image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Meiosis_Stages.svg",
        source:"https://commons.wikimedia.org/wiki/File:Meiosis_Stages.svg",
        credit:"Ali Zifan",
        license:"CC BY-SA 4.0",
        alt:"Reference diagram showing the main stages of meiosis",
        caption:"Meiosis reduces chromosome number and produces haploid cells.",
      },
      {
        image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Egg_cell_fertilization_-_Zygote.png",
        source:"https://commons.wikimedia.org/wiki/File:Egg_cell_fertilization_-_Zygote.png",
        credit:"Sciencia58",
        license:"CC0 1.0",
        alt:"Scientific diagram of fertilisation of an egg by a sperm cell",
        caption:"Fertilisation joins male and female gametes to form a zygote.",
      },
    ],
  },
};

function ReferenceCard({ reference }) {
  return (
    <figure className="spark-repro-reference">
      <img src={reference.image} alt={reference.alt} loading="lazy" />
      <figcaption>
        <span>{reference.caption}</span>
        <small>
          Reference: <a href={reference.source} target="_blank" rel="noreferrer">{reference.credit}</a>
          {" · "}{reference.license}
        </small>
      </figcaption>
    </figure>
  );
}

export default function ReproductionComparisonExplorer() {
  const [mode,setMode] = useState("asexual");
  const [stepIndex,setStepIndex] = useState(0);
  const content = CONTENT[mode];
  const step = content.steps[stepIndex] || content.steps[0];

  const changeMode = nextMode => {
    setMode(nextMode);
    setStepIndex(0);
  };

  return (
    <section className="spark-reproduction-comparison">
      <header>
        <span>REFERENCE COMPARISON</span>
        <h3>Asexual and sexual reproduction</h3>
        <p>Use established cell-division and fertilisation diagrams, then step through what changes in chromosome number and genetic variation.</p>
      </header>

      <div className="spark-reproduction-tabs" role="tablist" aria-label="Reproduction process">
        {Object.entries(CONTENT).map(([key,item])=>(
          <button
            type="button"
            role="tab"
            aria-selected={mode===key}
            className={mode===key ? "active" : ""}
            key={key}
            onClick={()=>changeMode(key)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="spark-reproduction-grid">
        <div className="spark-reproduction-stage">
          <div className="spark-repro-reference-grid">
            {content.references.map(reference=><ReferenceCard key={reference.source} reference={reference}/>)}
          </div>

          <div className="spark-repro-stepper">
            <span>Tap a step</span>
            <div>
              {content.steps.map(([title],index)=>(
                <button
                  type="button"
                  key={title}
                  className={index===stepIndex ? "active" : ""}
                  onClick={()=>setStepIndex(index)}
                >
                  {index+1}. {title}
                </button>
              ))}
            </div>
            <article role="status">
              <strong>{step?.[0]}</strong>
              <p>{step?.[1]}</p>
            </article>
          </div>
        </div>

        <aside className="spark-reproduction-notes">
          <strong>{content.title}</strong>
          <p>{content.summary}</p>
          <ul>
            {content.details.map(detail=><li key={detail}>{detail}</li>)}
          </ul>
        </aside>
      </div>
    </section>
  );
}
