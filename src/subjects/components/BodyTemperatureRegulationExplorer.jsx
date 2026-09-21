import React,{useMemo,useState} from "react";
import "./bodyTemperatureRegulationExplorer.css";

function ControlView(){
  const [state,setState]=useState("hot");
  const hot=state==="hot";
  return <div className="spark-temp-control">
    <div className="spark-temp-toggle"><button type="button" className={hot?"active":""} onClick={()=>setState("hot")}>Too hot</button><button type="button" className={!hot?"active":""} onClick={()=>setState("cold")}>Too cold</button></div>
    <div className="spark-temp-flow">
      <article><span>1</span><b>Temperature receptors detect change</b><p>Skin and central receptors provide information about body temperature.</p></article>
      <div>→</div>
      <article><span>2</span><b>Hypothalamus coordinates response</b><p>The hypothalamus acts as the body's temperature-control centre.</p></article>
      <div>→</div>
      <article><span>3</span><b>{hot?"Heat-loss responses":"Heat-conserving and heat-producing responses"}</b><p>{hot?"Sweating increases and skin blood vessels dilate.":"Skin blood vessels constrict and shivering may begin."}</p></article>
      <div>→</div>
      <article><span>4</span><b>Temperature moves towards normal</b><p>Negative feedback reduces the original deviation.</p></article>
    </div>
  </div>;
}

function SkinView(){
  const [hot,setHot]=useState(true);
  return <div className="spark-temp-skin">
    <div className="spark-temp-toggle"><button type="button" className={hot?"active":""} onClick={()=>setHot(true)}>Hot conditions</button><button type="button" className={!hot?"active":""} onClick={()=>setHot(false)}>Cold conditions</button></div>
    <svg viewBox="0 0 820 420" role="img" aria-label={hot?"Skin responses in hot conditions":"Skin responses in cold conditions"}>
      <rect className="bt-skin" x="90" y="80" width="640" height="250" rx="26"/>
      <path className={"bt-vessel "+(hot?"dilated":"constricted")} d={hot?"M150 250Q300 180 410 250T670 250":"M150 270Q300 255 410 270T670 270"}/>
      <path className="bt-sweat-gland" d="M270 260Q220 225 255 190Q290 155 330 195Q355 225 310 255Q280 275 270 260Z"/>
      <path className="bt-sweat-duct" d="M285 190V95"/>
      {hot&&<><circle className="bt-sweat-drop" cx="285" cy="65" r="13"/><path className="bt-evap" d="M255 35Q285 10 315 35"/></>}
      <path className="bt-hair" d="M550 190L575 75"/>
      <text className="bt-label" x="410" y="365" textAnchor="middle">{hot?"vasodilation increases blood flow near the skin":"vasoconstriction reduces blood flow near the skin"}</text>
    </svg>
    <p>{hot?"More warm blood reaches the skin and sweat evaporation removes latent heat.":"Less warm blood reaches the skin surface, reducing heat loss. Shivering can add heat through rapid muscle contraction."}</p>
  </div>;
}

function SweatView(){
  const [humidity,setHumidity]=useState(40);
  const h=Number(humidity)||0;
  const cooling=Math.max(5,100-h);
  return <div className="spark-sweat-cooling">
    <label>Relative humidity<input type="range" min="10" max="95" value={humidity} onChange={e=>setHumidity(e.target.value)}/></label>
    <div className="spark-humidity-meter"><div style={{width:cooling+"%"}}></div></div>
    <strong>Approximate evaporation potential: {cooling}%</strong>
    <p>At higher humidity, the surrounding air already contains more water vapour. Sweat evaporates more slowly, so evaporative cooling becomes less effective.</p>
  </div>;
}

function RiskView(){
  return <div className="spark-temp-risks">
    <article><span>HEAT STRESS</span><h4>Dehydration reduces cooling capacity</h4><p>Heavy sweating without adequate fluid replacement can contribute to dehydration. If effective sweating and heat loss fail, body temperature can rise dangerously.</p></article>
    <article><span>HIGH TEMPERATURE</span><h4>Cell processes become disrupted</h4><p>Very high body temperature can damage proteins and disrupt enzyme-controlled reactions. A core temperature above about 40 °C is a medical emergency.</p></article>
    <article><span>LOW TEMPERATURE</span><h4>Metabolic reactions slow</h4><p>When body temperature falls well below normal, enzyme-controlled reactions slow and organ function can deteriorate.</p></article>
    <article><span>NORMAL CORE</span><h4>About 37 °C</h4><p>Normal core temperature varies through the day and between people, but about 37 °C is the standard CSEC reference value.</p></article>
  </div>;
}

export default function BodyTemperatureRegulationExplorer(){
 const [view,setView]=useState("control");
 const summary=useMemo(()=>({
  control:"Body temperature is regulated by negative feedback coordinated by the hypothalamus.",
  skin:"Blood-vessel diameter and sweating change heat transfer at the skin.",
  sweat:"Evaporation removes latent heat, but high humidity slows evaporation.",
  risks:"Both excessive heat and excessive cooling interfere with normal enzyme-controlled processes."
 })[view],[view]);
 return <section className="spark-body-temperature">
  <header><span>BODY TEMPERATURE REGULATION</span><h3>Trace how the body keeps core temperature near its normal range</h3><p>The hypothalamus coordinates responses that increase heat loss when the body is too hot and conserve or generate heat when the body is too cold.</p></header>
  <div className="spark-temp-tabs">{[["control","Control loop"],["skin","Skin responses"],["sweat","Humidity and sweat"],["risks","Heat and cold risks"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
  <div className="spark-temp-stage">{view==="control"&&<ControlView/>}{view==="skin"&&<SkinView/>}{view==="sweat"&&<SweatView/>}{view==="risks"&&<RiskView/>}</div>
  <div className="spark-temp-summary"><strong>{summary}</strong><span>Shivering warms the body because repeated muscle contractions increase respiration and heat production.</span></div>
 </section>;
}
