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

function EnergySourceDiagram({id}){
  if(id==="solar-pv") return <svg className="spark-alt-source-svg" viewBox="0 0 620 360" role="img" aria-label="Solar photovoltaic system converting sunlight to electrical energy">
    <circle className="aes-sun" cx="95" cy="75" r="42"/>
    <path className="aes-ray" d="M145 90L275 140M140 58L278 112M130 120L265 165"/>
    <polygon className="aes-panel" points="270,100 490,145 440,255 220,210"/>
    <path className="aes-cable" d="M440 255Q505 270 540 225"/>
    <rect className="aes-load" x="520" y="180" width="55" height="70" rx="8"/>
    <text className="aes-label" x="350" y="300" textAnchor="middle">photovoltaic panel</text>
    <text className="aes-caption" x="310" y="335" textAnchor="middle">light energy → electrical energy</text>
  </svg>;

  if(id==="solar-thermal") return <svg className="spark-alt-source-svg" viewBox="0 0 620 360" role="img" aria-label="Solar thermal collector heating water stored in an insulated tank">
    <circle className="aes-sun" cx="85" cy="70" r="40"/>
    <path className="aes-ray" d="M130 85L240 135M126 52L245 108"/>
    <rect className="aes-collector" x="225" y="105" width="180" height="105" rx="10"/>
    <path className="aes-pipe hot" d="M405 125Q455 125 465 100"/>
    <path className="aes-pipe cool" d="M405 190Q455 190 465 220"/>
    <rect className="aes-tank" x="465" y="70" width="85" height="190" rx="28"/>
    <path className="aes-water-level" d="M475 145H540"/>
    <text className="aes-label" x="315" y="245" textAnchor="middle">dark solar collector</text>
    <text className="aes-caption" x="310" y="325" textAnchor="middle">solar radiation → thermal energy in water</text>
  </svg>;

  if(id==="wind") return <svg className="spark-alt-source-svg" viewBox="0 0 620 360" role="img" aria-label="Wind turbine driving a generator to produce electrical energy">
    <path className="aes-ground" d="M25 300Q310 275 595 300"/>
    <path className="aes-wind" d="M35 90H220M55 130H235M30 170H205"/>
    <path className="aes-tower" d="M350 115L325 300H375Z"/>
    <circle className="aes-nacelle" cx="350" cy="110" r="20"/>
    <g className="aes-blades">
      <path d="M350 110L350 25Q376 50 365 95Z"/>
      <path d="M350 110L435 145Q400 157 365 125Z"/>
      <path d="M350 110L270 150Q278 116 333 105Z"/>
    </g>
    <path className="aes-cable" d="M375 285Q445 300 520 275"/>
    <rect className="aes-load" x="515" y="245" width="55" height="55" rx="8"/>
    <text className="aes-label" x="350" y="335" textAnchor="middle">turbine blades turn a generator in the nacelle</text>
  </svg>;

  if(id==="hydro") return <svg className="spark-alt-source-svg" viewBox="0 0 620 360" role="img" aria-label="Hydroelectric dam with reservoir penstock turbine and generator">
    <path className="aes-hill" d="M0 135Q115 60 230 130V330H0Z"/>
    <path className="aes-reservoir" d="M0 145H250V235H0Z"/>
    <path className="aes-dam" d="M245 115L305 305H225Z"/>
    <path className="aes-penstock" d="M250 185Q330 205 390 255"/>
    <circle className="aes-turbine" cx="410" cy="270" r="34"/>
    <rect className="aes-generator" x="455" y="235" width="85" height="70" rx="12"/>
    <path className="aes-cable" d="M540 270H590"/>
    <path className="aes-water-out" d="M400 310Q480 335 590 315"/>
    <text className="aes-label" x="115" y="125">reservoir</text>
    <text className="aes-label" x="335" y="220">penstock</text>
    <text className="aes-caption" x="390" y="345" textAnchor="middle">falling water → turbine → generator → electricity</text>
  </svg>;

  if(id==="geothermal") return <svg className="spark-alt-source-svg" viewBox="0 0 620 360" role="img" aria-label="Geothermal power system with injection well production well hot rock steam turbine and generator">
    <path className="aes-ground" d="M0 105H620"/>
    <path className="aes-hot-rock" d="M0 245Q150 215 310 250T620 240V360H0Z"/>
    <path className="aes-injection-well" d="M120 95V270Q120 290 145 295"/>
    <path className="aes-production-well" d="M300 285Q325 280 325 255V95"/>
    <path className="aes-fluid-arrow down" d="M120 125V230"/>
    <path className="aes-fluid-arrow up" d="M325 235V125"/>
    <path className="aes-steam-line" d="M325 95H425"/>
    <circle className="aes-turbine" cx="455" cy="95" r="32"/>
    <rect className="aes-generator" x="495" y="65" width="80" height="60" rx="10"/>
    <text className="aes-label" x="100" y="325">injection well</text>
    <text className="aes-label" x="315" y="325">production well</text>
    <text className="aes-caption" x="310" y="350" textAnchor="middle">Earth's heat transfers energy to circulating water</text>
  </svg>;

  if(id==="biomass") return <svg className="spark-alt-source-svg" viewBox="0 0 620 360" role="img" aria-label="Biomass energy system using plant material in a boiler to produce steam and electricity">
    <g className="aes-cane">
      <path d="M70 270V90M105 270V75M140 270V100"/>
      <path d="M70 140Q35 120 25 145M105 125Q145 105 160 130M140 170Q175 150 190 175"/>
    </g>
    <path className="aes-biomass-arrow" d="M180 210H255"/>
    <rect className="aes-boiler" x="260" y="120" width="110" height="150" rx="14"/>
    <path className="aes-flame" d="M292 238Q315 195 335 235Q350 210 360 245Q333 265 310 265Z"/>
    <path className="aes-steam-line" d="M370 150H435"/>
    <circle className="aes-turbine" cx="465" cy="150" r="30"/>
    <rect className="aes-generator" x="505" y="120" width="75" height="60" rx="10"/>
    <text className="aes-label" x="105" y="310" textAnchor="middle">bagasse / plant material</text>
    <text className="aes-caption" x="390" y="325" textAnchor="middle">chemical energy → heat → steam → electricity</text>
  </svg>;

  if(id==="biogas") return <svg className="spark-alt-source-svg" viewBox="0 0 620 360" role="img" aria-label="Anaerobic biogas digester converting organic waste to methane-rich gas">
    <path className="aes-feed" d="M45 110H170L205 170"/>
    <rect className="aes-digester" x="185" y="150" width="255" height="130" rx="50"/>
    <path className="aes-slurry" d="M205 225Q310 195 420 225V265H205Z"/>
    <path className="aes-gas-dome" d="M235 190Q310 130 390 190"/>
    <circle className="aes-gas-bubble" cx="280" cy="190" r="9"/><circle className="aes-gas-bubble" cx="325" cy="178" r="7"/><circle className="aes-gas-bubble" cx="365" cy="195" r="8"/>
    <path className="aes-gas-pipe" d="M315 145V80H505"/>
    <path className="aes-flame" d="M525 65Q545 30 560 65Q545 100 525 65Z"/>
    <path className="aes-outlet" d="M440 230H565"/>
    <text className="aes-label" x="110" y="92">organic waste + water</text>
    <text className="aes-label" x="310" y="315" textAnchor="middle">anaerobic digester</text>
    <text className="aes-caption" x="310" y="345" textAnchor="middle">microorganisms produce methane-rich biogas without oxygen</text>
  </svg>;

  return <svg className="spark-alt-source-svg" viewBox="0 0 620 360" role="img" aria-label="Wave energy device converting ocean motion to electrical energy">
    <path className="aes-sea-wave" d="M0 190Q70 135 140 190T280 190T420 190T560 190T700 190V360H0Z"/>
    <path className="aes-wave-device" d="M310 90V255"/>
    <ellipse className="aes-wave-float" cx="310" cy="178" rx="55" ry="28"/>
    <path className="aes-motion-arrow" d="M385 130V230"/>
    <rect className="aes-generator" x="445" y="115" width="105" height="75" rx="12"/>
    <path className="aes-cable" d="M365 178H445"/>
    <text className="aes-label" x="310" y="290" textAnchor="middle">moving float</text>
    <text className="aes-caption" x="310" y="330" textAnchor="middle">wave motion drives a mechanical or hydraulic generator system</text>
  </svg>;
}

function SourceView(){
  const [id,setId]=useState("solar-pv");
  const item=SOURCES.find(row=>row.id===id);
  return <div className="spark-alt-source">
    <div className="spark-alt-source-buttons">{SOURCES.map(row=><button type="button" key={row.id} className={id===row.id?"active":""} onClick={()=>setId(row.id)}>{row.name}</button>)}</div>
    <article><span>{item.name.toUpperCase()}</span><h4>{item.input} → {item.output}</h4><EnergySourceDiagram id={item.id}/><div><b>Best suited to</b><p>{item.best}</p></div><div><b>Limitation</b><p>{item.limits}</p></div></article>
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
