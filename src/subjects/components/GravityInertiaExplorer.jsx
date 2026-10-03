import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
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
    <ReviewedScienceDiagram site="GravityInertiaExplorer.jsx:22"><svg className="spark-freefall-svg" viewBox="0 0 820 440" role="img" aria-label={vacuum?"Book and feather falling together in a vacuum with the same gravitational acceleration":"Book falling faster than a feather in air because drag is large compared with the feather's weight"}>
      <defs>
        <marker id="gi-weight-head" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="gi-weight-head"/></marker>
        <marker id="gi-drag-head" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="gi-drag-head"/></marker>
      </defs>
      <rect className="gi-fall-bg" x="0" y="0" width="820" height="440" rx="18"/>
      <line className="gi-ground" x1="45" y1="382" x2="775" y2="382"/>
      <text className="gi-fall-title" x="410" y="40" textAnchor="middle">{vacuum?"VACUUM, NO AIR RESISTANCE":"AIR PRESENT, DRAG ACTS"}</text>

      <g className="gi-fall-object book" transform={vacuum?"translate(230 236)":"translate(230 250)"}>
        <rect x="-48" y="-30" width="96" height="60" rx="7"/>
        <line x1="-32" y1="-16" x2="28" y2="-16"/><line x1="-32" y1="-2" x2="34" y2="-2"/><line x1="-32" y1="12" x2="24" y2="12"/>
        <text className="gi-object-label" x="0" y="56" textAnchor="middle">book</text>
      </g>
      <g className="gi-fall-object feather" transform={vacuum?"translate(590 236)":"translate(590 150)"}>
        <path d="M-8 35Q-52 6 -31 -42Q14 -22 17 16Q13 29 -8 35Z"/>
        <path className="gi-feather-shaft" d="M-29 -34L16 32M-21 -19L-42 -8M-12 -6L-38 7M-1 8L-25 22M0 -16L19 -28M8 -1L29 -14M14 14L34 4"/>
        <text className="gi-object-label" x="0" y="62" textAnchor="middle">feather</text>
      </g>

      <line className="gi-weight-arrow" x1="230" y1={vacuum?276:292} x2="230" y2={vacuum?347:355} markerEnd="url(#gi-weight-head)"/>
      <text className="gi-weight-label" x="250" y={vacuum?338:346}>weight</text>
      <line className="gi-weight-arrow" x1="590" y1={vacuum?276:190} x2="590" y2={vacuum?332:250} markerEnd="url(#gi-weight-head)"/>
      <text className="gi-weight-label" x="610" y={vacuum?324:242}>weight</text>

      {!vacuum&&<React.Fragment>
        <line className="gi-drag-arrow book" x1="205" y1="239" x2="205" y2="205" markerEnd="url(#gi-drag-head)"/>
        <text className="gi-drag-label-svg" x="92" y="206">smaller drag effect</text>
        <line className="gi-drag-arrow feather" x1="562" y1="126" x2="562" y2="70" markerEnd="url(#gi-drag-head)"/>
        <text className="gi-drag-label-svg" x="585" y="78">air resistance is large relative to feather weight</text>
        <text className="gi-fall-note" x="410" y="415" textAnchor="middle">different motion in air comes from drag, not a different value of gravitational acceleration</text>
      </React.Fragment>}
      {vacuum&&<React.Fragment>
        <line className="gi-equal-level" x1="150" y1="236" x2="670" y2="236"/>
        <text className="gi-fall-note" x="410" y="100" textAnchor="middle">same gravitational acceleration, g</text>
        <text className="gi-fall-note" x="410" y="415" textAnchor="middle">without air resistance, both objects fall together from the same starting conditions</text>
      </React.Fragment>}
    </svg></ReviewedScienceDiagram>
    <p>{vacuum?"With no air resistance, a feather and a hammer or light and heavy objects fall with the same gravitational acceleration.":"In air, a sheet of paper or feather may fall more slowly because air resistance is large compared with its weight."}</p>
  </div>;
}

function InertiaView(){
  const [moving,setMoving]=useState(true);
  return <div className="spark-inertia-view">
    <div className="spark-gravity-toggle"><button type="button" className={moving?"active":""} onClick={()=>setMoving(true)}>Car moving</button><button type="button" className={!moving?"active":""} onClick={()=>setMoving(false)}>Car stops suddenly</button></div>
    <ReviewedScienceDiagram site="GravityInertiaExplorer.jsx:68"><svg className="spark-inertia-svg" viewBox="0 0 860 430" role="img" aria-label={moving?"Car and passenger moving together at constant velocity":"Car braking suddenly while the passenger tends to continue forward and the seat belt exerts a stopping force"}>
      <defs>
        <marker id="gi-motion-head" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="gi-motion-head"/></marker>
        <marker id="gi-belt-head" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="gi-belt-head"/></marker>
      </defs>
      <rect className="gi-inertia-bg" x="0" y="0" width="860" height="430" rx="18"/>
      <line className="gi-road-line" x1="40" y1="340" x2="820" y2="340"/>
      <path className="gi-car-shell" d="M155 300L195 220Q220 186 270 186H510Q560 188 605 235L690 250Q720 257 730 300V326H145V300Z"/>
      <circle className="gi-wheel" cx="245" cy="326" r="38"/><circle className="gi-wheel" cx="625" cy="326" r="38"/>
      <circle className="gi-wheel-hub" cx="245" cy="326" r="13"/><circle className="gi-wheel-hub" cx="625" cy="326" r="13"/>
      <rect className="gi-seat" x="405" y="229" width="80" height="70" rx="10"/>
      <g className={!moving?"gi-passenger-svg forward":"gi-passenger-svg"}>
        <circle cx="445" cy="170" r="30"/>
        <path d="M420 202Q445 190 470 202L483 265H407Z"/>
      </g>
      <path className={!moving?"gi-seatbelt-svg active":"gi-seatbelt-svg"} d="M410 206L478 274"/>
      {moving?<React.Fragment>
        <line className="gi-motion-arrow" x1="270" y1="105" x2="650" y2="105" markerEnd="url(#gi-motion-head)"/>
        <text className="gi-motion-label" x="460" y="88" textAnchor="middle">car and passenger have the same forward velocity</text>
        <text className="gi-inertia-note" x="430" y="398" textAnchor="middle">with zero resultant force, motion stays unchanged</text>
      </React.Fragment>:<React.Fragment>
        <line className="gi-brake-arrow" x1="265" y1="105" x2="125" y2="105" markerEnd="url(#gi-belt-head)"/>
        <text className="gi-belt-label" x="195" y="88" textAnchor="middle">braking force on car</text>
        <line className="gi-continue-arrow" x1="470" y1="145" x2="655" y2="145" markerEnd="url(#gi-motion-head)"/>
        <text className="gi-motion-label" x="570" y="128" textAnchor="middle">passenger tends to continue forward</text>
        <line className="gi-seatbelt-force" x1="438" y1="238" x2="342" y2="238" markerEnd="url(#gi-belt-head)"/>
        <text className="gi-belt-label" x="325" y="222" textAnchor="middle">seat-belt force on passenger</text>
        <text className="gi-inertia-note" x="430" y="398" textAnchor="middle">the belt supplies the resultant force that decelerates the passenger with the car</text>
      </React.Fragment>}
    </svg></ReviewedScienceDiagram>
    <p>{moving?"Newton's first law says motion remains unchanged unless a resultant force acts.":"When the car stops, the passenger's body tends to continue moving forward because of inertia. The seat belt supplies the force that changes the passenger's motion."}</p>
  </div>;
}

function OrbitView(){
  const [attached,setAttached]=useState(true);
  return <div className="spark-centripetal-view">
    <div className="spark-gravity-toggle"><button type="button" className={attached?"active":""} onClick={()=>setAttached(true)}>String intact</button><button type="button" className={!attached?"active":""} onClick={()=>setAttached(false)}>String breaks</button></div>
    <ReviewedScienceDiagram site="GravityInertiaExplorer.jsx:106"><svg viewBox="0 0 820 390" role="img" aria-label={attached?"Ball moving in circle with inward centripetal force":"Ball moving along tangent after string breaks"}>
      <circle className="gi-centre" cx="360" cy="200" r="18"/>
      {attached&&<circle className="gi-orbit" cx="360" cy="200" r="125"/>}
      <circle className="gi-ball" cx="485" cy="200" r="24"/>
      {attached?<><line className="gi-string" x1="360" y1="200" x2="485" y2="200"/><path className="gi-force" d="M460 200H395"/><text className="gi-label" x="402" y="178">centripetal force</text></>:<><path className="gi-tangent" d="M485 200L650 95"/><text className="gi-label" x="590" y="120">straight-line tangent</text></>}
    </svg></ReviewedScienceDiagram>
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
