import React,{useMemo,useState} from "react";
import "./volcanoEruptionsExplorer.css";

function StyleView(){
  const [viscosity,setViscosity]=useState("low");
  const explosive=viscosity==="high";
  return <div className="spark-volcano-style">
    <div className="spark-volcano-toggle"><button type="button" className={!explosive?"active":""} onClick={()=>setViscosity("low")}>Low-viscosity magma</button><button type="button" className={explosive?"active":""} onClick={()=>setViscosity("high")}>High-viscosity magma</button></div>
    <div className={"spark-eruption-model "+(explosive?"explosive":"effusive")}>
      <div className="spark-eruption-cone"></div>
      <div className="spark-eruption-vent"></div>
      <div className="spark-eruption-magma"></div>
      {explosive?<><div className="spark-ash-cloud">ash + gas</div><div className="spark-ejecta one"></div><div className="spark-ejecta two"></div><div className="spark-ejecta three"></div></>:<div className="spark-lava-flow">runny lava flow</div>}
    </div>
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
