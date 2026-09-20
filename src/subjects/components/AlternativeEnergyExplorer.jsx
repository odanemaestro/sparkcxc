import React,{useMemo,useState} from "react";
import "./alternativeEnergyExplorer.css";

const SOURCES=[
  {id:"solar-pv",name:"Solar photovoltaic",input:"Sunlight",output:"Electrical energy",best:"Sunny roofs and open sites",limits:"Intermittent output, storage or grid support may be needed, initial cost can be high."},
  {id:"solar-thermal",name:"Solar thermal",input:"Solar radiation",output:"Heat",best:"Water heating and cooking",limits:"Depends on sunshine and suitable collector orientation."},
  {id:"wind",name:"Wind",input:"Kinetic energy of moving air",output:"Electrical energy",best:"Consistently windy exposed sites",limits:"Variable output, siting, visual and noise concerns."},
  {id:"hydro",name:"Hydroelectric",input:"Gravitational and kinetic energy of water",output:"Electrical energy",best:"Rivers with adequate flow and height difference",limits:"Site-specific, can alter river ecosystems and communities."},
  {id:"geothermal",name:"Geothermal",input:"Heat from Earth",output:"Heat or electrical energy",best:"Areas with accessible hot rocks and geothermal reservoirs",limits:"High exploration and drilling cost, strongly location-dependent."},
  {id:"biomass",name:"Biomass and biofuel",input:"Chemical energy in recently grown biological material",output:"Heat, electricity or transport fuel",best:"Agricultural residues and sustainably grown feedstocks",limits:"Land, air emissions and sustainability depend on the feedstock and process."},
  {id:"biogas",name:"Biogas",input:"Chemical energy in organic waste",output:"Methane-rich fuel",best:"Animal manure, sewage and plant waste",limits:"Requires controlled anaerobic digestion and gas handling."},
  {id:"wave",name:"Wave energy",input:"Motion of sea waves",output:"Electrical energy",best:"Coasts with suitable wave resource",limits:"Marine engineering, corrosion, storms and cost."},
];

function SourceView(){
  const [id,setId]=useState("solar-pv");
  const item=SOURCES.find(row=>row.id===id);
  return <div className="spark-alt-source">
    <div className="spark-alt-source-buttons">{SOURCES.map(row=><button type="button" key={row.id} className={id===row.id?"active":""} onClick={()=>setId(row.id)}>{row.name}</button>)}</div>
    <article><span>{item.name.toUpperCase()}</span><h4>{item.input} → {item.output}</h4><div><b>Best suited to</b><p>{item.best}</p></div><div><b>Limitation</b><p>{item.limits}</p></div></article>
  </div>;
}

function SolarView(){
  return <div className="spark-alt-solar">
    <article>
      <span>PHOTOVOLTAIC CELL</span>
      <h4>Light → electrical energy</h4>
      <svg viewBox="0 0 560 250" role="img" aria-label="Sunlight striking a photovoltaic panel and producing electrical energy">
        <circle className="ae-sun" cx="90" cy="70" r="38"/>
        <path className="ae-ray" d="M135 85L250 130M130 55L250 105M120 105L245 150"/>
        <polygon className="ae-panel" points="250,75 455,115 410,205 205,165"/>
        <path className="ae-wire" d="M410 205Q470 215 500 170"/>
        <text className="ae-label" x="405" y="235" textAnchor="middle">electric current</text>
      </svg>
      <p>A photovoltaic cell produces electricity directly from light. It is different from a solar water heater.</p>
    </article>
    <article>
      <span>SOLAR WATER HEATER</span>
      <h4>Radiation → thermal energy in water</h4>
      <svg viewBox="0 0 560 250" role="img" aria-label="Black solar collector warming water and an insulated hot-water storage tank">
        <circle className="ae-sun" cx="90" cy="65" r="38"/>
        <path className="ae-ray" d="M130 80L235 125M125 50L235 100"/>
        <rect className="ae-collector" x="220" y="95" width="165" height="95" rx="8"/>
        <rect className="ae-tank" x="430" y="75" width="75" height="130" rx="22"/>
        <path className="ae-pipe" d="M385 110Q420 110 430 105M385 175Q420 175 430 180"/>
        <text className="ae-label" x="302" y="220" textAnchor="middle">dark collector absorbs radiation</text>
      </svg>
      <p>Dark surfaces absorb radiation well. The storage tank is insulated to reduce heat loss from hot water.</p>
    </article>
  </div>;
}

function CaribbeanView(){
  return <div className="spark-alt-caribbean">
    <article><span>DOMINICA</span><h4>Geothermal now in commercial operation</h4><p>Dominica’s geothermal plant reached commercial operation on July 31, 2026, adding geothermal electricity to the island grid.</p></article>
    <article><span>SAINT LUCIA</span><h4>Geothermal exploration</h4><p>Saint Lucia is procuring drilling services for exploratory geothermal wells to assess whether the resource is suitable for future power generation.</p></article>
    <article><span>GUYANA</span><h4>Solar and mini-hydro expansion</h4><p>Guyana is expanding solar farms and mini-hydropower systems, while larger hydropower development is also under consideration.</p></article>
    <article><span>SURINAME</span><h4>Operating hydropower</h4><p>The Afobaka hydroelectric dam is a major part of Suriname’s renewable electricity supply.</p></article>
    <article><span>SUGAR INDUSTRY</span><h4>Bagasse</h4><p>Bagasse, the fibre left after sugar cane is crushed, can fuel boilers to produce steam and electricity.</p></article>
    <article><span>REGIONAL ENERGY SECURITY</span><h4>Reduce imported-fuel dependence</h4><p>Locally available renewable sources can reduce exposure to imported fuel costs and keep more energy spending within the region.</p></article>
  </div>;
}

function SolarCookerView(){
  return <div className="spark-solar-cooker">
    <svg viewBox="0 0 820 450" role="img" aria-label="Box solar cooker with reflector, glass cover, dark pot and insulated box">
      <path className="aec-box" d="M225 215H645V390H225Z"/>
      <path className="aec-reflector" d="M225 215L145 60L310 60L355 215Z"/>
      <rect className="aec-glass" x="250" y="225" width="365" height="18" rx="5"/>
      <rect className="aec-pot" x="365" y="265" width="140" height="85" rx="18"/>
      <path className="aec-ray" d="M50 35L185 125M75 5L225 105M350 20L410 250"/>
      <text className="aec-label" x="125" y="185">reflector redirects sunlight</text>
      <text className="aec-label" x="435" y="375" textAnchor="middle">dark pot absorbs radiation</text>
      <text className="aec-label" x="435" y="418" textAnchor="middle">insulated box reduces heat loss</text>
    </svg>
    <div className="spark-solar-cooker-notes"><p>Solar cookers use free solar energy and produce no smoke during operation.</p><p>A transparent cover reduces convective heat loss, while reflective surfaces direct more radiation towards the dark cooking vessel.</p><p>They depend on suitable sunshine and cook more slowly than some fuel-fired methods.</p></div>
  </div>;
}

function EvaluateView(){
  const criteria=[
    ["Resource availability","Is there strong sunshine, reliable wind, flowing water, geothermal heat, biomass or wave energy?"],
    ["Reliability","Does output vary with weather or time, and is storage or backup needed?"],
    ["Initial and operating cost","Some systems have high installation cost but low fuel cost."],
    ["Environmental effects","Consider emissions, land or water disturbance, wildlife and material use."],
    ["Social benefit","Reliable electricity can support homes, schools, clinics and local businesses."],
    ["Economic benefit","Local renewables can reduce fuel imports and exposure to international fuel prices."],
  ];
  return <div className="spark-alt-evaluate">{criteria.map(([name,text],i)=><article key={name}><span>{i+1}</span><div><b>{name}</b><p>{text}</p></div></article>)}</div>;
}

export default function AlternativeEnergyExplorer(){
  const [view,setView]=useState("sources");
  const summary=useMemo(()=>({
    sources:"No single renewable source suits every location. Match technology to the local resource.",
    solar:"Photovoltaic and solar-thermal systems use sunlight in different ways.",
    caribbean:"Regional examples are changing as projects move from exploration to operation.",
    cooker:"Solar cookers convert solar radiation to heat without burning fuel during use.",
    evaluate:"A sound energy choice weighs technical, environmental, social and economic factors.",
  })[view],[view]);

  return <section className="spark-alternative-energy">
    <header><span>ALTERNATIVE ENERGY</span><h3>Match renewable technologies to Caribbean resources and needs</h3><p>Alternative and renewable sources can reduce fossil-fuel use, but their suitability depends on geography, resource quality, cost, reliability, environmental effects and community needs.</p></header>
    <div className="spark-alt-tabs">{[["sources","Energy sources"],["solar","Solar systems"],["caribbean","Caribbean examples"],["cooker","Solar cooker"],["evaluate","Evaluate a source"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-alt-stage">
      {view==="sources"&&<SourceView/>}
      {view==="solar"&&<SolarView/>}
      {view==="caribbean"&&<CaribbeanView/>}
      {view==="cooker"&&<SolarCookerView/>}
      {view==="evaluate"&&<EvaluateView/>}
    </div>
    <div className="spark-alt-summary"><strong>{summary}</strong><span>Wind and solar produce no direct greenhouse-gas emissions during normal operation, but every energy system still has material, land, construction and end-of-life impacts to consider.</span></div>
  </section>;
}

export { SOURCES };
