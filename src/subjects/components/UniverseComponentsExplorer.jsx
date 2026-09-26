import React,{useMemo,useState} from "react";
import "./universeComponentsExplorer.css";

const OBJECTS=[
  {id:"universe",name:"Universe",kind:"Largest scale",desc:"All space, time, matter and energy, including all galaxies."},
  {id:"galaxy",name:"Galaxy",kind:"Huge star system",desc:"A vast group of stars, gas, dust and dark matter held together by gravity. The Milky Way is our galaxy."},
  {id:"star",name:"Star",kind:"Self-luminous body",desc:"A hot ball of plasma that produces its own energy and light by nuclear fusion. The Sun is the nearest star to Earth."},
  {id:"planet",name:"Planet",kind:"Orbits a star",desc:"A large body that orbits a star and does not produce its own visible light."},
  {id:"dwarf",name:"Dwarf planet",kind:"Small planetary body",desc:"Orbits the Sun and is nearly round but has not cleared its orbital neighbourhood. Pluto is a dwarf planet."},
  {id:"asteroid",name:"Asteroid",kind:"Rocky small body",desc:"A small rocky or metallic body orbiting the Sun. Many are concentrated between Mars and Jupiter."},
  {id:"comet",name:"Comet",kind:"Icy small body",desc:"Made mainly of ice, dust and rock. Near the Sun it can form a coma and tails that point away from the Sun."},
  {id:"meteor",name:"Meteor",kind:"Atmospheric event",desc:"The streak of light produced when a meteoroid heats intensely while passing through Earth's atmosphere."},
  {id:"meteorite",name:"Meteorite",kind:"Reaches the ground",desc:"A piece of a meteoroid that survives passage through the atmosphere and reaches Earth's surface."},
];

function ScaleView(){
  const items=[["Moon","3 474 km"],["Earth","12 742 km"],["Sun","1.39 million km"],["Solar System","billions of km"],["Milky Way","about 100 000 light-years"],["Observable universe","tens of billions of light-years"]];
  return <div className="spark-universe-scale">{items.map((r,i)=><article key={r[0]} style={{width:Math.min(100,38+i*11)+"%"}}><span>{i+1}</span><div><b>{r[0]}</b><p>{r[1]}</p></div></article>)}</div>;
}

function ObjectsView(){
  const [id,setId]=useState("galaxy");
  const item=OBJECTS.find(x=>x.id===id);
  return <div className="spark-universe-objects">
    <div className="spark-universe-buttons">{OBJECTS.map(x=><button type="button" key={x.id} className={id===x.id?"active":""} onClick={()=>setId(x.id)}>{x.name}</button>)}</div>
    <article><span>{item.kind.toUpperCase()}</span><h4>{item.name}</h4><p>{item.desc}</p></article>
  </div>;
}

function MilkyWayView(){
  return <div className="spark-milky-way">
    <svg viewBox="0 0 820 460" role="img" aria-label="Simplified spiral Milky Way galaxy with the Solar System marked in one spiral arm">
      <circle className="uw-core" cx="410" cy="230" r="52"/>
      {[0,1,2,3].map(a=><path key={a} className="uw-arm" d={
        a===0?"M410 230C500 150 640 155 710 235C620 180 520 205 470 265":
        a===1?"M410 230C320 310 180 305 110 225C200 280 300 255 350 195":
        a===2?"M410 230C490 320 485 400 405 430C455 355 445 285 390 245":
        "M410 230C330 140 335 60 415 30C365 105 375 175 430 215"
      }/>)}
      <circle className="uw-sun" cx="545" cy="205" r="10"/>
      <line className="uw-callout" x1="555" y1="195" x2="675" y2="95"/>
      <text className="uw-label" x="685" y="90">Solar System</text>
      <text className="uw-note" x="410" y="445" textAnchor="middle">Milky Way, a spiral galaxy</text>
    </svg>
    <p>Our Solar System lies inside the Milky Way. The Milky Way is one galaxy among an enormous number of galaxies in the universe.</p>
  </div>;
}

function CometView(){
  const [side,setSide]=useState("near");
  const near=side==="near";
  return <div className="spark-comet-model">
    <div className="spark-universe-toggle"><button type="button" className={near?"active":""} onClick={()=>setSide("near")}>Near the Sun</button><button type="button" className={!near?"active":""} onClick={()=>setSide("far")}>Farther away</button></div>
    <svg viewBox="0 0 820 380" role="img" aria-label={near?"Comet near the Sun with tail pointing away":"Comet farther from Sun with little visible tail"}>
      <circle className="uc-sun" cx="120" cy="190" r="58"/>
      <circle className="uc-nucleus" cx={near?410:650} cy="190" r="25"/>
      {near&&<><path className="uc-tail dust" d="M435 180Q575 130 760 115Q600 190 435 205Z"/><path className="uc-tail ion" d="M435 188Q610 200 780 250"/></>}
      <path className="uc-radiation" d={near?"M185 190H365":"M185 190H605"}/>
      <text className="uc-label" x="120" y="285" textAnchor="middle">Sun</text>
      <text className="uc-label" x={near?410:650} y="245" textAnchor="middle">comet nucleus</text>
    </svg>
    <p>{near?"Solar radiation and solar wind drive comet material away from the Sun, so the tail points away from the Sun rather than simply behind the comet's motion.":"Far from the Sun, less ice vaporises, so the coma and tail become much less prominent."}</p>
  </div>;
}

function LightYearView(){
  return <div className="spark-light-year">
    <article><span>LIGHT-YEAR</span><h4>A unit of distance</h4><p>One light-year is the distance light travels in one year. It is not a unit of time.</p></article>
    <article><span>WHY USE IT?</span><h4>Astronomical distances are enormous</h4><p>Using kilometres for distances between stars gives inconveniently large numbers, so light-years are more practical.</p></article>
    <article><span>SIZE ORDER</span><h4>Planet → star → galaxy → universe</h4><p>Planets orbit stars, galaxies contain huge numbers of stars, and the universe contains galaxies.</p></article>
  </div>;
}

export default function UniverseComponentsExplorer(){
 const [view,setView]=useState("objects");
 const summary=useMemo(()=>({
  objects:"Astronomical terms describe different kinds of bodies and events. Meteor, meteoroid and meteorite are not interchangeable.",
  scale:"Astronomical structures span an enormous range of sizes, from moons and planets to galaxies and the universe.",
  galaxy:"The Solar System is located inside the Milky Way, a spiral galaxy.",
  comet:"Comet tails point away from the Sun because of solar radiation pressure and the solar wind.",
  lightyear:"A light-year measures distance, not time."
 })[view],[view]);
 return <section className="spark-universe-components">
  <header><span>THE UNIVERSE</span><h3>Classify astronomical bodies and place the Solar System in the larger universe</h3><p>The universe contains galaxies, stars, planets and many smaller bodies. Accurate terminology helps distinguish an object in space from the light or material produced during atmospheric entry.</p></header>
  <div className="spark-universe-tabs">{[["objects","Objects"],["scale","Scale"],["galaxy","Milky Way"],["comet","Comets"],["lightyear","Light-year"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
  <div className="spark-universe-stage">{view==="objects"&&<ObjectsView/>}{view==="scale"&&<ScaleView/>}{view==="galaxy"&&<MilkyWayView/>}{view==="comet"&&<CometView/>}{view==="lightyear"&&<LightYearView/>}</div>
  <div className="spark-universe-summary"><strong>{summary}</strong><span>Pluto has been classified as a dwarf planet since 2006.</span></div>
 </section>;
}

export { OBJECTS };
