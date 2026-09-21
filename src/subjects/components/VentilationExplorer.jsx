import React,{useMemo,useState} from "react";
import "./ventilationExplorer.css";

function CrossView(){
  const [mode,setMode]=useState("cross");
  const cross=mode==="cross";
  return <div className="spark-ventilation-cross">
    <div className="spark-vent-toggle"><button type="button" className={cross?"active":""} onClick={()=>setMode("cross")}>Cross-ventilation</button><button type="button" className={!cross?"active":""} onClick={()=>setMode("sealed")}>Poor ventilation</button></div>
    <svg viewBox="0 0 860 450" role="img" aria-label={cross?"Room with cross ventilation":"Poorly ventilated room"}>
      <rect className="ve-room" x="140" y="80" width="580" height="280" rx="10"/>
      <rect className={"ve-window left "+(cross?"open":"closed")} x="125" y="175" width="35" height="105"/>
      <rect className={"ve-window right "+(cross?"open":"closed")} x="700" y="125" width="35" height="90"/>
      {cross?<><path className="ve-cool-arrow" d="M40 255H120"/><path className="ve-flow" d="M165 250Q390 310 690 175"/><path className="ve-warm-arrow" d="M735 165H820"/><text className="ve-label" x="45" y="235">cooler air enters</text><text className="ve-label" x="680" y="115">warm air leaves</text></>:<><circle className="ve-co2" cx="300" cy="210" r="30"/><circle className="ve-co2" cx="430" cy="230" r="30"/><circle className="ve-co2" cx="560" cy="205" r="30"/><text className="ve-label" x="430" y="315" textAnchor="middle">heat, humidity and CO₂ accumulate</text></>}
      <text className="ve-floor-label" x="430" y="410" textAnchor="middle">{cross?"openings on opposite sides promote air flow":"sealed room with little air exchange"}</text>
    </svg>
    <p>{cross?"Air can enter one side and leave another. Openings on opposite walls improve natural cross-ventilation.":"Without enough air exchange, heat, moisture, odours and carbon dioxide from occupants can build up."}</p>
  </div>;
}

function NaturalView(){
  return <div className="spark-natural-ventilation">
    <article><span>LOUVRE WINDOWS</span><h4>Adjustable airflow</h4><p>Angled slats allow air to pass while helping to keep out rain, which is useful in Caribbean buildings.</p></article>
    <article><span>HIGH VENTS</span><h4>Warm air rises</h4><p>Warm air is less dense and rises. High vents provide an escape path and support convection-driven ventilation.</p></article>
    <article><span>OPPOSITE OPENINGS</span><h4>Cross-flow</h4><p>Windows and doors on different sides of a room allow wind to move fresh air through the space.</p></article>
    <article><span>SHADE AND ORIENTATION</span><h4>Reduce heat gain</h4><p>Building orientation and shading can reduce indoor heat load, making natural ventilation more effective.</p></article>
  </div>;
}

function MechanicalView(){
  return <div className="spark-mechanical-ventilation">
    <article><span>EXHAUST FAN</span><h4>Removes air from a local source</h4><p>Kitchen and bathroom exhaust fans remove heat, steam, smoke and odours from where they are produced.</p></article>
    <article><span>AIR CONDITIONER</span><h4>Moves and conditions air</h4><p>Air-conditioning systems cool and often dehumidify indoor air. Some systems also introduce outdoor air, while others mainly recirculate indoor air.</p></article>
    <article><span>CEILING FAN</span><h4>Increases air movement</h4><p>A ceiling fan improves convective and evaporative cooling for occupants but does not itself replace stale indoor air with outdoor air.</p></article>
  </div>;
}

function AirQualityView(){
  const [people,setPeople]=useState(10);
  const n=Math.max(1,Number(people)||1);
  const load=Math.min(100,20+n*4);
  return <div className="spark-air-quality">
    <label>People in a poorly ventilated room<input type="number" min="1" max="20" value={people} onChange={e=>setPeople(e.target.value)}/></label>
    <div className="spark-air-load"><div style={{width:load+"%"}}></div></div>
    <strong>Illustrative stale-air load: {load}%</strong>
    <div className="spark-air-quality-notes"><p>More occupants add carbon dioxide, heat and water vapour to a closed room.</p><p>Poor ventilation can contribute to tiredness, headache, discomfort and reduced concentration.</p><p>Ventilation replaces stale indoor air with cleaner outdoor air and removes excess heat and moisture.</p></div>
  </div>;
}

function COView(){
  return <div className="spark-co-ventilation">
    <article><span>CHARCOAL INDOORS</span><h4>Dangerous in a closed room</h4><p>Incomplete combustion can produce carbon monoxide, an odourless poisonous gas.</p></article>
    <article><span>GAS STOVE</span><h4>Needs adequate ventilation and maintenance</h4><p>Poor combustion and inadequate ventilation can allow carbon monoxide and other combustion pollutants to accumulate.</p></article>
    <article><span>GENERATOR</span><h4>Never run in a closed garage</h4><p>Gasoline generators release carbon monoxide. They must be operated outdoors, away from doors, windows and vents.</p></article>
    <article><span>CARBON MONOXIDE</span><h4>Reduces oxygen transport</h4><p>Carbon monoxide binds strongly to haemoglobin, reducing the blood's ability to carry oxygen.</p></article>
  </div>;
}

export default function VentilationExplorer(){
 const [view,setView]=useState("cross");
 const summary=useMemo(()=>({
  cross:"Ventilation replaces stale indoor air and removes heat, moisture and pollutants.",
  natural:"Natural ventilation uses wind and convection rather than powered equipment.",
  mechanical:"Powered fans and air-conditioning systems move or condition air for specific needs.",
  air:"Crowded poorly ventilated spaces accumulate heat, humidity and carbon dioxide more quickly.",
  co:"Combustion appliances and generators create a special ventilation hazard because carbon monoxide can build up."
 })[view],[view]);
 return <section className="spark-ventilation-explorer">
  <header><span>VENTILATION</span><h3>Move fresh air through buildings and remove heat, moisture and pollutants</h3><p>Good ventilation improves indoor air quality by replacing stale air with fresh air and removing excess heat, humidity, odours and contaminants.</p></header>
  <div className="spark-vent-tabs">{[["cross","Cross-ventilation"],["natural","Natural ventilation"],["mechanical","Mechanical ventilation"],["air","Crowded room"],["co","Carbon monoxide"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
  <div className="spark-vent-stage">{view==="cross"&&<CrossView/>}{view==="natural"&&<NaturalView/>}{view==="mechanical"&&<MechanicalView/>}{view==="air"&&<AirQualityView/>}{view==="co"&&<COView/>}</div>
  <div className="spark-vent-summary"><strong>{summary}</strong><span>Ceiling fans improve air movement around people, but fresh-air ventilation still requires outdoor air to enter and stale indoor air to leave.</span></div>
 </section>;
}
