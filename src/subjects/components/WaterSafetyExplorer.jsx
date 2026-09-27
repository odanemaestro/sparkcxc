import React,{useMemo,useState} from "react";
import "./waterSafetyExplorer.css";

function DeviceDiagram({device}){
  if(device==="jacket") return <svg className="spark-water-device-svg" viewBox="0 0 760 360" role="img" aria-label="Life jacket fitted around a person showing buoyant foam, reflective strips and whistle">
    <circle className="ws-head" cx="360" cy="70" r="36"/>
    <path className="ws-torso" d="M315 112Q360 92 405 112L425 285H295Z"/>
    <path className="ws-jacket" d="M305 120Q335 102 352 128L360 205L368 128Q385 102 415 120L405 238Q360 260 315 238Z"/>
    <rect className="ws-reflective" x="320" y="145" width="28" height="68" rx="5"/>
    <rect className="ws-reflective" x="372" y="145" width="28" height="68" rx="5"/>
    <path className="ws-buckle" d="M330 225H390"/>
    <circle className="ws-whistle" cx="410" cy="198" r="9"/>
    <path className="ws-callout" d="M318 160L130 115"/><text className="ws-label" x="116" y="118" textAnchor="end">buoyant foam</text>
    <path className="ws-callout" d="M388 155L590 105"/><text className="ws-label" x="605" y="110">reflective strips</text>
    <path className="ws-callout" d="M410 198L590 185"/><text className="ws-label" x="605" y="190">whistle</text>
    <path className="ws-callout" d="M360 228L590 255"/><text className="ws-label" x="605" y="260">secure buckle</text>
    <text className="ws-caption" x="360" y="330" textAnchor="middle">correct size and secure fit keep flotation around the chest</text>
  </svg>;

  if(device==="buoy") return <svg className="spark-water-device-svg" viewBox="0 0 760 360" role="img" aria-label="Ring buoy with attached rescue line">
    <circle className="ws-ring outer" cx="330" cy="175" r="112"/>
    <circle className="ws-ring hole" cx="330" cy="175" r="58"/>
    {[45,135,225,315].map(a=>{
      const rad=a*Math.PI/180;
      const x1=330+Math.cos(rad)*82,y1=175+Math.sin(rad)*82;
      const x2=330+Math.cos(rad)*110,y2=175+Math.sin(rad)*110;
      return <line key={a} className="ws-ring-band" x1={x1} y1={y1} x2={x2} y2={y2}/>;
    })}
    <path className="ws-rescue-line" d="M430 220Q560 255 650 185Q690 150 655 120"/>
    <path className="ws-callout" d="M420 112L560 70"/><text className="ws-label" x="575" y="74">buoyant ring</text>
    <path className="ws-callout" d="M560 244L650 285"/><text className="ws-label" x="655" y="292">attached rescue line</text>
    <text className="ws-caption" x="330" y="330" textAnchor="middle">throw flotation towards the person from a safe position</text>
  </svg>;

  if(device==="raft") return <svg className="spark-water-device-svg" viewBox="0 0 760 360" role="img" aria-label="Inflatable life raft showing buoyant chambers, canopy and occupants kept above the water">
    <path className="ws-waterline" d="M35 275Q165 250 295 275T555 275T725 275"/>
    <ellipse className="ws-raft" cx="380" cy="238" rx="230" ry="75"/>
    <ellipse className="ws-raft-floor" cx="380" cy="225" rx="165" ry="48"/>
    <path className="ws-canopy" d="M260 215Q380 80 500 215"/>
    <path className="ws-canopy-support" d="M285 210V145M475 210V145"/>
    {[330,380,430].map((x,i)=><g key={x}><circle className="ws-passenger-head" cx={x} cy={185-(i%2)*8} r="14"/><path className="ws-passenger" d={"M"+x+" "+(199-(i%2)*8)+"V232"}/></g>)}
    <path className="ws-callout" d="M205 250L95 180"/><text className="ws-label" x="82" y="176" textAnchor="end">inflatable chamber</text>
    <path className="ws-callout" d="M380 105L575 70"/><text className="ws-label" x="590" y="74">protective canopy</text>
    <text className="ws-caption" x="380" y="340" textAnchor="middle">keeps occupants together and largely out of the water</text>
  </svg>;

  return <svg className="spark-water-device-svg" viewBox="0 0 760 360" role="img" aria-label="Inflatable arm bands on a learner in shallow supervised water">
    <path className="ws-water-fill" d="M30 225Q180 205 330 225T630 225T730 225V340H30Z"/>
    <circle className="ws-head" cx="360" cy="92" r="35"/>
    <path className="ws-torso" d="M320 135Q360 112 400 135L414 270H306Z"/>
    <path className="ws-arm" d="M326 160L225 208M394 160L495 208"/>
    <ellipse className="ws-armband" cx="252" cy="195" rx="40" ry="31" transform="rotate(-25 252 195)"/>
    <ellipse className="ws-armband" cx="468" cy="195" rx="40" ry="31" transform="rotate(25 468 195)"/>
    <path className="ws-callout" d="M252 174L105 120"/><text className="ws-label" x="92" y="120" textAnchor="end">trapped air adds buoyancy</text>
    <text className="ws-caption" x="360" y="322" textAnchor="middle">training aid only, close adult supervision is still required</text>
  </svg>;
}

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
    <div className="spark-water-device-detail"><DeviceDiagram device={device}/><article><span>{data.title.toUpperCase()}</span><h4>{data.how}</h4><p>{data.extra}</p></article></div>
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
    <svg className="spark-water-buoyancy-svg" viewBox="0 0 860 520" role="img" aria-label={jacket?"Person wearing a life jacket floating higher because increased volume displaces more water":"Person without a life jacket floating lower in the water"}>
      <defs>
        <marker id="ws-force-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="ws-force-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>
      <path className="ws-buoy-water" d="M25 245Q120 225 215 245T405 245T595 245T835 245V500H25Z"/>
      <line className="ws-waterline-main" x1="25" y1="245" x2="835" y2="245"/>

      <g className={jacket?"ws-floating-person jacketed":"ws-floating-person unjacketed"}>
        <circle className="ws-buoy-head" cx="430" cy={jacket?145:205} r="38"/>
        <path className="ws-buoy-body" d={jacket?"M392 185Q430 165 468 185L486 360H374Z":"M392 245Q430 225 468 245L486 410H374Z"}/>
        <path className="ws-buoy-arm" d={jacket?"M402 220L300 285M458 220L560 285":"M402 280L315 335M458 280L545 335"}/>
        <path className="ws-buoy-leg" d={jacket?"M405 350L360 470M455 350L500 470":"M405 400L375 485M455 400L485 485"}/>
        {jacket&&<path className="ws-buoy-jacket" d="M382 195Q405 175 420 205L430 290L440 205Q455 175 478 195L472 315Q430 335 388 315Z"/>}
      </g>

      <path className={jacket?"ws-displaced-region jacket":"ws-displaced-region body"} d={jacket?"M350 245Q430 220 510 245V395Q430 430 350 395Z":"M375 245Q430 235 485 245V430Q430 455 375 430Z"}/>
      <text className="ws-buoy-label" x="610" y="335">{jacket?"larger displaced-water volume":"smaller added flotation volume"}</text>
      <path className="ws-buoy-callout" d={jacket?"M505 340H595":"M485 365H595"}/>

      <path className="ws-force up" d={jacket?"M430 420V315":"M430 455V355"} markerEnd="url(#ws-force-arrow)"/>
      <text className="ws-force-label up" x="455" y={jacket?395:430}>upthrust</text>
      <path className="ws-force down" d={jacket?"M430 120V205":"M430 180V265"} markerEnd="url(#ws-force-arrow)"/>
      <text className="ws-force-label down" x="455" y={jacket?155:215}>weight</text>

      {jacket&&<g className="ws-jacket-air">
        <circle cx="404" cy="230" r="8"/><circle cx="455" cy="235" r="7"/><circle cx="414" cy="270" r="6"/><circle cx="447" cy="280" r="6"/>
      </g>}

      <g className="ws-buoy-key">
        <rect x="35" y="35" width="300" height="150" rx="16"/>
        <text className="ws-key-title" x="55" y="68">{jacket?"Life jacket adds volume":"No added flotation"}</text>
        <text className="ws-key-text" x="55" y="98">{jacket?"low-density foam or trapped air":"average body density alone"}</text>
        <text className="ws-key-text" x="55" y="126">{jacket?"more water displaced before sinking deeply":"person sits lower in the water"}</text>
        <text className="ws-key-text" x="55" y="154">{jacket?"greater margin for keeping airway clear":"less flotation support"}</text>
      </g>

      <text className="ws-buoy-caption" x="430" y="505" textAnchor="middle">{jacket?"life jacket increases volume with little added mass, lowering average density":"without a life jacket, flotation depends mainly on the person's own average density and swimming ability"}</text>
    </svg>
    <p>{jacket?"The low-density material adds volume with little mass, lowering average density and allowing more water to be displaced. The resulting upthrust helps support the person higher in the water.":"Without added flotation, a person must rely on their own buoyancy and swimming ability. A life jacket does not make weight disappear; it helps enough water be displaced for upthrust to balance the person's weight at a safer position."}</p>
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
