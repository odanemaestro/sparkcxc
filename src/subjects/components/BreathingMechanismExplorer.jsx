import React,{useMemo,useState} from "react";
import "./breathingMechanismExplorer.css";

function MechanismView(){
  const [phase,setPhase]=useState("inhale");
  const inhale=phase==="inhale";
  return <div className="spark-breathing-mechanism">
    <div className="spark-breathing-toggle">
      <button type="button" className={inhale?"active":""} onClick={()=>setPhase("inhale")}>Inhalation</button>
      <button type="button" className={!inhale?"active":""} onClick={()=>setPhase("exhale")}>Exhalation</button>
    </div>
    <div className={"spark-breathing-chest "+(inhale?"inhale":"exhale")}>
      <svg viewBox="0 0 700 420" role="img" aria-label={inhale?"Chest changes during inhalation":"Chest changes during exhalation"}>
        <path className="bm-ribcage" d={inhale?"M165 85Q350 25 535 85Q600 210 535 340Q350 395 165 340Q100 210 165 85Z":"M195 105Q350 55 505 105Q555 210 505 315Q350 355 195 315Q145 210 195 105Z"}/>
        <path className="bm-lung left" d={inhale?"M225 125Q165 190 195 295Q225 350 315 335Q340 260 325 180Q300 125 225 125Z":"M245 145Q200 200 220 280Q245 320 310 310Q325 250 315 195Q295 150 245 145Z"}/>
        <path className="bm-lung right" d={inhale?"M475 125Q535 190 505 295Q475 350 385 335Q360 260 375 180Q400 125 475 125Z":"M455 145Q500 200 480 280Q455 320 390 310Q375 250 385 195Q405 150 455 145Z"}/>
        <path className="bm-diaphragm" d={inhale?"M160 340Q350 365 540 340":"M180 320Q350 255 520 320"}/>
        <path className="bm-air-arrow" d={inhale?"M350 15V92":"M350 92V15"}/>
        <text className="bm-air-label" x="365" y="55">{inhale?"air enters":"air leaves"}</text>
      </svg>
      <div className="spark-breathing-facts">
        <article><span>Diaphragm</span><strong>{inhale?"contracts and flattens":"relaxes and becomes dome-shaped"}</strong></article>
        <article><span>Ribs</span><strong>{inhale?"move up and out":"move down and in"}</strong></article>
        <article><span>Thoracic volume</span><strong>{inhale?"increases":"decreases"}</strong></article>
        <article><span>Pressure in lungs</span><strong>{inhale?"falls below atmospheric pressure":"rises above atmospheric pressure"}</strong></article>
      </div>
    </div>
  </div>;
}

function BellJarView(){
  const [pulled,setPulled]=useState(true);
  return <div className="spark-bell-jar">
    <div className="spark-bell-jar-controls"><button type="button" className={pulled?"active":""} onClick={()=>setPulled(true)}>Pull sheet down</button><button type="button" className={!pulled?"active":""} onClick={()=>setPulled(false)}>Push sheet up</button></div>
    <svg viewBox="0 0 760 430" role="img" aria-label="Bell jar model of breathing">
      <path className="bj-jar" d="M210 65H550V345Q550 385 510 385H250Q210 385 210 345Z"/>
      <path className="bj-tube" d="M380 35V160M380 155L315 220M380 155L445 220"/>
      <ellipse className={"bj-balloon "+(pulled?"inflated":"deflated")} cx="300" cy="255" rx={pulled?65:45} ry={pulled?95:65}/>
      <ellipse className={"bj-balloon "+(pulled?"inflated":"deflated")} cx="460" cy="255" rx={pulled?65:45} ry={pulled?95:65}/>
      <path className="bj-sheet" d={pulled?"M205 365Q380 410 555 365":"M205 365Q380 315 555 365"}/>
      <text className="bj-label" x="380" y="418" textAnchor="middle">{pulled?"rubber sheet pulled down":"rubber sheet pushed up"}</text>
    </svg>
    <p>{pulled?"Pulling the sheet down increases jar volume and lowers internal pressure, so air enters the balloons and they inflate.":"Pushing the sheet up decreases jar volume and raises internal pressure, so air leaves the balloons and they deflate."}</p>
    <small>The rubber sheet represents the diaphragm. The balloons represent the lungs. The jar wall does not model rib movement accurately, so this is a simplified model.</small>
  </div>;
}

function AirView(){
  const rows=[
    ["Oxygen","about 21%","about 16%","Some oxygen diffuses into the blood."],
    ["Carbon dioxide","about 0.04%","about 4%","Carbon dioxide from respiration diffuses from blood into alveolar air."],
    ["Nitrogen","about 78%","about 78%","Little net exchange occurs."],
    ["Water vapour","variable","higher","Air is humidified in the respiratory tract."],
  ];
  return <div className="spark-air-comparison"><div className="spark-air-head"><span>Gas</span><strong>Inhaled</strong><strong>Exhaled</strong><strong>Reason</strong></div>{rows.map(row=><div key={row[0]}><span>{row[0]}</span><p>{row[1]}</p><p>{row[2]}</p><p>{row[3]}</p></div>)}</div>;
}

function CPRView(){
  return <div className="spark-cpr-view">
    <article><span>1</span><div><b>Check safety and response</b><p>Make sure the scene is safe. Check whether the person responds and activate emergency help if the person is unresponsive.</p></div></article>
    <article><span>2</span><div><b>Check breathing</b><p>If the person is not breathing normally or is only gasping, begin CPR and get an AED as soon as one is available.</p></div></article>
    <article><span>3</span><div><b>Chest compressions</b><p>For an adult, current AHA guidance uses a rate of about 100 to 120 compressions per minute.</p></div></article>
    <article><span>4</span><div><b>Conventional CPR</b><p>For trained rescuers without an advanced airway, the standard cycle is 30 compressions followed by 2 breaths.</p></div></article>
    <article><span>5</span><div><b>Hands-only option</b><p>For an untrained bystander who witnesses a sudden adult collapse, hands-only CPR is an accepted approach while emergency help and an AED are obtained.</p></div></article>
  </div>;
}

export default function BreathingMechanismExplorer(){
  const [view,setView]=useState("mechanism");
  const summary=useMemo(()=>({
    mechanism:"Air moves because respiratory muscles change thoracic volume and therefore pressure.",
    model:"The bell-jar model demonstrates the pressure-volume principle but does not reproduce every feature of the rib cage.",
    air:"Exhaled air contains less oxygen and more carbon dioxide and water vapour than inhaled air.",
    cpr:"CPR combines rapid recognition, emergency activation, chest compressions and, for trained rescuers, rescue breaths.",
  })[view],[view]);

  return <section className="spark-breathing-mechanism-explorer">
    <header><span>MECHANISM OF BREATHING</span><h3>Link muscle action to chest volume, pressure and airflow</h3><p>Breathing depends on pressure differences created when the diaphragm and intercostal muscles change the volume of the thoracic cavity.</p></header>
    <div className="spark-breathing-tabs">{[["mechanism","Inhale and exhale"],["model","Bell-jar model"],["air","Air composition"],["cpr","CPR"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-breathing-stage">
      {view==="mechanism"&&<MechanismView/>}
      {view==="model"&&<BellJarView/>}
      {view==="air"&&<AirView/>}
      {view==="cpr"&&<CPRView/>}
    </div>
    <div className="spark-breathing-summary"><strong>{summary}</strong><span>Inhalation is active during quiet breathing because the diaphragm and external intercostal muscles contract. Quiet exhalation is mainly passive as these muscles relax and elastic tissues recoil.</span></div>
  </section>;
}
