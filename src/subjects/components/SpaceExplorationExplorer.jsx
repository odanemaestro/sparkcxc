import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
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
      <ReviewedScienceDiagram site="SpaceExplorationExplorer.jsx:43"><svg viewBox="0 0 820 420" role="img" aria-label="International Space Station and astronaut falling around Earth together">
        <circle className="se-earth" cx="350" cy="225" r="110"/>
        <ellipse className="se-orbit" cx="350" cy="225" rx="260" ry="145"/>
        <rect className="se-iss" x="575" y="100" width="80" height="28" rx="5"/>
        <rect className="se-array" x="525" y="105" width="48" height="18"/><rect className="se-array" x="657" y="105" width="48" height="18"/>
        <circle className="se-astro-head" cx="620" cy="185" r="14"/><path className="se-astro" d="M620 200V250M620 215L590 235M620 215L650 235M620 250L598 285M620 250L642 285"/>
        <path className="se-fall" d="M610 135Q520 175 470 220"/>
        <text className="se-label" x="350" y="230" textAnchor="middle">Earth</text>
        <text className="se-label" x="615" y="80" textAnchor="middle">ISS and crew in free fall</text>
      </svg></ReviewedScienceDiagram>
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
    <ReviewedScienceDiagram site="SpaceExplorationExplorer.jsx:65"><svg className="spark-space-suit-svg" viewBox="0 0 620 640" role="img" aria-label="Extravehicular space suit showing pressure garment, helmet, oxygen and carbon dioxide life-support flow, thermal-control layers, gloves, boots and portable life-support backpack">
      <defs>
        <marker id="suit-flow-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="ssu-arrow-head"/>
        </marker>
      </defs>

      <g className="ssu-backpack">
        <rect x="355" y="175" width="110" height="220" rx="20"/>
        <rect x="375" y="205" width="70" height="65" rx="10"/>
        <text className="ssu-pack-text" x="410" y="230" textAnchor="middle">PLSS</text>
        <text className="ssu-small" x="410" y="252" textAnchor="middle">oxygen + cooling</text>
      </g>

      <g className="ssu-suit-body">
        <circle className="ssu-helmet-shell" cx="280" cy="120" r="78"/>
        <path className="ssu-visor" d="M225 105Q280 65 335 105Q330 155 280 168Q230 155 225 105Z"/>
        <path className="ssu-torso" d="M205 190Q280 160 355 190L378 355Q330 400 280 400Q230 400 182 355Z"/>
        <path className="ssu-left-arm" d="M205 205Q150 225 105 310L145 345Q185 285 225 270Z"/>
        <path className="ssu-right-arm" d="M355 205Q405 225 455 305L418 342Q380 285 338 270Z"/>
        <path className="ssu-left-leg" d="M225 385Q215 475 190 560H250L280 405Z"/>
        <path className="ssu-right-leg" d="M335 385Q345 475 370 560H310L280 405Z"/>
        <path className="ssu-glove" d="M104 302Q75 302 65 335Q82 365 120 350L145 335Z"/>
        <path className="ssu-glove" d="M455 297Q486 300 496 332Q477 365 438 348L418 332Z"/>
        <path className="ssu-boot" d="M183 548Q153 566 165 585H255L250 548Z"/>
        <path className="ssu-boot" d="M377 548Q407 566 395 585H305L310 548Z"/>
      </g>

      <g className="ssu-layers">
        <path d="M210 205Q280 180 350 205"/>
        <path d="M205 225Q280 200 355 225"/>
        <text className="ssu-small" x="280" y="218" textAnchor="middle">pressure garment + thermal / micrometeoroid layers</text>
      </g>

      <g className="ssu-life-support-flow">
        <path className="oxygen" d="M410 275Q385 250 355 245Q325 238 314 205" markerEnd="url(#suit-flow-arrow)"/>
        <text className="ssu-flow-label" x="425" y="290">O₂ supplied</text>
        <path className="co2" d="M315 230Q340 270 372 290Q395 305 407 330" markerEnd="url(#suit-flow-arrow)"/>
        <text className="ssu-flow-label" x="420" y="350">CO₂ removed</text>
      </g>

      <g className="ssu-callouts">
        <path d="M210 82L115 45"/><text x="20" y="42">helmet + visor</text>
        <path d="M185 250L65 205"/><text x="15" y="198">pressurised garment</text>
        <path d="M110 332L38 355"/><text x="15" y="378">glove maintains pressure</text>
        <path d="M410 195L515 135"/><text x="470" y="125">portable life-support</text>
        <path d="M365 540L505 560"/><text x="455" y="590">boots + protective layers</text>
      </g>

      <text className="ssu-caption" x="310" y="625" textAnchor="middle">A space suit is a wearable life-support system for work in near-vacuum conditions.</text>
    </svg></ReviewedScienceDiagram>
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
