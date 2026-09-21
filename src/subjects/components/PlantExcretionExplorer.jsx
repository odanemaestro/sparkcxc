import React, { useState } from "react";
import "./plantExcretionExplorer.css";

const VIEWS = {
  gases:{
    label:"Gas exchange",
    title:"Stomata release gaseous wastes",
    note:"Excess oxygen from photosynthesis, carbon dioxide from respiration and water vapour can diffuse through stomata.",
  },
  daynight:{
    label:"Day and night",
    title:"Which gas is released depends on the balance of processes",
    note:"In bright light, photosynthesis usually exceeds respiration so oxygen is a major gaseous output. At night photosynthesis stops while respiration continues, so carbon dioxide is released.",
  },
  storage:{
    label:"Stored wastes",
    title:"Leaves and bark can store wastes",
    note:"Some plants store wastes such as tannins and other compounds in leaves or bark. Shedding these tissues removes the stored material.",
  },
};

function StomaScene() {
  const epidermalCells=[
    [85,95,150,90],[245,85,145,100],[410,82,150,105],[575,90,150,95],
    [85,305,155,92],[250,315,145,88],[575,315,150,88]
  ];
  return (
    <svg className="spark-stoma-excretion-svg" viewBox="0 0 1040 610" role="img" aria-label="Stomatal apparatus and leaf-section pathway showing guard cells with chloroplasts around a stomatal pore, surrounding epidermal cells, substomatal air space, spongy mesophyll and diffusion of oxygen carbon dioxide and water vapour">
      <defs>
        <marker id="stoma-gas-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="pex-stoma-arrow-head"/>
        </marker>
      </defs>

      <g className="pex-stoma-surface" transform="translate(35 55)">
        <text className="pex-heading" x="300" y="0" textAnchor="middle">surface view of a stoma</text>
        <rect className="pex-epidermis-field" x="0" y="25" width="600" height="390" rx="24"/>
        <g className="pex-epidermal-cells">
          {epidermalCells.map(([x,y,rx,ry],i)=><ellipse key={i} cx={x} cy={y} rx={rx/2} ry={ry/2}/>)}
        </g>

        <path className="pex-guard-cell left" d="M230 128Q165 196 205 300Q230 350 275 320Q245 285 248 225Q250 167 282 130Q258 107 230 128Z"/>
        <path className="pex-guard-cell right" d="M370 128Q435 196 395 300Q370 350 325 320Q355 285 352 225Q350 167 318 130Q342 107 370 128Z"/>
        <ellipse className="pex-pore" cx="300" cy="228" rx="37" ry="105"/>

        <g className="pex-guard-chloroplasts">
          {[[220,170],[218,225],[232,280],[380,170],[382,225],[368,280]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="11" ry="7"/>)}
        </g>
        <circle className="pex-guard-nucleus" cx="228" cy="244" r="12"/>
        <circle className="pex-guard-nucleus" cx="372" cy="244" r="12"/>

        <g className="pex-surface-callouts">
          <path d="M210 145L95 78" markerEnd="url(#stoma-gas-arrow)"/><text x="85" y="72" textAnchor="end">guard cell</text>
          <path d="M300 230L480 92" markerEnd="url(#stoma-gas-arrow)"/><text x="495" y="88">stomatal pore</text>
          <path d="M382 225L500 208" markerEnd="url(#stoma-gas-arrow)"/><text x="515" y="213">chloroplasts in guard cells</text>
          <path d="M445 330L520 355" markerEnd="url(#stoma-gas-arrow)"/><text x="535" y="362">surrounding epidermal cells</text>
        </g>

        <path className="pex-gas-flow oxygen" d="M300 215Q300 120 315 55" markerEnd="url(#stoma-gas-arrow)"/>
        <path className="pex-gas-flow water" d="M275 230Q245 135 235 62" markerEnd="url(#stoma-gas-arrow)"/>
        <path className="pex-gas-flow carbon" d="M330 70Q345 140 322 220" markerEnd="url(#stoma-gas-arrow)"/>
        <text className="pex-gas-label" x="205" y="55">H₂O vapour out</text>
        <text className="pex-gas-label" x="322" y="42">O₂ out</text>
        <text className="pex-gas-label" x="365" y="62">CO₂ can diffuse in or out</text>
      </g>

      <g className="pex-stoma-section" transform="translate(650 55)">
        <text className="pex-heading" x="175" y="0" textAnchor="middle">leaf section below a stoma</text>
        <rect className="pex-upper-tissue" x="20" y="42" width="310" height="60" rx="8"/>
        <rect className="pex-lower-epidermis" x="20" y="325" width="310" height="58" rx="8"/>
        <path className="pex-section-pore" d="M150 325Q175 285 200 325"/>
        <ellipse className="pex-substomatal-space" cx="175" cy="270" rx="70" ry="58"/>
        <g className="pex-spongy-cells">
          <ellipse cx="75" cy="158" rx="45" ry="28"/><ellipse cx="155" cy="150" rx="38" ry="24"/><ellipse cx="255" cy="160" rx="48" ry="28"/>
          <ellipse cx="92" cy="225" rx="39" ry="25"/><ellipse cx="265" cy="230" rx="40" ry="25"/>
        </g>
        <path className="pex-section-flow oxygen" d="M170 244Q174 300 175 348Q175 393 175 430" markerEnd="url(#stoma-gas-arrow)"/>
        <path className="pex-section-flow water" d="M120 225Q145 278 150 330Q154 382 140 430" markerEnd="url(#stoma-gas-arrow)"/>
        <path className="pex-section-flow carbon" d="M225 430Q205 382 205 335Q205 293 195 246" markerEnd="url(#stoma-gas-arrow)"/>

        <text className="pex-label" x="175" y="125" textAnchor="middle">spongy mesophyll with air spaces</text>
        <text className="pex-label" x="175" y="278" textAnchor="middle">substomatal air space</text>
        <text className="pex-small" x="175" y="465" textAnchor="middle">gases and water vapour diffuse through the stomatal pore</text>
      </g>

      <text className="pex-stoma-caption" x="520" y="585" textAnchor="middle">Stomata provide a diffusion pathway between internal leaf air spaces and the atmosphere.</text>
    </svg>
  );
}

function DayNightScene() {
  return (
    <svg viewBox="0 0 920 500" role="img" aria-label="Comparison of plant gas release in bright light and at night">
      <circle className="pex-sun" cx="210" cy="95" r="48" />
      <path className="pex-moon" d="M700 55Q760 80 735 145Q695 180 655 145Q710 140 700 55Z" />
      <path className="pex-plant" d="M235 390V190m0 80q-95-60-130 0q75 60 130 25m0-45q100-70 145-5q-85 65-145 30" />
      <path className="pex-plant" d="M685 390V190m0 80q-95-60-130 0q75 60 130 25m0-45q100-70 145-5q-85 65-145 30" />
      <path className="pex-arrow oxygen" d="M260 180Q310 130 350 105" />
      <text className="pex-gas-label" x="360" y="100">O₂ out</text>
      <path className="pex-arrow carbon" d="M650 185Q590 135 550 110" />
      <text className="pex-gas-label" x="510" y="105">CO₂ out</text>
      <text className="pex-heading" x="235" y="445" textAnchor="middle">Bright light</text>
      <text className="pex-small" x="235" y="470" textAnchor="middle">photosynthesis usually exceeds respiration</text>
      <text className="pex-heading" x="685" y="445" textAnchor="middle">Night</text>
      <text className="pex-small" x="685" y="470" textAnchor="middle">respiration continues, photosynthesis stops</text>
    </svg>
  );
}

function StorageScene() {
  return (
    <svg viewBox="0 0 920 500" role="img" aria-label="Plant wastes stored in old leaves and bark then removed by shedding">
      <g transform="translate(80 55)">
        <rect className="pex-trunk" x="120" y="110" width="135" height="285" rx="28" />
        <path className="pex-bark-peel" d="M225 150Q290 190 255 310Q220 335 205 290Q235 240 225 150Z" />
        <text className="pex-label" x="187" y="430" textAnchor="middle">bark</text>
        <circle className="pex-waste-dot" cx="235" cy="215" r="11" />
        <circle className="pex-waste-dot" cx="220" cy="265" r="9" />
      </g>
      <g transform="translate(470 55)">
        <path className="pex-leaf-shape" d="M145 90Q275 120 300 250Q195 345 75 265Q55 145 145 90Z" />
        <path className="pex-leaf-vein" d="M100 285Q165 220 245 135" />
        <circle className="pex-waste-dot" cx="165" cy="205" r="11" />
        <circle className="pex-waste-dot" cx="210" cy="185" r="8" />
        <path className="pex-fall-arrow" d="M305 315Q345 360 330 410" />
        <text className="pex-label" x="200" y="430" textAnchor="middle">old leaf falls</text>
      </g>
      <text className="pex-small" x="460" y="485" textAnchor="middle">stored wastes leave when bark peels or old leaves are shed</text>
    </svg>
  );
}

export default function PlantExcretionExplorer() {
  const [view,setView] = useState("gases");
  const info = VIEWS[view];

  return (
    <section className="spark-plant-excretion">
      <header>
        <span>PLANT EXCRETION</span>
        <h3>How flowering plants remove waste products</h3>
        <p>Plants produce fewer toxic wastes than animals and can reuse some products, but they still remove excess gases, water and stored substances.</p>
      </header>

      <div className="spark-plant-excretion-tabs">
        {Object.entries(VIEWS).map(([key,item]) => (
          <button type="button" key={key} className={view===key ? "active" : ""} onClick={()=>setView(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="spark-plant-excretion-stage">
        {view === "gases" && <StomaScene />}
        {view === "daynight" && <DayNightScene />}
        {view === "storage" && <StorageScene />}
      </div>

      <div className="spark-plant-excretion-summary">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>
    </section>
  );
}
