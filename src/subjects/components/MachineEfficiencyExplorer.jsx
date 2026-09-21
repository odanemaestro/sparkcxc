import React,{useMemo,useState} from "react";
import "./machineEfficiencyExplorer.css";

function MaView(){
  const [load,setLoad]=useState(200),[effort,setEffort]=useState(50);
  const L=Math.max(0,Number(load)||0),E=Math.max(.1,Number(effort)||.1);
  return <div className="spark-ma-view">
    <label>Load, N<input type="number" min="0" value={load} onChange={e=>setLoad(e.target.value)}/></label>
    <label>Effort, N<input type="number" min=".1" value={effort} onChange={e=>setEffort(e.target.value)}/></label>
    <strong>Mechanical advantage = load ÷ effort = {(L/E).toFixed(2)}</strong>
    <p>A mechanical advantage greater than 1 means the machine multiplies the applied effort force.</p>
  </div>;
}

function WorkView(){
  const [force,setForce]=useState(30),[distance,setDistance]=useState(5);
  const F=Math.max(0,Number(force)||0),d=Math.max(0,Number(distance)||0);
  return <div className="spark-work-view">
    <div className="spark-machine-inputs"><label>Force, N<input type="number" min="0" value={force} onChange={e=>setForce(e.target.value)}/></label><label>Distance, m<input type="number" min="0" value={distance} onChange={e=>setDistance(e.target.value)}/></label></div>
    <strong>Work = force × distance = {(F*d).toFixed(0)} J</strong>
    <p>The joule, J, is the unit of work. One joule equals one newton metre.</p>
  </div>;
}

function EfficiencyView(){
  const [out,setOut]=useState(400),[input,setInput]=useState(500);
  const o=Math.max(0,Number(out)||0),i=Math.max(.1,Number(input)||.1);
  return <div className="spark-efficiency-view">
    <div className="spark-machine-inputs"><label>Useful work out, J<input type="number" min="0" value={out} onChange={e=>setOut(e.target.value)}/></label><label>Work in, J<input type="number" min=".1" value={input} onChange={e=>setInput(e.target.value)}/></label></div>
    <strong>Efficiency = {(o/i*100).toFixed(1)}%</strong>
    <div className="spark-efficiency-bar"><span style={{width:Math.min(100,o/i*100)+"%"}}></span></div>
    <p>Efficiency = useful work out ÷ work in × 100%. Real machines are less than 100% efficient because some input energy is dissipated, mainly by friction and deformation.</p>
  </div>;
}

function PulleyView(){
  return <div className="spark-machine-example">
    <article><span>PULLEY EXAMPLE</span><h4>200 N load rises 2 m</h4><p>Useful work out = 200 × 2 = 400 J.</p></article>
    <article><span>INPUT</span><h4>80 N effort moves 6 m</h4><p>Work in = 80 × 6 = 480 J.</p></article>
    <article><span>EFFICIENCY</span><h4>400 ÷ 480 × 100 ≈ 83%</h4><p>The missing energy is not destroyed; it is transferred to less useful forms such as heat and sound.</p></article>
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
    improve:"Reducing friction improves efficiency because less energy is dissipated."
  })[view],[view]);
  return <section className="spark-machine-efficiency">
    <header><span>MACHINE EFFICIENCY</span><h3>Calculate mechanical advantage, work and efficiency</h3><p>Machines can multiply force or change motion, but real machines always lose some useful energy through friction and other effects.</p></header>
    <div className="spark-machine-tabs">{[["ma","Mechanical advantage"],["work","Work"],["efficiency","Efficiency"],["pulley","Pulley example"],["improve","Improve efficiency"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-machine-stage">{view==="ma"&&<MaView/>}{view==="work"&&<WorkView/>}{view==="efficiency"&&<EfficiencyView/>}{view==="pulley"&&<PulleyView/>}{view==="improve"&&<ImproveView/>}</div>
    <div className="spark-machine-summary"><strong>{summary}</strong><span>MA = load ÷ effort. Work = force × distance. Efficiency = useful work out ÷ work in × 100%.</span></div>
  </section>;
}
