import React,{useMemo,useState} from "react";
import "./caribbeanWeatherExplorer.css";

function SeasonsView(){
  return <div className="spark-weather-seasons">
    <div className="spark-season-bar">
      {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m,i)=><div key={m} className={i>=5&&i<=10?"wet":"dry"}><b>{m}</b><span>{i>=5&&i<=10?"wetter":"drier"}</span></div>)}
    </div>
    <article><span>GENERAL CARIBBEAN PATTERN</span><h4>Drier months often December to May, wetter months often June to November</h4><p>Local rainfall varies by island, elevation and exposure, so this is a broad regional pattern rather than an identical calendar for every location.</p></article>
    <article><span>ATLANTIC HURRICANE SEASON</span><h4>June 1 to November 30</h4><p>Tropical cyclones can occur outside these dates, but this is the official Atlantic season used for preparedness and forecasting.</p></article>
  </div>;
}

function DevelopmentView(){
  const [wind,setWind]=useState(45);
  const w=Math.max(0,Number(wind)||0);
  const stage=w<63?"Tropical depression":w<119?"Tropical storm":"Hurricane";
  return <div className="spark-cyclone-development">
    <div className="spark-cyclone-stages">
      <article className={stage==="Tropical depression"?"active":""}><span>1</span><b>Tropical depression</b><p>Maximum sustained winds below 63 km/h.</p></article>
      <div>→</div>
      <article className={stage==="Tropical storm"?"active":""}><span>2</span><b>Tropical storm</b><p>Maximum sustained winds about 63–118 km/h.</p></article>
      <div>→</div>
      <article className={stage==="Hurricane"?"active":""}><span>3</span><b>Hurricane</b><p>Maximum sustained winds at least 119 km/h.</p></article>
    </div>
    <label>Maximum sustained wind, km/h<input type="range" min="20" max="180" value={wind} onChange={e=>setWind(e.target.value)}/></label>
    <strong>{w} km/h → {stage}</strong>
    <p>Classification is based on maximum sustained wind speed. Intensification also depends on ocean and atmospheric conditions.</p>
  </div>;
}

function StructureView(){
  return <div className="spark-hurricane-structure">
    <svg viewBox="0 0 820 460" role="img" aria-label="Simplified hurricane with eye, eyewall and spiral rainbands">
      <circle className="hw-band outer" cx="410" cy="225" r="175"/>
      <circle className="hw-band middle" cx="410" cy="225" r="125"/>
      <circle className="hw-eyewall" cx="410" cy="225" r="72"/>
      <circle className="hw-eye" cx="410" cy="225" r="35"/>
      <path className="hw-spiral" d="M250 140Q360 70 480 115Q590 155 575 280Q555 365 445 385"/>
      <path className="hw-spiral" d="M570 135Q650 230 570 335Q465 425 330 355Q210 300 225 190"/>
      <line className="hw-callout" x1="445" y1="225" x2="670" y2="95"/><text className="hw-label" x="680" y="92">eye: relatively calm centre</text>
      <line className="hw-callout" x1="480" y1="175" x2="680" y2="175"/><text className="hw-label" x="690" y="180">eyewall: strongest winds and rain</text>
      <line className="hw-callout" x1="290" y1="315" x2="125" y2="365"/><text className="hw-label" x="115" y="385">spiral rainbands</text>
    </svg>
    <p>A hurricane is a low-pressure tropical cyclone. Air spirals inward and rises around the centre. The eye is relatively calm, while the surrounding eyewall contains the strongest winds.</p>
  </div>;
}

function EnergyView(){
  const [surface,setSurface]=useState("ocean");
  const ocean=surface==="ocean";
  return <div className="spark-cyclone-energy">
    <div className="spark-weather-energy-toggle"><button type="button" className={ocean?"active":""} onClick={()=>setSurface("ocean")}>Over warm ocean</button><button type="button" className={!ocean?"active":""} onClick={()=>setSurface("land")}>Moves over land</button></div>
    <svg className="spark-hurricane-energy-svg" viewBox="0 0 900 500" role="img" aria-label={ocean?"Tropical cyclone energy cycle over warm ocean showing evaporation, rising moist air, condensation, latent heat, surface inflow and upper outflow":"Tropical cyclone over land showing reduced moisture supply, friction and weakening convection"}>
      <defs>
        <marker id="hw-energy-blue-head" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="hw-energy-blue-head"/></marker>
        <marker id="hw-energy-warm-head" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="hw-energy-warm-head"/></marker>
      </defs>
      <rect className="hw-energy-bg" x="0" y="0" width="900" height="500" rx="20"/>
      {ocean?<React.Fragment>
        <rect className="hw-warm-ocean" x="0" y="380" width="900" height="120"/>
        <path className="hw-ocean-surface" d="M0 380Q110 362 220 380T440 380T660 380T900 380"/>
        <text className="hw-energy-label ocean" x="450" y="466" textAnchor="middle">warm ocean supplies heat and water vapour</text>
        {[330,395,460,525,590].map((x,i)=><path key={x} className="hw-evaporation" d={"M"+x+" 370Q"+(x-18)+" 326 "+x+" "+(286-(i%2)*12)} markerEnd="url(#hw-energy-warm-head)"/>)}
        <text className="hw-energy-label" x="290" y="322">evaporation</text>
      </React.Fragment>:<React.Fragment>
        <path className="hw-land-surface" d="M0 395Q100 360 200 390Q310 348 430 390Q560 350 680 392Q790 360 900 392V500H0Z"/>
        <text className="hw-energy-label land" x="450" y="466" textAnchor="middle">land cuts off the direct warm-ocean moisture supply</text>
        <path className="hw-friction-mark" d="M265 386L315 355M300 391L350 360M550 386L600 355M585 391L635 360"/>
        <text className="hw-energy-label" x="450" y="423" textAnchor="middle">greater surface friction disrupts low-level circulation</text>
      </React.Fragment>}

      <g className={ocean?"hw-convection active":"hw-convection weak"}>
        <path className="hw-cloud-tower" d="M335 305Q315 254 360 230Q345 174 405 165Q405 104 462 112Q505 76 545 119Q598 121 593 177Q638 194 615 235Q655 275 614 309Z"/>
        <ellipse className="hw-cloud-top" cx="475" cy="119" rx="128" ry="38"/>
        <text className="hw-energy-label cloud" x="474" y="154" textAnchor="middle">deep cloud and condensation</text>
      </g>

      <path className={ocean?"hw-rising-air":"hw-rising-air weak"} d="M450 350Q424 292 448 236Q468 198 470 158" markerEnd="url(#hw-energy-warm-head)"/>
      <text className="hw-energy-label" x="485" y="268">rising moist air</text>

      {ocean&&<React.Fragment>
        <circle className="hw-latent-heat" cx="560" cy="205" r="47"/>
        <text className="hw-latent-title" x="560" y="198" textAnchor="middle">LATENT</text>
        <text className="hw-latent-title" x="560" y="217" textAnchor="middle">HEAT</text>
        <text className="hw-energy-small" x="560" y="267" textAnchor="middle">released during condensation</text>

        <circle className="hw-low-pressure" cx="450" cy="356" r="28"/>
        <text className="hw-low-text" x="450" y="365" textAnchor="middle">L</text>
        <path className="hw-surface-inflow left" d="M95 352Q235 330 412 355" markerEnd="url(#hw-energy-blue-head)"/>
        <path className="hw-surface-inflow right" d="M805 352Q665 330 488 355" markerEnd="url(#hw-energy-blue-head)"/>
        <text className="hw-energy-label" x="146" y="324">surface air converges toward lower pressure</text>

        <path className="hw-upper-outflow left" d="M430 98Q300 65 175 95" markerEnd="url(#hw-energy-blue-head)"/>
        <path className="hw-upper-outflow right" d="M520 98Q650 65 775 95" markerEnd="url(#hw-energy-blue-head)"/>
        <text className="hw-energy-label" x="475" y="54" textAnchor="middle">upper-level outflow removes rising air</text>
      </React.Fragment>}

      {!ocean&&<React.Fragment>
        <path className="hw-cutoff" d="M320 332L580 332M345 310L555 354"/>
        <text className="hw-energy-label danger" x="450" y="300" textAnchor="middle">less evaporation and moisture available</text>
        <text className="hw-energy-small" x="450" y="82" textAnchor="middle">convection and organised circulation weaken</text>
      </React.Fragment>}
    </svg>
    <p>{ocean?"Warm ocean water supplies moisture through evaporation. Rising moist air cools and condenses, releasing latent heat. This supports deep convection and lower surface pressure, drawing in more moist air while air flows outward aloft.":"Over land, the cyclone loses direct access to warm-ocean evaporation and moisture. Greater surface friction also disrupts circulation, so organised convection and wind usually weaken."}</p>
  </div>;
}

function PressureView(){
  const [pressure,setPressure]=useState(996);
  const p=Number(pressure)||996;
  const level=p<970?"very intense":p<990?"strong":"weaker";
  return <div className="spark-pressure-weather">
    <label>Illustrative central pressure, mb<input type="range" min="940" max="1010" value={pressure} onChange={e=>setPressure(e.target.value)}/></label>
    <strong>{p} mb → {level} low-pressure system in this simplified comparison</strong>
    <p>For the same storm system, falling central pressure generally signals strengthening. In the bank example, 965 mb is more intense than higher-pressure days.</p>
    <div className="spark-pressure-map"><b>L</b><span>pressure decreases toward the centre</span></div>
  </div>;
}

function HazardsView(){
  return <div className="spark-weather-hazards">
    <article><span>STORM SURGE</span><h4>Abnormal rise of sea level</h4><p>Strong winds and low pressure push water toward the coast, causing dangerous coastal flooding.</p></article>
    <article><span>WIND</span><h4>Structural and flying-debris damage</h4><p>Secure loose outdoor objects and protect openings before conditions deteriorate.</p></article>
    <article><span>RAIN AND FLOODING</span><h4>Freshwater flood and landslide risk</h4><p>Heavy rain can continue well away from the eye and can remain dangerous after wind weakens.</p></article>
    <article><span>PREPARATION</span><h4>Water, food, medicines and official alerts</h4><p>Store safe drinking water, charge communications devices, secure property and follow official evacuation guidance.</p></article>
  </div>;
}

export default function CaribbeanWeatherExplorer(){
  const [view,setView]=useState("seasons");
  const summary=useMemo(()=>({
    seasons:"The Caribbean generally has a drier early-year period and a wetter June-to-November period, though local rainfall varies.",
    development:"Tropical cyclones are classified by maximum sustained wind speed.",
    structure:"The hurricane eye is relatively calm, while the eyewall has the strongest winds.",
    energy:"Warm moist ocean air supplies the energy and moisture that sustain tropical cyclones.",
    pressure:"Central pressure is one important measure used to track cyclone intensity.",
    hazards:"Hurricane danger includes wind, freshwater flooding and storm surge, so preparation must begin before conditions worsen."
  })[view],[view]);
  return <section className="spark-caribbean-weather">
    <header><span>CARIBBEAN WEATHER</span><h3>Connect seasonal rainfall, tropical-cyclone development and hurricane hazards</h3><p>Caribbean weather is strongly influenced by tropical oceans, trade winds, atmospheric pressure systems and seasonal changes in rainfall and tropical-cyclone activity.</p></header>
    <div className="spark-weather-tabs">{[["seasons","Wet and dry seasons"],["development","Cyclone stages"],["structure","Hurricane structure"],["energy","How hurricanes are powered"],["pressure","Pressure"],["hazards","Hazards and preparation"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-weather-stage">{view==="seasons"&&<SeasonsView/>}{view==="development"&&<DevelopmentView/>}{view==="structure"&&<StructureView/>}{view==="energy"&&<EnergyView/>}{view==="pressure"&&<PressureView/>}{view==="hazards"&&<HazardsView/>}</div>
    <div className="spark-weather-summary"><strong>{summary}</strong><span>Official Atlantic hurricane season: June 1 to November 30.</span></div>
  </section>;
}
