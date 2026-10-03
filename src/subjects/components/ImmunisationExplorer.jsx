import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./immunisationExplorer.css";

const VIEWS = {
  vaccine:{
    label:"Vaccination",
    title:"Vaccination creates active immune memory",
    note:"A vaccine safely presents an antigen, or instructions for producing an antigen, so lymphocytes form antibodies and memory cells without the person first developing the target disease.",
  },
  response:{
    label:"Immune response",
    title:"Memory cells make later responses faster",
    note:"The first exposure produces a slower primary response. Memory cells remain. A later exposure to the same antigen produces a faster, stronger secondary response.",
  },
  types:{
    label:"Types of immunity",
    title:"Active immunity makes memory cells, passive immunity receives antibodies",
    note:"Active immunity develops when the person's immune system responds to an antigen. Passive immunity provides ready-made antibodies and is usually shorter-lived because memory cells are not formed.",
  },
  defence:{
    label:"White blood cells",
    title:"Phagocytes and lymphocytes use different defence mechanisms",
    note:"Phagocytes engulf pathogens. Lymphocytes produce specific antibodies and memory cells. Antibodies can help mark or clump pathogens, making removal easier.",
  },
  community:{
    label:"Community protection",
    title:"High immunity levels reduce opportunities for transmission",
    note:"When many people are immune, a pathogen has fewer susceptible hosts through which to spread. This can indirectly protect people who are not immune.",
  },
};

function VaccineScene() {
  return (
    <ReviewedScienceDiagram site="ImmunisationExplorer.jsx:34"><svg viewBox="0 0 980 520" role="img" aria-label="Vaccination causing antibody and memory cell formation">
      <g transform="translate(55 80)">
        <rect className="imm-vaccine-vial" x="25" y="45" width="130" height="180" rx="18" />
        <rect className="imm-vial-cap" x="55" y="10" width="70" height="45" rx="8" />
        {[65,95,125].map((x,i)=><circle className="imm-antigen" key={x} cx={x} cy={105+i*32} r="10"/>)}
        <text className="imm-label" x="90" y="270" textAnchor="middle">vaccine antigen</text>
      </g>

      <path className="imm-arrow" d="M250 210H345" />

      <g transform="translate(365 90)">
        <circle className="imm-lymphocyte" cx="100" cy="115" r="75" />
        <path className="imm-antibody" d="M65 100V145m0-22L35 95m30 28l30-28M135 100V145m0-22l-30-28m30 28l30-28" />
        <text className="imm-label" x="100" y="235" textAnchor="middle">lymphocyte responds</text>
      </g>

      <path className="imm-arrow" d="M560 210H645" />

      <g transform="translate(670 60)">
        <circle className="imm-memory-cell" cx="95" cy="90" r="52" />
        <text className="imm-card-title" x="95" y="96" textAnchor="middle">memory</text>
        <text className="imm-card-title" x="95" y="116" textAnchor="middle">cell</text>
        <path className="imm-antibody free" d="M40 220V275m0-28L5 215m35 32l35-32M145 220V275m0-28l-35-32m35 32l35-32" />
        <text className="imm-label" x="95" y="330" textAnchor="middle">antibodies + memory</text>
      </g>
    </svg></ReviewedScienceDiagram>
  );
}

function ResponseScene() {
  return (
    <ReviewedScienceDiagram site="ImmunisationExplorer.jsx:65"><svg viewBox="0 0 980 520" role="img" aria-label="Primary and secondary antibody responses after first and later antigen exposure">
      <line className="imm-axis" x1="90" y1="410" x2="900" y2="410" />
      <line className="imm-axis" x1="90" y1="70" x2="90" y2="410" />
      <text className="imm-axis-label" x="500" y="470" textAnchor="middle">Time</text>
      <text className="imm-axis-label" x="30" y="240" textAnchor="middle" transform="rotate(-90 30 240)">Antibody level</text>

      <path className="imm-primary-line" d="M105 400Q180 395 220 350Q270 290 330 315Q380 345 425 380Q450 398 470 400" />
      <path className="imm-secondary-line" d="M520 400Q555 360 585 205Q620 80 705 105Q790 125 855 275Q885 345 900 390" />

      <line className="imm-exposure" x1="130" y1="95" x2="130" y2="410" />
      <line className="imm-exposure" x1="540" y1="95" x2="540" y2="410" />
      <text className="imm-small" x="130" y="80" textAnchor="middle">first exposure</text>
      <text className="imm-small" x="540" y="80" textAnchor="middle">later exposure</text>
      <text className="imm-label" x="300" y="250">primary response</text>
      <text className="imm-label" x="700" y="165">secondary response</text>
      <text className="imm-small" x="700" y="195">faster and stronger because memory cells remain</text>
    </svg></ReviewedScienceDiagram>
  );
}

function TypesScene() {
  const cells = [
    ["Natural active","Infection stimulates the person's own immune response and memory cells."],
    ["Artificial active","Vaccination stimulates the person's own immune response and memory cells."],
    ["Natural passive","Ready-made antibodies are received naturally, for example from mother to baby."],
    ["Artificial passive","Ready-made antibodies are given medically, for example antivenom or specific antibody treatment."],
  ];
  return (
    <div className="spark-immunity-types">
      {cells.map(([title,text],index)=>(
        <article className={index<2 ? "active" : "passive"} key={title}>
          <span>{index<2 ? "ACTIVE" : "PASSIVE"}</span>
          <b>{title}</b>
          <p>{text}</p>
          <strong>{index<2 ? "Memory cells form" : "No immune memory from the received antibodies"}</strong>
        </article>
      ))}
    </div>
  );
}

function DefenceScene() {
  return (
    <ReviewedScienceDiagram site="ImmunisationExplorer.jsx:108"><svg viewBox="0 0 980 520" role="img" aria-label="Phagocyte engulfing a pathogen and lymphocyte producing antibodies">
      <g transform="translate(70 75)">
        <circle className="imm-phagocyte" cx="170" cy="180" r="110" />
        <path className="imm-phagocyte-mouth" d="M235 130Q300 175 235 230Q205 205 215 180Q205 150 235 130Z" />
        <circle className="imm-pathogen" cx="310" cy="180" r="28" />
        <path className="imm-engulf-arrow" d="M345 180H390" />
        <text className="imm-label" x="190" y="340" textAnchor="middle">phagocyte engulfs and digests</text>
      </g>

      <g transform="translate(555 75)">
        <circle className="imm-lymphocyte" cx="130" cy="180" r="95" />
        <path className="imm-antibody" d="M80 155V215m0-30L45 150m35 35l35-35M180 155V215m0-30l-35-35m35 35l35-35" />
        <path className="imm-antibody free" d="M295 120V175m0-28l-30-28m30 28l30-28M330 230V285m0-28l-30-28m30 28l30-28" />
        <text className="imm-label" x="165" y="340" textAnchor="middle">lymphocyte makes specific antibodies</text>
      </g>
    </svg></ReviewedScienceDiagram>
  );
}

function CommunityScene() {
  const nodes=[];
  for(let row=0;row<4;row+=1){
    for(let col=0;col<7;col+=1){
      const index=row*7+col;
      const susceptible=[5,17,26].includes(index);
      nodes.push({x:115+col*120,y:105+row*95,susceptible,index});
    }
  }
  return (
    <ReviewedScienceDiagram site="ImmunisationExplorer.jsx:137"><svg viewBox="0 0 980 520" role="img" aria-label="Community immunity reducing paths for pathogen transmission">
      {nodes.map(node=>(
        <g key={node.index}>
          <circle className={node.susceptible ? "imm-person susceptible" : "imm-person immune"} cx={node.x} cy={node.y} r="28" />
          {!node.susceptible && <path className="imm-shield-tick" d={"M"+(node.x-12)+" "+node.y+"l9 11l18-22"} />}
        </g>
      ))}
      <path className="imm-pathogen-route" d="M65 105H80M840 105H900M65 295H80M840 390H900" />
      <text className="imm-label" x="490" y="480" textAnchor="middle">fewer susceptible hosts make sustained spread more difficult</text>
    </svg></ReviewedScienceDiagram>
  );
}

export default function ImmunisationExplorer() {
  const [view,setView] = useState("vaccine");
  const info = VIEWS[view];

  return (
    <section className="spark-immunisation">
      <header>
        <span>IMMUNITY AND IMMUNISATION</span>
        <h3>Antigens, antibodies and memory</h3>
        <p>Follow how immune cells respond to antigens and why vaccination prepares the body for later exposure.</p>
      </header>

      <div className="spark-immunisation-tabs">
        {Object.entries(VIEWS).map(([key,item])=>(
          <button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className={view==="types" ? "spark-immunisation-stage types" : "spark-immunisation-stage"}>
        {view==="vaccine" && <VaccineScene />}
        {view==="response" && <ResponseScene />}
        {view==="types" && <TypesScene />}
        {view==="defence" && <DefenceScene />}
        {view==="community" && <CommunityScene />}
      </div>

      <div className="spark-immunisation-summary">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>
    </section>
  );
}
