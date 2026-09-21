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
    <svg className="spark-natural-ventilation-svg" viewBox="0 0 980 560" role="img" aria-label="Caribbean building section showing louvre windows opposite openings high vents shading and natural convection airflow">
      <defs>
        <marker id="vent-air-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="vn-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>
      <path className="vn-ground" d="M30 490H950"/>
      <path className="vn-house" d="M155 235L490 80L825 235V490H155Z"/>
      <path className="vn-roof" d="M120 235L490 55L860 235L830 255L490 105L150 255Z"/>
      <path className="vn-shade" d="M130 250H285L250 305H115Z"/>
      <text className="vn-small" x="200" y="330" textAnchor="middle">roof overhang shades opening</text>

      <g className="vn-louvres left">
        <rect x="150" y="310" width="105" height="120" rx="6"/>
        {[0,1,2,3,4].map(i=><path key={i} d={"M165 "+(325+i*20)+"L238 "+(312+i*20)}/>)}
      </g>
      <g className="vn-louvres right">
        <rect x="725" y="310" width="105" height="120" rx="6"/>
        {[0,1,2,3,4].map(i=><path key={i} d={"M742 "+(312+i*20)+"L815 "+(325+i*20)}/>)}
      </g>

      <rect className="vn-high-vent" x="445" y="150" width="90" height="38" rx="6"/>
      {[455,475,495,515].map(x=><line key={x} x1={x} y1="157" x2={x+10} y2="180"/>)}

      <path className="vn-cool-flow" d="M35 380H145Q250 380 330 350Q410 320 500 335" markerEnd="url(#vent-air-arrow)"/>
      <path className="vn-cross-flow" d="M260 370Q480 420 715 360" markerEnd="url(#vent-air-arrow)"/>
      <path className="vn-warm-rise" d="M520 350Q530 265 500 205" markerEnd="url(#vent-air-arrow)"/>
      <path className="vn-high-exit" d="M535 168Q625 150 720 120" markerEnd="url(#vent-air-arrow)"/>
      <path className="vn-right-exit" d="M835 370H945" markerEnd="url(#vent-air-arrow)"/>

      <g className="vn-person">
        <circle cx="505" cy="315" r="24"/>
        <path d="M505 340V415M505 365L465 392M505 365L548 390M505 415L475 470M505 415L535 470"/>
      </g>

      <text className="vn-label" x="75" y="355">cool outdoor air enters</text>
      <text className="vn-label" x="635" y="105">warm air escapes through high vent</text>
      <text className="vn-label" x="720" y="455">opposite openings maintain cross-flow</text>
      <text className="vn-caption" x="490" y="535" textAnchor="middle">natural ventilation uses wind plus density differences, without a powered fan</text>
    </svg>
    <div className="spark-natural-ventilation-notes">
      <article><span>LOUVRE WINDOWS</span><h4>Adjustable airflow</h4><p>Angled slats allow air to pass while helping to keep out rain, which is useful in Caribbean buildings.</p></article>
      <article><span>HIGH VENTS</span><h4>Warm air rises</h4><p>Warm air is less dense and rises. High vents provide an escape path and support convection-driven ventilation.</p></article>
      <article><span>OPPOSITE OPENINGS</span><h4>Cross-flow</h4><p>Windows and doors on different sides of a room allow wind to move fresh air through the space.</p></article>
      <article><span>SHADE AND ORIENTATION</span><h4>Reduce heat gain</h4><p>Building orientation and shading can reduce indoor heat load, making natural ventilation more effective.</p></article>
    </div>
  </div>;
}

function MechanicalView(){
  return <div className="spark-mechanical-ventilation">
    <svg className="spark-mechanical-ventilation-svg" viewBox="0 0 980 560" role="img" aria-label="Mechanical ventilation comparison showing exhaust fan air conditioner and ceiling fan airflow">
      <defs>
        <marker id="vent-mech-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="vm-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>

      <g transform="translate(30 55)">
        <rect className="vm-room" x="0" y="0" width="280" height="390" rx="14"/>
        <text className="vm-title" x="140" y="-18" textAnchor="middle">Exhaust fan</text>
        <rect className="vm-fan-frame" x="195" y="45" width="62" height="62" rx="8"/>
        <circle className="vm-fan-hub" cx="226" cy="76" r="9"/>
        {[0,90,180,270].map(a=><path key={a} className="vm-fan-blade" transform={"rotate("+a+" 226 76)"} d="M226 76Q246 55 252 75Q245 90 226 76Z"/>)}
        <path className="vm-warm-flow" d="M95 300Q150 235 205 105" markerEnd="url(#vent-mech-arrow)"/>
        <path className="vm-exhaust-flow" d="M260 75H340" markerEnd="url(#vent-mech-arrow)"/>
        <path className="vm-makeup-flow" d="M-45 330H15" markerEnd="url(#vent-mech-arrow)"/>
        <text className="vm-small" x="140" y="345" textAnchor="middle">removes air from room</text>
        <text className="vm-small" x="140" y="370" textAnchor="middle">replacement air must enter elsewhere</text>
      </g>

      <g transform="translate(350 55)">
        <rect className="vm-room" x="0" y="0" width="280" height="390" rx="14"/>
        <text className="vm-title" x="140" y="-18" textAnchor="middle">Air conditioner</text>
        <rect className="vm-ac" x="78" y="38" width="125" height="55" rx="12"/>
        <path className="vm-cool-flow" d="M145 100Q205 155 205 225Q195 295 120 320" markerEnd="url(#vent-mech-arrow)"/>
        <path className="vm-return-flow" d="M95 315Q55 225 105 130" markerEnd="url(#vent-mech-arrow)"/>
        <text className="vm-small" x="140" y="345" textAnchor="middle">cools and often dehumidifies</text>
        <text className="vm-small" x="140" y="370" textAnchor="middle">some systems mainly recirculate indoor air</text>
      </g>

      <g transform="translate(670 55)">
        <rect className="vm-room" x="0" y="0" width="280" height="390" rx="14"/>
        <text className="vm-title" x="140" y="-18" textAnchor="middle">Ceiling fan</text>
        <path className="vm-fan-stem" d="M140 10V72"/>
        <circle className="vm-fan-hub" cx="140" cy="80" r="12"/>
        <path className="vm-ceiling-blade" d="M140 80L42 65Q35 78 48 91Z"/>
        <path className="vm-ceiling-blade" d="M140 80L238 65Q245 78 232 91Z"/>
        <path className="vm-ceiling-blade" d="M140 80L125 178Q140 185 153 174Z"/>
        <path className="vm-circulation" d="M140 120Q225 160 220 255Q210 325 140 325Q70 325 60 255Q55 160 140 120" markerEnd="url(#vent-mech-arrow)"/>
        <text className="vm-small" x="140" y="345" textAnchor="middle">moves room air across occupants</text>
        <text className="vm-small" x="140" y="370" textAnchor="middle">does not by itself supply fresh outdoor air</text>
      </g>

      <text className="vm-caption" x="490" y="535" textAnchor="middle">air movement, air replacement and cooling are related but are not the same process</text>
    </svg>
    <div className="spark-mechanical-ventilation-notes">
      <article><span>EXHAUST FAN</span><h4>Removes air from a local source</h4><p>Kitchen and bathroom exhaust fans remove heat, steam, smoke and odours from where they are produced.</p></article>
      <article><span>AIR CONDITIONER</span><h4>Moves and conditions air</h4><p>Air-conditioning systems cool and often dehumidify indoor air. Some systems also introduce outdoor air, while others mainly recirculate indoor air.</p></article>
      <article><span>CEILING FAN</span><h4>Increases air movement</h4><p>A ceiling fan improves convective and evaporative cooling for occupants but does not itself replace stale indoor air with outdoor air.</p></article>
    </div>
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
