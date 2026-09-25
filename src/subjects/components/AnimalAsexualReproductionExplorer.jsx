import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./animalAsexualReproductionExplorer.css";

const METHODS = {
  binary:{
    title:"Binary fission",
    example:"Amoeba or Paramecium",
    note:"One parent cell copies its genetic material and divides into two daughter cells.",
    outcome:"Two genetically similar daughter cells are produced.",
  },
  budding:{
    title:"Budding",
    example:"Hydra",
    note:"A small outgrowth forms on the parent, grows and later separates as a new individual.",
    outcome:"The new individual develops from the body of one parent.",
  },
  fragmentation:{
    title:"Fragmentation",
    example:"Planarian flatworm",
    note:"The parent body separates into pieces and each suitable fragment regenerates missing parts.",
    outcome:"Each viable fragment can grow into a complete organism.",
  },
  parthenogenesis:{
    title:"Parthenogenesis",
    example:"Aphids and male honeybees",
    note:"An egg develops into a new individual without fertilisation.",
    outcome:"No fusion of male and female gametes occurs.",
  },
};

function BinaryScene() {
  return (
    <ReviewedScienceDiagram site="AnimalAsexualReproductionExplorer.jsx:33"><svg viewBox="0 0 900 430" role="img" aria-label="Binary fission process in a unicellular organism">
      <g transform="translate(160 205)">
        <ellipse className="aar-cell" rx="92" ry="72" />
        <circle className="aar-nucleus" cx="0" cy="0" r="26" />
      </g>
      <path className="aar-arrow" d="M275 205H365" />
      <g transform="translate(450 205)">
        <ellipse className="aar-cell dividing" rx="105" ry="74" />
        <circle className="aar-nucleus" cx="-34" cy="0" r="23" />
        <circle className="aar-nucleus" cx="34" cy="0" r="23" />
        <path className="aar-cleavage" d="M0-70Q-25 0 0 70" />
      </g>
      <path className="aar-arrow" d="M565 205H655" />
      <g transform="translate(735 155)">
        <ellipse className="aar-cell" rx="68" ry="52" />
        <circle className="aar-nucleus" cx="0" cy="0" r="18" />
      </g>
      <g transform="translate(735 270)">
        <ellipse className="aar-cell" rx="68" ry="52" />
        <circle className="aar-nucleus" cx="0" cy="0" r="18" />
      </g>
      <text className="aar-label" x="160" y="330" textAnchor="middle">one parent cell</text>
      <text className="aar-label" x="450" y="330" textAnchor="middle">nucleus copies, cell divides</text>
      <text className="aar-label" x="735" y="350" textAnchor="middle">two daughter cells</text>
    </svg></ReviewedScienceDiagram>
  );
}

function BuddingScene() {
  return (
    <ReviewedScienceDiagram site="AnimalAsexualReproductionExplorer.jsx:63"><svg viewBox="0 0 900 430" role="img" aria-label="Budding process in Hydra">
      <g transform="translate(175 105)">
        <path className="aar-hydra-body" d="M-40 220Q-55 130-38 55Q0 15 38 55Q55 130 40 220Z" />
        <path className="aar-tentacle" d="M-28 55Q-70 10-95 25M-12 43Q-30-10-10-30M10 43Q35-8 55-25M28 55Q75 15 95 35" />
      </g>
      <path className="aar-arrow" d="M300 205H380" />
      <g transform="translate(465 105)">
        <path className="aar-hydra-body" d="M-40 220Q-55 130-38 55Q0 15 38 55Q55 130 40 220Z" />
        <path className="aar-tentacle" d="M-28 55Q-70 10-95 25M-12 43Q-30-10-10-30M10 43Q35-8 55-25M28 55Q75 15 95 35" />
        <path className="aar-bud" d="M38 145Q88 120 100 155Q106 190 65 200Q48 190 38 175Z" />
        <path className="aar-tentacle small" d="M88 133Q105 110 120 118M95 138Q125 130 132 144" />
      </g>
      <path className="aar-arrow" d="M585 205H655" />
      <g transform="translate(750 155)">
        <path className="aar-hydra-body small-body" d="M-28 145Q-38 85-25 38Q0 12 25 38Q38 85 28 145Z" />
        <path className="aar-tentacle small" d="M-18 38Q-50 5-64 18M0 30Q0-5 18-15M18 38Q50 10 62 24" />
      </g>
      <text className="aar-label" x="175" y="375" textAnchor="middle">parent Hydra</text>
      <text className="aar-label" x="465" y="375" textAnchor="middle">bud grows on parent</text>
      <text className="aar-label" x="750" y="350" textAnchor="middle">bud separates</text>
    </svg></ReviewedScienceDiagram>
  );
}

function FragmentationScene() {
  return (
    <ReviewedScienceDiagram site="AnimalAsexualReproductionExplorer.jsx:89"><svg viewBox="0 0 900 430" role="img" aria-label="Fragmentation and regeneration in a planarian flatworm">
      <path className="aar-planarian" d="M75 200Q130 125 220 155Q270 180 245 225Q205 285 105 260Q55 240 75 200Z" />
      <circle className="aar-eye" cx="120" cy="188" r="7" /><circle className="aar-eye" cx="145" cy="185" r="7" />
      <path className="aar-cut" d="M180 150L165 270" />
      <path className="aar-arrow" d="M285 210H375" />
      <path className="aar-planarian piece" d="M405 150Q455 120 500 155Q515 185 490 215Q445 235 405 210Z" />
      <circle className="aar-eye" cx="438" cy="170" r="6" /><circle className="aar-eye" cx="458" cy="168" r="6" />
      <path className="aar-planarian piece" d="M405 270Q455 235 510 270Q525 300 495 330Q445 345 405 320Z" />
      <path className="aar-arrow" d="M545 210H625" />
      <path className="aar-planarian small" d="M655 125Q705 90 765 130Q790 165 760 200Q705 225 655 190Z" />
      <circle className="aar-eye" cx="690" cy="145" r="6" /><circle className="aar-eye" cx="710" cy="143" r="6" />
      <path className="aar-planarian small" d="M655 265Q705 230 765 270Q790 305 760 340Q705 365 655 330Z" />
      <circle className="aar-eye" cx="690" cy="285" r="6" /><circle className="aar-eye" cx="710" cy="283" r="6" />
      <text className="aar-label" x="160" y="370" textAnchor="middle">body is divided</text>
      <text className="aar-label" x="460" y="370" textAnchor="middle">fragments survive</text>
      <text className="aar-label" x="715" y="390" textAnchor="middle">missing parts regenerate</text>
    </svg></ReviewedScienceDiagram>
  );
}

function ParthenogenesisScene() {
  return (
    <ReviewedScienceDiagram site="AnimalAsexualReproductionExplorer.jsx:111"><svg viewBox="0 0 900 430" role="img" aria-label="Parthenogenesis showing development from an unfertilised egg">
      <ellipse className="aar-egg" cx="155" cy="205" rx="75" ry="95" />
      <circle className="aar-egg-nucleus" cx="155" cy="205" r="24" />
      <text className="aar-label" x="155" y="335" textAnchor="middle">unfertilised egg</text>
      <path className="aar-arrow" d="M260 205H360" />
      <g transform="translate(455 205)">
        <ellipse className="aar-egg" rx="75" ry="95" />
        <circle className="aar-embryo" cx="-24" cy="-18" r="20" />
        <circle className="aar-embryo" cx="22" cy="-8" r="20" />
        <circle className="aar-embryo" cx="-10" cy="30" r="20" />
      </g>
      <text className="aar-label" x="455" y="335" textAnchor="middle">embryo develops</text>
      <path className="aar-arrow" d="M560 205H650" />
      <g transform="translate(750 200)">
        <ellipse className="aar-bee-body" cx="0" cy="0" rx="58" ry="36" />
        <ellipse className="aar-bee-stripe" cx="-10" cy="0" rx="10" ry="34" />
        <ellipse className="aar-bee-stripe" cx="18" cy="0" rx="10" ry="31" />
        <circle className="aar-bee-head" cx="-65" cy="0" r="27" />
        <ellipse className="aar-wing" cx="-5" cy="-48" rx="42" ry="23" transform="rotate(-20 -5 -48)" />
        <ellipse className="aar-wing" cx="30" cy="-43" rx="42" ry="23" transform="rotate(20 30 -43)" />
      </g>
      <text className="aar-label" x="750" y="335" textAnchor="middle">new individual</text>
      <text className="aar-note" x="450" y="390" textAnchor="middle">no fertilisation and no fusion of gametes</text>
    </svg></ReviewedScienceDiagram>
  );
}

export default function AnimalAsexualReproductionExplorer() {
  const [method,setMethod] = useState("binary");
  const info = METHODS[method];

  return (
    <section className="spark-animal-asexual">
      <header>
        <span>ASEXUAL REPRODUCTION</span>
        <h3>One parent, different methods</h3>
        <p>Compare how a new individual forms without the fusion of male and female gametes.</p>
      </header>
      <div className="spark-animal-asexual-tabs">
        {Object.entries(METHODS).map(([key,item])=>(
          <button type="button" key={key} className={method===key?"active":""} onClick={()=>setMethod(key)}>
            {item.title}
          </button>
        ))}
      </div>
      <div className="spark-animal-asexual-stage">
        {method === "binary" && <BinaryScene />}
        {method === "budding" && <BuddingScene />}
        {method === "fragmentation" && <FragmentationScene />}
        {method === "parthenogenesis" && <ParthenogenesisScene />}
      </div>
      <div className="spark-animal-asexual-notes">
        <article><b>Example</b><span>{info.example}</span></article>
        <article><b>What happens</b><span>{info.note}</span></article>
        <article><b>Outcome</b><span>{info.outcome}</span></article>
      </div>
      <div className="spark-animal-asexual-warning">
        <strong>Common feature</strong>
        <span>Asexual reproduction is rapid and needs only one parent, but offspring usually have little genetic variation. A disease or environmental change may therefore affect many individuals in the same way.</span>
      </div>
    </section>
  );
}
