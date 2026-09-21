import React, { useState } from "react";
import "./humanExcretionMechanismsExplorer.css";

const VIEWS = {
  kidney:{
    label:"Kidney and nephron",
    title:"Urine formation",
    summary:"Blood is ultrafiltered at the glomerulus, useful substances are selectively reabsorbed along the tubule, and urea with excess water and salts remain to form urine.",
  },
  adh:{
    label:"Water balance",
    title:"ADH and urine concentration",
    summary:"When the body loses water, more ADH increases water reabsorption from the kidney tubules and collecting ducts, producing a smaller volume of more concentrated urine.",
  },
  skin:{
    label:"Skin",
    title:"Sweat and temperature control",
    summary:"Sweat glands excrete water, mineral salts and a small amount of urea. Evaporation of sweat removes heat from the body.",
  },
  lungs:{
    label:"Lungs",
    title:"Carbon dioxide and water vapour",
    summary:"Carbon dioxide produced by respiration diffuses from blood into the alveoli and leaves in exhaled air. Water vapour is also lost.",
  },
  dialysis:{
    label:"Dialysis",
    title:"Artificial removal of wastes",
    summary:"Dialysis removes urea and excess salts and water from blood when kidneys fail. Useful substances are retained by controlling the composition of dialysis fluid.",
  },
};

function KidneyScene() {
  return (
    <svg viewBox="0 0 980 560" role="img" aria-label="CSEC-style kidney and nephron showing ultrafiltration, reabsorption and urine formation">
      <g className="hex-csec-kidney" transform="translate(48 55) scale(1.08 1.38)">
        <path className="hex-kidney" d="M150 30Q60 30 60 140Q60 250 150 250Q200 250 205 200Q185 170 190 140Q185 110 205 80Q200 30 150 30Z" />
        <path className="hex-kidney-cortex-boundary" d="M150 52Q82 52 82 140Q82 228 150 228Q180 228 184 196" />

        <g className="hex-kidney-pyramids">
          <path d="M100 65L150 74L100 95Z" />
          <path d="M100 100L150 113L100 130Z" />
          <path d="M100 135L150 152L100 165Z" />
          <path d="M100 170L150 191L100 200Z" />
        </g>

        <path className="hex-kidney-pelvis" d="M160 110Q200 140 160 170Q175 140 160 110Z" />
        <path className="hex-ureter" d="M220 145Q238 178 241 220Q244 250 245 280" />
      </g>

      <text className="hex-label" x="205" y="430" textAnchor="middle">longitudinal section of kidney</text>
      <text className="hex-small" x="130" y="115">cortex</text>
      <text className="hex-small" x="160" y="270">medulla</text>
      <text className="hex-small" x="255" y="270">pelvis</text>
      <text className="hex-small" x="310" y="405">ureter</text>

      <g className="hex-csec-nephron" transform="translate(450 48) scale(1.16 1.2)">
        <path className="hex-bowman" d="M80 60A38 38 0 1 0 118 98" />
        <path className="hex-bowman-inner" d="M92 66A26 26 0 1 0 112 92" />
        <path className="hex-glomerulus" d="M70 80q8-12 16 0q8 12 16 0q-8-14-16-2q-8 14-16 2" />

        <path className="hex-arteriole in" d="M60 15L78 62" />
        <path className="hex-arteriole out" d="M100 15L95 62" />

        <path className="hex-tubule" d="M118 98q20 10 30-5q10-20 30-10q18 10 5 25q-15 12 5 25q15 8 25-2" />
        <path className="hex-loop" d="M213 133V280Q228 300 243 280V120" />
        <path className="hex-tubule link" d="M243 120q10-20 30-10q15 10 30 0q10-8 20 0" />
        <path className="hex-collecting" d="M335 40V300" />

        <path className="hex-filter-arrow" d="M91 90Q108 106 124 112" />
        <path className="hex-reabsorb-arrow" d="M170 120Q205 86 245 82" />
        <path className="hex-urine-arrow" d="M335 245V295" />
      </g>

      <text className="hex-label" x="545" y="145" textAnchor="middle">glomerulus</text>
      <text className="hex-small" x="560" y="180" textAnchor="middle">Bowman&apos;s capsule</text>
      <text className="hex-small" x="725" y="445" textAnchor="middle">loop of Henle</text>
      <text className="hex-small" x="845" y="175" textAnchor="middle">collecting duct</text>

      <g className="hex-kidney-process-key">
        <text className="hex-process" x="470" y="485">1. Ultrafiltration</text>
        <text className="hex-small" x="470" y="508">small molecules enter the filtrate</text>
        <text className="hex-process" x="670" y="485">2. Selective reabsorption</text>
        <text className="hex-small" x="670" y="508">useful substances return to blood</text>
        <text className="hex-process" x="865" y="485" textAnchor="end">3. Urine</text>
        <text className="hex-small" x="865" y="508" textAnchor="end">urea + excess water + salts</text>
      </g>
    </svg>
  );
}

function AdhScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="ADH response to water loss and high water intake">
      <text className="hex-heading" x="250" y="45" textAnchor="middle">Water loss, hot day or exercise</text>
      <text className="hex-heading" x="730" y="45" textAnchor="middle">Large water intake</text>

      <g transform="translate(80 85)">
        <path className="hex-body" d="M115 30Q160 20 190 55Q215 95 185 135Q230 210 205 330H70Q45 210 90 135Q60 95 80 60Q90 40 115 30Z" />
        <path className="hex-sweat-drop" d="M225 110q-18 25 0 43q18-18 0-43Z" />
        <path className="hex-sweat-drop" d="M245 160q-18 25 0 43q18-18 0-43Z" />
        <path className="hex-arrow" d="M285 180H370" />
        <text className="hex-small" x="330" y="155" textAnchor="middle">blood becomes</text>
        <text className="hex-small" x="330" y="175" textAnchor="middle">more concentrated</text>
        <rect className="hex-pituitary" x="390" y="120" width="155" height="95" rx="18" />
        <text className="hex-label" x="468" y="155" textAnchor="middle">pituitary</text>
        <text className="hex-adh-high" x="468" y="185" textAnchor="middle">MORE ADH</text>
        <path className="hex-arrow" d="M548 168H625" />
        <path className="hex-collecting-mini" d="M650 95V275" />
        <path className="hex-water-back" d="M650 135H735M650 180H735M650 225H735" />
        <text className="hex-small" x="710" y="300" textAnchor="middle">more water reabsorbed</text>
        <path className="hex-urine-drop concentrated" d="M655 325q-35 45 0 80q35-35 0-80Z" />
        <text className="hex-small" x="655" y="430" textAnchor="middle">small volume</text>
        <text className="hex-small" x="655" y="450" textAnchor="middle">concentrated urine</text>
      </g>

      <g transform="translate(540 85)">
        <circle className="hex-water-glass" cx="190" cy="100" r="70" />
        <path className="hex-water-line" d="M130 105Q190 85 250 105" />
        <path className="hex-arrow" d="M275 180H350" />
        <rect className="hex-pituitary" x="365" y="120" width="155" height="95" rx="18" />
        <text className="hex-label" x="442" y="155" textAnchor="middle">pituitary</text>
        <text className="hex-adh-low" x="442" y="185" textAnchor="middle">LESS ADH</text>
        <path className="hex-arrow" d="M522 168H585" />
        <path className="hex-collecting-mini" d="M610 95V275" />
        <path className="hex-water-back faint" d="M610 180H675" />
        <path className="hex-urine-drop dilute" d="M615 325q-35 45 0 80q35-35 0-80Z" />
        <text className="hex-small" x="615" y="430" textAnchor="middle">larger volume</text>
        <text className="hex-small" x="615" y="450" textAnchor="middle">dilute urine</text>
      </g>
    </svg>
  );
}

function SkinScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Skin showing sweat gland, sweat duct, surface vessels and fat layer">
      <rect className="hex-epidermis" x="100" y="90" width="780" height="70" />
      <rect className="hex-dermis" x="100" y="160" width="780" height="220" />
      <rect className="hex-fat" x="100" y="380" width="780" height="90" />

      <path className="hex-sweat-duct" d="M300 335Q260 280 310 235Q360 190 320 145V90" />
      <path className="hex-sweat-gland" d="M240 330q30-45 60 0t60 0t60 0q-30 50-60 5t-60 0t-60-5Z" />
      <path className="hex-sweat-drop" d="M320 45q-18 25 0 43q18-18 0-43Z" />

      <path className="hex-blood-vessel" d="M520 290q95-60 190 0t110 0" />
      <path className="hex-blood-vessel surface" d="M510 205q85-45 170 0t130 0" />
      <path className="hex-hair" d="M635 230L600 70" />
      <circle className="hex-hair-root" cx="640" cy="260" r="28" />

      <text className="hex-label" x="200" y="125">epidermis</text>
      <text className="hex-label" x="200" y="250">dermis</text>
      <text className="hex-label" x="200" y="430">fat layer</text>
      <text className="hex-small" x="345" y="365">coiled sweat gland</text>
      <text className="hex-small" x="365" y="105">sweat duct</text>
      <text className="hex-small" x="705" y="195">surface blood vessels</text>
      <text className="hex-process" x="490" y="500" textAnchor="middle">Evaporation of sweat removes heat from the body</text>
    </svg>
  );
}

function LungsScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Lung alveolus showing carbon dioxide and water vapour leaving blood">
      <path className="hex-airway" d="M470 40V145Q470 175 420 205M470 145Q470 175 520 205" />
      {[330,410,490,570,650].map((x,index)=>(
        <circle key={x} className="hex-alveolus" cx={x} cy={285 + (index%2)*28} r="70" />
      ))}
      <path className="hex-capillary" d="M245 360Q360 430 490 380T760 350" />
      <path className="hex-co2-arrow" d="M365 370Q365 330 365 300" />
      <path className="hex-co2-arrow" d="M500 380Q500 330 500 305" />
      <path className="hex-water-arrow" d="M625 370Q625 325 625 300" />
      <path className="hex-exhale" d="M470 230V80" />
      <text className="hex-process" x="250" y="470">CO2 diffuses from blood into alveoli</text>
      <text className="hex-process" x="610" y="470">water vapour is also lost</text>
      <text className="hex-label" x="470" y="55" textAnchor="middle">exhaled air</text>
    </svg>
  );
}

function DialysisScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Dialysis showing blood and dialysis fluid separated by a partially permeable membrane">
      <rect className="hex-dialysis-machine" x="80" y="80" width="820" height="350" rx="25" />
      <path className="hex-blood-tube" d="M135 150H390Q455 150 455 220V320Q455 365 390 365H135" />
      <path className="hex-dialysis-fluid" d="M535 150H845M535 365H845" />
      <rect className="hex-membrane" x="470" y="120" width="45" height="275" rx="14" />
      <path className="hex-diffuse-arrow" d="M420 200H560M420 265H560M420 330H560" />
      <text className="hex-label" x="265" y="130" textAnchor="middle">patient's blood</text>
      <text className="hex-label" x="690" y="130" textAnchor="middle">dialysis fluid</text>
      <text className="hex-small" x="490" y="420" textAnchor="middle">partially permeable membrane</text>
      <text className="hex-small" x="685" y="210" textAnchor="middle">no urea initially</text>
      <text className="hex-small" x="685" y="245" textAnchor="middle">normal glucose concentration</text>
      <text className="hex-small" x="685" y="280" textAnchor="middle">normal salt concentration</text>
      <text className="hex-process" x="490" y="480" textAnchor="middle">urea diffuses out, useful glucose is retained</text>
    </svg>
  );
}

export default function HumanExcretionMechanismsExplorer() {
  const [view,setView] = useState("kidney");
  const info = VIEWS[view];

  return (
    <section className="spark-human-excretion">
      <header>
        <span>HUMAN EXCRETION</span>
        <h3>How lungs, skin and kidneys remove wastes</h3>
        <p>Trace each waste product from the blood to the route by which it leaves the body.</p>
      </header>

      <div className="spark-human-excretion-tabs">
        {Object.entries(VIEWS).map(([key,item]) => (
          <button type="button" key={key} className={view === key ? "active" : ""} onClick={() => setView(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="spark-human-excretion-stage">
        {view === "kidney" && <KidneyScene />}
        {view === "adh" && <AdhScene />}
        {view === "skin" && <SkinScene />}
        {view === "lungs" && <LungsScene />}
        {view === "dialysis" && <DialysisScene />}
      </div>

      <div className="spark-human-excretion-summary">
        <strong>{info.title}</strong>
        <span>{info.summary}</span>
      </div>
    </section>
  );
}
