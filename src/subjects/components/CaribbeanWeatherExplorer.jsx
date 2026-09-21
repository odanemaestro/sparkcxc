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
  return <div className="spark-cyclone-energy">
    <article><span>WARM OCEAN</span><h4>Evaporation supplies moisture</h4><p>Warm tropical water supports strong evaporation into the lower atmosphere.</p></article>
    <div>→</div>
    <article><span>RISING MOIST AIR</span><h4>Condensation releases latent heat</h4><p>As moist air rises and condenses, latent heat is released and helps drive vigorous convection.</p></article>
    <div>→</div>
    <article><span>LOW PRESSURE</span><h4>Air converges toward the centre</h4><p>Organised inflow and rotation sustain the tropical cyclone when other atmospheric conditions are favourable.</p></article>
    <aside><b>Why storms weaken over land</b><p>They lose direct access to their warm-ocean moisture and energy source, while land friction also disrupts circulation.</p></aside>
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
