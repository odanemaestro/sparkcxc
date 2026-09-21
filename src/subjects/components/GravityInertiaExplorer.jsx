import React,{useMemo,useState} from "react";
import "./gravityInertiaExplorer.css";

function WeightView(){
  const [mass,setMass]=useState(50);
  const [place,setPlace]=useState("earth");
  const m=Math.max(0,Number(mass)||0);
  const g=place==="earth"?10:1.6;
  const weight=m*g;
  return <div className="spark-weight-view">
    <div className="spark-gravity-toggle"><button type="button" className={place==="earth"?"active":""} onClick={()=>setPlace("earth")}>Earth</button><button type="button" className={place==="moon"?"active":""} onClick={()=>setPlace("moon")}>Moon</button></div>
    <label>Mass, kg<input type="number" min="0" value={mass} onChange={e=>setMass(e.target.value)}/></label>
    <div className="spark-weight-cards"><article><span>MASS</span><strong>{m} kg</strong><p>Mass is the amount of matter and does not change when location changes.</p></article><article><span>WEIGHT</span><strong>{weight.toFixed(1)} N</strong><p>Weight is the gravitational force: W = mg.</p></article></div>
    <p>{place==="earth"?"CSEC questions often use g = 10 N/kg when it is stated or implied.":"The Moon's gravitational field is much weaker, so the same mass has much less weight."}</p>
  </div>;
}

function FallView(){
  const [vacuum,setVacuum]=useState(false);
  return <div className="spark-fall-view">
    <div className="spark-gravity-toggle"><button type="button" className={!vacuum?"active":""} onClick={()=>setVacuum(false)}>With air</button><button type="button" className={vacuum?"active":""} onClick={()=>setVacuum(true)}>Vacuum</button></div>
    <div className="spark-fall-stage">
      <div className={"spark-falling book "+(vacuum?"vacuum":"air")}>book</div>
      <div className={"spark-falling feather "+(vacuum?"vacuum":"air")}>feather</div>
      {!vacuum&&<div className="spark-drag-label">air resistance affects the feather more relative to its weight</div>}
    </div>
    <p>{vacuum?"With no air resistance, a feather and a hammer or light and heavy objects fall with the same gravitational acceleration.":"In air, a sheet of paper or feather may fall more slowly because air resistance is large compared with its weight."}</p>
  </div>;
}

function InertiaView(){
  const [moving,setMoving]=useState(true);
  return <div className="spark-inertia-view">
    <div className="spark-gravity-toggle"><button type="button" className={moving?"active":""} onClick={()=>setMoving(true)}>Car moving</button><button type="button" className={!moving?"active":""} onClick={()=>setMoving(false)}>Car stops suddenly</button></div>
    <div className="spark-car-inertia">
      <div className="spark-car-body">car</div>
      <div className={"spark-passenger "+(!moving?"forward":"")}>passenger</div>
      {!moving&&<div className="spark-seatbelt">seat belt provides stopping force</div>}
    </div>
    <p>{moving?"Newton's first law says motion remains unchanged unless a resultant force acts.":"When the car stops, the passenger's body tends to continue moving forward because of inertia. The seat belt supplies the force that changes the passenger's motion."}</p>
  </div>;
}

function OrbitView(){
  const [attached,setAttached]=useState(true);
  return <div className="spark-centripetal-view">
    <div className="spark-gravity-toggle"><button type="button" className={attached?"active":""} onClick={()=>setAttached(true)}>String intact</button><button type="button" className={!attached?"active":""} onClick={()=>setAttached(false)}>String breaks</button></div>
    <svg viewBox="0 0 820 390" role="img" aria-label={attached?"Ball moving in circle with inward centripetal force":"Ball moving along tangent after string breaks"}>
      <circle className="gi-centre" cx="360" cy="200" r="18"/>
      {attached&&<circle className="gi-orbit" cx="360" cy="200" r="125"/>}
      <circle className="gi-ball" cx="485" cy="200" r="24"/>
      {attached?<><line className="gi-string" x1="360" y1="200" x2="485" y2="200"/><path className="gi-force" d="M460 200H395"/><text className="gi-label" x="402" y="178">centripetal force</text></>:<><path className="gi-tangent" d="M485 200L650 95"/><text className="gi-label" x="590" y="120">straight-line tangent</text></>}
    </svg>
    <p>{attached?"A centre-seeking force keeps changing the ball's direction. For a satellite, gravity provides the centripetal force.":"If the centre-seeking force disappears, Newton's first law means the object continues in a straight line tangent to the former circular path."}</p>
  </div>;
}

function ForcesView(){
  return <div className="spark-noncontact-forces">
    <article><span>GRAVITY</span><h4>Non-contact force</h4><p>Gravity can act across space without objects touching.</p></article>
    <article><span>MAGNETIC</span><h4>Non-contact force</h4><p>Magnets can attract or repel some objects at a distance.</p></article>
    <article><span>ELECTROSTATIC</span><h4>Non-contact force</h4><p>Electric charges can attract or repel without direct contact.</p></article>
  </div>;
}

export default function GravityInertiaExplorer(){
  const [view,setView]=useState("weight");
  const summary=useMemo(()=>({
    weight:"Mass stays constant when location changes; weight changes with gravitational field strength.",
    fall:"Different falling speeds in air can be caused by air resistance, not different gravitational acceleration.",
    inertia:"An object's motion changes only when a resultant force acts.",
    orbit:"Centripetal force acts toward the centre of circular motion; gravity supplies it for satellites.",
    forces:"Gravity, magnetic and electrostatic forces can act without physical contact."
  })[view],[view]);
  return <section className="spark-gravity-inertia">
    <header><span>GRAVITY AND INERTIA</span><h3>Distinguish mass and weight, explain falling motion and apply Newton's first law</h3><p>Gravity is a non-contact force. It gives objects weight, causes free fall and can provide the centripetal force needed for orbital motion.</p></header>
    <div className="spark-gravity-tabs">{[["weight","Mass and weight"],["fall","Falling objects"],["inertia","Inertia"],["orbit","Centripetal force"],["forces","Non-contact forces"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-gravity-stage">{view==="weight"&&<WeightView/>}{view==="fall"&&<FallView/>}{view==="inertia"&&<InertiaView/>}{view==="orbit"&&<OrbitView/>}{view==="forces"&&<ForcesView/>}</div>
    <div className="spark-gravity-summary"><strong>{summary}</strong><span>Mass is measured in kilograms. Weight is a force measured in newtons.</span></div>
  </section>;
}
