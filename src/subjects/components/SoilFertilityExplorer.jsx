import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./soilFertilityExplorer.css";

const TABS = [
  ["texture","Soil texture"],
  ["drainage","Water retention"],
  ["profile","Soil profile"],
  ["fertility","Fertility chemistry"],
];

function TextureScene() {
  return (
    <ReviewedScienceDiagram site="SoilFertilityExplorer.jsx:13"><svg viewBox="0 0 960 500" role="img" aria-label="Comparison of sandy, clay and loam soil structure">
      <text className="sf-title" x="160" y="42" textAnchor="middle">Sandy soil</text>
      <text className="sf-title" x="480" y="42" textAnchor="middle">Clay soil</text>
      <text className="sf-title" x="800" y="42" textAnchor="middle">Loam soil</text>

      <rect className="sf-column" x="45" y="70" width="230" height="330" rx="20" />
      {[
        [90,120,29],[165,115,34],[235,130,26],[110,195,35],[205,210,32],
        [75,285,27],[155,285,38],[235,300,29],[115,365,31],[210,365,35],
      ].map(([cx,cy,r],index) => <circle key={index} className="sf-sand" cx={cx} cy={cy} r={r} />)}
      <path className="sf-water-arrow" d="M160 80V385" />
      <text className="sf-small" x="160" y="432" textAnchor="middle">large particles, large pores</text>
      <text className="sf-small" x="160" y="456" textAnchor="middle">fast drainage, low retention</text>

      <rect className="sf-column" x="365" y="70" width="230" height="330" rx="20" />
      {Array.from({length:54},(_,index) => {
        const col = index % 9;
        const row = Math.floor(index / 9);
        return <circle key={index} className="sf-clay" cx={390 + col*23} cy={110 + row*50 + (col%2)*11} r="10" />;
      })}
      <path className="sf-water-arrow slow" d="M480 80V215" />
      <text className="sf-small" x="480" y="432" textAnchor="middle">tiny particles, tiny pores</text>
      <text className="sf-small" x="480" y="456" textAnchor="middle">slow drainage, high retention</text>

      <rect className="sf-column" x="685" y="70" width="230" height="330" rx="20" />
      {[
        [730,120,24,"sand"],[815,112,15,"silt"],[870,145,11,"clay"],
        [750,195,13,"clay"],[815,205,26,"sand"],[875,225,16,"silt"],
        [725,285,17,"silt"],[795,275,12,"clay"],[865,300,25,"sand"],
        [750,355,25,"sand"],[825,355,15,"silt"],[885,360,11,"clay"],
      ].map(([cx,cy,r,type],index) => <circle key={index} className={"sf-" + type} cx={cx} cy={cy} r={r} />)}
      <path className="sf-humus-fleck" d="M710 160q25-22 48 2t42-4m10 92q24-18 45 4t35-5m-150 82q25-20 48 2" />
      <path className="sf-water-arrow medium" d="M800 80V330" />
      <text className="sf-small" x="800" y="432" textAnchor="middle">mixed particles plus humus</text>
      <text className="sf-small" x="800" y="456" textAnchor="middle">good drainage and retention</text>
    </svg></ReviewedScienceDiagram>
  );
}

function DrainageScene() {
  const sets = [
    {x:170,label:"Sandy",drained:70,retained:30,level:325},
    {x:480,label:"Clay",drained:25,retained:75,level:385},
    {x:790,label:"Loam",drained:48,retained:52,level:355},
  ];
  return (
    <ReviewedScienceDiagram site="SoilFertilityExplorer.jsx:59"><svg viewBox="0 0 960 540" role="img" aria-label="Soil drainage and water retention investigation">
      <text className="sf-note" x="480" y="36" textAnchor="middle">Equal soil mass + 100 cm3 water + equal drainage time</text>
      {sets.map(item => (
        <g key={item.label}>
          <path className="sf-funnel" d={"M" + (item.x-95) + " 85H" + (item.x+95) + "L" + (item.x+34) + " 235V285H" + (item.x-34) + "V235Z"} />
          <path className="sf-soil-fill" d={"M" + (item.x-72) + " 115H" + (item.x+72) + "L" + (item.x+46) + " 190H" + (item.x-46) + "Z"} />
          <path className="sf-drop" d={"M" + item.x + " 287Q" + (item.x-15) + " 310 " + item.x + " 326Q" + (item.x+15) + " 310 " + item.x + " 287Z"} />
          <rect className="sf-cylinder" x={item.x-58} y="330" width="116" height="150" rx="10" />
          <rect className="sf-collected" x={item.x-50} y={item.level} width="100" height={472-item.level} rx="5" />
          <text className="sf-title" x={item.x} y="512" textAnchor="middle">{item.label}</text>
          <text className="sf-small strong" x={item.x} y="365" textAnchor="middle">{item.drained} cm3 drained</text>
          <text className="sf-small" x={item.x} y="392" textAnchor="middle">{item.retained} cm3 retained</text>
        </g>
      ))}
    </svg></ReviewedScienceDiagram>
  );
}

function ProfileScene() {
  return (
    <ReviewedScienceDiagram site="SoilFertilityExplorer.jsx:79"><svg viewBox="0 0 960 540" role="img" aria-label="Soil profile showing topsoil, subsoil, weathered rock and bedrock">
      <rect className="sf-sky" x="40" y="40" width="880" height="100" rx="18" />
      <path className="sf-grass" d="M40 140H920" />
      <rect className="sf-topsoil" x="40" y="140" width="880" height="105" />
      <rect className="sf-subsoil" x="40" y="245" width="880" height="110" />
      <rect className="sf-weathered" x="40" y="355" width="880" height="95" />
      <rect className="sf-bedrock" x="40" y="450" width="880" height="60" rx="0 0 18 18" />

      <path className="sf-root" d="M290 130V245m0-75q-70 25-95 85m95-50q75 18 110 90m-110-45q-35 50-20 95" />
      <path className="sf-worm" d="M610 190q30-35 60 0t60 0" />
      <circle className="sf-humus-dot" cx="120" cy="185" r="10" />
      <circle className="sf-humus-dot" cx="165" cy="210" r="7" />
      <circle className="sf-humus-dot" cx="760" cy="175" r="9" />
      <circle className="sf-humus-dot" cx="820" cy="220" r="7" />

      <text className="sf-layer-label light" x="70" y="180">TOPSOIL</text>
      <text className="sf-layer-detail light" x="70" y="208">most humus, roots and soil organisms</text>
      <text className="sf-layer-label" x="70" y="285">SUBSOIL</text>
      <text className="sf-layer-detail" x="70" y="313">less humus, more mineral material</text>
      <text className="sf-layer-label" x="70" y="395">WEATHERED PARENT MATERIAL</text>
      <text className="sf-layer-label light" x="70" y="487">BEDROCK</text>
      <text className="sf-earthworm-label light" x="690" y="160">earthworm burrow improves aeration and drainage</text>
    </svg></ReviewedScienceDiagram>
  );
}

function FertilityScene() {
  return (
    <ReviewedScienceDiagram site="SoilFertilityExplorer.jsx:107"><svg viewBox="0 0 960 600" role="img" aria-label="Soil fertility processes including nitrogen-fixing bacteria, decomposers, nitrifying bacteria and denitrifying bacteria">
      <text className="sf-title" x="480" y="38" textAnchor="middle">Nitrogen and organic matter in fertile soil</text>

      <ellipse className="sf-atmosphere" cx="150" cy="110" rx="105" ry="52" />
      <text className="sf-title" x="150" y="104" textAnchor="middle">Nitrogen gas</text>
      <text className="sf-small" x="150" y="128" textAnchor="middle">N2 in air</text>

      <path className="sf-plant-stem" d="M430 205V105" />
      <ellipse className="sf-plant-leaf" cx="385" cy="130" rx="55" ry="24" transform="rotate(-24 385 130)" />
      <ellipse className="sf-plant-leaf" cx="477" cy="150" rx="55" ry="24" transform="rotate(24 477 150)" />
      <path className="sf-root" d="M430 205V430m0-85q-95 30-130 110m130-150q100 25 145 125m-145-40q-55 65-35 125" />
      {[350,385,505,545].map((cx,index) => <circle key={index} className="sf-nodule" cx={cx} cy={index<2 ? 390+index*32 : 370+(index-2)*45} r="14" />)}
      <text className="sf-small strong" x="430" y="565" textAnchor="middle">legume root nodules contain nitrogen-fixing bacteria</text>

      <rect className="sf-soil-zone" x="30" y="215" width="900" height="320" rx="24" />
      <text className="sf-small" x="765" y="250">dead plants and animals</text>
      <path className="sf-dead-leaf" d="M795 280q55-55 100 0q-55 45-100 0Z" />

      <rect className="sf-process-box" x="650" y="330" width="225" height="72" rx="14" />
      <text className="sf-process-title" x="762" y="358" textAnchor="middle">Decomposers</text>
      <text className="sf-small" x="762" y="382" textAnchor="middle">release ammonium + form humus</text>

      <rect className="sf-process-box" x="630" y="445" width="245" height="62" rx="14" />
      <text className="sf-process-title" x="752" y="472" textAnchor="middle">Nitrifying bacteria</text>
      <text className="sf-small" x="752" y="493" textAnchor="middle">ammonium compounds to nitrates</text>

      <text className="sf-nitrate" x="520" y="500">NO3-</text>
      <path className="sf-process-arrow" d="M635 475H565" />
      <path className="sf-process-arrow" d="M520 470Q455 420 445 330" />
      <text className="sf-small" x="480" y="445">plant uptake</text>

      <rect className="sf-process-box warning" x="65" y="365" width="230" height="72" rx="14" />
      <text className="sf-process-title" x="180" y="393" textAnchor="middle">Denitrifying bacteria</text>
      <text className="sf-small" x="180" y="418" textAnchor="middle">nitrates to nitrogen gas</text>

      <path className="sf-process-arrow warning" d="M510 505Q330 520 295 420" />
      <path className="sf-process-arrow warning" d="M120 365Q70 250 105 165" />
      <path className="sf-process-arrow" d="M220 135Q300 210 345 375" />
      <text className="sf-small" x="278" y="236">nitrogen fixation</text>
    </svg></ReviewedScienceDiagram>
  );
}

function Notes({ tab }) {
  if (tab === "texture") {
    return (
      <div className="spark-soil-note-grid">
        <article><b>Sand</b><span>Large particles and large pore spaces. It drains rapidly, holds little water and is usually well aerated.</span></article>
        <article><b>Clay</b><span>Tiny particles and small pore spaces. It holds much water, drains slowly and can become waterlogged.</span></article>
        <article><b>Loam</b><span>A mixture of sand, silt, clay and humus. It combines useful water retention with drainage and aeration.</span></article>
      </div>
    );
  }
  if (tab === "drainage") {
    return (
      <div className="spark-soil-formula">
        <strong>Water retained = water added - water drained</strong>
        <span>Keep soil mass, water volume, drainage time and apparatus size constant when comparing samples.</span>
      </div>
    );
  }
  if (tab === "profile") {
    return (
      <div className="spark-soil-note-grid">
        <article><b>Humus</b><span>Decaying organic matter releases mineral nutrients, holds water and helps soil particles form crumbs.</span></article>
        <article><b>Earthworms</b><span>Burrows improve aeration and drainage. Casts mix organic matter with mineral soil.</span></article>
        <article><b>Topsoil</b><span>The upper layer usually contains the greatest amount of humus, roots and soil organisms.</span></article>
      </div>
    );
  }
  return (
    <div className="spark-soil-note-grid">
      <article><b>pH</b><span>Most vegetables grow well in slightly acidic to neutral soil, about pH 6 to 7. Lime raises the pH of soil that is too acidic.</span></article>
      <article><b>Nitrogen fixation</b><span>Bacteria in legume root nodules convert nitrogen gas into nitrogen compounds that enter the soil food system.</span></article>
      <article><b>Denitrification</b><span>Denitrifying bacteria convert nitrates to nitrogen gas, removing available nitrogen from the soil.</span></article>
    </div>
  );
}

export default function SoilFertilityExplorer() {
  const [tab,setTab] = useState("texture");
  return (
    <section className="spark-soil-explorer">
      <header>
        <span>SOIL FERTILITY LAB</span>
        <h3>How soil properties affect plant growth</h3>
        <p>Compare soil structure, water movement, the soil profile and the biological and chemical processes that supply nutrients.</p>
      </header>
      <div className="spark-soil-tabs" role="tablist" aria-label="Soil fertility views">
        {TABS.map(([key,label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={tab === key ? "active" : ""}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="spark-soil-stage">
        {tab === "texture" && <TextureScene />}
        {tab === "drainage" && <DrainageScene />}
        {tab === "profile" && <ProfileScene />}
        {tab === "fertility" && <FertilityScene />}
      </div>
      <Notes tab={tab} />
    </section>
  );
}
