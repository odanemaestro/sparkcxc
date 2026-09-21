import React,{useMemo,useState} from "react";
import "./statesMatterExplorer.css";

function ParticleBox({state}){
 const positions={
  solid:Array.from({length:20},(_,i)=>({x:18+(i%5)*18,y:22+Math.floor(i/5)*18})),
  liquid:[{x:18,y:74},{x:36,y:72},{x:54,y:74},{x:72,y:72},{x:90,y:74},{x:28,y:56},{x:47,y:55},{x:66,y:57},{x:84,y:56},{x:38,y:38},{x:58,y:39},{x:77,y:41},{x:20,y:41}],
  gas:[{x:20,y:20},{x:78,y:25},{x:50,y:55},{x:98,y:80},{x:28,y:84},{x:95,y:18}]
 }[state]||[];
 return <svg viewBox="0 0 120 100" role="img" aria-label={state+" particle arrangement"}><rect x="5" y="5" width="110" height="90" className="sm-box"/>{positions.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="7" className="sm-particle"/>)}</svg>;
}

function StatesView(){
 const [state,setState]=useState("solid");
 const info={
  solid:["Solid","Fixed shape","Fixed volume","Particles closely packed in regular positions and vibrate about fixed points."],
  liquid:["Liquid","No fixed shape","Fixed volume","Particles are close together but can move past one another."],
  gas:["Gas","No fixed shape","No fixed volume","Particles are far apart, move rapidly and spread to fill the container."]
 }[state];
 return <div className="spark-states-view">
  <div className="spark-state-buttons">{["solid","liquid","gas"].map(k=><button type="button" key={k} className={state===k?"active":""} onClick={()=>setState(k)}>{k[0].toUpperCase()+k.slice(1)}</button>)}</div>
  <div className="spark-state-grid"><ParticleBox state={state}/><article><span>{info[0].toUpperCase()}</span><h4>{info[1]} · {info[2]}</h4><p>{info[3]}</p></article></div>
 </div>;
}

function CompressionView(){
 const [state,setState]=useState("gas");
 return <div className="spark-compression-view">
  <div className="spark-state-buttons"><button type="button" className={state==="liquid"?"active":""} onClick={()=>setState("liquid")}>Liquid</button><button type="button" className={state==="gas"?"active":""} onClick={()=>setState("gas")}>Gas</button></div>
  <div className={"spark-piston "+state}><div className="spark-piston-head"></div><div className="spark-piston-content"><ParticleBox state={state}/></div></div>
  <p>{state==="gas"?"Gases compress readily because there are large spaces between particles.":"Liquids are difficult to compress because their particles are already close together."}</p>
 </div>;
}

function ChangesView(){
 const solidParticles=Array.from({length:12},(_,i)=>({x:126+(i%4)*22,y:235+Math.floor(i/4)*22}));
 const liquidParticles=[{x:397,y:277},{x:420,y:274},{x:444,y:279},{x:468,y:272},{x:409,y:252},{x:435,y:250},{x:458,y:251},{x:420,y:229},{x:448,y:230}];
 const gasParticles=[{x:696,y:222},{x:778,y:236},{x:727,y:278},{x:806,y:292},{x:688,y:306},{x:799,y:205}];
 return <div className="spark-change-state">
   <svg className="spark-state-change-svg" viewBox="0 0 920 520" role="img" aria-label="Changes of state between solid, liquid and gas showing melting, freezing, evaporation or boiling, condensation, sublimation and deposition">
    <defs>
      <marker id="sm-heat-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" className="sm-heat-head"/></marker>
      <marker id="sm-cool-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" className="sm-cool-head"/></marker>
    </defs>
    <rect className="sm-change-bg" x="0" y="0" width="920" height="520" rx="22"/>
    <text className="sm-energy-label heat" x="460" y="38" textAnchor="middle">energy added</text>
    <text className="sm-energy-label cool" x="460" y="495" textAnchor="middle">energy removed</text>

    <g className="sm-change-node solid">
      <rect x="82" y="188" width="190" height="156" rx="18"/>
      <text className="sm-node-title" x="177" y="216" textAnchor="middle">SOLID</text>
      {solidParticles.map((p,i)=><circle key={i} className="sm-node-particle" cx={p.x} cy={p.y} r="9"/>)}
      <text className="sm-node-note" x="177" y="329" textAnchor="middle">particles vibrate in fixed positions</text>
    </g>
    <g className="sm-change-node liquid">
      <rect x="365" y="188" width="190" height="156" rx="18"/>
      <text className="sm-node-title" x="460" y="216" textAnchor="middle">LIQUID</text>
      {liquidParticles.map((p,i)=><circle key={i} className="sm-node-particle" cx={p.x} cy={p.y} r="9"/>)}
      <path className="sm-liquid-level" d="M385 292Q420 283 458 292Q496 282 535 292"/>
      <text className="sm-node-note" x="460" y="329" textAnchor="middle">particles stay close and move past one another</text>
    </g>
    <g className="sm-change-node gas">
      <rect x="648" y="188" width="190" height="156" rx="18"/>
      <text className="sm-node-title" x="743" y="216" textAnchor="middle">GAS</text>
      {gasParticles.map((p,i)=><circle key={i} className="sm-node-particle" cx={p.x} cy={p.y} r="9"/>)}
      <text className="sm-node-note" x="743" y="329" textAnchor="middle">particles are far apart and move freely</text>
    </g>

    <path className="sm-phase-arrow heat" d="M272 205C310 151 330 151 365 205" markerEnd="url(#sm-heat-arrow)"/>
    <text className="sm-phase-label heat" x="319" y="142" textAnchor="middle">melting</text>
    <path className="sm-phase-arrow heat" d="M555 205C593 151 613 151 648 205" markerEnd="url(#sm-heat-arrow)"/>
    <text className="sm-phase-label heat" x="601" y="131" textAnchor="middle">evaporation / boiling</text>

    <path className="sm-phase-arrow cool" d="M365 327C330 382 309 382 272 327" markerEnd="url(#sm-cool-arrow)"/>
    <text className="sm-phase-label cool" x="319" y="404" textAnchor="middle">freezing</text>
    <path className="sm-phase-arrow cool" d="M648 327C613 382 592 382 555 327" markerEnd="url(#sm-cool-arrow)"/>
    <text className="sm-phase-label cool" x="601" y="404" textAnchor="middle">condensation</text>

    <path className="sm-sublimation-path" d="M195 188C262 63 658 63 725 188" markerEnd="url(#sm-heat-arrow)"/>
    <text className="sm-phase-label heat" x="460" y="79" textAnchor="middle">sublimation, solid → gas</text>
    <path className="sm-deposition-path" d="M725 344C658 462 262 462 195 344" markerEnd="url(#sm-cool-arrow)"/>
    <text className="sm-phase-label cool" x="460" y="459" textAnchor="middle">deposition, gas → solid</text>
   </svg>
   <p>Heating supplies energy that increases particle motion and helps overcome attractive forces. Cooling removes energy, so particles move less and can come closer together. Sublimation and deposition bypass the liquid state.</p>
 </div>;
}

function EverydayView(){
 return <div className="spark-state-everyday">
  <article><span>WINDY CLOTHES LINE</span><h4>Evaporation speeds up</h4><p>Moving air removes water vapour from around wet clothes, maintaining a larger concentration gradient for evaporation.</p></article>
  <article><span>ICED GLASS</span><h4>Condensation outside</h4><p>Water vapour in surrounding air cools at the cold glass surface and condenses into liquid droplets.</p></article>
  <article><span>PLASMA</span><h4>Ionised matter</h4><p>Lightning and the Sun contain plasma, a high-energy state with freely moving charged particles.</p></article>
 </div>;
}

function HeatingView(){
 return <div className="spark-heating-curve">
   <svg viewBox="0 0 820 420" role="img" aria-label="Heating curve showing temperature plateaus during melting and boiling">
    <line className="hc-axis" x1="90" y1="340" x2="750" y2="340"/><line className="hc-axis" x1="90" y1="340" x2="90" y2="45"/>
    <path className="hc-lineplot" d="M100 305L220 245L355 245L475 150L610 150L730 70"/>
    <text className="hc-label" x="250" y="225">melting plateau</text><text className="hc-label" x="615" y="130">boiling plateau</text>
    <text className="hc-label" x="390" y="385">heat supplied / time</text><text className="hc-label" x="25" y="190" transform="rotate(-90 25 190)">temperature</text>
   </svg>
   <p>During a phase change, supplied energy is used to overcome attractive forces between particles rather than immediately raising temperature. The temperature can therefore stay constant until the change is complete.</p>
 </div>;
}

export default function StatesMatterExplorer(){
 const [view,setView]=useState("states");
 const summary=useMemo(()=>({
  states:"Particle spacing and movement explain the fixed or variable shape and volume of solids, liquids and gases.",
  compress:"Gases compress much more easily than liquids because gas particles are far apart.",
  changes:"Matter changes state by melting, freezing, evaporation, boiling, condensation, sublimation and deposition.",
  everyday:"Wind affects evaporation, cold surfaces cause condensation, and plasma occurs in lightning and the Sun.",
  heating:"Temperature plateaus during changes of state because energy is used to separate particles rather than raise temperature."
 })[view],[view]);
 return <section className="spark-states-matter">
  <header><span>STATES OF MATTER</span><h3>Use the particle model to compare solids, liquids, gases and plasma</h3><p>The arrangement, movement and spacing of particles explain many observable properties of matter and changes of state.</p></header>
  <div className="spark-states-tabs">{[["states","Particle models"],["compress","Compressibility"],["changes","Changes of state"],["everyday","Everyday examples"],["heating","Heating curve"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
  <div className="spark-states-stage">{view==="states"&&<StatesView/>}{view==="compress"&&<CompressionView/>}{view==="changes"&&<ChangesView/>}{view==="everyday"&&<EverydayView/>}{view==="heating"&&<HeatingView/>}</div>
  <div className="spark-states-summary"><strong>{summary}</strong><span>Gas particles are far apart; liquid particles are close but mobile; solid particles vibrate about fixed positions.</span></div>
 </section>;
}
