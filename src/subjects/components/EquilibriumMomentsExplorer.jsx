import React,{useMemo,useState} from "react";
import "./equilibriumMomentsExplorer.css";

function MomentView(){
  const [force,setForce]=useState(20);
  const [distance,setDistance]=useState(0.3);
  const F=Math.max(0,Number(force)||0),d=Math.max(0,Number(distance)||0);
  return <div className="spark-equilibrium-moment">
    <div className="spark-equilibrium-inputs">
      <label>Force, N<input type="number" min="0" step="1" value={force} onChange={e=>setForce(e.target.value)}/></label>
      <label>Perpendicular distance, m<input type="number" min="0" step="0.1" value={distance} onChange={e=>setDistance(e.target.value)}/></label>
    </div>
    <strong>Moment = F × d = {(F*d).toFixed(2)} N m</strong>
    <div className="spark-spanner-model"><div className="spark-pivot">pivot</div><div className="spark-spanner"></div><div className="spark-force-arrow">↓ {F} N</div></div>
    <p>Moment is the turning effect of a force about a pivot. Use the perpendicular distance from the pivot to the line of action of the force.</p>
  </div>;
}

function BalanceView(){
  const [w1,setW1]=useState(400);
  const [d1,setD1]=useState(1.5);
  const [w2,setW2]=useState(300);
  const rightDistance=(Number(w1)||0)*(Number(d1)||0)/Math.max(0.1,Number(w2)||0.1);
  return <div className="spark-equilibrium-balance">
    <div className="spark-equilibrium-inputs">
      <label>Left force, N<input type="number" value={w1} onChange={e=>setW1(e.target.value)}/></label>
      <label>Left distance, m<input type="number" step="0.1" value={d1} onChange={e=>setD1(e.target.value)}/></label>
      <label>Right force, N<input type="number" value={w2} onChange={e=>setW2(e.target.value)}/></label>
    </div>
    <strong>Balance distance on right = {rightDistance.toFixed(2)} m</strong>
    <p>For rotational equilibrium, total clockwise moment equals total anticlockwise moment. For complete equilibrium under parallel forces, upward and downward forces must also balance.</p>
  </div>;
}

function TypesView(){
  const [type,setType]=useState("stable");
  const data={
    stable:["Stable equilibrium","A small displacement produces a tendency to return to the original position.","Cone standing on its base"],
    unstable:["Unstable equilibrium","A small displacement makes the object move farther from the original position.","Cone balanced on its point"],
    neutral:["Neutral equilibrium","After a small displacement, the object remains in its new position.","Ball on a flat surface"]
  }[type];
  return <div className="spark-equilibrium-types">
    <div className="spark-equilibrium-buttons">{["stable","unstable","neutral"].map(k=><button key={k} type="button" className={type===k?"active":""} onClick={()=>setType(k)}>{k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <article><span>{data[0].toUpperCase()}</span><h4>{data[1]}</h4><p>{data[2]}</p></article>
  </div>;
}

function BeyondView(){
  return <div className="spark-equilibrium-beyond">
    <article><span>BIOLOGY</span><h4>Homeostasis</h4><p>Keeping internal conditions such as body temperature and blood glucose within suitable limits is called homeostasis.</p></article>
    <article><span>CHEMISTRY</span><h4>Dynamic chemical equilibrium</h4><p>In a reversible reaction at equilibrium, forward and reverse reactions continue at equal rates, so macroscopic concentrations remain constant.</p></article>
  </div>;
}

export default function EquilibriumMomentsExplorer(){
  const [view,setView]=useState("moment");
  const summary=useMemo(()=>({
    moment:"Moment = force × perpendicular distance from the pivot.",
    balance:"An object is in rotational equilibrium when clockwise and anticlockwise moments balance.",
    types:"Stable, unstable and neutral equilibrium describe how a system responds to a small displacement.",
    beyond:"Equilibrium ideas also appear in biology and chemistry, though the mechanisms differ."
  })[view],[view]);
  return <section className="spark-equilibrium-moments">
    <header><span>EQUILIBRIUM AND MOMENTS</span><h3>Connect turning effects, balanced forces and equilibrium</h3><p>Mechanical equilibrium requires both balanced forces and balanced turning effects.</p></header>
    <div className="spark-equilibrium-tabs">{[["moment","Moment"],["balance","Balancing"],["types","Types of equilibrium"],["beyond","Biology and chemistry"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-equilibrium-stage">{view==="moment"&&<MomentView/>}{view==="balance"&&<BalanceView/>}{view==="types"&&<TypesView/>}{view==="beyond"&&<BeyondView/>}</div>
    <div className="spark-equilibrium-summary"><strong>{summary}</strong><span>Unit of moment: N m.</span></div>
  </section>;
}
