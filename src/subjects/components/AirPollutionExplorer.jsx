import React,{useMemo,useState} from "react";
import "./airPollutionExplorer.css";

const POLLUTANTS=[
  {id:"pm",name:"Smoke and fine particles",source:"Vehicle exhaust, open burning, fires, industry and dust-generating activities.",health:"Can irritate airways and worsen asthma and other respiratory disease.",environment:"Reduces visibility and can deposit on leaves and surfaces."},
  {id:"co",name:"Carbon monoxide",source:"Incomplete combustion in engines, generators, fires and poorly ventilated fuel-burning appliances.",health:"Binds strongly to haemoglobin and reduces the blood's ability to carry oxygen.",environment:"Important mainly as a toxic air pollutant and participant in atmospheric chemistry."},
  {id:"so2",name:"Sulfur dioxide",source:"Burning sulfur-containing fuels and some industrial processes.",health:"Irritates the respiratory system and can worsen asthma.",environment:"Contributes to acid deposition after atmospheric reactions."},
  {id:"nox",name:"Nitrogen oxides",source:"High-temperature combustion in engines and power generation.",health:"Can irritate airways and contribute to unhealthy air mixtures.",environment:"Contributes to acid deposition and ground-level ozone formation."},
  {id:"dust",name:"Dust",source:"Quarries, construction, unpaved surfaces and dry disturbed soil.",health:"Can irritate eyes and airways; some dusts present additional hazards depending on composition.",environment:"Can coat leaves, reduce light and interfere with stomata."},
  {id:"pollen",name:"Pollen",source:"Flowering plants.",health:"A natural airborne particle that can trigger allergies and asthma in sensitive people.",environment:"Normally part of plant reproduction rather than a human-made pollutant."}
];

function SourcesView(){
  const [id,setId]=useState("pm");
  const p=POLLUTANTS.find(x=>x.id===id);
  return <div className="spark-airpollution-sources">
    <div className="spark-airpollution-buttons">{POLLUTANTS.map(x=><button type="button" key={x.id} className={id===x.id?"active":""} onClick={()=>setId(x.id)}>{x.name}</button>)}</div>
    <article><span>{p.name.toUpperCase()}</span><h4>Typical sources</h4><p>{p.source}</p><strong>Health</strong><p>{p.health}</p><strong>Environment</strong><p>{p.environment}</p></article>
  </div>;
}

function AcidRainView(){
  return <div className="spark-acid-rain">
    <svg className="spark-acidrain-diagram" viewBox="0 0 920 470" role="img" aria-label="Acid rain formation showing sulfur dioxide and nitrogen oxides rising from combustion sources, atmospheric reactions in clouds and acidic deposition on land and water">
      <defs>
        <marker id="air-acid-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="ap-arrow-head"/></marker>
      </defs>
      <rect className="ap-sky" x="0" y="0" width="920" height="315"/>
      <path className="ap-ground" d="M0 315Q180 278 350 318Q530 270 700 310Q810 282 920 305V470H0Z"/>
      <path className="ap-water" d="M620 357Q746 326 920 355V470H620Z"/>
      <rect className="ap-factory" x="90" y="245" width="128" height="92" rx="5"/>
      <rect className="ap-stack" x="112" y="157" width="34" height="91"/>
      <rect className="ap-stack" x="171" y="185" width="30" height="63"/>
      <path className="ap-smoke" d="M128 151Q99 119 132 94Q165 70 183 104Q215 98 222 126Q203 157 163 151Z"/>
      <path className="ap-emission" d="M190 139Q315 88 399 122" markerEnd="url(#air-acid-arrow)"/>
      <text className="ap-label" x="284" y="87" textAnchor="middle">SO₂ + NOₓ</text>

      <path className="ap-cloud" d="M410 96Q430 51 478 66Q508 25 557 61Q604 44 628 82Q671 76 684 115Q675 151 629 151H438Q396 147 398 118Q399 103 410 96Z"/>
      <text className="ap-label" x="542" y="103" textAnchor="middle">atmospheric oxidation</text>
      <text className="ap-small" x="542" y="126" textAnchor="middle">acidic sulfate and nitrate compounds form</text>

      <path className="ap-rain" d="M451 160L425 226M505 160L478 241M559 160L535 228M615 160L589 244"/>
      <path className="ap-deposition-arrow" d="M650 148Q736 188 752 273" markerEnd="url(#air-acid-arrow)"/>
      <text className="ap-label" x="755" y="203" textAnchor="middle">acid deposition</text>

      <path className="ap-tree-trunk" d="M340 286V385"/>
      <path className="ap-tree" d="M340 218Q292 245 309 292Q269 306 300 340Q340 358 376 337Q414 315 380 288Q395 248 340 218Z"/>
      <path className="ap-building" d="M485 300H583V405H485Z"/>
      <path className="ap-roof" d="M470 300L534 249L598 300Z"/>
      <text className="ap-small" x="335" y="420" textAnchor="middle">soil + vegetation</text>
      <text className="ap-small" x="536" y="434" textAnchor="middle">limestone structures</text>
      <text className="ap-small" x="770" y="421" textAnchor="middle">lakes and streams</text>
      <text className="ap-small" x="149" y="365" textAnchor="middle">combustion source</text>
    </svg>
    <div className="spark-acidrain-flow">
      <article><span>1</span><b>SO₂ and NOₓ released</b><p>Combustion and industrial sources release sulfur dioxide and nitrogen oxides.</p></article><div>→</div>
      <article><span>2</span><b>Atmospheric reactions</b><p>The gases react with water and oxidants in the atmosphere to form acidic compounds.</p></article><div>→</div>
      <article><span>3</span><b>Acid deposition</b><p>Acidic rain or dry deposition reaches soil, vegetation, water and buildings.</p></article>
    </div>
    <div className="spark-acidrain-effects">
      <article><span>SOIL</span><h4>Nutrients can be leached</h4><p>Increasing soil acidity can remove useful mineral ions and change nutrient availability.</p></article>
      <article><span>LEAVES</span><h4>Plant tissues can be damaged</h4><p>Acidic deposition can stress vegetation directly and indirectly through soil changes.</p></article>
      <article><span>LIMESTONE</span><h4>Carbonate stone is attacked</h4><p>Acids react with calcium carbonate in limestone buildings and monuments.</p></article>
    </div>
  </div>;
}

function PlantDustView(){
  const [dust,setDust]=useState(false);
  return <div className="spark-dust-leaf">
    <div className="spark-airpollution-toggle"><button type="button" className={!dust?"active":""} onClick={()=>setDust(false)}>Clean leaf</button><button type="button" className={dust?"active":""} onClick={()=>setDust(true)}>Dust-coated leaf</button></div>
    <svg className={"spark-leaf-dust-svg "+(dust?"dusty":"clean")} viewBox="0 0 940 520" role="img" aria-label={dust?"Leaf cross-section with dust blocking light and partly covering stomata":"Clean leaf cross-section showing light reaching palisade cells and carbon dioxide entering through an open stoma"}>
      <defs>
        <marker id="leaf-light-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="ld-light-head"/></marker>
        <marker id="leaf-gas-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="ld-gas-head"/></marker>
      </defs>
      <rect className="ld-air" x="0" y="0" width="940" height="520"/>
      <path className="ld-cuticle" d="M95 135Q470 92 845 135L830 168Q470 132 110 168Z"/>
      <path className="ld-upper-epidermis" d="M110 168Q470 132 830 168L818 205Q470 173 122 205Z"/>
      <g className="ld-palisade">
        {Array.from({length:12},(_,i)=><rect key={i} x={140+i*55} y={205+(i%2)*4} width="39" height={dust?112:122} rx="15"/>)}
      </g>
      <path className="ld-spongy" d="M125 332Q220 290 310 340Q410 292 505 340Q610 292 705 340Q770 310 815 345L805 407Q700 384 610 414Q505 378 410 414Q300 375 205 414Q160 401 135 392Z"/>
      <path className="ld-lower-epidermis" d="M135 407Q470 382 805 407L795 448Q470 430 145 448Z"/>
      <ellipse className="ld-guard-cell" cx="455" cy="439" rx="38" ry="17" transform="rotate(-18 455 439)"/>
      <ellipse className="ld-guard-cell" cx="515" cy="439" rx="38" ry="17" transform="rotate(18 515 439)"/>
      <ellipse className={dust?"ld-stoma partly-blocked":"ld-stoma"} cx="485" cy="440" rx={dust?10:18} ry={dust?5:8}/>
      <text className="ld-label" x="485" y="487" textAnchor="middle">stoma</text>
      <text className="ld-small" x="170" y="188">upper epidermis</text>
      <text className="ld-small" x="170" y="270">palisade cells</text>
      <text className="ld-small" x="170" y="366">spongy mesophyll</text>

      <path className={dust?"ld-light reduced":"ld-light"} d="M250 35V188" markerEnd="url(#leaf-light-arrow)"/>
      <path className={dust?"ld-light reduced":"ld-light"} d="M390 25V190" markerEnd="url(#leaf-light-arrow)"/>
      <path className={dust?"ld-light reduced":"ld-light"} d="M535 25V190" markerEnd="url(#leaf-light-arrow)"/>
      <path className={dust?"ld-light reduced":"ld-light"} d="M680 35V188" markerEnd="url(#leaf-light-arrow)"/>
      <text className="ld-label" x="465" y="55" textAnchor="middle">{dust?"less light reaches photosynthetic tissue":"light reaches photosynthetic tissue"}</text>

      {!dust&&<g className="ld-gas-flow">
        <path d="M485 505V463" markerEnd="url(#leaf-gas-arrow)"/>
        <text className="ld-label" x="565" y="495">CO₂ enters</text>
        <path d="M610 423Q650 462 692 482" markerEnd="url(#leaf-gas-arrow)"/>
        <text className="ld-small" x="705" y="490">O₂ and water vapour leave</text>
      </g>}

      {dust&&<g className="ld-dust-layer">
        {Array.from({length:34},(_,i)=><circle key={i} cx={125+(i*67)%700} cy={115+((i*29)%31)} r={6+(i%4)}/>)}
        {Array.from({length:10},(_,i)=><circle key={"s"+i} cx={440+(i*11)} cy={426+(i%3)*8} r={5+(i%2)}/>)}
        <path className="ld-block-mark" d="M435 462L535 420M435 420L535 462"/>
        <text className="ld-warning" x="610" y="454">dust can partly cover stomata</text>
        <text className="ld-warning" x="465" y="92" textAnchor="middle">dust layer scatters and blocks some incoming light</text>
      </g>}
    </svg>
    <p>{dust?"Heavy dust deposits can reduce light reaching the leaf surface and interfere with stomatal gas exchange, lowering photosynthesis and growth.":"A clean leaf surface receives light and allows normal gas exchange through stomata."}</p>
  </div>;
}

function HealthView(){
  return <div className="spark-airpollution-health">
    <article><span>ASTHMA</span><h4>Pollution can trigger attacks</h4><p>Smoke, particles, ozone-forming pollution, sulfur dioxide, nitrogen dioxide, pollen and dust can worsen symptoms in susceptible people.</p></article>
    <article><span>ALLERGIES</span><h4>Pollen and dust can trigger responses</h4><p>Airborne allergens may cause sneezing, eye irritation, hay fever or asthma symptoms.</p></article>
    <article><span>CHRONIC LUNG DAMAGE</span><h4>Long-term exposure matters</h4><p>Smoking is a major cause of emphysema and COPD. Outdoor and household air pollution can also contribute to chronic respiratory harm.</p></article>
    <article><span>CARBON MONOXIDE</span><h4>Reduces oxygen transport</h4><p>CO exposure is especially dangerous in enclosed or poorly ventilated spaces where combustion occurs.</p></article>
  </div>;
}

function BurningView(){
  return <div className="spark-open-burning">
    <article><span>OPEN GARBAGE BURNING</span><h4>Smoke is a complex pollutant mixture</h4><p>Open burning releases particulate matter, carbon monoxide and other harmful gases and vapours. Burning mixed waste, especially plastics and treated materials, can also create hazardous organic compounds.</p></article>
    <article><span>PLASTICS</span><h4>Do not assume one toxin from every plastic</h4><p>The exact emissions depend on the polymer, additives and burning conditions. Some chlorine-containing materials can contribute to formation of highly toxic chlorinated compounds during poor combustion.</p></article>
    <article><span>BETTER PRACTICE</span><h4>Use approved waste collection and treatment</h4><p>Reducing, reusing, recycling and properly managing residual waste avoids uncontrolled neighbourhood smoke exposure.</p></article>
  </div>;
}

function SolutionsView(){
  return <div className="spark-airpollution-solutions">
    <article><span>TRANSPORT</span><h4>Reduce unnecessary vehicle emissions</h4><p>Public transport, walking, cycling, car-sharing and well-maintained vehicles can reduce emissions per person.</p></article>
    <article><span>NO OPEN BURNING</span><h4>Keep smoke out of communities</h4><p>Use proper waste collection rather than burning household garbage.</p></article>
    <article><span>INDUSTRY</span><h4>Control emissions at source</h4><p>Cleaner fuels, process controls, filters, scrubbers and compliance monitoring can reduce industrial pollutants.</p></article>
    <article><span>GREEN SPACE</span><h4>Trees can provide local benefits</h4><p>Vegetation can capture some airborne particles and provides shade, but planting trees does not replace emission reduction at source.</p></article>
  </div>;
}

export default function AirPollutionExplorer(){
  const [view,setView]=useState("sources");
  const summary=useMemo(()=>({
    sources:"Air pollution includes harmful gases and particles from combustion, industry, dust-generating activities and other sources.",
    acid:"Sulfur dioxide and nitrogen oxides contribute to acid deposition; carbon monoxide does not.",
    plants:"Dust can coat leaves, reduce light and interfere with stomatal gas exchange.",
    health:"Air pollution can worsen asthma, trigger allergies and contribute to respiratory and cardiovascular harm.",
    burning:"Open waste burning creates uncontrolled smoke and toxic exposures and should be avoided.",
    solutions:"The most effective approach is to reduce emissions at source while improving transport, waste management and industrial controls."
  })[view],[view]);

  return <section className="spark-air-pollution">
    <header><span>AIR POLLUTION</span><h3>Connect pollutants to their sources, health effects and environmental damage</h3><p>Air pollution occurs when gases or particles are present at concentrations that harm health, ecosystems, materials or quality of life.</p></header>
    <div className="spark-airpollution-tabs">{[["sources","Pollutants"],["acid","Acid rain"],["plants","Dust and plants"],["health","Health effects"],["burning","Open burning"],["solutions","Reduce pollution"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-airpollution-stage">{view==="sources"&&<SourcesView/>}{view==="acid"&&<AcidRainView/>}{view==="plants"&&<PlantDustView/>}{view==="health"&&<HealthView/>}{view==="burning"&&<BurningView/>}{view==="solutions"&&<SolutionsView/>}</div>
    <div className="spark-airpollution-summary"><strong>{summary}</strong><span>SO₂ and NOₓ contribute to acid rain. Carbon monoxide is poisonous but is not a principal acid-rain gas.</span></div>
  </section>;
}

export { POLLUTANTS };
