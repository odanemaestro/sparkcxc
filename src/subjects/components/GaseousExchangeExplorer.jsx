import React,{useMemo,useState} from "react";
import "./gaseousExchangeExplorer.css";

const SURFACE_FEATURES=[
  ["Large surface area","More membrane is available for diffusion at the same time."],
  ["Thin barrier","A short diffusion distance allows faster movement of gases."],
  ["Moist surface","Oxygen and carbon dioxide dissolve before diffusing across cell membranes."],
  ["Steep concentration gradient","Ventilation, blood flow or continuous use and production of gases maintains diffusion gradients."],
];

function RespiratorySystemView(){
  return <div className="spark-respiratory-system">
    <svg className="spark-respiratory-system-svg" viewBox="0 0 900 760" role="img" aria-label="Human respiratory system showing nasal cavity, pharynx, larynx, trachea, bronchi, bronchioles, lungs, alveoli and diaphragm">
      <path className="gx-torso" d="M315 105Q450 58 585 105Q665 195 650 365Q635 520 570 650H330Q265 520 250 365Q235 195 315 105Z"/>
      <circle className="gx-head" cx="450" cy="78" r="58"/>
      <path className="gx-nasal" d="M418 72Q450 45 482 72Q470 94 450 101Q430 94 418 72Z"/>
      <path className="gx-pharynx" d="M450 102Q470 126 454 153"/>
      <path className="gx-larynx" d="M438 148Q450 138 462 148L460 170H440Z"/>
      <path className="gx-trachea-main" d="M450 168V320"/>
      {[190,210,230,250,270,290].map(y=><line key={y} className="gx-tracheal-ring" x1="432" y1={y} x2="468" y2={y}/>)}
      <path className="gx-bronchus main-left" d="M450 315Q405 330 365 365"/>
      <path className="gx-bronchus main-right" d="M450 315Q495 330 535 365"/>
      <path className="gx-lung left" d="M336 205Q276 235 286 395Q293 536 382 590Q420 540 415 365Q410 245 336 205Z"/>
      <path className="gx-lung right" d="M564 205Q624 235 614 395Q607 536 518 590Q480 540 485 365Q490 245 564 205Z"/>
      <path className="gx-bronchiole-tree" d="M365 365Q333 397 320 438M365 365Q345 410 355 466M365 365Q385 405 390 455M535 365Q567 397 580 438M535 365Q555 410 545 466M535 365Q515 405 510 455"/>
      <g className="gx-alveoli-cluster">
        {[ [312,452],[350,480],[392,468],[588,452],[550,480],[508,468] ].map(([x,y],i)=><g key={i}><circle cx={x-12} cy={y} r="11"/><circle cx={x+10} cy={y-8} r="10"/><circle cx={x+14} cy={y+12} r="9"/><circle cx={x-8} cy={y+14} r="10"/></g>)}
      </g>
      <path className="gx-diaphragm" d="M292 596Q450 675 608 596"/>
      <path className="gx-air-arrow inhale" d="M450 8V48"/>
      <path className="gx-air-arrow exhale" d="M500 48V8"/>
      <text className="gx-label" x="500" y="32">air movement</text>
      <g className="gx-resp-labels left">
        <text x="125" y="82">nasal cavity</text><path d="M225 78L415 76"/>
        <text x="140" y="133">pharynx</text><path d="M210 130L440 120"/>
        <text x="145" y="174">larynx</text><path d="M205 170L435 158"/>
        <text x="145" y="238">trachea</text><path d="M205 234L430 232"/>
        <text x="125" y="365">left bronchus</text><path d="M225 360L356 354"/>
        <text x="115" y="470">bronchioles</text><path d="M215 465L320 430"/>
      </g>
      <g className="gx-resp-labels right">
        <text x="690" y="238">right lung</text><path d="M560 250L680 242"/>
        <text x="690" y="365">right bronchus</text><path d="M545 355L680 360"/>
        <text x="690" y="470">alveoli</text><path d="M585 460L680 466"/>
        <text x="690" y="612">diaphragm</text><path d="M600 596L680 605"/>
      </g>
      <text className="gx-resp-caption" x="450" y="720" textAnchor="middle">air pathway: nasal cavity → pharynx → larynx → trachea → bronchi → bronchioles → alveoli</text>
    </svg>
    <div className="spark-respiratory-system-notes">
      <article><b>Conducting pathway</b><p>The nasal cavity, pharynx, larynx, trachea and bronchi conduct air towards the lungs.</p></article>
      <article><b>Branching airways</b><p>Bronchi divide repeatedly into smaller bronchioles, spreading air throughout each lung.</p></article>
      <article><b>Exchange region</b><p>Bronchioles end in clusters of alveoli, where oxygen and carbon dioxide diffuse between air and blood.</p></article>
      <article><b>Ventilation</b><p>The diaphragm helps change thoracic volume during breathing, moving air into and out of the lungs.</p></article>
    </div>
  </div>;
}

function AlveolusView(){
  const redCells=[
    [180,118,-18],[235,95,12],[300,90,28],[370,98,-8],[444,124,16],[510,165,35],
    [544,225,-18],[548,295,24],[516,354,-30],[455,392,18],[380,414,-12],[302,408,22],
    [232,382,-30],[177,343,14],[143,285,-10],[139,220,18],[151,165,-25],
  ];
  return <div className="spark-gas-alveolus">
    <svg viewBox="0 0 900 520" role="img" aria-label="Alveolar sac with surrounding capillary network showing oxygen entering blood and carbon dioxide entering alveolar air">
      <g className="gx-alveolar-cluster">
        <path className="gx-bronchiole" d="M80 250Q150 245 214 264" />
        <path className="gx-alveolar-duct" d="M205 264Q240 260 265 276" />

        {[
          [290,170,76],[372,154,72],[444,205,78],
          [452,302,76],[374,354,82],[282,330,77],[235,250,70],[345,254,88],
        ].map(([x,y,r],i)=>(
          <circle key={i} className="gx-alveolus" cx={x} cy={y} r={r}/>
        ))}

        <path className="gx-alveolar-opening" d="M257 259Q278 243 300 251M318 190Q338 176 356 186M405 192Q421 183 438 192M421 316Q437 305 451 315M314 328Q334 314 350 326" />

        <text className="gx-label" x="345" y="260" textAnchor="middle">alveolar air</text>
      </g>

      <g className="gx-capillary-network">
        <path className="gx-vessel deoxygenated" d="M620 95Q575 122 548 158" />
        <path className="gx-capillary" d="M170 105Q280 58 414 82Q545 105 596 208Q638 292 596 365Q547 446 433 465Q295 487 188 424Q104 374 95 284Q87 188 170 105Z" />
        <path className="gx-vessel oxygenated" d="M590 366Q628 399 678 414" />
      </g>

      {redCells.map(([x,y,angle],i)=><ellipse key={i} className="gx-rbc" cx={x} cy={y} rx="21" ry="13" transform={`rotate(${angle} ${x} ${y})`} />)}

      <path className="gx-exchange-barrier" d="M472 210Q506 218 526 246Q543 270 535 302" />

      <path className="gx-oxygen-arrow" d="M442 233Q486 216 528 203" />
      <path className="gx-carbon-arrow" d="M530 311Q488 321 447 301" />

      <text className="gx-oxygen-text" x="535" y="187">O₂ diffuses into blood</text>
      <text className="gx-carbon-text" x="523" y="340">CO₂ diffuses into alveolar air</text>

      <text className="gx-small" x="575" y="255">thin exchange barrier</text>
      <text className="gx-small" x="320" y="492" textAnchor="middle">capillary closely surrounds the thin, moist alveolar walls</text>
      <text className="gx-small vessel-label deoxygenated" x="650" y="92">deoxygenated blood enters</text>
      <text className="gx-small vessel-label oxygenated" x="694" y="430">oxygenated blood leaves</text>

      <g className="gx-exchange-key" transform="translate(665 165)">
        <rect x="0" y="0" width="205" height="156" rx="14" />
        <text className="gx-panel-title" x="16" y="28">Why alveoli work well</text>
        <text className="gx-small" x="16" y="57">• very large total area</text>
        <text className="gx-small" x="16" y="82">• walls one cell thick</text>
        <text className="gx-small" x="16" y="107">• moist surface</text>
        <text className="gx-small" x="16" y="132">• dense capillary supply</text>
      </g>
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
    respiratory:"The respiratory system conducts air through branching airways to alveoli, where gas exchange occurs.",
    alveolus:"Oxygen diffuses from alveolar air into blood, while carbon dioxide diffuses in the opposite direction.",
    fish:"Fish gills depend on water to keep thin filaments spread out for a large exchange area.",
    plant:"Stomata regulate gas movement between leaf air spaces and the atmosphere.",
    insect:"Insects use spiracles, tracheae and tracheoles rather than lungs or blood transport for most oxygen delivery.",
  })[view],[view]);

  return <section className="spark-gaseous-exchange">
    <header><span>GASEOUS EXCHANGE</span><h3>Compare the surfaces organisms use to exchange oxygen and carbon dioxide</h3><p>Gaseous exchange supplies gases needed for cellular processes and removes gases produced by metabolism. Diffusion drives movement across the exchange surface.</p></header>
    <div className="spark-gas-tabs">{[["features","Surface features"],["respiratory","Respiratory system"],["alveolus","Alveolus"],["fish","Fish gills"],["plant","Stoma"],["insect","Insect tracheae"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
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
