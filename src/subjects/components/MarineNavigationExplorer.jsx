import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./marineNavigationExplorer.css";

function DeviceView(){
  const [device,setDevice]=useState("gps");
  const devices={
    gps:{title:"GPS",signal:"Satellite radio signals",use:"Find position and return to known fishing or harbour locations.",limit:"Needs receiver power and a clear enough satellite signal."},
    radar:{title:"Radar",signal:"Radio waves reflected from objects",use:"Detect ships, coastlines and hazards in darkness or fog.",limit:"Performance depends on range, target size, sea state and equipment."},
    sonar:{title:"Sonar",signal:"Sound pulses and echoes in water",use:"Measure depth and locate underwater objects or schools of fish.",limit:"Echo interpretation depends on water conditions and target properties."},
    compass:{title:"Magnetic compass",signal:"Earth's magnetic field",use:"Shows magnetic direction even without satellite signals.",limit:"Can be affected by nearby magnetic materials and needs variation/deviation awareness."},
    sextant:{title:"Sextant",signal:"Angle of Sun or stars above horizon",use:"Traditional celestial navigation, especially latitude and position fixing.",limit:"Requires visible celestial bodies, horizon and skill."},
    lighthouse:{title:"Lighthouse",signal:"Visible light with characteristic pattern",use:"Warn of hazards and help identify coastline or harbour approaches.",limit:"Line-of-sight aid, affected by visibility and distance."}
  };
  const data=devices[device];
  return <div className="spark-navigation-device">
    <div className="spark-navigation-buttons">{Object.keys(devices).map(k=><button type="button" key={k} className={device===k?"active":""} onClick={()=>setDevice(k)}>{devices[k].title}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.signal}</h4><p><b>Use:</b> {data.use}</p><p><b>Limit:</b> {data.limit}</p></article>
  </div>;
}

function SonarView(){
  const [time,setTime]=useState(0.4);
  const speed=1500;
  const t=Math.max(0,Number(time)||0);
  const roundTrip=speed*t;
  const depth=roundTrip/2;
  return <div className="spark-sonar-calc">
    <ReviewedScienceDiagram site="MarineNavigationExplorer.jsx:28"><svg className="spark-sonar-depth-svg" viewBox="0 0 820 430" role="img" aria-label={"Boat sonar showing an outgoing sound pulse, returning echo, round-trip distance "+roundTrip.toFixed(0)+" metres and depth "+depth.toFixed(0)+" metres"}>
      <defs>
        <marker id="mn-down-head" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="mn-down-head"/></marker>
        <marker id="mn-up-head" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="mn-up-head"/></marker>
      </defs>
      <rect className="mn-sky" x="0" y="0" width="820" height="105"/>
      <rect className="mn-sea" x="0" y="105" width="820" height="270"/>
      <path className="mn-bed" d="M0 350Q190 322 410 355Q640 322 820 350"/>
      <path className="mn-boat" d="M285 88H535L490 143H330Z"/>
      <rect className="mn-transducer" x="394" y="138" width="32" height="12" rx="4"/>
      <text className="mn-label" x="410" y="68" textAnchor="middle">boat and sonar transducer</text>
      <line className="mn-pulse outgoing" x1="394" y1="153" x2="394" y2="326" markerEnd="url(#mn-down-head)"/>
      <line className="mn-pulse returning" x1="426" y1="326" x2="426" y2="153" markerEnd="url(#mn-up-head)"/>
      <text className="mn-pulse-label outgoing" x="315" y="236" textAnchor="middle">outgoing sound pulse</text>
      <text className="mn-pulse-label returning" x="515" y="236" textAnchor="middle">returning echo</text>
      <line className="mn-depth-bracket" x1="600" y1="150" x2="600" y2="340"/>
      <line className="mn-depth-bracket" x1="582" y1="150" x2="618" y2="150"/>
      <line className="mn-depth-bracket" x1="582" y1="340" x2="618" y2="340"/>
      <text className="mn-depth-label" x="625" y="238">one-way depth</text>
      <text className="mn-depth-label" x="625" y="260">{depth.toFixed(0)} m</text>
      <text className="mn-calc-label" x="85" y="388">sound speed ≈ 1500 m/s</text>
      <text className="mn-calc-label" x="410" y="388" textAnchor="middle">round trip = speed × time = {roundTrip.toFixed(0)} m</text>
      <text className="mn-calc-label" x="735" y="388" textAnchor="end">depth = round trip ÷ 2</text>
    </svg></ReviewedScienceDiagram>
    <label>Round-trip echo time, s<input type="number" min="0" step="0.1" value={time} onChange={e=>setTime(e.target.value)}/></label>
    <strong>Depth = 1500 × {t} ÷ 2 = {depth.toFixed(0)} m</strong>
    <p>The sound pulse travels to the seabed and then returns as an echo. The measured time covers both parts of the journey, so the total distance travelled by the sound must be divided by 2 to obtain depth.</p>
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
