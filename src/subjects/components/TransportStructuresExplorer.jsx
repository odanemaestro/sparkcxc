import React, { useMemo, useState } from "react";
import "./transportStructuresExplorer.css";

const BLOOD_COMPONENTS = {
  redCell:{
    title:"Red blood cell",
    role:"Transports oxygen",
    adaptation:"Contains haemoglobin, has no nucleus when mature, and has a biconcave shape that gives a large surface area for gas exchange.",
  },
  phagocyte:{
    title:"Phagocyte",
    role:"Engulfs and digests pathogens",
    adaptation:"Has a flexible shape and a lobed or irregular nucleus, allowing it to move out of capillaries and surround microbes.",
  },
  lymphocyte:{
    title:"Lymphocyte",
    role:"Produces specific antibodies and forms memory cells",
    adaptation:"Has a large nucleus and specialised receptors that recognise particular antigens.",
  },
  platelets:{
    title:"Platelets",
    role:"Start blood clotting",
    adaptation:"Small cell fragments release factors that help form a clot and reduce blood loss at a wound.",
  },
  plasma:{
    title:"Plasma",
    role:"Liquid transport medium",
    adaptation:"Mostly water. Carries dissolved glucose, amino acids, hormones, urea, mineral ions, carbon dioxide, heat and plasma proteins.",
  },
};

const HEART_PHASES = {
  diastole:{
    title:"Diastole",
    note:"The heart muscle relaxes and the chambers fill. Atrioventricular valves are open so blood can move from atria to ventricles.",
  },
  atrial:{
    title:"Atrial systole",
    note:"The atria contract and push the remaining blood into the ventricles.",
  },
  ventricular:{
    title:"Ventricular systole",
    note:"The ventricles contract. The tricuspid and bicuspid valves close to prevent backflow, while blood is forced into the pulmonary artery and aorta.",
  },
};

function BloodScene({selected}) {
  return (
    <div className="spark-transport-structures-blood-layout">
      <div className="spark-transport-structures-stage">
        <svg viewBox="0 0 900 480" role="img" aria-label="Major blood components">
          <rect className="ts-plasma-field" x="40" y="45" width="820" height="375" rx="28" />
          {[120,240,370,520,675,790].map((x,index) => (
            <g key={x} className={selected === "redCell" ? "ts-focus" : ""}>
              <ellipse className="ts-rbc" cx={x} cy={150 + (index%2)*155} rx="58" ry="35" />
              <ellipse className="ts-rbc-centre" cx={x} cy={150 + (index%2)*155} rx="29" ry="13" />
            </g>
          ))}
          <g className={selected === "phagocyte" ? "ts-focus" : ""} transform="translate(300 290)">
            <circle className="ts-wbc" cx="0" cy="0" r="58" />
            <path className="ts-phagocyte-nucleus" d="M-28-10q12-30 33-10q22-25 35 6q18 22-6 38q-20 15-35-4q-25 15-38-7q-8-13 11-23Z" />
          </g>
          <g className={selected === "lymphocyte" ? "ts-focus" : ""} transform="translate(575 225)">
            <circle className="ts-wbc" cx="0" cy="0" r="53" />
            <circle className="ts-lymph-nucleus" cx="4" cy="2" r="38" />
          </g>
          <g className={selected === "platelets" ? "ts-focus" : ""}>
            {[[170,365],[210,385],[470,120],[730,350],[760,105]].map(([x,y],i)=><path key={i} className="ts-platelet" d={"M"+x+" "+y+"l12-8l9 12l-12 11Z"} />)}
          </g>
          <text className="ts-label" x="450" y="458" textAnchor="middle">plasma surrounds and transports the blood cells and dissolved substances</text>
        </svg>
      </div>
      <aside>
        <span>Selected component</span>
        <strong>{BLOOD_COMPONENTS[selected].title}</strong>
        <div><b>Function</b><p>{BLOOD_COMPONENTS[selected].role}</p></div>
        <div><b>Structure linked to function</b><p>{BLOOD_COMPONENTS[selected].adaptation}</p></div>
      </aside>
    </div>
  );
}

function VesselScene() {
  return (
    <div className="spark-transport-structures-vessels">
      <svg viewBox="0 0 930 470" role="img" aria-label="Comparison of artery, vein and capillary cross-sections">
        <g transform="translate(175 215)">
          <circle className="ts-artery-wall outer" r="118" />
          <circle className="ts-artery-wall muscle" r="88" />
          <circle className="ts-lumen artery" r="42" />
          <text className="ts-vessel-title" x="0" y="-145" textAnchor="middle">Artery</text>
          <text className="ts-vessel-note" x="0" y="160" textAnchor="middle">thick muscular, elastic wall</text>
          <text className="ts-vessel-note" x="0" y="182" textAnchor="middle">relatively narrow lumen</text>
        </g>
        <g transform="translate(465 215)">
          <circle className="ts-vein-wall" r="108" />
          <circle className="ts-lumen vein" r="78" />
          <path className="ts-valve" d="M-25-22Q0 4 25-22M-25 22Q0-4 25 22" />
          <text className="ts-vessel-title" x="0" y="-145" textAnchor="middle">Vein</text>
          <text className="ts-vessel-note" x="0" y="160" textAnchor="middle">thinner wall, wide lumen</text>
          <text className="ts-vessel-note" x="0" y="182" textAnchor="middle">valves prevent backflow</text>
        </g>
        <g transform="translate(760 215)">
          <circle className="ts-capillary-wall" r="48" />
          <circle className="ts-lumen capillary" r="34" />
          <text className="ts-vessel-title" x="0" y="-145" textAnchor="middle">Capillary</text>
          <text className="ts-vessel-note" x="0" y="160" textAnchor="middle">wall one cell thick</text>
          <text className="ts-vessel-note" x="0" y="182" textAnchor="middle">short exchange distance</text>
        </g>
      </svg>
      <div className="spark-transport-structures-note-grid">
        <article><b>Arteries</b><span>Carry blood away from the heart at high pressure. Thick muscular and elastic walls withstand and smooth pressure changes.</span></article>
        <article><b>Veins</b><span>Return blood to the heart at lower pressure. Their wider lumen reduces resistance and valves reduce backflow.</span></article>
        <article><b>Capillaries</b><span>Form exchange networks near cells. Their one-cell-thick walls give a short diffusion distance.</span></article>
      </div>
    </div>
  );
}

function CirculationScene({phase}) {
  const phaseInfo = HEART_PHASES[phase];
  return (
    <div className="spark-transport-structures-circulation">
      <div className="spark-transport-structures-stage">
        <svg viewBox="0 0 900 540" role="img" aria-label={"Double circulation and " + phaseInfo.title}>
          <g className="ts-lungs" transform="translate(450 58)">
            <ellipse cx="-62" cy="0" rx="48" ry="66" />
            <ellipse cx="62" cy="0" rx="48" ry="66" />
            <path className="ts-lung-trachea" d="M0-68V-18M0-18L-42 12M0-18L42 12" />
          </g>

          <g className="ts-anatomical-heart" transform="translate(285 100) scale(.62)">
            <path className="ts-heart-outline" d="M329 150Q370 112 430 130Q475 143 501 178Q525 136 584 127Q648 118 691 165Q731 210 713 300Q694 399 628 473Q574 532 500 566Q423 530 365 474Q297 408 282 316Q264 218 329 150Z" />

            <path className="ts-heart-ra" d="M330 175Q385 142 451 185L452 287Q401 319 345 291Q315 250 330 175Z" />
            <path className="ts-heart-rv" d="M342 315Q399 284 458 313Q472 363 476 448Q435 445 387 409Q350 381 342 315Z" />
            <path className="ts-heart-la" d="M544 184Q598 147 657 177Q684 214 664 278Q611 307 548 286Z" />
            <path className="ts-heart-lv" d="M535 314Q595 281 653 316Q668 367 638 425Q600 493 515 532L503 487Q538 445 551 387Q560 345 535 314Z" />
            <path className="ts-heart-septum" d="M500 203Q489 303 503 492" />

            <path className="ts-heart-vessel blue" d="M365 188V62M364 286Q315 352 318 515" />
            <path className="ts-heart-vessel red" d="M596 183V105Q596 54 646 43Q702 31 733 75Q749 98 741 149" />
            <path className="ts-heart-vessel blue pa" d="M431 315Q445 238 482 206Q508 184 536 159Q567 129 605 128" />
            <path className="ts-heart-vessel red pv" d="M657 222H790M548 235H233" />

            <path className="ts-heart-valve" d="M385 304Q406 317 420 338Q433 317 451 304M548 303Q570 318 589 337Q608 318 635 303" />

            {phase === "ventricular" && (
              <g className="ts-heart-phase ventricular">
                <path d="M335 350H375M665 350H625" />
                <path d="M410 440Q445 414 470 378M595 445Q570 414 553 378" />
              </g>
            )}
            {phase === "atrial" && (
              <g className="ts-heart-phase atrial">
                <path d="M337 232H380M663 232H620" />
              </g>
            )}
            {phase === "diastole" && (
              <g className="ts-heart-phase diastole">
                <path d="M405 190V260M595 190V260" />
              </g>
            )}
          </g>

          <g className="ts-body-box" transform="translate(450 500)">
            <rect x="-155" y="-34" width="310" height="58" rx="18" />
            <text x="0" y="4" textAnchor="middle">BODY TISSUES</text>
          </g>

          <path className="ts-flow blue" d="M377 282Q232 198 350 98" />
          <path className="ts-flow red" d="M550 98Q682 194 526 282" />
          <path className="ts-flow red" d="M538 355Q676 410 560 466" />
          <path className="ts-flow blue" d="M336 466Q224 408 376 355" />

          <text className="ts-flow-label blue" x="218" y="177">pulmonary artery</text>
          <text className="ts-flow-label red" x="630" y="177">pulmonary vein</text>
          <text className="ts-flow-label red" x="640" y="423">aorta</text>
          <text className="ts-flow-label blue" x="211" y="423">vena cava</text>

          <text className="ts-phase-label" x="450" y="388" textAnchor="middle">
            {phaseInfo.title}
          </text>
        </svg>
      </div>
      <aside>
        <span>Heartbeat phase</span>
        <strong>{phaseInfo.title}</strong>
        <p>{phaseInfo.note}</p>
        <div className="spark-transport-flow-route">
          <b>Body to lungs</b>
          <span>Vena cava → right atrium → right ventricle → pulmonary artery → lungs</span>
          <b>Lungs to body</b>
          <span>Pulmonary vein → left atrium → left ventricle → aorta → body</span>
        </div>
      </aside>
    </div>
  );
}

function PlantTransportScene() {
  return (
    <div className="spark-transport-structures-plants">
      <div className="spark-transport-structures-stage">
        <svg viewBox="0 0 900 500" role="img" aria-label="Comparison of xylem and phloem transport in a flowering plant">
          <g transform="translate(255 55)">
            <rect className="ts-xylem-tube" x="0" y="0" width="150" height="330" rx="16" />
            {[55,110,165,220,275].map(y=><line key={y} className="ts-xylem-ring" x1="5" y1={y} x2="145" y2={y} />)}
            <path className="ts-xylem-arrow" d="M75 295V55" />
            <text className="ts-vessel-title" x="75" y="375" textAnchor="middle">Xylem</text>
            <text className="ts-vessel-note" x="75" y="402" textAnchor="middle">water + mineral ions</text>
            <text className="ts-vessel-note" x="75" y="425" textAnchor="middle">mainly upward</text>
          </g>
          <g transform="translate(520 55)">
            <rect className="ts-phloem-tube" x="0" y="0" width="150" height="330" rx="16" />
            {[65,130,195,260].map(y=><line key={y} className="ts-sieve-plate" x1="5" y1={y} x2="145" y2={y} />)}
            <rect className="ts-companion-cell" x="155" y="25" width="48" height="280" rx="14" />
            <path className="ts-phloem-arrow up" d="M55 285V70" />
            <path className="ts-phloem-arrow down" d="M100 75V290" />
            <text className="ts-vessel-title" x="75" y="375" textAnchor="middle">Phloem</text>
            <text className="ts-vessel-note" x="75" y="402" textAnchor="middle">sucrose + dissolved food</text>
            <text className="ts-vessel-note" x="75" y="425" textAnchor="middle">moves to sources and sinks</text>
          </g>
          <text className="ts-label" x="450" y="475" textAnchor="middle">xylem vessels are hollow and lignified; phloem has living sieve tubes with companion cells</text>
        </svg>
      </div>
      <div className="spark-transport-structures-ringing">
        <strong>Why ringing can kill a tree</strong>
        <span>Phloem lies near the inner bark. Removing a complete ring of bark removes or damages the phloem, so sugars made in the leaves cannot move to the roots. The roots eventually starve, water uptake fails and the tree may die.</span>
      </div>
    </div>
  );
}

export default function TransportStructuresExplorer() {
  const [view,setView] = useState("blood");
  const [blood,setBlood] = useState("redCell");
  const [phase,setPhase] = useState("diastole");

  const bloodInfo = useMemo(() => BLOOD_COMPONENTS[blood],[blood]);

  return (
    <section className="spark-transport-structures">
      <header>
        <span>TRANSPORT STRUCTURES</span>
        <h3>Match each structure to the job it performs</h3>
        <p>Compare blood components, blood vessels, double circulation and the xylem and phloem of flowering plants.</p>
      </header>

      <div className="spark-transport-structures-tabs">
        <button type="button" className={view==="blood"?"active":""} onClick={()=>setView("blood")}>Blood components</button>
        <button type="button" className={view==="vessels"?"active":""} onClick={()=>setView("vessels")}>Blood vessels</button>
        <button type="button" className={view==="circulation"?"active":""} onClick={()=>setView("circulation")}>Heart and circulation</button>
        <button type="button" className={view==="plants"?"active":""} onClick={()=>setView("plants")}>Xylem and phloem</button>
      </div>

      {view === "blood" && (
        <>
          <div className="spark-transport-structures-choice">
            {Object.entries(BLOOD_COMPONENTS).map(([key,item]) => (
              <button type="button" key={key} className={blood===key?"active":""} onClick={()=>setBlood(key)}>{item.title}</button>
            ))}
          </div>
          <BloodScene selected={blood} />
          <div className="spark-transport-structures-selected">
            <strong>{bloodInfo.title}</strong>
            <span>{bloodInfo.role}</span>
          </div>
        </>
      )}

      {view === "vessels" && <VesselScene />}

      {view === "circulation" && (
        <>
          <div className="spark-transport-structures-choice">
            {Object.entries(HEART_PHASES).map(([key,item]) => (
              <button type="button" key={key} className={phase===key?"active":""} onClick={()=>setPhase(key)}>{item.title}</button>
            ))}
          </div>
          <CirculationScene phase={phase} />
        </>
      )}

      {view === "plants" && <PlantTransportScene />}
    </section>
  );
}
