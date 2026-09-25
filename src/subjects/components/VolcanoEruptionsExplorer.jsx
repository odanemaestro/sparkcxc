import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./volcanoEruptionsExplorer.css";

function EruptionStyleDiagram({explosive}){
  const gasBubbles = explosive
    ? [[410,345,13],[438,330,11],[395,315,10],[430,298,13],[405,280,9],[439,260,11]]
    : [[410,345,12],[429,300,10],[416,250,9],[426,195,8],[420,145,7]];

  return <ReviewedScienceDiagram site="VolcanoEruptionsExplorer.jsx:9"><svg viewBox="0 0 900 520" role="img" aria-label={explosive
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
  </svg></ReviewedScienceDiagram>;
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
    <article>
      <ReviewedScienceDiagram site="VolcanoEruptionsExplorer.jsx:80"><svg className="spark-volcano-type-svg" viewBox="0 0 360 190" role="img" aria-label="Shield volcano with broad gentle slopes built by repeated fluid lava flows">
        <path className="vt-ground" d="M10 165H350"/>
        <path className="vt-shield-cone" d="M20 165Q90 135 145 105Q180 88 215 105Q270 135 340 165Z"/>
        <path className="vt-lava-layer" d="M55 152Q120 130 180 112Q242 130 305 152"/>
        <path className="vt-lava-layer" d="M88 145Q137 126 180 118Q225 126 273 145"/>
        <path className="vt-central-vent" d="M180 160V105"/>
        <text className="vt-svg-label" x="180" y="32" textAnchor="middle">broad, gentle slopes</text>
        <text className="vt-svg-small" x="180" y="182" textAnchor="middle">repeated low-viscosity lava flows</text>
      </svg></ReviewedScienceDiagram>
      <span>SHIELD</span><h4>Broad, gentle slopes</h4><p>Built mainly by fluid lava that spreads far from the vent.</p>
    </article>

    <article>
      <ReviewedScienceDiagram site="VolcanoEruptionsExplorer.jsx:93"><svg className="spark-volcano-type-svg" viewBox="0 0 360 190" role="img" aria-label="Composite volcano with steep sides, central vent and alternating lava and ash layers">
        <path className="vt-ground" d="M10 165H350"/>
        <path className="vt-composite-cone" d="M55 165L158 48Q180 25 202 48L305 165Z"/>
        <path className="vt-layer ash" d="M88 148L167 64Q180 52 193 64L272 148"/>
        <path className="vt-layer lava" d="M108 154L170 83Q180 74 190 83L252 154"/>
        <path className="vt-layer ash" d="M128 158L174 105Q180 99 186 105L232 158"/>
        <path className="vt-central-vent" d="M180 160V52"/>
        <ellipse className="vt-crater" cx="180" cy="47" rx="24" ry="8"/>
        <text className="vt-svg-label" x="286" y="50">steep cone</text>
        <text className="vt-svg-small" x="180" y="182" textAnchor="middle">alternating lava and pyroclastic layers</text>
      </svg></ReviewedScienceDiagram>
      <span>COMPOSITE / STRATOVOLCANO</span><h4>Tall, steep and layered</h4><p>Alternating lava and pyroclastic deposits. Viscous magma can trap gases and produce explosive eruptions.</p>
    </article>

    <article>
      <ReviewedScienceDiagram site="VolcanoEruptionsExplorer.jsx:108"><svg className="spark-volcano-type-svg" viewBox="0 0 360 190" role="img" aria-label="Ash and cinder cone with a crater and loose erupted fragments piled around a central vent">
        <path className="vt-ground" d="M10 165H350"/>
        <path className="vt-cinder-cone" d="M78 165L160 72Q180 54 200 72L282 165Z"/>
        <ellipse className="vt-crater" cx="180" cy="69" rx="30" ry="10"/>
        <path className="vt-central-vent" d="M180 160V78"/>
        <g className="vt-cinders">
          {[[110,142],[128,126],[145,112],[213,112],[233,132],[250,148],[155,150],[205,147]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={5+(i%2)*2}/>)}
        </g>
        <text className="vt-svg-label" x="180" y="30" textAnchor="middle">ash and cinders fall around vent</text>
        <text className="vt-svg-small" x="180" y="182" textAnchor="middle">small, steep-sided cone of fragments</text>
      </svg></ReviewedScienceDiagram>
      <span>ASH / CINDER CONE</span><h4>Small, steep cone</h4><p>Built mainly from cinders, ash and fragments of lava thrown into the air around a vent.</p>
    </article>

    <article>
      <ReviewedScienceDiagram site="VolcanoEruptionsExplorer.jsx:123"><svg className="spark-volcano-type-svg" viewBox="0 0 360 190" role="img" aria-label="Submarine volcano erupting below sea level with a volcanic cone rising from the sea floor">
        <rect className="vt-water" x="10" y="60" width="340" height="105"/>
        <line className="vt-waterline" x1="10" y1="60" x2="350" y2="60"/>
        <path className="vt-submarine-cone-svg" d="M62 165L154 92Q180 72 206 92L298 165Z"/>
        <path className="vt-central-vent" d="M180 160V94"/>
        <g className="vt-submarine-plume">
          <circle cx="180" cy="82" r="13"/><circle cx="165" cy="69" r="11"/><circle cx="194" cy="65" r="10"/>
        </g>
        <text className="vt-svg-label" x="72" y="42">sea level</text>
        <text className="vt-svg-small" x="180" y="182" textAnchor="middle">eruption occurs below the sea surface</text>
      </svg></ReviewedScienceDiagram>
      <span>SUBMARINE VOLCANO</span><h4>Erupts below sea level</h4><p>Kick-'em-Jenny north of Grenada is a regional example.</p>
    </article>
  </div>;
}

function StructureView(){
  return <div className="spark-volcano-structure">
    <ReviewedScienceDiagram site="VolcanoEruptionsExplorer.jsx:141"><svg className="spark-volcano-structure-svg" viewBox="0 0 980 620" role="img" aria-label="Cross-section of an erupting volcano showing crater, ash and gas plume, layered cone, main vent, secondary vent, magma chamber, magma below ground and lava flowing on the surface">
      <defs>
        <marker id="volcano-callout-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="vs-arrow-head"/>
        </marker>
      </defs>

      <rect className="vs-sky" x="0" y="0" width="980" height="620"/>
      <path className="vs-ground" d="M45 470H935"/>

      <path className="vs-cone" d="M145 470L400 165Q455 105 510 165L785 470Z"/>
      <g className="vs-cone-layers">
        <path d="M188 451L410 190Q455 145 500 190L742 451"/>
        <path d="M225 455L417 220Q455 185 493 220L705 455"/>
        <path d="M260 458L424 255Q455 226 486 255L670 458"/>
        <path d="M300 462L433 300Q455 281 477 300L630 462"/>
      </g>

      <ellipse className="vs-crater" cx="455" cy="164" rx="72" ry="25"/>
      <path className="vs-main-vent" d="M455 180V445"/>
      <path className="vs-secondary-vent" d="M455 330Q540 325 585 250"/>
      <ellipse className="vs-chamber" cx="455" cy="510" rx="135" ry="70"/>
      <path className="vs-magma-rise" d="M455 448V188"/>
      <path className="vs-lava-flow" d="M515 180Q585 215 650 290Q720 365 815 425"/>

      <g className="vs-eruption-column">
        <path d="M430 148Q410 90 440 52M458 147Q455 85 480 42M486 148Q505 98 526 66"/>
      </g>
      <g className="vs-ash-cloud">
        <circle cx="430" cy="62" r="47"/><circle cx="472" cy="42" r="58"/><circle cx="527" cy="63" r="50"/><circle cx="565" cy="84" r="37"/>
      </g>
      <g className="vs-ejected-fragments">
        {[[370,105],[340,135],[550,120],[585,145],[315,170],[620,178]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={6+(i%2)*2}/>)}
      </g>

      <g className="vs-callouts">
        <path d="M455 142L730 62" markerEnd="url(#volcano-callout-arrow)"/><text x="748" y="65">crater</text>
        <path d="M455 285L745 195" markerEnd="url(#volcano-callout-arrow)"/><text x="763" y="200">main vent</text>
        <path d="M558 279L750 275" markerEnd="url(#volcano-callout-arrow)"/><text x="768" y="280">secondary vent</text>
        <path d="M695 330L825 355" markerEnd="url(#volcano-callout-arrow)"/><text x="842" y="361">lava flow</text>
        <path d="M530 407L765 430" markerEnd="url(#volcano-callout-arrow)"/><text x="784" y="436">layers of lava and pyroclastic material</text>
        <path d="M455 505L190 535" markerEnd="url(#volcano-callout-arrow)"/><text x="170" y="541" textAnchor="end">magma chamber</text>
        <path d="M505 65L770 118" markerEnd="url(#volcano-callout-arrow)"/><text x="788" y="123">ash and gas plume</text>
      </g>

      <text className="vs-magma-label" x="455" y="520" textAnchor="middle">MAGMA below the surface</text>
      <text className="vs-lava-label" x="742" y="392">LAVA at the surface</text>
      <text className="vs-caption" x="490" y="598" textAnchor="middle">When magma reaches Earth's surface it is called lava.</text>
    </svg></ReviewedScienceDiagram>
    <p>Molten rock below the surface is magma. It can collect in a magma chamber and rise through the main vent or a secondary vent. At the surface, magma is called lava. Repeated eruptions can build layers of lava and pyroclastic material around the vent, while explosive eruptions may send ash, gases and rock fragments above the crater.</p>
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
    <ReviewedScienceDiagram site="VolcanoEruptionsExplorer.jsx:205"><svg viewBox="0 0 840 410" role="img" aria-label="Simplified convergent plate boundary producing magma and a volcano">
      <path className="vp-oceanic" d="M60 210H385L560 335"/>
      <path className="vp-continental" d="M390 210H785"/>
      <path className="vp-magma-rise" d="M525 315Q510 245 555 185"/>
      <path className="vp-volcano" d="M500 210L555 115L610 210Z"/>
      <text className="vp-label" x="185" y="185">oceanic plate</text><text className="vp-label" x="650" y="185">overriding plate</text><text className="vp-label" x="560" y="95" textAnchor="middle">volcano</text>
    </svg></ReviewedScienceDiagram>
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
