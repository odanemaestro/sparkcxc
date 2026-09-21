import React,{useMemo,useState} from "react";
import "./volcanoEruptionsExplorer.css";

function EruptionStyleDiagram({explosive}){
  const gasBubbles = explosive
    ? [[410,345,13],[438,330,11],[395,315,10],[430,298,13],[405,280,9],[439,260,11]]
    : [[410,345,12],[429,300,10],[416,250,9],[426,195,8],[420,145,7]];

  return <svg viewBox="0 0 900 520" role="img" aria-label={explosive
    ? "High-viscosity volcano cross-section showing trapped gas, pressure build-up and explosive eruption"
    : "Low-viscosity volcano cross-section showing easy gas escape and a flowing lava eruption"}>

    <rect className="ve-sky" x="20" y="20" width="860" height="455" rx="18" />
    <path className="ve-ground" d="M20 410H880" />

    <path className="ve-cone" d={explosive
      ? "M185 410L365 132Q420 80 475 132L655 410Z"
      : "M105 410Q245 308 365 216Q420 170 475 216Q595 308 795 410Z"} />

    <ellipse className="ve-crater" cx="420" cy={explosive?130:206} rx={explosive?58:70} ry="20" />
    <path className="ve-vent" d={explosive?"M420 145V355":"M420 220V355"} />
    <ellipse className="ve-chamber" cx="420" cy="390" rx="120" ry="62" />

    <g className={explosive?"ve-gas trapped":"ve-gas escaping"}>
      {gasBubbles.map(([x,y,r],i)=><circle key={i} cx={x} cy={y} r={r}/>)}
    </g>

    {explosive ? <>
      <path className="ve-pressure-arrow left" d="M390 285Q350 250 326 215" />
      <path className="ve-pressure-arrow right" d="M450 285Q490 250 514 215" />

      <g className="ve-ash-cloud" transform="translate(420 62)">
        <circle cx="-65" cy="8" r="45"/><circle cx="-25" cy="-15" r="60"/><circle cx="32" cy="-12" r="58"/><circle cx="75" cy="15" r="44"/>
      </g>
      <g className="ve-ejecta">
        {[
          [326,110,-52,-58],[350,88,-32,-74],[485,86,35,-76],[514,108,58,-58],
        ].map(([x,y,dx,dy],i)=><path key={i} d={`M${x} ${y}l${dx} ${dy}`} />)}
      </g>
      <path className="ve-pyroclastic" d="M360 160Q300 185 246 250Q204 300 170 366" />
      <text className="ve-label danger" x="420" y="40" textAnchor="middle">ash + gas + rock fragments</text>
      <text className="ve-label pressure" x="570" y="270">gas trapped, pressure builds</text>
      <text className="ve-label" x="135" y="320">pyroclastic material</text>
    </> : <>
      <path className="ve-gas-arrow" d="M420 235V95" />
      <g className="ve-gas-clouds">
        {[95,130,165].map((y,i)=><circle key={y} cx={420+(i-1)*16} cy={y} r={10-i*2}/>)}
      </g>
      <path className="ve-lava-flow" d="M465 218Q535 240 610 300Q680 352 770 390" />
      <text className="ve-label" x="475" y="92">gas escapes readily</text>
      <text className="ve-label lava" x="685" y="335">runny lava flows far</text>
    </>}

    <text className="ve-label chamber" x="420" y="400" textAnchor="middle">magma chamber</text>
    <text className="ve-label" x="455" y={explosive?230:285}>main vent</text>

    <g className="ve-properties" transform="translate(645 62)">
      <rect x="0" y="0" width="210" height="130" rx="15" />
      <text className="ve-prop-title" x="16" y="30">{explosive?"HIGH VISCOSITY":"LOW VISCOSITY"}</text>
      <text className="ve-prop-text" x="16" y="57">{explosive?"thick, resistant to flow":"runny, flows easily"}</text>
      <text className="ve-prop-text" x="16" y="82">{explosive?"gas escapes slowly":"gas escapes more easily"}</text>
      <text className="ve-prop-text" x="16" y="107">{explosive?"explosive potential":"mainly effusive eruption"}</text>
    </g>
  </svg>;
}

function StyleView(){
  const [viscosity,setViscosity]=useState("low");
  const explosive=viscosity==="high";
  return <div className="spark-volcano-style">
    <div className="spark-volcano-toggle"><button type="button" className={!explosive?"active":""} onClick={()=>setViscosity("low")}>Low-viscosity magma</button><button type="button" className={explosive?"active":""} onClick={()=>setViscosity("high")}>High-viscosity magma</button></div>
    <div className="spark-eruption-cross-section"><EruptionStyleDiagram explosive={explosive}/></div>
    <p>{explosive?"Thick, sticky magma resists flow and traps gases. Pressure can build until gas expands violently, producing explosive eruptions, ash and pyroclastic material.":"Runny, low-viscosity magma allows gases to escape more easily and can travel long distances as lava, producing mainly effusive eruptions."}</p>
  </div>;
}

function TypesView(){
  return <div className="spark-volcano-types">
    <article><div className="vt-shape shield"></div><span>SHIELD</span><h4>Broad, gentle slopes</h4><p>Built mainly by fluid lava that spreads far from the vent.</p></article>
    <article><div className="vt-shape composite"></div><span>COMPOSITE / STRATOVOLCANO</span><h4>Tall, steep and layered</h4><p>Alternating lava and pyroclastic deposits. Viscous magma can trap gases and produce explosive eruptions.</p></article>
    <article><div className="vt-shape cinder"></div><span>CINDER CONE</span><h4>Small, steep cone</h4><p>Built mainly from cinders and fragments of lava thrown into the air around a vent.</p></article>
    <article><div className="vt-sea"><div className="vt-submarine"></div></div><span>SUBMARINE VOLCANO</span><h4>Erupts below sea level</h4><p>Kick-'em-Jenny north of Grenada is a regional example.</p></article>
  </div>;
}

function StructureView(){
  return <div className="spark-volcano-structure">
    <svg viewBox="0 0 840 520" role="img" aria-label="Cross-section of a volcano showing crater vent cone lava and magma chamber">
      <path className="vs-cone" d="M150 400L360 125Q420 80 480 125L690 400Z"/>
      <path className="vs-vent" d="M410 145V370"/>
      <ellipse className="vs-crater" cx="420" cy="130" rx="68" ry="24"/>
      <ellipse className="vs-chamber" cx="420" cy="410" rx="115" ry="58"/>
      <path className="vs-magma" d="M420 365V155"/>
      <path className="vs-lava" d="M470 145Q540 195 600 310"/>
      <line className="vs-call" x1="420" y1="110" x2="675" y2="65"/><text className="vs-label" x="685" y="68">crater</text>
      <line className="vs-call" x1="432" y1="260" x2="690" y2="225"/><text className="vs-label" x="700" y="230">main vent</text>
      <line className="vs-call" x1="490" y1="365" x2="700" y2="350"/><text className="vs-label" x="710" y="355">cone</text>
      <line className="vs-call" x1="420" y1="410" x2="150" y2="450"/><text className="vs-label" x="140" y="455" textAnchor="end">magma chamber</text>
    </svg>
    <p>Molten rock below the surface is magma. When it reaches the surface it is called lava. Magma rises from storage regions through vents and may erupt from a crater or fissures.</p>
  </div>;
}

function CaribbeanView(){
  return <div className="spark-volcano-caribbean">
    <article><span>KICK-'EM-JENNY</span><h4>Submarine volcano north of Grenada</h4><p>Kick-'em-Jenny is a live submarine volcano in the Eastern Caribbean and is monitored because submarine eruptions can affect nearby seas and shipping.</p></article>
    <article><span>SOUFRIÈRE HILLS, MONTSERRAT</span><h4>Dome-forming and explosive activity</h4><p>The 1995–2010 eruptive episode produced lava domes, ash and pyroclastic flows. Plymouth was abandoned after severe volcanic destruction.</p></article>
    <article><span>LONG-TERM BENEFIT</span><h4>Fertile soils</h4><p>Weathered volcanic material can produce mineral-rich soils that support agriculture.</p></article>
    <article><span>SHORT-TERM IMPACT</span><h4>Ash damages crops and infrastructure</h4><p>Ash fall can damage crops, contaminate water, reduce visibility and overload roofs.</p></article>
  </div>;
}

function PlateView(){
  return <div className="spark-volcano-plates">
    <svg viewBox="0 0 840 410" role="img" aria-label="Simplified convergent plate boundary producing magma and a volcano">
      <path className="vp-oceanic" d="M60 210H385L560 335"/>
      <path className="vp-continental" d="M390 210H785"/>
      <path className="vp-magma-rise" d="M525 315Q510 245 555 185"/>
      <path className="vp-volcano" d="M500 210L555 115L610 210Z"/>
      <text className="vp-label" x="185" y="185">oceanic plate</text><text className="vp-label" x="650" y="185">overriding plate</text><text className="vp-label" x="560" y="95" textAnchor="middle">volcano</text>
    </svg>
    <p>Many Caribbean volcanoes lie near tectonic plate boundaries. Plate movement can generate earthquakes and create conditions that allow magma to form and rise through the crust.</p>
  </div>;
}

function MonitoringView(){
  const [mag,setMag]=useState(6);
  const m=Math.max(1,Math.min(8,Number(mag)||6));
  const amp=Math.pow(10,m-5);
  return <div className="spark-volcano-monitoring">
    <article><span>SEISMOGRAPH</span><h4>Records ground vibration</h4><p>Volcano observatories use seismometers to detect earthquakes that may accompany magma movement.</p><div className="spark-seismo-trace"></div></article>
    <article><span>MAGNITUDE</span><h4>Logarithmic comparison</h4><label>Magnitude<input type="range" min="5" max="8" step="1" value={m} onChange={e=>setMag(e.target.value)}/></label><strong>Wave amplitude relative to magnitude 5: ×{amp}</strong><p>On the original Richter scale, each whole-number increase represents about a tenfold increase in measured wave amplitude.</p></article>
    <article><span>EARTHQUAKE SAFETY</span><h4>Drop, Cover and Hold On</h4><p>During strong shaking indoors, get low, protect yourself under sturdy furniture if possible and hold on. Stay away from windows and do not use elevators during the shaking.</p></article>
  </div>;
}

export default function VolcanoEruptionsExplorer(){
  const [view,setView]=useState("style");
  const summary=useMemo(()=>({
    style:"Magma viscosity and gas content strongly influence whether an eruption is mainly effusive or explosive.",
    types:"Volcano shape reflects the materials erupted and how easily lava flows away from the vent.",
    structure:"Magma becomes lava when it reaches Earth's surface.",
    caribbean:"Eastern Caribbean volcanoes provide important regional examples of submarine, dome-forming and explosive activity.",
    plates:"Volcanoes and earthquakes commonly cluster near tectonic plate boundaries.",
    monitoring:"Seismic monitoring helps scientists track ground vibrations associated with volcanic and tectonic activity."
  })[view],[view]);
  return <section className="spark-volcano-eruptions">
    <header><span>VOLCANIC ERUPTIONS</span><h3>Connect magma properties, volcano shape, tectonics and Caribbean hazards</h3><p>Volcanic eruption style depends strongly on magma composition, viscosity, gas content and the geological setting through which magma rises.</p></header>
    <div className="spark-volcano-tabs">{[["style","Eruption style"],["types","Volcano types"],["structure","Volcano structure"],["caribbean","Caribbean examples"],["plates","Plate boundaries"],["monitoring","Monitoring"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-volcano-stage">{view==="style"&&<StyleView/>}{view==="types"&&<TypesView/>}{view==="structure"&&<StructureView/>}{view==="caribbean"&&<CaribbeanView/>}{view==="plates"&&<PlateView/>}{view==="monitoring"&&<MonitoringView/>}</div>
    <div className="spark-volcano-summary"><strong>{summary}</strong><span>Runny lava tends to build broad shield volcanoes. Viscous gas-rich magma can produce more explosive composite-volcano eruptions.</span></div>
  </section>;
}
