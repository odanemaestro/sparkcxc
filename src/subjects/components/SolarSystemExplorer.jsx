import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
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

const ORDER_POSITIONS={
  mercury:{x:155,r:8},venus:{x:230,r:11},earth:{x:305,r:12},mars:{x:380,r:9},
  jupiter:{x:500,r:25},saturn:{x:610,r:22},uranus:{x:720,r:17},neptune:{x:820,r:17}
};

function OrderView(){
  return <div className="spark-solar-order">
    <ReviewedScienceDiagram site="SolarSystemExplorer.jsx:22"><svg className="spark-solar-order-svg" viewBox="0 0 900 390" role="img" aria-label="Schematic order of the eight planets from the Sun, with the four inner rocky planets followed by Jupiter, Saturn, Uranus and Neptune">
      <defs>
        <radialGradient id="ss-order-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" className="ss-sun-core"/>
          <stop offset="100%" className="ss-sun-edge"/>
        </radialGradient>
      </defs>
      <rect className="ss-order-bg" x="0" y="0" width="900" height="390" rx="20"/>
      <rect className="ss-inner-zone" x="105" y="64" width="318" height="232" rx="18"/>
      <rect className="ss-outer-zone" x="448" y="64" width="408" height="232" rx="18"/>
      <text className="ss-zone-label" x="264" y="48" textAnchor="middle">INNER ROCKY PLANETS</text>
      <text className="ss-zone-label" x="652" y="48" textAnchor="middle">OUTER GIANT PLANETS</text>
      <line className="ss-order-axis" x1="103" y1="180" x2="852" y2="180"/>
      <circle className="ss-order-sun" cx="57" cy="180" r="42" fill="url(#ss-order-sun-glow)"/>
      <text className="ss-order-sun-label" x="57" y="185" textAnchor="middle">Sun</text>
      {PLANETS.map(p=>{
        const pos=ORDER_POSITIONS[p.id];
        return <g key={p.id} className={"ss-order-planet "+p.id}>
          <line className="ss-planet-guide" x1={pos.x} y1="180" x2={pos.x} y2="124"/>
          <circle cx={pos.x} cy="180" r={pos.r}/>
          {p.id==="saturn"&&<ellipse className="ss-order-rings" cx={pos.x} cy="180" rx="34" ry="10"/>}
          <circle className="ss-order-number" cx={pos.x} cy="115" r="14"/>
          <text className="ss-number-text" x={pos.x} y="119" textAnchor="middle">{p.order}</text>
          <text className="ss-planet-name" x={pos.x} y="230" textAnchor="middle">{p.name}</text>
          <text className="ss-planet-type" x={pos.x} y="250" textAnchor="middle">{p.type.replace(" planet","")}</text>
        </g>;
      })}
      <path className="ss-order-distance-arrow" d="M108 322H848"/>
      <text className="ss-order-note" x="478" y="350" textAnchor="middle">increasing distance from the Sun</text>
      <text className="ss-order-scale-note" x="478" y="374" textAnchor="middle">planet sizes and distances are not to scale</text>
    </svg></ReviewedScienceDiagram>
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
  const centerX=430;
  const centerY=235;
  const rx=112+p.order*25;
  const ry=Math.round(rx*0.72);
  const focusOffset=Math.sqrt((rx*rx)-(ry*ry));
  const sunX=centerX-focusOffset;
  const planetX=centerX+rx;
  const planetRadius=p.id==="jupiter"?24:p.id==="saturn"?22:14;
  return <div className="spark-solar-orbit">
    <div className="spark-planet-buttons compact">{PLANETS.map(x=><button type="button" key={x.id} className={planet===x.id?"active":""} onClick={()=>setPlanet(x.id)}>{x.name}</button>)}</div>
    <ReviewedScienceDiagram site="SolarSystemExplorer.jsx:84"><svg className="spark-solar-orbit-svg" viewBox="0 0 860 470" role="img" aria-label={p.name+" in an elliptical orbit with the Sun at one focus"}>
      <ellipse className="sse-orbit" cx={centerX} cy={centerY} rx={rx} ry={ry}/>
      <line className="sse-major-axis" x1={centerX-rx} y1={centerY} x2={centerX+rx} y2={centerY}/>
      <circle className="sse-ellipse-centre" cx={centerX} cy={centerY} r="5"/>
      <circle className="sse-focus-marker" cx={sunX} cy={centerY} r="8"/>
      <circle className="sse-sun" cx={sunX} cy={centerY} r="38"/>
      <circle className={"sse-planet "+p.id} cx={planetX} cy={centerY} r={planetRadius}/>
      {p.id==="saturn"&&<ellipse className="sse-rings" cx={planetX} cy={centerY} rx="38" ry="12"/>}
      <path className="sse-motion-arrow" d={"M"+(planetX-12)+" "+(centerY-planetRadius-18)+"Q"+(planetX-54)+" "+(centerY-70)+" "+(planetX-82)+" "+(centerY-94)}/>
      <line className="sse-focus-guide" x1={sunX} y1={centerY-42} x2={sunX-58} y2={centerY-104}/>
      <text className="sse-label" x={sunX-64} y={centerY-112} textAnchor="middle">Sun at one focus</text>
      <text className="sse-label" x={centerX} y={centerY+24} textAnchor="middle">ellipse centre</text>
      <text className="sse-label" x={planetX} y={centerY+62} textAnchor="middle">{p.name}</text>
      <text className="sse-small-label" x={planetX-91} y={centerY-102} textAnchor="middle">direction of motion</text>
    </svg></ReviewedScienceDiagram>
    <p>Planetary orbits are ellipses, with the Sun at one focus rather than at the geometric centre. This teaching diagram exaggerates the oval shape so the focus is easy to see. Real planetary orbits are much closer to circular.</p>
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
    orbit:"Planets travel around the Sun in elliptical orbits, with the Sun at one focus.",
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
