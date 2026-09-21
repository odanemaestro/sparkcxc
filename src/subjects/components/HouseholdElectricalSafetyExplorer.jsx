import React,{useMemo,useState} from "react";
import "./householdElectricalSafetyExplorer.css";

const HAZARDS=[
  ["Overloaded socket","Too many appliances can draw a large current, heating wires and insulation and increasing fire risk."],
  ["Frayed flex","Damaged insulation can expose live conductors, creating shock and fire hazards."],
  ["Wet hands","Water containing dissolved ions conducts, so wet skin can reduce resistance and increase shock risk."],
  ["Wrong fuse","A fuse rated far above normal operating current may fail to protect the cable and appliance during a fault."],
];

function PlugView(){
  return <div className="spark-safety-plug">
    <div className="spark-safety-wire-card live"><span>BROWN</span><b>Live</b><p>Carries the alternating supply to the appliance. The fuse is placed in this wire.</p></div>
    <div className="spark-safety-wire-card neutral"><span>BLUE</span><b>Neutral</b><p>Completes the normal circuit back to the supply.</p></div>
    <div className="spark-safety-wire-card earth"><span>GREEN / YELLOW</span><b>Earth</b><p>Provides a low-resistance path for fault current if a metal case becomes live.</p></div>
    <div className="spark-safety-plug-note"><strong>Why the fuse is in the live wire</strong><p>If excessive current melts the fuse, the live connection is broken so the appliance is disconnected from the dangerous supply potential.</p></div>
  </div>;
}

function FuseView(){
  const [power,setPower]=useState(690);
  const [voltage,setVoltage]=useState(230);
  const ratings=[1,3,5,13,30];
  const current=(Number(power)||0)/Math.max(1,Number(voltage)||1);
  const suitable=ratings.find(r=>r>current) || ratings[ratings.length-1];
  return <div className="spark-fuse-selector">
    <article>
      <span>APPLIANCE CURRENT</span>
      <label>Power, W<input type="number" value={power} onChange={e=>setPower(e.target.value)}/></label>
      <label>Supply voltage, V<input type="number" value={voltage} onChange={e=>setVoltage(e.target.value)}/></label>
      <strong>I = P ÷ V = {Math.round(current*100)/100} A</strong>
    </article>
    <article>
      <span>FUSE CHOICE</span>
      <h4>Choose the smallest standard rating above normal current</h4>
      <div className="spark-fuse-ratings">{ratings.map(r=><b key={r} className={r===suitable?"selected":""}>{r} A</b>)}</div>
      <p>For {power} W at {voltage} V, the normal current is about {Math.round(current*100)/100} A, so the practice choice is {suitable} A.</p>
    </article>
  </div>;
}

function ProtectionView(){
  return <div className="spark-safety-protection">
    <article><span>FUSE</span><h4>Melts when current exceeds its rating</h4><p>The fuse wire heats and melts, breaking the live connection. A blown fuse must be replaced with the correct rating.</p></article>
    <article><span>CIRCUIT BREAKER</span><h4>Trips and opens the circuit</h4><p>Many household circuits use breakers because they disconnect on excessive current and can be reset after the fault is corrected.</p></article>
    <article><span>EARTHING</span><h4>Protects exposed metal cases</h4><p>If a fault connects live wiring to the case, the earth conductor provides a low-resistance fault path so a protective device disconnects the circuit.</p></article>
  </div>;
}

function HazardView(){
  return <div className="spark-safety-hazards">{HAZARDS.map(([name,text],i)=><article key={name}><span>{i+1}</span><div><b>{name}</b><p>{text}</p></div></article>)}</div>;
}

function CableView(){
  return <div className="spark-safety-cable">
    <article className="thin"><span>THIN CONDUCTOR</span><div className="spark-cable-line"></div><h4>Higher resistance for the same material and length</h4><p>Large current causes greater heating, so a thin cable may overheat in a heavy-duty circuit.</p></article>
    <article className="thick"><span>THICK CONDUCTOR</span><div className="spark-cable-line"></div><h4>Lower resistance</h4><p>Heavy-duty appliances and power cables use appropriately sized conductors so large currents produce less resistive heating.</p></article>
  </div>;
}

export default function HouseholdElectricalSafetyExplorer(){
  const [view,setView]=useState("plug");
  const summary=useMemo(()=>({
    plug:"Correct plug wiring places live through the fuse, neutral on blue and protective earth on green/yellow.",
    fuse:"Fuse selection starts by calculating normal operating current using I = P ÷ V.",
    protection:"Fuses, breakers and earthing reduce risk by disconnecting fault currents.",
    hazards:"Electrical accidents often begin with damaged insulation, overloads, water or incorrect protection.",
    cable:"Conductor thickness matters because lower resistance reduces heating at large current.",
  })[view],[view]);

  return <section className="spark-household-safety">
    <header><span>ELECTRICAL SAFETY</span><h3>Connect plug wiring, protection devices and safe cable design</h3><p>Electrical safety depends on keeping live conductors enclosed, limiting excessive current and providing a safe fault path when metal parts become energised.</p></header>
    <div className="spark-safety-tabs">{[["plug","Three-pin plug"],["fuse","Fuse selector"],["protection","Protection devices"],["hazards","Hazards"],["cable","Cable thickness"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-safety-stage">
      {view==="plug"&&<PlugView/>}
      {view==="fuse"&&<FuseView/>}
      {view==="protection"&&<ProtectionView/>}
      {view==="hazards"&&<HazardView/>}
      {view==="cable"&&<CableView/>}
    </div>
    <div className="spark-safety-summary"><strong>{summary}</strong><span>Never defeat a fuse or circuit breaker with a higher rating simply to stop nuisance trips. The fault or overload must be corrected.</span></div>
  </section>;
}

export { HAZARDS };
