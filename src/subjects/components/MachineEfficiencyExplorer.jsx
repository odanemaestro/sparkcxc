import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./machineEfficiencyExplorer.css";

function MaView(){
  const [load,setLoad]=useState(200),[effort,setEffort]=useState(50);
  const L=Math.max(0,Number(load)||0),E=Math.max(.1,Number(effort)||.1);
  const ma=L/E;
  return <div className="spark-ma-view">
    <div className="spark-machine-inputs">
      <label>Load, N<input type="number" min="0" value={load} onChange={e=>setLoad(e.target.value)}/></label>
      <label>Effort, N<input type="number" min=".1" value={effort} onChange={e=>setEffort(e.target.value)}/></label>
    </div>
    <ReviewedScienceDiagram site="MachineEfficiencyExplorer.jsx:13"><svg className="spark-machine-diagram" viewBox="0 0 680 270" role="img" aria-label="Lever showing load force, effort force and fulcrum">
      <defs><marker id="me-ma-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="me-arrow-head"/></marker></defs>
      <line className="me-lever-beam" x1="90" y1="142" x2="590" y2="142"/>
      <path className="me-fulcrum" d="M340 145L302 214H378Z"/>
      <line className="me-force load" x1="155" y1="62" x2="155" y2="127" markerEnd="url(#me-ma-arrow)"/>
      <line className="me-force effort" x1="530" y1="215" x2="530" y2="157" markerEnd="url(#me-ma-arrow)"/>
      <text className="me-label" x="155" y="48" textAnchor="middle">Load {L.toFixed(0)} N</text>
      <text className="me-label" x="530" y="240" textAnchor="middle">Effort {E.toFixed(0)} N</text>
      <text className="me-small" x="340" y="232" textAnchor="middle">fulcrum</text>
    </svg></ReviewedScienceDiagram>
    <strong>Mechanical advantage = load ÷ effort = {ma.toFixed(2)}</strong>
    <p>A mechanical advantage greater than 1 means the machine multiplies the applied effort force.</p>
  </div>;
}

function WorkView(){
  const [force,setForce]=useState(30),[distance,setDistance]=useState(5);
  const F=Math.max(0,Number(force)||0),d=Math.max(0,Number(distance)||0);
  return <div className="spark-work-view">
    <div className="spark-machine-inputs">
      <label>Force, N<input type="number" min="0" value={force} onChange={e=>setForce(e.target.value)}/></label>
      <label>Distance, m<input type="number" min="0" value={distance} onChange={e=>setDistance(e.target.value)}/></label>
    </div>
    <ReviewedScienceDiagram site="MachineEfficiencyExplorer.jsx:36"><svg className="spark-machine-diagram" viewBox="0 0 680 270" role="img" aria-label="Box moved by a horizontal force through a measured distance">
      <defs><marker id="me-work-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="me-arrow-head"/></marker></defs>
      <line className="me-ground" x1="70" y1="196" x2="610" y2="196"/>
      <rect className="me-load-box" x="150" y="120" width="112" height="76" rx="8"/>
      <line className="me-force effort" x1="263" y1="151" x2="390" y2="151" markerEnd="url(#me-work-arrow)"/>
      <text className="me-label" x="330" y="134" textAnchor="middle">force {F.toFixed(0)} N</text>
      <line className="me-distance" x1="150" y1="229" x2="520" y2="229" markerEnd="url(#me-work-arrow)"/>
      <text className="me-label" x="335" y="254" textAnchor="middle">distance {d.toFixed(1)} m</text>
    </svg></ReviewedScienceDiagram>
    <strong>Work = force × distance = {(F*d).toFixed(0)} J</strong>
    <p>The joule, J, is the unit of work. One joule equals one newton metre.</p>
  </div>;
}

function EfficiencyView(){
  const [out,setOut]=useState(400),[input,setInput]=useState(500);
  const o=Math.max(0,Number(out)||0),i=Math.max(.1,Number(input)||.1);
  const efficiency=o/i*100;
  const lost=Math.max(0,i-o);
  return <div className="spark-efficiency-view">
    <div className="spark-machine-inputs">
      <label>Useful work out, J<input type="number" min="0" value={out} onChange={e=>setOut(e.target.value)}/></label>
      <label>Work in, J<input type="number" min=".1" value={input} onChange={e=>setInput(e.target.value)}/></label>
    </div>
    <ReviewedScienceDiagram site="MachineEfficiencyExplorer.jsx:60"><svg className="spark-machine-diagram" viewBox="0 0 680 280" role="img" aria-label="Energy flow through a machine showing input, useful output and energy dissipated as heat and sound">
      <defs><marker id="me-eff-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="me-arrow-head"/></marker></defs>
      <rect className="me-machine-box" x="274" y="82" width="132" height="112" rx="16"/>
      <text className="me-machine-title" x="340" y="143" textAnchor="middle">MACHINE</text>
      <line className="me-energy input" x1="70" y1="138" x2="258" y2="138" markerEnd="url(#me-eff-arrow)"/>
      <text className="me-label" x="160" y="118" textAnchor="middle">{i.toFixed(0)} J input</text>
      <line className="me-energy useful" x1="422" y1="118" x2="610" y2="118" markerEnd="url(#me-eff-arrow)"/>
      <text className="me-label" x="520" y="96" textAnchor="middle">{o.toFixed(0)} J useful</text>
      <line className="me-energy waste" x1="404" y1="176" x2="545" y2="237" markerEnd="url(#me-eff-arrow)"/>
      <text className="me-small" x="560" y="251" textAnchor="middle">{lost.toFixed(0)} J heat/sound</text>
    </svg></ReviewedScienceDiagram>
    <strong>Efficiency = {efficiency.toFixed(1)}%</strong>
    <div className="spark-efficiency-bar"><span style={{width:Math.min(100,efficiency)+"%"}}></span></div>
    {efficiency>100?<p className="spark-machine-warning">The values give an efficiency above 100%. Check the input values because a real machine cannot produce more useful work than the work supplied.</p>:<p>Efficiency = useful work out ÷ work in × 100%. Real machines are less than 100% efficient because some input energy is dissipated, mainly by friction and deformation.</p>}
  </div>;
}

function PulleyView(){
  return <div className="spark-pulley-example">
    <ReviewedScienceDiagram site="MachineEfficiencyExplorer.jsx:79"><svg className="spark-machine-diagram" viewBox="0 0 680 330" role="img" aria-label="Pulley system showing a load rising two metres while the effort end moves six metres">
      <defs><marker id="me-pulley-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="me-arrow-head"/></marker></defs>
      <line className="me-support" x1="155" y1="48" x2="525" y2="48"/>
      <circle className="me-pulley-wheel" cx="260" cy="96" r="42"/>
      <circle className="me-pulley-wheel movable" cx="340" cy="196" r="42"/>
      <path className="me-rope" d="M190 48V196Q190 238 232 238H298Q340 238 340 196V138Q340 96 382 96H458V278"/>
      <rect className="me-load-box" x="286" y="244" width="108" height="60" rx="8"/>
      <line className="me-load-link" x1="340" y1="238" x2="340" y2="244"/>
      <text className="me-label" x="340" y="326" textAnchor="middle">200 N load</text>
      <line className="me-force load-rise" x1="438" y1="266" x2="438" y2="201" markerEnd="url(#me-pulley-arrow)"/>
      <text className="me-small" x="457" y="236">load rises 2 m</text>
      <line className="me-force effort-drop" x1="505" y1="160" x2="505" y2="270" markerEnd="url(#me-pulley-arrow)"/>
      <text className="me-small" x="524" y="217">80 N effort moves 6 m</text>
    </svg></ReviewedScienceDiagram>
    <div className="spark-machine-example">
      <article><span>USEFUL OUTPUT</span><h4>200 N load rises 2 m</h4><p>Useful work out = 200 × 2 = 400 J.</p></article>
      <article><span>INPUT</span><h4>80 N effort moves 6 m</h4><p>Work in = 80 × 6 = 480 J.</p></article>
      <article><span>EFFICIENCY</span><h4>400 ÷ 480 × 100 ≈ 83%</h4><p>The missing energy is transferred to less useful forms such as heat and sound.</p></article>
    </div>
  </div>;
}

function InclinedPlaneView(){
  const [length,setLength]=useState(4),[height,setHeight]=useState(1);
  const L=Math.max(.5,Number(length)||.5);
  const H=Math.max(.1,Math.min(L,Number(height)||.1));
  const ma=L/H;
  const topY=210-Math.min(150,H/L*360);
  return <div className="spark-incline-view">
    <div className="spark-machine-inputs">
      <label>Slope length, m<input type="number" min=".5" step=".5" value={length} onChange={e=>setLength(e.target.value)}/></label>
      <label>Vertical height, m<input type="number" min=".1" step=".1" value={height} onChange={e=>setHeight(e.target.value)}/></label>
    </div>
    <ReviewedScienceDiagram site="MachineEfficiencyExplorer.jsx:112"><svg className="spark-machine-diagram" viewBox="0 0 680 300" role="img" aria-label="Inclined plane showing slope length and vertical height">
      <defs><marker id="me-ramp-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="me-arrow-head"/></marker></defs>
      <path className="me-ramp" d={"M120 226L560 "+topY+"L560 226Z"}/>
      <line className="me-ramp-length" x1="133" y1="211" x2="545" y2={topY+10} markerEnd="url(#me-ramp-arrow)"/>
      <line className="me-ramp-height" x1="585" y1="226" x2="585" y2={topY} markerEnd="url(#me-ramp-arrow)"/>
      <rect className="me-ramp-load" x="318" y={Math.max(82,(226+topY)/2-28)} width="74" height="50" rx="7" transform={"rotate("+(-Math.atan2(226-topY,440)*180/Math.PI)+" 355 "+((226+topY)/2)+")"}/>
      <text className="me-label" x="320" y="258" textAnchor="middle">slope {L.toFixed(1)} m</text>
      <text className="me-label" x="607" y={(226+topY)/2} textAnchor="middle" transform={"rotate(-90 607 "+((226+topY)/2)+")"}>height {H.toFixed(1)} m</text>
    </svg></ReviewedScienceDiagram>
    <strong>Ideal mechanical advantage = slope length ÷ vertical height = {ma.toFixed(2)}</strong>
    <p>A longer slope for the same height gives a larger ideal mechanical advantage. A real ramp requires extra effort because of friction.</p>
  </div>;
}

function ImproveView(){
  return <div className="spark-machine-improve">
    <article><span>OIL CHAINS AND BEARINGS</span><h4>Reduce friction</h4><p>Lubrication reduces direct rubbing between moving surfaces.</p></article>
    <article><span>REMOVE RUST</span><h4>Avoid extra resistance</h4><p>Rust on moving parts increases friction and wastes more energy.</p></article>
    <article><span>MAINTAIN TYRE PRESSURE</span><h4>Reduce rolling losses</h4><p>Correctly inflated tyres reduce unnecessary deformation and rolling resistance.</p></article>
  </div>;
}

export default function MachineEfficiencyExplorer(){
  const [view,setView]=useState("ma");
  const summary=useMemo(()=>({
    ma:"Mechanical advantage compares load with effort.",
    work:"Work is force multiplied by distance moved in the force direction.",
    efficiency:"Machine efficiency compares useful output work with input work.",
    pulley:"Efficiency calculations require both force and distance for input and output.",
    incline:"An inclined plane trades a longer movement distance for a smaller effort force.",
    improve:"Reducing friction improves efficiency because less energy is dissipated."
  })[view],[view]);
  return <section className="spark-machine-efficiency">
    <header><span>MACHINE EFFICIENCY</span><h3>Calculate mechanical advantage, work and efficiency</h3><p>Machines can multiply force or change motion, but real machines always lose some useful energy through friction and other effects.</p></header>
    <div className="spark-machine-tabs">{[["ma","Mechanical advantage"],["work","Work"],["efficiency","Efficiency"],["pulley","Pulley example"],["incline","Inclined plane"],["improve","Improve efficiency"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-machine-stage">{view==="ma"&&<MaView/>}{view==="work"&&<WorkView/>}{view==="efficiency"&&<EfficiencyView/>}{view==="pulley"&&<PulleyView/>}{view==="incline"&&<InclinedPlaneView/>}{view==="improve"&&<ImproveView/>}</div>
    <div className="spark-machine-summary"><strong>{summary}</strong><span>MA = load ÷ effort. Work = force × distance. Efficiency = useful work out ÷ work in × 100%.</span></div>
  </section>;
}
