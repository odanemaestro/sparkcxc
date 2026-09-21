import React,{useMemo,useState} from "react";
import "./energyConservationExplorer.css";

const ACTIONS=[
  {name:"LED lighting",saving:"Uses less electrical power for similar useful light output.",place:"Home and school"},
  {name:"Occupancy sensors",saving:"Switch lights off automatically when rooms are empty.",place:"Classrooms, offices and corridors"},
  {name:"Switch off unused devices",saving:"Reduces standby and idle electricity use.",place:"Computers, televisions and chargers"},
  {name:"Keep refrigerator door closed",saving:"Limits warm air entering so the compressor runs less.",place:"Kitchen"},
  {name:"Repair refrigerator seals",saving:"Prevents cold-air leakage and excessive compressor operation.",place:"Kitchen"},
  {name:"Dry clothes on a line",saving:"Avoids electrical energy used by a tumble dryer.",place:"Home"},
  {name:"Cover pots while cooking",saving:"Reduces heat loss by convection and evaporation.",place:"Kitchen"},
  {name:"White or reflective roof",saving:"Reflects more solar radiation and reduces cooling demand.",place:"Buildings"},
  {name:"Efficient appliances",saving:"Provide the same service with less input energy.",place:"Home and school"},
  {name:"Car-pooling",saving:"Reduces fuel used per person when fewer vehicles carry the same number of people.",place:"Transport"},
];

function ActionsView(){
  return <div className="spark-energy-actions">{ACTIONS.map((item,i)=><article key={item.name}><span>{i+1}</span><div><b>{item.name}</b><strong>{item.place}</strong><p>{item.saving}</p></div></article>)}</div>;
}

function LightingView(){
  const [room,setRoom]=useState("occupied");
  const occupied=room==="occupied";
  return <div className="spark-lighting-conservation">
    <div className="spark-occupancy-controls"><button type="button" className={occupied?"active":""} onClick={()=>setRoom("occupied")}>Room occupied</button><button type="button" className={!occupied?"active":""} onClick={()=>setRoom("empty")}>Room empty</button></div>
    <div className="spark-room-model">
      <div className={"spark-room-lamp "+(occupied?"on":"off")}><span>LED</span></div>
      <div className="spark-room-person">{occupied?"👤":""}</div>
      <div className="spark-room-sensor"><b>sensor</b><span>{occupied?"motion detected":"no motion"}</span></div>
    </div>
    <p>{occupied?"The sensor keeps lighting on while the space is in use.":"After the programmed delay, the occupancy sensor switches the light off automatically."}</p>
    <aside><b>Why LED?</b><p>LED lamps convert a larger fraction of electrical input into useful light and waste less as heat than filament lamps.</p></aside>
  </div>;
}

function FridgeView(){
  const [seal,setSeal]=useState("good");
  const good=seal==="good";
  return <div className="spark-fridge-model">
    <div className="spark-fridge-controls"><button type="button" className={good?"active":""} onClick={()=>setSeal("good")}>Good seal</button><button type="button" className={!good?"active":""} onClick={()=>setSeal("bad")}>Broken seal</button></div>
    <div className={"spark-fridge "+(good?"good":"bad")}>
      <div className="spark-fridge-body"><span>refrigerator</span><div className="spark-fridge-cold">cold interior</div></div>
      <div className="spark-fridge-door"><span>{good?"door seals tightly":"warm air leaks in"}</span></div>
      <div className="spark-fridge-compressor"><b>compressor</b><span>{good?"runs less often":"runs longer"}</span></div>
    </div>
    <p>{good?"A good seal limits warm-air entry, so the compressor cycles less often.":"A broken seal lets warm air enter. The compressor must run longer to remove the extra heat, wasting electricity."}</p>
  </div>;
}

function HomeView(){
  return <div className="spark-home-conservation">
    <article><span>ROOF</span><h4>Use a light or reflective surface</h4><p>White surfaces reflect more incoming solar radiation and absorb less heat, reducing cooling demand.</p></article>
    <article><span>COOKING</span><h4>Cover pots and match pot to burner</h4><p>Lids reduce heat loss. A suitably sized burner directs more energy into the pot instead of the surroundings.</p></article>
    <article><span>LAUNDRY</span><h4>Use solar drying when practical</h4><p>Line-drying clothes uses free solar and wind energy instead of an electric dryer.</p></article>
    <article><span>APPLIANCES</span><h4>Choose high-efficiency models</h4><p>Higher-efficiency appliances waste less input energy while providing the required service.</p></article>
  </div>;
}

function SchoolView(){
  const rows=[
    ["End-of-day shutdown","Switch off computers, projectors and unnecessary air conditioning."],
    ["Lighting control","Use LEDs, daylight and occupancy sensors."],
    ["Cooling","Keep doors and windows closed when air conditioning is running."],
    ["Maintenance","Repair seals, filters, timers and faulty equipment that increase energy use."],
    ["Monitoring","Track meter readings and compare consumption before and after conservation measures."],
  ];
  return <div className="spark-school-conservation">{rows.map(([name,text],i)=><article key={name}><span>{i+1}</span><div><b>{name}</b><p>{text}</p></div></article>)}</div>;
}

function TransportView(){
  const [people,setPeople]=useState(4);
  const travellers=Math.max(1,Number(people)||1);
  const solo=travellers;
  const pooled=Math.ceil(travellers/4);
  return <div className="spark-transport-conservation">
    <article><span>PEOPLE TRAVELLING</span><label><input type="number" min="1" value={people} onChange={e=>setPeople(e.target.value)}/></label><strong>{travellers}</strong></article>
    <div className="spark-transport-compare">
      <div><b>Driving separately</b><strong>{solo} vehicle{solo===1?"":"s"}</strong></div>
      <div><b>Four people per car</b><strong>{pooled} vehicle{pooled===1?"":"s"}</strong></div>
    </div>
    <p>Car-pooling reduces the number of vehicles needed to move the same number of people, lowering fuel use per person when routes and occupancy are suitable.</p>
  </div>;
}

export default function EnergyConservationExplorer(){
  const [view,setView]=useState("actions");
  const summary=useMemo(()=>({
    actions:"Energy conservation means reducing unnecessary energy use and waste while maintaining the needed service.",
    lighting:"Efficient lamps and automatic controls reduce lighting energy without leaving occupied spaces dark.",
    fridge:"Refrigerators waste energy when warm air repeatedly enters or seals fail.",
    home:"Building surfaces, cooking methods and appliance choices all affect household energy demand.",
    school:"Conservation works best when equipment choice, user behaviour and maintenance support each other.",
    transport:"Transport conservation reduces fuel use per passenger by moving more people with fewer vehicles.",
  })[view],[view]);

  return <section className="spark-energy-conservation">
    <header><span>ENERGY CONSERVATION</span><h3>Reduce wasted energy at home, school and during transport</h3><p>Energy conservation means reducing unnecessary energy use and waste. It lowers costs, reduces demand for fuels and decreases environmental impacts from energy production.</p></header>
    <div className="spark-energy-tabs">{[["actions","Conservation actions"],["lighting","Lighting"],["fridge","Refrigerator"],["home","Home"],["school","School"],["transport","Transport"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-energy-stage">
      {view==="actions"&&<ActionsView/>}
      {view==="lighting"&&<LightingView/>}
      {view==="fridge"&&<FridgeView/>}
      {view==="home"&&<HomeView/>}
      {view==="school"&&<SchoolView/>}
      {view==="transport"&&<TransportView/>}
    </div>
    <div className="spark-energy-summary"><strong>{summary}</strong><span>Saving energy does not mean going without the needed service. The aim is to reduce avoidable losses and use efficient equipment and behaviour.</span></div>
  </section>;
}

export { ACTIONS };
