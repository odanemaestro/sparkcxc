import React,{useMemo,useState} from "react";
import "./flotationExplorer.css";

function DensityView(){
  const [mass,setMass]=useState(60);
  const [volume,setVolume]=useState(100);
  const m=Math.max(0,Number(mass)||0),v=Math.max(0.1,Number(volume)||0.1);
  const density=m/v;
  const state=density<1?"floats":density===1?"neutral":"sinks";
  return <div className="spark-flotation-density">
    <div className="spark-flotation-inputs">
      <label>Mass, g<input type="number" min="0" value={mass} onChange={e=>setMass(e.target.value)}/></label>
      <label>Volume, cm³<input type="number" min="0.1" value={volume} onChange={e=>setVolume(e.target.value)}/></label>
    </div>
    <strong>Density = {density.toFixed(2)} g/cm³ → {state} in fresh water</strong>
    <p>Density = mass ÷ volume. Fresh water is approximately 1 g/cm³, so an object with lower average density can float.</p>
  </div>;
}

function ArchimedesView(){
  const [air,setAir]=useState(5);
  const [water,setWater]=useState(3);
  const up=Math.max(0,(Number(air)||0)-(Number(water)||0));
  return <div className="spark-flotation-archimedes">
    <div className="spark-flotation-inputs">
      <label>Weight in air, N<input type="number" min="0" step="0.1" value={air} onChange={e=>setAir(e.target.value)}/></label>
      <label>Apparent weight in water, N<input type="number" min="0" step="0.1" value={water} onChange={e=>setWater(e.target.value)}/></label>
    </div>
    <strong>Upthrust = {up.toFixed(1)} N</strong>
    <div className="spark-archimedes-model"><span className="up">↑ upthrust {up.toFixed(1)} N</span><div className="stone">stone</div><span className="down">↓ weight</span></div>
    <p>Archimedes' principle states that the upthrust on an immersed object equals the weight of fluid displaced.</p>
  </div>;
}

function ShipView(){
  const [water,setWater]=useState("sea");
  const sea=water==="sea";
  return <div className="spark-flotation-ship">
    <div className="spark-flotation-toggle"><button type="button" className={sea?"active":""} onClick={()=>setWater("sea")}>Sea water</button><button type="button" className={!sea?"active":""} onClick={()=>setWater("fresh")}>Fresh water</button></div>
    <div className={"spark-ship-water "+(sea?"sea":"fresh")}><div className={"spark-ship-hull "+(sea?"high":"low")}>ship</div></div>
    <p>{sea?"Sea water is denser, so the ship needs to displace less volume to obtain the same upthrust and floats slightly higher.":"Fresh water is less dense, so the same ship must sink slightly lower to displace enough water for the same upthrust."}</p>
  </div>;
}

function HollowView(){
  return <div className="spark-flotation-hollow">
    <article><span>STEEL ITSELF</span><h4>Denser than water</h4><p>A solid lump of steel sinks because its density is greater than water.</p></article>
    <article><span>HOLLOW SHIP</span><h4>Large volume, lower average density</h4><p>A ship encloses a large volume of air, so the average density of the whole ship can be low enough to float.</p></article>
    <article><span>DISPLACEMENT</span><h4>Enough water must be displaced</h4><p>The ship settles until the weight of displaced water produces enough upthrust to balance the ship's weight.</p></article>
  </div>;
}

function LoadingView(){
  const [load,setLoad]=useState(40);
  const l=Math.max(0,Math.min(100,Number(load)||0));
  return <div className="spark-flotation-loading">
    <label>Boat loading<input type="range" min="0" max="100" value={load} onChange={e=>setLoad(e.target.value)}/></label>
    <div className="spark-load-water"><div className="spark-load-boat" style={{top:(35+l*.35)+"%"}}>boat<div className="spark-plimsoll-mark">load line</div></div></div>
    <strong>{l<70?"Adequate freeboard":"Low freeboard: increased risk"}</strong>
    <p>Overloading lowers freeboard, so waves can more easily enter the boat and stability may be reduced. Load lines such as the Plimsoll mark show safe loading limits.</p>
  </div>;
}

function SaltEggView(){
  const [salt,setSalt]=useState(0);
  const floats=Number(salt)>=55;
  return <div className="spark-salt-egg">
    <label>Salt concentration, relative scale<input type="range" min="0" max="100" value={salt} onChange={e=>setSalt(e.target.value)}/></label>
    <div className="spark-egg-tank"><div className={"spark-egg "+(floats?"float":"sink")}>egg</div></div>
    <p>{floats?"Adding salt increases the liquid's density, so a greater upthrust can support the egg.":"In less dense water the egg's density is greater than the liquid, so it sinks."}</p>
  </div>;
}

export default function FlotationExplorer(){
  const [view,setView]=useState("density");
  const summary=useMemo(()=>({
    density:"Density helps predict whether an object will float or sink.",
    archimedes:"Upthrust equals the weight of fluid displaced.",
    ship:"Ships float at different depths because fresh and sea water have different densities.",
    hollow:"A hollow steel ship can float because its overall average density is reduced by the enclosed air.",
    loading:"Safe loading preserves freeboard and stability.",
    salt:"Increasing water density increases the upthrust available for the same displaced volume."
  })[view],[view]);
  return <section className="spark-flotation">
    <header><span>FLOTATION</span><h3>Connect density, upthrust and displacement to floating and safe loading</h3><p>Objects in fluids experience an upward buoyant force called upthrust. Whether they float depends on density, displacement and the balance of forces.</p></header>
    <div className="spark-flotation-tabs">{[["density","Density"],["archimedes","Archimedes"],["ship","Sea vs fresh water"],["hollow","Why ships float"],["loading","Safe loading"],["salt","Salt-water egg"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-flotation-stage">{view==="density"&&<DensityView/>}{view==="archimedes"&&<ArchimedesView/>}{view==="ship"&&<ShipView/>}{view==="hollow"&&<HollowView/>}{view==="loading"&&<LoadingView/>}{view==="salt"&&<SaltEggView/>}</div>
    <div className="spark-flotation-summary"><strong>{summary}</strong><span>Upthrust = weight in air − apparent weight in water.</span></div>
  </section>;
}
