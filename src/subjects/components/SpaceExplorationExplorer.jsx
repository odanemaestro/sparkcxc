import React,{useMemo,useState} from "react";
import "./spaceExplorationExplorer.css";

const MISSIONS=[
  {id:"flyby",name:"Flyby",desc:"Passes a target once or a few times without entering orbit or landing.",best:"Fast reconnaissance of distant worlds."},
  {id:"orbiter",name:"Orbiter",desc:"Enters orbit around a planet, moon or other body and studies it repeatedly.",best:"Long-term mapping, weather and atmospheric study."},
  {id:"lander",name:"Lander",desc:"Touches down and studies one location on a surface.",best:"Local chemistry, geology and environmental measurements."},
  {id:"rover",name:"Rover",desc:"Lands and then drives across the surface.",best:"Mobile surface exploration, imaging, drilling and sample study."},
  {id:"station",name:"Space station",desc:"A crewed orbital laboratory where astronauts live and work.",best:"Long-duration research in microgravity."},
];

function MissionView(){
  const [id,setId]=useState("rover");
  const m=MISSIONS.find(x=>x.id===id);
  return <div className="spark-space-missions">
    <div className="spark-space-buttons">{MISSIONS.map(x=><button type="button" key={x.id} className={id===x.id?"active":""} onClick={()=>setId(x.id)}>{x.name}</button>)}</div>
    <article><span>{m.name.toUpperCase()}</span><h4>{m.desc}</h4><strong>Best for</strong><p>{m.best}</p></article>
  </div>;
}

function TelescopeView(){
  return <div className="spark-space-telescopes">
    <article>
      <span>HUBBLE</span><h4>Above Earth's atmosphere</h4>
      <p>Earth's atmosphere blurs incoming light and blocks some wavelengths. Hubble's orbital position gives clearer views and access to ultraviolet and other wavelengths difficult to observe from the ground.</p>
    </article>
    <article>
      <span>JAMES WEBB</span><h4>Powerful infrared observatory</h4>
      <p>Infrared light can pass through some dust clouds that block visible light. Webb uses infrared instruments to study distant galaxies, star formation, planets and cool objects.</p>
    </article>
    <article>
      <span>WHY SPACE?</span><h4>Observe beyond atmospheric limits</h4>
      <p>Space observatories avoid atmospheric turbulence and can detect wavelengths that Earth's atmosphere absorbs or strongly distorts.</p>
    </article>
  </div>;
}

function ISSView(){
  const [mode,setMode]=useState("float");
  return <div className="spark-iss-view">
    <div className="spark-space-toggle"><button type="button" className={mode==="float"?"active":""} onClick={()=>setMode("float")}>Why astronauts float</button><button type="button" className={mode==="health"?"active":""} onClick={()=>setMode("health")}>Body effects</button></div>
    {mode==="float"?<div className="spark-freefall-model">
      <svg viewBox="0 0 820 420" role="img" aria-label="International Space Station and astronaut falling around Earth together">
        <circle className="se-earth" cx="350" cy="225" r="110"/>
        <ellipse className="se-orbit" cx="350" cy="225" rx="260" ry="145"/>
        <rect className="se-iss" x="575" y="100" width="80" height="28" rx="5"/>
        <rect className="se-array" x="525" y="105" width="48" height="18"/><rect className="se-array" x="657" y="105" width="48" height="18"/>
        <circle className="se-astro-head" cx="620" cy="185" r="14"/><path className="se-astro" d="M620 200V250M620 215L590 235M620 215L650 235M620 250L598 285M620 250L642 285"/>
        <path className="se-fall" d="M610 135Q520 175 470 220"/>
        <text className="se-label" x="350" y="230" textAnchor="middle">Earth</text>
        <text className="se-label" x="615" y="80" textAnchor="middle">ISS and crew in free fall</text>
      </svg>
      <p>The ISS, astronauts and loose objects are all falling toward Earth together while moving sideways fast enough to keep missing the surface. This produces microgravity, not an absence of gravity.</p>
    </div>:<div className="spark-space-health">
      <article><span>BONE</span><h4>Reduced loading weakens bone</h4><p>Weight-bearing bones lose density in microgravity unless astronauts use countermeasures such as exercise.</p></article>
      <article><span>MUSCLE</span><h4>Muscles work less against gravity</h4><p>Muscle mass and strength decline if astronauts do not exercise regularly.</p></article>
      <article><span>COUNTERMEASURE</span><h4>Daily exercise</h4><p>Astronauts use resistance and aerobic exercise to reduce bone and muscle loss during long missions.</p></article>
    </div>}
    <strong>ISS altitude varies, typically about 370–460 km above Earth.</strong>
  </div>;
}

function SuitView(){
  return <div className="spark-space-suit">
    <div className="spark-suit-figure">
      <div className="spark-suit-helmet">helmet</div>
      <div className="spark-suit-body">pressurised suit</div>
      <div className="spark-suit-pack">life support</div>
    </div>
    <div className="spark-suit-cards">
      <article><b>Pressure</b><p>Space is almost a vacuum. The suit maintains pressure needed for normal body function and breathing.</p></article>
      <article><b>Oxygen</b><p>Life-support systems provide breathable oxygen and remove carbon dioxide.</p></article>
      <article><b>Temperature</b><p>Thermal-control systems protect against extreme heating and cooling.</p></article>
      <article><b>Radiation and micrometeoroids</b><p>Suit layers provide limited protection against radiation and tiny high-speed particles.</p></article>
    </div>
  </div>;
}

function BenefitsView(){
  return <div className="spark-space-benefits">
    <article><span>WEATHER</span><h4>Track storms and hurricanes</h4><p>Weather satellites monitor clouds, ocean temperature and storm development, improving forecasting and warnings.</p></article>
    <article><span>COMMUNICATIONS</span><h4>Connect distant places</h4><p>Satellites relay television, telephone and data signals over large regions.</p></article>
    <article><span>NAVIGATION</span><h4>Position and timing</h4><p>Satellite navigation supports transport, mapping, emergency response and timing systems.</p></article>
    <article><span>EARTH OBSERVATION</span><h4>Monitor environmental change</h4><p>Spacecraft observe forests, coastlines, agriculture, fires, ice and natural hazards.</p></article>
    <article><span>PLANETARY SCIENCE</span><h4>Understand other worlds</h4><p>Mars missions investigate geology, past water and whether conditions may once have supported life.</p></article>
    <article><span>TECHNOLOGY</span><h4>Develop systems for harsh environments</h4><p>Space missions drive advances in sensors, robotics, materials, communications and remote operations.</p></article>
  </div>;
}

export default function SpaceExplorationExplorer(){
  const [view,setView]=useState("missions");
  const summary=useMemo(()=>({
    missions:"Choose a spacecraft type according to whether the mission needs a quick pass, long observation, a fixed landing site or mobile surface exploration.",
    telescopes:"Space telescopes avoid atmospheric blurring and can observe wavelengths difficult or impossible to study from the ground.",
    iss:"Microgravity on the ISS results from continuous orbital free fall, not from the complete absence of gravity.",
    suit:"A space suit is a small life-support system that provides pressure, oxygen and environmental protection.",
    benefits:"Space exploration supports science while also providing weather, communications, navigation and Earth-observation services."
  })[view],[view]);

  return <section className="spark-space-exploration">
    <header><span>SPACE EXPLORATION</span><h3>Compare spacecraft, space observatories and the challenges of human spaceflight</h3><p>Humans explore space with telescopes, flybys, orbiters, landers, rovers and crewed laboratories. Each approach is suited to a different scientific or practical goal.</p></header>
    <div className="spark-space-tabs">{[["missions","Mission types"],["telescopes","Space telescopes"],["iss","ISS and microgravity"],["suit","Space suits"],["benefits","Benefits on Earth"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-space-stage">{view==="missions"&&<MissionView/>}{view==="telescopes"&&<TelescopeView/>}{view==="iss"&&<ISSView/>}{view==="suit"&&<SuitView/>}{view==="benefits"&&<BenefitsView/>}</div>
    <div className="spark-space-summary"><strong>{summary}</strong><span>Perseverance is a Mars rover. Hubble and Webb are space telescopes. The ISS is an orbiting research laboratory.</span></div>
  </section>;
}

export { MISSIONS };
