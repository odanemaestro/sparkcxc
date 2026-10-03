import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./thermostatExplorer.css";

function BimetalView(){
  const [hot,setHot]=useState(false);
  return <div className="spark-thermostat-bimetal">
    <div className="spark-thermostat-toggle"><button type="button" className={!hot?"active":""} onClick={()=>setHot(false)}>Below set temperature</button><button type="button" className={hot?"active":""} onClick={()=>setHot(true)}>At or above set temperature</button></div>
    <ReviewedScienceDiagram site="ThermostatExplorer.jsx:8"><svg viewBox="0 0 820 410" role="img" aria-label={hot?"Heated bimetallic strip bends away and opens the contact":"Cool bimetallic strip touches contact and heater circuit is closed"}>
      <line className="tb-base" x1="130" y1="310" x2="690" y2="310"/>
      <rect className="tb-fixed" x="155" y="225" width="70" height="85" rx="8"/>
      <path className="tb-metal brass" d={hot?"M225 245Q380 170 535 230":"M225 245H535"}/>
      <path className="tb-metal iron" d={hot?"M225 263Q380 188 535 248":"M225 263H535"}/>
      <circle className="tb-contact" cx="565" cy="255" r="18"/>
      <line className="tb-wire" x1="565" y1="273" x2="565" y2="310"/>
      <path className="tb-heater" d="M585 310q15 -22 30 0t30 0t30 0"/>
      <text className="tb-label" x="375" y="125" textAnchor="middle">{hot?"brass expands more, strip bends and contact opens":"strip touches contact, heater receives current"}</text>
      <text className="tb-small brass" x="375" y="210" textAnchor="middle">brass</text>
      <text className="tb-small iron" x="375" y="290" textAnchor="middle">iron</text>
    </svg></ReviewedScienceDiagram>
    <div className="spark-thermostat-state"><strong>{hot?"Heater OFF":"Heater ON"}</strong><p>{hot?"The circuit is broken after the strip bends far enough. As the appliance cools, the strip returns and the contact closes again.":"Current flows through the heater until the appliance reaches the selected temperature."}</p></div>
  </div>;
}

function KnobView(){
  const [setting,setSetting]=useState(3);
  return <div className="spark-thermostat-knob">
    <div className="spark-knob-control"><label>Iron setting<input type="range" min="1" max="5" value={setting} onChange={e=>setSetting(Number(e.target.value))}/></label><div className="spark-knob-dial"><span style={{transform:`rotate(${-70+(setting-1)*35}deg)`}}></span><b>{setting}</b></div></div>
    <article><span>HIGHER SETTING</span><h4>Contact position changes</h4><p>A higher setting means the bimetallic strip must bend farther before the circuit opens. The heater therefore remains on until a higher temperature is reached.</p></article>
  </div>;
}

function ApplianceView(){
  const [item,setItem]=useState("iron");
  const data={
    iron:{title:"Electric iron",control:"Bimetallic strip opens and closes the heater circuit.",hot:"When the soleplate reaches the selected temperature, the circuit opens.",cool:"As it cools, the strip returns and the heater switches on again."},
    fridge:{title:"Refrigerator",control:"Thermostat controls the compressor according to cabinet temperature.",hot:"When the inside warms above the set point, the compressor switches on.",cool:"When the temperature falls sufficiently, cooling switches off."},
    water:{title:"Electric water heater",control:"Thermostat cycles the heating element to maintain stored-water temperature.",hot:"Heating stops at the selected upper temperature.",cool:"Heating restarts after temperature falls below the control range."},
    ac:{title:"Air conditioner",control:"Thermostat senses room temperature and controls cooling demand.",hot:"When the room rises above the set temperature, cooling is requested.",cool:"When the target is reached, the compressor or cooling stage cycles off."},
    gas:{title:"Gas oven",control:"A temperature-sensing mechanism regulates gas flow to the burner.",hot:"At the selected oven temperature, gas input is reduced or cycled.",cool:"When temperature falls, gas flow is increased or restored."},
  };
  const a=data[item];
  return <div className="spark-thermostat-appliance"><div className="spark-thermostat-appliance-buttons">{Object.entries(data).map(([key,val])=><button type="button" key={key} className={item===key?"active":""} onClick={()=>setItem(key)}>{val.title}</button>)}</div><article><span>{a.title.toUpperCase()}</span><h4>{a.control}</h4><div><b>Too warm / heating target reached</b><p>{a.hot}</p></div><div><b>Too cool / below target</b><p>{a.cool}</p></div></article></div>;
}

function FeedbackView(){
  return <div className="spark-thermostat-feedback">
    <article><span>1</span><div><b>Set point</b><p>The user chooses the desired temperature.</p></div></article>
    <div>→</div>
    <article><span>2</span><div><b>Sense temperature</b><p>A sensor or temperature-sensitive element responds to actual temperature.</p></div></article>
    <div>→</div>
    <article><span>3</span><div><b>Compare and switch</b><p>The control turns heating or cooling on or off according to the difference from the set point.</p></div></article>
    <div>→</div>
    <article><span>4</span><div><b>Temperature moves back toward target</b><p>The appliance avoids running continuously and reduces wasted energy.</p></div></article>
  </div>;
}

function ExpansionView(){
  return <div className="spark-bimetal-expansion-view">
    <ReviewedScienceDiagram site="ThermostatExplorer.jsx:59"><svg className="spark-bimetal-expansion-svg" viewBox="0 0 980 560" role="img" aria-label="Bimetallic strip explanation showing brass and iron starting at the same length, brass expanding more when heated, iron expanding less, and the joined strip bending with brass on the outside of the curve">
      <defs>
        <marker id="bimetal-heat-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="be-arrow-head"/>
        </marker>
      </defs>

      <text className="be-heading" x="245" y="40" textAnchor="middle">metals free to expand separately</text>
      <g className="be-free-metals">
        <text className="be-label brass" x="70" y="115">BRASS</text>
        <rect className="be-bar brass initial" x="160" y="88" width="250" height="34" rx="17"/>
        <text className="be-small" x="285" y="145" textAnchor="middle">same starting length</text>

        <text className="be-label iron" x="70" y="225">IRON</text>
        <rect className="be-bar iron initial" x="160" y="198" width="250" height="34" rx="17"/>
        <text className="be-small" x="285" y="255" textAnchor="middle">same starting length</text>

        <g className="be-heat-source">
          <path d="M455 75Q430 45 455 20Q460 48 475 32Q500 60 478 82Z"/>
          <text className="be-small" x="465" y="110" textAnchor="middle">heated</text>
        </g>

        <path className="be-heat-flow" d="M505 105H555" markerEnd="url(#bimetal-heat-arrow)"/>
        <path className="be-heat-flow" d="M505 215H555" markerEnd="url(#bimetal-heat-arrow)"/>

        <rect className="be-bar brass expanded" x="575" y="88" width="330" height="34" rx="17"/>
        <rect className="be-bar iron expanded" x="575" y="198" width="290" height="34" rx="17"/>
        <text className="be-result brass" x="740" y="145" textAnchor="middle">brass expands more</text>
        <text className="be-result iron" x="720" y="255" textAnchor="middle">iron expands less</text>
      </g>

      <line className="be-divider" x1="70" y1="300" x2="910" y2="300"/>
      <text className="be-heading" x="490" y="340" textAnchor="middle">when the metals are firmly joined</text>

      <g className="be-joined-strip">
        <path className="be-joined brass" d="M205 470Q440 335 725 420"/>
        <path className="be-joined iron" d="M205 488Q440 353 725 438"/>
        <path className="be-bracket" d="M185 455V505M175 480H205"/>
        <text className="be-small" x="140" y="486" textAnchor="end">fixed end</text>

        <path className="be-curve-arrow" d="M720 385Q790 350 830 390" markerEnd="url(#bimetal-heat-arrow)"/>
        <text className="be-result" x="820" y="330" textAnchor="middle">strip bends toward the metal that expands less</text>
        <text className="be-label brass" x="470" y="388">brass on outside of curve</text>
        <text className="be-label iron" x="470" y="465">iron on inside of curve</text>
      </g>

      <text className="be-caption" x="490" y="535" textAnchor="middle">The joined metals cannot reach their separate heated lengths, so unequal thermal expansion produces bending.</text>
    </svg></ReviewedScienceDiagram>
    <p>Brass expands more than iron for the same temperature rise. When they are bonded together, they cannot expand independently. The pair therefore bends, with brass on the outside of the curve and iron on the inside.</p>
  </div>;
}

export default function ThermostatExplorer(){
  const [view,setView]=useState("bimetal");
  const summary=useMemo(()=>({
    bimetal:"A bimetallic thermostat uses unequal thermal expansion to make or break an electrical contact.",
    knob:"Changing the set point changes how far the temperature-sensitive mechanism must respond before switching.",
    appliances:"Thermostats maintain temperature automatically by cycling heating, cooling or fuel flow.",
    feedback:"A thermostat is a feedback control, not merely a thermometer.",
    expansion:"The bending of a bimetallic strip depends on the different expansion rates of its two joined metals.",
  })[view],[view]);

  return <section className="spark-thermostat-explorer">
    <header><span>THERMOSTATS</span><h3>Use temperature feedback to switch heating or cooling automatically</h3><p>A thermostat keeps an appliance or space near a selected temperature by sensing temperature and controlling the energy input.</p></header>
    <div className="spark-thermostat-tabs">{[["bimetal","Bimetallic strip"],["knob","Iron setting"],["appliances","Appliances"],["feedback","Feedback loop"],["expansion","Why it bends"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-thermostat-stage">
      {view==="bimetal"&&<BimetalView/>}
      {view==="knob"&&<KnobView/>}
      {view==="appliances"&&<ApplianceView/>}
      {view==="feedback"&&<FeedbackView/>}
      {view==="expansion"&&<ExpansionView/>}
    </div>
    <div className="spark-thermostat-summary"><strong>{summary}</strong><span>Electric irons, refrigerators, water heaters, ovens and air conditioners all use temperature control, although modern appliances may use electronic sensors rather than a mechanical bimetallic strip.</span></div>
  </section>;
}
