import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./maternalBabyCareExplorer.css";

const VIEWS = {
  prenatal:{
    label:"Pre-natal care",
    title:"Support healthy development before birth",
    points:[
      "Attend regular antenatal or pre-natal visits.",
      "Eat a balanced diet with adequate protein, iron, folate, calcium and other needed nutrients.",
      "Follow health-care advice on supplements and medicines.",
      "Use ultrasound and other recommended checks to monitor growth and position of the foetus.",
    ],
  },
  hazards:{
    label:"Avoid harmful exposure",
    title:"Reduce risks to the developing foetus",
    points:[
      "Do not smoke and avoid tobacco smoke exposure.",
      "Avoid alcohol and non-medical drug use during pregnancy.",
      "Tell health-care providers about pregnancy before medicines or imaging are used.",
      "Avoid unnecessary ionising radiation while allowing medically necessary care to be assessed by professionals.",
    ],
  },
  breastfeeding:{
    label:"Breastfeeding",
    title:"Nutrition and passive protection",
    points:[
      "Breast milk supplies suitable nutrients for early growth.",
      "It contains antibodies and other protective factors.",
      "It is clean and available at the correct temperature.",
      "Breastfeeding also supports close contact between mother and baby.",
    ],
  },
  postnatal:{
    label:"Post-natal care",
    title:"Care continues after birth",
    points:[
      "Check the mother's recovery after delivery.",
      "Monitor the baby's growth, feeding and general health.",
      "Support feeding and safe infant care.",
      "Follow the recommended childhood immunisation schedule.",
    ],
  },
};

function PrenatalScene() {
  return (
    <ReviewedScienceDiagram site="MaternalBabyCareExplorer.jsx:49"><svg viewBox="0 0 860 400" role="img" aria-label="Pre-natal care showing nutrition, clinic visits and ultrasound monitoring">
      <circle className="mb-mother-head" cx="180" cy="95" r="42" />
      <path className="mb-mother-body" d="M130 150Q180 125 225 155Q275 210 250 320H115Q95 225 130 150Z" />
      <ellipse className="mb-pregnancy" cx="215" cy="235" rx="67" ry="78" />
      <path className="mb-arrow" d="M300 220H420" />
      <rect className="mb-clinic" x="445" y="80" width="335" height="235" rx="20" />
      <path className="mb-cross" d="M535 110V180M500 145H570" />
      <rect className="mb-ultrasound-screen" x="605" y="110" width="130" height="95" rx="10" />
      <path className="mb-foetal-outline" d="M650 135q45 15 35 55q-35 15-50-10q-8-25 15-45Z" />
      <circle className="mb-food" cx="515" cy="250" r="28" />
      <circle className="mb-food" cx="585" cy="250" r="28" />
      <circle className="mb-food" cx="655" cy="250" r="28" />
      <text className="mb-label" x="180" y="365" textAnchor="middle">pregnancy</text>
      <text className="mb-label" x="610" y="355" textAnchor="middle">clinic checks + nutrition + monitoring</text>
    </svg></ReviewedScienceDiagram>
  );
}

function HazardScene() {
  return (
    <ReviewedScienceDiagram site="MaternalBabyCareExplorer.jsx:69"><svg viewBox="0 0 860 400" role="img" aria-label="Smoking and alcohol can reduce healthy foetal development">
      <g transform="translate(105 85)">
        <rect className="mb-cigarette" x="0" y="65" width="145" height="22" rx="9" />
        <path className="mb-smoke" d="M150 72q45-30 70 0t55-5" />
        <path className="mb-stop" d="M-15 10L220 155M220 10L-15 155" />
      </g>
      <g transform="translate(350 60)">
        <path className="mb-bottle" d="M75 10H125V70Q160 95 155 165V260H45V165Q40 95 75 70Z" />
        <path className="mb-stop" d="M5 15L195 275M195 15L5 275" />
      </g>
      <path className="mb-arrow warning" d="M570 200H665" />
      <g transform="translate(735 200)">
        <circle className="mb-foetus-head" cx="0" cy="-45" r="38" />
        <path className="mb-foetus-body" d="M-30-10Q0 30 35 0Q55 60 10 100H-30Q-55 55-30-10Z" />
      </g>
      <text className="mb-warning-text" x="685" y="355" textAnchor="middle">harmful substances can cross the placenta</text>
    </svg></ReviewedScienceDiagram>
  );
}

function BreastfeedingScene() {
  return (
    <ReviewedScienceDiagram site="MaternalBabyCareExplorer.jsx:91"><svg viewBox="0 0 860 400" role="img" aria-label="Breastfeeding provides nutrients and antibodies to a baby">
      <circle className="mb-mother-head" cx="220" cy="95" r="42" />
      <path className="mb-mother-body" d="M155 160Q220 125 285 165Q310 230 295 330H145Q125 230 155 160Z" />
      <g transform="translate(350 210)">
        <circle className="mb-baby-head" cx="0" cy="-35" r="38" />
        <path className="mb-baby-body" d="M-30 0Q10 25 55 5Q80 55 45 95H-45Q-65 45-30 0Z" />
      </g>
      <path className="mb-arrow" d="M445 180H555" />
      <g transform="translate(630 92)">
        <path className="mb-shield" d="M0 0Q85 10 85 78Q75 155 0 195Q-75 155-85 78Q-85 10 0 0Z" />
        <path className="mb-antibody" d="M-20 60V115m0-25l-30-25m30 25l30-25M35 55v60m0-30L5 60m30 25l30-25" />
      </g>
      <text className="mb-label" x="630" y="325" textAnchor="middle">nutrients + antibodies</text>
    </svg></ReviewedScienceDiagram>
  );
}

function PostnatalScene() {
  return (
    <ReviewedScienceDiagram site="MaternalBabyCareExplorer.jsx:110"><svg viewBox="0 0 860 400" role="img" aria-label="Post-natal care includes checks for mother and baby and childhood immunisation">
      <rect className="mb-clinic" x="70" y="65" width="720" height="270" rx="22" />
      <g transform="translate(170 130)">
        <circle className="mb-mother-head" cx="0" cy="0" r="35" />
        <path className="mb-mother-body" d="M-45 55Q0 35 45 55L55 160H-55Z" />
      </g>
      <g transform="translate(360 185)">
        <circle className="mb-baby-head" cx="0" cy="-35" r="34" />
        <path className="mb-baby-body" d="M-28 0Q0 25 32 5Q50 50 30 85H-35Q-48 45-28 0Z" />
      </g>
      <g transform="translate(570 120)">
        <rect className="mb-chart" x="0" y="0" width="120" height="155" rx="12" />
        <path className="mb-chart-line" d="M20 120L48 95L73 100L103 55" />
      </g>
      <g transform="translate(715 220)">
        <rect className="mb-syringe" x="-55" y="-8" width="95" height="16" rx="6" />
        <line className="mb-needle" x1="40" y1="0" x2="75" y2="0" />
      </g>
      <text className="mb-label" x="430" y="365" textAnchor="middle">recovery + feeding + growth + immunisation</text>
    </svg></ReviewedScienceDiagram>
  );
}

export default function MaternalBabyCareExplorer() {
  const [view,setView] = useState("prenatal");
  const info = VIEWS[view];

  return (
    <section className="spark-maternal-baby-care">
      <header>
        <span>MATERNAL AND BABY CARE</span>
        <h3>Care before and after birth</h3>
        <p>Compare the practices that support the health of the mother, developing foetus and newborn baby.</p>
      </header>

      <div className="spark-maternal-care-tabs">
        {Object.entries(VIEWS).map(([key,item]) => (
          <button type="button" key={key} className={view === key ? "active" : ""} onClick={() => setView(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="spark-maternal-care-grid">
        <div className="spark-maternal-care-stage">
          {view === "prenatal" && <PrenatalScene />}
          {view === "hazards" && <HazardScene />}
          {view === "breastfeeding" && <BreastfeedingScene />}
          {view === "postnatal" && <PostnatalScene />}
        </div>
        <aside>
          <h4>{info.title}</h4>
          <ul>{info.points.map(point => <li key={point}>{point}</li>)}</ul>
        </aside>
      </div>
    </section>
  );
}
