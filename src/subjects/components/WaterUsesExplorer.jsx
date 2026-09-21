import React,{useMemo,useState} from "react";
import "./waterUsesExplorer.css";

function BodyView(){
  return <div className="spark-water-body-use">
    <article><span>TRANSPORT</span><h4>Blood plasma carries dissolved substances</h4><p>Water is the main solvent in plasma, allowing nutrients, hormones, mineral ions and wastes to move around the body.</p></article>
    <article><span>DIGESTION</span><h4>Food is processed in an aqueous medium</h4><p>Digestive enzymes act in watery fluids, and water participates in hydrolysis reactions during digestion.</p></article>
    <article><span>EXCRETION</span><h4>Wastes leave in solution</h4><p>Urea, excess salts and other wastes are carried in water as urine.</p></article>
    <article><span>TEMPERATURE</span><h4>Sweating and heat transport</h4><p>Water helps distribute heat in blood and cools the body when sweat evaporates.</p></article>
  </div>;
}

function HomeView(){
  const [daily,setDaily]=useState(150);
  const [days,setDays]=useState(30);
  const litres=Math.max(0,Number(daily)||0)*Math.max(0,Number(days)||0);
  const m3=litres/1000;
  return <div className="spark-water-home">
    <div className="spark-water-use-cards">
      <article><span>HIGH USE</span><h4>Bathing and flushing toilets</h4><p>These commonly account for a large share of household water demand.</p></article>
      <article><span>LOWER USE</span><h4>Drinking and cooking</h4><p>Essential uses, but usually much smaller in volume than washing and sanitation.</p></article>
    </div>
    <div className="spark-water-calculator">
      <label>Daily use, litres<input type="number" min="0" value={daily} onChange={e=>setDaily(e.target.value)}/></label>
      <label>Number of days<input type="number" min="0" value={days} onChange={e=>setDays(e.target.value)}/></label>
      <strong>{litres.toLocaleString()} L = {m3.toFixed(2)} m³</strong>
      <p>Example: 150 L each day for 30 days gives 4 500 L. Similarly, 0.4 m³ each day for 30 days gives 12 m³.</p>
    </div>
  </div>;
}

function ConservationView(){
  return <div className="spark-water-conservation">
    <article><span>FIX LEAKS</span><h4>Stop continuous waste</h4><p>A leaking pipe or toilet can waste water all day, so repair is one of the most effective household conservation measures.</p></article>
    <article><span>TURN OFF TAPS</span><h4>Use only what is needed</h4><p>Do not leave water running while brushing teeth, shaving or washing dishes between stages.</p></article>
    <article><span>WATER AT COOLER TIMES</span><h4>Reduce evaporation loss</h4><p>Gardens lose less water to evaporation when watered in the early morning or evening rather than at midday.</p></article>
    <article><span>USE BUCKETS OR EFFICIENT NOZZLES</span><h4>Control flow</h4><p>Avoid continuously running hoses for washing vehicles or outdoor surfaces.</p></article>
  </div>;
}

function AgricultureView(){
  const [mode,setMode]=useState("aquaculture");
  const data={
    aquaculture:{title:"Aquaculture",text:"Farming aquatic organisms in controlled water environments such as ponds, tanks, cages or raceways. Fish farming in ponds on land is aquaculture."},
    mariculture:{title:"Mariculture",text:"A form of aquaculture carried out in marine or coastal water. Examples include farming oysters, seaweed and marine fish."},
    hydroponics:{title:"Hydroponics",text:"Growing plants without soil while roots receive water containing dissolved mineral nutrients."}
  }[mode];
  return <div className="spark-water-agriculture">
    <div className="spark-water-toggle">{Object.keys(data?{}:{} )}</div>
    <div className="spark-water-agri-buttons">{["aquaculture","mariculture","hydroponics"].map(k=><button type="button" key={k} className={mode===k?"active":""} onClick={()=>setMode(k)}>{k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.title}</h4><p>{data.text}</p></article>
    {mode==="hydroponics"&&<div className="spark-hydroponic-model"><div className="spark-plant">plant</div><div className="spark-roots">roots</div><div className="spark-nutrient-water">nutrient solution</div></div>}
  </div>;
}

function EnergyView(){
  return <div className="spark-water-energy-use">
    <article><span>HYDROELECTRICITY</span><h4>Moving water turns turbines</h4><p>Gravitational potential energy of stored water becomes kinetic energy and then electrical energy through a turbine and generator.</p></article>
    <article><span>STEAM</span><h4>Industrial power and processing</h4><p>Water is heated to produce steam in many industrial systems and power stations.</p></article>
    <article><span>COOLING</span><h4>High specific heat capacity</h4><p>Water can absorb a large quantity of heat with a relatively small temperature rise, making it useful as a coolant.</p></article>
  </div>;
}

function FireView(){
  return <div className="spark-water-fire">
    <article><span>WHY WATER WORKS</span><h4>Removes heat</h4><p>For many ordinary combustible materials, water absorbs heat and cools the fuel below the temperature needed to continue burning.</p></article>
    <article className="warning"><span>IMPORTANT LIMIT</span><h4>Not for every fire</h4><p>Water should not be used on live electrical equipment or burning cooking oil. Firefighting method must match the type of fire.</p></article>
  </div>;
}

function CycleView(){
  return <div className="spark-water-cycle-use">
    <svg viewBox="0 0 860 450" role="img" aria-label="Simplified water cycle showing evaporation condensation precipitation runoff and infiltration">
      <rect className="wu-sea" x="0" y="300" width="860" height="150"/>
      <path className="wu-mountain" d="M470 300L650 105L810 300Z"/>
      <circle className="wu-sun" cx="105" cy="90" r="50"/>
      <path className="wu-evap" d="M190 310Q185 215 250 165"/>
      <path className="wu-cloud" d="M260 135Q300 85 350 125Q405 80 455 135Q440 175 290 175Z"/>
      <path className="wu-rain" d="M340 180V260M380 180V265M420 180V255"/>
      <path className="wu-runoff" d="M650 150Q610 240 540 315"/>
      <path className="wu-infiltration" d="M600 300V390"/>
      <text className="wu-label" x="210" y="205">evaporation</text><text className="wu-label" x="350" y="105">condensation</text><text className="wu-label" x="430" y="245">precipitation</text><text className="wu-label" x="565" y="250">run-off</text><text className="wu-label" x="610" y="405">infiltration</text>
    </svg>
    <p>The water cycle continually moves water through evaporation, condensation, precipitation, run-off and infiltration. Precipitation renews rivers, reservoirs and groundwater used by people and ecosystems.</p>
  </div>;
}

export default function WaterUsesExplorer(){
  const [view,setView]=useState("body");
  const summary=useMemo(()=>({
    body:"Water is essential for transport, digestion, excretion and temperature regulation in the human body.",
    home:"Household water use can be measured in litres or cubic metres and added over time.",
    conservation:"Conservation reduces unnecessary demand while protecting reliable supply.",
    agriculture:"Aquaculture, mariculture and hydroponics use water in different ways.",
    energy:"Water is used to generate electricity, make steam and remove heat.",
    fire:"Water extinguishes many fires mainly by cooling, but it is unsafe for some fire classes.",
    cycle:"The water cycle renews freshwater stores through processes including precipitation."
  })[view],[view]);

  return <section className="spark-water-uses">
    <header><span>USES OF WATER</span><h3>Connect water to human biology, homes, agriculture, energy and industry</h3><p>Water is used because of its solvent properties, heat capacity, abundance and ability to move energy and materials through natural and engineered systems.</p></header>
    <div className="spark-water-use-tabs">{[["body","Human body"],["home","Home use"],["conservation","Conservation"],["agriculture","Agriculture"],["energy","Energy and industry"],["fire","Fire and cooling"],["cycle","Water cycle"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-water-use-stage">{view==="body"&&<BodyView/>}{view==="home"&&<HomeView/>}{view==="conservation"&&<ConservationView/>}{view==="agriculture"&&<AgricultureView/>}{view==="energy"&&<EnergyView/>}{view==="fire"&&<FireView/>}{view==="cycle"&&<CycleView/>}</div>
    <div className="spark-water-use-summary"><strong>{summary}</strong><span>1 m³ = 1 000 litres.</span></div>
  </section>;
}
