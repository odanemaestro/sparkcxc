import React,{useMemo,useState} from "react";
import "./marineNavigationExplorer.css";

function DeviceView(){
  const [device,setDevice]=useState("gps");
  const data={
    gps:{title:"GPS",signal:"Satellite radio signals",use:"Find position and return to known fishing or harbour locations.",limit:"Needs receiver power and a clear enough satellite signal."},
    radar:{title:"Radar",signal:"Radio waves reflected from objects",use:"Detect ships, coastlines and hazards in darkness or fog.",limit:"Performance depends on range, target size, sea state and equipment."},
    sonar:{title:"Sonar",signal:"Sound pulses and echoes in water",use:"Measure depth and locate underwater objects or schools of fish.",limit:"Echo interpretation depends on water conditions and target properties."},
    compass:{title:"Magnetic compass",signal:"Earth's magnetic field",use:"Shows magnetic direction even without satellite signals.",limit:"Can be affected by nearby magnetic materials and needs variation/deviation awareness."},
    sextant:{title:"Sextant",signal:"Angle of Sun or stars above horizon",use:"Traditional celestial navigation, especially latitude and position fixing.",limit:"Requires visible celestial bodies, horizon and skill."},
    lighthouse:{title:"Lighthouse",signal:"Visible light with characteristic pattern",use:"Warn of hazards and help identify coastline or harbour approaches.",limit:"Line-of-sight aid, affected by visibility and distance."}
  }[device];
  return <div className="spark-navigation-device">
    <div className="spark-navigation-buttons">{Object.keys(data).map(k=><button type="button" key={k} className={device===k?"active":""} onClick={()=>setDevice(k)}>{data[k].title}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.signal}</h4><p><b>Use:</b> {data.use}</p><p><b>Limit:</b> {data.limit}</p></article>
  </div>;
}

function SonarView(){
  const [time,setTime]=useState(0.4);
  const speed=1500;
  const t=Math.max(0,Number(time)||0);
  const depth=speed*t/2;
  return <div className="spark-sonar-calc">
    <svg viewBox="0 0 820 360" role="img" aria-label="Boat sending sonar pulse to seabed and receiving echo">
      <rect className="mn-sea" x="0" y="90" width="820" height="270"/>
      <path className="mn-boat" d="M285 105H535L490 150H330Z"/>
      <path className="mn-pulse" d="M410 145L320 320M410 145L500 320"/>
      <path className="mn-bed" d="M0 315Q190 275 410 320Q650 280 820 315"/>
      <text className="mn-label" x="410" y="75" textAnchor="middle">boat</text>
      <text className="mn-label" x="545" y="250">echo path</text>
    </svg>
    <label>Round-trip echo time, s<input type="number" min="0" step="0.1" value={time} onChange={e=>setTime(e.target.value)}/></label>
    <strong>Depth = 1500 × {t} ÷ 2 = {depth.toFixed(0)} m</strong>
    <p>The division by 2 is required because the sound pulse travels down to the seabed and back to the boat.</p>
  </div>;
}

function SafetyView(){
  return <div className="spark-navigation-safety">
    <article><span>LIFE JACKETS</span><h4>Personal flotation</h4><p>Enough correctly fitted life jackets should be carried for all persons aboard.</p></article>
    <article><span>FLARES</span><h4>Visual distress signal</h4><p>Flares can attract rescuers when used appropriately in an emergency.</p></article>
    <article><span>TWO-WAY RADIO</span><h4>Communication</h4><p>A marine radio allows distress calls and communication with other vessels or shore stations.</p></article>
  </div>;
}

export default function MarineNavigationExplorer(){
  const [view,setView]=useState("devices");
  const summary=useMemo(()=>({
    devices:"Different navigation devices use different physical principles, so mariners combine them rather than relying on one aid.",
    sonar:"Sonar depth uses the round-trip travel time of sound in water.",
    safety:"Navigation equipment works together with safety and communication equipment to reduce risk at sea."
  })[view],[view]);
  return <section className="spark-marine-navigation">
    <header><span>NAVIGATION AT SEA</span><h3>Compare GPS, radar, sonar, compass, sextant and lighthouse navigation</h3><p>Marine navigation combines satellite, radio, sound, magnetic and visual information to determine position, depth and nearby hazards.</p></header>
    <div className="spark-navigation-tabs">{[["devices","Navigation devices"],["sonar","Sonar depth"],["safety","Safety equipment"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-navigation-stage">{view==="devices"&&<DeviceView/>}{view==="sonar"&&<SonarView/>}{view==="safety"&&<SafetyView/>}</div>
    <div className="spark-navigation-summary"><strong>{summary}</strong><span>Sonar uses sound; radar uses radio waves; GPS uses satellite signals; a compass aligns with Earth's magnetic field.</span></div>
  </section>;
}
