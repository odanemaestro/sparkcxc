import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
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
    <ReviewedScienceDiagram site="HumanExcretionMechanismsExplorer.jsx:34"><svg viewBox="0 0 980 560" role="img" aria-label="Kidney and nephron showing gross kidney anatomy, ultrafiltration, reabsorption and urine formation">
      <g className="hex-csec-kidney" transform="translate(35 35) scale(1.02 1.15)">
        <path className="hex-kidney" d="M185 35Q86 18 70 132Q55 242 132 316Q187 368 249 325Q286 298 267 253Q247 209 263 170Q279 132 315 101Q306 48 238 36Q210 31 185 35Z" />
        <path className="hex-kidney-cortex-boundary" d="M184 60Q105 50 94 140Q86 224 145 282Q188 323 233 292Q258 274 246 243" />

        <g className="hex-kidney-pyramids">
          <path d="M118 90Q155 103 194 136L125 160Q111 127 118 90Z" />
          <path d="M103 153Q152 164 205 196L118 219Q101 190 103 153Z" />
          <path d="M118 226Q159 231 214 225L160 286Q132 265 118 226Z" />
          <path d="M164 68Q199 89 228 140L171 147Q159 105 164 68Z" />
        </g>

        <g className="hex-kidney-calyces">
          <path d="M194 136Q223 149 239 165" />
          <path d="M205 196Q231 195 247 207" />
          <path d="M214 225Q236 223 251 219" />
        </g>

        <path className="hex-kidney-pelvis" d="M221 143Q267 158 274 193Q281 224 230 266Q247 225 221 143Z" />
        <path className="hex-ureter" d="M257 237Q302 274 314 370" />

        <path className="hex-renal-artery" d="M274 160H365" />
        <path className="hex-renal-vein" d="M273 188H365" />
        <path className="hex-renal-artery branch" d="M278 160Q246 160 230 181M279 160Q246 137 222 115M279 160Q250 206 230 230" />
        <path className="hex-renal-vein branch" d="M278 188Q248 188 231 202M278 188Q250 226 232 244" />
      </g>

      <text className="hex-label" x="200" y="430" textAnchor="middle">longitudinal section of kidney</text>
      <text className="hex-small" x="112" y="115">cortex</text>
      <text className="hex-small" x="150" y="270">medulla</text>
      <text className="hex-small" x="258" y="258">renal pelvis</text>
      <text className="hex-small" x="315" y="390">ureter</text>
      <text className="hex-small vessel artery" x="335" y="212">renal artery</text>
      <text className="hex-small vessel vein" x="335" y="247">renal vein</text>

      <g className="hex-csec-nephron" transform="translate(450 48) scale(1.16 1.2)">
        <path className="hex-bowman" aria-label="Bowman&apos;s capsule" d="M80 60A38 38 0 1 0 118 98" />
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
    </svg></ReviewedScienceDiagram>
  );
}

function AdhScene() {
  return (
    <ReviewedScienceDiagram site="HumanExcretionMechanismsExplorer.jsx:106"><svg viewBox="0 0 980 520" role="img" aria-label="ADH response to water loss and high water intake">
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
    </svg></ReviewedScienceDiagram>
  );
}

function SkinScene() {
  return (
    <ReviewedScienceDiagram site="HumanExcretionMechanismsExplorer.jsx:149"><svg viewBox="0 0 980 540" role="img" aria-label="Cross-section of human skin showing epidermis, dermis, subcutaneous fat, hair follicle, sebaceous gland, sweat gland, blood vessels and sensory nerves">
      <path className="hex-skin-surface" d="M80 95Q180 78 280 94T480 94T680 94T900 92" />
      <path className="hex-epidermis" d="M80 95Q180 78 280 94T480 94T680 94T900 92V165H80Z" />
      <rect className="hex-dermis" x="80" y="165" width="820" height="225" />
      <rect className="hex-subcutaneous" x="80" y="390" width="820" height="100" />

      <g className="hex-fat-lobules">
        {[120,185,250,315,380,445,510,575,640,705,770,835].map((x,i)=>(
          <circle key={x} cx={x} cy={438+(i%2)*22} r="30" />
        ))}
      </g>

      <path className="hex-hair-shaft" d="M610 250Q600 155 584 58" />
      <path className="hex-hair-follicle" d="M584 145Q560 220 568 332Q572 372 606 386Q640 370 641 330Q638 230 606 148Z" />
      <ellipse className="hex-hair-bulb" cx="607" cy="360" rx="34" ry="30" />

      <path className="hex-sebaceous-gland" d="M535 230Q500 200 474 224Q460 247 482 263Q505 277 526 261Q544 246 535 230Z" />
      <path className="hex-sebaceous-duct" d="M528 250Q556 245 578 228" />

      <path className="hex-arrector" d="M520 320L575 245" />

      <path className="hex-sweat-duct" d="M290 355Q246 315 275 270Q309 223 295 176V101" />
      <g className="hex-sweat-gland">
        <path d="M220 350q35-50 70 0t70 0t70 0q-35 52-70 7t-70 0t-70-7Z" />
        <path d="M235 374q30-36 60 0t60 0t55 0" />
      </g>
      <path className="hex-sweat-pore" d="M287 102Q296 90 305 102" />
      <path className="hex-sweat-drop" d="M296 52q-16 23 0 39q16-16 0-39Z" />

      <path className="hex-blood-vessel artery" d="M520 338Q635 293 735 330T860 332" />
      <path className="hex-blood-vessel vein" d="M505 360Q620 410 735 365T865 370" />
      <path className="hex-capillary-loop" d="M670 330Q655 270 700 246Q743 228 760 277Q774 314 744 338" />

      <path className="hex-sensory-nerve" d="M410 445Q420 385 448 340Q472 305 470 245" />
      <circle className="hex-sensory-ending" cx="470" cy="235" r="12" />

      <text className="hex-label" x="115" y="135">epidermis</text>
      <text className="hex-label" x="115" y="250">dermis</text>
      <text className="hex-label" x="115" y="445">subcutaneous fat</text>

      <text className="hex-small" x="210" y="385">sweat gland</text>
      <text className="hex-small" x="310" y="120">sweat duct</text>
      <text className="hex-small" x="445" y="205">sebaceous gland</text>
      <text className="hex-small" x="500" y="330">arrector pili muscle</text>
      <text className="hex-small" x="620" y="205">hair follicle</text>
      <text className="hex-small" x="700" y="305">surface capillaries</text>
      <text className="hex-small" x="420" y="470">sensory nerve</text>

      <text className="hex-process" x="500" y="520" textAnchor="middle">
        Sweat reaches the surface through a duct; evaporation removes heat from the body
      </text>
    </svg></ReviewedScienceDiagram>
  );
}

function LungsScene() {
  return (
    <ReviewedScienceDiagram site="HumanExcretionMechanismsExplorer.jsx:206"><svg viewBox="0 0 980 520" role="img" aria-label="Lung alveolus showing carbon dioxide and water vapour leaving blood">
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
    </svg></ReviewedScienceDiagram>
  );
}

function DialysisScene() {
  return (
    <ReviewedScienceDiagram site="HumanExcretionMechanismsExplorer.jsx:225"><svg viewBox="0 0 980 520" role="img" aria-label="Dialysis showing blood and dialysis fluid separated by a partially permeable membrane">
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
    </svg></ReviewedScienceDiagram>
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
