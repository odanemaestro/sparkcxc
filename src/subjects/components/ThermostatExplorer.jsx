import React,{useMemo,useState} from "react";
import "./thermostatExplorer.css";

function BimetalView(){
  const [hot,setHot]=useState(false);
  return <div className="spark-thermostat-bimetal">
    <div className="spark-thermostat-toggle"><button type="button" className={!hot?"active":""} onClick={()=>setHot(false)}>Below set temperature</button><button type="button" className={hot?"active":""} onClick={()=>setHot(true)}>At or above set temperature</button></div>
    <svg viewBox="0 0 820 410" role="img" aria-label={hot?"Heated bimetallic strip bends away and opens the contact":"Cool bimetallic strip touches contact and heater circuit is closed"}>
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
    </svg>
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
  return <div className="spark-bimetal-expansion">
    <article className="brass"><span>BRASS</span><div className="spark-expansion-bar wide"></div><strong>expands more</strong></article>
    <article className="iron"><span>IRON</span><div className="spark-expansion-bar narrow"></div><strong>expands less</strong></article>
    <div className="spark-expansion-result"><b>Joined together</b><p>Because the two metals cannot expand independently, the strip bends. The metal that expands more lies on the outside of the curve.</p></div>
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
