import React,{useMemo,useState} from "react";
import "./waterSafetyExplorer.css";

function DeviceView(){
  const [device,setDevice]=useState("jacket");
  const data={
    jacket:{title:"Life jacket",how:"Buoyant foam or trapped air lowers the wearer's average density and increases flotation.",extra:"Bright colours and reflective material make the wearer easier to see."},
    buoy:{title:"Ring buoy",how:"A buoyant ring can be thrown to a person in the water to provide immediate flotation.",extra:"A line may be attached so rescuers can pull the person toward safety."},
    raft:{title:"Life raft",how:"An inflatable survival craft keeps several people out of the water and provides a stable rescue platform.",extra:"It may also provide shelter and survival equipment."},
    bands:{title:"Inflatable arm bands",how:"Trapped air provides extra buoyancy for a child learning in shallow supervised water.",extra:"They are not a substitute for close adult supervision or an approved life jacket."}
  }[device];
  return <div className="spark-water-safety-device">
    <div className="spark-water-safety-buttons">{Object.keys(data).map(k=><button key={k} type="button" className={device===k?"active":""} onClick={()=>setDevice(k)}>{data[k].title}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.how}</h4><p>{data.extra}</p></article>
  </div>;
}

function VisibilityView(){
  return <div className="spark-water-safety-visibility">
    <article><span>BRIGHT COLOUR</span><h4>Improves visual detection</h4><p>Orange, yellow and other high-visibility colours help rescuers spot a person against dark or rough water.</p></article>
    <article><span>REFLECTIVE MATERIAL</span><h4>Helps at night</h4><p>Reflective patches return searchlight illumination and can improve detection in darkness.</p></article>
    <article><span>WHISTLE / LIGHT</span><h4>Additional signalling</h4><p>Some life jackets carry a whistle or light so a person can signal rescuers.</p></article>
  </div>;
}

function BoatView(){
  return <div className="spark-water-safety-boat">
    <article><span>LIFE JACKETS</span><h4>For everyone aboard</h4><p>Correctly sized and serviceable flotation devices should be readily available and worn when conditions require.</p></article>
    <article><span>FLARES</span><h4>Distress signalling</h4><p>Emergency flares are used to attract attention and indicate a vessel in distress.</p></article>
    <article><span>TWO-WAY RADIO</span><h4>Call for assistance</h4><p>A marine radio allows distress communication with nearby vessels and shore stations.</p></article>
  </div>;
}

function BeachView(){
  return <div className="spark-water-safety-beach">
    <div className="spark-red-flag">RED FLAG</div>
    <article><span>DANGER SIGNAL</span><h4>Do not ignore beach warnings</h4><p>In the CSEC bank, a red flag means dangerous conditions and swimming is not allowed. Always follow the posted local flag system, lifeguards and official instructions because flag meanings can vary by jurisdiction.</p></article>
  </div>;
}

function BuoyancyView(){
  const [jacket,setJacket]=useState(true);
  return <div className="spark-water-safety-buoyancy">
    <div className="spark-water-safety-buttons"><button type="button" className={jacket?"active":""} onClick={()=>setJacket(true)}>With life jacket</button><button type="button" className={!jacket?"active":""} onClick={()=>setJacket(false)}>Without jacket</button></div>
    <div className="spark-safety-water"><div className={"spark-safety-person "+(jacket?"high":"low")}>{jacket&&<span>buoyant jacket</span>}person</div></div>
    <p>{jacket?"The low-density material adds volume with little mass, lowering average density and allowing enough water to be displaced for upthrust to support the person.":"Without added flotation, a person must rely on their own buoyancy and swimming ability."}</p>
  </div>;
}

export default function WaterSafetyExplorer(){
  const [view,setView]=useState("devices");
  const summary=useMemo(()=>({
    devices:"Water-safety devices provide flotation, support survival and improve rescue.",
    visibility:"Visibility features help rescuers find people more quickly.",
    boat:"Small vessels should combine flotation, distress signalling and communication equipment.",
    beach:"Beach flags and lifeguard instructions warn swimmers about dangerous conditions.",
    buoyancy:"Life jackets work by increasing buoyant volume and lowering the wearer's average density."
  })[view],[view]);
  return <section className="spark-water-safety">
    <header><span>WATER SAFETY DEVICES</span><h3>Relate flotation devices, signalling and visibility to survival and rescue</h3><p>Water safety depends on preventing emergencies, carrying suitable equipment and making people easier to keep afloat and locate.</p></header>
    <div className="spark-water-safety-tabs">{[["devices","Flotation devices"],["visibility","Visibility"],["boat","Boat equipment"],["beach","Beach warnings"],["buoyancy","Why jackets float"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-water-safety-stage">{view==="devices"&&<DeviceView/>}{view==="visibility"&&<VisibilityView/>}{view==="boat"&&<BoatView/>}{view==="beach"&&<BeachView/>}{view==="buoyancy"&&<BuoyancyView/>}</div>
    <div className="spark-water-safety-summary"><strong>{summary}</strong><span>Life jackets and ring buoys add buoyancy; flares and radios help rescuers locate and assist people in distress.</span></div>
  </section>;
}
