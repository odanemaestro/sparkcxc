import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./electricalHazardsExplorer.css";

const HAZARDS=[
  {id:"lines",name:"Overhead power lines",risk:"Kites, long poles and ladders can contact or approach live conductors.",safe:"Keep kites, metal poles, ladders and tall equipment well away from power lines. Never try to retrieve an object caught on a line."},
  {id:"wet",name:"Water and electricity",risk:"Wet skin and water containing dissolved ions reduce resistance and increase shock risk.",safe:"Keep mains appliances away from baths, sinks, pools and wet hands unless equipment is specifically designed and protected for the location."},
  {id:"cords",name:"Damaged cords",risk:"Frayed insulation can expose live conductors and start shocks, short circuits or fires.",safe:"Stop using damaged cords and have them replaced or repaired correctly."},
  {id:"overload",name:"Overloaded outlets",risk:"Too much current can overheat wiring and insulation.",safe:"Do not exceed outlet, extension lead or circuit ratings. Spread high-power loads appropriately."},
  {id:"illegal",name:"Illegal connections",risk:"Improvised connections often bypass correct protection, insulation and safe installation.",safe:"Electrical supply connections should be made only through authorised, code-compliant installations."},
];

function HazardDiagram({id}){
  if(id==="lines") return <ReviewedScienceDiagram site="ElectricalHazardsExplorer.jsx:13"><svg className="spark-hazard-scene-svg" viewBox="0 0 640 360" role="img" aria-label="Overhead power line hazard showing a kite and ladder too close to live conductors">
    <path className="ehz-ground" d="M20 315H620"/>
    <path className="ehz-pole" d="M475 55V315M430 95H535M445 135H520"/>
    <path className="ehz-line" d="M425 95H620M440 135H620"/>
    <polygon className="ehz-kite" points="160,85 205,125 160,165 115,125"/>
    <path className="ehz-kite-string" d="M160 165Q230 225 310 240"/>
    <path className="ehz-ladder" d="M330 295L430 145M365 295L465 145M353 260H400M365 230H418M380 200H438"/>
    <path className="ehz-danger-gap" d="M455 145L485 125"/>
    <text className="ehz-label" x="160" y="60" textAnchor="middle">kite</text>
    <text className="ehz-label" x="390" y="325" textAnchor="middle">ladder</text>
    <text className="ehz-caption" x="520" y="335" textAnchor="middle">keep people and equipment well away from live lines</text>
  </svg></ReviewedScienceDiagram>;

  if(id==="wet") return <ReviewedScienceDiagram site="ElectricalHazardsExplorer.jsx:26"><svg className="spark-hazard-scene-svg" viewBox="0 0 640 360" role="img" aria-label="Electrical hazard showing wet hands near a mains appliance and sink">
    <rect className="ehz-counter" x="40" y="230" width="560" height="70" rx="12"/>
    <path className="ehz-sink" d="M90 230Q180 260 270 230V285H90Z"/>
    <path className="ehz-tap" d="M145 125V180H220Q240 180 240 200"/>
    <path className="ehz-water" d="M238 198V232"/>
    <rect className="ehz-appliance" x="390" y="140" width="150" height="100" rx="18"/>
    <path className="ehz-cord" d="M540 190Q590 190 600 235"/>
    <path className="ehz-hand" d="M310 145Q345 115 380 145Q405 170 390 205Q350 220 315 195Z"/>
    <circle className="ehz-drop" cx="330" cy="120" r="8"/><circle className="ehz-drop" cx="365" cy="110" r="7"/>
    <path className="ehz-warning-bolt" d="M370 160L345 195H370L350 230"/>
    <text className="ehz-caption" x="320" y="335" textAnchor="middle">wet skin and dissolved ions make unintended current paths more dangerous</text>
  </svg></ReviewedScienceDiagram>;

  if(id==="cords") return <ReviewedScienceDiagram site="ElectricalHazardsExplorer.jsx:39"><svg className="spark-hazard-scene-svg" viewBox="0 0 640 360" role="img" aria-label="Damaged electrical cord showing broken insulation and exposed conductors">
    <path className="ehz-cable-outer" d="M60 180H265M375 180H580"/>
    <path className="ehz-copper live" d="M250 165Q320 130 390 165"/>
    <path className="ehz-copper neutral" d="M250 195Q320 230 390 195"/>
    <path className="ehz-fray" d="M270 145L295 165M285 210L305 190M350 145L335 165M360 210L340 192"/>
    <path className="ehz-warning-bolt" d="M315 95L285 140H315L292 180"/>
    <text className="ehz-label" x="320" y="65" textAnchor="middle">damaged insulation exposes live conductors</text>
    <text className="ehz-caption" x="320" y="300" textAnchor="middle">stop using a frayed cord and have it replaced or repaired correctly</text>
  </svg></ReviewedScienceDiagram>;

  if(id==="overload") return <ReviewedScienceDiagram site="ElectricalHazardsExplorer.jsx:49"><svg className="spark-hazard-scene-svg" viewBox="0 0 640 360" role="img" aria-label="Overloaded outlet with multiple high-power appliances and overheating conductors">
    <rect className="ehz-outlet" x="250" y="80" width="140" height="110" rx="18"/>
    <circle cx="295" cy="130" r="11"/><circle cx="345" cy="130" r="11"/>
    <path className="ehz-extension" d="M320 190V235H140M320 235H500"/>
    <rect className="ehz-load" x="65" y="235" width="150" height="65" rx="12"/>
    <rect className="ehz-load" x="425" y="235" width="150" height="65" rx="12"/>
    <path className="ehz-heat-wave" d="M260 55q15-25 30 0t30 0t30 0t30 0"/>
    <text className="ehz-label" x="320" y="35" textAnchor="middle">excess current heats wiring</text>
    <text className="ehz-caption" x="320" y="335" textAnchor="middle">overloading can overheat cables, plugs and insulation</text>
  </svg></ReviewedScienceDiagram>;

  return <ReviewedScienceDiagram site="ElectricalHazardsExplorer.jsx:60"><svg className="spark-hazard-scene-svg" viewBox="0 0 640 360" role="img" aria-label="Unsafe improvised electrical connection bypassing proper enclosure and protection">
    <path className="ehz-service-line" d="M55 85H585"/>
    <rect className="ehz-meter" x="80" y="120" width="130" height="120" rx="14"/>
    <circle className="ehz-meter-dial" cx="145" cy="170" r="32"/>
    <path className="ehz-safe-feed" d="M210 180H335"/>
    <rect className="ehz-breaker-box" x="335" y="125" width="110" height="110" rx="12"/>
    <path className="ehz-illegal-tap" d="M260 85V270H520"/>
    <path className="ehz-bare-joint" d="M250 85Q260 70 270 85M505 270Q520 250 535 270"/>
    <path className="ehz-warning-bolt" d="M510 170L480 215H510L485 255"/>
    <text className="ehz-label" x="145" y="270" textAnchor="middle">meter</text>
    <text className="ehz-label" x="390" y="270" textAnchor="middle">breaker / protection</text>
    <text className="ehz-caption" x="320" y="330" textAnchor="middle">improvised connections can bypass insulation, metering and protective devices</text>
  </svg></ReviewedScienceDiagram>;
}

function HazardView(){
  const [id,setId]=useState("lines");
  const item=HAZARDS.find(h=>h.id===id);
  return <div className="spark-hazards-main">
    <div className="spark-hazards-buttons">{HAZARDS.map(h=><button type="button" key={h.id} className={id===h.id?"active":""} onClick={()=>setId(h.id)}>{h.name}</button>)}</div>
    <article><span>{item.name.toUpperCase()}</span><HazardDiagram id={item.id}/><h4>Risk</h4><p>{item.risk}</p><h4>Safer practice</h4><p>{item.safe}</p></article>
  </div>;
}

function StoredChargeView(){
  return <div className="spark-stored-charge">
    <ReviewedScienceDiagram site="ElectricalHazardsExplorer.jsx:86"><svg viewBox="0 0 820 390" role="img" aria-label="Capacitor storing electric charge after a device is switched off">
      <rect className="eh-device" x="120" y="100" width="250" height="190" rx="18"/>
      <rect className="eh-screen" x="160" y="135" width="170" height="100" rx="10"/>
      <line className="eh-cap-plate" x1="520" y1="120" x2="520" y2="280"/>
      <line className="eh-cap-plate" x1="585" y1="120" x2="585" y2="280"/>
      <text className="eh-plus" x="485" y="185">+</text><text className="eh-plus" x="485" y="230">+</text>
      <text className="eh-minus" x="610" y="185">−</text><text className="eh-minus" x="610" y="230">−</text>
      <path className="eh-wire" d="M370 195Q440 195 500 195M605 195Q670 195 705 235"/>
      <text className="eh-label" x="555" y="330" textAnchor="middle">capacitor can retain charge after power is removed</text>
    </svg></ReviewedScienceDiagram>
    <div className="spark-stored-charge-note"><strong>Switched off does not always mean electrically discharged</strong><p>Some electronic equipment contains capacitors that can retain dangerous charge after the device is unplugged. Untrained users should not remove covers or attempt internal repairs.</p></div>
  </div>;
}

function MicrowaveView(){
  const [item,setItem]=useState("glass");
  const safe=item==="glass";
  return <div className="spark-microwave-hazard">
    <div className="spark-microwave-buttons"><button type="button" className={safe?"active":""} onClick={()=>setItem("glass")}>Microwave-safe glass</button><button type="button" className={!safe?"active":""} onClick={()=>setItem("metal")}>Ordinary metal container</button></div>
    <div className="spark-microwave-scene">
      <ReviewedScienceDiagram site="ElectricalHazardsExplorer.jsx:106"><svg viewBox="0 0 760 380" role="img" aria-label={safe?"Glass container in microwave":"Metal container in microwave with arcing risk"}>
        <rect className="mh-oven" x="110" y="65" width="540" height="250" rx="20"/>
        <rect className="mh-window" x="160" y="105" width="330" height="170" rx="12"/>
        <rect className={safe?"mh-bowl safe":"mh-bowl metal"} x="255" y="195" width="145" height="48" rx="18"/>
        {!safe&&<path className="mh-arc" d="M405 175L435 195L420 220L455 238"/>}
        <circle className="mh-control" cx="555" cy="135" r="18"/><circle className="mh-control" cx="555" cy="195" r="18"/>
        <text className="mh-label" x="325" y="340" textAnchor="middle">{safe?"use containers approved for microwave cooking":"metal can reflect microwaves and cause arcing or damage"}</text>
      </svg></ReviewedScienceDiagram>
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
