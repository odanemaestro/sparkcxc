import React,{useMemo,useState} from "react";
import "./hardWaterExplorer.css";

function LatherView(){
  const [sample,setSample]=useState("soft");
  const data={
    soft:{name:"Soft water",lather:90,scum:5,text:"Soap lathers readily because there are few calcium or magnesium ions to react with it."},
    temp:{name:"Temporary hard water",lather:35,scum:65,text:"Calcium or magnesium hydrogencarbonates react with soap and reduce lather."},
    perm:{name:"Permanent hard water",lather:25,scum:75,text:"Calcium or magnesium sulphates and other non-hydrogencarbonate salts reduce lather and form scum."}
  }[sample];
  return <div className="spark-hardwater-lather">
    <div className="spark-hardwater-toggle">{[["soft","Soft"],["temp","Temporary hard"],["perm","Permanent hard"]].map(([k,l])=><button type="button" key={k} className={sample===k?"active":""} onClick={()=>setSample(k)}>{l}</button>)}</div>
    <div className="spark-lather-bottle">
      <div className="spark-lather-water"></div>
      <div className="spark-lather-foam" style={{height:data.lather+"%"}}></div>
      <div className="spark-lather-scum" style={{height:data.scum/4+"%"}}></div>
    </div>
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
    <div className="spark-kettle-model">
      <div className="spark-kettle-body">
        {!before&&<div className="spark-kettle-scale">CaCO₃ scale</div>}
        <div className="spark-kettle-water">{before?"Ca(HCO₃)₂ dissolved":"softer water"}</div>
      </div>
      <div className="spark-kettle-spout"></div>
    </div>
    <p>{before?"Temporary hardness remains dissolved before heating.":"Boiling decomposes calcium hydrogencarbonate and forms insoluble calcium carbonate. The precipitate removes calcium ions from solution but may form scale in the kettle."}</p>
  </div>;
}

function SodaView(){
  return <div className="spark-washing-soda">
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
