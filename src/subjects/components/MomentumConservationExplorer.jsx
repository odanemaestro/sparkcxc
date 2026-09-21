import React,{useMemo,useState} from "react";
import "./momentumConservationExplorer.css";

function MomentumCalc(){
  const [mass,setMass]=useState(1000),[velocity,setVelocity]=useState(20);
  const m=Number(mass)||0,v=Number(velocity)||0;
  return <div className="spark-momentum-calc">
    <div className="spark-momentum-inputs">
      <label>Mass, kg<input type="number" value={mass} onChange={e=>setMass(e.target.value)}/></label>
      <label>Velocity, m/s<input type="number" value={velocity} onChange={e=>setVelocity(e.target.value)}/></label>
    </div>
    <strong>Momentum = m × v = {(m*v).toLocaleString()} kg m/s</strong>
    <p>Momentum is a vector quantity, so direction matters as well as magnitude.</p>
  </div>;
}

function CollisionView(){
  const [m1,setM1]=useState(2),[v1,setV1]=useState(3),[m2,setM2]=useState(1);
  const total=(Number(m1)||0)*(Number(v1)||0);
  const final=total/Math.max(.1,(Number(m1)||0)+(Number(m2)||0));
  return <div className="spark-momentum-collision">
    <div className="spark-momentum-inputs three">
      <label>Moving trolley mass, kg<input type="number" value={m1} onChange={e=>setM1(e.target.value)}/></label>
      <label>Initial speed, m/s<input type="number" value={v1} onChange={e=>setV1(e.target.value)}/></label>
      <label>Stationary trolley mass, kg<input type="number" value={m2} onChange={e=>setM2(e.target.value)}/></label>
    </div>
    <div className="spark-trolley-scene"><div className="spark-trolley one">m₁</div><span>→</span><div className="spark-trolley two">m₂</div></div>
    <strong>If they stick together: final speed = {final.toFixed(2)} m/s</strong>
    <p>Total momentum before equals total momentum after when external impulse is negligible.</p>
  </div>;
}

function PairView(){
  const [example,setExample]=useState("skaters");
  const data={
    skaters:{title:"Two skaters push apart",text:"They begin with total momentum zero. After pushing, they move in opposite directions with equal and opposite momenta, so total momentum remains zero."},
    rocket:{title:"Rocket propulsion",text:"Gases gain backward momentum while the rocket gains forward momentum. The total momentum of the rocket-gas system is conserved if external forces are neglected."},
    balls:{title:"Equal billiard balls",text:"If one moving ball hits an equal stationary ball head-on and stops, the second can move away with the original speed, transferring the momentum."}
  }[example];
  return <div className="spark-momentum-pairs">
    <div className="spark-momentum-buttons">{Object.keys(data).map(k=><button key={k} type="button" className={example===k?"active":""} onClick={()=>setExample(k)}>{data[k].title}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.text}</h4></article>
  </div>;
}

function SeatbeltView(){
  const [time,setTime]=useState(0.2);
  const t=Math.max(.05,Number(time)||.05);
  const change=600;
  const force=change/t;
  return <div className="spark-momentum-seatbelt">
    <label>Stopping time, s<input type="range" min="0.1" max="1.0" step="0.1" value={time} onChange={e=>setTime(e.target.value)}/></label>
    <strong>Illustrative average force = change in momentum ÷ time = {force.toFixed(0)} N</strong>
    <p>For the same change in momentum, increasing the time over which a passenger stops reduces the average force. Seat belts and crumple zones help increase stopping time while restraining occupants.</p>
  </div>;
}

export default function MomentumConservationExplorer(){
  const [view,setView]=useState("calc");
  const summary=useMemo(()=>({
    calc:"Momentum equals mass × velocity and is measured in kg m/s.",
    collision:"In an isolated system, total momentum before a collision equals total momentum after.",
    pairs:"Opposite motions in skaters, rockets and colliding balls illustrate momentum transfer and conservation.",
    seatbelt:"For the same momentum change, a longer stopping time means a smaller average force."
  })[view],[view]);
  return <section className="spark-momentum">
    <header><span>MOMENTUM</span><h3>Calculate momentum and apply conservation to collisions and motion</h3><p>Momentum depends on both mass and velocity. In a system with negligible external impulse, total momentum is conserved.</p></header>
    <div className="spark-momentum-tabs">{[["calc","p = mv"],["collision","Collisions"],["pairs","Examples"],["seatbelt","Seat belts"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-momentum-stage">{view==="calc"&&<MomentumCalc/>}{view==="collision"&&<CollisionView/>}{view==="pairs"&&<PairView/>}{view==="seatbelt"&&<SeatbeltView/>}</div>
    <div className="spark-momentum-summary"><strong>{summary}</strong><span>Momentum unit: kg m/s.</span></div>
  </section>;
}
