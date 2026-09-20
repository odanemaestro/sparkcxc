import React, { useState } from "react";
import "./microbeExplorer.css";

const VIEWS = {
  compare:{
    label:"Compare microbes",
    title:"Viruses, bacteria and fungi differ in structure and reproduction",
    note:"Bacteria are single-celled organisms. Fungi include yeasts and moulds. Viruses are not cells and reproduce only inside living host cells.",
  },
  useful:{
    label:"Useful roles",
    title:"Microorganisms support food production and nutrient cycling",
    note:"Selected bacteria ferment milk to make yoghurt, nitrogen-fixing bacteria help legumes obtain usable nitrogen compounds, and decomposer bacteria and fungi recycle nutrients.",
  },
  harmful:{
    label:"Harmful roles",
    title:"Some microbes cause disease or spoil food",
    note:"Viruses cause illnesses such as influenza. Bacteria cause diseases including tuberculosis. Fungi cause infections such as ringworm and athlete's foot and can also spoil food.",
  },
  antibiotics:{
    label:"Antibiotics",
    title:"Antibiotics act on bacteria, not viruses",
    note:"Penicillin was originally obtained from the mould Penicillium. Antibiotics target bacterial structures or processes and do not treat viral infections such as influenza.",
  },
};

function CompareScene() {
  return (
    <div className="spark-microbe-cards">
      <article>
        <div className="spark-microbe-visual bacteria" aria-label="Simplified bacterium">
          <svg viewBox="0 0 250 180">
            <rect x="45" y="45" width="145" height="85" rx="42" />
            <path d="M190 85q45-35 45 10q0 35-35 25" />
            {[75,110,145].map(x=><circle key={x} cx={x} cy="85" r="6" />)}
            <path className="microbe-dna" d="M75 105q35-35 70 0q20 18 38-2" />
          </svg>
        </div>
        <b>Bacterium</b>
        <span>Single cell. Many are harmless or useful. Some cause disease.</span>
      </article>
      <article>
        <div className="spark-microbe-visual virus" aria-label="Simplified virus particle">
          <svg viewBox="0 0 250 180">
            <circle cx="125" cy="90" r="52" />
            {[0,45,90,135,180,225,270,315].map(angle=>{
              const r=75,rad=angle*Math.PI/180;
              const x1=125+Math.cos(rad)*52,y1=90+Math.sin(rad)*52;
              const x2=125+Math.cos(rad)*r,y2=90+Math.sin(rad)*r;
              return <g key={angle}><line x1={x1} y1={y1} x2={x2} y2={y2}/><circle cx={x2} cy={y2} r="7"/></g>;
            })}
            <path className="microbe-genetic" d="M90 88q18-30 36 0t36 0" />
          </svg>
        </div>
        <b>Virus</b>
        <span>Not a cell. Reproduces only inside a living host cell.</span>
      </article>
      <article>
        <div className="spark-microbe-visual fungus" aria-label="Simplified mould fungus">
          <svg viewBox="0 0 250 180">
            <path d="M40 140Q80 110 115 140T205 138" />
            <path d="M85 140V65M135 140V45M180 138V75" />
            <circle cx="85" cy="58" r="25" />
            <circle cx="135" cy="38" r="25" />
            <circle cx="180" cy="68" r="25" />
            {[70,82,94,120,135,150,165,180,195].map((x,i)=><circle className="microbe-spore" key={i} cx={x} cy={25+(i%3)*13} r="5"/>)}
          </svg>
        </div>
        <b>Fungus</b>
        <span>Includes yeasts and moulds. Many decompose organic material.</span>
      </article>
    </div>
  );
}

function UsefulScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Useful roles of microbes in yoghurt production nitrogen fixation and decomposition">
      <g transform="translate(60 80)">
        <rect className="microbe-food-cup" x="10" y="80" width="210" height="210" rx="25" />
        <path className="microbe-milk" d="M35 135Q115 115 195 135V260H35Z" />
        {[70,110,150,180].map((x,i)=><circle className="microbe-bacteria-dot" key={x} cx={x} cy={170+(i%2)*42} r="9"/>)}
        <text className="microbe-label" x="115" y="330" textAnchor="middle">bacteria make yoghurt</text>
      </g>

      <g transform="translate(360 55)">
        <path className="microbe-plant" d="M130 320V95m0 90q-75-50-105 0q60 50 105 25m0-55q80-55 118-5q-68 55-118 28" />
        <path className="microbe-roots" d="M130 315Q75 360 55 420M130 315Q150 370 185 420M130 330Q100 375 100 430M130 330Q195 360 220 410" />
        {[75,102,160,190].map((x,i)=><circle className="microbe-nodule" key={x} cx={x} cy={390+(i%2)*25} r="13"/>)}
        <text className="microbe-label" x="130" y="465" textAnchor="middle">root-nodule bacteria fix nitrogen</text>
      </g>

      <g transform="translate(660 70)">
        <path className="microbe-leaf-dead" d="M45 170Q120 95 220 165Q190 270 75 265Q35 230 45 170Z" />
        <path className="microbe-leaf-vein" d="M70 245Q120 205 190 145" />
        {[80,120,165,205].map((x,i)=><circle className="microbe-decomposer-dot" key={x} cx={x} cy={300+(i%2)*30} r="10"/>)}
        <path className="microbe-down-arrow" d="M130 275V365" />
        <rect className="microbe-soil" x="25" y="370" width="230" height="65" rx="12" />
        <text className="microbe-label" x="140" y="470" textAnchor="middle">decomposers recycle minerals</text>
      </g>
    </svg>
  );
}

function HarmfulScene() {
  return (
    <div className="spark-microbe-harm-grid">
      <article><b>Virus</b><span>Influenza and the common cold are viral infections.</span></article>
      <article><b>Bacterium</b><span>Tuberculosis is caused by a bacterium.</span></article>
      <article><b>Fungus</b><span>Ringworm and athlete's foot are fungal infections.</span></article>
      <article><b>Food spoilage</b><span>Bacteria and fungi can multiply in food and cause spoilage. Some microorganisms can also cause food-borne illness.</span></article>
    </div>
  );
}

function AntibioticScene() {
  return (
    <svg viewBox="0 0 980 500" role="img" aria-label="Penicillium mould and comparison of antibiotic action on bacteria and viruses">
      <g transform="translate(70 55)">
        <path className="microbe-mould-stem" d="M130 320V115M85 320V150M175 320V145" />
        <circle className="microbe-mould-head" cx="130" cy="100" r="38" />
        <circle className="microbe-mould-head" cx="85" cy="138" r="32" />
        <circle className="microbe-mould-head" cx="175" cy="133" r="32" />
        <text className="microbe-label" x="130" y="385" textAnchor="middle">Penicillium mould</text>
        <text className="microbe-small" x="130" y="415" textAnchor="middle">historical source of penicillin</text>
      </g>
      <path className="microbe-process-arrow" d="M310 235H415" />

      <g transform="translate(455 75)">
        <rect className="microbe-antibiotic-card works" x="0" y="0" width="200" height="300" rx="18" />
        <rect className="microbe-mini-bacterium" x="50" y="75" width="100" height="55" rx="28" />
        <path className="microbe-cross" d="M40 155L160 255M160 155L40 255" />
        <text className="microbe-card-title" x="100" y="40" textAnchor="middle">Bacteria</text>
        <text className="microbe-small" x="100" y="280" textAnchor="middle">antibiotics may work</text>
      </g>

      <g transform="translate(700 75)">
        <rect className="microbe-antibiotic-card no" x="0" y="0" width="200" height="300" rx="18" />
        <circle className="microbe-mini-virus" cx="100" cy="115" r="45" />
        <path className="microbe-no-symbol" d="M45 165L155 255M155 165L45 255" />
        <text className="microbe-card-title" x="100" y="40" textAnchor="middle">Viruses</text>
        <text className="microbe-small" x="100" y="280" textAnchor="middle">antibiotics do not work</text>
      </g>
    </svg>
  );
}

export default function MicrobeExplorer() {
  const [view,setView] = useState("compare");
  const info = VIEWS[view];

  return (
    <section className="spark-microbe-explorer">
      <header>
        <span>SELECTED MICROBES</span>
        <h3>Small organisms, different roles</h3>
        <p>Compare viruses, bacteria and fungi, then connect each group to useful activities and harmful effects.</p>
      </header>

      <div className="spark-microbe-tabs">
        {Object.entries(VIEWS).map(([key,item])=>(
          <button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className={view==="compare"||view==="harmful" ? "spark-microbe-stage cards" : "spark-microbe-stage"}>
        {view==="compare" && <CompareScene />}
        {view==="useful" && <UsefulScene />}
        {view==="harmful" && <HarmfulScene />}
        {view==="antibiotics" && <AntibioticScene />}
      </div>

      <div className="spark-microbe-summary">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>
    </section>
  );
}
