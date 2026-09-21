import React,{useMemo,useState} from "react";
import "./hardWaterExplorer.css";

function LatherView(){
  const [sample,setSample]=useState("soft");
  const data={
    soft:{name:"Soft water",lather:90,scum:5,text:"Soap lathers readily because there are few calcium or magnesium ions to react with it."},
    temp:{name:"Temporary hard water",lather:35,scum:65,text:"Calcium or magnesium hydrogencarbonates react with soap and reduce lather."},
    perm:{name:"Permanent hard water",lather:25,scum:75,text:"Calcium or magnesium sulphates and other non-hydrogencarbonate salts reduce lather and form scum."}
  }[sample];
  const foamTop=290-(data.lather*1.65);
  const scumY=350-(data.scum*0.42);
  const bubbles=Array.from({length:14},(_,i)=>({
    cx:368+(i%5)*34+(i%2)*7,
    cy:foamTop+22+Math.floor(i/5)*27,
    r:9+(i%3)*3
  }));
  return <div className="spark-hardwater-lather">
    <div className="spark-hardwater-toggle">{[["soft","Soft"],["temp","Temporary hard"],["perm","Permanent hard"]].map(([k,l])=><button type="button" key={k} className={sample===k?"active":""} onClick={()=>setSample(k)}>{l}</button>)}</div>

    <svg className="spark-hardwater-soaptest-svg" viewBox="0 0 900 500" role="img" aria-label={data.name+" soap-lather test showing equal water and soap conditions, foam height and scum formation after shaking"}>
      <defs>
        <marker id="hw-shake-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="hw-soap-arrow-head"/>
        </marker>
      </defs>

      <g className="hw-soap-method" transform="translate(55 75)">
        <rect x="0" y="0" width="235" height="300" rx="18"/>
        <text className="hw-title" x="118" y="38" textAnchor="middle">fair soap test</text>
        <text className="hw-small" x="28" y="84">1. same water volume</text>
        <text className="hw-small" x="28" y="120">2. same amount of soap</text>
        <text className="hw-small" x="28" y="156">3. stopper and shake equally</text>
        <text className="hw-small" x="28" y="192">4. compare lather and scum</text>
        <path className="hw-shake-path" d="M48 250Q118 215 186 250" markerEnd="url(#hw-shake-arrow)"/>
        <text className="hw-small" x="118" y="280" textAnchor="middle">keep conditions constant</text>
      </g>

      <g className="hw-soap-bottle" transform="translate(325 45)">
        <rect className="hw-soap-neck" x="100" y="0" width="95" height="70" rx="12"/>
        <path className="hw-soap-glass" d="M70 62H225V105Q225 122 246 148Q275 183 275 245V380Q275 422 235 438H60Q20 422 20 380V245Q20 183 49 148Q70 122 70 105Z"/>
        <path className="hw-soap-water" d="M34 260H261V380Q261 404 231 416H64Q34 404 34 380Z"/>
        <line className="hw-water-level" x1="34" y1="260" x2="261" y2="260"/>
        <text className="hw-small" x="148" y="286" textAnchor="middle">water + soap</text>

        <rect className="hw-foam-zone" x="38" y={foamTop} width="219" height={Math.max(18,260-foamTop)} rx="18"/>
        <g className="hw-foam-bubbles">
          {bubbles.filter(b=>b.cy<255).map((b,i)=><circle key={i} cx={b.cx-325} cy={b.cy-45} r={b.r}/>)}
        </g>

        <g className="hw-scum-particles">
          {Array.from({length:Math.max(2,Math.round(data.scum/10))},(_,i)=><ellipse key={i} cx={62+i*26} cy={scumY-45+(i%2)*5} rx="11" ry="5"/>)}
        </g>
        <text className="hw-soap-label" x="148" y={foamTop-16} textAnchor="middle">lather / foam</text>
        <text className="hw-soap-label scum" x="148" y={Math.min(400,scumY-58)} textAnchor="middle">soap scum</text>
      </g>

      <g className="hw-soap-result" transform="translate(650 100)">
        <rect x="0" y="0" width="195" height="250" rx="18"/>
        <text className="hw-title" x="98" y="38" textAnchor="middle">{data.name}</text>
        <text className="hw-result-value" x="98" y="95" textAnchor="middle">{data.lather}%</text>
        <text className="hw-small" x="98" y="118" textAnchor="middle">relative lather</text>
        <text className="hw-result-value scum" x="98" y="175" textAnchor="middle">{data.scum}%</text>
        <text className="hw-small" x="98" y="198" textAnchor="middle">relative scum</text>
        <text className="hw-small" x="98" y="226" textAnchor="middle">more lather = softer water</text>
      </g>
    </svg>

    <strong>{data.name}</strong><p>{data.text}</p>
  </div>;
}

function TypesView(){
  return <div className="spark-hardwater-types">
    <article><span>TEMPORARY HARDNESS</span><h4>Hydrogencarbonates</h4><p>Often caused by dissolved calcium hydrogencarbonate and magnesium hydrogencarbonate. Boiling can remove this hardness.</p></article>
    <article><span>PERMANENT HARDNESS</span><h4>Sulphates and other salts</h4><p>Can be caused by dissolved calcium and magnesium salts such as sulphates. Boiling does not remove it.</p></article>
    <article><span>LIMESTONE REGIONS</span><h4>Calcium compounds dissolve into water</h4><p>Rainwater containing dissolved carbon dioxide can dissolve calcium carbonate from limestone, so groundwater in limestone areas of Jamaica and Barbados may be hard.</p></article>
  </div>;
}

function BoilingView(){
  const [before,setBefore]=useState(true);
  return <div className="spark-hardwater-boil">
    <div className="spark-hardwater-toggle"><button type="button" className={before?"active":""} onClick={()=>setBefore(true)}>Before boiling</button><button type="button" className={!before?"active":""} onClick={()=>setBefore(false)}>After boiling</button></div>
    <svg className="spark-hardwater-boiling-svg" viewBox="0 0 860 470" role="img" aria-label={before?"Temporary hard water before boiling showing dissolved calcium hydrogencarbonate ions":"Temporary hard water after boiling showing calcium carbonate precipitate and scale"}>
      <defs>
        <marker id="hw-heat-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="hw-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>

      <path className="hw-kettle" d="M175 105Q315 70 455 105Q505 135 500 315Q495 390 425 410H220Q150 390 145 315Q140 145 175 105Z"/>
      <path className="hw-spout" d="M470 155Q560 125 620 170L565 215Q525 205 490 220"/>
      <path className="hw-handle" d="M185 150Q75 175 92 300Q105 365 170 350"/>
      <path className="hw-water-fill" d="M160 220Q320 205 485 220V325Q480 380 420 392H225Q165 380 160 325Z"/>

      {before ? <>
        <g className="hw-dissolved-ions">
          {[[220,255,"Ca²⁺"],[300,285,"HCO₃⁻"],[390,250,"Mg²⁺"],[440,315,"HCO₃⁻"],[255,335,"HCO₃⁻"],[360,340,"Ca²⁺"]].map(([x,y,t],i)=><g key={i}><circle cx={x} cy={y} r={t==="HCO₃⁻"?22:18}/><text x={x} y={y+5} textAnchor="middle">{t}</text></g>)}
        </g>
        <text className="hw-label" x="325" y="445" textAnchor="middle">calcium and magnesium hydrogencarbonate ions remain dissolved</text>
      </> : <>
        <g className="hw-precipitate">
          {[205,242,278,315,352,389,426,458].map((x,i)=><circle key={x} cx={x} cy={355+(i%2)*10} r={10+(i%3)}/>)}
        </g>
        <path className="hw-scale-layer" d="M170 338Q320 315 474 340V375Q320 350 175 374Z"/>
        <text className="hw-scale-text" x="325" y="365" textAnchor="middle">CaCO₃ scale / precipitate</text>
        <g className="hw-softened-ions">
          <circle cx="250" cy="275" r="18"/><text x="250" y="280" textAnchor="middle">H₂O</text>
          <circle cx="390" cy="285" r="18"/><text x="390" y="290" textAnchor="middle">H₂O</text>
        </g>
        <text className="hw-label" x="325" y="445" textAnchor="middle">insoluble carbonate removes hardness ions from the water</text>
      </>}

      <path className="hw-heater" d="M250 435q20-28 40 0t40 0t40 0t40 0"/>
      <path className="hw-heat-flow" d="M325 420V385" markerEnd="url(#hw-heat-arrow)"/>
      <text className="hw-small" x="585" y="295">{before?"temporary hardness is soluble":"solid carbonate deposits form"}</text>
      <text className="hw-small" x="585" y="325">{before?"before heating":"after hydrogencarbonate decomposes"}</text>
    </svg>
    <p>{before?"Temporary hardness remains dissolved before heating.":"Boiling decomposes calcium hydrogencarbonate and forms insoluble calcium carbonate. The precipitate removes calcium ions from solution but may form scale in the kettle."}</p>
  </div>;
}

function SodaView(){
  return <div className="spark-washing-soda">
    <svg className="spark-washing-soda-svg" viewBox="0 0 980 510" role="img" aria-label="Washing soda softening permanent hard water by precipitating calcium and magnesium carbonate">
      <defs>
        <marker id="hw-mix-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="hw-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>

      <g transform="translate(45 70)">
        <rect className="hw-beaker" x="0" y="0" width="255" height="315" rx="18"/>
        <path className="hw-beaker-water" d="M12 95H243V290Q243 303 230 303H25Q12 303 12 290Z"/>
        <text className="hw-title" x="127" y="-22" textAnchor="middle">permanent hard water</text>
        <g className="hw-hard-ions">
          {[[60,140,"Ca²⁺"],[135,170,"Mg²⁺"],[195,130,"Ca²⁺"],[85,235,"Mg²⁺"],[185,255,"Ca²⁺"]].map(([x,y,t],i)=><g key={i}><circle cx={x} cy={y} r="23"/><text x={x} y={y+5} textAnchor="middle">{t}</text></g>)}
        </g>
        <text className="hw-small" x="127" y="335" textAnchor="middle">ions stay dissolved if water is only boiled</text>
      </g>

      <path className="hw-mix-arrow" d="M330 225H420" markerEnd="url(#hw-mix-arrow)"/>
      <g transform="translate(345 80)">
        <path className="hw-soda-packet" d="M0 0H115L135 165H-20Z"/>
        <text className="hw-title" x="57" y="55" textAnchor="middle">washing</text>
        <text className="hw-title" x="57" y="80" textAnchor="middle">soda</text>
        <text className="hw-small" x="57" y="112" textAnchor="middle">Na₂CO₃</text>
        <circle className="hw-carbonate-ion" cx="40" cy="145" r="18"/><text className="hw-ion-text" x="40" y="150" textAnchor="middle">CO₃²⁻</text>
        <circle className="hw-carbonate-ion" cx="82" cy="145" r="18"/><text className="hw-ion-text" x="82" y="150" textAnchor="middle">CO₃²⁻</text>
      </g>

      <g transform="translate(520 70)">
        <rect className="hw-beaker" x="0" y="0" width="380" height="315" rx="18"/>
        <path className="hw-beaker-water" d="M12 95H368V290Q368 303 355 303H25Q12 303 12 290Z"/>
        <text className="hw-title" x="190" y="-22" textAnchor="middle">after carbonate ions are mixed in</text>

        <g className="hw-reaction-pairs">
          <g transform="translate(85 150)">
            <circle className="hw-hard-ion" cx="0" cy="0" r="23"/><text x="0" y="5" textAnchor="middle">Ca²⁺</text>
            <text className="hw-plus" x="42" y="6">+</text>
            <circle className="hw-carbonate-ion" cx="85" cy="0" r="23"/><text className="hw-ion-text" x="85" y="5" textAnchor="middle">CO₃²⁻</text>
            <path className="hw-down-arrow" d="M42 35V82" markerEnd="url(#hw-mix-arrow)"/>
            <ellipse className="hw-solid" cx="42" cy="110" rx="48" ry="20"/>
            <text className="hw-solid-label" x="42" y="116" textAnchor="middle">CaCO₃(s)</text>
          </g>
          <g transform="translate(255 150)">
            <circle className="hw-hard-ion" cx="0" cy="0" r="23"/><text x="0" y="5" textAnchor="middle">Mg²⁺</text>
            <text className="hw-plus" x="42" y="6">+</text>
            <circle className="hw-carbonate-ion" cx="85" cy="0" r="23"/><text className="hw-ion-text" x="85" y="5" textAnchor="middle">CO₃²⁻</text>
            <path className="hw-down-arrow" d="M42 35V82" markerEnd="url(#hw-mix-arrow)"/>
            <ellipse className="hw-solid" cx="42" cy="110" rx="48" ry="20"/>
            <text className="hw-solid-label" x="42" y="116" textAnchor="middle">MgCO₃(s)</text>
          </g>
        </g>
      </g>

      <text className="hw-caption" x="490" y="465" textAnchor="middle">carbonate ions convert dissolved hardness ions into insoluble solids that can be removed</text>
    </svg>
    <div className="spark-soda-equation"><span>hard water with Ca²⁺ / Mg²⁺</span><b>+</b><span>washing soda, Na₂CO₃</span><b>→</b><span>insoluble carbonates</span></div>
    <p>Washing soda supplies carbonate ions. Calcium and magnesium ions form insoluble carbonates that can be removed, so permanent hardness is reduced.</p>
    <aside><strong>Why boiling is different</strong><span>Boiling removes temporary hydrogencarbonate hardness, but it does not remove permanent hardness caused by salts such as calcium sulphate.</span></aside>
  </div>;
}

function DistillationView(){
  return <div className="spark-hardwater-distill">
    <svg viewBox="0 0 860 380" role="img" aria-label="Simple distillation of hard water showing dissolved salts left behind">
      <rect className="hd-flask" x="90" y="145" width="155" height="150" rx="55"/>
      <path className="hd-water" d="M110 215H225V275Q165 310 110 275Z"/>
      <text className="hd-label" x="165" y="245" textAnchor="middle">hard water</text>
      <path className="hd-steam" d="M165 145Q165 90 300 90"/>
      <rect className="hd-condenser" x="300" y="70" width="280" height="40" rx="20"/>
      <path className="hd-condensate" d="M580 90Q675 90 675 185"/>
      <rect className="hd-beaker" x="620" y="185" width="120" height="115" rx="8"/>
      <text className="hd-label" x="680" y="245" textAnchor="middle">distilled water</text>
      <text className="hd-label" x="165" y="330" textAnchor="middle">dissolved salts remain</text>
    </svg>
    <p>During distillation, water evaporates and then condenses. Dissolved non-volatile salts remain behind, so the collected water is soft.</p>
  </div>;
}

function TradeoffsView(){
  return <div className="spark-hardwater-tradeoffs">
    <article><span>ADVANTAGE</span><h4>Supplies calcium and magnesium ions</h4><p>These minerals contribute to dietary intake and are important for normal body function.</p></article>
    <article><span>DISADVANTAGE</span><h4>Wastes soap</h4><p>Soap reacts with calcium and magnesium ions to form insoluble scum instead of lather.</p></article>
    <article><span>DISADVANTAGE</span><h4>Scale in heaters and kettles</h4><p>Deposits reduce heat transfer and can narrow hot-water pipes.</p></article>
    <article><span>SOFT WATER</span><h4>Can be more corrosive in some conditions</h4><p>Very soft, acidic water may dissolve metals from plumbing more readily than hard water, so water chemistry and pipe material matter.</p></article>
  </div>;
}

export default function HardWaterExplorer(){
  const [view,setView]=useState("lather");
  const summary=useMemo(()=>({
    lather:"Hard water does not lather easily with soap because calcium and magnesium ions form insoluble scum.",
    types:"Temporary and permanent hardness come from different dissolved calcium and magnesium compounds.",
    boiling:"Boiling removes temporary hardness but can produce calcium-carbonate scale.",
    soda:"Washing soda removes permanent hardness by precipitating calcium and magnesium ions.",
    distill:"Distillation removes hardness because dissolved salts do not evaporate with the water.",
    tradeoffs:"Hard water has both disadvantages and some mineral benefits."
  })[view],[view]);
  return <section className="spark-hard-water">
    <header><span>HARD WATER</span><h3>Test hardness, distinguish its causes and compare softening methods</h3><p>Hard water contains dissolved calcium and magnesium ions that interfere with soap. The treatment needed depends on whether the hardness is temporary or permanent.</p></header>
    <div className="spark-hardwater-tabs">{[["lather","Soap test"],["types","Types of hardness"],["boiling","Boiling"],["soda","Washing soda"],["distill","Distillation"],["tradeoffs","Advantages and problems"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-hardwater-stage">{view==="lather"&&<LatherView/>}{view==="types"&&<TypesView/>}{view==="boiling"&&<BoilingView/>}{view==="soda"&&<SodaView/>}{view==="distill"&&<DistillationView/>}{view==="tradeoffs"&&<TradeoffsView/>}</div>
    <div className="spark-hardwater-summary"><strong>{summary}</strong><span>More lather with the same amount of soap generally means softer water.</span></div>
  </section>;
}
