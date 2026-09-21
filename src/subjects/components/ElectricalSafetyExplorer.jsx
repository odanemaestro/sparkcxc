import React,{useMemo,useState} from "react";
import "./electricalSafetyExplorer.css";

const HAZARDS=[
  {id:"overload",title:"Overloaded socket",risk:"Large current can overheat wiring and damage insulation.",action:"Reduce the load and use properly rated circuits and outlets."},
  {id:"frayed",title:"Frayed flex",risk:"Exposed conductors can cause electric shock, short circuit or fire.",action:"Stop using the appliance and replace the damaged flex or appliance."},
  {id:"water",title:"Water near electricity",risk:"Water containing dissolved ions conducts current and increases shock risk.",action:"Keep electrical equipment dry and never handle mains equipment with wet hands."},
  {id:"metal",title:"Live metal case",risk:"A person touching the case may provide a path to earth.",action:"Earth the metal case and use protective devices so a fault disconnects the supply quickly."},
];

function PlugView(){
  return <div className="spark-safety-plug">
    <article><span>LIVE</span><h4>Brown wire</h4><p>The live wire carries the alternating supply voltage to the appliance. The fuse is placed in this wire so a blown fuse disconnects the appliance from the live supply.</p></article>
    <article><span>NEUTRAL</span><h4>Blue wire</h4><p>The neutral wire provides the return path for current under normal operation.</p></article>
    <article><span>EARTH</span><h4>Green and yellow wire</h4><p>The earth wire is connected to exposed metal parts. If a fault makes the case live, a large fault current flows to earth and protective devices disconnect the circuit.</p></article>
  </div>;
}

function FuseView(){
  const [power,setPower]=useState(690);
  const [voltage,setVoltage]=useState(230);
  const current=(Number(power)||0)/Math.max(1,Number(voltage)||1);
  const choices=[1,3,5,13,30];
  const suitable=choices.find(v=>v>current)||choices[choices.length-1];
  return <div className="spark-safety-fuse">
    <article>
      <span>FUSE SELECTION</span>
      <h4>Choose a rating just above normal current</h4>
      <label>Power, W<input type="number" value={power} onChange={e=>setPower(e.target.value)}/></label>
      <label>Supply voltage, V<input type="number" value={voltage} onChange={e=>setVoltage(e.target.value)}/></label>
      <strong>Normal current = {Math.round(current*100)/100} A</strong>
      <p>Smallest listed fuse rating above normal current: {suitable} A</p>
    </article>
    <aside><b>Why not fit a much larger fuse?</b><p>A fuse protects wiring and equipment. A rating far above normal current may allow dangerous overheating before the fuse melts.</p><p>Bank examples: 690 W at 230 V gives 3 A, so 5 A is suitable. A 3 kW heater at 240 V draws 12.5 A, so 13 A is suitable.</p></aside>
  </div>;
}

function ProtectionView(){
  return <div className="spark-safety-protection">
    <article><span>FUSE</span><h4>Melts when current exceeds its rating</h4><p>The fuse wire heats and melts, opening the circuit. It must be replaced after operating.</p></article>
    <article><span>CIRCUIT BREAKER</span><h4>Trips and can be reset</h4><p>A breaker opens the circuit during an overload or fault and can usually be reset after the cause is corrected.</p></article>
    <article><span>EARTH WIRE</span><h4>Provides a low-resistance fault path</h4><p>Earthing helps protective devices operate quickly if a metal appliance case becomes live.</p></article>
    <article><span>THICK CABLE</span><h4>Lower resistance for large current</h4><p>Heavy-duty appliances and transmission systems use suitably thick conductors to reduce heating and energy loss.</p></article>
  </div>;
}

function HazardView(){
  const [id,setId]=useState("overload");
  const item=HAZARDS.find(row=>row.id===id);
  return <div className="spark-safety-hazards">
    <div className="spark-safety-hazard-buttons">{HAZARDS.map(row=><button type="button" key={row.id} className={id===row.id?"active":""} onClick={()=>setId(row.id)}>{row.title}</button>)}</div>
    <article><span>RISK</span><h4>{item.title}</h4><p>{item.risk}</p><strong>Safer action</strong><p>{item.action}</p></article>
  </div>;
}

function ShockView(){
  return <div className="spark-safety-shock">
    <article><span>1</span><div><b>Do not touch the person directly</b><p>If the person is still in contact with electricity, touching them may expose you to the same current.</p></div></article>
    <article><span>2</span><div><b>Disconnect the supply if safe</b><p>Switch off power at the mains or another safe isolation point. Do not approach live high-voltage lines.</p></div></article>
    <article><span>3</span><div><b>Call emergency services</b><p>Get urgent medical help, especially after mains-voltage shock, loss of consciousness, burns or abnormal breathing.</p></div></article>
    <article><span>4</span><div><b>Check response and breathing</b><p>Once the electrical source is isolated, assess the person. Begin CPR if they are unresponsive and not breathing normally.</p></div></article>
    <article><span>5</span><div><b>Treat burns and monitor</b><p>Electrical injuries can cause internal damage even when skin injury seems limited.</p></div></article>
  </div>;
}

export default function ElectricalSafetyExplorer(){
  const [view,setView]=useState("plug");
  const summary=useMemo(()=>({
    plug:"Correct plug wiring keeps protective devices in the live path and exposed metal connected to earth.",
    fuse:"Fuse ratings should be slightly above normal operating current, not arbitrarily large.",
    protection:"Fuses, breakers, earthing and suitably sized conductors reduce electrical risk in different ways.",
    hazards:"Most household electrical accidents involve damaged insulation, overloads, moisture or exposed live parts.",
    shock:"Protect yourself first by isolating the electrical source before giving first aid.",
  })[view],[view]);

  return <section className="spark-electrical-safety">
    <header><span>ELECTRICAL SAFETY</span><h3>Connect plug wiring, protective devices and safe household practice</h3><p>Electrical safety depends on preventing contact with live conductors and disconnecting the supply quickly when excess current or a fault occurs.</p></header>
    <div className="spark-safety-tabs">{[["plug","Three-pin plug"],["fuse","Fuse rating"],["protection","Protection devices"],["hazards","Household hazards"],["shock","Electric shock response"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-safety-stage">
      {view==="plug"&&<PlugView/>}
      {view==="fuse"&&<FuseView/>}
      {view==="protection"&&<ProtectionView/>}
      {view==="hazards"&&<HazardView/>}
      {view==="shock"&&<ShockView/>}
    </div>
    <div className="spark-safety-summary"><strong>{summary}</strong><span>Never replace a fuse with wire, foil or a larger rating simply to stop it blowing. A protective device operating repeatedly usually signals a fault or overload that needs attention.</span></div>
  </section>;
}
