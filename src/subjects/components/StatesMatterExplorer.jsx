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
 return <div className="spark-change-state">
   <div className="spark-change-row"><article><b>Solid</b></article><span>melting →</span><article><b>Liquid</b></article><span>evaporation / boiling →</span><article><b>Gas</b></article></div>
   <div className="spark-change-row reverse"><article><b>Solid</b></article><span>← freezing</span><article><b>Liquid</b></article><span>← condensation</span><article><b>Gas</b></article></div>
   <div className="spark-direct-changes"><article><span>SUBLIMATION</span><p>Solid → gas directly. Some solid air fresheners get smaller this way.</p></article><article><span>DEPOSITION</span><p>Gas → solid directly. It is the reverse of sublimation.</p></article></div>
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
