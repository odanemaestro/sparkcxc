import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
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
    <ReviewedScienceDiagram site="BodyTemperatureRegulationExplorer.jsx:25"><svg className="spark-temp-skin-svg" viewBox="0 0 940 590" role="img" aria-label={hot?"Detailed skin cross-section showing vasodilation and sweating in hot conditions":"Detailed skin cross-section showing vasoconstriction and reduced sweating in cold conditions"}>
      <defs>
        <marker id="bt-heat-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="bt-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>

      <path className="bt-surface" d="M80 105Q210 86 340 104T600 104T860 103"/>
      <path className="bt-epidermis" d="M80 105Q210 86 340 104T600 104T860 103V165H80Z"/>
      <rect className="bt-dermis" x="80" y="165" width="780" height="245"/>
      <rect className="bt-fat-layer" x="80" y="410" width="780" height="105"/>
      <g className="bt-fat-cells">
        {[120,185,250,315,380,445,510,575,640,705,770,830].map((x,i)=><circle key={x} cx={x} cy={458+(i%2)*22} r="30"/>)}
      </g>

      <path className="bt-hair-shaft" d={hot?"M645 300L670 80":"M645 300L615 82"}/>
      <path className="bt-hair-follicle" d="M610 210Q590 285 600 372Q607 405 640 408Q670 396 674 360Q668 278 642 210Z"/>
      <ellipse className="bt-hair-bulb" cx="638" cy="382" rx="34" ry="27"/>
      <path className="bt-arrector" d={hot?"M585 338L620 282":"M565 326L620 265"}/>

      <path className="bt-sweat-duct" d="M310 370Q264 330 294 280Q334 225 315 165V110"/>
      <g className="bt-sweat-gland">
        <path d="M235 365q35-48 70 0t70 0t65 0q-35 50-70 8t-70 0t-65-8Z"/>
        <path d="M252 392q30-35 58 0t58 0t54 0"/>
      </g>
      <path className="bt-sweat-pore" d="M306 111Q315 98 324 111"/>
      {hot&&<g className="bt-sweat-output">
        <path className="bt-sweat-drop" d="M315 58q-17 25 0 42q17-17 0-42Z"/>
        <path className="bt-evap" d="M265 36Q315 4 365 36"/>
        <path className="bt-evap" d="M280 18Q315 -2 350 18"/>
      </g>}

      <path className="bt-artery" d="M120 370Q260 330 405 365T820 365"/>
      <path className="bt-vein" d="M115 392Q260 435 405 395T825 398"/>
      <g className={hot?"bt-capillary-network dilated":"bt-capillary-network constricted"}>
        <path d={hot?"M250 365Q235 300 280 260Q320 228 350 275Q372 313 342 352":"M250 365Q245 335 270 320Q294 307 315 330Q330 347 318 362"}/>
        <path d={hot?"M455 365Q440 290 490 245Q540 210 575 265Q597 310 560 355":"M455 365Q450 337 475 320Q500 304 520 330Q535 350 520 363"}/>
        <path d={hot?"M660 365Q645 300 690 260Q732 225 765 276Q788 315 752 355":"M660 365Q655 337 680 320Q705 305 725 330Q740 349 725 362"}/>
      </g>

      {hot?<g className="bt-heat-loss">
        <path d="M280 240V145" markerEnd="url(#bt-heat-arrow)"/>
        <path d="M505 225V135" markerEnd="url(#bt-heat-arrow)"/>
        <path d="M720 245V150" markerEnd="url(#bt-heat-arrow)"/>
        <text className="bt-small" x="505" y="120" textAnchor="middle">more heat transferred from skin</text>
      </g>:<g className="bt-heat-conserve">
        <path d="M280 250V205" markerEnd="url(#bt-heat-arrow)"/>
        <path d="M505 245V205" markerEnd="url(#bt-heat-arrow)"/>
        <text className="bt-small" x="505" y="190" textAnchor="middle">reduced heat transfer near surface</text>
      </g>}

      <g className="bt-callouts">
        <text x="72" y="145" textAnchor="end">epidermis</text><path d="M80 140H180"/>
        <text x="72" y="250" textAnchor="end">dermis</text><path d="M80 245H205"/>
        <text x="72" y="455" textAnchor="end">fat layer</text><path d="M80 450H205"/>
        <text x="875" y="215">hair</text><path d="M665 180L858 210"/>
        <text x="875" y="290">sweat gland</text><path d="M385 365Q660 340 858 286"/>
        <text x="875" y="350">skin blood vessels</text><path d="M760 365L858 347"/>
      </g>

      <text className="bt-state-title" x="470" y="550" textAnchor="middle">{hot?"HOT: vasodilation + sweating increase heat loss":"COLD: vasoconstriction reduces heat loss; shivering can produce heat"}</text>
    </svg></ReviewedScienceDiagram>
    <div className="spark-temp-skin-notes">
      <article><b>Skin blood vessels</b><p>{hot?"Arterioles dilate, sending more warm blood through surface capillaries.":"Arterioles constrict, reducing blood flow through surface capillaries."}</p></article>
      <article><b>Sweat glands</b><p>{hot?"More sweat reaches the skin surface. Evaporation transfers latent heat away from the body.":"Sweat production is reduced, limiting unnecessary evaporative heat loss."}</p></article>
      <article><b>Hair and insulation</b><p>{hot?"Arrector pili muscles relax and hairs lie flatter.":"Arrector pili muscles can contract and raise hairs. In humans this has only a small insulating effect."}</p></article>
      <article><b>Whole-body response</b><p>{hot?"Heat loss increases until core temperature moves back towards the normal range.":"Shivering can increase muscle respiration and heat production while heat loss is reduced."}</p></article>
    </div>
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
