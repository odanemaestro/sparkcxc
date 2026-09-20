import React,{useMemo,useState} from "react";
import "./gaseousExchangeExplorer.css";

const SURFACE_FEATURES=[
  ["Large surface area","More membrane is available for diffusion at the same time."],
  ["Thin barrier","A short diffusion distance allows faster movement of gases."],
  ["Moist surface","Oxygen and carbon dioxide dissolve before diffusing across cell membranes."],
  ["Steep concentration gradient","Ventilation, blood flow or continuous use and production of gases maintains diffusion gradients."],
];

function AlveolusView(){
  return <div className="spark-gas-alveolus">
    <svg viewBox="0 0 820 470" role="img" aria-label="Alveolus beside a blood capillary showing oxygen diffusing into blood and carbon dioxide diffusing into the alveolus">
      <circle className="gx-alveolus" cx="315" cy="220" r="150"/>
      <path className="gx-capillary" d="M510 75Q650 85 690 200Q725 315 600 390Q535 425 475 385"/>
      <circle className="gx-rbc" cx="590" cy="135" r="24"/>
      <circle className="gx-rbc" cx="650" cy="210" r="24"/>
      <circle className="gx-rbc" cx="625" cy="310" r="24"/>
      <path className="gx-oxygen-arrow" d="M390 180Q485 150 555 150"/>
      <path className="gx-carbon-arrow" d="M555 280Q480 300 390 270"/>
      <text className="gx-oxygen-text" x="475" y="135">O₂ to blood</text>
      <text className="gx-carbon-text" x="450" y="330">CO₂ to alveolus</text>
      <text className="gx-label" x="315" y="225" textAnchor="middle">alveolar air</text>
      <text className="gx-small" x="600" y="440" textAnchor="middle">capillary with red blood cells</text>
    </svg>
    <div className="spark-gas-alveolus-notes">
      <article><b>Large surface area</b><p>Millions of alveoli provide a large total exchange surface.</p></article>
      <article><b>Thin walls</b><p>Alveolar and capillary walls form a short diffusion path.</p></article>
      <article><b>Moist lining</b><p>Gases dissolve before diffusing across the exchange surface.</p></article>
      <article><b>Blood flow and ventilation</b><p>Fresh air and flowing blood maintain concentration gradients.</p></article>
    </div>
  </div>;
}

function FishView(){
  return <div className="spark-gas-fish">
    <svg viewBox="0 0 820 430" role="img" aria-label="Fish gill filaments in water compared with collapsed filaments out of water">
      <g transform="translate(55 65)">
        <path className="gx-gill-arch" d="M90 40Q35 150 95 280"/>
        {[0,1,2,3,4,5].map(i=><path key={i} className="gx-gill-filament" d={"M88 "+(65+i*38)+"Q185 "+(45+i*42)+" 270 "+(75+i*38)}/>)}
        <path className="gx-water-arrow" d="M5 160H65"/>
        <text className="gx-panel-title" x="150" y="315" textAnchor="middle">supported in water</text>
        <text className="gx-small" x="150" y="340" textAnchor="middle">filaments spread out, large surface area</text>
      </g>
      <g transform="translate(465 65)">
        <path className="gx-gill-arch" d="M90 40Q35 150 95 280"/>
        {[0,1,2,3,4,5].map(i=><path key={i} className="gx-gill-collapsed" d={"M88 "+(65+i*38)+"Q135 "+(105+i*22)+" 170 "+(130+i*18)}/>)}
        <text className="gx-panel-title" x="150" y="315" textAnchor="middle">out of water</text>
        <text className="gx-small" x="150" y="340" textAnchor="middle">filaments collapse and stick together</text>
      </g>
    </svg>
    <p>Gill filaments provide a large, thin, moist surface with many capillaries. Out of water, the unsupported filaments collapse together, sharply reducing the effective surface area for gaseous exchange.</p>
  </div>;
}

function PlantView(){
  return <div className="spark-gas-plant">
    <svg viewBox="0 0 820 430" role="img" aria-label="Stoma with two guard cells showing carbon dioxide entering and oxygen and water vapour leaving">
      <ellipse className="gx-guard left" cx="330" cy="210" rx="105" ry="155" transform="rotate(-18 330 210)"/>
      <ellipse className="gx-guard right" cx="490" cy="210" rx="105" ry="155" transform="rotate(18 490 210)"/>
      <ellipse className="gx-stoma" cx="410" cy="210" rx="42" ry="120"/>
      <path className="gx-co2-arrow" d="M410 20V95"/>
      <text className="gx-co2-text" x="435" y="55">CO₂ enters</text>
      <path className="gx-o2-arrow" d="M365 325Q300 365 230 370"/>
      <text className="gx-o2-text" x="115" y="390">O₂ can leave</text>
      <path className="gx-water-vapour-arrow" d="M455 325Q525 365 605 370"/>
      <text className="gx-water-text" x="615" y="390">water vapour leaves</text>
      <text className="gx-label" x="410" y="215" textAnchor="middle">stoma</text>
      <text className="gx-small" x="250" y="85">guard cell</text>
      <text className="gx-small" x="555" y="85">guard cell</text>
    </svg>
    <div className="spark-gas-plant-notes">
      <p>Stomata are pores controlled by guard cells. Carbon dioxide enters leaves for photosynthesis, while oxygen and water vapour can leave.</p>
      <p>In many terrestrial plants, more stomata occur on the lower leaf surface. The cooler, shaded position helps reduce water loss.</p>
      <p>In bright light, photosynthesis can exceed respiration, so a green plant can release more oxygen than it takes in.</p>
    </div>
  </div>;
}

function InsectView(){
  return <div className="spark-gas-insect">
    <svg viewBox="0 0 820 420" role="img" aria-label="Insect spiracle leading into tracheae and fine tracheoles beside body cells">
      <path className="gx-insect-body" d="M90 120Q190 55 305 120Q400 55 505 125Q650 110 720 205Q645 305 500 290Q395 350 300 285Q185 350 85 275Q50 200 90 120Z"/>
      <circle className="gx-spiracle" cx="210" cy="110" r="18"/>
      <path className="gx-trachea" d="M210 110Q285 155 350 195Q430 240 530 220"/>
      <path className="gx-tracheole" d="M350 195Q380 145 410 125M350 195Q405 190 440 170M350 195Q390 245 430 270M530 220Q570 170 620 160M530 220Q585 230 625 255"/>
      <circle className="gx-cell" cx="420" cy="115" r="25"/><circle className="gx-cell" cx="455" cy="165" r="25"/><circle className="gx-cell" cx="440" cy="280" r="25"/><circle className="gx-cell" cx="635" cy="150" r="25"/><circle className="gx-cell" cx="640" cy="265" r="25"/>
      <text className="gx-label" x="175" y="82">spiracle</text>
      <text className="gx-label" x="385" y="230">trachea</text>
      <text className="gx-small" x="580" y="330">tracheoles deliver gases close to cells</text>
    </svg>
    <p>Air enters insects through spiracles and moves through tracheae into fine tracheoles. This system brings oxygen close to body cells and provides a short diffusion path.</p>
  </div>;
}

export default function GaseousExchangeExplorer(){
  const [view,setView]=useState("features");
  const summary=useMemo(()=>({
    features:"Efficient exchange surfaces maximise area, minimise diffusion distance, remain moist and maintain concentration gradients.",
    alveolus:"Oxygen diffuses from alveolar air into blood, while carbon dioxide diffuses in the opposite direction.",
    fish:"Fish gills depend on water to keep thin filaments spread out for a large exchange area.",
    plant:"Stomata regulate gas movement between leaf air spaces and the atmosphere.",
    insect:"Insects use spiracles, tracheae and tracheoles rather than lungs or blood transport for most oxygen delivery.",
  })[view],[view]);

  return <section className="spark-gaseous-exchange">
    <header><span>GASEOUS EXCHANGE</span><h3>Compare the surfaces organisms use to exchange oxygen and carbon dioxide</h3><p>Gaseous exchange supplies gases needed for cellular processes and removes gases produced by metabolism. Diffusion drives movement across the exchange surface.</p></header>
    <div className="spark-gas-tabs">{[["features","Surface features"],["alveolus","Alveolus"],["fish","Fish gills"],["plant","Stoma"],["insect","Insect tracheae"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-gas-stage">
      {view==="features"&&<div className="spark-gas-features">{SURFACE_FEATURES.map(([name,text],i)=><article key={name}><span>{i+1}</span><div><b>{name}</b><p>{text}</p></div></article>)}</div>}
      {view==="alveolus"&&<AlveolusView/>}
      {view==="fish"&&<FishView/>}
      {view==="plant"&&<PlantView/>}
      {view==="insect"&&<InsectView/>}
    </div>
    <div className="spark-gas-summary"><strong>{summary}</strong><span>In humans and other animals, oxygen supports aerobic respiration and carbon dioxide must be removed. In green plants, both respiration and photosynthesis affect net gas movement.</span></div>
  </section>;
}

export { SURFACE_FEATURES };
