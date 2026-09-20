import React,{useState} from "react";
import "./photosynthesisEnergyExplorer.css";

const TABS=[
  ["equation","Equation"],
  ["starch","Starch test"],
  ["evidence","Evidence"],
  ["limits","Limiting factors"],
];

function EquationView(){
  return <div className="spark-photo-equation">
    <div className="spark-photo-equation-row"><span>Carbon dioxide</span><b>+</b><span>Water</span><b>→</b><span>Glucose</span><b>+</b><span>Oxygen</span></div>
    <div className="spark-photo-condition">light energy absorbed by chlorophyll</div>
    <div className="spark-photo-balanced">6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</div>
    <article><strong>Energy conversion</strong><p>Light energy is converted to chemical energy stored in glucose.</p></article>
  </div>;
}

function StarchView(){
  const steps=[
    ["Destarch the plant","Keep the plant in darkness long enough to use stored starch before the investigation."],
    ["Expose the leaf","Allow the selected treatment, for example light versus covered regions."],
    ["Boil the leaf in water","Kills the leaf and stops reactions."],
    ["Heat in ethanol using a water bath","Removes chlorophyll so the iodine colour change is visible. Ethanol is flammable, so do not heat it directly over a flame."],
    ["Rinse and add iodine","A blue-black colour shows starch. Brown or yellow-brown means starch is absent."],
  ];
  return <div className="spark-photo-starch">{steps.map((s,i)=><article key={s[0]}><span>{i+1}</span><div><b>{s[0]}</b><p>{s[1]}</p></div></article>)}</div>;
}

function EvidenceView(){
  return <div className="spark-photo-evidence">
    <article><span>VARIEGATED LEAF</span><h4>Chlorophyll is required</h4><p>Only green regions contain chlorophyll. After exposure to light, only green regions turn blue-black with iodine because only those regions make starch.</p></article>
    <article><span>COVERED LEAF</span><h4>Light is required</h4><p>A destarched leaf is partly covered, then exposed to light. The uncovered area turns blue-black and the covered area remains brown.</p></article>
    <article><span>PONDWEED</span><h4>Oxygen is produced</h4><p>Gas collected from illuminated pondweed relights a glowing splint, identifying the gas as oxygen.</p></article>
    <article><span>STORAGE</span><h4>Glucose is converted to starch</h4><p>Starch is insoluble, so plants can store large amounts without strongly affecting osmosis in cells.</p></article>
  </div>;
}

function LimitsView(){
  return <div className="spark-photo-limits">
    <svg viewBox="0 0 760 360" role="img" aria-label="Rate of photosynthesis rises with light intensity and then levels off when another factor becomes limiting">
      <line className="ph-axis" x1="85" y1="290" x2="690" y2="290"/><line className="ph-axis" x1="85" y1="290" x2="85" y2="55"/>
      <path className="ph-curve" d="M90 282 C160 230 230 160 340 120 C430 90 540 88 680 88"/>
      <line className="ph-dash" x1="430" y1="88" x2="430" y2="290"/>
      <text className="ph-label" x="385" y="330">Light intensity</text><text className="ph-label" x="25" y="190" transform="rotate(-90 25 190)">Rate of photosynthesis</text>
      <text className="ph-note" x="450" y="78">another factor limits rate</text><text className="ph-note" x="445" y="315">about 6 units in bank example</text>
    </svg>
    <p>When light is low, increasing light can increase photosynthesis. Once the curve levels off, another factor such as carbon dioxide concentration or temperature is limiting the rate.</p>
  </div>;
}

export default function PhotosynthesisEnergyExplorer(){
  const [view,setView]=useState("equation");
  return <section className="spark-photosynthesis-energy">
    <header><span>PHOTOSYNTHESIS AND ENERGY</span><h3>Follow the evidence from light capture to stored chemical energy</h3><p>Photosynthesis uses carbon dioxide and water to make glucose and oxygen, using light energy absorbed by chlorophyll.</p></header>
    <div className="spark-photo-tabs">{TABS.map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-photo-stage">
      {view==="equation"&&<EquationView/>}
      {view==="starch"&&<StarchView/>}
      {view==="evidence"&&<EvidenceView/>}
      {view==="limits"&&<LimitsView/>}
    </div>
    <div className="spark-photo-summary"><strong>Photosynthesis converts energy</strong><span>Light energy becomes chemical energy in glucose. Plants can convert glucose to insoluble starch for storage.</span></div>
  </section>;
}
