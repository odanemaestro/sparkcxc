import React,{useMemo,useState} from "react";
import "./solarSystemExplorer.css";

const PLANETS=[
  {id:"mercury",name:"Mercury",order:1,type:"Rocky planet",fact:"Closest planet to the Sun and has the shortest year, about 88 days.",moons:"0"},
  {id:"venus",name:"Venus",order:2,type:"Rocky planet",fact:"Second planet from the Sun and similar in size to Earth.",moons:"0"},
  {id:"earth",name:"Earth",order:3,type:"Rocky planet",fact:"Third planet from the Sun and the only known planet with life.",moons:"1"},
  {id:"mars",name:"Mars",order:4,type:"Rocky planet",fact:"The Red Planet. Iron oxides in surface materials give it its reddish colour.",moons:"2"},
  {id:"jupiter",name:"Jupiter",order:5,type:"Gas giant",fact:"Largest planet in the Solar System.",moons:"many"},
  {id:"saturn",name:"Saturn",order:6,type:"Gas giant",fact:"Known for its broad visible ring system made mainly of ice and rock particles.",moons:"many"},
  {id:"uranus",name:"Uranus",order:7,type:"Ice giant",fact:"A large outer planet rich in hydrogen, helium and icy materials.",moons:"many"},
  {id:"neptune",name:"Neptune",order:8,type:"Ice giant",fact:"Outermost major planet and one of the cold, distant giant planets.",moons:"many"},
];

function OrderView(){
  return <div className="spark-solar-order">
    <div className="spark-sun-disc">Sun</div>
    {PLANETS.map((p,i)=><article key={p.id} className={"planet "+p.id}><span>{p.order}</span><b>{p.name}</b><small>{p.type}</small></article>)}
  </div>;
}

function PlanetView(){
  const [id,setId]=useState("earth");
  const p=PLANETS.find(x=>x.id===id);
  return <div className="spark-planet-facts">
    <div className="spark-planet-buttons">{PLANETS.map(x=><button type="button" key={x.id} className={id===x.id?"active":""} onClick={()=>setId(x.id)}>{x.order}. {x.name}</button>)}</div>
    <article>
      <span>{p.type.toUpperCase()}</span>
      <h4>{p.name}</h4>
      <strong>Planet {p.order} from the Sun</strong>
      <p>{p.fact}</p>
      <div>Known moons: {p.moons}</div>
    </article>
  </div>;
}

function OrbitView(){
  const [planet,setPlanet]=useState("earth");
  const p=PLANETS.find(x=>x.id===planet);
  const rx=100+p.order*28;
  const ry=Math.round(rx*0.62);
  return <div className="spark-solar-orbit">
    <div className="spark-planet-buttons compact">{PLANETS.map(x=><button type="button" key={x.id} className={planet===x.id?"active":""} onClick={()=>setPlanet(x.id)}>{x.name}</button>)}</div>
    <svg viewBox="0 0 840 470" role="img" aria-label={p.name+" in an elliptical orbit around the Sun"}>
      <circle className="sse-sun" cx="420" cy="235" r="50"/>
      <ellipse className="sse-orbit" cx="420" cy="235" rx={rx} ry={ry}/>
      <circle className={"sse-planet "+p.id} cx={420+rx} cy="235" r={p.id==="jupiter"?24:p.id==="saturn"?22:14}/>
      {p.id==="saturn"&&<ellipse className="sse-rings" cx={420+rx} cy="235" rx="38" ry="12"/>}
      <text className="sse-label" x="420" y="242" textAnchor="middle">Sun</text>
      <text className="sse-label" x={420+rx} y="195" textAnchor="middle">{p.name}</text>
    </svg>
    <p>Planetary orbits are ellipses. The diagram exaggerates the oval shape to make the idea visible. Real planetary orbits are much closer to circular than this teaching sketch suggests.</p>
  </div>;
}

function GroupsView(){
  return <div className="spark-planet-groups">
    <article><span>INNER ROCKY PLANETS</span><h4>Mercury, Venus, Earth, Mars</h4><p>Relatively small, dense planets with solid rocky surfaces.</p></article>
    <article><span>GAS GIANTS</span><h4>Jupiter and Saturn</h4><p>Very large planets dominated by hydrogen and helium. Jupiter is the largest planet.</p></article>
    <article><span>ICE GIANTS</span><h4>Uranus and Neptune</h4><p>Large outer planets with more water-, ammonia- and methane-rich material than Jupiter and Saturn.</p></article>
    <article><span>NO MOONS</span><h4>Mercury and Venus</h4><p>These are the only two major planets with no natural satellites.</p></article>
  </div>;
}

function MemoryView(){
  return <div className="spark-planet-memory">
    <strong>Mercury → Venus → Earth → Mars → Jupiter → Saturn → Uranus → Neptune</strong>
    <p>Earth is third. Mars is fourth. Jupiter is fifth and largest. Saturn is sixth and has the most visually prominent ring system.</p>
  </div>;
}

export default function SolarSystemExplorer(){
  const [view,setView]=useState("order");
  const summary=useMemo(()=>({
    order:"The Solar System has eight major planets arranged outward from Mercury to Neptune.",
    planets:"Each planet has distinctive size, composition, surface or atmospheric features.",
    orbit:"Planets travel around the Sun in elliptical orbits.",
    groups:"The four inner planets are rocky. Jupiter and Saturn are gas giants, while Uranus and Neptune are ice giants.",
    memory:"Knowing the order makes many CSEC Solar System questions straightforward."
  })[view],[view]);

  return <section className="spark-solar-system">
    <header><span>THE SOLAR SYSTEM</span><h3>Place the eight planets in order and compare their main features</h3><p>The Solar System consists of the Sun and the objects held in orbit by its gravity, including eight major planets, dwarf planets, moons, asteroids and comets.</p></header>
    <div className="spark-solar-tabs">{[["order","Planet order"],["planets","Planet facts"],["orbit","Elliptical orbits"],["groups","Planet groups"],["memory","Quick recall"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-solar-stage">{view==="order"&&<OrderView/>}{view==="planets"&&<PlanetView/>}{view==="orbit"&&<OrbitView/>}{view==="groups"&&<GroupsView/>}{view==="memory"&&<MemoryView/>}</div>
    <div className="spark-solar-summary"><strong>{summary}</strong><span>Mercury and Venus have no moons. Earth is the third planet from the Sun.</span></div>
  </section>;
}

export { PLANETS };
