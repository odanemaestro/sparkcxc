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
  const mass1=Math.max(0,Number(m1)||0),mass2=Math.max(0,Number(m2)||0),speed1=Number(v1)||0;
  const total=mass1*speed1;
  const final=total/Math.max(.1,mass1+mass2);
  return <div className="spark-momentum-collision">
    <div className="spark-momentum-inputs three">
      <label>Moving trolley mass, kg<input type="number" value={m1} onChange={e=>setM1(e.target.value)}/></label>
      <label>Initial speed, m/s<input type="number" value={v1} onChange={e=>setV1(e.target.value)}/></label>
      <label>Stationary trolley mass, kg<input type="number" value={m2} onChange={e=>setM2(e.target.value)}/></label>
    </div>
    <svg className="spark-momentum-collision-diagram" viewBox="0 0 860 420" role="img" aria-label="Perfectly inelastic trolley collision showing momentum before and after the trolleys stick together">
      <defs><marker id="mom-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="mc-arrow-head"/></marker></defs>
      <text className="mc-title" x="45" y="45">BEFORE</text>
      <line className="mc-track" x1="60" y1="175" x2="800" y2="175"/>
      <g transform="translate(175 104)">
        <rect className="mc-cart moving" x="0" y="0" width="150" height="58" rx="10"/>
        <circle className="mc-wheel" cx="30" cy="66" r="14"/><circle className="mc-wheel" cx="120" cy="66" r="14"/>
        <text className="mc-cart-label" x="75" y="36" textAnchor="middle">m₁ = {mass1.toFixed(1)} kg</text>
      </g>
      <line className="mc-velocity" x1="175" y1="80" x2="330" y2="80" markerEnd="url(#mom-arrow)"/>
      <text className="mc-small" x="250" y="64" textAnchor="middle">v₁ = {speed1.toFixed(1)} m/s</text>
      <g transform="translate(545 104)">
        <rect className="mc-cart stationary" x="0" y="0" width="150" height="58" rx="10"/>
        <circle className="mc-wheel" cx="30" cy="66" r="14"/><circle className="mc-wheel" cx="120" cy="66" r="14"/>
        <text className="mc-cart-label" x="75" y="36" textAnchor="middle">m₂ = {mass2.toFixed(1)} kg</text>
      </g>
      <text className="mc-small" x="620" y="82" textAnchor="middle">stationary</text>

      <text className="mc-title" x="45" y="250">AFTER</text>
      <line className="mc-track" x1="60" y1="374" x2="800" y2="374"/>
      <g transform="translate(335 303)">
        <rect className="mc-cart joined" x="0" y="0" width="210" height="58" rx="10"/>
        <line className="mc-coupler" x1="105" y1="4" x2="105" y2="54"/>
        <circle className="mc-wheel" cx="38" cy="66" r="14"/><circle className="mc-wheel" cx="172" cy="66" r="14"/>
        <text className="mc-cart-label" x="105" y="36" textAnchor="middle">m₁ + m₂ = {(mass1+mass2).toFixed(1)} kg</text>
      </g>
      <line className="mc-velocity" x1="335" y1="278" x2="520" y2="278" markerEnd="url(#mom-arrow)"/>
      <text className="mc-small" x="428" y="260" textAnchor="middle">v = {final.toFixed(2)} m/s</text>
      <text className="mc-equation" x="690" y="277" textAnchor="middle">m₁v₁ = (m₁ + m₂)v</text>
    </svg>
    <strong>If they stick together: final speed = {final.toFixed(2)} m/s</strong>
    <p>Total momentum before equals total momentum after when external impulse is negligible.</p>
  </div>;
}

function MomentumExampleDiagram({example}){
  if(example==="rocket") return <svg className="spark-momentum-example-diagram" viewBox="0 0 760 300" role="img" aria-label="Rocket moving forward while exhaust gases move backward with opposite momentum">
    <defs><marker id="mom-example-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="mc-arrow-head"/></marker></defs>
    <path className="mx-rocket" d="M410 150L330 105L250 118L210 150L250 182L330 195Z"/>
    <circle className="mx-window" cx="330" cy="150" r="18"/>
    <path className="mx-flame" d="M210 132Q132 150 210 168Q175 150 210 132Z"/>
    <line className="mx-forward" x1="420" y1="110" x2="620" y2="110" markerEnd="url(#mom-example-arrow)"/>
    <line className="mx-backward" x1="205" y1="220" x2="65" y2="220" markerEnd="url(#mom-example-arrow)"/>
    <text className="mx-label" x="520" y="91" textAnchor="middle">rocket momentum forward</text>
    <text className="mx-label" x="140" y="249" textAnchor="middle">gas momentum backward</text>
  </svg>;
  if(example==="balls") return <svg className="spark-momentum-example-diagram" viewBox="0 0 760 300" role="img" aria-label="Equal billiard balls showing momentum transferred from the moving ball to the stationary ball">
    <defs><marker id="mom-ball-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="mc-arrow-head"/></marker></defs>
    <text className="mx-label" x="115" y="48">before</text>
    <circle className="mx-ball moving" cx="185" cy="105" r="36"/><circle className="mx-ball" cx="360" cy="105" r="36"/>
    <line className="mx-forward" x1="218" y1="62" x2="317" y2="62" markerEnd="url(#mom-ball-arrow)"/>
    <text className="mx-label" x="115" y="204">after</text>
    <circle className="mx-ball stopped" cx="185" cy="238" r="36"/><circle className="mx-ball moving" cx="360" cy="238" r="36"/>
    <line className="mx-forward" x1="393" y1="195" x2="525" y2="195" markerEnd="url(#mom-ball-arrow)"/>
    <text className="mx-small" x="185" y="286" textAnchor="middle">first ball stops</text><text className="mx-small" x="445" y="286" textAnchor="middle">second ball carries momentum</text>
  </svg>;
  return <svg className="spark-momentum-example-diagram" viewBox="0 0 760 300" role="img" aria-label="Two skaters pushing apart with equal and opposite momenta">
    <defs><marker id="mom-skater-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="mc-arrow-head"/></marker></defs>
    <circle className="mx-head" cx="290" cy="103" r="24"/><path className="mx-person" d="M290 128V196M290 150L245 173M290 150L335 173M290 196L255 245M290 196L325 245"/>
    <circle className="mx-head" cx="470" cy="103" r="24"/><path className="mx-person" d="M470 128V196M470 150L425 173M470 150L515 173M470 196L435 245M470 196L505 245"/>
    <line className="mx-backward" x1="248" y1="73" x2="90" y2="73" markerEnd="url(#mom-skater-arrow)"/>
    <line className="mx-forward" x1="512" y1="73" x2="670" y2="73" markerEnd="url(#mom-skater-arrow)"/>
    <text className="mx-label" x="165" y="54" textAnchor="middle">momentum left</text><text className="mx-label" x="595" y="54" textAnchor="middle">momentum right</text>
    <text className="mx-small" x="380" y="280" textAnchor="middle">total momentum remains zero if they start at rest</text>
  </svg>;
}

function PairView(){
  const [example,setExample]=useState("skaters");
  const examples={
    skaters:{title:"Two skaters push apart",text:"They begin with total momentum zero. After pushing, they move in opposite directions with equal and opposite momenta, so total momentum remains zero."},
    rocket:{title:"Rocket propulsion",text:"Gases gain backward momentum while the rocket gains forward momentum. The total momentum of the rocket-gas system is conserved if external forces are neglected."},
    balls:{title:"Equal billiard balls",text:"If one moving ball hits an equal stationary ball head-on and stops, the second can move away with the original speed, transferring the momentum."}
  };
  const data=examples[example];
  return <div className="spark-momentum-pairs">
    <div className="spark-momentum-buttons">{Object.entries(examples).map(([key,item])=><button key={key} type="button" className={example===key?"active":""} onClick={()=>setExample(key)}>{item.title}</button>)}</div>
    <MomentumExampleDiagram example={example}/>
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
