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
  return (
    <svg viewBox="0 0 920 500" role="img" aria-label="Leaf stomata releasing oxygen, carbon dioxide and water vapour">
      <rect className="pex-leaf" x="70" y="80" width="780" height="320" rx="80" />
      <g transform="translate(460 245)">
        <ellipse className="pex-guard-cell" cx="-58" cy="0" rx="62" ry="115" transform="rotate(18 -58 0)" />
        <ellipse className="pex-guard-cell" cx="58" cy="0" rx="62" ry="115" transform="rotate(-18 58 0)" />
        <ellipse className="pex-pore" cx="0" cy="0" rx="32" ry="92" />
        {[[-150,-115,"O₂"],[0,-145,"H₂O"],[155,-105,"CO₂"]].map(([x,y,label])=>(
          <g key={label}>
            <path className="pex-arrow" d={"M0 -65Q"+(x/2)+" "+(y/2)+" "+x+" "+y} />
            <text className="pex-gas-label" x={x} y={y-10} textAnchor="middle">{label}</text>
          </g>
        ))}
      </g>
      <text className="pex-label" x="460" y="455" textAnchor="middle">stoma in leaf epidermis</text>
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
