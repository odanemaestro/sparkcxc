import React,{useMemo,useState} from "react";
import "./stabilityCentreGravityExplorer.css";

function StabilityView(){
  const [shape,setShape]=useState("low");
  const low=shape==="low";
  return <div className="spark-stability-view">
    <div className="spark-stability-toggle"><button type="button" className={low?"active":""} onClick={()=>setShape("low")}>Low and wide</button><button type="button" className={!low?"active":""} onClick={()=>setShape("tall")}>Tall and narrow</button></div>
    <div className="spark-stability-model">
      <div className={"spark-stability-object "+(low?"low":"tall")}><span className="spark-cog-dot"></span></div>
      <div className="spark-stability-base"></div>
      <div className="spark-weight-line"></div>
    </div>
    <p>{low?"A low centre of gravity and a wide base make an object more stable because the line of action of its weight can move farther before it falls outside the base.":"A high centre of gravity and narrow base make toppling easier because only a small tilt is needed for the weight line to fall outside the base."}</p>
  </div>;
}

function VehicleView(){
  const [load,setLoad]=useState("floor");
  const floor=load==="floor";
  return <div className="spark-vehicle-stability">
    <div className="spark-stability-toggle"><button type="button" className={floor?"active":""} onClick={()=>setLoad("floor")}>Heavy load on floor</button><button type="button" className={!floor?"active":""} onClick={()=>setLoad("roof")}>Heavy load high</button></div>
    <div className="spark-truck">
      <div className="spark-truck-cab">truck</div>
      <div className="spark-truck-box">
        <div className={"spark-truck-load "+(floor?"floor":"roof")}>heavy goods</div>
        <span className={"spark-truck-cog "+(floor?"floor":"roof")}>CG</span>
      </div>
      <div className="spark-wheel left"></div><div className="spark-wheel right"></div>
    </div>
    <p>{floor?"Placing heavy goods low keeps the combined centre of gravity lower and improves vehicle stability.":"Loading heavy goods high raises the centre of gravity and increases the risk of overturning, especially during turns or on slopes."}</p>
  </div>;
}

function RacingView(){
  return <div className="spark-racing-stability">
    <article><span>LOW BODY</span><h4>Lower centre of gravity</h4><p>Racing cars are designed low so the centre of gravity stays closer to the road.</p></article>
    <article><span>WIDE TRACK</span><h4>Wider support base</h4><p>A wider distance between the wheels increases the base of support and resists toppling.</p></article>
    <article><span>BENDS</span><h4>More stable while turning</h4><p>A low centre of gravity and wide base reduce the tendency to overturn when lateral forces act.</p></article>
  </div>;
}

function PlumbView(){
  return <div className="spark-plumb-line">
    <svg viewBox="0 0 820 470" role="img" aria-label="Irregular lamina suspended from two points with plumb lines crossing at the centre of gravity">
      <path className="pc-shape" d="M180 90Q330 40 500 100L650 215L560 390L300 420L130 300Z"/>
      <circle className="pc-hole" cx="250" cy="110" r="9"/><circle className="pc-hole" cx="570" cy="180" r="9"/>
      <line className="pc-plumb one" x1="250" y1="110" x2="250" y2="430"/><line className="pc-plumb two" x1="570" y1="180" x2="220" y2="430"/>
      <circle className="pc-cog" cx="376" cy="315" r="12"/>
      <text className="pc-label" x="390" y="305">centre of gravity</text>
    </svg>
    <p>Suspend an irregular lamina from one point and draw the vertical plumb line. Repeat from another suspension point. The lines cross at the centre of gravity.</p>
  </div>;
}

function ShapesView(){
  return <div className="spark-cog-shapes">
    <article><div className="spark-shape circle"><span>CG</span></div><h4>Uniform disc</h4><p>Centre of gravity is at the geometric centre.</p></article>
    <article><div className="spark-shape rectangle"><span>CG</span></div><h4>Uniform rectangle</h4><p>The diagonals cross at the centre of gravity.</p></article>
    <article><div className="spark-shape irregular"><span>CG</span></div><h4>Irregular lamina</h4><p>Use the suspension and plumb-line method.</p></article>
  </div>;
}

function LoadingView(){
  return <div className="spark-loading-rules">
    <article><span>TARE</span><h4>Mass of the empty vehicle</h4><p>Tare is the unladen mass before passengers or cargo are added.</p></article>
    <article><span>MAXIMUM LOAD</span><h4>Protect stability and components</h4><p>Loading limits help keep vehicles stable and prevent excessive stress on brakes, tyres, suspension and roads.</p></article>
    <article><span>DOUBLE-DECK BUS</span><h4>Upper loading raises the centre of gravity</h4><p>A heavily loaded upper deck with an empty lower deck is less stable than keeping more mass lower down.</p></article>
  </div>;
}

export default function StabilityCentreGravityExplorer(){
  const [view,setView]=useState("stability");
  const summary=useMemo(()=>({
    stability:"An object is generally more stable when it has a low centre of gravity and a wide base.",
    vehicle:"Heavy loads should be kept low to reduce the combined centre-of-gravity height.",
    racing:"Racing cars use low bodies and wide wheel tracks to improve stability.",
    plumb:"The centre of gravity of an irregular flat object can be found using intersecting plumb lines.",
    shapes:"For regular uniform shapes, the centre of gravity is at the geometric centre.",
    loading:"Tare and loading limits matter for vehicle stability, braking and road safety."
  })[view],[view]);
  return <section className="spark-stability-cog">
    <header><span>CENTRE OF GRAVITY</span><h3>Connect centre of gravity, base width and safe loading to stability</h3><p>The centre of gravity is the point through which the whole weight of an object may be considered to act.</p></header>
    <div className="spark-stability-tabs">{[["stability","Stability"],["vehicle","Truck loading"],["racing","Racing cars"],["plumb","Plumb-line method"],["shapes","Regular shapes"],["loading","Tare and limits"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-stability-stage">{view==="stability"&&<StabilityView/>}{view==="vehicle"&&<VehicleView/>}{view==="racing"&&<RacingView/>}{view==="plumb"&&<PlumbView/>}{view==="shapes"&&<ShapesView/>}{view==="loading"&&<LoadingView/>}</div>
    <div className="spark-stability-summary"><strong>{summary}</strong><span>An object begins to topple when the vertical line through its centre of gravity falls outside its base of support.</span></div>
  </section>;
}
