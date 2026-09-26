import React,{useMemo,useState} from "react";
import "./electricalAccidentFirstAidExplorer.css";

function SequenceView(){
  const steps=[
    ["Make the scene safe","Do not touch a person who is still in contact with live electricity."],
    ["Disconnect the power","Switch off the electricity at the mains or source if this can be done safely."],
    ["If low-voltage power cannot be isolated","Use a dry non-conducting object such as dry wood, cardboard or plastic to move the source away. Do not approach high-voltage lines."],
    ["Call emergency help","Electrical injuries can cause hidden internal damage and abnormal heart rhythms."],
    ["Check responsiveness and normal breathing","If the person is unresponsive and is not breathing normally or is only gasping, start CPR and use an AED as soon as one is available."],
    ["If breathing normally","Monitor the person. If alertness is reduced and major trauma is not suspected, a side-lying recovery position is reasonable."],
  ];
  return <div className="spark-electrical-firstaid-sequence">{steps.map((row,i)=><article key={row[0]}><span>{i+1}</span><div><b>{row[0]}</b><p>{row[1]}</p></div></article>)}</div>;
}

function SourceView(){
  const [mode,setMode]=useState("safe");
  return <div className="spark-electric-source-safety">
    <div className="spark-electric-source-toggle"><button type="button" className={mode==="safe"?"active":""} onClick={()=>setMode("safe")}>Power isolated</button><button type="button" className={mode==="unsafe"?"active":""} onClick={()=>setMode("unsafe")}>Power still live</button></div>
    <svg viewBox="0 0 820 420" role="img" aria-label={mode==="safe"?"Safe scene after electrical power is isolated":"Unsafe scene with live electrical contact"}>
      <rect className="efa-appliance" x="105" y="125" width="160" height="170" rx="20"/>
      <path className="efa-flex" d="M265 210Q340 210 390 180"/>
      <circle className="efa-person-head" cx="540" cy="105" r="40"/>
      <path className="efa-person" d="M540 145V265M540 185L455 210M540 185L625 220M540 265L485 355M540 265L595 355"/>
      <path className={mode==="safe"?"efa-contact safe":"efa-contact live"} d="M390 180Q430 195 455 210"/>
      <rect className={mode==="safe"?"efa-switch off":"efa-switch on"} x="95" y="325" width="180" height="55" rx="10"/>
      <text className="efa-switch-text" x="185" y="360" textAnchor="middle">{mode==="safe"?"POWER OFF":"POWER LIVE"}</text>
      {mode==="unsafe"&&<><path className="efa-bolt" d="M410 145L385 195H420L398 250L460 175H425L450 145Z"/><text className="efa-warning" x="570" y="395" textAnchor="middle">do not touch the casualty</text></>}
      {mode==="safe"&&<text className="efa-safe-text" x="570" y="395" textAnchor="middle">assessment can begin once electrical danger is removed</text>}
    </svg>
    <p>{mode==="safe"?"Once the source is safely disconnected, assess responsiveness and breathing and activate emergency help.":"Touching the casualty while the circuit is still live can make the rescuer part of the electrical path."}</p>
  </div>;
}

function CPRView(){
  return <div className="spark-electric-cpr">
    <article><span>1</span><div><b>Unresponsive + no normal breathing</b><p>Activate the emergency response system and start CPR. Gasping is not normal breathing.</p></div></article>
    <article><span>2</span><div><b>Chest compressions</b><p>For an adult, use a rate of about 100 to 120 compressions per minute and allow full chest recoil.</p></div></article>
    <article><span>3</span><div><b>AED</b><p>Use an automated external defibrillator as soon as one is available and follow its prompts.</p></div></article>
    <aside><strong>Pulse-check note</strong><p>Older exam items may say to check breathing and a pulse. Current lay-rescuer guidance focuses on responsiveness and normal breathing and does not require delaying CPR for a pulse check. Trained healthcare providers use their own protocol.</p></aside>
  </div>;
}

function BurnView(){
  return <div className="spark-electrical-burn">
    <article><span>COOL</span><h4>Cool running water for about 20 minutes</h4><p>After the electrical source is made safe, cool a minor external burn as soon as possible.</p></article>
    <article><span>COVER</span><h4>Use a clean, non-fluffy covering</h4><p>After cooling, cover the burn loosely with a suitable clean dressing.</p></article>
    <article><span>DO NOT</span><h4>No butter, toothpaste or ice</h4><p>Do not burst blisters and do not apply greasy home remedies.</p></article>
    <article><span>MEDICAL REVIEW</span><h4>Electrical injury can be deeper than it looks</h4><p>Electrical current can damage tissues and the heart even when the skin injury seems small, so medical assessment is important.</p></article>
  </div>;
}

function RecoveryView(){
  return <div className="spark-recovery-position">
    <svg viewBox="0 0 820 400" role="img" aria-label="Simplified side-lying recovery position">
      <circle className="rp-head" cx="585" cy="125" r="42"/>
      <path className="rp-body" d="M545 165Q470 190 390 230Q320 265 235 255"/>
      <path className="rp-arm" d="M475 195Q540 225 585 170"/>
      <path className="rp-arm" d="M450 210Q505 260 575 250"/>
      <path className="rp-leg" d="M330 245Q390 285 460 330"/>
      <path className="rp-leg" d="M315 255Q255 310 190 330"/>
      <path className="rp-ground" d="M110 350H710"/>
      <text className="rp-label" x="410" y="85" textAnchor="middle">side-lying position helps keep the airway open</text>
    </svg>
    <div className="spark-recovery-notes">
      <p>Use a recovery position for a person with reduced alertness who is breathing normally when major neck, back, hip or pelvic injury is not suspected.</p>
      <p>If breathing becomes absent or abnormal, place the person on their back and begin CPR.</p>
      <p>Keep monitoring until trained emergency help arrives.</p>
    </div>
  </div>;
}

function HiddenDamageView(){
  return <div className="spark-hidden-damage">
    <article><span>SKIN</span><p>Entry or exit burns may be small or absent.</p></article>
    <article><span>MUSCLE AND NERVES</span><p>Current can injure deeper tissues along its path.</p></article>
    <article><span>HEART</span><p>Electrical injury can trigger dangerous abnormal rhythms or cardiac arrest.</p></article>
    <article><span>BREATHING</span><p>Electrical current can interfere with respiratory muscles or breathing control.</p></article>
    <strong>A person can look well after an electrical shock and still need medical assessment.</strong>
  </div>;
}

export default function ElectricalAccidentFirstAidExplorer(){
  const [view,setView]=useState("sequence");
  const summary=useMemo(()=>({
    sequence:"The rescuer's first job is to avoid becoming part of the electrical circuit.",
    source:"Power isolation comes before touching or assessing the casualty.",
    cpr:"Absent or abnormal breathing after electrical injury is a resuscitation emergency.",
    burn:"Electrical burns need cooling and clean covering, but the injury may extend deeper than the skin.",
    recovery:"A recovery position is for reduced alertness with normal breathing, not for someone who needs CPR.",
    hidden:"Electrical injuries can affect the heart, nerves, muscles and internal tissues even without a dramatic skin burn.",
  })[view],[view]);

  return <section className="spark-electrical-firstaid">
    <header><span>ELECTRICAL ACCIDENT FIRST AID</span><h3>Protect the rescuer, stop the current and assess life-threatening problems</h3><p>Electrical first aid starts with scene safety. Never touch a casualty who is still connected to a live electrical source.</p></header>
    <div className="spark-electrical-firstaid-tabs">{[["sequence","Response sequence"],["source","Live source"],["cpr","CPR and AED"],["burn","Burn treatment"],["recovery","Recovery position"],["hidden","Hidden injury"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-electrical-firstaid-stage">
      {view==="sequence"&&<SequenceView/>}
      {view==="source"&&<SourceView/>}
      {view==="cpr"&&<CPRView/>}
      {view==="burn"&&<BurnView/>}
      {view==="recovery"&&<RecoveryView/>}
      {view==="hidden"&&<HiddenDamageView/>}
    </div>
    <div className="spark-electrical-firstaid-summary"><strong>{summary}</strong><span>High-voltage lines and fallen power lines require specialist emergency response. Keep away until the supply authority or emergency services confirm the area is safe.</span></div>
  </section>;
}
