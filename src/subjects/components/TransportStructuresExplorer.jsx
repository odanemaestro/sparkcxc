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
  const redCells=[
    [120,132,-12,1],[205,215,22,.9],[296,118,15,1.05],[390,205,-28,.92],
    [480,115,38,.88],[585,220,10,1.05],[685,128,-18,.95],[775,230,26,.9],
    [155,320,18,.86],[330,332,-20,1.0],[515,325,30,.9],[720,335,-8,1.02],
  ];
  const platelets=[[255,295,0],[440,280,30],[625,300,-18],[815,142,20],[85,260,-25]];

  return (
    <div className="spark-transport-structures-blood-layout">
      <div className="spark-transport-structures-stage">
        <svg viewBox="0 0 900 500" role="img" aria-label="Blood flowing inside a vessel showing plasma, red blood cells, white blood cells and platelets">
          <defs>
            <linearGradient id="ts-plasma-gradient" x1="0" x2="1">
              <stop offset="0%" stopColor="#f8e4b9" />
              <stop offset="55%" stopColor="#f3d89e" />
              <stop offset="100%" stopColor="#edc77c" />
            </linearGradient>
          </defs>

          <path className="ts-vessel-cutaway outer" d="M36 94Q115 42 235 60L835 60Q870 60 870 95V405Q870 440 835 440H238Q120 458 36 405Q70 330 70 250Q70 170 36 94Z" />
          <path className="ts-vessel-cutaway inner" d="M63 107Q130 70 235 82H838Q848 82 848 96V404Q848 418 838 418H235Q135 430 63 393Q92 324 92 250Q92 176 63 107Z" />
          <path className={selected==="plasma"?"ts-plasma-field ts-focus-field":"ts-plasma-field"} d="M92 119Q145 93 236 99H831V401H236Q150 410 92 381Q112 318 112 250Q112 182 92 119Z" />

          <g className={selected === "redCell" ? "ts-focus ts-rbc-group" : "ts-rbc-group"}>
            {redCells.map(([x,y,angle,scale],index)=>(
              <g key={index} transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
                <ellipse className="ts-rbc-shadow" cx="4" cy="6" rx="47" ry="29" />
                <ellipse className="ts-rbc" cx="0" cy="0" rx="48" ry="30" />
                <ellipse className="ts-rbc-centre" cx="0" cy="0" rx="24" ry="11" />
                <path className="ts-rbc-highlight" d="M-31-9Q-10-22 15-15" />
              </g>
            ))}
          </g>

          <g className={selected === "phagocyte" ? "ts-focus" : ""} transform="translate(400 135)">
            <circle className="ts-wbc halo" cx="0" cy="0" r="59" />
            <circle className="ts-wbc" cx="0" cy="0" r="52" />
            <path className="ts-phagocyte-nucleus" d="M-29-11q11-30 31-11q18-25 34 2q18 18-2 35q-17 16-31 2q-24 15-37-6q-9-13 5-22Z" />
            {[[-29,20],[-12,-31],[13,30],[31,-18],[29,12]].map(([x,y],i)=><circle key={i} className="ts-wbc-granule" cx={x} cy={y} r="4" />)}
          </g>

          <g className={selected === "lymphocyte" ? "ts-focus" : ""} transform="translate(620 340)">
            <circle className="ts-wbc halo" cx="0" cy="0" r="56" />
            <circle className="ts-wbc" cx="0" cy="0" r="49" />
            <circle className="ts-lymph-nucleus" cx="5" cy="3" r="36" />
            <path className="ts-lymph-rim" d="M-29 24Q-46 3-31-24" />
          </g>

          <g className={selected === "platelets" ? "ts-focus" : ""}>
            {platelets.map(([x,y,angle],i)=>(
              <g key={i} className="ts-platelet-cluster" transform={`translate(${x} ${y}) rotate(${angle})`}>
                <path className="ts-platelet" d="M0-10L6-4L15-6L11 2L17 9L7 8L2 16L-3 8L-13 11L-9 2L-15-4L-6-5Z" />
                <path className="ts-platelet-spike" d="M0-12V-19M13-7L19-12M15 9L23 12M-11 11L-17 17M-14-4L-22-8" />
              </g>
            ))}
          </g>

          <g className="ts-blood-labels">
            <text x="128" y="468">blood vessel wall</text>
            <path d="M205 455L115 409" />
            <text x="430" y="468">plasma is the liquid transport medium</text>
            <text x="708" y="468">formed elements are suspended in plasma</text>
          </g>
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
  const capillaryCells=[
    [447,183,-8],[494,162,12],[540,178,-18],[586,160,9],
    [455,244,14],[506,226,-9],[555,245,16],[602,225,-12],
    [450,306,-12],[498,290,11],[548,306,-8],[595,286,14],
  ];
  return (
    <div className="spark-transport-structures-vessels">
      <div className="spark-vessel-network-card">
        <svg viewBox="0 0 1040 460" role="img" aria-label="Blood vessel pathway from artery through arteriole and capillary bed to venule and vein">
          <defs>
            <linearGradient id="ts-artery-flow" x1="0" x2="1">
              <stop offset="0%" stopColor="#c94e57" />
              <stop offset="100%" stopColor="#e37a78" />
            </linearGradient>
            <linearGradient id="ts-vein-flow" x1="0" x2="1">
              <stop offset="0%" stopColor="#729fbd" />
              <stop offset="100%" stopColor="#4f7f9e" />
            </linearGradient>
          </defs>

          <g className="ts-network-vessel artery">
            <path className="wall outer" d="M55 95Q115 72 165 95V365Q115 388 55 365Z" />
            <path className="wall muscle" d="M76 109Q115 94 144 108V352Q115 368 76 351Z" />
            <path className="lumen" d="M94 119Q115 111 127 119V342Q115 350 94 341Z" />
            <path className="flow-arrow" d="M110 315V150" />
            <text className="ts-vessel-title" x="110" y="58" textAnchor="middle">Artery</text>
            <text className="ts-vessel-note" x="110" y="405" textAnchor="middle">from heart</text>
          </g>

          <path className="ts-arteriole-route" d="M165 230Q250 220 318 230" />
          <path className="ts-arteriole-route branch" d="M250 230Q294 165 365 150M250 230Q300 292 365 310" />
          <text className="ts-vessel-note" x="245" y="195" textAnchor="middle">arteriole</text>

          <g className="ts-capillary-network">
            {[0,1,2,3].map(row=>(
              <path key={row} d={`M355 ${145+row*55}Q445 ${110+row*58} 520 ${145+row*55}T685 ${145+row*55}`} />
            ))}
            <path d="M375 150Q420 205 380 255M430 130Q470 190 440 270M505 145Q540 205 510 315M580 140Q610 205 590 305M640 150Q665 215 650 290" />
          </g>

          <g className="ts-capillary-rbcs">
            {capillaryCells.map(([x,y,a],i)=>(
              <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
                <ellipse className="ts-mini-rbc" rx="16" ry="10" />
                <ellipse className="ts-mini-rbc-centre" rx="7" ry="3.5" />
              </g>
            ))}
          </g>

          <path className="ts-venule-route branch" d="M685 150Q754 172 790 228M685 310Q755 288 790 232" />
          <path className="ts-venule-route" d="M790 230Q840 230 870 230" />
          <text className="ts-vessel-note" x="785" y="195" textAnchor="middle">venule</text>

          <g className="ts-network-vessel vein">
            <path className="wall outer" d="M870 95Q930 72 990 95V365Q930 388 870 365Z" />
            <path className="lumen" d="M895 112Q930 98 965 112V348Q930 362 895 348Z" />
            <path className="ts-vessel-valve" d="M902 240Q930 214 958 240M902 220Q930 246 958 220" />
            <path className="flow-arrow" d="M930 315V150" />
            <text className="ts-vessel-title" x="930" y="58" textAnchor="middle">Vein</text>
            <text className="ts-vessel-note" x="930" y="405" textAnchor="middle">to heart</text>
          </g>

          <g className="ts-endothelium-callout">
            <path d="M520 82V128" />
            <text x="520" y="64" textAnchor="middle">capillary wall = one layer of endothelial cells</text>
          </g>
          <g className="ts-exchange-arrows">
            <path className="out" d="M500 338V395" />
            <path className="in" d="M560 395V338" />
            <text x="450" y="420">O₂ + nutrients to tissues</text>
            <text x="585" y="420">CO₂ + wastes to blood</text>
          </g>
        </svg>
      </div>

      <div className="spark-vessel-cross-sections">
        <article>
          <svg viewBox="0 0 260 240" role="img" aria-label="Artery cross-section with thick muscular elastic wall and narrow lumen">
            <circle className="ts-artery-wall outer" cx="130" cy="112" r="88" />
            <circle className="ts-artery-wall muscle" cx="130" cy="112" r="63" />
            <circle className="ts-lumen artery" cx="130" cy="112" r="31" />
            <text className="ts-vessel-title" x="130" y="224" textAnchor="middle">Artery</text>
          </svg>
          <b>Thick muscular, elastic wall</b><span>Relatively narrow lumen for high-pressure blood leaving the heart.</span>
        </article>

        <article>
          <svg viewBox="0 0 260 240" role="img" aria-label="Vein cross-section with thinner wall wide lumen and valve">
            <circle className="ts-vein-wall" cx="130" cy="112" r="80" />
            <circle className="ts-lumen vein" cx="130" cy="112" r="60" />
            <path className="ts-valve" d="M105 95Q130 118 155 95M105 129Q130 106 155 129" />
            <text className="ts-vessel-title" x="130" y="224" textAnchor="middle">Vein</text>
          </svg>
          <b>Thinner wall, wider lumen, valves</b><span>Returns blood at lower pressure and valves prevent backflow.</span>
        </article>

        <article>
          <svg viewBox="0 0 260 240" role="img" aria-label="Capillary cross-section one endothelial cell thick with a red blood cell close to the wall">
            <circle className="ts-capillary-wall" cx="130" cy="112" r="47" />
            <circle className="ts-lumen capillary" cx="130" cy="112" r="36" />
            <ellipse className="ts-mini-rbc" cx="130" cy="112" rx="26" ry="15" />
            <ellipse className="ts-mini-rbc-centre" cx="130" cy="112" rx="12" ry="5" />
            <text className="ts-vessel-title" x="130" y="224" textAnchor="middle">Capillary</text>
          </svg>
          <b>Wall one cell thick</b><span>Very short diffusion distance for exchange with body tissues.</span>
        </article>
      </div>

      <div className="spark-transport-structures-note-grid">
        <article><b>Arteries</b><span>Carry blood away from the heart at high pressure. Thick muscular and elastic walls withstand and smooth pressure changes.</span></article>
        <article><b>Veins</b><span>Return blood to the heart at lower pressure. Their wider lumen reduces resistance and valves reduce backflow.</span></article>
        <article><b>Capillaries</b><span>Form branching exchange networks near cells. Their one-cell-thick endothelium gives a short diffusion distance.</span></article>
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
