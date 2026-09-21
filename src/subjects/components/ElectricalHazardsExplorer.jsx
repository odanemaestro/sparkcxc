import React,{useMemo,useState} from "react";
import "./electricalHazardsExplorer.css";

const HAZARDS=[
  {id:"lines",name:"Overhead power lines",risk:"Kites, long poles and ladders can contact or approach live conductors.",safe:"Keep kites, metal poles, ladders and tall equipment well away from power lines. Never try to retrieve an object caught on a line."},
  {id:"wet",name:"Water and electricity",risk:"Wet skin and water containing dissolved ions reduce resistance and increase shock risk.",safe:"Keep mains appliances away from baths, sinks, pools and wet hands unless equipment is specifically designed and protected for the location."},
  {id:"cords",name:"Damaged cords",risk:"Frayed insulation can expose live conductors and start shocks, short circuits or fires.",safe:"Stop using damaged cords and have them replaced or repaired correctly."},
  {id:"overload",name:"Overloaded outlets",risk:"Too much current can overheat wiring and insulation.",safe:"Do not exceed outlet, extension lead or circuit ratings. Spread high-power loads appropriately."},
  {id:"illegal",name:"Illegal connections",risk:"Improvised connections often bypass correct protection, insulation and safe installation.",safe:"Electrical supply connections should be made only through authorised, code-compliant installations."},
];

function HazardView(){
  const [id,setId]=useState("lines");
  const item=HAZARDS.find(h=>h.id===id);
  return <div className="spark-hazards-main">
    <div className="spark-hazards-buttons">{HAZARDS.map(h=><button type="button" key={h.id} className={id===h.id?"active":""} onClick={()=>setId(h.id)}>{h.name}</button>)}</div>
    <article><span>{item.name.toUpperCase()}</span><h4>Risk</h4><p>{item.risk}</p><h4>Safer practice</h4><p>{item.safe}</p></article>
  </div>;
}

function StoredChargeView(){
  return <div className="spark-stored-charge">
    <svg viewBox="0 0 820 390" role="img" aria-label="Capacitor storing electric charge after a device is switched off">
      <rect className="eh-device" x="120" y="100" width="250" height="190" rx="18"/>
      <rect className="eh-screen" x="160" y="135" width="170" height="100" rx="10"/>
      <line className="eh-cap-plate" x1="520" y1="120" x2="520" y2="280"/>
      <line className="eh-cap-plate" x1="585" y1="120" x2="585" y2="280"/>
      <text className="eh-plus" x="485" y="185">+</text><text className="eh-plus" x="485" y="230">+</text>
      <text className="eh-minus" x="610" y="185">−</text><text className="eh-minus" x="610" y="230">−</text>
      <path className="eh-wire" d="M370 195Q440 195 500 195M605 195Q670 195 705 235"/>
      <text className="eh-label" x="555" y="330" textAnchor="middle">capacitor can retain charge after power is removed</text>
    </svg>
    <div className="spark-stored-charge-note"><strong>Switched off does not always mean electrically discharged</strong><p>Some electronic equipment contains capacitors that can retain dangerous charge after the device is unplugged. Untrained users should not remove covers or attempt internal repairs.</p></div>
  </div>;
}

function MicrowaveView(){
  const [item,setItem]=useState("glass");
  const safe=item==="glass";
  return <div className="spark-microwave-hazard">
    <div className="spark-microwave-buttons"><button type="button" className={safe?"active":""} onClick={()=>setItem("glass")}>Microwave-safe glass</button><button type="button" className={!safe?"active":""} onClick={()=>setItem("metal")}>Ordinary metal container</button></div>
    <div className="spark-microwave-scene">
      <svg viewBox="0 0 760 380" role="img" aria-label={safe?"Glass container in microwave":"Metal container in microwave with arcing risk"}>
        <rect className="mh-oven" x="110" y="65" width="540" height="250" rx="20"/>
        <rect className="mh-window" x="160" y="105" width="330" height="170" rx="12"/>
        <rect className={safe?"mh-bowl safe":"mh-bowl metal"} x="255" y="195" width="145" height="48" rx="18"/>
        {!safe&&<path className="mh-arc" d="M405 175L435 195L420 220L455 238"/>}
        <circle className="mh-control" cx="555" cy="135" r="18"/><circle className="mh-control" cx="555" cy="195" r="18"/>
        <text className="mh-label" x="325" y="340" textAnchor="middle">{safe?"use containers approved for microwave cooking":"metal can reflect microwaves and cause arcing or damage"}</text>
      </svg>
      <p>{safe?"Glass, ceramic and other containers marked microwave-safe are suitable choices.":"Do not place an ordinary metal pan or foil in a microwave unless the manufacturer specifically states that the item and use are permitted."}</p>
    </div>
  </div>;
}

function LightningView(){
  return <div className="spark-lightning-safety">
    <article><span>GO INDOORS</span><h4>Use a substantial enclosed building or hard-topped vehicle</h4><p>Do not remain in an open field, water, under an isolated tree or beside power lines during a thunderstorm.</p></article>
    <article><span>INDOORS</span><h4>Avoid direct electrical and plumbing contact</h4><p>Stay off corded phones and avoid touching plugged-in electrical equipment, cords, sinks, showers and other plumbing during the storm.</p></article>
    <article><span>WAIT</span><h4>Remain sheltered after the last thunder</h4><p>Lightning can strike away from the rain area, so do not rush back outside as soon as the rain weakens.</p></article>
  </div>;
}

function SurgeView(){
  return <div className="spark-surge-view">
    <div className="spark-surge-flow"><article><span>NORMAL SUPPLY</span><strong>stable operating voltage</strong></article><div>→</div><article><span>SURGE PROTECTOR</span><strong>diverts or limits short voltage spikes within its design rating</strong></article><div>→</div><article><span>ELECTRONICS</span><strong>reduced exposure to some transients</strong></article></div>
    <p>A surge protector is not a guarantee against a direct lightning strike and is not the same as an uninterruptible power supply. During a thunderstorm, avoid handling plugged-in equipment.</p>
  </div>;
}

export default function ElectricalHazardsExplorer(){
  const [view,setView]=useState("hazards");
  const summary=useMemo(()=>({
    hazards:"Electrical hazards arise when current is given an unintended path through people, damaged insulation or overheated wiring.",
    charge:"Stored electrical charge inside equipment can remain dangerous after the external power is switched off.",
    microwave:"Microwave safety depends on using containers approved by the oven manufacturer.",
    lightning:"Lightning safety requires shelter and avoiding conductive paths into a building.",
    surge:"Surge protection limits some short voltage spikes but does not make unsafe electrical behavior safe.",
  })[view],[view]);

  return <section className="spark-electrical-hazards">
    <header><span>ELECTRICAL HAZARDS</span><h3>Recognise hazards before they become shocks, burns or fires</h3><p>Electrical danger increases when live conductors are exposed, currents exceed cable ratings, water lowers resistance or people enter the path between a high voltage and earth.</p></header>
    <div className="spark-hazard-tabs">{[["hazards","Common hazards"],["charge","Stored charge"],["microwave","Microwave"],["lightning","Thunderstorms"],["surge","Surge protection"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-hazard-stage">
      {view==="hazards"&&<HazardView/>}
      {view==="charge"&&<StoredChargeView/>}
      {view==="microwave"&&<MicrowaveView/>}
      {view==="lightning"&&<LightningView/>}
      {view==="surge"&&<SurgeView/>}
    </div>
    <div className="spark-hazard-summary"><strong>{summary}</strong><span>When changing a lamp, switch off the circuit first, use dry hands and a stable working position, and allow a hot lamp to cool before handling it.</span></div>
  </section>;
}

export { HAZARDS };
