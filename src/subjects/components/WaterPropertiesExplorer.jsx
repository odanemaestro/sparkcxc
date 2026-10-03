import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
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
  const surfaceY=sea?210:194;
  return <div className="spark-water-density">
    <div className="spark-water-toggle"><button type="button" className={!sea?"active":""} onClick={()=>setSample("fresh")}>Fresh water</button><button type="button" className={sea?"active":""} onClick={()=>setSample("sea")}>Sea water</button></div>
    <ReviewedScienceDiagram site="WaterPropertiesExplorer.jsx:26"><svg className="spark-water-density-svg" viewBox="0 0 820 400" role="img" aria-label={sea?"Ice floating higher in denser sea water with a smaller submerged volume":"Ice floating in fresh water because ice is less dense than liquid water"}>
      <defs>
        <marker id="wp-density-up-head" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="wp-up-head"/></marker>
        <marker id="wp-density-down-head" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="wp-down-head"/></marker>
      </defs>
      <rect className="wp-density-bg" x="0" y="0" width="820" height="400" rx="18"/>
      <path className="wp-tank-wall" d="M95 70V340Q95 360 115 360H705Q725 360 725 340V70"/>
      <rect className={sea?"wp-water-fill sea":"wp-water-fill fresh"} x="98" y={surfaceY} width="624" height={360-surfaceY}/>
      <line className="wp-waterline" x1="98" y1={surfaceY} x2="722" y2={surfaceY}/>
      {sea&&Array.from({length:18},(_,i)=><circle key={i} className="wp-salt-ion" cx={125+(i%9)*68} cy={238+Math.floor(i/9)*72+(i%3)*7} r="4"/>)}
      <rect className="wp-ice-block-svg" x="330" y="120" width="160" height="118" rx="16"/>
      <rect className="wp-ice-submerged" x="330" y={surfaceY} width="160" height={238-surfaceY} rx="0"/>
      <text className="wp-density-label" x="410" y="157" textAnchor="middle">ICE</text>
      <text className="wp-density-small" x="410" y="178" textAnchor="middle">less dense than liquid water</text>
      <line className="wp-weight-vector" x1="410" y1="95" x2="410" y2="157" markerEnd="url(#wp-density-down-head)"/>
      <text className="wp-vector-label" x="430" y="108">weight</text>
      <line className="wp-upthrust-vector" x1="410" y1="292" x2="410" y2="235" markerEnd="url(#wp-density-up-head)"/>
      <text className="wp-vector-label" x="430" y="286">upthrust</text>
      <text className="wp-density-label" x="130" y={surfaceY-14}>{sea?"sea water, higher density":"fresh water"}</text>
      <line className="wp-submerged-guide" x1="512" y1={surfaceY} x2="600" y2={surfaceY}/>
      <line className="wp-submerged-guide" x1="600" y1={surfaceY} x2="600" y2="238"/>
      <text className="wp-density-small" x="612" y={(surfaceY+238)/2}>{sea?"smaller submerged":"submerged"} volume</text>
      <text className="wp-density-note" x="410" y="386" textAnchor="middle">{sea?"Dissolved salts increase water density, so the same ice block needs to displace less water.":"Ice floats when the upthrust from displaced water balances its weight."}</text>
    </svg></ReviewedScienceDiagram>
    <p>{sea?"Dissolved salts make sea water denser than fresh water. The same ice block floats slightly higher because a smaller displaced volume provides the required upthrust. Sea water also freezes below 0 °C and boils slightly above 100 °C.":"Ice floats because freezing produces a more open structure, making ice less dense than liquid water."}</p>
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
  const surfaceMolecules=[145,220,295,370,445,520,595,670];
  const bulkMolecules=[{x:175,y:265},{x:260,y:300},{x:350,y:275},{x:455,y:305},{x:555,y:270},{x:645,y:310}];
  return <div className="spark-water-surface">
    <div className="spark-water-toggle"><button type="button" className={!detergent?"active":""} onClick={()=>setDetergent(false)}>Clean water</button><button type="button" className={detergent?"active":""} onClick={()=>setDetergent(true)}>With detergent</button></div>
    <ReviewedScienceDiagram site="WaterPropertiesExplorer.jsx:78"><svg className="spark-surface-tension-svg" viewBox="0 0 820 410" role="img" aria-label={detergent?"Surfactant molecules at the water surface reducing surface tension":"Water molecules at a clean surface held together by cohesive attraction and supporting an insect leg"}>
      <rect className="wp-surface-bg" x="0" y="0" width="820" height="410" rx="18"/>
      <rect className="wp-surface-water" x="60" y="192" width="700" height="178" rx="0 0 16 16"/>
      <path className={detergent?"wp-interface reduced":"wp-interface"} d={detergent?"M60 192Q145 199 230 190T400 194T570 190T760 195":"M60 192Q145 170 230 192T400 192T570 192T760 192"}/>
      {!detergent&&surfaceMolecules.slice(0,-1).map((x,i)=><line key={"bond"+i} className="wp-cohesion-bond" x1={x+13} y1="205" x2={surfaceMolecules[i+1]-13} y2="205"/>)}
      {surfaceMolecules.map((x,i)=><g key={x} className="wp-water-molecule"><circle cx={x} cy="205" r="13"/><text x={x} y="209" textAnchor="middle">H₂O</text></g>)}
      {bulkMolecules.map((p,i)=><g key={i} className="wp-water-molecule bulk"><circle cx={p.x} cy={p.y} r="13"/><text x={p.x} y={p.y+4} textAnchor="middle">H₂O</text></g>)}
      {!detergent&&<React.Fragment>
        <path className="wp-insect-leg-svg" d="M335 82Q365 126 383 174"/>
        <path className="wp-insect-leg-svg" d="M485 82Q455 126 437 174"/>
        <ellipse className="wp-insect-body-svg" cx="410" cy="72" rx="82" ry="31"/>
        <text className="wp-surface-label" x="410" y="48" textAnchor="middle">water-strider body</text>
        <line className="wp-surface-force" x1="370" y1="184" x2="370" y2="128"/>
        <line className="wp-surface-force" x1="450" y1="184" x2="450" y2="128"/>
        <text className="wp-surface-label" x="505" y="145">surface supports the legs</text>
        <text className="wp-surface-note" x="410" y="395" textAnchor="middle">cohesive attraction between water molecules creates a resistant surface film</text>
      </React.Fragment>}
      {detergent&&<React.Fragment>
        {[175,285,395,505,615].map((x,i)=><g key={x} className="wp-surfactant">
          <circle className="wp-surfactant-head" cx={x} cy="181" r="10"/>
          <line className="wp-surfactant-tail" x1={x} y1="191" x2={x+(i%2?8:-8)} y2="235"/>
        </g>)}
        <text className="wp-surface-label" x="410" y="86" textAnchor="middle">detergent surfactants collect at the air-water interface</text>
        <text className="wp-surface-label" x="410" y="120" textAnchor="middle">surface tension decreases</text>
        <text className="wp-surface-note" x="410" y="395" textAnchor="middle">surfactants disrupt the cohesive surface arrangement, so the surface is easier to deform</text>
      </React.Fragment>}
    </svg></ReviewedScienceDiagram>
    <p>{detergent?"Detergents reduce surface tension because surfactant molecules collect at the interface and disrupt the cohesive arrangement of water molecules.":"Cohesive attraction between water molecules creates surface tension. Small insects can be supported if they do not break the surface."}</p>
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
  const externalDots=freshwater?28:8;
  const internalDots=freshwater?10:20;
  return <div className="spark-water-osmosis">
    <div className="spark-water-toggle"><button type="button" className={freshwater?"active":""} onClick={()=>setFish("fresh")}>Freshwater fish in sea water</button><button type="button" className={!freshwater?"active":""} onClick={()=>setFish("marine")}>Marine fish in fresh water</button></div>
    <ReviewedScienceDiagram site="WaterPropertiesExplorer.jsx:126"><svg className="spark-water-osmosis-svg" viewBox="0 0 860 420" role="img" aria-label={freshwater?"Freshwater fish in concentrated sea water losing water by osmosis":"Marine fish in dilute fresh water gaining water by osmosis"}>
      <defs>
        <marker id="wp-osmosis-head" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="wp-osmosis-head"/></marker>
      </defs>
      <rect className="wp-osmosis-bg" x="0" y="0" width="860" height="420" rx="18"/>
      <rect className="wp-external-water" x="42" y="60" width="776" height="305" rx="20"/>
      {Array.from({length:externalDots},(_,i)=><circle key={"out"+i} className="wp-solute-dot external" cx={70+(i%14)*53} cy={90+Math.floor(i/14)*225+(i%4)*16} r="4"/>)}
      <path className="wp-fish-body" d="M285 210Q350 130 520 145Q615 155 660 210Q615 267 520 276Q350 292 285 210Z"/>
      <path className="wp-fish-tail" d="M292 210L205 143L213 210L205 277Z"/>
      <circle className="wp-fish-eye" cx="610" cy="190" r="7"/>
      <path className="wp-body-fluid" d="M337 210Q395 166 510 173Q565 178 596 210Q565 242 510 248Q395 255 337 210Z"/>
      {Array.from({length:internalDots},(_,i)=><circle key={"in"+i} className="wp-solute-dot internal" cx={375+(i%7)*30} cy={192+Math.floor(i/7)*31+(i%2)*5} r="4"/>)}
      <text className="wp-osmosis-label" x="462" y="215" textAnchor="middle">body fluids</text>
      <text className="wp-osmosis-label" x="430" y="88" textAnchor="middle">{freshwater?"sea water, more concentrated outside":"fresh water, more dilute outside"}</text>
      <text className="wp-osmosis-small" x="430" y="338" textAnchor="middle">{freshwater?"water concentration is lower outside the fish":"water concentration is higher outside the fish"}</text>
      {freshwater?<React.Fragment>
        <line className="wp-osmosis-arrow" x1="320" y1="170" x2="215" y2="110" markerEnd="url(#wp-osmosis-head)"/>
        <line className="wp-osmosis-arrow" x1="322" y1="250" x2="218" y2="310" markerEnd="url(#wp-osmosis-head)"/>
        <line className="wp-osmosis-arrow" x1="586" y1="150" x2="700" y2="108" markerEnd="url(#wp-osmosis-head)"/>
        <text className="wp-osmosis-flow-label" x="430" y="390" textAnchor="middle">net water movement OUT by osmosis</text>
      </React.Fragment>:<React.Fragment>
        <line className="wp-osmosis-arrow" x1="215" y1="110" x2="320" y2="170" markerEnd="url(#wp-osmosis-head)"/>
        <line className="wp-osmosis-arrow" x1="218" y1="310" x2="322" y2="250" markerEnd="url(#wp-osmosis-head)"/>
        <line className="wp-osmosis-arrow" x1="700" y1="108" x2="586" y2="150" markerEnd="url(#wp-osmosis-head)"/>
        <text className="wp-osmosis-flow-label" x="430" y="390" textAnchor="middle">net water movement IN by osmosis</text>
      </React.Fragment>}
    </svg></ReviewedScienceDiagram>
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
