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
    <div className={"spark-leaf-model "+(dust?"dusty":"clean")}><div className="spark-leaf-blade"></div>{dust&&Array.from({length:24},(_,i)=><span key={i} style={{left:(12+(i*19)%75)+"%",top:(10+(i*23)%70)+"%"}}></span>)}</div>
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
