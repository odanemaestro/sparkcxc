import React,{useMemo,useState} from "react";
import "./waterPropertiesExplorer.css";

function PhaseView(){
  const [temp,setTemp]=useState(20);
  const t=Number(temp)||0;
  const phase=t<0?"Ice / solid":t>=100?"Water vapour forming":"Liquid water";
  return <div className="spark-water-phase">
    <label>Temperature at normal atmospheric pressure<input type="range" min="-20" max="120" value={temp} onChange={e=>setTemp(e.target.value)}/></label>
    <div className="spark-water-thermometer"><div className="spark-water-fill" style={{height:Math.min(100,Math.max(0,(t+20)/1.4))+"%"}}></div></div>
    <strong>{t} °C → {phase}</strong>
    <div className="spark-water-phase-cards">
      <article><span>0 °C</span><b>Freezing / melting point</b><p>Pure water freezes at about 0 °C at normal atmospheric pressure.</p></article>
      <article><span>100 °C</span><b>Boiling point</b><p>Pure water boils at about 100 °C at normal atmospheric pressure.</p></article>
      <article><span>FREEZING</span><b>Water expands</b><p>Water expands when it freezes, making ice less dense than liquid water.</p></article>
    </div>
  </div>;
}

function DensityView(){
  const [sample,setSample]=useState("fresh");
  const sea=sample==="sea";
  return <div className="spark-water-density">
    <div className="spark-water-toggle"><button type="button" className={!sea?"active":""} onClick={()=>setSample("fresh")}>Fresh water</button><button type="button" className={sea?"active":""} onClick={()=>setSample("sea")}>Sea water</button></div>
    <div className="spark-density-tank">
      <div className={"spark-density-water "+(sea?"sea":"fresh")}></div>
      <div className="spark-ice-block">ice</div>
      {sea&&<div className="spark-salt-label">more dissolved salts</div>}
    </div>
    <p>{sea?"Dissolved salts make sea water denser than fresh water. Sea water also freezes below 0 °C and boils slightly above 100 °C.":"Ice floats because freezing produces a more open structure, making ice less dense than liquid water."}</p>
  </div>;
}

function HeatView(){
  const [medium,setMedium]=useState("water");
  const water=medium==="water";
  return <div className="spark-water-heat">
    <div className="spark-water-toggle"><button type="button" className={water?"active":""} onClick={()=>setMedium("water")}>Water</button><button type="button" className={!water?"active":""} onClick={()=>setMedium("land")}>Land surface</button></div>
    <div className="spark-heat-bars"><div><span>same heat input</span><div className={water?"slow":"fast"}></div><strong>{water?"smaller temperature rise":"larger temperature rise"}</strong></div></div>
    <p>{water?"Water has a high specific heat capacity, so it warms and cools relatively slowly. This helps aquatic habitats resist rapid temperature change.":"Land surfaces usually change temperature more quickly than large bodies of water under comparable heating and cooling."}</p>
  </div>;
}

function SolventView(){
  return <div className="spark-water-solvent">
    <article><span>SALTS AND SUGARS</span><h4>Many substances dissolve</h4><p>Water can dissolve many ionic and polar substances. This makes it useful for transport in blood plasma, plant sap and natural waters.</p></article>
    <article><span>NOT EVERYTHING</span><h4>“Universal solvent” is not literal</h4><p>Water does not dissolve every substance. Oils, for example, mix poorly with water.</p></article>
    <article><span>TRANSPORT</span><h4>Dissolved materials can move</h4><p>Nutrients, mineral ions, respiratory gases and wastes can be transported in aqueous solution.</p></article>
  </div>;
}

function SurfaceView(){
  const [detergent,setDetergent]=useState(false);
  return <div className="spark-water-surface">
    <div className="spark-water-toggle"><button type="button" className={!detergent?"active":""} onClick={()=>setDetergent(false)}>Clean water</button><button type="button" className={detergent?"active":""} onClick={()=>setDetergent(true)}>With detergent</button></div>
    <div className={"spark-surface-model "+(detergent?"broken":"intact")}><div className="spark-surface-line"></div><div className="spark-water-insect">insect</div></div>
    <p>{detergent?"Detergents reduce surface tension by interfering with cohesive forces at the surface.":"Cohesive attraction between water molecules creates surface tension. Small insects can be supported if they do not break the surface."}</p>
  </div>;
}

function OxygenView(){
  const [condition,setCondition]=useState("cold");
  const cold=condition==="cold";
  return <div className="spark-water-oxygen">
    <div className="spark-water-toggle"><button type="button" className={cold?"active":""} onClick={()=>setCondition("cold")}>Cold, moving water</button><button type="button" className={!cold?"active":""} onClick={()=>setCondition("warm")}>Warm, still water</button></div>
    <div className="spark-oxygen-tank">{Array.from({length:cold?22:8}).map((_,i)=><span key={i} style={{left:(6+(i*13)%88)+"%",top:(12+(i*19)%72)+"%"}}>O₂</span>)}</div>
    <p>{cold?"Gases are generally more soluble in colder water, and movement helps mix air into the water, so dissolved oxygen tends to be higher.":"Warm water holds less dissolved oxygen, and still water receives less mixing from the atmosphere."}</p>
  </div>;
}

function OsmosisView(){
  const [fish,setFish]=useState("fresh");
  const freshwater=fish==="fresh";
  return <div className="spark-water-osmosis">
    <div className="spark-water-toggle"><button type="button" className={freshwater?"active":""} onClick={()=>setFish("fresh")}>Freshwater fish in sea water</button><button type="button" className={!freshwater?"active":""} onClick={()=>setFish("marine")}>Marine fish in fresh water</button></div>
    <div className="spark-fish-model">
      <div className="spark-fish-body">fish</div>
      {freshwater?<><div className="spark-osmosis-arrow out left">→</div><div className="spark-osmosis-arrow out right">→</div></>:<><div className="spark-osmosis-arrow in left">→</div><div className="spark-osmosis-arrow in right">→</div></>}
    </div>
    <p>{freshwater?"Sea water is more concentrated than the body fluids of a freshwater fish, so water tends to leave its cells by osmosis.":"Fresh water is more dilute than the body fluids of a marine fish, so water tends to enter its cells by osmosis."}</p>
  </div>;
}

function MarineView(){
  return <div className="spark-water-marine">
    <article><span>SEA WATER</span><h4>Sodium chloride is the main dissolved salt</h4><p>Many other ions are present, but sodium and chloride ions make up most of the dissolved salts.</p></article>
    <article><span>CORAL REEFS</span><h4>Warm, shallow and clear</h4><p>Reef-building corals depend on photosynthetic algae in their tissues, so strong light penetration is important.</p></article>
    <article><span>POLLUTION</span><h4>Oil and sewage reduce water quality</h4><p>Oil can reduce gas exchange at the surface, while sewage can increase microbial respiration and lower dissolved oxygen.</p></article>
  </div>;
}

export default function WaterPropertiesExplorer(){
  const [view,setView]=useState("phase");
  const summary=useMemo(()=>({
    phase:"Pure water freezes near 0 °C and boils near 100 °C at normal atmospheric pressure.",
    density:"Ice floats because it is less dense than liquid water. Dissolved salts make sea water denser than fresh water.",
    heat:"Water's high specific heat capacity helps stabilise aquatic temperatures.",
    solvent:"Water dissolves many different substances, making it an important transport medium.",
    surface:"Surface tension results from cohesive forces between water molecules.",
    oxygen:"Cold moving water usually contains more dissolved oxygen than warm still water.",
    osmosis:"Water movement across cell membranes depends on differences in water concentration.",
    marine:"Sea-water chemistry and light conditions strongly influence marine organisms such as corals."
  })[view],[view]);

  return <section className="spark-water-properties">
    <header><span>PROPERTIES OF WATER</span><h3>Connect water's physical and chemical properties to living systems and aquatic environments</h3><p>Water has unusual properties that affect climate, organisms, oceans, transport and survival in both fresh and marine environments.</p></header>
    <div className="spark-water-tabs">{[["phase","Freezing and boiling"],["density","Density"],["heat","Specific heat"],["solvent","Solvent"],["surface","Surface tension"],["oxygen","Dissolved oxygen"],["osmosis","Osmosis"],["marine","Marine water"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-water-stage">{view==="phase"&&<PhaseView/>}{view==="density"&&<DensityView/>}{view==="heat"&&<HeatView/>}{view==="solvent"&&<SolventView/>}{view==="surface"&&<SurfaceView/>}{view==="oxygen"&&<OxygenView/>}{view==="osmosis"&&<OsmosisView/>}{view==="marine"&&<MarineView/>}</div>
    <div className="spark-water-summary"><strong>{summary}</strong><span>Water is often called the universal solvent because it dissolves many substances, not because it dissolves everything.</span></div>
  </section>;
}
