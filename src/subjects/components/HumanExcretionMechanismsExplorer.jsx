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
    <svg viewBox="0 0 980 560" role="img" aria-label="Kidney and nephron showing ultrafiltration, reabsorption and urine formation">
      <g transform="translate(60 55)">
        <path className="hex-kidney" d="M165 20Q55 40 40 180Q30 330 150 410Q265 370 285 245Q300 130 250 65Q220 25 165 20Z" />
        <path className="hex-kidney-medulla" d="M165 80Q95 95 90 190Q92 285 165 340Q225 300 235 220Q240 140 205 100Q188 82 165 80Z" />
        <path className="hex-kidney-pelvis" d="M175 205Q220 195 260 225Q225 248 195 275Z" />
        <path className="hex-ureter" d="M245 235Q285 285 280 420" />
        <text className="hex-label" x="145" y="465">kidney</text>
        <text className="hex-small" x="255" y="445">ureter to bladder</text>
      </g>

      <g transform="translate(390 45)">
        <circle className="hex-bowman" cx="110" cy="95" r="72" />
        <path className="hex-glomerulus" d="M60 95q18-45 38 0t38 0t38 0" />
        <path className="hex-arteriole in" d="M0 80H42" />
        <path className="hex-arteriole out" d="M178 110H230" />

        <path className="hex-tubule" d="M110 170Q50 205 95 245Q150 280 115 320Q65 360 135 390Q205 415 180 460Q160 495 210 520" />
        <path className="hex-loop" d="M210 190V425Q210 470 245 470Q280 470 280 425V235" />
        <path className="hex-collecting" d="M355 170V505" />
        <path className="hex-tubule link" d="M280 235Q320 190 355 210" />

        <path className="hex-filter-arrow" d="M110 90V145" />
        <text className="hex-process" x="10" y="20">1. Ultrafiltration</text>
        <text className="hex-small" x="10" y="42">water, urea, salts and glucose enter filtrate</text>
        <text className="hex-small" x="10" y="62">blood cells and large proteins stay in blood</text>

        <text className="hex-process" x="405" y="185">2. Selective reabsorption</text>
        <text className="hex-small" x="405" y="207">all glucose, needed salts and much water</text>
        <path className="hex-reabsorb-arrow" d="M175 250Q310 275 395 235" />

        <text className="hex-process" x="405" y="365">3. Urine</text>
        <text className="hex-small" x="405" y="387">urea + excess water + excess salts</text>
        <path className="hex-urine-arrow" d="M355 425V520" />

        <text className="hex-label" x="110" y="105" textAnchor="middle">glomerulus</text>
        <text className="hex-small" x="110" y="137" textAnchor="middle">Bowman's capsule</text>
        <text className="hex-small" x="190" y="545" textAnchor="middle">nephron tubule</text>
        <text className="hex-small" x="355" y="545" textAnchor="middle">collecting duct</text>
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
