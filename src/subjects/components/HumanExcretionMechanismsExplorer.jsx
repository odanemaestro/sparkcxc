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
  const [focus,setFocus] = useState("anatomy");
  const notes = {
    anatomy:{
      title:"Kidney structure",
      text:"Use the reference plate to locate the renal cortex, medulla, renal artery, renal vein and ureter before tracing a single nephron.",
    },
    filtration:{
      title:"Ultrafiltration",
      text:"At the renal corpuscle, the glomerulus lies inside Bowman’s capsule. Water and small dissolved substances enter the filtrate while cells and large proteins remain in the blood.",
    },
    reabsorption:{
      title:"Selective reabsorption",
      text:"As filtrate passes along the nephron tubules and loop of Henle, useful substances and much of the water return to the blood.",
    },
    urine:{
      title:"Urine formation",
      text:"Urea together with excess water and mineral salts remains in the tubule fluid and passes towards collecting ducts and the ureter.",
    },
  };
  const note=notes[focus];
  return (
    <div className="hex-reference-scene">
      <figure className="hex-reference-figure kidney-nephron">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/KidneyAndNephron-v4_Antares42.svg"
          alt="Scientific reference diagram showing a kidney cross-section and nephron, including cortex, medulla, renal vessels, ureter, glomerulus, Bowman's capsule and nephron tubules"
          loading="lazy"
        />
        <figcaption>
          <span>Kidney and nephron reference</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:KidneyAndNephron-v4_Antares42.svg" target="_blank" rel="noreferrer">Antares42</a>
            {" · "}CC BY-SA 3.0
          </small>
        </figcaption>
      </figure>

      <div className="hex-reference-focus">
        <span>Explore the process</span>
        <div>
          {Object.entries(notes).map(([key,item])=>(
            <button type="button" key={key} className={focus===key?"active":""} onClick={()=>setFocus(key)}>
              {item.title}
            </button>
          ))}
        </div>
        <article role="status">
          <strong>{note.title}</strong>
          <p>{note.text}</p>
        </article>
      </div>
    </div>
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
  const [feature,setFeature] = useState("sweat");
  const features = {
    sweat:["Sweat gland","Sweat glands in the dermis release water, mineral salts and a small amount of urea through ducts to the skin surface."],
    layers:["Skin layers","The epidermis forms the outer layer, the dermis contains glands, vessels and receptors, and the deeper region contains subcutaneous fat."],
    cooling:["Evaporative cooling","When sweat evaporates from the skin surface, latent heat is removed from the body and the skin cools."],
    hair:["Hair follicle","Hair follicles extend through the dermis and are associated with surrounding glands and supporting tissues."],
  };
  const selected=features[feature];
  return (
    <div className="hex-reference-scene">
      <figure className="hex-reference-figure skin-reference">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Skin_Cross-Section_%28NIH_BioArt_677%29.png"
          alt="Public-domain NIH cross-section of human skin showing epidermis, dermis, fat, sweat glands and hair follicles"
          loading="lazy"
        />
        <figcaption>
          <span>Human skin cross-section</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:Skin_Cross-Section_(NIH_BioArt_677).png" target="_blank" rel="noreferrer">NIH NIAID BioArt, Ryan Kissinger</a>
            {" · "}Public domain
          </small>
        </figcaption>
      </figure>

      <div className="hex-reference-focus">
        <span>Tap a structure or process</span>
        <div>
          {Object.entries(features).map(([key,[title]])=>(
            <button type="button" key={key} className={feature===key?"active":""} onClick={()=>setFeature(key)}>
              {title}
            </button>
          ))}
        </div>
        <article role="status">
          <strong>{selected[0]}</strong>
          <p>{selected[1]}</p>
        </article>
      </div>
    </div>
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
