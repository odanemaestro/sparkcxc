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
    <div className="spark-water-agri-buttons">{["aquaculture","mariculture","hydroponics"].map(k=><button type="button" key={k} className={mode===k?"active":""} onClick={()=>setMode(k)}>{k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.title}</h4><p>{data.text}</p></article>
    {mode==="hydroponics"&&<svg className="spark-hydroponics-svg" viewBox="0 0 900 430" role="img" aria-label="Hydroponic plant growing without soil with roots suspended in aerated nutrient solution containing dissolved mineral ions">
      <defs>
        <marker id="hydro-uptake-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path className="wh-arrow-head" d="M0 0L9 4.5L0 9Z"/></marker>
      </defs>
      <rect className="wh-reservoir" x="150" y="225" width="600" height="150" rx="16"/>
      <rect className="wh-solution" x="165" y="270" width="570" height="90"/>
      <rect className="wh-support" x="325" y="205" width="250" height="46" rx="12"/>
      <path className="wh-stem" d="M450 215V105"/>
      <path className="wh-leaf left" d="M450 145Q380 92 323 128Q365 183 450 165Z"/>
      <path className="wh-leaf right" d="M450 125Q515 68 581 104Q536 163 450 149Z"/>
      <g className="wh-roots">
        <path d="M430 245Q410 292 398 348M450 245Q452 302 442 350M470 245Q492 294 510 350M438 286Q416 312 414 345M466 292Q485 316 486 348"/>
      </g>
      <g className="wh-nutrients">
        {[[220,310],[270,335],[330,300],[380,337],[540,315],[590,340],[650,302],[700,330]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="9"/><text x={x} y={y+4} textAnchor="middle">{i%2?"K⁺":"NO₃⁻"}</text></g>)}
      </g>
      <g className="wh-air-bubbles">
        {[205,245,285,625,665,705].map((x,i)=><circle key={i} cx={x} cy={345-(i%3)*24} r={5+(i%2)*2}/>)}
      </g>
      <path className="wh-uptake" d="M365 320Q390 290 420 270" markerEnd="url(#hydro-uptake-arrow)"/>
      <path className="wh-uptake" d="M535 325Q510 292 482 272" markerEnd="url(#hydro-uptake-arrow)"/>
      <text className="wh-label" x="450" y="77" textAnchor="middle">plant shoot above the solution</text>
      <text className="wh-label" x="450" y="198" textAnchor="middle">support holds plant, no soil</text>
      <text className="wh-label" x="450" y="398" textAnchor="middle">water with dissolved mineral nutrients</text>
      <text className="wh-small" x="200" y="262">aeration supplies oxygen to roots</text>
      <text className="wh-small" x="590" y="262">roots absorb water and mineral ions</text>
    </svg>}
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
  const [focus,setFocus]=useState("atmosphere");
  const details={
    atmosphere:["Atmosphere","Evaporation and transpiration move water vapour into the atmosphere. Cooling causes condensation and cloud formation."],
    precipitation:["Precipitation","Rain or snow returns water from the atmosphere to land and surface water. Some precipitation is intercepted by vegetation."],
    surface:["Surface water","Surface run-off feeds streams, rivers, lakes and the ocean. River flow returns water towards larger stores."],
    soil:["Soil and infiltration","Water can infiltrate the soil, move sideways as throughflow, or percolate deeper towards groundwater."],
    groundwater:["Groundwater","Groundwater moves slowly through permeable rock and soil and can feed springs, rivers and the sea."],
  };
  const selected=details[focus];
  return <div className="spark-water-cycle-reference">
    <figure>
      <img
        src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Watercycle-notext.jpg"
        alt="USGS public-domain water cycle landscape without printed labels"
        loading="lazy"
      />
      <figcaption>
        <span>Water cycle</span>
        <small>
          Reference: <a href="https://commons.wikimedia.org/wiki/File:Watercycle-notext.jpg" target="_blank" rel="noreferrer">U.S. Geological Survey</a>
          {" · "}Public domain
        </small>
      </figcaption>
    </figure>

    <div className="spark-water-cycle-focus">
      <span>Explore the cycle</span>
      <div>
        {Object.entries(details).map(([key,[title]])=>(
          <button type="button" key={key} className={focus===key?"active":""} onClick={()=>setFocus(key)}>{title}</button>
        ))}
      </div>
      <article role="status">
        <strong>{selected[0]}</strong>
        <p>{selected[1]}</p>
      </article>
      <div className="spark-water-cycle-process-key">
        <b>Key processes</b>
        <p>evaporation · transpiration · condensation · precipitation · interception · surface run-off · infiltration · percolation · throughflow · groundwater flow · river flow</p>
      </div>
    </div>

    <p>The water cycle continually moves water between the atmosphere, land, surface water and groundwater. Precipitation renews rivers, reservoirs and underground stores used by people and ecosystems.</p>
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
